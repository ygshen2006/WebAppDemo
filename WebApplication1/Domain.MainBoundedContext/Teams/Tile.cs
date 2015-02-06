using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Teams
{
    public class Tile : Entity
    {
        public Tile() { }
        public Tile(int id)
            : base(id)
        {

        }

        #region Property
       
        [Required, MaxLength(50)]
        public String Title { get; set; }

        public Int32 RowNumber { get; set; }

        public Boolean IsCustomized { get; set; }

        //This is not required, if it's for any team, it should be non-null
        public Int32? OwnerTeamSiteId { get; set; }
        public virtual TeamSite OwnerTeamSite { get; set; }

        //1: MyReport, 2: TeamSite
        public Int32 TileType { get; set; }

        public Int32? SystemDefinedTile { get; set; }

        #endregion
    }
}
