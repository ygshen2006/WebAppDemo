using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.Users
{
    public class UserInformationRepository : Repository<PersonalInformation>, IUserInformationRepository
    {
        public MainDBUnitWorkContext context;
        public UserInformationRepository(MainDBUnitWorkContext _unitOfWork) :base(_unitOfWork){
            context = _unitOfWork;
        }

        public bool AddUserInformation(string userId, PersonalInformation userInformation) {
            var temp = userId;
            var existedUserInformation = this.GetFiltered(_ => _.UserId == temp);
            if (existedUserInformation.Count() > 0)
            {
                // Remove old one and add new one
                this.Remove(existedUserInformation.First());
                this.UnitOfWork.Commit();
                this.Add(userInformation);
                this.UnitOfWork.Commit();

                return true;
            }
            else
            {
                this.Add(userInformation);
                this.UnitOfWork.Commit();
                return true;
            }
        }

        public PersonalInformation GetUserInformation(string userId)
        {
            return this.GetFiltered(_ => _.UserId == userId).FirstOrDefault();
        }

        public void UpdateUserInformation(string userId, PersonalInformation newUserInformation)
        {
            PersonalInformation oldValue = this.Get(newUserInformation.Id);

            if (oldValue != null)
            {
                oldValue.BirthDay = newUserInformation.BirthDay;
                oldValue.BloodStyle = newUserInformation.BloodStyle;
                oldValue.Favorates = newUserInformation.Favorates;
                oldValue.From = newUserInformation.From;
                oldValue.PersonnalDescription = newUserInformation.PersonnalDescription;
                oldValue.LiveIn = newUserInformation.LiveIn;
                oldValue.UserId = newUserInformation.UserId;
                oldValue.User=newUserInformation.User;

                this.UnitOfWork.Commit();
            }

        }
    }
}
