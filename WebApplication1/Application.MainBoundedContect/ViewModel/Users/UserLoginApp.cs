using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Users
{
    public class UserLoginApp
    {
        public string Id { get; set; }
        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string UserPhoto { get; set; }
        public bool Sex { get; set; }
        public UserLoginApp() { 
        }
    }
}
