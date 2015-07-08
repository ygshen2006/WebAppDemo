using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;

namespace Application.MainBoundedContect.ViewModel.TeamSites
{
    public class SegmentTeamModel
    {
        public int SegmentId { get; set; }
        public string SegmentName { get; set; }
        public List<TeamSiteModel> TeamSites { get; set; }
        public List<SegmentTeamModel> ChildSegments { get; set; }

        public SegmentTeamModel() {
            TeamSites = new List<TeamSiteModel>();
            ChildSegments = new List<SegmentTeamModel>();
        }
    }

   public class TeamSiteModel {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public string TeamGuid { get; set; }
        public string TeamLogo { get; set; }
    }

}
