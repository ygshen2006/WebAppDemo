using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Users
{
    public class PersonalInformation : Entity
    {
        public PersonalInformation() {
            BirthDay = DateTime.Now;
        }
        public DateTime BirthDay { get; set; }

        public LocationClass From { get; set; }

        public LocationClass LiveIn { get; set; }
        public FavorateClass Favorates { get; set; }
        public string BloodStyle { get; set; }
        public string PersonnalDescription { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
    }

    public class LocationClass {
        public string Province { get; set; }
        public string City { get; set; }
        public string District { get; set; }
    }
    public class FavorateClass {
        public string FavorateMusic { get; set; }

        public string FavorateBook { get; set; }
        public string FavoratePeople { get; set; }
        public string FavorateSports { get; set; }
        public string FavorateFilms { get; set; }
        public string FavorateBrands { get; set; }
        public string FavorateOthers { get; set; }
    }
}
