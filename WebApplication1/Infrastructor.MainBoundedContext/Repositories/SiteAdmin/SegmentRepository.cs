using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.SiteAdmin
{
     class SegmentCompare : IEqualityComparer<Segment> {

        public bool Equals(Segment x, Segment y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(Segment obj)
        {
            throw new NotImplementedException();
        }
    }
    public class SegmentRepository : Repository<Segment>, ISegmentRepository
    {

        public SegmentRepository() : base(new MainDBUnitWorkContext()) { }
        public SegmentRepository(MainDBUnitWorkContext context)
            : base(context)
        {

        }
        public bool RemoveSegementById(int id)
        {
            // See if this segment has child related
            var segment = this.GetAll().Where(_ => _.Id == id).FirstOrDefault();
            this.TrackItem(segment);
            if (segment == null)
            {
                // doesn't exist
                return true;
            }

            else
            {
                // Remove the childs elements
                foreach (var sub in segment.ChildSegements)
                {
                    this.Remove(sub);
                }
                // Remove itself
                this.Remove(segment);
            }

            return true;
        }

        public Segment AddSegment(Segment data)
        {
            this.Add(data);
            this.UnitOfWork.Commit();

            return this.GetAll().Where(_ => _.Name == data.Name && _.SegmentGuid == data.SegmentGuid).FirstOrDefault();
        }


        public IEnumerable<Segment> GetSegmentsByDivisionID(int divisionId)
        {
            // Get the root segments
            var rootSegments = this.GetAll().Where(_ => _.DivisionId == divisionId);
            
            // Get the sub-segments
            return rootSegments;
        }
    }
}
