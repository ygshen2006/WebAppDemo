using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Extentions
{
    public static class UsefulLinksExtention
    {
        public static AppUsefulLinks ToAppUsefulLinks(this UsefulLinks link, UsefulLinksTypeEnum type)
        {
            if (type == UsefulLinksTypeEnum.ParentOnly)
            {
                return new AppUsefulLinks()
                {
                    Id = link.Id,
                    LinkName = link.LinkName,
                    ChildLinks = link.Childs.Select(_ => new AppUsefulLinks() { LinkName = _.LinkName, ParentId = _.ParentId, URL = _.URL, Id = _.Id, ParentLink = new AppUsefulLinks() { Id = _.ParentId.GetValueOrDefault(), LinkName = _.LinkName, URL = _.URL } }),
                    URL = link.URL
                };
            }
            else if (type == UsefulLinksTypeEnum.ChildOnly)
            {
                return new AppUsefulLinks()
                {
                    Id = link.Id,
                    LinkName = link.LinkName,
                    ParentId = link.ParentId,
                    ParentLink = new AppUsefulLinks() { Id = link.ParentId, URL = link.ParentUsefulLink.URL, LinkName = link.ParentUsefulLink.LinkName, ChildLinks = link.Childs.Select(_ => new AppUsefulLinks() { Id = _.Id, LinkName = _.LinkName, URL = _.URL }) },
                    URL = link.URL
                };
            }
            else
            {
                return new AppUsefulLinks()
                {
                    Id = link.Id,
                    LinkName = link.LinkName,
                    ChildLinks = link.Childs==null? null: link.Childs.Select(_ => new AppUsefulLinks() { LinkName = _.LinkName, ParentId = _.ParentId, URL = _.URL, Id = _.Id, ParentLink = new AppUsefulLinks() { Id = _.ParentId.GetValueOrDefault(), LinkName = _.LinkName, URL = _.URL } }),

                    URL = link.URL
                };
            }
        }

        public static UsefulLinks ToUsefulLinks(this AppUsefulLinks cat)
        {

            return new UsefulLinks()
            {
                Id = cat.Id.GetValueOrDefault(),
                LinkName = cat.LinkName,
                ParentId = cat.ParentId,
                URL = cat.URL
            };

        }
    }
}
