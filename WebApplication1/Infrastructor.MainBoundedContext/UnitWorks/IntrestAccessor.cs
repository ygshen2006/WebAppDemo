using Domain.MainBoundedContext.Teams;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.UnitWorks
{
    public partial class MainDBUnitWorkContext : DbContext
    {
        public Intrest GetIntrestById(int intrestId)
        {
           return this.Intrests.Find(intrestId);
        }

        public List<Intrest> GetAllIntrests()
        {
            return this.Intrests.ToList<Intrest>();
        }


    }
}
