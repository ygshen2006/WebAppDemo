using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams;
using Infrastructor.MainBoundedContext.UnitWorks;
using Infrastructor.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.SiteAdmin
{
   public class DivisionRepository :Repository<Division>, IDivisionRepository
    {
       public DivisionRepository() : base(new MainDBUnitWorkContext()) { }

       public DivisionRepository(MainDBUnitWorkContext context)
            : base(context)
        {

        }
       public IEnumerable<Division> GetAllDivisions() {
          return this.GetAll();
       }
       public Division AddNewDivision(Division data)
       {
           if (this.GetFiltered(_ => _.Name.ToLower() == data.Name) != null)
           {
               // Add
               this.Add(data);
               this.UnitOfWork.Commit();

               return this.GetFiltered(_ => _.Name.ToLower() == data.Name && _.DivisionGuid==data.DivisionGuid).FirstOrDefault();
           }
           else {
               return null;
           }
       }

       public bool DeleteDivision(int Id) {
           return true;
       }

       public bool RemoveAllDivisions() {
           var diviosions = this.GetAll().ToList();
           foreach (var d in diviosions) {
               this.Remove(d);
           }

           return true;
       }

       public bool ModifyDivision(int Id, Division data) {
           return true;
       }
    }
}
