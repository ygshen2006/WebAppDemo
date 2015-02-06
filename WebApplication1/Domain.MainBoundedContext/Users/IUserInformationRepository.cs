using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Users
{
    public interface IUserInformationRepository : IRepository<PersonalInformation>
    {
        bool AddUserInformation(string userId, PersonalInformation pi);
        PersonalInformation GetUserInformation(string userId);
        void UpdateUserInformation(string userId, PersonalInformation newInformation);

    }
}
