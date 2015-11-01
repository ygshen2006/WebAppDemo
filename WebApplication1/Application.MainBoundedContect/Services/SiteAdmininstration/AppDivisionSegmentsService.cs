using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.Extentions;
using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
namespace Application.MainBoundedContect.Services.SiteAdmininstration
{
   public class AppDivisionSegmentsService
    {
       private ITeamRepository teamRepository;
       private ISegmentRepository segRepository;
       private IDivisionRepository repository;

       public AppDivisionSegmentsService(ITeamRepository _teamRepository, ISegmentRepository _segRepository, IDivisionRepository _repository)
       {
           teamRepository = _teamRepository;
           segRepository = _segRepository;
           repository = _repository;
       }

       public AppDivisionSegmentsService(IDivisionRepository _repository)
       {
           repository = _repository;
       }

       public IEnumerable<AppTeamSite> GetTeamsWithTitle(string title) {
           title = title.ToLower();
           if (teamRepository.GetAllTeams().Where(_ => _.TeamName.ToLower().Contains(title)).Count() == 0) { return null; }
           return teamRepository.GetAllTeams().Where(_ => _.TeamName.ToLower().Contains(title)).Select(_=>_.ToAppTeamSite());
       }

       public string SaveTeamSiteHierarchy(IEnumerable<AppDivisions> paramDes) {
           // Break the teamsite and segement relation
           teamRepository.UnrelateTeamSitesWithSegment();
          // teamRepository.UnitOfWork.Commit();
           var subSegments = segRepository.GetFiltered(_ => _.ParentSegement != null);
           foreach (var sub in subSegments)
           {
               segRepository.RemoveSegementById(sub.Id);
               segRepository.UnitOfWork.Commit();
           }

           repository.RemoveAllDivisions();
           repository.UnitOfWork.Commit();


           // Division save
           var divisions = paramDes.FirstOrDefault().children;
           if (divisions == null) return "succeed";
           else
           {
               foreach (var d in divisions)
               {
                   var addedDivision = repository.AddNewDivision(new Division() { Id = d.Id.GetValueOrDefault(), Name = d.title, DivisionGuid = Guid.NewGuid() });
                   // Add segments for this division
                   if (addedDivision != null && d.children != null)
                   {
                       foreach (var s in d.children)
                       {
                           var segment = segRepository.AddSegment(new Segment() { Name = s.title, DivisionId = addedDivision.Id, SegmentGuid = Guid.NewGuid() });

                           // Add sub segment
                           if (segment != null && s.children != null)
                           {
                               foreach (var sub in s.children)
                               {
                                   if (sub.tooltip == "subsegment")
                                   {
                                       // add sub segment
                                       var subsegment = segRepository.AddSegment(new Segment() { Name = sub.title, SegmentGuid = Guid.NewGuid(), ParentId = segment.Id });

                                       if (subsegment != null)
                                       {
                                           // Add team site relation with the 
                                           foreach (var t in sub.children)
                                           {

                                               teamRepository.RelateTeamSiteWithSegement(Guid.Parse(t.key), subsegment.Id);
                                               teamRepository.UnitOfWork.Commit();
                                           }
                                       }
                                   }

                                   else if (sub.tooltip == "team")
                                   {
                                       teamRepository.RelateTeamSiteWithSegement(Guid.Parse(sub.key), segment.Id);
                                       teamRepository.UnitOfWork.Commit();
                                   }
                               }
                           }
                       }

                   }

               }
           }
           return "{\"Result\":succeed}";
       }

       public IEnumerable<AppDivision> GetAllDivisions()
       {
           return repository.GetAllDivisions().ToList<Division>().Select(_ => _.ToAppDivision());
       }

       public AppDivision GetDivisionBySegmentId(int segmentId)
       {
           var segment= segRepository.GetFiltered(_=>_.Id==segmentId).FirstOrDefault();
           if (segment.Divsion == null) return null;
           return segment.Divsion.ToAppDivision();

       }

       public AppSegment GetParentSegmentById(int segmentId)
       {
           var segment = segRepository.GetFiltered(_ => _.Id == segmentId).FirstOrDefault();
           if (segment == null) return null;
           if (segment.ParentSegement == null) return null;
           return segment.ParentSegement.ToAppSegement();
       }

       public List<AppSegment> GetAllSegmentsByDivisionId(int divisionId)
       {
           List<AppSegment> segments = new List<AppSegment>();
           IEnumerable<Segment> seg = segRepository.GetSegmentsByDivisionID(divisionId);
           if (seg == null || seg.Count() == 0) return null;
           foreach (var s in seg) {
               segments.Add(s.ToAppSegement());
           }
           return segments;
       }

       public List<Segment> GetSegmentAndTeamsInDivsion(int divisionId)
       {
           List<Segment> seg = segRepository.GetSegmentsByDivisionID(divisionId).ToList();

           if (seg == null || seg.Count() == 0) return null;

           return seg.ToList();
       }

       public List<AppSegment> GetAllSegments() {
          return segRepository.GetAll(false).Select(_=>_.ToAppSegement()).ToList<AppSegment>();
       }
    }
}
