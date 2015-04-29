/// <reference path="navigation.js" />
(function (Nav, $, undefined) {
    Nav.Initiate = function (sessionUser) {
        Nav.util.initialNavigationBar(sessionUser);

        $('#logoff').live('click', function (e) {
            e.preventDefault();
            Nav.util.LogOff();
            window.location = "../Welcome.aspx";
        });
    };
    Nav.util = new function () {
        this.initialNavigationBar = function (sessionUser) {
            var str = '';
            str += "<li style='float:left; margin-left:5px' >";

            str += "<a class='dropdown-toggle'><img src='../Images/admin-gear.png' style='height:20px; width:20px'></img></a>";

            str += "<ul class='dropdown-menu place-left dark' data-role='dropdown' data-show='hover'>";
            // Determin whether current user is a team admin

            // Team admin ?
            if (sessionUser != "" && sessionUser!=undefined) {
                    //If this user is a team admin?
                var userName = sessionUser;

                    Nav.util.VerifyUserHasTeam(userName, function (result) {
                        if (result != null && result.length > 0) {
                            // If current page is team site page

                            if (document.URL.contains("MyTeamSitePage")) {
                                str += "<li>"
                            + "<a href='../TeamSite/TeamManagement.aspx' class='manage-team'>团队管理</a></li>";
                                str += "<li><a href='../TeamSite/TeamDashboard.aspx' class='manage-team'>团队Dashboard</a></li>";
                            }
                        }
                    });
            }


            if (1 == 1) {
                
                str += "<li><a href='../ManageSite/SiteManagement.aspx' class='manage-site'>超级管理员</a></li>";
            }
            if ($('#login-link').length == 0) {
                // a user has login
                str += "<li><a href='../Personal/MyCenter.aspx' id='mycenter' class='manage-site'>个人中心</a></li>";
                str += "<li><a href='#' id='logoff' class='manage-site'>注销</a></li>";
            }
            str += "</ul></li>";
            $(str).insertAfter($('.welcome'));
        };
        this.VerifyUserHasTeam = function (parameter, callBack) {
            var url = Nav.util.GetUrl();
            url += "?requestType=getteamsforuser&userName="+parameter;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                async: false,
                timeout: 99000,
                beforeSend: function () {
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    if (callBack != null)
                        callBack(result);
                },
                complete: function () {
                },
            });
        }
        this.GetUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';
            return url;
        };
        this.LogOff = function () {
            var url = Nav.util.GetUrl();
            url += "?requestType=logoff";
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                async: false,

                timeout: 99000,
                beforeSend: function () {
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                },
                complete: function () {
                },
            });
        };

        this.deleteAllCookies=function() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
    };


    
})(window.Nav = window.Nav || {}, $, undefined);