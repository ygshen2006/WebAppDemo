<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyTeamList.aspx.cs" Inherits="WebApplication1.TeamSite.MyTeamList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>团队列表</title>
    <link href="../Content/register.css" rel="stylesheet" />
    <link href="../Content/navgation.css" rel="stylesheet" />
    <link rel="stylesheet" href="../Content/teamlist.css" />
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/navigation.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/register.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';

        (function (Reg,Nav, $, undefined) {

        })(window.Nav = window.Nav || {},window.Reg = window.Reg || {}, $, undefined);
        $(function () {
            // Load the team list in the detail panel below
            Reg.Init();
            Nav.Initiate(sessionUser);
        });
    </script>
</head>
<body>
    <div class="wrapper">
        <div class="navigation">
            <ul class="nav-bar" style="float: left">
                <li class="par">
                    <div class="nav-sub">
                        <a href="#" class="homeLink">主页</a>
                        <div class="blogLink_0">
                            <ul>
                                <li><a href="#">网站概述</a></li>
                                <li><a href="#">问与答</a></li>
                                <li><a href="#">联系我们</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="par">
                    <div class="nav-sub">
                        <a href="#" class="blogLink">精彩贴吧</a>
                        <div class="blogLink_0">
                            <ul>
                                <li><a href="#">贴吧概述</a></li>

                                <li><a href="../Study.aspx">我的贴吧</a></li>

                                <li><a href="../TeamSite/MyTeamList.aspx">所有群组</a></li>

                                <li><a href="#">问与答</a></li>

                            </ul>
                        </div>
                    </div>
                </li>

            </ul>
              <div style="float: right; width: 20%">
                <ul id="welcomezone">
                    <li style="color: white; float: right; padding-top: 5px" class="welcome">
                        <asp:LoginView ID="LoginView1" runat="server">
                            <AnonymousTemplate>
                                <div style="float: left; margin-top: 5px;">
                                      <a id="register-link" class="user-name-link" href="../MyAccounts/Register.aspx?ReturnUrl='~/Study.aspx'">注册</a>
                                    <a id="login-link" class="user-name-link" href="#">登陆</a>
                                </div>
                            </AnonymousTemplate>
                            <LoggedInTemplate>
                                <div class="welcome-text">
                                    <span>欢迎: </span><a href="MyAccounts/Manage.aspx?ReturnUrl='~/Study.aspx'" class="user-name-link">
                                        <asp:LoginName ID="LoginName1" runat="server" />
                                    </a>
                                </div>
                            </LoggedInTemplate>
                        </asp:LoginView>
                    </li>

                </ul>
            </div>
           
        </div>
        <div class="content">
            <table class="teamlist-table">
                <thead class="table-head">
                    <tr>
                        <td>团队名称</td>
                        <td>团队描述</td>
                        <td>管理员</td>
                        <td>文章数</td>
                        <td>团队成立日期</td>
                    </tr>
                </thead>
                <tbody class="teamlist-body">
                </tbody>
            </table>
        </div>

        <div class="login-zone">
            <form runat="server">

                <asp:Panel ID="loginPanel" runat="server">
                    <div class="login-div">
                        <div class="title-div">
                            <div class="close-div">
                            </div>
                            <span class="login-text">系统登陆</span>
                        </div>
                        <div class="content-div">

                            <div class="form-group">
                                <asp:Label runat="server" AssociatedControlID="UserName_Login" CssClass="col-md-2 control-label">用户名：</asp:Label>
                                <div class="col-md-10">
                                    <asp:TextBox runat="server" ID="UserName_Login" CssClass="form-control-username" />
                                    <asp:RequiredFieldValidator ValidationGroup="two" runat="server" ControlToValidate="UserName_Login"
                                        CssClass="text-danger" ErrorMessage="用户名不能为空." Text="*" />
                                </div>
                            </div>
                            <div class="form-group">
                                <asp:Label runat="server" AssociatedControlID="Password_Login" CssClass="col-md-2 control-label">密码：</asp:Label>
                                <div class="col-md-10">
                                    <asp:TextBox runat="server" ID="Password_Login" TextMode="Password" CssClass="form-control-password" />
                                    <asp:RequiredFieldValidator ValidationGroup="two" runat="server" ControlToValidate="Password_Login" Text="*" CssClass="text-danger" ErrorMessage="密码必须." />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-offset-2 col-md-10">
                                    <div class="checkbox">
                                        <asp:CheckBox runat="server" ID="RememberMe" />
                                        <asp:Label runat="server" AssociatedControlID="RememberMe">记住我?</asp:Label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-offset-2 col-md-10">
                                    <asp:Button ValidationGroup="two" runat="server" ID="btLogin_Text" Text="登陆" redirect="../TeamSite/MyTeamList.aspx"  CssClass="btn-default-login" />
                                </div>
                            </div>

                            <div>
                                <asp:ValidationSummary runat="server" CssClass="text-danger" ValidationGroup="two" DisplayMode="BulletList" ShowSummary="true" />
                            </div>

                            <p class="text-danger">
                                <span class="failed-msg"></span>
                            </p>
                        </div>
                    </div>

                </asp:Panel>
            </form>
        </div>
    </div>
</body>
</html>
