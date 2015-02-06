using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Users
{
    public interface IUserRepository : IRepository_U<User>
    {
        IEnumerable<User> SearchUsersByName(string keyWord);
        User GetUserByName(string name);
    }
}
