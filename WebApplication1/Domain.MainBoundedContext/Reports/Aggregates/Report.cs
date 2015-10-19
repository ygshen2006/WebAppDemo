using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Tags;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public class Report : Entity
    {

        public string Title { get; set; }

        public string Description { get; set; }

        public string FeaturedPicture { get; set; }

        public int TeamSiteId { get; set; }
        public virtual TeamSite TeamSite { get; set; }

        public int StatusId { get; set; }
        public virtual Status ReportStatus { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }
        public virtual ICollection<Category> Catagories { get; set; }

        public virtual ICollection<User> Owners
        { get; set; }

        public string ReportContent { get; set; }
    }
}
