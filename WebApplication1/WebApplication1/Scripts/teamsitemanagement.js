(function (URP, $, undefined) {
    URP.teamSiteAdmin = new function () {
        this.TeamInfo = {
        }

        this.ArticleManagement = {

        }
        this.TeamTagManagement = {
        }


        this.Initial = function () {
            // Switch between tabs 
            var div_li = $("#managelist li");

            $('#managelist li').live('click', function (e) {
                e.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');

                var currentSelected = $(div_li).index($(this));
           
                $('.tab_box > div').eq(currentSelected).removeClass('hide')
                    .siblings().addClass('hide');
            });



        }

        this.getBaseUrl = function () {
            var baseUrl = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/TeamSiteAdminAjax';
        }
    }

}(window.URP = window.URP || {}, jQuery));

$(function () { URP.teamSiteAdmin.Initial(); });