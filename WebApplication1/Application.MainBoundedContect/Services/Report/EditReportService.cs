using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Application.MainBoundedContect.ViewModel.Report;
using Application.MainBoundedContect.Extentions;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Application.MainBoundedContect.Enums;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Services.Tile;
using Domain.MainBoundedContext.Reports.FilterField;

namespace Application.MainBoundedContect.Services.Report
{
    public class EditReportService
    {
        IReportRepository _reportRepository;
        IUserRepository _userRepository;
        ITeamRepository _teamRepository;
        ICategoryRepository _categoryRepository;
        ITagRepository _tagRepository;
        ITileRepository _tileRepository;

        public EditReportService(IReportRepository repository_report,
            IUserRepository repository_user, 
            ITeamRepository repository_team,
            ICategoryRepository category_repository,
            ITagRepository repository_tag,
            ITileRepository repository_tile
            ) {
            _reportRepository = repository_report;
            _userRepository = repository_user;
            _teamRepository = repository_team;
            _categoryRepository = category_repository;
            _tagRepository = repository_tag;
            _tileRepository = repository_tile;
        }



        public IEnumerable<AppReport> GetAllReportsOfTeamSite(string userAlias, string teamSiteGuid, bool isAdmin,
        SortField sortField, SortOrder sortOrder)
        {
            TileServices tService = new TileServices(_tileRepository);
            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == new Guid(teamSiteGuid)).FirstOrDefault().Id;



            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(teamSiteGuid));
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid> { new Guid(teamSiteGuid) });


            int allreportsTileId = _tileRepository.GetAllReportsTileId(teamId);
            return _reportRepository.GetReportsByExpression(tService.GetTeamSite_AllReportsTile().GetCombinedLogic(isAdmin, allreportsTileId).GetExpression(pp))
                .Select(_ => _.ToAppReport());
        }

        public void AddReport(AppReport report) {
            Domain.MainBoundedContext.Reports.Aggregates.Report r = report.ToReport();
            
            // owners
            r.Owners = new List<User>();
            foreach (var o in report.Owners) {
                r.Owners.Add(_userRepository.GetFiltered((u)=>u.Id==o.Id).FirstOrDefault());
            }

            // team 
           // r.TeamSite = _teamRepository.Get(report.Team.Id.GetValueOrDefault());

            // category 
            r.Catagories = new List<Category>();
            foreach (var category in report.Categories)
            {
                r.Catagories.Add(_categoryRepository.Get(category.Id.GetValueOrDefault()));
            }

            // Tags
            r.Tags = new List<Tag>();
            foreach(var t in report.Tags){
                r.Tags.Add(_tagRepository.Get(t.Id.GetValueOrDefault()));
            }


            _reportRepository.AddReport(r);
        }
        public Logic GenerateLogicByFilter(ReportFilter filter)
        {
            if (filter != null)
            {
                var logic = new AND();


                if (filter.TagsIdCollection != null && filter.TagsIdCollection.Count() > 0)
                {
                    logic.AddElement((new TagId()).In(filter.TagsIdCollection));
                }


                if (filter.OwnerIdCollection != null && filter.OwnerIdCollection.Count() > 0)
                {
                    logic.AddElement((new ReportOwnerId()).In(filter.OwnerIdCollection));
                }

                if (filter.SubCategoryIdCollection != null && filter.SubCategoryIdCollection.Count() > 0)
                {
                    logic.AddElement((new SubCategoryId()).In(filter.SubCategoryIdCollection));
                }

                return logic.LogicElements.Count() > 0 ? logic : null;
            }
            else
            {
                return null;
            }

        }
      
    }
}
