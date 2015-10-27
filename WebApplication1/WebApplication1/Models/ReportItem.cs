using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ReportItem
    {
        public int ID { get; set; }
        public int TileId { get; set; }
        public string ReportName { get; set; }
        public string ReportDescription { get; set; }
        public string ReportURL { get; set; }
        public string ReportOwner { get; set; }
        public List<OwnerClass> ReportOwners { get; set; }
        public string Site { get; set; }
        public string ReprotStatus { get; set; }
        
    }

    public class OwnerClass{
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}