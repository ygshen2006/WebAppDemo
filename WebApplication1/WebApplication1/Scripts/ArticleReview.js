(function (Article, $, undefined) {

    Article.LoadArticle =new function () { 
        var articleFeatureImages = [];
        var articlecontent = {};
        var otherArticles = [];
        var articleComments = [];

        this.getCurrentTeamGuid = function (index1) {
            var currentUrl = window.document.URL;

            var teamGuid = "";
            if (currentUrl != null) {
                teamGuid = currentUrl.split('?')[index1].split('=')[1];
            }
            else {
                console.error("current url is blank");
            }

            return teamGuid;

        }

        this.getarticle = function () {
            var articleid=$()
            var loadingArea = $('.wrapper');
            var requestType = "getarticlebyid";
            var postdata = { 'articleid': this.getCurrentTeamGuid(2), 'teamguid': this.getCurrentTeamGuid(1) };
            var callback = this.getArticleCallBack();
            Article.util.sendrequest(loadingArea, callback, requestType, postdata);
        };

        this.getArticleCallBack = function (result) {

        };

        this.showFeatureImages = function (images) { };
        this.showArticleContent = function (content) { };
        this.showOtherArticles = function (others) { };
        this.showComments = function (comments) { };
    }

    Article.util = new function () {
        this.getBaseUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/AddNewReport';
            return url;
        };
        this.sendrequest = function (loadingarea, callback, requesttype, postdata) {
            var url = this.getBaseUrl() + "?requestType=" + requesttype;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(postdata) },
                timeout: 99000,
                beforeSend: function () {
                    loadingarea.showLoading();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    if (callback) {
                        callback(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                },
            });
        };
    }


})(window.Article = window.Article || {}, $, undefined);
