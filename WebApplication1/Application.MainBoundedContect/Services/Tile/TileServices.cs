using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.Tiles;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.ViewModel.Report;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.MainBoundedContext.Reports.FilterField;
using Domain.MainBoundedContext.Teams.FilterField;

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
        /// <summary>
        /// Get all reports of a team based on the team site guid
        /// </summary>
        /// <param name="userAlias"></param>
        /// <param name="teamSiteGuid"></param>
        /// <param name="isAdmin"></param>
        /// <param name="sortField"></param>
        /// <param name="sortOrder"></param>
        /// <returns></returns>
      

        public AppTile GetTeamSite_AllReportsTile() {
            AppTile appTile = new AppTeamSiteAllReportsTile() { IsCustomized = false, Top = 0, Left = 0, Width = 1, Height = 1, TileType = TileType.TeamSite, Title = "All Reports" };

            appTile.BasicLogic = (new TeamSiteGUID()).Equal(new Parameter<Guid>() { Name = ContextVariable.CurrentTeamSiteId.ToString() });

            return appTile;
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
