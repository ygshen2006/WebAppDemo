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

    }
    // 
}(window.TeamSite = window.TeamSite || {}, jQuery));
$(function () {
    TeamSite.TeamSiteLoading.writeCurrentTeamGuidToHiddenField();
});