using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.Extentions;
using Application.MainBoundedContect.Enums;
using Infrastructor.MainBoundedContext.UnitWorks;
using Domain.MainBoundedContext.Teams.Aggregates.Category;
namespace Application.MainBoundedContect.Services.SiteAdmininstration
{
    public class CategoryService
    {
        private ICategoryRepository _categoryRepose;
        public CategoryService() { }
        public CategoryService(ICategoryRepository repos)
        {
            _categoryRepose = repos;
        }
        // Get all categories
        public IEnumerable<AppCategory> GetAllCategories(CategoryTypeEnum type)
        {
            IEnumerable<AppCategory> categories = null;
            switch (type)
            {
                case CategoryTypeEnum.All:
                    categories = _categoryRepose.GetAllCategories().Select(_ => new AppCategory() {
                        Id = _.Id,
                        CategoryName = _.Name,
                        ParentId = _.CategoryParentId,
                        ParentCategory = _.ParentCategory == null ? null : _.ParentCategory.ToAppCategory(),
                        ChildCount = (_.ChildCategory != null) ? _.ChildCategory.Count() : 0,
                        ChildCategories = _.ChildCategory == null ? null : _.ChildCategory.Select(cat => new AppCategory() { Id = cat.Id, CategoryName = cat.Name, ParentId = cat.CategoryParentId }),
                    });
                    break;
                case CategoryTypeEnum.ParentOnly:
                    categories = _categoryRepose.GetParentCategories().Select(_ => new AppCategory() {
                        Id = _.Id,
                        CategoryName = _.Name,
                        ParentId = _.CategoryParentId,
                        ParentCategory = _.ParentCategory == null ? null : _.ParentCategory.ToAppCategory(),
                        ChildCount = (_.ChildCategory != null) ? _.ChildCategory.Count() : 0,
                        ChildCategories = _.ChildCategory == null ? null : _.ChildCategory.Select(cat => new AppCategory() { Id = cat.Id, CategoryName = cat.Name, ParentId = cat.CategoryParentId }),
                    });
                    break;
                case CategoryTypeEnum.ChildOnly:
                    categories = _categoryRepose.GetChildCategories().Select(_ => new AppCategory() {
                        Id = _.Id,
                        CategoryName = _.Name,
                        ParentId = _.CategoryParentId,
                        ParentCategory = _.ParentCategory == null ? null : _.ParentCategory.ToAppCategory(),
                        ChildCount = (_.ChildCategory != null) ? _.ChildCategory.Count() : 0,
                        ChildCategories = _.ChildCategory == null ? null : _.ChildCategory.Select(cat => new AppCategory() { Id = cat.Id, CategoryName = cat.Name, ParentId = cat.CategoryParentId }),
                    });
                    break;

                default:
                    break;
            }
            return categories.ToList<AppCategory>();
        }
        // Update(add/modify)
        public IEnumerable<AppCategory> Update(IEnumerable<AppCategory> models, int type)
        {
            if (models.Count() == 0)
            {
                if (type == 0)
                {
                    // Delete all the existing childs
                    foreach (var cat in _categoryRepose.GetChildCategories())
                    {
                        _categoryRepose.Remove(cat);
                    }
                    // Delete all the parents
                    foreach (var cat in _categoryRepose.GetParentCategories())
                    {
                        _categoryRepose.Remove(cat);
                    }
                }
            }
            else
            {
                foreach (var model in models)
                {
                    Category cat = model.ToCategory();

                    IEnumerable<Category> deletedItems;

                    if (model.ParentId.HasValue)
                    {
                        deletedItems = _categoryRepose.GetChildCategories().Where(l => !models.Where(_ => _.Id.HasValue).Select(_ => _.Id).Contains(l.Id));
                    }
                    else
                    {
                        deletedItems = _categoryRepose.GetParentCategories().Where(l => !models.Where(_ => _.Id.HasValue).Select(_ => _.Id).Contains(l.Id));
                    }

                    if (deletedItems != null && deletedItems.Count() > 0)
                    {
                        foreach (var item in deletedItems)
                        {
                            _categoryRepose.Remove(item);
                        }
                    }

                    if (model.Id.HasValue)
                    {
                        var temp = _categoryRepose.Get(cat.Id);
                        temp.Name = model.CategoryName;
                        temp.CategoryParentId = model.ParentId;
                    }
                    else
                    {
                        _categoryRepose.Add(cat);
                    }
                }
            }
            _categoryRepose.UnitOfWork.Commit();
            return GetAllCategories((CategoryTypeEnum)type);
        }
    }

}
