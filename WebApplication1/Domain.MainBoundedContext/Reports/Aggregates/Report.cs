using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public class Report : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Title;

        [Required]
        public string Description;

        public string FeaturedPicture;

        public string OtherPicture1;
        public string OtherPicture2;
        public string OtherPicture3;
        public string OtherPicture4;
        public string OtherPicture5;
        public string OtherPicture6;
        public string OtherPicture7;
        public string OtherPicture9;
        public string OtherPicture8;

        public int ReportTypeId;
        public virtual ReportType ReportType { get; set; }

        public int TeamSiteId;
        public virtual TeamSite TeamSite { get; set; }

        public int ReportStatusId;
        public virtual Status ReportStatus { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }
        public virtual ICollection<Category> Catagories { get; set; }
    }
}
