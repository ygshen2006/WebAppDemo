using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Web;
using Microsoft.Owin.Host.SystemWeb;
using Application.MainBoundedContect.ViewModel.Users;
using Application.MainBoundedContect.Extentions;
using Infrastructor.MainBoundedContext.Repositories.Users;
using System.Collections.Generic;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
namespace Application.MainBoundedContect.Services.Users
{
    public class UserService
    {
        private IUserRepository userRepository;

        private UserInformationRepository _userDepo;
        private MainDBUnitWorkContext context_tem;
        public UserService(UserInformationRepository _re)
        {
            context_tem = _re.context;
            _userDepo = _re;
        }
        public UserService(UserRepository _re)
        {
            userRepository = _re;
        }
        public UserService(MainDBUnitWorkContext context)
        {
            context_tem = context;
        }
        public IdentityResult CreateUser(User user, string password)
        {
            UserManager<User> _manager = null;
            IdentityResult result = null;
            //using (var IdContext = new IdentityDbContext())
            //{
                _manager = new UserManager<User>(new UserStore<User>(new MainDBUnitWorkContext()));

            

                result = _manager.Create(user, password);

                if (result.Succeeded)
                {
                    IdentityHelper.SignIn(_manager, user, isPersistent: false);
                }
            //}
            return result;
        }

        public string GetUserMain(string userId) {
            UserManager<User> _manager = null;
            string result = null;
            _manager = new UserManager<User>(new UserStore<User>(new MainDBUnitWorkContext()));



            result = _manager.GetEmail(userId);

            return result;
        }
        public User Login(string userName, string password)
        {
            UserManager<User> _manager = null;

            _manager = new UserManager<User>(new UserStore<User>(context_tem));

                // Validate the user password
                User user = _manager.Find(userName, password);
                if (user != null)
                {
                    IdentityHelper.SignIn(_manager, user, true);
                    return user;
                }
                else
                {
                    return null;
                }
            
        }
        public void LogOff()
        {
            IdentityHelper.SignOff();
        }
        public User GetUserById()
        {
            UserManager<User> _manager = null;
            //using (var IdContext = new IdentityDbContext())
            //{
            _manager = new UserManager<User>(new UserStore<User>(context_tem));
                
                return _manager.FindById(HttpContext.Current.User.Identity.GetUserId());
            //}
        }

        public IEnumerable<User> SearchUsers(string searchKey)
        {
            return userRepository.SearchUsersByName(searchKey);
        }

        public IEnumerable<TeamSite> GetUserAdminTeams(string userName)
        {
            var user = userRepository.GetUserByName(userName);
            return user.TeamsOwn;
        }
        public bool SetUserHeadPhoto(User newUser)
        {
            bool bResult = false;
            using (var IdContext = context_tem)
            {

                try
                {
                    //var store = new UserStore<User>(new MainDBUnitWorkContext());
                    //_manager = new UserManager<User>(store);
                    //IdContext.Entry(newUser).State = System.Data.Entity.EntityState.Modified;
                    IdContext.Users.Find(newUser.Id).HeadPhoto = newUser.HeadPhoto;
                    IdContext.SaveChanges();
                    bResult = true;
                }
                catch(Exception ex){
                    
                }
                return bResult;
            }
        }
        public User GetUserByLoginName(string userName)
        {
            UserManager<User> _manager = null;

            _manager = new UserManager<User>(new UserStore<User>(context_tem));

                return _manager.FindByName(userName);
            
        }
        public IdentityResult ChangePassword(string oldPwd, string newPwd)
        {
            UserManager<User> _manager = null;
            //using (var IdContext = new IdentityDbContext())
            //{
            _manager = new UserManager<User>(new UserStore<User>(context_tem));

                var ident = _manager.ChangePassword(HttpContext.Current.User.Identity.GetUserId(), oldPwd, newPwd);
                return ident;
            //}
        }
        public bool CheckPassword(string userName, string password)
        {
            UserManager<User> _manager = null;
           
                _manager = new UserManager<User>(new UserStore<User>(context_tem));

                return _manager.CheckPassword(this.GetUserByLoginName(userName), password);
        }
        public bool SaveUserInformation(string userId, UserInformationModel model)
        {
            return _userDepo.AddUserInformation(userId, model.ToUserInformation());
        }
        public UserInformationModel GetUserInformation(string userId)
        {
            var temp = _userDepo.GetUserInformation(userId);
            if (temp != null)
            {
                return temp.ToAppUserInformation();
            }
            else
                return null;
        }
        public void UpdateUserInformation(string userId, UserInformationModel newModel)
        {
            _userDepo.UpdateUserInformation(userId, newModel.ToUserInformation());
        }
    }


    public static class IdentityHelper
    {
        // Used for XSRF when linking external logins
        public const string XsrfKey = "XsrfId";

        public static void SignOff()
        {
            IAuthenticationManager authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut();
        }
        public static void SignIn(UserManager<User> manager, User user, bool isPersistent)
        {
            IAuthenticationManager authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = manager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
            authenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        public const string ProviderNameKey = "providerName";
        public static string GetProviderNameFromRequest(HttpRequest request)
        {
            return request[ProviderNameKey];
        }

        public static string GetExternalLoginRedirectUrl(string accountProvider)
        {
            return "/Account/RegisterExternalLogin?" + ProviderNameKey + "=" + accountProvider;
        }

        private static bool IsLocalUrl(string url)
        {
            return !string.IsNullOrEmpty(url) && ((url[0] == '/' && (url.Length == 1 || (url[1] != '/' && url[1] != '\\'))) || (url.Length > 1 && url[0] == '~' && url[1] == '/'));
        }

        public static void RedirectToReturnUrl(string returnUrl, HttpResponse response)
        {
            if (!String.IsNullOrEmpty(returnUrl) && IsLocalUrl(returnUrl))
            {
                response.Redirect(returnUrl);
            }
            else
            {
                response.Redirect("~/");
            }
        }
    }
}
