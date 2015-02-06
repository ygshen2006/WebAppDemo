using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication1.Models;

namespace WebApplication1
{
    public partial class Study : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);

            // Get report links
 
            var reportLinks = new List<UsefulLinks>() {
            new UsefulLinks(){ 
                GroupsName="采购部", 
                RelatedLinks= new List<Links>(){ 
                    new Links(){ LinkName="供应商一览表", LinkURL="http://www.baidu.com"},
                    new Links(){ LinkName="客户一览表", LinkURL="http://www.google.com"}
            },
            },
             new UsefulLinks(){ 
                GroupsName="市场部", 
                RelatedLinks= new List<Links>(){ 
                    new Links(){ LinkName="最新开拓客户", LinkURL="http://www.baidu.com"},
                    new Links(){ LinkName="老客户", LinkURL="http://www.google.com"}
            }
            }
            };

            linksRept.DataSource = reportLinks;
            linksRept.DataBind();

        }

        protected void linksRept_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType != ListItemType.Header && e.Item.ItemType != ListItemType.Footer)
            {
                UsefulLinks link = e.Item.DataItem as UsefulLinks;

                var linksReader = e.Item.FindControl("rptLinks") as Repeater;
                linksReader.DataSource = link.RelatedLinks;
                linksReader.DataBind();
            }
        }
    }
}