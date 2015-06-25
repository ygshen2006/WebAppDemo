using Application.MainBoundedContect.ViewModel.Tiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.MainBoundedContext.Repositories.Tiles;
using Application.MainBoundedContect.Services.Tile;
using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.Services.SiteAdmininstration;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Application.MainBoundedContect.Extentions;
using Domain.MainBoundedContext.Reports.FilterField;
using Application.MainBoundedContect.ViewModel.Report;
using Infrastructor.MainBoundedContext.Repositories.Reports;
using Application.MainBoundedContect.Services.Report;
namespace WebApplication1.Ajax
{
    public partial class TeamDashBoardAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["queryType"] == "updateadmintileinfo")
            {
                try
                {
                    UpdateTileInformation();
                }
                catch (Exception ex)
                {
                    Response.Write("{\"result\":\"0\"}");
                    return;
                }
                Response.Write("{\"result\":\"1\"}");

                return;
            }
            if (Request.Params["queryType"] == "getadmintileinfo") {
                Response.Write(LoadTeamTiles());
            }

          
        }

        private void UpdateTileInformation() {
            // Update team site dashboard settings 

            var tileData = Request.Params["TilesData"];
            var teamGuid = Request.Params["SiteGUID"].ToString();
            // tile data
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<TileViewModel> paraTileList = jss.Deserialize<List<TileViewModel>>(tileData);

            // Save the tile data into our database
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext()) {
                
                TileRepository repository = new TileRepository(context);
                
                // Get the team id by its team guid value
                TeamRepository tRepository = new TeamRepository(context);
                TeamAppService teamService = new TeamAppService(tRepository);

                int teamId = teamService.GetAllTeamSites().First(_ => _.TeamGuid == Guid.Parse(teamGuid)).Id.Value;
                //validate the data
                if (paraTileList.Count() > 24)
                {
                    throw new ArgumentException("the count of the tile is more than 24");
                }

                foreach (var item in paraTileList)
                {
                    if (item.coordinateX < 0 || item.coordinateX > 7)
                    {
                        throw new ArgumentException("coordinateX must be between 0 and 7");
                    }

                    if (item.coordinateY < 0 || item.coordinateY > 2)
                    {
                        throw new ArgumentException("coordinateY must be between 0 and 2");
                    }

                    if (item.demensionX < 1 || item.demensionX > 8)
                    {
                        throw new ArgumentException("demensionX must be between 1 and 8");
                    }

                    if (item.demensionY < 1 || item.demensionY > 3)
                    {
                        throw new ArgumentException("demensionY must be between 1 and 3");
                    }
                }

                TileServices tService = new TileServices(repository, null,null,null,null,null,null);

                List<AppTile> tiles = new List<AppTile>();

                List<AppTile> orignalTiles = tService.GetTilesByTeamId(teamId).ToList();

                //tiles will be remove
                foreach (var item in orignalTiles)
                {
                 
                    if (!paraTileList.Any(_ => _.id == item.Id))
                    {
                        AppTile appTile = tService.GetTileById(item.Id.Value);
                        appTile.Status = ChangeStatus.Delete;
                        tiles.Add(appTile);
                    }
                }

                foreach (var para in paraTileList)
                {
                    //tiles will be Added
                    if (para.id < 0)
                    {
                        AppTile appTile = new AppTeamSiteCustomizedTile();
                        appTile.TileType = TileType.TeamSite;
                        appTile.Status = ChangeStatus.Add;
                        appTile.Title = para.title;
                        appTile.Top = para.coordinateY;
                        appTile.Left = para.coordinateX;
                        appTile.Width = para.demensionX;
                        appTile.Height = para.demensionY;
                        appTile.BackgroundColor = para.backgroundColor;
                        appTile.Icon = para.icon;
                        appTile.BackgroundImage = para.backgroundImage;
                        appTile.ImageOverlayColor = para.overlayColor;
                        appTile.ReportCountStyle = para.shownCount;
                        appTile.OwnerTeamSiteId = teamId;
                        appTile.IsCustomized = true;
                        appTile.logicType = (LogicType)Enum.Parse(typeof(LogicType), para.LogicType);

                        SetAppTitleLogic(para.LogicString, appTile);
                        tiles.Add(appTile);
                    }

                    //tiles will be Updated
                    if (para.id > 0)
                    {
                        AppTile appTile = tService.GetTileById(para.id);

                        if (appTile == null)
                        {
                            continue;
                        }

                        appTile.Status = ChangeStatus.Change;
                        appTile.Top = para.coordinateY;
                        appTile.Left = para.coordinateX;
                        appTile.Width = para.demensionX;
                        appTile.Height = para.demensionY;
                        appTile.BackgroundColor = para.backgroundColor;
                        appTile.Icon = para.icon;
                        appTile.BackgroundImage = para.backgroundImage;
                        appTile.ImageOverlayColor = para.overlayColor;
                        appTile.ReportCountStyle = para.shownCount;
                        appTile.IsCustomized = true;

                        if (appTile.logicType != LogicType.AllReports)
                        {
                            appTile.Title = para.title;
                            appTile.logicType = (LogicType)Enum.Parse(typeof(LogicType), para.LogicType);
                            SetAppTitleLogic(para.LogicString, appTile);
                        }

                        tiles.Add(appTile);
                    }
                }

                tService.ModifyTile(tiles);

                
            }

        }

        private string LoadTeamTiles() { 
            var teamGuid = Request.Params["SiteGUID"].ToString();
            string userAlias = Session["UserName"].ToString();
            // tile data
            JavaScriptSerializer jss = new JavaScriptSerializer();

            // Save the tile data into our database
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                TileRepository repository = new TileRepository(context);

                // Get the team id by its team guid value
                TeamRepository tRepository = new TeamRepository(context);
                TeamAppService teamService = new TeamAppService(tRepository);
                TileQueryLogicRepository tileQueryRepository = new TileQueryLogicRepository(context);
                int teamId = teamService.GetAllTeamSites().First(_ => _.TeamGuid == Guid.Parse(teamGuid)).Id.Value;
                TileServices tService = new TileServices(repository, tRepository, null, null, null, null, tileQueryRepository);
                List<TileViewModel> tiles = tService.GetCustomerizeTilesWithCountByTeamId(teamId, userAlias,true, teamGuid).Select(_ => _.ToTileViewModel()).ToList<TileViewModel>();

                return jss.Serialize(tiles);
            }
        }

        private void SetAppTitleLogic(string logicString, AppTile appTile)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                TileRepository repository = new TileRepository(context);
                ReportRepository _reportRepository = new ReportRepository(context);
               
                if (!string.IsNullOrEmpty(logicString))
                {
                    EditReportService reportService = new EditReportService(null, null, null, null, null, null);

                    switch (appTile.logicType)
                    {
                        case LogicType.Static:
                            appTile.BasicLogic = null;
                            break;

                        case LogicType.Selected:
                            List<int> cataIDList = logicString.Split(',').Select(_ => Convert.ToInt32(_)).ToList();
                            appTile.BasicLogic = (new ReportDataId()).In(cataIDList);
                            break;

                        case LogicType.Filtered:
                            ReportFilter filer = new ReportFilter();
                            
                            JavaScriptSerializer jss = new JavaScriptSerializer();

                            #region Deserialize
                            TileFilterListViewModel vm = new TileFilterListViewModel();
                            if (!String.IsNullOrEmpty(logicString))
                                vm = jss.Deserialize<TileFilterListViewModel>(logicString);

                            #endregion

                            #region Get ReportFilter
                            filer.OwnerIdCollection = (from o in vm.Owner select o.Id).ToList();
                            //filer.CatalogTypeIdCollection = (from c in vm.CatelogType select c.Id).ToList();
                            filer.TagsIdCollection = (from t in vm.Tag select t.Id.Value).ToList();
                            filer.SubCategoryIdCollection = (from c in vm.SubCategory select c.Id.Value).ToList();
                            #endregion

                            appTile.BasicLogic = reportService.GenerateLogicByFilter(filer);
                            break;

                        case LogicType.Tagged:
                            List<int> tagIds = logicString.Split(',').Select(i => int.Parse(i.Trim())).ToList();
                            appTile.BasicLogic = (new TagId()).In(tagIds);
                            break;

                        case LogicType.AllReports:
                            appTile.BasicLogic = null;
                            break;
                    }
                }
                else
                {
                    appTile.BasicLogic = null;
                }
            }
        }
    }
}