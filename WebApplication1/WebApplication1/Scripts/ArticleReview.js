(function (Article, $, undefined) {

    Article.LoadArticle =new function () { 
        var articleFeatureImages = [];
        var articlecontent = {};
        var otherArticles = [];
        var articleComments = [];
        $('.other').live('click', function (e) {
            $('#teamguidhidden').val(Article.util.getCurrentTeamGuid(1));
                window.open("../AddReport/PostDetail.aspx?teamsiteid=" + $('#teamguidhidden').val() + "?postid=" + $(this).attr('tag'), "_self");
        });
      
        $('.taglink').live('click', function (e) {
            // Get all the articals related to the current tag

        });
        this.getarticle = function () {
            var loadingArea = $('.wrapper');
            var requestType = "getarticlebyid";
            var postdata = { 'articleid': Article.util.getCurrentTeamGuid(2), 'teamguid': Article.util.getCurrentTeamGuid(1) };
            Article.util.sendrequest(loadingArea, function (result) {
                if (result != null) {
                    getThisArticleCallBack(result.ThisReport);

                    getOtherArticlesCallBack(result.OtherReports);

                    showFeatureImages(result.ReportFeaturePics);
                }
            }, requestType, postdata);
        };

        

        getThisArticleCallBack: function getThisArticleCallBack(thisArticle) {
            if (thisArticle != null) {
                $('.post-con').html(Article.util.HTMLDecode(thisArticle.ReprotContent));
                var str = "";
                $.each(thisArticle.ReportTags, function (index, current) {
                    str += "<a class='taglink' href='../AddReport/TagRelatedArticals.aspx?tagid="+current.Id+"?teamid="+Article.util.getCurrentTeamGuid(1)+"'>" + current.Title + "</a>";
                });
                // load the tags:
                $('.post-tags').append(str);
            }
        }

        getOtherArticlesCallBack: function getOtherArticlesCallBack(others) {
            if (others != null) {
                var str = "<ul class='otherarticles'>";
                $.each(others, function (index, current) {
                    str += "<li><a class='other' tag=" + current.ID + " href='#'>" + current.ReportName + "</a></li>";
                });
                str += "</ul>";

                $('.single-right').append(str);
            }
        }

        showFeatureImages: function showFeatureImages(images) {
            if (images != null) {
                $.each(images, function (index, current) {

                });
            }
        };
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
                    loadingarea.hideLoading();
                },
            });
        };
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
        this.HTMLEncode = function (html) {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        }
        this.HTMLDecode = function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
    }


})(window.Article = window.Article || {}, $, undefined);
