using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Application.MainBoundedContect.Services.Report;
using Application.MainBoundedContect.ViewModel.Report;
using Infrastructor.MainBoundedContext.Repositories.Reports;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.TeamAdmin;
using Infrastructor.MainBoundedContext.Repositories.Tiles;

namespace WebApplication1.Ajax
{
    public partial class AddNewReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["requestType"] == "uploadarticle")
            {
                Response.Write(UploadNewArticle());
            }
            if (Request["requestType"] == "getteamallarticles")
            {
                Response.Write(GetArticles());
            }
            if (Request.Params["queryType"] == "getadmintilereport")
            {
                // get all the report
                Response.Write(GetAdminReportFromCurrentTeamSite());
            }
        }


        private string UploadNewArticle()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<AppReport>(Request.Params["articleData"]);

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ReportRepository repository = new ReportRepository(context);
                UserRepository uRepository = new UserRepository(context);
                TeamRepository tRepository = new TeamRepository(context);
                CategoryRepository cRepository = new CategoryRepository(context);
                TeamTagRepository tagRepository = new TeamTagRepository(context);
                TileRepository tileRepository = new TileRepository(context);
                EditReportService service = new EditReportService(repository, uRepository, tRepository, cRepository, tagRepository, tileRepository);
                service.AddReport(paramDes);
            }
            return "";
        }
        private string GetAdminReportFromCurrentTeamSite() {
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
               var reports =  service.GetAllReportsOfTeamSite(Session["UserName"].ToString(), teamGuid, true,global::Application.MainBoundedContect.Enums.SortField.ReportTitle,
                    global::Application.MainBoundedContect.Enums.SortOrder.ASC);

               JavaScriptSerializer jss = new JavaScriptSerializer();
               return jss.Serialize(reports);
            }

        }

        private string GetArticles()
        {
            return null;
        }
    }
}