using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using Application.MainBoundedContect.Services.TeamAdmin;
using Application.MainBoundedContect.ViewModel.TeamSites;
using Infrastructor.MainBoundedContext.Repositories.SiteAdmin;
using Infrastructor.MainBoundedContext.Repositories.TeamAdmin;
using Infrastructor.MainBoundedContext.UnitWorks;
using System.Linq;
namespace WebApplication1.Ajax
{
    public partial class TeamSiteAdminAjax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();

            using (MainDBUnitWorkContext context = new MainDBUnitWorkContext())
            {
                TeamTagRepository tagRepository = new TeamTagRepository(context);

                TeamRepository teamRepository = new TeamRepository(context);
                TeamStatusRepository statusRepository = new TeamStatusRepository(context);
                TeamAdminService tService = new TeamAdminService(tagRepository, teamRepository, statusRepository);
                var teamGuid = Request.Params["SiteGUID"].ToString();
                Guid guid = Guid.Parse(teamGuid);
                int teamId = teamRepository.GetFiltered(_ => _.TeamGuid == guid).FirstOrDefault().Id;

                var UserName = Session["UserName"];

                if (Request["queryType"] == "getreportstatus")
                {
                    // If current user is an admin. 
                    var team = teamRepository.GetAll().FirstOrDefault(_ => _.Id == teamId);
                    if (UserName == null)
                    {
                        Response.Redirect("../MyAccounts/NoLoginPage.aspx");
                    }
                    else
                    {
                        List<AppStatus> status = new List<AppStatus>();

                        bool isAdmin = team.TeamOwners.FirstOrDefault(_ => _.UserName == UserName.ToString().Trim())!=null;
                        if (isAdmin)
                        {
                            status = tService.GetStatusByRole(1).ToList<AppStatus>();
                        }
                        else
                        {
                            status = tService.GetStatusByRole(0).ToList<AppStatus>();
                        }
                        string r = jss.Serialize(status);
                        Response.Write(r);
                    }
                }
                if (Request["queryType"] == "getsitetags")
                {
                    var tags = tService.GetTagsByTeamId(Guid.Parse(teamGuid));

                    Response.Write(jss.Serialize(tags));
                }
                if (Request["queryType"] == "updatetags")
                {

                    List<AppTeamTag> tags = new List<AppTeamTag>();
                    tags = jss.Deserialize<List<AppTeamTag>>(Request.Params["TagData"]);

                    List<AppTeamTag> tagsUpdate = new List<AppTeamTag>();

                    var originalTags = tService.GetTagsByTeamId(Guid.Parse(teamGuid));
                    foreach (var item in originalTags)
                    {

                        if (!tags.Any(_ => _.Id == item.Id))
                        {
                            AppTeamTag appTag = tService.GetTagById(item.Id.Value);

                            appTag.Status = tagStatus.Delete;
                            tagsUpdate.Add(appTag);
                        }
                    }

                    foreach (var para in tags)
                    {
                        if (para.Id < 0)
                        {
                            AppTeamTag appTag = new AppTeamTag();
                            appTag.Title = para.Title;
                            appTag.TeamGuid = teamGuid;
                            appTag.Status = tagStatus.Add;
                            appTag.TeamId = teamId;
                            tagsUpdate.Add(appTag);
                        }
                        else
                        {
                            AppTeamTag appTag = tService.GetTagById(para.Id.Value);
                            if (appTag == null) continue;
                            appTag.Status = tagStatus.Modify;
                            appTag.TeamGuid = teamGuid;
                            appTag.Title = para.Title;
                            appTag.TeamId = teamId;

                            tagsUpdate.Add(appTag);
                        }
                    }

                    tService.ModifyTags(tagsUpdate);
                    var tags_after = tService.GetTagsByTeamId(Guid.Parse(teamGuid));
                    Response.Write(jss.Serialize(tags_after));
                }
            }
        }
    }
}