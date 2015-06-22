using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Application.MainBoundedContect.Extentions;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Teams.Aggregates.ReportStatus;
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.ViewModel.Filters;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Services.Report;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Application.MainBoundedContect.Services.TeamAdmin
{
    public class TeamAdminService
    {
        private ITagRepository _tagRepository;
        private ITeamRepository _teamRepositry;
        private IStatusRepository _statusRepository;
        private ITileRepository _tileRepository;
        private IReportRepository _reportRepository;

        public TeamAdminService(ITagRepository tagRepository,
            ITeamRepository teamRepositry,
            IStatusRepository statusRepository,
            ITileRepository tileRepository,
            IReportRepository reportRepo
            )
        {
            _tileRepository = tileRepository;
            _statusRepository = statusRepository;
            _teamRepositry = teamRepositry;
            _tagRepository = tagRepository;
            _tileRepository = tileRepository;
            _reportRepository = reportRepo;
        }

        public IEnumerable<AppTeamTag> GetTagsByTeamId(Guid teamId)
        {
            // get team id
            var team = _teamRepositry.GetAllTeams().Where(_ => _.TeamGuid == teamId).FirstOrDefault();
            return _tagRepository.GetTagsByTeamId(team.Id).Select(_=>_.ToAppTeamTag());
        }
        public AppTeamTag GetTagById(int id)
        {
            // get team id

            return _tagRepository.GetAll(false).FirstOrDefault(_ => _.Id == id).ToAppTeamTag();
        }

        public IEnumerable<AppStatus> GetStatusByRole(int roleId) {
            return _statusRepository.GetStatusByUserRole(roleId).Select(_=>_.ToAppStatus());
        }
        public void ModifyTags(IEnumerable<AppTeamTag> tags) {
            List<Tag> tagsAdd = new List<Tag>();
            List<Tag> tagsModify = new List<Tag>();
            List<Tag> tagsRemove = new List<Tag>();

            foreach (var tag in tags) {
                if (tag.Status == tagStatus.Add)
                {
                    tagsAdd.Add(tag.ToTeamTag());
                }
                if (tag.Status == tagStatus.Modify) {
                    tagsModify.Add(tag.ToTeamTag());
                }
                if (tag.Status == tagStatus.Delete)
                {
                    tagsRemove.Add(tag.ToTeamTag());
                }
            }
            _tagRepository.AddTags(tagsAdd);
            _tagRepository.ModifyTags(tagsModify);
            _tagRepository.DeleteTags(tagsRemove);
        }


       
    }
}
