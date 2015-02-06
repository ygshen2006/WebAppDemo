using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class QueryParameterViewModel
    {
        public string SiteType { get; set; }

        public string SiteName { get; set; }

        public string SearchEmployeeAlias { get; set; }

        public string TileId { get; set; }

        public string SortAttribute { get; set; }

        public bool SortAscending { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public List<FilterModel> FilterEntityList { get; set; }

    }
}