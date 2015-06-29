using Application.MainBoundedContect.Services.SiteAdmininstration;
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
using WebApplication1.Models;

namespace WebApplication1.Ajax
{
    public partial class TeamAdminAjax : System.Web.UI.Page
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();

        protected void Page_Load(object sender, EventArgs e)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                UserRepository up = new UserRepository(context);
                UserService service = new UserService(up);

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
            // Get the post data
            if (Request["queryParam"] == null)
            {
                output = "Querystring:queryParameter is empty!";
            }
            string teamGuid = Request["SiteGuid"];
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<QueryParameterViewModel>(Request["queryParam"]);

            int tileId = int.Parse(paramDes.TileId);


            // Get the reports from the reports list
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ReportRepository rep = new ReportRepository(context);
                TileRepository tileRep = new TileRepository(context);

                TileServices tService = new TileServices(tileRep, null, null, null, null, null, null);

                var tile = tService.GetTileById(tileId);

                EditReportService editReport = new EditReportService(rep, null, null, null, null, null);

                // TO-DO: Team admin is set to true
                var reports = editReport.GetReportsByTileId(tile, Session["UserName"].ToString(), true, teamGuid, SortField.ReportTitle, SortOrder.ASC);
                int a = reports.Count();
                var d = reports.ToList<AppReport>();
                output = jss.Serialize(d);
                return output;
            }

            //var requiredReport = returnedReport.ReportItemList.Where(_ => _.TileId == tileId).ToList();
            //ReportListModel returnedReportsListModel = new ReportListModel();
            //foreach (var temp in requiredReport)
            //{
            //    returnedReportsListModel.ReportItemList.Add(temp);
            //}
            //output = jss.Serialize(returnedReportsListModel);

            //return output;
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