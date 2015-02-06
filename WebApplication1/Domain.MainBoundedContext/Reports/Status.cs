using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports
{
    public class Status:Entity
    {
        [Required]
        public string Name;

        public virtual ICollection<Report> Reports { get; set; }
    }
}
