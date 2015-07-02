using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class FilterItem
    {

        public string Name { get; set; }
        public string Value { get; set; }

        public int Count { get; set; }

        public Int32? ParentValue
        { get; set; }
    }
}