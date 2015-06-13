
using Application.MainBoundedContect.Services.Users;
using Application.MainBoundedContect.ViewModel.Users;
using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Extentions
{
    public static class UserExtensions
    {

        public static PersonalInformation ToUserInformation(this UserInformationModel model)
        {
            return new PersonalInformation()
            {
                Id=model.Id,
                BirthDay = model.BirthDay,
                BloodStyle = model.BloodStyle,
                Favorates = model.Favorates,
                From = model.From,
                LiveIn = model.LiveIn,
                PersonnalDescription = model.PersonnalDescription,
                UserId = model.UserId,
                User=model.UserRelated
            };
        }

        public static UserInformationModel ToAppUserInformation(this PersonalInformation obj)
        {
            return new UserInformationModel()
            {
                BirthDay = obj.BirthDay,
                BloodStyle = obj.BloodStyle,
                Favorates = obj.Favorates,
                From = obj.From,
                LiveIn = obj.LiveIn,
                PersonnalDescription = obj.PersonnalDescription,
                
            };
        }

        public static UserLoginApp ToAppUser(this User u)
        {
            return new UserLoginApp() { 
             UserName=u.UserName,
             UserPhoto=u.HeadPhoto,
             Sex=u.Sex,
              Id=u.Id
            };
        }

        public static User ToUser(this UserLoginApp u)
        {
            return new User()
            {
                  UserName=u.UserName,
                   HeadPhoto=u.UserPhoto,
                     Sex=u.Sex,
                     Id=u.Id
            };
        }
    }
}
