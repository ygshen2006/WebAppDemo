<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TagRelatedArticals.aspx.cs" Inherits="WebApplication1.AddReport.TagRelatedArticals" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <style type="text/css">
        .user-name-link {
            color: white;
        }

        #logo {
            position: absolute;
            top: 0;
            left: 40px;
            width: 146px;
            height: 40px;
            text-indent: -9999px;
            overflow: hidden;
            background: url(../Images/c_logo.png) no-repeat 50% 50% #02A3D8;
        }

        .nav-test li {
            padding: 8px 25px;
            border-left: 1px solid #3E444F;
            border-right: 1px solid #292E37;
        }

            .nav-test li:first-child {
                border-left: 0 none;
            }

            .nav-test li a {
                display: block !important;
                font-size: 16px !important;
                font-family: "Microsoft Yahei" !important;
                color: #FFF;
            }
    </style>

    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link href="../Content/scrollPic.css" rel="stylesheet" />
    <link href="../Content/navgation.css" rel="stylesheet" />
    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link href="../Content/home.css" rel="stylesheet" />
    <link href="../Content/tagsarticle.css" rel="stylesheet" />
    <title>相同标签的文章</title>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/jquery.pin.js"></script>
    <script src="../js/jquery/jquery.widget.min.js"></script>

    <script src="../Scripts/picture-scrolling.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../Scripts/navigation.js"></script>
    <script src="../Scripts/register.js"></script>

    <script src="../Scripts/tagsrelated.js"></script>
</head>
<body class="metro">
    <form id="Form1" runat="server">
        <div class="wrapper">
            <header class="bg-dark" style="position: relative">
                <div class="navigation-bar dark" style="width: 100%; height: 74px; margin: 0 auto">
                    <div class="navigation-bar-content container">
                        <a href="../Welcome.aspx" class="element" id="logo"></a>
                        <span class="element-divider"></span>
                        <a class="element1 pull-menu" href="#"></a>
                        <ul class="element-menu nav-test">

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
                        <div style="float: right;" id="welcomeT">
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

            <div class="inner-wrap">
                <div class="category-title">
                    <h2 class="tagname">
                        <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" class="si-glyph-tag">
                            <use xlink:href="../css/sprite.svg#si-glyph-tag" />
                        </svg>
                    </h2>
                </div>
                <div class="post-list">
                    <div class="news-list">
                        
                    </div>
                </div>
            </div>
        </div>
    </form>

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

       <script type="text/javascript">
           var sessionUser = '<%= Session["UserName"]%>';

           (function (PS, Reg, URP, Nav, tagrelate, $, undefined) {

           })(window.PS = window.PS || {}, window.Reg = window.Reg || {}, window.URP = window.URP || {}, window.Nav = window.Nav || {}, window.tagrelate = window.tagrelate || {}, $, undefined);

           $(document).ready(function () {
               PS.Inite();
               Reg.Init();
               Nav.Initiate(sessionUser);
               tagrelate.Init.getTagRelatedArticles();
           });

    </script>

</body>
</html>
