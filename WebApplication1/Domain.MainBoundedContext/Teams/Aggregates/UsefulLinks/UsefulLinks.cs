using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks
{
    public class UsefulLinks: Entity
    {
        public UsefulLinks():base(default(int)) { }
        public UsefulLinks(int id) : base(id) {
            Childs = new List<UsefulLinks>();
        }

        public int? ParentId { get; set; }
        public virtual UsefulLinks ParentUsefulLink { get;set;}

        public string LinkName { get; set; }
        public string URL { get; set; }

        public virtual ICollection<UsefulLinks> Childs { get; set; }
    }
}
