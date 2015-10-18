<%@ Page ValidateRequest="false" Language="C#" AutoEventWireup="true" CodeBehind="ProfileEdit.aspx.cs" Inherits="WebApplication1.Personal.ProfileEdit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/iconFont.css" rel="stylesheet" />

    <link href="../css/metro-bootstrap.css" rel="stylesheet" />

    <link href="../Content/crooper/cropper.css" rel="stylesheet" />
    <link href="../Content/register.css" rel="stylesheet" />


    <style type="text/css">
        .btn-default-login {
        }

        .user-name-link {
            color: white;
        }

        .text-self {
            width: 482px;
            height: 138px;
            border: 1px solid;
            border-color: #d8d8d8 #e5e5e5 #e5e5e5 #d8d8d8;
            box-shadow: 2px 3px 3px #f6f8f9 inset;
            resize: none;
        }

        .bornDistrict {
            border: 1px solid;
            border-color: #d8d8d8 #e5e5e5 #e5e5e5 #d8d8d8;
            box-shadow: 2px 3px 3px #f6f8f9 inset;
            margin-left: 10px;
        }

        .table_intrest input {
            border: 1px solid;
            border-color: #d8d8d8 #e5e5e5 #e5e5e5 #d8d8d8;
            box-shadow: 2px 3px 3px #f6f8f9 inset;
            width: 400px;
        }

        .panel-content {
            padding-left: 0px;
        }

        dl {
            position: absolute;
            top: 20px;
            height: 80px;
            width: 80px;
            margin: 0 auto;
        }

        dt {
            height: 40px;
            margin: auto;
        }

        dd {
            height: 20px;
            margin: auto;
        }

        .wrapper {
            width: 1200px;
            margin: 0 auto;
        }

        .base-information td {
            padding: 10px 20px;
        }

        .img {
            zoom: 1;
            border: 0.5px thin;
            border-collapse: collapse;
        }

        .center-div {
            width: 860px;
            margin: 0 auto;
            margin-top: 10px;
        }

        .center-content {
            width: 1200px;
            margin: 0 auto;
        }

        .tab_box div {
        }

        .tab_box text {
            width: 300px;
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

        .suceed-div {
            display: none;
            height: auto;
            width: auto;
            position: fixed;
            opacity: 0.5;
        }

        .fail-div {
            display: none;
            height: auto;
            width: auto;
            position: fixed;
            opacity: 0.5;
        }

        .banner {
            width: 1200px;
            height: 200px;
        }

        .errorSpan {
            color: red;
        }
    </style>
    <link href="../Content/navgation.css" rel="stylesheet" />
    <link href="../Content/scrollPic.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" />

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
            <%--<input type="image" src="../Images/team-icon.jpg" style="opacity: 0.4; float: right; height: 100%" />--%>
            <ul class="raiders_in" id="linkPics" style="list-style: none outside none;">
                <li class="pic1">
                    <div class="image-content">

                        <img src="../Images/Intrests.jpg" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic2">
                    <div class="image-content">

                        <img src="../Images/team.png" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic3">
                    <div class="image-content">
                        <div class="text-category">
                        </div>
                        <img src="../Images/team.png" style="z-index: -1; opacity: 1;" />
                    </div>
                </li>
                <li class="pic4">
                    <div class="image-content">

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
        <div class="center-content">
            <form id="form1" runat="server">
                <asp:HiddenField ID="HiddenField1" runat="server" />

                <asp:HiddenField ID="HiddenField2" runat="server" />
                <table style="border: 1px #ccc solid; height: auto; width: 100%">

                    <tbody>

                        <tr>
                            <td style="position: relative; width: 20%; min-height: 500px">

                                <nav class="sidebar light" style="position: absolute; top: 0px;">
                                    <ul>
                                        <li class="active"><a href="#"><i class="icon-home"></i>个人资料</a>

                                            <%--  <ul class="dropdown-menu" data-role="dropdown">
                                                <li><a href="#">兴趣爱好</a></li>
                                            </ul>--%>
                                        </li>
                                        <li class="stick bg-red"><a href="#"><i class="icon-cog"></i>头像设置</a></li>
                                        <li class="stick bg-yellow"><a href="#"><i class="icon-pencil"></i>修改密码</a>
                                        </li>
                                        <li class="stick bg-green"><a href="#"><i class="icon-heart"></i>我的消息</a></li>

                                    </ul>
                                </nav>

                            </td>
                            <td style="width: 80%; min-height: 500px;">
                                <div class="tab_box" style="width: 100%; min-height: 500px; border-left: 1px #ccc solid;">
                                    <div>
                                        <div style="width: 860px; margin: 0 auto; margin-top: 10px; margin-left: 40px">
                                            <div id="userOldPhotoClass" style="margin-left: 400px;">
                                            </div>
                                            <div class="panel" data-role="panel">
                                                <div class="panel-header bg-darkBlue" style="font-family: 'Segoe UI'; font-size: 16px; color: white; font-weight: bold">
                                                    帐号信息：
                                                </div>

                                                <div class="panel-content" style="display: block; border: none">

                                                    <table class="table striped bordered hovered">
                                                        <tr>
                                                            <td>用户名:</td>
                                                            <td><span id="user_name_text"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>性别:</td>
                                                            <td>男<input type="radio" checked="checked" name="sex" />
                                                                <input name="sex" type="radio" style="margin-left: 30px" />
                                                                女
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <%--<div style="margin-top: 20px;">--%>


                                            <div class="panel" data-role="panel">
                                                <div id="show-more" class="panel-header bg-lightBlue" style="font-family: 'Segoe UI'; font-size: 16px; color: white; font-weight: bold">
                                                    完善其它信息
                                                </div>
                                                <div class="panel-content" style="display: none; border: none">

                                                    <div class="panel" data-role="panel">
                                                        <div id="show-basic" class="panel-header bg-green" style="font-family: 'Segoe UI'; font-size: 13px; height: 17px; color: white; font-weight: bold">
                                                            基本信息
                                                        </div>
                                                        <div class="panel-content" style="display: none; border: none">
                                                            <table class="table striped bordered hovered">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>生日:</td>
                                                                        <td>
                                                                            <input type="text" id="datepicker" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>血型</td>
                                                                        <td>
                                                                            <select id="bloodStyle">
                                                                                <option value="none">请选择</option>

                                                                                <option value="O型">O型</option>
                                                                                <option value="B型">B型</option>
                                                                                <option value="A型">A型</option>
                                                                                <option value="AB型">AB型</option>

                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>出生地：</td>
                                                                        <td>
                                                                            <select class="bornprovince">
                                                                                <option value="none">请选择</option>
                                                                                <%foreach (var i in p_c)
                                                                                  {
                                                                                %>
                                                                                <option value="<%= i.ProvinceName %>"><%= i.ProvinceName %></option>
                                                                                <%} %>
                                                                            </select><select style="margin-left: 10px" class="borncity"><option value="none">请选择</option>
                                                                            </select><select style="margin-left: 10px" class="bornDistrict"><option value="none">请选择</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>居住地：</td>
                                                                        <td>
                                                                            <select class="liveprovince" id="liveprovince">
                                                                                <option value="none">请选择</option>
                                                                                <%foreach (var i in p_c)
                                                                                  {
                                                                                %>
                                                                                <option value="<%= i.ProvinceName %>"><%= i.ProvinceName %></option>
                                                                                <%} %>
                                                                            </select><select style="margin-left: 10px" class="livecity" id="livecity"><option value="none">请选择</option>
                                                                            </select><select style="margin-left: 10px" class="liveDistrict"><option value="none">请选择</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>个人简碣：</td>
                                                                        <td>

                                                                            <textarea name="passport_userdetail" id="passport_userdetail" class="text-self"></textarea>
                                                                        </td>
                                                                    </tr>




                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div class="panel" data-role="panel">
                                                        <div class="panel-header bg-green" style="font-family: 'Segoe UI'; font-size: 13px; height: 17px; color: white; font-weight: bold">
                                                            兴趣爱好
                                                        </div>
                                                        <div class="panel-content" style="display: none; border: none">
                                                            <table class="table striped bordered hovered table_intrest">
                                                                <tbody>

                                                                    <tr>
                                                                        <td>喜欢的书籍</td>
                                                                        <td>
                                                                            <input id="fav_book" type="text" placeholder="比如《巴黎圣母院》、《鲁滨逊漂流记》等" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>喜欢的运动项目</td>
                                                                        <td>
                                                                            <input id="fav_sports" style="width: auto" type="text" placeholder="比如足球、篮球、上网等等" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>喜欢的电影</td>
                                                                        <td>
                                                                            <input id="fav_flim" type="text" placeholder="比如《蜘蛛侠2》、《肖申克的救赎》等" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>喜欢的音乐</td>
                                                                        <td>
                                                                            <input id="fav_music" type="text" placeholder="比如《老鼠爱大米》" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>喜欢的品牌</td>
                                                                        <td>
                                                                            <input id="fav_brand" type="text" placeholder="比如LV、七匹狼、华伦天奴等" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>欣赏的人</td>
                                                                        <td>
                                                                            <input id="fav_people" type="text" placeholder="比如成吉思汗、毛泽东等" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>其他的爱好</td>
                                                                        <td>
                                                                            <input id="other_fav" type="text" placeholder="比如成吉思汗、毛泽东等" /></td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div style="margin-left: 690px; margin-bottom: 20px; margin-top: 20px">
                                                            <input type="button" id="save-button" disabled="disabled" class="bg-gray"
                                                                style="background-color: #4490f7; background-clip: padding-box; width: 150px; height: 50px; color: white; font-size: 16px; font-weight: bold;" value="修改" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <%--</div>--%>
                                        </div>

                                    </div>

                                    <div style="display: none">
                                        <div style="position: relative; margin-left: 400px; margin-top: 10px; margin-bottom: 10px;">
                                            <div id="oldUserPhoto" style="">
                                            </div>
                                        </div>
                                        <table style="width: 100%; width: 850px; margin: 0 auto">
                                            <tr class="panel-header bg-darkBlue">
                                                <td></td>
                                                <td>
                                                    <p style="font-family: 'Segoe UI'; margin-top: 6px; font-size: 16px; color: white; font-weight: bold">新头像</p>
                                                </td>
                                                <td>
                                                    <p style="font-family: 'Segoe UI'; margin-top: 6px; font-size: 16px; color: white; font-weight: bold">预览</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 20%"></td>
                                                <td style="width: 60%">
                                                    <div style="position: relative">
                                                        <div style="position: absolute; top: -95px">
                                                            <div style="position: relative">
                                                                <input class="chooseImageBt" type="button" value="选择新头像" style="position: absolute; width: 100px; left: 0px; top: 0px" />
                                                                <input type="text" value="" id="imageSelect" style="position: absolute; width: 100px; left: 0px; top: 0px; opacity: 0" />

                                                                <input class="saveImage" type="button" value="确定" disabled="disabled" style="position: absolute; width: 100px; left: 150px; top: 0px;" />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style="width: 20%">
                                                    <div style="margin-top: 10px; position: relative">
                                                        <div style="float: left">
                                                            <div style="height: 200px; width: 200px; margin-right: 126px" class="img-preview"></div>
                                                        </div>
                                                        <div style="display: block; position: absolute; left: 220px" id="preview-id">
                                                            <div style="height: 60px; width: 60px" class="img-preview"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 20%"></td>
                                                <td style="width: 60%">
                                                    <div style="position: relative">
                                                        <div class="img-container" style="border: 1px groove; position: absolute; top: -150px; width: 400px; height: 300px">
                                                            <img style="width: 400px; width: 400px" src="" class="cropper" />
                                                        </div>
                                                    </div>

                                                </td>

                                                <td style="width: 20%"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="display: none">
                                        <div style="height: 500px; width: 700px; margin: 0 auto; margin-top: 30px;">
                                            <div>
                                                <p class="txt-desc">原密码:</p>
                                                <input id="oldPwd" type="password" required="required" class="txt-detail" /><span class="error_show" style="color: red; margin-left: 5px">*</span>
                                            </div>

                                            <div>
                                                <p class="txt-desc">新密码:</p>
                                                <input id="newPwd" type="password" required="required" class="txt-detail" /><span class="error_show" style="color: red; margin-left: 5px">*</span>
                                            </div>
                                            <div>
                                                <p class="txt-desc">确认密码:</p>
                                                <input id="confirmPwd" type="password" required="required" class="txt-detail" /><span class="error_show" style="color: red; margin-left: 5px">*</span>
                                            </div>
                                            <div>
                                                显示密码:
                                                <input type="checkbox" id="showPwd" />
                                            </div>
                                            <div>
                                                <input type="button" value="重置" class="btn-default" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: none">
                                        消息设置
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <div class="suceed-div">
                <img src="../Images/success.jpg" />
            </div>
            <div class="fail-div">
                <img src="../Images/fail.png" />
            </div>
        </div>

        <script src="../Scripts/jquery-1.8.2.min.js"></script>
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="../js/jqueryui/jquery.ui.datepicker-zh-TW.js"></script>
        <script src="../Scripts/jquery.showLoading.js"></script>
        <!--Metro script-->
        <script src="../js/load-metro.js"></script>
        <script src="../js/jquery/jquery.widget.min.js"></script>
        <script src="../js/jquery/jquery.easing.1.3.min.js"></script>
        <script src="../js/jquery/jquery.mousewheel.js"></script>
        <script src="../js/prettify/prettify.js"></script>
        <script src="../js/docs.js"></script>

        <script src="../Scripts/crooper/cropper.js"></script>
        <script src="../Scripts/navigation.js"></script>
        <script src="../Scripts/picture-scrolling.js"></script>
        <script src="../Scripts/profileedit.js"></script>
        <script src="../js/uploader/jquery.browse.js"></script>
        <script src="../js/uploader/jquery.upload.js"></script>
        <script type="text/javascript">
            var sessionUser = '<%= Session["UserName"]%>';

            var birthDay = "<%=birthDay%>";
            var bloodStyle = "<%=bloodStyle%>";
            var from_province = "<%=from_province%>";
            var from_city = "<%=from_city%>";
            var from_district = "<%=from_district%>";
            var live_province = "<%=live_province%>";
            var live_city = "<%=live_city%>";
            var live_district = "<%=live_district%>";
            var FavorateBook = "<%=FavorateBook%>";
            var FavorateBrands = "<%=FavorateBrands%>";
            var FavorateFilms = "<%=FavorateFilms%>";
            var FavorateMusic = "<%=FavorateMusic%>";
            var FavorateOthers = "<%=FavorateOthers%>";
            var FavoratePeople = "<%=FavoratePeople%>";
            var FavorateSports = "<%=FavorateSports%>";
            var PersonnalDescription = "<%=PersonnalDescription%>";

            (function (Nav, PS, Pro, $, undefined) {
                Pro.ValidatePassword = function () {
                    Pro.Validate();
                };

                Pro.InitalizeProvince = function () {

                    $('.bornprovince').live('change', function () {
                        // Get province list
                        var that = $(this).parent();
                        var bornCity = $('.borncity');
                        var bornDistrict = $('.bornDistrict');
                        Pro.util.LoadProvinceCity($(this).val(), bornCity, bornDistrict);
                    });

                    $('.borncity').live('change', function (result) {
                        var bornDistrict = $('.bornDistrict');
                        Pro.util.LoadCityDistrict($('.borncity').val(), bornDistrict);
                    });

                    $('.liveprovince').live('change', function () {
                        // Get province list
                        var bornCity = $('.livecity');
                        var bornDistrict = $('.liveDistrict');
                        Pro.util.LoadProvinceCity($(this).val(), bornCity, bornDistrict);
                    });

                    $('.livecity').live('change', function (result) {
                        var bornDistrict = $('.liveDistrict');
                        Pro.util.LoadCityDistrict($(this).val(), bornDistrict);
                    });
                };

            })(window.Nav = window.Nav || {}, window.PS = window.PS || {}, window.Pro = window.Pro || {}, $, undefined);

            $(function () {
                Pro.InitalizeProvince();
                $("#datepicker").datepicker({
                    maxDate: "+1M +10D",
                    option: $.datepicker.regional['zh-TW'],
                    showOn: "button",
                    buttonImage: "../Images/calendar.gif",
                    dateFormat: 'yy-mm-dd',
                    buttonImageOnly: true,
                    changeMonth: true,
                    changeYear: true
                }).show();

                $('#user_name_text').text($('#HiddenField1').val());
                Nav.Initiate(sessionUser);
                // Load the default image
                Pro.ValidatePassword();
                PS.Inite();
                Pro.GetUserDefaultImage();
                Pro.Inite();
                Pro.InitalizeUserData(true);
            });
        </script>

    </div>
</body>
</html>
