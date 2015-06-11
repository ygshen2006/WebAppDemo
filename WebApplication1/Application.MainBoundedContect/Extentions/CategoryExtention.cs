using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.UnitWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Extentions
{
    public static class CategoryExtention
    {
        public static AppCategory ToAppCategory(this Category cat)
        {
            var t = 
            new AppCategory()
            {
                Id = cat.Id,
                CategoryName = cat.Name,
                ParentId = cat.CategoryParentId,
                ParentCategory = cat.ParentCategory == null ? null : cat.ParentCategory.ToAppCategory(),
                ChildCount = (cat.ChildCategory != null) ? cat.ChildCategory.Count() : 0,
                ChildCategories =cat.ChildCategory==null? null: cat.ChildCategory.Select(_=>new AppCategory() { Id=_.Id, CategoryName=_.Name, ParentId=_.CategoryParentId})
               // Reports = null
            };
            return t;
        }

        public static Category ToCategory(this AppCategory cat)
        {
            return new Category()
            {
                Id = cat.Id.GetValueOrDefault(),
                CategoryParentId = cat.ParentId,
                Name = cat.CategoryName,
                Reports = null
            };
        }
    }
}
