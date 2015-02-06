using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Users
{
    public class User : IdentityUser
    {

        #region Properties
        public bool Sex { get; set; }
        public string HeadPhoto { get; set; }
        public virtual ICollection<TeamSite> TeamsOwn { get; set; }
        public virtual ICollection<PersonalInformation> PeopleInformation { get; set; }

        //public virtual ICollection<CatalogData> SubscribedData { get; set; }

        //public virtual ICollection<CatalogData> OwnData { get; set; }

        //public virtual ICollection<CatalogData> PermissionData { get; set; }

        //public virtual ICollection<CatalogData> SupportData { get; set; }

        ////Current user is the recommendations from somebody
        //public virtual ICollection<Recommendation> RecommendationOut { get; set; }

        ////Current user is the recommendations to somebody
        //public virtual ICollection<RecommendToUser> RecommendationIn { get; set; }

        //public virtual ICollection<UserNotificationSetting> UserNotificationSettings { get; set; }

        //public virtual ICollection<Group> Groups { get; set; }



        #endregion

        #region Constructor
        public User()
        {
            InitializeUser();
        }

        public User(int id)
        {
            InitializeUser();
        }
        #endregion

        #region Private Part
        private void InitializeUser()
        {
            //SubscribedData = new List<CatalogData>();
            //OwnData = new List<CatalogData>();
            //PermissionData = new List<CatalogData>();
            //SupportData = new List<CatalogData>();
            //RecommendationOut = new List<Recommendation>();
            //RecommendationIn = new List<RecommendToUser>();
            //Groups = new List<Group>();
            TeamsOwn = new List<TeamSite>();
        }
        #endregion
    }
}
