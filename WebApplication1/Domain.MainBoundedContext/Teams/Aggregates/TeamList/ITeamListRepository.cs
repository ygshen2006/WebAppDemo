using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams.Aggregates.TeamList
{
    public interface ITeamListRepository : IRepository<TeamSiteTile>
    {
        IEnumerable<TeamSiteTile> GetAllTeamTiles();
    }
}
