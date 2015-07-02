using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Logics;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public class ReportTitle : ISortableField
    {
        public Expression<Func<Report, String>> GetSortExpression()
        {
            Expression<Func<Report, String>> exp = _ => _.Title;
            return exp;
        }
    }
}
