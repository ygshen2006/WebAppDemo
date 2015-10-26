
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.Report;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Users;

namespace Application.MainBoundedContect.Extentions
{
    public static class ReportExtensions
    {
        public static AppReport ToAppReport(this Report report)
        {
            return new AppReport()
            {
                Categories = report.Catagories.Select(_ => _.ToAppCategory()).ToList<AppCategory>(),
                Content = report.ReportContent,
                Description = report.Description,
                Title = report.Title,
                Id = report.Id,
                Team = report.TeamSite.ToAppTeamSite(),
                Status = report.ReportStatus.ToAppStatus(),
                Tags = report.Tags.Select(_ => _.ToAppTeamTag()).ToList<AppTeamTag>(),
                Owners = report.Owners.Select(_ => _.ToAppUser()).ToList<UserLoginApp>(),
                Images=report.FeaturedPicture==null?null:report.FeaturedPicture.Split(';')
            };
        }
        public static Report ToReport(this AppReport report)
        {
            string imageStr = "";
            if (report.Images != null && report.Images.Length > 0)
            {
                foreach (string str in report.Images)
                {
                    imageStr += str + ";";
                }
            }
            return new Report()
            {
                FeaturedPicture = imageStr,
                Title = report.Title,
                ReportContent = report.Content,
                TeamSiteId = report.Team.Id.GetValueOrDefault(),
                Description = report.Description,
                //Owners = report.Owners.Select(_ => _.ToUser()).ToList(),
                //TeamSite=report.Team.ToTeamSite(),
                Id = report.Id.GetValueOrDefault(),
                StatusId = report.Status.Id.GetValueOrDefault()
            };
        }
    }
}
