using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class QueryParameterReport
    {
        public int articleid { get; set; }

        public string teamguid { get; set; }
    }

    public class QueryParameterReportSearch {
        public int Id { get; set; }
        public List<string> FeaturedPictcures { get; set; }

        public string PictureContent { get; set; }

        public List<ReportItem> OtherReports { get; set; }

        // Comments
    }
}