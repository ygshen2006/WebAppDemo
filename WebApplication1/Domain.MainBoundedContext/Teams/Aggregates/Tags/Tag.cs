
using Domain.MainBoundedContext.Teams.Aggregates.TeamSites;
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Teams.Tags
{
   public class Tag: Entity
    {
       public Tag() {
           Reports = new List<Report>();
       }
       public Tag(int id = default(int))
       {
           Reports = new List<Report>();       
       }

        #region Properties

       [Required]
       [MaxLength(50)]
       public string TagName { get;set;}

       public int TeamSiteId { get; set; }
       public virtual TeamSite TeamSite { get; set; }

       public virtual ICollection<Report> Reports { get; set; }
        #endregion 
    }
}
