using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class ResumeController : Controller
    {
        //
        // GET: /Resume/
        public ActionResult ReceivedResumeAction()
        {
            return View();
        }

        public ActionResult ContactedResumeAction()
        {
            return View();
        }
	}
}