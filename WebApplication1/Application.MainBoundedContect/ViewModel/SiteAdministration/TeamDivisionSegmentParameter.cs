using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
   public class TeamDivisionSegmentParameter
    {
        public Guid TeamGuid { get; set; } 
       public string TeamName { get; set; }

       public AppSegment Segment { get; set; }

       public AppSegment ParentSegment { get; set; }


       public AppDivision Division { get; set; }
    }
}
