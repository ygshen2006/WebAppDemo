using Application.MainBoundedContect.ViewModel.SiteAdministration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Aggregates.Division;
namespace Application.MainBoundedContect.Extentions
{
    public static class SegementExtensions
    {
        public static AppSegment ToAppSegement(this Segment seg)
        {
            var childTeam =seg.Teamsites.Select(_ => new AppSegment() { TeamGuid=_.TeamGuid, title=_.TeamName, key=_.TeamGuid.ToString(), teampic=_.TeamLogo, PrarentSegementId=_.SegmentId.GetValueOrDefault(), tooltip="team" }).ToArray();
            List<AppSegment> childSegments = new List<AppSegment>();
            
            
            // If the child segment has child team we need to add it into the list
            if (seg.ChildSegements != null)
            {
                List<AppSegment> childSegmentTeamsNode = new List<AppSegment>();

                foreach (var c in seg.ChildSegements)
                {
                    AppSegment se = new AppSegment() { title = c.Name, PrarentSegementId = c.ParentId.GetValueOrDefault(), tooltip = "segment" };


                   var ts = c.Teamsites.Select(_ => new AppSegment() { title = _.TeamName, teampic=_.TeamLogo, key = _.TeamGuid.ToString(), 
                       PrarentSegementId =(_.SegmentId.HasValue)? _.SegmentId.Value:-1, tooltip = "team" }).ToArray();
                   foreach (var t in ts)
                   {
                       childSegmentTeamsNode.Add(t);
                   }
                   se.children = childSegmentTeamsNode;


                   childSegments.Add(se);
                }
            }

            var finalChilds=new List<AppSegment>();
            foreach(var c in childTeam)
            {
                finalChilds.Add(c);
            }
            foreach(var c in childSegments)
            {
                finalChilds.Add(c);
            }
          
            return new AppSegment()
            {
                
                Id = seg.Id,
                SegmentGuid = seg.SegmentGuid,
                title = seg.Name,
                key = "seg" + seg.SegmentGuid,
                tooltip = "segment",
                children = finalChilds
            };
        }

        public static Segment ToSegement(this AppSegment seg)
        {
            return new Segment()
            {
                SegmentGuid = seg.SegmentGuid,
                Name = seg.title,
                 DivisionId = seg.DivisionId
            };
        }
    }
}
