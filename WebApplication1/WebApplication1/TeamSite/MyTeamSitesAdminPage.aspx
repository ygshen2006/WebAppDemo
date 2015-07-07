<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyTeamSitesAdminPage.aspx.cs" Inherits="WebApplication1.TeamSite.MyTeamSitesAdminPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel='shortcut icon' type='image/x-icon' href='../Images/favicon.ico' />
    <link href="../Content/metro-icons.css" rel="stylesheet" />
    <link href="../Content/metro.css" rel="stylesheet" />

    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/metro.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
     <script src="../Scripts/teamsiteslist.js"></script>
    <title>我的团队</title>
    <style>
        .tile-area-controls {
            position: fixed;
            right: 40px;
            top: 40px;
        }

        .tile-group {
            left: 100px;
        }

        .tile, .tile-small, .tile-sqaure, .tile-wide, .tile-large, .tile-big, .tile-super {
            opacity: 0;
            -webkit-transform: scale(.8);
            transform: scale(.8);
        }

        .charm.right-side {
            width: 300px;
            right: -300px;
        }

        #charmSettings .button {
            margin: 5px;
        }

        @media screen and (max-width: 640px) {
            .tile-area {
                overflow-y: scroll;
            }

            .tile-area-controls {
                display: none;
            }
        }

        @media screen and (max-width: 320px) {
            .tile-area {
                overflow-y: scroll;
            }

            .tile-area-controls {
                display: none;
            }
        }
    </style>
    <%--<link href="../Content/teamsites.css" rel="stylesheet" />--%>
    <script>

        /*
         * Do not use this is a google analytics fro Metro UI CSS
         * */
        if (window.location.hostname !== 'localhost') {

            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-58849249-3', 'auto');
            ga('send', 'pageview');

        }

    </script>


    <script>
        (function ($) {
            $.StartScreen = function () {
                var plugin = this;
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

                plugin.init = function () {
                    setTilesAreaSize();
                    if (width > 640) addMouseWheel();
                };

                var setTilesAreaSize = function () {
                    var groups = $(".tile-group");
                    var tileAreaWidth = 80;
                    $.each(groups, function (i, t) {
                        if (width <= 640) {
                            tileAreaWidth = width;
                        } else {
                            tileAreaWidth += $(t).outerWidth() + 80;
                        }
                    });
                    $(".tile-area").css({
                        width: tileAreaWidth
                    });
                };

                var addMouseWheel = function () {
                    $("body").mousewheel(function (event, delta, deltaX, deltaY) {
                        var page = $(document);
                        var scroll_value = delta * 50;
                        page.scrollLeft(page.scrollLeft() - scroll_value);
                        return false;
                    });
                };

                plugin.init();
            }
        })(jQuery);

        $(function () {
            $.StartScreen();

            var tiles = $(".tile, .tile-small, .tile-sqaure, .tile-wide, .tile-large, .tile-big, .tile-super");

            $.each(tiles, function () {
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

            $(".tile-group").animate({
                left: 0
            });




        });
        function showSearch() {
            var charm = $("#charmSearch");

            if (charm.data('hidden') == undefined) { charm.data('hidden', true); }

            if (!charm.data('hidden')) {

                charm.animate({
                    right: -300
                });

                charm.data('hidden', true);
            } else {
                charm.animate({
                    right: 0
                });
                charm.data('hidden', false);
            }
        }

        function showSettings() {
            var charm = $("#charmSettings");

            if (charm.data('hidden') == undefined) { charm.data('hidden', true); }

            if (!charm.data('hidden')) {

                charm.animate({
                    right: -300
                });

                charm.data('hidden', true);
            } else {
                charm.animate({
                    right: 0
                });
                charm.data('hidden', false);
            }
        }

        function setSearchPlace(el) {
            var a = $(el);
            var text = a.text();
            var toggle = a.parents('label').children('.dropdown-toggle');

            toggle.text(text);
        }

        $(function () {

            var current_tile_area_scheme = localStorage.getItem('tile-area-scheme') || "tile-area-scheme-dark";

            $(".tile-area").removeClass(function (index, css) {
                return (css.match(/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
            }).addClass(current_tile_area_scheme);

            $(".schemeButtons .button").hover(
                    function () {
                        var b = $(this);
                        var scheme = "tile-area-scheme-" + b.data('scheme');
                        $(".tile-area").removeClass(function (index, css) {
                            return (css.match(/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                        }).addClass(scheme);
                    },
                    function () {
                        $(".tile-area").removeClass(function (index, css) {
                            return (css.match(/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                        }).addClass(current_tile_area_scheme);
                    }
            );

            $(".schemeButtons .button").on("click", function () {
                var b = $(this);
                var scheme = "tile-area-scheme-" + b.data('scheme');

                $(".tile-area").removeClass(function (index, css) {
                    return (css.match(/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                }).addClass(scheme);

                current_tile_area_scheme = scheme;
                localStorage.setItem('tile-area-scheme', scheme);
                $.cookie('tile-schema', criteriaString, { expires: 1 });
                showSettings();
            });
        });
    </script>
</head>
<body class="metro">
    <%--  <div class="wrapper">--%>
   <%-- <form id="form1" runat="server">--%>


        <div class="charm right-side padding20 bg-grayDark" id="charmSearch">
            <button class="square-button bg-transparent fg-white no-border place-right small-button" onclick="showSearch()"><span class="mif-cross"></span></button>
            <h1 class="text-light">Search</h1>
            <hr class="thin" />
            <br />
            <div class="input-control text full-size">
                <label>
                    <span class="dropdown-toggle drop-marker-light">Anywhere</span>
                    <ul class="d-menu" data-role="dropdown">
                        <li><a onclick="setSearchPlace(this)">Anywhere</a></li>
                        <li><a onclick="setSearchPlace(this)">Options</a></li>
                        <li><a onclick="setSearchPlace(this)">Files</a></li>
                        <li><a onclick="setSearchPlace(this)">Internet</a></li>
                    </ul>
                </label>
                <input type="text">
                <button class="button"><span class="mif-search"></span></button>
            </div>
        </div>

        <div class="charm right-side padding20 bg-grayDark" id="charmSettings">
            <button class="square-button bg-transparent fg-white no-border place-right small-button" onclick="showSettings()"><span class="mif-cross"></span></button>
            <h1 class="text-light">Settings</h1>
            <hr class="thin" />
            <br />
            <div class="schemeButtons">
                <div class="button square-button tile-area-scheme-dark" data-scheme="dark"></div>
                <div class="button square-button tile-area-scheme-darkBrown" data-scheme="darkBrown"></div>
                <div class="button square-button tile-area-scheme-darkCrimson" data-scheme="darkCrimson"></div>
                <div class="button square-button tile-area-scheme-darkViolet" data-scheme="darkViolet"></div>
                <div class="button square-button tile-area-scheme-darkMagenta" data-scheme="darkMagenta"></div>
                <div class="button square-button tile-area-scheme-darkCyan" data-scheme="darkCyan"></div>
                <div class="button square-button tile-area-scheme-darkCobalt" data-scheme="darkCobalt"></div>
                <div class="button square-button tile-area-scheme-darkTeal" data-scheme="darkTeal"></div>
                <div class="button square-button tile-area-scheme-darkEmerald" data-scheme="darkEmerald"></div>
                <div class="button square-button tile-area-scheme-darkGreen" data-scheme="darkGreen"></div>
                <div class="button square-button tile-area-scheme-darkOrange" data-scheme="darkOrange"></div>
                <div class="button square-button tile-area-scheme-darkRed" data-scheme="darkRed"></div>
                <div class="button square-button tile-area-scheme-darkPink" data-scheme="darkPink"></div>
                <div class="button square-button tile-area-scheme-darkIndigo" data-scheme="darkIndigo"></div>
                <div class="button square-button tile-area-scheme-darkBlue" data-scheme="darkBlue"></div>
                <div class="button square-button tile-area-scheme-lightBlue" data-scheme="lightBlue"></div>
                <div class="button square-button tile-area-scheme-lightTeal" data-scheme="lightTeal"></div>
                <div class="button square-button tile-area-scheme-lightOlive" data-scheme="lightOlive"></div>
                <div class="button square-button tile-area-scheme-lightOrange" data-scheme="lightOrange"></div>
                <div class="button square-button tile-area-scheme-lightPink" data-scheme="lightPink"></div>
                <div class="button square-button tile-area-scheme-grayed" data-scheme="grayed"></div>
            </div>
        </div>

        <div class="tile-area tile-area-scheme-dark fg-white">
            <h1 class="tile-area-title">企业中心</h1>
            <div class="tile-area-controls">
                <button class="image-button icon-right bg-transparent fg-white bg-hover-dark no-border">
                    <span class="sub-header no-margin text-light">

                        <asp:LoginView ID="LoginView1" runat="server">
                            <AnonymousTemplate>
                                <div style="float: left; margin-top: 5px;">
                                    <a id="register-link" class="user-name-link" href="../MyAccounts/Register.aspx?ReturnUrl='~/Welcome.aspx'">注册</a>
                                    <a id="login-link" class="user-name-link" href="#">登陆</a>
                                </div>
                            </AnonymousTemplate>
                            <LoggedInTemplate>
                                <div style="color:white" class="welcome-text">
                                    <span></span><a href="../Personal/MyCenter.aspx" class="user-name-link">
                                        <asp:LoginName ID="LoginName1" runat="server" />
                                    </a>
                                </div>
                            </LoggedInTemplate>
                        </asp:LoginView>
                    </span><span class="icon mif-user"></span>
                </button>
                <button class="square-button bg-transparent fg-white bg-hover-dark no-border" onclick="showSearch()"><span class="mif-search"></span></button>
                <button class="square-button bg-transparent fg-white bg-hover-dark no-border" onclick="showSettings()"><span class="mif-cog"></span></button>
                <a href="../tiles.html" class="square-button bg-transparent fg-white bg-hover-dark no-border"><span class="mif-switch"></span></a>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">General</span>

                <div class="tile-container">

                    <div class="tile bg-indigo fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-calendar"></span>
                        </div>
                        <span class="tile-label">Calendar</span>
                    </div>

                    <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>
                      <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>  <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-envelop"></span>
                        </div>
                        <span class="tile-label">Inbox</span>
                    </div>
                    
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Images</span>
                <div class="tile-container">
                    <div class="tile-wide" data-role="tile" data-effect="slideLeft">
                        <div class="tile-content">
                            <div class="live-slide">
                                <img src="../images/1.jpg" data-role="fitImage" data-format="fill">
                            </div>
                            <div class="live-slide">
                                <img src="../images/2.jpg" data-role="fitImage" data-format="fill">
                            </div>
                            <div class="live-slide">
                                <img src="../images/3.jpg" data-role="fitImage" data-format="fill">
                            </div>
                            <div class="live-slide">
                                <img src="../images/4.jpg" data-role="fitImage" data-format="fill">
                            </div>
                            <div class="live-slide">
                                <img src="../images/5.jpg" data-role="fitImage" data-format="fill">
                            </div>
                        </div>
                        <div class="tile-label">Gallery</div>
                    </div>
                    <div class="tile" data-role="tile" data-role="tile" data-effect="slideUpDown">
                        <div class="tile-content">
                            <div class="live-slide">
                                <img src="../images/1.jpg" data-role="fitImage" data-format="fill">
                            </div>
                            <div class="live-slide">
                                <img src="../images/2.jpg" data-role="fitImage" data-format="fill">
                            </div>
                        </div>
                        <div class="tile-label">Photos</div>
                    </div>
                    <div class="tile-small bg-amber fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-video-camera"></span>
                        </div>
                    </div>
                    <div class="tile-small bg-green fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-gamepad"></span>
                        </div>
                    </div>
                    <div class="tile-small bg-pink fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-headphones"></span>
                        </div>
                    </div>
                    <div class="tile-small bg-yellow fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-lock"></span>
                        </div>
                    </div>
                     <div class="tile-small bg-yellow fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-lock"></span>
                        </div>
                    </div> <div class="tile-small bg-yellow fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-lock"></span>
                        </div>
                    </div> <div class="tile-small bg-yellow fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-lock"></span>
                        </div>
                    </div> <div class="tile-small bg-yellow fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-lock"></span>
                        </div>
                    </div>
                    <div class="tile-wide bg-orange fg-white" data-role="tile">
                        <div class="tile-content image-set">
                            <img src="../images/1.jpg">
                            <img src="../images/2.jpg">
                            <img src="../images/3.jpg">
                            <img src="../images/4.jpg">
                            <img src="../images/5.jpg">
                        </div>
                    </div>

                </div>
            </div>

            <div class="tile-group one">
                <span class="tile-group-title">Office</span>

                <div class="tile-small bg-blue" data-role="tile">
                    <div class="tile-content iconic">
                        <img src="../images/outlook.png" class="icon">
                    </div>
                </div>
                <div class="tile-small bg-darkBlue" data-role="tile">
                    <div class="tile-content iconic">
                        <img src="../images/word.png" class="icon">
                    </div>
                </div>
                <div class="tile-small bg-green" data-role="tile">
                    <div class="tile-content iconic">
                        <img src="../images/excel.png" class="icon">
                    </div>
                </div>
                <div class="tile-small bg-red" data-role="tile">
                    <div class="tile-content iconic">
                        <img src="../images/access.png" class="icon">
                    </div>
                </div>
                <div class="tile-small bg-orange" data-role="tile">
                    <div class="tile-content iconic">
                        <img src="../images/powerpoint.png" class="icon">
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Games</span>
                <div class="tile-container">
                    <div class="tile" data-role="tile">
                        <div class="tile-content">
                            <img src="../images/grid2.jpg" data-role="fitImage" data-format="square">
                        </div>
                    </div>
                    <div class="tile-small" data-role="tile">
                        <div class="tile-content">
                            <img src="../images/Battlefield_4_Icon.png" data-role="fitImage" data-format="square">
                        </div>
                    </div>
                    <div class="tile-small" data-role="tile">
                        <div class="tile-content">
                            <img src="../images/Crysis-2-icon.png" data-role="fitImage" data-format="square" data-frame-color="bg-steel">
                        </div>
                    </div>
                    <div class="tile-small" data-role="tile">
                        <div class="tile-content">
                            <img src="../images/WorldofTanks.png" data-role="fitImage" data-format="square" data-frame-color="bg-dark">
                        </div>
                    </div>
                    <div class="tile-small" data-role="tile">
                        <div class="tile-content">
                            <img src="../images/halo.jpg" data-role="fitImage" data-format="square">
                        </div>
                    </div>
                    <div class="tile-wide bg-green fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <img src="../images/x-box.png" class="icon">
                        </div>
                        <div class="tile-label">X-Box Live</div>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Other</span>
                <div class="tile-container">
                    <div class="tile bg-teal fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-pencil"></span>
                        </div>
                        <span class="tile-label">Editor</span>
                    </div>
                    <div class="tile bg-darkGreen fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-shopping-basket"></span>
                        </div>
                        <span class="tile-label">Store</span>
                    </div>
                    <div class="tile bg-cyan fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-skype"></span>
                        </div>
                        <div class="tile-label">Skype</div>
                    </div>
                    <div class="tile bg-darkBlue fg-white" data-role="tile">
                        <div class="tile-content iconic">
                            <span class="icon mif-cloud"></span>
                        </div>
                        <span class="tile-label">OneDrive</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- hit.ua -->
        <a href='http://hit.ua/?x=136046' target='_blank'>
            <script language="javascript" type="text/javascript"><!--
    Cd = document; Cr = "&" + Math.random(); Cp = "&s=1";
    Cd.cookie = "b=b"; if (Cd.cookie) Cp += "&c=1";
    Cp += "&t=" + (new Date()).getTimezoneOffset();
    if (self != top) Cp += "&f=1";
    //--></script>
            <script language="javascript1.1" type="text/javascript"><!--
    if (navigator.javaEnabled()) Cp += "&j=1";
    //--></script>
            <script language="javascript1.2" type="text/javascript"><!--
    if (typeof (screen) != 'undefined') Cp += "&w=" + screen.width + "&h=" +
    screen.height + "&d=" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);
    //--></script>
            <script language="javascript" type="text/javascript"><!--
    Cd.write("<img src='http://c.hit.ua/hit?i=136046&g=0&x=2" + Cp + Cr +
    "&r=" + escape(Cd.referrer) + "&u=" + escape(window.location.href) +
    "' border='0' wi" + "dth='1' he" + "ight='1'/>");
    //--></script>
        </a>
        <!-- / hit.ua -->



<%--    </form>--%>
    <%--       <footer class="container" style="float: right">
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
        </footer>--%>
    <%--    </div>--%>

    <%-- <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>--%>

    <%--  <script src="../Scripts/navigation.js"></script>

    <script src="../Scripts/teamsiteslist.js"></script>
    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script src="../Scripts/picture-scrolling.js"></script>--%>

    <script type="text/javascript">

        (function (TeamSites, $, undefined) {


        })(window.TeamSites = window.TeamSites || {}, $, undefined);
        $(function () {

        });
    </script>
</body>
</html>
