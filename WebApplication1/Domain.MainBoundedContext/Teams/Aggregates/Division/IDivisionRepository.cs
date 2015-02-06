using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Aggregates.Division
{
    public interface IDivisionRepository: IRepository<Division>
    {
        IEnumerable<Division> GetAllDivisions();
        Division AddNewDivision(Division data);

        bool RemoveAllDivisions();
        bool DeleteDivision(int Id);
        bool ModifyDivision(int Id, Division data);
    }
}
