using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
    public class TeamIntrestParameter
    {
        public List<TeamIntrestModel> Intrests { get; set; }
        public TeamIntrestParameter()
        {
            Intrests = new List<TeamIntrestModel>();
        }
    }
}
