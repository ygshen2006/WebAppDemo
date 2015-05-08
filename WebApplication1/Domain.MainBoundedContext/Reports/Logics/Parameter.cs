using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public class Parameter<T> : FieldValue<T>
    {
        public String Name { get; set; }

        /*
        protected ParameterProvider _parameterProvider = null;

        public ParameterProvider GetParameterProvider()
        {
            return _parameterProvider;
        }

        public void SetParameterProvider(ParameterProvider parameterProvider)
        {
            this._parameterProvider = parameterProvider;
        }
        */
        public override T GetValue(ParameterProvider parameterProvider = null)
        {
            if (parameterProvider == null)
            {
                //return default(T);
                throw new Exception("parameterProvider should not be null in Parameter");
            }
            return parameterProvider.GetParameter<T>(Name);
        }

        public override void SetValue(T value)
        {
            throw new Exception("Do not invoke this method for parameter");
        }

        /*
        public override T Value
        {
            get
            {
                if (_parameterProvider == null)
                {
                    return default(T);
                    //throw new Exception("parameterProvider should not be null in Parameter");
                }
                return _parameterProvider.GetParameter<T>(Name);
            }

        }
         * */
    }
}
