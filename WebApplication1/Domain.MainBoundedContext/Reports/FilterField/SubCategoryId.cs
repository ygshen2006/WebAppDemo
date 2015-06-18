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
    public class SubCategoryId : AppFilterField<Int32>, IIN<Int32>, IEQUAL<Int32>
    {
        public SubCategoryId()
        {
            Name = "Sub Category Id";
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

        #region #region IEQUAL implementation
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
            Expression<Func<Report, Boolean>> exp = _ => _.Catagories.Any(c => values.Contains(c.Id));
            return exp;
        }

        public Expression<Func<Report, Boolean>> GetEqualExpression(Int32 value)
        {
            Expression<Func<Report, Boolean>> exp = _ => _.Catagories.Any(c => c.Id == value);
            return exp;
        }
        #endregion
    }
}
