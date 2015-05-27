using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.TeamSites;
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
                  TeamSiteId=tag.TeamId
            };
        }

    }
}
