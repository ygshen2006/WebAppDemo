using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Reports.Logics.Aggregates;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Domain.MainBoundedContext.Users;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Teams.Aggregates.TeamSites
{
    public class TeamSite : Entity
    {
        public TeamSite() {
            CrateList();        
        }
        public TeamSite(int id):base(id)
        {
            CrateList();
        }

        #region Properties
        public Guid TeamGuid { get; set; }

        [Required]
        [MaxLength(50)]
        public string TeamName { get; set; }

        [Required]
        public string TeamDescription { get; set; }

        public virtual ICollection<User> TeamOwners { get; set; }


        public string TeamLogo { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Tile> Tiles { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }

        public virtual ICollection<Report> Reports { get; set; }

        public int? SegmentId { get; set; }
        public virtual Segment Segment { get; set; }
        #endregion

        #region Methods
        public void CrateList()
        {
            Tiles = new List<Tile>();
            Tags = new List<Tag>();
            Reports = new List<Report>();
        }
        #endregion
    }
}
