using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class FilterModel
    {
        public string FilterType { get; set; }
        public List<FilterItem> FilterItemList { get; set; }

        public FilterModel() {
            FilterItemList = new List<FilterItem>();
        }
    }
}