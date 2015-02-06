using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
  public  class TeamModelList
    {
        public List<TeamModel> Teams { get; set; }
        public TeamModelList()
        {
            Teams = new List<TeamModel>();
        }
    }
}
