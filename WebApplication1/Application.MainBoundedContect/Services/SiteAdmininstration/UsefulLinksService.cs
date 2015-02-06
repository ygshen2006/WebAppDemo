using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.Enums;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
namespace Application.MainBoundedContect.Services.SiteAdmininstration
{
    public class UsefulLinksService
    {
        private IUsefulLinksRepository _linksRepose;
        public UsefulLinksService() { }
        public UsefulLinksService(IUsefulLinksRepository repos)
        {
            _linksRepose = repos;
        }
        // Get all categories
        public IEnumerable<AppUsefulLinks> GetAllUsefulLinks(UsefulLinksTypeEnum type)
        {
            IEnumerable<AppUsefulLinks> results = null;


            switch (type)
            {
                case UsefulLinksTypeEnum.ParentOnly:
                    results = _linksRepose.GetAllUsefulLinks().Where(_ => _.ParentUsefulLink == null).Select(_ => _.ToAppUsefulLinks(type));
                    break;
                case UsefulLinksTypeEnum.ChildOnly:
                    results = _linksRepose.GetAllUsefulLinks().Where(_ => _.ParentUsefulLink != null).Select(_ => _.ToAppUsefulLinks(type));
                    break;
                case UsefulLinksTypeEnum.All:
                    results = _linksRepose.GetAllUsefulLinks().Select(_=>_.ToAppUsefulLinks(type));
                    break;
            }



            return results;
        }
        // Update(add/modify)
        public string Update(IEnumerable<AppUsefulLinks> models, int type)
        {
            if (models.Count() == 0)
            {
                if (type == 0)
                {
                    // Delete all the child
                    foreach (var i in _linksRepose.GetChildUsefulLinks())
                    {
                        _linksRepose.Remove(i);
                    }
                }
                else
                {
                    // Delete all the child
                    foreach (var i in _linksRepose.GetParentUsefulLinks())
                    {
                        _linksRepose.Remove(i);
                    }
                }
            }

            else
            {
                foreach (var model in models)
                {
                    UsefulLinks cat = model.ToUsefulLinks();

                    IEnumerable<UsefulLinks> deletedItems;

                    if (model.ParentId.HasValue)
                    {
                        deletedItems = _linksRepose.GetChildUsefulLinks().Where(l => !models.Where(_ => _.Id.HasValue).Select(_ => _.Id).Contains(l.Id));
                    }
                    else
                    {
                        deletedItems = _linksRepose.GetParentUsefulLinks().Where(l => !models.Where(_ => _.Id.HasValue).Select(_ => _.Id).Contains(l.Id));
                    }

                    if (deletedItems != null && deletedItems.Count() > 0)
                    {
                        foreach (var item in deletedItems)
                        {
                            _linksRepose.Remove(item);
                        }
                    }

                    if (model.Id.HasValue)
                    {
                        var temp = _linksRepose.Get(cat.Id);
                        temp.LinkName = model.LinkName;
                        temp.URL = model.URL;
                        temp.ParentId = model.ParentId;
                    }
                    else
                    {
                        _linksRepose.Add(cat);
                    }
                }
            }
            _linksRepose.UnitOfWork.Commit();
            return "success";
        }
    }

}
