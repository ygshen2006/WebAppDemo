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
        ITileQueryLogicRepository _tileQueryLogicRepository;

        public TileServices(ITileRepository repository, ITeamRepository teamRepository,
            IReportRepository reportRepository, IUserRepository userRepository, ITagRepository tagRepository,
            ICategoryRepository categoryRepository, ITileQueryLogicRepository _tileQRepository
            )
        {

            _tileRepository = repository;
            _teamRepository = teamRepository;
            _reportRepository = reportRepository;
            _userRepository = userRepository;
            _tagRepository = tagRepository;
            _categoryRepository = categoryRepository;
            _tileQueryLogicRepository = _tileQRepository;
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
        public List<AppTile> GetCustomerizeTilesWithCountByTeamId(int id, string userAlias, bool isAdmin, string guid)
        {


            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(guid));
            if (isAdmin)
            {
                pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid>() { new Guid(guid) });
            }

            List<AppTile> aTiles = new List<AppTile>();
            foreach (var t in _tileRepository.GetTilesByTeamId(id))
            {
                aTiles.Add(t.ToAppTile());
            }
            Guid teamGuid = Guid.Parse(guid);
            foreach (var item in aTiles)
            {
                item.BasicLogic = this.GetAppTileLogic(item);

                if (item.IsCustomized)
                {
                    item.ReportCount = _reportRepository.GetReportsByExpression(item.GetCombinedLogic(isAdmin, item.Id).And((new TeamSiteGUID()).Equal(teamGuid)).GetExpression(pp)).Count();
                }
                else
                {
                    item.ReportCount = _reportRepository.GetReportsByExpression(item.GetCombinedLogic(isAdmin, item.Id).GetExpression(pp)).Count();
                }

            }
            return aTiles;
        }
        public AppTile GetTileById(int id)
        {
            var appTile = _tileRepository.GetTileById(id).ToAppTile();
            appTile.BasicLogic = GetAppTileLogic(appTile);
            return appTile;
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
            Guid currentTeamGuid = Guid.Parse(teamGuid);
            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == currentTeamGuid).FirstOrDefault().Id;

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
            var queryLogicList = this.GenerateQueryLogicFromAppTile(aTile);

            switch (aTile.Status)
            {
                case Enums.ChangeStatus.Add:
                    t.TileQueryLogics = _tileQueryLogicRepository.AddBatchTileQueryLogics(queryLogicList);
                    _tileRepository.AddTile(t);
                    break;
                case Enums.ChangeStatus.Change:
                    var logics = _tileQueryLogicRepository.AddBatchTileQueryLogics(queryLogicList);
                    t.TileQueryLogics = _tileQueryLogicRepository.ModifyTileQueryLogic(aTile.Id.Value, logics);

                    _tileRepository.ModifyTile(t);
                    break;
                case Enums.ChangeStatus.Delete:
                    _tileRepository.DeleteTile(t);
                    break;
                default: throw new ArgumentException("The tile status shall be in Add, Change and Delete");
            }
        }

        private Logic GetAppTileLogic(AppTile appTile)
        {
            if (!appTile.IsCustomized)
            {
                #region Generate logic for SystemDefined Tile
                switch (appTile.Id)
                {
                    case 1:
                        appTile = GetMyReport_SubscriptionTile();
                        break;
                    case 2:
                        appTile = GetMyReport_MyReportTile();
                        break;
                    case 3:
                        appTile = GetMyReport_RecommendedTile();
                        break;

                    default:
                        break;
                }
                #endregion
            }
            else
            {
                appTile.BasicLogic = GenerateTileLogic(appTile);
            }

            return appTile.BasicLogic;
        }
        private Logic GenerateTileLogic(AppTile appTile)
        {
            if (appTile.logicType == LogicType.AllReports)
            {
                return GetTeamSite_AllReportsTile().BasicLogic;
            }
            else
            {

                List<TileQueryLogic> tileLogicList = _tileQueryLogicRepository.GetTileQueryLogicsByTileId(appTile.Id.Value);

                #region Generate the Logic

                #region Set up the dictionary of type

                var tagId = new TagId();
                var reportOwnerId = new ReportOwnerId();
                var subCategoryId = new SubCategoryId();
                var reportDataId = new ReportDataId();

                Dictionary<string, IIN<Int32>> dc = new Dictionary<string, IIN<int>>();
                dc.Add(tagId.Name, tagId);
                //dc.Add(reportOwnerId.Name, reportOwnerId);
                dc.Add(subCategoryId.Name, subCategoryId);
                dc.Add(reportDataId.Name, reportDataId);


                Dictionary<string, IIN<String>> dcString = new Dictionary<string, IIN<string>>();
                dcString.Add(reportOwnerId.Name, reportOwnerId);


                #endregion

                Logic resultLogic = null;

                if (appTile.logicType == LogicType.Selected)
                {
                    resultLogic = dc[reportDataId.Name].In(tileLogicList[0].FiledValue.Split(',').Select(_ => int.Parse(_)));
                }

                if (appTile.logicType == LogicType.Filtered)
                {
                    var logic = new AND();
                    foreach (var item in tileLogicList)
                    {
                        Logic l = null;


                        if (item.FiledValue.GetType() == typeof(string) && dcString.Keys.Contains<string>(item.FiledName))
                        {
                            l = dcString[item.FiledName].In(item.FiledValue.Split(',').Select(_ => _.ToString()));
                        }
                        else
                        {
                            l = dc[item.FiledName].In(item.FiledValue.Split(',').Select(_ => int.Parse(_)));
                        }
                        logic.AddElement(l);
                    }
                    resultLogic = logic;
                }

                if (appTile.logicType == LogicType.Tagged)
                {
                    Logic logic = dc[tagId.Name].In(tileLogicList[0].FiledValue.Split(',').Select(_ => int.Parse(_)));
                    resultLogic = logic;
                }

                #endregion

                return resultLogic;
            }
        }
        private List<TileQueryLogic> GenerateQueryLogicFromAppTile(AppTile appTile)
        {
            List<TileQueryLogic> logicList = new List<TileQueryLogic>();
            TileQueryLogic logic = null;

            #region switch
            switch (appTile.logicType)
            {
                case LogicType.Selected:
                    logic = SetTileQueryLogic(appTile.BasicLogic, appTile);
                    logicList.Add(logic);
                    break;

                case LogicType.Filtered:
                    foreach (var item in (appTile.BasicLogic as AND).LogicElements)
                    {
                        logic = SetTileQueryLogic(item, appTile);
                        logicList.Add(logic);
                    }
                    break;

                case LogicType.Tagged:
                    logic = SetTileQueryLogic(appTile.BasicLogic, appTile);
                    logicList.Add(logic);
                    break;

                default:
                    break;
            }
            #endregion

            return logicList;
        }
        private TileQueryLogic SetTileQueryLogic(Logic logic, AppTile appTile)
        {
            TileQueryLogic qc = new TileQueryLogic();

            if ((logic as IN<string>) != null)
            {
                qc.FiledName = (logic as IN<string>).Field.Name;
                qc.FiledValue = string.Join(",", (logic as IN<string>).FieldValue.GetValue());

            }
            else
            {
                qc.FiledName = (logic as IN<Int32>).Field.Name;
                qc.FiledValue = string.Join(",", (logic as IN<Int32>).FieldValue.GetValue());
            }

            if (appTile.Id != null)
                qc.TileId = appTile.Id.Value;
            return qc;
        }
        #region myreport
        private AppTile GetMyReport_SubscriptionTile()
        {
            AppTile appTile = new AppMySubscriptionsTile() { IsCustomized = false, Top = 0, Left = 0, Width = 1, Height = 1, TileType = TileType.MyReport, Title = SystemDefinedTile.MyReports_MySubscriptions.Title, SystemDefinedTile = SystemDefinedTile.MyReports_MySubscriptions };

            //appTile.BasicLogic = (new SubscriberAlias()).Equal(new Parameter<String>() { Name = ContextVariable.CurrentUser.ToString() })
            //                    .And(((new CatalogTypeId()).Equal(1)).Or(((new CatalogTypeId()).Equal(2)).And((new ReportStatusId()).Equal(2))));

            return appTile;
        }

        private AppTile GetMyReport_MyReportTile()
        {
            var appTile = new AppMyReportsTile() { IsCustomized = false, Top = 0, Left = 0, Width = 1, Height = 1, TileType = TileType.MyReport, Title = SystemDefinedTile.MyReports_MyReports.Title, SystemDefinedTile = SystemDefinedTile.MyReports_MyReports };

            //appTile.BasicLogic = (new ReportOwnerAlias()).Equal(new Parameter<String>() { Name = ContextVariable.CurrentUser.ToString() });

            return appTile;
        }

        private AppTile GetMyReport_RecommendedTile()
        {
            AppTile appTile = new AppRecommendedTile() { IsCustomized = false, Top = 0, Left = 1, Width = 1, Height = 1, TileType = TileType.MyReport, Title = SystemDefinedTile.MyReports_Recommended.Title, SystemDefinedTile = SystemDefinedTile.MyReports_Recommended };

            //appTile.BasicLogic = (new RecommendToUserAlias()).Equal(new Parameter<String>() { Name = ContextVariable.CurrentUser.ToString() })
            //                    .And(((new CatalogTypeId()).Equal(1)).Or(((new CatalogTypeId()).Equal(2)).And((new ReportStatusId()).Equal(2))));

            return appTile;
        }

        #endregion
    }
}
