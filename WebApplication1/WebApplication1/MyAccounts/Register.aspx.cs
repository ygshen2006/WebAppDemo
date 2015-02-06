using Application.MainBoundedContect.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1.Models;
using Domain.MainBoundedContext.Users;
using Microsoft.AspNet.Identity;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Application.MainBoundedContect.Services.VerificationCode;
using Infrastructor.MainBoundedContext.UnitWorks;
namespace WebApplication1.MyAccounts
{
    public partial class Register : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void CreateUser_Click(object sender, EventArgs e)
        {
            Page.Validate("two");

            if (string.Compare(Session["verificationcode-reg"].ToString(),
                verficationcode.Text,
                true) == 0)
            {
                Literal2.Text = "";
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService _service = new UserService(context);
                    var user = new User()
                    {
                        Email = EmialText.Text,
                        Sex = ((RadioButton1.Checked) ? true : false),
                        UserName = UserName.Text
                    };
                    IdentityResult result = _service.CreateUser(user, Password.Text);

                    if (result.Succeeded)
                    {
                        Session["IsAuthorized"] = true;
                        Session["UserName"] = UserName.Text;

                        IdentityHelper.RedirectToReturnUrl(Request.QueryString["ReturnUrl"], Response);
                    }
                    else
                    {
                        ErrorMessage.Text = result.Errors.FirstOrDefault();
                    }
                }
            }
            else
            {
                Literal2.Text = "<font style='color: red'>验证码不匹配</font>";
                return;
            }

        }

        //protected void LogIn(object sender, EventArgs e)
        //{
        //    Page.Validate("two");

        //    IUserRepository _service = new UserService();

        //    User result = _service.Login(UserName_Login.Text, Password_Login.Text);

        //    if (result == null)
        //    {
        //        FailureText.Text = "";
        //        Response.Write("<script>alert('用户名，密码错误请重新输入')</script>");
        //        return;
        //    }
        //    else
        //    {
        //        IdentityHelper.RedirectToReturnUrl("~/Study.aspx", Response);
        //    }
        //}
      
    }
}