/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
function printStackTrace(a) {
    a = a || {
        guess: !0
    };
    var b = a.e || null, c = !!a.guess, d = new printStackTrace.implementation, e = d.run(b);
    return c ? d.guessAnonymousFunctions(e) : e;
}

function PinnedSite() {
    function f(a, b, c, d, e) {
        var f = window.location.protocol + "//" + window.location.host;
        this.Id = a, this.Icon = f + "/assets/partners/ie9/" + b, this.ToolTip = I18n.t("partners.ie9." + c), this.Url = d, this.Method = e;
    }
    function g() {
        this.History = new f("msHistory", "history.ico", "history", "/account/history"), this.Movies = new f("msMovies", "movies.ico", "movies", "/movies"), this.MovieTrailers = new f("msMovieTrailers", "movie-trailers.ico", "movie_trailers", "/movies/trailers"), this.Documentaries = new f("msDocumentaries", "documentary.ico", "documentaries", "/movies/documentaries"), this.Popular = new f("msPopular", "popular.ico", "popular", "/popular"), this.Queue = new f("msQueue", "queue.ico", "queue", "/account/queue"), this.RecentlyAdded = new f("msRecentlyAdded", "recently-added.ico", "recently_added", "/recent"), this.Favorites = new f("msFavorites", "subscriptions.ico", "favorites", "/favorites"), this.Friends = new f("msFriends", "friends.ico", "friends", "/profile/friends/main"), this.TV = new f("msTV", "tv.ico", "tv", "/tv"), this.FreePlus = new f("msFreePlus", "hulu-plus.ico", "free_plus", "/"), this.AdvancedSearch = new f("msAdvancedSearch", "search.ico", "advanced_search", "/"), this.Playlists = new f("msPlaylists", "collections.ico", "playlists", "/");
    }
    function h() {
        e = !0;
        var b = Cookies.getCookieByKey(a), f = 0;
        document.attachEvent("onmssitemodejumplistitemremoved", k);
        if (b) {
            try {
                d = JSON.parse(b);
            } catch (g) { }
            typeof d == "undefined" && (d = {});
            for (var h in d) {
                f++;
                break;
            }
        }
        f ? (c.DeleteJumpListItem(c.SiteActions.FreePlus), c.DeleteJumpListItem(c.SiteActions.AdvancedSearch), c.DeleteJumpListItem(c.SiteActions.Playlists)) : (c.AddJumpListItem(c.SiteActions.History), c.AddJumpListItem(c.SiteActions.Queue), c.AddJumpListItem(c.SiteActions.Movies), c.AddJumpListItem(c.SiteActions.TV)), i();
    }
    function i() {
        window.external.msSiteModeClearJumplist(), window.external.msSiteModeCreateJumplist(b);
        for (var a in d) {
            var c = d[a];
            try {
                window.external.msSiteModeAddJumpListItem(c.ToolTip, c.Url, c.Icon);
            } catch (e) { }
        }
        j(), window.external.msSiteModeShowJumplist();
    }
    function j() {
        Cookies.setCookieByKey(a, JSON.stringify(d));
    }
    function k(a) {
        for (var b in d) {
            var c = d[b];
            c.value.Url.endsWith(a) && (delete d[c.value.Id], j());
        }
    }
    var a = "HULU_IE_JUMPLIST", b = I18n.t("partners.ie9.menu_name"), c = this, d = {}, e = !1;
    this.SiteActions = new g, this.SetupGA = function () {
        if (!this.isIE9() || !this.isWindows7()) return;
        !this.isSitePinned();
    }, this.Initialize = function () {
        if (!this.isIE9() || !this.isWindows7()) return;
        this.isSitePinned() && h();
        var a = window.location.pathname;
        /\/profile\/taskbar/.test(a) && this.TaskbarPageLoad();
    }, this.isWindows7 = function () {
        return $.client.os == "Windows" && $.client.osVersion >= 6.1;
    }, this.isIE9 = function () {
        return $.client.msie && parseInt($.client.version, 10) > 8;
    }, this.isSitePinned = function () {
        try {
            if (window.external.msIsSiteMode()) return !0;
        } catch (a) { }
        return !1;
    }, this.TaskbarPageLoad = function () {
        if (e) {
            $("pin-option").hide(), $("customize-option").show();
            for (var a in d) {
                var b = d[a];
                $(b.value.Id).checked = !0;
            }
            var f = document.getElementsByName("site-jump-list");
            for (var g = 0; g < f.length; g++) f[g].onclick = function () {
                c.ToggleJumpListItem(c.SiteActions[this.value]);
            };
        } else $("customize-option").hide(), $("pin-option").show();
    }, this.ToggleJumpListItem = function (a) {
        if ($(a.Id).checked) d[a.Id] = a; else try {
            delete d[a.Id];
        } catch (b) { }
        i();
    }, this.DeleteJumpList = function () {
        window.external.msSiteModeClearJumplist(), d = {};
    }, this.DeleteJumpListItem = function (a) {
        try {
            delete d[a.Id];
        } catch (b) { }
    }, this.AddJumpListItem = function (a) {
        d[a.Id] = a;
    };
}

(function (a, b) {
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b;
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d;
                } catch (g) { }
                f.data(a, c, d);
            } else d = b;
        }
        return d;
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1;
        }
        return !0;
    }
    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
        }, 0);
    }
    function J() {
        return !1;
    }
    function K() {
        return !0;
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c;
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1;
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d);
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c;
        });
    }
    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    function ib(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function jb(a, b) {
        if (b.nodeType !== 1 || !f.hasData(a)) return;
        var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
        if (i) {
            delete h.handle, h.events = {};
            for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c, i[c][d]);
        }
        h.data && (h.data = f.extend({}, h.data));
    }
    function kb(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached");
    }
    function lb(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function mb(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
    }
    function nb(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? mb(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), mb);
    }
    function ob(a) {
        var b = c.createElement("div");
        return hb.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild;
    }
    function Bb(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border") for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + xb[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + xb[e])) || 0 : d -= parseFloat(f.css(a, "border" + xb[e] + "Width")) || 0;
            return d + "px";
        }
        d = yb(a, b);
        if (d < 0 || d == null) d = a.style[b];
        if (tb.test(d)) return d;
        d = parseFloat(d) || 0;
        if (c) for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + xb[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + xb[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + xb[e])) || 0);
        return d + "px";
    }
    function Yb(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(Ob), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c);
            }
        };
    }
    function Zb(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === Sb, l;
        for (; i < j && (k || !l) ; i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = Zb(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = Zb(a, c, d, e, "*", g)), l;
    }
    function $b(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e);
    }
    function _b(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || Db.test(a) ? d(a, e) : _b(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d);
        }); else if (!c && f.type(b) === "object") for (var e in b) _b(a + "[" + e + "]", b[e], c, d); else d(a, b);
    }
    function ac(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break;
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break;
                }
                k || (k = i);
            }
            j = j || k;
        }
        if (j) return j !== f[0] && f.unshift(j), d[j];
    }
    function bc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break;
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
            }
        }
        return c;
    }
    function hc() {
        try {
            return new a.XMLHttpRequest;
        } catch (b) { }
    }
    function ic() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) { }
    }
    function rc() {
        return setTimeout(sc, 0), qc = f.now();
    }
    function sc() {
        qc = b;
    }
    function tc(a, b) {
        var c = {};
        return f.each(pc.concat.apply([], pc.slice(0, b)), function () {
            c[this] = a;
        }), c;
    }
    function uc(a) {
        if (!jc[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                kc || (kc = c.createElement("iframe"), kc.frameBorder = kc.width = kc.height = 0), b.appendChild(kc);
                if (!lc || !kc.createElement) lc = (kc.contentWindow || kc.contentDocument).document, lc.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), lc.close();
                d = lc.createElement(a), lc.body.appendChild(d), e = f.css(d, "display"), b.removeChild(kc);
            }
            jc[a] = e;
        }
        return jc[a];
    }
    function yc(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (e.isReady) return;
            try {
                c.documentElement.doScroll("left");
            } catch (a) {
                setTimeout(J, 1);
                return;
            }
            e.ready();
        }
        var e = function (a, b) {
            return new e.fn.init(a, b, h);
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
            return (b + "").toUpperCase();
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        return e.fn = e.prototype = {
            constructor: e,
            init: function (a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [null, a, null] : g = i.exec(a);
                    if (g && (g[1] || !d)) {
                        if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h;
                        }
                        return this.context = c, this.selector = a, this;
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
                }
                return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this));
            },
            selector: "",
            jquery: "1.7.2",
            length: 0,
            size: function () {
                return this.length;
            },
            toArray: function () {
                return F.call(this, 0);
            },
            get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
            },
            pushStack: function (a, b, c) {
                var d = this.constructor();
                return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d;
            },
            each: function (a, b) {
                return e.each(this, a, b);
            },
            ready: function (a) {
                return e.bindReady(), A.add(a), this;
            },
            eq: function (a) {
                return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
            },
            map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b);
                }));
            },
            end: function () {
                return this.prevObject || this.constructor(null);
            },
            push: E,
            sort: [].sort,
            splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
            }
            return i;
        }, e.extend({
            noConflict: function (b) {
                return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e;
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0);
            },
            ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready");
                }
            },
            bindReady: function () {
                if (A) return;
                A = e.Callbacks("once memory");
                if (c.readyState === "complete") return setTimeout(e.ready, 1);
                if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null;
                    } catch (d) { }
                    c.documentElement.doScroll && b && J();
                }
            },
            isFunction: function (a) {
                return e.type(a) === "function";
            },
            isArray: Array.isArray || function (a) {
                return e.type(a) === "array";
            },
            isWindow: function (a) {
                return a != null && a == a.window;
            },
            isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a);
            },
            type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object";
            },
            isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (c) {
                    return !1;
                }
                var d;
                for (d in a);
                return d === b || D.call(a, d);
            },
            isEmptyObject: function (a) {
                for (var b in a) return !1;
                return !0;
            },
            error: function (a) {
                throw new Error(a);
            },
            parseJSON: function (b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                e.error("Invalid JSON: " + b);
            },
            parseXML: function (c) {
                if (typeof c != "string" || !c) return null;
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
                } catch (g) {
                    d = b;
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d;
            },
            noop: function () { },
            globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b);
                })(b);
            },
            camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x);
            },
            nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
            },
            each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break;
                    } else for (; g < h;) if (c.apply(a[g++], d) === !1) break;
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break;
                } else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
                return a;
            },
            trim: G ? function (a) {
                return a == null ? "" : G.call(a);
            } : function (a) {
                return a == null ? "" : a.toString().replace(k, "").replace(l, "");
            },
            makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
                }
                return c;
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                return a.length = d, a;
            },
            grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d;
            },
            map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h);
            },
            guid: 1,
            proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d;
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)));
                };
                return g.guid = a.guid = a.guid || g.guid || e.guid++, g;
            },
            access: function (a, c, d, f, g, h, i) {
                var j, k = d == null, l = 0, m = a.length;
                if (d && typeof d == "object") {
                    for (l in d) e.access(a, c, l, d[l], 1, h, f);
                    g = 1;
                } else if (f !== b) {
                    j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                        return j.call(e(a), c);
                    }) : (c.call(a, f), c = null));
                    if (c) for (; l < m; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                    g = 1;
                }
                return g ? a : k ? c.call(a) : m ? c(a[0], d) : h;
            },
            now: function () {
                return (new Date).getTime();
            },
            uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {
                    browser: b[1] || "",
                    version: b[2] || "0"
                };
            },
            sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c);
                }
                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b);
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a;
            },
            browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase();
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready();
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready());
        }), e;
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g);
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++) if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break;
            }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])));
        }, p = {
            add: function () {
                if (c) {
                    var a = c.length;
                    n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]));
                }
                return this;
            },
            remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                        if (a.unique) break;
                    }
                }
                return this;
            },
            has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) if (a === c[b]) return !0;
                }
                return !1;
            },
            empty: function () {
                return c = [], this;
            },
            disable: function () {
                return c = d = e = b, this;
            },
            disabled: function () {
                return !c;
            },
            lock: function () {
                return d = b, (!e || e === !0) && p.disable(), this;
            },
            locked: function () {
                return !d;
            },
            fireWith: function (b, c) {
                return d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c)), this;
            },
            fire: function () {
                return p.fireWith(this, arguments), this;
            },
            fired: function () {
                return !!i;
            }
        };
        return p;
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add,
                fail: c.add,
                progress: d.add,
                state: function () {
                    return e;
                },
                isResolved: b.fired,
                isRejected: c.fired,
                then: function (a, b, c) {
                    return i.done(a).fail(b).progress(c), this;
                },
                always: function () {
                    return i.done.apply(i, arguments).fail.apply(i, arguments), this;
                },
                pipe: function (a, b, c) {
                    return f.Deferred(function (d) {
                        f.each({
                            done: [a, "resolve"],
                            fail: [b, "reject"],
                            progress: [c, "notify"]
                        }, function (a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function () {
                                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g]);
                            }) : i[a](d[e]);
                        });
                    }).promise();
                },
                promise: function (a) {
                    if (a == null) a = h; else for (var b in h) a[b] = h[b];
                    return a;
                }
            }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function () {
                e = "resolved";
            }, c.disable, d.lock).fail(function () {
                e = "rejected";
            }, b.disable, d.lock), a && a.call(i, i), i;
        },
        when: function (a) {
            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
                };
            }
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
                };
            }
            var b = i.call(arguments, 0), c = 0, d = b.length, e = new Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b);
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k;
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test;
        } catch (r) {
            b.deleteExpando = !1;
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1;
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent) for (n in {
                submit: 1,
                change: 1,
                focusin: 1
        }) m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        return j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            if (!u) return;
            m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j);
        }), b;
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !!a && !m(a);
        },
        data: function (a, c, d, e) {
            if (!f.acceptData(a)) return;
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i);
        },
        removeData: function (a, b, c) {
            if (!f.acceptData(a)) return;
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k]) return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return;
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k])) return;
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0);
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b;
            }
            return !0;
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h, i, j = this[0], k = 0, m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0);
                    }
                }
                return m;
            }
            return typeof a == "object" ? this.each(function () {
                f.data(this, a);
            }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", f.access(this, function (c) {
                if (c === b) return m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m)), m === b && d[1] ? this.data(d[0]) : m;
                d[1] = c, this.each(function () {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d);
                });
            }, null, c, arguments.length > 1, null, !1));
        },
        removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a);
            });
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || [];
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b);
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
        }
    }), f.fn.extend({
        queue: function (a, c) {
            var d = 2;
            return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? f.queue(this[0], a) : c === b ? this : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
            });
        },
        dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a);
            });
        },
        delay: function (a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", []);
        },
        promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e]);
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            return m(), d.promise(c);
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a);
            });
        },
        prop: function (a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return a = f.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a];
                } catch (c) { }
            });
        },
        addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g);
                    }
                }
            }
            return this;
        },
        removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h);
                    } else g.className = "";
                }
            }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            return f.isFunction(a) ? this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b);
            }) : this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
            });
        },
        hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1;
        },
        val: function (a) {
            var c, d, e, g = this[0];
            if (!arguments.length) {
                if (g) return c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
                return;
            }
            return e = f.isFunction(a), this.each(function (d) {
                var g = f(this), h;
                if (this.nodeType !== 1) return;
                e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                    return a == null ? "" : a + "";
                })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
            });
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b);
                        }
                    }
                    return j && !h.length && i.length ? f(i[g]).val() : h;
                },
                set: function (a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1), c;
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!a || j === 3 || j === 8 || j === 2) return;
            if (e && c in f.attrFn) return f(a)[c](d);
            if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return;
                }
                return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d);
            }
            return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g);
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; i < g; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1));
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            },
            value: {
                get: function (a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null;
                },
                set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return;
            return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
        },
        set: function (a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
        }
    }, v || (y = {
        name: !0,
        id: !0,
        coords: !0
    }, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
        },
        set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + "";
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c;
            }
        });
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c);
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d;
            }
        });
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b;
        },
        set: function (a, b) {
            return a.style.cssText = "" + b;
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
            }
        });
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
        var b = F.exec(a);
        return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b;
    }, H = function (a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
    }, I = function (a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
    };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
            d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                return typeof f == "undefined" || !!a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments);
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                    type: m,
                    origType: l[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: g,
                    quick: g && G(g),
                    namespace: n.join(".")
                }, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i);
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
            }
            a = null;
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!g || !(o = g.events)) return;
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    continue;
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j]);
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return;
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s]);
                }
                for (l = 0; l < r.length && !c.isPropagationStopped() ; l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result;
            }
            return;
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
            g[0] = c, c.delegateTarget = this;
            if (i.preDispatch && i.preDispatch.call(this, c) === !1) return;
            if (e && (!c.button || c.type !== "click")) {
                n = f(this), n.context = this.ownerDocument || this;
                for (m = c.target; m != this; m = m.parentNode || this) if (m.disabled !== !0) {
                    p = {}, r = [], n[0] = m;
                    for (k = 0; k < e; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                    r.length && j.push({
                        elem: m,
                        matches: r
                    });
                }
            }
            d.length > e && j.push({
                elem: this,
                matches: d.slice(e)
            });
            for (k = 0; k < j.length && !c.isPropagationStopped() ; k++) {
                q = j[k], c.currentTarget = q.elem;
                for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped() ; l++) {
                    s = q.matches[l];
                    if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()));
                }
            }
            return i.postDispatch && i.postDispatch.call(this, c), c.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a;
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a;
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c);
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0;
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        },
        stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation();
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h;
            }
        };
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0;
                }), d._submit_attached = !0);
            });
        },
        postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit");
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
                });
                return !1;
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
                }), b._change_attached = !0);
            });
        },
        handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
        },
        teardown: function () {
            return f.event.remove(this, "._change"), z.test(this.nodeName);
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0);
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0);
            },
            teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0);
            }
        };
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this;
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            return g === 1 && (h = e, e = function (a) {
                return f().off(a), h.apply(this, arguments);
            }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function () {
                f.event.add(this, a, e, d, c);
            });
        },
        one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this;
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = J), this.each(function () {
                f.event.remove(this, a, d, c);
            });
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function (a, b) {
            return this.off(a, null, b);
        },
        live: function (a, b, c) {
            return f(this.context).on(a, this.selector, b, c), this;
        },
        die: function (a, b) {
            return f(this.context).off(a, this.selector || "**", b), this;
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
        },
        trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this);
            });
        },
        triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0);
        },
        toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e);
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
    }), function () {
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break;
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break;
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break;
                            }
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            return i = !1, 0;
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break;
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v);
                } else k = w = [];
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            return l && (m(l, h, e, f), m.uniqueSort(e)), e;
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
            }
            return a;
        }, m.matches = function (a, b) {
            return m(a, null, null, b);
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0;
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break;
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            };
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue;
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break;
                    }
                }
                if (a === q) {
                    if (g != null) break;
                    m.error(a);
                }
                q = a;
            }
            return s;
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a);
                } else if (d === 3 || d === 4) return a.nodeValue;
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e;
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href");
                },
                type: function (a) {
                    return a.getAttribute("type");
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1);
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
                    }
                    e && m.filter(b, a, !0);
                },
                ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1;
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0);
                    }
                },
                "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
                },
                "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : [];
                    }
                },
                NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c;
                    }
                },
                TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1;
                },
                ID: function (a) {
                    return a[1].replace(j, "");
                },
                TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase();
                },
                CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
                    } else a[2] && m.error(a[0]);
                    return a[0] = e++, a;
                },
                ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a;
                },
                PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not") {
                        if (!((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))) {
                            var g = m.filter(b[3], c, d, !0 ^ f);
                            return d || e.push.apply(e, g), !1;
                        }
                        b[3] = m(b[3], null, null, c);
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b;
                },
                POS: function (a) {
                    return a.unshift(!0), a;
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden";
                },
                disabled: function (a) {
                    return a.disabled === !0;
                },
                checked: function (a) {
                    return a.checked === !0;
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                parent: function (a) {
                    return !!a.firstChild;
                },
                empty: function (a) {
                    return !a.firstChild;
                },
                has: function (a, b, c) {
                    return !!m(c[3], a).length;
                },
                header: function (a) {
                    return /h\d/i.test(a.nodeName);
                },
                text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
                },
                radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
                },
                checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
                },
                file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type;
                },
                password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type;
                },
                submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type;
                },
                image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type;
                },
                reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type;
                },
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button";
                },
                input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName);
                },
                focus: function (a) {
                    return a === a.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0;
                },
                last: function (a, b, c, d) {
                    return b === d.length - 1;
                },
                even: function (a, b) {
                    return b % 2 === 0;
                },
                odd: function (a, b) {
                    return b % 2 === 1;
                },
                lt: function (a, b, c) {
                    return b < c[3] - 0;
                },
                gt: function (a, b, c) {
                    return b > c[3] - 0;
                },
                nth: function (a, b, c) {
                    return c[3] - 0 === b;
                },
                eq: function (a, b, c) {
                    return c[3] - 0 === b;
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0;
                    }
                    m.error(e);
                },
                CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case "only":
                        case "first":
                            while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case "last":
                            while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                            return !0;
                        case "nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f;
                            }
                            return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
                    }
                },
                ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b;
                },
                TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
                },
                CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
                },
                ATTR: function (a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
                },
                POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d);
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1);
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a;
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
                return d;
            };
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1;
        } : (u = function (a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling;
            }
            return 1;
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : [];
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b;
            }), e.removeChild(a), e = a = null;
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d;
                }
                return c;
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2);
            }), a = null;
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
            m = function (b, e, f, g) {
                e = e || c;
                if (!g && !m.isXML(e)) {
                    var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                    if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                        if (h[1]) return s(e.getElementsByTagName(b), f);
                        if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
                    }
                    if (e.nodeType === 9) {
                        if (b === "body" && e.body) return s([e.body], f);
                        if (h && h[3]) {
                            var i = e.getElementById(h[3]);
                            if (!i || !i.parentNode) return s([], f);
                            if (i.id === h[3]) return s([i], f);
                        }
                        try {
                            return s(e.querySelectorAll(b), f);
                        } catch (j) { }
                    } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                        var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                        try {
                            if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
                        } catch (r) { } finally {
                            l || k.removeAttribute("id");
                        }
                    }
                }
                return a(b, e, f, g);
            };
            for (var e in a) m[e] = a[e];
            b = null;
        }(), function () {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle");
                } catch (f) {
                    e = !0;
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f;
                        }
                    } catch (g) { }
                    return m(c, null, null, [a]).length > 0;
                };
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1) return;
            o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
            }, a = null;
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0);
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16);
        } : m.contains = function () {
            return !1;
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e);
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains;
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0;
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break;
                }
            }
            return e;
        },
        has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0;
            });
        },
        not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a);
        },
        filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a);
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++;
                }
                return c;
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break;
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
                }
            }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a);
        },
        index: function (a) {
            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
        },
        andSelf: function () {
            return this.add(this.prevObject);
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function (a) {
            return f.dir(a, "parentNode");
        },
        parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c);
        },
        next: function (a) {
            return f.nth(a, 2, "nextSibling");
        },
        prev: function (a) {
            return f.nth(a, 2, "previousSibling");
        },
        nextAll: function (a) {
            return f.dir(a, "nextSibling");
        },
        prevAll: function (a) {
            return f.dir(a, "previousSibling");
        },
        nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c);
        },
        prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c);
        },
        siblings: function (a) {
            return f.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function (a) {
            return f.sibling(a.firstChild);
        },
        contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","));
        };
    }), f.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b);
        },
        dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e;
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a;
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c;
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ab = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, cb = new RegExp("<(?:" + V + ")[\\s/>]", "i"), db = /checked\s*(?:[^=]|=\s*.checked.)/i, eb = /\/(java|ecma)script/i, fb = /^\s*<!(?:\[CDATA\[|\-\-)/, gb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }, hb = U(c);
    gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, gb.th = gb.td, f.support.htmlSerialize || (gb._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.access(this, function (a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            }, null, a, arguments.length);
        },
        wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (a) {
            return f.isFunction(a) ? this.each(function (b) {
                f(this).wrapInner(a.call(this, b));
            }) : this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a);
            });
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild);
            });
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this);
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments);
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a;
            }
        },
        remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this;
        },
        empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild);
            }
            return this;
        },
        clone: function (a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
                return f.clone(this, a, b);
            });
        },
        html: function (a) {
            return f.access(this, function (a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ab.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !gb[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0;
                    } catch (g) { }
                }
                c && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function (a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function (b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d));
            }) : (typeof a != "string" && (a = f(a).detach()), this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a);
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
        },
        detach: function (a) {
            return this.remove(a, !0);
        },
        domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && db.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0);
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? ib(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
                }
                k.length && f.each(k, function (a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(fb, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b);
                });
            }
            return this;
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !db.test(j)) && (f.support.html5Clone || !cb.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        };
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j);
            }
            return this.pushStack(d, a, e.selector);
        };
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !cb.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : ob(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                kb(a, h), d = lb(a), e = lb(h);
                for (g = 0; d[g]; ++g) e[g] && kb(d[g], e[g]);
            }
            if (b) {
                jb(a, h);
                if (c) {
                    d = lb(a), e = lb(h);
                    for (g = 0; d[g]; ++g) jb(d[g], e[g]);
                }
            }
            return d = e = null, h;
        },
        clean: function (a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l; (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l) continue;
                if (typeof l == "string") if (!_.test(l)) l = b.createTextNode(l); else {
                    l = l.replace(Y, "<$1></$2>");
                    var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = gb[m] || gb._default, o = n[0], p = b.createElement("div"), q = hb.childNodes, r;
                    b === c ? hb.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                    while (o--) p = p.lastChild;
                    if (!f.support.tbody) {
                        var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                        for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i]);
                    }
                    !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)));
                }
                var u;
                if (!f.support.appendChecked) if (l[0] && typeof (u = l.length) == "number") for (i = 0; i < u; i++) nb(l[i]); else nb(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l);
            }
            if (d) {
                g = function (a) {
                    return !a.type || eb.test(a.type);
                };
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || eb.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v));
                        }
                        d.appendChild(h);
                    }
                }
            }
            return j;
        },
        cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null);
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
                }
            }
        }
    });
    var pb = /alpha\([^)]*\)/i, qb = /opacity=([^)]*)/, rb = /([A-Z]|^ms)/g, sb = /^[\-+]?(?:\d*\.)?\d+$/i, tb = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, ub = /^([\-+])=([\-+.\de]+)/, vb = /^margin/, wb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, xb = ["Top", "Right", "Bottom", "Left"], yb, zb, Ab;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c);
        }, a, c, arguments.length > 1);
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = yb(a, "opacity");
                        return c === "" ? "1" : c;
                    }
                    return a.style.opacity;
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
            h = typeof d, h === "string" && (g = ub.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d)) return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                j[c] = d;
            } catch (l) { }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (yb) return yb(a, c);
        },
        swap: function (a, b, c) {
            var d = {}, e, f;
            for (f in b) d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b) a.style[f] = d[f];
            return e;
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (zb = function (a, b) {
        var c, d, e, g, h = a.style;
        return b = b.replace(rb, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && vb.test(b) && tb.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g), c;
    }), c.documentElement.currentStyle && (Ab = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        return f == null && g && (e = g[b]) && (f = e), tb.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f;
    }), yb = zb || Ab, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return a.offsetWidth !== 0 ? Bb(a, b, d) : f.swap(a, wb, function () {
                    return Bb(a, b, d);
                });
            },
            set: function (a, b) {
                return sb.test(b) ? b + "px" : b;
            }
        };
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return qb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
        },
        set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(pb, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return;
            }
            c.filter = pb.test(g) ? g.replace(pb, e) : g + " " + e;
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                return f.swap(a, {
                    display: "inline-block"
                }, function () {
                    return b ? yb(a, "margin-right") : a.style.marginRight;
                });
            }
        });
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a);
    }), f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (a, b) {
        f.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++) f[a + xb[d] + b] = e[d] || e[d - 2] || e[0];
                return f;
            }
        };
    });
    var Cb = /%20/g, Db = /\[\]$/, Eb = /\r?\n/g, Fb = /#.*$/, Gb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Hb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, Ib = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Jb = /^(?:GET|HEAD)$/, Kb = /^\/\//, Lb = /\?/, Mb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Nb = /^(?:select|textarea)/i, Ob = /\s+/, Pb = /([?&])_=[^&]*/, Qb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, Rb = f.fn.load, Sb = {}, Tb = {}, Ub, Vb, Wb = ["*/"] + ["*"];
    try {
        Ub = e.href;
    } catch (Xb) {
        Ub = c.createElement("a"), Ub.href = "", Ub = Ub.href;
    }
    Vb = Qb.exec(Ub.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && Rb) return Rb.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e);
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a;
                    }), i.html(g ? f("<div>").append(c.replace(Mb, "")).find(g) : c)), d && i.each(d, [c, b, a]);
                }
            }), this;
        },
        serialize: function () {
            return f.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this;
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || Nb.test(this.nodeName) || Hb.test(this.type));
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(Eb, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Eb, "\r\n")
                };
            }).get();
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a);
        };
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            });
        };
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script");
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json");
        },
        ajaxSetup: function (a, b) {
            return b ? $b(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), $b(a, b), a;
        },
        ajaxSettings: {
            url: Ub,
            isLocal: Ib.test(Vb[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Wb
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Yb(Sb),
        ajaxTransport: Yb(Tb),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s === 2) return;
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? ac(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
                    }
                    if (a === 304) w = "notmodified", o = !0; else try {
                        r = bc(d, x), w = "success", o = !0;
                    } catch (A) {
                        w = "parsererror", u = A;
                    }
                } else {
                    u = w;
                    if (!w || a) w = "error", a < 0 && (a = 0);
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"));
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function (a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a, l[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function () {
                    return s === 2 ? n : null;
                },
                getResponseHeader: function (a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = Gb.exec(n)) o[c[1].toLowerCase()] = c[2];
                        }
                        c = o[a.toLowerCase()];
                    }
                    return c === b ? null : c;
                },
                overrideMimeType: function (a) {
                    return s || (d.mimeType = a), this;
                },
                abort: function (a) {
                    return a = a || "abort", p && p.abort(a), w(0, a), this;
                }
            };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b);
                }
                return this;
            }, d.url = ((a || d.url) + "").replace(Fb, "").replace(Kb, Vb[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(Ob), d.crossDomain == null && (r = Qb.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == Vb[1] && r[2] == Vb[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (Vb[3] || (Vb[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), Zb(Sb, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Jb.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (Lb.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(Pb, "$1_=" + x);
                    d.url = y + (y === d.url ? (Lb.test(d.url) ? "&" : "?") + "_=" + x : "");
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + Wb + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
                p = Zb(Tb, d, c, v);
                if (!p) w(-1, "No Transport"); else {
                    v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                        v.abort("timeout");
                    }, d.timeout));
                    try {
                        s = 1, p.send(l, w);
                    } catch (z) {
                        if (!(s < 2)) throw z;
                        w(-1, z);
                    }
                }
                return v;
            }
            return v.abort(), !1;
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value);
            }); else for (var g in a) _b(g, a[g], c, e);
            return d.join("&").replace(Cb, "+");
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cc = f.now(), dc = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return f.expando + "_" + cc++;
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (dc.test(b.url) || e && dc.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(dc, l), b.url === j && (e && (k = k.replace(dc, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a];
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0]);
            }), b.converters["script json"] = function () {
                return g || f.error(h + " was not called"), g[0];
            }, b.dataTypes[0] = "json", "script";
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                return f.globalEval(a), a;
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
                    }, e.insertBefore(d, e.firstChild);
                },
                abort: function () {
                    d && d.onload(0, 1);
                }
            };
        }
    });
    var ec = a.ActiveXObject ? function () {
        for (var a in gc) gc[a](0, 1);
    } : !1, fc = 0, gc;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && hc() || ic();
    } : hc, function (a) {
        f.extend(f.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        });
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j]);
                    } catch (k) { }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, ec && delete gc[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                    try {
                                        m.text = h.responseText;
                                    } catch (a) { }
                                    try {
                                        k = h.statusText;
                                    } catch (o) {
                                        k = "";
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
                                }
                            }
                        } catch (p) {
                            e || g(-1, p);
                        }
                        m && g(j, k, m, l);
                    }, !c.async || h.readyState === 4 ? d() : (i = ++fc, ec && (gc || (gc = {}, f(a).unload(ec)), gc[i] = d), h.onreadystatechange = d);
                },
                abort: function () {
                    d && d(0, 1);
                }
            };
        }
    });
    var jc = {}, kc, lc, mc = /^(?:toggle|show|hide)$/, nc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, oc, pc = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], qc;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(tc("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", uc(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
                }
            }
            return this;
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(tc("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this;
        },
        _toggle: f.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]();
            }) : this.animate(tc("toggle", 3), a, b, c), this;
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand" in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l) i in a || (a[i] = l[i]);
                    }
                }
                for (g in a) {
                    h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || uc(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], mc.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = nc.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0;
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [!1]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g));
        },
        stop: function (a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d);
                }
                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a);
            });
        }
    }), f.each({
        slideDown: tc("show", 1),
        slideUp: tc("hide", 1),
        slideToggle: tc("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
            }, d;
        },
        easing: {
            linear: function (a) {
                return a;
            },
            swing: function (a) {
                return -Math.cos(a * Math.PI) / 2 + .5;
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
        },
        cur: function () {
            if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = f.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
            }
            return this.elem[this.prop];
        },
        custom: function (a, c, d) {
            function h(a) {
                return e.step(a);
            }
            var e = this, g = f.fx;
            this.startTime = qc || rc(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end));
            }, h() && f.timers.push(h) && !oc && (oc = setInterval(g.tick, g.interval));
        },
        show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show();
        },
        hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0);
        },
        step: function (a) {
            var b, c, d, e = qc || rc(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a];
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h));
                }
                return !1;
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0;
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop();
        },
        interval: 13,
        stop: function () {
            clearInterval(oc), oc = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now);
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
            }
        }
    }), f.each(pc.concat.apply([], pc), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit);
        });
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem;
        }).length;
    });
    var vc, wc = /^t(?:able|d|h)$/i, xc = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? vc = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect();
        } catch (e) { }
        if (!d || !f.contains(c, a)) return d ? {
            top: d.top,
            left: d.left
        } : {
            top: 0,
            left: 0
        };
        var g = b.body, h = yc(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
        return {
            top: m,
            left: n
        };
    } : vc = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed") break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !wc.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d;
        }
        if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
        return f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft)), {
            top: k,
            left: l
        };
    }, f.fn.offset = function (a) {
        if (arguments.length) return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b);
        });
        var c = this[0], d = c && c.ownerDocument;
        return d ? c === d.body ? f.offset.bodyOffset(c) : vc(c, d, d.documentElement) : null;
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            };
        },
        setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = xc.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !xc.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a;
            });
        }
    }), f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = yc(a);
                if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g;
            }, a, e, arguments.length, null);
        };
    }), f.each({
        Height: "height",
        Width: "width"
    }, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null;
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null;
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) return i = a.document, j = i.documentElement[d], f.support.boxModel && j || i.body && i.body[d] || j;
                if (a.nodeType === 9) return i = a.documentElement, i[d] >= i[e] ? i[d] : Math.max(a.body[e], i[e], a.body[g], i[g]);
                if (h === b) return k = f.css(a, c), l = parseFloat(k), f.isNumeric(l) ? l : k;
                f(a).css(c, h);
            }, c, a, arguments.length, null);
        };
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f;
    });
})(window), function (a) {
    typeof define == "function" && define.amd ? define(["jquery"], a) : a(jQuery);
}(function (a) {
    if (a.support.cors || !a.ajaxTransport || !window.XDomainRequest) return;
    var b = /^https?:\/\//i, c = /^get|post$/i, d = new RegExp("^" + location.protocol, "i");
    a.ajaxTransport("* text html xml json", function (e, f, g) {
        if (!e.crossDomain || !e.async || !c.test(e.type) || !b.test(e.url) || !d.test(e.url)) return;
        var h = null;
        return {
            send: function (b, c) {
                var d = "", g = (f.dataType || "").toLowerCase();
                h = new XDomainRequest, /^\d+$/.test(f.timeout) && (h.timeout = f.timeout), h.ontimeout = function () {
                    c(500, "timeout");
                }, h.onload = function () {
                    var b = "Content-Length: " + h.responseText.length + "\r\nContent-Type: " + h.contentType, d = {
                        code: 200,
                        message: "success"
                    }, e = {
                        text: h.responseText
                    };
                    try {
                        if (g === "html" || /text\/html/i.test(h.contentType)) e.html = h.responseText; else if (g === "json" || g !== "text" && /\/json/i.test(h.contentType)) try {
                            e.json = a.parseJSON(h.responseText);
                        } catch (f) {
                            d.code = 500, d.message = "parseerror";
                        } else if (g === "xml" || g !== "text" && /\/xml/i.test(h.contentType)) {
                            var j = new ActiveXObject("Microsoft.XMLDOM");
                            j.async = !1;
                            try {
                                j.loadXML(h.responseText);
                            } catch (f) {
                                j = undefined;
                            }
                            if (!j || !j.documentElement || j.getElementsByTagName("parsererror").length) throw d.code = 500, d.message = "parseerror", "Invalid XML: " + h.responseText;
                            e.xml = j;
                        }
                    } catch (k) {
                        throw k;
                    } finally {
                        c(d.code, d.message, e, b);
                    }
                }, h.onprogress = function () { }, h.onerror = function () {
                    c(500, "error", {
                        text: h.responseText
                    });
                }, f.data && (d = a.type(f.data) === "string" ? f.data : a.param(f.data)), h.open(e.type, e.url), h.send(d);
            },
            abort: function () {
                h && h.abort();
            }
        };
    });
}), function () {
    var a = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Unknown", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown", this.OS = this.searchString(this.dataOS) || "Unknown", this.OSVersion = this.searchOSVersion(navigator.userAgent) || "Unknown";
        },
        searchString: function (a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b].string, d = a[b].prop;
                this.versionSearchString = a[b].versionSearch || a[b].identity;
                if (c) {
                    if (c.indexOf(a[b].subString) != -1) return a[b].identity;
                } else if (d) return a[b].identity;
            }
        },
        searchVersion: function (a) {
            var b = a.indexOf(this.versionSearchString);
            if (b == -1) return;
            return parseFloat(a.substring(b + this.versionSearchString.length + 1));
        },
        searchOSVersion: function (a) {
            var b = null;
            if (/^Mozilla\/\d+\.\d+ \(([^)]+)\)/.test(a)) {
                var c = RegExp.$1;
                /Windows NT ([^;]+)/.test(c) ? b = RegExp.$1 : /Mac OS X ([^;]+)/.test(c) ? b = RegExp.$1 : b = c;
            }
            return b;
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "CriOS",
            identity: "Chrome",
            versionSearch: "CriOS"
        }, {
            string: navigator.userAgent,
            subString: "Silk",
            identity: "Silk"
        }, {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        }, {
            prop: window.opera,
            identity: "Opera"
        }, {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        }, {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        }, {
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer",
            versionSearch: "rv"
        }, {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        }, {
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }],
        dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        }, {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        }, {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }]
    };
    a.init();
    var b = {
        os: a.OS,
        osVersion: a.OSVersion,
        browser: a.browser,
        version: a.version
    };
    b.browser != "Unknown" && (b[b.browser.toLowerCase()] = !0), b.chrome || b.safari ? (b.webkit = !0, b.safari = !0) : b.firefox ? b.mozilla = !0 : b.explorer && (b.msie = !0), window.$.client = b;
}(), function (a) {
    function bb(a, b, c) {
        switch (arguments.length) {
            case 2:
                return a != null ? a : b;
            case 3:
                return a != null ? a : b != null ? b : c;
            default:
                throw new Error("Implement me");
        }
    }
    function cb(a, b) {
        return g.call(a, b);
    }
    function db() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function eb(a) {
        b.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + a);
    }
    function fb(a, b) {
        var c = !0;
        return mb(function () {
            return c && (eb(a), c = !1), b.apply(this, arguments);
        }, b);
    }
    function gb(a, b) {
        _[a] || (eb(b), _[a] = !0);
    }
    function hb(a, b) {
        return function (c) {
            return pb(a.call(this, c), b);
        };
    }
    function ib(a, b) {
        return function (c) {
            return this.localeData().ordinal(a.call(this, c), b);
        };
    }
    function jb() { }
    function kb(a, b) {
        b !== !1 && Fb(a), nb(this, a), this._d = new Date(+a._d);
    }
    function lb(a) {
        var c = yb(a), d = c.year || 0, e = c.quarter || 0, f = c.month || 0, g = c.week || 0, h = c.day || 0, i = c.hour || 0, j = c.minute || 0, k = c.second || 0, l = c.millisecond || 0;
        this._milliseconds = +l + k * 1e3 + j * 6e4 + i * 36e5, this._days = +h + g * 7, this._months = +f + e * 3 + d * 12, this._data = {}, this._locale = b.localeData(), this._bubble();
    }
    function mb(a, b) {
        for (var c in b) cb(b, c) && (a[c] = b[c]);
        return cb(b, "toString") && (a.toString = b.toString), cb(b, "valueOf") && (a.valueOf = b.valueOf), a;
    }
    function nb(a, b) {
        var c, d, e;
        typeof b._isAMomentObject != "undefined" && (a._isAMomentObject = b._isAMomentObject), typeof b._i != "undefined" && (a._i = b._i), typeof b._f != "undefined" && (a._f = b._f), typeof b._l != "undefined" && (a._l = b._l), typeof b._strict != "undefined" && (a._strict = b._strict), typeof b._tzm != "undefined" && (a._tzm = b._tzm), typeof b._isUTC != "undefined" && (a._isUTC = b._isUTC), typeof b._offset != "undefined" && (a._offset = b._offset), typeof b._pf != "undefined" && (a._pf = b._pf), typeof b._locale != "undefined" && (a._locale = b._locale);
        if (q.length > 0) for (c in q) d = q[c], e = b[d], typeof e != "undefined" && (a[d] = e);
        return a;
    }
    function ob(a) {
        return a < 0 ? Math.ceil(a) : Math.floor(a);
    }
    function pb(a, b, c) {
        var d = "" + Math.abs(a), e = a >= 0;
        while (d.length < b) d = "0" + d;
        return (e ? c ? "+" : "" : "-") + d;
    }
    function qb(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + (b.year() - a.year()) * 12, a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
    }
    function rb(a, b) {
        var c;
        return b = Kb(b, a), a.isBefore(b) ? c = qb(a, b) : (c = qb(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c;
    }
    function sb(a, c) {
        return function (d, e) {
            var f, g;
            return e !== null && !isNaN(+e) && (gb(c, "moment()." + c + "(period, number) is deprecated. Please use moment()." + c + "(number, period)."), g = d, d = e, e = g), d = typeof d == "string" ? +d : d, f = b.duration(d, e), tb(this, f, a), this;
        };
    }
    function tb(a, c, d, e) {
        var f = c._milliseconds, g = c._days, h = c._months;
        e = e == null ? !0 : e, f && a._d.setTime(+a._d + f * d), g && nc(a, "Date", mc(a, "Date") + g * d), h && lc(a, mc(a, "Month") + h * d), e && b.updateOffset(a, g || h);
    }
    function ub(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    }
    function vb(a) {
        return Object.prototype.toString.call(a) === "[object Date]" || a instanceof Date;
    }
    function wb(a, b, c) {
        var d = Math.min(a.length, b.length), e = Math.abs(a.length - b.length), f = 0, g;
        for (g = 0; g < d; g++) (c && a[g] !== b[g] || !c && Ab(a[g]) !== Ab(b[g])) && f++;
        return f + e;
    }
    function xb(a) {
        if (a) {
            var b = a.toLowerCase().replace(/(.)s$/, "$1");
            a = U[a] || V[b] || b;
        }
        return a;
    }
    function yb(a) {
        var b = {}, c, d;
        for (d in a) cb(a, d) && (c = xb(d), c && (b[c] = a[d]));
        return b;
    }
    function zb(c) {
        var d, e;
        if (c.indexOf("week") === 0) d = 7, e = "day"; else {
            if (c.indexOf("month") !== 0) return;
            d = 12, e = "month";
        }
        b[c] = function (f, g) {
            var h, i, j = b._locale[c], k = [];
            typeof f == "number" && (g = f, f = a), i = function (a) {
                var c = b().utc().set(e, a);
                return j.call(b._locale, c, f || "");
            };
            if (g != null) return i(g);
            for (h = 0; h < d; h++) k.push(i(h));
            return k;
        };
    }
    function Ab(a) {
        var b = +a, c = 0;
        return b !== 0 && isFinite(b) && (b >= 0 ? c = Math.floor(b) : c = Math.ceil(b)), c;
    }
    function Bb(a, b) {
        return (new Date(Date.UTC(a, b + 1, 0))).getUTCDate();
    }
    function Cb(a, c, d) {
        return hc(b([a, 11, 31 + c - d]), c, d).week;
    }
    function Db(a) {
        return Eb(a) ? 366 : 365;
    }
    function Eb(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
    }
    function Fb(a) {
        var b;
        a._a && a._pf.overflow === -2 && (b = a._a[j] < 0 || a._a[j] > 11 ? j : a._a[k] < 1 || a._a[k] > Bb(a._a[i], a._a[j]) ? k : a._a[l] < 0 || a._a[l] > 24 || a._a[l] === 24 && (a._a[m] !== 0 || a._a[n] !== 0 || a._a[o] !== 0) ? l : a._a[m] < 0 || a._a[m] > 59 ? m : a._a[n] < 0 || a._a[n] > 59 ? n : a._a[o] < 0 || a._a[o] > 999 ? o : -1, a._pf._overflowDayOfYear && (b < i || b > k) && (b = k), a._pf.overflow = b);
    }
    function Gb(b) {
        return b._isValid == null && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && b._pf.charsLeftOver === 0 && b._pf.unusedTokens.length === 0 && b._pf.bigHour === a)), b._isValid;
    }
    function Hb(a) {
        return a ? a.toLowerCase().replace("_", "-") : a;
    }
    function Ib(a) {
        var b = 0, c, d, e, f;
        while (b < a.length) {
            f = Hb(a[b]).split("-"), c = f.length, d = Hb(a[b + 1]), d = d ? d.split("-") : null;
            while (c > 0) {
                e = Jb(f.slice(0, c).join("-"));
                if (e) return e;
                if (d && d.length >= c && wb(f, d, !0) >= c - 1) break;
                c--;
            }
            b++;
        }
        return null;
    }
    function Jb(a) {
        var c = null;
        if (!p[a] && r) try {
            c = b.locale(), require("./locale/" + a), b.locale(c);
        } catch (d) { }
        return p[a];
    }
    function Kb(a, c) {
        var d, e;
        return c._isUTC ? (d = c.clone(), e = (b.isMoment(a) || vb(a) ? +a : +b(a)) - +d, d._d.setTime(+d._d + e), b.updateOffset(d, !1), d) : b(a).local();
    }
    function Lb(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
    }
    function Mb(a) {
        var b = a.match(v), c, d;
        for (c = 0, d = b.length; c < d; c++) $[b[c]] ? b[c] = $[b[c]] : b[c] = Lb(b[c]);
        return function (e) {
            var f = "";
            for (c = 0; c < d; c++) f += b[c] instanceof Function ? b[c].call(e, a) : b[c];
            return f;
        };
    }
    function Nb(a, b) {
        return a.isValid() ? (b = Ob(b, a.localeData()), W[b] || (W[b] = Mb(b)), W[b](a)) : a.localeData().invalidDate();
    }
    function Ob(a, b) {
        function d(a) {
            return b.longDateFormat(a) || a;
        }
        var c = 5;
        w.lastIndex = 0;
        while (c >= 0 && w.test(a)) a = a.replace(w, d), w.lastIndex = 0, c -= 1;
        return a;
    }
    function Pb(a, b) {
        var c, d = b._strict;
        switch (a) {
            case "Q":
                return H;
            case "DDDD":
                return J;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return d ? K : z;
            case "Y":
            case "G":
            case "g":
                return M;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return d ? L : A;
            case "S":
                if (d) return H;
            case "SS":
                if (d) return I;
            case "SSS":
                if (d) return J;
            case "DDD":
                return y;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return C;
            case "a":
            case "A":
                return b._locale._meridiemParse;
            case "x":
                return F;
            case "X":
                return G;
            case "Z":
            case "ZZ":
                return D;
            case "T":
                return E;
            case "SSSS":
                return B;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return d ? I : x;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return x;
            case "Do":
                return d ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
            default:
                return c = new RegExp(Yb(Xb(a.replace("\\", "")), "i")), c;
        }
    }
    function Qb(a) {
        a = a || "";
        var b = a.match(D) || [], c = b[b.length - 1] || [], d = (c + "").match(R) || ["-", 0, 0], e = +(d[1] * 60) + Ab(d[2]);
        return d[0] === "+" ? -e : e;
    }
    function Rb(a, c, d) {
        var e, f = d._a;
        switch (a) {
            case "Q":
                c != null && (f[j] = (Ab(c) - 1) * 3);
                break;
            case "M":
            case "MM":
                c != null && (f[j] = Ab(c) - 1);
                break;
            case "MMM":
            case "MMMM":
                e = d._locale.monthsParse(c, a, d._strict), e != null ? f[j] = e : d._pf.invalidMonth = c;
                break;
            case "D":
            case "DD":
                c != null && (f[k] = Ab(c));
                break;
            case "Do":
                c != null && (f[k] = Ab(parseInt(c.match(/\d{1,2}/)[0], 10)));
                break;
            case "DDD":
            case "DDDD":
                c != null && (d._dayOfYear = Ab(c));
                break;
            case "YY":
                f[i] = b.parseTwoDigitYear(c);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                f[i] = Ab(c);
                break;
            case "a":
            case "A":
                d._isPm = d._locale.isPM(c);
                break;
            case "h":
            case "hh":
                d._pf.bigHour = !0;
            case "H":
            case "HH":
                f[l] = Ab(c);
                break;
            case "m":
            case "mm":
                f[m] = Ab(c);
                break;
            case "s":
            case "ss":
                f[n] = Ab(c);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                f[o] = Ab(("0." + c) * 1e3);
                break;
            case "x":
                d._d = new Date(Ab(c));
                break;
            case "X":
                d._d = new Date(parseFloat(c) * 1e3);
                break;
            case "Z":
            case "ZZ":
                d._useUTC = !0, d._tzm = Qb(c);
                break;
            case "dd":
            case "ddd":
            case "dddd":
                e = d._locale.weekdaysParse(c), e != null ? (d._w = d._w || {}, d._w.d = e) : d._pf.invalidWeekday = c;
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "e":
            case "E":
                a = a.substr(0, 1);
            case "gggg":
            case "GGGG":
            case "GGGGG":
                a = a.substr(0, 2), c && (d._w = d._w || {}, d._w[a] = Ab(c));
                break;
            case "gg":
            case "GG":
                d._w = d._w || {}, d._w[a] = b.parseTwoDigitYear(c);
        }
    }
    function Sb(a) {
        var c, d, e, f, g, h, j;
        c = a._w, c.GG != null || c.W != null || c.E != null ? (g = 1, h = 4, d = bb(c.GG, a._a[i], hc(b(), 1, 4).year), e = bb(c.W, 1), f = bb(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = bb(c.gg, a._a[i], hc(b(), g, h).year), e = bb(c.w, 1), c.d != null ? (f = c.d, f < g && ++e) : c.e != null ? f = c.e + g : f = g), j = ic(d, e, f, h, g), a._a[i] = j.year, a._dayOfYear = j.dayOfYear;
    }
    function Tb(a) {
        var b, c, d = [], e, f;
        if (a._d) return;
        e = Vb(a), a._w && a._a[k] == null && a._a[j] == null && Sb(a), a._dayOfYear && (f = bb(a._a[i], e[i]), a._dayOfYear > Db(f) && (a._pf._overflowDayOfYear = !0), c = dc(f, 0, a._dayOfYear), a._a[j] = c.getUTCMonth(), a._a[k] = c.getUTCDate());
        for (b = 0; b < 3 && a._a[b] == null; ++b) a._a[b] = d[b] = e[b];
        for (; b < 7; b++) a._a[b] = d[b] = a._a[b] == null ? b === 2 ? 1 : 0 : a._a[b];
        a._a[l] === 24 && a._a[m] === 0 && a._a[n] === 0 && a._a[o] === 0 && (a._nextDay = !0, a._a[l] = 0), a._d = (a._useUTC ? dc : cc).apply(null, d), a._tzm != null && a._d.setUTCMinutes(a._d.getUTCMinutes() + a._tzm), a._nextDay && (a._a[l] = 24);
    }
    function Ub(a) {
        var b;
        if (a._d) return;
        b = yb(a._i), a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], Tb(a);
    }
    function Vb(a) {
        var b = new Date;
        return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()];
    }
    function Wb(c) {
        if (c._f === b.ISO_8601) {
            $b(c);
            return;
        }
        c._a = [], c._pf.empty = !0;
        var d = "" + c._i, e, f, g, h, i, j = d.length, k = 0;
        g = Ob(c._f, c._locale).match(v) || [];
        for (e = 0; e < g.length; e++) h = g[e], f = (d.match(Pb(h, c)) || [])[0], f && (i = d.substr(0, d.indexOf(f)), i.length > 0 && c._pf.unusedInput.push(i), d = d.slice(d.indexOf(f) + f.length), k += f.length), $[h] ? (f ? c._pf.empty = !1 : c._pf.unusedTokens.push(h), Rb(h, f, c)) : c._strict && !f && c._pf.unusedTokens.push(h);
        c._pf.charsLeftOver = j - k, d.length > 0 && c._pf.unusedInput.push(d), c._pf.bigHour === !0 && c._a[l] <= 12 && (c._pf.bigHour = a), c._isPm && c._a[l] < 12 && (c._a[l] += 12), c._isPm === !1 && c._a[l] === 12 && (c._a[l] = 0), Tb(c), Fb(c);
    }
    function Xb(a) {
        return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
            return b || c || d || e;
        });
    }
    function Yb(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function Zb(a) {
        var b, c, d, e, f;
        if (a._f.length === 0) {
            a._pf.invalidFormat = !0, a._d = new Date(NaN);
            return;
        }
        for (e = 0; e < a._f.length; e++) {
            f = 0, b = nb({}, a), a._useUTC != null && (b._useUTC = a._useUTC), b._pf = db(), b._f = a._f[e], Wb(b);
            if (!Gb(b)) continue;
            f += b._pf.charsLeftOver, f += b._pf.unusedTokens.length * 10, b._pf.score = f;
            if (d == null || f < d) d = f, c = b;
        }
        mb(a, c || b);
    }
    function $b(a) {
        var b, c, d = a._i, e = N.exec(d);
        if (e) {
            a._pf.iso = !0;
            for (b = 0, c = P.length; b < c; b++) if (P[b][1].exec(d)) {
                a._f = P[b][0] + (e[6] || " ");
                break;
            }
            for (b = 0, c = Q.length; b < c; b++) if (Q[b][1].exec(d)) {
                a._f += Q[b][0];
                break;
            }
            d.match(D) && (a._f += "Z"), Wb(a);
        } else a._isValid = !1;
    }
    function _b(a) {
        $b(a), a._isValid === !1 && (delete a._isValid, b.createFromInputFallback(a));
    }
    function ac(a, b) {
        var c = [], d;
        for (d = 0; d < a.length; ++d) c.push(b(a[d], d));
        return c;
    }
    function bc(c) {
        var d = c._i, e;
        d === a ? c._d = new Date : vb(d) ? c._d = new Date(+d) : (e = s.exec(d)) !== null ? c._d = new Date(+e[1]) : typeof d == "string" ? _b(c) : ub(d) ? (c._a = ac(d.slice(0), function (a) {
            return parseInt(a, 10);
        }), Tb(c)) : typeof d == "object" ? Ub(c) : typeof d == "number" ? c._d = new Date(d) : b.createFromInputFallback(c);
    }
    function cc(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return a < 1970 && h.setFullYear(a), h;
    }
    function dc(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return a < 1970 && b.setUTCFullYear(a), b;
    }
    function ec(a, b) {
        if (typeof a == "string") if (!isNaN(a)) a = parseInt(a, 10); else {
            a = b.weekdaysParse(a);
            if (typeof a != "number") return null;
        }
        return a;
    }
    function fc(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d);
    }
    function gc(a, c, d) {
        var e = b.duration(a).abs(), g = f(e.as("s")), h = f(e.as("m")), i = f(e.as("h")), j = f(e.as("d")), k = f(e.as("M")), l = f(e.as("y")), m = g < X.s && ["s", g] || h === 1 && ["m"] || h < X.m && ["mm", h] || i === 1 && ["h"] || i < X.h && ["hh", i] || j === 1 && ["d"] || j < X.d && ["dd", j] || k === 1 && ["M"] || k < X.M && ["MM", k] || l === 1 && ["y"] || ["yy", l];
        return m[2] = c, m[3] = +a > 0, m[4] = d, fc.apply({}, m);
    }
    function hc(a, c, d) {
        var e = d - c, f = d - a.day(), g;
        return f > e && (f -= 7), f < e - 7 && (f += 7), g = b(a).add(f, "d"), {
            week: Math.ceil(g.dayOfYear() / 7),
            year: g.year()
        };
    }
    function ic(a, b, c, d, e) {
        var f = dc(a, 0, 1).getUTCDay(), g, h;
        return f = f === 0 ? 7 : f, c = c != null ? c : e, g = e - f + (f > d ? 7 : 0) - (f < e ? 7 : 0), h = 7 * (b - 1) + (c - e) + g + 1, {
            year: h > 0 ? a : a - 1,
            dayOfYear: h > 0 ? h : Db(a - 1) + h
        };
    }
    function jc(c) {
        var d = c._i, e = c._f, f;
        return c._locale = c._locale || b.localeData(c._l), d === null || e === a && d === "" ? b.invalid({
            nullInput: !0
        }) : (typeof d == "string" && (c._i = d = c._locale.preparse(d)), b.isMoment(d) ? new kb(d, !0) : (e ? ub(e) ? Zb(c) : Wb(c) : bc(c), f = new kb(c), f._nextDay && (f.add(1, "d"), f._nextDay = a), f));
    }
    function kc(a, c) {
        var d, e;
        c.length === 1 && ub(c[0]) && (c = c[0]);
        if (!c.length) return b();
        d = c[0];
        for (e = 1; e < c.length; ++e) c[e][a](d) && (d = c[e]);
        return d;
    }
    function lc(a, b) {
        var c;
        if (typeof b == "string") {
            b = a.localeData().monthsParse(b);
            if (typeof b != "number") return a;
        }
        return c = Math.min(a.date(), Bb(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a;
    }
    function mc(a, b) {
        return a._d["get" + (a._isUTC ? "UTC" : "") + b]();
    }
    function nc(a, b, c) {
        return b === "Month" ? lc(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
    }
    function oc(a, c) {
        return function (d) {
            return d != null ? (nc(this, a, d), b.updateOffset(this, c), this) : mc(this, a);
        };
    }
    function pc(a) {
        return a * 400 / 146097;
    }
    function qc(a) {
        return a * 146097 / 400;
    }
    function rc(a) {
        b.duration.fn[a] = function () {
            return this._data[a];
        };
    }
    function sc(a) {
        if (typeof ender != "undefined") return;
        e = d.moment, a ? d.moment = fb("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", b) : d.moment = b;
    }
    var b, c = "2.8.4", d = typeof global != "undefined" ? global : this, e, f = Math.round, g = Object.prototype.hasOwnProperty, h, i = 0, j = 1, k = 2, l = 3, m = 4, n = 5, o = 6, p = {}, q = [], r = typeof module != "undefined" && module && module.exports, s = /^\/?Date\((\-?\d+)/i, t = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, u = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, v = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, w = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, x = /\d\d?/, y = /\d{1,3}/, z = /\d{1,4}/, A = /[+\-]?\d{1,6}/, B = /\d+/, C = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, D = /Z|[\+\-]\d\d:?\d\d/gi, E = /T/i, F = /[\+\-]?\d+/, G = /[\+\-]?\d+(\.\d{1,3})?/, H = /\d/, I = /\d\d/, J = /\d{3}/, K = /\d{4}/, L = /[+-]?\d{6}/, M = /[+-]?\d+/, N = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, O = "YYYY-MM-DDTHH:mm:ssZ", P = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], Q = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], R = /([\+\-]|\d\d)/gi, S = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), T = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, U = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, V = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, W = {}, X = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, Y = "DDD w W M D d".split(" "), Z = "M D H h m s w W".split(" "), $ = {
        M: function () {
            return this.month() + 1;
        },
        MMM: function (a) {
            return this.localeData().monthsShort(this, a);
        },
        MMMM: function (a) {
            return this.localeData().months(this, a);
        },
        D: function () {
            return this.date();
        },
        DDD: function () {
            return this.dayOfYear();
        },
        d: function () {
            return this.day();
        },
        dd: function (a) {
            return this.localeData().weekdaysMin(this, a);
        },
        ddd: function (a) {
            return this.localeData().weekdaysShort(this, a);
        },
        dddd: function (a) {
            return this.localeData().weekdays(this, a);
        },
        w: function () {
            return this.week();
        },
        W: function () {
            return this.isoWeek();
        },
        YY: function () {
            return pb(this.year() % 100, 2);
        },
        YYYY: function () {
            return pb(this.year(), 4);
        },
        YYYYY: function () {
            return pb(this.year(), 5);
        },
        YYYYYY: function () {
            var a = this.year(), b = a >= 0 ? "+" : "-";
            return b + pb(Math.abs(a), 6);
        },
        gg: function () {
            return pb(this.weekYear() % 100, 2);
        },
        gggg: function () {
            return pb(this.weekYear(), 4);
        },
        ggggg: function () {
            return pb(this.weekYear(), 5);
        },
        GG: function () {
            return pb(this.isoWeekYear() % 100, 2);
        },
        GGGG: function () {
            return pb(this.isoWeekYear(), 4);
        },
        GGGGG: function () {
            return pb(this.isoWeekYear(), 5);
        },
        e: function () {
            return this.weekday();
        },
        E: function () {
            return this.isoWeekday();
        },
        a: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !0);
        },
        A: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !1);
        },
        H: function () {
            return this.hours();
        },
        h: function () {
            return this.hours() % 12 || 12;
        },
        m: function () {
            return this.minutes();
        },
        s: function () {
            return this.seconds();
        },
        S: function () {
            return Ab(this.milliseconds() / 100);
        },
        SS: function () {
            return pb(Ab(this.milliseconds() / 10), 2);
        },
        SSS: function () {
            return pb(this.milliseconds(), 3);
        },
        SSSS: function () {
            return pb(this.milliseconds(), 3);
        },
        Z: function () {
            var a = -this.zone(), b = "+";
            return a < 0 && (a = -a, b = "-"), b + pb(Ab(a / 60), 2) + ":" + pb(Ab(a) % 60, 2);
        },
        ZZ: function () {
            var a = -this.zone(), b = "+";
            return a < 0 && (a = -a, b = "-"), b + pb(Ab(a / 60), 2) + pb(Ab(a) % 60, 2);
        },
        z: function () {
            return this.zoneAbbr();
        },
        zz: function () {
            return this.zoneName();
        },
        x: function () {
            return this.valueOf();
        },
        X: function () {
            return this.unix();
        },
        Q: function () {
            return this.quarter();
        }
    }, _ = {}, ab = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];
    while (Y.length) h = Y.pop(), $[h + "o"] = ib($[h], h);
    while (Z.length) h = Z.pop(), $[h + h] = hb($[h], 2);
    $.DDDD = hb($.DDD, 3), mb(jb.prototype, {
        set: function (a) {
            var b, c;
            for (c in a) b = a[c], typeof b == "function" ? this[c] = b : this["_" + c] = b;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function (a) {
            return this._months[a.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function (a) {
            return this._monthsShort[a.month()];
        },
        monthsParse: function (a, c, d) {
            var e, f, g;
            this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []);
            for (e = 0; e < 12; e++) {
                f = b.utc([2e3, e]), d && !this._longMonthsParse[e] && (this._longMonthsParse[e] = new RegExp("^" + this.months(f, "").replace(".", "") + "$", "i"), this._shortMonthsParse[e] = new RegExp("^" + this.monthsShort(f, "").replace(".", "") + "$", "i")), !d && !this._monthsParse[e] && (g = "^" + this.months(f, "") + "|^" + this.monthsShort(f, ""), this._monthsParse[e] = new RegExp(g.replace(".", ""), "i"));
                if (d && c === "MMMM" && this._longMonthsParse[e].test(a)) return e;
                if (d && c === "MMM" && this._shortMonthsParse[e].test(a)) return e;
                if (!d && this._monthsParse[e].test(a)) return e;
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function (a) {
            return this._weekdays[a.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function (a) {
            return this._weekdaysShort[a.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function (a) {
            return this._weekdaysMin[a.day()];
        },
        weekdaysParse: function (a) {
            var c, d, e;
            this._weekdaysParse || (this._weekdaysParse = []);
            for (c = 0; c < 7; c++) {
                this._weekdaysParse[c] || (d = b([2e3, 1]).day(c), e = "^" + this.weekdays(d, "") + "|^" + this.weekdaysShort(d, "") + "|^" + this.weekdaysMin(d, ""), this._weekdaysParse[c] = new RegExp(e.replace(".", ""), "i"));
                if (this._weekdaysParse[c].test(a)) return c;
            }
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function (a) {
            var b = this._longDateFormat[a];
            return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (a) {
                return a.slice(1);
            }), this._longDateFormat[a] = b), b;
        },
        isPM: function (a) {
            return (a + "").toLowerCase().charAt(0) === "p";
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function (a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function (a, b, c) {
            var d = this._calendar[a];
            return typeof d == "function" ? d.apply(b, [c]) : d;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function (a, b, c, d) {
            var e = this._relativeTime[c];
            return typeof e == "function" ? e(a, b, c, d) : e.replace(/%d/i, a);
        },
        pastFuture: function (a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return typeof c == "function" ? c(b) : c.replace(/%s/i, b);
        },
        ordinal: function (a) {
            return this._ordinal.replace("%d", a);
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function (a) {
            return a;
        },
        postformat: function (a) {
            return a;
        },
        week: function (a) {
            return hc(a, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function () {
            return this._invalidDate;
        }
    }), b = function (b, c, d, e) {
        var f;
        return typeof d == "boolean" && (e = d, d = a), f = {}, f._isAMomentObject = !0, f._i = b, f._f = c, f._l = d, f._strict = e, f._isUTC = !1, f._pf = db(), jc(f);
    }, b.suppressDeprecationWarnings = !1, b.createFromInputFallback = fb("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
    }), b.min = function () {
        var a = [].slice.call(arguments, 0);
        return kc("isBefore", a);
    }, b.max = function () {
        var a = [].slice.call(arguments, 0);
        return kc("isAfter", a);
    }, b.utc = function (b, c, d, e) {
        var f;
        return typeof d == "boolean" && (e = d, d = a), f = {}, f._isAMomentObject = !0, f._useUTC = !0, f._isUTC = !0, f._l = d, f._i = b, f._f = c, f._strict = e, f._pf = db(), jc(f).utc();
    }, b.unix = function (a) {
        return b(a * 1e3);
    }, b.duration = function (a, c) {
        var d = a, e = null, f, g, h, i;
        return b.isDuration(a) ? d = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : typeof a == "number" ? (d = {}, c ? d[c] = a : d.milliseconds = a) : (e = t.exec(a)) ? (f = e[1] === "-" ? -1 : 1, d = {
            y: 0,
            d: Ab(e[k]) * f,
            h: Ab(e[l]) * f,
            m: Ab(e[m]) * f,
            s: Ab(e[n]) * f,
            ms: Ab(e[o]) * f
        }) : (e = u.exec(a)) ? (f = e[1] === "-" ? -1 : 1, h = function (a) {
            var b = a && parseFloat(a.replace(",", "."));
            return (isNaN(b) ? 0 : b) * f;
        }, d = {
            y: h(e[2]),
            M: h(e[3]),
            d: h(e[4]),
            h: h(e[5]),
            m: h(e[6]),
            s: h(e[7]),
            w: h(e[8])
        }) : typeof d == "object" && ("from" in d || "to" in d) && (i = rb(b(d.from), b(d.to)), d = {}, d.ms = i.milliseconds, d.M = i.months), g = new lb(d), b.isDuration(a) && cb(a, "_locale") && (g._locale = a._locale), g;
    }, b.version = c, b.defaultFormat = O, b.ISO_8601 = function () { }, b.momentProperties = q, b.updateOffset = function () { }, b.relativeTimeThreshold = function (b, c) {
        return X[b] === a ? !1 : c === a ? X[b] : (X[b] = c, !0);
    }, b.lang = fb("moment.lang is deprecated. Use moment.locale instead.", function (a, c) {
        return b.locale(a, c);
    }), b.locale = function (a, c) {
        var d;
        return a && (typeof c != "undefined" ? d = b.defineLocale(a, c) : d = b.localeData(a), d && (b.duration._locale = b._locale = d)), b._locale._abbr;
    }, b.defineLocale = function (a, c) {
        return c !== null ? (c.abbr = a, p[a] || (p[a] = new jb), p[a].set(c), b.locale(a), p[a]) : (delete p[a], null);
    }, b.langData = fb("moment.langData is deprecated. Use moment.localeData instead.", function (a) {
        return b.localeData(a);
    }), b.localeData = function (a) {
        var c;
        a && a._locale && a._locale._abbr && (a = a._locale._abbr);
        if (!a) return b._locale;
        if (!ub(a)) {
            c = Jb(a);
            if (c) return c;
            a = [a];
        }
        return Ib(a);
    }, b.isMoment = function (a) {
        return a instanceof kb || a != null && cb(a, "_isAMomentObject");
    }, b.isDuration = function (a) {
        return a instanceof lb;
    };
    for (h = ab.length - 1; h >= 0; --h) zb(ab[h]);
    b.normalizeUnits = function (a) {
        return xb(a);
    }, b.invalid = function (a) {
        var c = b.utc(NaN);
        return a != null ? mb(c._pf, a) : c._pf.userInvalidated = !0, c;
    }, b.parseZone = function () {
        return b.apply(null, arguments).parseZone();
    }, b.parseTwoDigitYear = function (a) {
        return Ab(a) + (Ab(a) > 68 ? 1900 : 2e3);
    }, mb(b.fn = kb.prototype, {
        clone: function () {
            return b(this);
        },
        valueOf: function () {
            return +this._d + (this._offset || 0) * 6e4;
        },
        unix: function () {
            return Math.floor(+this / 1e3);
        },
        toString: function () {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function () {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function () {
            var a = b(this).utc();
            return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : Nb(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : Nb(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        },
        toArray: function () {
            var a = this;
            return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()];
        },
        isValid: function () {
            return Gb(this);
        },
        isDSTShifted: function () {
            return this._a ? this.isValid() && wb(this._a, (this._isUTC ? b.utc(this._a) : b(this._a)).toArray()) > 0 : !1;
        },
        parsingFlags: function () {
            return mb({}, this._pf);
        },
        invalidAt: function () {
            return this._pf.overflow;
        },
        utc: function (a) {
            return this.zone(0, a);
        },
        local: function (a) {
            return this._isUTC && (this.zone(0, a), this._isUTC = !1, a && this.add(this._dateTzOffset(), "m")), this;
        },
        format: function (a) {
            var c = Nb(this, a || b.defaultFormat);
            return this.localeData().postformat(c);
        },
        add: sb(1, "add"),
        subtract: sb(-1, "subtract"),
        diff: function (a, c, d) {
            var e = Kb(a, this), f = (this.zone() - e.zone()) * 6e4, g, h, i;
            return c = xb(c), c === "year" || c === "month" ? (g = (this.daysInMonth() + e.daysInMonth()) * 432e5, h = (this.year() - e.year()) * 12 + (this.month() - e.month()), i = this - b(this).startOf("month") - (e - b(e).startOf("month")), i -= (this.zone() - b(this).startOf("month").zone() - (e.zone() - b(e).startOf("month").zone())) * 6e4, h += i / g, c === "year" && (h /= 12)) : (g = this - e, h = c === "second" ? g / 1e3 : c === "minute" ? g / 6e4 : c === "hour" ? g / 36e5 : c === "day" ? (g - f) / 864e5 : c === "week" ? (g - f) / 6048e5 : g), d ? h : ob(h);
        },
        from: function (a, c) {
            return b.duration({
                to: this,
                from: a
            }).locale(this.locale()).humanize(!c);
        },
        fromNow: function (a) {
            return this.from(b(), a);
        },
        calendar: function (a) {
            var c = a || b(), d = Kb(c, this).startOf("day"), e = this.diff(d, "days", !0), f = e < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(f, this, b(c)));
        },
        isLeapYear: function () {
            return Eb(this.year());
        },
        isDST: function () {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
        },
        day: function (a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return a != null ? (a = ec(a, this.localeData()), this.add(a - b, "d")) : b;
        },
        month: oc("Month", !0),
        startOf: function (a) {
            a = xb(a);
            switch (a) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0);
            }
            return a === "week" ? this.weekday(0) : a === "isoWeek" && this.isoWeekday(1), a === "quarter" && this.month(Math.floor(this.month() / 3) * 3), this;
        },
        endOf: function (b) {
            return b = xb(b), b === a || b === "millisecond" ? this : this.startOf(b).add(1, b === "isoWeek" ? "week" : b).subtract(1, "ms");
        },
        isAfter: function (a, c) {
            var d;
            return c = xb(typeof c != "undefined" ? c : "millisecond"), c === "millisecond" ? (a = b.isMoment(a) ? a : b(a), +this > +a) : (d = b.isMoment(a) ? +a : +b(a), d < +this.clone().startOf(c));
        },
        isBefore: function (a, c) {
            var d;
            return c = xb(typeof c != "undefined" ? c : "millisecond"), c === "millisecond" ? (a = b.isMoment(a) ? a : b(a), +this < +a) : (d = b.isMoment(a) ? +a : +b(a), +this.clone().endOf(c) < d);
        },
        isSame: function (a, c) {
            var d;
            return c = xb(c || "millisecond"), c === "millisecond" ? (a = b.isMoment(a) ? a : b(a), +this === +a) : (d = +b(a), +this.clone().startOf(c) <= d && d <= +this.clone().endOf(c));
        },
        min: fb("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (a) {
            return a = b.apply(null, arguments), a < this ? this : a;
        }),
        max: fb("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (a) {
            return a = b.apply(null, arguments), a > this ? this : a;
        }),
        zone: function (a, c) {
            var d = this._offset || 0, e;
            return a == null ? this._isUTC ? d : this._dateTzOffset() : (typeof a == "string" && (a = Qb(a)), Math.abs(a) < 16 && (a *= 60), !this._isUTC && c && (e = this._dateTzOffset()), this._offset = a, this._isUTC = !0, e != null && this.subtract(e, "m"), d !== a && (!c || this._changeInProgress ? tb(this, b.duration(d - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, b.updateOffset(this, !0), this._changeInProgress = null)), this);
        },
        zoneAbbr: function () {
            return this._isUTC ? "UTC" : "";
        },
        zoneName: function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },
        parseZone: function () {
            return this._tzm ? this.zone(this._tzm) : typeof this._i == "string" && this.zone(this._i), this;
        },
        hasAlignedHourOffset: function (a) {
            return a ? a = b(a).zone() : a = 0, (this.zone() - a) % 60 === 0;
        },
        daysInMonth: function () {
            return Bb(this.year(), this.month());
        },
        dayOfYear: function (a) {
            var c = f((b(this).startOf("day") - b(this).startOf("year")) / 864e5) + 1;
            return a == null ? c : this.add(a - c, "d");
        },
        quarter: function (a) {
            return a == null ? Math.ceil((this.month() + 1) / 3) : this.month((a - 1) * 3 + this.month() % 3);
        },
        weekYear: function (a) {
            var b = hc(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return a == null ? b : this.add(a - b, "y");
        },
        isoWeekYear: function (a) {
            var b = hc(this, 1, 4).year;
            return a == null ? b : this.add(a - b, "y");
        },
        week: function (a) {
            var b = this.localeData().week(this);
            return a == null ? b : this.add((a - b) * 7, "d");
        },
        isoWeek: function (a) {
            var b = hc(this, 1, 4).week;
            return a == null ? b : this.add((a - b) * 7, "d");
        },
        weekday: function (a) {
            var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return a == null ? b : this.add(a - b, "d");
        },
        isoWeekday: function (a) {
            return a == null ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
        },
        isoWeeksInYear: function () {
            return Cb(this.year(), 1, 4);
        },
        weeksInYear: function () {
            var a = this.localeData()._week;
            return Cb(this.year(), a.dow, a.doy);
        },
        get: function (a) {
            return a = xb(a), this[a]();
        },
        set: function (a, b) {
            return a = xb(a), typeof this[a] == "function" && this[a](b), this;
        },
        locale: function (c) {
            var d;
            return c === a ? this._locale._abbr : (d = b.localeData(c), d != null && (this._locale = d), this);
        },
        lang: fb("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (b) {
            return b === a ? this.localeData() : this.locale(b);
        }),
        localeData: function () {
            return this._locale;
        },
        _dateTzOffset: function () {
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    }), b.fn.millisecond = b.fn.milliseconds = oc("Milliseconds", !1), b.fn.second = b.fn.seconds = oc("Seconds", !1), b.fn.minute = b.fn.minutes = oc("Minutes", !1), b.fn.hour = b.fn.hours = oc("Hours", !0), b.fn.date = oc("Date", !0), b.fn.dates = fb("dates accessor is deprecated. Use date instead.", oc("Date", !0)), b.fn.year = oc("FullYear", !0), b.fn.years = fb("years accessor is deprecated. Use year instead.", oc("FullYear", !0)), b.fn.days = b.fn.day, b.fn.months = b.fn.month, b.fn.weeks = b.fn.week, b.fn.isoWeeks = b.fn.isoWeek, b.fn.quarters = b.fn.quarter, b.fn.toJSON = b.fn.toISOString, mb(b.duration.fn = lb.prototype, {
        _bubble: function () {
            var a = this._milliseconds, b = this._days, c = this._months, d = this._data, e, f, g, h = 0;
            d.milliseconds = a % 1e3, e = ob(a / 1e3), d.seconds = e % 60, f = ob(e / 60), d.minutes = f % 60, g = ob(f / 60), d.hours = g % 24, b += ob(g / 24), h = ob(pc(b)), b -= ob(qc(h)), c += ob(b / 30), b %= 30, h += ob(c / 12), c %= 12, d.days = b, d.months = c, d.years = h;
        },
        abs: function () {
            return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this;
        },
        weeks: function () {
            return ob(this.days() / 7);
        },
        valueOf: function () {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + Ab(this._months / 12) * 31536e6;
        },
        humanize: function (a) {
            var b = gc(this, !a, this.localeData());
            return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b);
        },
        add: function (a, c) {
            var d = b.duration(a, c);
            return this._milliseconds += d._milliseconds, this._days += d._days, this._months += d._months, this._bubble(), this;
        },
        subtract: function (a, c) {
            var d = b.duration(a, c);
            return this._milliseconds -= d._milliseconds, this._days -= d._days, this._months -= d._months, this._bubble(), this;
        },
        get: function (a) {
            return a = xb(a), this[a.toLowerCase() + "s"]();
        },
        as: function (a) {
            var b, c;
            a = xb(a);
            if (a === "month" || a === "year") return b = this._days + this._milliseconds / 864e5, c = this._months + pc(b) * 12, a === "month" ? c : c / 12;
            b = this._days + Math.round(qc(this._months / 12));
            switch (a) {
                case "week":
                    return b / 7 + this._milliseconds / 6048e5;
                case "day":
                    return b + this._milliseconds / 864e5;
                case "hour":
                    return b * 24 + this._milliseconds / 36e5;
                case "minute":
                    return b * 24 * 60 + this._milliseconds / 6e4;
                case "second":
                    return b * 24 * 60 * 60 + this._milliseconds / 1e3;
                case "millisecond":
                    return Math.floor(b * 24 * 60 * 60 * 1e3) + this._milliseconds;
                default:
                    throw new Error("Unknown unit " + a);
            }
        },
        lang: b.fn.lang,
        locale: b.fn.locale,
        toIsoString: fb("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
            return this.toISOString();
        }),
        toISOString: function () {
            var a = Math.abs(this.years()), b = Math.abs(this.months()), c = Math.abs(this.days()), d = Math.abs(this.hours()), e = Math.abs(this.minutes()), f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D";
        },
        localeData: function () {
            return this._locale;
        }
    }), b.duration.fn.toString = b.duration.fn.toISOString;
    for (h in T) cb(T, h) && rc(h.toLowerCase());
    b.duration.fn.asMilliseconds = function () {
        return this.as("ms");
    }, b.duration.fn.asSeconds = function () {
        return this.as("s");
    }, b.duration.fn.asMinutes = function () {
        return this.as("m");
    }, b.duration.fn.asHours = function () {
        return this.as("h");
    }, b.duration.fn.asDays = function () {
        return this.as("d");
    }, b.duration.fn.asWeeks = function () {
        return this.as("weeks");
    }, b.duration.fn.asMonths = function () {
        return this.as("M");
    }, b.duration.fn.asYears = function () {
        return this.as("y");
    }, b.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (a) {
            var b = a % 10, c = Ab(a % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return a + c;
        }
    }), r ? module.exports = b : typeof define == "function" && define.amd ? (define("moment", function (a, c, f) {
        return f.config && f.config() && f.config().noGlobal === !0 && (d.moment = e), b;
    }), sc(!0)) : sc();
}.call(this), function (a, b) {
    var c;
    a.rails = c = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input:file",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function (b) {
            var c = a('meta[name="csrf-token"]').attr("content");
            c && b.setRequestHeader("X-CSRF-Token", c);
        },
        fire: function (b, c, d) {
            var e = a.Event(c);
            return b.trigger(e, d), e.result !== !1;
        },
        confirm: function (a) {
            return confirm(a);
        },
        ajax: function (b) {
            return a.ajax(b);
        },
        href: function (a) {
            return a.attr("href");
        },
        handleRemote: function (d) {
            var e, f, g, h, i, j;
            if (c.fire(d, "ajax:before")) {
                h = d.data("cross-domain") || null, i = d.data("type") || a.ajaxSettings && a.ajaxSettings.dataType;
                if (d.is("form")) {
                    e = d.attr("method"), f = d.attr("action"), g = d.serializeArray();
                    var k = d.data("ujs:submit-button");
                    k && (g.push(k), d.data("ujs:submit-button", null));
                } else d.is(c.inputChangeSelector) ? (e = d.data("method"), f = d.data("url"), g = d.serialize(), d.data("params") && (g = g + "&" + d.data("params"))) : (e = d.data("method"), f = c.href(d), g = d.data("params") || null);
                return j = {
                    type: e || "GET",
                    data: g,
                    dataType: i,
                    crossDomain: h,
                    beforeSend: function (a, e) {
                        return e.dataType === b && a.setRequestHeader("accept", "*/*;q=0.5, " + e.accepts.script), c.fire(d, "ajax:beforeSend", [a, e]);
                    },
                    success: function (a, b, c) {
                        d.trigger("ajax:success", [a, b, c]);
                    },
                    complete: function (a, b) {
                        d.trigger("ajax:complete", [a, b]);
                    },
                    error: function (a, b, c) {
                        d.trigger("ajax:error", [a, b, c]);
                    }
                }, f && (j.url = f), c.ajax(j);
            }
            return !1;
        },
        handleMethod: function (d) {
            var e = c.href(d), f = d.data("method"), g = d.attr("target"), h = a("meta[name=csrf-token]").attr("content"), i = a("meta[name=csrf-param]").attr("content"), j = a('<form method="post" action="' + e + '"></form>'), k = '<input name="_method" value="' + f + '" type="hidden" />';
            i !== b && h !== b && (k += '<input name="' + i + '" value="' + h + '" type="hidden" />'), g && j.attr("target", g), j.hide().append(k).appendTo("body"), j.submit();
        },
        disableFormElements: function (b) {
            b.find(c.disableSelector).each(function () {
                var b = a(this), c = b.is("button") ? "html" : "val";
                b.data("ujs:enable-with", b[c]()), b[c](b.data("disable-with")), b.prop("disabled", !0);
            });
        },
        enableFormElements: function (b) {
            b.find(c.enableSelector).each(function () {
                var b = a(this), c = b.is("button") ? "html" : "val";
                b.data("ujs:enable-with") && b[c](b.data("ujs:enable-with")), b.prop("disabled", !1);
            });
        },
        allowAction: function (a) {
            var b = a.data("confirm"), d = !1, e;
            return b ? (c.fire(a, "confirm") && (d = c.confirm(b), e = c.fire(a, "confirm:complete", [d])), d && e) : !0;
        },
        blankInputs: function (b, c, d) {
            var e = a(), f, g = c || "input,textarea";
            return b.find(g).each(function () {
                f = a(this);
                if (d ? f.val() : !f.val()) e = e.add(f);
            }), e.length ? e : !1;
        },
        nonBlankInputs: function (a, b) {
            return c.blankInputs(a, b, !0);
        },
        stopEverything: function (b) {
            return a(b.target).trigger("ujs:everythingStopped"), b.stopImmediatePropagation(), !1;
        },
        callFormSubmitBindings: function (c, d) {
            var e = c.data("events"), f = !0;
            return e !== b && e.submit !== b && a.each(e.submit, function (a, b) {
                if (typeof b.handler == "function") return f = b.handler(d);
            }), f;
        },
        disableElement: function (a) {
            a.data("ujs:enable-with", a.html()), a.html(a.data("disable-with")), a.bind("click.railsDisable", function (a) {
                return c.stopEverything(a);
            });
        },
        enableElement: function (a) {
            a.data("ujs:enable-with") !== b && (a.html(a.data("ujs:enable-with")), a.data("ujs:enable-with", !1)), a.unbind("click.railsDisable");
        }
    }, a.ajaxPrefilter(function (a, b, d) {
        a.crossDomain || c.CSRFProtection(d);
    }), a(document).delegate(c.linkDisableSelector, "ajax:complete", function () {
        c.enableElement(a(this));
    }), a(document).delegate(c.linkClickSelector, "click.rails", function (d) {
        var e = a(this), f = e.data("method"), g = e.data("params");
        if (!c.allowAction(e)) return c.stopEverything(d);
        e.is(c.linkDisableSelector) && c.disableElement(e);
        if (e.data("remote") !== b) return (d.metaKey || d.ctrlKey) && (!f || f === "GET") && !g ? !0 : (c.handleRemote(e) === !1 && c.enableElement(e), !1);
        if (e.data("method")) return c.handleMethod(e), !1;
    }), a(document).delegate(c.inputChangeSelector, "change.rails", function (b) {
        var d = a(this);
        return c.allowAction(d) ? (c.handleRemote(d), !1) : c.stopEverything(b);
    }), a(document).delegate(c.formSubmitSelector, "submit.rails", function (d) {
        var e = a(this), f = e.data("remote") !== b, g = c.blankInputs(e, c.requiredInputSelector), h = c.nonBlankInputs(e, c.fileInputSelector);
        if (!c.allowAction(e)) return c.stopEverything(d);
        if (g && e.attr("novalidate") == b && c.fire(e, "ajax:aborted:required", [g])) return c.stopEverything(d);
        if (f) return h ? c.fire(e, "ajax:aborted:file", [h]) : !a.support.submitBubbles && a().jquery < "1.7" && c.callFormSubmitBindings(e, d) === !1 ? c.stopEverything(d) : (c.handleRemote(e), !1);
        setTimeout(function () {
            c.disableFormElements(e);
        }, 13);
    }), a(document).delegate(c.formInputClickSelector, "click.rails", function (b) {
        var d = a(this);
        if (!c.allowAction(d)) return c.stopEverything(b);
        var e = d.attr("name"), f = e ? {
            name: e,
            value: d.val()
        } : null;
        d.closest("form").data("ujs:submit-button", f);
    }), a(document).delegate(c.formSubmitSelector, "ajax:beforeSend.rails", function (b) {
        this == b.target && c.disableFormElements(a(this));
    }), a(document).delegate(c.formSubmitSelector, "ajax:complete.rails", function (b) {
        this == b.target && c.enableFormElements(a(this));
    });
}(jQuery), function () {
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function (a) {
        if (a instanceof x) return a;
        if (!(this instanceof x)) return new x(a);
        this._wrapped = a;
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.6.0";
    var y = x.each = x.forEach = function (a, b, d) {
        if (a == null) return a;
        if (l && a.forEach === l) a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; e < f; e++) if (b.call(d, a[e], e, a) === c) return;
        } else {
            var g = x.keys(a);
            for (var e = 0, f = g.length; e < f; e++) if (b.call(d, a[g[e]], g[e], a) === c) return;
        }
        return a;
    };
    x.map = x.collect = function (a, b, c) {
        var d = [];
        return a == null ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
            d.push(b.call(c, a, e, f));
        }), d);
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function (a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (n && a.reduce === n) return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        y(a, function (a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
        });
        if (!e) throw new TypeError(z);
        return c;
    }, x.reduceRight = x.foldr = function (a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (o && a.reduceRight === o) return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length;
        }
        y(a, function (h, i, j) {
            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0);
        });
        if (!e) throw new TypeError(z);
        return c;
    }, x.find = x.detect = function (a, b, c) {
        var d;
        return A(a, function (a, e, f) {
            if (b.call(c, a, e, f)) return d = a, !0;
        }), d;
    }, x.filter = x.select = function (a, b, c) {
        var d = [];
        return a == null ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
            b.call(c, a, e, f) && d.push(a);
        }), d);
    }, x.reject = function (a, b, c) {
        return x.filter(a, function (a, d, e) {
            return !b.call(c, a, d, e);
        }, c);
    }, x.every = x.all = function (a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return a == null ? e : q && a.every === q ? a.every(b, d) : (y(a, function (a, f, g) {
            if (!(e = e && b.call(d, a, f, g))) return c;
        }), !!e);
    };
    var A = x.some = x.any = function (a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return a == null ? e : r && a.some === r ? a.some(b, d) : (y(a, function (a, f, g) {
            if (e || (e = b.call(d, a, f, g))) return c;
        }), !!e);
    };
    x.contains = x.include = function (a, b) {
        return a == null ? !1 : s && a.indexOf === s ? a.indexOf(b) != -1 : A(a, function (a) {
            return a === b;
        });
    }, x.invoke = function (a, b) {
        var c = h.call(arguments, 2), d = x.isFunction(b);
        return x.map(a, function (a) {
            return (d ? b : a[b]).apply(a, c);
        });
    }, x.pluck = function (a, b) {
        return x.map(a, x.property(b));
    }, x.where = function (a, b) {
        return x.filter(a, x.matches(b));
    }, x.findWhere = function (a, b) {
        return x.find(a, x.matches(b));
    }, x.max = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
        var d = -Infinity, e = -Infinity;
        return y(a, function (a, f, g) {
            var h = b ? b.call(c, a, f, g) : a;
            h > e && (d = a, e = h);
        }), d;
    }, x.min = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
        var d = Infinity, e = Infinity;
        return y(a, function (a, f, g) {
            var h = b ? b.call(c, a, f, g) : a;
            h < e && (d = a, e = h);
        }), d;
    }, x.shuffle = function (a) {
        var b, c = 0, d = [];
        return y(a, function (a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a;
        }), d;
    }, x.sample = function (a, b, c) {
        return b == null || c ? (a.length !== +a.length && (a = x.values(a)), a[x.random(a.length - 1)]) : x.shuffle(a).slice(0, Math.max(0, b));
    };
    var B = function (a) {
        return a == null ? x.identity : x.isFunction(a) ? a : x.property(a);
    };
    x.sortBy = function (a, b, c) {
        return b = B(b), x.pluck(x.map(a, function (a, d, e) {
            return {
                value: a,
                index: d,
                criteria: b.call(c, a, d, e)
            };
        }).sort(function (a, b) {
            var c = a.criteria, d = b.criteria;
            if (c !== d) {
                if (c > d || c === void 0) return 1;
                if (c < d || d === void 0) return -1;
            }
            return a.index - b.index;
        }), "value");
    };
    var C = function (a) {
        return function (b, c, d) {
            var e = {};
            return c = B(c), y(b, function (f, g) {
                var h = c.call(d, f, g, b);
                a(e, h, f);
            }), e;
        };
    };
    x.groupBy = C(function (a, b, c) {
        x.has(a, b) ? a[b].push(c) : a[b] = [c];
    }), x.indexBy = C(function (a, b, c) {
        a[b] = c;
    }), x.countBy = C(function (a, b) {
        x.has(a, b) ? a[b]++ : a[b] = 1;
    }), x.sortedIndex = function (a, b, c, d) {
        c = B(c);
        var e = c.call(d, b), f = 0, g = a.length;
        while (f < g) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h;
        }
        return f;
    }, x.toArray = function (a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [];
    }, x.size = function (a) {
        return a == null ? 0 : a.length === +a.length ? a.length : x.keys(a).length;
    }, x.first = x.head = x.take = function (a, b, c) {
        return a == null ? void 0 : b == null || c ? a[0] : b < 0 ? [] : h.call(a, 0, b);
    }, x.initial = function (a, b, c) {
        return h.call(a, 0, a.length - (b == null || c ? 1 : b));
    }, x.last = function (a, b, c) {
        return a == null ? void 0 : b == null || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0));
    }, x.rest = x.tail = x.drop = function (a, b, c) {
        return h.call(a, b == null || c ? 1 : b);
    }, x.compact = function (a) {
        return x.filter(a, x.identity);
    };
    var D = function (a, b, c) {
        return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function (a) {
            x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a);
        }), c);
    };
    x.flatten = function (a, b) {
        return D(a, b, []);
    }, x.without = function (a) {
        return x.difference(a, h.call(arguments, 1));
    }, x.partition = function (a, b) {
        var c = [], d = [];
        return y(a, function (a) {
            (b(a) ? c : d).push(a);
        }), [c, d];
    }, x.uniq = x.unique = function (a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a, f = [], g = [];
        return y(e, function (c, d) {
            if (b ? !d || g[g.length - 1] !== c : !x.contains(g, c)) g.push(c), f.push(a[d]);
        }), f;
    }, x.union = function () {
        return x.uniq(x.flatten(arguments, !0));
    }, x.intersection = function (a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function (a) {
            return x.every(b, function (b) {
                return x.contains(b, a);
            });
        });
    }, x.difference = function (a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function (a) {
            return !x.contains(b, a);
        });
    }, x.zip = function () {
        var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a);
        for (var c = 0; c < a; c++) b[c] = x.pluck(arguments, "" + c);
        return b;
    }, x.object = function (a, b) {
        if (a == null) return {};
        var c = {};
        for (var d = 0, e = a.length; d < e; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c;
    }, x.indexOf = function (a, b, c) {
        if (a == null) return -1;
        var d = 0, e = a.length;
        if (c) {
            if (typeof c != "number") return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = c < 0 ? Math.max(0, e + c) : c;
        }
        if (s && a.indexOf === s) return a.indexOf(b, c);
        for (; d < e; d++) if (a[d] === b) return d;
        return -1;
    }, x.lastIndexOf = function (a, b, c) {
        if (a == null) return -1;
        var d = c != null;
        if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        var e = d ? c : a.length;
        while (e--) if (a[e] === b) return e;
        return -1;
    }, x.range = function (a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d);
        while (e < d) f[e++] = a, a += c;
        return f;
    };
    var E = function () { };
    x.bind = function (a, b) {
        var c, d;
        if (w && a.bind === w) return w.apply(a, h.call(arguments, 1));
        if (!x.isFunction(a)) throw new TypeError;
        return c = h.call(arguments, 2), d = function () {
            if (this instanceof d) {
                E.prototype = a.prototype;
                var e = new E;
                E.prototype = null;
                var f = a.apply(e, c.concat(h.call(arguments)));
                return Object(f) === f ? f : e;
            }
            return a.apply(b, c.concat(h.call(arguments)));
        };
    }, x.partial = function (a) {
        var b = h.call(arguments, 1);
        return function () {
            var c = 0, d = b.slice();
            for (var e = 0, f = d.length; e < f; e++) d[e] === x && (d[e] = arguments[c++]);
            while (c < arguments.length) d.push(arguments[c++]);
            return a.apply(this, d);
        };
    }, x.bindAll = function (a) {
        var b = h.call(arguments, 1);
        if (b.length === 0) throw new Error("bindAll must be passed function names");
        return y(b, function (b) {
            a[b] = x.bind(a[b], a);
        }), a;
    }, x.memoize = function (a, b) {
        var c = {};
        return b || (b = x.identity), function () {
            var d = b.apply(this, arguments);
            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
        };
    }, x.delay = function (a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, c);
        }, b);
    }, x.defer = function (a) {
        return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)));
    }, x.throttle = function (a, b, c) {
        var d, e, f, g = null, h = 0;
        c || (c = {});
        var i = function () {
            h = c.leading === !1 ? 0 : x.now(), g = null, f = a.apply(d, e), d = e = null;
        };
        return function () {
            var j = x.now();
            !h && c.leading === !1 && (h = j);
            var k = b - (j - h);
            return d = this, e = arguments, k <= 0 ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), d = e = null) : !g && c.trailing !== !1 && (g = setTimeout(i, k)), f;
        };
    }, x.debounce = function (a, b, c) {
        var d, e, f, g, h, i = function () {
            var j = x.now() - g;
            j < b ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), f = e = null));
        };
        return function () {
            f = this, e = arguments, g = x.now();
            var j = c && !d;
            return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h;
        };
    }, x.once = function (a) {
        var b = !1, c;
        return function () {
            return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c);
        };
    }, x.wrap = function (a, b) {
        return x.partial(b, a);
    }, x.compose = function () {
        var a = arguments;
        return function () {
            var b = arguments;
            for (var c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
            return b[0];
        };
    }, x.after = function (a, b) {
        return function () {
            if (--a < 1) return b.apply(this, arguments);
        };
    }, x.keys = function (a) {
        if (!x.isObject(a)) return [];
        if (v) return v(a);
        var b = [];
        for (var c in a) x.has(a, c) && b.push(c);
        return b;
    }, x.values = function (a) {
        var b = x.keys(a), c = b.length, d = new Array(c);
        for (var e = 0; e < c; e++) d[e] = a[b[e]];
        return d;
    }, x.pairs = function (a) {
        var b = x.keys(a), c = b.length, d = new Array(c);
        for (var e = 0; e < c; e++) d[e] = [b[e], a[b[e]]];
        return d;
    }, x.invert = function (a) {
        var b = {}, c = x.keys(a);
        for (var d = 0, e = c.length; d < e; d++) b[a[c[d]]] = c[d];
        return b;
    }, x.functions = x.methods = function (a) {
        var b = [];
        for (var c in a) x.isFunction(a[c]) && b.push(c);
        return b.sort();
    }, x.extend = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b) for (var c in b) a[c] = b[c];
        }), a;
    }, x.pick = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        return y(c, function (c) {
            c in a && (b[c] = a[c]);
        }), b;
    }, x.omit = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        for (var e in a) x.contains(c, e) || (b[e] = a[e]);
        return b;
    }, x.defaults = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b) for (var c in b) a[c] === void 0 && (a[c] = b[c]);
        }), a;
    }, x.clone = function (a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a;
    }, x.tap = function (a, b) {
        return b(a), a;
    };
    var F = function (a, b, c, d) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b)) return !1;
        switch (e) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != "object" || typeof b != "object") return !1;
        var f = c.length;
        while (f--) if (c[f] == a) return d[f] == b;
        var g = a.constructor, h = b.constructor;
        if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in b) return !1;
        c.push(a), d.push(b);
        var i = 0, k = !0;
        if (e == "[object Array]") {
            i = a.length, k = i == b.length;
            if (k) while (i--) if (!(k = F(a[i], b[i], c, d))) break;
        } else {
            for (var l in a) if (x.has(a, l)) {
                i++;
                if (!(k = x.has(b, l) && F(a[l], b[l], c, d))) break;
            }
            if (k) {
                for (l in b) if (x.has(b, l) && !(i--)) break;
                k = !i;
            }
        }
        return c.pop(), d.pop(), k;
    };
    x.isEqual = function (a, b) {
        return F(a, b, [], []);
    }, x.isEmpty = function (a) {
        if (a == null) return !0;
        if (x.isArray(a) || x.isString(a)) return a.length === 0;
        for (var b in a) if (x.has(a, b)) return !1;
        return !0;
    }, x.isElement = function (a) {
        return !!a && a.nodeType === 1;
    }, x.isArray = u || function (a) {
        return j.call(a) == "[object Array]";
    }, x.isObject = function (a) {
        return a === Object(a);
    }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (a) {
        x["is" + a] = function (b) {
            return j.call(b) == "[object " + a + "]";
        };
    }), x.isArguments(arguments) || (x.isArguments = function (a) {
        return !!a && !!x.has(a, "callee");
    }), typeof /./ != "function" && (x.isFunction = function (a) {
        return typeof a == "function";
    }), x.isFinite = function (a) {
        return isFinite(a) && !isNaN(parseFloat(a));
    }, x.isNaN = function (a) {
        return x.isNumber(a) && a != +a;
    }, x.isBoolean = function (a) {
        return a === !0 || a === !1 || j.call(a) == "[object Boolean]";
    }, x.isNull = function (a) {
        return a === null;
    }, x.isUndefined = function (a) {
        return a === void 0;
    }, x.has = function (a, b) {
        return k.call(a, b);
    }, x.noConflict = function () {
        return a._ = b, this;
    }, x.identity = function (a) {
        return a;
    }, x.constant = function (a) {
        return function () {
            return a;
        };
    }, x.property = function (a) {
        return function (b) {
            return b[a];
        };
    }, x.matches = function (a) {
        return function (b) {
            if (b === a) return !0;
            for (var c in a) if (a[c] !== b[c]) return !1;
            return !0;
        };
    }, x.times = function (a, b, c) {
        var d = Array(Math.max(0, a));
        for (var e = 0; e < a; e++) d[e] = b.call(c, e);
        return d;
    }, x.random = function (a, b) {
        return b == null && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
    }, x.now = Date.now || function () {
        return (new Date).getTime();
    };
    var G = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    G.unescape = x.invert(G.escape);
    var H = {
        escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")
    };
    x.each(["escape", "unescape"], function (a) {
        x[a] = function (b) {
            return b == null ? "" : ("" + b).replace(H[a], function (b) {
                return G[a][b];
            });
        };
    }), x.result = function (a, b) {
        if (a == null) return void 0;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c;
    }, x.mixin = function (a) {
        y(x.functions(a), function (b) {
            var c = x[b] = a[b];
            x.prototype[b] = function () {
                var a = [this._wrapped];
                return g.apply(a, arguments), M.call(this, c.apply(x, a));
            };
        });
    };
    var I = 0;
    x.uniqueId = function (a) {
        var b = ++I + "";
        return a ? a + b : b;
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var J = /(.)^/, K = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function (a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([(c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source].join("|") + "|$", "g"), f = 0, g = "__p+='";
        a.replace(e, function (b, c, d, e, h) {
            return g += a.slice(f, h).replace(L, function (a) {
                return "\\" + K[a];
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b;
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g);
        } catch (h) {
            throw h.source = g, h;
        }
        if (b) return d(b, x);
        var i = function (a) {
            return d.call(this, a, x);
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i;
    }, x.chain = function (a) {
        return x(a).chain();
    };
    var M = function (a) {
        return this._chain ? x(a).chain() : a;
    };
    x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            var c = this._wrapped;
            return b.apply(c, arguments), (a == "shift" || a == "splice") && c.length === 0 && delete c[0], M.call(this, c);
        };
    }), y(["concat", "join", "slice"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            return M.call(this, b.apply(this._wrapped, arguments));
        };
    }), x.extend(x.prototype, {
        chain: function () {
            return this._chain = !0, this;
        },
        value: function () {
            return this._wrapped;
        }
    }), typeof define == "function" && define.amd && define("underscore", [], function () {
        return x;
    });
}.call(this), function (a, b) {
    if (typeof define == "function" && define.amd) define(["underscore", "jquery", "exports"], function (c, d, e) {
        a.Backbone = b(a, e, c, d);
    }); else if (typeof exports != "undefined") {
        var c = require("underscore");
        b(a, exports, c);
    } else a.Backbone = b(a, {}, a._, a.jQuery || a.Zepto || a.ender || a.$);
}(this, function (a, b, c, d) {
    var e = a.Backbone, f = [], g = f.push, h = f.slice, i = f.splice;
    b.VERSION = "1.1.2", b.$ = d, b.noConflict = function () {
        return a.Backbone = e, this;
    }, b.emulateHTTP = !1, b.emulateJSON = !1;
    var j = b.Events = {
        on: function (a, b, c) {
            if (!l(this, "on", a, [b, c]) || !b) return this;
            this._events || (this._events = {});
            var d = this._events[a] || (this._events[a] = []);
            return d.push({
                callback: b,
                context: c,
                ctx: c || this
            }), this;
        },
        once: function (a, b, d) {
            if (!l(this, "once", a, [b, d]) || !b) return this;
            var e = this, f = c.once(function () {
                e.off(a, f), b.apply(this, arguments);
            });
            return f._callback = b, this.on(a, f, d);
        },
        off: function (a, b, d) {
            var e, f, g, h, i, j, k, m;
            if (!this._events || !l(this, "off", a, [b, d])) return this;
            if (!a && !b && !d) return this._events = void 0, this;
            h = a ? [a] : c.keys(this._events);
            for (i = 0, j = h.length; i < j; i++) {
                a = h[i];
                if (g = this._events[a]) {
                    this._events[a] = e = [];
                    if (b || d) for (k = 0, m = g.length; k < m; k++) f = g[k], (b && b !== f.callback && b !== f.callback._callback || d && d !== f.context) && e.push(f);
                    e.length || delete this._events[a];
                }
            }
            return this;
        },
        trigger: function (a) {
            if (!this._events) return this;
            var b = h.call(arguments, 1);
            if (!l(this, "trigger", a, b)) return this;
            var c = this._events[a], d = this._events.all;
            return c && m(c, b), d && m(d, arguments), this;
        },
        stopListening: function (a, b, d) {
            var e = this._listeningTo;
            if (!e) return this;
            var f = !b && !d;
            !d && typeof b == "object" && (d = this), a && ((e = {})[a._listenId] = a);
            for (var g in e) a = e[g], a.off(b, d, this), (f || c.isEmpty(a._events)) && delete this._listeningTo[g];
            return this;
        }
    }, k = /\s+/, l = function (a, b, c, d) {
        if (!c) return !0;
        if (typeof c == "object") {
            for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
            return !1;
        }
        if (k.test(c)) {
            var f = c.split(k);
            for (var g = 0, h = f.length; g < h; g++) a[b].apply(a, [f[g]].concat(d));
            return !1;
        }
        return !0;
    }, m = function (a, b) {
        var c, d = -1, e = a.length, f = b[0], g = b[1], h = b[2];
        switch (b.length) {
            case 0:
                while (++d < e) (c = a[d]).callback.call(c.ctx);
                return;
            case 1:
                while (++d < e) (c = a[d]).callback.call(c.ctx, f);
                return;
            case 2:
                while (++d < e) (c = a[d]).callback.call(c.ctx, f, g);
                return;
            case 3:
                while (++d < e) (c = a[d]).callback.call(c.ctx, f, g, h);
                return;
            default:
                while (++d < e) (c = a[d]).callback.apply(c.ctx, b);
                return;
        }
    }, n = {
        listenTo: "on",
        listenToOnce: "once"
    };
    c.each(n, function (a, b) {
        j[b] = function (b, d, e) {
            var f = this._listeningTo || (this._listeningTo = {}), g = b._listenId || (b._listenId = c.uniqueId("l"));
            return f[g] = b, !e && typeof d == "object" && (e = this), b[a](d, e, this), this;
        };
    }), j.bind = j.on, j.unbind = j.off, c.extend(b, j);
    var o = b.Model = function (a, b) {
        var d = a || {};
        b || (b = {}), this.cid = c.uniqueId("c"), this.attributes = {}, b.collection && (this.collection = b.collection), b.parse && (d = this.parse(d, b) || {}), d = c.defaults({}, d, c.result(this, "defaults")), this.set(d, b), this.changed = {}, this.initialize.apply(this, arguments);
    };
    c.extend(o.prototype, j, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function () { },
        toJSON: function (a) {
            return c.clone(this.attributes);
        },
        sync: function () {
            return b.sync.apply(this, arguments);
        },
        get: function (a) {
            return this.attributes[a];
        },
        escape: function (a) {
            return c.escape(this.get(a));
        },
        has: function (a) {
            return this.get(a) != null;
        },
        set: function (a, b, d) {
            var e, f, g, h, i, j, k, l;
            if (a == null) return this;
            typeof a == "object" ? (f = a, d = b) : (f = {})[a] = b, d || (d = {});
            if (!this._validate(f, d)) return !1;
            g = d.unset, i = d.silent, h = [], j = this._changing, this._changing = !0, j || (this._previousAttributes = c.clone(this.attributes), this.changed = {}), l = this.attributes, k = this._previousAttributes, this.idAttribute in f && (this.id = f[this.idAttribute]);
            for (e in f) b = f[e], c.isEqual(l[e], b) || h.push(e), c.isEqual(k[e], b) ? delete this.changed[e] : this.changed[e] = b, g ? delete l[e] : l[e] = b;
            if (!i) {
                h.length && (this._pending = d);
                for (var m = 0, n = h.length; m < n; m++) this.trigger("change:" + h[m], this, l[h[m]], d);
            }
            if (j) return this;
            if (!i) while (this._pending) d = this._pending, this._pending = !1, this.trigger("change", this, d);
            return this._pending = !1, this._changing = !1, this;
        },
        unset: function (a, b) {
            return this.set(a, void 0, c.extend({}, b, {
                unset: !0
            }));
        },
        clear: function (a) {
            var b = {};
            for (var d in this.attributes) b[d] = void 0;
            return this.set(b, c.extend({}, a, {
                unset: !0
            }));
        },
        hasChanged: function (a) {
            return a == null ? !c.isEmpty(this.changed) : c.has(this.changed, a);
        },
        changedAttributes: function (a) {
            if (!a) return this.hasChanged() ? c.clone(this.changed) : !1;
            var b, d = !1, e = this._changing ? this._previousAttributes : this.attributes;
            for (var f in a) {
                if (c.isEqual(e[f], b = a[f])) continue;
                (d || (d = {}))[f] = b;
            }
            return d;
        },
        previous: function (a) {
            return a == null || !this._previousAttributes ? null : this._previousAttributes[a];
        },
        previousAttributes: function () {
            return c.clone(this._previousAttributes);
        },
        fetch: function (a) {
            a = a ? c.clone(a) : {}, a.parse === void 0 && (a.parse = !0);
            var b = this, d = a.success;
            return a.success = function (c) {
                if (!b.set(b.parse(c, a), a)) return !1;
                d && d(b, c, a), b.trigger("sync", b, c, a);
            }, N(this, a), this.sync("read", this, a);
        },
        save: function (a, b, d) {
            var e, f, g, h = this.attributes;
            a == null || typeof a == "object" ? (e = a, d = b) : (e = {})[a] = b, d = c.extend({
                validate: !0
            }, d);
            if (e && !d.wait) {
                if (!this.set(e, d)) return !1;
            } else if (!this._validate(e, d)) return !1;
            e && d.wait && (this.attributes = c.extend({}, h, e)), d.parse === void 0 && (d.parse = !0);
            var i = this, j = d.success;
            return d.success = function (a) {
                i.attributes = h;
                var b = i.parse(a, d);
                d.wait && (b = c.extend(e || {}, b));
                if (c.isObject(b) && !i.set(b, d)) return !1;
                j && j(i, a, d), i.trigger("sync", i, a, d);
            }, N(this, d), f = this.isNew() ? "create" : d.patch ? "patch" : "update", f === "patch" && (d.attrs = e), g = this.sync(f, this, d), e && d.wait && (this.attributes = h), g;
        },
        destroy: function (a) {
            a = a ? c.clone(a) : {};
            var b = this, d = a.success, e = function () {
                b.trigger("destroy", b, b.collection, a);
            };
            a.success = function (c) {
                (a.wait || b.isNew()) && e(), d && d(b, c, a), b.isNew() || b.trigger("sync", b, c, a);
            };
            if (this.isNew()) return a.success(), !1;
            N(this, a);
            var f = this.sync("delete", this, a);
            return a.wait || e(), f;
        },
        url: function () {
            var a = c.result(this, "urlRoot") || c.result(this.collection, "url") || M();
            return this.isNew() ? a : a.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id);
        },
        parse: function (a, b) {
            return a;
        },
        clone: function () {
            return new this.constructor(this.attributes);
        },
        isNew: function () {
            return !this.has(this.idAttribute);
        },
        isValid: function (a) {
            return this._validate({}, c.extend(a || {}, {
                validate: !0
            }));
        },
        _validate: function (a, b) {
            if (!b.validate || !this.validate) return !0;
            a = c.extend({}, this.attributes, a);
            var d = this.validationError = this.validate(a, b) || null;
            return d ? (this.trigger("invalid", this, d, c.extend(b, {
                validationError: d
            })), !1) : !0;
        }
    });
    var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
    c.each(p, function (a) {
        o.prototype[a] = function () {
            var b = h.call(arguments);
            return b.unshift(this.attributes), c[a].apply(c, b);
        };
    });
    var q = b.Collection = function (a, b) {
        b || (b = {}), b.model && (this.model = b.model), b.comparator !== void 0 && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, c.extend({
            silent: !0
        }, b));
    }, r = {
        add: !0,
        remove: !0,
        merge: !0
    }, s = {
        add: !0,
        remove: !1
    };
    c.extend(q.prototype, j, {
        model: o,
        initialize: function () { },
        toJSON: function (a) {
            return this.map(function (b) {
                return b.toJSON(a);
            });
        },
        sync: function () {
            return b.sync.apply(this, arguments);
        },
        add: function (a, b) {
            return this.set(a, c.extend({
                merge: !1
            }, b, s));
        },
        remove: function (a, b) {
            var d = !c.isArray(a);
            a = d ? [a] : c.clone(a), b || (b = {});
            var e, f, g, h;
            for (e = 0, f = a.length; e < f; e++) {
                h = a[e] = this.get(a[e]);
                if (!h) continue;
                delete this._byId[h.id], delete this._byId[h.cid], g = this.indexOf(h), this.models.splice(g, 1), this.length--, b.silent || (b.index = g, h.trigger("remove", h, this, b)), this._removeReference(h, b);
            }
            return d ? a[0] : a;
        },
        set: function (a, b) {
            b = c.defaults({}, b, r), b.parse && (a = this.parse(a, b));
            var d = !c.isArray(a);
            a = d ? a ? [a] : [] : c.clone(a);
            var e, f, g, h, i, j, k, l = b.at, m = this.model, n = this.comparator && l == null && b.sort !== !1, p = c.isString(this.comparator) ? this.comparator : null, q = [], s = [], t = {}, u = b.add, v = b.merge, w = b.remove, x = !n && u && w ? [] : !1;
            for (e = 0, f = a.length; e < f; e++) {
                i = a[e] || {}, i instanceof o ? g = h = i : g = i[m.prototype.idAttribute || "id"];
                if (j = this.get(g)) w && (t[j.cid] = !0), v && (i = i === h ? h.attributes : i, b.parse && (i = j.parse(i, b)), j.set(i, b), n && !k && j.hasChanged(p) && (k = !0)), a[e] = j; else if (u) {
                    h = a[e] = this._prepareModel(i, b);
                    if (!h) continue;
                    q.push(h), this._addReference(h, b);
                }
                h = j || h, x && (h.isNew() || !t[h.id]) && x.push(h), t[h.id] = !0;
            }
            if (w) {
                for (e = 0, f = this.length; e < f; ++e) t[(h = this.models[e]).cid] || s.push(h);
                s.length && this.remove(s, b);
            }
            if (q.length || x && x.length) {
                n && (k = !0), this.length += q.length;
                if (l != null) for (e = 0, f = q.length; e < f; e++) this.models.splice(l + e, 0, q[e]); else {
                    x && (this.models.length = 0);
                    var y = x || q;
                    for (e = 0, f = y.length; e < f; e++) this.models.push(y[e]);
                }
            }
            k && this.sort({
                silent: !0
            });
            if (!b.silent) {
                for (e = 0, f = q.length; e < f; e++) (h = q[e]).trigger("add", h, this, b);
                (k || x && x.length) && this.trigger("sort", this, b);
            }
            return d ? a[0] : a;
        },
        reset: function (a, b) {
            b || (b = {});
            for (var d = 0, e = this.models.length; d < e; d++) this._removeReference(this.models[d], b);
            return b.previousModels = this.models, this._reset(), a = this.add(a, c.extend({
                silent: !0
            }, b)), b.silent || this.trigger("reset", this, b), a;
        },
        push: function (a, b) {
            return this.add(a, c.extend({
                at: this.length
            }, b));
        },
        pop: function (a) {
            var b = this.at(this.length - 1);
            return this.remove(b, a), b;
        },
        unshift: function (a, b) {
            return this.add(a, c.extend({
                at: 0
            }, b));
        },
        shift: function (a) {
            var b = this.at(0);
            return this.remove(b, a), b;
        },
        slice: function () {
            return h.apply(this.models, arguments);
        },
        get: function (a) {
            return a == null ? void 0 : this._byId[a] || this._byId[a.id] || this._byId[a.cid];
        },
        at: function (a) {
            return this.models[a];
        },
        where: function (a, b) {
            return c.isEmpty(a) ? b ? void 0 : [] : this[b ? "find" : "filter"](function (b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0;
            });
        },
        findWhere: function (a) {
            return this.where(a, !0);
        },
        sort: function (a) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            return a || (a = {}), c.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(c.bind(this.comparator, this)), a.silent || this.trigger("sort", this, a), this;
        },
        pluck: function (a) {
            return c.invoke(this.models, "get", a);
        },
        fetch: function (a) {
            a = a ? c.clone(a) : {}, a.parse === void 0 && (a.parse = !0);
            var b = a.success, d = this;
            return a.success = function (c) {
                var e = a.reset ? "reset" : "set";
                d[e](c, a), b && b(d, c, a), d.trigger("sync", d, c, a);
            }, N(this, a), this.sync("read", this, a);
        },
        create: function (a, b) {
            b = b ? c.clone(b) : {};
            if (!(a = this._prepareModel(a, b))) return !1;
            b.wait || this.add(a, b);
            var d = this, e = b.success;
            return b.success = function (a, c) {
                b.wait && d.add(a, b), e && e(a, c, b);
            }, a.save(null, b), a;
        },
        parse: function (a, b) {
            return a;
        },
        clone: function () {
            return new this.constructor(this.models);
        },
        _reset: function () {
            this.length = 0, this.models = [], this._byId = {};
        },
        _prepareModel: function (a, b) {
            if (a instanceof o) return a;
            b = b ? c.clone(b) : {}, b.collection = this;
            var d = new this.model(a, b);
            return d.validationError ? (this.trigger("invalid", this, d.validationError, b), !1) : d;
        },
        _addReference: function (a, b) {
            this._byId[a.cid] = a, a.id != null && (this._byId[a.id] = a), a.collection || (a.collection = this), a.on("all", this._onModelEvent, this);
        },
        _removeReference: function (a, b) {
            this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function (a, b, c, d) {
            if ((a === "add" || a === "remove") && c !== this) return;
            a === "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], b.id != null && (this._byId[b.id] = b)), this.trigger.apply(this, arguments);
        }
    });
    var t = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
    c.each(t, function (a) {
        q.prototype[a] = function () {
            var b = h.call(arguments);
            return b.unshift(this.models), c[a].apply(c, b);
        };
    });
    var u = ["groupBy", "countBy", "sortBy", "indexBy"];
    c.each(u, function (a) {
        q.prototype[a] = function (b, d) {
            var e = c.isFunction(b) ? b : function (a) {
                return a.get(b);
            };
            return c[a](this.models, e, d);
        };
    });
    var v = b.View = function (a) {
        this.cid = c.uniqueId("view"), a || (a = {}), c.extend(this, c.pick(a, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents();
    }, w = /^(\S+)\s*(.*)$/, x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    c.extend(v.prototype, j, {
        tagName: "div",
        $: function (a) {
            return this.$el.find(a);
        },
        initialize: function () { },
        render: function () {
            return this;
        },
        remove: function () {
            return this.$el.remove(), this.stopListening(), this;
        },
        setElement: function (a, c) {
            return this.$el && this.undelegateEvents(), this.$el = a instanceof b.$ ? a : b.$(a), this.el = this.$el[0], c !== !1 && this.delegateEvents(), this;
        },
        delegateEvents: function (a) {
            if (!a && !(a = c.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var b in a) {
                var d = a[b];
                c.isFunction(d) || (d = this[a[b]]);
                if (!d) continue;
                var e = b.match(w), f = e[1], g = e[2];
                d = c.bind(d, this), f += ".delegateEvents" + this.cid, g === "" ? this.$el.on(f, d) : this.$el.on(f, g, d);
            }
            return this;
        },
        undelegateEvents: function () {
            return this.$el.off(".delegateEvents" + this.cid), this;
        },
        _ensureElement: function () {
            if (!this.el) {
                var a = c.extend({}, c.result(this, "attributes"));
                this.id && (a.id = c.result(this, "id")), this.className && (a["class"] = c.result(this, "className"));
                var d = b.$("<" + c.result(this, "tagName") + ">").attr(a);
                this.setElement(d, !1);
            } else this.setElement(c.result(this, "el"), !1);
        }
    }), b.sync = function (a, d, e) {
        var f = z[a];
        c.defaults(e || (e = {}), {
            emulateHTTP: b.emulateHTTP,
            emulateJSON: b.emulateJSON
        });
        var g = {
            type: f,
            dataType: "json"
        };
        e.url || (g.url = c.result(d, "url") || M()), e.data == null && d && (a === "create" || a === "update" || a === "patch") && (g.contentType = "application/json", g.data = JSON.stringify(e.attrs || d.toJSON(e))), e.emulateJSON && (g.contentType = "application/x-www-form-urlencoded", g.data = g.data ? {
            model: g.data
        } : {});
        if (e.emulateHTTP && (f === "PUT" || f === "DELETE" || f === "PATCH")) {
            g.type = "POST", e.emulateJSON && (g.data._method = f);
            var h = e.beforeSend;
            e.beforeSend = function (a) {
                a.setRequestHeader("X-HTTP-Method-Override", f);
                if (h) return h.apply(this, arguments);
            };
        }
        g.type !== "GET" && !e.emulateJSON && (g.processData = !1), g.type === "PATCH" && y && (g.xhr = function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        });
        var i = e.xhr = b.ajax(c.extend(g, e));
        return d.trigger("request", d, i, e), i;
    };
    var y = typeof window != "undefined" && !!window.ActiveXObject && (!window.XMLHttpRequest || !(new XMLHttpRequest).dispatchEvent), z = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    b.ajax = function () {
        return b.$.ajax.apply(b.$, arguments);
    };
    var A = b.Router = function (a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    }, B = /\((.*?)\)/g, C = /(\(\?)?:\w+/g, D = /\*\w+/g, E = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    c.extend(A.prototype, j, {
        initialize: function () { },
        route: function (a, d, e) {
            c.isRegExp(a) || (a = this._routeToRegExp(a)), c.isFunction(d) && (e = d, d = ""), e || (e = this[d]);
            var f = this;
            return b.history.route(a, function (c) {
                var g = f._extractParameters(a, c);
                f.execute(e, g), f.trigger.apply(f, ["route:" + d].concat(g)), f.trigger("route", d, g), b.history.trigger("route", f, d, g);
            }), this;
        },
        execute: function (a, b) {
            a && a.apply(this, b);
        },
        navigate: function (a, c) {
            return b.history.navigate(a, c), this;
        },
        _bindRoutes: function () {
            if (!this.routes) return;
            this.routes = c.result(this, "routes");
            var a, b = c.keys(this.routes);
            while ((a = b.pop()) != null) this.route(a, this.routes[a]);
        },
        _routeToRegExp: function (a) {
            return a = a.replace(E, "\\$&").replace(B, "(?:$1)?").replace(C, function (a, b) {
                return b ? a : "([^/?]+)";
            }).replace(D, "([^?]*?)"), new RegExp("^" + a + "(?:\\?([\\s\\S]*))?$");
        },
        _extractParameters: function (a, b) {
            var d = a.exec(b).slice(1);
            return c.map(d, function (a, b) {
                return b === d.length - 1 ? a || null : a ? decodeURIComponent(a) : null;
            });
        }
    });
    var F = b.History = function () {
        this.handlers = [], c.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history);
    }, G = /^[#\/]|\s+$/g, H = /^\/+|\/+$/g, I = /msie [\w.]+/, J = /\/$/, K = /#.*$/;
    F.started = !1, c.extend(F.prototype, j, {
        interval: 50,
        atRoot: function () {
            return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root;
        },
        getHash: function (a) {
            var b = (a || this).location.href.match(/#(.*)$/);
            return b ? b[1] : "";
        },
        getFragment: function (a, b) {
            if (a == null) if (this._hasPushState || !this._wantsHashChange || b) {
                a = decodeURI(this.location.pathname + this.location.search);
                var c = this.root.replace(J, "");
                a.indexOf(c) || (a = a.slice(c.length));
            } else a = this.getHash();
            return a.replace(G, "");
        },
        start: function (a) {
            if (F.started) throw new Error("Backbone.history has already been started");
            F.started = !0, this.options = c.extend({
                root: "/"
            }, this.options, a), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var d = this.getFragment(), e = document.documentMode, f = I.exec(navigator.userAgent.toLowerCase()) && (!e || e <= 7);
            this.root = ("/" + this.root + "/").replace(H, "/");
            if (f && this._wantsHashChange) {
                var g = b.$('<iframe src="javascript:0" tabindex="-1">');
                this.iframe = g.hide().appendTo("body")[0].contentWindow, this.navigate(d);
            }
            this._hasPushState ? b.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !f ? b.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = d;
            var h = this.location;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                this._hasPushState && this.atRoot() && h.hash && (this.fragment = this.getHash().replace(G, ""), this.history.replaceState({}, document.title, this.root + this.fragment));
            }
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function () {
            b.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), F.started = !1;
        },
        route: function (a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function (a) {
            var b = this.getFragment();
            b === this.fragment && this.iframe && (b = this.getFragment(this.getHash(this.iframe)));
            if (b === this.fragment) return !1;
            this.iframe && this.navigate(b), this.loadUrl();
        },
        loadUrl: function (a) {
            return a = this.fragment = this.getFragment(a), c.any(this.handlers, function (b) {
                if (b.route.test(a)) return b.callback(a), !0;
            });
        },
        navigate: function (a, b) {
            if (!F.started) return !1;
            if (!b || b === !0) b = {
                trigger: !!b
            };
            var c = this.root + (a = this.getFragment(a || ""));
            a = a.replace(K, "");
            if (this.fragment === a) return;
            this.fragment = a, a === "" && c !== "/" && (c = c.slice(0, -1));
            if (this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c); else {
                if (!this._wantsHashChange) return this.location.assign(c);
                this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, a, b.replace));
            }
            if (b.trigger) return this.loadUrl(a);
        },
        _updateHash: function (a, b, c) {
            if (c) {
                var d = a.href.replace(/(javascript:|#).*$/, "");
                a.replace(d + "#" + b);
            } else a.hash = "#" + b;
        }
    }), b.history = new F;
    var L = function (a, b) {
        var d = this, e;
        a && c.has(a, "constructor") ? e = a.constructor : e = function () {
            return d.apply(this, arguments);
        }, c.extend(e, d, b);
        var f = function () {
            this.constructor = e;
        };
        return f.prototype = d.prototype, e.prototype = new f, a && c.extend(e.prototype, a), e.__super__ = d.prototype, e;
    };
    o.extend = q.extend = A.extend = v.extend = F.extend = L;
    var M = function () {
        throw new Error('A "url" property or function must be specified');
    }, N = function (a, b) {
        var c = b.error;
        b.error = function (d) {
            c && c(a, d, b), a.trigger("error", a, d, b);
        };
    };
    return b;
}), function () {
    $.client.browser == "Explorer" && $.client.version <= 7 && (Backbone.History.prototype.navigate = function () { }), Backbone.Events.triggerSafe = function (c, d, e) {
        if (!this._events) return this;
        if (!a(this, "trigger", c, e)) return this;
        var f = this._events[c], g = this._events.all;
        return f && b(f, d, e ? [e] : []), g && b(g, d, [c].concat(e)), this;
    };
    var a = function (a, b, c, d) {
        var e = /\s+/;
        if (!c) return !0;
        if (typeof c == "object") {
            for (var f in c) a[b].apply(a, [f, c[f]].concat(d));
            return !1;
        }
        if (e.test(c)) {
            var g = c.split(e);
            for (var h = 0, i = g.length; h < i; h++) a[b].apply(a, [g[h]].concat(d));
            return !1;
        }
        return !0;
    }, b = function (a, b, c) {
        var d, e = -1, f = a.length, g = c[0], h = c[1], i = c[2];
        switch (c.length) {
            case 0:
                while (++e < f) try {
                    (d = a[e]).callback.call(d.ctx);
                } catch (j) {
                    b && b.call(a[e].ctx || this, c, j);
                }
                return;
            case 1:
                while (++e < f) try {
                    (d = a[e]).callback.call(d.ctx, g);
                } catch (j) {
                    b && b.call(a[e].ctx || this, c, j);
                }
                return;
            case 2:
                while (++e < f) try {
                    (d = a[e]).callback.call(d.ctx, g, h);
                } catch (j) {
                    b && b.call(a[e].ctx || this, c, j);
                }
                return;
            case 3:
                while (++e < f) try {
                    (d = a[e]).callback.call(d.ctx, g, h, i);
                } catch (j) {
                    b && b.call(a[e].ctx || this, c, j);
                }
                return;
            default:
                while (++e < f) try {
                    (d = a[e]).callback.apply(d.ctx, c);
                } catch (j) {
                    b && b.call(a[e].ctx || this, c, j);
                }
                return;
        }
    };
    Backbone.History.prototype.gaHash = /^gaso=.*$/, Backbone.History.prototype.start = function (a) {
        if (Backbone.History.started) throw new Error("Backbone.history has already been started");
        Backbone.History.started = !0;
        var b = /^\/+|\/+$/g, c = /msie [\w.]+/;
        this.options = _.extend({
            root: "/"
        }, this.options, a), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var d = this.getFragment(), e = document.documentMode, f = c.exec(navigator.userAgent.toLowerCase()) && (!e || e <= 7);
        this.root = ("/" + this.root + "/").replace(b, "/");
        if (f && this._wantsHashChange) {
            var g = $('<iframe src="javascript:0" tabindex="-1">');
            this.iframe = g.hide().appendTo("body")[0].contentWindow, this.navigate(d);
        }
        this._hasPushState ? $(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !f ? $(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = d;
        var h = this.location;
        if (this._wantsHashChange && this._wantsPushState) {
            if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
            if (this._hasPushState && this.atRoot() && h.hash) {
                var i = this.getHash();
                i.match(this.gaHash) || (this.fragment = i.replace(routeStripper, ""), window.history.replaceState({}, document.title, h.protocol + "//" + h.host + this.options.root + this.fragment));
            }
        }
        if (!this.options.silent) return this.loadUrl();
    };
}.call(this), function (a) {
    function b(a) {
        this._superCallObjects || (this._superCallObjects = {});
        var b = this._superCallObjects[a] || this, d = c(a, b);
        this._superCallObjects[a] = d;
        var e = d[a].apply(this, _.rest(arguments));
        return delete this._superCallObjects[a], e;
    }
    function c(a, b) {
        var c = b;
        while (c[a] === b[a]) c = c.constructor.__super__;
        return c;
    }
    _.each(["Model", "Collection", "View", "Router"], function (c) {
        a[c].prototype._super = b;
    });
}(Backbone), Support = {}, Support.VERSION = "0.0.1", Support.CompositeView = function (a) {
    this.children = _([]), Backbone.View.apply(this, [a]);
}, _.extend(Support.CompositeView.prototype, Backbone.View.prototype, {
    leave: function () {
        this.unbind(), this.remove(), this._leaveChildren(), this._removeFromParent();
    },
    renderChild: function (a) {
        a.render(), this.children.push(a), a.parent = this;
    },
    appendChild: function (a) {
        this.renderChild(a), $(this.el).append(a.el);
    },
    renderChildInto: function (a, b) {
        this.renderChild(a), $(b).empty().append(a.el);
    },
    _leaveChildren: function () {
        this.children.chain().clone().each(function (a) {
            a.leave && a.leave();
        });
    },
    _removeFromParent: function () {
        this.parent && this.parent._removeChild(this);
    },
    _removeChild: function (a) {
        var b = this.children.indexOf(a);
        this.children.splice(b, 1);
    }
}), Support.CompositeView.extend = Backbone.View.extend, Support.SwappingRouter = function (a) {
    Backbone.Router.apply(this, [a]);
}, _.extend(Support.SwappingRouter.prototype, Backbone.Router.prototype, {
    swap: function (a) {
        this.currentView && this.currentView.leave && this.currentView.leave(), this.currentView = a, $(this.el).empty().append(this.currentView.render().el);
    }
}), Support.SwappingRouter.extend = Backbone.Router.extend, function () {
    var a = /^\?([^#]*)/, b = /:([\w\d]+)/g, c = /\*([\w\d]+)/g, d = /[-[\]{}()+?.,\\^$|#\s]/g;
    _.extend(Support.SwappingRouter.prototype, {
        getFragment: function (a, b, c) {
            if (a == null) if (this._hasPushState || b) {
                a = window.location.pathname;
                var d = window.location.search;
                d && (a += d);
            } else a = window.location.hash;
            return a = a.replace(hashStrip, ""), c && (a = a.replace(queryStrip, "")), a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), a;
        },
        _routeToRegExp: function (a) {
            return a = a.replace(d, "\\$&").replace(b, "([^/?]*)").replace(c, "([^?]*)"), a += "([?]{1}.*)?#*", new RegExp("^" + a + "$");
        },
        _extractParameters: function (b, c) {
            c = c.replace(/#.*/, "");
            var d = b.exec(c).slice(1), e = d.length && d[d.length - 1] && d[d.length - 1].match(a);
            if (e) {
                var f = e[1], g = {};
                if (f) {
                    var h = f.split("&"), i = this;
                    _.each(h, function (a) {
                        var b = a.split("=");
                        b.length > 1 && b[1] && i._setParamValue(b[0], b[1], g);
                    });
                }
                d[d.length - 1] = g;
            }
            for (var j = 0; j < d.length; j++) _.isString(d[j]) && (d[j] = decodeURIComponent(d[j]));
            return d;
        },
        _setParamValue: function (a, b, c) {
            var d = a.split("."), e = c;
            for (var f = 0; f < d.length; f++) {
                var g = d[f];
                f === d.length - 1 ? e[g] = this._decodeParamValue(b, e[g]) : e = e[g] = e[g] || {};
            }
        },
        _decodeParamValue: function (a, b) {
            if (a.indexOf("|") >= 0) {
                var c = a.split("|");
                for (var d = c.length - 1; d >= 0; d--) c[d] ? c[d] = decodeURIComponent(c[d]) : c.splice(d, 1);
                return c;
            }
            return b ? _.isArray(b) ? (b.push(a), b) : [b, a] : decodeURIComponent(a);
        },
        toFragment: function (a, b) {
            return b && (_.isString(b) || (b = this._toQueryString(b)), a += "?" + b), a;
        },
        _toQueryString: function (a, b) {
            if (!a) return "";
            b = b || "";
            var c = "";
            for (var d in a) {
                var e = a[d];
                if (_.isString(e) || _.isNumber(e) || _.isBoolean(e) || _.isDate(e)) {
                    e = this._toQueryParam(e);
                    if (_.isBoolean(e) || e) c += (c ? "&" : "") + this._toQueryParamName(d, b) + "=" + encodeURIComponent(e).replace("|", "%7C");
                } else if (_.isArray(e)) {
                    var f = "";
                    for (var g in e) {
                        var h = this._toQueryParam(e[g]);
                        if (_.isBoolean(h) || h) f += "|" + encodeURIComponent(h).replace("|", "%7C");
                    }
                    f && (c += (c ? "&" : "") + this._toQueryParamName(d, b) + "=" + f);
                } else {
                    var i = this._toQueryString(e, this._toQueryParamName(d, b, !0));
                    i && (c += (c ? "&" : "") + i);
                }
            }
            return c;
        },
        _toQueryParamName: function (a, b, c) {
            return b + a + (c ? "." : "");
        },
        _toQueryParam: function (a) {
            return _.isNull(a) || _.isUndefined(a) ? null : _.isDate(a) ? a.getDate().getTime() : a;
        }
    });
}();

var Handlebars = {};

Handlebars.VERSION = "1.0.beta.6", Handlebars.helpers = {}, Handlebars.partials = {}, Handlebars.registerHelper = function (a, b, c) {
    c && (b.not = c), this.helpers[a] = b;
}, Handlebars.registerPartial = function (a, b) {
    this.partials[a] = b;
}, Handlebars.registerHelper("helperMissing", function (a) {
    if (arguments.length === 2) return undefined;
    throw new Error("Could not find property '" + a + "'");
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper("blockHelperMissing", function (a, b) {
    var c = b.inverse || function () { }, d = b.fn, e = "", f = toString.call(a);
    f === functionType && (a = a.call(this));
    if (a === !0) return d(this);
    if (a === !1 || a == null) return c(this);
    if (f === "[object Array]") {
        if (a.length > 0) for (var g = 0, h = a.length; g < h; g++) e += d(a[g]); else e = c(this);
        return e;
    }
    return d(a);
}), Handlebars.registerHelper("each", function (a, b) {
    var c = b.fn, d = b.inverse, e = "";
    if (a && a.length > 0) for (var f = 0, g = a.length; f < g; f++) e += c(a[f]); else e = d(this);
    return e;
}), Handlebars.registerHelper("if", function (a, b) {
    var c = toString.call(a);
    return c === functionType && (a = a.call(this)), !a || Handlebars.Utils.isEmpty(a) ? b.inverse(this) : b.fn(this);
}), Handlebars.registerHelper("unless", function (a, b) {
    var c = b.fn, d = b.inverse;
    return b.fn = d, b.inverse = c, Handlebars.helpers["if"].call(this, a, b);
}), Handlebars.registerHelper("with", function (a, b) {
    return b.fn(a);
}), Handlebars.registerHelper("log", function (a) {
    Handlebars.log(a);
});

var handlebars = function () {
    var a = {
        trace: function () { },
        yy: {},
        symbols_: {
            error: 2,
            root: 3,
            program: 4,
            EOF: 5,
            statements: 6,
            simpleInverse: 7,
            statement: 8,
            openInverse: 9,
            closeBlock: 10,
            openBlock: 11,
            mustache: 12,
            partial: 13,
            CONTENT: 14,
            COMMENT: 15,
            OPEN_BLOCK: 16,
            inMustache: 17,
            CLOSE: 18,
            OPEN_INVERSE: 19,
            OPEN_ENDBLOCK: 20,
            path: 21,
            OPEN: 22,
            OPEN_UNESCAPED: 23,
            OPEN_PARTIAL: 24,
            params: 25,
            hash: 26,
            param: 27,
            STRING: 28,
            INTEGER: 29,
            BOOLEAN: 30,
            hashSegments: 31,
            hashSegment: 32,
            ID: 33,
            EQUALS: 34,
            pathSegments: 35,
            SEP: 36,
            $accept: 0,
            $end: 1
        },
        terminals_: {
            2: "error",
            5: "EOF",
            14: "CONTENT",
            15: "COMMENT",
            16: "OPEN_BLOCK",
            18: "CLOSE",
            19: "OPEN_INVERSE",
            20: "OPEN_ENDBLOCK",
            22: "OPEN",
            23: "OPEN_UNESCAPED",
            24: "OPEN_PARTIAL",
            28: "STRING",
            29: "INTEGER",
            30: "BOOLEAN",
            33: "ID",
            34: "EQUALS",
            36: "SEP"
        },
        productions_: [0, [3, 2], [4, 3], [4, 1], [4, 0], [6, 1], [6, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [7, 2], [17, 3], [17, 2], [17, 2], [17, 1], [25, 2], [25, 1], [27, 1], [27, 1], [27, 1], [27, 1], [26, 1], [31, 2], [31, 1], [32, 3], [32, 3], [32, 3], [32, 3], [21, 1], [35, 3], [35, 1]],
        performAction: function (b, c, d, e, f, g, h) {
            var i = g.length - 1;
            switch (f) {
                case 1:
                    return g[i - 1];
                case 2:
                    this.$ = new e.ProgramNode(g[i - 2], g[i]);
                    break;
                case 3:
                    this.$ = new e.ProgramNode(g[i]);
                    break;
                case 4:
                    this.$ = new e.ProgramNode([]);
                    break;
                case 5:
                    this.$ = [g[i]];
                    break;
                case 6:
                    g[i - 1].push(g[i]), this.$ = g[i - 1];
                    break;
                case 7:
                    this.$ = new e.InverseNode(g[i - 2], g[i - 1], g[i]);
                    break;
                case 8:
                    this.$ = new e.BlockNode(g[i - 2], g[i - 1], g[i]);
                    break;
                case 9:
                    this.$ = g[i];
                    break;
                case 10:
                    this.$ = g[i];
                    break;
                case 11:
                    this.$ = new e.ContentNode(g[i]);
                    break;
                case 12:
                    this.$ = new e.CommentNode(g[i]);
                    break;
                case 13:
                    this.$ = new e.MustacheNode(g[i - 1][0], g[i - 1][1]);
                    break;
                case 14:
                    this.$ = new e.MustacheNode(g[i - 1][0], g[i - 1][1]);
                    break;
                case 15:
                    this.$ = g[i - 1];
                    break;
                case 16:
                    this.$ = new e.MustacheNode(g[i - 1][0], g[i - 1][1]);
                    break;
                case 17:
                    this.$ = new e.MustacheNode(g[i - 1][0], g[i - 1][1], !0);
                    break;
                case 18:
                    this.$ = new e.PartialNode(g[i - 1]);
                    break;
                case 19:
                    this.$ = new e.PartialNode(g[i - 2], g[i - 1]);
                    break;
                case 20:
                    break;
                case 21:
                    this.$ = [[g[i - 2]].concat(g[i - 1]), g[i]];
                    break;
                case 22:
                    this.$ = [[g[i - 1]].concat(g[i]), null];
                    break;
                case 23:
                    this.$ = [[g[i - 1]], g[i]];
                    break;
                case 24:
                    this.$ = [[g[i]], null];
                    break;
                case 25:
                    g[i - 1].push(g[i]), this.$ = g[i - 1];
                    break;
                case 26:
                    this.$ = [g[i]];
                    break;
                case 27:
                    this.$ = g[i];
                    break;
                case 28:
                    this.$ = new e.StringNode(g[i]);
                    break;
                case 29:
                    this.$ = new e.IntegerNode(g[i]);
                    break;
                case 30:
                    this.$ = new e.BooleanNode(g[i]);
                    break;
                case 31:
                    this.$ = new e.HashNode(g[i]);
                    break;
                case 32:
                    g[i - 1].push(g[i]), this.$ = g[i - 1];
                    break;
                case 33:
                    this.$ = [g[i]];
                    break;
                case 34:
                    this.$ = [g[i - 2], g[i]];
                    break;
                case 35:
                    this.$ = [g[i - 2], new e.StringNode(g[i])];
                    break;
                case 36:
                    this.$ = [g[i - 2], new e.IntegerNode(g[i])];
                    break;
                case 37:
                    this.$ = [g[i - 2], new e.BooleanNode(g[i])];
                    break;
                case 38:
                    this.$ = new e.IdNode(g[i]);
                    break;
                case 39:
                    g[i - 2].push(g[i]), this.$ = g[i - 2];
                    break;
                case 40:
                    this.$ = [g[i]];
            }
        },
        table: [{
            3: 1,
            4: 2,
            5: [2, 4],
            6: 3,
            8: 4,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 11],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            1: [3]
        }, {
            5: [1, 16]
        }, {
            5: [2, 3],
            7: 17,
            8: 18,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 19],
            20: [2, 3],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            5: [2, 5],
            14: [2, 5],
            15: [2, 5],
            16: [2, 5],
            19: [2, 5],
            20: [2, 5],
            22: [2, 5],
            23: [2, 5],
            24: [2, 5]
        }, {
            4: 20,
            6: 3,
            8: 4,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 11],
            20: [2, 4],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            4: 21,
            6: 3,
            8: 4,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 11],
            20: [2, 4],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            5: [2, 9],
            14: [2, 9],
            15: [2, 9],
            16: [2, 9],
            19: [2, 9],
            20: [2, 9],
            22: [2, 9],
            23: [2, 9],
            24: [2, 9]
        }, {
            5: [2, 10],
            14: [2, 10],
            15: [2, 10],
            16: [2, 10],
            19: [2, 10],
            20: [2, 10],
            22: [2, 10],
            23: [2, 10],
            24: [2, 10]
        }, {
            5: [2, 11],
            14: [2, 11],
            15: [2, 11],
            16: [2, 11],
            19: [2, 11],
            20: [2, 11],
            22: [2, 11],
            23: [2, 11],
            24: [2, 11]
        }, {
            5: [2, 12],
            14: [2, 12],
            15: [2, 12],
            16: [2, 12],
            19: [2, 12],
            20: [2, 12],
            22: [2, 12],
            23: [2, 12],
            24: [2, 12]
        }, {
            17: 22,
            21: 23,
            33: [1, 25],
            35: 24
        }, {
            17: 26,
            21: 23,
            33: [1, 25],
            35: 24
        }, {
            17: 27,
            21: 23,
            33: [1, 25],
            35: 24
        }, {
            17: 28,
            21: 23,
            33: [1, 25],
            35: 24
        }, {
            21: 29,
            33: [1, 25],
            35: 24
        }, {
            1: [2, 1]
        }, {
            6: 30,
            8: 4,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 11],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            5: [2, 6],
            14: [2, 6],
            15: [2, 6],
            16: [2, 6],
            19: [2, 6],
            20: [2, 6],
            22: [2, 6],
            23: [2, 6],
            24: [2, 6]
        }, {
            17: 22,
            18: [1, 31],
            21: 23,
            33: [1, 25],
            35: 24
        }, {
            10: 32,
            20: [1, 33]
        }, {
            10: 34,
            20: [1, 33]
        }, {
            18: [1, 35]
        }, {
            18: [2, 24],
            21: 40,
            25: 36,
            26: 37,
            27: 38,
            28: [1, 41],
            29: [1, 42],
            30: [1, 43],
            31: 39,
            32: 44,
            33: [1, 45],
            35: 24
        }, {
            18: [2, 38],
            28: [2, 38],
            29: [2, 38],
            30: [2, 38],
            33: [2, 38],
            36: [1, 46]
        }, {
            18: [2, 40],
            28: [2, 40],
            29: [2, 40],
            30: [2, 40],
            33: [2, 40],
            36: [2, 40]
        }, {
            18: [1, 47]
        }, {
            18: [1, 48]
        }, {
            18: [1, 49]
        }, {
            18: [1, 50],
            21: 51,
            33: [1, 25],
            35: 24
        }, {
            5: [2, 2],
            8: 18,
            9: 5,
            11: 6,
            12: 7,
            13: 8,
            14: [1, 9],
            15: [1, 10],
            16: [1, 12],
            19: [1, 11],
            20: [2, 2],
            22: [1, 13],
            23: [1, 14],
            24: [1, 15]
        }, {
            14: [2, 20],
            15: [2, 20],
            16: [2, 20],
            19: [2, 20],
            22: [2, 20],
            23: [2, 20],
            24: [2, 20]
        }, {
            5: [2, 7],
            14: [2, 7],
            15: [2, 7],
            16: [2, 7],
            19: [2, 7],
            20: [2, 7],
            22: [2, 7],
            23: [2, 7],
            24: [2, 7]
        }, {
            21: 52,
            33: [1, 25],
            35: 24
        }, {
            5: [2, 8],
            14: [2, 8],
            15: [2, 8],
            16: [2, 8],
            19: [2, 8],
            20: [2, 8],
            22: [2, 8],
            23: [2, 8],
            24: [2, 8]
        }, {
            14: [2, 14],
            15: [2, 14],
            16: [2, 14],
            19: [2, 14],
            20: [2, 14],
            22: [2, 14],
            23: [2, 14],
            24: [2, 14]
        }, {
            18: [2, 22],
            21: 40,
            26: 53,
            27: 54,
            28: [1, 41],
            29: [1, 42],
            30: [1, 43],
            31: 39,
            32: 44,
            33: [1, 45],
            35: 24
        }, {
            18: [2, 23]
        }, {
            18: [2, 26],
            28: [2, 26],
            29: [2, 26],
            30: [2, 26],
            33: [2, 26]
        }, {
            18: [2, 31],
            32: 55,
            33: [1, 56]
        }, {
            18: [2, 27],
            28: [2, 27],
            29: [2, 27],
            30: [2, 27],
            33: [2, 27]
        }, {
            18: [2, 28],
            28: [2, 28],
            29: [2, 28],
            30: [2, 28],
            33: [2, 28]
        }, {
            18: [2, 29],
            28: [2, 29],
            29: [2, 29],
            30: [2, 29],
            33: [2, 29]
        }, {
            18: [2, 30],
            28: [2, 30],
            29: [2, 30],
            30: [2, 30],
            33: [2, 30]
        }, {
            18: [2, 33],
            33: [2, 33]
        }, {
            18: [2, 40],
            28: [2, 40],
            29: [2, 40],
            30: [2, 40],
            33: [2, 40],
            34: [1, 57],
            36: [2, 40]
        }, {
            33: [1, 58]
        }, {
            14: [2, 13],
            15: [2, 13],
            16: [2, 13],
            19: [2, 13],
            20: [2, 13],
            22: [2, 13],
            23: [2, 13],
            24: [2, 13]
        }, {
            5: [2, 16],
            14: [2, 16],
            15: [2, 16],
            16: [2, 16],
            19: [2, 16],
            20: [2, 16],
            22: [2, 16],
            23: [2, 16],
            24: [2, 16]
        }, {
            5: [2, 17],
            14: [2, 17],
            15: [2, 17],
            16: [2, 17],
            19: [2, 17],
            20: [2, 17],
            22: [2, 17],
            23: [2, 17],
            24: [2, 17]
        }, {
            5: [2, 18],
            14: [2, 18],
            15: [2, 18],
            16: [2, 18],
            19: [2, 18],
            20: [2, 18],
            22: [2, 18],
            23: [2, 18],
            24: [2, 18]
        }, {
            18: [1, 59]
        }, {
            18: [1, 60]
        }, {
            18: [2, 21]
        }, {
            18: [2, 25],
            28: [2, 25],
            29: [2, 25],
            30: [2, 25],
            33: [2, 25]
        }, {
            18: [2, 32],
            33: [2, 32]
        }, {
            34: [1, 57]
        }, {
            21: 61,
            28: [1, 62],
            29: [1, 63],
            30: [1, 64],
            33: [1, 25],
            35: 24
        }, {
            18: [2, 39],
            28: [2, 39],
            29: [2, 39],
            30: [2, 39],
            33: [2, 39],
            36: [2, 39]
        }, {
            5: [2, 19],
            14: [2, 19],
            15: [2, 19],
            16: [2, 19],
            19: [2, 19],
            20: [2, 19],
            22: [2, 19],
            23: [2, 19],
            24: [2, 19]
        }, {
            5: [2, 15],
            14: [2, 15],
            15: [2, 15],
            16: [2, 15],
            19: [2, 15],
            20: [2, 15],
            22: [2, 15],
            23: [2, 15],
            24: [2, 15]
        }, {
            18: [2, 34],
            33: [2, 34]
        }, {
            18: [2, 35],
            33: [2, 35]
        }, {
            18: [2, 36],
            33: [2, 36]
        }, {
            18: [2, 37],
            33: [2, 37]
        }],
        defaultActions: {
            16: [2, 1],
            37: [2, 23],
            53: [2, 21]
        },
        parseError: function (b, c) {
            throw new Error(b);
        },
        parse: function (b) {
            function o(a) {
                d.length = d.length - 2 * a, e.length = e.length - a, f.length = f.length - a;
            }
            function p() {
                var a;
                return a = c.lexer.lex() || 1, typeof a != "number" && (a = c.symbols_[a] || a), a;
            }
            var c = this, d = [0], e = [null], f = [], g = this.table, h = "", i = 0, j = 0, k = 0, l = 2, m = 1;
            this.lexer.setInput(b), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
            var n = this.lexer.yylloc;
            f.push(n), typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
            var q, r, s, t, u, v, w = {}, x, y, z, A;
            for (; ;) {
                s = d[d.length - 1], this.defaultActions[s] ? t = this.defaultActions[s] : (q == null && (q = p()), t = g[s] && g[s][q]);
                if (typeof t == "undefined" || !t.length || !t[0]) if (!k) {
                    A = [];
                    for (x in g[s]) this.terminals_[x] && x > 2 && A.push("'" + this.terminals_[x] + "'");
                    var B = "";
                    this.lexer.showPosition ? B = "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + A.join(", ") + ", got '" + this.terminals_[q] + "'" : B = "Parse error on line " + (i + 1) + ": Unexpected " + (q == 1 ? "end of input" : "'" + (this.terminals_[q] || q) + "'"), this.parseError(B, {
                        text: this.lexer.match,
                        token: this.terminals_[q] || q,
                        line: this.lexer.yylineno,
                        loc: n,
                        expected: A
                    });
                }
                if (t[0] instanceof Array && t.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + s + ", token: " + q);
                switch (t[0]) {
                    case 1:
                        d.push(q), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(t[1]), q = null, r ? (q = r, r = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, k > 0 && k--);
                        break;
                    case 2:
                        y = this.productions_[t[1]][1], w.$ = e[e.length - y], w._$ = {
                            first_line: f[f.length - (y || 1)].first_line,
                            last_line: f[f.length - 1].last_line,
                            first_column: f[f.length - (y || 1)].first_column,
                            last_column: f[f.length - 1].last_column
                        }, v = this.performAction.call(w, h, j, i, this.yy, t[1], e, f);
                        if (typeof v != "undefined") return v;
                        y && (d = d.slice(0, -1 * y * 2), e = e.slice(0, -1 * y), f = f.slice(0, -1 * y)), d.push(this.productions_[t[1]][0]), e.push(w.$), f.push(w._$), z = g[d[d.length - 2]][d[d.length - 1]], d.push(z);
                        break;
                    case 3:
                        return !0;
                }
            }
            return !0;
        }
    }, b = function () {
        var a = {
            EOF: 1,
            parseError: function (b, c) {
                if (!this.yy.parseError) throw new Error(b);
                this.yy.parseError(b, c);
            },
            setInput: function (a) {
                return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                }, this;
            },
            input: function () {
                var a = this._input[0];
                this.yytext += a, this.yyleng++, this.match += a, this.matched += a;
                var b = a.match(/\n/);
                return b && this.yylineno++, this._input = this._input.slice(1), a;
            },
            unput: function (a) {
                return this._input = a + this._input, this;
            },
            more: function () {
                return this._more = !0, this;
            },
            pastInput: function () {
                var a = this.matched.substr(0, this.matched.length - this.match.length);
                return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function () {
                var a = this.match;
                return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "");
            },
            showPosition: function () {
                var a = this.pastInput(), b = (new Array(a.length + 1)).join("-");
                return a + this.upcomingInput() + "\n" + b + "^";
            },
            next: function () {
                if (this.done) return this.EOF;
                this._input || (this.done = !0);
                var a, b, c, d;
                this._more || (this.yytext = "", this.match = "");
                var e = this._currentRules();
                for (var f = 0; f < e.length; f++) {
                    b = this._input.match(this.rules[e[f]]);
                    if (b) {
                        d = b[0].match(/\n.*/g), d && (this.yylineno += d.length), this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: d ? d[d.length - 1].length - 1 : this.yylloc.last_column + b[0].length
                        }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, e[f], this.conditionStack[this.conditionStack.length - 1]);
                        if (a) return a;
                        return;
                    }
                }
                if (this._input === "") return this.EOF;
                this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });
            },
            lex: function () {
                var b = this.next();
                return typeof b != "undefined" ? b : this.lex();
            },
            begin: function (b) {
                this.conditionStack.push(b);
            },
            popState: function () {
                return this.conditionStack.pop();
            },
            _currentRules: function () {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            },
            topState: function () {
                return this.conditionStack[this.conditionStack.length - 2];
            },
            pushState: function (b) {
                this.begin(b);
            }
        };
        return a.performAction = function (b, c, d, e) {
            var f = e;
            switch (d) {
                case 0:
                    c.yytext.slice(-1) !== "\\" && this.begin("mu"), c.yytext.slice(-1) === "\\" && (c.yytext = c.yytext.substr(0, c.yyleng - 1), this.begin("emu"));
                    if (c.yytext) return 14;
                    break;
                case 1:
                    return 14;
                case 2:
                    return this.popState(), 14;
                case 3:
                    return 24;
                case 4:
                    return 16;
                case 5:
                    return 20;
                case 6:
                    return 19;
                case 7:
                    return 19;
                case 8:
                    return 23;
                case 9:
                    return 23;
                case 10:
                    return c.yytext = c.yytext.substr(3, c.yyleng - 5), this.popState(), 15;
                case 11:
                    return 22;
                case 12:
                    return 34;
                case 13:
                    return 33;
                case 14:
                    return 33;
                case 15:
                    return 36;
                case 16:
                    break;
                case 17:
                    return this.popState(), 18;
                case 18:
                    return this.popState(), 18;
                case 19:
                    return c.yytext = c.yytext.substr(1, c.yyleng - 2).replace(/\\"/g, '"'), 28;
                case 20:
                    return 30;
                case 21:
                    return 30;
                case 22:
                    return 29;
                case 23:
                    return 33;
                case 24:
                    return c.yytext = c.yytext.substr(1, c.yyleng - 2), 33;
                case 25:
                    return "INVALID";
                case 26:
                    return 5;
            }
        }, a.rules = [/^[^\x00]*?(?=(\{\{))/, /^[^\x00]+/, /^[^\x00]{2,}?(?=(\{\{))/, /^\{\{>/, /^\{\{#/, /^\{\{\//, /^\{\{\^/, /^\{\{\s*else\b/, /^\{\{\{/, /^\{\{&/, /^\{\{![\s\S]*?\}\}/, /^\{\{/, /^=/, /^\.(?=[} ])/, /^\.\./, /^[\/.]/, /^\s+/, /^\}\}\}/, /^\}\}/, /^"(\\["]|[^"])*"/, /^true(?=[}\s])/, /^false(?=[}\s])/, /^[0-9]+(?=[}\s])/, /^[a-zA-Z0-9_$-]+(?=[=}\s\/.])/, /^\[[^\]]*\]/, /^./, /^$/], a.conditions = {
            mu: {
                rules: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                inclusive: !1
            },
            emu: {
                rules: [2],
                inclusive: !1
            },
            INITIAL: {
                rules: [0, 1, 26],
                inclusive: !0
            }
        }, a;
    }();
    return a.lexer = b, a;
}();

typeof require != "undefined" && typeof exports != "undefined" && (exports.parser = handlebars, exports.parse = function () {
    return handlebars.parse.apply(handlebars, arguments);
}, exports.main = function (b) {
    if (!b[1]) throw new Error("Usage: " + b[0] + " FILE");
    if (typeof process != "undefined") var c = require("fs").readFileSync(require("path").join(process.cwd(), b[1]), "utf8"); else var d = require("file").path(require("file").cwd()), c = d.join(b[1]).read({
        charset: "utf-8"
    });
    return exports.parser.parse(c);
}, typeof module != "undefined" && require.main === module && exports.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args)), Handlebars.Parser = handlebars, Handlebars.parse = function (a) {
    return Handlebars.Parser.yy = Handlebars.AST, Handlebars.Parser.parse(a);
}, Handlebars.print = function (a) {
    return (new Handlebars.PrintVisitor).accept(a);
}, Handlebars.logger = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,
    log: function (a, b) { }
}, Handlebars.log = function (a, b) {
    Handlebars.logger.log(a, b);
}, function () {
    Handlebars.AST = {}, Handlebars.AST.ProgramNode = function (a, b) {
        this.type = "program", this.statements = a, b && (this.inverse = new Handlebars.AST.ProgramNode(b));
    }, Handlebars.AST.MustacheNode = function (a, b, c) {
        this.type = "mustache", this.id = a[0], this.params = a.slice(1), this.hash = b, this.escaped = !c;
    }, Handlebars.AST.PartialNode = function (a, b) {
        this.type = "partial", this.id = a, this.context = b;
    };
    var a = function (a, b) {
        if (a.original !== b.original) throw new Handlebars.Exception(a.original + " doesn't match " + b.original);
    };
    Handlebars.AST.BlockNode = function (b, c, d) {
        a(b.id, d), this.type = "block", this.mustache = b, this.program = c;
    }, Handlebars.AST.InverseNode = function (b, c, d) {
        a(b.id, d), this.type = "inverse", this.mustache = b, this.program = c;
    }, Handlebars.AST.ContentNode = function (a) {
        this.type = "content", this.string = a;
    }, Handlebars.AST.HashNode = function (a) {
        this.type = "hash", this.pairs = a;
    }, Handlebars.AST.IdNode = function (a) {
        this.type = "ID", this.original = a.join(".");
        var b = [], c = 0;
        for (var d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            f === ".." ? c++ : f === "." || f === "this" ? this.isScoped = !0 : b.push(f);
        }
        this.parts = b, this.string = b.join("."), this.depth = c, this.isSimple = b.length === 1 && c === 0;
    }, Handlebars.AST.StringNode = function (a) {
        this.type = "STRING", this.string = a;
    }, Handlebars.AST.IntegerNode = function (a) {
        this.type = "INTEGER", this.integer = a;
    }, Handlebars.AST.BooleanNode = function (a) {
        this.type = "BOOLEAN", this.bool = a;
    }, Handlebars.AST.CommentNode = function (a) {
        this.type = "comment", this.comment = a;
    };
}(), Handlebars.Exception = function (a) {
    var b = Error.prototype.constructor.apply(this, arguments);
    for (var c in b) b.hasOwnProperty(c) && (this[c] = b[c]);
    this.message = b.message;
}, Handlebars.Exception.prototype = new Error, Handlebars.SafeString = function (a) {
    this.string = a;
}, Handlebars.SafeString.prototype.toString = function () {
    return this.string.toString();
}, function () {
    var a = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, b = /&(?!\w+;)|[<>"'`]/g, c = /[&<>"'`]/, d = function (b) {
        return a[b] || "&amp;";
    };
    Handlebars.Utils = {
        escapeExpression: function (a) {
            return a instanceof Handlebars.SafeString ? a.toString() : a == null || a === !1 ? "" : c.test(a) ? a.replace(b, d) : a;
        },
        isEmpty: function (a) {
            return typeof a == "undefined" ? !0 : a === null ? !0 : a === !1 ? !0 : Object.prototype.toString.call(a) === "[object Array]" && a.length === 0 ? !0 : !1;
        }
    };
}(), Handlebars.Compiler = function () { }, Handlebars.JavaScriptCompiler = function () { }, function (a, b) {
    a.OPCODE_MAP = {
        appendContent: 1,
        getContext: 2,
        lookupWithHelpers: 3,
        lookup: 4,
        append: 5,
        invokeMustache: 6,
        appendEscaped: 7,
        pushString: 8,
        truthyOrFallback: 9,
        functionOrFallback: 10,
        invokeProgram: 11,
        invokePartial: 12,
        push: 13,
        assignToHash: 15,
        pushStringParam: 16
    }, a.MULTI_PARAM_OPCODES = {
        appendContent: 1,
        getContext: 1,
        lookupWithHelpers: 2,
        lookup: 1,
        invokeMustache: 3,
        pushString: 1,
        truthyOrFallback: 1,
        functionOrFallback: 1,
        invokeProgram: 3,
        invokePartial: 1,
        push: 1,
        assignToHash: 1,
        pushStringParam: 1
    }, a.DISASSEMBLE_MAP = {};
    for (var c in a.OPCODE_MAP) {
        var d = a.OPCODE_MAP[c];
        a.DISASSEMBLE_MAP[d] = c;
    }
    a.multiParamSize = function (b) {
        return a.MULTI_PARAM_OPCODES[a.DISASSEMBLE_MAP[b]];
    }, a.prototype = {
        compiler: a,
        disassemble: function () {
            var b = this.opcodes, c, d, e = [], f, g, h;
            for (var i = 0, j = b.length; i < j; i++) {
                c = b[i];
                if (c === "DECLARE") g = b[++i], h = b[++i], e.push("DECLARE " + g + " = " + h); else {
                    f = a.DISASSEMBLE_MAP[c];
                    var k = a.multiParamSize(c), l = [];
                    for (var m = 0; m < k; m++) d = b[++i], typeof d == "string" && (d = '"' + d.replace("\n", "\\n") + '"'), l.push(d);
                    f = f + " " + l.join(" "), e.push(f);
                }
            }
            return e.join("\n");
        },
        guid: 0,
        compile: function (a, b) {
            this.children = [], this.depths = {
                list: []
            }, this.options = b;
            var c = this.options.knownHelpers;
            this.options.knownHelpers = {
                helperMissing: !0,
                blockHelperMissing: !0,
                each: !0,
                "if": !0,
                unless: !0,
                "with": !0,
                log: !0
            };
            if (c) for (var d in c) this.options.knownHelpers[d] = c[d];
            return this.program(a);
        },
        accept: function (a) {
            return this[a.type](a);
        },
        program: function (a) {
            var b = a.statements, c;
            this.opcodes = [];
            for (var d = 0, e = b.length; d < e; d++) c = b[d], this[c.type](c);
            return this.isSimple = e === 1, this.depths.list = this.depths.list.sort(function (a, b) {
                return a - b;
            }), this;
        },
        compileProgram: function (a) {
            var b = (new this.compiler).compile(a, this.options), c = this.guid++;
            this.usePartial = this.usePartial || b.usePartial, this.children[c] = b;
            for (var d = 0, e = b.depths.list.length; d < e; d++) {
                depth = b.depths.list[d];
                if (depth < 2) continue;
                this.addDepth(depth - 1);
            }
            return c;
        },
        block: function (a) {
            var b = a.mustache, c, d, e, f, g = this.setupStackForMustache(b), h = this.compileProgram(a.program);
            a.program.inverse && (f = this.compileProgram(a.program.inverse), this.declare("inverse", f)), this.opcode("invokeProgram", h, g.length, !!b.hash), this.declare("inverse", null), this.opcode("append");
        },
        inverse: function (a) {
            var b = this.setupStackForMustache(a.mustache), c = this.compileProgram(a.program);
            this.declare("inverse", c), this.opcode("invokeProgram", null, b.length, !!a.mustache.hash), this.declare("inverse", null), this.opcode("append");
        },
        hash: function (a) {
            var b = a.pairs, c, d;
            this.opcode("push", "{}");
            for (var e = 0, f = b.length; e < f; e++) c = b[e], d = c[1], this.accept(d), this.opcode("assignToHash", c[0]);
        },
        partial: function (a) {
            var b = a.id;
            this.usePartial = !0, a.context ? this.ID(a.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", b.original), this.opcode("append");
        },
        content: function (a) {
            this.opcode("appendContent", a.string);
        },
        mustache: function (a) {
            var b = this.setupStackForMustache(a);
            this.opcode("invokeMustache", b.length, a.id.original, !!a.hash), a.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
        },
        ID: function (a) {
            this.addDepth(a.depth), this.opcode("getContext", a.depth), this.opcode("lookupWithHelpers", a.parts[0] || null, a.isScoped || !1);
            for (var b = 1, c = a.parts.length; b < c; b++) this.opcode("lookup", a.parts[b]);
        },
        STRING: function (a) {
            this.opcode("pushString", a.string);
        },
        INTEGER: function (a) {
            this.opcode("push", a.integer);
        },
        BOOLEAN: function (a) {
            this.opcode("push", a.bool);
        },
        comment: function () { },
        pushParams: function (a) {
            var b = a.length, c;
            while (b--) c = a[b], this.options.stringParams ? (c.depth && this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.string)) : this[c.type](c);
        },
        opcode: function (b, c, d, e) {
            this.opcodes.push(a.OPCODE_MAP[b]), c !== undefined && this.opcodes.push(c), d !== undefined && this.opcodes.push(d), e !== undefined && this.opcodes.push(e);
        },
        declare: function (a, b) {
            this.opcodes.push("DECLARE"), this.opcodes.push(a), this.opcodes.push(b);
        },
        addDepth: function (a) {
            if (a === 0) return;
            this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a));
        },
        setupStackForMustache: function (a) {
            var b = a.params;
            return this.pushParams(b), a.hash && this.hash(a.hash), this.ID(a.id), b;
        }
    }, b.prototype = {
        nameLookup: function (a, c, d) {
            return /^[0-9]+$/.test(c) ? a + "[" + c + "]" : b.isValidJavaScriptVariableName(c) ? a + "." + c : a + "['" + c + "']";
        },
        appendToBuffer: function (a) {
            return this.environment.isSimple ? "return " + a + ";" : "buffer += " + a + ";";
        },
        initializeBuffer: function () {
            return this.quotedString("");
        },
        namespace: "Handlebars",
        compile: function (a, b, c, d) {
            this.environment = a, this.options = b || {}, this.name = this.environment.name, this.isChild = !!c, this.context = c || {
                programs: [],
                aliases: {
                    self: "this"
                },
                registers: {
                    list: []
                }
            }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.compileChildren(a, b);
            var e = a.opcodes, f;
            this.i = 0;
            for (h = e.length; this.i < h; this.i++) f = this.nextOpcode(0), f[0] === "DECLARE" ? (this.i = this.i + 2, this[f[1]] = f[2]) : (this.i = this.i + f[1].length, this[f[0]].apply(this, f[1]));
            return this.createFunctionContext(d);
        },
        nextOpcode: function (b) {
            var c = this.environment.opcodes, d = c[this.i + b], e, f, g, h;
            if (d === "DECLARE") return e = c[this.i + 1], f = c[this.i + 2], ["DECLARE", e, f];
            e = a.DISASSEMBLE_MAP[d], g = a.multiParamSize(d), h = [];
            for (var i = 0; i < g; i++) h.push(c[this.i + i + 1 + b]);
            return [e, h];
        },
        eat: function (a) {
            this.i = this.i + a.length;
        },
        preamble: function () {
            var a = [];
            this.useRegister("foundHelper");
            if (!this.isChild) {
                var b = this.namespace, c = "helpers = helpers || " + b + ".helpers;";
                this.environment.usePartial && (c = c + " partials = partials || " + b + ".partials;"), a.push(c);
            } else a.push("");
            this.environment.isSimple ? a.push("") : a.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = a;
        },
        createFunctionContext: function (a) {
            var b = this.stackVars;
            this.isChild || (b = b.concat(this.context.registers.list)), b.length > 0 && (this.source[1] = this.source[1] + ", " + b.join(", "));
            if (!this.isChild) {
                var c = [];
                for (var d in this.context.aliases) this.source[1] = this.source[1] + ", " + d + "=" + this.context.aliases[d];
            }
            this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
            var e = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
            for (var f = 0, g = this.environment.depths.list.length; f < g; f++) e.push("depth" + this.environment.depths.list[f]);
            if (a) return e.push(this.source.join("\n  ")), Function.apply(this, e);
            var h = "function " + (this.name || "") + "(" + e.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
            return Handlebars.log(Handlebars.logger.DEBUG, h + "\n\n"), h;
        },
        appendContent: function (a) {
            this.source.push(this.appendToBuffer(this.quotedString(a)));
        },
        append: function () {
            var a = this.popStack();
            this.source.push("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }");
        },
        appendEscaped: function () {
            var a = this.nextOpcode(1), b = "";
            this.context.aliases.escapeExpression = "this.escapeExpression", a[0] === "appendContent" && (b = " + " + this.quotedString(a[1][0]), this.eat(a)), this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + b));
        },
        getContext: function (a) {
            this.lastContext !== a && (this.lastContext = a);
        },
        lookupWithHelpers: function (a, b) {
            if (a) {
                var c = this.nextStack();
                this.usingKnownHelper = !1;
                var d;
                !b && this.options.knownHelpers[a] ? (d = c + " = " + this.nameLookup("helpers", a, "helper"), this.usingKnownHelper = !0) : b || this.options.knownHelpersOnly ? d = c + " = " + this.nameLookup("depth" + this.lastContext, a, "context") : (this.register("foundHelper", this.nameLookup("helpers", a, "helper")), d = c + " = foundHelper || " + this.nameLookup("depth" + this.lastContext, a, "context")), d += ";", this.source.push(d);
            } else this.pushStack("depth" + this.lastContext);
        },
        lookup: function (a) {
            var b = this.topStack();
            this.source.push(b + " = (" + b + " === null || " + b + " === undefined || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context") + ");");
        },
        pushStringParam: function (a) {
            this.pushStack("depth" + this.lastContext), this.pushString(a);
        },
        pushString: function (a) {
            this.pushStack(this.quotedString(a));
        },
        push: function (a) {
            this.pushStack(a);
        },
        invokeMustache: function (a, b, c) {
            this.populateParams(a, this.quotedString(b), "{}", null, c, function (a, b, c) {
                this.usingKnownHelper || (this.context.aliases.helperMissing = "helpers.helperMissing", this.context.aliases.undef = "void 0", this.source.push("else if(" + c + "=== undef) { " + a + " = helperMissing.call(" + b + "); }"), a !== c && this.source.push("else { " + a + " = " + c + "; }"));
            });
        },
        invokeProgram: function (a, b, c) {
            var d = this.programExpression(this.inverse), e = this.programExpression(a);
            this.populateParams(b, null, e, d, c, function (a, b, c) {
                this.usingKnownHelper || (this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing", this.source.push("else { " + a + " = blockHelperMissing.call(" + b + "); }"));
            });
        },
        populateParams: function (a, b, c, d, e, f) {
            var g = e || this.options.stringParams || d || this.options.data, h = this.popStack(), i, j = [], k, l, m;
            g ? (this.register("tmp1", c), m = "tmp1") : m = "{ hash: {} }";
            if (g) {
                var n = e ? this.popStack() : "{}";
                this.source.push("tmp1.hash = " + n + ";");
            }
            this.options.stringParams && this.source.push("tmp1.contexts = [];");
            for (var o = 0; o < a; o++) k = this.popStack(), j.push(k), this.options.stringParams && this.source.push("tmp1.contexts.push(" + this.popStack() + ");");
            d && (this.source.push("tmp1.fn = tmp1;"), this.source.push("tmp1.inverse = " + d + ";")), this.options.data && this.source.push("tmp1.data = data;"), j.push(m), this.populateCall(j, h, b || h, f, c !== "{}");
        },
        populateCall: function (a, b, c, d, e) {
            var f = ["depth0"].concat(a).join(", "), g = ["depth0"].concat(c).concat(a).join(", "), h = this.nextStack();
            if (this.usingKnownHelper) this.source.push(h + " = " + b + ".call(" + f + ");"); else {
                this.context.aliases.functionType = '"function"';
                var i = e ? "foundHelper && " : "";
                this.source.push("if(" + i + "typeof " + b + " === functionType) { " + h + " = " + b + ".call(" + f + "); }");
            }
            d.call(this, h, g, b), this.usingKnownHelper = !1;
        },
        invokePartial: function (a) {
            params = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"], this.options.data && params.push("data"), this.pushStack("self.invokePartial(" + params.join(", ") + ");");
        },
        assignToHash: function (a) {
            var b = this.popStack(), c = this.topStack();
            this.source.push(c + "['" + a + "'] = " + b + ";");
        },
        compiler: b,
        compileChildren: function (a, b) {
            var c = a.children, d, e;
            for (var f = 0, g = c.length; f < g; f++) {
                d = c[f], e = new this.compiler, this.context.programs.push("");
                var h = this.context.programs.length;
                d.index = h, d.name = "program" + h, this.context.programs[h] = e.compile(d, b, this.context);
            }
        },
        programExpression: function (a) {
            if (a == null) return "self.noop";
            var b = this.environment.children[a], c = b.depths.list, d = [b.index, b.name, "data"];
            for (var e = 0, f = c.length; e < f; e++) depth = c[e], depth === 1 ? d.push("depth0") : d.push("depth" + (depth - 1));
            return c.length === 0 ? "self.program(" + d.join(", ") + ")" : (d.shift(), "self.programWithDepth(" + d.join(", ") + ")");
        },
        register: function (a, b) {
            this.useRegister(a), this.source.push(a + " = " + b + ";");
        },
        useRegister: function (a) {
            this.context.registers[a] || (this.context.registers[a] = !0, this.context.registers.list.push(a));
        },
        pushStack: function (a) {
            return this.source.push(this.nextStack() + " = " + a + ";"), "stack" + this.stackSlot;
        },
        nextStack: function () {
            return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), "stack" + this.stackSlot;
        },
        popStack: function () {
            return "stack" + this.stackSlot--;
        },
        topStack: function () {
            return "stack" + this.stackSlot;
        },
        quotedString: function (a) {
            return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"';
        }
    };
    var e = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), f = b.RESERVED_WORDS = {};
    for (var g = 0, h = e.length; g < h; g++) f[e[g]] = !0;
    b.isValidJavaScriptVariableName = function (a) {
        return !b.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1;
    };
}(Handlebars.Compiler, Handlebars.JavaScriptCompiler), Handlebars.precompile = function (a, b) {
    b = b || {};
    var c = Handlebars.parse(a), d = (new Handlebars.Compiler).compile(c, b);
    return (new Handlebars.JavaScriptCompiler).compile(d, b);
}, Handlebars.compile = function (a, b) {
    function d() {
        var c = Handlebars.parse(a), d = (new Handlebars.Compiler).compile(c, b), e = (new Handlebars.JavaScriptCompiler).compile(d, b, undefined, !0);
        return Handlebars.template(e);
    }
    b = b || {};
    var c;
    return function (a, b) {
        return c || (c = d()), c.call(this, a, b);
    };
}, Handlebars.VM = {
    template: function (a) {
        var b = {
            escapeExpression: Handlebars.Utils.escapeExpression,
            invokePartial: Handlebars.VM.invokePartial,
            programs: [],
            program: function (a, b, c) {
                var d = this.programs[a];
                return c ? Handlebars.VM.program(b, c) : d ? d : (d = this.programs[a] = Handlebars.VM.program(b), d);
            },
            programWithDepth: Handlebars.VM.programWithDepth,
            noop: Handlebars.VM.noop
        };
        return function (c, d) {
            return d = d || {}, a.call(b, Handlebars, c, d.helpers, d.partials, d.data);
        };
    },
    programWithDepth: function (a, b, c) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function (c, e) {
            return e = e || {}, a.apply(this, [c, e.data || b].concat(d));
        };
    },
    program: function (a, b) {
        return function (c, d) {
            return d = d || {}, a(c, d.data || b);
        };
    },
    noop: function () {
        return "";
    },
    invokePartial: function (a, b, c, d, e, f) {
        options = {
            helpers: d,
            partials: e,
            data: f
        };
        if (a === undefined) throw new Handlebars.Exception("The partial " + b + " could not be found");
        if (a instanceof Function) return a(c, options);
        if (!Handlebars.compile) throw new Handlebars.Exception("The partial " + b + " could not be compiled when running in runtime-only mode");
        return e[b] = Handlebars.compile(a), e[b](c, options);
    }
}, Handlebars.template = Handlebars.VM.template, function () {
    "use strict";
    var a = function () {
        var a = /\-([a-z])/g, b = function (a, b) {
            return b.toUpperCase();
        };
        return function (c) {
            return c.replace(a, b);
        };
    }(), b = function (b, c) {
        var d, e, f, g, h, i;
        window.getComputedStyle ? d = window.getComputedStyle(b, null).getPropertyValue(c) : (e = a(c), b.currentStyle ? d = b.currentStyle[e] : d = b.style[e]);
        if (c === "cursor") if (!d || d === "auto") {
            f = b.tagName.toLowerCase(), g = ["a"];
            for (h = 0, i = g.length; h < i; h++) if (f === g[h]) return "pointer";
        }
        return d;
    }, c = function (a) {
        if (!o.prototype._singleton) return;
        a || (a = window.event);
        var b;
        this !== window ? b = this : a.target ? b = a.target : a.srcElement && (b = a.srcElement), o.prototype._singleton.setCurrent(b);
    }, d = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c);
    }, e = function (a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c);
    }, f = function (a, b) {
        if (a.addClass) return a.addClass(b), a;
        if (b && typeof b == "string") {
            var c = (b || "").split(/\s+/);
            if (a.nodeType === 1) if (!a.className) a.className = b; else {
                var d = " " + a.className + " ", e = a.className;
                for (var f = 0, g = c.length; f < g; f++) d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                a.className = e.replace(/^\s+|\s+$/g, "");
            }
        }
        return a;
    }, g = function (a, b) {
        if (a.removeClass) return a.removeClass(b), a;
        if (b && typeof b == "string" || b === undefined) {
            var c = (b || "").split(/\s+/);
            if (a.nodeType === 1 && a.className) if (b) {
                var d = (" " + a.className + " ").replace(/[\n\t]/g, " ");
                for (var e = 0, f = c.length; e < f; e++) d = d.replace(" " + c[e] + " ", " ");
                a.className = d.replace(/^\s+|\s+$/g, "");
            } else a.className = "";
        }
        return a;
    }, h = function () {
        var a, b, c, d = 1;
        return typeof document.body.getBoundingClientRect == "function" && (a = document.body.getBoundingClientRect(), b = a.right - a.left, c = document.body.offsetWidth, d = Math.round(b / c * 100) / 100), d;
    }, i = function (a) {
        var c = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            zIndex: 999999999
        }, d = b(a, "z-index");
        d && d !== "auto" && (c.zIndex = parseInt(d, 10));
        if (a.getBoundingClientRect) {
            var e = a.getBoundingClientRect(), f, g, i;
            "pageXOffset" in window && "pageYOffset" in window ? (f = window.pageXOffset, g = window.pageYOffset) : (i = h(), f = Math.round(document.documentElement.scrollLeft / i), g = Math.round(document.documentElement.scrollTop / i));
            var j = document.documentElement.clientLeft || 0, k = document.documentElement.clientTop || 0;
            c.left = e.left + f - j, c.top = e.top + g - k, c.width = "width" in e ? e.width : e.right - e.left, c.height = "height" in e ? e.height : e.bottom - e.top;
        }
        return c;
    }, j = function (a, b) {
        var c = !b || b.useNoCache !== !1;
        return c ? (a.indexOf("?") === -1 ? "?" : "&") + "nocache=" + (new Date).getTime() : "";
    }, k = function (a) {
        var b = [], c = [];
        return a.trustedOrigins && (typeof a.trustedOrigins == "string" ? c.push(a.trustedOrigins) : typeof a.trustedOrigins == "object" && "length" in a.trustedOrigins && (c = c.concat(a.trustedOrigins))), a.trustedDomains && (typeof a.trustedDomains == "string" ? c.push(a.trustedDomains) : typeof a.trustedDomains == "object" && "length" in a.trustedDomains && (c = c.concat(a.trustedDomains))), c.length && b.push("trustedOrigins=" + encodeURIComponent(c.join(","))), typeof a.amdModuleId == "string" && a.amdModuleId && b.push("amdModuleId=" + encodeURIComponent(a.amdModuleId)), typeof a.cjsModuleId == "string" && a.cjsModuleId && b.push("cjsModuleId=" + encodeURIComponent(a.cjsModuleId)), b.join("&");
    }, l = function (a, b) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0, d = b.length; c < d; c++) if (b[c] === a) return c;
        return -1;
    }, m = function (a) {
        if (typeof a == "string") throw new TypeError("ZeroClipboard doesn't accept query strings.");
        return a.length ? a : [a];
    }, n = function (a, b, c, d, e) {
        e ? window.setTimeout(function () {
            a.call(b, c, d);
        }, 0) : a.call(b, c, d);
    }, o = function (a, b) {
        a && (o.prototype._singleton || this).glue(a);
        if (o.prototype._singleton) return o.prototype._singleton;
        o.prototype._singleton = this, this.options = {};
        for (var c in s) this.options[c] = s[c];
        for (var d in b) this.options[d] = b[d];
        this.handlers = {}, o.detectFlashSupport() && v();
    }, p, q = [];
    o.prototype.setCurrent = function (a) {
        p = a, this.reposition();
        var c = a.getAttribute("title");
        c && this.setTitle(c);
        var d = this.options.forceHandCursor === !0 || b(a, "cursor") === "pointer";
        return r.call(this, d), this;
    }, o.prototype.setText = function (a) {
        return a && a !== "" && (this.options.text = a, this.ready() && this.flashBridge.setText(a)), this;
    }, o.prototype.setTitle = function (a) {
        return a && a !== "" && this.htmlBridge.setAttribute("title", a), this;
    }, o.prototype.setSize = function (a, b) {
        return this.ready() && this.flashBridge.setSize(a, b), this;
    }, o.prototype.setHandCursor = function (a) {
        return a = typeof a == "boolean" ? a : !!a, r.call(this, a), this.options.forceHandCursor = a, this;
    };
    var r = function (a) {
        this.ready() && this.flashBridge.setHandCursor(a);
    };
    o.version = "1.2.3";
    var s = {
        moviePath: "ZeroClipboard.swf",
        trustedOrigins: null,
        text: null,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        allowScriptAccess: "sameDomain",
        useNoCache: !0,
        forceHandCursor: !1
    };
    o.setDefaults = function (a) {
        for (var b in a) s[b] = a[b];
    }, o.destroy = function () {
        o.prototype._singleton.unglue(q);
        var a = o.prototype._singleton.htmlBridge;
        a.parentNode.removeChild(a), delete o.prototype._singleton;
    }, o.detectFlashSupport = function () {
        var a = !1;
        if (typeof ActiveXObject == "function") try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = !0);
        } catch (b) { }
        return !a && navigator.mimeTypes["application/x-shockwave-flash"] && (a = !0), a;
    };
    var t = null, u = null, v = function () {
        var a, b, c = o.prototype._singleton, d = document.getElementById("global-zeroclipboard-html-bridge");
        if (!d) {
            var e = {};
            for (var f in c.options) e[f] = c.options[f];
            e.amdModuleId = t, e.cjsModuleId = u;
            var g = k(e), h = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + c.options.moviePath + j(c.options.moviePath, c.options) + '"/>         <param name="allowScriptAccess" value="' + c.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + g + '"/>         <embed src="' + c.options.moviePath + j(c.options.moviePath, c.options) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + g + '"           scale="exactfit">         </embed>       </object>';
            d = document.createElement("div"), d.id = "global-zeroclipboard-html-bridge", d.setAttribute("class", "global-zeroclipboard-container"), d.setAttribute("data-clipboard-ready", !1), d.style.position = "absolute", d.style.left = "-9999px", d.style.top = "-9999px", d.style.width = "15px", d.style.height = "15px", d.style.zIndex = "9999", d.innerHTML = h, document.body.appendChild(d);
        }
        c.htmlBridge = d, a = document["global-zeroclipboard-flash-bridge"], a && (b = a.length) && (a = a[b - 1]), c.flashBridge = a || d.children[0].lastElementChild;
    };
    o.prototype.resetBridge = function () {
        return this.htmlBridge.style.left = "-9999px", this.htmlBridge.style.top = "-9999px", this.htmlBridge.removeAttribute("title"), this.htmlBridge.removeAttribute("data-clipboard-text"), g(p, this.options.activeClass), p = null, this.options.text = null, this;
    }, o.prototype.ready = function () {
        var a = this.htmlBridge.getAttribute("data-clipboard-ready");
        return a === "true" || a === !0;
    }, o.prototype.reposition = function () {
        if (!p) return !1;
        var a = i(p);
        return this.htmlBridge.style.top = a.top + "px", this.htmlBridge.style.left = a.left + "px", this.htmlBridge.style.width = a.width + "px", this.htmlBridge.style.height = a.height + "px", this.htmlBridge.style.zIndex = a.zIndex + 1, this.setSize(a.width, a.height), this;
    }, o.dispatch = function (a, b) {
        o.prototype._singleton.receiveEvent(a, b);
    }, o.prototype.on = function (a, b) {
        var c = a.toString().split(/\s/g);
        for (var d = 0; d < c.length; d++) a = c[d].toLowerCase().replace(/^on/, ""), this.handlers[a] || (this.handlers[a] = b);
        return this.handlers.noflash && !o.detectFlashSupport() && this.receiveEvent("onNoFlash", null), this;
    }, o.prototype.addEventListener = o.prototype.on, o.prototype.off = function (a, b) {
        var c = a.toString().split(/\s/g);
        for (var d = 0; d < c.length; d++) {
            a = c[d].toLowerCase().replace(/^on/, "");
            for (var e in this.handlers) e === a && this.handlers[e] === b && delete this.handlers[e];
        }
        return this;
    }, o.prototype.removeEventListener = o.prototype.off, o.prototype.receiveEvent = function (a, b) {
        a = a.toString().toLowerCase().replace(/^on/, "");
        var c = p, d = !0;
        switch (a) {
            case "load":
                if (b && parseFloat(b.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10) {
                    this.receiveEvent("onWrongFlash", {
                        flashVersion: b.flashVersion
                    });
                    return;
                }
                this.htmlBridge.setAttribute("data-clipboard-ready", !0);
                break;
            case "mouseover":
                f(c, this.options.hoverClass);
                break;
            case "mouseout":
                g(c, this.options.hoverClass), this.resetBridge();
                break;
            case "mousedown":
                f(c, this.options.activeClass);
                break;
            case "mouseup":
                g(c, this.options.activeClass);
                break;
            case "datarequested":
                var e = c.getAttribute("data-clipboard-target"), h = e ? document.getElementById(e) : null;
                if (h) {
                    var i = h.value || h.textContent || h.innerText;
                    i && this.setText(i);
                } else {
                    var j = c.getAttribute("data-clipboard-text");
                    j && this.setText(j);
                }
                d = !1;
                break;
            case "complete":
                this.options.text = null;
        }
        if (this.handlers[a]) {
            var k = this.handlers[a];
            typeof k == "string" && typeof window[k] == "function" && (k = window[k]), typeof k == "function" && n(k, c, this, b, d);
        }
    }, o.prototype.glue = function (a) {
        a = m(a);
        for (var b = 0; b < a.length; b++) l(a[b], q) == -1 && (q.push(a[b]), d(a[b], "mouseover", c));
        return this;
    }, o.prototype.unglue = function (a) {
        a = m(a);
        for (var b = 0; b < a.length; b++) {
            e(a[b], "mouseover", c);
            var d = l(a[b], q);
            d != -1 && q.splice(d, 1);
        }
        return this;
    }, typeof define == "function" && define.amd ? define(["require", "exports", "module"], function (a, b, c) {
        return t = c && c.id || null, o;
    }) : typeof module == "object" && module && typeof module.exports == "object" && module.exports ? (u = module.id || null, module.exports = o) : window.ZeroClipboard = o;
}(), ZeroClipboard.setDefaults({
    moviePath: "http://static.huluim.com/huluguru/ZeroClipboard-25b5ee2a175527f2cfa16d9d9ffbb7fe.swf"
}), function (a) {
    function n() {
        return setTimeout(o, 0), h = a.now();
    }
    function o() {
        h = undefined;
    }
    function p(e) {
        if (!b[e]) {
            var f = document.body, g = a("<" + e + ">").appendTo(f), h = g.css("display");
            g.remove();
            if (h === "none" || h === "") {
                c || (c = document.createElement("iframe"), c.frameBorder = c.width = c.height = 0), f.appendChild(c);
                if (!d || !c.createElement) d = (c.contentWindow || c.contentDocument).document, d.write((a.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), d.close();
                g = d.createElement(e), d.body.appendChild(g), h = a.css(g, "display"), f.removeChild(c);
            }
            b[e] = h;
        }
        return b[e];
    }
    var b = {}, c, d, e = /^(?:toggle|show|hide)$/, f = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, g, h, i = document.createElement("div"), j = i.style, k = "Transition", l = "cubic-bezier(", m;
    a.support.transition = "Moz" + k in j ? "Moz" + k : "Webkit" + k in j && a.client.browser.toLowerCase() != "chrome" ? "Webkit" + k : !1, a.cssNumber.color = a.cssNumber.backgroundColor = !0, m = {
        linear: "linear",
        swing: "ease-out",
        bounce: l + "0,.35,.5,1.3)",
        easeInQuad: l + ".55,.085,.68,.53)",
        easeInCubic: l + ".55,.055,.675,.19)",
        easeInQuart: l + ".895,.03,.685,.22)",
        easeInQuint: l + ".755,.05,.855,.06)",
        easeInSine: l + ".47,0,.745,.715)",
        easeInExpo: l + ".95,.05,.795,.035)",
        easeInCirc: l + ".6,.04,.98,.335)",
        easeOutQuad: l + ".25,.46,.45,.94)",
        easeOutCubic: l + ".215,.61,.355,1)",
        easeOutQuart: l + ".165,.84,.44,1)",
        easeOutQuint: l + ".23,1,.32,1)",
        easeOutSine: l + ".39,.575,.565,1)",
        easeOutExpo: l + ".19,1,.22,1)",
        easeOutCirc: l + ".075,.82,.165,1)",
        easeInOutQuad: l + ".455,.03,.515,.955)",
        easeInOutCubic: l + ".645,.045,.355,1)",
        easeInOutQuart: l + ".77,0,.175,1)",
        easeInOutQuint: l + ".86,0,.07,1)",
        easeInOutSine: l + ".445,.05,.55,.95)",
        easeInOutExpo: l + "1,0,0,1)",
        easeInOutCirc: l + ".785,.135,.15,.86)"
    }, a.fn.extend({
        animate: function (b, c, d, g) {
            function i() {
                h.queue === !1 && a._mark(this);
                var c = a.extend({}, h), d = this.nodeType === 1, g = d && a(this).is(":hidden"), i, j, k, l, n, o, q, r, s, t, u, v = a.cssProps, w = !c.step && a.support.transition, x, y = [], z, A, B, C;
                c.animatedProperties = {}, c.transition = {};
                for (k in b) {
                    i = a.camelCase(k), k !== i && (b[i] = b[k], delete b[k]);
                    if ((n = a.cssHooks[i]) && "expand" in n) {
                        o = n.expand(b[i]), delete b[i];
                        for (k in o) k in b || (b[k] = o[k]);
                    }
                }
                for (i in b) {
                    j = b[i], a.isArray(j) ? (z = c.animatedProperties[i] = j[1], j = b[i] = j[0]) : z = c.animatedProperties[i] = c.specialEasing && c.specialEasing[i] || c.easing || "swing", x = w && d && c.duration > 0 && i.indexOf("scroll") && m[z], x && (A = v[i] || i, B = A.replace(/([A-Z])/g, "-$1").toLowerCase(), x = B + " " + c.duration + "ms " + x, c.transition[i] = {
                        lower: B,
                        real: A
                    }, y.push(x));
                    if (j === "hide" && g || j === "show" && !g) return c.complete.call(this);
                    d && (i === "height" || i === "width") && (c.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], a.css(this, "display") === "inline" && a.css(this, "float") === "none" && (!a.support.inlineBlockNeedsLayout || p(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
                }
                c.overflow != null && (this.style.overflow = "hidden");
                for (k in b) l = new a.fx(this, c, k), j = b[k], e.test(j) ? (u = a._data(this, "toggle" + k) || (j === "toggle" ? g ? "show" : "hide" : 0), u ? (a._data(this, "toggle" + k, u === "show" ? "hide" : "show"), l[u]()) : l[j]()) : (q = f.exec(j), r = l.cur(), q ? (s = parseFloat(q[2]), t = q[3] || (a.cssNumber[k] ? "" : "px"), t !== "px" && k !== "opacity" && (a.style(this, k, (s || 1) + t), r = (s || 1) / l.cur() * r, a.style(this, k, r + t)), q[1] && (s = (q[1] === "-=" ? -1 : 1) * s + r), l.custom(r, s, t)) : l.custom(r, j, ""));
                if (w && y.length) {
                    x = this.style[w], C = window.getComputedStyle(this), this.style[w] = y.join() + (x && x.indexOf("none") ? "," + x : "");
                    for (k in c.transition) C && C[k], a.style.apply(null, c.transition[k].styleToSet);
                }
                return !0;
            }
            var h = a.speed(c, d, g);
            return a.isEmptyObject(b) ? this.each(h.complete, [!1]) : (b = a.extend({}, b), h.queue === !1 ? this.each(i) : this.queue(h.queue, i));
        },
        stop: function (b, c, d) {
            return typeof b != "string" && (d = c, c = b, b = undefined), c && b !== !1 && this.queue(b || "fx", []), this.each(function () {
                function i(b, c, e) {
                    var f = c[e];
                    a.removeData(b, e, !0), f.stop(d);
                }
                var c, e = !1, f = a.timers, g = a._data(this), h = a.support.transition;
                d || a._unmark(!0, this);
                if (b == null) for (c in g) g[c] && g[c].stop && c.indexOf(".run") === c.length - 4 && i(this, g, c); else g[c = b + ".run"] && g[c].stop && i(this, g, c);
                for (c = f.length; c--;) f[c].elem === this && (b == null || f[c].queue === b) && ((d || h) && f[c](d), d || f[c].saveState(), e = !0, f.splice(c, 1));
                (!d || !e) && a.dequeue(this, b);
            });
        }
    }), a.extend(a.fx.prototype, {
        cur: function () {
            if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                var b, c = a.css(this.elem, this.prop);
                return isNaN(b = parseFloat(c)) ? !c || c === "auto" ? 0 : c : b;
            }
            return this.elem[this.prop];
        },
        custom: function (b, c, d) {
            function k(a) {
                return e.step(a);
            }
            var e = this, f = a.fx, i = e.options.transition, j = this.prop;
            this.startTime = h || n(), this.end = c, this.now = this.start = b, this.pos = this.state = 0, this.unit = d || this.unit || (a.cssNumber[j] ? "" : "px"), k.queue = this.options.queue, k.elem = this.elem, k.saveState = function () {
                a._data(e.elem, "fxshow" + e.prop) === undefined && (e.options.hide ? a._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && a._data(e.elem, "fxshow" + e.prop, e.end));
            }, (k.transition = i[j]) ? (a.timers.push(k), j != "transform" && (e.elem.style[i[j].real] = b + e.unit), a.fx.step[j] && (c = Math.max(0, c)), i[j].styleToSet = [e.elem, j, c + e.unit], i[j].timeout = setTimeout(function () {
                a.timers.splice(a.timers.indexOf(k), 1), e.step(!0);
            }, e.options.duration + 30)) : k() && a.timers.push(k) && !g && (g = setInterval(f.tick, f.interval));
        },
        step: function (b) {
            var c, d, e, f = h || n(), g = !0, i = this.elem, j = this.options, k = j.transition[this.prop], l = f >= j.duration + this.startTime, m = a.support.transition;
            if (k || b || l) {
                k ? (clearTimeout(k.timeout), !b && !l && (this.elem.style[k.real] = a.css(this.elem, k.real))) : (this.now = this.end, this.pos = this.state = 1, this.update()), j.animatedProperties[this.prop] = !0;
                for (c in j.animatedProperties) j.animatedProperties[c] !== !0 && (g = !1);
                if (g) {
                    j.overflow != null && !a.support.shrinkWrapBlocks && a.each(["", "X", "Y"], function (a, b) {
                        i.style["overflow" + b] = j.overflow[a];
                    }), j.hide && a(i).hide();
                    if (k) {
                        k = "," + i.style[m];
                        for (c in j.transition) k = k.split(j.transition[c].lower).join("_");
                        k = k.replace(/, ?_[^,]*/g, "").substr(1), i.style[m] = k || "none", !k && (i.style[m] = k);
                    }
                    if (j.hide || j.show) for (c in j.animatedProperties) (b || l) && a.style(i, c, j.orig[c]), a.removeData(i, "fxshow" + c, !0), a.removeData(i, "toggle" + c, !0);
                    e = j.complete, e && (b || l) && (j.complete = !1, e.call(i));
                }
                return !1;
            }
            return j.duration == Infinity ? this.now = f : (d = f - this.startTime, this.state = d / j.duration, this.pos = a.easing[j.animatedProperties[this.prop]](this.state, d, 0, 1, j.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0;
        }
    }), a.extend(a.fx, {
        tick: function () {
            var b, c = a.timers, d = 0;
            for (; d < c.length; d++) b = c[d], !b.transition && !b() && c[d] === b && c.splice(d--, 1);
            c.length || a.fx.stop();
        }
    });
}(jQuery), function (a) {
    a.flexslider = function (b, c) {
        var d = b;
        d.init = function () {
            d.vars = a.extend({}, a.flexslider.defaults, c), d.data("flexslider", !0), d.container = a(".slides", d), d.slides = a(".slides > li", d), d.count = d.slides.length, d.animating = !1, d.currentSlide = d.vars.slideToStart, d.animatingTo = d.currentSlide, d.atEnd = d.currentSlide == 0 ? !0 : !1, d.eventType = "ontouchstart" in document.documentElement ? "touchstart" : "click", d.cloneCount = 0, d.cloneOffset = 0, d.manualPause = !1, d.vertical = d.vars.slideDirection == "vertical", d.prop = d.vertical ? "top" : "marginLeft", d.args = {}, d.transitions = "webkitTransition" in document.body.style, d.transitions && (d.prop = "-webkit-transform"), d.vars.controlsContainer != "" && (d.controlsContainer = a(d.vars.controlsContainer).eq(a(".slides").index(d.container)), d.containerExists = d.controlsContainer.length > 0), d.vars.manualControls != "" && (d.manualControls = a(d.vars.manualControls, d.containerExists ? d.controlsContainer : d), d.manualExists = d.manualControls.length > 0), d.vars.randomize && (d.slides.sort(function () {
                return Math.round(Math.random()) - .5;
            }), d.container.empty().append(d.slides));
            if (d.vars.animation.toLowerCase() == "slide") {
                d.transitions && d.setTransition(0), d.css({
                    overflow: "hidden"
                }), d.vars.animationLoop && (d.cloneCount = 2, d.cloneOffset = 1, d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))), d.newSlides = a(".slides > li", d);
                var b = -1 * (d.currentSlide + d.cloneOffset);
                d.vertical ? (d.newSlides.css({
                    display: "block",
                    width: "100%",
                    "float": "left"
                }), d.container.height((d.count + d.cloneCount) * 200 + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    d.css({
                        position: "relative"
                    }).height(d.slides.filter(":first").height()), d.args[d.prop] = d.transitions ? "translate3d(0," + b * d.height() + "px,0)" : b * d.height() + "px", d.container.css(d.args);
                }, 100)) : (d.args[d.prop] = d.transitions ? "translate3d(" + b * d.width() + "px,0,0)" : b * d.width() + "px", d.container.width((d.count + d.cloneCount) * 200 + "%").css(d.args), setTimeout(function () {
                    d.newSlides.width(d.width()).css({
                        "float": "left",
                        display: "block"
                    });
                }, 100));
            } else d.transitions = !1, d.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%"
            }).eq(d.currentSlide).fadeIn(d.vars.animationDuration);
            if (d.vars.controlNav) {
                if (d.manualExists) d.controlNav = d.manualControls; else {
                    var e = a('<ol class="flex-control-nav"></ol>'), f = 1;
                    for (var g = 0; g < d.count; g++) e.append("<li><a>" + f + "</a></li>"), f++;
                    d.containerExists ? (a(d.controlsContainer).append(e), d.controlNav = a(".flex-control-nav li a", d.controlsContainer)) : (d.append(e), d.controlNav = a(".flex-control-nav li a", d));
                }
                d.controlNav.eq(d.currentSlide).addClass("active"), d.controlNav.bind(d.eventType, function (b) {
                    b.preventDefault(), a(this).hasClass("active") || (d.controlNav.index(a(this)) > d.currentSlide ? d.direction = "next" : d.direction = "prev", d.flexAnimate(d.controlNav.index(a(this)), d.vars.pauseOnAction));
                });
            }
            if (d.vars.directionNav) {
                var h = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevText + '</a></li><li><a class="next" href="#">' + d.vars.nextText + "</a></li></ul>");
                d.containerExists ? (a(d.controlsContainer).append(h), d.directionNav = a(".flex-direction-nav li a", d.controlsContainer)) : (d.append(h), d.directionNav = a(".flex-direction-nav li a", d)), d.vars.animationLoop || (d.currentSlide == 0 ? d.directionNav.filter(".prev").addClass("disabled") : d.currentSlide == d.count - 1 && d.directionNav.filter(".next").addClass("disabled")), d.directionNav.bind(d.eventType, function (b) {
                    b.preventDefault();
                    var c = a(this).hasClass("next") ? d.getTarget("next") : d.getTarget("prev");
                    d.canAdvance(c) && d.flexAnimate(c, d.vars.pauseOnAction);
                });
            }
            if (d.vars.keyboardNav && a("ul.slides").length == 1) {
                function i(a) {
                    if (d.animating) return;
                    if (a.keyCode != 39 && a.keyCode != 37) return;
                    if (a.keyCode == 39) var b = d.getTarget("next"); else if (a.keyCode == 37) var b = d.getTarget("prev");
                    d.canAdvance(b) && d.flexAnimate(b, d.vars.pauseOnAction);
                }
                a(document).bind("keyup", i);
            }
            d.vars.mousewheel && (d.mousewheelEvent = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel", d.bind(d.mousewheelEvent, function (a) {
                a.preventDefault(), a = a ? a : window.event;
                var b = a.detail ? a.detail * -1 : a.wheelDelta / 40, c = b < 0 ? d.getTarget("next") : d.getTarget("prev");
                d.canAdvance(c) && d.flexAnimate(c, d.vars.pauseOnAction);
            })), d.vars.slideshow && (d.vars.pauseOnHover && d.vars.slideshow && d.hover(function () {
                d.pause();
            }, function () {
                d.manualPause || d.resume();
            }), d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed));
            if (d.vars.pausePlay) {
                var j = a('<div class="flex-pauseplay"><span></span></div>');
                d.containerExists ? (d.controlsContainer.append(j), d.pausePlay = a(".flex-pauseplay span", d.controlsContainer)) : (d.append(j), d.pausePlay = a(".flex-pauseplay span", d));
                var k = d.vars.slideshow ? "pause" : "play";
                d.pausePlay.addClass(k).text(k == "pause" ? d.vars.pauseText : d.vars.playText), d.pausePlay.bind(d.eventType, function (b) {
                    b.preventDefault(), a(this).hasClass("pause") ? (d.pause(), d.manualPause = !0) : (d.resume(), d.manualPause = !1);
                });
            }
            if ("ontouchstart" in document.documentElement) {
                var l, m, n, o, p, q, r = !1;
                function s(a) {
                    d.animating ? a.preventDefault() : a.touches.length == 1 && (d.pause(), o = d.vertical ? d.height() : d.width(), q = Number(new Date), n = d.vertical ? (d.currentSlide + d.cloneOffset) * d.height() : (d.currentSlide + d.cloneOffset) * d.width(), l = d.vertical ? a.touches[0].pageY : a.touches[0].pageX, m = d.vertical ? a.touches[0].pageX : a.touches[0].pageY, d.setTransition(0), this.addEventListener("touchmove", t, !1), this.addEventListener("touchend", u, !1));
                }
                d.each(function () {
                    "ontouchstart" in document.documentElement && this.addEventListener("touchstart", s, !1);
                });
                function t(a) {
                    p = d.vertical ? l - a.touches[0].pageY : l - a.touches[0].pageX, r = d.vertical ? Math.abs(p) < Math.abs(a.touches[0].pageX - m) : Math.abs(p) < Math.abs(a.touches[0].pageY - m), r || (a.preventDefault(), d.vars.animation == "slide" && d.transitions && (d.vars.animationLoop || (p /= d.currentSlide == 0 && p < 0 || d.currentSlide == d.count - 1 && p > 0 ? Math.abs(p) / o + 2 : 1), d.args[d.prop] = d.vertical ? "translate3d(0," + (-n - p) + "px,0)" : "translate3d(" + (-n - p) + "px,0,0)", d.container.css(d.args)));
                }
                function u(a) {
                    d.animating = !1;
                    if (d.animatingTo == d.currentSlide && !r && p != null) {
                        var b = p > 0 ? d.getTarget("next") : d.getTarget("prev");
                        d.canAdvance(b) && Number(new Date) - q < 550 && Math.abs(p) > 20 || Math.abs(p) > o / 2 ? d.flexAnimate(b, d.vars.pauseOnAction) : d.flexAnimate(d.currentSlide, d.vars.pauseOnAction);
                    }
                    this.removeEventListener("touchmove", t, !1), this.removeEventListener("touchend", u, !1), l = null, m = null, p = null, n = null;
                }
            }
            d.vars.animation.toLowerCase() == "slide" && a(window).resize(function () {
                d.animating || (d.vertical ? (d.height(d.slides.filter(":first").height()), d.args[d.prop] = -1 * (d.currentSlide + d.cloneOffset) * d.slides.filter(":first").height() + "px", d.transitions && (d.setTransition(0), d.args[d.prop] = d.vertical ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"), d.container.css(d.args)) : (d.newSlides.width(d.width()), d.args[d.prop] = -1 * (d.currentSlide + d.cloneOffset) * d.width() + "px", d.transitions && (d.setTransition(0), d.args[d.prop] = d.vertical ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"), d.container.css(d.args)));
            }), d.vars.start(d);
        }, d.flexAnimate = function (a, b) {
            if (!d.animating) {
                d.animating = !0, d.animatingTo = a, d.vars.before(d), b && d.pause(), d.vars.controlNav && d.controlNav.removeClass("active").eq(a).addClass("active"), d.atEnd = a == 0 || a == d.count - 1 ? !0 : !1, !d.vars.animationLoop && d.vars.directionNav && (a == 0 ? d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled") : a == d.count - 1 ? d.directionNav.removeClass("disabled").filter(".next").addClass("disabled") : d.directionNav.removeClass("disabled")), !d.vars.animationLoop && a == d.count - 1 && (d.pause(), d.vars.end(d));
                if (d.vars.animation.toLowerCase() == "slide") {
                    var c = d.vertical ? d.slides.filter(":first").height() : d.slides.filter(":first").width();
                    d.currentSlide == 0 && a == d.count - 1 && d.vars.animationLoop && d.direction != "next" ? d.slideString = "0px" : d.currentSlide == d.count - 1 && a == 0 && d.vars.animationLoop && d.direction != "prev" ? d.slideString = -1 * (d.count + 1) * c + "px" : d.slideString = -1 * (a + d.cloneOffset) * c + "px", d.args[d.prop] = d.slideString, d.transitions ? (d.setTransition(d.vars.animationDuration), d.args[d.prop] = d.vertical ? "translate3d(0," + d.slideString + ",0)" : "translate3d(" + d.slideString + ",0,0)", d.container.css(d.args).one("webkitTransitionEnd transitionend", function () {
                        d.wrapup(c);
                    })) : d.container.animate(d.args, d.vars.animationDuration, function () {
                        d.wrapup(c);
                    });
                } else d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration), d.slides.eq(a).fadeIn(d.vars.animationDuration, function () {
                    d.wrapup();
                });
            }
        }, d.wrapup = function (a) {
            d.vars.animation == "slide" && (d.currentSlide == 0 && d.animatingTo == d.count - 1 && d.vars.animationLoop ? (d.args[d.prop] = -1 * d.count * a + "px", d.transitions && (d.setTransition(0), d.args[d.prop] = d.vertical ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"), d.container.css(d.args)) : d.currentSlide == d.count - 1 && d.animatingTo == 0 && d.vars.animationLoop && (d.args[d.prop] = -1 * a + "px", d.transitions && (d.setTransition(0), d.args[d.prop] = d.vertical ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)"), d.container.css(d.args))), d.animating = !1, d.currentSlide = d.animatingTo, d.vars.after(d);
        }, d.animateSlides = function () {
            d.animating || d.flexAnimate(d.getTarget("next"));
        }, d.pause = function () {
            clearInterval(d.animatedSlides), d.vars.pausePlay && d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText);
        }, d.resume = function () {
            clearInterval(d.animatedSlides), d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed), d.vars.pausePlay && d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText);
        }, d.canAdvance = function (a) {
            return !d.vars.animationLoop && d.atEnd ? d.currentSlide == 0 && a == d.count - 1 && d.direction != "next" ? !1 : d.currentSlide == d.count - 1 && a == 0 && d.direction == "next" ? !1 : !0 : !0;
        }, d.getTarget = function (a) {
            return d.direction = a, a == "next" ? d.currentSlide == d.count - 1 ? 0 : d.currentSlide + 1 : d.currentSlide == 0 ? d.count - 1 : d.currentSlide - 1;
        }, d.setTransition = function (a) {
            d.container.css({
                "-webkit-transition-duration": a / 1e3 + "s"
            });
        }, d.init();
    }, a.flexslider.defaults = {
        animation: "fade",
        slideDirection: "horizontal",
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationDuration: 600,
        directionNav: !0,
        controlNav: !0,
        keyboardNav: !0,
        mousewheel: !1,
        prevText: "Previous",
        nextText: "Next",
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        randomize: !1,
        slideToStart: 0,
        animationLoop: !0,
        pauseOnAction: !0,
        pauseOnHover: !1,
        controlsContainer: "",
        manualControls: "",
        start: function () { },
        before: function () { },
        after: function () { },
        end: function () { }
    }, a.fn.flexslider = function (b) {
        return this.each(function () {
            a(this).find(".slides li").length == 1 ? a(this).find(".slides li").fadeIn(400) : a(this).data("flexslider") != 1 && new a.flexslider(a(this), b);
        });
    };
}(jQuery), function (a) {
    a.fn.getAttributes = function () {
        var a = this.get(0), b = {};
        for (var c = 0, d = a.attributes, e = d.length; c < e; c++) b[d.item(c).nodeName] = d.item(c).nodeValue;
        return b;
    }, a.fn.beaconAttr = function (b, c) {
        var d = this.get(0);
        return !_.isNull(c) && !_.isUndefined(c) ? a(d).attr("beacon-attr-" + b, c) : a(d).attr("beacon-attr-" + b);
    }, a.fn.removeBeaconAttr = function (b) {
        var c = this.get(0);
        return a(c).removeAttr("beacon-attr-" + b);
    };
}(jQuery), function (a) {
    a.fn.exists = function () {
        return this.length !== 0;
    };
}(jQuery), function (a, b) {
    function e(b, c) {
        var d, e, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (d = b.parentNode, e = d.name, !b.href || !e || d.nodeName.toLowerCase() !== "map" ? !1 : (g = a("img[usemap=#" + e + "]")[0], !!g && f(g))) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && f(b);
    }
    function f(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
            return a.css(this, "visibility") === "hidden";
        }).length;
    }
    var c = 0, d = /^ui-id-\d+$/;
    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        focus: function (b) {
            return function (c, d) {
                return typeof c == "number" ? this.each(function () {
                    var b = this;
                    setTimeout(function () {
                        a(b).focus(), d && d.call(b);
                    }, c);
                }) : b.apply(this, arguments);
            };
        }(a.fn.focus),
        scrollParent: function () {
            var b;
            return a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0) : b = this.parents().filter(function () {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b;
        },
        zIndex: function (c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]), e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f;
                    }
                    d = d.parent();
                }
            }
            return 0;
        },
        uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++c);
            });
        },
        removeUniqueId: function () {
            return this.each(function () {
                d.test(this.id) && a(this).removeAttr("id");
            });
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
            return function (c) {
                return !!a.data(c, b);
            };
        }) : function (b, c, d) {
            return !!a.data(b, d[3]);
        },
        focusable: function (b) {
            return e(b, !isNaN(a.attr(b, "tabindex")));
        },
        tabbable: function (b) {
            var c = a.attr(b, "tabindex"), d = isNaN(c);
            return (d || c >= 0) && e(b, !d);
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) {
        function h(b, c, d, f) {
            return a.each(e, function () {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0);
            }), c;
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + d] = function (c) {
            return c === b ? g["inner" + d].call(this) : this.each(function () {
                a(this).css(f, h(this, c) + "px");
            });
        }, a.fn["outer" + d] = function (b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function () {
                a(this).css(f, h(this, b, !0, c) + "px");
            });
        };
    }), a.fn.addBack || (a.fn.addBack = function (a) {
        return this.add(a == null ? this.prevObject : this.prevObject.filter(a));
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
        return function (c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this);
        };
    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
        disableSelection: function () {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                a.preventDefault();
            });
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection");
        }
    }), a.extend(a.ui, {
        plugin: {
            add: function (b, c, d) {
                var e, f = a.ui[b].prototype;
                for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]]);
            },
            call: function (a, b, c) {
                var d, e = a.plugins[b];
                if (!e || !a.element[0].parentNode || a.element[0].parentNode.nodeType === 11) return;
                for (d = 0; d < e.length; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c);
            }
        },
        hasScroll: function (b, c) {
            if (a(b).css("overflow") === "hidden") return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
        }
    });
}(jQuery), function (a, b) {
    var c = 0, d = Array.prototype.slice, e = a.cleanData;
    a.cleanData = function (b) {
        for (var c = 0, d; (d = b[c]) != null; c++) try {
            a(d).triggerHandler("remove");
        } catch (f) { }
        e(b);
    }, a.widget = function (b, c, d) {
        var e, f, g, h, i = {}, j = b.split(".")[0];
        b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
            return !!a.data(b, e);
        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
            if (!this._createWidget) return new g(a, b);
            arguments.length && this._createWidget(a, b);
        }, a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
            if (!a.isFunction(d)) {
                i[b] = d;
                return;
            }
            i[b] = function () {
                var a = function () {
                    return c.prototype[b].apply(this, arguments);
                }, e = function (a) {
                    return c.prototype[b].apply(this, a);
                };
                return function () {
                    var b = this._super, c = this._superApply, f;
                    return this._super = a, this._superApply = e, f = d.apply(this, arguments), this._super = b, this._superApply = c, f;
                };
            }();
        }), g.prototype = a.widget.extend(h, {
            widgetEventPrefix: f ? h.widgetEventPrefix || b : b
        }, i, {
            constructor: g,
            namespace: j,
            widgetName: b,
            widgetFullName: e
        }), f ? (a.each(f._childConstructors, function (b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto);
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g);
    }, a.widget.extend = function (c) {
        var e = d.call(arguments, 1), f = 0, g = e.length, h, i;
        for (; f < g; f++) for (h in e[f]) i = e[f][h], e[f].hasOwnProperty(h) && i !== b && (a.isPlainObject(i) ? c[h] = a.isPlainObject(c[h]) ? a.widget.extend({}, c[h], i) : a.widget.extend({}, i) : c[h] = i);
        return c;
    }, a.widget.bridge = function (c, e) {
        var f = e.prototype.widgetFullName || c;
        a.fn[c] = function (g) {
            var h = typeof g == "string", i = d.call(arguments, 1), j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function () {
                var d, e = a.data(this, f);
                if (!e) return a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'");
                if (!a.isFunction(e[g]) || g.charAt(0) === "_") return a.error("no such method '" + g + "' for " + c + " widget instance");
                d = e[g].apply(e, i);
                if (d !== e && d !== b) return j = d && d.jquery ? j.pushStack(d.get()) : d, !1;
            }) : this.each(function () {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : a.data(this, f, new e(g, this));
            }), j;
        };
    }, a.Widget = function () { }, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (b, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (a) {
                    a.target === d && this.destroy();
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
        },
        _destroy: a.noop,
        widget: function () {
            return this.element;
        },
        option: function (c, d) {
            var e = c, f, g, h;
            if (arguments.length === 0) return a.widget.extend({}, this.options);
            if (typeof c == "string") {
                e = {}, f = c.split("."), c = f.shift();
                if (f.length) {
                    g = e[c] = a.widget.extend({}, this.options[c]);
                    for (h = 0; h < f.length - 1; h++) g[f[h]] = g[f[h]] || {}, g = g[f[h]];
                    c = f.pop();
                    if (arguments.length === 1) return g[c] === b ? null : g[c];
                    g[c] = d;
                } else {
                    if (arguments.length === 1) return this.options[c] === b ? null : this.options[c];
                    e[c] = d;
                }
            }
            return this._setOptions(e), this;
        },
        _setOptions: function (a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this;
        },
        _setOption: function (a, b) {
            return this.options[a] = b, a === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this;
        },
        enable: function () {
            return this._setOption("disabled", !1);
        },
        disable: function () {
            return this._setOption("disabled", !0);
        },
        _on: function (b, c, d) {
            var e, f = this;
            typeof b != "boolean" && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
                function h() {
                    if (!b && (f.options.disabled === !0 || a(this).hasClass("ui-state-disabled"))) return;
                    return (typeof g == "string" ? f[g] : g).apply(f, arguments);
                }
                typeof g != "string" && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^(\w+)\s*(.*)$/), j = i[1] + f.eventNamespace, k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h);
            });
        },
        _off: function (a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b);
        },
        _delay: function (a, b) {
            function c() {
                return (typeof a == "string" ? d[a] : a).apply(d, arguments);
            }
            var d = this;
            return setTimeout(c, b || 0);
        },
        _hoverable: function (b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function (b) {
                    a(b.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function (b) {
                    a(b.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function (b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function (b) {
                    a(b.currentTarget).addClass("ui-state-focus");
                },
                focusout: function (b) {
                    a(b.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function (b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f) for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented());
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (b, c) {
        a.Widget.prototype["_" + b] = function (d, e, f) {
            typeof e == "string" && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || typeof e == "number" ? c : e.effect || c : b;
            e = e || {}, typeof e == "number" && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                a(this)[b](), f && f.call(d[0]), c();
            });
        };
    });
}(jQuery), function (a, b) {
    var c = !1;
    a(document).mouseup(function () {
        c = !1;
    }), a.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function (a) {
                return b._mouseDown(a);
            }).bind("click." + this.widgetName, function (c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1;
            }), this.started = !1;
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (b) {
            if (c) return;
            this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
            var d = this, e = b.which === 1, f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
            if (!e || f || !this._mouseCapture(b)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                d.mouseDelayMet = !0;
            }, this.options.delay));
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = this._mouseStart(b) !== !1;
                if (!this._mouseStarted) return b.preventDefault(), !0;
            }
            return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                return d._mouseMove(a);
            }, this._mouseUpDelegate = function (a) {
                return d._mouseUp(a);
            }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0;
        },
        _mouseMove: function (b) {
            return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted);
        },
        _mouseUp: function (b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1;
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet;
        },
        _mouseStart: function () { },
        _mouseDrag: function () { },
        _mouseStop: function () { },
        _mouseCapture: function () {
            return !0;
        }
    });
}(jQuery), function (a, b) {
    function m(a, b, c) {
        return [parseFloat(a[0]) * (k.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (k.test(a[1]) ? c / 100 : 1)];
    }
    function n(b, c) {
        return parseInt(a.css(b, c), 10) || 0;
    }
    function o(b) {
        var c = b[0];
        return c.nodeType === 9 ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : a.isWindow(c) ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } : c.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: c.pageY,
                left: c.pageX
            }
        } : {
            width: b.outerWidth(),
            height: b.outerHeight(),
            offset: b.offset()
        };
    }
    a.ui = a.ui || {};
    var c, d = Math.max, e = Math.abs, f = Math.round, g = /left|center|right/, h = /top|center|bottom/, i = /[\+\-]\d+(\.[\d]+)?%?/, j = /^\w+/, k = /%$/, l = a.fn.position;
    a.position = {
        scrollbarWidth: function () {
            if (c !== b) return c;
            var d, e, f = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), g = f.children()[0];
            return a("body").append(f), d = g.offsetWidth, f.css("overflow", "scroll"), e = g.offsetWidth, d === e && (e = f[0].clientWidth), f.remove(), c = d - e;
        },
        getScrollInfo: function (b) {
            var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"), d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"), e = c === "scroll" || c === "auto" && b.width < b.element[0].scrollWidth, f = d === "scroll" || d === "auto" && b.height < b.element[0].scrollHeight;
            return {
                width: f ? a.position.scrollbarWidth() : 0,
                height: e ? a.position.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function (b) {
            var c = a(b || window), d = a.isWindow(c[0]), e = !!c[0] && c[0].nodeType === 9;
            return {
                element: c,
                isWindow: d,
                isDocument: e,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: d ? c.width() : c.outerWidth(),
                height: d ? c.height() : c.outerHeight()
            };
        }
    }, a.fn.position = function (b) {
        if (!b || !b.of) return l.apply(this, arguments);
        b = a.extend({}, b);
        var c, k, p, q, r, s, t = a(b.of), u = a.position.getWithinInfo(b.within), v = a.position.getScrollInfo(u), w = (b.collision || "flip").split(" "), x = {};
        return s = o(t), t[0].preventDefault && (b.at = "left top"), k = s.width, p = s.height, q = s.offset, r = a.extend({}, q), a.each(["my", "at"], function () {
            var a = (b[this] || "").split(" "), c, d;
            a.length === 1 && (a = g.test(a[0]) ? a.concat(["center"]) : h.test(a[0]) ? ["center"].concat(a) : ["center", "center"]), a[0] = g.test(a[0]) ? a[0] : "center", a[1] = h.test(a[1]) ? a[1] : "center", c = i.exec(a[0]), d = i.exec(a[1]), x[this] = [c ? c[0] : 0, d ? d[0] : 0], b[this] = [j.exec(a[0])[0], j.exec(a[1])[0]];
        }), w.length === 1 && (w[1] = w[0]), b.at[0] === "right" ? r.left += k : b.at[0] === "center" && (r.left += k / 2), b.at[1] === "bottom" ? r.top += p : b.at[1] === "center" && (r.top += p / 2), c = m(x.at, k, p), r.left += c[0], r.top += c[1], this.each(function () {
            var g, h, i = a(this), j = i.outerWidth(), l = i.outerHeight(), o = n(this, "marginLeft"), s = n(this, "marginTop"), y = j + o + n(this, "marginRight") + v.width, z = l + s + n(this, "marginBottom") + v.height, A = a.extend({}, r), B = m(x.my, i.outerWidth(), i.outerHeight());
            b.my[0] === "right" ? A.left -= j : b.my[0] === "center" && (A.left -= j / 2), b.my[1] === "bottom" ? A.top -= l : b.my[1] === "center" && (A.top -= l / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = f(A.left), A.top = f(A.top)), g = {
                marginLeft: o,
                marginTop: s
            }, a.each(["left", "top"], function (d, e) {
                a.ui.position[w[d]] && a.ui.position[w[d]][e](A, {
                    targetWidth: k,
                    targetHeight: p,
                    elemWidth: j,
                    elemHeight: l,
                    collisionPosition: g,
                    collisionWidth: y,
                    collisionHeight: z,
                    offset: [c[0] + B[0], c[1] + B[1]],
                    my: b.my,
                    at: b.at,
                    within: u,
                    elem: i
                });
            }), b.using && (h = function (a) {
                var c = q.left - A.left, f = c + k - j, g = q.top - A.top, h = g + p - l, m = {
                    target: {
                        element: t,
                        left: q.left,
                        top: q.top,
                        width: k,
                        height: p
                    },
                    element: {
                        element: i,
                        left: A.left,
                        top: A.top,
                        width: j,
                        height: l
                    },
                    horizontal: f < 0 ? "left" : c > 0 ? "right" : "center",
                    vertical: h < 0 ? "top" : g > 0 ? "bottom" : "middle"
                };
                k < j && e(c + f) < k && (m.horizontal = "center"), p < l && e(g + h) < p && (m.vertical = "middle"), d(e(c), e(f)) > d(e(g), e(h)) ? m.important = "horizontal" : m.important = "vertical", b.using.call(this, a, m);
            }), i.offset(a.extend(A, {
                using: h
            }));
        });
    }, a.ui.position = {
        fit: {
            left: function (a, b) {
                var c = b.within, e = c.isWindow ? c.scrollLeft : c.offset.left, f = c.width, g = a.left - b.collisionPosition.marginLeft, h = e - g, i = g + b.collisionWidth - f - e, j;
                b.collisionWidth > f ? h > 0 && i <= 0 ? (j = a.left + h + b.collisionWidth - f - e, a.left += h - j) : i > 0 && h <= 0 ? a.left = e : h > i ? a.left = e + f - b.collisionWidth : a.left = e : h > 0 ? a.left += h : i > 0 ? a.left -= i : a.left = d(a.left - g, a.left);
            },
            top: function (a, b) {
                var c = b.within, e = c.isWindow ? c.scrollTop : c.offset.top, f = b.within.height, g = a.top - b.collisionPosition.marginTop, h = e - g, i = g + b.collisionHeight - f - e, j;
                b.collisionHeight > f ? h > 0 && i <= 0 ? (j = a.top + h + b.collisionHeight - f - e, a.top += h - j) : i > 0 && h <= 0 ? a.top = e : h > i ? a.top = e + f - b.collisionHeight : a.top = e : h > 0 ? a.top += h : i > 0 ? a.top -= i : a.top = d(a.top - g, a.top);
            }
        },
        flip: {
            left: function (a, b) {
                var c = b.within, d = c.offset.left + c.scrollLeft, f = c.width, g = c.isWindow ? c.scrollLeft : c.offset.left, h = a.left - b.collisionPosition.marginLeft, i = h - g, j = h + b.collisionWidth - f - g, k = b.my[0] === "left" ? -b.elemWidth : b.my[0] === "right" ? b.elemWidth : 0, l = b.at[0] === "left" ? b.targetWidth : b.at[0] === "right" ? -b.targetWidth : 0, m = -2 * b.offset[0], n, o;
                if (i < 0) {
                    n = a.left + k + l + m + b.collisionWidth - f - d;
                    if (n < 0 || n < e(i)) a.left += k + l + m;
                } else if (j > 0) {
                    o = a.left - b.collisionPosition.marginLeft + k + l + m - g;
                    if (o > 0 || e(o) < j) a.left += k + l + m;
                }
            },
            top: function (a, b) {
                var c = b.within, d = c.offset.top + c.scrollTop, f = c.height, g = c.isWindow ? c.scrollTop : c.offset.top, h = a.top - b.collisionPosition.marginTop, i = h - g, j = h + b.collisionHeight - f - g, k = b.my[1] === "top", l = k ? -b.elemHeight : b.my[1] === "bottom" ? b.elemHeight : 0, m = b.at[1] === "top" ? b.targetHeight : b.at[1] === "bottom" ? -b.targetHeight : 0, n = -2 * b.offset[1], o, p;
                i < 0 ? (p = a.top + l + m + n + b.collisionHeight - f - d, a.top + l + m + n > i && (p < 0 || p < e(i)) && (a.top += l + m + n)) : j > 0 && (o = a.top - b.collisionPosition.marginTop + l + m + n - g, a.top + l + m + n > j && (o > 0 || e(o) < j) && (a.top += l + m + n));
            }
        },
        flipfit: {
            left: function () {
                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments);
            }
        }
    }, function () {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, g && a.extend(d, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in d) b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && e < 11, b.innerHTML = "", c.removeChild(b);
    }();
}(jQuery), function (a, b) {
    function e() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, a.extend(this._defaults, this.regional[""]), this.dpDiv = f(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }
    function f(b) {
        var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return b.delegate(c, "mouseout", function () {
            a(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover");
        }).delegate(c, "mouseover", function () {
            a.datepicker._isDisabledDatepicker(d.inline ? b.parent()[0] : d.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover"));
        });
    }
    function g(b, c) {
        a.extend(b, c);
        for (var d in c) c[d] == null && (b[d] = c[d]);
        return b;
    }
    a.extend(a.ui, {
        datepicker: {
            version: "1.10.4"
        }
    });
    var c = "datepicker", d;
    a.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv;
        },
        setDefaults: function (a) {
            return g(this._defaults, a || {}), this;
        },
        _attachDatepicker: function (b, c) {
            var d, e, f;
            d = b.nodeName.toLowerCase(), e = d === "div" || d === "span", b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), d === "input" ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f);
        },
        _newInst: function (b, c) {
            var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: d,
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: c,
                dpDiv: c ? f(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            };
        },
        _connectDatepicker: function (b, d) {
            var e = a(b);
            d.append = a([]), d.trigger = a([]);
            if (e.hasClass(this.markerClassName)) return;
            this._attachments(e, d), e.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(d), a.data(b, c, d), d.settings.disabled && this._disableDatepicker(b);
        },
        _attachments: function (b, c) {
            var d, e, f, g = this._get(c, "appendText"), h = this._get(c, "isRTL");
            c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), (d === "focus" || d === "both") && b.focus(this._showDatepicker);
            if (d === "button" || d === "both") e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: e,
                title: e
            }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                src: f,
                alt: e,
                title: e
            }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function () {
                return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1;
            });
        },
        _autoSize: function (a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b, c, d, e, f = new Date(2009, 11, 20), g = this._get(a, "dateFormat");
                g.match(/[DM]/) && (b = function (a) {
                    c = 0, d = 0;
                    for (e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e);
                    return d;
                }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length);
            }
        },
        _inlineDatepicker: function (b, d) {
            var e = a(b);
            if (e.hasClass(this.markerClassName)) return;
            e.addClass(this.markerClassName).append(d.dpDiv), a.data(b, c, d), this._setDate(d, this._getDefaultDate(d), !0), this._updateDatepicker(d), this._updateAlternate(d), d.settings.disabled && this._disableDatepicker(b), d.dpDiv.css("display", "block");
        },
        _dialogDatepicker: function (b, d, e, f, h) {
            var i, j, k, l, m, n = this._dialogInst;
            return n || (this.uuid += 1, i = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + i + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), n = this._dialogInst = this._newInst(this._dialogInput, !1), n.settings = {}, a.data(this._dialogInput[0], c, n)), g(n.settings, f || {}), d = d && d.constructor === Date ? this._formatDate(n, d) : d, this._dialogInput.val(d), this._pos = h ? h.length ? h : [h.pageX, h.pageY] : null, this._pos || (j = document.documentElement.clientWidth, k = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, m = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [j / 2 - 100 + l, k / 2 - 150 + m]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), n.settings.onSelect = e, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], c, n), this;
        },
        _destroyDatepicker: function (b) {
            var d, e = a(b), f = a.data(b, c);
            if (!e.hasClass(this.markerClassName)) return;
            d = b.nodeName.toLowerCase(), a.removeData(b, c), d === "input" ? (f.append.remove(), f.trigger.remove(), e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d === "div" || d === "span") && e.removeClass(this.markerClassName).empty();
        },
        _enableDatepicker: function (b) {
            var d, e, f = a(b), g = a.data(b, c);
            if (!f.hasClass(this.markerClassName)) return;
            d = b.nodeName.toLowerCase();
            if (d === "input") b.disabled = !1, g.trigger.filter("button").each(function () {
                this.disabled = !1;
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            }); else if (d === "div" || d === "span") e = f.children("." + this._inlineClass), e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1);
            this._disabledInputs = a.map(this._disabledInputs, function (a) {
                return a === b ? null : a;
            });
        },
        _disableDatepicker: function (b) {
            var d, e, f = a(b), g = a.data(b, c);
            if (!f.hasClass(this.markerClassName)) return;
            d = b.nodeName.toLowerCase();
            if (d === "input") b.disabled = !0, g.trigger.filter("button").each(function () {
                this.disabled = !0;
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            }); else if (d === "div" || d === "span") e = f.children("." + this._inlineClass), e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0);
            this._disabledInputs = a.map(this._disabledInputs, function (a) {
                return a === b ? null : a;
            }), this._disabledInputs[this._disabledInputs.length] = b;
        },
        _isDisabledDatepicker: function (a) {
            if (!a) return !1;
            for (var b = 0; b < this._disabledInputs.length; b++) if (this._disabledInputs[b] === a) return !0;
            return !1;
        },
        _getInst: function (b) {
            try {
                return a.data(b, c);
            } catch (d) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (c, d, e) {
            var f, h, i, j, k = this._getInst(c);
            if (arguments.length === 2 && typeof d == "string") return d === "defaults" ? a.extend({}, a.datepicker._defaults) : k ? d === "all" ? a.extend({}, k.settings) : this._get(k, d) : null;
            f = d || {}, typeof d == "string" && (f = {}, f[d] = e), k && (this._curInst === k && this._hideDatepicker(), h = this._getDateDatepicker(c, !0), i = this._getMinMaxDate(k, "min"), j = this._getMinMaxDate(k, "max"), g(k.settings, f), i !== null && f.dateFormat !== b && f.minDate === b && (k.settings.minDate = this._formatDate(k, i)), j !== null && f.dateFormat !== b && f.maxDate === b && (k.settings.maxDate = this._formatDate(k, j)), "disabled" in f && (f.disabled ? this._disableDatepicker(c) : this._enableDatepicker(c)), this._attachments(a(c), k), this._autoSize(k), this._setDate(k, h), this._updateAlternate(k), this._updateDatepicker(k));
        },
        _changeDatepicker: function (a, b, c) {
            this._optionDatepicker(a, b, c);
        },
        _refreshDatepicker: function (a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b);
        },
        _setDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c));
        },
        _getDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null;
        },
        _doKeyDown: function (b) {
            var c, d, e, f = a.datepicker._getInst(b.target), g = !0, h = f.dpDiv.is(".ui-datepicker-rtl");
            f._keyEvent = !0;
            if (a.datepicker._datepickerShowing) switch (b.keyCode) {
                case 9:
                    a.datepicker._hideDatepicker(), g = !1;
                    break;
                case 13:
                    return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
                case 27:
                    a.datepicker._hideDatepicker();
                    break;
                case 33:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 34:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 35:
                    (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
                    break;
                case 36:
                    (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
                    break;
                case 37:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 38:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
                    break;
                case 39:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 40:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
                    break;
                default:
                    g = !1;
            } else b.keyCode === 36 && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
            g && (b.preventDefault(), b.stopPropagation());
        },
        _doKeyPress: function (b) {
            var c, d, e = a.datepicker._getInst(b.target);
            if (a.datepicker._get(e, "constrainInput")) return c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(b.charCode == null ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1;
        },
        _doKeyUp: function (b) {
            var c, d = a.datepicker._getInst(b.target);
            if (d.input.val() !== d.lastVal) try {
                c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d));
            } catch (e) { }
            return !0;
        },
        _showDatepicker: function (b) {
            b = b.target || b, b.nodeName.toLowerCase() !== "input" && (b = a("input", b.parentNode)[0]);
            if (a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput === b) return;
            var c, d, e, f, h, i, j;
            c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), d = a.datepicker._get(c, "beforeShow"), e = d ? d.apply(b, [b, c]) : {};
            if (e === !1) return;
            g(c.settings, e), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), f = !1, a(b).parents().each(function () {
                return f |= a(this).css("position") === "fixed", !f;
            }), h = {
                left: a.datepicker._pos[0],
                top: a.datepicker._pos[1]
            }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }), a.datepicker._updateDatepicker(c), h = a.datepicker._checkOffset(c, h, f), c.dpDiv.css({
                position: a.datepicker._inDialog && a.blockUI ? "static" : f ? "fixed" : "absolute",
                display: "none",
                left: h.left + "px",
                top: h.top + "px"
            }), c.inline || (i = a.datepicker._get(c, "showAnim"), j = a.datepicker._get(c, "duration"), c.dpDiv.zIndex(a(b).zIndex() + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[i] ? c.dpDiv.show(i, a.datepicker._get(c, "showOptions"), j) : c.dpDiv[i || "show"](i ? j : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c);
        },
        _updateDatepicker: function (b) {
            this.maxRows = 4, d = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b), b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var c, e = this._getNumberOfMonths(b), f = e[1], g = 17;
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), b.dpDiv[(e[0] !== 1 || e[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function () {
                c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null;
            }, 0));
        },
        _shouldFocusInput: function (a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus");
        },
        _checkOffset: function (b, c, d) {
            var e = b.dpDiv.outerWidth(), f = b.dpDiv.outerHeight(), g = b.input ? b.input.outerWidth() : 0, h = b.input ? b.input.outerHeight() : 0, i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()), j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
            return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c;
        },
        _findPos: function (b) {
            var c, d = this._getInst(b), e = this._get(d, "isRTL");
            while (b && (b.type === "hidden" || b.nodeType !== 1 || a.expr.filters.hidden(b))) b = b[e ? "previousSibling" : "nextSibling"];
            return c = a(b).offset(), [c.left, c.top];
        },
        _hideDatepicker: function (b) {
            var d, e, f, g, h = this._curInst;
            if (!h || b && h !== a.data(b, c)) return;
            this._datepickerShowing && (d = this._get(h, "showAnim"), e = this._get(h, "duration"), f = function () {
                a.datepicker._tidyDialog(h);
            }, a.effects && (a.effects.effect[d] || a.effects[d]) ? h.dpDiv.hide(d, a.datepicker._get(h, "showOptions"), e, f) : h.dpDiv[d === "slideDown" ? "slideUp" : d === "fadeIn" ? "fadeOut" : "hide"](d ? e : null, f), d || f(), this._datepickerShowing = !1, g = this._get(h, "onClose"), g && g.apply(h.input ? h.input[0] : null, [h.input ? h.input.val() : "", h]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1);
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
        },
        _checkExternalClick: function (b) {
            if (!a.datepicker._curInst) return;
            var c = a(b.target), d = a.datepicker._getInst(c[0]);
            (c[0].id !== a.datepicker._mainDivId && c.parents("#" + a.datepicker._mainDivId).length === 0 && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker();
        },
        _adjustDate: function (b, c, d) {
            var e = a(b), f = this._getInst(e[0]);
            if (this._isDisabledDatepicker(e[0])) return;
            this._adjustInstDate(f, c + (d === "M" ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f);
        },
        _gotoToday: function (b) {
            var c, d = a(b), e = this._getInst(d[0]);
            this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d);
        },
        _selectMonthYear: function (b, c, d) {
            var e = a(b), f = this._getInst(e[0]);
            f["selected" + (d === "M" ? "Month" : "Year")] = f["draw" + (d === "M" ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e);
        },
        _selectDay: function (b, c, d, e) {
            var f, g = a(b);
            if (a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0])) return;
            f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear));
        },
        _clearDate: function (b) {
            var c = a(b);
            this._selectDate(c, "");
        },
        _selectDate: function (b, c) {
            var d, e = a(b), f = this._getInst(e[0]);
            c = c != null ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], typeof f.input[0] != "object" && f.input.focus(), this._lastInput = null);
        },
        _updateAlternate: function (b) {
            var c, d, e, f = this._get(b, "altField");
            f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function () {
                a(this).val(e);
            }));
        },
        noWeekends: function (a) {
            var b = a.getDay();
            return [b > 0 && b < 6, ""];
        },
        iso8601Week: function (a) {
            var b, c = new Date(a.getTime());
            return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1;
        },
        parseDate: function (b, c, d) {
            if (b == null || c == null) throw "Invalid arguments";
            c = typeof c == "object" ? c.toString() : c + "";
            if (c === "") return null;
            var e, f, g, h = 0, i = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff, j = typeof i != "string" ? i : (new Date).getFullYear() % 100 + parseInt(i, 10), k = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, l = (d ? d.dayNames : null) || this._defaults.dayNames, m = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, n = (d ? d.monthNames : null) || this._defaults.monthNames, o = -1, p = -1, q = -1, r = -1, s = !1, t, u = function (a) {
                var c = e + 1 < b.length && b.charAt(e + 1) === a;
                return c && e++, c;
            }, v = function (a) {
                var b = u(a), d = a === "@" ? 14 : a === "!" ? 20 : a === "y" && b ? 4 : a === "o" ? 3 : 2, e = new RegExp("^\\d{1," + d + "}"), f = c.substring(h).match(e);
                if (!f) throw "Missing number at position " + h;
                return h += f[0].length, parseInt(f[0], 10);
            }, w = function (b, d, e) {
                var f = -1, g = a.map(u(b) ? e : d, function (a, b) {
                    return [[b, a]];
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                a.each(g, function (a, b) {
                    var d = b[1];
                    if (c.substr(h, d.length).toLowerCase() === d.toLowerCase()) return f = b[0], h += d.length, !1;
                });
                if (f !== -1) return f + 1;
                throw "Unknown name at position " + h;
            }, x = function () {
                if (c.charAt(h) !== b.charAt(e)) throw "Unexpected literal at position " + h;
                h++;
            };
            for (e = 0; e < b.length; e++) if (s) b.charAt(e) === "'" && !u("'") ? s = !1 : x(); else switch (b.charAt(e)) {
                case "d":
                    q = v("d");
                    break;
                case "D":
                    w("D", k, l);
                    break;
                case "o":
                    r = v("o");
                    break;
                case "m":
                    p = v("m");
                    break;
                case "M":
                    p = w("M", m, n);
                    break;
                case "y":
                    o = v("y");
                    break;
                case "@":
                    t = new Date(v("@")), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
                    break;
                case "!":
                    t = new Date((v("!") - this._ticksTo1970) / 1e4), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
                    break;
                case "'":
                    u("'") ? x() : s = !0;
                    break;
                default:
                    x();
            }
            if (h < c.length) {
                g = c.substr(h);
                if (!/^\s+/.test(g)) throw "Extra/unparsed characters found in date: " + g;
            }
            o === -1 ? o = (new Date).getFullYear() : o < 100 && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (o <= j ? 0 : -100));
            if (r > -1) {
                p = 1, q = r;
                do {
                    f = this._getDaysInMonth(o, p - 1);
                    if (q <= f) break;
                    p++, q -= f;
                } while (!0);
            }
            t = this._daylightSavingAdjust(new Date(o, p - 1, q));
            if (t.getFullYear() !== o || t.getMonth() + 1 !== p || t.getDate() !== q) throw "Invalid date";
            return t;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
        formatDate: function (a, b, c) {
            if (!b) return "";
            var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = function (b) {
                var c = d + 1 < a.length && a.charAt(d + 1) === b;
                return c && d++, c;
            }, j = function (a, b, c) {
                var d = "" + b;
                if (i(a)) while (d.length < c) d = "0" + d;
                return d;
            }, k = function (a, b, c, d) {
                return i(a) ? d[b] : c[b];
            }, l = "", m = !1;
            if (b) for (d = 0; d < a.length; d++) if (m) a.charAt(d) === "'" && !i("'") ? m = !1 : l += a.charAt(d); else switch (a.charAt(d)) {
                case "d":
                    l += j("d", b.getDate(), 2);
                    break;
                case "D":
                    l += k("D", b.getDay(), e, f);
                    break;
                case "o":
                    l += j("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                    break;
                case "m":
                    l += j("m", b.getMonth() + 1, 2);
                    break;
                case "M":
                    l += k("M", b.getMonth(), g, h);
                    break;
                case "y":
                    l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                    break;
                case "@":
                    l += b.getTime();
                    break;
                case "!":
                    l += b.getTime() * 1e4 + this._ticksTo1970;
                    break;
                case "'":
                    i("'") ? l += "'" : m = !0;
                    break;
                default:
                    l += a.charAt(d);
            }
            return l;
        },
        _possibleChars: function (a) {
            var b, c = "", d = !1, e = function (c) {
                var d = b + 1 < a.length && a.charAt(b + 1) === c;
                return d && b++, d;
            };
            for (b = 0; b < a.length; b++) if (d) a.charAt(b) === "'" && !e("'") ? d = !1 : c += a.charAt(b); else switch (a.charAt(b)) {
                case "d":
                case "m":
                case "y":
                case "@":
                    c += "0123456789";
                    break;
                case "D":
                case "M":
                    return null;
                case "'":
                    e("'") ? c += "'" : d = !0;
                    break;
                default:
                    c += a.charAt(b);
            }
            return c;
        },
        _get: function (a, c) {
            return a.settings[c] !== b ? a.settings[c] : this._defaults[c];
        },
        _setDateFromField: function (a, b) {
            if (a.input.val() === a.lastVal) return;
            var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e = this._getDefaultDate(a), f = e, g = this._getFormatConfig(a);
            try {
                f = this.parseDate(c, d, g) || e;
            } catch (h) {
                d = b ? "" : d;
            }
            a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a);
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date));
        },
        _determineDate: function (b, c, d) {
            var e = function (a) {
                var b = new Date;
                return b.setDate(b.getDate() + a), b;
            }, f = function (c) {
                try {
                    return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b));
                } catch (d) { }
                var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c);
                while (j) {
                    switch (j[2] || "d") {
                        case "d":
                        case "D":
                            h += parseInt(j[1], 10);
                            break;
                        case "w":
                        case "W":
                            h += parseInt(j[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                            break;
                        case "y":
                        case "Y":
                            f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                    }
                    j = i.exec(c);
                }
                return new Date(f, g, h);
            }, g = c == null || c === "" ? d : typeof c == "string" ? f(c) : typeof c == "number" ? isNaN(c) ? d : e(c) : new Date(c.getTime());
            return g = g && g.toString() === "Invalid Date" ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g);
        },
        _daylightSavingAdjust: function (a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null;
        },
        _setDate: function (a, b, c) {
            var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e !== a.selectedMonth || f !== a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a));
        },
        _getDate: function (a) {
            var b = !a.currentYear || a.input && a.input.val() === "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b;
        },
        _attachHandlers: function (b) {
            var c = this._get(b, "stepMonths"), d = "#" + b.id.replace(/\\\\/g, "\\");
            b.dpDiv.find("[data-handler]").map(function () {
                var b = {
                    prev: function () {
                        a.datepicker._adjustDate(d, -c, "M");
                    },
                    next: function () {
                        a.datepicker._adjustDate(d, +c, "M");
                    },
                    hide: function () {
                        a.datepicker._hideDatepicker();
                    },
                    today: function () {
                        a.datepicker._gotoToday(d);
                    },
                    selectDay: function () {
                        return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                    },
                    selectMonth: function () {
                        return a.datepicker._selectMonthYear(d, this, "M"), !1;
                    },
                    selectYear: function () {
                        return a.datepicker._selectMonthYear(d, this, "Y"), !1;
                    }
                };
                a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")]);
            });
        },
        _generateHTML: function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date, P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())), Q = this._get(a, "isRTL"), R = this._get(a, "showButtonPanel"), S = this._get(a, "hideIfNoPrevNext"), T = this._get(a, "navigationAsDateFormat"), U = this._getNumberOfMonths(a), V = this._get(a, "showCurrentAtPos"), W = this._get(a, "stepMonths"), X = U[0] !== 1 || U[1] !== 1, Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), Z = this._getMinMaxDate(a, "min"), $ = this._getMinMaxDate(a, "max"), _ = a.drawMonth - V, ab = a.drawYear;
            _ < 0 && (_ += 12, ab--);
            if ($) {
                b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && b < Z ? Z : b;
                while (this._daylightSavingAdjust(new Date(ab, _, 1)) > b) _--, _ < 0 && (_ = 11, ab--);
            }
            a.drawMonth = _, a.drawYear = ab, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ab, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, ab, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ab, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, ab, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", v;
            for (w = 0; w < U[0]; w++) {
                x = "", this.maxRows = 4;
                for (y = 0; y < U[1]; y++) {
                    z = this._daylightSavingAdjust(new Date(ab, _, a.selectedDay)), A = " ui-corner-all", B = "";
                    if (X) {
                        B += "<div class='ui-datepicker-group";
                        if (U[1] > 1) switch (y) {
                            case 0:
                                B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                                break;
                            case U[1] - 1:
                                B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                                break;
                            default:
                                B += " ui-datepicker-group-middle", A = "";
                        }
                        B += "'>";
                    }
                    B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && w === 0 ? Q ? f : d : "") + (/all|right/.test(A) && w === 0 ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ab, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "";
                    for (v = 0; v < 7; v++) D = (v + k) % 7, C += "<th" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + m[D] + "'>" + n[D] + "</span></th>";
                    B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ab, _), ab === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(ab, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X ? this.maxRows > G ? this.maxRows : G : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(ab, _, 1 - F));
                    for (J = 0; J < H; J++) {
                        B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "";
                        for (v = 0; v < 7; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && I < Z || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!M || r) && L[2] ? " title='" + L[2].replace(/'/g, "&#39;") + "'" : "") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                        B += K + "</tr>";
                    }
                    _++, _ > 11 && (_ = 0, ab++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B;
                }
                u += x;
            }
            return u += j, a._keyEvent = !1, u;
        },
        _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"), r = this._get(a, "changeYear"), s = this._get(a, "showMonthAfterYear"), t = "<div class='ui-datepicker-title'>", u = "";
            if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>"; else {
                i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (k = 0; k < 12; k++) (!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                u += "</select>";
            }
            s || (t += u + (f || !q || !r ? "&#xa0;" : ""));
            if (!a.yearshtml) {
                a.yearshtml = "";
                if (f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>"; else {
                    l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function (a) {
                        var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                        return isNaN(b) ? m : b;
                    }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; o <= p; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                    a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null;
                }
            }
            return t += this._get(a, "yearSuffix"), s && (t += (f || !q || !r ? "&#xa0;" : "") + u), t += "</div>", t;
        },
        _adjustInstDate: function (a, b, c) {
            var d = a.drawYear + (c === "Y" ? b : 0), e = a.drawMonth + (c === "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c === "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c === "M" || c === "Y") && this._notifyChange(a);
        },
        _restrictMinMax: function (a, b) {
            var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b;
            return d && e > d ? d : e;
        },
        _notifyChange: function (a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a]);
        },
        _getNumberOfMonths: function (a) {
            var b = this._get(a, "numberOfMonths");
            return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b;
        },
        _getMinMaxDate: function (a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null);
        },
        _getDaysInMonth: function (a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate();
        },
        _getFirstDayOfMonth: function (a, b) {
            return (new Date(a, b, 1)).getDay();
        },
        _canAdjustMonth: function (a, b, c, d) {
            var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
            return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f);
        },
        _isInRange: function (a, b) {
            var c, d, e = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), g = null, h = null, i = this._get(a, "yearRange");
            return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h);
        },
        _getFormatConfig: function (a) {
            var b = this._get(a, "shortYearCutoff");
            return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            };
        },
        _formatDate: function (a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a));
        }
    }), a.fn.datepicker = function (b) {
        if (!this.length) return this;
        a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), a("#" + a.datepicker._mainDivId).length === 0 && a("body").append(a.datepicker.dpDiv);
        var c = Array.prototype.slice.call(arguments, 1);
        return typeof b != "string" || b !== "isDisabled" && b !== "getDate" && b !== "widget" ? b === "option" && arguments.length === 2 && typeof arguments[1] == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function () {
            typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b);
        }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c));
    }, a.datepicker = new e, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.10.4";
}(jQuery), function (a, b) {
    a.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function (a) {
                this.options.disabled && a.preventDefault();
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function (a) {
                    a.preventDefault();
                },
                "click .ui-state-disabled > a": function (a) {
                    a.preventDefault();
                },
                "click .ui-menu-item:has(a)": function (b) {
                    var c = a(b.target).closest(".ui-menu-item");
                    !this.mouseHandled && c.not(".ui-state-disabled").length && (this.select(b), b.isPropagationStopped() || (this.mouseHandled = !0), c.has(".ui-menu").length ? this.expand(b) : !this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)));
                },
                "mouseenter .ui-menu-item": function (b) {
                    var c = a(b.currentTarget);
                    c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c);
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (a, b) {
                    var c = this.active || this.element.children(".ui-menu-item").eq(0);
                    b || this.focus(a, c);
                },
                blur: function (b) {
                    this._delay(function () {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b);
                    });
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b), this.mouseHandled = !1;
                }
            });
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var b = a(this);
                b.data("ui-menu-submenu-carat") && b.remove();
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
        },
        _keydown: function (b) {
            function i(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            var c, d, e, f, g, h = !0;
            switch (b.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(b);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(b);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", b);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", b);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(b);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(b);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(b);
                    break;
                case a.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(b);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(b);
                    break;
                default:
                    h = !1, d = this.previousFilter || "", e = String.fromCharCode(b.keyCode), f = !1, clearTimeout(this.filterTimer), e === d ? f = !0 : e = d + e, g = new RegExp("^" + i(e), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return g.test(a(this).children("a").text());
                    }), c = f && c.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), g = new RegExp("^" + i(e), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return g.test(a(this).children("a").text());
                    })), c.length ? (this.focus(b, c), c.length > 1 ? (this.previousFilter = e, this.filterTimer = this._delay(function () {
                        delete this.previousFilter;
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter;
            }
            h && b.preventDefault();
        },
        _activate: function (a) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a));
        },
        refresh: function () {
            var b, c = this.options.icons.submenu, d = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var b = a(this), d = b.prev("a"), e = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
                d.attr("aria-haspopup", "true").prepend(e), b.attr("aria-labelledby", d.attr("id"));
            }), b = d.add(this.element), b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), b.children(":not(.ui-menu-item)").each(function () {
                var b = a(this);
                /[^\-\u2014\u2013\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider");
            }), b.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur();
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role];
        },
        _setOption: function (a, b) {
            a === "icons" && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu), this._super(a, b);
        },
        focus: function (a, b) {
            var c, d;
            this.blur(a, a && a.type === "focus"), this._scrollIntoView(b), this.active = b.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), a && a.type === "keydown" ? this._close() : this.timer = this._delay(function () {
                this._close();
            }, this.delay), c = b.children(".ui-menu"), c.length && a && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
                item: b
            });
        },
        _scrollIntoView: function (b) {
            var c, d, e, f, g, h;
            this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.height(), e < 0 ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h));
        },
        blur: function (a, b) {
            b || clearTimeout(this.timer);
            if (!this.active) return;
            this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
                item: this.active
            });
        },
        _startOpening: function (a) {
            clearTimeout(this.timer);
            if (a.attr("aria-hidden") !== "true") return;
            this.timer = this._delay(function () {
                this._close(), this._open(a);
            }, this.delay);
        },
        _open: function (b) {
            var c = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c);
        },
        collapseAll: function (b, c) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d;
            }, this.delay);
        },
        _close: function (a) {
            a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
        },
        collapse: function (a) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            b && b.length && (this._close(), this.focus(a, b));
        },
        expand: function (a) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            b && b.length && (this._open(b.parent()), this._delay(function () {
                this.focus(a, b);
            }));
        },
        next: function (a) {
            this._move("next", "first", a);
        },
        previous: function (a) {
            this._move("prev", "last", a);
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function (a, b, c) {
            var d;
            this.active && (a === "first" || a === "last" ? d = this.active[a === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : d = this.active[a + "All"](".ui-menu-item").eq(0));
            if (!d || !d.length || !this.active) d = this.activeMenu.children(".ui-menu-item")[b]();
            this.focus(c, d);
        },
        nextPage: function (b) {
            var c, d, e;
            if (!this.active) {
                this.next(b);
                return;
            }
            if (this.isLastItem()) return;
            this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return c = a(this), c.offset().top - d - e < 0;
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]());
        },
        previousPage: function (b) {
            var c, d, e;
            if (!this.active) {
                this.next(b);
                return;
            }
            if (this.isFirstItem()) return;
            this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return c = a(this), c.offset().top - d + e > 0;
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first());
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function (b) {
            this.active = this.active || a(b.target).closest(".ui-menu-item");
            var c = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c);
        }
    });
}(jQuery), function (a, b) {
    var c = "ui-effects-";
    a.effects = {
        effect: {}
    }, function (a, b) {
        function m(a, b, c) {
            var d = h[b.type] || {};
            return a == null ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a);
        }
        function n(b) {
            var c = f(), d = c._rgba = [];
            return b = b.toLowerCase(), l(e, function (a, e) {
                var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba";
                if (i) return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1;
            }), d.length ? (d.join() === "0,0,0,0" && a.extend(d, k.transparent), c) : k[b];
        }
        function o(a, b, c) {
            return c = (c + 1) % 1, c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a;
        }
        var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (a) {
                return [a[1], a[2], a[3], a[4]];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (a) {
                return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]];
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function (a) {
                return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function (a) {
                return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (a) {
                return [a[1], a[2] / 100, a[3] / 100, a[4]];
            }
        }], f = a.Color = function (b, c, d, e) {
            return new a.Color.fn.parse(b, c, d, e);
        }, g = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, h = {
            "byte": {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, i = f.support = {}, j = a("<p>")[0], k, l = a.each;
        j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) {
            b.cache = "_" + a, b.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            };
        }), f.fn = a.extend(f.prototype, {
            parse: function (c, d, e, h) {
                if (c === b) return this._rgba = [null, null, null, null], this;
                if (c.jquery || c.nodeType) c = a(c).css(d), d = b;
                var i = this, j = a.type(c), o = this._rgba = [];
                d !== b && (c = [c, d, e, h], j = "array");
                if (j === "string") return this.parse(n(c) || k._default);
                if (j === "array") return l(g.rgba.props, function (a, b) {
                    o[b.idx] = m(c[b.idx], b);
                }), this;
                if (j === "object") return c instanceof f ? l(g, function (a, b) {
                    c[b.cache] && (i[b.cache] = c[b.cache].slice());
                }) : l(g, function (b, d) {
                    var e = d.cache;
                    l(d.props, function (a, b) {
                        if (!i[e] && d.to) {
                            if (a === "alpha" || c[a] == null) return;
                            i[e] = d.to(i._rgba);
                        }
                        i[e][b.idx] = m(c[a], b, !0);
                    }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])));
                }), this;
            },
            is: function (a) {
                var b = f(a), c = !0, d = this;
                return l(g, function (a, e) {
                    var f, g = b[e.cache];
                    return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) {
                        if (g[b.idx] != null) return c = g[b.idx] === f[b.idx], c;
                    })), c;
                }), c;
            },
            _space: function () {
                var a = [], b = this;
                return l(g, function (c, d) {
                    b[d.cache] && a.push(c);
                }), a.pop();
            },
            transition: function (a, b) {
                var c = f(a), d = c._space(), e = g[d], i = this.alpha() === 0 ? f("transparent") : this, j = i[e.cache] || e.to(i._rgba), k = j.slice();
                return c = c[e.cache], l(e.props, function (a, d) {
                    var e = d.idx, f = j[e], g = c[e], i = h[d.type] || {};
                    if (g === null) return;
                    f === null ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d));
                }), this[d](k);
            },
            blend: function (b) {
                if (this._rgba[3] === 1) return this;
                var c = this._rgba.slice(), d = c.pop(), e = f(b)._rgba;
                return f(a.map(c, function (a, b) {
                    return (1 - d) * e[b] + d * a;
                }));
            },
            toRgbaString: function () {
                var b = "rgba(", c = a.map(this._rgba, function (a, b) {
                    return a == null ? b > 2 ? 1 : 0 : a;
                });
                return c[3] === 1 && (c.pop(), b = "rgb("), b + c.join() + ")";
            },
            toHslaString: function () {
                var b = "hsla(", c = a.map(this.hsla(), function (a, b) {
                    return a == null && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(a * 100) + "%"), a;
                });
                return c[3] === 1 && (c.pop(), b = "hsl("), b + c.join() + ")";
            },
            toHexString: function (b) {
                var c = this._rgba.slice(), d = c.pop();
                return b && c.push(~~(d * 255)), "#" + a.map(c, function (a) {
                    return a = (a || 0).toString(16), a.length === 1 ? "0" + a : a;
                }).join("");
            },
            toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
            }
        }), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) {
            if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]];
            var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = a[3], f = Math.max(b, c, d), g = Math.min(b, c, d), h = f - g, i = f + g, j = i * .5, k, l;
            return g === f ? k = 0 : b === f ? k = 60 * (c - d) / h + 360 : c === f ? k = 60 * (d - b) / h + 120 : k = 60 * (b - c) / h + 240, h === 0 ? l = 0 : j <= .5 ? l = h / i : l = h / (2 - i), [Math.round(k) % 360, l, j, e == null ? 1 : e];
        }, g.hsla.from = function (a) {
            if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]];
            var b = a[0] / 360, c = a[1], d = a[2], e = a[3], f = d <= .5 ? d * (1 + c) : d + c - d * c, g = 2 * d - f;
            return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e];
        }, l(g, function (c, e) {
            var g = e.props, h = e.cache, i = e.to, j = e.from;
            f.fn[c] = function (c) {
                i && !this[h] && (this[h] = i(this._rgba));
                if (c === b) return this[h].slice();
                var d, e = a.type(c), k = e === "array" || e === "object" ? c : arguments, n = this[h].slice();
                return l(g, function (a, b) {
                    var c = k[e === "object" ? a : b.idx];
                    c == null && (c = n[b.idx]), n[b.idx] = m(c, b);
                }), j ? (d = f(j(n)), d[h] = n, d) : f(n);
            }, l(g, function (b, e) {
                if (f.fn[b]) return;
                f.fn[b] = function (f) {
                    var g = a.type(f), h = b === "alpha" ? this._hsla ? "hsla" : "rgba" : c, i = this[h](), j = i[e.idx], k;
                    return g === "undefined" ? j : (g === "function" && (f = f.call(this, j), g = a.type(f)), f == null && e.empty ? this : (g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1 : -1))), i[e.idx] = f, this[h](i)));
                };
            });
        }), f.hook = function (b) {
            var c = b.split(" ");
            l(c, function (b, c) {
                a.cssHooks[c] = {
                    set: function (b, d) {
                        var e, g, h = "";
                        if (d !== "transparent" && (a.type(d) !== "string" || (e = n(d)))) {
                            d = f(e || d);
                            if (!i.rgba && d._rgba[3] !== 1) {
                                g = c === "backgroundColor" ? b.parentNode : b;
                                while ((h === "" || h === "transparent") && g && g.style) try {
                                    h = a.css(g, "backgroundColor"), g = g.parentNode;
                                } catch (j) { }
                                d = d.blend(h && h !== "transparent" ? h : "_default");
                            }
                            d = d.toRgbaString();
                        }
                        try {
                            b.style[c] = d;
                        } catch (j) { }
                    }
                }, a.fx.step[c] = function (b) {
                    b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos));
                };
            });
        }, f.hook(c), a.cssHooks.borderColor = {
            expand: function (a) {
                var b = {};
                return l(["Top", "Right", "Bottom", "Left"], function (c, d) {
                    b["border" + d + "Color"] = a;
                }), b;
            }
        }, k = a.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        };
    }(jQuery), function () {
        function e(b) {
            var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle, f = {};
            if (e && e.length && e[0] && e[e[0]]) {
                d = e.length;
                while (d--) c = e[d], typeof e[c] == "string" && (f[a.camelCase(c)] = e[c]);
            } else for (c in e) typeof e[c] == "string" && (f[c] = e[c]);
            return f;
        }
        function f(b, c) {
            var e = {}, f, g;
            for (f in c) g = c[f], b[f] !== g && !d[f] && (a.fx.step[f] || !isNaN(parseFloat(g))) && (e[f] = g);
            return e;
        }
        var c = ["add", "remove", "toggle"], d = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (b, c) {
            a.fx.step[c] = function (a) {
                if (a.end !== "none" && !a.setAttr || a.pos === 1 && !a.setAttr) jQuery.style(a.elem, c, a.end), a.setAttr = !0;
            };
        }), a.fn.addBack || (a.fn.addBack = function (a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a));
        }), a.effects.animateClass = function (b, d, g, h) {
            var i = a.speed(d, g, h);
            return this.queue(function () {
                var d = a(this), g = d.attr("class") || "", h, j = i.children ? d.find("*").addBack() : d;
                j = j.map(function () {
                    var b = a(this);
                    return {
                        el: b,
                        start: e(this)
                    };
                }), h = function () {
                    a.each(c, function (a, c) {
                        b[c] && d[c + "Class"](b[c]);
                    });
                }, h(), j = j.map(function () {
                    return this.end = e(this.el[0]), this.diff = f(this.start, this.end), this;
                }), d.attr("class", g), j = j.map(function () {
                    var b = this, c = a.Deferred(), d = a.extend({}, i, {
                        queue: !1,
                        complete: function () {
                            c.resolve(b);
                        }
                    });
                    return this.el.animate(this.diff, d), c.promise();
                }), a.when.apply(a, j.get()).done(function () {
                    h(), a.each(arguments, function () {
                        var b = this.el;
                        a.each(this.diff, function (a) {
                            b.css(a, "");
                        });
                    }), i.complete.call(d[0]);
                });
            });
        }, a.fn.extend({
            addClass: function (b) {
                return function (c, d, e, f) {
                    return d ? a.effects.animateClass.call(this, {
                        add: c
                    }, d, e, f) : b.apply(this, arguments);
                };
            }(a.fn.addClass),
            removeClass: function (b) {
                return function (c, d, e, f) {
                    return arguments.length > 1 ? a.effects.animateClass.call(this, {
                        remove: c
                    }, d, e, f) : b.apply(this, arguments);
                };
            }(a.fn.removeClass),
            toggleClass: function (c) {
                return function (d, e, f, g, h) {
                    return typeof e == "boolean" || e === b ? f ? a.effects.animateClass.call(this, e ? {
                        add: d
                    } : {
                        remove: d
                    }, f, g, h) : c.apply(this, arguments) : a.effects.animateClass.call(this, {
                        toggle: d
                    }, e, f, g);
                };
            }(a.fn.toggleClass),
            switchClass: function (b, c, d, e, f) {
                return a.effects.animateClass.call(this, {
                    add: c,
                    remove: b
                }, d, e, f);
            }
        });
    }(), function () {
        function d(b, c, d, e) {
            a.isPlainObject(b) && (c = b, b = b.effect), b = {
                effect: b
            }, c == null && (c = {}), a.isFunction(c) && (e = c, d = null, c = {});
            if (typeof c == "number" || a.fx.speeds[c]) e = d, d = c, c = {};
            return a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b;
        }
        function e(b) {
            return !b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects.effect[b] ? !0 : a.isFunction(b) ? !0 : typeof b == "object" && !b.effect ? !0 : !1;
        }
        a.extend(a.effects, {
            version: "1.10.4",
            save: function (a, b) {
                for (var d = 0; d < b.length; d++) b[d] !== null && a.data(c + b[d], a[0].style[b[d]]);
            },
            restore: function (a, d) {
                var e, f;
                for (f = 0; f < d.length; f++) d[f] !== null && (e = a.data(c + d[f]), e === b && (e = ""), a.css(d[f], e));
            },
            setMode: function (a, b) {
                return b === "toggle" && (b = a.is(":hidden") ? "show" : "hide"), b;
            },
            getBaseline: function (a, b) {
                var c, d;
                switch (a[0]) {
                    case "top":
                        c = 0;
                        break;
                    case "middle":
                        c = .5;
                        break;
                    case "bottom":
                        c = 1;
                        break;
                    default:
                        c = a[0] / b.height;
                }
                switch (a[1]) {
                    case "left":
                        d = 0;
                        break;
                    case "center":
                        d = .5;
                        break;
                    case "right":
                        d = 1;
                        break;
                    default:
                        d = a[1] / b.width;
                }
                return {
                    x: d,
                    y: c
                };
            },
            createWrapper: function (b) {
                if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                var c = {
                    width: b.outerWidth(!0),
                    height: b.outerHeight(!0),
                    "float": b.css("float")
                }, d = a("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }), e = {
                    width: b.width(),
                    height: b.height()
                }, f = document.activeElement;
                try {
                    f.id;
                } catch (g) {
                    f = document.body;
                }
                return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), b.css("position") === "static" ? (d.css({
                    position: "relative"
                }), b.css({
                    position: "relative"
                })) : (a.extend(c, {
                    position: b.css("position"),
                    zIndex: b.css("z-index")
                }), a.each(["top", "left", "bottom", "right"], function (a, d) {
                    c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto");
                }), b.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), b.css(e), d.css(c).show();
            },
            removeWrapper: function (b) {
                var c = document.activeElement;
                return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b;
            },
            setTransition: function (b, c, d, e) {
                return e = e || {}, a.each(c, function (a, c) {
                    var f = b.cssUnit(c);
                    f[0] > 0 && (e[c] = f[0] * d + f[1]);
                }), e;
            }
        }), a.fn.extend({
            effect: function () {
                function g(c) {
                    function h() {
                        a.isFunction(e) && e.call(d[0]), a.isFunction(c) && c();
                    }
                    var d = a(this), e = b.complete, g = b.mode;
                    (d.is(":hidden") ? g === "hide" : g === "show") ? (d[g](), h()) : f.call(d[0], b, h);
                }
                var b = d.apply(this, arguments), c = b.mode, e = b.queue, f = a.effects.effect[b.effect];
                return a.fx.off || !f ? c ? this[c](b.duration, b.complete) : this.each(function () {
                    b.complete && b.complete.call(this);
                }) : e === !1 ? this.each(g) : this.queue(e || "fx", g);
            },
            show: function (a) {
                return function (b) {
                    if (e(b)) return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "show", this.effect.call(this, c);
                };
            }(a.fn.show),
            hide: function (a) {
                return function (b) {
                    if (e(b)) return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "hide", this.effect.call(this, c);
                };
            }(a.fn.hide),
            toggle: function (a) {
                return function (b) {
                    if (e(b) || typeof b == "boolean") return a.apply(this, arguments);
                    var c = d.apply(this, arguments);
                    return c.mode = "toggle", this.effect.call(this, c);
                };
            }(a.fn.toggle),
            cssUnit: function (b) {
                var c = this.css(b), d = [];
                return a.each(["em", "px", "%", "pt"], function (a, b) {
                    c.indexOf(b) > 0 && (d = [parseFloat(c), b]);
                }), d;
            }
        });
    }(), function () {
        var b = {};
        a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (a, c) {
            b[c] = function (b) {
                return Math.pow(b, a + 2);
            };
        }), a.extend(b, {
            Sine: function (a) {
                return 1 - Math.cos(a * Math.PI / 2);
            },
            Circ: function (a) {
                return 1 - Math.sqrt(1 - a * a);
            },
            Elastic: function (a) {
                return a === 0 || a === 1 ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin(((a - 1) * 80 - 7.5) * Math.PI / 15);
            },
            Back: function (a) {
                return a * a * (3 * a - 2);
            },
            Bounce: function (a) {
                var b, c = 4;
                while (a < ((b = Math.pow(2, --c)) - 1) / 11);
                return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((b * 3 - 2) / 22 - a, 2);
            }
        }), a.each(b, function (b, c) {
            a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function (a) {
                return 1 - c(1 - a);
            }, a.easing["easeInOut" + b] = function (a) {
                return a < .5 ? c(a * 2) / 2 : 1 - c(a * -2 + 2) / 2;
            };
        });
    }();
}(jQuery), function (a, b) {
    function i(a, b) {
        var c = decodeURI(a), e = f[b || !1 ? "strict" : "loose"].exec(c), i = {
            attr: {},
            param: {},
            seg: {}
        }, j = 14;
        while (j--) i.attr[d[j]] = e[j] || "";
        return i.param.query = {}, i.param.fragment = {}, i.attr.query.replace(g, function (a, b, c) {
            b && (i.param.query[b] = c);
        }), i.attr.fragment.replace(h, function (a, b, c) {
            b && (i.param.fragment[b] = c);
        }), i.seg.path = i.attr.path.replace(/^\/+|\/+$/g, "").split("/"), i.seg.fragment = i.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), i.attr.base = i.attr.host ? i.attr.protocol + "://" + i.attr.host + (i.attr.port ? ":" + i.attr.port : "") : "", i;
    }
    function j(a) {
        var d = a.tagName;
        return d !== b ? c[d.toLowerCase()] : d;
    }
    var c = {
        a: "href",
        img: "src",
        form: "action",
        base: "href",
        script: "src",
        iframe: "src",
        link: "href"
    }, d = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], e = {
        anchor: "fragment"
    }, f = {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@?]*):?([^:@?]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@?]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@?]*):?([^:@?]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }, g = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, h = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;
    a.fn.url = function (b) {
        var c = "";
        return this.length && (c = a(this).attr(j(this[0])) || ""), a.url(c, b);
    }, a.url = function (a, c) {
        return arguments.length === 1 && a === !0 && (c = !0, a = b), c = c || !1, a = a || window.location.toString(), {
            data: i(a, c),
            attr: function (a) {
                return a = e[a] || a, a !== b ? this.data.attr[a] : this.data.attr;
            },
            param: function (a) {
                return a !== b ? this.data.param.query[a] : this.data.param.query;
            },
            fparam: function (a) {
                return a !== b ? this.data.param.fragment[a] : this.data.param.fragment;
            },
            segment: function (a) {
                return a === b ? this.data.seg.path : (a = a < 0 ? this.data.seg.path.length + a : a - 1, this.data.seg.path[a]);
            },
            fsegment: function (a) {
                return a === b ? this.data.seg.fragment : (a = a < 0 ? this.data.seg.fragment.length + a : a - 1, this.data.seg.fragment[a]);
            }
        };
    };
}(jQuery), function ($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify : function (a) {
        if (a === null) return "null";
        var b = typeof a;
        if (b === "undefined") return undefined;
        if (b === "number" || b === "boolean") return "" + a;
        if (b === "string") return $.quoteString(a);
        if (b === "object") {
            if (typeof a.toJSON == "function") return $.toJSON(a.toJSON());
            if (a.constructor === Date) {
                var c = a.getUTCMonth() + 1, d = a.getUTCDate(), e = a.getUTCFullYear(), f = a.getUTCHours(), g = a.getUTCMinutes(), h = a.getUTCSeconds(), i = a.getUTCMilliseconds();
                return c < 10 && (c = "0" + c), d < 10 && (d = "0" + d), f < 10 && (f = "0" + f), g < 10 && (g = "0" + g), h < 10 && (h = "0" + h), i < 100 && (i = "0" + i), i < 10 && (i = "0" + i), '"' + e + "-" + c + "-" + d + "T" + f + ":" + g + ":" + h + "." + i + 'Z"';
            }
            if (a.constructor === Array) {
                var j = [];
                for (var k = 0; k < a.length; k++) j.push($.toJSON(a[k]) || "null");
                return "[" + j.join(",") + "]";
            }
            var l, m, n = [];
            for (var o in a) {
                b = typeof o;
                if (b === "number") l = '"' + o + '"'; else {
                    if (b !== "string") continue;
                    l = $.quoteString(o);
                }
                b = typeof a[o];
                if (b === "function" || b === "undefined") continue;
                m = $.toJSON(a[o]), n.push(l + ":" + m);
            }
            return "{" + n.join(",") + "}";
        }
    }, $.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function (src) {
        return eval("(" + src + ")");
    }, $.secureEvalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function (src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.");
    }, $.quoteString = function (a) {
        return a.match(escapeable) ? '"' + a.replace(escapeable, function (a) {
            var b = meta[a];
            return typeof b == "string" ? b : (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16));
        }) + '"' : '"' + a + '"';
    };
}(jQuery), function (a) {
    function b(b, c) {
        function t() {
            return d.update(), v(), d;
        }
        function u() {
            var a = m.toLowerCase();
            j.obj.css(l, n / h.ratio), g.obj.css(l, -n), p.start = j.obj.offset()[l], h.obj.css(a, i[c.axis]), i.obj.css(a, i[c.axis]), j.obj.css(a, j[c.axis]);
        }
        function v() {
            r && (j.obj.bind("mousedown", w), i.obj.bind("mouseup", y)), q && (f.obj[0].ontouchstart = function (a) {
                1 === a.touches.length && (w(a.touches[0]), a.stopPropagation());
            }), s && f.obj.on("pointerdown", function (a) {
                if (a.originalEvent.pointerType === "mouse") return;
                w(a.originalEvent);
            }), c.scroll && window.addEventListener ? (e[0].addEventListener("DOMMouseScroll", x, !1), e[0].addEventListener("mousewheel", x, !1)) : c.scroll && (e[0].onmousewheel = x);
        }
        function w(b) {
            a("body").addClass("noSelect");
            var c = parseInt(j.obj.css(l), 10);
            p.start = k ? b.pageX : b.pageY, o.start = c == "auto" ? 0 : c, r && (a(document).bind("mousemove", y), a(document).bind("mouseup", z), j.obj.bind("mouseup", z)), q && (document.ontouchmove = function (a) {
                a.preventDefault(), y(a.touches[0]);
            }, document.ontouchend = z), s && (f.onpointermove = function (a) {
                y(a.originalEvent);
            }, document.onpointerup = z);
        }
        function x(b) {
            if (g.ratio < 1) {
                var d = b || window.event, e = d.wheelDelta ? d.wheelDelta / 120 : -d.detail / 3;
                n -= e * c.wheel, n = Math.min(g[c.axis] - f[c.axis], Math.max(0, n)), j.obj.css(l, n / h.ratio), g.obj.css(l, -n);
                if (c.lockscroll || n !== g[c.axis] - f[c.axis] && n !== 0) d = a.event.fix(d), d.preventDefault();
            }
        }
        function y(a) {
            g.ratio < 1 && (c.invertscroll && q ? o.now = Math.min(i[c.axis] - j[c.axis], Math.max(0, o.start + (p.start - (k ? a.pageX : a.pageY)))) : o.now = Math.min(i[c.axis] - j[c.axis], Math.max(0, o.start + ((k ? a.pageX : a.pageY) - p.start))), n = o.now * h.ratio, g.obj.css(l, -n), j.obj.css(l, o.now));
        }
        function z() {
            a("body").removeClass("noSelect"), a(document).unbind("mousemove", y), a(document).unbind("mouseup", z), j.obj.unbind("mouseup", z), document.ontouchmove = document.ontouchend = null;
        }
        var d = this, e = b, f = {
            obj: a(".viewport", b)
        }, g = {
            obj: a(".overview", b)
        }, h = {
            obj: a(".scrollbar", b)
        }, i = {
            obj: a(".track", h.obj)
        }, j = {
            obj: a(".thumb", h.obj)
        }, k = c.axis === "x", l = k ? "left" : "top", m = k ? "Width" : "Height", n = 0, o = {
            start: 0,
            now: 0
        }, p = {}, q = "ontouchstart" in document.documentElement, r = !q || navigator && navigator.userAgent && navigator.userAgent.indexOf("Windows NT 6.2") > 0, s = navigator.msMaxTouchPoints > 0;
        return this.update = function (a) {
            f[c.axis] = f.obj[0]["offset" + m], g[c.axis] = g.obj[0]["scroll" + m], g.ratio = f[c.axis] / g[c.axis], h.obj.toggleClass("disable", g.ratio >= 1), i[c.axis] = c.size === "auto" ? f[c.axis] : c.size, j[c.axis] = Math.min(i[c.axis], Math.max(0, c.sizethumb === "auto" ? i[c.axis] * g.ratio : c.sizethumb)), h.ratio = c.sizethumb === "auto" ? g[c.axis] / i[c.axis] : (g[c.axis] - f[c.axis]) / (i[c.axis] - j[c.axis]), n = a === "relative" && g.ratio <= 1 ? Math.min(g[c.axis] - f[c.axis], Math.max(0, n)) : 0, n = a === "bottom" && g.ratio <= 1 ? g[c.axis] - f[c.axis] : isNaN(parseInt(a, 10)) ? n : parseInt(a, 10), u();
        }, t();
    }
    a.tiny = a.tiny || {}, a.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: !0,
            lockscroll: !0,
            size: "auto",
            sizethumb: "auto",
            invertscroll: !1
        }
    }, a.fn.tinyscrollbar = function (c) {
        var d = a.extend({}, a.tiny.scrollbar.options, c);
        return this.each(function () {
            a(this).data("tsb", new b(a(this), d));
        }), this;
    }, a.fn.tinyscrollbar_update = function (b) {
        return a(this).data("tsb").update(b);
    };
}(jQuery), function () {
    var a = {}, b = {};
    $.ajaxTransport("+script", function (c, d, e) {
        if (c.crossDomain) {
            var f, g = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function (d, h) {
                    var i = "jsonpCallback_" + c.jsonpCallback;
                    f = $("#" + i)[0];
                    if (!f) {
                        f = document.createElement("script"), f.id = i, f.async = "async", c.scriptCharset && (f.charset = c.scriptCharset), f.src = c.url, a[i] = [h], b[i] = [e];
                        var j = function () {
                            f.onload = f.onreadystatechange = f.onerror = null, g && f.parentNode && g.removeChild(f), a[i] = [], b[i] = [], f = undefined;
                        };
                        f.onerror = function () {
                            Hulu.Utils.warn("jsonp error");
                            var a = b[i];
                            j();
                            for (var c = a.length - 1; c >= 0; --c) a[c].abort && a[c].abort("error");
                        }, f.onload = f.onreadystatechange = function (b, c) {
                            if (c || !f.readyState || /loaded|complete/.test(f.readyState)) {
                                var d = a[i];
                                j();
                                if (!c) for (var e = d.length - 1; e >= 0; --e) jQuery.isFunction(d[e]) && d[e](200, "success");
                            }
                        }, g.insertBefore(f, g.firstChild);
                    } else a[i].push(h), b[i].push(e);
                },
                abort: function () {
                    f && f.onload && f.onload(0, 1);
                }
            };
        }
    });
}.call(this), "use strict", jQuery.base64 = function (a) {
    function e(a, b) {
        var d = c.indexOf(a.charAt(b));
        if (d === -1) throw "Cannot decode base64";
        return d;
    }
    function f(a) {
        var c = 0, d, f, g = a.length, h = [];
        a = String(a);
        if (g === 0) return a;
        if (g % 4 !== 0) throw "Cannot decode base64";
        a.charAt(g - 1) === b && (c = 1, a.charAt(g - 2) === b && (c = 2), g -= 4);
        for (d = 0; d < g; d += 4) f = e(a, d) << 18 | e(a, d + 1) << 12 | e(a, d + 2) << 6 | e(a, d + 3), h.push(String.fromCharCode(f >> 16, f >> 8 & 255, f & 255));
        switch (c) {
            case 1:
                f = e(a, d) << 18 | e(a, d + 1) << 12 | e(a, d + 2) << 6, h.push(String.fromCharCode(f >> 16, f >> 8 & 255));
                break;
            case 2:
                f = e(a, d) << 18 | e(a, d + 1) << 12, h.push(String.fromCharCode(f >> 16));
        }
        return h.join("");
    }
    function g(a, b) {
        var c = a.charCodeAt(b);
        if (c > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return c;
    }
    function h(a) {
        if (arguments.length !== 1) throw "SyntaxError: exactly one argument required";
        a = String(a);
        var d, e, f = [], h = a.length - a.length % 3;
        if (a.length === 0) return a;
        for (d = 0; d < h; d += 3) e = g(a, d) << 16 | g(a, d + 1) << 8 | g(a, d + 2), f.push(c.charAt(e >> 18)), f.push(c.charAt(e >> 12 & 63)), f.push(c.charAt(e >> 6 & 63)), f.push(c.charAt(e & 63));
        switch (a.length - h) {
            case 1:
                e = g(a, d) << 16, f.push(c.charAt(e >> 18) + c.charAt(e >> 12 & 63) + b + b);
                break;
            case 2:
                e = g(a, d) << 16 | g(a, d + 1) << 8, f.push(c.charAt(e >> 18) + c.charAt(e >> 12 & 63) + c.charAt(e >> 6 & 63) + b);
        }
        return f.join("");
    }
    var b = "=", c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = "1.0";
    return {
        decode: f,
        encode: h,
        VERSION: d
    };
}(jQuery), function (a) {
    var b = 0, c = 1, d = 2, e = /^(?:text|password|search|number|tel|url|email|date(?:time(?:-local)?)?|time|month|week)?$/, f = function (a, b) {
        return a << 3 | b;
    }, g = {};
    g[f(c, b)] = function (a) {
        a.fadeTo(1);
    }, g[f(d, b)] = function (a) {
        a.$label.css({
            opacity: 1
        }).show(), a.emptied(!0);
    }, g[f(b, c)] = function (a) {
        a.fadeTo(a.options.fadeOpacity);
    }, g[f(d, c)] = function (a) {
        a.$label.css({
            opacity: a.options.fadeOpacity
        }).show(), a.emptied(!0);
    }, g[f(b, d)] = function (a) {
        a.$label.hide(), a.emptied(!1);
    }, g[f(c, d)] = g[f(b, d)], a.InFieldLabels = function (e, h, i) {
        var j = this;
        j.$label = a(e), j.label = e, j.$field = a(h), j.field = h, j.$label.data("InFieldLabels", j), j.state = b, j.init = function () {
            j.options = a.extend({}, a.InFieldLabels.defaultOptions, i), j.options.labelClass && j.$label.addClass(j.options.labelClass), j.options.disableAutocomplete && j.$field.attr("autocomplete", "off"), j.$field.bind("blur focus change keyup.infield cut", j.updateState).bind("paste", function (a) {
                j.setState(d);
            }), j.updateState();
        }, j.emptied = function (a) {
            j.options.emptyWatch || (a ? j.$field.bind("keyup.infield", j.updateState) : j.$field.unbind("keyup.infield", j.updateState));
        }, j.fadeTo = function (a) {
            j.options.fadeDuration ? j.$label.stop().animate({
                opacity: a
            }, j.options.fadeDuration) : j.$label.css({
                opacity: a
            });
        }, j.updateState = function (a, e) {
            var f = d;
            if (j.field.value === "") {
                var g = a && a.type;
                g === "focus" || g === "keyup" ? g = !0 : g === "blur" || g === "change" ? g = !1 : g = j.$field.is(":focus"), f = g ? c : b;
            }
            j.setState(f, e);
        }, j.setState = function (a, b) {
            if (a === j.state) return;
            var c = g[f(j.state, a)];
            typeof c == "function" ? (c(j), j.state = a) : b || j.updateState(null, !0);
        }, j.init();
    }, a.InFieldLabels.defaultOptions = {
        emptyWatch: !0,
        disableAutocomplete: !0,
        fadeOpacity: .5,
        fadeDuration: 300,
        labelClass: "in-field"
    }, a.fn.inFieldLabels = function (b) {
        return this.each(function () {
            if (this.tagName !== "LABEL") return;
            var c = this.getAttribute("for") || this.htmlFor, d, f = !0;
            if (!c) return;
            d = document.getElementById(c);
            if (!d) try {
                d = a(this).parent().find("#" + c)[0];
            } catch (g) { }
            if (!d) return;
            d.tagName === "INPUT" ? f = e.test(d.type.toLowerCase()) : d.tagName !== "TEXTAREA" && (f = !1), f = f && !d.getAttribute("placeholder");
            if (!f) return;
            new a.InFieldLabels(this, d, b);
        });
    };
}(jQuery), function (a, b, c) {
    function l() {
        f = b[g](function () {
            d.each(function () {
                var b = a(this), c = b.width(), d = b.height(), e = a.data(this, i) || {};
                (c !== e.w || d !== e.h) && b.trigger(h, [e.w = c, e.h = d]);
            }), l();
        }, e[j]);
    }
    "$:nomunge";
    var d = a([]), e = a.resize = a.extend(a.resize, {}), f, g = "setTimeout", h = "resize", i = h + "-special-event", j = "delay", k = "throttleWindow";
    e[j] = 250, e[k] = !0, a.event.special[h] = {
        setup: function () {
            if (!e[k] && this[g]) return !1;
            var b = a(this);
            d = d.add(b), a.data(this, i, {
                w: b.width(),
                h: b.height()
            }), d.length === 1 && l();
        },
        teardown: function () {
            if (!e[k] && this[g]) return !1;
            var b = a(this);
            d = d.not(b), b.removeData(i), d.length || clearTimeout(f);
        },
        add: function (b) {
            function f(b, e, f) {
                var g = a(this), h = a.data(this, i) || {};
                h.w = e !== c ? e : g.width(), h.h = f !== c ? f : g.height(), d.apply(this, arguments);
            }
            if (!e[k] && this[g]) return !1;
            var d;
            if (a.isFunction(b)) return d = b, f;
            d = b.handler, b.handler = f;
        }
    };
}(jQuery, this), function (a, b) {
    a.fn.collayout = function (c) {
        c = c || {};
        if (!c.layout) return;
        var d = c.layout.split("|"), e = a(this);
        return this.each(function () {
            function f() {
                var b = 0, f = [];
                a.each(d, function (a, d) {
                    var g = d.match(/([0-9]+)px/), h = e.find("ul li").eq(a);
                    if (g) h.width(g[1]), b += parseInt(g[1]); else if (d == "content") {
                        var i = parseInt(h.outerWidth());
                        i == 0 && c.defaultContentWidth && (i = c.defaultContentWidth), b += i;
                    } else d == "grow" && f.push(e.find("ul li").eq(a));
                });
                var g = e.outerWidth();
                g == 0 && c.defaultContainerWidth && (g = c.defaultContainerWidth);
                var h = Math.floor((g - b) / f.length);
                h--, a.each(f, function (a, b) {
                    b.width(h);
                });
            }
            a(b).bind("resize", function () {
                f();
            }), f();
        });
    };
}(jQuery, window), printStackTrace.implementation = function () { }, printStackTrace.implementation.prototype = {
    run: function (a, b) {
        return a = a || this.createException(), b = b || this.mode(a), b === "other" ? this.other(arguments.callee) : this[b](a);
    },
    createException: function () {
        try {
            this.undef();
        } catch (a) {
            return a;
        }
    },
    mode: function (a) {
        return a.arguments && a.stack ? "chrome" : typeof a.message == "string" && typeof window != "undefined" && window.opera ? a.stacktrace ? a.message.indexOf("\n") > -1 && a.message.split("\n").length > a.stacktrace.split("\n").length ? "opera9" : a.stack ? a.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : "opera10a" : "opera9" : a.stack ? "firefox" : "other";
    },
    instrumentFunction: function (a, b, c) {
        a = a || window;
        var d = a[b];
        a[b] = function () {
            return c.call(this, printStackTrace().slice(4)), a[b]._instrumented.apply(this, arguments);
        }, a[b]._instrumented = d;
    },
    deinstrumentFunction: function (a, b) {
        a[b].constructor === Function && a[b]._instrumented && a[b]._instrumented.constructor === Function && (a[b] = a[b]._instrumented);
    },
    chrome: function (a) {
        var b = (a.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
        return b.pop(), b;
    },
    firefox: function (a) {
        return a.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n");
    },
    opera11: function (a) {
        var b = "{anonymous}", c = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, d = a.stacktrace.split("\n"), e = [];
        for (var f = 0, g = d.length; f < g; f += 2) {
            var h = c.exec(d[f]);
            if (h) {
                var i = h[4] + ":" + h[1] + ":" + h[2], j = h[3] || "global code";
                j = j.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, b), e.push(j + "@" + i + " -- " + d[f + 1].replace(/^\s+/, ""));
            }
        }
        return e;
    },
    opera10b: function (a) {
        var b = /^(.*)@(.+):(\d+)$/, c = a.stacktrace.split("\n"), d = [];
        for (var e = 0, f = c.length; e < f; e++) {
            var g = b.exec(c[e]);
            if (g) {
                var h = g[1] ? g[1] + "()" : "global code";
                d.push(h + "@" + g[2] + ":" + g[3]);
            }
        }
        return d;
    },
    opera10a: function (a) {
        var b = "{anonymous}", c = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, d = a.stacktrace.split("\n"), e = [];
        for (var f = 0, g = d.length; f < g; f += 2) {
            var h = c.exec(d[f]);
            if (h) {
                var i = h[3] || b;
                e.push(i + "()@" + h[2] + ":" + h[1] + " -- " + d[f + 1].replace(/^\s+/, ""));
            }
        }
        return e;
    },
    opera9: function (a) {
        var b = "{anonymous}", c = /Line (\d+).*script (?:in )?(\S+)/i, d = a.message.split("\n"), e = [];
        for (var f = 2, g = d.length; f < g; f += 2) {
            var h = c.exec(d[f]);
            h && e.push(b + "()@" + h[2] + ":" + h[1] + " -- " + d[f + 1].replace(/^\s+/, ""));
        }
        return e;
    },
    other: function (a) {
        var b = "{anonymous}", c = /function\s*([\w\-$]+)?\s*\(/i, d = [], e, f, g = 10;
        while (a && a.arguments && d.length < g) e = c.test(a.toString()) ? RegExp.$1 || b : b, f = Array.prototype.slice.call(a.arguments || []), d[d.length] = e + "(" + this.stringifyArguments(f) + ")", a = a.caller;
        return d;
    },
    stringifyArguments: function (a) {
        var b = [], c = Array.prototype.slice;
        for (var d = 0; d < a.length; ++d) {
            var e = a[d];
            e === undefined ? b[d] = "undefined" : e === null ? b[d] = "null" : e.constructor && (e.constructor === Array ? e.length < 3 ? b[d] = "[" + this.stringifyArguments(e) + "]" : b[d] = "[" + this.stringifyArguments(c.call(e, 0, 1)) + "..." + this.stringifyArguments(c.call(e, -1)) + "]" : e.constructor === Object ? b[d] = "#object" : e.constructor === Function ? b[d] = "#function" : e.constructor === String ? b[d] = '"' + e + '"' : e.constructor === Number && (b[d] = e));
        }
        return b.join(",");
    },
    sourceCache: {},
    ajax: function (a) {
        var b = this.createXMLHTTPObject();
        if (b) try {
            return b.open("GET", a, !1), b.send(null), b.responseText;
        } catch (c) { }
        return "";
    },
    createXMLHTTPObject: function () {
        var a, b = [function () {
            return new XMLHttpRequest;
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }];
        for (var c = 0; c < b.length; c++) try {
            return a = b[c](), this.createXMLHTTPObject = b[c], a;
        } catch (d) { }
    },
    isSameDomain: function (a) {
        return typeof location != "undefined" && a.indexOf(location.hostname) !== -1;
    },
    getSource: function (a) {
        return a in this.sourceCache || (this.sourceCache[a] = this.ajax(a).split("\n")), this.sourceCache[a];
    },
    guessAnonymousFunctions: function (a) {
        for (var b = 0; b < a.length; ++b) {
            var c = /\{anonymous\}\(.*\)@(.*)/, d = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, e = a[b], f = c.exec(e);
            if (f) {
                var g = d.exec(f[1]);
                if (g) {
                    var h = g[1], i = g[2], j = g[3] || 0;
                    if (h && this.isSameDomain(h) && i) {
                        var k = this.guessAnonymousFunction(h, i, j);
                        a[b] = e.replace("{anonymous}", k);
                    }
                }
            }
        }
        return a;
    },
    guessAnonymousFunction: function (a, b, c) {
        var d;
        try {
            d = this.findFunctionName(this.getSource(a), b);
        } catch (e) {
            d = "getSource failed with url: " + a + ", exception: " + e.toString();
        }
        return d;
    },
    findFunctionName: function (a, b) {
        var c = /function\s+([^(]*?)\s*\(([^)]*)\)/, d = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/, e = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/, f = "", g, h = Math.min(b, 20), i, j;
        for (var k = 0; k < h; ++k) {
            g = a[b - k - 1], j = g.indexOf("//"), j >= 0 && (g = g.substr(0, j));
            if (g) {
                f = g + f, i = d.exec(f);
                if (i && i[1]) return i[1];
                i = c.exec(f);
                if (i && i[1]) return i[1];
                i = e.exec(f);
                if (i && i[1]) return i[1];
            }
        }
        return "(?)";
    }
};

if (typeof deconcept == "undefined") var deconcept = new Object;

typeof deconcept.util == "undefined" && (deconcept.util = new Object), typeof deconcept.SWFObjectUtil == "undefined" && (deconcept.SWFObjectUtil = new Object), deconcept.SWFObject = function (a, b, c, d, e, f, g, h, i, j) {
    if (!document.getElementById) return;
    this.DETECT_KEY = j ? j : "detectflash", this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY), this.params = new Object, this.variables = new Object, this.attributes = new Array, a && this.setAttribute("swf", a), b && this.setAttribute("id", b), c && this.setAttribute("width", c), d && this.setAttribute("height", d), e && this.setAttribute("version", new deconcept.PlayerVersion(e.toString().split("."))), this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion(), !window.opera && document.all && this.installedVer.major > 7 && deconcept.SWFObject.doPrepUnload(), f && this.addParam("bgcolor", f);
    var k = g ? g : "high";
    this.addParam("quality", k), this.setAttribute("useExpressInstall", !1), this.setAttribute("doExpressInstall", !1);
    var l = h ? h : window.location;
    this.setAttribute("xiRedirectUrl", l), this.setAttribute("redirectUrl", ""), i && this.setAttribute("redirectUrl", i);
}, deconcept.SWFObject.prototype = {
    useExpressInstall: function (a) {
        this.xiSWFPath = a ? a : "expressinstall.swf", this.setAttribute("useExpressInstall", !0);
    },
    setAttribute: function (a, b) {
        this.attributes[a] = b;
    },
    getAttribute: function (a) {
        return this.attributes[a];
    },
    addParam: function (a, b) {
        this.params[a] = b;
    },
    getParams: function () {
        return this.params;
    },
    addVariable: function (a, b) {
        this.variables[a] = b;
    },
    getVariable: function (a) {
        return this.variables[a];
    },
    getVariables: function () {
        return this.variables;
    },
    getVariablePairs: function () {
        var a = new Array, b, c = this.getVariables();
        for (b in c) a[a.length] = b + "=" + c[b];
        return a;
    },
    getSWFHTML: function () {
        var a = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "PlugIn"), this.setAttribute("swf", this.xiSWFPath));
            var b = this.getAttribute("height");
            a = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + b + '" style="' + this.getAttribute("style") + '"', a += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var c = this.getParams();
            for (var d in c) a += [d] + '="' + c[d] + '" ';
            var e = this.getVariablePairs().join("&");
            e.length > 0 && (a += 'flashvars="' + e + '"'), a += "/>";
        } else {
            this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "ActiveX"), this.setAttribute("swf", this.xiSWFPath)), a = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">';
            var f = this.getAttribute("swf"), g = parseInt(Math.random() * 1e5).toString();
            g += (new Date).valueOf().toString(), a += '<param name="movie" value="' + f + '" />';
            var c = this.getParams();
            for (var d in c) a += '<param name="' + d + '" value="' + c[d] + '" />';
            var e = this.getVariablePairs().join("&");
            e.length > 0 && (a += '<param name="flashvars" value="' + e + '" />'), a += "</object>";
        }
        return a;
    },
    write: function (a) {
        if (this.getAttribute("useExpressInstall")) {
            var b = new deconcept.PlayerVersion([6, 0, 65]);
            this.installedVer.versionIsValid(b) && !this.installedVer.versionIsValid(this.getAttribute("version")) && (this.setAttribute("doExpressInstall", !0), this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl"))), document.title = document.title.slice(0, 47) + " - Flash Player Installation", this.addVariable("MMdoctitle", document.title));
        }
        if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
            var c = typeof a == "string" ? document.getElementById(a) : a;
            return c && (c.innerHTML = this.getSWFHTML()), !0;
        }
        return this.getAttribute("redirectUrl") != "" && document.location.replace(this.getAttribute("redirectUrl")), !1;
    }
}, deconcept.SWFObjectUtil.getPlayerVersion = function () {
    var a = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var b = navigator.plugins["Shockwave Flash"], c = navigator.mimeTypes ? navigator.mimeTypes["application/x-shockwave-flash"] : !1;
        b && b.description && c && c.enabledPlugin && (a = new deconcept.PlayerVersion(b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")));
    } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
        var d = 1, e = 3;
        while (d) try {
            e++, d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + e), a = new deconcept.PlayerVersion([e, 0, 0]);
        } catch (f) {
            d = null;
        }
    } else {
        try {
            var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        } catch (f) {
            try {
                var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                a = new deconcept.PlayerVersion([6, 0, 21]), d.AllowScriptAccess = "always";
            } catch (f) {
                if (a.major == 6) return a;
            }
            try {
                d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (f) { }
        }
        if (d != null) try {
            a = new deconcept.PlayerVersion(d.GetVariable("$version").split(" ")[1].split(","));
        } catch (f) {
            a = new deconcept.PlayerVersion([10, 1, 0]);
        }
    }
    return a;
}, deconcept.PlayerVersion = function (a) {
    this.major = a[0] != null ? parseInt(a[0]) : 0, this.minor = a[1] != null ? parseInt(a[1]) : 0, this.rev = a[2] != null ? parseInt(a[2]) : 0;
}, deconcept.PlayerVersion.prototype.versionIsValid = function (a) {
    return this.major < a.major ? !1 : this.major > a.major ? !0 : this.minor < a.minor ? !1 : this.minor > a.minor ? !0 : this.rev < a.rev ? !1 : !0;
}, deconcept.util = {
    getRequestParameter: function (a) {
        var b = document.location.search || document.location.hash;
        if (a == null) return b;
        if (b) {
            var c = b.substring(1).split("&");
            for (var d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return c[d].substring(c[d].indexOf("=") + 1);
        }
        return "";
    }
}, deconcept.SWFObjectUtil.cleanupSWFs = function () {
    try {
        var a = document.getElementsByTagName("OBJECT");
        for (var b = a.length - 1; b >= 0; b--) {
            a[b].style.display = "none";
            for (var c in a[b]) typeof a[b][c] == "function" && (a[b][c] = function () { });
            a[b].parentNode.removeChild(a[b]);
        }
    } catch (d) { }
}, deconcept.SWFObject.doPrepUnload = function () {
    deconcept.unloadSet || (deconcept.SWFObjectUtil.prepUnload = function () {
        __flash_unloadHandler = function () { }, __flash_savedUnloadHandler = function () { }, window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
    }, window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload), deconcept.unloadSet = !0);
}, !document.getElementById && document.all && (document.getElementById = function (a) {
    return document.all[a];
});

var getQueryParamValue = deconcept.util.getRequestParameter, FlashObject = deconcept.SWFObject, SWFObject = deconcept.SWFObject;

"use strict";

var CryptoJS = CryptoJS || function (a, b) {
    var c = {}, d = c.lib = {}, e = function () { }, f = d.Base = {
        extend: function (a) {
            e.prototype = this;
            var b = new e;
            return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function () {
                b.$super.init.apply(this, arguments);
            }), b.init.prototype = b, b.$super = this, b;
        },
        create: function () {
            var a = this.extend();
            return a.init.apply(a, arguments), a;
        },
        init: function () { },
        mixIn: function (a) {
            for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
            a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
            return this.init.prototype.extend(this);
        }
    }, g = d.WordArray = f.extend({
        init: function (a, c) {
            a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
        },
        toString: function (a) {
            return (a || i).stringify(this);
        },
        concat: function (a) {
            var b = this.words, c = a.words, d = this.sigBytes;
            a = a.sigBytes, this.clamp();
            if (d % 4) for (var e = 0; e < a; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4); else if (65535 < c.length) for (e = 0; e < a; e += 4) b[d + e >>> 2] = c[e >>> 2]; else b.push.apply(b, c);
            return this.sigBytes += a, this;
        },
        clamp: function () {
            var b = this.words, c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
        },
        clone: function () {
            var a = f.clone.call(this);
            return a.words = this.words.slice(0), a;
        },
        random: function (b) {
            for (var c = [], d = 0; d < b; d += 4) c.push(4294967296 * a.random() | 0);
            return new g.init(c, b);
        }
    }), h = c.enc = {}, i = h.Hex = {
        stringify: function (a) {
            var b = a.words;
            a = a.sigBytes;
            for (var c = [], d = 0; d < a; d++) {
                var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                c.push((e >>> 4).toString(16)), c.push((e & 15).toString(16));
            }
            return c.join("");
        },
        parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return new g.init(c, b / 2);
        }
    }, j = h.Latin1 = {
        stringify: function (a) {
            var b = a.words;
            a = a.sigBytes;
            for (var c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
            return c.join("");
        },
        parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
            return new g.init(c, b);
        }
    }, k = h.Utf8 = {
        stringify: function (a) {
            try {
                return decodeURIComponent(escape(j.stringify(a)));
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function (a) {
            return j.parse(unescape(encodeURIComponent(a)));
        }
    }, l = d.BufferedBlockAlgorithm = f.extend({
        reset: function () {
            this._data = new g.init, this._nDataBytes = 0;
        },
        _append: function (a) {
            "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
        },
        _process: function (b) {
            var c = this._data, d = c.words, e = c.sigBytes, f = this.blockSize, h = e / (4 * f), h = b ? a.ceil(h) : a.max((h | 0) - this._minBufferSize, 0);
            b = h * f, e = a.min(4 * b, e);
            if (b) {
                for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
                i = d.splice(0, b), c.sigBytes -= e;
            }
            return new g.init(i, e);
        },
        clone: function () {
            var a = f.clone.call(this);
            return a._data = this._data.clone(), a;
        },
        _minBufferSize: 0
    });
    d.Hasher = l.extend({
        cfg: f.extend(),
        init: function (a) {
            this.cfg = this.cfg.extend(a), this.reset();
        },
        reset: function () {
            l.reset.call(this), this._doReset();
        },
        update: function (a) {
            return this._append(a), this._process(), this;
        },
        finalize: function (a) {
            return a && this._append(a), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function (a) {
            return function (b, c) {
                return (new a.init(c)).finalize(b);
            };
        },
        _createHmacHelper: function (a) {
            return function (b, c) {
                return (new m.HMAC.init(a, c)).finalize(b);
            };
        }
    });
    var m = c.algo = {};
    return c;
}(Math);

(function (a) {
    for (var b = CryptoJS, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function (a) {
    return 4294967296 * (a - (a | 0)) | 0;
    }, i = 2, j = 0; 64 > j;) {
        var k;
        a: {
            k = i;
            for (var l = a.sqrt(k), m = 2; m <= l; m++) if (!(k % m)) {
                k = !1;
                break a;
            }
            k = !0;
        }
        k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++), i++;
    }
    var n = [], c = c.SHA256 = e.extend({
        _doReset: function () {
            this._hash = new d.init(f.slice(0));
        },
        _doProcessBlock: function (a, b) {
            for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
                if (16 > m) n[m] = a[b + m] | 0; else {
                    var o = n[m - 15], p = n[m - 2];
                    n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16];
                }
                o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m], p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f), l = k, k = j, j = i, i = h + o | 0, h = f, f = e, e = d, d = o + p | 0;
            }
            c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0, c[5] = c[5] + j | 0, c[6] = c[6] + k | 0, c[7] = c[7] + l | 0;
        },
        _doFinalize: function () {
            var b = this._data, c = b.words, d = 8 * this._nDataBytes, e = 8 * b.sigBytes;
            return c[e >>> 5] |= 128 << 24 - e % 32, c[(e + 64 >>> 9 << 4) + 14] = a.floor(d / 4294967296), c[(e + 64 >>> 9 << 4) + 15] = d, b.sigBytes = 4 * c.length, this._process(), this._hash;
        },
        clone: function () {
            var a = e.clone.call(this);
            return a._hash = this._hash.clone(), a;
        }
    });
    b.SHA256 = e._createHelper(c), b.HmacSHA256 = e._createHmacHelper(c);
})(Math), function () {
    var a = CryptoJS, b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
        init: function (a, c) {
            a = this._hasher = new a.init, "string" == typeof c && (c = b.parse(c));
            var d = a.blockSize, e = 4 * d;
            c.sigBytes > e && (c = a.finalize(c)), c.clamp();
            for (var f = this._oKey = c.clone(), g = this._iKey = c.clone(), h = f.words, i = g.words, j = 0; j < d; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = e, this.reset();
        },
        reset: function () {
            var a = this._hasher;
            a.reset(), a.update(this._iKey);
        },
        update: function (a) {
            return this._hasher.update(a), this;
        },
        finalize: function (a) {
            var b = this._hasher;
            return a = b.finalize(a), b.reset(), b.finalize(this._oKey.clone().concat(a));
        }
    });
}();

var Kicksend = {
    mailcheck: {
        threshold: 3,
        defaultDomains: ["gmail.com", "yahoo.co.jp", "docomo.ne.jp", "ezweb.ne.jp", "i.softbank.jp", "hotmail.com", "hotmail.co.jp", "softbank.ne.jp", "nifty.com", "me.com", "ybb.ne.jp", "yahoo.com", "icloud.com", "live.jp", "mail.goo.ne.jp", "mac.com", "jcom.home.ne.jp", "msn.com", "ozzio.jp", "bma.biglobe.ne.jp", "excite.co.jp", "aol.com", "hb.tp1.jp", "tbz.t-com.ne.jp", "outlook.com", "infoseek.jp", "sjsu.edu", "sdsu.edu", "homesc.com", "ae.auone-net.jp", "outlook.jp", "qq.com", "t.vodafone.ne.jp", "gaia.eonet.ne.jp", "mopera.net", "ymail.com", "nifty.ne.jp", "ares.eonet.ne.jp", "leto.eonet.ne.jp", "maia.eonet.ne.jp", "ac.auone-net.jp", "zeus.eonet.ne.jp", "nike.eonet.ne.jp", "iris.eonet.ne.jp", "livedoor.com", "yahoo.ne.jp", "naver.com", "goo.jp", "gol.com", "yahoo.com.tw", "emobile.ne.jp", "i.softbank.ne.jp", "live.com", "comcast.net", "sbcglobal.net", "att.net", "verizon.net", "cox.net", "bellsouth.net", "rocketmail.com", "aim.com", "charter.net", "earthlink.net", "optonline.net", "windstream.net", "juno.com", "roadrunner.com", "mail.com", "frontier.com", "q.com", "embarqmail.com", "centurylink.net", "mchsi.com", "suddenlink.net", "cfl.rr.com", "insightbb.com", "us.army.mil", "asu.edu", "cableone.net", "netscape.net", "umich.edu", "umn.edu", "netzero.com", "netzero.net", "tampabay.rr.com", "nc.rr.com", "nyu.edu", "email.phoenix.edu", "gmx.com", "frontiernet.net", "pacbell.net", "msu.edu", "osu.edu", "wi.rr.com", "mindspring.com", "rochester.rr.com", "ufl.edu", "centurytel.net", "tds.net", "kent.edu", "vt.edu", "liberty.edu", "indiana.edu", "facebook.com", "cornell.edu", "email.vccs.edu", "psu.edu", "carolina.rr.com", "email.com", "mail.usf.edu", "excite.com", "wisc.edu", "colorado.edu", "email.arizona.edu", "knights.ucf.edu", "uga.edu", "austin.rr.com", "yahoo.co.uk", "googlemail.com", "virginia.edu", "columbia.edu", "ptd.net", "bresnan.net", "triad.rr.com", "usc.edu", "fuse.net", "ncsu.edu", "ucdavis.edu", "ameritech.net", "nycap.rr.com", "ucla.edu", "swbell.net", "ohio.edu", "crimson.ua.edu", "purdue.edu", "wowway.com", "bu.edu", "ivytech.edu", "prodigy.net", "hawaii.edu", "twcny.rr.com", "zoominternet.net", "utk.edu", "txstate.edu", "kc.rr.com", "mail.missouri.edu", "okstate.edu", "uw.edu", "cinci.rr.com", "berkeley.edu", "neo.rr.com", "utexas.edu", "hawaii.rr.com", "woh.rr.com", "hotmail.co.uk", "yahoo.fr", "ou.edu", "uwm.edu", "satx.rr.com", "tx.rr.com", "ttu.edu", "temple.edu", "vcu.edu", "inbox.com", "uiowa.edu", "my.fsu.edu", "columbus.rr.com", "rcn.com", "auburn.edu", "maricopa.edu", "myfairpoint.net", "maine.rr.com", "optimum.net", "illinois.edu", "nau.edu", "fiu.edu", "nyc.rr.com", "sc.rr.com", "uoregon.edu", "yahoo.ca", "email.sc.edu", "clear.net", "baylor.edu", "maine.edu", "mail.uc.edu", "syr.edu", "byui.edu", "ucsd.edu", "iastate.edu", "tamu.edu", "kctcs.edu", "clearwire.net", "stanford.edu", "uky.edu", "stny.rr.com", "uark.edu", "cmich.edu", "mail.gvsu.edu", "buffalo.edu", "student.gsu.edu", "ku.edu", "u.washington.edu", "uci.edu", "unm.edu", "new.rr.com", "usa.net", "knology.net", "pdx.edu", "duke.edu", "lycos.com", "ksu.edu", "lsu.edu", "snet.net", "muohio.edu", "fsu.edu", "buckeyemail.osu.edu", "mix.wvu.edu", "georgetown.edu", "appstate.edu", "email.itt-tech.edu", "usa.com", "bsu.edu", "yahoo.es", "ca.rr.com", "pitt.edu", "hotmail.ca", "emich.edu", "google.com", "myway.com", "mavs.uta.edu", "utah.edu", "odu.edu", "gci.net", "email.wsu.edu", "uncc.edu", "my.unt.edu", "udel.edu", "nmsu.edu", "vanderbilt.edu", "rams.colostate.edu", "clemson.edu", "cs.com", "csu.fullerton.edu", "email.unc.edu", "umail.iu.edu", "aggiemail.usu.edu", "stu.aii.edu", "pcc.edu", "wmich.edu", "ec.rr.com", "peoplepc.com", "uncg.edu", "zips.uakron.edu", "u.boisestate.edu", "iupui.edu", "yahoo.co.in", "yale.edu", "msstate.edu", "u.northwestern.edu", "atlanticbb.net", "vandals.uidaho.edu", "comcast.com", "san.rr.com", "att.com", "uab.edu", "hughes.net", "drexel.edu", "surewest.net", "bc.edu", "zoomtown.com", "tulane.edu", "topper.wku.edu", "isu.edu", "pobox.com", "my.csun.edu", "socal.rr.com", "siu.edu", "onid.orst.edu", "gmu.edu", "uic.edu", "twc.com", "g.austincc.edu", "gwmail.gwu.edu", "uchicago.edu", "husky.neu.edu", "umd.edu", "gatech.edu", "fullsail.edu", "memphis.edu", "mit.edu", "students.ecu.edu", "uh.edu", "student.cccs.edu", "yahoo.com.mx", "calpoly.edu", "ilstu.edu", "bex.net", "dukes.jmu.edu", "uconn.edu", "georgiasouthern.edu", "bgsu.edu", "mtmail.mtsu.edu", "tigers.lsu.edu", "case.edu", "slu.edu", "comporium.net", "mail.utexas.edu", "goldmail.etsu.edu", "live.unc.edu", "mail.ru", "loop.colum.edu", "jhu.edu", "wayne.edu", "gmx.de", "metrocast.net", "students.kennesaw.edu", "ucr.edu", "wright.edu", "adelphia.net", "jacks.sdstate.edu", "umail.ucsb.edu", "ucsc.edu", "unlv.nevada.edu", "rediffmail.com", "radford.edu", "d.umn.edu", "wildblue.net", "wavecable.com", "uvm.edu", "shsu.edu", "luc.edu", "nd.edu", "post.harvard.edu", "huskers.unl.edu", "microsoft.com", "tcu.edu", "live.missouristate.edu", "valdosta.edu", "rit.edu", "neo.tamu.edu", "mediacombb.net"],
        defaultTopLevelDomains: ["co.jp", "co.uk", "com", "net", "org", "info", "edu", "gov", "mil"],
        run: function (a) {
            a.domains = a.domains || Kicksend.mailcheck.defaultDomains, a.topLevelDomains = a.topLevelDomains || Kicksend.mailcheck.defaultTopLevelDomains, a.distanceFunction = a.distanceFunction || Kicksend.sift3Distance;
            var b = Kicksend.mailcheck.suggest(encodeURI(a.email), a.domains, a.topLevelDomains, a.distanceFunction);
            b ? a.suggested && a.suggested(b) : a.empty && a.empty();
        },
        suggest: function (a, b, c, d) {
            a = a.toLowerCase();
            var e = this.splitEmail(a), f = this.findClosestDomain(e.domain, b, c, d);
            if (f) {
                if (f != e.domain) return {
                    address: e.address,
                    domain: f,
                    full: e.address + "@" + f
                };
            } else {
                var g = this.findClosestDomain(e.topLevelDomain, c);
                if (e.domain && g && g != e.topLevelDomain) {
                    var h = e.domain;
                    return f = h.substring(0, h.lastIndexOf(e.topLevelDomain)) + g, {
                        address: e.address,
                        domain: f,
                        full: e.address + "@" + f
                    };
                }
            }
            return !1;
        },
        findClosestDomain: function (a, b, c, d) {
            var e, f = 99, g = null;
            if (!a || !b) return !1;
            d || (d = this.sift3Distance);
            for (var h = 0; h < b.length; h++) {
                if (a === b[h]) return a;
                if (c) {
                    var i = this.findClosestTopLevelDomain(a, b[h], c);
                    if (i) return i;
                }
                e = d(a, b[h]), e < f && (f = e, g = b[h]);
            }
            return f <= this.threshold && g !== null ? g : !1;
        },
        sift3Distance: function (a, b) {
            if (a == null || a.length === 0) return b == null || b.length === 0 ? 0 : b.length;
            if (b == null || b.length === 0) return a.length;
            var c = 0, d = 0, e = 0, f = 0, g = 5;
            while (c + d < a.length && c + e < b.length) {
                if (a.charAt(c + d) == b.charAt(c + e)) f++; else {
                    d = 0, e = 0;
                    for (var h = 0; h < g; h++) {
                        if (c + h < a.length && a.charAt(c + h) == b.charAt(c)) {
                            d = h;
                            break;
                        }
                        if (c + h < b.length && a.charAt(c) == b.charAt(c + h)) {
                            e = h;
                            break;
                        }
                    }
                }
                c++;
            }
            return (a.length + b.length) / 2 - f;
        },
        splitEmail: function (a) {
            var b = a.split("@");
            if (b.length < 2) return !1;
            for (var c = 0; c < b.length; c++) if (b[c] === "") return !1;
            var d = b.pop(), e = d.split("."), f = "";
            if (e.length == 0) return !1;
            if (e.length == 1) f = e[0]; else {
                for (var c = 1; c < e.length; c++) f += e[c] + ".";
                e.length >= 2 && (f = f.substring(0, f.length - 1));
            }
            return {
                topLevelDomain: f,
                domain: d,
                address: b.join("@")
            };
        },
        splitDomain: function (a) {
            var b = a.split("."), c = "";
            if (b.length == 0) return !1;
            for (var d = 0; d < b.length - 1; d++) c += b[d] + ".";
            return b.length >= 2 && (c = c.substring(0, c.length - 1)), {
                topLevelDomain: b[b.length - 1],
                mainDomain: c
            };
        },
        findClosestTopLevelDomain: function (a, b, c) {
            var d = this.splitDomain(a), e = this.splitDomain(b), f = "";
            if (d.mainDomain === e.mainDomain) for (var g = 0; g < c.length; g++) {
                f = d.mainDomain + "." + c[g];
                if (f === b) return b;
            }
            return !1;
        }
    }
};

typeof module != "undefined" && module.exports && (module.exports = Kicksend.mailcheck), typeof window != "undefined" && window.jQuery && function (a) {
    a.fn.mailcheck = function (a) {
        var b = this;
        if (a.suggested) {
            var c = a.suggested;
            a.suggested = function (a) {
                c(b, a);
            };
        }
        if (a.empty) {
            var d = a.empty;
            a.empty = function () {
                d.call(null, b);
            };
        }
        a.email = this.val(), Kicksend.mailcheck.run(a);
    };
}(jQuery), function () {
    var a = "20140213";
}.call(this), window.jsLoaded && (window.jsLoaded.applicationCore = !0, window.jsLoaded.applicationCoreLoadedTime = new Date), jQuery.fn.jquery += "-hulu", window.jQueryFromHulu = jQuery;;