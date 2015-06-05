using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Teams.Aggregates.ReportStatus;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;

namespace Infrastructor.MainBoundedContext.Repositories.TeamAdmin
{
    public class TeamStatusRepository : Repository<Status>, IStatusRepository
    {
        public TeamStatusRepository(MainDBUnitWorkContext _unitOfWork)
            : base(_unitOfWork)
        { 
        
        }

        public IEnumerable<Status> GetStatusByUserRole(int roleId)
        {
            if (roleId == 1)
            {
                return this.GetAll();
            }
            else return this.GetFiltered(_ => _.Name == "等待审批");
        }
    }
}
