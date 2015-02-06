<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Welcome.aspx.cs" Inherits="WebApplication1.Welcome" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
       <link href="Content/register.css" rel="stylesheet" />
    <link href="css/metro-bootstrap.css" rel="stylesheet" />
    <link href="css/iconFont.css" rel="stylesheet" />
 
    
    
    <title></title>
    <style type="text/css">
        .container {
            width: 1040px;
        }
        .user-name-link {
            color:white;
        }
        body {
            height:100%;
            margin:0;
            padding:0;
        }
        
      
    </style>
</head>
<body class="metro">

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
        <div style="background: url(Images/Homepage/b1.jpg) top left no-repeat; background-size: cover; height: 300px;">
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

           <script src="Scripts/jquery-1.8.2.min.js"></script>
        <script src="Scripts/jquery.bpopup.min.js"></script>
        <script src="Scripts/jquery.showLoading.js"></script>
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

        (function (Reg, Nav, $, undefined) {
        })(window.Reg = window.Reg || {},window.Nav = window.Nav || {}, $, undefined);

        $(document).ready(function () {

            $(function () {
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
