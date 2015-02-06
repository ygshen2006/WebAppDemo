/// <reference path="jquery.bpopup.min.js" />
/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="jquery.showLoading.js" />

(function (Reg, $, undefined) {
    Reg.Init = function () {
        $('.txt-detail-password').live('focus', function (e) {
            var str = '';
            str += "<img src='../Images/pwd-tip.png' class='tip'/>";
            $(this).parent().append(str);
        }).live('blur', function (e) {
            $('.tip').remove();
        });

        $('.txt-detail-password, .txt-detail').live('focus', function (e) {
            $(this).removeClass('focus-text').addClass('focus-text');
        }).live('blur', function () {
            $(this).removeClass('focus-text');
        });

        $('.change-verification-code').bind('click', function (e) {
            e.preventDefault();
            var that = $(this);
            var img = $(this).parent().find('.verification-code-img');
            $(img).removeAttr('src');
            var guid_str = new Date().getTime().toString();
            $(img).attr('src', '../Ajax/UserAjax.aspx?requestType=getimage' + guid_str);
        });

        $('.login_from, #login-link').live('click', function (e) {
            e.preventDefault();
            $('.login-zone').bPopup();
        });
        $('.form-control-username, .form-control-password').live('change', function (e) {
            $('.failed-msg')[0].innerText = "";
        });
        $('.btn-default-login').live('click', function (e) {
            e.preventDefault();
            var redirect = $(this).attr('redirect');
            var data = [];
            var temp = { UserName: $('.form-control-username').val(), Password: $('.form-control-password').val() };
            if (temp.UserName == '' || temp.Password == '')
            { return; }
            data.push(temp);
            Reg.Util.VerfiyLogin(data, $(this), function (result) {
                if (result != '' && result=='Succeed') {
                    // Succeed
                    $('.login-zone').bPopup().close();
                    // Locate to home page
                    window.location.href = redirect;
                }
                else {

                    $('.failed-msg')[0].innerText = "用户名密码错误";
                    $('.failed-msg').show();
                }
            });
        });

        $('.close-div').live('click', function (e) {
            e.preventDefault();
            $('.login-zone').bPopup().close();
        });
    };

    Reg.Util = new function () {
        this.GetUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';
            return url;
        };
        this.VerfiyLogin = function (paramData, loadingArea, callBack) {
            //Send ajax request to server to decide whether the user is valid
            var url = this.GetUrl() + "?requestType=validateUser";
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(paramData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
                    $('.btn-default-login').val('登陆中...');

                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {
                    if (callBack) {
                        callBack(result);
                    }
                },
                complete: function () {
                    loadingArea.hideLoading();
                    $('.btn-default-login').val('登陆');
                },
            });
        };
    };
})
    (window.Reg = window.Reg || {}, $, undefined);