using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public interface IReportRepository
    {
         void AddReport(Report r);
         void UpdateReport(Report r);
         void RemoveReport(Report r);
    }
}
