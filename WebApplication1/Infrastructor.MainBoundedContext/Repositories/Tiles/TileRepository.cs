using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;

namespace Infrastructor.MainBoundedContext.Repositories.Tiles
{
    public class TileRepository : Repository<Tile>, ITileRepository
    {
        public TileRepository()
            : base(new MainDBUnitWorkContext())
        { }
        public TileRepository(MainDBUnitWorkContext _unitOfWork)
            : base(_unitOfWork)
        {
        }

        public void ModifyTile(Tile tilesData)
        {
            this.Modify(tilesData);
        }

        public IEnumerable<Tile> GetTiles()
        {
            throw new NotImplementedException();
        }

        public void AddTile(Tile tileData)
        {
            this.Add(tileData);
            this.UnitOfWork.Commit();
        }

        public void DeleteTile(Tile tileData)
        {
            this.Remove(tileData);
            this.UnitOfWork.Commit();
        }


        public Tile GetTileById(int tileId)
        {
            return this.GetFiltered(_=>_.Id==tileId).FirstOrDefault();
        }


        public IEnumerable<Tile> GetTilesByTeamId(int teamId)
        {
            return this.GetFiltered(_ => _.OwnerTeamSiteId == teamId);
        }


        public int GetAllReportsTileId(int teamId)
        {
            return this.GetTilesByTeamId(teamId).Where(_ => _.LogicString == "AllReports").FirstOrDefault().Id;
        }



        public Tile GetAllReportsTile(int teamId)
        {
            return this.GetTilesByTeamId(teamId).Where(_ => _.LogicString == "AllReports").FirstOrDefault();
        }
    }
}
