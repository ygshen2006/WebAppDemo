using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
    public class TeamIntrestModel
    {
        public int Id { get; set; }
        public string IntrestName { get; set; }
        public EntitySet<TeamType> TeamTypes { get; set; }

        //public IntrestType ToTeamIntrestModel(TeamIntrestModel t)
        //{
            
        //}
    }
}
