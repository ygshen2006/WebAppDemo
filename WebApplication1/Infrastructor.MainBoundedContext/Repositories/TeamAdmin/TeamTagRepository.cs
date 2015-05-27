using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Domain.MainBoundedContext.Teams.Tags;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;

namespace Infrastructor.MainBoundedContext.Repositories.TeamAdmin
{
    public class TeamTagRepository : Repository<Tag> ,ITagRepository
    {
        public TeamTagRepository(MainDBUnitWorkContext _unitOfWork)
            : base(_unitOfWork)
        { 
        
        }

        public IEnumerable<Tag> GetTagsByTeamId(int teamId)
        {
            return this.GetFiltered(_ => _.TeamSiteId == teamId);
        }

        public void ModifyTags(IEnumerable<Tag> tags)
        {
            foreach(var tag in tags){
                this.Modify(tag);
            }
        }

        public void AddTags(IEnumerable<Tag> tags)
        {
            foreach (var tag in tags) {
                this.Add(tag);
                this.UnitOfWork.Commit();

            }
        }

        public void DeleteTags(IEnumerable<Tag> tags)
        {
            foreach (var tag in tags) {
                this.Remove(tag);
                this.UnitOfWork.Commit();
            }
        }
    }
}
