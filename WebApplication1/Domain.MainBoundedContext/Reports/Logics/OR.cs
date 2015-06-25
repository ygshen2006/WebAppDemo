using Domain.SeedWork;
using LinqKit;
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
    public class OR : Logic, IParentLogic
    {
        public OR()
        {
            LogicElements = new List<Logic>();
        }

        /// <summary>
        /// Add child to OR, return OR itself
        /// </summary>
        /// <param name="logic">logic to be OR</param>
        /// <returns>object itself</returns>
        public OR AddElement(Logic logic)
        {
            this.LogicElements.Add(logic);
            return this;
        }

        public List<Logic> LogicElements { get; set; }

        public Boolean HasChildren()
        {
            if (LogicElements != null && LogicElements.Count() > 0)
            {
                return true;
            }
            return false;
        }

        public override Expression<Func<Report, bool>> GetExpression(ParameterProvider parameterProvider = null)
        {
            Expression<Func<Report, bool>> expression = PredicateBuilder.False<Report>(); ;

            if (LogicElements.Count > 0)
            {
                foreach (var l in LogicElements)
                {
                    expression = expression.Or(l.GetExpression(parameterProvider));
                }
            }
            else
            {
                throw new Exception("Logic OR should contain at least one element");
            }

            return expression.Expand();
        }
    }
}
