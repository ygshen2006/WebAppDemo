using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Filters
{
    public class Statistics
    {
        public String Name
        { get; set; }

        private List<AttributeValue> _values = new List<AttributeValue>();
        public List<AttributeValue> Values
        {
            get { return this._values; }
            set { this._values = value; }
        }
    }

    public class AttributeValue
    {
        public String Name
        { get; set; }

        public Int32 Value
        { get; set; }

        public Int32 Count
        { get; set; }

        public Int32? ParentValue
        { get; set; }
    }
}
