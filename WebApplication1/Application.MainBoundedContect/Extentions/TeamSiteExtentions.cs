using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Extentions
{
    public static class TeamSiteExtentions
    {
        public static AppTeamSite ToAppTeamSite(this TeamSite team)
        {
            return new AppTeamSite()
            {
                Id = team.Id,
                TeamDescription = team.TeamDescription,
                CreatedDate = team.CreatedDateTime.ToShortDateString(),
                TeamGuid = team.TeamGuid,
                Segment=team.Segment==null? null:team.Segment.ToAppSegement(),
                
                TeamLogo = team.TeamLogo,
                TeamName = team.TeamName,
            };
        }

        public static TeamSite ToTeamSite(this AppTeamSite team, IUserRepository userRepository)
        {
            return new TeamSite()
            {
                Id = team.Id.GetValueOrDefault(),
                TeamName = team.TeamName,
                TeamDescription = team.TeamDescription,
                CreatedDateTime = DateTime.Parse(team.CreatedDate),
                TeamGuid = team.TeamGuid,
                TeamLogo = team.TeamLogo,
                TeamOwners = team.TeamOwnerObjectList == null ? null : team.TeamOwnerObjectList.Select(_ => userRepository.GetUserByName(_.UserName)).ToList<User>(),
                Tags = team.Tags,
                //Reports = team.ReportsRelated,
                Tiles = team.Tiles
            };
        }
    }
}
