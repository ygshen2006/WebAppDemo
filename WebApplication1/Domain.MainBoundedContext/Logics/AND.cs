using Domain.SeedWork;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public class AND : Logic, IParentLogic
    {
        public AND()
        {
            LogicElements = new List<Logic>();
        }

        /// <summary>
        /// Add child to AND, return AND itself
        /// </summary>
        /// <param name="logic">logic to be AND</param>
        /// <returns>object itself</returns>
        public AND AddElement(Logic logic)
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

        public override Expression<Func<Entity, bool>> GetExpression(ParameterProvider parameterProvider = null)
        {
            Expression<Func<Entity, bool>> expression = PredicateBuilder.True<Entity>();

            if (LogicElements.Count > 0)
            {
                foreach (var l in LogicElements)
                {
                    expression = expression.And(l.GetExpression(parameterProvider));
                }
            }
            else
            {
                throw new Exception("Logic AND should contain at least one element");
            }

            return expression.Expand();
        }
    }
}
