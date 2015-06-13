using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.UnitWorks.Mapping
{
    public class UserConfiguration : EntityTypeConfiguration<PersonalInformation>
    {
        public UserConfiguration()
        {
            
        }
    }
}
