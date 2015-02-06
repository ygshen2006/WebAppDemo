using Domain.MainBoundedContext.Users;
using Infrastructor.MainBoundedContext.UnitWorks.Mapping;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.UnitWorks
{
    public partial class MainDBUnitWorkContext
    {
        public MainDBUnitWorkContext()
            : base(ConfigurationManager.ConnectionStrings["MyDBConnectionString"].ConnectionString)
        {
            this.Configuration.LazyLoadingEnabled = true;
        }

    }
}
