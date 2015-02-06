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

namespace WebApplication1.MyAccounts
{
    public partial class Manage : System.Web.UI.Page
    {

        public string SuccessMessage
        {
            get;
             set;
        }

        protected bool CanRemoveExternalLogins
        {
            get;
            private set;
        }


        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                // Determine the sections to render

           

                // Render success message
                var message = Request.QueryString["m"];
                if (message != null)
                {
                     //Strip the query string from action
                    Form.Action = ResolveUrl("~/MyAccounts/Manage");

                    SuccessMessage = "Your password has been changed.";
                    successMessage.InnerText = SuccessMessage;
                }
            }
        }

        protected void ChangePassword_Click(object sender, EventArgs e)
        {
            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                UserService _service = new UserService(context);

                if (IsValid)
                {
                    IdentityResult result = _service.ChangePassword(CurrentPassword.Text, NewPassword.Text);
                    if (result.Succeeded)
                    {
                        Response.Redirect("~/MyAccounts/Manage?m=ChangePwdSuccess");
                    }
                    else
                    {
                        AddErrors(result);
                    }
                }
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
    }
}