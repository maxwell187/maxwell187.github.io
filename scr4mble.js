"use strict";

function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}
var TextScramble = function() {
        function a(b) {
            _classCallCheck(this, a), this.el = b, this.chars = "!≤≥¢$_", this.update = this.update.bind(this)
            // Default: !<>-_\\/[]{}$#_________$$$$
        }
        return a.prototype.setText = function(b) {
            var c = this,
                d = this.el.innerText,
                e = Math.max(d.length, b.length),
                f = new Promise(function(a) {
                    return c.resolve = a
                });
            this.queue = [];
            for (var g = 0; g < e; g++) {
                var h = d[g] || "",
                    i = b[g] || "",
                    j = Math.floor(70 * Math.random()),
                    k = j + Math.floor(60 * Math.random());
                this.queue.push({
                    from: h,
                    to: i,
                    start: j,
                    end: k
                })
            }
            return cancelAnimationFrame(this.frameRequest), this.frame = 0, this.update(), f
        }, a.prototype.update = function() {
            for (var b = "", c = 0, d = 0, e = this.queue.length; d < e; d++) {
                var f = this.queue[d],
                    g = f.from,
                    h = f.to,
                    i = f.start,
                    j = f.end,
                    k = f.char;
                this.frame >= j ? (c++, b += h) : this.frame >= i ? ((!k || Math.random() < .18) && (k = this.randomChar(), this.queue[d].char = k), b += '<span class="dud">' + k + "</span>") : b += g
            }
            this.el.innerHTML = b, c === this.queue.length ? this.resolve() : (this.frameRequest = requestAnimationFrame(this.update), this.frame++)
        }, a.prototype.randomChar = function() {
            return this.chars[Math.floor(Math.random() * this.chars.length)]
        }, a
    }(),
    phrases = ["pewdiepie.xyz"],
    el = document.querySelectorAll(".text")[0],
    fx = new TextScramble(el),
    counter = 0,
    next = function a() {
        counter < 10 && fx.setText(phrases[counter]).then(function() {
            setTimeout(a, 5331)
        })
    };
next();