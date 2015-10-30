<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="WebApplication1.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Content/register.css" rel="stylesheet" />
    <link href="css/metro-bootstrap.css" rel="stylesheet" />
    <link href="css/iconFont.css" rel="stylesheet" />
    <link href="Content/home.css" rel="stylesheet" />
    <style type="text/css">
           #logo {
        position: absolute;
    top: 0;
    left: 40px;
    width: 110px;
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

    <title>首页</title>

</head>
<body class="metro">

    <form id="form1" runat="server">
    <div>
    <input type="button" class="HelloNotify" value="HelloNotify" />
    </div>
        <link href="css/metro-bootstrap.css" rel="stylesheet" />
        <script src="Scripts/jquery-1.8.2.min.js"></script>
        <script src="Scripts/jquery.bpopup.min.js"></script>
        <script src="Scripts/jquery.showLoading.js"></script>
        <script src="js/Baidu-Frontia-JS-1.0.0.js"></script>
        <script src="js/jquery/jquery.widget.min.js"></script>
        <script src="js/jquery/jquery.mousewheel.js"></script>
        <script src="js/prettify/prettify.js"></script>
        <script src="js/load-metro.js"></script>

        <script type="text/javascript">
            $(function () {
                $('.HelloNotify').live('click', function (ex) {
                    setTimeout(function () {
                        $.Notify({ keepOpen: true, type: 'default', caption: 'Keep open', content: "This notify in keep-open mode" });
                    }, 10*1000);
                    setTimeout(function () {
                        $.Notify({ type: 'alert', caption: 'Alert', content: "Metro UI CSS is Simple!!!" });
                    }, 1000);
                    setTimeout(function () {
                        $.Notify({ type: 'success', caption: 'Success', content: "Metro UI CSS is Sufficient!!!" });
                    }, 2000);
                    setTimeout(function () {
                        $.Notify({ type: 'warning', caption: 'Warning', content: "Metro UI CSS is Responsive!!!" });
                    }, 3000);
                    setTimeout(function () {
                        $.Notify({ type: 'info', caption: 'Info', content: "Metro UI CSS is Responsive!!!" });
                    }, 4000);
                    setTimeout(function () {
                        $.Notify({ caption: 'Default', content: "Default style for notify" });
                    }, 5000);
                    setTimeout(function () {
                        $.Notify({ caption: 'Icon', content: "Notify with icon", icon: "<span class='mif-vpn-publ'></span>" });
                    }, 6000);
                });
            });
        </script>
    </form>
</body>
</html>
