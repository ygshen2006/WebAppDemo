using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.Services.Users;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.ViewModel.SiteAdministration;

namespace WebApplication1.Ajax
{
    public partial class TeamAdminAjax : System.Web.UI.Page
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();

        protected void Page_Load(object sender, EventArgs e)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                UserRepository up = new UserRepository(context);
                UserService service = new UserService(up);

                SegmentRepository segRe = new SegmentRepository(context);
                DivisionRepository dvRe = new DivisionRepository(context);
                TeamRepository tRe = new TeamRepository(context);
                    AppDivisionSegmentsService appService = new AppDivisionSegmentsService(tRe, segRe, dvRe);

                if (Request["requestType"] == "getdivisions")
                {

                    var divisions = appService.GetAllDivisions().ToList<AppDivision>();
                    Response.Write(jss.Serialize(divisions));
                }

                if (Request["requestType"] == "getsegmentandteams")
                {
                    int divisionId = Int16.Parse(Request["divisionid"]);
                    var tem = appService.GetAllSegmentsByDivisionId(divisionId);
                    string test = jss.Serialize(tem);
                    Response.Write(jss.Serialize(tem));
                }

                if (Request["requestType"] == "searchteams") {
                    string teamname = Request["teamname"].ToString();
                    var tem = jss.Serialize(appService.GetTeamsWithTitle(teamname));
                    Response.Write(tem);
                }
             

                if (Request.Params["queryType"] == "gettilefilterlist")
                {
                 

                }
                if (Request.Params["queryType"] == "taglist")
                {
                 

                }
                
            }

            //if (Request["requestType"] == "getteamsitestile")
            //{
            //    Response.Write(GetTeamSitesSearchTiles());
            //}


            //if (Request["requestType"] == "getteamfilterlist") {
            //    int tileId = int.Parse(Request["tileId"].ToString());

            //    // Get the teams based on the tile id

            //    // Get the teams' query list

            //}
            //if (Request["requestType"] == "getteamslistforuser")
            //{
            //    JavaScriptSerializer jss = new JavaScriptSerializer();
            //    string searchKeyword = Request["userName"].ToString().Trim();

            //    using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            //    {
            //        UserRepository up = new UserRepository(context);
            //        UserService service = new UserService(up);

            //        SegmentRepository segRe = new SegmentRepository(context);
            //        DivisionRepository dvRe = new DivisionRepository(context);


            //        AppDivisionSegmentsService appService = new AppDivisionSegmentsService(null, segRe, dvRe);

            //        var teamsSegmentHierarchy = service.GetUserAdminTeams(searchKeyword).Where(_ => _.Segment != null)
            //            .Select(_ => _.ToAppTeamSite())
            //            .Select(_ => new TeamDivisionSegmentParameter()
            //            {
            //                TeamGuid = _.TeamGuid,
            //                TeamName = _.TeamName,
            //                Segment = _.Segment,
            //                ParentSegment = (_.Segment == null) ? null : appService.GetParentSegmentById(_.Segment.Id),
            //                Division = (_.Segment == null) ? null : appService.GetDivisionBySegmentId(_.Segment.Id)
            //            }).Select(_ => new
            //            {
            //                SegmentName = (_.Segment.title),
            //                SegmentId = (_.Segment.Id),
            //                ParentSegmentName = (_.ParentSegment == null) ? null : _.ParentSegment.title,
            //                ParentSegmentId = (_.ParentSegment == null) ? -1 : _.ParentSegment.Id,
            //                DivisionName = (_.Division == null ? null : _.Division.title),
            //                DivisionId = (_.Division == null ? -1 : _.Division.Id),
            //            });


            //        // Find the team belonged to segment, parentsegment, divsion

            //        var divisionSegment = teamsSegmentHierarchy.Where(_ => _.DivisionName != null && _.SegmentName != null);
            //        var divisionSegmentSubsegment = teamsSegmentHierarchy.Where(_ => _.DivisionName == null);

            //        var level1 = divisionSegment.GroupBy(_ => new { dName = _.DivisionName, dId = _.DivisionId, sName = _.SegmentName, sId = _.SegmentId }).
            //            Select(_ => new AppDivisionSegmentCount()
            //            {
            //                DivisionName = _.Key.dName,
            //                DivisionId = _.Key.dId,
            //                SegmentName = _.Key.sName,
            //                SegmentId = _.Key.sId,
            //                DSCount = _.Count()
            //            });

            //        var returnedObjects = level1.ToList<AppDivisionSegmentCount>();
            //        // For the child segment will merger them into above collection
            //        var level2 = divisionSegmentSubsegment.GroupBy(_ => new { sName = _.ParentSegmentName, sId = _.ParentSegmentId, subName = _.SegmentName, subId = _.SegmentId, })
            //            .Select(_ => new { SegmentName = _.Key.sName, SegmentId = _.Key.sId, SubSegmentName = _.Key.subName, SubSegmentId = _.Key.subId, SubCount = _.Count() });
            //        foreach (var s in level2)
            //        {
            //            var t = returnedObjects.Where(_ => _.SegmentId == s.SegmentId);
            //            if (t.Count() > 0)
            //            {
            //                t.FirstOrDefault().Childs.Add(new ChildSegmentClass() { SegmentId = s.SubSegmentId, SegmentName = s.SubSegmentName, Count = s.SubCount });
            //            }
            //        }


            //        Response.Write(jss.Serialize(returnedObjects));
            //    }
            //}

        }

        //private string GetTeamSitesSearchTiles()
        //{
        //    JavaScriptSerializer jss = new JavaScriptSerializer();

        //    using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
        //    {
        //        string userName = User.Identity.Name;

        //        // 所有team, 我的team, 我收藏的team
        //        var query = context.TeamSiteTile.Select(_ => new { TileName = _.Title, Id = _.Id, TeamCount = 1 }).ToList();
        //        var str = jss.Serialize(query);

        //        return str;
        //    }
        //}
    }
}