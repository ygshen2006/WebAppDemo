using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.SiteAdmin
{
    public class TeamRepository : Repository<TeamSite>, ITeamRepository
    {
        public TeamRepository():base(new MainDBUnitWorkContext())
        { }
        public TeamRepository(MainDBUnitWorkContext _unitOfWork):base(_unitOfWork) {
        }
        public IEnumerable<TeamSite> GetAllTeams()
        {
            return this.GetAll();
        }

        public bool RelateTeamSiteWithSegement(Guid teamGuid, int segmentId) {
            var team = this.GetAll(true).Where(_ => _.TeamGuid == teamGuid).FirstOrDefault();
            team.SegmentId = segmentId;
            
            this.Modify(team);

            return true;
        }

        public bool UnrelateTeamSitesWithSegment() {
            var allRelatedTeams = this.GetAll(true).Where(_ => _.Segment != null).ToList<TeamSite>();
            
            foreach (var t in allRelatedTeams) {
                t.Segment = null;
                this.Modify(t);
            }
            return true;
        }
    }
}
