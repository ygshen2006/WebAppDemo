using Domain.MainBoundedContext.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.TeamSites
{
   public class AppTeamTile
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public Logic BasicLogic { get; set; }
    }
}
