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
    public class TileQueryLogicRepository : Repository<TileQueryLogic>, ITileQueryLogicRepository
    {
        public TileQueryLogicRepository()
            : base(new MainDBUnitWorkContext())
        { }
        public TileQueryLogicRepository(MainDBUnitWorkContext _unitOfWork)
            : base(_unitOfWork)
        {
        }
        public ICollection<TileQueryLogic> AddBatchTileQueryLogics(ICollection<TileQueryLogic> models)
        {
            List<TileQueryLogic> infoList = new List<TileQueryLogic>();

            if (models != null && models.Count() > 0)
            {
                foreach (var item in models)
                {
                    this.Add(item);
                    infoList.Add(item);
                }
            }

            return infoList;
        }

        public void AddTileQueryLogics(List<TileQueryLogic> models)
        {
            foreach (var model in models)
            {
                this.AddTileQueryLogics(model);
            }
        }

        public void AddTileQueryLogics(TileQueryLogic model)
        {
            this.Add(model);
        }

        public void ModifyTileQueryLogics(TileQueryLogic model)
        {
            TileQueryLogic qc = this.Get(model.Id);
            String errorMsg = String.Empty;

            if (qc == null)
            {
                errorMsg = String.Format("No QueryCondition with Id of {0} exists", model.Id);
            }

            if (!String.IsNullOrWhiteSpace(errorMsg))
            {
                throw new Exception(errorMsg);
            }

            qc.TileId = model.TileId;
            qc.FiledName = model.FiledName;
            qc.FiledValue = model.FiledValue;
        }

        public void RemoveTileQueryLogics(int Id)
        {
            
            TileQueryLogic qc = this.Get(Id);

            this.Remove(qc);
        }

        public List<TileQueryLogic> ModifyTileQueryLogic(int tileId, ICollection<TileQueryLogic> models)
        {
            List<TileQueryLogic> infoList = new List<TileQueryLogic>();

            List<int> ids = this.GetFiltered(_ => _.TileId == tileId).Select(_ => _.Id).ToList();
            foreach (var id in ids)
            {
                TileQueryLogic model = this.Get(id);
                this.Remove(model);
            }

            foreach (var item in models)
            {
                this.Add(item);
                infoList.Add(item);
            }

            return infoList;
        }

        public TileQueryLogic GetTileQueryLogicsById(int Id)
        {
            return this.Get(Id);
        }

        public List<TileQueryLogic> GetTileQueryLogicsByTileId(int tileId)
        {
            return this.GetFiltered(_ => _.TileId == tileId).ToList();
        }
    }
}
