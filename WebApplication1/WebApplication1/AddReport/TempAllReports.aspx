<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TempAllReports.aspx.cs" Inherits="WebApplication1.AddReport.TempAllReports" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>

</head>
<body>
    <form id="form1" runat="server">
    <table id="td">
        <thead>
            <tr><td>标题</td><td>修改</td></tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    </form>

    <script type="text/javascript">
        (function (TEST, $, undefined) {
            TEST.f1 = new function () {
                this.loadAllReports = function () {
                    var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/AddNewReport';

                    $.ajax({
                        url: url + "?queryType=getteamallarticles&SiteGUID=" + teamId,
                        type: "POST",
                        dataType: "json",
                        timeout: 99000,
                        beforeSend: function () {
                           // loadingArea.showLoading();
                        },
                        error: function (xhr, status, error) {
                            alert('Error found any articles');
                            console.log(error);
                        },
                        success: function (result) {
                          
                        },
                        complete: function () {
                           // loadingArea.hideLoading();
                        },
                    });
                }
            }
        })(window.TEST = window.TEST || {}, $, undefined);


        $(document).ready(function () {
            TEST.f1.hello();
        });

    </script>
</body>
</html>
