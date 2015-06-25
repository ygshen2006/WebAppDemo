using Application.MainBoundedContect.ViewModel.Users;
using System;
using System.Collections.Generic;

using Domain.MainBoundedContext.Tiles.Aggregates;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Reports.Aggregates;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Application.MainBoundedContect.ViewModel.Report;
using Application.MainBoundedContect.ViewModel.Tiles;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
    public class AppTeamSite
    {
        public int? Id { get; set; }
        public string TeamName { get; set; }
        public string TeamDescription { get; set; }
        public string TeamOwners { get; set; }
        public ICollection<UserLoginApp> TeamOwnerObjectList { get; set; }
        public ICollection<AppReport> teamReports { get; set; }
        public ICollection<AppTeamTag> Tags { get; set; }
        public ICollection<AppTile> Tiles { get; set; }
        public AppSegment Segment { get; set; }
        public string TeamLogo { get; set; }
        public Guid TeamGuid { get; set; }
        public string CreatedDate { get; set; }
        public int TeamIntrestId { get; set; }

       
        public AppTeamSite() {
            TeamOwnerObjectList = new List<UserLoginApp>();
        }
    }
}
