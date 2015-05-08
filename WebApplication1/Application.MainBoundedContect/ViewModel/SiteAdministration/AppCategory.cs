using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
    public class AppCategory
    {
        public int? Id { get; set; }
        public string CategoryName { get; set; }

        public int? ParentId { get;set;}
        public AppCategory ParentCategory { get; set; }


        public int ChildCount { get; set; }

        public IEnumerable<AppCategory> ChildCategories { get; set; }
        public IEnumerable<TeamSite> TeamSites;
        public IEnumerable<Report> Reports;
        public AppCategory()
        {
            TeamSites = new List<TeamSite>();
            Reports = new List<Report>();
            ChildCategories = new List<AppCategory>();
        }
    }
}
