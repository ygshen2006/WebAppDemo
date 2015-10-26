(function (TeamSite, $, undefined) {
    TeamSite.TeamSiteLoading = new function () {

        this.writeCurrentTeamGuidToHiddenField = function () {
            var currentGuid = this.getCurrentTeamGuid();
            if (currentGuid == "" || currentGuid == null) {
                alert('could not load current team site!');
                return;
            }

            $('#teamguidhidden').val(currentGuid);
        }


        this.getCurrentTeamGuid = function () {
            var currentUrl = window.document.URL;

            var teamGuid="";
            if (currentUrl != null) {
                teamGuid = currentUrl.split('?')[1].split('=')[1];
            }
            else {
                console.error("current url is blank");
            }

            return teamGuid;

        }

        this.Init = function () {
            $(".reply").live('mouseover', function (e) {
                $(".si-glyph-bubble-message-hi").css({ "-webkit-animation": "twinkling 1s infinite ease-in-out" });
            });

            $('.addReport').live('click', function (e) {
                window.open("../AddReport/AddNewReport.aspx?teamid=" + $('#teamguidhidden').val(),"_blank");
            });
        }
    }
    // 
}(window.TeamSite = window.TeamSite || {}, jQuery));
$(function () {
    TeamSite.TeamSiteLoading.writeCurrentTeamGuidToHiddenField();
    TeamSite.TeamSiteLoading.Init();
});