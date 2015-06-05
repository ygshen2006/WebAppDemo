using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.SeedWork;

namespace Domain.MainBoundedContext.Teams.Aggregates.ReportStatus
{
   public interface IStatusRepository: IRepository<Status>
    {
       IEnumerable<Status> GetStatusByUserRole(int roleId);
    }
}
