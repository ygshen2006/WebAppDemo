using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Reports;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
    public class AppTeamSite
    {
        public int? Id { get; set; }
        public string TeamName { get; set; }
        public string TeamDescription { get; set; }
        public string TeamOwners { get; set; }
        public ICollection<UserLoginApp> TeamOwnerObjectList { get; set; }
        public AppSegment Segment { get; set; }
        public string TeamLogo { get; set; }
        public Guid TeamGuid { get; set; }
        public string CreatedDate { get; set; }
        public int TeamIntrestId { get; set; }

        public ICollection<Tag> Tags;
        public ICollection<Report> ReportsRelated;
        public ICollection<Tile> Tiles;
        public AppTeamSite() {
            TeamOwnerObjectList = new List<UserLoginApp>();
        }
    }
}
