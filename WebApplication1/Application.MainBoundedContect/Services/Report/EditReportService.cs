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

namespace Application.MainBoundedContect.Services.Report
{
    public class EditReportService
    {
        IReportRepository _reportRepository;
        IUserRepository _userRepository;
        ITeamRepository _teamRepository;
        ICategoryRepository _categoryRepository;
        ITagRepository _tagRepository;

        public EditReportService(IReportRepository repository_report,
            IUserRepository repository_user, 
            ITeamRepository repository_team,
            ICategoryRepository category_repository,
            ITagRepository repository_tag) {
            _reportRepository = repository_report;
            _userRepository = repository_user;
            _teamRepository = repository_team;
            _categoryRepository = category_repository;
            _tagRepository = repository_tag;
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

      
    }
}
