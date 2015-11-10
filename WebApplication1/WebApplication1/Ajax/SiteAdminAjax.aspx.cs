using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1.ManageSite;

namespace WebApplication1.Ajax
{
    public partial class SiteAdminAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request["requestType"] == "savetree")
            {
                Response.Write(SaveTeamHiearchyTree());
            }

            if (Request["requestType"] == "getteamssingle")
            {
                Response.Write(GetTeamsAvailable());
            }
            if (Request["requestType"] == "getdivisions")
            {
                Response.Write(GetDivisions());
            }

            if (Request["requestType"] == "addteam")
            {
                Response.Write(AddTeamSite());
            }

            if (Request["requestType"] == "getteams")
            {
                Response.Write(GetTeams());
            }
            if (Request["requestType"] == "addcategory")
            {
                Response.Write(AddCategory());
            }
            if (Request["requestType"] == "getcategory")
            {
                Response.Write(GetCategories(Request["parentonly"]));
            }
            if (Request["requestType"] == "getallcategory")
            {
                Response.Write(GetAllCategories());
            }
            if (Request["requestType"] == "addusefullinks")
            {
                Response.Write(AddUsefulLinks());
            }
            if (Request["requestType"] == "getusefullinks")
            {
                Response.Write(GetUsefulLinks(Request["parentOnly"]));
            }
            if (Request["requestType"] == "getallsegments")
            {
                Response.Write(GetAllSegments());
            }
        }


        private string SaveTeamHiearchyTree()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<IEnumerable<AppDivisions>>(Request["queryParam"]);


            if (paramDes != null)
            {
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    ITeamRepository teamRepository = new TeamRepository(context);
                    

                    ISegmentRepository segRepository = new SegmentRepository(context);
                   

                    // Remove current structure from the database scheme level
                    IDivisionRepository repository = new DivisionRepository(context);

                    AppDivisionSegmentsService service = new AppDivisionSegmentsService(teamRepository, segRepository, repository);
                    #region Submit the new changes
                  return jss.Serialize(service.SaveTeamSiteHierarchy(paramDes));

                    #endregion
                }
            }

            return null;
        }
        private string GetCategories(string parentCategoryOnly)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ICategoryRepository repository = new CategoryRepository(context);
                CategoryService manager = new CategoryService(repository);

                if (parentCategoryOnly == "1")
                {
                    return jss.Serialize(manager.GetAllCategories(CategoryTypeEnum.ParentOnly));
                }
                else if (parentCategoryOnly == "0")
                {
                    return jss.Serialize(manager.GetAllCategories(CategoryTypeEnum.ChildOnly));
                }
                else
                {
                    throw new ArgumentException("Could only get parent or child categories by this method");
                }
            }
        }
        private string GetAllCategories() {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ICategoryRepository repository = new CategoryRepository(context);
                CategoryService manager = new CategoryService(repository);

               return jss.Serialize(manager.GetAllCategories(CategoryTypeEnum.All));
            }
        }
        private string GetUsefulLinks(string parentOnly)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                IUsefulLinksRepository repository = new UsefulLinksRepository(context);
                UsefulLinksService manager = new UsefulLinksService(repository);

                if (parentOnly == "1")
                {
                    return jss.Serialize(manager.GetAllUsefulLinks(UsefulLinksTypeEnum.ParentOnly));
                }
                else if (parentOnly == "0")
                {
                    return jss.Serialize(manager.GetAllUsefulLinks(UsefulLinksTypeEnum.ChildOnly));
                }
                else
                {
                    throw new ArgumentException("Could only get parent or child categories by this method");
                }
            }
        }
        private string AddCategory()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<IEnumerable<AppCategory>>(Request["queryParam"]);
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ICategoryRepository repository = new CategoryRepository(context);
                CategoryService manager = new CategoryService(repository);
                return jss.Serialize(manager.Update(paramDes, int.Parse(Request["categoryType"])));
            }
        }

        private string AddUsefulLinks()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<IEnumerable<AppUsefulLinks>>(Request["queryParam"]);
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                IUsefulLinksRepository _linkRepo = new UsefulLinksRepository(context);
                UsefulLinksService manager = new UsefulLinksService(_linkRepo);

                return jss.Serialize(manager.Update(paramDes, int.Parse(Request["linkType"])));
            }
        }

        private string AddTeamSite()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<TeamParameter>(Request["queryParam"]);

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ITeamRepository repository = new TeamRepository(context);
                IUserRepository userRepository = new UserRepository(context);

                TeamAppService teamService = new TeamAppService(repository, userRepository);

                return jss.Serialize(teamService.Update(paramDes.Teams));
            }
        }

        private string GetTeams()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            TeamParameter param = new TeamParameter();

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ITeamRepository teamRepository = new TeamRepository(context);

                TeamAppService teamManager = new TeamAppService(teamRepository);
                param.Teams = teamManager.GetAllTeamSites();
                return jss.Serialize(param);
            }
        }

        public string GetDivisions()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                IDivisionRepository divisionRepository = new DivisionRepository(context);

                AppDivisionSegmentsService service = new AppDivisionSegmentsService(divisionRepository);
                IEnumerable<AppDivision> divisions = service.GetAllDivisions();
                AppDivisions results = new AppDivisions() { title = "所有分类", tooltip = "divisions", key = "root", isFolder = true, children = divisions };
                var str = jss.Serialize(results);
                return jss.Serialize(results);
            }
        }

        public string GetTeamsAvailable()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                ITeamRepository divisionRepository = new TeamRepository(context);

                TeamAppService service = new TeamAppService(divisionRepository);
                IEnumerable<AppTeamSite> divisions = service.GetAllSingleTeams();
                return jss.Serialize(divisions);
            }
        }

        public string GetAllSegments() { 
        
           JavaScriptSerializer jss = new JavaScriptSerializer();
           using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
           {
               ITeamRepository teamRepository = new TeamRepository(context);
               ISegmentRepository segRepository = new SegmentRepository(context);


               // Remove current structure from the database scheme level
               IDivisionRepository repository = new DivisionRepository(context);

               AppDivisionSegmentsService service = new AppDivisionSegmentsService(teamRepository, segRepository, repository);

               var segments = service.GetAllSegments();
               // Divid all the segments into array
               int len = segments.Count/6==0?segments.Count:segments.Count+1;

               AppSegment[][] array = new AppSegment[len][];
               for (int i = 0; i < 6; i++) {
                   array[i] = new AppSegment[] { };
               }
                   return jss.Serialize(segments);
           }
        }
    }

}