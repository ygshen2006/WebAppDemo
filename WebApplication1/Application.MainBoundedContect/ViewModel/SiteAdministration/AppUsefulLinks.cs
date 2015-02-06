using Domain.MainBoundedContext.Reports;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
    public class AppUsefulLinks
    {
        public int? Id { get; set; }

        public string LinkName { get; set; }
        public string URL { get; set; }
        public int? ParentId { get;set;}
        public AppUsefulLinks ParentLink { get; set; }

        public IEnumerable<AppUsefulLinks> ChildLinks { get; set; }
        
        
        public AppUsefulLinks()
        {
            ChildLinks = new List<AppUsefulLinks>();
        }
    }
}
