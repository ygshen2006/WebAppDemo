using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ReportListModel
    {
        public List<ReportItem> ReportItemList { get; set; }

        public ReportListModel()
        {
            ReportItemList = new List<ReportItem>();
        }
    }
}