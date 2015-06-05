using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Teams.Tags;

namespace Application.MainBoundedContect.Extentions
{
    public static class TeamTagExtension
    {
        public static AppTeamTag ToAppTeamTag(this Tag tag)
        {
            return new AppTeamTag()
            {
                Id = tag.Id,
                TeamGuid = tag.TeamSite.TeamGuid.ToString(),
                Title = tag.TagName
            };
        }
        public static Tag ToTeamTag(this AppTeamTag tag)
        {
            return new Tag()
            {
                Id = tag.Id.GetValueOrDefault(),
                TagName = tag.Title,
                TeamSiteId = tag.TeamId
            };
        }


        public static AppStatus ToAppStatus(this Status stat)
        {
            return new AppStatus()
            {
                Id = stat.Id,
                Name = stat.Name
            };
        }

        public static Status ToStatus(this AppStatus stat)
        {
            return new Status()
            {
                Id = stat.Id.GetValueOrDefault(),
                Name = stat.Name
            };
        }

    }
}
