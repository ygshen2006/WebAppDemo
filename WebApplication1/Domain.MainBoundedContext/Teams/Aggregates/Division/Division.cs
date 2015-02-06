using Domain.MainBoundedContext.Aggregates.Division;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Aggregates.Division

{
    public class Division: Entity
    {
        public Guid DivisionGuid { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Segment> Segements { get; set; }

        public Division() {
            Segements = new List<Segment>();
        }
    }
}
