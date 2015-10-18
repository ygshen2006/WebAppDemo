<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Welcome.aspx.cs" Inherits="WebApplication1.Welcome" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Content/register.css" rel="stylesheet" />
    <link href="css/metro-bootstrap.css" rel="stylesheet" />
    <link href="css/iconFont.css" rel="stylesheet" />
    <link href="Content/home.css" rel="stylesheet" />


    <title>首页</title>

</head>
<body class="metro">

    <form id="form1" runat="server">

        <header class="bg-dark" style="position: relative">
            <div class="navigation-bar dark" style="width: 100%">
                <div class="navigation-bar-content container">
                    <a href="../Welcome.aspx" class="element"><span class="icon-grid-view" style="margin-right: 5px;"></span>长宁人才</a>
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
        <%--    <div style="background: url(Images/Homepage/b1.jpg) top left no-repeat; background-size: cover; height: 300px;">
            <div class="container" style="padding: 50px 20px">
                <h1 class="fg-white">Metro UI CSS 2.0</h1>
                <h2 class="fg-white">Metro UI CSS a set of styles to create a site<br>
                    with an interface similar to Windows 8.
                </h2>

                <a href="https://github.com/olton/Metro-UI-CSS/archive/master.zip" class="place-left button bg-darkRed bg-hover-red fg-white fg-hover-white bd-orange" style="margin-top: 10px">
                    <h3 class="text-normal" style="margin: 10px 40px">Download <span class="icon-download-2 on-right"></span></h3>
                </a>

                <div class="place-left" style="margin-left: 20px; margin-top: 10px">
                </div>
            </div>
        </div>--%>
        <div id="wrap">
            <div id="page-left-shadow" class="z-index-layer-1"></div>

            <div id="page-right-shadow" class="z-index-layer-1"></div>
            <div id="page-bottom-shadow" class="z-index-layer-1"></div>
            <div id="inner-wrap" class="ad-root">
                <div beacon-attr-scrollnumber="1" beacon-attr-zone="-10" beacon-attr-regionname="masthead" id="masthead-container">
                    <div class="controls" id="masthead">
                        <div style="height: 600px;" id="key-art">
                            <ul class="slides">
                                <li style="width: 100%; float: left; margin-right: -100%; display: list-item;" masthead-position="0">
                                    <div class="plus-promo-v2">
                                        <img style="opacity: 1;" class="keyart" src="Images/Homepage/Images/4.jpg?size=1600x600" alt="Hulu Plus">
                                        <div style="left: 87px; opacity: 1; display: block;" class="metadata left top">
                                            <img class="data smart-hover hidden" hover-action="hide" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                            <img style="" class="data smart-hover" hover-action="show" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                        </div>
                                        <a href="" class="transparent-click-area beacon beacon-click" click-event-type="sitetracking,masthead/click;plustracking,driverclick" beacon-attr-target="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5740" beacon-attr-drivertype="masthead" beacon-attr-driverid1="Currents - MH" beacon-attr-driverid2="29910"></a>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="1">
                                    <div class="plus-promo-v2">
                                        <img class="keyart" src="Images/Homepage/Images/2.jpg?size=1600x600" alt="Hulu Plus">
                                        <div style="left: 87px; display: none;" class="metadata left top">
                                            <img class="data smart-hover hidden" hover-action="hide" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                            <img style="" class="data smart-hover" hover-action="show" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                        </div>
                                        <a href="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5741" class="transparent-click-area beacon beacon-click" click-event-type="sitetracking,masthead/click;plustracking,driverclick" beacon-attr-target="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5741" beacon-attr-drivertype="masthead" beacon-attr-driverid1="Catch Up - MH" beacon-attr-driverid2="29911"></a>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="2">
                                    <div class="plus-promo-v2">
                                        <img class="keyart" src="http://ib.huluim.com/assets/new-mastheads/spring-tv-mh-2048x768-v7-b-3.jpg?size=1600x600" alt="Hulu Plus">
                                        <div style="left: 87px; display: none;" class="metadata left top">
                                            <img class="data smart-hover hidden" hover-action="hide" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                            <img style="" class="data smart-hover" hover-action="show" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                        </div>
                                        <a href="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5742" class="transparent-click-area beacon beacon-click" click-event-type="sitetracking,masthead/click;plustracking,driverclick" beacon-attr-target="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5742" beacon-attr-drivertype="masthead" beacon-attr-driverid1="Entire Series - MH" beacon-attr-driverid2="29912"></a>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="3">
                                    <div class="plus-promo-v2">
                                        <img class="keyart" src="http://ib.huluim.com/assets/new-mastheads/seinfeld-elaine-mh-v2.png?size=1600x600" alt="Seinfeld - Get Out!">
                                        <div style="left: 87px; display: none;" class="metadata left top">
                                            <img class="data smart-hover hidden" hover-action="hide" src="http://assets.hulu.com/mastheads/logo_art_blank.png">
                                            <img style="" class="data smart-hover" hover-action="show" src="http://assets.hulu.com/mastheads/logo_art_blank.png">
                                        </div>
                                        <a href="/watch/799511" class="transparent-click-area beacon beacon-click" click-event-type="sitetracking,masthead/click;plustracking,driverclick" beacon-attr-target="/watch/799511" beacon-attr-drivertype="error" beacon-attr-driverid1="799511" beacon-attr-driverid2="29936"></a>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="4">
                                    <div class="plus-promo-v2">
                                        <img src="http://ib.huluim.com/assets/new-mastheads/izombie_astroburger.png?size=1600x600" class="keyart" alt="iZombie - Astroburger">
                                        <div class="gradient-overlay ad-root ">
                                            <div style="opacity: 0;" class="play-button smart-hover hidden" hover-action="idleAware"></div>
                                            <div style="left: 87px; display: none;" class="metadata top left">
                                                <div style="opacity: 1;" class="promotional-text">
                                                    <div class="shadow">Watch the Full Episode</div>
                                                    <div class="origin">Watch the Full Episode</div>
                                                </div>
                                                <div style="opacity: 1;" class="headline">
                                                    <div class="shadow">iZombie</div>
                                                    <div class="origin">iZombie</div>
                                                </div>
                                                <div style="opacity: 1;" class="title">
                                                    <div class="shadow">Astroburger</div>
                                                    <div class="origin">Astroburger</div>
                                                </div>
                                                <div style="opacity: 1;" class="description">
                                                    <div class="shadow">When someone close to Major dies of an apparent suicide, Liv consumes the brains, resulting in a mix of reality and paranoia.</div>
                                                    <div class="origin">When someone close to Major dies of an apparent suicide, Liv consumes the brains, resulting in a mix of reality and paranoia.</div>
                                                </div>
                                            </div>
                                            <a class="transparent-click-area beacon beacon-click" href="/watch/795838" click-event-type="sitetracking,masthead/click"></a>
                                            <div style="left: 87px; opacity: 1; display: none;" class="metadata bottom left"><span><a style="display: inline; opacity: 0;" class="add-to-queue-button save-button smart-hover hidden" hover-action="idleAware" href="javascript:void(0)"></a><a style="display: none; opacity: 0;" class="remove-from-queue-button remove-button smart-hover hidden" hover-action="idleAware" href="javascript:void(0)"></a></span></div>
                                        </div>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="5">
                                    <div class="plus-promo-v2">
                                        <img src="http://ib.huluim.com/assets/new-mastheads/bullseye_runaway_train_06-03-2015_mh.png?size=1600x600" class="keyart" alt="Bullseye - Runaway Train">
                                        <div class="gradient-overlay ad-root ">
                                            <div style="opacity: 0;" class="play-button smart-hover hidden" hover-action="idleAware"></div>
                                            <div style="left: 87px; display: none;" class="metadata top left">
                                                <div style="opacity: 1;" class="promotional-text">
                                                    <div class="shadow">Watch the All-New Episode</div>
                                                    <div class="origin">Watch the All-New Episode</div>
                                                </div>
                                                <div style="opacity: 1;" class="headline">
                                                    <div class="shadow">Bullseye</div>
                                                    <div class="origin">Bullseye</div>
                                                </div>
                                                <div style="opacity: 1;" class="title">
                                                    <div class="shadow">Runaway Train</div>
                                                    <div class="origin">Runaway Train</div>
                                                </div>
                                                <div style="opacity: 1;" class="description">
                                                    <div class="shadow">Share the adrenaline high as eight more contestants push their bodies and minds to the extreme.</div>
                                                    <div class="origin">Share the adrenaline high as eight more contestants push their bodies and minds to the extreme.</div>
                                                </div>
                                            </div>
                                            <a class="transparent-click-area beacon beacon-click" href="/watch/799011" click-event-type="sitetracking,masthead/click"></a>
                                            <div style="left: 87px; opacity: 1; display: none;" class="metadata bottom left"><span><a style="display: inline; opacity: 0;" class="add-to-queue-button save-button smart-hover hidden" hover-action="idleAware" href="javascript:void(0)"></a><a style="display: none; opacity: 0;" class="remove-from-queue-button remove-button smart-hover hidden" hover-action="idleAware" href="javascript:void(0)"></a></span></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ol class="flex-control-nav">
                                <li><a class="active">1</a></li>
                                <li><a class="">2</a></li>
                                <li><a class="">3</a></li>
                                <li><a class="">4</a></li>
                                <li><a class="">5</a></li>
                                <li><a class="">6</a></li>
                            </ol>
                        </div>
                        <div iframe-added="1" class="left-arrow-container smart-hover iframe-hacker-container" hover-action="spotlight" href="javascript:void(0)" style="z-index: 1">
                            <iframe style="height: 100%; width: 100%;" class="iframe-hacker"></iframe>
                            <a class="left-arrow smart-hover" hover-action="spotlight" href="javascript:void(0)">
                                <div style="opacity: 0;" class="arrow-icon smart-hover" hover-action="idleAware"></div>
                            </a>
                        </div>
                        <div iframe-added="1" class="right-arrow-container smart-hover iframe-hacker-container" hover-action="spotlight" href="javascript:void(0)" style="z-index: 1">
                            <iframe style="height: 100%; width: 100%;" class="iframe-hacker"></iframe>
                            <a class="right-arrow smart-hover" hover-action="spotlight" href="javascript:void(0)">
                                <div style="opacity: 0;" class="arrow-icon smart-hover" hover-action="idleAware"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; width: 1200px; margin: 0px auto">
                <div id="destination" class="type_content  destination_type cf">
                    <div class="type_nav">
                        <a href="/2014/list-place.html" target="_blank" title=""><i></i>
                            <h1>企业展示</h1>

                        </a>
                    </div>
                    <div class="type_scroll">
                        <div class="type-viewport">
                            <div style="max-width: 880px; margin: 0px auto;" class="bx-wrapper">
                                <div style="width: 100%; overflow: hidden; position: relative; height: 460px;" class="bx-viewport">
                                    <ul style="width: 915%; position: relative; transition-duration: 0s; transform: translate3d(0px, 0px, 0px);" class="type_list destination_list">
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/guoneilvyouchengshi.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M09/6B/C7/CghzflSqQluAaK3_AAB2yroAjKA293.jpg" alt="">
                                                <span>国内最佳旅游城市</span></a>
                                            <a href="/2014/place/haiwailvyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M03/6F/12/CghzgVSqQqaAdOWYAABPXZFQAYo045.jpg" alt="">
                                                <span>海外最佳旅游城市</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/guoneilvyoujingqu.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M09/6F/35/CghzgFSqQnqAeoXvAABaxI9K5pA847.jpg" alt="">
                                                <span>国内最佳旅游景区</span></a>
                                            <a href="/2014/place/shehuayou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M00/6F/6B/CghzgFSqQsqAK6ctAABXXf1KCPQ100.jpg" alt="">
                                                <span>最佳奢华游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/haidaoyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M05/6C/15/CghzfVSqQoyASrnuAABJF-ZUID0493.jpg" alt="">
                                                <span>最佳海岛游目的地</span></a>
                                            <a href="/2014/place/qinziyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M02/6F/61/CghzgFSqQraAMVbGAACH9O4Y4Mk672.jpg" alt="">
                                                <span>最佳亲子游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/balinghou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M09/6E/B3/Cghzf1SqQjaAf6Q8AACDIK2pcPs951.jpg" alt="">
                                                <span>80后最爱目的地</span></a>
                                            <a href="/2014/place/zizhuyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M05/6F/2C/Cghzf1SqQveAUymzAAB2UInP-Tk504.jpg" alt="">
                                                <span>最佳自助游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/daxuesheng.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M0A/6E/BA/Cghzf1SqQkCAbLJGAABzKWd-Xvs500.jpg" alt="">
                                                <span>大学生最爱目的地</span></a>
                                            <a href="/2014/place/changjialvxing.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M03/6F/71/CghzgFSqQtWAJ88vAACDemChKsQ561.jpg" alt="">
                                                <span>最佳长假旅行目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/zijiayou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M0B/6C/4C/CghzfVSqQuaAUFieAABzzi-H72k188.jpg" alt="">
                                                <span>最佳自驾游目的地</span></a>
                                            <a href="/2014/place/gouwu.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M07/6B/BD/CghzflSqQkyAcVqEAABkaPxRMCI662.jpg" alt="">
                                                <span>最佳购物目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/qianli.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M08/6F/2D/Cghzf1SqQwKAEsr3AACYlj7V1E0918.jpg" alt="">
                                                <span>最具潜力目的地</span></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="bx-controls"></div>
                            </div>

                        </div>
                        <div>
                            <span class="bxx-prev" id="destination_prev"><a class="bx-prev disabled" href=""></a></span><span class="bxx-next" id="destination_next">
                                <a class="bx-next" href=""></a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; width: 1200px; margin: 0px auto">
                <div id="destination" class="type_content  destination_type cf">
                    <div class="type_nav">
                        <a href="/2014/list-place.html" target="_blank" title=""><i></i>
                            <h1>今日最新</h1>

                        </a>
                    </div>
                    <div class="type_scroll">
                        <div class="type-viewport">
                            <div style="max-width: 880px; margin: 0px auto;" class="bx-wrapper">
                                <div style="width: 100%; overflow: hidden; position: relative; height: 460px;" class="bx-viewport">
                                    <ul style="width: 915%; position: relative; transition-duration: 0s; transform: translate3d(0px, 0px, 0px);" class="type_list destination_list">
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/guoneilvyouchengshi.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M09/6B/C7/CghzflSqQluAaK3_AAB2yroAjKA293.jpg" alt="">
                                                <span>国内最佳旅游城市</span></a>
                                            <a href="/2014/place/haiwailvyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M03/6F/12/CghzgVSqQqaAdOWYAABPXZFQAYo045.jpg" alt="">
                                                <span>海外最佳旅游城市</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/guoneilvyoujingqu.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M09/6F/35/CghzgFSqQnqAeoXvAABaxI9K5pA847.jpg" alt="">
                                                <span>国内最佳旅游景区</span></a>
                                            <a href="/2014/place/shehuayou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M00/6F/6B/CghzgFSqQsqAK6ctAABXXf1KCPQ100.jpg" alt="">
                                                <span>最佳奢华游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/haidaoyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M05/6C/15/CghzfVSqQoyASrnuAABJF-ZUID0493.jpg" alt="">
                                                <span>最佳海岛游目的地</span></a>
                                            <a href="/2014/place/qinziyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M02/6F/61/CghzgFSqQraAMVbGAACH9O4Y4Mk672.jpg" alt="">
                                                <span>最佳亲子游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/balinghou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M09/6E/B3/Cghzf1SqQjaAf6Q8AACDIK2pcPs951.jpg" alt="">
                                                <span>80后最爱目的地</span></a>
                                            <a href="/2014/place/zizhuyou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M05/6F/2C/Cghzf1SqQveAUymzAAB2UInP-Tk504.jpg" alt="">
                                                <span>最佳自助游目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/daxuesheng.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M0A/6E/BA/Cghzf1SqQkCAbLJGAABzKWd-Xvs500.jpg" alt="">
                                                <span>大学生最爱目的地</span></a>
                                            <a href="/2014/place/changjialvxing.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M03/6F/71/CghzgFSqQtWAJ88vAACDemChKsQ561.jpg" alt="">
                                                <span>最佳长假旅行目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/zijiayou.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M0B/6C/4C/CghzfVSqQuaAUFieAABzzi-H72k188.jpg" alt="">
                                                <span>最佳自驾游目的地</span></a>
                                            <a href="/2014/place/gouwu.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g1/M07/6B/BD/CghzflSqQkyAcVqEAABkaPxRMCI662.jpg" alt="">
                                                <span>最佳购物目的地</span></a>
                                        </li>
                                        <li style="float: left; list-style: none; position: relative; width: 280px; margin-right: 20px;">
                                            <a href="/2014/place/qianli.html" target="_blank">
                                                <img style="width: 280; height: 210;" src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M08/6F/2D/Cghzf1SqQwKAEsr3AACYlj7V1E0918.jpg" alt="">
                                                <span>最具潜力目的地</span></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="bx-controls"></div>
                            </div>

                        </div>
                        <div>
                            <span class="bxx-prev" id="destination_prev"><a class="bx-prev disabled" href=""></a></span><span class="bxx-next" id="destination_next">
                                <a class="bx-next" href=""></a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; width: 1200px; margin: 0px auto">
                <div class="mod buy">
                    <div class="mod-hd">
                        <h2 class="title">
                            <span class="current" idx="1">热门分类<i></i></span>
                        </h2>
                    </div>
                    <div class="mod-bd">
                        <div class="mod-bd-panel" idx="1" style="display: block;">
                            <div class="entrance">
                                <dl class="keyword-short">
                                    <dt>企业</dt>
                                    <dd><span class="entrance-item" title="日本"><a href="http://g.ctrip.com/merchant/list/3o078o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">日本</a><span class="icon_hot"></span></span><span class="entrance-item" title="法国"><a href="http://g.ctrip.com/merchant/list/2o031o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">法国</a></span><span class="entrance-item" title="韩国"><a href="http://g.ctrip.com/merchant/list/3o042o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">韩国</a><span class="icon_hot"></span></span><span class="entrance-item" title="香港"><a href="http://g.ctrip.com/merchant/list/3o0-1o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">香港</a></span><span class="entrance-item" title="美国"><a href="http://g.ctrip.com/merchant/list/1o066o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">美国</a></span><span class="entrance-item" title="新加坡"><a href="http://g.ctrip.com/merchant/list/3o003o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">新加坡</a></span><span class="entrance-item" title="英国"><a href="http://g.ctrip.com/merchant/list/2o109o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">英国</a></span><span class="entrance-item" title="德国"><a href="http://g.ctrip.com/merchant/list/2o028o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">德国</a></span><span class="entrance-item" title="意大利"><a href="http://g.ctrip.com/merchant/list/2o106o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">意大利</a></span><span class="entrance-item" title="西班牙"><a href="http://g.ctrip.com/merchant/list/2o095o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">西班牙</a></span><span class="entrance-item" title="瑞士"><a href="http://g.ctrip.com/merchant/list/2o080o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">瑞士</a></span><span class="entrance-item" title="澳大利亚"><a href="http://g.ctrip.com/merchant/list/3o015o99999o99999o99o999o99?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_txt_2" target="_blank">澳大利亚</a></span></dd>
                                </dl>
                            </div>

                            <div class="product">
                                <div class="product-hd">
                                    <ul class="inner-tabs-nav">
                                        <li class="active"><a href="javascript:void(0);" pinyin="QuanMinFangShuJia">全民放暑假</a></li>
                                        <li><a href="javascript:void(0);" pinyin="MianShuiDian">免税店</a></li>
                                        <li><a href="javascript:void(0);" pinyin="BaiHuo">百货</a></li>
                                        <li><a href="javascript:void(0);" pinyin="GouWuCun">购物村</a></li>
                                        <li><a href="javascript:void(0);" pinyin="JingPinDian">精品店</a></li>
                                    </ul>
                                    <a href="http://g.ctrip.com/#ctm_ref=ssc_hp_gw_sp_more_1" class="linked-more">更多全球名店 <i class="i_index_next"></i></a>
                                </div>
                                <div class="product-bd">
                                    <div class="inner-tab-panel active">
                                        <div class="product-item" title="DFS旗下T广场（香港广东道店）DFS T Galleria Hong Kong, Canton Road">
                                            <a href="http://g.ctrip.com/merchant/detail/140?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_pro_1" target="_blank">
                                                <p class="item-thumbnail">
                                                    <img src="http://youimg1.c-ctrip.com/target/tg/055/599/064/3f75ab8fcbab4629bb92db8ea6a43fa4.jpg" alt="DFS旗下T广场（香港广东道店）DFS T Galleria Hong Kong, Canton Road">
                                                </p>
                                                <p class="item-name">DFS旗下T广场（香港广东道店）DFS T Galleria Hong Kong, Canton Road</p>
                                                <p class="item-info"><span class="item-label"><span class="tag_orange_empty">返现</span></span><span class="item-type">中国 • 香港</span></p>
                                            </a>
                                        </div>
                                        <div class="product-item" title="老佛爷百货公司（奥斯曼旗舰店）Galeries Lafayette Haussmann">
                                            <a href="http://g.ctrip.com/merchant/detail/21?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_pro_1" target="_blank">
                                                <p class="item-thumbnail">
                                                    <img src="http://youimg1.c-ctrip.com/target/tg/602/105/289/228a16d1c4844dbebcae5d1b3c88db34.jpg" alt="老佛爷百货公司（奥斯曼旗舰店）Galeries Lafayette Haussmann">
                                                </p>
                                                <p class="item-name">老佛爷百货公司（奥斯曼旗舰店）Galeries Lafayette Haussmann</p>
                                                <p class="item-info"><span class="item-label"><span class="tag_red_empty">赠礼</span></span><span class="item-type">法国 • 巴黎</span></p>
                                            </a>
                                        </div>
                                        <div class="product-item" title="周大福（尖沙咀河内道店）Chow Tai Fook">
                                            <a href="http://g.ctrip.com/merchant/detail/607?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_pro_1" target="_blank">
                                                <p class="item-thumbnail">
                                                    <img src="http://youimg1.c-ctrip.com/target/fd/tg/g2/M09/01/D3/Cghzf1SrqjSAB15AAAEY4YiJ6Ss880.jpg" alt="周大福（尖沙咀河内道店）Chow Tai Fook">
                                                </p>
                                                <p class="item-name">周大福（尖沙咀河内道店）Chow Tai Fook</p>
                                                <p class="item-info"><span class="item-label"><span class="tag_orange_empty">返现</span></span><span class="item-type">中国 • 香港</span></p>
                                            </a>
                                        </div>
                                        <div class="product-item" title="Laox（银座总店）Laox">
                                            <a href="http://g.ctrip.com/merchant/detail/499?gsourcetype=3#ctm_ref=ssc_hp_gw_sp_pro_1" target="_blank">
                                                <p class="item-thumbnail">
                                                    <img src="http://youimg1.c-ctrip.com/target/tg/440/050/744/582b8dbec24b4b7fbcc67db60d4a3ebe.jpg" alt="Laox（银座总店）Laox">
                                                </p>
                                                <p class="item-name">Laox（银座总店）Laox</p>
                                                <p class="item-info"><span class="item-label"><span class="tag_blue_empty">优惠</span></span><span class="item-type">日本 • 东京</span></p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- procudt end -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of tiles -->
            <div class="login-zone">

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
                                <div>
                                    <a href="#" id="loginqq">QQ</a> | <a href="#" id="loginsina">Sina</a> | <a href="#" id="loginbaidu">Baidu</a>
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
            </div>
            <footer class="container">
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

        <div id="gs_feedback_gotop">
            <div class="side_fixed">
                <a class="to_top" title="回到顶端" href="javascript:;" id="gotop2" style="visibility: hidden; display: block;">&nbsp;</a>
            </div>
        </div>
        <div style="display: block;" class="appd_wrap_open" id="appd_wrap_open">
            <div style="left: 0%;" class="appd_wrap_open_cnt" id="appd_wrap_open_cnt"></div>
        </div>

        <div style="display: block;" class="appd_wrap_pop" id="appd_wrap_pop">
            <div style="left: -100%;" class="appd_wrap_pop_cnt" id="appd_wrap_pop_cnt">
                <div class="appd_wrap_pop_box">
                    <a href="javascript:;" class="appd_wrap_close" title="关闭" id="appd_wrap_close">×</a>
                    <div class="appd_wrap_pop_pic_phone pic_for_gift"></div>
                    <div class="appd_wrap_pop_text style_for_gift">
                        <p class="word_1">赶快来注册吧 </p>
                        <p class="word_3">
                            <a id="pcFloatGift" href="http://pages.ctrip.com/commerce/promote/201506/other/nl/index.html">
                                <img src="http://webresource.c-ctrip.com/ResUnionOnline/R3/float/pic/gift_float_btn.png" alt="" height="33" width="116"></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <script src="Scripts/jquery-1.8.2.min.js"></script>
        <script src="Scripts/jquery.bpopup.min.js"></script>
        <script src="Scripts/jquery.showLoading.js"></script>
        <script src="js/Baidu-Frontia-JS-1.0.0.js"></script>
        <script src="js/jquery/jquery.widget.min.js"></script>
        <script src="js/jquery/jquery.mousewheel.js"></script>
        <script src="js/prettify/prettify.js"></script>
        <script src="js/load-metro.js"></script>
        <script src="js/docs.js"></script>
        <script src="Scripts/navigation.js"></script>
        <script src="Scripts/register.js"></script>
        <script src="js/hitua.js"></script>
        <script src="Scripts/HomePage.js"></script>
        <script type="text/javascript">
            var sessionUser = '<%= Session["UserName"]%>';

            (function (frontia, Reg, Home, Nav, $, undefined) {
                // Nav.util.test_login();
                var sessionUser = '<%= Session["UserName"]%>';
                $('#loginqq').live('click', function (e) {
                    Nav.util.loginWithThirdParty(frontia);
                });

            })(baidu.frontia, window.Reg = window.Reg || {}, window.Home = window.Home || {}, window.Nav = window.Nav || {}, $, undefined);

            $(document).ready(function () {
                Home.Top.Init();

                $(function (frontia) {
                    Reg.Init();
                    Nav.Initiate(sessionUser);
                });
            });
        </script>
    </form>

</body>

</html>
