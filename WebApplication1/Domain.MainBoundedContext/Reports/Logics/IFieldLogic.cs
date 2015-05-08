using Domain.MainBoundedContext.FilterField;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public interface IFieldLogic<T>
    {
        AppFilterField<T> Field { get; set; }
        //void SetParameterProvider(ParameterProvider pp);
    }
}
