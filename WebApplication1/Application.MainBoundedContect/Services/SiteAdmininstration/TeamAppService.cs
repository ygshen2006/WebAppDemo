using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Aggregates.Division;

namespace Application.MainBoundedContect.Services.SiteAdmininstration
{
    public class TeamAppService
    {
        private ITeamRepository _teamRepository;
        private ISegmentRepository _segmentRepository;
        private IUserRepository _userRepository;

        public TeamAppService() { }
        public TeamAppService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }
        public TeamAppService(ITeamRepository teamRepository, IUserRepository userRepo)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepo;
        }
        public IEnumerable<AppTeamSite> GetAllTeamSites()
        {
            List<AppTeamSite> result = new List<AppTeamSite>();
            var teamSites = _teamRepository.GetAllTeams();

            foreach (var team in teamSites.ToList())
            {
                result.Add(new AppTeamSite()
                  {
                      Id = team.Id,
                      TeamDescription = team.TeamDescription,
                      CreatedDate = team.CreatedDateTime.ToShortDateString(),
                      TeamGuid = team.TeamGuid,
                      TeamOwners = getTeamOwnersString(team.TeamOwners),
                      TeamLogo = (team.TeamLogo!=null)?team.TeamLogo:"",
                      TeamName = team.TeamName,
                  });
            }
            return result;
        }

        private string getTeamOwnersString(ICollection<User> owners)
        {
            string str="";
            foreach (var owner in owners)
            {
                str += owner.UserName+";";
            }
            return str;
        }
        public IEnumerable<AppTeamSite> Update(IEnumerable<AppTeamSite> models)
        {
            // Need to deleted items\
            var deleteItems = _teamRepository.GetAllTeams().Where(l => !models.Where(_ => _.Id.HasValue).Select(_ => _.Id).Contains(l.Id));
            if (deleteItems != null && deleteItems.Count() > 0)
            {
                foreach (var team in deleteItems)
                {
                    _teamRepository.Remove(team);
                }
            }

            // Add or modify
            foreach (var team in models)
            {
                if (team.Id.HasValue)
                {
                    // update
                    //_teamRepository.Modify(team.ToTeamSite());
                }
                else
                {
                    team.CreatedDate = DateTime.Now.ToShortDateString();
                    team.TeamGuid = Guid.NewGuid();
                    // Set owner list
                    var teamOwnersStr = team.TeamOwners.Split(';');
                    foreach (var t in teamOwnersStr)
                    {
                        if(t.Trim()!="")
                        { 
                        var user = _userRepository.GetUserByName(t).ToAppUser();
                        team.TeamOwnerObjectList.Add(user);
                        }
                    }

                    _teamRepository.Add(team.ToTeamSite(_userRepository));
                }
            }
            //Submit changes
            _teamRepository.UnitOfWork.Commit();
            return GetAllTeamSites();
        }

        public IEnumerable<AppTeamSite> GetAllSingleTeams() {
            List<AppTeamSite> result = new List<AppTeamSite>();
            var teamSites = _teamRepository.GetAllTeams().Where(_=>_.Segment==null).ToList();

            foreach (var team in teamSites.ToList())
            {
                result.Add(new AppTeamSite()
                {
                    TeamGuid = team.TeamGuid,
                    TeamName = team.TeamName,
                });
            }
            return result;
        }

        public bool RelateTeamSitesWithSegement(Guid teamGuid, int segmentId)
        {
            return _teamRepository.RelateTeamSiteWithSegement(teamGuid, segmentId);
        }

        public bool UnrelateTeamSitesWithSegment()
        {
            return _teamRepository.UnrelateTeamSitesWithSegment();
        }

    }
}
