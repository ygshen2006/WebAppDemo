using Models;
using Models.SiteAdministration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.SitesManager
{
    public class IntrestsManager
    {
        private SQLOperationsDataContext context;
        public IntrestsManager()
        {

        }
        public IntrestsManager(SQLOperationsDataContext inputContext)
        {
            context = inputContext;
        }

        public TeamIntrestModelList AddOrModifyIntrests(List<TeamIntrestModel> models)
        {
            TeamIntrestModelList returned_result = new TeamIntrestModelList();
            if (models != null && models.Count > 0)
            {
                // Add intrests
                foreach (var temp in models.Where(_ => _.Id != -1))
                {
                    TeamIntrestModel.ToTeamIntrestModel
                    context.IntrestTypes.Where(_ => _.Id == temp.Id).First().IntrestName = temp.IntrestName;
                }
                foreach (var temp in models.Where(_ => _.Id == -1))
                {
                    // New data
                    context.IntrestTypes.InsertOnSubmit(new IntrestType() { IntrestName = temp.IntrestName, TeamTypes = null });
                }

                // For those not existed in db but not inhe list. Remove them

                foreach (var temp in context.IntrestTypes.ToList())
                {
                    if (!models.Any(_ => _.Id == temp.Id))
                    {
                        context.IntrestTypes.DeleteOnSubmit(temp);
                    }
                }
                context.SubmitChanges();

                returned_result.Intrests = context.IntrestTypes.Select(_ => TeamIntrestModel.ToTeamIntrestModel(_)).ToList();
                
            }
            else
            { 
                // Clear the db
                context.IntrestTypes.DeleteAllOnSubmit(context.IntrestTypes);
                returned_result.Intrests = null;
                context.SubmitChanges();
            }
            return returned_result;
        }

        public TeamIntrestModelList GetIntrests() {
            TeamIntrestModelList returned_result = new TeamIntrestModelList();
            returned_result.Intrests = context.IntrestTypes.Select(_ => TeamIntrestModel.ToTeamIntrestModel(_)).ToList();
            return returned_result;
        }
    }
}
