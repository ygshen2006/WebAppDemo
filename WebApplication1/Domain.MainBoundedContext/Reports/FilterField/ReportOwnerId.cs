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
    public class ReportOwnerId : AppFilterField<String>, IIN<String>, IEQUAL<String>
    {
        public ReportOwnerId()
        {
            this.Name = "Report Owner Id";
        }

        #region IIN Interface implementation
        public IN<String> In(IEnumerable<String> values)
        {
            Constant<IEnumerable<String>> constants = new Constant<IEnumerable<String>>() { Value = values };
            return this.CreateIn(constants);
        }

        public IN<String> In(Constant<IEnumerable<String>> value)
        {
            return this.CreateIn(value);
        }

        public IN<String> In(Parameter<IEnumerable<String>> value)
        {
            return this.CreateIn(value);
        }


        #endregion

        #region IEQUAL implementation
        public Equal<String> Equal(String value)
        {
            return this.CreateEqual(new Constant<String>() { Value = value });
        }

        public Equal<String> Equal(Constant<String> value)
        {
            return this.CreateEqual(value);
        }

        public Equal<String> Equal(Parameter<String> value)
        {
            return this.CreateEqual(value);
        }

        #endregion

        #region Expression Part
        public Expression<Func<Report, Boolean>> GetINExpression(IEnumerable<String> values)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.Owners.Any(o => values.Contains(o.Id));
            return exp;
        }

        public Expression<Func<Report, Boolean>> GetEqualExpression(String value)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.Owners.Any(o => o.Id == value);
            return exp;
        }
        #endregion
    }
}
