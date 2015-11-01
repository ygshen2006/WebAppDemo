<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="WebApplication1.MyAccounts.Register" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/jquery.showLoading.js"></script>
    <script src="../Scripts/jquery.bpopup.min.js"></script>
    <script src="../Scripts/register.js"></script>
    <link href="../Content/register.css" rel="stylesheet" />
    <title>新用户注册</title>
</head>
<body>
    <div class="wrapper">

        <div class="head">
            <div class="logo-head">
                <a></a>
            </div>
            <span style="padding-left: 1000px">已经有帐号了点这里：<a href="Login.aspx" class="login_from">登陆</a></span>

        </div>
        <div class="nav">
            <div class="nav-2">
                <div class="mod-nav clearfix">
                    <h1 class="page-type-notab"></h1>
                </div>
            </div>
        </div>
        <div class="content-reg">

            <form id="form1" runat="server">
                <asp:Panel ID="registerPanel" DefaultButton="registerBt" runat="Server">
                    <p class="text-danger">
                        <asp:Literal runat="server" ID="ErrorMessage" />
                    </p>
                    <div>
                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="UserName" CssClass="txt-desc">用户名:</asp:Label>
                            <div class="">
                                <asp:TextBox runat="server" ID="UserName" CssClass="txt-detail" />
                                <asp:RequiredFieldValidator ValidationGroup="one" runat="server" ControlToValidate="UserName"
                                    CssClass="text-danger" Text="*" ErrorMessage="帐号是身份的唯一标志，不能为空." />
                            </div>
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="Password" CssClass="txt-desc">密码:</asp:Label>
                            <div class="">
                                <asp:TextBox runat="server" ID="Password" TextMode="Password" CssClass="txt-detail-password" />
                                <asp:RequiredFieldValidator ValidationGroup="one" runat="server" ControlToValidate="Password"
                                    CssClass="text-danger" Text="*" ErrorMessage="密码不能为空." />
                            </div>
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="ConfirmPassword" CssClass="txt-desc">确认密码:</asp:Label>
                            <div class="">
                                <asp:TextBox runat="server" ID="ConfirmPassword" TextMode="Password" CssClass="txt-detail" />
                                <asp:RequiredFieldValidator ValidationGroup="one" runat="server" ControlToValidate="ConfirmPassword"
                                    CssClass="text-danger" Display="Dynamic" ErrorMessage="确认密码不能为空." Text="*" />
                                <asp:CompareValidator ValidationGroup="one" runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"
                                    CssClass="text-danger" Display="Dynamic" ErrorMessage="密码不一致." />
                            </div>
                        </div>

                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="EmialText" CssClass="txt-desc">邮箱地址:</asp:Label>
                            <div class="">
                                <asp:TextBox runat="server" ID="EmialText" TextMode="Email" CssClass="txt-detail" />
                                <asp:RequiredFieldValidator ValidationGroup="one" runat="server" ControlToValidate="EmialText"
                                    CssClass="text-danger" Display="Dynamic" ErrorMessage="邮箱不能为空." Text="*" />
                            </div>
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="" CssClass="txt-desc">性别:</asp:Label>

                            <asp:RadioButton Checked="true" ID="RadioButton1" GroupName="sex_group" runat="server" Text="男" />
                            <asp:RadioButton ID="RadioButton2" GroupName="sex_group" runat="server" Text="女" />
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" AssociatedControlID="" CssClass="txt-desc">验证码:</asp:Label>
                            <asp:TextBox ID="verficationcode" runat="server" CssClass="txt-detail-verifycode"></asp:TextBox>
                            <asp:RequiredFieldValidator ValidationGroup="one" CssClass="text-danger" ID="verificationcoderequire" runat="server" Text="*" ErrorMessage="验证码不能为空" ControlToValidate="verficationcode"></asp:RequiredFieldValidator>
                            <asp:Literal runat="server" ID="Literal2" />

                            <div>
                                <img src="../Ajax/UserAjax.aspx?requestType=getimage" class="verification-code-img" />
                                <a class="change-verification-code" href="#">看不清？</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-10">
                                <asp:Button runat="server" ValidationGroup="one" ID="registerBt" OnClick="CreateUser_Click" Text="注册" CssClass="btn-default" />
                            </div>
                        </div>

                        <div>
                            <asp:ValidationSummary ValidationGroup="one" runat="server" CssClass="text-danger" DisplayMode="BulletList" ShowSummary="true" />
                        </div>
                    </div>
                </asp:Panel>
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
                                        <asp:Button ValidationGroup="two" runat="server" ID="btLogin_Text" Text="登陆" redirect="../Welcome.aspx"  CssClass="btn-default-login" />
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
            </form>


        </div>
    </div>
    <script type="text/javascript">
        (function (Reg, $, undefined) {

        })(window.Reg = window.Reg || {}, $, undefined);

        $(function () {
            Reg.Init();
        });
    </script>

</body>
</html>
