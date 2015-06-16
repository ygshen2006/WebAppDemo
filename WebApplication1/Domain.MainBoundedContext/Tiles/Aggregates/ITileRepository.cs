using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.SeedWork;

namespace Domain.MainBoundedContext.Tiles.Aggregates
{
    public interface ITileRepository : IRepository<Tile>
    {
        void AddTile(Tile tileData);
        void ModifyTile(Tile tilesData);
        void DeleteTile(Tile tileData);
        IEnumerable<Tile> GetTilesByTeamId(int teamId);
        int GetAllReportsTileId(int teamId);
        Tile GetTileById(int tileId);
        IEnumerable<Tile> GetTiles();
    }
}
