using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
//using Microsoft.MSIT.ECO.UnifiedReporting.Domain.MainBoundedContext.ReportModule.Aggregates.ReportCatalogAgg;


namespace Domain.MainBoundedContext.Logics
{
    public interface INotIN<T>
    {
        NotIN<T> NotIn(IEnumerable<T> values);
        NotIN<T> NotIn(Constant<IEnumerable<T>> value);
        NotIN<T> NotIn(Parameter<IEnumerable<T>> value);
        Expression<Func<Entity, Boolean>> GetNotINExpression(IEnumerable<T> values);
    }
}
