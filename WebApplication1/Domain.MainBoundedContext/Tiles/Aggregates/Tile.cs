using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Tiles.Aggregates
{
    public class Tile : Entity
    {
        public String Title { get; set; }

        public Int32 Top { get; set; }

        public Int32 Left { get; set; }

        public Int32 Width { get; set; }

        public Int32 Height { get; set; }

        public String BackgroundColor { get; set; }

        public String Icon { get; set; }

        public String BackgroundImage { get; set; }

        public String ImageOverlayColor { get; set; }

        public String ReportCountStyle { get; set; }

        //public Boolean AutoLaunch { get; set; }

        public Boolean IsCustomized { get; set; }

        public Int32? OwnerTeamSiteId { get; set; }

        public virtual TeamSite OwnerTeamSite { get; set; }

        /// <summary>
        /// Defined in the Application.DTO.Enums. 
        /// Can be "My Report", "TeamSite Report and so on"
        /// </summary>
        public Int32 TileType { get; set; }

        /// <summary>
        /// "Static, Taged, Filtered"
        /// </summary>
        public Int32 LogicStringType { get; set; }

        public String LogicString { get; set; }

        public virtual ICollection<TileQueryLogic> TileQueryLogics { get; set; }
    }
}
