using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Application.MainBoundedContect.ViewModel.Users;

namespace Application.MainBoundedContect.ViewModel.Report
{
    public class AppReport
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public AppStatus Status { get; set; }
        public List<AppTeamTag> Tags { get; set; }
        public List<UserLoginApp> Owners { get; set; }
        public AppTeamSite Team { get; set; }
        public List<AppCategory> Categories { get; set; }
        public string Content { get; set; }

        public string[] Images { get; set; }
    }
}
