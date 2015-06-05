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

namespace Application.MainBoundedContect.Services.Report
{
    public class EditReportService
    {
        IReportRepository _reportRepository;
        public EditReportService(IReportRepository repository_report) {
            _reportRepository = repository_report;
        }
        public void AddReport(AppReport report) {
            _reportRepository.AddReport(report.ToReport());
        }
    }
}
