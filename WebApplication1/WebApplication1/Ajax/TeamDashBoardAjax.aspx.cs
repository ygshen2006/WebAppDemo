using Application.MainBoundedContect.ViewModel.Tiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1.Ajax
{
    public partial class TeamDashBoardAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["queryType"] == "updateadmintileinfo") { 
               
            }
        }

        private void UpdateTileInformation() {
            // Update team site dashboard settings 
            string siteguid = Request.QueryString["SiteGUID"].ToString();

            var tileData = Request.Params["TilesData"];
            
            // tile data
            JavaScriptSerializer jss = new JavaScriptSerializer();
            List<TileViewModel> tileModelData = jss.Deserialize<List<TileViewModel>>(tileData);


            // Save the tile data into our database

        }
    }
}