using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Application.MainBoundedContect.Enums;
using Application.MainBoundedContect.Services.SiteAdmininstration;
using Application.MainBoundedContect.Services.Users;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams.Aggregates.UsefulLinks;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.UnitWorks;
using WebApplication1.Models;

namespace WebApplication1.TeamSite
{
    public partial class MyTeamSite : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (Session["IsAuthorized"] == null)
            //{
            //    // No login account
            //    Response.Redirect("../MyAccounts/NoLoginPage.aspx");
            //    return;
            //}

            //Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);

            string userName = Page.User.Identity.Name;
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                //UserService manager = new UserService(context);
                //var user_temp = manager.GetUserByLoginName(userName);

                ////if (user_temp.Sex == true)
                ////{
                ////    owner_image_id.ImageUrl = (user_temp.HeadPhoto == null) ? "../Images/men.jpg" : user_temp.HeadPhoto;
                ////}
                ////else
                ////{
                ////    owner_image_id.ImageUrl = (user_temp.HeadPhoto == null) ? "../Images/women.jpg" : user_temp.HeadPhoto;
                ////}

                //owner_name_id.Text = user_temp.UserName;
                owner_name_id.NavigateUrl = "";
                // Get report links
                IUsefulLinksRepository repository = new UsefulLinksRepository();
                UsefulLinksService _manager = new UsefulLinksService(repository);

                var usefulLinks = _manager.GetAllUsefulLinks(UsefulLinksTypeEnum.ParentOnly);

                linksRept.DataSource = usefulLinks.ToList<AppUsefulLinks>();
                linksRept.DataBind();
            }
        }

        protected void linksRept_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType != ListItemType.Header && e.Item.ItemType != ListItemType.Footer)
            {
                AppUsefulLinks link = e.Item.DataItem as AppUsefulLinks;

                var linksReader = e.Item.FindControl("rptLinks") as Repeater;

                var cg = link.ChildLinks.ToList();
                linksReader.DataSource = cg;
                linksReader.DataBind();
            }
        }
    }
}