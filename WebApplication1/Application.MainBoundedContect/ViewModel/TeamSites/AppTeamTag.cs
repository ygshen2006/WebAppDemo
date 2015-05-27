using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.TeamSites
{
   public class AppTeamTag
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string TeamGuid { get; set; }
        public int TeamId { get; set; }
        public tagStatus Status { get; set; }

    }
   public enum tagStatus { 
       Add,
       Modify,
       Delete
   }
}
