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

                if (Request["requestType"] == "searchteams") {
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


                    Response.Write(GetAdminTileFilterInfo(userName,teamGuid,isAdmin));
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
                IUserRepository _userRepository=new UserRepository(context);

                TileServices tileService = new TileServices(_tileRepository, _teamRepository, _reportRepository, _userRepository,_tagRepository,_categoryRepository);

                //Owner
                IEnumerable<UserLoginApp> userList = tileService.GetOwnerList(userName, teamGuid, isAdmin);
                filterViewModel.Owner = userList.OrderBy(_ => _.UserName);


                //Category
                IEnumerable<AppCategory> categoryList = tileService.GetCategoryList();
                filterViewModel.SubCategory = categoryList.OrderBy(_ => _.CategoryName);


                //Tag
                IEnumerable<AppTeamTag> tagList = tileService.GetTagListByTeam(teamGuid);
                filterViewModel.Tag = tagList;
            }



            return jss.Serialize(filterViewModel);
        }
    }
}