using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;

namespace Domain.MainBoundedContext.Aggregates.Division
{
    public class Segment: Entity
    {
        public string Name { get; set; }
        public Guid SegmentGuid { get; set; }
        public int? DivisionId { get; set; }
        public virtual Division Divsion { get; set; }
        
        public int? ParentId { get; set; }
        public virtual Segment ParentSegement { get; set; }

        public virtual ICollection<Segment> ChildSegements { get; set; }

        public virtual ICollection<TeamSite> Teamsites { get; set; }
        public Segment() {
            ChildSegements = new List<Segment>();
            Teamsites = new List<TeamSite>();
        }
    }
}
