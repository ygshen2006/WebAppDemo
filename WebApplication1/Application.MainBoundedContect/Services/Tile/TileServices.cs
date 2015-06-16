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

namespace Application.MainBoundedContect.Services.Tile
{
    public class TileServices
    {
        private ITileRepository _tileRepository;
        private ITeamRepository _teamRepository;
        public TileServices(ITileRepository repository, ITeamRepository teamRepository=null) {
            _tileRepository = repository;
            _teamRepository = teamRepository;
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
        public IEnumerable<AppReport> GetAllReportsOfTeamSite(String userAlias, String teamSiteGuid, Boolean isAdmin,
          SortField sortField, SortOrder sortOrder)
        {

            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == new Guid(teamSiteGuid)).FirstOrDefault().Id;
            int allreportsTileId = _tileRepository.GetAllReportsTileId(teamId);

            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(teamSiteGuid));
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid> { new Guid(teamSiteGuid) });

            return null;

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
