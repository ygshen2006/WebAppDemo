using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Logics
{
    public interface IParentLogic
    {
        List<Logic> LogicElements { get; set; }
        Boolean HasChildren();
    }
}
