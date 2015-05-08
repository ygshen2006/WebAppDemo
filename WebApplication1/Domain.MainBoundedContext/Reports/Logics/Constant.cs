using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics

{
    public class Constant<T> : FieldValue<T>
    {
        public virtual T Value { get; set; }

        public override T GetValue(ParameterProvider parameterProvider = null)
        {
            return Value;
        }

        public override void SetValue(T value)
        {
            Value = value;
        }
    }
}
