using Domain.SeedWork;
using LinqKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
//using Microsoft.MSIT.ECO.UnifiedReporting.Domain.MainBoundedContext.ReportModule.Aggregates.ReportCatalogAgg;

namespace Domain.MainBoundedContext.Logics
{
    [XmlInclude(typeof(AND))]
    [XmlInclude(typeof(OR))]
    
    [XmlInclude(typeof(Equal<Int32>))]
    [XmlInclude(typeof(IN<Int32>))]

    [XmlInclude(typeof(NotIN<Int32>))]

    [XmlInclude(typeof(Equal<String>))]
    [XmlInclude(typeof(IN<String>))]
    
    [XmlInclude(typeof(Equal<Guid>))]
    [XmlInclude(typeof(IN<Guid>))]

    [Serializable]
    public abstract class Logic//:IGetExpression
    {
        /*
        public static Logic DeserializeToLogic(String serializedString)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(Logic));
            StringReader sr = new StringReader(serializedString);
            return xmlSerializer.Deserialize(sr) as Logic;
        }

        public static String SerializeToString(Logic logic)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(logic.GetType());
            StringWriter sw = new StringWriter();
            xmlSerializer.Serialize(sw, logic);
            return sw.ToString();
        }
         * */

        public AND And(Logic logic)
        {
            AND parentLogic = new AND();
            parentLogic.AddElement(this);
            parentLogic.AddElement(logic);
            return parentLogic;
        }

        public OR Or(Logic logic)
        {
            OR parentLogic =  new OR();
            parentLogic.AddElement(this);
            parentLogic.AddElement(logic);
            return parentLogic;
        }

        public abstract Expression<Func<Entity, bool>> GetExpression(ParameterProvider parameterProvider = null);

        //public abstract void SetParameterProvider(ParameterProvider pp);
            /*
        {
            return null;
        }*/
    }

    

    
    /*
    public abstract class FieldLogic<T> : Logic 
    {
        public AppFilterField<T> Field
        { get; set; }
    }
    */
}
