(function (Pro, $, undefined) {
    
    Pro.Validate = function () {
        $('.btn-default').live('click', function () {
            var oldPwd = $('#oldPwd').val();
            var newPwd = $('#newPwd').val();
            var confirmPwd = $('#confirmPwd').val();

            Pro.util.ValidatePasswordChange({o:oldPwd, n: newPwd, c: confirmPwd})
            if ($('body').find('span.errorSpan').length > 0)
            {
                return;
            }
            // Submit the changes

            var data = { UserName: $('#HiddenField1').val(), Password: $('#oldPwd').val(), NewPassword: $('#newPwd').val() };
            var collectionData = [];
            collectionData.push(data);
            Pro.util.ResetPassword(collectionData, $('body'), function (result) {
                alert(result);
            });
        });
    };
     Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
     Pro.InitalizeUserData = function (trigger) {
        $('#datepicker').val(birthDay);
        $('#bloodStyle').val(bloodStyle);
        $('.text-self').val(PersonnalDescription);

        $('.bornprovince').val(from_province);
        $('.bornprovince').trigger('change');

   

        $('.liveprovince').val(live_province);
        $('.liveprovince').trigger('change');


        $('#fav_book').val(FavorateBook);
        $('#fav_people').val(FavoratePeople);
        $('#fav_sports').val(FavorateSports);
        $('#fav_flim').val(FavorateFilms);
        $('#fav_music').val(FavorateMusic);
        $('#fav_brand').val(FavorateBrands);
        $('#other_fav').val(FavorateOthers);
    };

    Pro.Inite = function () {
        var input = $('#imageSelect').browseElement();
        $(input).change(function () {
            var file = $(input)[0].files['0'];

            Pro.util.UploadImage(file, $('.center-content'), function (result) {
                $('.cropper').cropper("setImgSrc", result);
            });
            $(".cropper").cropper({
                aspectRatio: 16 / 16,
                preview: ".img-preview",
                done: function (data) {
                }
            });

            $('.saveImage').removeAttr('disabled');
        });
        var div_li = $('nav ul li');
        $('input').live('change', function () {
            $('#save-button').removeAttr('disabled');
        })
        $('select').live('change', function () {
            $('#save-button').removeAttr('disabled');
        })
        $('textarea').live('change', function () {
            $('#save-button').removeAttr('disabled');
        })
        $('nav ul li').live('click', function (e) {
            $(this).addClass('active');
            $.each($(this).siblings(), function (index, current) {
                $(current).removeClass('active');
            });
            var index = div_li.index(this);
            var d = $('div.tab_box > div').eq(index);
            $('div.tab_box > div').eq(index).show().siblings().hide();
        });

        $('nav ul li a').live('click', function (e) {
            e.preventDefault();
        });

        //var options = [{ 'aspectRatio': 'auto' }, { 'preview': '.img-preview' }];
        //$(".cropper").cropper(options);   `

        //$('.chooseImageBt').live('click', function (e) {
        //    $('#filechoose').click();
        //});

        //$('#filechoose').live('change', function (e) {

        //    var file = $('#filechoose').prop('files');
        //    var imagePath = $('#filechoose').val();
        //    var imageData = { PicturePath: imagePath, PictureSize: file[0].size, FileName: file[0].name };
        //    Pro.util.UploadImage(imageData, $('.center-content'), function (result) {
        //        $('.cropper').cropper("setImgSrc", result.FilePath);
        //    });
        //    $(".cropper").cropper({
        //        aspectRatio: 16 / 16,
        //        preview: ".img-preview",
        //        done: function (data) {
        //        }
        //    });

        //    $('.saveImage').removeAttr('disabled');
        //});

        $('.saveImage').live('click', function (e) {
            // save the image photo area to server
            var imageInformation = $('#preview-id')[0].innerHTML;
            var userName = $('#HiddenField1').val();
            var data = { UserName: userName, UserPhoto: Pro.util.HTMLEncode(imageInformation) };
            var arrayData = [];
            arrayData.push(data);
            Pro.util.ChangeUserPhoto(arrayData, $('.center-content'), function (result) {
                if (result == true) {
                    Pro.util.showSuccessHints();
                    // Update the zone where the orginal user photo is like
                    $('#oldUserPhoto').html('');
                    $('#oldUserPhoto').html($('#preview-id')[0].innerHTML);
                    $('#oldUserPhoto div').removeClass('img-preview');
                }
                else
                    Pro.util.showErrorHints();
            });
        });
        $('#show-more').live('click', function () {
            $('.borncity').val(from_city);
            $('.borncity').trigger('change');

            $('.livecity').val(live_city);
            $('.livecity').trigger('change');
        });
        $('#show-basic').live('click', function () {
            $('.bornDistrict').val(from_district);
            $('.liveDistrict').val(live_district);
        });
        $('#showPwd').live('change', function () {
            if (this.checked) {

                var Old_Pwd_Text = " <input id='oldPwd' type='text' required='required' value='" + $('#oldPwd').val() + "' class='txt-detail'/>";
                var New_Pwd_Text = " <input id='newPwd' type='text' required='required' value='" + $('#newPwd').val() + "' class='txt-detail'/>";
                var New_Confirm_Text = " <input id='confirmPwd' type='text' value='" + $('#confirmPwd').val() + "' required='required' class='txt-detail'/>";

                var p = $('#oldPwd').parent().find('.error_show');
                $('#oldPwd').parent().find(':password').remove();
                $(Old_Pwd_Text).insertBefore($(p));

                var p = $('#newPwd').parent().find('.error_show');
                $('#newPwd').parent().find(':password').remove();
                $(New_Pwd_Text).insertBefore($(p));


                var p = $('#confirmPwd').parent().find('.error_show');
                $('#confirmPwd').parent().find(':password').remove();
                $(New_Confirm_Text).insertBefore($(p));
            }
            else {
                var Old_Pwd_Text = " <input id='oldPwd' type='password' required='required' value='" + $('#oldPwd').val() + "' class='txt-detail'/>";
                var New_Pwd_Text = " <input id='newPwd' type='password' required='required' value='" + $('#newPwd').val() + "' class='txt-detail'/>";
                var New_Confirm_Text = " <input id='confirmPwd' type='password' value='" + $('#confirmPwd').val() + "' required='required' class='txt-detail'/>";

                var p = $('#oldPwd').parent().find('.error_show');
                $('#oldPwd').parent().find(':text').remove();
                $(Old_Pwd_Text).insertBefore($(p));

                var p = $('#newPwd').parent().find('.error_show');
                $('#newPwd').parent().find(':text').remove();
                $(New_Pwd_Text).insertBefore($(p));


                var p = $('#confirmPwd').parent().find('.error_show');
                $('#confirmPwd').parent().find(':text').remove();
                $(New_Confirm_Text).insertBefore($(p));
            }
        })

        $('#save-button').live('click', function () {
            var informationData = {
                UserId: $('#HiddenField2').val(),
                BirthDay: $('#datepicker').val(),
                BloodStyle:$('#bloodStyle').val(),
                PersonnalDescription:$('.text-self').val(),
                From: { Province: $('.bornprovince').val(), City:$('.borncity').val(), District: $('.bornDistrict').val() },
                LiveIn: {
                    Province: $('.liveprovince').val(),
                    City: $('.livecity').val(),
                    District: $('.liveDistrict').val()
                },
                
                Favorates: {
                    FavorateBook: $('#fav_book').val(),
                    FavoratePeople:$('#fav_people').val(),
                    FavorateSports: $('#fav_sports').val(),
                    FavorateFilms: $('#fav_flim').val(),
                    FavorateMusic: $('#fav_music').val(),
                    FavorateBrands: $('#fav_brand').val(),
                    FavorateOthers: $('#other_fav').val()},
            };
            Pro.util.SaveUserInformation(informationData, $('#HiddenField1').val(), function (result) {
                if (result != null) {
                    Pro.util.showSuccessHints();
                }
                else
                    Pro.util.showErrorHints();
            });
        });
    };
    Pro.GetUserDefaultImage = function () {
        var userName = $('#HiddenField1').val();
        var data = [];
        data.push({ UserName: userName });

        Pro.util.GetUserInformationWithLoginName(data, $('body'), function (result) {
            if (result != null)
            {
                if (result.UserPhoto == null) {
                    var oldPicture='';
                    // No user photo
                    if (result.Sex == true) {
                        oldPicture += "<img src='../Images/men.png' />";
                    }
                    else {
                        oldPicture += '<img src="../Images/women.png" />';
                    }

                    $('#oldUserPhoto').append(oldPicture);
                    $('#userOldPhotoClass').append(oldPicture);

                }
                else {
                    $('#oldUserPhoto').append(Pro.util.HTMLDecode(result.UserPhoto));
                    $('#oldUserPhoto div').removeClass('img-preview');

                    $('#userOldPhotoClass').append(Pro.util.HTMLDecode(result.UserPhoto));
                }
            }
        });
    };
    Pro.util = new function () {
        this.GetBaseUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/FrontAjax';
            return url;
        };

        this.GetUserUrl = function () {
            var url = "http://" + window.location.hostname + ':' + window.location.port + '/Ajax/UserAjax';
            return url;
        };
        this.UploadImage = function (pictureData, loadingArea, callBack) {
            var baseUrl = this.GetBaseUrl();
            var url = baseUrl + "?queryType=addPicture";
            $.upload(url, pictureData, callBack);
        };
        this.ChangeUserPhoto = function (pictureData, loadingArea, callBack) {
            var baseUrl = this.GetUserUrl();
            $.ajax({
                url: baseUrl + "?requestType=changephoto",
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(pictureData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
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
                },
            });
        }
        this.ResetPassword = function (userData, loadingArea, callBack)
        {
            var baseUrl = this.GetUserUrl();
            $.ajax({
                url: baseUrl + "?requestType=resetpassword",
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(userData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
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
                },
            });
        }
        this.GetUserInformationWithLoginName = function (userData, loadingArea, callBack) {
            var baseUrl = this.GetUserUrl();
            $.ajax({
                url: baseUrl + "?requestType=getloginuser",
                type: "POST",
                dataType: "json",
                data: { queryParam: JSON.stringify(userData) },
                timeout: 99000,
                beforeSend: function () {
                    loadingArea.showLoading();
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
                },
            });
        }

        this.showSuccessHints = function () {
            $('.suceed-div').css({
                left: '50%',
                top: '50%'
            }).fadeIn('slow').fadeOut('slow');
        };
        this.showErrorHints = function () {
            $('.fail-div').css({
                left: '50%',
                top: '50%'
            }).fadeIn('slow').fadeOut('slow');
        };

        this.ValidatePasswordChange = function (data) {
            $.each($('body').find('span.errorSpan'), function (index, current) { $(current).remove(); });
            var emptyError = "<span class='errorSpan'>密码不允许为空</span>";
            try {
                var i = 0;
                if (data.o.trim() == '') { Pro.util.AddError($('#oldPwd'), emptyError); i++; }
                if (data.n.trim() == '') { Pro.util.AddError($('#newPwd'), emptyError); i++; }
                if (data.c.trim() == '') { Pro.util.AddError($('#confirmPwd'), emptyError); i++; }
                if (i != 0)
                {
                    throw 'Error';
                }
            }
            catch(erro){
                return;
            }


            var lenghtError = "<span class='errorSpan'>密码长度至少为6位</span>";
            try {
                var j = 0;
                if (data.o.length < 6) { Pro.util.AddError($('#oldPwd'), lenghtError); j++;}
                if (data.n.length < 6) { Pro.util.AddError($('#newPwd'), lenghtError); j++;}
                if (data.c.length < 6) {Pro.util.AddError($('#confirmPwd'), lenghtError); j++;}
                if (j != 0) {
                    throw 'Error';
                }
            }
            catch (error) {
                return;
            }
            var notSameError = "<span class='errorSpan'>密码不匹配</span>";
            try {
                if (data.n.toLowerCase() != data.c.toLowerCase()) {
                    Pro.util.AddError($('#confirmPwd'), notSameError);
                    throw 'Error';
                }
            }
            catch (error) {
                return;
            }
        };
        this.LoadCityDistrict = function (city,district) {
            Pro.util.GetProvinceCityDistrict("getcitydistrict", encodeURI(city), function (result) {
                if (result != null && result.length>0) {
                    $(district).children().remove();

                    var str = "";
                    $.each(result[0].Stricts, function (index, current) {
                        str += "<option value='" + current + "'>" + current + "</option>";
                    });
                    
                    $(district).append(str);
                }
            });
        };
        this.LoadProvinceCity = function (province, city,district) {
            Pro.util.GetProvinceCityDistrict("getcitydistrict", encodeURI(province), function (result) {
                var that = $(this);
                if (result != null && result.length > 0) {

                    $(city).children().remove();

                    var str = "";
                    $.each(result, function (index, current) {
                        str += "<option value='" + current.CityName + "'>" + current.CityName + "</option>";
                    });
                    $(city).append(str);
                }
                $(city).trigger('change');
            });
        }
        this.GetProvinceCityDistrict = function (getType, provinceName, callBack)
        {
            var baseUrl = this.GetUserUrl();
            $.ajax({
                url: baseUrl + "?requestType=" + getType + "&provinceName=" + provinceName,
                type: "POST",
                dataType: "json",
                timeout: 99000,
                error: function (xhr, status, error) {
                    console.log(error);
                },
                success: function (result) {

                    if (callBack) {
                        callBack(result);
                    }
                },
            });
        }

        this.SaveUserInformation = function (userInformation, userId, callBack)
        {
            var baseUrl = this.GetUserUrl();
            $.ajax({
                url: baseUrl + "?requestType=saveuserinformation&uid=" + userId,
                dataType: "json",
                type: "POST",
                //dataType: "json",
                timeout: 99000,
                data: { queryParam: JSON.stringify(userInformation) },
                error: function (xhr, status, error) {
                    console.log(error);
                    alert(error);
                },
                success: function (result) {
                    if (callBack) {
                        callBack(result);
                    }
                },
            });
        }
        
        this.AddError = function (control,message) {
            $(control).parent().append(message);
        };

     this.HTMLEncode = function(html) {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        }
        this.HTMLDecode=function(text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
    };

})(window.Pro = window.Pro || {}, $, undefined);