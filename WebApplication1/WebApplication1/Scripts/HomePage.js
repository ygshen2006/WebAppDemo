(function (Home,$, undefined) {
  
    // Top navigation zone
    Home.Top = new function () {
        this.Init = function () {

            // show or hide the next button
            $('#inner-wrap').live('mouseover', function (e) {
                $('.arrow-icon').css('opacity', '1').css('transition', 'opacity 250ms ease-out 0s');;
            }).live('mouseout', function (e) {
                $('.arrow-icon').css('opacity', '0').css('transition','opacity 250ms ease-out 0s');
            });

       
            //the number links click
            $('.flex-control-nav a').live('click', function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active');
                    $.each($(this).parent().siblings(), function (index, current) {
                        $(current).find('a').removeClass('active');
                    });
                }
            });


            // the previous
            $('.left-arrow').live('click', function (e) {
                e.preventDefault();

            });

            $('.right-arrow').live('click', function (e) {
                e.preventDefault();

            });
            
            // the auto scroll
            var currentsilde=0;
            
            var a = $(".flex-control-nav a"), b = $(".slides li"), f = 2, d, g = [], c = {
                init: function () {
                    for (var e = 0, k = a.length; e < k; e++)
                        (function () {
                            var b = e;
                            $(a[b]).bind("click", function () {
                                clearTimeout(d);
                                for (var a = 0, e = g.length; a < e; a++)
                                    clearInterval(g[a]), g[a] = null;
                                c.btnFocus(b);
                                c.picFocus(b);
                            })
                           

                        })(e); e = 0;

                },
                prveBtClick: function () {
                    $('.left-arrow').bind("click", function () {
                        clearTimeout(d);
                        for (var t = 0, e = g.length; t < e; t++)
                        { clearInterval(g[t]), g[t] = null; }
                        currentsilde--;
                        if (currentsilde < 0)
                        {
                            currentsilde = currentsilde + 6;
                        }
                        c.btnFocus(currentsilde % a.length);
                        c.picFocus(currentsilde % a.length);
                    });
                },
                nextBtClick: function () {
                    $('.right-arrow').bind("click", function () {
                        clearTimeout(d);
                        for (var t = 0, e = g.length; t < e; t++)
                        { clearInterval(g[t]), g[t] = null; }
                        c.btnFocus(++currentsilde % a.length);
                        c.picFocus(currentsilde % a.length);
                    });
                },
                btnFocus:
                    function (b) {
                        a.removeClass("active");
                        a[b].className = "active"
                    },
                picFocus:
                    function (a) {
                        //b[a].style.zIndex = f++;
                        //h.opacity(a, 0, 100)

                        $.each($(b[a]).parent().find('li').not($(b[a])), function (index, current) { $(current).hide(); });

                        $(b[a]).show();
                        currentsilde = a;
                        h.opacity(a, 0, 100)
                    },
                onmouseenter:
                    function (a, b) {
                        (document.all ? a.onmouseenter = function (a) { b() } : a.onmouseover = function (a) { (null == a.relatedTarget ? b() : !(this === a.relatedTarget || 20 == this.compareDocumentPosition(a.relatedTarget)) && b()) })
                    },
                onmouseout:
                    function (a, b) {
                        (document.all ? a.onmouseleave = b : a.onmouseout = function (a) {
                            (null ==
                            a.relatedTarget ? b() : !(this === a.relatedTarget || 20 == this.compareDocumentPosition(a.relatedTarget)) && b())
                        })
                    }
            }, h = {
                init: function (a) { d = setTimeout(function () { a = (3 === a ? 0 : a + 1); h.clearInte(); c.btnFocus(a); c.picFocus(a); d = setTimeout(arguments.callee, 1E4) }, 1E4) }, opacity: function (a, c, d) {
                    b[a].style.opacity = c / 100; b[a].style.filter = "alpha(opacity=" + c + ")"; g[a] = setInterval(function () {
                        (c >= d ? (b[a].style.opacity = d / 100, b[a].style.filter = "alpha(opacity=" + d + ")", clearInterval(g[a])) : (b[a].style.opacity = c / 100, b[a].style.filter =
                        "alpha(opacity=" + c + ")")); c += 5
                    }, 30)
                }, clearInte: function () { for (var a = 0, b = g.length; a < b; a++) clearInterval(g[a]), g[a] = null }, clearTime: function () { clearTimeout(d); d = null }
            };

            0 < $(".flex-control-nav").length && 0 < $(".slides").length && (c.init(), c.nextBtClick(), c.prveBtClick(), h.init(0));
        }

        

        // scroll to top 
        $('#gotop2').live('click', function (e) {
            $("html, body").animate({
                scrollTop: 0
            });
            // dispear the top 
            $(this).css('visibility', 'hidden');
        });
        window.onscroll = function () {
            var height = $(document).scrollTop();
            if (height > 0) {
                $('#gotop2').css('visibility', 'visible');
            }
            else {
                $('#gotop2').css('visibility', 'hidden');

            }
        }

        //  the news update
        $('#appd_wrap_open').live('mouseover', function (e) {
            $(this).animate({ left: "-100%" });
            
            $('#appd_wrap_pop_cnt').animate({ left: "0%" });
        });
        $('#appd_wrap_close').live('click', function (e) {
            $('#appd_wrap_pop_cnt').animate({ left: "-100%" });
            $('#appd_wrap_open').animate({ left: "0%" });
        });
    }


})(window.Home = window.Home || {}, $, undefined);
