using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.ViewModel.Users
{
   public class UserInformationModel
    {
        public int Id { get; set; }
        public DateTime BirthDay { get; set; }

        public LocationClass From { get; set; }

        public LocationClass LiveIn { get; set; }
        public FavorateClass Favorates { get; set; }
        public string BloodStyle { get; set; }
        public string PersonnalDescription { get; set; }
        public string UserId { get; set; }
        public virtual User UserRelated { get; set; }
    }
}
