using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks
{
   public interface IUsefulLinksRepository: IRepository<UsefulLinks>
    {
       IEnumerable<UsefulLinks> GetAllUsefulLinks();
       IEnumerable<UsefulLinks> GetParentUsefulLinks();
       IEnumerable<UsefulLinks> GetChildUsefulLinks();
    }
}
