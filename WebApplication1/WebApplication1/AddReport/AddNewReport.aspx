<%@ Page ValidateRequest="false" Language="C#" AutoEventWireup="true" CodeBehind="AddNewReport.aspx.cs" Inherits="WebApplication1.AddReport.AddNewReport" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <style type="text/css">
        .user-name-link {
            color: white;
        }

        .articleClass {
            width: 600px;
            margin: 0px 30px;
        }



        ul {
            list-style: none;
        }
    </style>

    <link href="../css/metro-bootstrap.css" rel="stylesheet" />
    <link rel="stylesheet" href="../Content/AddNewReport.css" />
    <link href="../Content/wangEditor-1.3.css" rel="stylesheet" />

    <title>提交新的文章</title>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
<script src="../js/uploader/jquery.upload.js"></script>
    <script src="../js/uploader/jquery.browse.js"></script>
    <script type="text/javascript" src="../Scripts/scriptHome.js"></script>
    <script src="../Scripts/navigation.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/masonry.pkgd.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../js/jquery/jquery.widget.min.js"></script>
    <script src="../js/jquery/jquery.mousewheel.js"></script>
    <script src="../js/prettify/prettify.js"></script>
    <script src="../js/load-metro.js"></script>
    <script src="../js/docs.js"></script>

</head>
<body class="metro">
    <form runat="server">
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
            <div class="content">



                <ul id="report-list">
                    <li>
                        <ul style="width: 600px; height: 30px" id="artcle-information-board">
                            <li class="a"><b>标题:</b></li>
                            <li class="a">
                                <input type="text" class="article-title-text" placeholder="标题..." tabindex="0"/>
                                <label style="color: red; margin-left: 10px;" class="hide">* 标题不能为空</label>
                            </li>

                                 <li class="a"><b>简介:</b></li>
                            <li class="a">
                                <textarea class="article-description-text" placeholder="文章简介..."></textarea>
                                <label style="color: red; margin-left: 10px;" class="hide">* 简介不能为空</label>
                            </li>

                            <li class="a"><b>类型</b></li>
                            <li class="a" style="position: relative">
                                <div class="articleTypeDiv" tabindex="1"></div>
                                <label style="color: red;" class="hide">* 文章类型不能为空</label>
                                <ul class="articleTypeDiv-sub collapse">
                                </ul>
                            </li>
                            <li class="a"><b>所属团队 :</b></li>
                            <li class="a" style="position: relative">
                                <div class="articleTeamDiv" tabindex="2"></div>
                                <label style="color: red;" class="hide">* 所属团队不能为空</label>
                                <ul class="articleTeamDiv-sub collapse"></ul>
                            </li>

                            <li class="a"><b>标签：</b></li>
                            <li class="a" style="position: relative">
                                <div class="articleTagDiv" tabindex="3"></div>
                                <label style="color: red;" class="hide">* 标签不能为空</label>
                                <ul class="articleTagDiv-sub collapse"></ul>
                            </li>

                            <li class="a"><b>状态:</b></li>
                            <li class="a" style="position: relative">
                                <div class="articleStatusDiv" tabindex="4"></div>
                                <label style="color: red;" class="hide">* 状态不能为空</label>
                                <ul class="articleStatusDiv-sub collapse">
                                </ul>
                            </li>

                            <li class="a"><b>拥有者:</b></li>

                          
                            <li class="a" style="position: relative">
                                <ul class="ownerarea">
                                    <li>
                                        <input type="text" class="owners-list" placeholder="请输入用户名..." tabindex="4"/><label style="color: red;" class="hide">* 拥有者不能为空</label></li>

                                    <li>
                                        <ul class="ui-search-filter-opts">

                                        </ul>
                                    </li>
                                </ul>
                                <ul class="articleOwnerDiv-sub collapse"></ul>
                            </li>
                           
                                <li style="width:1200px; margin: 0 auto; margin-top:40px;">
                                <div class="head">
                                    <textarea id="editor1" name="editor1" tabindex="5"
                                        style="width: 200px; height: 420px"></textarea>
                                    <label style="color: red;" class="hide">* 文章内容不能为空</label>
                                
                                    <p class="edit-tag-btns" style="float:right;margin-top:30px;"><a id="submitarticle" href="#" class="__saveTagBtn save-tag-btn sc-btn" type="submit"><span>保存</span></a><a href="#" class="__cancelBtn cancel-btn sc-btn" type="submit"><span>取消</span></a></p>
                                </div>
                            </li>

                        </ul>
                    </li>


                </ul>


                      <div class="pictureShowDiv">
                        <ul class="pict-show-in-body">
                             <li><b>上传特色图片</b></li>
                               <li>
                        <a class="addPic">
<svg xmlns="http://www.w3.org/2000/svg" class="si-glyph-camera" style="padding-top:10px; height:40px; width:40px"><use xlink:href="../css/sprite.svg#si-glyph-camera" /></svg>
                        </a>
                    </li>
                        
                        </ul>
                    </div>
                <input type="hidden" id="currentSelectedTeam" />
            </div>



            <div class="selectPictureWin" style="display: none">
                            <div class="tab">
                                <div class="tab_menu">
                                    <ul>
                                        <li class="selected">本地上传</li>
                                        <li>空间上传</li>
                                    </ul>
                                </div>
                                <div class="tab_box">
                                    <input type="text" value="" style="display: none" id="loadFileBt" />

                                    <div class="selected">
                                        <div class="secondAddPicBt">
                                            <input type="image" src="../Images/add2.png" id="addNewPict" />
                                            <ul class="pict-items">
                                            </ul>
                                        </div>
                                        <div class="cleanZone">
                                            <input type="image" src="../Images/add-pic.png" class="addPicBt" />
                                            <div class="pic-desc">
                                                最多64张图片，JPG/JPEG/BMP/PNG，最大15M，GIF最大3M
                               
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hide">空间图片</div>

                                </div>
                                <div class="actionArea">
                                    <input class="okBt actionbt" type="submit" value="确定" />
                                    <input class="resetBt actionbt" type="reset" value="取消" />
                                </div>
                            </div>
                        </div>
        </div>
    </form>
    <script src="../js/wangEditor-1.3.js"></script>
    <script src="../Scripts/uploadimage.js"></script>
    <script type="text/javascript">
        (function (Upload, Reg, URP, Nav, $, undefined) {

        })(window.Reg = window.Reg || {}, window.Upload = window.Upload || {}, window.URP = window.URP || {}, window.Nav = window.Nav || {}, $, undefined);

        $(document).ready(function () {

            $('.article-title-text').focus();

            $('#editor1').wangEditor({
                'uploadUrl': '../Utility/data.ashx'
            });

            Nav.Initiate();
            URP.AddReport.initiate();
            Upload.Init();

            $('#test1').live('click', function (e) {
                var t = CKEDITOR.instances.editor1.getData();
                // above output will be some html tags. in order to save into db. we need to decode
                var t1 = HTMLEncode(t);

                // save this value into database by sending json request

            });
        });


        this.HTMLEncode = function (html) {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        }
        this.HTMLDecode = function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }




    </script>
</body>
</html>
