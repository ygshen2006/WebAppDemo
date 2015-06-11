using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.SiteAdmin
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository() : base(new MainDBUnitWorkContext()) { }
        public CategoryRepository(MainDBUnitWorkContext context)
            : base(context)
        {

        }
        public IEnumerable<Category> GetAllCategories()
        {
            return this.GetAll();
        }
        public IEnumerable<Category> GetParentCategories()
        {
            return this.GetAll().Where(_ => _.CategoryParentId.HasValue == false);
        }
        public IEnumerable<Category> GetChildCategories()
        {
            var temp = this.GetAll(true).Where(_ => _.CategoryParentId.HasValue == true);
            return temp;
        }

    }
}
