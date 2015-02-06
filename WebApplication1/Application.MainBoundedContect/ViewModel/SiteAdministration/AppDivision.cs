using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
   public class AppDivision
    {
        public int? Id { get; set; }
        public string title { get; set; }
        public Guid DivisionGuid { get; set; }
        public string key { get; set; }
        public string tooltip { get; set; }
        public IEnumerable<AppSegment> children { get; set; }
    }
}
