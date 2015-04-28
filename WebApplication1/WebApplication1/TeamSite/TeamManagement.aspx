<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TeamManagement.aspx.cs" Inherits="WebApplication1.TeamSite.AddTeamSite" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link href="../css/iconFont.css" rel="stylesheet" />
    <link href="../Content/teammanagement.css" rel="stylesheet" />
    <title>团队后台管理</title>

</head>
<body class="metro">
    <div class="wrapper">
        <form id="form1" runat="server">
            <header class="bg-dark" style="height: 45px; position: relative">
                <div class="navigation-bar dark" style="width: 100%">
                    <div class="navigation-bar-content container">
                        <a href="../Welcome.aspx" class="element"><span class="icon-grid-view" style="margin-right: 5px;"></span>站点名称 <sup>2.0</sup></a>
                        <span class="element-divider"></span>
                        <a class="element1 pull-menu" href="#"></a>
                        <ul class="element-menu">

                            <li>

                                <a href="#" class="dropdown-toggle">主页</a>
                                <ul class="dropdown-menu place-left dark" data-role="dropdown" data-show="hover">
                                    <li><a href="#">网站概述</a></li>
                                    <li><a href="#">联系我们</a></li>
                                </ul>

                            </li>
                            <li>

                                <a class="dropdown-toggle" href="#">随便看看</a>
                                <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                    <li><a href="#">功能描述</a></li>
                                    <li><a href="MyTeamSitesAdminPage.aspx">团队查找</a></li>
                                    <li><a href="#">我的团队</a></li>
                                </ul>


                            </li>
                            <li>
                                <a href="#" class="dropdown-toggle">我的看看</a>
                                <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                    <li><a href="#">功能描述</a></li>
                                    <li><a href="../Personal/MyCenter.aspx">我的收藏</a></li>
                                    <li><a href="../Personal/ProfileEdit.aspx">个人中心</a></li>
                                </ul>
                            </li>
                            <li><a href="#" class="dropdown-toggle">提前看看</a>
                                <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                    <li><a href="#">功能描述</a></li>
                                    <li><a href="#">我们的推送</a></li>
                                </ul>
                            </li>
                            <li><a href="#" class="dropdown-toggle">管理中心</a>
                                <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                    <li><a href="#">功能描述</a></li>
                                    <li><a href="#">网站-新闻</a></li>
                                </ul>
                            </li>

                        </ul>
                        <div style="float: right; width: 20%" id="welcomeT">
                            <ul id="welcomezone" style="list-style: none">


                                <li style="color: white; float: left;" class="welcome">
                                    <asp:LoginView ID="LoginView1" runat="server">
                                        <AnonymousTemplate>
                                            <div style="float: left; margin-top: 5px;">
                                                <a id="register-link" class="user-name-link" href="../MyAccounts/Register.aspx?ReturnUrl='~/Welcome.aspx'">注册</a>
                                                <a id="login-link" class="user-name-link" href="#">登陆</a>
                                            </div>
                                        </AnonymousTemplate>
                                        <LoggedInTemplate>
                                            <div class="welcome-text">
                                                <span>欢迎: </span><a href="../Personal/MyCenter.aspx" class="user-name-link">
                                                    <asp:LoginName ID="LoginName1" runat="server" />
                                                </a>
                                            </div>
                                        </LoggedInTemplate>
                                    </asp:LoginView>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </header>

            <div class="icon-arrow-left" style="margin: 4px">
                <a href="#">返回Team首页</a>
            </div>
            <div style="width: 1200px; margin: 0 auto;">
                <table style="width: 1200px;">
                    <tr>
                        <td style="position: relative; width: 20%; min-height: 1000px">
                            <nav class="sidebar light" style="position: absolute; top: 0px;">
                                <ul id="managelist">
                                    <li class="active"><a href="#"><i class="icon-home"></i>基本信息</a>
                                    </li>
                                    <li><a href="#"><i class="icon-eye"></i>文章审批</a>
                                    </li>
                                    <li><a href="#"><i class="icon-plus"></i>团队标签</a>
                                    </li>
                                    <%--load the divisions one by one with script--%>
                                </ul>
                            </nav>
                        </td>
                        <td style="width: 80%; min-height: 500px;">
                            <div class="tab_box" style="width: 100%; min-height: 1000px; overflow-y: auto">
                                <div class="informationarea">
                                    <div class="basic-edit">
                                        <div>
                                            团队名称:
                                            <input type="text" class="teamname-textbox" />
                                            *
                                        </div>
                                        <div class="owner-edit">
                                            <span>团队拥有者:
                                            <select>
                                                <option></option>
                                            </select></span>
                                        </div>

                                        <div class="member-edit">
                                            <span>团队成员：</span>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>账号</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                           
                                        <div>
                                             团队Logo: 
                                            <div style="position: relative; margin-left: 400px; margin-top: 10px; margin-bottom: 10px;">
                                                <div id="oldUserPhoto" style="">
                                                </div>
                                            </div>
                                            <table style="width: 600px; margin: 0 auto">
                                                <%--   <tr class="panel-header bg-darkBlue">
                                                    <td></td>
                                                    <td>
                                                        <p style="font-family: 'Segoe UI'; margin-top: 6px; font-size: 16px; color: white; font-weight: bold">新头像</p>
                                                    </td>
                                                    <td>
                                                        <p style="font-family: 'Segoe UI'; margin-top: 6px; font-size: 16px; color: white; font-weight: bold">预览</p>
                                                    </td>
                                                </tr>--%>
                                                <tr>
                                                    <td style="width: 20%"></td>
                                                    <td style="width: 60%">
                                                        <div style="position: relative">
                                                            <div style="position: absolute; top: -95px">
                                                                <div style="position: relative">
                                                                    <input class="chooseImageBt" type="button" value="选择新头像" style="position: absolute; width: 100px; left: 0px; top: 0px" />
                                                                    <input type="text" value="" id="imageSelect" style="position: absolute; width: 100px; left: 0px; top: 0px; opacity: 0" />

                                                                    <input class="saveImage" type="button" value="确定" disabled="disabled" style="position: absolute; width: 100px; left: 150px; top: 0px;" />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="width: 20%">
                                                        <div style="margin-top: 10px; position: relative">
                                                            <div style="float: left">
                                                                <div style="height: 200px; width: 200px; margin-right: 126px" class="img-preview"></div>
                                                            </div>
                                                            <div style="display: block; position: absolute; left: 220px" id="preview-id">
                                                                <div style="height: 60px; width: 60px" class="img-preview"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 20%"></td>
                                                    <td style="width: 60%">
                                                        <div style="position: relative">
                                                            <div class="img-container" style="border: 1px groove; position: absolute; top: -150px; width: 400px; height: 300px">
                                                                <img style="width: 400px; width: 400px" src="" class="cropper" />
                                                            </div>
                                                        </div>

                                                    </td>

                                                    <td style="width: 20%"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>


                                    <div style="padding-top:200px">
                                        <input type="button" value="保存" />
                                        <input type="button" value="重置" />
                                    </div>
                                </div>
                                <div class="approvearea hide">
                                    Approve report area
                                </div>
                                <div class="tagarea hide">
                                    Tag management area
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>


        </form>
        <footer class="container" style="float: right">
            <div class="bottom-menu-wrapper">
                <ul class="horizontal-menu compact">
                    <li>&copy; 2014 看看网</li>
                    <li><a href="#">所有权</a></li>
                    <li><a href="#">法律</a></li>
                    <li><a href="#">广告</a></li>
                    <li><a href="#">帮助</a></li>
                    <li><a href="#">反馈</a></li>
                </ul>
            </div>
        </footer>
    </div>

    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/navigation.js"></script>

    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/teamsitemanagement.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';
        (function (Nav, $, undefined) {

        })(window.Nav = window.Nav || {}, $, undefined);
        $(function () {
            // Load the team list in the detail panel below
            Nav.Initiate(sessionUser);
        });
    </script>
</body>
</html>
