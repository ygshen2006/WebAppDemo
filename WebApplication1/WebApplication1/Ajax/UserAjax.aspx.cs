using Application.MainBoundedContect.Services.Users;
using Application.MainBoundedContect.Services.VerificationCode;
using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.Repositories.Users;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;
using System.Xml.Linq;
using Infrastructor.MainBoundedContext.UnitWorks;
using WebApplication1.Utility;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.Services.SiteAdmininstration;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
namespace WebApplication1.Ajax
{

    public partial class UserAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["requestType"].Contains("getimage"))
            {
                string str = "";
                IVerificationCodeRepository repository = new VerficationCodeRepository();
                VerificationCodeService service = new VerificationCodeService(repository);
                ImageConverter converter = new ImageConverter();
                var returnSrc = (byte[])converter.ConvertTo(service.Response(ref str), typeof(byte[]));

                Session["verificationcode-reg"] = str;

                Response.ContentType = "image/gif";
                Response.BinaryWrite(returnSrc);
            }

            if (Request["requestType"] == "validateUser")
            {
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService _service = new UserService(context);
                    JavaScriptSerializer jss = new JavaScriptSerializer();
                    var paramDes = jss.Deserialize<IEnumerable<UserLoginApp>>(Request["queryParam"]);
                    User result = _service.Login(paramDes.First().UserName, paramDes.First().Password);

                    if (result == null)
                    {
                        Response.Write(jss.Serialize(""));
                    }
                    else
                    {
                        Session["IsAuthorized"] = true;
                        Session["UserName"] = paramDes.First().UserName;
                        Session["UserId"] = paramDes.First().Id;
                        Response.Write(jss.Serialize("Succeed"));
                    }
                }
            }


            if (Request["requestType"] == "logoff")
            {
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService _service = new UserService(context);
                    Response.StatusCode = 303;

                    _service.LogOff();
                    Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
                    Response.Write("");
                }
            }

            if (Request["requestType"] == "changephoto")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService _service = new UserService(context);
                    var paramDes = jss.Deserialize<IEnumerable<UserLoginApp>>(Request["queryParam"]);

                    var userToUpdate = _service.GetUserByLoginName(paramDes.First().UserName);
                    userToUpdate.HeadPhoto = paramDes.First().UserPhoto;

                    bool result = _service.SetUserHeadPhoto(userToUpdate);
                    Response.Write(jss.Serialize(result));
                }
            }


            if (Request["requestType"] == "getloginuser")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService _service = new UserService(context);
                    var paramDes = jss.Deserialize<IEnumerable<UserLoginApp>>(Request["queryParam"]);

                    var userToUpdate = _service.GetUserByLoginName(paramDes.First().UserName);

                    UserLoginApp user = new UserLoginApp() { UserName = userToUpdate.UserName, UserPhoto = userToUpdate.HeadPhoto, Sex = userToUpdate.Sex };

                    Response.Write(jss.Serialize(user));
                }
            }

            if (Request["requestType"] == "resetpassword")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {

                    UserService _service = new UserService(context);
                    var paramDes = jss.Deserialize<IEnumerable<UserLoginApp>>(Request["queryParam"]);
                    if (_service.CheckPassword(paramDes.First().UserName, paramDes.First().Password))
                    {
                        var result = _service.ChangePassword(paramDes.First().Password, paramDes.First().NewPassword);
                        if (result == IdentityResult.Success)
                        {
                            Response.Write(jss.Serialize("密码重置成功，请使用新密码登陆"));
                        }
                        else
                        {
                            Response.Write(jss.Serialize("密码重置成功，请使用新密码登陆"));
                        }
                    }
                    else
                    {
                        Response.Write(jss.Serialize("原密码错误，请重试"));
                    }
                }
            }

            if (Request["requestType"] == "getprovincecity")
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                Response.Write(jss.Serialize(UserHelper.GetProvinceCityList(Server.MapPath("../Data/"))));
            }

            if (Request["requestType"] == "getcitydistrict")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();

                string pName = Request["provinceName"].ToString();
                Response.Write(jss.Serialize(UserHelper.GetCityDistrictList(Server.MapPath("../Data/"), pName)));
            }
            if (Request["requestType"] == "getuserinformation")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();

                string userId = Request["uid"].ToString();
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserInformationRepository rep = new UserInformationRepository(context);
                    UserService uservice = new UserService(rep);

                    Response.Write(jss.Serialize(uservice.GetUserInformation(userId)));
                }
            }
            if (Request["requestType"] == "findlistofuser")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                string users = Request["users"].ToString();
                List<String> notExistedUsers = new List<String>();

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserService service = new UserService(context);

                    foreach (var str in users.Split(';'))
                    {
                        if (str.Trim() != "")
                        {
                            var u = service.GetUserByLoginName(str);
                            if (u == null)
                            {
                                // Not exist
                                notExistedUsers.Add(str);
                            }
                        }
                    }
                }
                Response.Write(jss.Serialize(notExistedUsers));
            }
            if (Request["requestType"] == "saveuserinformation")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();

                var paramDes = jss.Deserialize<UserInformationModel>(Request["queryParam"]);

                string userName = Request["uid"].ToString();
                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserInformationRepository rep = new UserInformationRepository(context);
                    UserService uservice = new UserService(rep);

                    var userid = paramDes.UserId;
                    var user_related = uservice.GetUserById();
                    paramDes.UserRelated = user_related;

                    uservice.SaveUserInformation(userid, paramDes);
                    Response.Write(jss.Serialize("Success"));
                }
            }
            if (Request["requestType"] == "getusersforadmin")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                string searchKeyword = Request["key"].ToString().Trim();

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserRepository up = new UserRepository(context);
                    UserService service = new UserService(up);
                    var users = service.SearchUsers(searchKeyword).Select(_ => _.ToAppUser());
                    var s = jss.Serialize(users.ToList<UserLoginApp>());
                    Response.Write(s);
                }
            }

            if (Request["requestType"] == "getuserbyid")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserRepository up = new UserRepository(context);
                    UserService service = new UserService(up);
                    var users = service.GetUserById();
                    var s = jss.Serialize(users.ToAppUser());
                    Response.Write(s);
                }
            }
            if (Request["requestType"] == "getteamsforuser")
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                string searchKeyword = Request["userName"].ToString().Trim();

                using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
                {
                    UserRepository up = new UserRepository(context);
                    UserService service = new UserService(up);
                    var teams = service.GetUserAdminTeams(searchKeyword).Select(_=>_.ToAppTeamSite());

                    Response.Write(jss.Serialize(teams));
                }
            }
            
        }



    }





}
