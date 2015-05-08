using Domain.MainBoundedContext.Logics;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Domain.MainBoundedContext.Reports.Logics.FilterField;

namespace Domain.MainBoundedContext.FilterField
{
    //[XmlInclude(typeof(TagId))]
    //[XmlInclude(typeof(CatalogDataId))]
    //[XmlInclude(typeof(CategoryId))]
    //[XmlInclude(typeof(DataSourceId))]
    //[XmlInclude(typeof(FileTypeId))]
    //[XmlInclude(typeof(FileTypeGroupId))]
    //[XmlInclude(typeof(CatalogTypeId))]
    //[XmlInclude(typeof(PermissionUsers))]
    //[XmlInclude(typeof(PermissionGroups))]
    //[XmlInclude(typeof(RecommendToUserAlias))]
    //[XmlInclude(typeof(ReportOwnerAlias))]
    [XmlInclude(typeof(ReportStatusId))]
    //[XmlInclude(typeof(ReportTitle))]
    //[XmlInclude(typeof(RestrictAccess))]
    //[XmlInclude(typeof(SubCategoryId))]
    //[XmlInclude(typeof(SubscriberAlias))]
    //[XmlInclude(typeof(TeamSiteGUID))]
    //[XmlInclude(typeof(CatalogDataIsDeleted))]
    //[XmlInclude(typeof(ReportOwnerId))]

    [Serializable]
    public abstract class AppFilterField<T>
    {
        public AppFilterField()
        {
            //FieldType = typeof(T);
        }

        public String Name { get; set; }

        //public Type FieldType {get; set;}

        protected IN<T> CreateIn(Constant<IEnumerable<T>> value)
        {
            List<T> valueList = value.Value.ToList();
            IN<T> i = new IN<T>() { Field = this, FieldValue = new Constant<List<T>>() { Value = valueList } };
            return i;
        }

        protected IN<T> CreateIn(Parameter<IEnumerable<T>> value)
        {
            //List<T> valueList = value.Value.ToList();
            IN<T> i = new IN<T>() { Field = this, FieldValue = new Parameter<List<T>>() { Name = value.Name } };
            return i;
        }

        protected Equal<T> CreateEqual(Constant<T> value)
        {
            Equal<T> eq = new Equal<T>() { Field = this, FieldValue = value };
            return eq;
        }

        protected Equal<T> CreateEqual(Parameter<T> param)
        {
            Equal<T> eq = new Equal<T>() { Field = this, FieldValue = param };
            return eq;
        }

        protected NotIN<T> CreateNotIn(Constant<IEnumerable<T>> value)
        {
            List<T> valueList = value.Value.ToList();
            NotIN<T> i = new NotIN<T>() { Field = this, FieldValue = new Constant<List<T>>() { Value = valueList } };
            return i;
        }

        protected NotIN<T> CreateNotIn(Parameter<IEnumerable<T>> value)
        {
            //List<T> valueList = value.Value.ToList();
            NotIN<T> i = new NotIN<T>() { Field = this, FieldValue = new Parameter<List<T>>() { Name = value.Name } };
            return i;
        }
    }
}
