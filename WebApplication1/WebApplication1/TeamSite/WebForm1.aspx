<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication1.TeamSite.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../Content/metro-icons.css" rel="stylesheet" />
    <link href="../Content/metro.css" rel="stylesheet" />
    <title></title>
    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/metro.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="tile-container">
                <div class="tile-wide" data-role="tile" data-effect="slideLeft">
                    <div class="tile-content">
                        <div class="live-slide">
                            <img src="../images/1.jpg" data-role="fitImage" data-format="fill">
                        </div>
                        <div class="live-slide">
                            <img src="../images/2.jpg" data-role="fitImage" data-format="fill">
                        </div>
                        <div class="live-slide">
                            <img src="../images/3.jpg" data-role="fitImage" data-format="fill">
                        </div>
                        <div class="live-slide">
                            <img src="../images/4.jpg" data-role="fitImage" data-format="fill">
                        </div>
                        <div class="live-slide">
                            <img src="../images/5.jpg" data-role="fitImage" data-format="fill">
                        </div>
                    </div>
                    <div class="tile-label">Gallery</div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
