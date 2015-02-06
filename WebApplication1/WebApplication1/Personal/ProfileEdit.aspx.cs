using Application.MainBoundedContect.Services.Users;
using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1.Utility;

namespace WebApplication1.Personal
{
   
    public partial class ProfileEdit : System.Web.UI.Page
    {
        protected string birthDay;
        protected string bloodStyle;
        protected string from_province;
        protected string from_city;
        protected string from_district;
        protected string live_province;
        protected string live_city;
        protected string live_district;
        protected string FavorateMusic;
        protected string FavorateBook;
        protected string FavoratePeople;
        protected string FavorateSports;
        protected string FavorateFilms;
        protected string FavorateBrands;
        protected string FavorateOthers;
        protected string PersonnalDescription;
        protected List<ProvinceCity> p_c;
        protected List<CityDistrict> c_t;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                if (Session["IsAuthorized"] == null)
                {
                    // No login account
                    Response.Redirect("../MyAccounts/NoLoginPage.aspx");
                    return;
                }
                HiddenField1.Value = Page.User.Identity.Name;

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserInformationRepository rep = new UserInformationRepository(context);
                    UserService uservice = new UserService(rep);
                    var userToUpdate = uservice.GetUserByLoginName(Page.User.Identity.Name);
                    HiddenField2.Value = userToUpdate.Id;
                    // Get the user detail 
                    var userDetail = uservice.GetUserInformation(userToUpdate.Id);
                    if (userDetail != null)
                    {
                        if (userDetail.BirthDay != null)
                        {
                            birthDay = userDetail.BirthDay.ToString().Split(' ')[0].Replace('/', '-');
                        }
                        bloodStyle = userDetail.BloodStyle;
                        from_province = userDetail.From.Province;
                        from_city = userDetail.From.City;
                        from_district = userDetail.From.District;
                        live_province = userDetail.LiveIn.Province;
                        live_city = userDetail.LiveIn.City;
                        live_district = userDetail.LiveIn.District;
                        FavorateBook = userDetail.Favorates.FavorateBook;
                        FavorateBrands = userDetail.Favorates.FavorateBrands;
                        FavorateFilms = userDetail.Favorates.FavorateFilms;
                        FavorateMusic = userDetail.Favorates.FavorateMusic;
                        FavorateOthers = userDetail.Favorates.FavorateOthers;
                        FavoratePeople = userDetail.Favorates.FavoratePeople;
                        FavorateSports = userDetail.Favorates.FavorateSports;
                        PersonnalDescription = userDetail.PersonnalDescription;
                    }


                    // Load the province list
                    p_c = UserHelper.GetProvinceCityList(Server.MapPath("../Data/"));

                }
            }
        }


    }
}