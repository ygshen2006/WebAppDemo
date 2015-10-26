<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TileTest.aspx.cs" Inherits="WebApplication1.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Content/newTab.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="test">
    
    </div>
    </form>

    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/tile/tile-grid.js"></script>
    <script src="Scripts/tile/tile-cell.js"></script>
    <script src="Scripts/tile/tile-site.js"></script>
    <script src="Scripts/tile/tile-drag.js"></script>
    <script src="Scripts/tile/tile-transform.js"></script>
    <script type="text/javascript">
        gGrid.init('test');
    </script>
</body>
</html>
