using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.Tiles;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Extentions;

namespace Application.MainBoundedContect.Services.Tile
{
    public class TileServices
    {
        private ITileRepository _tileRepository;

        public TileServices(ITileRepository repository) {
            _tileRepository = repository;
        }

        public void ModifyTile(List<AppTile> tiles) {
            foreach (var tile in tiles) {
                ModifyTile(tile);
            }
        }

        public List<AppTile> GetTilesByTeamId(int id) {
            List<AppTile> aTiles = new List<AppTile>();
            foreach (var t in _tileRepository.GetTilesByTeamId(id)) {
                aTiles.Add(t.ToAppTile());
            }
            return aTiles;
        }
        public AppTile GetTileById(int id) {
            return _tileRepository.GetTileById(id).ToAppTile();
        }

        private void ModifyTile(AppTile aTile) {
            var t = aTile.ToTile();

            switch (aTile.Status)
            {
                case Enums.ChangeStatus.Add:
                    _tileRepository.AddTile(t);
                    break;
                case Enums.ChangeStatus.Change:
                    _tileRepository.ModifyTile(t);
                    break;
                case Enums.ChangeStatus.Delete:
                    _tileRepository.DeleteTile(t);
                    break;
                default: throw new ArgumentException("The tile status shall be in Add, Change and Delete");
            }
        }



    }
}
