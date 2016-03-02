<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyCenter.aspx.cs" Inherits="WebApplication1.MyCenter" %>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">

    <style type="text/css">
       
        body {
            height:100%;
            margin:0;
            padding:0;
        }

        .container img {
            max-width:100%;
        }
        .header {
            background-color: #EEEEEE;
            height: 150px;
            overflow: hidden;
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

        .tileRow1 {
            height: 140px;
            width: 1000px;
        }

        .owner-image {
            display: block;
           
            overflow: hidden;
        }

        .owner-name {
            display: block;
            overflow: hidden;
        }
        .edit_pic {
            display:none;
         background-color: rgba(0, 0, 0, 0.7);
          width: 60px;
          text-align:center;
        }
        #oldUserPhoto {
            margin-top:30px;
            position:relative;
        }
         .user-name-link {
            color:white;
        }
    </style>

    <!--Metro css-->
    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <!--Product css-->
    <link rel="stylesheet" href="../Content/reports.css" />
    <link href="../Content/register.css" rel="stylesheet" />

    <title>个人中心</title>
</head>
<body class="metro">
    <div class="wrapper">
        
       
        <header class="bg-dark" style="position: relative">
            <div class="navigation-bar dark" style="width: 100%">
                <div class="navigation-bar-content container">
                    <a href="../Welcome.aspx" class="element"><span class="icon-grid-view" style="margin-right: 5px;"></span>Test Portal</a>
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

                            <a class="dropdown-toggle" href="#">企业中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li>
                                    <a href="#">活跃企业</a>
                                </li>
                                <li>
                                    <a href="#">最新企业</a>
                                </li>
                                <li class="teamsearch"><a href="#" class="dropdown-toggle">企业查找</a>

                                    <ul class="d-menu" data-role="dropdown">
                                        
                                    </ul>
                                </li>
                            </ul>


                        </li>
                        <li>
                            <a href="#" class="dropdown-toggle">个人中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li><a href="../Personal/MyCenter.aspx">我的收藏</a></li>
                                <li><a href="../Personal/MyCenter.aspx">我的关注</a></li>
                                <li><a href="../Personal/ProfileEdit.aspx">个人信息</a></li>
                            </ul>
                        </li>
                        
                        <li><a href="#" class="dropdown-toggle">管理中心</a>
                            <ul class="dropdown-menu place-center dark" data-role="dropdown" data-show="hover">
                                <li><a href="#">网站-新闻</a></li>
                            </ul>
                        </li>

                    </ul>
                    <div style="float: right; width: 20%" id="welcomeT">
                        <ul id="welcomezone" style="list-style: none">
                            <li style="color: white; float: left;" class="welcome">
                                <asp:LoginView ID="LoginView2" runat="server">
                                    <AnonymousTemplate>
                                        <div style="float: left;">
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
                                    <asp:Button ValidationGroup="two" runat="server" ID="btLogin_Text" Text="登陆" redirect="~/Welcome.aspx" CssClass="btn-default-login" />
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
                        <asp:HiddenField ID="HiddenField1" runat="server" />

            </form>
        </div>
    </div>

    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/profileedit.js"></script>
    <script src="../Scripts/navigation.js"></script>
    <script src="../Scripts/register.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/scriptHome.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>


    <!--Metro script-->
    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.easing.1.3.min.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';

        (function (Reg, URP, Nav, Pro, $, undefined) {
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
                    var final = [];
                    Site = result;
                    $.each(result.Tiles, function (index, content) {
                        var str = "";

                        var imageZone = "";
                        imageZone += "<div class='container'>" +
                        "  <div class='tile double live' data-role='live-tile' effect='slideLeft'>" +
                        " <div class='tile-content image'>" +
                            "<img src='../Images/1.jpg' />" +
                        "</div>" +
                        "<div class='tile-content image'>" +
                            "<img src='../Images/2.jpg' />" +
                        "</div>" +
                        "<div class='tile-content image'>" +
                            "<img src='../Images/3.jpg' />" +
                        "</div>" +
                        "<div class='tile-content image'>" +
                            "<img src='../Images/4.jpg' />" +
                        "</div>" +
                        "<div class='tile-content image'>" +
                            "<img src='../Images/5.jpg' />" +
                        "</div>" +
                        "<div class='tile-status bg-dark opacity'>" +
                            "<span class='label'>";

                        if (URP.criteria.TileId != 0) {
                            // Show the default selected tile
                            if (URP.criteria.TileId == content.Id) {
                                str += "<dl class='tile-selected' id='" + content.Id + "' tabindex=0><dt>" + content.ReportCount + '</dt><dd>' + content.TileName + '<dd></dl>';
                                //$('<dl class="tile tile-selected" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>').appendTo($('.tile-status')).appendTo($('.tileRow1'));
                            }
                            else {
                                str += "<dl class='' id='" + content.Id + "' tabindex=0><dt>" + content.ReportCount + '</dt><dd>' + content.TileName + '<dd></dl>';
                            }
                        }

                        else {
                            if (content.Id == 1) {
                                str+='<dl class="tile-selected" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>';
                            }
                            else {
                                str+='<dl class="" id="' + content.Id + '" tabindex="0"><dt>' + content.ReportCount + '</dt><dd>' + content.TileName + '</dd></dl>';
                            }
                        }
                        str += "</span>";

                        str += "</div></div></div></div>";

                        $('.tileRow1').append(imageZone + str);
                    });

                    $('.metro2').show();
                    $('.container').click(
                        function (e) {
                            if ($(this).find('dl').hasClass("tile-selected")) {
                                return;
                            }
                            else {
                                $('.container dl').removeClass("tile-selected");
                                $(this).find('dl').addClass("tile-selected");
                            }
                            OnTileSelected();
                        }
                        );
                    OnTileSelected();
                }
                function OnTileSelected() {
                    // update the report category text
                    $(".reportCategory").html($(".tile-selected").find("dd").html() + "( " + $(".tile-selected").find("dt").html() + " )");
                    var tileId = 2;
                    URP.criteria.TileId = tileId;
                    //load the filter controls 
                    URP.Report.getReport(false);
                    URP.Filter.getFilter(tileId);
                }
            };
        })(window.Reg = window.Reg || {}, window.URP = window.URP || {}, window.Nav = window.Nav || {}, window.Pro = window.Pro || {}, $, undefined);

        $(function () {
            Pro.GetUserDefaultImage();
            URP.criteria.TileId = 2;
            Nav.Initiate(sessionUser);
            URP.initiate();
            URP.ReportsGet.SiteGet();
            Reg.Init();
        });
    </script>
</body>
</html>


