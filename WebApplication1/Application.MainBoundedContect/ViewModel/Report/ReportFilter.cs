using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Report
{
    public class ReportFilter
    {
        public ICollection<Int32> TagsIdCollection { get; set; }
        public ICollection<String> OwnerIdCollection { get; set; }
        public ICollection<Int32> SubCategoryIdCollection { get; set; }
        public ICollection<Int32> ReportDataIdCollection { get; set; }
    }
}
