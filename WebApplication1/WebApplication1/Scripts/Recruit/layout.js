(function (layout, $, undefined) {
    layout.Init = function () {
        // User name init
        LoadUsers($('.nav-user-photo'), 0, function (result) {
            
        });


        // Add new position 
        //$('.new-position').live('click',function (e) {

        //    e.preventDefault();
        //    $('#addNewPosition').bPopup().show();

        //});
        $(".popover-options #buttonSelJobType").popover({ html: true });

        $('#buttonSelJobType').attr('data-content', $('#addNewPosition').html());

        $('.cancle-saving').live('click',function (e) {
            e.preventDefault();
            $('#buttonSelJobType').popover('hide');
        });
    }



    this.LoadUsers = function (loadingArea, value, callBack) {
        var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';

        $.ajax({
            url: url + "?requestType=getuserbyid",
            type: "POST",
            dataType: "json",
            timeout: 99000,
            beforeSend: function () {
                loadingArea.showLoading();
            },
            error: function (xhr, status, error) {
                alert('Error found any teams');
                console.log(error);
            },
            success: function (result) {
                if (callBack) {
                    callBack(result);
                }
            },
            complete: function () {
                loadingArea.hideLoading();
            },
        });
    };

}(window.layout = window.layout || {}, $, undefined));