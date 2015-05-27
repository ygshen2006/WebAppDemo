using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.SeedWork;

namespace Domain.MainBoundedContext.Teams.Aggregates.Tags
{
    public interface ITagRepository : IRepository<Tag>
    {
        IEnumerable<Tag> GetTagsByTeamId(int teamGuid);

        void ModifyTags(IEnumerable<Tag> tags);

        void AddTags(IEnumerable<Tag> tag);

        void DeleteTags(IEnumerable<Tag> tag);
    }
}
