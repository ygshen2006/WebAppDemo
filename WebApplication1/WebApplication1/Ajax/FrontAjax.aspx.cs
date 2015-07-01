using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.Services.Tile;
using Application.MainBoundedContect.ViewModel.Tiles;
using Infrastructor.MainBoundedContext.Repositories.Reports;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.Tiles;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1.Models;
using Application.MainBoundedContect.Extentions;
using System.Web.Providers.Entities;
using System.Text;
using Application.MainBoundedContect.Services.Report;

namespace WebApplication1.Ajax
{
    public partial class FrontAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request["queryType"] == "teamdetail")
            {
                string teamGuid = Request.Params["SiteGUID"].ToString();
                Response.Write(GetTeamSite(teamGuid));
            }
            if (Request["queryType"] == "callSp")
            {

                Response.Write(CallSP());
            }
            if (Request["queryType"] == "reporttype")
            {
                Response.Write(GetTiles());
            }

     
            

            else if (Request["queryType"] == "reportDetail")
            {
                Response.Write(GetReportDetal());

            }
            else if (Request["queryType"] == "addPicture")
            {
                Response.Write(AddPicture());
            }

            else if (Request["queryType"] == "removePicture")
            {
                RemovePicture();
            }
        }

        private string GetReportDetal()
        {
            int id = Int32.Parse(Request["reportid"]);
            List<ReportItem> reports = new List<ReportItem>() { 
                new ReportItem(){ ID =0, TileId=1,ReportDescription="公司现招聘一名开发人员", ReportURL="http://www.baidu.com", ReportOwner="申元功", ReprotStatus="已批准", ReportName="招聘开发人员", Site="ABCD"},
                new ReportItem(){ ID=1, TileId=1,ReportDescription="这是关于 PM2.5 的最新产品资料", ReportName="PM2.5 产品资料", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Submitted", Site="ABCD"},
                new ReportItem(){ ID=2, TileId=1,ReportDescription="有客户想要100近大米，请问公司有人知道哪里可以买到差价最高的米吗？", ReportName="求助！！！！急...", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Approved", Site="ABCD"},
                new ReportItem(){ ID=3, TileId=1,ReportDescription="有人5.1回山东吗？", ReportName="求同往..", ReportURL="http://www.baidu.com", ReportOwner="员工", ReprotStatus="Submitted", Site="ABCD"},
                new ReportItem(){ ID=4, TileId=1,ReportDescription="这个茶品最近在你的客户群里卖的怎么样？", ReportName="市场调查", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Approved", Site="ABCD"},
                new ReportItem(){ ID=5, TileId=1,ReportDescription="Hello ReportHello ReportHello ReportHello ReportHello ReportHello ReportHello Report", ReportName="Hello Report 6", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Submitted", Site="ABCD"},
                new ReportItem(){ ID=6, TileId=2,ReportDescription="Hello ReportHello ReportHello ReportHello ReportHello ReportHello ReportHello Report", ReportName="Hello Report 7", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Approved", Site="ABCD"},
                new ReportItem(){ ID=7, TileId=2,ReportDescription="Hello ReportHello ReportHello ReportHello ReportHello ReportHello ReportHello Report", ReportName="Hello Report 8", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Approved",Site="ABCD"},
                new ReportItem(){ ID=8, TileId=3,ReportDescription="Hello ReportHello ReportHello ReportHello ReportHello ReportHello ReportHello Report", ReportName="Hello Report 9", ReportURL="http://www.baidu.com", ReportOwner="John 2", ReprotStatus="Approved",Site="ABCD"},
                };
            ReportItem returnedItem = reports.Where(_ => _.ID == id).First();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var outPut = jss.Serialize(returnedItem);
            return outPut;
        }

        private string CallSP()
        {
            int jobId = 0;

            string querySql = string.Empty;
            string jobIdStr = Request.QueryString["jobId"].Trim();

            if (string.IsNullOrEmpty(jobIdStr))
            {
                return "Querystring：jobId is empty!";
            }
            try
            {
                jobId = int.Parse(jobIdStr);
            }
            catch (FormatException ex)
            {
                return "Querystring：jobId shall be an integer value!";
            }

            querySql = @"usp_AddJobRunToQueue";

            SqlParameter[] parameters = new SqlParameter[]
            { 
                new SqlParameter() {
                ParameterName = "@JobId",
                DbType = System.Data.DbType.Int32,
                Value = jobId,
                Direction = System.Data.ParameterDirection.Input
                },

                new SqlParameter() {
                ParameterName = "@RetryCounter",
                DbType = System.Data.DbType.Int32,
                Value= DBNull.Value,
                Direction = System.Data.ParameterDirection.Input},

                new SqlParameter() {
                ParameterName = "@OverrideQueueDateTime",
                DbType = System.Data.DbType.DateTime2,
                Value= DBNull.Value,
                Direction = System.Data.ParameterDirection.Input},

                new SqlParameter() {
                ParameterName = "@JobRunId",
                DbType = System.Data.DbType.Int32,
                Direction = System.Data.ParameterDirection.Output},
            };
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                string[] str = new string[] { "@JobRunId" };
                var outPutValue = context.ExecuteCommand(querySql, str, parameters);

                if (int.Parse(outPutValue["@JobRunId"].ToString()) > 0)
                {
                    return "{\"AddJobResult\":1}";
                }
                else
                {
                    return "{\"AddJobResult\":0}";
                }
            }
        }



        private string GetTeamSite(string teamGuid)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                Guid tId = Guid.Parse(teamGuid);
                TeamRepository teamRepo = new TeamRepository(context);
                var team = teamRepo.GetFiltered(_ => _.TeamGuid == tId).FirstOrDefault();

                var teamOwners = teamRepo.GetFiltered(_ => _.TeamGuid == tId).FirstOrDefault().TeamOwners.ToList();
                string adminUsers = getOwnersString(teamOwners);

                JavaScriptSerializer jss = new JavaScriptSerializer();
                return jss.Serialize(new TeamInfo() { teamName = team.TeamName, teamOwners = getOwnersString(teamOwners) });
            }
        }

        private string getOwnersString(List<Domain.MainBoundedContext.Users.User> teamOwners)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var u in teamOwners)
            {
                sb.Append(u.Email + ";");
            }

            return sb.ToString();
        }



        private string GetTiles()
        {
            string teamGuid = Request.Params["SiteGUID"].ToString();

            if (Request.Params["siteType"] == "teamsite")
            {
                return GetTeamSiteTiles(teamGuid);
            }
            else
            {
                return null;
            }
            // Generate the tile information
            //List<Tile> tiles = new List<Tile>() { 
            //    new Tile(){ Id=1, ReportCount=56, TileName="我的文章"},
            //     new Tile(){ Id=2, ReportCount=44, TileName="我的推荐"},
            //    new Tile(){ Id=3, ReportCount=55, TileName="我的订阅"},
            //    new Tile(){ Id=4, ReportCount=11, TileName="公司的文章"},
            //    };

            //TeamSites team = new TeamSites()
            //{
            //    Id = 1,
            //    Name = "Team1",
            //    Tiles = tiles
            //};

            //// Serialize the data to client
            //JavaScriptSerializer jss = new JavaScriptSerializer();

            //string outPut = jss.Serialize(team);
            //return outPut;
        }

        private string GetTeamSiteTiles(string teamGuid)
        {
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
                ReportRepository reportRepository = new ReportRepository(context);

                int teamId = teamService.GetAllTeamSites().First(_ => _.TeamGuid == Guid.Parse(teamGuid)).Id.Value;
                TileServices tService = new TileServices(repository, tRepository, reportRepository, null, null, null, tileQueryRepository);
                List<TileViewModel> tiles = tService.GetCustomerizeTilesWithCountByTeamId(teamId, userAlias, true, teamGuid).Select(_ => _.ToTileViewModel()).ToList<TileViewModel>();

                return jss.Serialize(tiles);
            }
        }

     
        private string AddPicture()
        {
            string output = "";
            Guid subString = Guid.NewGuid();
            // Get the post data
            if (Request.Files == null)
            {
                output = "Querystring:uploaded file is null!";
            }
            //var paramDes = jss.Deserialize<QueryParameterPicture>(Request["data"]);

            string logicalPath = "";
            //if (paramDes.SaveLocation != string.Empty)
            //{
            //    // Save int temp location
            //    picturePath = Server.MapPath("../CustomerPicture/Temp/");
            //    logicalPath = "../CustomerPicture/Temp/";
            //}
            //else
            //{
            var picturePath = Server.MapPath("../CustomerPicture/");
            logicalPath = "../CustomerPicture/";
            //}
            string[] stringSplit = Request.Files[0].FileName.Split('\\');
            int temp = stringSplit.Length;

            string newFileName = picturePath + subString + stringSplit[temp - 1];
            Directory.CreateDirectory(Path.GetDirectoryName(newFileName));

            string newLogicFileName = logicalPath + subString + stringSplit[temp - 1];



            using (FileStream fileStream = File.Create(newFileName))
            {
                var buffer = new byte[Request.Files[0].ContentLength];
                int readCount = Request.Files[0].InputStream.Read(buffer, 0, buffer.Length);

                if (readCount > 0)
                {
                    fileStream.Write(buffer, 0, readCount);
                }
            }
            Console.Write("Hello");
            return newLogicFileName;
        }

        private void RemovePicture()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            var paramDes = jss.Deserialize<ListQueryParameterPicture>(Request["queryParam"]);

            foreach (var item in paramDes)
            {
                FileInfo myfileinf = new FileInfo(Server.MapPath(item));
                myfileinf.Delete();
            }
        }
    }

    class TeamInfo
    {
        public string teamName { get; set; }
        public string teamOwners { get; set; }
    }
}