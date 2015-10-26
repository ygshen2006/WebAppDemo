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
using Application.MainBoundedContect.ViewModel.Tiles;
using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Services.Tile;
using Application.MainBoundedContect.Services.TeamAdmin;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using WebApplication1.Models;

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


            if (Request["requestType"] == "getarticlebyid")
            {
                Response.Write(GetArticlesByID());
            }
        }


        private string UploadNewArticle()
        {
            int newAddedReportId=-1;
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
               newAddedReportId = service.AddReport(paramDes);
            }
            return "{\"id\":\""+newAddedReportId+"\"}";
        }

        private string GetArticlesByID()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<QueryParameterReport>(Request.Params["queryParam"]);
            int id = paramDes.articleid;
            string teamGuid = paramDes.teamguid;

            string userAlias =Session["UserName"].ToString();
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ReportRepository repository = new ReportRepository(context);
                UserRepository uRepository = new UserRepository(context);
                TeamRepository tRepository = new TeamRepository(context);
                CategoryRepository cRepository = new CategoryRepository(context);
                TeamTagRepository tagRepository = new TeamTagRepository(context);
                TileRepository tileRepository = new TileRepository(context);
                EditReportService service = new EditReportService(repository, uRepository, tRepository, cRepository, tagRepository, tileRepository);

                var report = service.GetReportById(id);

                var category = report.Categories.Select(_=>_.Id.GetValueOrDefault()).ToList<int>();
                
                var otherReports = service.
                    GetReportsOfTeamSiteByCategory(userAlias, teamGuid, true, category, global::Application.MainBoundedContect.Enums.SortField.ReportTitle, global::Application.MainBoundedContect.Enums.SortOrder.ASC);


                return jss.Serialize(service.GetReportById(id));
            }

        }
       
        private string GetArticles()
        {
            return null;
        }
    }
}