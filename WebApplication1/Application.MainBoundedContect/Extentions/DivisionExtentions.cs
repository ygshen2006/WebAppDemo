using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Domain.MainBoundedContext.Aggregates.Division;
using Domain.MainBoundedContext.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MainBoundedContect.Extentions
{
    public static class DivisionExtentions
    {
        public static AppDivision ToAppDivision(this Division div)
        {
            //using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            //{
            return new AppDivision()
            {
                Id = div.Id,
                title = div.Name,
                DivisionGuid = div.DivisionGuid,
                 key="div"+div.DivisionGuid,
                 tooltip="division",
                children = div.Segements.Select(_ => _.ToAppSegement())
            };
            //}
        }
    }
}
