using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Enums
{
    public enum CategoryTypeEnum
    {
        ChildOnly=0,
        ParentOnly,
        All
    }
    public enum UsefulLinksTypeEnum
    {
        ParentOnly,
        ChildOnly,
        All
    }



    public enum SortOrder { ASC, DESC };

    public enum SortField { ReportTitle };

    public enum ChangeStatus { Normal, Add, Change, Delete };

    public enum TileType { TeamSiteList=0, MyReport = 1, TeamSite = 2, SelfService = 3 }

    public enum LogicType { Static = 0, Selected = 1, Filtered = 2, Tagged = 3, AllReport = 4 }

    public enum PageType { MyReport, TeamSiteReport, CatalogView, SelfService };

    public enum ReportCatalogType { UserReport = 1, TeamReport = 2, DataModel = 3 }

    public enum ReportOpenWay { UserSelected = 0, ClientOrExcel = 1, BrowserOrPowerView = 2 }

    public enum ReportStatusEnum { UnAssigned = 0, Submitted = 1, Approved = 2, Rejected = 3, Retired = 4 };

    public enum ContextVariable { CurrentUser, CurrentUserGroup, CurrentTeamSiteGuid, TeamSiteGuidUnderControl, CurrentTeamSiteId };

    public class SystemDefinedTile
    {
        private SystemDefinedTile() { }

        private SystemDefinedTile(String title, Int32 systemTileId)
        {
            this.Title = title;
            this.systemTileId = systemTileId;
            SystemTilesDictionary.Add(systemTileId, this);
        }

        public String Title { get; set; }

        private Int32 systemTileId;
        public Int32 SystemDefinedTileId
        {
            get { return systemTileId; }
        }

        public static readonly Dictionary<Int32, SystemDefinedTile> SystemTilesDictionary = new Dictionary<Int32, SystemDefinedTile>();
        public static readonly SystemDefinedTile MyReports_MySubscriptions = new SystemDefinedTile("我的订阅", 1);
        public static readonly SystemDefinedTile MyReports_MyReports = new SystemDefinedTile("我的文章", 2);
        public static readonly SystemDefinedTile MyReports_Recommended = new SystemDefinedTile("我的推荐", 3);
        //public static readonly SystemDefinedTile MyReports_AllReports = new SystemDefinedTile("All Team Reports", 4);

        //public static readonly SystemDefinedTile SelfService_MyUserReports = new SystemDefinedTile("My User Reports", 6);
        //public static readonly SystemDefinedTile SelfService_Subscriptions = new SystemDefinedTile("Data Model Subscriptions", 7);
        //public static readonly SystemDefinedTile SelfService_Recommended = new SystemDefinedTile("Recommended Data Models", 8);
        //public static readonly SystemDefinedTile SelfService_AllBIModels = new SystemDefinedTile("All Data Models", 9);
        //public static readonly SystemDefinedTile SelfService_PowerViewAndExcelReports = new SystemDefinedTile("PowerView and Excel Reports", 10);
    }
}
