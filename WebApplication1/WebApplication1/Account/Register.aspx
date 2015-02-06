<%@ Page Title="Register" Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="WebApplication1.Account.Register" %>

<%--<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">--%>
<html>

<head runat="server">
    <h2><%: Title %>.</h2>
    <p class="text-danger">
        <asp:Literal runat="server" ID="ErrorMessage" />
    </p>
</head>
<form runat="server">
    <div class="form-horizontal">
        <h4>Create a new account.</h4>
        <hr />
        <asp:validationsummary runat="server" cssclass="text-danger" />
        <div class="form-group">
            <asp:label runat="server" associatedcontrolid="UserName" cssclass="col-md-2 control-label">User name</asp:label>
            <div class="col-md-10">
                <asp:textbox runat="server" id="UserName" cssclass="form-control" />
                <asp:requiredfieldvalidator runat="server" controltovalidate="UserName"
                    cssclass="text-danger" errormessage="The user name field is required." />
            </div>
        </div>
        <div class="form-group">
            <asp:label runat="server" associatedcontrolid="Password" cssclass="col-md-2 control-label">Password</asp:label>
            <div class="col-md-10">
                <asp:textbox runat="server" id="Password" textmode="Password" cssclass="form-control" />
                <asp:requiredfieldvalidator runat="server" controltovalidate="Password"
                    cssclass="text-danger" errormessage="The password field is required." />
            </div>
        </div>
        <div class="form-group">
            <asp:label runat="server" associatedcontrolid="ConfirmPassword" cssclass="col-md-2 control-label">Confirm password</asp:label>
            <div class="col-md-10">
                <asp:textbox runat="server" id="ConfirmPassword" textmode="Password" cssclass="form-control" />
                <asp:requiredfieldvalidator runat="server" controltovalidate="ConfirmPassword"
                    cssclass="text-danger" display="Dynamic" errormessage="The confirm password field is required." />
                <asp:comparevalidator runat="server" controltocompare="Password" controltovalidate="ConfirmPassword"
                    cssclass="text-danger" display="Dynamic" errormessage="The password and confirmation password do not match." />
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <asp:button runat="server" onclick="CreateUser_Click" text="Register" cssclass="btn btn-default" />
            </div>
        </div>
    </div>
    <%--</asp:Content>--%>
</form>
</html>
