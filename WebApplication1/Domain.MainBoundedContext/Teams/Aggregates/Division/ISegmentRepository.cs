using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Aggregates.Division;

namespace Domain.MainBoundedContext.Aggregates.Division
{
    public interface ISegmentRepository : IRepository<Segment>
    {
        bool RemoveSegementById(int id);

        Segment AddSegment(Segment data);

        IEnumerable<Segment> GetSegmentsByDivisionID(int divisionId);
    }
}
