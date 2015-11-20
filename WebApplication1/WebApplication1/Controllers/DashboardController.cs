using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class DashboardController : Controller
    {
        //
        // GET: /Recruit/
        public ActionResult Index(string teamguid)
        {
            if (Session["IsAuthorized"] == null)
            {
                // No login account
                Response.Redirect("../MyAccounts/NoLoginPage.aspx");
                return null;
            }
            return View();
        }
	}
}