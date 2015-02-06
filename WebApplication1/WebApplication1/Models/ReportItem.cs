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

        public string Site { get; set; }
        public string ReprotStatus { get; set; }
        
    }
}