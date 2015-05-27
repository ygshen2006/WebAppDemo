using LinqKit;
using Domain.MainBoundedContext.FilterField;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.SeedWork;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Logics
{
    public class NotIN<T> :Logic, IFieldLogic<T>
    {
        public AppFilterField<T> Field { get; set; }

        public FieldValue<List<T>> FieldValue { get; set; }

        #region Code hold
        /*
        public void SetParameterProvider(ParameterProvider pp)
        {
            if (FieldValue is Parameter<T>)
            {
                ((Parameter<List<T>>)(FieldValue)).SetParameterProvider(pp);
            }
        }*/
        #endregion

        public override Expression<Func<Report, bool>> GetExpression(ParameterProvider parameterProvider = null)
        {
            if (FieldValue.GetValue(parameterProvider) == null)
            {
                throw new Exception("The Value for Equal should not be null");
            }
            List<T> values = FieldValue.GetValue(parameterProvider);
            return (this.Field as INotIN<T>).GetNotINExpression(values).Expand();
        }
    }
}
