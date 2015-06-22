using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System.Linq.Expressions;
using Domain.MainBoundedContext.Logics;

namespace Infrastructor.MainBoundedContext.Repositories.Reports
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        MainDBUnitWorkContext _context = null;

        public ReportRepository() : base(new MainDBUnitWorkContext()) { }
        public ReportRepository(MainDBUnitWorkContext context)
            : base(context)
        {
            _context = context;
        }


        public void AddReport(Domain.MainBoundedContext.Reports.Aggregates.Report r)
        {
            this.Add(r);
            this.UnitOfWork.Commit();
        }

        public void UpdateReport(Domain.MainBoundedContext.Reports.Aggregates.Report r)
        {
            throw new NotImplementedException();
        }

        public void RemoveReport(Domain.MainBoundedContext.Reports.Aggregates.Report r)
        {
            throw new NotImplementedException();
        }


        public IQueryable<Report> GetReportsByExpression(System.Linq.Expressions.Expression<Func<Report, bool>> filterExpression)
        {
            IQueryable<Report> query = null;

            query = _context.Reports.Where(filterExpression);
            
            return query;
        }

        public IQueryable<Report> GetReportByLogic(Logic logic, ParameterProvider parameterProvider)
        {
            Expression<Func<Report, Boolean>> filterExpression = logic.GetExpression(parameterProvider);

            IQueryable<Report> query = GetReportsByExpression(filterExpression);

            return query;
        }
    }
}
