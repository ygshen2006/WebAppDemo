using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
   public class AppDivisionSegmentCount
    {
        public string DivisionName { get; set; }
        public int? DivisionId { get; set; }

        public string SegmentName { get; set; }
        public int SegmentId { get; set; }


        public int DSCount { get; set; }


        public ICollection<ChildSegmentClass> Childs { get; set; }

        public AppDivisionSegmentCount() {
            Childs = new List<ChildSegmentClass>();
        }
    }

   public class ChildSegmentClass {
       public string SegmentName { get; set; }
       public int SegmentId { get; set; }
       public int Count { get; set; }
   }
}
