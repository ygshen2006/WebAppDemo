using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.ViewModel.TeamSites;

namespace WebApplication1.Utility
{
    public class CategoryComparer : IEqualityComparer<AppCategory>
    {
        public bool Equals(AppCategory x, AppCategory y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(AppCategory obj)
        {
            return 0;
        }
    }

    public class TagComparer : IEqualityComparer<AppTeamTag> {
        public bool Equals(AppTeamTag x, AppTeamTag y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(AppTeamTag obj)
        {
            return 0;
        }
    }
}