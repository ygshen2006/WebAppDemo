using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public class ParameterProvider
    {
        public ParameterProvider()
        {
            Parameters = new Dictionary<string, object>();
        }

        private Dictionary<String, Object> Parameters { get; set; }

        public void AddParameter(String name, Object parameter)
        {
            this.Parameters.Add(name, parameter);
        }

        public T GetParameter<T>(String name)
        {
            if (Parameters.Keys.Contains(name))
            {
                Object obj = Parameters[name];
                if (!(obj is T))
                {
                    throw new Exception(String.Format("Type {0} is not same as that in ParameterProvider which is {1}", typeof(T), obj.GetType().ToString()));
                }
                return (T)(obj);
            }
            else
            {
                return default(T);
            }
        }
    }
}
