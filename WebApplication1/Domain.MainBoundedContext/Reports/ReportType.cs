using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Reports
{
    public class ReportType : Entity
    {
        [Required]
        public string TypeName;

        public virtual ICollection<Report> ReportsRelated { get; set; }
    }
}
