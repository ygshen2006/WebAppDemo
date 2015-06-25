using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Tiles.Aggregates
{
    public interface ITileQueryLogicRepository
    {
        ICollection<TileQueryLogic> AddBatchTileQueryLogics(ICollection<TileQueryLogic> models);
        void AddTileQueryLogics(List<TileQueryLogic> models);
        void AddTileQueryLogics(TileQueryLogic model);
        void ModifyTileQueryLogics(TileQueryLogic model);
        void RemoveTileQueryLogics(Int32 Id);
        List<TileQueryLogic> ModifyTileQueryLogic(int tileId, ICollection<TileQueryLogic> models);
        TileQueryLogic GetTileQueryLogicsById(Int32 Id);
        List<TileQueryLogic> GetTileQueryLogicsByTileId(int tileId);
    }
}
