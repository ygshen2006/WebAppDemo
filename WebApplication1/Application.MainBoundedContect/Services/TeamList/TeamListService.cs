using Domain.MainBoundedContext.Teams.Aggregates.TeamList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Services.TeamList
{
   public class TeamListService
    {
       private ITeamListRepository _teamSiteListRepository;
       public TeamListService(ITeamListRepository teamSiteListRepository)
       {
           _teamSiteListRepository = teamSiteListRepository;
       }

    }
}
