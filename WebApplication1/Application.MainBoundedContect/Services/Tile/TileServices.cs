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
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.Services.Report;
using Application.MainBoundedContect.ViewModel.Filters;
using Domain.MainBoundedContext.Reports.Aggregates;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.ViewModel.TeamSites;

namespace Application.MainBoundedContect.Services.Tile
{
    public class TileServices
    {
        private ITileRepository _tileRepository;

        private IReportRepository _reportRepository;
        private IUserRepository _userRepository;
        private ITeamRepository _teamRepository;
        ICategoryRepository _categoryRepository;
        ITagRepository _tagRepository;
        public TileServices(ITileRepository repository, ITeamRepository teamRepository,
            IReportRepository reportRepository, IUserRepository userRepository, ITagRepository tagRepository,
            ICategoryRepository categoryRepository
            )
        {

            _tileRepository = repository;
            _teamRepository = teamRepository;
            _reportRepository = reportRepository;
            _userRepository = userRepository;
            _tagRepository = tagRepository;
            _categoryRepository = categoryRepository;
        }

        public void ModifyTile(List<AppTile> tiles)
        {
            foreach (var tile in tiles)
            {
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


        public AppTile GetTeamSite_AllReportsTile()
        {
            AppTile appTile = new AppTeamSiteAllReportsTile() { IsCustomized = false, Top = 0, Left = 0, Width = 1, Height = 1, TileType = TileType.TeamSite, Title = "All Reports" };

            appTile.BasicLogic = (new TeamSiteGUID()).Equal(new Parameter<Guid>() { Name = ContextVariable.CurrentTeamSiteGuid.ToString() });

            return appTile;
        }

        public List<AppTile> GetTilesByTeamId(int id)
        {
            List<AppTile> aTiles = new List<AppTile>();
            foreach (var t in _tileRepository.GetTilesByTeamId(id))
            {
                aTiles.Add(t.ToAppTile());
            }
            return aTiles;
        }
        public AppTile GetTileById(int id)
        {
            return _tileRepository.GetTileById(id).ToAppTile();
        }


        /// <summary>
        /// Get all the owners that has reports owned
        /// </summary>
        /// <param name="userAlias"></param>
        /// <param name="siteGuid"></param>
        /// <param name="isCurrentSiteAdmin"></param>
        /// <returns></returns>
        public ICollection<UserLoginApp> GetOwnerList(string userAlias, string siteGuid, bool isCurrentSiteAdmin)
        {
            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == new Guid(siteGuid)).FirstOrDefault().Id;

            int allReportTileID = _tileRepository.GetAllReportsTileId(teamId);

            EditReportService editService = new EditReportService(_reportRepository, _userRepository, _teamRepository, _categoryRepository, _tagRepository, _tileRepository);

            ICollection<Statistics> ls = editService.GetTeamSiteReportsStatistics(allReportTileID, userAlias, siteGuid, isCurrentSiteAdmin);

            IEnumerable<UserLoginApp> userList = new List<UserLoginApp>();
            if (ls.Count() > 0)
            {
                Statistics OwnerStatistics = ls.Where(_ => _.Name == "Owner").FirstOrDefault();

                userList = OwnerStatistics.Values.Select(_ => new UserLoginApp
                {
                    Id = _.GUID,

                    UserName = _.Name
                }).OrderBy(_ => _.UserName);
            }

            return userList.ToList();

        }

        public ICollection<AppCategory> GetCategoryList()
        {
            IEnumerable<AppCategory> categoryList = _categoryRepository.GetAllCategories().Select(_ => new AppCategory { Id = _.Id, CategoryName = _.Name, ParentId = _.CategoryParentId }).OrderBy(_ => _.Id);
            return categoryList.ToList();
        }
        public ICollection<AppTeamTag> GetTagListByTeam(string teamGuid)
        {

            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == Guid.Parse(teamGuid)).FirstOrDefault().Id;

            IEnumerable<AppTeamTag> tagList = _tagRepository.GetTagsByTeamId(teamId).
                Select(_ => new AppTeamTag
                {
                    Id = _.Id,
                    Title = _.TagName,
                    TeamId = _.TeamSiteId
                });

                return tagList.ToList();
        }

        private void ModifyTile(AppTile aTile)
        {
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
