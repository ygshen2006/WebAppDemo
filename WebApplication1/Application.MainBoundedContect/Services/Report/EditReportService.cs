﻿using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;
using Application.MainBoundedContect.ViewModel.Report;
using Application.MainBoundedContect.Extentions;
using Domain.MainBoundedContext.Users;
using Domain.MainBoundedContext.Teams.Tags;
using Domain.MainBoundedContext.Teams.Aggregates.Tags;
using Application.MainBoundedContect.Enums;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Tiles.Aggregates;
using Application.MainBoundedContect.Services.Tile;
using Domain.MainBoundedContext.Reports.FilterField;
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.ViewModel.Filters;
using Application.MainBoundedContect.ViewModel.Tiles;
using Domain.MainBoundedContext.Teams.FilterField;
using Application.MainBoundedContect.ViewModel.SiteAdministration;

namespace Application.MainBoundedContect.Services.Report
{
    public class EditReportService
    {
        IReportRepository _reportRepository;
        IUserRepository _userRepository;
        ITeamRepository _teamRepository;
        ICategoryRepository _categoryRepository;
        ITagRepository _tagRepository;
        ITileRepository _tileRepository;

        public EditReportService(IReportRepository repository_report, IUserRepository repository_user,
            ITeamRepository repository_team, ICategoryRepository category_repository, ITagRepository repository_tag, ITileRepository repository_tile)
        {
            _reportRepository = repository_report;
            _userRepository = repository_user;
            _teamRepository = repository_team;
            _categoryRepository = category_repository;
            _tagRepository = repository_tag;
            _tileRepository = repository_tile;
        }

        public Int32 GetTempTilesWithReportCount(String teamSiteGuid, string userAlias, AppTile appTile)
        {
            Guid guid = new Guid(teamSiteGuid);

            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(teamSiteGuid));
            pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid>() { new Guid(teamSiteGuid) });

            appTile.BasicLogic = appTile.BasicLogic.And((new TeamSiteGUID()).Equal(guid));
            appTile.ReportCount = _reportRepository.GetReportsByExpression(appTile.GetCombinedLogic(true, appTile.Id).GetExpression(pp)).Count();

            return appTile.ReportCount;
        }
        /// <summary>
        /// Team Site All reports
        /// </summary>
        /// <param name="userAlias"></param>
        /// <param name="teamSiteGuid"></param>
        /// <param name="isAdmin"></param>
        /// <param name="sortField"></param>
        /// <param name="sortOrder"></param>
        /// <returns></returns>
        public IEnumerable<AppReport> GetAllReportsOfTeamSite(string userAlias, string teamSiteGuid, bool isAdmin,
        SortField sortField, SortOrder sortOrder)
        {
            TileServices tService = new TileServices(_tileRepository, _teamRepository,_reportRepository, null,null,null,null);
            int teamId = _teamRepository.GetFiltered(_ => _.TeamGuid == new Guid(teamSiteGuid)).FirstOrDefault().Id;



            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(teamSiteGuid));
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid> { new Guid(teamSiteGuid) });


            int allreportsTileId = _tileRepository.GetAllReportsTileId(teamId);
            return _reportRepository.
                GetReportsByExpression(
                tService.GetTeamSite_AllReportsTile()
                .GetCombinedLogic(isAdmin, allreportsTileId)
                .GetExpression(pp)).ToArray()
                .Select(_ => _.ToAppReport());
        }


        public ICollection<Statistics> GetTeamSiteReportsStatistics(Int32 tileId, String userAlias, String teamSiteGuid, Boolean isCurrentSiteAdmin)
        {
            bool hasAdminSite = isCurrentSiteAdmin;
            AppTile at = _tileRepository.GetTileById(tileId).ToAppTile();



            ParameterProvider pp = new ParameterProvider();
            pp.AddParameter(ContextVariable.CurrentUser.ToString(), userAlias);
            pp.AddParameter(ContextVariable.CurrentTeamSiteGuid.ToString(), new Guid(teamSiteGuid));
            //pp.AddParameter(ContextVariable.CurrentUserGroup.ToString(), appUserGroupList);

            if (hasAdminSite)
            {
                pp.AddParameter(ContextVariable.TeamSiteGuidUnderControl.ToString(), new List<Guid>() { new Guid(teamSiteGuid) });
            }


            Logic logic = at.GetCombinedLogic(hasAdminSite, tileId).And((new TeamSiteGUID()).Equal(Guid.Parse(teamSiteGuid)));
            return GetStatistics(_reportRepository.GetReportByLogic(logic, pp).ToArray().Select(_=>_.ToAppReport()).ToList());
        }

        private IList<Statistics> GetStatistics(List<AppReport> lists)
        {
            List<Statistics> statisticsList = new List<Statistics>();

            if (lists != null && lists.Count() > 0)
            {
                #region Linq Statement
                #region Tags
                List<Tag> tags = new List<Tag>();

                // Get the Tags ststistics
                var tagStatistics = lists
                    .SelectMany(_ => _.Tags)
                    .GroupBy(t => t, (k, g) => new AttributeValue
                    {
                        ParentValue = k.TeamId,
                        Name = k.Title,
                        Value = k.Id.GetValueOrDefault(),
                        Count = g.Count()
                    }).ToArray();

                // Add the statistics to List<Tags>
                FunGetStatisticsList("Tag", tagStatistics, statisticsList);

                //var tagTeamSitesStatistics = lists
                //    .SelectMany(_ => _.Tags)
                //    .GroupBy(t => t, (k, g) => new AttributeValue
                //    {
                //        Name = k.TeamSite.Name,
                //        Value = k.TeamSite.Id
                //    }).GroupBy(_ => _.Value).Select(_ => _.FirstOrDefault()).ToArray();

                //// Add the statistics to List<TeamSite>
                //FunGetStatisticsList("Team Tags", tagTeamSitesStatistics, statisticsList);
                #endregion

                #region OwnerStatistics
                List<User> owners = new List<User>();

                // Get the owner ststistics
                var ownerStatistics = lists
                    .SelectMany(_ => _.Owners)
                    .GroupBy(t => t, (k, g) => new AttributeValue
                    {
                        Name = k.UserName,
                        GUID = k.Id,
                        Count = g.Count()
                    }).ToArray();

                // Add the statistics to List<statistics>
                FunGetStatisticsList("Owner", ownerStatistics, statisticsList);
                #endregion

                #region CategoryStatistics
           

                //// Get the Subcategory statisticsData
                //IEnumerable<AppCategory> secondLevelCategories = null;
                //IEnumerable<AppCategory> topLevelCategories = null;
                //IEnumerable<AttributeValue> SubCategoryStatistics = null;
                //IEnumerable<AttributeValue> CategoryStatistics = null;
                //List<AppCategoryExtension.IsDelayLoad> delayLoadFlags = new List<AppCategoryExtension.IsDelayLoad>();
                //delayLoadFlags.Add(AppCategoryExtension.IsDelayLoad.DelayLoadParent);
                //delayLoadFlags.Add(AppCategoryExtension.IsDelayLoad.DelayLoadCatalogDatas);

                //secondLevelCategories = lists.SelectMany(_ => _.Categories).ToList().Select(_ => _.ToAppCategory(delayLoadFlags));

                //secondLevelCategories = secondLevelCategories.Distinct(new CategoryComparer());

                //SubCategoryStatistics = secondLevelCategories.Select(_ => new AttributeValue
                //{
                //    Name = _.Name,
                //    Value = _.Id.Value,
                //    ParentValue = _.ParentId,
                //    Count = CaculateCount(lists, _.AppCatalogDatas)
                //}).ToArray();


                //topLevelCategories = secondLevelCategories.Select(_ => _.Parent).Distinct(new CategoryComparer());

                //CategoryStatistics = topLevelCategories.OrderBy(_ => _.Order).Select(_ => new AttributeValue
                //{
                //    Name = _.Name,
                //    Value = _.Id.Value
                //});



                //// Add the statistics to List<statistics>
                //FunGetStatisticsList("Sub Category", SubCategoryStatistics, statisticsList);

                //// Add the statistics to List<statistics>
                //FunGetStatisticsList("Category", CategoryStatistics, statisticsList);

                #endregion

                

                #endregion
            }

            return statisticsList;
        }

        private void FunGetStatisticsList(String name, IEnumerable<AttributeValue> StatisticsData, List<Statistics> statisticsList)
        {
            Statistics statistics = new Statistics { Name = name };

            if (StatisticsData != null)
            {
                statistics.Values.AddRange(StatisticsData);
            }

            statisticsList.Add(statistics);

            // if it is Cateogory, List order by the default rule which has been specified from the outsite of the method
            if (name.Equals("Category"))
            {
                return;
            }
            else
            {
                statistics.Values = statistics.Values.OrderByDescending(_ => _.Count).ThenBy(_ => _.Name).ToList();
            }
        }

        public void AddReport(AppReport report)
        {
            Domain.MainBoundedContext.Reports.Aggregates.Report r = report.ToReport();

            // owners
            r.Owners = new List<User>();
            foreach (var o in report.Owners)
            {
                r.Owners.Add(_userRepository.GetFiltered((u) => u.Id == o.Id).FirstOrDefault());
            }

            // team 
            // r.TeamSite = _teamRepository.Get(report.Team.Id.GetValueOrDefault());

            // category 
            r.Catagories = new List<Category>();
            foreach (var category in report.Categories)
            {
                r.Catagories.Add(_categoryRepository.Get(category.Id.GetValueOrDefault()));
            }

            // Tags
            r.Tags = new List<Tag>();
            foreach (var t in report.Tags)
            {
                r.Tags.Add(_tagRepository.Get(t.Id.GetValueOrDefault()));
            }


            _reportRepository.AddReport(r);
        }

        public Logic GenerateLogicByFilter(ReportFilter filter)
        {
            if (filter != null)
            {
                var logic = new AND();


                if (filter.TagsIdCollection != null && filter.TagsIdCollection.Count() > 0)
                {
                    logic.AddElement((new TagId()).In(filter.TagsIdCollection));
                }


                if (filter.OwnerIdCollection != null && filter.OwnerIdCollection.Count() > 0)
                {
                    logic.AddElement((new ReportOwnerId()).In(filter.OwnerIdCollection));
                }

                if (filter.SubCategoryIdCollection != null && filter.SubCategoryIdCollection.Count() > 0)
                {
                    logic.AddElement((new SubCategoryId()).In(filter.SubCategoryIdCollection));
                }

                return logic.LogicElements.Count() > 0 ? logic : null;
            }
            else
            {
                return null;
            }

        }

    }
}
