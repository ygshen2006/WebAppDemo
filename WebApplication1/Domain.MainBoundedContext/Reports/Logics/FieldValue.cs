using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Domain.MainBoundedContext.Logics
{
    [XmlInclude(typeof(FieldValue<Int32>))]
    [XmlInclude(typeof(Constant<Int32>))]
    [XmlInclude(typeof(Parameter<Int32>))]
    [XmlInclude(typeof(Constant<List<Int32>>))]
    [XmlInclude(typeof(Parameter<List<Int32>>))]

    [XmlInclude(typeof(FieldValue<String>))]
    [XmlInclude(typeof(Constant<String>))]
    [XmlInclude(typeof(Parameter<String>))]
    [XmlInclude(typeof(Constant<List<String>>))]
    [XmlInclude(typeof(Parameter<List<String>>))]

    [XmlInclude(typeof(FieldValue<Guid>))]
    [XmlInclude(typeof(Constant<Guid>))]
    [XmlInclude(typeof(Parameter<Guid>))]
    [XmlInclude(typeof(Constant<List<Guid>>))]
    [XmlInclude(typeof(Parameter<List<Guid>>))]

    [XmlInclude(typeof(FieldValue<Boolean>))]
    [XmlInclude(typeof(Constant<Boolean>))]
    [XmlInclude(typeof(Parameter<Boolean>))]
    [XmlInclude(typeof(Constant<List<Boolean>>))]
    [XmlInclude(typeof(Parameter<List<Boolean>>))]
    
    [XmlInclude(typeof(Guid))]

    [Serializable]
    public abstract class FieldValue<T>
    {
        public abstract T GetValue(ParameterProvider parameterProvider = null);

        public abstract void SetValue(T value);
    }
}
