<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Study.aspx.cs" Inherits="WebApplication1.Study" %>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">

    <style type="text/css">
        .header {
            background-color: #EEEEEE;
            height: 150px;
            padding: 10px 30px;
            overflow: hidden;
        }

        .description {
            font-size: 18px;
            word-wrap: break-word;
        }

        .metro {
            height: 150px;
            width: 1120px;
            display: none;
        }

            .metro .left {
                width: 400px;
                float: left;
            }

            .metro .right {
                width: 540px;
                float: right;
            }

                .metro .right .slider {
                    width: 540px;
                    height: 150px;
                    float: left;
                    position: relative;
                }

        .viewport {
            position: absolute;
        }

        .tileRow1 {
            height: 140px;
            width: 2000px;
        }
    </style>
    <link rel="stylesheet" href="Content/navgation.css" />
    <link rel="stylesheet" href="Content/reports.css" />
    <script type="text/javascript" src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/jquery.showLoading.js"></script>
    <script src="Scripts/jquery.cookie.js"></script>

    <script src="Scripts/jquery.bpopup.min.js"></script>
    <link href="Content/register.css" rel="stylesheet" />
    <script src="Scripts/navigation.js"></script>
    <script src="Scripts/register.js"></script>
    <script type="text/javascript" src="Scripts/scriptHome.js"></script>

    <script type="text/javascript">

        (function (Reg, URP, Nav, $, undefined) {
            URP.ReportsGet = new function () {
                var Site = null;
                this.SiteGet = function () {
                    URP.criteria.SiteType = 'myreport';

                    var criteriaString = $.cookie('criteriaString');
                    if (criteriaString != null) {
                        var criteriaObj = $.parseJSON(criteriaString);
                        if (criteriaObj.SiteType == 'myreport') {
                            URP.criteria = criteriaObj;
                            URP.criteria.CurrentPage = 0;
                            $.removeCookie('criteriaString');
                        }
                    }

                    URP.util.GetSite($('.header'), getSiteCallBack);
                };
                function getSiteCallBack(result) {
                    Site = result;
                    $.each(result.Tiles, function (index, content) {
                        if (URP.criteria.TileId != 0) {
                            // Show the default selected tile
                            if (URP.criteria.TileId == content.Id) {
                                $('<dl class="tile tile-selected" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>').appendTo($('.tileRow1'));
                            }
                            else {
                                $('<dl class="tile" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>').appendTo($('.tileRow1'));
                            }
                        }
                        else {
                            if (content.Id == 1) {
                                $('<dl class="tile tile-selected" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>').appendTo($('.tileRow1'));
                            }
                            else {
                                $('<dl class="tile" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>').appendTo($('.tileRow1'));
                            }
                        }
                    });

                    $('.metro').show();
                    $('.tile').click(
                        function (e) {
                            if ($(this).hasClass("tile-selected")) {
                                return;
                            }
                            else {
                                $('.tile').removeClass("tile-selected");
                                $(this).addClass("tile-selected");
                            }
                            OnTileSelected();
                        }
                        );
                    OnTileSelected();
                }
                function OnTileSelected() {
                    // update the report category text
                    $(".reportCategory").html($(".tile-selected").find("dd").html() + "( " + $(".tile-selected").find("dt").html() + " )");
                    var tileId = $(".tile-selected").attr("id");
                    URP.criteria.TileId = tileId;
                    // load the filter controls 
                    URP.Report.getReport(false);
                    URP.Filter.getFilter(tileId);
                }
            };
        })(window.Reg = window.Reg || {}, window.URP = window.URP || {}, window.Nav = window.Nav || {}, $, undefined);

        $(function () {
            URP.criteria.TileId = 2;
            Nav.Initiate();
            URP.initiate();
            URP.ReportsGet.SiteGet();
            Reg.Init();
        });
    </script>
    <title>我的贴吧资料</title>
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

                                <li><a href="Study.aspx">我的贴吧</a></li>

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


        <div class="header">
            <div class="metro">
                <div class="left">
                    <div class="description">这是专属于您的私人空间，从这里出发您可以提交您最感兴趣的话题、文章、产品宣传资料等。您的直接汇报人员会第一时间看到您的文章并及时回复您。当然您也可以订阅您自己感兴趣的文章，或者推荐您喜爱的文章给您的小伙伴们哟。</div>
                    <div class="profile"></div>
                </div>
                <div class="right">
                    <div class="slider">
                        <ul class="viewport">
                            <li class="tileRow1"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="leftbar">
            <h2 class="reportCategory" style="color: #000">All Report</h2>
            <a class="addReport" href="AddReport/AddNewReport.aspx">提交新文章</a>
            <aside class="filter">
            </aside>
            <aside class="links">
                <asp:Repeater runat="server" ID="linksRept" OnItemDataBound="linksRept_ItemDataBound">
                    <HeaderTemplate>
                        <h3 style="color: black; font-size: 18px; margin-top: 30px; margin-bottom: 0px;">公司链接</h3>
                        <div id="divCSSBI" class="divScroll">
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:PlaceHolder ID="plhGroupTitle_top" runat="server">
                            <h2 style="color: black; margin-top: 20px; padding-bottom: 0px; font-size: 16px; height: 24px; overflow: hidden">
                                <%#Eval("GroupsName") %>
                            </h2>
                            <ul>
                        </asp:PlaceHolder>

                        <asp:Repeater ID="rptLinks" runat="server">
                            <ItemTemplate>
                                <li style="font-size: 13px; line-height: 24px; height: 24px; overflow: hidden"><a href="<%# Eval("LinkURL") %>"><%# Eval("LinkName") %></a></li>
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
                                    <asp:Button ValidationGroup="two" runat="server" ID="btLogin_Text" Text="登陆" redirect="../Personal/MyCenter.aspx" CssClass="btn-default-login" />
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


