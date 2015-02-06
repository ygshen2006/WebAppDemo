using Application.MainBoundedContect.Services.Users;
using Domain.MainBoundedContext.Users;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace WebApplication1.MyAccounts
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void LogIn(object sender, EventArgs e)
        {
            if (IsValid)
            {
                IUserRepository _service = new UserService();
                var user = new User() { UserName = UserName.Text };
                var result = _service.Login(UserName.Text, Password.Text);

                if (result != null)
                {
                    //IdentityHelper.RedirectToReturnUrl(Request.QueryString["ReturnUrl"], Response);
                    IdentityHelper.RedirectToReturnUrl("~/Study.aspx", Response);
                }
                else
                {
                    FailureText.Text = "Invalid username or password.";
                    ErrorMessage.Visible = true;
                }
            }
        }
    }
}