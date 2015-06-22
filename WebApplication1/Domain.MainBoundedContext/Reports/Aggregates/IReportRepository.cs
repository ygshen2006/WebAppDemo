using Domain.MainBoundedContext.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public interface IReportRepository
    {
         void AddReport(Report r);
         void UpdateReport(Report r);
         void RemoveReport(Report r);
         IQueryable<Report> GetReportsByExpression(Expression<Func<Report, Boolean>> filterExpression);
         IQueryable<Report> GetReportByLogic(Logic logic, ParameterProvider parameterProvider);
    }
}
