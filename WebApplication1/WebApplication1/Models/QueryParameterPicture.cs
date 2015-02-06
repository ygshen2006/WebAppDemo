using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class QueryParameterPicture
    {
        public string FileName { get; set; }
        public string PicturePath { get; set; }
        public int PictureSize { get; set; }
        public string SaveLocation { get; set; }
    }
    public class ListQueryParameterPicture : List<string>
    {
        public string Pictures { get; set; }
        
    }
}