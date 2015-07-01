//using Microsoft.MSIT.ECO.UnifiedReporting.Domain.MainBoundedContext.ReportModule.Aggregates.ReportCatalogAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Logics
{
    public interface ISortableField
    {
        Expression<Func<Report, String>> GetSortExpression();
    }
}
