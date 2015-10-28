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


            if (Request["requestType"] == "gettagrelatedarticles")
            {
                Response.Write(GetArticlesByTagId());
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

                // This report
                var report = service.GetReportById(id);

                var category = report.Categories.Select(_=>_.Id.GetValueOrDefault()).ToList<int>();
                
                // Other reports
                var otherReportsTemp = service.
                    GetReportsOfTeamSiteByCategory(userAlias, teamGuid, true, category, global::Application.MainBoundedContect.Enums.SortField.ReportTitle, global::Application.MainBoundedContect.Enums.SortOrder.ASC).Where(_=>_.Id.Value!=id).ToList<AppReport>();

                // Assemble the reports information
                var thisReport = new ReportItem()
                {
                    ReportTags=report.Tags,
                    ID = report.Id.Value,
                    ReportFeaturePics=report.Images,
                    ReportDescription = report.Description,
                    ReprotContent=report.Content,
                    ReportName = report.Title,
                    ReprotStatus = report.Status.Name,
                    ReportOwners = report.Owners.Select(_ => new OwnerClass{ Id=_.Id, Email=_.UserEmail, UserName=_.UserName }).ToList<OwnerClass>()
                };

                var otherReports=otherReportsTemp.Select(report1=>new ReportItem()
                {
                    ID = report1.Id.Value,
                    ReportDescription = report1.Description,
                    ReportName = report1.Title,
                    ReprotStatus = report1.Status.Name,
                    ReportOwners = report1.Owners.Select(_ => new OwnerClass{ Id=_.Id, Email=_.UserEmail, UserName=_.UserName }).ToList<OwnerClass>()
                });

                QueryParameterReportSearch reports = new QueryParameterReportSearch() { ThisReport = thisReport, OtherReports = otherReports == null ? null : otherReports.ToList<ReportItem>() };

                // Return the search result
                return jss.Serialize(reports);
            }

        }

        private string GetArticlesByTagId() {
            int tagId =int.Parse(Request.QueryString["tagid"]);
            string teamId = Request.QueryString["teamid"];
            JavaScriptSerializer jss = new JavaScriptSerializer();

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

                var services = service.GetReportsOfTeamSiteByTagId(userAlias, teamId, true, tagId, global::Application.MainBoundedContect.Enums.SortField.ReportTitle, global::Application.MainBoundedContect.Enums.SortOrder.ASC);

                var otherReports = services.Select(report1 => new ReportItem()
                {
                    ID = report1.Id.Value,
                    ReportDescription = report1.Description,
                    ReportName = report1.Title,
                    ReprotStatus = report1.Status.Name,
                    ReportFeaturePics=report1.Images,
                    ReportOwners = report1.Owners.Select(_ => new OwnerClass { Sex=_.Sex, Id = _.Id, Email = _.UserEmail, UserName = _.UserName, UserPhoto=_.UserPhoto }).ToList<OwnerClass>()
                });

                return jss.Serialize(otherReports);
            }
        }
        private string GetArticles()
        {
            return null;
        }
    }
}