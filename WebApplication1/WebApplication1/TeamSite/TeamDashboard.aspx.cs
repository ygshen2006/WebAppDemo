using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1.TeamSite
{
    public partial class TeamDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                string url = Request.Headers.Get("Referer");
                backTeamSite.NavigateUrl = url;
            }
        }
    }
}