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
    public class UserRepository: Repository_U<User>, IUserRepository
    {
        public UserRepository(MainDBUnitWorkContext _unitOfWork) :base(_unitOfWork) { 
        
        }

        public IEnumerable<User> SearchUsersByName(string key) {
            return this.GetAll().Where(_=>_.UserName.ToLower().Contains(key.ToLower()));
        }

        public User GetUserByName(string userName)
        {
            return this.GetAll().Where(_ => _.UserName.ToLower() == userName.ToLower()).FirstOrDefault(); 
        }
    }
}
