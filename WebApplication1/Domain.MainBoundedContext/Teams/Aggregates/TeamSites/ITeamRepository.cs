using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams.Aggregates.TeamSites
{
    public interface ITeamRepository : IRepository<TeamSite>
    {
        IEnumerable<TeamSite> GetAllTeams();

        bool RelateTeamSiteWithSegement(Guid teamGuid, int segmentId);
        bool UnrelateTeamSitesWithSegment();


    }
}
