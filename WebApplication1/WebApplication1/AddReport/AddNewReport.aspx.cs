using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1.AddReport
{
    public partial class AddNewReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //CKFinder.FileBrowser _FileBrowser = new CKFinder.FileBrowser();
            //_FileBrowser.BasePath = "../ckfinder/";
            //_FileBrowser.SetupCKEditor(CKEditor1);
            if (Session["IsAuthorized"] == null)
            {
                // No login account
                Response.Redirect("../MyAccounts/NoLoginPage.aspx");
                return;
            }

            if (!this.IsPostBack) {
                // load all of the bounded controls in the page based on the user name
                string userName=Session["UserName"].ToString();
                #region teamsite list

                #endregion

            }
        }

       
    }
}