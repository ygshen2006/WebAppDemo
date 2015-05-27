using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports.Aggregates
{
    public class Status:Entity
    {
        public string Name { get; set; }

        public virtual ICollection<Report> Reports { get; set; }
    }
}
