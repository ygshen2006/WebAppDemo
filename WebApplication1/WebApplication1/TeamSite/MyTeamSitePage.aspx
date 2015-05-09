<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyTeamSitePage.aspx.cs" Inherits="WebApplication1.TeamSite.MyTeamSite" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
 <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link href="../css/iconFont.css" rel="stylesheet" />
    <title>团队</title>
    <link href="../Content/scrollPic.css" rel="stylesheet" />
    <link href="../Content/reports.css" rel="stylesheet" />
    <style type="text/css">
        .container {
              width: 1040px;
        }
         .user-name-link {
            color: white;
        }

            .header {
            background-color: #EEEEEE;
            height: 450px;
            overflow: hidden;
            margin: 0 auto;
            width: 1200px;
        }

        .description {
            font-size: 18px;
            word-wrap: break-word;
        }

        .metro2 {
            height: 150px;
            width: 1120px;
            display: none;
            margin: auto;
            padding: 10px;
        }

            .metro2 .left {
                width: 20%;
                float: left;
            }

            .metro2 .right {
                width: 80%;
                float: right;
            }

                .metro2 .right .slider {
                    height: 150px;
                    position: relative;
                }

        .viewport {
            position: absolute;
        }

    </style>
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
             <div class="header">
            <div class="metro2">
                <div class="left">
                    <div class="description">
                        <div id="oldUserPhoto">
                            <%--<asp:Image CssClass="owner-image" runat="server" ID="owner_image_id" />--%>
                            <span class="edit_pic">
                                <a href="ProfileEdit.aspx" style="color:white;text-decoration:none">修改头像</a>
                            </span>
                        </div>
                        <asp:HyperLink CssClass="" runat="server" ID="owner_name_id" NavigateUrl="#"></asp:HyperLink>
                    </div>
                </div>
                <div class="right">
                    <div class="slider">
                        <div class="container">
                            <ul class="viewport">
                                <li class="tileRow1"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="leftbar">
            <h2 class="reportCategory" style="color: #000">All Report</h2>
            <a class="addReport" href="../AddReport/AddNewReport.aspx">提交新文章</a>
            <aside class="filter">
            </aside>
            <aside class="links">
                <asp:Repeater runat="server" ID="linksRept" OnItemDataBound="linksRept_ItemDataBound">
                    <HeaderTemplate>
                        <h3 style="color: black; font-size: 18px; margin-top: 30px; margin-bottom: 0px;">友情链接</h3>
                        <div id="divCSSBI" class="divScroll">
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:PlaceHolder ID="plhGroupTitle_top" runat="server">
                            <h2 style="color: black; margin-top: 20px; padding-bottom: 0px; font-size: 16px; height: 24px; overflow: hidden">
                                <%#Eval("LinkName") %>
                            </h2>
                            <ul>
                        </asp:PlaceHolder>

                        <asp:Repeater ID="rptLinks" runat="server">
                            <ItemTemplate>
                                <li style="font-size: 13px; line-height: 24px; height: 24px; overflow: hidden"><a href="<%# Eval("URL") %>"><%# Eval("LinkName") %></a></li>
                            </ItemTemplate>
                        </asp:Repeater>

                        <asp:PlaceHolder ID="plhGroupTitle_bottom" runat="server"></ul>
                        </asp:PlaceHolder>
                    </ItemTemplate>
                    <FooterTemplate>
                        </div>
                    </FooterTemplate>
                </asp:Repeater>
            </aside>
        </div>
         <div class="content">
            <div class="sorter">
                <span>排序：</span>
                <select class="ordersel">
                    <option value="true">文章名字 (A-Z)</option>
                    <option value="false">文章名字 (Z-A)</option>
                </select>
            </div>
            <div class="last-item"></div>
        </div>
        <div class="col3">notification</div>
                 <input type="hidden" id="teamguidhidden" />
     </form>
    </div>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>

    <script src="../Scripts/navigation.js"></script>

    <%--<script src="../Scripts/teamsiteslist.js"></script>--%>
    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/picture-scrolling.js"></script>
    <script src="../Scripts/myteampagejs.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';

        (function (Nav, PS, $, undefined) {

        })(window.Nav = window.Nav || {}, window.PS = window.PS || {}, $, undefined);
        $(function () {
            // Load the team list in the detail panel below
            Nav.Initiate(sessionUser);
            PS.Inite();
        });
    </script>
</body>
</html>
