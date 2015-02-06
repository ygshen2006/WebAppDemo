using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.SiteAdmin
{
    public class UsefulLinksRepository : Repository<UsefulLinks>, IUsefulLinksRepository
    {
        public UsefulLinksRepository() : base(new MainDBUnitWorkContext()) { }
        public UsefulLinksRepository(MainDBUnitWorkContext context)
            : base(context)
        {

        }
        public IEnumerable<UsefulLinks> GetAllUsefulLinks()
        {
            return this.GetAll();
        }
        public IEnumerable<UsefulLinks> GetParentUsefulLinks()
        {
            return this.GetAll().Where(_ => _.ParentUsefulLink == null);
        }
        public IEnumerable<UsefulLinks> GetChildUsefulLinks()
        {
            return this.GetAll().Where(_ => _.ParentUsefulLink!= null);
        }

    }
}
