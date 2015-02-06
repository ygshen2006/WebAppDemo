using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.SiteAdministration
{
    public class TeamModel
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public string TeamDescription { get; set; }

        public int TeamOwner { get; set; }

        public string TeamLogo { get; set; }
        public Guid TeamGuid { get; set; }
        public DateTime CreatedDate { get; set; }
        public int TeamIntrestId { get; set; }
        public EntitySet<TeamType> TeamTypes { get; set; }
        public static TeamModel ToTeamModel(TeamSite t)
        {
            TeamModel tm = new TeamModel() { Id = t.Id, TeamName = t.Name, TeamGuid =Guid.Parse(t.TeamGUID), TeamOwner = t.TeamOwner, TeamDescription = t.Description, CreatedDate = (DateTime)t.CreatedDate, TeamLogo = t.TeamLogo, TeamTypes = t.TeamTypes };

            return tm;
        }
    }
}
