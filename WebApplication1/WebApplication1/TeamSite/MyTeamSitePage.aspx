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
        .wrapper {
            width: 1200px;
            margin: 0 auto;
        }

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


        .teamsite-header {
            background-color: #EEE;
            padding: 5px 40px;
        }

            .teamsite-header .grid {
                height: 420px;
                position: relative;
            }

            .teamsite-header .onerow-grid {
                height: 140px;
            }

            .teamsite-header .tworow-grid {
                height: 280px;
            }

            .teamsite-header .threerow-grid {
                height: 420px;
            }

            .teamsite-header .grid .mark {
                height: 420px;
                width: 1120px;
                position: absolute;
                text-align: center;
                background-color: #FFF;
                opacity: 0.7;
            }

                .teamsite-header .grid .mark .donut {
                    height: 420px;
                    width: 1120px;
                    background: url('../images/SharePointProject/Metro_loading.gif') no-repeat center;
                }

            .teamsite-header .tile {
                text-align: center;
                margin: 5px;
                cursor: pointer;
                position: absolute;
                font-family: 'Segoe UI Symbol';
                z-index: 99;
                background-repeat: no-repeat;
                background-position: right top;
            }

                .teamsite-header .tile:hover {
                    transform: scale(1.02);
                }

                .teamsite-header .tile .tile-icon {
                    font-family: 'Segoe UI Symbol';
                    display: inline-block;
                }


                .teamsite-header .tile .tile-icon1row {
                    font-size: 48px;
                    margin-top: 25px !important;
                }

                .teamsite-header .tile .tile-count {
                    font-family: 'Segoe UI';
                    display: inline-block;
                    margin-top: 30px !important;
                    font-size: 36px;
                    z-index: 300;
                }

                .teamsite-header .tile .tile-icon2row {
                    font-size: 72px;
                    margin-top: 70px !important;
                }

                .teamsite-header .tile .tile-icon3row {
                    font-size: 128px;
                    margin-top: 100px !important;
                }

                .teamsite-header .tile .tile-title {
                    position: absolute;
                    bottom: 8px;
                    left: 10px;
                    font-size: 13px;
                    font-family: 'Segoe UI';
                    z-index: 300;
                    background-repeat: no-repeat;
                    text-align: left;
                }

            .teamsite-header .tile-selected {
                border: 2px solid #505050 !important;
                background-image: url('../Images/checkmark.png');
                background-position: right top;
                background-repeat: no-repeat;
            }

                .teamsite-header .tile-selected .selected-check {
                    position: absolute;
                    display: inline-block;
                    width: 27px;
                    height: 27px;
                    background-image: url('../Images/checkmark.png');
                    top: 0px;
                    right: 0px;
                }

            .teamsite-header .tile .tile-overlay {
                position: absolute;
                bottom: 0px;
                height: 35px;
                display: block;
                width: 100%;
                opacity: 0.7;
            }

        .loading-indicator {
            background: url('../Images/loading40.gif') no-repeat center;
            width: 70px;
            height: 70px;
        }

        .loading-indicator-overlay {
            opacity: 0.6;
            background-color: rgb(255, 255, 255);
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
                        <div style="float: right; margin-top: 15px; width: 20%" id="welcomeT">
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
            <div class="teamsite-header">
                <div class="grid"></div>
            </div>
            <div class="leftbar">
                <h2 class="reportCategory" style="color: #000">All Report</h2>
                <% if (Session["UserName"] != null)
                   { %>
                <a class="addReport" href="../AddReport/AddNewReport.aspx">提交新文章</a>
                <%}%>
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


            <div id="gs_feedback_gotop">
                <div class="side_fixed">
                    <%--<div class="to_top" title="Team" id="gotop2" style="visibility: visible; display: block;"></div>--%>
                </div>
            </div>

            <div id="hiddentext" style="display: none"></div>
        </form>
    </div>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/skin/pollyfill.js"></script>
    <script src="../Scripts/navigation.js"></script>

    <%--<script src="../Scripts/teamsiteslist.js"></script>--%>
    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/scriptHome.js"></script>
    <script src="../Scripts/myteampagejs.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';

        (function (URP, Nav, PS, $, undefined) {
            URP.ReportsGet = new function () {
                var Site = null;
                this.SiteGet = function () {
                    URP.criteria.SiteType = 'teamsite';

                    var criteriaString = $.cookie('criteriaString');
                    if (criteriaString != null) {
                        var criteriaObj = $.parseJSON(criteriaString);
                        if (criteriaObj.SiteType == 'teamsite') {
                            URP.criteria = criteriaObj;
                            URP.criteria.CurrentPage = 0;
                            $.removeCookie('criteriaString');
                        }
                    }

                    URP.util.GetSite($('.teamsite-header'), getSiteCallBack);
                };
                function getSiteCallBack(result) {

                    URP.ReportsGet.Site = result;


                    var whiteColorMap = ['#4668C5', '#00188F', '#002050', '#0072C6', '#008272', '#007233', '#008A00', '#DC3C00', '#E81123', '#BA141A', '#B4009E', '#9B4F96', '#68217A', '#442359'];
                    var unit = 140;
                    var maxRowNum = 1;
                    $.each(result, function (index, v) {
                        var left = (v.coordinateX * unit) + 'px';
                        var top = (v.coordinateY * unit) + 'px';
                        var width = (v.demensionX * unit - 10) + 'px';
                        var height = (v.demensionY * unit - 10) + 'px';
                        if ((v.coordinateY + v.demensionY) > maxRowNum) {
                            maxRowNum = v.coordinateY + v.demensionY;
                        }
                        var tile = $('<div EventType="tileclick" logicType="' + v.LogicType + '" tileid="' + v.id + '" id="' + v.id + '" class="tile" style="left:' + left + ';top:' + top + ';width:' + width + ';height:' + height + ';"><span class="tile-title">' + v.title + '</span><span class="selected-check"></span> </div>').appendTo($('.grid'));
                        if (URP.criteria.TileId > 0) {
                            if (URP.criteria.TileId == v.id) {
                                tile.addClass('tile-selected');
                            }
                        } else if (v.LogicType == 'AllReports') {
                            tile.addClass('tile-selected');
                        }
                        OnTileSelected();
                        if (v.backgroundImage == null || /^\s*$/.test(v.backgroundImage)) {
                            tile.css('background-color', v.backgroundColor);
                            if (whiteColorMap.indexOf(v.backgroundColor) > -1) {
                                tile.css('color', 'white');
                            } else {
                                tile.css('color', 'black');
                            }
                            if (v.icon != null && v.icon.length > 0) {
                                var icon = $('<span class="tile-icon">' + v.icon + '</span>');
                                switch (v.demensionY) {
                                    case 1:
                                        icon.addClass('tile-icon1row');
                                        break;
                                    case 2:
                                        icon.addClass('tile-icon2row');
                                        break;
                                    case 3:
                                        {
                                            icon.addClass('tile-icon3row');
                                            if (v.demensionX == 1) {
                                                icon.css({ 'font-size': '70px', 'margin-top': '120px' })
                                            }
                                        }
                                        break;
                                }
                                icon.appendTo(tile);
                            }
                        } else {
                            tile.css('background-image', 'url(' + v.backgroundImage.replace(' ', '%20') + ')');
                            var overlay = $('<span class="tile-overlay"></span>');
                            overlay.css('background-color', v.overlayColor);
                            switch (v.overlayColor) {
                                case 'Black':
                                    tile.find('.tile-title').css('color', 'white');
                                    break;
                                case 'White':
                                    tile.find('.tile-title').css('color', 'black');
                                    break;
                            }
                            overlay.appendTo(tile);
                        }
                        if (v.shownCount != null && v.shownCount != 'None') {
                            var count = $('<span class="tile-count">' + v.countNum + '</span>');
                            if (v.shownCount == 'Centered' && (v.icon == null || /^\s*$/.test(v.icon)) && v.backgroundColor != null && v.backgroundColor.length > 0) {
                                switch (v.demensionY) {
                                    case 1:
                                        count.addClass('tile-icon1row');
                                        break;
                                    case 2:
                                        count.addClass('tile-icon2row');
                                        break;
                                    case 3:
                                        {
                                            count.addClass('tile-icon3row');
                                            if (v.demensionX == 1) {
                                                count.css({ 'font-size': '70px', 'margin-top': '120px' })
                                            }
                                        }
                                        break;
                                }

                            } else {
                                count.css({
                                    position: 'absolute',
                                    bottom: '8px',
                                    right: '10px',
                                    fontFamily: 'Segoe UI',
                                    fontSize: '13px'
                                });
                                if (v.backgroundImage != null && v.backgroundImage.length > 0) {
                                    switch (v.overlayColor) {
                                        case 'Black':
                                            count.css('color', 'white');
                                            break;
                                        case 'White':
                                            count.css('color', 'black');
                                            break;
                                    }
                                }
                            }
                            count.appendTo(tile);
                        }
                        if (v.selected) {
                            tile.addClass('tile-selected');
                        }
                    });
                    switch (maxRowNum) {
                        case 1:
                            $('.teamsite-header .grid').addClass('onerow-grid');
                            break;
                        case 2:
                            $('.teamsite-header .grid').addClass('tworow-grid');
                            break;
                        case 3:
                            $('.teamsite-header .grid').addClass('threerow-grid');
                            break;

                    }
                    $('.tile').live('click', function () {
                        if ($(this).attr('logicType') == 'Static') {
                            return;
                        }
                        if ($(this).hasClass('tile-selected')) {
                            return;
                        }
                        $('.tile').removeClass('tile-selected');
                        $(this).addClass('tile-selected');
                        URP.criteria.FilterEntityList = [];
                        OnTileSelected();
                    });
                    OnTileSelected();
                }
                function OnTileSelected() {
                    // update the report category text

                    var tileTitle = $(".tile-selected").find(".tile-title").text();

                    if (tileTitle == "All Reports") {
                        tileTitle = "所有文章";
                    }

                    $(".reportCategory").html(tileTitle + "( " + $(".tile-selected").find(".tile-count").text() + " )");
                    var tileId = $(".tile-selected").attr('tileid');
                    URP.criteria.TileId = tileId;
                    //load the filter controls 
                    URP.Report.getReport(false, briefCallBack);

                    URP.Filter.getFilter(tileId);
                }

                function briefCallBack(result) {
                    $('.list-item').remove();
                    var listString = '';

                    $.each(result.ReportList, function (index, content) {
                        listString += "<div class='list-item' style='margin-top:10px'>"

                                        + "<div class='item-header'>"
                                            + "<a href='#' class='reportCollapse'></a><svg xmlns='http://www.w3.org/2000/svg' class='si-glyph-circle-info' style='height:20px; width:20px; margin-right: 5px;'><use xlink:href='../css/sprite.svg#si-glyph-circle-info' /></svg><a tag=" + content.ID + " class='reportTitle' href='#'>" + content.Title + "</a>"
                                        + "</div>"

                                        + "<div class='item-content'>" 
                                                 + "<div class='item-detail'></div>"
                                        //+ "<div class='item-description'>"
                                        //    + URP.util.HTMLDecode(content.Content)
                                        //+ "</div>"
                                                 + "<div class='item-footer'>"
                                                    + " 所有者:" + content.Owners + " | 状态:" + content.ReportStatus

                                            //+(content.SubscribeStatus == null ? '' : (content.SubscribeStatus != 'subscribed' ? ' | <a href="javascript:return false"  class="subscription" CatalogId="' + content.ID + '">' + content.SubscribeStatus.toUpperCase() + '</a>' : ' | ALREADY SUBSCRIBED')) 

                                            //+ (content.RecommendStatus != null ? ' | <a href="javascript:return false"  class="recommendation" CatalogId="' + content.ID + '">RECOMMEND</a> ' + (content.Remove == true ? ' | <a href="javascript:return false"  class="recommendRemove" CatalogId="' + content.ID "'>REMOVE</a> ' : ' ') : '') + (content.Editable == false ? '' : ' | <a class="editReport" href="' + decodeURIComponent(content.EditURL) + '&Source=' + window.location.href + '">EDIT</a><a href='#' class='action'>编辑</a><a href='#' class='action'>推荐</a><a href='#' class='action'>订阅</a>"
                                                 + "</div>";
                        //  + "<div class='item-detail'></div>"
                        //+ "</div>";


                        if (content.RecommendList != null) {
                            listString += '<div class="recommenders">'
                            $.each(content.RecommendList, function (indexRec, contentRec) {
                                listString += '<p style="color:#666;margin-bottom: 1px">Recommended by: ' + contentRec.UserName + '</p><p>Message: ' + contentRec.Comment + '</p>';
                            });
                            listString += '</div>';
                        }

                        listString +="</div></div>";
                    });

                    if (URP.criteria.CurrentPage == 0) {
                        $('.content .list-item').remove();
                    }

                    if (listString.length == 0) {
                        if (URP.criteria.currentPage == 0) {
                            listString += "<div class='list-item'>没有任何文章...</div>";
                        }
                        else {
                            listString += "<div class='list-item'>已经到达最后一页...</div>";
                        }
                    }

                    $(listString).insertBefore($('.content .last-item'));
                }

                this.getTeamSite = function () {
                    URP.util.GetTeam($(this), function (result) {
                        var t = "<svg xmlns='http://www.w3.org/2000/svg' class='si-glyph-bubble-message-hi'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='../css/sprite.svg#si-glyph-bubble-message-hi'></use></svg>";

                        $('.side_fixed').html("<a class='reply' href='mailto:" + result.teamOwners + "'>" + t + "</a>");
                    });
                }
            };
        })(window.URP = window.URP || {}, window.Nav = window.Nav || {}, window.PS = window.PS || {}, $, undefined);
        $(function () {

            // Load the team list in the detail panel below
            Nav.Initiate(sessionUser);
            URP.ReportsGet.getTeamSite();
            URP.ReportsGet.SiteGet();

            $.each($('.tile, .tile-selected'), function () {
                var tile = $(this);
                setTimeout(function () {
                    tile.css({
                        opacity: 1,
                        "-webkit-transform": "scale(1)",
                        "transform": "scale(1)",
                        "-webkit-transition": ".3s",
                        "transition": ".3s"
                    });
                }, Math.floor(Math.random() * 500));
            });
            $(".grid").animate({
                left: 0
            });
            URP.initiate();
        });
    </script>
</body>
</html>
