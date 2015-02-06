using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams.Aggregates.Category
{
   public interface ICategoryRepository: IRepository<Category>
    {
       IEnumerable<Category> GetAllCategories();
       IEnumerable<Category> GetParentCategories();
       IEnumerable<Category> GetChildCategories();
    }
}
