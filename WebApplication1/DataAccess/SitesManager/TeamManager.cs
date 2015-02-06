using Models;
using Models.SiteAdministration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.SitesManager
{
   public class TeamManager
    {
        private SQLOperationsDataContext context;
        public TeamManager()
        { }
        public TeamManager(SQLOperationsDataContext _context)
        {
            this.context = _context;
        }
        public TeamModelList AddModifyTeams(List<TeamModel> teams)
        {
            TeamModelList returned_list = new TeamModelList();
            if (teams != null && teams.Count > 0)
            {
                foreach (var temp in teams.Where(_ => _.Id != -1))
                {
                    //context.IntrestTypes.Where(_ => _.Id == temp.Id).First().IntrestName = temp.IntrestName;
                }
                foreach (var temp in teams.Where(_ => _.Id == -1))
                {
                    // New data

                    context.TeamSites.InsertOnSubmit(new TeamSite()
                    {
                        Name = temp.TeamName,
                        Description = temp.TeamDescription,
                        TeamGUID = Guid.NewGuid().ToString(),
                        TeamLogo = temp.TeamLogo,
                        TeamOwner=temp.TeamOwner,
                        CreatedDate=DateTime.Now
                    });

                    context.TeamTypes.InsertOnSubmit(new TeamType() {   });
                }

                // For those not existed in db but not inhe list. Remove them

                //foreach (var temp in context.TeamSites.ToList())
                //{
                    
                //}
                context.SubmitChanges();

                //returned_result.Intrests = context.IntrestTypes.Select(_ => TeamIntrestModel.ToTeamIntrestModel(_)).ToList();
                            
            }
            else
            {
                // Clear the team table
            }
            return null;
        }
    }
}
