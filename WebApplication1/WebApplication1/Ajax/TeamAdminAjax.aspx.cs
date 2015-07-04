﻿using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.Services.Users;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Infrastructor.MainBoundedContext.Repositories.Reports;
using Infrastructor.MainBoundedContext.Repositories.TeamAdmin;
using Infrastructor.MainBoundedContext.Repositories.Tiles;
using Application.MainBoundedContect.Services.Report;
using Application.MainBoundedContect.ViewModel.Tiles;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Application.MainBoundedContect.Services.TeamAdmin;
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.Services.Tile;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Users;
using Application.MainBoundedContect.ViewModel.TeamSites;
using WebApplication1.Utility;
using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.ViewModel.Report;
using Domain.MainBoundedContext.Reports.FilterField;
using Application.MainBoundedContect.ViewModel.Filters;
using Application.MainBoundedContect.ViewModel.Report.EBIUnifiedReporting.Model.ViewModel;

namespace WebApplication1.Ajax
{
    public partial class TeamAdminAjax : System.Web.UI.Page
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();
        private UserRepository up;
        private UserService service;
        protected void Page_Load(object sender, EventArgs e)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                 up = new UserRepository(context);
                
                 service = new UserService(up);

                SegmentRepository segRe = new SegmentRepository(context);
                DivisionRepository dvRe = new DivisionRepository(context);
                TeamRepository tRe = new TeamRepository(context);
                
                AppDivisionSegmentsService appService = new AppDivisionSegmentsService(tRe, segRe, dvRe);

                if (Request["requestType"] == "getdivisions")
                {
                    var divisions = appService.GetAllDivisions().ToList<AppDivision>();
                    Response.Write(jss.Serialize(divisions));
                }

                if (Request["requestType"] == "getsegmentandteams")
                {
                    int divisionId = Int16.Parse(Request["divisionid"]);
                    var tem = appService.GetAllSegmentsByDivisionId(divisionId);
                    string test = jss.Serialize(tem);
                    Response.Write(jss.Serialize(tem));
                }

                if (Request["requestType"] == "searchteams")
                {
                    string teamname = Request["teamname"].ToString();
                    var tem = jss.Serialize(appService.GetTeamsWithTitle(teamname));
                    Response.Write(tem);
                }

                if (Request.Params["queryType"] == "getadmintilereport")
                {
                    // get all the report
                    Response.Write(GetAdminReportFromCurrentTeamSite());
                }
                if (Request.Params["queryType"] == "gettilefilterlist")
                {
                    string userName = Session["UserName"].ToString();
                    string teamGuid = Request["SiteGUID"];
                    bool isAdmin = Request["IsAdmin"] == "1" ? true : false;

                    Response.Write(GetAdminTileFilterInfo(userName, teamGuid, isAdmin));
                }
                if (Request.Params["queryType"] == "GetTempTileReportCount")
                {
                    string userName = Session["UserName"].ToString();
                    string teamGuid = Request["SiteGUID"];

                    Response.Write(GetTempTileReportCount(teamGuid, userName));
                }

                if (Request["queryType"] == "reportsList")
                {
                    Response.Write(GetReports());
                }

                else if (Request["queryType"] == "reportfilter")
                {
                   Response.Write(GetFilter());
                }

            }
        }

        private string GetAdminReportFromCurrentTeamSite()
        {
            string tileID = Request["TileID"];
            string teamGuid = Request["SiteGUID"];

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ReportRepository repository = new ReportRepository(context);
                UserRepository uRepository = new UserRepository(context);
                TeamRepository tRepository = new TeamRepository(context);
                CategoryRepository cRepository = new CategoryRepository(context);
                TeamTagRepository tagRepository = new TeamTagRepository(context);
                TileRepository tileRepository = new TileRepository(context);
                EditReportService service = new EditReportService(repository, uRepository, tRepository, cRepository, tagRepository, tileRepository);
                var reports = service.GetAllReportsOfTeamSite(Session["UserName"].ToString(), teamGuid, true, global::Application.MainBoundedContect.Enums.SortField.ReportTitle,
                     global::Application.MainBoundedContect.Enums.SortOrder.ASC);

                JavaScriptSerializer jss = new JavaScriptSerializer();
                return jss.Serialize(reports);
            }

        }
        private string GetAdminTileFilterInfo(string userName, string teamGuid, bool isAdmin)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            // TileManager tm = new TileManager();

            TileFilterListViewModel filterViewModel = new TileFilterListViewModel();
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {

                ICategoryRepository _categoryRepository = new CategoryRepository(context);
                ITagRepository _tagRepository = new TeamTagRepository(context);
                ITileRepository _tileRepository = new TileRepository(context);
                ITeamRepository _teamRepository = new TeamRepository(context);
                IReportRepository _reportRepository = new ReportRepository(context);
                IUserRepository _userRepository = new UserRepository(context);

                TileServices tileService = new TileServices(_tileRepository, _teamRepository, _reportRepository, _userRepository, _tagRepository, _categoryRepository, null);

                //Owner
                IEnumerable<UserLoginApp> userList = tileService.GetOwnerList(userName, teamGuid, isAdmin);
                filterViewModel.Owner = userList.OrderBy(_ => _.UserName).Distinct<UserLoginApp>(new UserComparer());


                //Category
                IEnumerable<AppCategory> categoryList = tileService.GetCategoryList();
                filterViewModel.SubCategory = categoryList.OrderBy(_ => _.CategoryName).Distinct<AppCategory>(new CategoryComparer());


                //Tag
                IEnumerable<AppTeamTag> tagList = tileService.GetTagListByTeam(teamGuid).Distinct<AppTeamTag>(new TagComparer());
                filterViewModel.Tag = tagList;
            }



            return jss.Serialize(filterViewModel);
        }

        private string GetTempTileReportCount(string teamGuid, string userName)
        {
            string tileData = Request["TileData"];
            if (String.IsNullOrEmpty(tileData))
            {
                return "Querystring：TileData is empty!";
            }
            JavaScriptSerializer jss = new JavaScriptSerializer();
            TileViewModel para = jss.Deserialize<TileViewModel>(tileData);

            AppTile appTile = new AppTeamSiteCustomizedTile();
            appTile.logicType = (LogicType)Enum.Parse(typeof(LogicType), para.LogicType);

            SetAppTitleLogic(para.LogicString, appTile);
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                IReportRepository reportRepository = new ReportRepository(context);

                EditReportService reportService = new EditReportService(reportRepository, null, null, null, null, null);
                int reportCount = reportService.GetTempTilesWithReportCount(teamGuid, userName, appTile);

                return reportCount.ToString();
            }
        }

        private string GetReports()
        {
            string output;
            string siteType = Request["siteType"];
            string teamGuid = Request["SiteGuid"];

            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<WebApplication1.Models.QueryParameterViewModel>(Request["queryParam"]);

            int tileId = int.Parse(paramDes.TileId);


            // Get the reports from the reports list
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ReportRepository rep = new ReportRepository(context);
                TileRepository tileRep = new TileRepository(context);
                TileQueryLogicRepository tileQuery = new TileQueryLogicRepository(context);
                TileServices tService = new TileServices(tileRep, null, null, null, null, null, tileQuery);

                var tile = tService.GetTileById(tileId);

                EditReportService editReport = new EditReportService(rep, null, null, null, null, tileRep, tileQuery);


                #region Get ReportFilter
                ReportFilter filer = new ReportFilter();
                foreach (WebApplication1.Models.FilterModel vm in paramDes.FilterEntityList)
                {
                    switch (vm.FilterType)
                    {
                        
                        case "Tag":
                            filer.TagsIdCollection = (from fl in vm.FilterItemList select int.Parse(fl.Value)).ToList();
                            break;
                        case "Owner":
                            filer.OwnerIdCollection = (from fl in vm.FilterItemList select fl.Value).ToList();
                            break;
                        case "Sub Category":
                            filer.SubCategoryIdCollection = (from fl in vm.FilterItemList select int.Parse(fl.Value)).ToList();
                            break;
                        default:
                            break;
                    }
                }
                #endregion


                // TO-DO: Team admin is set to true
                var reports = editReport.GetReportsByTeamWithReportsRequire(teamGuid,
                    tileId,filer, true, Session["UserName"].ToString(), paramDes.CurrentPage, 
                    paramDes.PageSize,
                    SortField.ReportTitle, (paramDes.SortAscending ? SortOrder.ASC : SortOrder.DESC)).ToArray();


                ReportListViewModel rptList = GetReportList(reports, Convert.ToInt32(paramDes.TileId));

                output = jss.Serialize(rptList);
                return output;
            }
       
        }


        private ReportListViewModel GetReportList(IEnumerable<AppReport> rptDataList, int tileID = 0)
        {

            ReportListViewModel rptList = new ReportListViewModel();

            foreach (AppReport data in rptDataList)
            {
                ReportItemViewModel item = new ReportItemViewModel();
                item.ID = data.Id.GetValueOrDefault();
                item.Title = data.Title;
               // item.Image = GetReportICO(data.CatalogType.Id, data.FileType.Id);
              //  item.SystemReportStatus = data.Status.ToString();
                item.ReportStatus = data.Status.Name;
                item.Descript = data.Content;

                bool IsOwner = false;
                if (data.Owners != null)
                {
                    IsOwner = data.Owners.Any(u => string.Compare(u.UserName, Session["UserName"].ToString(), true) == 0);

                    for (var i = 0; i < data.Owners.Count; i++)
                    {
                        item.Owners += data.Owners.ElementAt(i).UserName + ",";
                    }
                }

                // if current user is site admin or data owner
                if (IsOwner || service.GetUserAdminTeams(Session["UserName"].ToString()).Count()>0)
                {
                    item.Editable = true;
                }

                if ((data.Team != null && data.Status.Name == "通过"))
                {
                    //if this tile is Recommend tile
                    if (tileID == SystemDefinedTile.MyReports_Recommended.SystemDefinedTileId)
                        item.Remove = true;

                    //if (data.Subscribers != null && data.Subscribers.Count > 0)
                    //{
                    //    bool isSubscribe = data.Subscribers.Any(c => string.Compare(c.Alias, pageInfo.CurrentUser.Alias, true) == 0);
                    //    if (isSubscribe)
                    //    {
                    //        if (tileID == SystemDefinedTile.MyReports_Recommended.SystemDefinedTileId
                    //            || tileID == SystemDefinedTile.SelfService_Recommended.SystemDefinedTileId)
                    //            item.SubscribeStatus = "Already Subscribed";
                    //        else
                    //            item.SubscribeStatus = "UnSubscribe";
                    //    }
                    //    else
                    //        item.SubscribeStatus = "Subscribe";
                    //}
                    //else
                    //{
                    //    item.SubscribeStatus = "Subscribe";
                    //}
                    item.SubscribeStatus = "订阅";

                    item.RecommendStatus = "推荐";
                }
                else
                {
                    item.SubscribeStatus = null;
                    item.RecommendStatus = null;
                }

                if (tileID == SystemDefinedTile.MyReports_Recommended.SystemDefinedTileId)
                {
                    //foreach (var rec in data.Recommendations)
                    //{
                    //    ReportRecommendViewModel recViewModel = new ReportRecommendViewModel();
                    //    recViewModel.UserName = rec.Recommender.DisplayName;
                    //    recViewModel.Comment = rec.Comment;

                    //    item.RecommendList.Add(recViewModel);
                    //}
                }

                //GetOpenSetting(ref item, data);

                rptList.ReportList.Add(item);
            }

            return rptList;
        }

        private string GetFilter()
        {
            string sitetype = Request["sitetype"];

            string siteGUID = Request["SiteGuid"];

            string searchWords = Request["SearchWords"];


            int tileId = int.Parse(Request["tileId"]);

            //if (tileId == 0)
            //{
            //    TileManager tm = new TileManager();
            //    if (sitetype.ToLower() == "selfservice")
            //    {
            //        tileId = SystemDefinedTile.SelfService_AllBIModels.SystemDefinedTileId;
            //    }
            //    else
            //    {
            //        tileId = SystemDefinedTile.MyReports_AllReports.SystemDefinedTileId;
            //    }
            //}


            string logonUser =Session["UserName"].ToString();
            bool isCurrentSiteAdmin = service.GetUserAdminTeams(Session["UserName"].ToString()).Count() > 0;

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                IReportRepository report_repository = new ReportRepository(context);
                IUserRepository user_repository = new UserRepository(context);
                ITeamRepository team_repository = new TeamRepository(context);
                ICategoryRepository category_repository= new CategoryRepository(context);
                ITagRepository tag_repository = new TeamTagRepository(context);
                ITileRepository tile_repository = new TileRepository(context);
                ITileQueryLogicRepository tile_query_repository = new TileQueryLogicRepository(context);

                EditReportService sa = new EditReportService(report_repository,user_repository,team_repository,category_repository,tag_repository,tile_repository, tile_query_repository);

                FilterListViewModel filterList = new FilterListViewModel();

                #region query filter data
                int DataCount = 0;
                ICollection<Statistics> ls = null;
                switch (sitetype.ToLower())
                {
                    case "teamsite":
                        ls = sa.GetTeamSiteReportsStatistics(tileId, logonUser, siteGUID, isCurrentSiteAdmin);
                        break;
                    case "reportcatalog":
                        break;
                    //case "myreport":
                    //    ls = sa.GetMyReportsStatistics(tileId, logonUser, teamSiteGuidUnderControl);
                    //    break;
                    //case "selfservice":
                    //    ls = sa.GetSelfServiceStatistics(tileId, logonUser, teamSiteGuidUnderControl);
                    //    break;
                    //case "searchreport":
                    //    ls = sa.GetSearchReportsStatistics(logonUser, teamSiteGuidUnderControl, searchWords, out DataCount);
                    //    break;
                    default:
                        break;
                }
                #endregion

                filterList.DataCount = DataCount;

                #region Get Statistics business moel
                foreach (Statistics l in ls)
                {
                    FilterEntityViewModel filterEty = new FilterEntityViewModel();
                    filterEty.FilterType = l.Name;

                    foreach (AttributeValue attr in l.Values)
                    {
                       FilterItem item = new FilterItem();
                        item.Name = attr.Name;
                        item.Value = attr.Value.ToString();
                        item.Count = attr.Count;
                        item.ParentValue = attr.ParentValue;
                        filterEty.FilterItemList.Add(item);
                    }

                    if (!filterEty.FilterType.Equals("Category"))
                    {
                        filterEty.FilterItemList.OrderByDescending(c => c.Count).ThenBy(n => n.Value);
                    }

                    filterList.FilterList.Add(filterEty);
                }

                JavaScriptSerializer jss = new JavaScriptSerializer();
                #endregion

                return jss.Serialize(filterList);
            }
        }
        private void SetAppTitleLogic(string logicString, AppTile appTile)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                TileRepository repository = new TileRepository(context);
                ReportRepository _reportRepository = new ReportRepository(context);

                if (!string.IsNullOrEmpty(logicString))
                {
                    EditReportService reportService = new EditReportService(null, null, null, null, null, null);

                    switch (appTile.logicType)
                    {
                        case LogicType.Static:
                            appTile.BasicLogic = null;
                            break;

                        case LogicType.Selected:
                            List<int> cataIDList = logicString.Split(',').Select(_ => Convert.ToInt32(_)).ToList();
                            appTile.BasicLogic = (new ReportDataId()).In(cataIDList);
                            break;

                        case LogicType.Filtered:
                            ReportFilter filer = new ReportFilter();

                            JavaScriptSerializer jss = new JavaScriptSerializer();

                            #region Deserialize
                            TileFilterListViewModel vm = new TileFilterListViewModel();
                            if (!String.IsNullOrEmpty(logicString))
                                vm = jss.Deserialize<TileFilterListViewModel>(logicString);

                            #endregion

                            #region Get ReportFilter
                            filer.OwnerIdCollection = (from o in vm.Owner select o.Id).ToList();
                            //filer.CatalogTypeIdCollection = (from c in vm.CatelogType select c.Id).ToList();
                            filer.TagsIdCollection = (from t in vm.Tag select t.Id.Value).ToList();
                            filer.SubCategoryIdCollection = (from c in vm.SubCategory select c.Id.Value).ToList();
                            #endregion

                            appTile.BasicLogic = reportService.GenerateLogicByFilter(filer);
                            break;

                        case LogicType.Tagged:
                            List<int> tagIds = logicString.Split(',').Select(i => int.Parse(i.Trim())).ToList();
                            appTile.BasicLogic = (new TagId()).In(tagIds);
                            break;

                        case LogicType.AllReports:
                            appTile.BasicLogic = null;
                            break;
                    }
                }
                else
                {
                    appTile.BasicLogic = null;
                }
            }
        }

    }
}