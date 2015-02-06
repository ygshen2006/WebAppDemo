
(function (c) {
    c.widget("metro.livetile", {
        version: "1.0.0", options: { effect: "slideLeft", period: 4E3, duration: 700, easing: "doubleSqrt" }, _frames: {}, _currentIndex: 0, _interval: 0, _outPosition: 0, _size: {}, _create: function () {
            var a = this, b = this.element; void 0 != b.data("effect") && (this.options.effect = b.data("effect")); void 0 != b.data("direction") && (this.options.direction = b.data("direction")); void 0 != b.data("period") && (this.options.period = b.data("period")); void 0 != b.data("duration") && (this.options.duration = b.data("duration"));
            void 0 != b.data("easing") && (this.options.easing = b.data("easing")); this._frames = b.children("[class*='-content']"); 1 >= this._frames.length || (c.easing.doubleSqrt = function (a) { return Math.sqrt(Math.sqrt(a)) }, this._size = { width: b.width(), height: b.height() }, b.on("mouseenter", function () { a.stop() }), b.on("mouseleave", function () { a.start() }), this.start())
        }, start: function () { var a = this; this._interval = setInterval(function () { a._animate() }, this.options.period) }, stop: function () { clearInterval(this._interval) }, _animate: function () {
            var a =
            this._frames[this._currentIndex], b; this._currentIndex += 1; this._currentIndex >= this._frames.length && (this._currentIndex = 0); b = this._frames[this._currentIndex]; switch (this.options.effect) { case "slideLeft": this._effectSlideLeft(a, b); break; case "slideRight": this._effectSlideRight(a, b); break; case "slideDown": this._effectSlideDown(a, b); break; case "slideUpDown": this._effectSlideUpDown(a, b); break; case "slideLeftRight": this._effectSlideLeftRight(a, b); break; default: this._effectSlideUp(a, b) }
        }, _effectSlideLeftRight: function (a,
        b) { 0 == this._currentIndex % 2 ? this._effectSlideLeft(a, b) : this._effectSlideRight(a, b) }, _effectSlideUpDown: function (a, b) { 0 == this._currentIndex % 2 ? this._effectSlideUp(a, b) : this._effectSlideDown(a, b) }, _effectSlideUp: function (a, b) { var d = this._size.height, e = { duration: this.options.duration, easing: this.options.easing }; c(a).animate({ top: -d }, e); c(b).css({ top: d }).show().animate({ top: 0 }, e) }, _effectSlideDown: function (a, b) {
            var d = this._size.height, e = { duration: this.options.duration, easing: this.options.easing }; c(a).animate({ top: d },
            e); c(b).css({ top: -d }).show().animate({ top: 0 }, e)
        }, _effectSlideLeft: function (a, b) { var d = this._size.width, e = { duration: this.options.duration, easing: this.options.easing }; c(a).animate({ left: -1 * d }, e); c(b).css({ left: d }).show().animate({ left: 0 }, e) }, _effectSlideRight: function (a, b) { var d = this._size.width, e = { duration: this.options.duration, easing: this.options.easing }; c(a).animate({ left: d }, e); c(b).css({ left: -d }).show().animate({ left: 0 }, e) }, _destroy: function () { }, _setOption: function (a, b) {
            this._super("_setOption",
            a, b)
        }
    })


c.Metro.initAll = function (a) {
c.Metro.initLives(a);
}
})(jQuery); 


c.Metro.initLives = function (a) { void 0 != a ? c(a).find("[data-role=live-tile], [data-role=live]").livetile() : c("[data-role=live-tile], [data-role=live]").livetile() };