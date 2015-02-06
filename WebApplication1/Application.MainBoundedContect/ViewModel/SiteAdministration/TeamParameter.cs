using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.SiteAdministration
{
  public class TeamParameter
    {
      public IEnumerable<AppTeamSite> Teams;
      public TeamParameter() {
          Teams = new List<AppTeamSite>();
      }
    }
}
