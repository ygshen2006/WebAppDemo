using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
  public class TeamParameter
    {
      public List<TeamModel> Teams;
      public TeamParameter() {
          Teams = new List<TeamModel>();
      }
    }
}
