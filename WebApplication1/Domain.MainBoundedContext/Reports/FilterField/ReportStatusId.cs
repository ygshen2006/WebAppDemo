using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.FilterField;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;

namespace Domain.MainBoundedContext.Reports.Logics.FilterField
{
    public class ReportStatusId : AppFilterField<Int32>, IIN<Int32>, IEQUAL<Int32>
    {
        public ReportStatusId()
        {
            this.Name = "Report Status Id";
        }

        #region IIN Interface implementation
        public IN<Int32> In(IEnumerable<Int32> values)
        {
            Constant<IEnumerable<Int32>> constants = new Constant<IEnumerable<Int32>>() { Value = values };
            return this.CreateIn(constants);
        }

        public IN<Int32> In(Constant<IEnumerable<Int32>> value)
        {
            return this.CreateIn(value);
        }

        public IN<Int32> In(Parameter<IEnumerable<Int32>> value)
        {
            return this.CreateIn(value);
        }


        #endregion

        #region IEQUAL implementation
        public Equal<Int32> Equal(Int32 value)
        {
            return this.CreateEqual(new Constant<Int32>() { Value = value });
        }

        public Equal<Int32> Equal(Constant<Int32> value)
        {
            return this.CreateEqual(value);
        }

        public Equal<Int32> Equal(Parameter<Int32> value)
        {
            return this.CreateEqual(value);
        }

        #endregion

        #region Expression Part
        public Expression<Func<Report, Boolean>> GetINExpression(IEnumerable<Int32> values)
        {
            Expression<Func<Report, Boolean>> exp = _ => values.Contains(_.StatusId);
            return exp;
        }

        public Expression<Func<Report, Boolean>> GetEqualExpression(Int32 value)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.StatusId == value;
            return exp;
        }
        #endregion
    }
}
