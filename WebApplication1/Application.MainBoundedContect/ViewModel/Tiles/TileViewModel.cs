using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Tiles
{
    public class TileViewModel
    {
        public Int32 id { get; set; }
        public String title { get; set; }
        public String countNum { get; set; }
        public Int32 coordinateY { get; set; }
        public Int32 coordinateX { get; set; }
        public Int32 demensionX { get; set; }
        public Int32 demensionY { get; set; }
        public String backgroundColor { get; set; }
        public String icon { get; set; }
        public String backgroundImage { get; set; }
        public String overlayColor { get; set; }
        public String shownCount { get; set; }
        public int TileType { get; set; }
        public int? OwnerTeamSiteId { get; set; }
        public string LogicType { get; set; }
        public string LogicString { get; set; }
        public bool IsCustomized { get; set; }
    }
}
