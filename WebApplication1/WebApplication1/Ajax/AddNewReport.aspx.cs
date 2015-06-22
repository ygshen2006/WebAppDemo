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
       
        private string GetArticles()
        {
            return null;
        }
    }
}