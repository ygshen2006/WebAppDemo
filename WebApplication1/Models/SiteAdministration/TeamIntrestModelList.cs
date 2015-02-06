using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
  public class TeamIntrestModelList
    {
        public List<TeamIntrestModel> Intrests { get; set; }
        public TeamIntrestModelList() {
            Intrests = new List<TeamIntrestModel>();
        }
    }
}
