using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MainBoundedContect.ViewModel.SiteAdministration;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Application.MainBoundedContect.ViewModel.Users;

namespace Application.MainBoundedContect.ViewModel.Tiles
{
    public class TileFilterListViewModel
    {
        private IEnumerable<UserLoginApp> _Owner;
        private IEnumerable<AppCategory> _Category;
        private IEnumerable<AppTeamTag> _Tag;


        public TileFilterListViewModel()
        {
            _Owner = new List<UserLoginApp>();
            _Category = new List<AppCategory>();
            _Tag = new List<AppTeamTag>();
        }

        //public IEnumerable<AppCatalogType> CatelogType { get { return _CatalogType; } set { _CatalogType = value; } }
        public IEnumerable<AppTeamTag> Tag { get { return _Tag; } set { _Tag = value; } }
        //public IEnumerable<AppTeamSite> TeamSite { get { return _TeamSite; } set { _TeamSite = value; } }

        public IEnumerable<UserLoginApp> Owner { get { return _Owner; } set { _Owner = value; } }
        public IEnumerable<AppCategory> SubCategory { get { return _Category; } set { _Category = value; } }

    }
}
