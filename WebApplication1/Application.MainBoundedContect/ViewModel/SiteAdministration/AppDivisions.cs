using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
    public class AppDivisions
    {
        public string title { get; set; }
        public string key { get; set; }
        public bool isFolder { get; set; }
        public string tooltip { get; set; }
        public IEnumerable<AppDivision> children { get; set; }
    }
}
