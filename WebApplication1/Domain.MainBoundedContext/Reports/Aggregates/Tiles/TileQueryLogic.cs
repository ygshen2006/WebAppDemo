using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Teams;
using Domain.SeedWork;
using Domain.MainBoundedContext.Tiles.Aggregates;

namespace Domain.MainBoundedContext.Reports.Logics.Aggregates.Tiles
{
   public class TileQueryLogic: Entity
    {
        public String FiledName { get; set; }

        public String FiledValue { get; set; }

        public Int32 TileId { get; set; }

        public virtual Tile Tile { get; set; }
    }
}
