using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;
using Domain.MainBoundedContext.Reports.Aggregates;
//using Microsoft.MSIT.ECO.UnifiedReporting.Domain.MainBoundedContext.ReportModule.Aggregates.ReportCatalogAgg;


namespace Domain.MainBoundedContext.Logics
{
    public interface IIN<T>
    {
        IN<T> In(IEnumerable<T> values);
        IN<T> In(Constant<IEnumerable<T>> value);
        IN<T> In(Parameter<IEnumerable<T>> value);
        Expression<Func<Report, Boolean>> GetINExpression(IEnumerable<T> values);
    }
}
