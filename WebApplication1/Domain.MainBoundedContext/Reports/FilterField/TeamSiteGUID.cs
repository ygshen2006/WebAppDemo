using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.FilterField;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Reports.FilterField
{
    public class TeamSiteint : AppFilterField<int>, IIN<int>, IEQUAL<int>
    {
        public TeamSiteint()
        {
            this.Name = "Team Site int";
        }

        #region IIN Interface implementation
        public IN<int> In(IEnumerable<int> values)
        {
            Constant<IEnumerable<int>> constants = new Constant<IEnumerable<int>>() { Value = values };
            return this.CreateIn(constants);
        }

        public IN<int> In(Constant<IEnumerable<int>> value)
        {
            return this.CreateIn(value);
        }

        public IN<int> In(Parameter<IEnumerable<int>> value)
        {
            return this.CreateIn(value);
        }


        #endregion

        #region IEQUAL implementation
        public Equal<int> Equal(int value)
        {
            return this.CreateEqual(new Constant<int>() { Value = value });
        }

        public Equal<int> Equal(Constant<int> value)
        {
            return this.CreateEqual(value);
        }

        public Equal<int> Equal(Parameter<int> value)
        {
            return this.CreateEqual(value);
        }

        #endregion

        #region Expression Part
        public Expression<Func<Report, Boolean>> GetINExpression(IEnumerable<int> values)
        {
            Expression<Func<Report, Boolean>> exp = _ => values.Contains(_.TeamSite.Id);
            return exp;
        }

        public Expression<Func<Report, Boolean>> GetEqualExpression(int value)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.TeamSite.Id == value;
            return exp;
        }
        #endregion


     
    }
}
