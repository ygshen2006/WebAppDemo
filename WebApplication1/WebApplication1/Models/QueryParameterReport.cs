using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.MainBoundedContect.ViewModel.Report;

namespace WebApplication1.Models
{
    public class QueryParameterReport
    {
        public int articleid { get; set; }

        public string teamguid { get; set; }
    }

    public class QueryParameterReportSearch {

        public ReportItem ThisReport { get; set; }

        public List<ReportItem> OtherReports { get; set; }

        // Comments
    }
}