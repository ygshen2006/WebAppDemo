
using Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.MainBoundedContext.Reports.Aggregates;

namespace Domain.MainBoundedContext.Teams.Aggregates.Category
{
    public class Category : Entity
    {
        public Category()
        {
        }
        public Category(int id)
            : base(id)
        {
            ChildCategory = new List<Category>();
            Reports = new List<Report>();
        }
        public string Name { get; set; }

        // Parent category id
        public int? CategoryParentId { get; set; }
        public Category ParentCategory { get; set; }

        public virtual ICollection<Category> ChildCategory { get; set; }

        public virtual ICollection<Report> Reports { get; set; }
    }
}
