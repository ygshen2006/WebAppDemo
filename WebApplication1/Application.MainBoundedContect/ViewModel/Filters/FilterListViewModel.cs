using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Filters
{
    public class FilterListViewModel
    {
        public List<FilterEntityViewModel> FilterList { get; set; }

        public FilterListViewModel()
        {
            this.FilterList = new List<FilterEntityViewModel>();
        }

        public Int32 DataCount { get; set; }
    }


    public class FilterEntityViewModel
    {
        public string FilterType { get; set; }

        public List<FilterItem> FilterItemList { get; set; }

        public FilterEntityViewModel()
        {
            this.FilterItemList = new List<FilterItem>();
        }

    }

    public class FilterItem : IComparable<FilterItem>
    {
        public string Name { get; set; }
        public int Value { get; set; }
        public int Count { get; set; }
        public int? ParentValue { get; set; }

        public int CompareTo(FilterItem other)
        {
            //return other.ItemCount.CompareTo(this.ItemCount);
            if (this.Count > other.Count)
                return -1;
            else if (this.Count == other.Count)
            {
                return this.Value.CompareTo(other.Value);
            }
            else
                return 1;
        }
    }
 
}
