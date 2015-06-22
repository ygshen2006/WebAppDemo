using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.Enums;
using Domain.MainBoundedContext.Logics;
using Domain.MainBoundedContext.Reports.Logics.FilterField;
using Domain.MainBoundedContext.Teams.FilterField;

namespace Application.MainBoundedContect.ViewModel.Tiles
{
    public abstract class AppTile
    {
        public AppTile()
        {
            this.Status = ChangeStatus.Normal;
        }

        #region Attributes
        public Int32? Id { get; set; }

        public String Title { get; set; }

        public Int32 Top { get; set; }

        public Int32 Left { get; set; }

        public Int32 Width { get; set; }

        public Int32 Height { get; set; }

        public String BackgroundColor { get; set; }

        public String Icon { get; set; }

        public String BackgroundImage { get; set; }

        public String ImageOverlayColor { get; set; }

        public String ReportCountStyle { get; set; }

        //public Boolean AutoLaunch { get; set; }

        public Boolean IsCustomized { get; set; }

        public Int32? OwnerTeamSiteId { get; set; }

        public TileType TileType { get; set; }

        public SystemDefinedTile SystemDefinedTile { get; set; }

        public ChangeStatus Status { get; set; }

        public Int32 ReportCount { get; set; }

        public LogicType logicType { get; set; }

        public Logic BasicLogic { get; set; }

        public Logic GetCombinedLogic(Boolean hasAdminTeamSite, Int32? appTileId)
        {
            var logic = this.BasicLogic;
            var additonalLogic = this.GetAdditionalLogic(hasAdminTeamSite);
            if (additonalLogic != null)
            {
                if (logic != null)
                {
                    logic = logic.And(additonalLogic);
                }
                else
                {
                    logic = additonalLogic;
                }
            }

            Int32 tileId = Convert.ToInt32(appTileId);

            //if (!(tileId == SystemDefinedTile.MyReports_MyReports.SystemDefinedTileId
            //        || tileId == SystemDefinedTile.MyReports_MySubscriptions.SystemDefinedTileId
            //        || tileId == SystemDefinedTile.MyReports_Recommended.SystemDefinedTileId))
            //{
            //    logic = logic.And((new ReportStatusId()).Equal(Convert.ToInt32(ReportStatusEnum.Approved)));
            //}

            return logic;
        }

        protected virtual Logic GetAdditionalLogic(Boolean hasAdminTeamSite)
        {
            return null;
        }

        protected Logic GetCommonVisibleLogic(Boolean hasAdminTeamSite)
        {
            var topLogicNode = new OR();

            topLogicNode.AddElement((new ReportOwnerAlias()).Equal(new Parameter<String>() { Name = ContextVariable.CurrentUser.ToString() }));

            //topLogicNode.AddElement(
            //        (new RestrictAccess()).Equal(false)
            //                          .Or((new PermissionUsers()).Equal(new Parameter<string>() { Name = ContextVariable.CurrentUser.ToString() }))
            //                          .Or((new PermissionGroups()).In(new Parameter<IEnumerable<string>>() { Name = ContextVariable.CurrentUserGroup.ToString() }))
            //        );

            if (hasAdminTeamSite)
            {
                topLogicNode.AddElement((new TeamSiteGUID()).In(
                    new Parameter<IEnumerable<Guid>>() { Name = ContextVariable.TeamSiteGuidUnderControl.ToString() }
                    ));
            }

            return topLogicNode;
        }

        #endregion
    }
}
