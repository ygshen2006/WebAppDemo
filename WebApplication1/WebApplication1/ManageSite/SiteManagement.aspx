<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SiteManagement.aspx.cs" Inherits="WebApplication1.ManageSite.SiteManagement" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <link href="../css/iconFont.css" rel="stylesheet" />
    <link href="../css/metro-bootstrap.css" rel="stylesheet" />

    <link href="../Content/sitemanagement.css" rel="stylesheet" />
    <link href="../Content/scrollPic.css" rel="stylesheet" />
    <link href="../Content/ui.dynatree.css" rel="stylesheet" />

    <style type="text/css">
        .user-name-link {
            color: white;
        }

        input[type="button"] {
            margin-left: 3px;
        }

        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        #linkPics li {
            
        }
    </style>
    <title>系统 - 后台管理</title>



</head>
<body class="metro">
    <div class="wrapper">
        
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
        <div>
             <input type="text" value="" id="imageSelect" style="display:none"/>
            <ul class="raiders_in" id="linkPics"  style="margin-left:-20px;">
                <li class="pic1" style="margin-left:-20px;">
                    <div class="image-content">
                        <div class="text-team">
                            <dl>
                                <dt class="team-desc-title">团队管理</dt>
                                <dd class="team-desc-description">团队管理介绍性文字</dd>
                            </dl>
                        </div>
                        <img src="../Images/Intrests.jpg" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic2" style="margin-left:-20px;">
                    <div class="image-content">
                        <div class="text-intrest">
                            <dl>
                                <dt class="team-desc-title">团队类型管理</dt>
                                <dd class="team-desc-description">团队类型管理介绍性文字</dd>
                            </dl>
                        </div>
                        <img src="../Images/team.png" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic3" style="margin-left:-20px;">
                    <div class="image-content">
                        <div class="text-category">
                            <dl>
                                <dt class="team-desc-title">文章类型管理</dt>
                                <dd class="team-desc-description">文章类型管理介绍性文字</dd>
                            </dl>
                        </div>
                        <img src="../Images/team.png" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic4" style="margin-left:-20px;">
                    <div class="image-content">
                        <div class="text-links">
                            <dl>
                                <dt class="team-desc-title">系统友情链接管理</dt>
                                <dd class="team-desc-description">系统友情链接管理介绍性文字</dd>
                            </dl>
                        </div>
                        <img src="../Images/team.png" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>


            </ul>

        </div>
        <div id="linkBtns" class="scroll_num">
            <a class="raiders_current" href="javascript:;">●</a>
            <a href="javascript:;" class="">●</a>
            <a href="javascript:;" class="">●</a>
            <a href="javascript:;" class="">●</a>
        </div>
        <div style="width: 100%; height: 100%;">
            <div class="leftbar">

                <nav id="nav-id" class="sidebar light"  style="width:100%">

                    <ul style="width:170px">
                        <li id="team" class="active"><a href="#"><i class="icon-home"></i>团队</a>

                        </li>
                        <li id="intrest" class="stick bg-red"><a href="#"><i class="icon-cog"></i>团队主题管理</a></li>
                        <li class="stick bg-yellow" id="category"><a href="#"><i class="icon-pencil"></i>文章主题管理</a>
                        </li>
                        <li class="stick bg-green" id="links"><a href="#"><i class="icon-heart"></i>系统连接管理</a></li>

                    </ul>
                </nav>


            </div>

            <div class="content">


                <div class="tab">
                    <div class="tab_box" style="float: left">
                        <div>

                            <div class="team-actions">
                                <ul>
                                    <li>
                                        <input type="button" class="add-team" value="添加" style="margin-left: 5px" /></li>
                                    <li>
                                        <input type="button" class="reset-team" value="重置" style="margin-left: 5px" disabled="disabled" /></li>
                                    <li>
                                        <input type="button" class="save-team" disabled="disabled" value="保存" style="margin-left: 5px" /></li>
                                </ul>
                            </div>
                            <table class="teamlist-table">
                                <thead class="table-head">
                                    <tr>
                                        <td>名称</td>
                                        <td>描述</td>
                                        <td>管理员</td>
                                        <td>Logo</td>
                                    </tr>
                                </thead>
                                <tbody class="teamlist-body">
                                </tbody>
                                <tfoot style="background-color: #E5CCCC;">
                                    <tr>
                                        <td colspan="9">
                                            <div style="color: black; font-weight: bold; width: 100%" class="mytfooter"><span>团队是组织单位，您可以在这里管理所有团队基本信息。包括：添加、删除等</span></div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <span class="error-msg">团队信息不完整，请补充完整！</span>
                        <div style="display: none">

                            <div style="width: 100%; margin:0 auto">
            <div class="actions">
                <input type="button" id="add-div" value="添加类型" style="display: none" />
                <input type="button" id="add-seg" value="添加分类型" style="display: none" />
                <input type="button" id="add-sub-seg" value="添加子类" style="display: none" />
                <input type="button" id="remove-item" value="删除" style="display: none" />
                <input type="button" id="save-changes" value="保存" style="display: none" />

            </div>
            <div style="width: 100%; margin: 0 20px">
                <div id="test">
                </div>
            </div>
            <div class="addDivisionDialog">
                <div style="margin: 20px;">
                    <span>类型名称:</span>
                    <input id="divisionName" type="text" style="width: 80px" />
                </div>

                <div class="actions-bar">
                    <input id="save-div-bt" type="button" value="保存" />
                    <input id="cancel-div-bt" type="button" value="取消" />
                </div>
            </div>

            <div class="addSegDialog">
                <div style="width: 600px; margin: 0 auto;">
                    <div style="margin: 20px;">
                        <span>子分类名称:</span>
                        <input id="segmentName" type="text" style="width: auto" />
                    </div>
                    <div style="margin: 20px">
                        <span>现有团队列表:</span>
                        <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                            <ul style="list-style: none" id="team-list">

                                <%--<li>
                                    <input type="checkbox" title="Team1" value="Team1" />TeamSite1</li>
                                <li>
                                    <input type="checkbox" title="Team1" value="Team2" />TeamSite2</li>
                                <li>
                                    <input type="checkbox" title="Team1" value="Team3" />TeamSite3</li>--%>
                            </ul>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <input id="save-seg-bt" type="button" value="保存" />
                        <input id="cancel-seg-bt" type="button" value="取消" />
                    </div>
                </div>
            </div>

            <div class="addSubSegDialog">
                <div style="margin: 20px;">
                    <span>子分类名称:</span>
                    <input id="subsegmentName" type="text" style="width: 80px" />
                </div>
                <div style="margin: 20px">
                    <span>团队列表:</span>
                    <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                        <ul style="list-style: none" id="subteam-list">
                        </ul>
                    </div>
                </div>
                <div class="actions-bar">
                    <input id="save-subseg-bt" type="button" value="保存" />
                    <input id="cancel-subseg-bt" type="button" value="取消" />
                </div>
            </div>

            <div class="EditSegDialog">
                <div style="width: 600px; margin: 0 auto;">
                    <div style="margin: 20px;">
                        <span>子分类名称:</span>
                        <input id="oldsegmentname" type="text" style="width: auto" /><span style="color: red; margin-left: 5px">*</span>
                    </div>
                    <div style="margin: 20px">
                        <span>团队列表:</span>
                        <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                            <ul style="list-style: none" id="existteam-list">
                            </ul>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <input id="existsave-seg-bt" type="button" value="保存" />
                        <input id="existcancel-seg-bt" type="button" value="取消" />
                    </div>
                </div>
            </div>

            <div class="editSubSegDialog">
                <div style="margin: 20px;">
                    <span>子分类名称:</span>
                    <input id="oldsubsegmentname" type="text" style="width: 80px" />
                </div>
                <div style="margin: 20px">
                    <span>团队列表:</span>
                    <div style="height: 200px; width: auto; overflow: scroll; z-index: -1000; border: solid 1px; margin-top: 5px;">
                        <ul style="list-style: none" id="existsubteam-list">
                        </ul>
                    </div>
                </div>
                <div class="actions-bar">
                    <input id="existsave-subseg-bt" type="button" value="保存" />
                    <input id="existcancel-subseg-bt" type="button" value="取消" />
                </div>
            </div>
        </div>
                          

                        </div>
                        <div style="width: 100%; display: none">
                            <div class="team-actions">
                                <ul>
                                    <li>
                                        <input type="button" class="add-root-catagory" value="Manage父类型" /></li>
                                    <li>
                                        <input type="button" class="add-child-catagory" value="添加子类型" /></li>
                                    <li>
                                        <input type="button" class="save-catagory" disabled="disabled" value="保存" /></li>
                                </ul>
                            </div>
                            <table class="teamlist-table">
                                <thead class="table-head">
                                    <tr>
                                        <td>父类型</td>
                                        <td>子类型</td>
                                        <td>操作</td>
                                    </tr>
                                </thead>
                                <tbody class="child-category-list">
                                </tbody>
                                <tfoot style="background-color: #E5CCCC;">
                                    <tr>
                                        <td colspan="9">
                                            <div style="color: black; font-weight: bold; width: 100%" class="mytfooter"><span>每篇文章都有它的主体，比如这是一片科技博文。在这里你可以管理你的文章主题</span></div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div style="width: 100%; display: none">
                            <div class="team-actions">
                                <ul>
                                    <li>
                                        <input type="button" class="add-root-link" value="管理父链接" /></li>
                                    <li>
                                        <input type="button" class="add-child-link" value="添加子链接" /></li>
                                    <li>
                                        <input type="button" class="save-link" disabled="disabled" value="保存" /></li>
                                </ul>
                            </div>
                            <table class="teamlist-table">
                                <thead class="table-head">
                                    <tr>
                                        <td>链接类型</td>
                                        <td>连接名</td>
                                        <td>链接地址</td>
                                        <td>操作</td>
                                    </tr>
                                </thead>
                                <tbody class="child-link-list">
                                </tbody>
                                <tfoot style="background-color: #E5CCCC;">
                                    <tr>
                                        <td colspan="9">
                                            <div style="color: black; font-weight: bold; width: 100%" class="mytfooter"><span>网站友情链接管理，如： Baidu，www.baidu.com</span></div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="manage-parent-category-div">
                <div class="category-actions">
                    <ul>
                        <li>
                            <input type="button" class="add-myroot-catagory" value="添加" /></li>
                        <li>
                            <input type="button" disabled="disabled" class="save-myroot-catagory" value="保存" /></li>
                        <li>
                            <input type="button" value="关闭" class="close-myroot-catagory" /></li>

                    </ul>
                </div>
                <table class="parent-category-list">
                    <thead>
                        <tr>
                            <td style="font-weight: bold">名字</td>
                            <td style="font-weight: bold">操作</td>
                        </tr>
                    </thead>
                    <tbody class="parent-catagory-list-body">
                        <tr></tr>

                    </tbody>
                </table>
                <div class="pCategory-msg">类型信息不完整</div>
            </div>

            <div class="manage-parent-link-div">
                <div class="category-actions">
                    <ul>
                        <li>
                            <input type="button" class="add-myroot-link" value="添加" /></li>
                        <li>
                            <input type="button" disabled="disabled" class="save-myroot-link" value="保存" /></li>
                        <li>
                            <input type="button" value="关闭" class="close-myroot-link" /></li>

                    </ul>
                </div>
                <table class="parent-link-list">
                    <thead>
                        <tr>
                            <td style="font-weight: bold">名字</td>
                            <td style="font-weight: bold">操作</td>
                        </tr>
                    </thead>
                    <tbody class="parent-link-list-body">
                        <tr>
                            
                        </tr>

                    </tbody>
                </table>
                <div class="pCategory-msg">类型信息不完整</div>
            </div>

        </div>

        <div class="suceed-div">
            <img src="../Images/success.jpg" />
        </div>
        <div class="fail-div">
            <img src="../Images/fail.png" />
        </div>
    </div>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../js/jqueryui/jquery-ui.custom.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>

    <script src="../Scripts/jquery.dynatree.js"></script>

    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/navigation.js"></script>
    <script src="../Scripts/siteadmin.js"></script>
    <script src="../Scripts/picture-scrolling.js"></script>

    <script src="../Scripts/navigation.js"></script>


    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script src="../js/uploader/jquery.upload.js"></script>
    <script type="text/javascript">
        var sessionUser = '<%= Session["UserName"]%>';

        (function (ST, PS, Nav, $, undefined) {

        })(window.ST = window.ST || {}, window.Nav = window.Nav || {}, window.PS = window.PS || {}, $, undefined);
        $(function () {
            // Load the team list in the detail panel below
            Nav.Initiate(sessionUser);

            ST.Initiate();
            PS.Inite();
            $('.selected').trigger('click');
        });
    </script>
</body>
</html>
