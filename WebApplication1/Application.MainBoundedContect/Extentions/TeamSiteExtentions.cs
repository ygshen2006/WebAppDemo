using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Tiles.Aggregates;
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

        public static TeamSite ToTeamSite(this AppTeamSite team)
        {
            return new TeamSite()
            {
                Id = team.Id.GetValueOrDefault(),
                TeamName = team.TeamName,
                TeamDescription = team.TeamDescription,
                CreatedDateTime = DateTime.Parse(team.CreatedDate),
                TeamGuid = team.TeamGuid,
                TeamLogo = team.TeamLogo
                /***** For the related objects we shall add them before where the method is called ******/
                //TeamOwners = team.TeamOwnerObjectList == null ? null : team.TeamOwnerObjectList.Select(_=>_.ToUser()).ToList<User>(),
                //Tags =team.Tags==null?null:team.Tags.Select(_=>_.ToTeamTag()).ToList<Tag>(),
                //Reports =team.teamReports==null?null:team.teamReports.Select(_=>_.ToReport()).ToList<Report>(),
                //Tiles =team.Tiles==null?null: team.Tiles.Select(_=>_.ToTile()).ToList<Tile>(),
                //Segment = team.Segment==null? null:team.Segment.ToSegement()
            };
        }
    }
}
