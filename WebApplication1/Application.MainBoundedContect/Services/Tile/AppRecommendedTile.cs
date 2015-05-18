using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.Tiles;
using Domain.MainBoundedContext.Logics;

namespace Application.MainBoundedContect.Services.Tile
{
   public sealed class AppRecommendedTile: AppTile
    {
        protected override Logic GetAdditionalLogic(Boolean hasAdminTeamSite)
        {
            return this.GetCommonVisibleLogic(hasAdminTeamSite);
        }
    }
}
