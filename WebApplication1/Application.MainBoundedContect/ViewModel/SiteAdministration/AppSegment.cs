using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
   public class AppSegment
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string tooltip { get; set; }
        public Guid SegmentGuid { get; set; }
        public string key { get; set; }
        public int DivisionId { get; set; }
        public string teampic {get;set; }
        public IEnumerable<AppSegment> children { get; set; }
        public Guid TeamGuid { get; set; }
        public int PrarentSegementId { get; set; }
    }
}
