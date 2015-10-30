///<reference path="jquery-1.8.2.min.js" />
(function (PS, $, undefined) {

    PS.Inite = function () {

        var b = $("#linkPics>li"), f = 2, d, g = [], c = {
            init: function () {
                for (var e = 0, k = b.length; e < k; e++)
                    (function () {
                        var b = e;
                        $('.bxx-prev').bind("click", function () {
                            clearTimeout(d);
                            
                            c.picFocus(b);
                        })
                    })(e); e = 0;

            },
         
            picFocus:
                function (a) {
                    //b[a].style.zIndex = f++;
                    //h.opacity(a, 0, 100)
                    
                    $.each($(b[a]).parent().find('li').not($(b[a])), function (index, current) { $(current).hide(); });

                    $(b[a]).show();
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

        0 < $("#linkBtns").length && 0 < $("#linkPics").length && (c.init(), h.init(0));
    };


   
})(window.PS = window.PS || {}, $, undefined);