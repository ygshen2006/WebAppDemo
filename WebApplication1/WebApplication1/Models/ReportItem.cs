using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.ViewModel.SiteAdministration;

namespace WebApplication1.Models
{
    public class ReportItem
    {
        public int ID { get; set; }
        public int TileId { get; set; }

        public string ReportName { get; set; }
        public string ReportDescription { get; set; }
        public string ReportURL { get; set; }

        public bool Editable { get; set; }

        public List<UserLoginApp> ReportOwners { get; set; }
        public List<AppTeamTag> ReportTags { get; set; }
        //public List<ReportRecommendViewModel> RecommendList { get; set; }
        public List<AppCategory> ReportCategory { get; set; }


        public string ReprotStatus { get; set; }
        public string ReprotContent { get; set; }
        public string[] ReportFeaturePics { get; set; }
        public string TagName { get; set; }
    }

    //public class ReportRecommendViewModel
    //{
    //    public string UserName { get; set; }
    //    public string Comment { get; set; }
    //}

}