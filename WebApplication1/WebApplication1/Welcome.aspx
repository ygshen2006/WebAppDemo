<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Welcome.aspx.cs" Inherits="WebApplication1.Welcome" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Content/register.css" rel="stylesheet" />
    <link href="css/metro-bootstrap.css" rel="stylesheet" />
    <link href="css/iconFont.css" rel="stylesheet" />
    <link href="Content/home.css" rel="stylesheet" />


    <title></title>
    
</head>
<body class="metro">

    <form id="form1" runat="server">

        <header class="bg-dark" style="position: relative">
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
                                <li><a href="TeamSite/MyTeamSitesAdminPage.aspx">团队查找</a></li>
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
                                            <a id="register-link" class="user-name-link" href="../MyAccounts/Register.aspx?ReturnUrl=~/Welcome.aspx">注册</a>
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
                                        <img style="opacity: 1;" class="keyart" src="http://ib.huluim.com/assets/new-mastheads/spring-tv-mh-2048x768-v7-b-1.jpg?size=1600x600" alt="Hulu Plus">
                                        <div style="left: 87px; opacity: 1; display: block;" class="metadata left top">
                                            <img class="data smart-hover hidden" hover-action="hide" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                            <img style="" class="data smart-hover" hover-action="show" src="http://assets.huluim.com/new-mastheads/blank_transparency.png">
                                        </div>
                                        <a href="" class="transparent-click-area beacon beacon-click" click-event-type="sitetracking,masthead/click;plustracking,driverclick" beacon-attr-target="/signup?submit_btn=&amp;ob=1&amp;src=_loc_landing_b&amp;plus=1&amp;cmp=5740" beacon-attr-drivertype="masthead" beacon-attr-driverid1="Currents - MH" beacon-attr-driverid2="29910"></a>
                                    </div>
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="1">
                                    <div class="plus-promo-v2">
                                        <img class="keyart" src="http://ib.huluim.com/assets/new-mastheads/spring-tv-mh-2048x768-v7-b-2.jpg?size=1600x600" alt="Hulu Plus">
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
                                </li>
                                <li style="width: 100%; float: left; margin-right: -100%; display: none;" masthead-position="5">
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
                                <div style="opacity: 0;" class="arrow-icon smart-hover hidden" hover-action="idleAware"></div>
                            </a>
                        </div>
                        <div iframe-added="1" class="right-arrow-container smart-hover iframe-hacker-container" hover-action="spotlight" href="javascript:void(0)" style="z-index: 1">
                            <iframe style="height: 100%; width: 100%;" class="iframe-hacker"></iframe>
                            <a class="right-arrow smart-hover" hover-action="spotlight" href="javascript:void(0)">
                                <div style="opacity: 0;" class="arrow-icon smart-hover hidden" hover-action="idleAware"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; width: 90%" class="main-content clearfix container">
                <div class="tile-area no-padding clearfix">
                    <div class="tile-group no-margin no-padding clearfix" style="width: 100%">


                        <div class="tile quadro double-vertical ol-transparent" style="width: 40%">
                            <div class="tile-content">
                                <div class="carousel" data-role="carousel" data-height="100%" data-width="100%" data-controls="false">
                                    <div class="slide">
                                        <img src="Images/Homepage/1.jpg" />
                                    </div>
                                    <div class="slide">
                                        <img src="Images/Homepage/2.jpg" />
                                    </div>
                                    <div class="slide">
                                        <img src="Images/Homepage/3.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: block; float: left">
                            <div class="tile bg-lightBlue ol-transparent">
                                <div class="tile-content icon">
                                    <span class="icon-blogger" title="博客园"></span>
                                </div>
                            </div>
                            <div class="tile bg-orange ol-transparent">
                                <div class="tile-content icon">
                                    <span class="icon-share" title="我的看看"></span>
                                </div>
                            </div>
                        </div>
                        <div style="display: block; margin-top: 130px">

                            <div class="tile ol-transparent bg-teal">
                                <div class="tile-content icon">
                                    <span class="icon-user-3" title="随便看看"></span>
                                </div>
                            </div>
                            <div class="tile ol-transparent bg-green">
                                <div class="tile-content icon">
                                    <span class="icon-briefcase" title="管理中心"></span>
                                </div>
                            </div>
                        </div>
                        <%--<div class="tile triple double-vertical ol-transparent bg-white">
                            <div class="tile-content">
                                <div class="panel no-border">
                                    <div class="panel-header bg-darkRed fg-white">最新看看</div>
                                    <div class="panel-content fg-dark nlp nrp">
                                        <img src="Images/1.jpg" class="place-left margin10 nlm ntm size2" />
                                        <strong>美文共欣赏</strong> 我是一篇最近刚刚上线的美文，至于内容吗我想我还是先不写了吧。从网上copy一段：）新华网北京７月１５日电（记者王帆）在出席金砖国家领导人第六次会晤，对巴西、阿根廷、委内瑞拉
                               
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tile triple double-vertical ol-transparent bg-white">
                            <div class="tile-content">
                                <div class="panel no-border">
                                    <div class="panel-header bg-pink fg-white">最新团队</div>
                                    <div class="panel-content fg-dark nlp nrp">
                                        <img src="Images/2.jpg" class="place-left margin10 nlm ntm size2">
                                        <strong>集思广益团</strong>新华网北京７月１５日电（记者王帆）在出席金砖国家领导人第六次会晤，对巴西、阿根廷、委内瑞拉、古巴进行国事访问并出席中国－拉美和加勒比国家领导人会晤前夕，国家主席习近平接受了巴西《经济价值报》、阿根廷《国民报》、委内瑞拉国家通讯社、古巴拉丁美洲通讯社的联合采访，就金砖国家合作、中国同四国双边关系、中拉关系、国际关系民主化、中国改革发展、中国外交政策及国际作用等阐述了看法和主张。下面梳理习主席在接受采访时引用的那些经典词句。
                                    </div>
                                </div>
                            </div>
                        </div>--%>

                        <div style="margin-top: -150px; height: 270px; width: 398px; display: block; float: left">
                            <img style="height: 270px; width: 398px;" src="Images/Homepage/4.jpg" />
                        </div>
                    </div>
                    <!-- End first group -->



                    <div class="tile-group no-margin no-padding1 clearfix" style="width: 100%;">
                        <a href="#"><span class="tile-group-title fg-orange">团队风采 <span class="icon-arrow-right-5"></span></span></a>
                        <div class="tile quadro double-vertical ol-transparent" style="width: 274px; margin-left: -40px; height: 300px">
                            <ul id="teamZone" style="list-style: none; width: 274px; margin-top: -8px; border: solid 1px; border-radius: 2px; vertical-align: baseline">
                                <%for (var i = 0; i < 24; i++)
                                  {
                                      var color = (i % 2) == 0 ? "#b0c62a" : "#a4bc10";
                                %>

                                <li style="float: left; width: 75px; color: white; height: 60px; border: solid 1px; border-color: #96b718; background-color: <%: color %>"></li>

                                <%} %>
                            </ul>
                        </div>
                        <div class="tile double ol-transparent" style="width: 240px; height: 300px"></div>
                        <div style="width: 120px; float: left">
                            <div class="tile ol-transparent" style="width: 110px; height: 145px"></div>
                            <div class="tile ol-transparent" style="width: 110px; height: 145px"></div>

                        </div>
                        <div class="tile double ol-transparent" style="width: 200px; height: 300px"></div>
                        <div class="tile double ol-transparent" style="width: 150px; height: 300px"></div>

                        <div class="tile double ol-transparent" style="width: 160px; height: 300px"></div>

                        <%--
                        <div class="tile ol-transparent"></div>
                        <div class="tile ol-transparent"></div>
                        <div class="tile ol-transparent"></div>--%>
                    </div>

                    <div class="tile-group no-margin no-padding1 clearfix" style="width: 100%;">
                        <a href="#"><span class="tile-group-title fg-cobalt">最热文章 <span class="icon-arrow-right-5"></span></span></a>
                        <div class="tile quadro double-vertical ol-transparent" style="width: 274px; margin-left: -40px; height: 300px">
                            <ul style="list-style: none; width: 274px; margin-top: -8px; border: solid 1px; border-radius: 2px; vertical-align: baseline">
                                <%for (var i = 0; i < 24; i++)
                                  {
                                      var color = (i % 2) == 0 ? "#7e65ab" : "#846cb0";
                                %>

                                <li style="float: left; width: 81px; color: white; height: 62px; border: solid 1px; border-color: #795fa6; background-color: <%: color %>"></li>

                                <%} %>
                            </ul>
                        </div>
                        <div class="tile double ol-transparent" style="width: 240px; height: 300px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>
                        <div class="tile ol-transparent" style="width: 205px; height: 145px"></div>

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
        <script type="text/javascript">

            var sessionUser = '<%= Session["UserName"]%>';

            (function (frontia, Reg, Nav, $, undefined) {
                // Nav.util.test_login();

                $('#loginqq').live('click', function (e) {
                    Nav.util.loginWithThirdParty(frontia);
                });
            })(baidu.frontia, window.Reg = window.Reg || {}, window.Nav = window.Nav || {}, $, undefined);

            $(document).ready(function () {

                $(function (frontia) {
                    Reg.Init();



                    Nav.Initiate(sessionUser);
                });

                //$('#teamZone li:even').css('background-color', 'red').end().;
                //$('#teamZone li:odd').css('background-color', 'blak');
            });


        </script>
    </form>

</body>

</html>
