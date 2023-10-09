/*
  Copyright (c) 2018 limeroad <https://www.limeroad.com>
 @version    3.0 Stable
*/
var alakhNiranjan = (function () {
  function a(a, b) {
    for (var e = 0, h = a && a[0] ? a.length : 0; e < h; e++) this[e] = a[e];
    this.length = h;
    this.selector = b ? c.trim(b) : "";
  }
  var f = {},
    c;
  f.an = function (d, b) {
    return new a(d, b);
  };
  f.isAN = function (a) {
    return a instanceof f.an;
  };
  f.selector = function (a, b) {
    if (!a) return [];
    var e = [],
      e = b || document,
      h = c.trim(a);
    h.includes("*") && (h = CSS.escape(h));
    return (e =
      1 < h.split(" ").length || -1 < h.indexOf(",")
        ? e.querySelectorAll(h)
        : "#" == h[0]
        ? [document.getElementById(h.substr(1))]
        : "." == h[0]
        ? e.getElementsByClassName(h.substr(1))
        : -1 < h.indexOf("[")
        ? e.querySelectorAll(h)
        : e.getElementsByTagName(h));
  };
  f.init = function (a, b) {
    if (!a) return f.an();
    if (f.isAN(a)) return a;
    var c = [],
      c =
        "string" == typeof a ? f.selector(a, b) : a instanceof Array ? a : [a];
    return f.an(c, a);
  };
  c = function (a, b) {
    return f.init(a, b);
  };
  c.regexp = function (a, b) {
    var c = "";
    switch (b) {
      case "className":
        c = "(\\s|^)" + a + "(\\s|$)";
        break;
      case "url":
        c = "/(?:\\b|_)(?:" + a + ")(?:\\b|_)/i";
    }
    return new RegExp(c);
  };
  c.trim = function (a) {
    return a && a.trim ? a.trim() : "";
  };
  c.createElement = function (a) {
    return c(document.createElement(a));
  };
  c.parseJSON = JSON.parse;
  c.stringifyJSON = JSON.stringify;
  c.decodeURI = window.decodeURI;
  c.decodeURIComponent = window.decodeURIComponent;
  c.encodeURI = window.encodeURI;
  c.encodeURIComponent = window.encodeURIComponent;
  c.parseInt = window.parseInt;
  c.parseFloat = window.parseFloat;
  c.extend =
    Object.assign ||
    function (a) {
      for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b],
          h;
        for (h in c)
          Object.prototype.hasOwnProperty.call(c, h) && (a[h] = c[h]);
      }
      return a;
    };
  c.fn = {
    constructor: f.an,
    length: 0,
    remove: function () {
      return this.each(function () {
        null !== this.parentNode && this.parentNode.removeChild(this);
      });
    },
    each: function (a, b) {
      for (
        var c = 0, h = b ? Math.min(b, this.length) : this.length;
        c < h;
        c++
      )
        a.call(this[c]);
      return this;
    },
    show: function (a) {
      return this.each(function () {
        this.style.display = a ? a : "block";
      });
    },
    hide: function () {
      return this.each(function () {
        this.style.display = "none";
      });
    },
    hasClass: function (a) {
      return c.regexp(a, "className").test(this[0].className);
    },
    addClass: function (a) {
      if ("string" === typeof a && a)
        return this.each(function () {
          for (var b = a.split(" "), e = 0; e < b.length; e++)
            c.regexp(b[e], "className").test(this.className) ||
              (this.className = c.trim(this.className + " " + b[e]));
        });
    },
    removeClass: function (a) {
      if ("string" === typeof a && a)
        return this.each(function () {
          for (var b = a.split(" "), e = 0; e < b.length; e++)
            c.regexp(b[e], "className").test(this.className) &&
              (this.className = c.trim(this.className.replace(b[e], "")));
        });
    },
    attr: function (a, b) {
      if (a)
        if (b)
          " " == b ? this[0].removeAttribute(a) : this[0].setAttribute(a, b);
        else return this[0].getAttribute(a);
      return this;
    },
    ie: function (a, b) {
      a && this[0].insertAdjacentHTML(b ? "beforebegin" : "beforeend", a);
      return this;
    },
    ia: function (a, b) {
      a.insertAdjacentHTML("beforeend", b);
    },
    ae: function (a, b) {
      return a
        ? (b
            ? this[0].insertBefore(a, this[0].firstChild)
            : this[0].appendChild(a),
          c(a))
        : this;
    },
    next: function () {
      var a = this[0];
      do a = a.nextElementSibling || !1;
      while (a && 1 !== a.nodeType);
      return c(a);
    },
    nextAll: function (a) {
      a = [];
      for (var b = this[0]; b.nextElementSibling; )
        a.push(b.nextElementSibling), (b = b.nextElementSibling);
      return c(a);
    },
    html: function (a) {
      return this[0]
        ? void 0 !== a && null !== a
          ? ((this[0].innerHTML = a), this)
          : this[0].innerHTML
        : "";
    },
    children: function () {
      return c(this[0].children);
    },
    parent: function () {
      return c(this[0].parentElement);
    },
    parents: function (a, b) {
      for (var c = this, h = b || !1; c[0]; ) {
        if (!h && c.hasClass(a)) return c;
        h = !1;
        c = c.parent();
      }
      return null;
    },
    inView: function (a, b, e, h) {
      var g = this[0].getBoundingClientRect(),
        k = g.height,
        l = g.width,
        m = c.anConstants.deviceHeight,
        f = c.anConstants.deviceWidth;
      a = void 0 === a ? 48 : a;
      b = void 0 === b ? 48 : b;
      return {
        complete:
          g.top >= 0 - a &&
          g.left >= 0 - b &&
          g.bottom <= k + m &&
          g.right <= l + f,
        partial:
          g.top >= 0 - k - m &&
          g.left >= 0 - l - f &&
          g.bottom <= k + 1.5 * m &&
          g.right <= l + 1.3 * f,
        custom:
          g.top >= a &&
          g.left >= b &&
          g.bottom <= (void 0 === e ? k + 2 * m : e) &&
          g.right <= (void 0 === h ? l + 2 * f : h),
      };
    },
    width: function (a) {
      if (!this[0]) return null;
      var b = this[0];
      if ("inner" === a) return b.clientWidth;
      if ("outer" === a) return b.offsetWidth;
      var c = window.getComputedStyle(b, null);
      return "width" === a || null === a
        ? b.clientWidth -
            parseInt(c.getPropertyValue("padding-left")) -
            parseInt(c.getPropertyValue("padding-right"))
        : "full" === a
        ? b.offsetWidth +
          parseInt(c.getPropertyValue("margin-left")) +
          parseInt(c.getPropertyValue("margin-right"))
        : null;
    },
  };
  f.an.prototype = a.prototype = c.fn;
  return c;
})();
window.alakhNiranjan = alakhNiranjan;
window.$$ = alakhNiranjan;
window.$ = alakhNiranjan;
window.$.anConstants = window.anConstants || {};
(function (a) {
  a = document.createElement("style");
  var f = document.getElementById("sty");
  a.innerHTML =
    ".zoom{position: fixed !important;top: 0;left: 0;height: 100%;bottom: 0;right: 0;z-index: 111111;background: #fff}.zoom #imgH img,.zoom .zmimgH{height: auto;width: 100%;}:root {color-scheme: only light;}@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap\");@-o-keyframes blink{50%{-o-transform:scale(.7)}}@-ms-keyframes blink{50%{-ms-transform:scale(.7)}}@-moz-keyframes blink{50%{-moz-transform:scale(.7)}}@-webkit-keyframes blink{50%{-webkit-transform:scale(.7)}}@keyframes blink{50%{-webkit-transform:scale(.7);transform:scale(.7)}}.shaking {animation: horizontal-shaking 0.35s ;}@keyframes horizontal-shaking {0% { transform: translateX(0); } 25% { transform: translateX(5px); } 50% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); }}@-o-keyframes rotate{100%{-o-transform:rotate(360deg)}}@-ms-keyframes rotate{100%{-ms-transform:rotate(360deg)}}@-moz-keyframes rotate{100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes rotate{100%{-webkit-transform:rotate(360deg)}}@keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@-ms-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@-moz-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.afo,.afi,.altr{-webkit-animation-duration:.2s;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-duration:.2s;animation-timing-function:cubic-bezier(0,0,.2,1)}.an-shk{-o-animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;-o-transform: translate3d(0, 0, 0);-o-backface-visibility: hidden;-o-perspective: 1000px;}.an-shk{-ms-animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;-ms-transform: translate3d(0, 0, 0);-ms-backface-visibility: hidden;-ms-perspective: 1000px;}.an-shk{-moz-animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;-moz-transform: translate3d(0, 0, 0);-moz-backface-visibility: hidden;-moz-perspective: 1000px;}.an-shk{-webkit-animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;-webkit-transform: translate3d(0, 0, 0);-webkit-backface-visibility: hidden;-webkit-perspective: 1000px;}.an-shk{-webkit-animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 1 both;-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000px;perspective: 1000px;}@-o-keyframes shake {10%, 90% {-o-transform: translate3d(-1px, 0, 0);}20%, 80% {-o-transform: translate3d(2px, 0, 0);}30%, 50%, 70% {-o-transform: translate3d(-4px, 0, 0);}40%, 60% {-o-transform: translate3d(4px, 0, 0);}}@-ms-keyframes shake {10%, 90% {-ms-transform: translate3d(-1px, 0, 0);}20%, 80% {-ms-transform: translate3d(2px, 0, 0);}30%, 50%, 70% {-ms-transform: translate3d(-4px, 0, 0);}40%, 60% {-ms-transform: translate3d(4px, 0, 0);}}@-moz-keyframes shake {10%, 90% {-moz-transform: translate3d(-1px, 0, 0);}20%, 80% {-moz-transform: translate3d(2px, 0, 0);}30%, 50%, 70% {-moz-transform: translate3d(-4px, 0, 0);}40%, 60% {-moz-transform: translate3d(4px, 0, 0);}}@-webkit-keyframes shake {10%, 90% {-webkit-transform: translate3d(-1px, 0, 0);}20%, 80% {-webkit-transform: translate3d(2px, 0, 0);}30%, 50%, 70% {-webkit-transform: translate3d(-4px, 0, 0);}40%, 60% {-webkit-transform: translate3d(4px, 0, 0);}}@keyframes shake {10%, 90% {-webkit-transform: translate3d(-1px, 0, 0);transform: translate3d(-1px, 0, 0);}20%, 80% {-webkit-transform: translate3d(2px, 0, 0);transform: translate3d(2px, 0, 0);}30%, 50%, 70% {-webkit-transform: translate3d(-4px, 0, 0);transform: translate3d(-4px, 0, 0);}40%, 60% {-webkit-transform: translate3d(4px, 0, 0);transform: translate3d(4px, 0, 0);}}@-o-keyframes fadeInUp {0% {opacity: 0; -o-transform: translate3d(0,460px,0) } to {opacity: 1; -o-transform: none;} }@-ms-keyframes fadeInUp {0% {opacity: 0; -ms-transform: translate3d(0,460px,0) } to {opacity: 1; -ms-transform: none;} }@-moz-keyframes fadeInUp {0% {opacity: 0; -moz-transform: translate3d(0,460px,0) } to {opacity: 1; -moz-transform: none;} }@-webkit-keyframes fadeInUp {0% {opacity: 0; -webkit-transform: translate3d(0,460px,0) } to {opacity: 1; -webkit-transform: none;} }@keyframes fadeInUp {0% {opacity: 0; -webkit-transform: translate3d(0,460px,0);transform: translate3d(0,460px,0) } to {opacity: 1; -webkit-transform: none;transform: none;  } }@-o-keyframes fadeInRight {0% {opacity: 0; -o-transform: translate3d(340px,0,0)} to {opacity: 1; -o-transform: none;}}@-ms-keyframes fadeInRight {0% {opacity: 0; -ms-transform: translate3d(340px,0,0)} to {opacity: 1; -ms-transform: none;}}@-moz-keyframes fadeInRight {0% {opacity: 0; -moz-transform: translate3d(340px,0,0)} to {opacity: 1; -moz-transform: none;}}@-webkit-keyframes fadeInRight {0% {opacity: 0; -webkit-transform: translate3d(340px,0,0)} to {opacity: 1; -webkit-transform: none;}}@keyframes fadeInRight {0% {opacity: 0; -webkit-transform: translate3d(340px,0,0);transform: translate3d(340px,0,0) } to {opacity: 1; -webkit-transform: none; transform: none;} }@-o-keyframes fadeInLeft {0% {opacity: 0; -o-transform: translate3d(-100%,0,0);} to {opacity: 1; -o-transform: none;} }@-ms-keyframes fadeInLeft {0% {opacity: 0; -ms-transform: translate3d(-100%,0,0);} to {opacity: 1; -ms-transform: none;} }@-moz-keyframes fadeInLeft {0% {opacity: 0; -moz-transform: translate3d(-100%,0,0);} to {opacity: 1; -moz-transform: none;} }@-webkit-keyframes fadeInLeft {0% {opacity: 0; -webkit-transform: translate3d(-100%,0,0);} to {opacity: 1; -webkit-transform: none;} }@keyframes fadeInLeft {0% {opacity: 0; -webkit-transform: translate3d(-100%,0,0); transform: translate3d(-100%,0,0) } to {opacity: 1; -webkit-transform: none; transform: none;} }@-o-keyframes fadeOut {0% {opacity: 1; } to {opacity: 0; } }@-ms-keyframes fadeOut {0% {opacity: 1; } to {opacity: 0; } }@-moz-keyframes fadeOut {0% {opacity: 1; } to {opacity: 0; } }@-webkit-keyframes fadeOut {0% {opacity: 1; } to {opacity: 0; } }@keyframes fadeOut {0% {opacity: 1; } to {opacity: 0; } }@-o-keyframes fadeIn {0% {opacity: 0; } to {opacity: 1; } }@-ms-keyframes fadeIn {0% {opacity: 0; } to {opacity: 1; } }@-moz-keyframes fadeIn {0% {opacity: 0; } to {opacity: 1; } }@-webkit-keyframes fadeIn {0% {opacity: 0; } to {opacity: 1; } }@keyframes fadeIn {0% {opacity: 0; } to {opacity: 1; } }.fadeInRight,.fadeInLeft,.fadeOut,.fadeIn{-webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;}.fadeInUp {-webkit-animation-name: fadeInUp ;animation-name: fadeInUp}.fadeInRight {-webkit-animation-name: fadeInRight ;animation-name: fadeInRight }.fadeInLeft {-webkit-animation-name: fadeInLeft ;animation-name: fadeInLeft }.fadeOut {-webkit-animation-name: fadeOut ;animation-name: fadeOut }.fadeIn {-webkit-animation-name: fadeIn ;animation-name: fadeIn}.cir{-webkit-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;height:100%;-webkit-transform-origin:center center;transform-origin:center center;width:100%;top:0;left:0;right:0;margin:auto}.path,.pathF{stroke-dasharray:1,200;stroke-dashoffset:0;-webkit-animation:dash 1.5s ease-in-out infinite;-webkit-animation:dash 1.5s ease-in-out infinite;animation:dash 1.5s ease-in-out infinite;stroke-linecap:round}.sc0,.sc3,.sc6,.sc9,.scF{fill:none;stroke-width:2px}.sc3{stroke:#333}.sc6{stroke:#666}.sc9{stroke:#999}.scF{stroke:#FFF}.sc0{stroke:#000}.crsH,select.goog-te-combo{cursor:pointer}.wbBa{word-break:break-all}.wbBw{word-break:break-word}input[type=\"search\"]{-webkit-appearance: none}.afi,.altr,.amh0a{animation-fill-mode:both}.fg2t,.flat-form{animation-duration:0.4s;animation-fill-mode:both}.t4e,#views,.adj{-o-transition:0.2s ease;-ms-transition:0.2s ease;-moz-transition:0.2s ease;-webkit-transition:0.2s ease;transition:0.2s ease}/*img.o0.an-ll:not([src=\"//:0\"]),*/.tyte{-o-transition:opacity .3s cubic-bezier(0.6,0.8,0.9,1);-ms-transition:opacity .3s cubic-bezier(0.6,0.8,0.9,1);-moz-transition:opacity .3s cubic-bezier(0.6,0.8,0.9,1);-webkit-transition:opacity .3s cubic-bezier(0.6,0.8,0.9,1);transition:opacity .3s cubic-bezier(0.6,0.8,0.9,1)}.t30e{-o-transition:3s ease;-ms-transition:3s ease;-moz-transition:3s ease;-webkit-transition:3s ease;transition:3s ease}#ldr.internal{top:0;-o-animation: 0;-ms-animation: 0;-moz-animation: 0;-webkit-animation:0;animation:0;-o-transform: none;-ms-transform: none;-moz-transform: none;-webkit-transform:none;transform:none;opacity:1;background:rgba(238, 238, 238, 0.8)}[data-srch=\"true\"] #ldr{top:60px!important;left:0}input[disabled]{background: #fff;color:#666}input[disabled].rngVal{color:#000}input[disabled] + label{opacity:0.5}.zoom #imgH:after {display: none}.vdo_con .an-srlx:after{background:#FFF}.vdo-itm.bbg0o:before{background:rgba(0,0,0,.8)}.lmaA{-webkit-animation:show 0s 0.4s forwards;animation:show 0s 0.4s forwards;visibility:hidden}@-webkit-keyframes show{to{visibility:visible}}@keyframes show{to{visibility:visible}}@-ms-viewport{width: device-width}input[type=radio].inSuc~label{top: 0;font-size: 15px;transition: none;color: #000}label {cursor: pointer} input[type=\"checkbox\"] + label:before, input[type=\"radio\"] + label:before, input[type=\"checkbox\"] + label:after, input[type=\"radio\"] + label:after {content: \"\"; position: absolute; left: 0; top: 0; } input[type=\"checkbox\"] + label:before, input[type=\"radio\"] + label:before {width: 16px; height: 16px; background: #fff; border: 2px solid #9C3; border-radius: 2px; cursor: pointer; transition: background 0.3s; } input[type=\"checkbox\"] {display: none } input[type=\"checkbox\"]:checked + label:before {background: #9C3; } input[type=\"checkbox\"]:checked + label:after {transform: rotate(-45deg); top: 6px; left: 4px; width: 10px; height: 4px; border: 2px solid #fff; border-top-style: none; border-right-style: none; } input[type=\"checkbox\"]:disabled + label:before {border-color: rgba(0, 0, 0, 0.26); } input[type=\"checkbox\"]:disabled:checked + label:before {background: rgba(0, 0, 0, 0.26); } input[type=\"radio\"] {display: none; } input[type=\"radio\"]:checked + label:before {border-color: #9C3; } input[type=\"radio\"]:checked + label:after {transform: scale(1); } input[type=\"radio\"]:checked + label:after {transform: scale(1); } input[type=\"radio\"]~label:before, input[type=\"radio\"]~label:after {position: absolute; content: \"\"; border-radius: 50%; transition: all .3s ease; transition-property: transform, border-color; } input[type=\"radio\"] ~ label:after {top: 5px; left: 5px; width: 10px; height: 10px; transform: scale(0); background: #9C3; } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button{-o-appearance:none;-ms-appearance:none;-moz-appearance:none;-webkit-appearance:none;margin:0} input[type=number]{-o-appearance:textfield;-ms-appearance:textfield;-webkit-appearance:textfield;-moz-appearance:textfield} input[type=submit],select{-o-appearance:none;-ms-appearance:none;-moz-appearance:none;-webkit-appearance:none}textarea{max-width:100%} input:focus~label, .inErr~label, .inSuc~label,input[type=text]:valid~label, input[type=tel]:valid~label, input[type=email]:valid~label, input[type=number]:valid~label,select:focus~label, select:valid~label,textarea:focus~label, textarea:valid~label{top:-12px;font-size:12px;color:#999;transition:all .3s} input:-webkit-autofill:focus~label, input:-webkit-autofill:valid~label, input:-webkit-autofill~label, select:-webkit-autofill:focus~label, select:-webkit-autofill:valid~label, select:-webkit-autofill~label, textarea:-webkit-autofill:focus~label, textarea:-webkit-autofill:valid~label, textarea:-webkit-autofill~label{top:-12px;font-size:12px;color:#333;transition:all .3s} input:-webkit-autofill, select:-webkit-autofill, textarea:-webkit-autofill{-webkit-box-shadow:inset 0 0 0 9999px #fff} input:focus, textarea:focus, select:focus{border-color:#99CC33!important;outline:0} .inErr{border-color:#D3145A!important;-o-box-shadow:none;-ms-box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;box-shadow:none;} .inErr~.errM{display:block} .inErr~.pinM{display:none !important}.no-inp:after, .no-inp:before {display: none; }input.hidden + label:before, input.hidden + label:after { width: 0; height: 0; border: none; }.bm0,.cir{bottom:0}.bm10p.bm0{bottom:10%}.fb-frame { background-position: center; background-repeat: no-repeat; background-size: contain; z-index: 10; position: absolute; inset: 0; width: 100%; height: 100%; }img{position:relative;vertical-align:top;border:0;outline:0}img.o0.an-ll:not([src=\"//:0\"]){opacity:1}.bbg0o:before,.cir,.has-sub.open:after,.has-sub:after{position:absolute}.o2,[disabled=true]{opacity:.4}.has-sub:after{content:\"+\";right:14px}.has-sub.open:after{content:\"\\0005F\";right:14px}.cat a:after{content:\"\\027E9\";position:absolute;padding:0 0 0 8px;font-size:12px;right:16px}.fTs{background:#fff;color:#333;border-right:2px solid #9c3;font-weight:700}.bgPo{background:rgba(211,20,90,.8)}.bgFo3{background:rgba(255, 255, 255, 0.96)}.bgFo{background:rgba(255,255,255,.8)}.bgFo2{background:rgba(255,255,255,.5)}.bgFo4 {background: rgba(255, 255, 255, 0.2)}.bgFo5 {background: rgba(255, 255, 255, 0.85)}.bgFo6 {background: rgba(255, 255, 255, 0.95)}.bbg0o:before{content:\"\";left:0;right:0;bottom:0;top:0;background:rgba(0,0,0,.4);z-index:1}.bg0o{background:rgba(0,0,0,.5)}.bg0o2{background:rgba(0,0,0,.75)}[onclick]{cursor:pointer}.err .ldrT{color:#d3145a}.err .path{stroke:#d3145a}.path{stroke:#9C3}.pathF{stroke:#FFF}.color.sec{border:4px solid #9C3}.color.sec.newvip{border:2px solid #9C3}.size.sec{background:#333;color:#FFF;border:1px solid #333;font-weight: bold}.sAc.selectedFilter{border: 6px solid #9c3;}.bg-image{margin-top:0!important}.oA{overflow:auto;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-ms-overflow-scrolling:touch;overflow-scrolling:touch}.oS{overflow:scroll;-webkit-overflow-scrolling:touch}.bgStrc{background:#70C291}.mw88{max-width:88px}.fg1,.fg2t,.fg3t{display:inline-block}#ifr,.smsw,.wtxt{transition:opacity 0.6s ease}.btr24{border-top-right-radius:24px}.wsI{white-space:initial}.conW .vdo_con:first-child{margin-top:0px}.bdtrr0{border-top-right-radius: 0!important}.bdbrr0{border-bottom-right-radius:0!important}.bdblr0{border-bottom-left-radius: 0!important}.bdtlr0{border-top-left-radius:0!important}#ldr.dN{display:none}.bxs1{box-shadow:1px 1px 0px 0px rgba(0, 0, 0, 0.3)}body .trnsR{display:block;-o-transform:translateX(150%);-ms-transform:translateX(150%);-moz-transform:translateX(150%);-webkit-transform:translateX(150%);transform:translateX(150%)}body .trnsL{display:block;-o-transform:translateX(-150%);-ms-transform:translateX(-150%);-moz-transform:translateX(-150%);-webkit-transform:translateX(-150%);transform:translateX(-150%)}body .trns0{-o-transform:none;-ms-transform:none;-moz-transform:none;-webkit-transform:none;transform:none}body .trnsU{display:block;-o-transform:translateY(-150%);-ms-transform:translateY(-150%);-moz-transform:translateY(-150%);-webkit-transform:translateY(-150%);transform:translateY(-150%)}body .trnsD{display:block;-o-transform:translateY(150%);-ms-transform:translateY(150%);-moz-transform:translateY(150%);-webkit-transform:translateY(150%);transform:translateY(150%)}.sizeChartincm.open{text-decoration:underline;color:#333}.vdo_con .playing .vOverlay{opacity:0}.vdo_con .playing .mh50p{min-height:0;transition;-o-transition:8s ease-out;-ms-transition:8s ease-out;-moz-transition:8s ease-out;-webkit-transition:8s ease-out;transition:8s ease-out}.an-icon-love-s{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='16' width='16'%3E%3Cpath fill='none' stroke-width='2' stroke='%23333' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-love-s-xx{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='20' width='20'%3E%3Cpath fill='none' stroke-width='2' stroke='%23333' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-love-rbrd{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' stroke-width='1.5' stroke='%23D3145A' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-love-f-p{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='16' width='16'%3E%3Cpath fill='%23D3145A' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-love-f-p-xx{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='20' width='20'%3E%3Cpath fill='%23D3145A' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-shld-f-l{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='18' width='18'%3E%3Cpath fill='%2399CC33' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-shld-f-l-xx{background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='20' width='20'%3E%3Cpath fill='%2399CC33' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center}.an-icon-love-plus{background: url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 13 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.1951 0.972686C10.5916 0.347287 9.75866 -0.00412943 8.88952 3.87426e-05C8.01961 -0.000155102 7.18593 0.348652 6.57537 0.96832L6.07605 1.46763L5.57674 0.96832C4.96618 0.348627 4.13249 -0.000159742 3.26259 3.87426e-05C2.39645 -0.00422569 1.56587 0.343714 0.961409 0.963978C0.345983 1.576 0 2.40812 0 3.27602C0 4.14392 0.345983 4.97604 0.961409 5.58807L5.76771 10.3988C5.84921 10.4811 5.96018 10.5273 6.076 10.5273C6.19182 10.5273 6.30279 10.4811 6.3843 10.3988L7.29609 9.48268V9.48277C7.39174 9.37093 7.4244 9.21829 7.38263 9.07717C7.34096 8.93606 7.23057 8.82567 7.08947 8.78391C6.94826 8.74224 6.79562 8.7748 6.68387 8.87055L6.07601 9.47405L1.56918 4.97143C1.11785 4.52174 0.864208 3.91088 0.864208 3.27384C0.864208 2.63671 1.11785 2.02585 1.56918 1.57616C2.01509 1.12163 2.62566 0.86645 3.26249 0.868385C3.90214 0.868676 4.51513 1.12512 4.96445 1.58052L5.76769 2.38813V2.38803C5.8492 2.47032 5.96016 2.51654 6.07599 2.51654C6.19181 2.51654 6.30277 2.47032 6.38428 2.38803L7.18752 1.58043V1.58052C7.63682 1.12512 8.24981 0.868683 8.88948 0.868385C9.52778 0.867707 10.1389 1.12629 10.5828 1.58479C11.0336 2.03302 11.287 2.64244 11.287 3.27811C11.287 3.91378 11.0336 4.5233 10.5828 4.97143C10.4904 5.04954 10.4348 5.16255 10.4293 5.2834C10.4238 5.40425 10.4689 5.52181 10.5538 5.60797C10.6387 5.69413 10.7557 5.74094 10.8767 5.73716C10.9975 5.73328 11.1114 5.6793 11.1907 5.588C11.8067 4.97801 12.1532 4.14716 12.1532 3.28033C12.1532 2.41342 11.8067 1.58254 11.1907 0.972647L11.1951 0.972686Z' fill='%23D3145A'/%3E%3Cpath d='M10.6351 6.78185H9.54963V5.69639C9.54963 5.54122 9.46686 5.39789 9.33254 5.32036C9.19821 5.24282 9.03268 5.24282 8.89835 5.32036C8.76403 5.39789 8.68126 5.54123 8.68126 5.69639V6.78185H7.5958C7.44064 6.78185 7.2973 6.86461 7.21977 6.99894C7.14224 7.13327 7.14224 7.2988 7.21977 7.43312C7.2973 7.56745 7.44064 7.65022 7.5958 7.65022H8.68126V8.73568C8.68126 8.89084 8.76403 9.03417 8.89835 9.11171C9.03268 9.18924 9.19821 9.18924 9.33254 9.11171C9.46686 9.03417 9.54963 8.89083 9.54963 8.73568V7.65022H10.6351C10.7903 7.65022 10.9336 7.56745 11.0111 7.43312C11.0887 7.2988 11.0887 7.13326 11.0111 6.99894C10.9336 6.86461 10.7902 6.78185 10.6351 6.78185Z' fill='%23D3145A'/%3E%3C/svg%3E\") no-repeat center}";
  f.parentNode.insertBefore(a, f);
})(window.alakhNiranjan);
(function (a) {
  a.svg = function () {
    if (!document.getElementById("spriteSVG")) {
      var a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      a.setAttribute("width", "0");
      a.setAttribute("height", "0");
      a.setAttribute("style", "display: none");
      var c = "",
        d = {
          bck: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
          menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
          srch: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
          magnify:
            "M15.0279 14.5386L12.1228 11.6575C13.2061 10.4529 13.879 8.85778 13.879 7.11609C13.879 3.356 10.7934 0.295837 7.00201 0.295837C3.21063 0.295837 0.125 3.356 0.125 7.11609C0.125 10.8762 3.21063 13.9363 7.00201 13.9363C8.34793 13.9363 9.59526 13.5457 10.6457 12.8946L13.6657 15.8896C13.8462 16.0687 14.0924 16.1663 14.3386 16.1663C14.5848 16.1663 14.831 16.0687 15.0116 15.8896C15.4054 15.5153 15.4054 14.913 15.0279 14.5386ZM2.04528 7.11612C2.04528 4.41403 4.26109 2.20033 7.00199 2.20033C9.74288 2.20033 11.9423 4.41406 11.9423 7.11612C11.9423 9.81821 9.72647 12.0319 7.00199 12.0319C4.2775 12.0319 2.04528 9.8344 2.04528 7.11612Z",
          search_light:
            "M15.8543 16.1372L11.7656 12.0485C12.778 10.8746 13.3929 9.34846 13.3929 7.68033C13.3929 3.98739 10.3885 0.983887 6.69645 0.983887C3.0044 0.983887 0 3.98828 0 7.68033C0 11.3724 3.0044 14.3768 6.69645 14.3768C8.36457 14.3768 9.89072 13.7619 11.0646 12.7495L15.1533 16.8381C15.25 16.9349 15.3769 16.9837 15.5038 16.9837C15.6307 16.9837 15.7575 16.9349 15.8543 16.8381C16.0486 16.6447 16.0486 16.3306 15.8543 16.1372ZM6.69645 13.3848C3.55097 13.3848 0.992001 10.8258 0.992001 7.68033C0.992001 4.53486 3.55097 1.97589 6.69645 1.97589C9.84192 1.97589 12.4009 4.53486 12.4009 7.68033C12.4009 10.8258 9.84192 13.3848 6.69645 13.3848Z",
          cart: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
          cart_plus:
            "M9.5999 4.79993C9.5999 4.65849 9.54371 4.52283 9.44369 4.42281C9.34367 4.32279 9.20802 4.2666 9.06657 4.2666C8.92512 4.2666 8.78946 4.32279 8.68945 4.42281C8.58943 4.52283 8.53324 4.65849 8.53324 4.79993V6.39994H6.93324C6.79179 6.39994 6.65613 6.45613 6.55611 6.55614C6.45609 6.65616 6.3999 6.79182 6.3999 6.93327C6.3999 7.07472 6.45609 7.21037 6.55611 7.31039C6.65613 7.41041 6.79179 7.4666 6.93324 7.4666H8.53324V9.0666C8.53324 9.20805 8.58943 9.34371 8.68945 9.44373C8.78946 9.54375 8.92512 9.59994 9.06657 9.59994C9.20802 9.59994 9.34367 9.54375 9.44369 9.44373C9.54371 9.34371 9.5999 9.20805 9.5999 9.0666V7.4666H11.1999C11.3414 7.4666 11.477 7.41041 11.577 7.31039C11.677 7.21037 11.7332 7.07472 11.7332 6.93327C11.7332 6.79182 11.677 6.65616 11.577 6.55614C11.477 6.45613 11.3414 6.39994 11.1999 6.39994H9.5999V4.79993Z;M0.533333 0C0.391885 0 0.256229 0.0561903 0.15621 0.15621C0.0561903 0.256229 0 0.391885 0 0.533333C0 0.674782 0.0561903 0.810438 0.15621 0.910457C0.256229 1.01048 0.391885 1.06667 0.533333 1.06667H1.71733L2.14507 2.7808L3.74293 11.2981C3.76581 11.4204 3.83067 11.5307 3.9263 11.6102C4.02194 11.6897 4.14233 11.7332 4.26667 11.7333H5.33333C4.76754 11.7333 4.22492 11.9581 3.82484 12.3582C3.42476 12.7583 3.2 13.3009 3.2 13.8667C3.2 14.4325 3.42476 14.9751 3.82484 15.3752C4.22492 15.7752 4.76754 16 5.33333 16C5.89913 16 6.44175 15.7752 6.84183 15.3752C7.24191 14.9751 7.46667 14.4325 7.46667 13.8667C7.46667 13.3009 7.24191 12.7583 6.84183 12.3582C6.44175 11.9581 5.89913 11.7333 5.33333 11.7333H12.8C12.2342 11.7333 11.6916 11.9581 11.2915 12.3582C10.8914 12.7583 10.6667 13.3009 10.6667 13.8667C10.6667 14.4325 10.8914 14.9751 11.2915 15.3752C11.6916 15.7752 12.2342 16 12.8 16C13.3658 16 13.9084 15.7752 14.3085 15.3752C14.7086 14.9751 14.9333 14.4325 14.9333 13.8667C14.9333 13.3009 14.7086 12.7583 14.3085 12.3582C13.9084 11.9581 13.3658 11.7333 12.8 11.7333H13.8667C13.991 11.7332 14.1114 11.6897 14.207 11.6102C14.3027 11.5307 14.3675 11.4204 14.3904 11.2981L15.9904 2.7648C16.0048 2.68783 16.0021 2.60862 15.9824 2.53282C15.9628 2.45701 15.9267 2.38647 15.8767 2.32619C15.8267 2.26591 15.764 2.21739 15.6932 2.18405C15.6223 2.15072 15.545 2.13341 15.4667 2.13333H3.08267L2.65067 0.404267C2.62188 0.288836 2.55532 0.186345 2.46158 0.113093C2.36784 0.0398407 2.2523 3.28656e-05 2.13333 0H0.533333ZM4.70933 10.6667L3.3088 3.2H14.8245L13.424 10.6667H4.70933ZM6.4 13.8667C6.4 14.1496 6.28762 14.4209 6.08758 14.6209C5.88754 14.821 5.61623 14.9333 5.33333 14.9333C5.05044 14.9333 4.77913 14.821 4.57909 14.6209C4.37905 14.4209 4.26667 14.1496 4.26667 13.8667C4.26667 13.5838 4.37905 13.3125 4.57909 13.1124C4.77913 12.9124 5.05044 12.8 5.33333 12.8C5.61623 12.8 5.88754 12.9124 6.08758 13.1124C6.28762 13.3125 6.4 13.5838 6.4 13.8667ZM13.8667 13.8667C13.8667 14.1496 13.7543 14.4209 13.5542 14.6209C13.3542 14.821 13.0829 14.9333 12.8 14.9333C12.5171 14.9333 12.2458 14.821 12.0458 14.6209C11.8457 14.4209 11.7333 14.1496 11.7333 13.8667C11.7333 13.5838 11.8457 13.3125 12.0458 13.1124C12.2458 12.9124 12.5171 12.8 12.8 12.8C13.0829 12.8 13.3542 12.9124 13.5542 13.1124C13.7543 13.3125 13.8667 13.5838 13.8667 13.8667Z",
          cart_2:
            "M13.801 12.0184C13.801 11.676 14.0786 11.3984 14.421 11.3984C16.0068 11.3984 17.4375 12.3597 18.0012 13.828L18.0205 13.8783H30.51C31.7469 13.8783 32.6791 15.045 32.3256 16.2529L31.0383 20.654C30.4916 22.5234 28.7487 23.7979 26.7814 23.7979H23.0059C21.0388 23.7979 19.296 22.5234 18.749 20.654L17.0064 14.6966L16.8435 14.2722C16.4688 13.2963 15.5075 12.6382 14.4208 12.6382C14.0784 12.6382 13.8008 12.3606 13.8008 12.0183L13.801 12.0184ZM18.4218 15.1183L19.9392 20.3059C20.3267 21.6306 21.5724 22.5579 23.0058 22.5579H26.7813C28.2146 22.5579 29.4605 21.6305 29.8479 20.3059L31.1354 15.9048C31.2454 15.5286 30.9598 15.1182 30.5097 15.1182L18.4218 15.1183Z;M21.2408 25.6618C20.8984 25.6618 20.6208 25.9394 20.6208 26.2818C20.6208 26.6242 20.8984 26.9018 21.2408 26.9018C21.5832 26.9018 21.8608 26.6242 21.8608 26.2818C21.8608 25.9394 21.5832 25.6618 21.2408 25.6618ZM19.3809 26.2818C19.3809 25.2546 20.2135 24.4219 21.2408 24.4219C22.268 24.4219 23.1007 25.2546 23.1007 26.2818C23.1007 27.3091 22.268 28.1417 21.2408 28.1417C20.2135 28.1417 19.3809 27.3091 19.3809 26.2818Z;M28.6705 25.6696C28.3281 25.6696 28.0505 25.9472 28.0505 26.2896C28.0505 26.632 28.3281 26.9096 28.6705 26.9096C29.0128 26.9096 29.2905 26.632 29.2905 26.2896C29.2905 25.9472 29.0128 25.6696 28.6705 25.6696ZM26.8105 26.2896C26.8105 25.2624 27.6432 24.4297 28.6705 24.4297C29.6977 24.4297 30.5304 25.2624 30.5304 26.2896C30.5304 27.3169 29.6977 28.1495 28.6705 28.1495C27.6432 28.1495 26.8105 27.3169 26.8105 26.2896Z",
          clock:
            "M12.2437 4.87813L13.1 4.02187C13.225 3.89687 13.225 3.69688 13.1 3.57188L12.4281 2.9C12.3031 2.775 12.1031 2.775 11.9781 2.9L10.9219 3.95625C10.2687 3.61875 9.55312 3.3875 8.79687 3.29063V1.65H10.0625C10.2375 1.65 10.3812 1.50937 10.3812 1.33125V0.38125C10.3812 0.203125 10.2406 0.0625 10.0625 0.0625H5.93749C5.76249 0.0625 5.61874 0.203125 5.61874 0.38125V1.33438C5.61874 1.50937 5.75937 1.65313 5.93749 1.65313H7.20624V3.29688C4.07812 3.69062 1.64999 6.35938 1.64999 9.59062C1.64999 13.0875 4.49999 15.9375 7.99999 15.9375C11.5 15.9375 14.35 13.0875 14.35 9.5875C14.35 7.71875 13.5344 6.04063 12.2437 4.87813ZM7.99999 14.35C5.37499 14.35 3.23749 12.2125 3.23749 9.5875C3.23749 6.9625 5.37499 4.825 7.99999 4.825C10.625 4.825 12.7625 6.9625 12.7625 9.5875C12.7625 12.2125 10.625 14.35 7.99999 14.35Z;M11.0062 9.5875H8.15936C8.07186 9.5875 7.99999 9.51562 7.99999 9.42812V6.58125C7.99999 6.49062 7.92186 6.4125 7.83124 6.41875C5.91561 6.51875 4.44999 8.31875 4.91249 10.3375C5.17499 11.4844 6.10624 12.4156 7.25311 12.6781C9.27186 13.1375 11.0719 11.6719 11.1719 9.75625C11.175 9.66562 11.0969 9.5875 11.0062 9.5875Z",
          info_circle:
            "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
          vertical_dots:
            "M9.99967 13.333C10.4417 13.333 10.8656 13.5086 11.1782 13.8212C11.4907 14.1337 11.6663 14.5576 11.6663 14.9997C11.6663 15.4417 11.4907 15.8656 11.1782 16.1782C10.8656 16.4907 10.4417 16.6663 9.99967 16.6663C9.55765 16.6663 9.13372 16.4907 8.82116 16.1782C8.5086 15.8656 8.33301 15.4417 8.33301 14.9997C8.33301 14.5576 8.5086 14.1337 8.82116 13.8212C9.13372 13.5086 9.55765 13.333 9.99967 13.333ZM9.99967 8.33301C10.4417 8.33301 10.8656 8.5086 11.1782 8.82116C11.4907 9.13372 11.6663 9.55765 11.6663 9.99967C11.6663 10.4417 11.4907 10.8656 11.1782 11.1782C10.8656 11.4907 10.4417 11.6663 9.99967 11.6663C9.55765 11.6663 9.13372 11.4907 8.82116 11.1782C8.5086 10.8656 8.33301 10.4417 8.33301 9.99967C8.33301 9.55765 8.5086 9.13372 8.82116 8.82116C9.13372 8.5086 9.55765 8.33301 9.99967 8.33301ZM9.99967 3.33301C10.4417 3.33301 10.8656 3.5086 11.1782 3.82116C11.4907 4.13372 11.6663 4.55765 11.6663 4.99967C11.6663 5.4417 11.4907 5.86563 11.1782 6.17819C10.8656 6.49075 10.4417 6.66634 9.99967 6.66634C9.55765 6.66634 9.13372 6.49075 8.82116 6.17819C8.5086 5.86563 8.33301 5.4417 8.33301 4.99967C8.33301 4.55765 8.5086 4.13372 8.82116 3.82116C9.13372 3.5086 9.55765 3.33301 9.99967 3.33301Z",
          barcode:
            "M6.88602 12.9125C6.99012 12.8236 7.04995 12.7009 7.04995 12.5714C7.04995 12.4417 6.98994 12.3192 6.88608 12.2302C6.78259 12.1415 6.64346 12.0928 6.49992 12.0928H4.50001C3.84822 12.0921 3.22473 11.8699 2.76556 11.4765C2.30679 11.0833 2.05078 10.5521 2.04994 9.99988V9.14275C2.04994 8.87153 1.79623 8.66428 1.4999 8.66428C1.20371 8.66428 0.950011 8.87154 0.950011 9.14275L0.950011 9.99996L0.950011 10L6.49992 12.9999L6.49987 13.0499C6.64349 13.05 6.78245 13.0011 6.88602 12.9125ZM6.88602 12.9125L6.85354 12.8745L6.88605 12.9125C6.88604 12.9125 6.88603 12.9125 6.88602 12.9125ZM4.49989 0.950126L4.49994 0.950126L6.49991 0.950126C6.79608 0.950126 7.04995 1.15737 7.04995 1.4286C7.04995 1.69995 6.79609 1.9072 6.49991 1.9072L4.49999 1.9072M4.49989 0.950126L4.49999 1.9072M4.49989 0.950126C3.56109 0.951017 2.65969 1.27114 1.99368 1.84175L1.99366 1.84176C1.32755 2.41284 0.951035 3.18877 0.95 3.99998V4.00005V4.85725C0.95 5.12846 1.2037 5.33572 1.49989 5.33572C1.79622 5.33572 2.04993 5.12834 2.04993 4.85725V4.00012C2.05078 3.44799 2.30679 2.91687 2.76556 2.52351C3.22456 2.13009 3.84802 1.90794 4.49994 1.9072M4.49989 0.950126L4.49994 1.9072M4.49999 1.9072L4.49994 1.9072M4.49999 1.9072C4.49997 1.9072 4.49996 1.9072 4.49994 1.9072M9.99921 10.4784H10.0492L10.0492 10.4284L10.0491 3.57164L10.0491 3.52164H9.99906H8.99913H8.94913V3.57164V10.4284V10.4784H8.99913H9.99921ZM18.0492 3.57132L18.0492 3.52131L17.9992 3.52132L16.9992 3.52144L16.9492 3.52145V3.57144V10.4285V10.4785H16.9992H17.9991H18.0491L18.0491 10.4286L18.0492 3.57132ZM8.0492 3.57144V3.52144H7.9992H5.99923H5.94923V3.57144V10.4285V10.4786L5.99923 10.4785L7.9992 10.4784L8.0492 10.4784V10.4284V3.57144ZM14.0492 3.57144V3.52144H13.9992H10.9992H10.9492V3.57144V10.4285V10.4785H10.9992H13.9992H14.0492V10.4285V3.57144ZM5.04956 3.57144V3.52144H4.99956H3.99963H3.94963V3.57144V10.4285V10.4786L3.99964 10.4785L4.99957 10.4784L5.04956 10.4784V10.4284V3.57144ZM16.0496 3.57145L16.0496 3.52144H15.9996H14.9995H14.9495V3.57144V10.4285V10.4785H14.9995H15.9995H16.0495L16.0495 10.4286L16.0496 3.57145ZM20.0062 12.1584C20.6589 11.5988 21.0335 10.8425 21.0493 10.0491L21.05 10.0491V10.0001V9.143V9.1201L21.0492 9.11942C21.0351 8.85981 20.7876 8.66441 20.5 8.66441C20.2036 8.66441 19.9499 8.87166 19.9499 9.14288V10C19.9491 10.5521 19.6931 11.0833 19.2343 11.4766C18.7753 11.87 18.1518 12.0922 17.4999 12.0929H15.4999C15.2038 12.0929 14.9499 12.3002 14.9499 12.5715C14.9499 12.8428 15.2038 13.05 15.4999 13.05H17.4999H17.5C18.4388 13.0491 19.3402 12.729 20.0062 12.1584L20.0062 12.1584ZM20.5 5.3356C20.7589 5.3356 20.9853 5.17723 21.0382 4.95622L21.05 4.96638V4.85725V4.00005V3.97711L21.0497 3.97688C21.0417 3.174 20.6659 2.40732 20.0062 1.84164L20.0062 1.84163C19.3402 1.27089 18.4388 0.95088 17.5 0.95H17.4999H15.4999C15.2038 0.95 14.9499 1.15724 14.9499 1.42847C14.9499 1.69982 15.2038 1.90707 15.4999 1.90707H17.4999C18.1516 1.90782 18.7751 2.12996 19.2343 2.5234C19.6931 2.91662 19.9491 3.44773 19.9499 4V4.85712C19.9499 5.12834 20.2036 5.3356 20.5 5.3356Z",
          lr_white_logo:
            "M18.5886 2.11257C18.5886 0.928045 17.6628 0 16.4808 0C15.2903 0 14.3924 0.908291 14.3924 2.11257C14.3924 3.3057 15.2903 4.20546 16.4808 4.20546C17.6628 4.20546 18.5886 3.28619 18.5886 2.11257ZM92.6092 13.8615C92.1915 13.8615 91.9181 13.5729 92.066 12.9605L92.1124 12.7681L92.1172 12.7484C92.485 11.2248 94.4578 3.05279 94.6871 2.06612C94.9317 1.01357 94.2907 0.226097 93.2778 0.226097H90.4316V0.616266C90.9519 0.987173 91.0457 1.64775 90.863 2.38719C90.6803 3.12663 89.8009 6.8134 89.8009 6.8134C89.4388 5.86797 88.4743 5.05427 87.3548 5.05427C83.9057 5.05427 81.5889 8.75473 81.5889 11.5713C81.5889 13.9164 82.9755 15.3065 85.0393 15.3065C86.8279 15.3065 87.8715 14.0943 88.5806 12.8159C88.2741 14.3028 88.7203 15.3065 90.4464 15.3065C91.331 15.3065 92.4876 14.952 93.6978 14.2237V13.7578C93.613 13.7669 93.5191 13.7786 93.4206 13.7909C93.1543 13.8241 92.8543 13.8615 92.6092 13.8615ZM78.1689 15.3059C79.0548 15.3059 80.3666 14.8683 81.4171 14.2232L81.4159 13.7579C81.0345 13.8016 80.5058 13.8609 80.3225 13.8609C79.7479 13.8609 79.6644 13.3694 79.7788 12.9523C79.8931 12.5352 81.7071 5.09191 81.7071 5.09191H79.5985C78.9313 5.09191 78.3521 5.55339 78.1901 6.21414L77.941 7.12989C77.7091 5.89987 76.8496 5.05371 75.4112 5.05371C71.9038 5.05371 69.5479 8.72925 69.5479 11.5708C69.5479 13.9159 71.0442 15.3061 72.9206 15.3061C74.5047 15.3061 75.7664 13.9842 76.423 12.7828C75.8148 14.5928 76.8504 15.3059 78.1689 15.3059ZM73.373 11.7284C73.373 9.44088 74.7758 6.3042 76.2659 6.3042C76.9349 6.3042 77.1546 7.28184 77.1546 7.97307C77.1546 8.41636 77.0444 9.07342 76.9436 9.46776L76.6736 10.5707C76.327 11.9861 75.4603 13.6754 74.359 13.6754C73.5011 13.6754 73.373 12.3864 73.373 11.7284ZM88.3502 6.304C86.672 6.304 85.4543 9.61863 85.4543 11.7282C85.4543 12.532 85.632 13.6752 86.4793 13.6752C87.3417 13.6752 88.5134 12.4079 88.9101 10.5727L89.2025 9.21969C89.2905 8.85969 89.3334 8.50395 89.3334 8.13198C89.3334 7.74656 89.2653 6.304 88.3502 6.304ZM35.902 13.7589C35.902 13.7589 35.1984 13.8573 34.8449 13.8573C34.1511 13.8573 34.1889 13.2252 34.2972 12.7768L35.3846 8.27487C35.4653 7.92494 35.5063 7.58978 35.5063 7.27871C35.5063 5.85172 34.6806 5.05392 33.2485 5.05392C31.693 5.05392 30.3382 6.03976 29.3592 7.62223C29.4868 6.12123 28.732 5.05392 27.3505 5.05392C25.8457 5.05392 24.7719 5.89287 23.8056 7.35494L23.8775 7.09116C24.0948 6.32722 23.7163 5.2513 22.4684 5.2513H19.6052V5.64205C20.1748 5.99943 20.2635 6.57837 20.064 7.39871L18.1896 15.1071H21.93L22.957 10.8734C23.6123 8.17921 24.6527 7.2192 25.4077 7.2192C25.7575 7.2192 25.9035 7.5806 25.7903 8.04609L24.6509 12.7318C24.4678 13.4858 24.5577 14.1281 24.9109 14.589C25.2702 15.0578 25.8833 15.3056 26.6839 15.3056C27.5922 15.3056 28.9868 14.7654 29.6701 14.0736L29.5397 13.6306C29.282 13.7608 28.9251 13.864 28.633 13.864C28.3634 13.864 28.1911 13.6581 28.2844 13.2632L28.8498 10.8701C29.5053 8.17593 30.5454 7.21592 31.3004 7.21592C31.708 7.21592 31.7865 7.67912 31.6967 8.04609L30.6182 12.4552C30.522 12.8725 30.4771 13.1953 30.4771 13.4713C30.4771 14.3081 30.8563 15.3056 32.6627 15.3056C33.5471 15.3056 34.6922 14.9595 35.902 14.2227V13.7589ZM17.6214 13.7812C17.6955 13.7723 17.7645 13.764 17.8239 13.7571V14.2224C16.6454 14.9308 15.4771 15.3053 14.6094 15.3053C12.8028 15.3053 12.4237 14.3078 12.4237 13.471C12.4237 13.1956 12.4685 12.8727 12.565 12.4549L13.7857 7.39901C13.9624 6.6672 13.8696 6.10949 13.3187 5.6417V5.25169H16.1884C17.3295 5.25169 17.8331 6.16014 17.5972 7.09303C17.3685 7.99716 16.3637 12.206 16.2059 12.8673L16.2051 12.8703L16.2051 12.8704L16.1934 12.9194C16.0878 13.3617 16.2022 13.8614 16.7957 13.8614C16.9572 13.8614 17.3283 13.8166 17.6214 13.7813L17.6214 13.7812ZM51.8983 8.15285C54.2053 8.15285 55.9498 6.6748 55.9498 4.27887C55.9498 2.97008 55.0194 2.09277 53.4489 2.09277H52.0115C52.2149 2.38991 52.2302 2.80237 52.067 3.51738C52.0088 3.77148 51.1519 7.26194 50.9326 8.15293L51.8983 8.15285ZM63.4313 16.7684L63.1732 16.224L63.0186 16.2812C62.3018 16.5472 61.3752 16.7858 60.6298 16.7858C58.1629 16.7858 56.6766 12.86 56.1647 11.5078L56.1432 11.451C55.7154 10.3222 55.0158 9.22776 54.1822 8.9121C56.9549 8.58947 59.8178 6.77649 59.8178 4.51655C59.8178 2.09225 57.8769 1.19306 54.9863 1.19306H47.7577L47.758 1.58462C48.3746 2.25086 48.2391 3.10473 48.0385 3.90793C48.0385 3.90793 47.9314 4.32859 47.5748 5.78861C47.2302 7.20031 46.833 8.76249 46.4694 10.1927C46.209 11.2168 45.9658 12.1733 45.7714 12.9584C45.5572 13.8231 45.2231 14.3913 44.6672 14.7163V15.0966H48.043C48.7106 15.0966 49.2897 14.6348 49.4515 13.9736L50.6431 9.13636H50.7004C50.8284 9.13636 50.9528 9.2148 51.031 9.40645L52.4001 12.7953C54.0996 16.6237 56.0907 18.0001 59.2725 18.0001C60.7698 18.0001 62.1128 17.6127 63.2939 16.8563L63.4313 16.7684ZM61.7713 12.8801C61.7713 13.8782 62.1317 14.4298 62.6211 14.4298C64.0705 14.4298 65.3195 9.70461 65.3195 7.47581C65.3195 6.70318 65.1114 5.92604 64.4696 5.92604C63.0203 5.92604 61.7713 10.6513 61.7713 12.8801ZM58.0225 11.2132C58.0225 13.772 59.9095 15.3061 62.7182 15.3061C66.2963 15.3061 69.0677 12.097 69.0677 9.14688C69.0677 7.14423 67.3315 5.05371 64.372 5.05371C60.6199 5.05371 58.0225 8.36359 58.0225 11.2132ZM42.2341 5.92604C41.0941 5.92604 40.1763 7.85885 39.886 9.97314C42.2245 9.55256 42.7687 8.10361 42.7687 6.8599C42.7687 6.36039 42.6198 5.92604 42.2341 5.92604ZM40.1482 15.306C41.7923 15.306 43.7815 14.5704 44.8662 12.8646L44.3937 12.4535C43.7147 13.1582 42.9809 13.657 42.0163 13.657C40.6788 13.657 39.8863 12.3092 39.8732 10.6707C42.7687 10.5669 45.8752 9.92976 45.8752 7.47776C45.8752 6.17897 44.5254 5.05371 42.3469 5.05371C38.8672 5.05371 36.0361 7.96449 36.0361 11.3522C36.0361 13.8069 38.0659 15.306 40.1482 15.306ZM11.6917 11.7301L11.3794 11.7235L11.3331 11.7548C8.58642 13.6135 5.57462 13.8748 4.60258 13.9076C4.76177 13.6334 4.98284 13.1764 5.14539 12.5393C5.22314 12.2348 5.53025 10.9687 5.89744 9.45477C6.1657 8.34879 6.46602 7.1106 6.73241 6.01857L7.41369 3.2223C7.65732 2.23827 8.50999 1.58564 8.50999 1.58564V1.19539H5.1059C4.43834 1.19539 3.85933 1.65704 3.69733 2.31844L1.09638 12.9351C0.916567 13.6642 0.645081 14.1161 0.0590816 14.6622L0 14.7173V15.1075H9.848C10.4663 15.1075 10.998 14.6784 11.1409 14.0639L11.6917 11.7301Z",
          upload:
            "M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z;M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z",
          image:
            "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
          love: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
          siml: "M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z",
          shld: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
          cros: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
          chvR: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
          chvL: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
          chvU: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
          chvD: "M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z",
          dwnLd: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
          cmt: "M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
          fltr: "M400.858,11.427c-3.241-7.421-8.85-11.132-16.854-11.136H18.564c-7.993,0-13.61,3.715-16.846,11.136   c-3.234,7.801-1.903,14.467,3.999,19.985l140.757,140.753v138.755c0,4.955,1.809,9.232,5.424,12.854l73.085,73.083   c3.429,3.614,7.71,5.428,12.851,5.428c2.282,0,4.66-0.479,7.135-1.43c7.426-3.238,11.14-8.851,11.14-16.845V172.166L396.861,31.413   C402.765,25.895,404.093,19.231,400.858,11.427z",
          srt: "M405.943,290.254L302.096,425.338c-1.04,1.354-2.66,2.146-4.374,2.146c-1.702,0-3.321-0.798-4.368-2.146L189.511,290.254   c-0.769-0.993-1.144-2.176-1.144-3.357c0-1.152,0.364-2.329,1.108-3.322c1.499-1.975,4.125-2.707,6.434-1.809l68.76,27.166V21.01   c0-3.047,2.477-5.503,5.515-5.503h55.106c3.038,0,5.509,2.456,5.509,5.503v287.922l68.76-27.166   c2.305-0.898,4.93-0.166,6.419,1.809C407.473,285.561,407.461,288.28,405.943,290.254z M238.012,143.913   c0.744-0.993,1.105-2.167,1.105-3.322c0-1.176-0.379-2.367-1.142-3.36L134.125,2.148C133.081,0.792,131.458,0,129.759,0   c-1.714,0-3.328,0.798-4.377,2.148L21.539,137.23c-1.519,1.969-1.525,4.69-0.03,6.683c1.487,1.968,4.114,2.707,6.419,1.803   l68.766-27.163v287.919c0,3.05,2.462,5.509,5.506,5.509h55.109c3.041,0,5.515-2.459,5.515-5.509V118.552l68.763,27.163   C233.886,146.62,236.51,145.88,238.012,143.913z",
          vsrh: "M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z",
          crte: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
          asis: "M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11l-4.12 1.88z",
          user: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
          vol: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
          volm: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
          succ: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
          err: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
          shre: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
          hapy: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
          sad: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z",
          loc: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
          star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
          hstar:
            "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
          estar:
            "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
          twit: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z",
          fb: "M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0",
          pint: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
          brush:
            "M3,17.25V21h3.75L17.81,9.94l-3.75-3.75L3,17.25z M21.41,6.34l-3.75-3.75l-2.53,2.54l3.75,3.75L21.41,6.34z",
          call: "M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z",
          edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
          bin: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
          tick: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
          btck: "M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
          vdo: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
          play: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
          walet:
            "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
          locMr:
            "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          chk: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
          hot: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
          plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
          a2hs: "M18 1.01L8 1c-1.1 0-2 .9-2 2v3h2V5h10v14H8v-1H6v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM10 15h2V8H5v2h3.59L3 15.59 4.41 17 10 11.41z",
          notif:
            "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
          home: "M18.5882 22.6809C19.4 22.6809 19.9412 22.1397 19.9412 21.3279V9.15147C19.9412 8.74559 19.8059 8.33971 19.4 8.06912L11.2824 1.30441C10.7412 0.898529 10.0647 0.898529 9.52353 1.30441L1.40588 8.06912C1.13529 8.33971 1 8.74559 1 9.15147V21.3279C1 22.1397 1.54118 22.6809 2.35294 22.6809H8.76471V17.6221C8.76471 16.6799 9.52846 15.9162 10.4706 15.9162V15.9162C11.4127 15.9162 12.1765 16.6799 12.1765 17.6221V22.6809H18.5882Z",
          shop: "M4.00001 12V21H20V12M10 21V16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16V21M4.00001 1L1.00001 6C0.996898 7.3884 1.94933 8.59653 3.3001 8.9176C4.65088 9.23867 6.04506 8.58831 6.66701 7.347C7.16977 8.35974 8.20284 9.00025 9.33351 9.00025C10.4642 9.00025 11.4972 8.35974 12 7.347C12.5028 8.35974 13.5358 9.00025 14.6665 9.00025C15.7972 9.00025 16.8302 8.35974 17.333 7.347C17.955 8.58831 19.3491 9.23867 20.6999 8.9176C22.0507 8.59653 23.0031 7.3884 23 6L20 1H4.00001Z",
          catg: "M1.00001 4.68882L0.970426 4.66399L0.93829 4.64256C0.774087 4.5331 0.7 4.37612 0.7 4.125V1.375C0.7 1.12157 0.78142 0.964779 0.8731 0.8731C0.964779 0.78142 1.12157 0.7 1.375 0.7H20.625C20.8784 0.7 21.0352 0.78142 21.1269 0.8731C21.2186 0.964779 21.3 1.12157 21.3 1.375V4.125C21.3 4.37612 21.2259 4.5331 21.0617 4.64256L21.0296 4.66399L21 4.68882L13.3 11.1513L13.05 11.3611V11.6875V17.875C13.05 17.9996 13.0301 18.0721 13.0072 18.1235C12.983 18.178 12.9387 18.2463 12.8425 18.3425L10.0925 21.0925C9.99635 21.1887 9.92799 21.233 9.87352 21.2572C9.82208 21.2801 9.74957 21.3 9.625 21.3C9.58998 21.3 9.56164 21.2999 9.53218 21.2986C9.51982 21.298 9.50874 21.2973 9.49887 21.2964L9.43288 21.2304L9.24478 21.1834C9.1706 21.1649 9.10745 21.121 9.05241 21.0316C8.99228 20.9339 8.95 20.7898 8.95 20.625V11.6875V11.3611L8.70001 11.1513L1.00001 4.68882Z",
          acnt: "M10.0625 12.2375C7.2866 12.2375 5.0125 9.9634 5.0125 7.1875V5.75C5.0125 2.9741 7.2866 0.7 10.0625 0.7C12.8384 0.7 15.1125 2.9741 15.1125 5.75V7.1875C15.1125 9.9634 12.8384 12.2375 10.0625 12.2375ZM19.3893 22.3H0.735658C1.07431 19.0027 3.78597 16.5125 7.1875 16.5125H12.9375C16.339 16.5125 19.0507 19.0027 19.3893 22.3Z",
          lmrd: "M21.119 2.75369C21.119 1.58561 20.2637 0.802674 18.8198 0.802674H17.4983C17.6853 1.06768 17.6995 1.43578 17.5492 2.07394C17.4958 2.30068 16.7081 5.41587 16.5065 6.21112H17.3942C19.5153 6.21112 21.119 4.8919 21.119 2.75369ZM28 13.9008L27.8738 13.9793C26.7878 14.6542 25.5531 15 24.1764 15C21.2513 15 19.4208 13.7716 17.8584 10.3547L16.5998 7.33026C16.5279 7.15922 16.4135 7.08908 16.2957 7.08908H16.2431L15.1475 11.4063C14.9988 11.9964 14.4663 12.4087 13.8526 12.4087H10.7489V12.0693C11.2603 11.7791 11.5673 11.2721 11.7642 10.5004C12.1924 8.8215 12.8786 6.26373 13.4221 4.10154C13.75 2.79831 13.8486 2.42303 13.8486 2.42303C14.033 1.706 14.1577 0.944107 13.5906 0.349503L13.5903 0H20.236C22.8935 0 24.6781 0.802674 24.6781 2.966C24.6781 4.98309 22.0458 6.60116 19.4968 6.88908V6.91494C20.2632 7.17089 20.9064 8.14778 21.2994 9.15494C21.7508 10.3107 23.1238 13.9161 25.4244 13.9161C26.1097 13.9161 26.9616 13.7031 27.6207 13.4659L27.7626 13.4147L28 13.9008ZM9.05406 12.4175H0V12.0693L0.0544722 12.0199C0.593105 11.5327 0.842673 11.1292 1.00798 10.4786L3.39933 1.00349C3.54826 0.413042 4.08056 0.00106034 4.69431 0.00106034H4.69596H7.82399V0.349503C7.82399 0.349503 7.03999 0.931953 6.81593 1.81024L6.1895 4.30586C5.60948 6.61446 4.85427 9.65509 4.73044 10.1254C4.58117 10.694 4.37801 11.102 4.23171 11.3465C5.12524 11.3173 7.89402 11.0839 10.4194 9.42524L10.4619 9.39711L10.7489 9.40314L10.2425 11.486C10.111 12.0344 9.62232 12.4175 9.05406 12.4175Z",
          truck:
            "M12.7192 4.83349L11.3526 1.64457C11.3177 1.56223 11.2593 1.49197 11.1848 1.44256C11.1103 1.39314 11.0229 1.36675 10.9334 1.36668H9.56676V0.45556C9.56676 0.334738 9.51877 0.218865 9.43333 0.133431C9.3479 0.0479965 9.23203 0 9.1112 0H0.45556C0.334738 0 0.218865 0.0479965 0.13343 0.133431C0.0479964 0.218865 0 0.334738 0 0.45556V8.20008C0 8.3209 0.0479964 8.43678 0.13343 8.52221C0.218865 8.60765 0.334738 8.65564 0.45556 8.65564H1.43046C1.53537 9.04167 1.76439 9.38245 2.08218 9.62541C2.39998 9.86837 2.78889 10 3.18892 10C3.58895 10 3.97786 9.86837 4.29566 9.62541C4.61346 9.38245 4.84248 9.04167 4.94738 8.65564H7.8083C7.91321 9.04167 8.14223 9.38245 8.46002 9.62541C8.77782 9.86837 9.16673 10 9.56676 10C9.96679 10 10.3557 9.86837 10.6735 9.62541C10.9913 9.38245 11.2203 9.04167 11.3252 8.65564H12.3001C12.4209 8.65564 12.5368 8.60765 12.6223 8.52221C12.7077 8.43678 12.7557 8.3209 12.7557 8.20008V5.01116C12.7556 4.95009 12.7432 4.88967 12.7192 4.83349ZM9.56676 2.2778H10.6328L11.6077 4.5556H9.56676V2.2778ZM3.18892 9.1112C3.00872 9.1112 2.83256 9.05777 2.68273 8.95765C2.5329 8.85754 2.41612 8.71524 2.34716 8.54875C2.2782 8.38227 2.26015 8.19907 2.29531 8.02233C2.33046 7.84559 2.41724 7.68325 2.54466 7.55582C2.67208 7.4284 2.83443 7.34162 3.01117 7.30647C3.18791 7.27131 3.37111 7.28936 3.53759 7.35832C3.70408 7.42728 3.84637 7.54406 3.94649 7.69389C4.04661 7.84372 4.10004 8.01988 4.10004 8.20008C4.10004 8.44173 4.00405 8.67347 3.83318 8.84434C3.66231 9.01521 3.43057 9.1112 3.18892 9.1112ZM7.8083 7.74452H4.94738C4.84248 7.35849 4.61346 7.01771 4.29566 6.77476C3.97786 6.5318 3.58895 6.40016 3.18892 6.40016C2.78889 6.40016 2.39998 6.5318 2.08218 6.77476C1.76439 7.01771 1.53537 7.35849 1.43046 7.74452H0.91112V0.91112H8.65564V6.63296C8.4482 6.75335 8.26657 6.91352 8.12116 7.10427C7.97575 7.29502 7.86944 7.51259 7.8083 7.74452ZM9.56676 9.1112C9.38656 9.1112 9.21041 9.05777 9.06057 8.95765C8.91074 8.85754 8.79396 8.71524 8.725 8.54875C8.65604 8.38227 8.63799 8.19907 8.67315 8.02233C8.70831 7.84559 8.79508 7.68325 8.9225 7.55582C9.04993 7.4284 9.21227 7.34162 9.38901 7.30647C9.56575 7.27131 9.74895 7.28936 9.91543 7.35832C10.0819 7.42728 10.2242 7.54406 10.3243 7.69389C10.4244 7.84372 10.4779 8.01988 10.4779 8.20008C10.4779 8.44173 10.3819 8.67347 10.211 8.84434C10.0402 9.01521 9.80841 9.1112 9.56676 9.1112ZM11.8446 7.74452H11.3252C11.2245 7.35435 10.9973 7.00857 10.6791 6.76128C10.3609 6.51399 9.96973 6.37915 9.56676 6.37784V5.46672H11.8446V7.74452Z",
          curly:
            "M12.1263 1.52029C9.79452 -0.00987297 6.7769 -0.0098471 4.44517 1.52035L-1.08216 5.14767C-5.2947 7.91214 -5.2947 14.0879 -1.08216 16.8523L4.44517 20.4797C6.7769 22.0098 9.79452 22.0099 12.1263 20.4797L13.5881 19.5204C15.9199 17.9903 18.9375 17.9903 21.2692 19.5205L22.7309 20.4797C25.0626 22.0099 28.0802 22.0099 30.412 20.4797L31.8738 19.5204C34.2056 17.9903 37.2232 17.9903 39.5549 19.5205L41.0166 20.4797C43.3483 22.0099 46.3659 22.0099 48.6977 20.4797L50.1595 19.5204C52.4913 17.9903 55.5089 17.9903 57.8406 19.5205L59.3023 20.4797C61.634 22.0099 64.6516 22.0099 66.9834 20.4797L68.4452 19.5204C70.777 17.9903 73.7946 17.9903 76.1263 19.5205L77.588 20.4797C79.9197 22.0099 82.9373 22.0099 85.2691 20.4797L86.7309 19.5204C89.0627 17.9903 92.0803 17.9903 94.412 19.5205L95.8737 20.4797C98.2054 22.0099 101.223 22.0099 103.555 20.4797L105.017 19.5204C107.348 17.9903 110.366 17.9903 112.698 19.5205L114.159 20.4797C116.491 22.0099 119.509 22.0099 121.84 20.4797L123.302 19.5204C125.634 17.9903 128.652 17.9903 130.983 19.5205L132.445 20.4797C134.777 22.0099 137.794 22.0099 140.126 20.4797L141.588 19.5204C143.92 17.9903 146.937 17.9903 149.269 19.5205L150.731 20.4797C153.063 22.0099 156.08 22.0099 158.412 20.4797L159.874 19.5204C162.205 17.9903 165.223 17.9903 167.555 19.5205L169.017 20.4797C171.348 22.0099 174.366 22.0099 176.698 20.4797L178.159 19.5204C180.491 17.9903 183.509 17.9903 185.841 19.5205L187.302 20.4797C189.634 22.0099 192.652 22.0099 194.983 20.4797L196.445 19.5204C198.777 17.9903 201.794 17.9903 204.126 19.5205L205.588 20.4797C207.92 22.0099 210.937 22.0099 213.269 20.4797L214.731 19.5204C217.063 17.9903 220.08 17.9903 222.412 19.5205L223.874 20.4797C226.205 22.0099 229.223 22.0099 231.555 20.4797L233.017 19.5204C235.348 17.9903 238.366 17.9903 240.698 19.5205L242.159 20.4797C244.491 22.0099 247.509 22.0099 249.84 20.4797L251.302 19.5204C253.634 17.9903 256.652 17.9903 258.983 19.5205L260.445 20.4797C262.777 22.0099 265.794 22.0099 268.126 20.4797L269.588 19.5204C271.92 17.9903 274.937 17.9903 277.269 19.5205L278.731 20.4797C281.062 22.0099 284.08 22.0099 286.412 20.4797L287.874 19.5204C290.205 17.9903 293.223 17.9903 295.555 19.5205L297.016 20.4797C299.348 22.0099 302.366 22.0099 304.698 20.4797L306.159 19.5204C308.491 17.9903 311.509 17.9903 313.84 19.5205L315.302 20.4797C317.634 22.0099 320.651 22.0099 322.983 20.4797L324.445 19.5204C326.777 17.9903 329.794 17.9903 332.126 19.5205L333.588 20.4797C335.92 22.0099 338.937 22.0099 341.269 20.4797L342.731 19.5204C345.063 17.9903 348.08 17.9903 350.412 19.5205L351.874 20.4797C354.205 22.0098 357.223 22.0098 359.555 20.4797L365.082 16.8524C369.295 14.0879 369.295 7.91212 365.082 5.14764L359.555 1.52034C357.223 -0.00985032 354.205 -0.00985038 351.874 1.52034L350.412 2.47955C348.08 4.00973 345.063 4.00974 342.731 2.47959L341.269 1.52027C338.937 -0.00988001 335.92 -0.00986439 333.588 1.52031L332.126 2.47955C329.794 4.00973 326.777 4.00974 324.445 2.47959L322.983 1.52027C320.651 -0.00988001 317.634 -0.00986439 315.302 1.52031L313.84 2.47955C311.509 4.00973 308.491 4.00974 306.159 2.47959L304.698 1.52027C302.366 -0.00988001 299.348 -0.00986439 297.016 1.52031L295.555 2.47955C293.223 4.00973 290.205 4.00974 287.874 2.47959L286.412 1.52027C284.08 -0.00988001 281.062 -0.00986439 278.731 1.52031L277.269 2.47955C274.937 4.00973 271.92 4.00974 269.588 2.47959L268.126 1.52027C265.794 -0.00988001 262.777 -0.00986439 260.445 1.52031L258.983 2.47955C256.652 4.00973 253.634 4.00974 251.302 2.47959L249.84 1.52027C247.509 -0.00988001 244.491 -0.00986439 242.159 1.52031L240.698 2.47955C238.366 4.00973 235.348 4.00974 233.017 2.47959L231.555 1.52027C229.223 -0.00988001 226.205 -0.00986439 223.874 1.52031L222.412 2.47955C220.08 4.00973 217.063 4.00974 214.731 2.47959L213.269 1.52027C210.937 -0.00988001 207.92 -0.00986439 205.588 1.52031L204.126 2.47955C201.794 4.00973 198.777 4.00974 196.445 2.47959L194.983 1.52027C192.652 -0.00988001 189.634 -0.00986439 187.302 1.52031L185.841 2.47955C183.509 4.00973 180.491 4.00974 178.159 2.47959L176.698 1.52027C174.366 -0.00988001 171.348 -0.00986439 169.017 1.52031L167.555 2.47955C165.223 4.00973 162.205 4.00974 159.874 2.47959L158.412 1.52027C156.08 -0.00988001 153.063 -0.00986439 150.731 1.52031L149.269 2.47955C146.937 4.00973 143.92 4.00974 141.588 2.47959L140.126 1.52027C137.794 -0.00988001 134.777 -0.00986439 132.445 1.52031L130.983 2.47955C128.652 4.00973 125.634 4.00974 123.302 2.47959L121.84 1.52027C119.509 -0.00988001 116.491 -0.00986439 114.159 1.52031L112.698 2.47955C110.366 4.00973 107.348 4.00974 105.017 2.47959L103.555 1.52027C101.223 -0.00988001 98.2054 -0.00986439 95.8737 1.52031L94.412 2.47955C92.0803 4.00973 89.0627 4.00974 86.7309 2.47959L85.2691 1.52027C82.9373 -0.00988001 79.9197 -0.00986439 77.588 1.52031L76.1263 2.47955C73.7946 4.00973 70.777 4.00974 68.4452 2.47959L66.9834 1.52027C64.6516 -0.00988001 61.634 -0.00986439 59.3023 1.52031L57.8406 2.47955C55.5089 4.00973 52.4913 4.00974 50.1595 2.47959L48.6977 1.52027C46.3659 -0.00988001 43.3483 -0.00986439 41.0166 1.52031L39.5549 2.47955C37.2232 4.00973 34.2056 4.00974 31.8738 2.47959L30.412 1.52027C28.0802 -0.00988001 25.0626 -0.00986439 22.7309 1.52031L21.2692 2.47955C18.9375 4.00973 15.9199 4.00974 13.5881 2.47959L12.1263 1.52029Z",
          copy: "M8.80278 16H2.59861C1.16569 16 0 14.8785 0 13.5V5.03125C0 3.65271 1.16569 2.53125 2.59861 2.53125H8.80278C10.2357 2.53125 11.4014 3.65271 11.4014 5.03125V13.5C11.4014 14.8785 10.2357 16 8.80278 16ZM2.59861 3.78125C1.88221 3.78125 1.2993 4.34204 1.2993 5.03125V13.5C1.2993 14.1892 1.88221 14.75 2.59861 14.75H8.80278C9.51918 14.75 10.1021 14.1892 10.1021 13.5V5.03125C10.1021 4.34204 9.51918 3.78125 8.80278 3.78125H2.59861ZM14 11.9375V2.5C14 1.12146 12.8343 0 11.4014 0H4.19026C3.83142 0 3.5406 0.279785 3.5406 0.625C3.5406 0.970215 3.83142 1.25 4.19026 1.25H11.4014C12.1178 1.25 12.7007 1.81079 12.7007 2.5V11.9375C12.7007 12.2827 12.9915 12.5625 13.3503 12.5625C13.7092 12.5625 14 12.2827 14 11.9375Z",
          lock: "M10.0001 4.83342H9.33341V3.50008C9.33341 1.66008 7.84008 0.166748 6.00008 0.166748C4.16008 0.166748 2.66675 1.66008 2.66675 3.50008V4.83342H2.00008C1.26675 4.83342 0.666748 5.43341 0.666748 6.16675V12.8334C0.666748 13.5667 1.26675 14.1667 2.00008 14.1667H10.0001C10.7334 14.1667 11.3334 13.5667 11.3334 12.8334V6.16675C11.3334 5.43341 10.7334 4.83342 10.0001 4.83342ZM4.00008 3.50008C4.00008 2.39341 4.89341 1.50008 6.00008 1.50008C7.10675 1.50008 8.00008 2.39341 8.00008 3.50008V4.83342H4.00008V3.50008ZM10.0001 12.8334H2.00008V6.16675H10.0001V12.8334ZM6.00008 10.8334C6.73341 10.8334 7.33341 10.2334 7.33341 9.50008C7.33341 8.76675 6.73341 8.16675 6.00008 8.16675C5.26675 8.16675 4.66675 8.76675 4.66675 9.50008C4.66675 10.2334 5.26675 10.8334 6.00008 10.8334Z",
        },
        b = { fltr: "402", srt: "428", wmen: "230", men: "196" },
        e = {
          home: ["21", "24"],
          shop: ["24", "22"],
          catg: ["22", "22"],
          acnt: ["21", "23"],
          lmrd: ["28", "15"],
          lock: ["12", "15"],
          cart_plus: ["16", "16"],
          cart_2: ["47", "47"],
          info_circle: ["512", "512"],
          vertical_dots: ["20", "20"],
          magnify: ["16", "17"],
          barcode: ["22", "14"],
          lr_white_logo: ["95", "18"],
          search_light: ["16", "17"],
          truck: ["13", "10"],
          clock: ["16", "16"],
          curly: ["360", "22"],
          copy: ["14", "16"],
        },
        h;
      for (h in d)
        if (d.hasOwnProperty(h)) {
          for (
            var c =
                c +
                ('<svg id="an-' +
                  h +
                  '" xmlns="http://www.w3.org/2000/svg"' +
                  (b[h]
                    ? 'viewBox="0 0 ' + b[h] + " " + b[h] + '"'
                    : e[h]
                    ? 'viewBox="0 0 ' + e[h][0] + " " + e[h][1] + '"'
                    : 'viewBox="0 0 24 24" height="24" width="24"') +
                  ">"),
              g = d[h].split(";"),
              k = 0;
            k < g.length;
            k++
          )
            c += '<path d="' + g[k] + '"/>';
          c += "</svg>";
        }
      a.innerHTML =
        c +
        '<svg id="lLogo" viewBox="0 0 116 23" xml:space="preserve"><path d="M92.76 8.244c-1.806 0-3.506 3.833-3.506 6.63 0 .803.156 2.379 1.195 2.379 1.335 0 2.385-2.065 2.805-3.795l.328-1.348c.122-.482.255-1.285.255-1.827 0-.844-.266-2.04-1.077-2.04zm6.241 9.676c-1.273.789-2.863 1.324-3.936 1.324-1.598 0-2.853-.872-2.116-3.084-.796 1.468-2.325 3.084-4.245 3.084-2.274 0-4.087-1.7-4.087-4.565 0-3.473 2.855-7.965 7.106-7.965 1.743 0 2.784 1.034 3.065 2.537l.302-1.119c.197-.808.899-1.372 1.707-1.372h2.556s-2.199 9.097-2.337 9.607c-.139.51-.038 1.11.659 1.11.222 0 .862-.072 1.325-.125l.001.568zm8.405-9.676c-2.034 0-3.51 4.05-3.51 6.63 0 .981.215 2.379 1.242 2.379 1.045 0 2.465-1.55 2.946-3.792l.354-1.654c.107-.44.159-.875.159-1.33 0-.47-.082-2.233-1.191-2.233zm4.503 8.133c-.18.748.152 1.1.658 1.1.407 0 .939-.085 1.32-.126v.57c-1.467.89-2.869 1.323-3.941 1.323-2.092 0-2.633-1.227-2.261-3.044-.86 1.562-2.124 3.044-4.292 3.044-2.501 0-4.182-1.7-4.182-4.565 0-3.443 2.808-7.965 6.988-7.965 1.357 0 2.526.994 2.965 2.15 0 0 1.065-4.506 1.287-5.41.221-.904.108-1.71-.523-2.164V.813h3.45c1.227 0 2.004.962 1.707 2.249-.296 1.286-2.997 12.566-3.176 13.315zm-68.067.977s-.853.12-1.281.12c-.841 0-.795-.773-.664-1.32l1.318-5.503c.097-.428.147-.837.147-1.217 0-1.744-1-2.72-2.736-2.72-1.885 0-3.527 1.205-4.714 3.14.155-1.835-.76-3.14-2.434-3.14-1.824 0-3.125 1.026-4.296 2.813l.087-.323c.264-.933-.195-2.248-1.708-2.248h-3.47v.477c.69.437.798 1.145.557 2.147l-2.272 9.421h4.533l1.245-5.174c.794-3.293 2.055-4.466 2.97-4.466.424 0 .6.442.463 1.01l-1.38 5.727c-.222.922-.113 1.707.315 2.27.435.573 1.178.876 2.148.876 1.101 0 2.791-.66 3.62-1.506l-.159-.541c-.312.159-.745.285-1.099.285-.326 0-.535-.252-.422-.734l.685-2.925c.795-3.293 2.055-4.466 2.97-4.466.494 0 .59.566.48 1.014l-1.307 5.39c-.116.51-.17.904-.17 1.241 0 1.023.459 2.242 2.648 2.242 1.072 0 2.46-.423 3.926-1.324v-.566zm-21.91-.002c-.356.041-1 .127-1.245.127-.72 0-.858-.61-.73-1.151.128-.54 1.415-5.98 1.701-7.12.286-1.141-.324-2.251-1.707-2.251h-3.478v.476c.667.572.78 1.254.566 2.148l-1.48 6.18c-.117.51-.17.904-.17 1.241 0 1.023.459 2.242 2.648 2.242 1.052 0 2.468-.458 3.896-1.324v-.568zm41.295-6.85c2.796 0 4.91-1.806 4.91-4.735 0-1.6-1.128-2.671-3.03-2.671h-1.743c.247.363.265.867.067 1.74-.07.311-1.109 4.577-1.374 5.666h1.17zm13.668 9.865l.313.666-.167.107c-1.431.924-3.059 1.398-4.873 1.398-3.857 0-6.27-1.682-8.33-6.361l-1.659-4.142c-.094-.234-.245-.33-.4-.33h-.07l-1.444 5.912c-.196.808-.898 1.372-1.707 1.372h-4.09v-.465c.673-.397 1.078-1.091 1.337-2.148.565-2.3 1.47-5.802 2.186-8.763.432-1.784.562-2.298.562-2.298.243-.982.407-2.026-.34-2.84v-.478h8.76c3.503 0 5.855 1.099 5.855 4.062 0 2.762-3.47 4.977-6.83 5.372 1.01.385 1.859 1.723 2.377 3.103.595 1.582 2.405 6.52 5.437 6.52.904 0 2.027-.292 2.895-.617l.188-.07zm-1.702-4.086c0 1.22.437 1.894 1.03 1.894 1.757 0 3.27-5.775 3.27-8.499 0-.944-.252-1.894-1.03-1.894-1.756 0-3.27 5.775-3.27 8.5zm1.148 2.963c-3.404 0-5.69-1.875-5.69-5.002 0-3.483 3.147-7.528 7.694-7.528 3.587 0 5.691 2.555 5.691 5.002 0 3.606-3.359 7.528-7.695 7.528zM51.516 7.782c-1.382 0-2.494 2.363-2.846 4.947 2.834-.514 3.494-2.285 3.494-3.805 0-.61-.18-1.142-.648-1.142zm3.19 8.478c-1.315 2.085-3.726 2.984-5.718 2.984-2.524 0-4.984-1.832-4.984-4.832 0-4.14 3.431-7.698 7.649-7.698 2.64 0 4.275 1.375 4.275 2.962 0 2.997-3.764 3.776-7.273 3.903.015 2.002.976 3.65 2.597 3.65 1.169 0 2.058-.61 2.881-1.471l.573.502zM22.86 3.12c0-1.448-1.122-2.582-2.554-2.582-1.443 0-2.531 1.11-2.531 2.582 0 1.458 1.088 2.558 2.53 2.558A2.529 2.529 0 0 0 22.86 3.12zm-8.737 11.745l.378.009-.667 2.852c-.174.75-.818 1.275-1.567 1.275H.332v-.477l.071-.067c.71-.667 1.04-1.22 1.258-2.11L4.813 3.37c.196-.809.898-1.373 1.707-1.373h4.125v.477s-1.033.798-1.328 2L8.49 7.893c-.765 3.162-1.76 7.326-1.923 7.97a6.618 6.618 0 0 1-.658 1.672c1.178-.04 4.828-.36 8.157-2.631l.056-.039z"/></svg><svg id="succ_badge" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_216_1123)"> <path d="M14.9346 8.20729C14.8703 8.07557 14.8703 7.92451 14.9346 7.79282L15.5314 6.57205C15.8636 5.89234 15.6004 5.08218 14.9321 4.72759L13.7318 4.09072C13.6023 4.02203 13.5135 3.89979 13.4882 3.75544L13.2534 2.41704C13.1227 1.67186 12.4334 1.17111 11.6844 1.27708L10.339 1.46739C10.1938 1.48789 10.0502 1.44121 9.94487 1.3393L8.96828 0.394556C8.4245 -0.131503 7.57263 -0.131534 7.02888 0.394556L6.05226 1.33939C5.94689 1.44133 5.8033 1.48792 5.65811 1.46749L4.31271 1.27718C3.5635 1.17115 2.87444 1.67196 2.74372 2.41714L2.50897 3.75547C2.48363 3.89985 2.39485 4.02207 2.26538 4.09078L1.06507 4.72766C0.396765 5.08222 0.133517 5.89243 0.465765 6.57214L1.06248 7.79289C1.12685 7.92461 1.12685 8.07567 1.06248 8.20735L0.465734 9.4281C0.133486 10.1078 0.396734 10.918 1.06504 11.2726L2.26535 11.9094C2.39485 11.9781 2.48363 12.1004 2.50897 12.2447L2.74372 13.5831C2.86272 14.2615 3.4444 14.7372 4.11293 14.7372C4.17877 14.7372 4.24559 14.7325 4.31274 14.723L5.65814 14.5327C5.80323 14.5121 5.94692 14.5589 6.05229 14.6608L7.02888 15.6056C7.30082 15.8686 7.64963 16.0001 7.99856 16.0001C8.34741 16.0001 8.69643 15.8686 8.96825 15.6056L9.94487 14.6608C10.0502 14.5589 10.1939 14.5123 10.339 14.5327L11.6844 14.723C12.4337 14.829 13.1227 14.3283 13.2534 13.5831L13.4882 12.2447C13.5135 12.1004 13.6023 11.9781 13.7318 11.9094L14.9321 11.2726C15.6004 10.918 15.8636 10.1078 15.5314 9.42807L14.9346 8.20729Z" fill="url(#paint0_linear_216_1123)"></path> <path d="M14.9346 8.20729C14.8703 8.07557 14.8703 7.92451 14.9346 7.79282L15.5314 6.57205C15.8636 5.89234 15.6004 5.08218 14.9321 4.72759L13.7318 4.09072C13.6023 4.02203 13.5135 3.89979 13.4882 3.75544L13.2534 2.41704C13.1227 1.67186 12.4334 1.17111 11.6844 1.27708L10.339 1.46739C10.1938 1.48789 10.0502 1.44121 9.94487 1.3393L8.96828 0.394556C8.4245 -0.131503 7.57263 -0.131534 7.02888 0.394556L6.05226 1.33939C5.94689 1.44133 5.8033 1.48792 5.65811 1.46749L4.31271 1.27718C3.5635 1.17115 2.87444 1.67196 2.74372 2.41714L2.50897 3.75547C2.48363 3.89985 2.39485 4.02207 2.26538 4.09078L1.06507 4.72766C0.396765 5.08222 0.133517 5.89243 0.465765 6.57214L1.06248 7.79289C1.12685 7.92461 1.12685 8.07567 1.06248 8.20735L0.465734 9.4281C0.133486 10.1078 0.396734 10.918 1.06504 11.2726L2.26535 11.9094C2.39485 11.9781 2.48363 12.1004 2.50897 12.2447L2.74372 13.5831C2.86272 14.2615 3.4444 14.7372 4.11293 14.7372C4.17877 14.7372 4.24559 14.7325 4.31274 14.723L5.65814 14.5327C5.80323 14.5121 5.94692 14.5589 6.05229 14.6608L7.02888 15.6056C7.30082 15.8686 7.64963 16.0001 7.99856 16.0001C8.34741 16.0001 8.69643 15.8686 8.96825 15.6056L9.94487 14.6608C10.0502 14.5589 10.1939 14.5123 10.339 14.5327L11.6844 14.723C12.4337 14.829 13.1227 14.3283 13.2534 13.5831L13.4882 12.2447C13.5135 12.1004 13.6023 11.9781 13.7318 11.9094L14.9321 11.2726C15.6004 10.918 15.8636 10.1078 15.5314 9.42807L14.9346 8.20729Z" fill="black" fill-opacity="0.2"></path> <path d="M4.5293 7.39635L7.09533 9.96238L12.0765 5.43408" stroke="white" stroke-width="1.20755"></path> </g> <defs> <linearGradient id="paint0_linear_216_1123" x1="7.99856" y1="0" x2="7.99856" y2="16.0001" gradientUnits="userSpaceOnUse"> <stop stop-color="#B8DC6B"></stop> <stop offset="1" stop-color="#86C34E"></stop> </linearGradient> <clipPath id="clip0_216_1123"> <rect width="16" height="16" fill="white"></rect> </clipPath> </defs> </svg>';
      document.body.appendChild(a);
    }
  };
})(window.alakhNiranjan);
(function (a, f, c) {
  function d(a) {
    return function () {
      return a.test(b);
    };
  }
  var b = (f.navigator && c.userAgent) || "";
  f = {
    isPhonepeAndroid: d(/phonepe-android/i),
    isPhonepeIos: d(/phonepe-ios/i),
    isFBinApp: d(/FBAV|FBAN/i),
    isOppoBrowser: d(/OppoBrowser/i),
    isVivoBrowser: d(/VivoBrowser/i),
    isUCBrowser: d(/UCBrowser/i),
    isSamsungBrowser: d(/SamsungBrowser/i),
    isSafari: d(/webkit\W(?!.*chrome).*safari\W/i),
    isIOS: d(/(ipad|iphone|ipod)/i),
    whoami: function () {
      return b;
    },
  };
  a.UA = f;
})(window.alakhNiranjan, window, navigator);
(function (a) {
  var f = 0;
  a = ["webkit", "moz", "ms", "o"];
  for (
    var c = a.length,
      d = window.requestAnimationFrame,
      b = window.cancelAnimationFrame,
      e,
      h = 0;
    h < c && (!d || !b);
    h++
  )
    (e = a[h]),
      (d = d || window[e + "RequestAnimationFrame"]),
      (b =
        b ||
        window[e + "CancelAnimationFrame"] ||
        window[e + "CancelRequestAnimationFrame"]);
  (d && b) ||
    ((d = function (a, b) {
      var c = new Date().getTime(),
        d = Math.max(b || 0, c - f),
        e = window.setTimeout(function () {
          a(c + d);
        }, d);
      f = c + d;
      return e;
    }),
    (b = function (a) {
      window.clearTimeout(a);
    }));
  window.requestAnimationFrame = d;
  window.cancelAnimationFrame = b;
})(window.alakhNiranjan);
(function (a) {
  a.cookie = function (a, c, d) {
    var b = "";
    d &&
      ((b = new Date()),
      b.setTime(b.getTime() + 864e5 * d),
      (b = "; expires=" + b.toUTCString()));
    document.cookie = a + "=" + c + b + "; path=/";
  };
  a.readCookie = function (a) {
    a += "=";
    for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
      for (var b = c[d]; " " == b.charAt(0); ) b = b.substring(1, b.length);
      if (0 === b.indexOf(a)) return b.substring(a.length, b.length);
    }
    return null;
  };
})(window.alakhNiranjan);
(function (a) {
  a.xhr = function () {
    function f(b, c, d, g, k) {
      "GET" == b &&
        c &&
        1700 < c.length &&
        ((b = "POST"), (g = c.split("?")), (c = g[0]), (g = g[1]));
      var l = c,
        m = {
          success: function () {},
          error: function () {
            a.utilities.default.loader(!1);
          },
          always: function () {},
          abort: function () {},
        },
        f,
        p = new (XMLHttpRequest || f || !1)("MSXML2.XMLHTTP.3.0"),
        r = new Date().getTime();
      f = {
        default: "application/x-www-form-urlencoded",
        j: "application/json",
        f: "multipart/form-data",
        none: void 0,
      };
      var n = f.default;
      d && (n = f[d]);
      a.connections(!0);
      p.open(b, l, !0);
      n && p.setRequestHeader("Content-type", n);
      p.onreadystatechange = function () {
        var b, d;
        if (4 === p.readyState) {
          try {
            b = a.parseJSON(p.responseText);
          } catch (h) {
            b = p.responseText;
          }
          b = [b, p];
          200 <= p.status && 300 > p.status
            ? (a.connections(!1),
              (d = a.anConstants.date()),
              a.log.event(
                { name: "loadTime", cat: "perf", ev_val_int: d - r },
                {
                  type: k || "page",
                  id: a.encodeURIComponent(c.split("?")[0]),
                  extra: a.encodeURIComponent(c.split("?")[1] || ""),
                },
                { type: "page", id: "success" }
              ),
              m.success.apply(m, b))
            : (a.connections(!1),
              (d = a.anConstants.date()),
              a.log.event(
                { name: "loadTime", cat: "perf", ev_val_int: d - r },
                {
                  type: k || "page",
                  id: a.encodeURIComponent(c.split("?")[0]),
                  extra: a.encodeURIComponent(c.split("?")[1] || ""),
                },
                { type: "page", id: "error" }
              ),
              (a.anConstants.letUnload = !0),
              m.error.apply(m, b));
        }
      };
      p.send(g);
      var t = {
        success: function (a) {
          a && (m.success = a);
          return t;
        },
        error: function (a) {
          a && (m.error = a);
          return t;
        },
        always: function (a) {
          a && (m.always = a);
          return t;
        },
        abort: function () {
          p.abort();
        },
      };
      return t;
    }
    function c(a, c, d, g) {
      return f("GET", a, d, c, g);
    }
    function d(a, c, d, g) {
      return f("POST", a, d, c, g);
    }
    a.anConstants.xhrList = a.anConstants.xhrList || [];
    return { get: c, post: d, GET: c, POST: d };
  };
})(window.alakhNiranjan);
(function (a) {
  a.view = {
    intent: function (f) {
      var c = "&",
        d = window.location.pathname + window.location.search;
      f = window.location.host + f.replace("ajax=true", "");
      -1 === f.indexOf("?") && (c = "?");
      f =
        f +
        c +
        "fb_redirect=true&fb_ruid=" +
        a.readCookie("_ruid") +
        "&fb_uuid=" +
        a.readCookie("uuid") +
        "&fb_visit_id=" +
        window.visit_id +
        "&magicURL=" +
        a.encodeURIComponent(d);
      window.location.href =
        "intent://" +
        f +
        "#Intent;scheme=https;action=android.intent.action.VIEW;end;";
      a.anConstants.gestureRedirectFB = !1;
    },
    getVenderScripts: function (f) {
      var c = f || [];
      (function () {
        window.requestAnimationFrame(function () {
          for (var d = 0; d < c.length; d++)
            if (0 < a(".an-" + c[d] + "-js").length)
              try {
                a.view.blobScripts(a(".an-" + c[d] + "-js").html());
              } catch (b) {}
        });
      })();
    },
    fillView: function (f, c) {
      window.requestAnimationFrame(function () {
        if (f && f.view) {
          var c = a("#cartI").html().trim();
          a("body").html(f.view);
          0 < c.length && "0" != c
            ? a("#cartI").html(c).show()
            : a("#cartI").hide();
          0 < a("iframe").length &&
            a("iframe")
              .each(function () {})
              .remove();
          a("form[name='gokwik']").length &&
            (a(".flcn-frame-active").removeClass("flcn-frame-active"),
            a("#iOSViewPort").remove(),
            a("form[name='gokwik']").remove());
          "block" == a("#authCon")[0].style.display &&
            ((a.anConstants.pseudoBack += 1), a("#authCon").hide());
          var b = !1;
          0 < a(".viewOverlay").length &&
            a(".viewOverlay").each(function () {
              "block" == this.style.display &&
                ((b = !0), (this.style.display = "none"));
            });
          b && (a.anConstants.pseudoBack += 1);
          a.utilities.default.scrollDOM(f.scroll);
          a("#an-info").hide();
          a(".an-lma").each(function () {
            a(this).attr("an-ok", "true");
          });
          a(".an-js").each(function () {
            a(this).attr("data-done", " ");
          });
          a(".an-load-js").each(function () {
            a(this).attr("data-done", " ");
          });
          a(".an-ad").length &&
            a.ads &&
            a.ads.refreshAds &&
            a.ads.refreshAds(!1, !0, !0);
          window.speechSynthesis && window.speechSynthesis.cancel();
          a.view.replaceView();
          window.requestAnimationFrame(function () {
            a.view.evalScripts();
            a.utilities.lazyLoad.init({
              image: !0,
              pagination: !0,
              video: !0,
              ads: !0,
            });
          });
        } else window.location = window.location;
      });
    },
    pseudoBack: function () {
      a.anConstants.pseudoBack += 1;
    },
    back: function () {
      window.history && window.history.back && window.history.back();
      a.utilities.default.loader(!1);
    },
    forward: function () {
      window.history && window.history.forward && window.history.forward();
      a.utilities.default.loader(!1);
    },
    pushView: function (f, c) {
      window.requestAnimationFrame(function () {
        var d = f || document.location.href;
        c ? a.utilities.default.loader(!1, c) : a.utilities.default.loader(!1);
        a("#an-info").hide();
        if (window.history && window.history.pushState) {
          var b = { view: a("body").html(), scroll: 1 };
          try {
            window.history.pushState(b, !1, d);
          } catch (e) {
            (b.view = null), window.history.pushState(b, !1, d);
          }
        }
      });
    },
    replaceView: function (f, c) {
      window.requestAnimationFrame(function () {
        var d,
          b = f || document.location.href;
        d =
          "true" == a.anConstants.touch
            ? document.body.scrollTop || document.documentElement.scrollTop || 1
            : a(".AN-scrlEle")[0]
            ? a(".AN-scrlEle")[0].scrollTop || 1
            : a(".conn")[0].scrollTop || 1;
        c ? a.utilities.default.loader(!1, c) : a.utilities.default.loader(!1);
        if (window.history && window.history.replaceState) {
          d = { view: a("body").html(), scroll: d };
          try {
            window.history.replaceState(d, !1, b);
          } catch (e) {
            (d.view = null), window.history.replaceState(d, !1, b);
          }
        }
      });
    },
    blobScripts: function (a, c) {
      eval(a);
    },
    evalScripts: function () {
      var f = "";
      a(".an-js-rm")
        .each(function () {
          f += a(this).html();
        })
        .remove();
      a(".an-js").each(function () {
        a(this).attr("data-done") ||
          (a(this).attr("data-done", "true"), (f += a(this).html()));
      });
      a(".an-load-js").each(function () {
        a(this).attr("data-done") ||
          (a(this).attr("data-done", "true"), (f += a(this).html()));
      });
      a(".an-load-rm-js")
        .each(function () {
          f += a(this).html();
        })
        .remove();
      a.view.blobScripts(f);
    },
    setMagicView: function () {
      for (
        var f = !0,
          c = document.location.pathname,
          d =
            "/video /shopping_cart /checkout_os/index /auth /ctp/ shopping_cart/add_item /showproductfromad /barcode_reader /variants".split(
              " "
            ),
          b = 0;
        b < d.length;
        b++
      )
        if (-1 < c.indexOf(d[b])) {
          f = !1;
          break;
        }
      f &&
        !a.anConstants.app &&
        ((c = f = document.location.href),
        0 == a("#noBackView").length &&
          (c = -1 < f.indexOf("?") ? f + "&magic=true" : f + "?magic=true"),
        a.view.replaceView(c),
        a.view.pushView(f));
    },
    setDialogue: function () {
      try {
        new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition ||
          window.oSpeechRecognition)(),
          a.getPermissionStatus("microphone", function () {
            "denied" != this.state
              ? a.getScript(a.anConstants.scripts.voice, !0)
              : "speechSynthesis" in window &&
                a.getScript(a.anConstants.scripts.voice);
          });
      } catch (f) {
        "speechSynthesis" in window && a.getScript(a.anConstants.scripts.voice);
      }
    },
    setBasic: function () {
      a.cookie("deviceWidth", a.anConstants.deviceWidth);
      a.cookie("deviceHeight", a.anConstants.deviceHeight);
      a.anConstants.app ||
      a.UA.isIOS() ||
      a.UA.isSafari() ||
      a.UA.isUCBrowser() ||
      a.UA.isFBinApp() ||
      a.UA.isSamsungBrowser()
        ? (a.anConstants.autoplayVDO = !1)
        : (a.anConstants.autoplayVDO = !0);
      a.UA.isPhonepeAndroid() && a.cookie("ppewv", "a");
      a.UA.isPhonepeIos() && a.cookie("ppewv", "i");
    },
    setFBview: function () {
      a.UA.isFBinApp() &&
        (a("#sty").html(a("#sty").html() + a("#FBstyle").html()),
        a(".theCo").each(function () {
          a(this).attr("content", "#3B5998");
        }));
    },
    init: function () {
      function f() {
        a.utilities.lazyLoad.init({ video: !0, ads: !0 });
        a.view.getVenderScripts(["gtm", "heatmaps"]);
        a.view.setDialogue();
      }
      a.network();
      a.utilities.lazyLoad.init({ image: "strict" });
      for (var c = 0, d = a.anConstants.defferedTrackList.length; c < d; c++)
        a.log.event(
          a.anConstants.defferedTrackList[c][0],
          a.anConstants.defferedTrackList[c][1],
          a.anConstants.defferedTrackList[c][2]
        );
      window.requestAnimationFrame(function () {
        "serviceWorker" in navigator &&
          a.getScript(a.anConstants.scripts.sw, !0);
        a.anConstants.getDUID &&
          !a.readCookie("duid") &&
          a.getScript(a.anConstants.scripts.fingerPrint, !0);
        a.view.evalScripts();
        a.utilities.lazyLoad.init({ pagination: "strict" });
        "requestIdleCallback" in window
          ? window.requestIdleCallback(function () {
              f();
            })
          : window.requestAnimationFrame(function () {
              f();
            });
      });
    },
  };
})(window.alakhNiranjan);
(function (a) {
  function f(b) {
    if (!b) return !1;
    a[b] = function (c, d) {
      var g = d,
        k = a(c),
        l = a.utilities.default.anAttr(k);
      if (
        k.hasClass("anSelect") ||
        k.hasClass("anSelectFd") ||
        (l.evi && a.anConstants.eview)
      )
        return !1;
      !l.go && g && a.event.stop(g);
      l.imp && a.stop();
      k.hasClass("ANretry") && (l.vi = l.evi = 0);
      if (l.vi || l.evi)
        l.evi && (a.anConstants.eview = !0), a.view.replaceView();
      l.iscrl && (a.view.internalScroll = a(l.iscrl)[0].scrollTop);
      l.stopScrl && a("html").removeClass("oA").addClass("oH");
      if (l.tr) {
        var g = k.attr("data-tr"),
          m;
        g && (m = a.parseJSON(g));
        m &&
          "object" == typeof m &&
          a.log.event(
            { name: m.name, dest: m.dest },
            { type: m.dotype, id: m.doid, extra: m.doextra },
            { type: m.dftype, id: m.dfid, extra: m.dfextra }
          );
      }
      l.log &&
        ((m = k.attr("data-log")) && (d = a.parseJSON(m)),
        d && "object" == typeof d && a.log.event(d.attr, d.do, d.df));
      a.event.variables[b] && window.cancelAnimationFrame(a.event.variables[b]);
      a.event.variables[b] = window.requestAnimationFrame(function () {
        var c = l[b];
        c &&
          c.split(";").forEach(function (b) {
            var c = b.split(",")[0];
            b = b.split(",")[1] || "default";
            c &&
              b &&
              a.utilities[b] &&
              a.utilities[b][c] &&
              a.utilities[b][c].call(k, d, l);
          });
      });
    };
  }
  a.event = function (a, c, d) {
    a.addEventListener
      ? a.addEventListener(c, d)
      : a.attachEvent &&
        a.attachEvent("on" + c, function () {
          d.call(a);
        });
  };
  a.event.listeners = {};
  a.event.addEventListener = function (b, c) {
    if ("scroll".includes(b) && "function" === typeof c) {
      var d = { id: 1, type: b, callback: c };
      void 0 === a.event.listeners[b] && (a.event.listeners[b] = {});
      var g = Math.floor(Math.random() * Date.now()).toString(16);
      d.id = g;
      a.event.listeners[b][g] = d;
      return g;
    }
  };
  a.event.removeEventListener = function (b, c) {
    "scroll".includes(b) &&
      c &&
      void 0 !== a.event.listeners[b] &&
      void 0 !== a.event.listeners[b][c] &&
      delete a.event.listeners[b][c];
  };
  a.event.variables = {};
  a.event.eventObjects = {
    searchClose: {
      sp: "false",
      trns: "trnsU",
      spdata: "srch",
      click: "removeSearchResults",
    },
    menuClose: {
      sp: "false",
      trns: "trnsL",
      spdata: "menu",
      click: "updateLayout",
    },
    impAjaxMenuCloseLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
    },
    impCartAjaxMenuClose: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
      ildr: "in",
    },
    impVipAjaxMenuCloseLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
      ldrt: "vip",
    },
    impVipNewAjaxMenuCloseLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
      ldrt: "vipNew",
    },
    impVipNewAjaxMenuCloseNewLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      log: 1,
      rplc: 1,
      ldrt: "vipNew",
    },
    impStAjaxMenuCloseLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
      ldrt: "story",
    },
    impStNewAjaxMenuCloseLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      tr: 1,
      rplc: 1,
      ldrt: "storyNew",
    },
    impAjaxMenuClose: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
    },
    impAjaxMenuOpen: {
      sp: "true",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
    },
    accordionCloseOther: { click: "accordion", cls: 1 },
    impAjaxMenuCloseVideo: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
      vdo: 1,
    },
    impAjaxMenuCloseVideoLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
      vdo: 1,
      tr: 1,
    },
    impVipAjaxMenuCloseVideo: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
      vdo: 1,
      ldrt: "vip",
    },
    impVipAjaxMenuCloseVideoLog: {
      sp: "false",
      imp: 1,
      vi: 1,
      click: "ajax",
      spdata: "menu",
      trns: "trnsL",
      rplc: 1,
      vdo: 1,
      tr: 1,
      ldrt: "vip",
    },
    newUserKYCimp: { click: "a,newu", vi: 1, rplc: 1 },
    newUserKYCimpLog: { click: "a,newu", vi: 1, rplc: 1, tr: 1 },
    dNewUserImpMenuOpen: {
      click: "a,newu",
      vi: 1,
      sp: "true",
      trns: "trnsL",
      spdata: "menu",
      rplc: 1,
    },
    dNewUserImpMenuOpenLog: {
      click: "a,newu",
      vi: 1,
      sp: "true",
      trns: "trnsL",
      spdata: "menu",
      rplc: 1,
      tr: 1,
    },
    openMenu: {
      sp: "true",
      trns: "trnsL",
      spdata: "menu",
      vi: 1,
      click: "updateLayout",
      scrollStop: 1,
    },
    videoFil: {
      imp: 1,
      url: 1,
      vi: 1,
      click: "ajax",
      rplc: 1,
      con: "#prodDivs",
    },
  };
  a.event.stop = function (a) {
    a = a || window.event;
    a.stopPropagation();
    a.stopImmediatePropagation();
    a.preventDefault();
    return !1;
  };
  for (
    var c = 0,
      d =
        "click input touchend mouseup load change blur keyup submit focus".split(
          " "
        );
    c < d.length;
    c++
  )
    f(d[c]);
  a.scroll = function (b, c) {
    a.event.variables.scroll && clearTimeout(a.event.variables.scroll);
    a.event.variables.scroll = setTimeout(function () {
      a.event.variables.scrollFrame &&
        window.cancelAnimationFrame(a.event.variables.scroll);
      a.event.variables.scrollFrame = window.requestAnimationFrame(function () {
        var c = a(b),
          d = "true" == a.anConstants.touch ? a("body") : a(".conn");
        c[0] !== window ? (d = c) : (c = d);
        a.anConstants.scrollPosition = a.anConstants.scrollValue || 400;
        var e =
          "true" == a.anConstants.touch
            ? window.pageYOffset || document.documentElement.scrollTop
            : d[0].pageYOffset || d[0].scrollTop;
        e > a.anConstants.scrollPosition
          ? a.event.scrollDown && a.event.scrollDown()
          : a.event.scrollUp && a.event.scrollUp();
        var l = a.event.listeners.scroll;
        void 0 !== l &&
          Object.keys(l).forEach(function (a) {
            a = l[a];
            "function" === typeof a.callback && a.callback(e, a.id);
          });
        a.utilities.impression.init(c[0]);
        a.utilities.lazyLoad.init({
          image: !0,
          pagination: !0,
          video: !0,
          ads: !0,
        });
      });
    }, 10);
  };
  a.navCategoryHover = function (b, c, d, g) {
    var k = a(b).attr("id"),
      l = a(b).attr("data-type");
    a.desktopNavCatTimer && clearTimeout(a.desktopNavCatTimer);
    a.desktopNavCatTimer = setTimeout(function () {
      a(".expandCatChild").hide();
      g ||
        (a("#navCatBackdrop, .expandCat").hide(),
        a(".mainCategory").removeClass("highlightCat"));
      if (d && (l || k)) {
        a("#navCatBackdrop").show();
        var b = l ? l : k;
        a.log.event(
          { name: l ? "CatchNewDeskCategories" : "NewDeskCategoriesEnter" },
          { type: b, id: b, extra: "" },
          { type: b + "_expand" }
        );
        a("#" + b + "_expand").show();
        g || a("#" + b).addClass("highlightCat");
      }
    }, 300);
  };
  a.event(window, "popstate", function (b, c) {
    if (b.state) {
      window.clearInterval(a.utilities.default.smoothScrollTimer);
      a.stop();
      a.log.event(
        { name: "backButtonClicked" },
        {
          type:
            a.anConstants && a.anConstants.pageName
              ? a.anConstants.pageName.toString()
              : "",
        },
        {}
      );
      if (0 < a("#noBackView").length)
        a("#noBackView").hasClass("dN")
          ? a("#noBackView").removeClass("dN")
          : a("#noBackView").addClass("dN"),
          a.view.pushView(a("#noBackView").attr("data-url"));
      else if (
        a("#sellerStoreBack").length &&
        !a("#sellerStoreBack").hasClass("dN")
      ) {
        a("#sellerStoreBack").addClass("dN");
        var d = a("#sellerStoreBack").attr("data-url");
        a("#sellerStoreBack")[0].id = "";
        a.view.pushView(d);
        a.utilities.sellerStore &&
          a.utilities.sellerStore.restartSwiper &&
          a.utilities.sellerStore.restartSwiper();
      } else if (
        a.utilities.sellerStore &&
        a.utilities.sellerStore.checkForBackPopStateEvent &&
        a.utilities.sellerStore.checkForBackPopStateEvent() &&
        a("#stut_swipe_next").length
      )
        (d = a("#stut_swipe_next").attr("data-url")),
          a.view.pushView(d),
          a.utilities.sellerStore &&
            a.utilities.sellerStore.backFromVdoVip &&
            a.utilities.sellerStore.backFromVdoVip();
      else if (0 < a("#gokwik-checkout").length) {
        a(".flcn-frame-active").removeClass("flcn-frame-active");
        a("#gokwik-checkout").remove();
        a("#iOSViewPort").remove();
        var d = a("form[name='gokwik']"),
          g = d.length && d.attr("backClose") ? d.attr("backClose") : "/";
        d.length && d.remove();
        g &&
          (a.view.pushView(g),
          setTimeout(function () {
            a.anConstants.touch &&
              a("#tar-upiGokwik").length &&
              (document.documentElement.scrollTop =
                a("#tar-upiGokwik")[0].getBoundingClientRect().top - 100);
          }, 100));
      } else if (a.anConstants.pseudoBack)
        window.history.go(-1 * a.anConstants.pseudoBack),
          (a.anConstants.pseudoBack = 0);
      else {
        if (
          !a.anConstants.app &&
          -1 < document.location.search.indexOf("magic=true")
        ) {
          a.utilities.default.loader(!0);
          var k = "/",
            l;
          a.anConstants.magicURL
            ? ((k = a.anConstants.magicURL),
              (l = -1 == k.indexOf("?") ? k + "?ajax=true" : k + "&ajax=true"))
            : ("/" == document.location.pathname && (k = "/shopping-offers"),
              (l = k + "?ajax=true"),
              a.anConstants.webReferral
                ? (l += "&webReferral=true")
                : !a.anConstants.giveBounceDiscount ||
                  a.anConstants.scratched ||
                  -1 < document.location.search.indexOf("rewards=true") ||
                  (l += "&rewards=true"));
          setTimeout(function () {
            a.xhr()
              .get(l)
              .success(function (b) {
                a.utilities.default.scrollDOM();
                a.utilities.default.updateDOM.call(a, !1, b, a(".an-main"), !0);
                a.utilities.lazyLoad.init({
                  image: !0,
                  pagination: !0,
                  video: !0,
                  ads: !0,
                });
                a.anConstants.ctpExp
                  ? (a.view.replaceView(k + "?ctp=true"), a.view.pushView(k))
                  : a.view.replaceView(k);
              })
              .error(function (b) {
                a.utilities.default.loader(!1);
              });
          }, 200);
          return;
        }
        if (
          !a.anConstants.app &&
          -1 < document.location.search.indexOf("ctp=true")
        ) {
          k = document.location.pathname;
          a.log.event({ name: "CtpPopupShown" }, { pageType: k || "" });
          a.view.replaceView(k);
          d = "M";
          a.readCookie("gender") && (d = a.readCookie("gender"));
          g =
            "https://img1.junaroad.com//assets/images/mobileNotif/img-1652959197631.jpg";
          "F" == d &&
            (g =
              "https://img1.junaroad.com//assets/images/mobileNotif/img-1652959630927.jpg");
          d =
            '<div><style>.bgLd {background-color: #99CC33;} .-mt3{margin-top: -3px;} .hAuto{ height: auto; } .mr4{ margin-right: 4px; }</style><div id="ctpCon" class="bm0 l0 pF pR r0 t0 z17"><div class="bg0o bm0 fadeIn flat-form l0 o0 pF r0 t0 t4e" onclick="$(\'#ctpCon\').hide();$.view.pseudoBack();"></div><div class="mA mxw480 ffSs pA bm0 l0 r0 fadeInUp flat-form"><div class="cF fs12 fwB lh28 p08 taR ttU" onclick="$(\'#ctpCon\').hide();$.view.pseudoBack();"><div class="dIb vM">close</div><div class="dIb h20 vM w16"><svg viewBox="0 0 24 24" class="cF"><use xlink:href="#an-cros"></use></svg></div></div><div class="bgF oH"><img src="' +
            g +
            '" data-src="' +
            g +
            '" class="an-ll o0 wp100 hAuto" onerror="this.src=this.getAttribute(\'data-src\')"></img><a href="https://limeroad.onelink.me/vvYz/9sy6xfdx" class="dB tdN"><div onclick="$.log.event({\'name\': \'CtpCtaClicked\'}, {\'pageType\': \'' +
            k +
            '\'})" class="ttU bgLd p048 pt8 pb8 taC w240 fs12 fwB mt10 mb8 mA br4 c0"><img src="https://img1.junaroad.com//assets/images/mobileNotif/img-1652959754813.jpg" data-src="https://img1.junaroad.com//assets/images/mobileNotif/img-1652959754813.jpg" width="15" height="20" class="an-ll o0 dIb vM -mt3 mr4" onerror="this.src=this.getAttribute(\'data-src\')" /><span class="vM">download app & play now</span></div></a></div></div></div></div>';
          a("body").ia(a("body")[0], d);
          return;
        }
        var f = !0;
        0 < a(".viewOverlay").length &&
          a(".viewOverlay").each(function () {
            "block" == this.style.display &&
              ((f = !1), (this.style.display = "none"));
          });
        if (f) {
          var q = document.location.href,
            p = !1,
            p =
              /\/shopping_cart|\/checkout_os\/index|\/signin|auth\/login|\/ctp\/|\/myaccount\/get_credits/.test(
                q
              ),
            r = a.anConstants.forceReloadUrls;
          r &&
            Object.keys(r).forEach(function (a) {
              if (0 < r[a])
                if (q.includes(a)) (p = !0), r[a]--;
                else {
                  var b = a.split("-p")[1];
                  void 0 != b &&
                    (new RegExp("/products/" + b).test(q) ||
                      new RegExp("/vip/" + b).test(q)) &&
                    ((p = !0), r[a]--);
                }
            });
          q.includes("/checkout_os/index") &&
            a.anConstants.checkoutV2 &&
            (p = !1);
          p
            ? (a.utilities.default.loader("in"),
              setTimeout(function () {
                var b = a.xhr(),
                  c;
                c =
                  -1 < window.location.search.indexOf("?")
                    ? "&ajax=true&forcereload=true"
                    : "?ajax=true&forcereload=true";
                b.get(window.location.pathname + window.location.search + c)
                  .success(function (b) {
                    a.utilities.default.updateDOM.call(
                      a,
                      !1,
                      b,
                      a(".an-main"),
                      !0
                    );
                    a.utilities.default.loader(!1);
                    a.utilities.lazyLoad.init({
                      image: !0,
                      pagination: !0,
                      video: !0,
                      ads: !0,
                    });
                  })
                  .error(function (b) {
                    a.utilities.default.loader(!1);
                  });
              }, 200))
            : a.view.fillView(b.state, b);
        }
      }
      a("html").hasClass("oH") &&
        (a("html").removeClass("oH"), a("html").addClass("oA"));
    }
    setTimeout(function () {
      a.utilities.default.resetCategoryNavigation();
    }, 300);
    d = sessionStorage.getItem("urlPrevious");
    g = sessionStorage.getItem("urlCurrent");
    d.includes("/checkout_os/index") &&
      q === g &&
      setTimeout(function () {
        a.toast.succ("Item Added to Cart", null, "top", 1500);
      }, 300);
  });
  a.event(window, "error", function (b) {
    var c = b.lineno ? "At line: " + b.lineno : "",
      d = b.colno ? " in column: " + b.colno : "",
      g = b.error ? (b.error.stack ? b.error.stack.substr(0, 5e3) : "") : "",
      k = b.error
        ? b.error.message
          ? b.error.message.substr(0, 5e3)
          : ""
        : b.message
        ? b.message.substr(0, 5e3)
        : "";
    a.anConstants.test &&
      "Script error." !== k &&
      (alert("JS Error " + k),
      console.log("JS Error " + k + "\n" + c + d + "\nStack Trace - " + g));
    b.lineno &&
      0 < k.trim().length &&
      a.log.event(
        { name: "jsError", cat: "perf" },
        { type: k, id: c + d, extra: g }
      );
    return !0;
  });
  a.event(window, "beforeinstallprompt", function (b) {
    b.preventDefault();
    a.anConstants.deferredPrompt = b;
    a.anConstants.pwa ||
      (a("#vSt").addClass("a2hs"),
      a("#seller_store_a2hs").length && a("#seller_store_a2hs").show());
  });
  a.event(window, "appinstalled", function (b) {
    a("#vSt").removeClass("a2hs");
    a("#seller_store_a2hs").hide();
    a("#vSt").removeClass("pwa");
    a("#seller_store_pwa").hide();
    a.log.event({ name: "a2hsInstalled" }, {}, {}, !0);
  });
})(window.alakhNiranjan);
(function (a) {
  a.utilities = a.utilities || {};
  a.utilities.main = { v: "0.6.0" };
  a.utilities.default = {
    scrollInput: function (c, d) {
      a.utilities.default.st(!1, !1, a(this)[0], !1, 1, !1, 4, !1, !1);
    },
    uuidv4: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (a) {
          var d = (16 * Math.random()) | 0;
          return ("x" == a ? d : (d & 3) | 8).toString(16);
        }
      );
    },
    refreshPage: function (c, d, b) {
      c = new URL(c || window.location.href);
      c.searchParams.append("ajax", "true");
      a.utilities.default.loader("in");
      a.xhr()
        .get(c.href)
        .success(function (b) {
          a.utilities.default.updateView.call(
            a,
            null,
            b,
            { nav: 1, rplc: 1 },
            !1,
            !0
          );
          a.utilities.default.loader(!1);
          d && d();
        })
        .error(function (c) {
          a.utilities.default.loader(!1);
          b && b();
        });
    },
    resetCategoryNavigation: function (c) {
      if (0 < a("#nav").length) {
        var d = a.xhr();
        d.get("/get_nav_categories?ajax=true" + (c || ""))
          .success(function (b) {
            a("#nav").html(b);
            a.anConstants.navData = b;
          })
          .error(function () {});
      }
      a("#newDeskProfile").length &&
        ((d = a.xhr()),
        d
          .get("/update_profile_data_desktop?ajax=true" + (c || ""))
          .success(function (b) {
            a("#newDeskProfile").html(b);
            a.anConstants.navData = b;
          })
          .error(function (b) {
            a.log.event(
              { name: "navDeskError" },
              { type: "error", id: 0, extra: a.stringifyJSON(b) },
              { type: "navDesk" }
            );
          }));
    },
    signinbasic: function (c, d, b) {
      a.utilities.default.loader(!1, c || !1);
      this.hasClass("skpv") ||
        ((a.signinBefore = {}),
        (a.signinBefore.data = a("body").html()),
        "true" == a.anConstants.touch
          ? (a.signinBefore.scrollState =
              document.body.scrollTop ||
              document.documentElement.scrollTop ||
              1)
          : a(".AN-scrlEle")[0]
          ? (a.signinBefore.scrollState = a(".AN-scrlEle")[0].scrollTop || 1)
          : (a.signinBefore.scrollState = a(".conn")[0].scrollTop || 1),
        (a.signinBefore.ttcrt = this.hasClass("skpTrSngUp") ? !0 : !1),
        (a.signinBefore.target =
          a.signinBefore.ttcrt ||
          (this[0].href && -1 < this[0].href.indexOf("auth/login"))
            ? !1
            : this),
        (a.signinBefore.location = window.location.href));
      b ||
        (d.con && (d.con = !1), d.evi && (d.vi = !0), (d.href = "/auth/login"));
    },
    authOverlay: function (c, d, b, e) {
      d.con = "#authCon";
      d.xsrl = !0;
      a.utilities.default.signinbasic.call(c, !1, d, !0);
      a.utilities.default.updateView.call(c, b, e, d, !1, !0);
    },
    ajax: function (c, d) {
      var b = this,
        e = "get",
        h = "",
        g = !1,
        k,
        l;
      if (!d.nld) {
        if (
          "true" == a.anConstants.touch &&
          d.ldrt &&
          0 < a("#ldr-" + d.ldrt).length
        ) {
          var f;
          switch (d.ldrt) {
            case "vip":
            case "vipNew":
              f = a("#ldr-" + d.ldrt).html();
              0 < a("img", b[0]).length &&
                (f = f.replace("//:0", a("img", b[0]).attr("src")));
              a.anConstants.lastPrefferedSize &&
                (d.api += "&variant=" + a.anConstants.lastPrefferedSize);
              break;
            case "cart":
              var q = a.parseInt(a("#cartI").html()) || 0,
                p = "";
              if (0 < q) {
                for (var r = 0; 1 > r; r++) p += a("#ldr-cart-items").html();
                f = a("#ldr-" + d.ldrt)
                  .html()
                  .replace("--itemCount--", q)
                  .replace("--cartItems--", p);
              }
              break;
            case "story":
            case "storyNew":
              (q = b.parent()[0]),
                (f = a("#ldr-" + d.ldrt).html()),
                (f = f.replace("--storyTitle--", a("._stt", q).html())),
                (f = f.replace("--likeCounts--", a("._stl", q).html())),
                (f = f.replace("--storyCreator--", a("._stc", q).html())),
                (f = f.replace("--followerCount--", a("._stf", q).html()));
          }
        }
        if (f) {
          if (
            !a.anConstants.app &&
            "true" == a.anConstants.touch &&
            a.anConstants.gestureRedirectFB &&
            a.UA.isFBinApp() &&
            !a.UA.isOppoBrowser() &&
            !a.UA.isVivoBrowser() &&
            !a.UA.isIOS() &&
            1700 > d.api.length
          )
            return a.view.intent(d.api), !1;
          a("#views").ie(f);
        } else
          d.ldr && ((k = a(d.ldr)), (l = !0)),
            a.utilities.default.loader(d.ildr || !0, k, l);
      }
      d.sp && a.utilities.default.updateLayout.call(b, c, d, !0);
      d.post && ((e = "post"), (h = d.val ? d.val : d.data));
      d.hdr && (g = d.hdr);
      var n = b.attr("data-pgn");
      a.xhr()
        [e](d.api, h, g, n)
        .success(function (e) {
          d.hdcon && a(d.hdcon).hide();
          a.blankEveryReq && (e = "");
          e ||
            (a.log.event(
              { name: "emptyAjaxData" },
              { type: d.api, id: n, extra: "reloadtolocation" },
              {}
            ),
            d.ldrt && "false" != a.anConstants.touch
              ? f &&
                d.ldrt &&
                setTimeout(function () {
                  a("#vldr-" + d.ldrt).remove();
                  window.location = window.location.href;
                }, 1e3)
              : d.ldr
              ? setTimeout(function () {
                  a(d.ldr).hide();
                  window.location = window.location.href;
                }, 1e3)
              : setTimeout(function () {
                  a.utilities.default.loader(!1);
                  window.location = window.location.href;
                }, 1e3));
          a.utilities.default.updateView.call(b, c, e, d, k);
        })
        .error(function (e, h) {
          (d.evi && h.status == d.evi) || "409" == h.status
            ? "true" == b.attr("overlay")
              ? a.utilities.default.authOverlay(b, d, c, e)
              : (a.utilities.default.signinbasic.call(b, k, d),
                a.utilities.default.updateView.call(b, c, e, d, k))
            : d.ldrt && "false" != a.anConstants.touch
            ? f && d.ldrt && a("#vldr-" + d.ldrt).remove()
            : d.ldr
            ? a(d.ldr).hide()
            : a.utilities.default.loader(!1);
        });
    },
    accordion: function (c, d) {
      var b = this;
      if (b.hasClass("open") && !d.open)
        b.removeClass("open"),
          d.con ? a(d.con).hide() : b.next().hide(),
          d.save && b.attr("an-call", " ");
      else {
        if (!b.hasClass("ANretry")) {
          var e;
          d.cls && (e = b.parents("accd", !0)[0] || b.parent());
          d.con
            ? (d.cls &&
                (d.clsc && a(d.clsc).hide(),
                a(".open", e)[0] &&
                  (a(".open", e).hasClass("has-sub") ||
                    a(".open", e).hasClass("tab")) &&
                  a(".open", e).removeClass("open")),
              b.addClass("open"),
              a(d.con).show())
            : (d.cls &&
                a(".open", e)[0] &&
                (a(".open", e).hasClass("has-sub") ||
                  a(".open", e).hasClass("tab")) &&
                a(".open", e)
                  .removeClass("open")
                  .each(function () {
                    a(this).next().hide();
                  }),
              b.addClass("open").next().show());
        }
        var h, g;
        d.ldr && ((h = a(d.ldr)), (g = !0));
        if (d.call)
          d.nld || a.utilities.default.loader(!0, h, g),
            a
              .xhr()
              .get(d.api)
              .success(function (e) {
                b.hasClass("ANretry") ||
                  ((d.con = d.con || "next"),
                  a.utilities.default.updateView.call(b, c, e, d, h, !0));
                if (d.scrl) {
                  e = a(d.con)[0];
                  var g = d.scrlc ? a(d.scrlc)[0] : !1,
                    k = d.shk ? a(d.shk)[0] : !1,
                    f = d.focus ? a(d.focus)[0] : !1;
                  a.utilities.default.st(
                    !1,
                    !1,
                    e,
                    !1,
                    10,
                    !1,
                    10,
                    g,
                    !0,
                    k,
                    f
                  );
                }
              })
              .error(function (c) {
                a.utilities.default.loader(!1, h, g);
                b.hasClass("ANretry") ||
                  d.open ||
                  (b.removeClass("open"),
                  d.con ? a(d.con).hide() : b.next().hide());
              });
        else {
          d.sp && a.utilities.default.updateLayout.call(b, c, d, !0);
          if (d.scrl) {
            e = a(d.con)[0];
            var k = d.scrlc ? a(d.scrlc)[0] : !1,
              f = d.shk ? a(d.shk)[0] : !1,
              m = d.focus ? a(d.focus)[0] : !1;
            a.utilities.default.st(!1, !1, e, !1, 10, !1, 10, k, !0, f, m);
          }
          d.href = d.href || "";
          a.utilities.default.pushReplaceView(d.vi, d.href, h, !0);
        }
      }
    },
    backgroundLayer: function (c, d) {
      d
        ? (a("#" + c).remove(),
          a("#" + c + "T").ie(a("#" + c + "T").html(), !0))
        : (a("#" + c)
            .removeClass("fadeIn")
            .addClass("fadeOut"),
          setTimeout(function () {
            a("#" + c).remove();
          }, 200));
    },
    updateLayout: function (c, d, b) {
      c = d || a.utilities.default.anAttr(this);
      d =
        a.anConstants && a.anConstants.pageName
          ? a.anConstants.pageName.toString()
          : "";
      "true" == c.sp
        ? (a.log.event(
            { name: c.spdata + "OpenClick" },
            { type: d, id: "", extra: "" },
            {}
          ),
          a.utilities.default.backgroundLayer(c.spdata + "BG", !0),
          a("#" + c.spdata)
            .removeClass(c.trns)
            .addClass("trns0"),
          "srch" == c.spdata && a(".srcInpu")[0].focus(),
          "menu" == c.spdata &&
            a.anConstants.navData &&
            (a("#nav").html(a.anConstants.navData),
            (a.anConstants.navData = null)),
          b || a.utilities.default.pushReplaceView(c.vi, !1, !1, !0),
          a.utilities.lazyLoad.init({ image: !0 }))
        : (a("#" + c.spdata)
            .removeClass("trns0")
            .addClass(c.trns),
          "srch" == c.spdata && a(".srcInpu")[0].blur(),
          a.utilities.default.backgroundLayer(c.spdata + "BG", !1));
      a("#vSt").attr("data-" + c.spdata, c.sp);
    },
    pagination: function (c, d) {
      var b = this,
        e = d || a.utilities.default.anAttr(b);
      a(".lmaI", b[0]).show();
      if (e.qry && ("true" == b.attr("an-ok") || b.hasClass("ANretry"))) {
        var h = b.attr("an-ok", "false").attr("data-pgn");
        a.xhr()
          .get(e.qry, !1, !1, h)
          .success(function (d, h) {
            b.hide();
            if (e.part) {
              a(e.con).ie(d, 1);
              var f = "";
              a(".an-js-part")
                .each(function () {
                  f += a(this).html();
                })
                .remove();
              a(e.con).length && a.view.blobScripts(f);
            } else (e.con = e.con || ".conW"), (e.noViewPush = !0), a(e.con).length && a.utilities.default.updateView.call(b, c, d, e);
            b.remove();
          })
          .error(function (d, h) {
            if ((e.evi && h.status == e.evi) || "409" == h.status)
              b.hide(), a.utilities.default.authOverlay(b, e, c, d), b.remove();
            b && b.attr("an-ok", "true");
          });
      }
    },
    updateView: function (c, d, b, e, h) {
      b = b || a.utilities.default.anAttr(this);
      var g,
        k =
          a.anConstants && a.anConstants.pageName
            ? a.anConstants.pageName.toString()
            : "";
      if (b.sel) {
        b.selCls && (g = b.selCls);
        var f = a(this).attr("id") || "";
        a.log.event(
          { name: "selectTabUpdateView" },
          { type: f, id: k, extra: g },
          {}
        );
        a.utilities.default.tabSelection.call(this, c, b, g);
      }
      b.nav && a.utilities.default.resetCategoryNavigation();
      b.xsrl || a.utilities.default.scrollDOM();
      b.iscrl &&
        a.view.internalScroll &&
        0 < a(b.iscrl).length &&
        ((a(b.iscrl)[0].scrollTop = a.view.internalScroll),
        (a.view.internalScroll = !1));
      g = "";
      0 < a(".htextt").length && (g = a(".htextt").html());
      a.utilities.default.updateDOM.call(
        this,
        c,
        d,
        b.con ? ("next" == b.con ? this.next() : a(b.con)) : a(".an-main"),
        b.rplc || !1,
        b.pre || !1
      );
      0 < a(".htextt").length &&
        "" === a(".htextt").html().trim() &&
        a(".htextt").html(g);
      a.utilities.lazyLoad.init({
        image: !0,
        pagination: !0,
        video: !0,
        ads: !0,
      });
      b.noViewPush || a.utilities.default.pushReplaceView(b.vi, b.href, e, h);
      a.anConstants.eview = !1;
    },
    scrollDOM: function (c) {
      "true" == a.anConstants.touch
        ? ((document.documentElement.scrollTop = c || 1),
          document.documentElement.scrollTop ||
            (document.body.scrollTop = c || 1))
        : a(".AN-scrlEle")[0]
        ? (a(".AN-scrlEle")[0].scrollTop = c || 1)
        : 0 < a(".conn").length && (a(".conn")[0].scrollTop = c || 1);
    },
    updateDOM: function (c, d, b, e, h) {
      c = this == a ? !1 : this.attr("data-obj");
      d &&
        ((this[0] && 0 < this.parent().length) || !c) &&
        (e
          ? (b.html(d),
            (e = b.length
              ? b.hasClass("an-main") ||
                b.hasClass("conn") ||
                b.hasClass("conW")
                ? !0
                : !1
              : !1),
            e &&
              (a("html").removeClass("oH").addClass("oA"),
              a("#btmsheet_ctr").html("")))
          : b.ie(d, h));
      a("form[name='gokwik']").length &&
        (a(".flcn-frame-active").removeClass("flcn-frame-active"),
        a("#iOSViewPort").remove(),
        a("form[name='gokwik']").remove());
      d && a(".ANretry", b[0])[0] && c
        ? a(".ANretry", b[0])
            .attr("data-obj", c)
            .attr("onclick", "$$.click(this,event)")
            .attr("data-href", this.attr("data-href") || " ")
            .attr("href", this.attr("href") || " ")
        : a.view.evalScripts();
    },
    anAttr: function (c) {
      var d = c.attr("data-obj"),
        b = a.event.eventObjects[d] || a.parseJSON(d) || {},
        d = b.save || !1,
        e = b.cls || !1,
        h = b.clsc || !1,
        g = b.open || !1,
        k = b.call || !1,
        f = b.act || !1,
        m = b.href || c.attr("href") || c.attr("data-href") || !1,
        q = b.qry || !1,
        p = b.ohref || !1,
        r = b.phref || !1,
        n = b.imp || !1,
        t = b.trns || !1,
        w = b.con || !1,
        v = b.rplc || !1,
        z = b.nav || !1,
        x = b.url || !1,
        E = b.vi || !1,
        F = b.evi || !1,
        G = b.nld || !1,
        H = b.ldr || !1,
        I = b.ldrt || !1,
        J = b.ildr || !1,
        K = b.iscrl || !1,
        B = b.inter || !1,
        L = b.post || !1,
        M = b.data || c[0].value || !1,
        N = b.spdata || !1,
        O = b.hdr || !1,
        P = b.chg || !1,
        Q = b.sp || !1,
        R = b.scrl || !1,
        S = b.scrlc || !1,
        T = b.nscrl || !1,
        U = b.shk || !1,
        V = b.sel || !1,
        W = b.selCls || !1,
        X = b.click || !1,
        Y = b.input || !1,
        Z = b.touchend || !1,
        aa = b.mouseup || !1,
        ba = b.focus || !1,
        ca = b.keyup || !1,
        da = b.load || !1,
        ea = b.change || !1,
        fa = b.blur || !1,
        ga = b.go || !1,
        ha = b.tr || !1,
        ia = b.vf || !1,
        ja = b.ut || "default",
        C = !1,
        D = b.vdo || !1,
        ka = b.part || !1,
        la = b.pre || !1,
        ma = b.hdcon || !1,
        na = b.sticky || !1,
        u = "",
        A = "",
        y = "",
        oa = b.log || !1,
        b = b.scrollStop || !1;
      m
        ? (-1 < m.indexOf("?")
            ? ((A = m.split("?")[0]),
              (y = m.split("?")[1]),
              -1 < y.indexOf("#")
                ? (u = A + "?" + y.split("#")[0] + "&" + y.split("#")[1])
                : y && (u = A + "?" + y))
            : -1 < m.indexOf("#") &&
              (u = m.split("#")[0] + "?" + m.split("#")[1]),
          u ? (m = u) : (u = m),
          x && (m = ""),
          (u = -1 == u.indexOf("?") ? u + "?ajax=true" : u + "&ajax=true"),
          B && (u += "&inter=true"),
          D && (u += "&vdo=true"),
          a.anConstants.forceTouch &&
            -1 == u.indexOf("is_touch=true") &&
            (u += "&is_touch=true"))
        : p && ((u = a(p).attr("an-qry")), r && (u += r));
      P && (C = c[0].value);
      return {
        save: d,
        cls: e,
        clsc: h,
        open: g,
        call: k,
        act: f,
        href: m,
        qry: q,
        imp: n,
        trns: t,
        con: w,
        rplc: v,
        kurl: x,
        vi: E,
        evi: F,
        nld: G,
        ldr: H,
        ldrt: I,
        ildr: J,
        iscrl: K,
        inter: B,
        post: L,
        data: M,
        spdata: N,
        hdr: O,
        sp: Q,
        val: C,
        scrl: R,
        scrlc: S,
        shk: U,
        xsrl: T,
        nav: z,
        sel: V,
        selCls: W,
        click: X,
        input: Y,
        touchend: Z,
        mouseup: aa,
        keyup: ca,
        focus: ba,
        load: da,
        change: ea,
        blur: fa,
        ut: ja,
        go: ga,
        tr: ha,
        vdo: D,
        vf: ia,
        pre: la,
        part: ka,
        hdcon: ma,
        sticky: na,
        api: u,
        log: oa,
        stopScrl: b,
      };
    },
    loader: function (c, d, b, e, h, g) {
      g = d || a("#ldr");
      var k = a(".ldrT", g[0]);
      c
        ? (g.removeClass("err"),
          k.length && k.html(e || ""),
          d && b && a(".lmaI", g[0]).html(a(".lmaI", a("#ldr")[0]).html()),
          "in" == c && g.addClass("internal"),
          g.show())
        : (h && (g.addClass("err"), 0 < k.length && k.html("Error !")),
          g.removeClass("internal").hide());
    },
    smoothScrollTimer: !1,
    st: function (c, d, b, e, h, g, k, f, m, q, p) {
      window.clearInterval(a.utilities.default.smoothScrollTimer);
      var r = q || !1,
        n = p || !1;
      b = b || a(".an-srlx", a(c).parent()[0])[0];
      b == window && (b = a(".conW")[0]);
      var t = g || b.getBoundingClientRect().top,
        w = g || Math.abs(t) - 120,
        v = f ? a(f) : !1;
      m && (w = 50 > t ? w + 120 + 240 : w - 240);
      var z = document.documentElement.scrollTop,
        x = 0;
      a.utilities.default.smoothScrollTimer = setInterval(function () {
        var d = b.scrollLeft;
        e
          ? ("l" == e ? (b.scrollLeft -= k) : "r" == e && (b.scrollLeft += k),
            ("l" != e && "r" != e) ||
              d != b.scrollLeft ||
              (a(".o2", a(c).parent()[0]).removeClass("o2"),
              a(c).addClass("o2")),
            "t" == e ? (b.scrollTop -= k) : "b" == e && (b.scrollTop += k))
          : 0 < w &&
            (50 > t
              ? "true" == a.anConstants.touch
                ? v[0]
                  ? (v[0].scrollTop -= k)
                  : ((document.documentElement.scrollTop -= k),
                    document.documentElement.scrollTop ||
                      (document.body.scrollTop -= k))
                : v[0]
                ? (v[0].scrollTop -= k)
                : (a(".conn")[0].scrollTop -= k)
              : "true" == a.anConstants.touch
              ? v[0]
                ? (v[0].scrollTop += k)
                : ((document.documentElement.scrollTop += k),
                  document.documentElement.scrollTop ||
                    (document.body.scrollTop += k))
              : v[0]
              ? (v[0].scrollTop += k)
              : (a(".conn")[0].scrollTop += k));
        x =
          "true" == a.anConstants.touch
            ? v[0]
              ? v[0].scrollTop
              : document.documentElement.scrollTop
            : v[0]
            ? v[0].scrollTop
            : a(".conn")[0].scrollTop;
        if (Math.abs(x - z) >= w || 0 >= x)
          n && a(b)[0].focus(),
            r && a(b).addClass("an-shk"),
            window.clearInterval(a.utilities.default.smoothScrollTimer);
      }, h);
    },
    globalInfo: function (c, d, b) {
      b = b || 3e3;
      c
        ? (a("#err-I").hide(), a("#succ-I").show())
        : (a("#succ-I").hide(), a("#err-I").show());
      a("#an-sucm").html(d);
      a("#an-info").show();
      setTimeout(function () {
        a("#an-info").hide();
      }, b);
    },
    cached: function (c, d) {
      var b = d.con ? a(d.con) : a(".conn");
      d.sp && a.utilities.default.updateLayout.call(this, c, d, !0);
      var e;
      d.ldr && (e = a(d.ldr));
      a.utilities.default.updateDOM.call(
        this,
        c,
        a.cachedInpage[d.data],
        b,
        !0
      );
      a.utilities.lazyLoad.init({
        image: !0,
        pagination: !0,
        video: !0,
        ads: !0,
      });
      a.utilities.default.pushReplaceView(d.vi, d.href, e);
    },
    timeKeeper: function (c, d) {
      c && d && (a.anConstants.timeKeeper[c] = d);
      a.anConstants.timeKeep && clearInterval(a.anConstants.timeKeep);
      a.anConstants.timeKeep = setInterval(function () {
        for (var b in a.anConstants.timeKeeper)
          a.anConstants.timeKeeper.hasOwnProperty(b) &&
            --a.anConstants.timeKeeper[b];
      }, 1e3);
    },
    globalTimer: function (c, d, b) {
      if (!c || (c && 0 == a("#" + c).length)) return !1;
      (function (d, h) {
        function g() {
          var d, e, g, r;
          if (a("#" + c).length) {
            var n;
            n = k.attr("data-time");
            n =
              0 == n.indexOf("timeKeeper")
                ? a.parseInt(a.anConstants.timeKeeper[n.split(",")[1]])
                : a.parseInt(a("#" + c).attr("data-time"));
            h
              ? ((r = Math.floor(n % 60)),
                (g = Math.floor((n % 3600) / 60)),
                (e = Math.floor((n % 86400) / 3600)),
                (d = Math.floor(n / 86400)))
              : ((n -= Date.parse(new Date())),
                (r = Math.floor((n / 1e3) % 60)),
                (g = Math.floor((n / 1e3 / 60) % 60)),
                (e = Math.floor((n / 36e5) % 24)),
                (d = Math.floor(n / 864e5)));
            if (0 >= n) clearInterval(f), k.html(" "), b && b();
            else {
              n = {
                tDay: ("0" + d).slice(-2),
                tHour: ("0" + e).slice(-2),
                tMin: ("0" + g).slice(-2),
                tSec: ("0" + r).slice(-2),
              };
              for (var t in n)
                n.hasOwnProperty(t) &&
                  (a("." + t, k[0]).html(n[t]),
                  1 > n[t] && "tDay" == t && a("." + t + "d", k[0]).hide());
            }
          } else clearInterval(f);
        }
        var k = a("#" + d);
        g();
        var f = setInterval(g, 1e3);
      })(c, d);
    },
    delayPushPerm: function (c, d) {
      a.requestPermission &&
        !a.anConstants.pushPopShown &&
        (a.anConstants.notifDelay && clearTimeout(a.anConstants.notifDelay),
        (a.anConstants.notifDelay = setTimeout(function () {
          a.requestPermission(c || "");
        }, d || 1e4)));
    },
    uiSearch: function (c, d, b) {
      var e, h, g;
      e = this[0].value.toUpperCase();
      c = a(d.con);
      0 < a(".moreDiv", c[0]).length &&
        (a(".moreDiv", c[0]).show(), a(".has-sub", c[0]).hide());
      a(".srchan", c[0]).each(function () {
        g = a(this);
        h = a(".srchann", g[0]);
        b
          ? 0 == h.html().toUpperCase().replace(/&AMP;/g, "&").indexOf(e)
            ? g.show()
            : g.hide()
          : -1 < h.html().toUpperCase().replace(/&AMP;/g, "&").indexOf(e)
          ? g.show()
          : g.hide();
      });
    },
    srchQuery: function (c) {
      if (2 < a(".srcInpu", c[0])[0].value.trim().length) {
        var d =
            "/search/" +
            a(".srcInpu", c[0])[0].value.trim() +
            "/" +
            c.attr("data-urlp"),
          b = a("#__o2o_brand_id").length
            ? a("#__o2o_brand_id").attr("data-brandid") || ""
            : "";
        -1 < c.attr("action").indexOf("voices") &&
          (d = d + "/" + c.attr("data-urlp") + "&voiceSearch=true");
        b && (d = d + "&o2o_brand_id=" + b);
        c.attr("action", d);
      } else return (a(".srcInpu", c[0])[0].value = ""), !1;
    },
    srchSuccess: function (c, d, b, e, h) {
      e.sp && a.utilities.default.updateLayout.call(c, h, e, !0);
      var g = d.attr("action").split("/?ajax")[0];
      d.attr("action", "/search");
      e.href = g;
      a.utilities.default.updateView.call(c, h, b, e);
    },
    removeSearchResults: function (c, d) {
      "search_bar" === d.data
        ? (0 < a("#srchResults").length &&
            a("#srchResults").html('<div class="srchDD bgF fs14 pR"></div>'),
          0 < a("#search_bar .srcInpu").length &&
            (a("#search_bar .srcInpu")[0].value = ""),
          a(".search_bar_ctr")[0] &&
            ((a(".search_bar_ctr")[0].style.position = ""),
            (a(".search_bar_ctr")[0].style.top = "")))
        : a.utilities.default.updateLayout.call(this, c, d);
    },
    searchLR: function (c, d) {
      var b = this,
        e = b.parents("an-searchBox")[0],
        h = a(".srchDD", e),
        g = "search_bar" === d.data,
        k = "",
        f = "",
        m = "",
        q = "",
        p = b[0].value.trim(),
        r = a.sanitizeHTML(p);
      g && 0 < a("#search_bar .srcInpu").length
        ? ((f =
            '<div class="bgF p12">' +
            a("#search_bar .srcInpu").attr("data-required") +
            "</div>"),
          (k =
            '<div onclick="$.click(this,event)" data-obj=\'{"click": "removeSearchResults", "data": "search_bar"}\'  class="bbE srhTp fs14 bg0o hvh100 touch-none">' +
            f +
            "</div>"),
          (q =
            '<div class="bgF p12">' +
            a("#search_bar .srcInpu").attr("data-search") +
            " " +
            r),
          "</div>",
          (m =
            '<div onclick="$.click(this,event)" data-obj=\'{"click": "removeSearchResults", "data": "search_bar"}\'  class="bbE srhTs fs14 bg0o hvh100 touch-none">' +
            q +
            "</div>"))
        : ((f = a(".srcInpu", e).attr("data-required")),
          (k = '<div class="p12 bbE bgF srhTp fs14">' + f + "</div>"),
          (q = a(".srcInpu", e).attr("data-search") + " " + r),
          (m = '<div class="srhTs p12 bbE bgF fs14">' + q + "</div>"));
      a(".srhTv", e)[0] && a(".srhTv", e).hide();
      0 < a(".srhTp", e).length ? a(".srhTp", e).html(f).show() : h.ie(k, !0);
      0 < p.length &&
        a(".search_bar_ctr")[0] &&
        ((a(".search_bar_ctr")[0].style.position = "fixed"),
        (a(".search_bar_ctr")[0].style.top = "48px"));
      2 < p.length &&
        (0 < a(".srhTp", e).length && a(".srhTp", e).hide(),
        0 < a(".srhTs", e).length ? a(".srhTs", e).html(q).show() : h.ie(m, !0),
        (k = a.xhr()),
        (f = a("#__o2o_brand_id").length
          ? a("#__o2o_brand_id").attr("data-brandid") || ""
          : ""),
        (m = b.attr("data-srcid") || ""),
        (r =
          "/search/autocompletefromsolr?q=" +
          r +
          "&src_id=" +
          m +
          "&o2o_brand_id=" +
          f),
        g && (r += "&is_search_bar=true"),
        k.get(r).success(function (g) {
          0 < a(".srhTs", e).length && a(".srhTs", e).hide();
          d.sp && a.utilities.default.updateLayout.call(b, c, d, !0);
          a.utilities.default.updateDOM.call(b, c, g, h, !0);
        }));
    },
    validateForm: function (c, d) {
      var b = "FORM" == this.nodeName ? this : this[0].form || this[0],
        e,
        h;
      h = !0;
      for (
        e = 0;
        e < b.elements.length &&
        ((h = a(b.elements[e])), (h = a.utilities.default.iv.call(h, c, d)), h);
        e++
      );
      return h;
    },
    legacyValidation: function () {
      var a = !0,
        d = this[0].value.trim(),
        b = this.attr("type"),
        b = "checkbox" === b || "radio" === b,
        e = this.attr("required"),
        h = this.attr("minlength"),
        g = this.attr("maxlength"),
        k = this.attr("min"),
        f = this.attr("max"),
        m = this.attr("pattern");
      if (this[0].disabled || !e) return a;
      (a =
        (a = a && ((b && this[0].checked) || (!b && "" !== d))) &&
        (b ||
          ((!h || d.length >= h) &&
            (!g || d.length <= g) &&
            (!k || d >= k) &&
            (!f || d <= f)))) &&
        m &&
        ((m = new RegExp(m)), (a = m.test(d)));
      return a;
    },
    checkIFSC: function (c, d) {
      var b = this,
        e = b[0].value;
      if (a.utilities.default.iv.call(this, c, d))
        a.xhr()
          .get("/myaccount/get_ifsc_details?q=" + e, !1, "j")
          .success(function (c) {
            c.status
              ? (b.addClass("inSuc").removeClass("inErr"), (a.bankIFSC = !0))
              : (b.addClass("inErr").removeClass("inSuc"), (a.bankIFSC = !1));
          })
          .error(function (a) {});
      else return !1;
    },
    iv: function (c, d, b) {
      var e = this[0],
        h = !0;
      b = b || this.attr("data-silc");
      var g = "true" == this.attr("data-no-err-msg");
      if (
        "INPUT" === e.nodeName ||
        "TEXTAREA" === e.nodeName ||
        "SELECT" === e.nodeName
      ) {
        if (this.attr("doextra")) {
          var k = this.attr("doextra").split(",");
          "match" == k[0] && a(k[1])[0].value != e.value && (h = !1);
        } else h = a.utilities.default.legacyValidation.call(this);
        if (h)
          return (
            this.removeClass("inErr").addClass("inSuc"),
            d.vf &&
              ((h = d.vf.split(",")[0]),
              (b = d.vf.split(",")[1] || this.attr("data-ut")),
              (d.vf = !1),
              a.utilities.default.validateForm.call(e.form, c, d, !0) &&
                h &&
                b &&
                a.utilities[b][h].call(e, c, d)),
            !0
          );
        g || this.removeClass("inSuc").addClass("inErr");
        b &&
          ((c = a(d.con)[0] || window),
          (d = d.scrlc ? a(d.scrlc)[0] : !1),
          a.utilities.default.st(!1, !1, c, !1, 10, !1, 4, d, !0),
          a.vo(!1, "Please fill valid values."),
          this.parent().addClass("an-shk"));
        return !1;
      }
    },
    serializeForm: function (c) {
      var d = [];
      if (c && "FORM" == c.nodeName)
        for (var b = c.elements.length, e, h = 0; h < b; h++)
          (e = c.elements[h]),
            e.name &&
              !e.disabled &&
              "file" != e.type &&
              "reset" != e.type &&
              "submit" != e.type &&
              "button" != e.type &&
              (("checkbox" != e.type && "radio" != e.type) || e.checked) &&
              ("checkbox" == e.type &&
                (e.value = "on" == e.value ? "true" : "false"),
              (d[d.length] =
                a.encodeURIComponent(e.name) +
                "=" +
                a.encodeURIComponent(e.value)));
      return d.join("&").replace(/%20/g, "+");
    },
    submitForm: function (c, d) {
      var b = this,
        e = a(this[0].form || this.parents("subForm")),
        h,
        g = d.data,
        k = e.attr("method") || "post",
        f = a(b).attr("toast-msg");
      "helpdesk" == g &&
        (a("#oridlb", e[0]).attr("required", " "),
        0 <= ["Cancellation"].indexOf(a("#cancelOpt")[0].value) &&
          a("#oridlb", e[0]).attr("required", !0));
      if (
        !a.utilities.default.validateForm.call(e, c, d) ||
        ("bankT" == g && !a.bankIFSC)
      )
        return !1;
      a.utilities.default.loader(d.ildr || !0);
      h = a.utilities.default.serializeForm(e[0]);
      "srch" == g && a.utilities.default.srchQuery(e);
      a.xhr()
        [k](e.attr("action"), h)
        .success(function (h) {
          "changeDel" == g || "trackSotp" == g
            ? a.utilities.postOrder.addotp(h)
            : "trackCO" == g
            ? a.utilities.postOrder.trackCO(h)
            : "trackRotp" == g
            ? a.utilities.postOrder.trackRotp(h)
            : (a(".sbErr", e[0])[0] && a(".sbErr", e[0]).hide(),
              a(".sbSuc", e[0])[0] && a(".sbSuc", e[0]).show());
          "helpdesk" == g && a("#mForm")[0] && a("#mForm").hide();
          "srch" == g
            ? a.utilities.default.srchSuccess(b, e, h, d, c)
            : "sotp" == g
            ? a.utilities.otp.sotp(h)
            : "bs409_otp" == g
            ? a.utilities.signnew.bs409_otp(b, h)
            : "bs409_otp_success" == g
            ? a.utilities.signnew.bs409_otp_success(b, "otp")
            : "get_signin_otp" == g || "verify_otp" == g
            ? a.utilities.signnew.get_signin_otp(b, h, f)
            : ("signinnew" != g && "set_password" != g) ||
              a.utilities.signnew.signinsuccessflow(h);
          a.utilities.default.loader(!1);
          "rPass" == g
            ? (a("#emlb")[0].value = "")
            : "uProf" == g && a.utilities.default.resetCategoryNavigation();
        })
        .error(function (h, k) {
          "409" == k.status &&
            ((d.rplc = 1), a.utilities.default.authOverlay(b, d, c, h));
          "sotp" == g
            ? a.utilities.otp.sotpErr()
            : "verify_otp" == g
            ? a.utilities.signnew.verify_otp(h)
            : "409" != k.status &&
              (a(".sbSuc", e[0])[0] && a(".sbSuc", e[0]).hide(),
              a(".sbErr", e[0])[0] && a(".sbErr", e[0]).show());
          a.utilities.default.loader(!1);
        });
    },
    tabSelection: function (c, d, b) {
      c = b || "anSelect";
      var e;
      c.split(":")[1]
        ? (a("." + c.split(":")[1]).length &&
            (e = a("." + c.split(":")[1]).parent()[0]),
          (c = c.split(":")[0]))
        : (e = a("." + c).parent()[0]);
      a("." + c, e).removeClass(c);
      this.addClass(c);
      "true" == a.anConstants.touch &&
        d &&
        d.sticky &&
        ((d = d.sticky.split("-")),
        4 == d.length &&
          !isNaN(parseInt(d[0])) &&
          a(d[1]).length &&
          a(d[2]).length &&
          !isNaN(parseInt(d[3])) &&
          a(d[1])[0].getBoundingClientRect().top == d[0] &&
          document.scrollingElement &&
          (document.scrollingElement.scrollTop =
            document.scrollingElement.scrollTop +
            a(d[2])[0].getBoundingClientRect().top -
            parseInt(d[0]) -
            parseInt(d[3])));
    },
    pushReplaceView: function (c, d, b, e) {
      d = d || !1;
      e && (d = !1);
      c ? a.view.pushView(d, b) : a.view.replaceView(d, b);
    },
    whatsapp: function (c, d) {
      a.worker.init();
      a("#_wal").remove();
      var b = d.data || "",
        e = a.createElement("a"),
        b = this.attr("data-loc")
          ? "( " + window.location.pathname + " )" + b
          : b;
      e.attr(
        "href",
        "https://api.whatsapp.com/send?phone=" +
          (this.attr("data-number") || a.anConstants.whatsapp) +
          "&text=" +
          (b || "")
      )
        .attr("target", "_blank")
        .attr("id", "_wal");
      a("#views").ae(e[0]);
      setTimeout(function () {
        a("#_wal")[0].click();
      }, 10);
    },
    autoFillAddress: function () {
      var c = "location",
        d = ["pnAl", "aaAl", "aaaAl"],
        b = !1;
      if (
        0 < a("#pnAl").length &&
        0 == a("#pnAl")[0].value.length &&
        ("autocomplete" == a("#pnAl").attr("data-type") &&
          ((d = ["pnAl", "pinC", "pinS", "aaAl", "aaaAl"]),
          (c = "autocomplete"),
          (b = !0)),
        !a.anConstants.address &&
          a.readCookie("address") &&
          (a.anConstants.address = a.parseJSON(a.readCookie("address"))),
        a.anConstants.address)
      ) {
        for (var e = 0; e < d.length; e++)
          a.anConstants.address[d[e]] &&
            0 < a("#" + d[e]).length &&
            ((a("#" + d[e])
              .removeClass("inErr")
              .addClass("inSuc")[0].value = a.anConstants.address[d[e]]),
            "pinS" == d[e] &&
              (a.anConstants.stateVal = a.anConstants.address[d[e]]),
            "pinC" == d[e] &&
              (a.anConstants.cityVal = a.anConstants.address[d[e]]),
            "aaaAl" == d[e] &&
              (a.anConstants.addVal = a.anConstants.address[d[e]]),
            "pnAl" == d[e] && b && a("#" + d[e]).addClass("autofill"));
        a.log.event(
          { name: "webLocation" },
          {
            type: "prefilled_" + c,
            id: "address",
            extra: a.stringifyJSON(a.anConstants.address),
          },
          {}
        );
        if (0 < a("#pinC").length && 0 < a("#pinS").length)
          if (a.anConstants.postAddressParams)
            a.utilities.postOrderAddress &&
              a.utilities.postOrderAddress.checkServicability.call(
                a(".cAddpc")
              );
          else {
            var h = a.parseJSON(a("#pnAl").attr("data-obj")) || {};
            a.utilities.checkout &&
              a.utilities.checkout.checkServicability.call(a("#pnAl"), null, h);
          }
        else
          a("#ndayd").length &&
            a.utilities.vip &&
            a.utilities.vip.checkodd.call(a("#pnAl"), null, h);
      }
    },
    decideActionStrip: function (c, d) {
      !1 === c && a.checkQueryParams("qrcode_0") && (c = "qrcode_0");
      if ("qrcode_0" === c)
        if (!a.anConstants.pwa && a.anConstants.deferredPrompt)
          a.log.event(
            { name: "ActionStripShown" },
            { type: "Download Store" },
            { val: d.vendor_id || "", extra: a.utilities.sw.v }
          ),
            a("#vSt").addClass("pwa"),
            a("#seller_store_pwa").length && a("#seller_store_pwa").show();
        else {
          a.log.event(
            { name: "ActionStripShown" },
            { type: "Save Contact" },
            { val: d.vendor_id || "", extra: a.utilities.sw.v }
          );
          var b = a.readCookie("_ruid"),
            e = new URLSearchParams(window.location.search),
            e = e.get("vendor_id"),
            b = "/o2o/contact/issaved?ruid=" + b + "&vendor_id=" + e,
            e = a.xhr();
          e.get(b)
            .success(function (b) {
              b.isSaved ||
                (a("#vSt").addClass("save_contact"),
                a("#seller_store_contact_saved").length &&
                  a("#seller_store_contact_saved").show());
            })
            .error(function (a) {
              console.log(a);
            });
        }
      else
        !a.anConstants.pwa && a.anConstants.deferredPrompt
          ? (a.log.event(
              { name: "ActionStripShown" },
              { type: "Download Store" },
              { val: d.vendor_id || "", extra: a.utilities.sw.v }
            ),
            a("#vSt").addClass("pwa"),
            a("#seller_store_pwa").length && a("#seller_store_pwa").show())
          : (a.log.event(
              { name: "ActionStripShown" },
              { type: "Save Contact" },
              { val: d.vendor_id || "", extra: a.utilities.sw.v }
            ),
            (b = a.readCookie("_ruid")),
            (e = new URLSearchParams(window.location.search)),
            (e = e.get("vendor_id")),
            (b = "/o2o/contact/issaved?ruid=" + b + "&vendor_id=" + e),
            (e = a.xhr()),
            e
              .get(b)
              .success(function (b) {
                b.isSaved ||
                  (a("#vSt").addClass("save_contact"),
                  a("#seller_store_contact_saved").length &&
                    a("#seller_store_contact_saved").show());
              })
              .error(function (a) {
                console.log(a);
              }));
    },
    saveContact: function (c) {
      var d = a.xhr();
      d.get(
        "/o2o/contact/download?firstName=" + c.firstName + "&phone=" + c.phone
      )
        .success(function (b) {
          b = new Blob([b.vcard], { type: "text/vcard;charset=utf-8" });
          b = window.URL.createObjectURL(b);
          var e = document.createElement("a");
          e.href = b;
          e.setAttribute("download", c.firstName + ".vcf");
          document.body.appendChild(e);
          e.click();
          d.get(
            "/o2o/contact/save?ruid=" + c.ruid + "&vendor_id=" + c.vendor_id
          )
            .success(function (b) {
              a("#vSt").removeClass("save_contact");
              a("#seller_store_contact_saved").hide();
            })
            .error(function (a) {
              console.log(a);
            });
        })
        .error(function (a) {
          console.log(a);
        });
    },
    setFbFrame: function (c) {
      (c = c || localStorage.getItem("fbFrame")) &&
        a("#fb-frame-style").html(
          ".fb-frame { background-image: url('" + c + "')"
        );
    },
    removeFbFrame: function () {
      localStorage.removeItem("fbFrame");
      a("#fb-frame-style").html(".fb-frame { background-image: none");
    },
    uploadFbFrame: function (c) {
      if ((c = c.target.files[0])) {
        var d = new FileReader();
        d.onloadend = function () {
          var b = d.result;
          localStorage.setItem("fbFrame", b);
          a.utilities.default.setFbFrame(b);
        };
        d.readAsDataURL(c);
      }
    },
    openOverlay: function (c, d, b) {
      c = a(this);
      b = b || c.attr("data-overlay-id") || c.attr("data-btmsheet-id") || "";
      b = a("#" + b);
      b.length &&
        (b.show(),
        a("html").removeClass("oA").addClass("oH"),
        a.view.pushView());
    },
  };
  a.utilities.default.openBtmsheet = a.utilities.default.openOverlay;
  a.copyText = function (a) {
    navigator.clipboard.writeText(a);
  };
  a.share = function (c, d) {
    var b = a(c),
      e = document.location.href;
    b.attr("data-href")
      ? (e = "https://" + document.location.hostname + b.attr("data-href"))
      : b.attr("data-appShare") && (e = b.attr("data-appShare"));
    if (void 0 === navigator.share) {
      var h = "//www.facebook.com/sharer/sharer.php?u=" + e;
      "true" == a.anConstants.touch && (h = "whatsapp://send?text=" + e);
      window.open(h, "_blank");
    } else {
      var h =
          b.attr("data-href") ||
          b.attr("data-appShare") ||
          document.location.href,
        g = b.attr("data-text") || "Limeroad Share\n",
        b = b.attr("data-title") || document.title;
      try {
        navigator.share({ title: b, text: g, url: h });
      } catch (k) {
        a.utilities.default.loader(!1),
          (h = "//www.facebook.com/sharer/sharer.php?u=" + e),
          "true" == a.anConstants.touch && (h = "whatsapp://send?text=" + e),
          window.open(h, "_blank");
      }
    }
  };
  a.postQuery = function (c, d, b) {
    var e = [],
      h;
    for (h in c)
      if (c.hasOwnProperty(h)) {
        var g;
        g = b && !isNaN(h) ? (d ? d + "[]" : h) : d ? d + "[" + h + "]" : h;
        var k = c[h];
        e.push(
          null !== k && "object" === typeof k
            ? a.postQuery(k, g, b)
            : a.encodeURIComponent(g) + "=" + a.encodeURIComponent(k)
        );
      }
    return e.join("&");
  };
  a.getScript = function (c, d) {
    if (
      -1 != a.anConstants.loadingScripts.indexOf(c.src) ||
      (c.module &&
        c.version &&
        a.utilities[c.module] &&
        a.utilities[c.module].v == c.version)
    )
      return (
        d &&
          c.module &&
          a.utilities[c.module] &&
          a.utilities[c.module].init &&
          a.utilities[c.module].init(),
        !1
      );
    if (d && c.module && a.utilities[c.module] && a.utilities[c.module].init)
      return a.utilities[c.module].init(), !1;
    var b = a.createElement("script");
    b[0].onerror = function () {
      var e = b.attr("data-error");
      if (e) {
        if (3 < a.parseInt(e)) return !1;
        b.attr("data-error", a.parseInt(e) + 1);
      } else b.attr("data-error", "1");
      a.getScript(c, d);
    };
    b[0].onload = function () {
      a.connections(!1);
      d &&
        c.module &&
        a.utilities[c.module] &&
        a.utilities[c.module].init &&
        a.utilities[c.module].init();
      a.anConstants.loadingScripts.splice(
        a.anConstants.loadingScripts.indexOf(c.src),
        1
      );
    };
    b[0].src = c.src;
    a.connections(!0);
    document.body.appendChild(b[0]);
    a.anConstants.loadingScripts.push(c.src);
  };
  a.psuedoStop = function () {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage("abortFetch");
    window.speechSynthesis && window.speechSynthesis.cancel();
    a.worker.image.list = [];
    a.utilities.lazyLoad.image.impressions = [];
    a.anConstants.connectionsCount = 0;
    a.anConstants.trackConnectionsCount = 0;
    a.anConstants.loadingScripts = [];
  };
  a.stop = function () {
    a.worker.track.stop = !0;
    window.stop && window.stop();
    a.psuedoStop();
  };
  a.getPermissionStatus = function (a, d) {
    navigator.permissions
      ? navigator.permissions
          .query({ name: a })
          .then(function (a) {
            d.call(a);
          })
          .catch(function () {
            d.call({});
          })
      : d.call({});
  };
  a.translate = function (c, d) {
    a.readCookie("locale") != c &&
      (a.log.event({ name: "userLanguage" }, { type: d, id: c, extra: "" }, {}),
      a.cookie("locale", c),
      a.cookie("log_locale", "by_choice"),
      a.utilities.default.loader(!0),
      (a.anConstants.letUnload = !0),
      setTimeout(function () {
        a.utilities.default.loader(!1);
        window.location = window.location;
      }, 500));
  };
  a.sanitizeHTML = function (c) {
    var d = a.createElement("div");
    d[0].textContent = c;
    return d.html();
  };
  a.connections = function (c) {
    c
      ? ((a.anConstants.connectionsCount += 1),
        a.worker.track.stop &&
          1 < a.anConstants.connectionsCount &&
          (a.worker.track.stop = !1))
      : --a.anConstants.connectionsCount;
    0 > a.anConstants.connectionsCount && (a.anConstants.connectionsCount = 0);
    a.worker.init();
  };
  a.localStorage = function (c, d, b) {
    if ("undefined" !== typeof localStorage) {
      if (c)
        if (((b = b || "[]"), d)) {
          a.log.event(
            { name: "localStore_" + c },
            { type: d, id: "", extra: "" },
            {}
          );
          var e = a.parseJSON(localStorage[c] || b);
          "{}" == b ? (e = d) : -1 == e.indexOf(d) && e.unshift(d);
          localStorage[c] = a.stringifyJSON(e);
        } else return (e = a.parseJSON(localStorage[c] || b));
    } else return null;
  };
  a.network = function () {
    if ("connection" in navigator) {
      var c = navigator.connection;
      a.anConstants.networkInfo = {
        dl: c.downlink || "",
        et: c.effectiveType || "",
        rtt: c.rtt || "",
      };
      a.anConstants.connections =
        -1 < a.anConstants.networkInfo.et.indexOf("2g")
          ? 4
          : -1 < a.anConstants.networkInfo.et.indexOf("3g")
          ? 8
          : 12;
      c.onchange ||
        (c.onchange = function () {
          a.network();
        });
    }
  };
  a.checkQueryParams = function (a) {
    var d = window.location.href;
    return -1 != d.indexOf("?" + a + "=") || -1 != d.indexOf("&" + a + "=")
      ? !0
      : !1;
  };
  a.doubleclick = function (a, d, b, e) {
    null == a.getAttribute("data-dblclick")
      ? (a.setAttribute("data-dblclick", 1),
        setTimeout(function () {
          1 == a.getAttribute("data-dblclick") && b(a, d);
          a.removeAttribute("data-dblclick");
        }, 200))
      : (a.removeAttribute("data-dblclick"), e(a, d));
  };
  a.setQueryParams = function (a, d) {
    if (!a) return "";
    a.includes("http") ||
      ("/" != a[0] && (a = "/" + a), (a = window.location.origin + a));
    var b = new URL(a);
    if (d && "object" === typeof d)
      for (var e in d)
        d.hasOwnProperty(e) &&
          ("~" == e[0]
            ? b.searchParams.delete(e.split("~")[1])
            : b.searchParams.set(e, d[e]));
    return b.href;
  };
  a.customToast = function (c) {
    if (c && (c.title || c.message)) {
      var d = c.title || "",
        b = c.message || "",
        e = c.type || "info",
        h = c.duration || 3e3;
      c = a("#an-toast-" + (c.position || "bottom"));
      if (c.length) {
        var g = a.createElement("div"),
          k = setTimeout(function () {
            g.remove();
          }, h);
        g[0].onclick = function (a) {
          a.target.closest(".toast__close") && (g.remove(), clearTimeout(k));
        };
        var f = a(
          "#" +
            {
              success: "succ_badge",
              info: "an-info_circle",
              warning: "an-err",
              error: "an-err",
            }[e]
        );
        f[0].style.width = "16px";
        f[0].style.height = "16px";
        f = f[0].outerHTML;
        h = (h / 1e3).toFixed(2);
        g.addClass("toast").addClass("toast--" + e);
        g[0].style.animation =
          "toastSlideInTop ease .3s, toastFadeOut linear 1s " +
          h +
          "s forwards";
        e = a("#an-toast-tmpl");
        e.length &&
          ((e = e.html() || ""),
          (e = e
            .replace(/\${icon}/g, f)
            .replace(/\${title}/g, d)
            .replace(/\${message}/g, b)),
          g.html(e),
          c.html(""),
          c.ae(g[0]));
      }
    }
  };
  var f = { succ: "success", err: "error", info: "info", warn: "warning" };
  a.toast = {};
  Object.keys(f).forEach(function (c) {
    a.toast[c] = function (d, b, e, h) {
      d &&
        a.customToast({
          title: d,
          message: b,
          type: f[c],
          position: e,
          duration: h,
        });
    };
  });
  a.waitForMethod = function (a, d, b, e) {
    if (Array.isArray(a) && 0 != a.length && "function" === typeof d) {
      e = e || 1e3;
      var h = a[0];
      if (void 0 !== h)
        var g = !1,
          f = setInterval(function () {
            a: {
              for (var b = h, m = 1; m < a.length; m++)
                if (void 0 === b[a[m]]) {
                  g = !1;
                  break a;
                } else b = b[a[m]];
              g = !0;
            }
            g ? (d(), clearInterval(f)) : 0 == e ? clearInterval(f) : e--;
          }, b || 100);
    }
  };
  a.debounce = function (a, d) {
    var b;
    d = d || 300;
    return function () {
      var e = arguments;
      clearTimeout(b);
      var h = this;
      b = setTimeout(function () {
        a.apply(h, e);
      }, d);
    };
  };
})(window.alakhNiranjan);
(function (a) {
  a.utilities = a.utilities || {};
  a.utilities.lazyLoad = {
    image: {
      imageStatus: {},
      impressions: [],
      init: function (f, c) {
        var d = a.worker.image.list,
          b = a.utilities.lazyLoad.image.imageStatus,
          e = a.utilities.lazyLoad.image.impressions;
        c = c || a(".an-body")[0];
        a("div .an-ll[data-src]", c).each(function () {
          var c = a(this),
            g = c.inView(),
            k = c.attr("data-src");
          if (g.complete || ("strict" != f && g.partial))
            if (b[k])
              switch (b[k].status) {
                case "loading":
                  break;
                case "loaded":
                case "logged":
                  k !== c.attr("src") && c.attr("src", k);
                  c.attr("data-onload") &&
                    (c.attr("onload", c.attr("data-onload")),
                    c[0].onload.call(c[0]),
                    c.attr("onload", " ").attr("data-onload", " "));
                  g.complete &&
                    -1 === e.indexOf(k) &&
                    (a.log.impression(c), e.push(k), (b[k].status = "logged"));
                  break;
                case "error":
                  if ((g = c.attr("data-error")))
                    if (((g = a.parseInt(g)), 3 < g)) {
                      var l;
                      switch (c.attr("data-ast")) {
                        case "story":
                          c.attr(
                            "src",
                            k
                              .replace(".jpeg", ".png")
                              .replace("_c", "")
                              .replace("_p", "")
                          );
                          l =
                            "/scratchpad/missing_story_images?story_id=" +
                            c.attr("id");
                          break;
                        case "product":
                          c.attr(
                            "src",
                            k.split("/").slice(0, -1).join("/") +
                              "/pri-" +
                              k.split("-")[1].split(".")[0] +
                              ".jpg"
                          );
                          l =
                            "/products/missing_images?uiproduct_id=" +
                            c.attr("id");
                          break;
                        case "scrap":
                          c.attr(
                            "src",
                            k.split("_")[0] + "_" + k.split("_")[1] + ".png"
                          ),
                            (l =
                              "/scratchpad/missing_images?scrap_id=" +
                              c.attr("id"));
                      }
                      l &&
                        a
                          .xhr()
                          .get(l)
                          .success(function () {})
                          .error(function () {});
                      c.attr("data-src", " ");
                      delete b[k];
                    } else {
                      "user" == a(c).attr("data-ast") &&
                        ((k =
                          "https://img1.junaroad.com//assets/images/mobileNotif/img-1680163303252.jpg"),
                        a(c)
                          .attr("data-src", k)
                          .attr("src", k)
                          .removeClass("an-ll o0"));
                      if (
                        c &&
                        a(c).attr("data-src") &&
                        ((k = a(c).attr("data-src").split(".")),
                        0 < k[0].indexOf("img"))
                      ) {
                        switch (k[0].split("img")[1]) {
                          case "3":
                            k[0] = "//img2";
                            break;
                          case "2":
                            k[0] = "//img1";
                            break;
                          case "1":
                            k[0] = "//img0";
                            break;
                          case "0":
                            k[0] = "//img3";
                        }
                        k[1] && "limeroad" == k[1] && (k[1] = "junaroad");
                        a(c).attr("src") && a(c).attr("src", k.join("."));
                        a(c).attr("data-src") &&
                          a(c).attr("data-src", k.join("."));
                      }
                      c.attr("data-error", g + 1);
                    }
                  else if ("story" == a(c).attr("data-nupCard")) {
                    if (!a(c).attr("onerror-done")) {
                      var m = a(c),
                        q = m.attr("data-src"),
                        c = m.attr("id");
                      m.attr("onerror-done", "true");
                      a.xhr()
                        .get("/missing_story_v3_image?story_id=" + c)
                        .success(function (a) {
                          m.attr("src", q).attr("onerror", "");
                        });
                    }
                  } else
                    "user" == a(c).attr("data-ast") &&
                      ((k =
                        "https://img1.junaroad.com//assets/images/mobileNotif/img-1680163303252.jpg"),
                      a(c).attr("data-src", k)),
                      c.attr("data-error", "1");
                  break;
                default:
                  delete b[k];
              }
            else
              (c = d.indexOf(k)),
                -1 === c && d.push(k),
                0 < c &&
                  g.complete &&
                  "strict" != f &&
                  d.unshift(a.parseJSON(a.stringifyJSON(d.splice(c, 1)[0])));
        });
        a.worker.init();
      },
    },
    pagination: {
      init: function (f, c) {
        a(".an-lma", c).each(function () {
          var c = a(this),
            b = a(this).inView();
          (("strict" != f && b.partial) || b.complete) &&
            a.utilities.default.pagination.call(c);
        });
      },
    },
    video: {
      init: function (f, c) {
        a(".an-vdo", c).each(function () {
          var c = a(this),
            b = this.id.split("_con")[0];
          (a.anConstants.autoplayVDO || a.anConstants.gestureVDO) &&
          0 < a("#" + b).length &&
          "undefined" != typeof window["player-" + b]
            ? c.inView().complete
              ? "function" == typeof window["player-" + b].playVideo &&
                window["player-" + b].playVideo()
              : "function" == typeof window["player-" + b].pauseVideo &&
                (a("#" + b + "_overlay")
                  .removeClass("tyte")
                  .removeClass("o0"),
                window["player-" + b].pauseVideo())
            : 0 < a("#" + b).length &&
              "undefined" != typeof a.utilities.videoHls &&
              a("#" + b).hasClass("cloudinary") &&
              (a("#" + b).hasClass("is-rail-vdo") &&
              c.inView(10, 1, null, a.anConstants.deviceWidth).custom
                ? a("#" + b)[0].paused && a.utilities.videoHls.play(b, !0)
                : !a("#" + b).hasClass("is-rail-vdo") &&
                  a("#" + b).inView().complete
                ? a("#" + b)[0].paused && a.utilities.videoHls.play(b, !0)
                : a("#" + b)[0].paused || a.utilities.videoHls.pause(b, !0));
        });
        "undefined" != typeof a.utilities.videoHls &&
          a.utilities.videoHls.destroy &&
          a.utilities.videoHls.destroy();
      },
    },
    ads: {
      init: function (f, c) {
        a(".an-ad", c).each(function () {
          var c = a(this),
            b = a("iframe", c[0])[0];
          b && -1 < b.id.indexOf("google_ads_iframe") && c.attr("loaded")
            ? a(b).inView().complete
              ? b.contentWindow.postMessage("play", "*")
              : b.contentWindow.postMessage("pause", "*")
            : c.inView().complete &&
              (a.utilities.ads
                ? a.utilities.ads.removeAds(c.attr("id"))
                : c.remove());
        });
      },
    },
    init: function (f) {
      if (f) {
        var c = f.parent || a(".an-body")[0];
        f.image && a.utilities.lazyLoad.image.init(f.image, c);
        f.pagination && a.utilities.lazyLoad.pagination.init(f.pagination, c);
        f.video &&
          (a.utilities.video || a.utilities.videoHls) &&
          a.utilities.lazyLoad.video.init(f.video, c);
        f.ads && a.utilities.lazyLoad.ads.init(f.ads, c);
      }
    },
  };
})(window.alakhNiranjan);
(function (a) {
  function f() {
    return {
      sc: a.anConstants.app ? "a" : "true" == a.anConstants.touch ? "m" : "d",
      md: a.anConstants.env_mode,
      sess: a.anConstants.session_id,
      src: a.anConstants.utm_object.utm_source,
      med: a.anConstants.utm_object.utm_medium,
      camp: a.anConstants.utm_object.utm_campaign,
      network_type: a.stringifyJSON(a.anConstants.networkInfo),
    };
  }
  function c(b, c) {
    b.db = {};
    b.db.type = "user";
    a.anConstants && a.anConstants.Useruuid
      ? ((b.db.user_type = "uuid"), (b.db.id = a.anConstants.Useruuid))
      : ((b.db.user_type = "ruid"), (b.db.id = a.readCookie("_ruid")));
    b.db.ruid = a.readCookie("_ruid");
    b.ts = c;
    return b;
  }
  function d(d, h, g, f, l) {
    l = {};
    l.name = d.name;
    "feed" != d.dest &&
      (l.dest = "" === d.dest || void 0 === d.dest ? "dw" : d.dest);
    h && (l.do = h);
    g && (l.df = g);
    d.cat && (l.cat = d.cat);
    d.ev_val && (l.val = d.ev_val);
    d.ev_val_int && (l.val_int = d.ev_val_int);
    if ("perf" == d.cat || "impr" == d.cat) l.defer_event = !f;
    a.log.new_tr || b();
    d = a.anConstants.date;
    h = !0;
    l.defer_event ? delete l.defer_event : (h = !1);
    a.log.new_tr.ev.push(c(l, d()));
    if (!h || 1700 < a.stringifyJSON(a.log.new_tr).length) {
      for (l = a.log.new_tr.ev; 0 < l.length; ) {
        delete a.log.new_tr.ev;
        for (
          a.log.new_tr.ev = [];
          0 < l.length && 1700 > a.stringifyJSON(a.log.new_tr).length;

        )
          a.log.new_tr.ev.push(l.shift());
        a.worker.track.list.push(
          a.anConstants.log_url +
            a.encodeURIComponent(a.stringifyJSON(a.log.new_tr)) +
            "?q=" +
            Math.floor(1e5 * Math.random() + 1)
        );
      }
      b();
    }
  }
  function b() {
    var b = a.anConstants.date;
    a.log.new_tr = new f();
    a.log.new_tr.ts = b();
    a.log.new_tr.ev = [];
  }
  a.utilities.impression = {
    init: function (b, c) {
      b = b || a(".an-body")[0];
      a(".log-impression", b).each(function () {
        var b = a(this),
          c = b.inView(),
          d = "true" == b.attr("data-logged"),
          e = b.attr("data-impression"),
          f;
        e && (f = a.parseJSON(e));
        c.complete &&
          !d &&
          (b.attr("data-logged", "true"), a.log.impression(b, f));
      });
      a.worker.init();
    },
  };
  a.log = {
    impression: function (b, c) {
      if (c && c.attr) (c.attr.cat = "impr"), d(c.attr, c.do, c.df, !0, b);
      else if ((b[0].id && "" != b[0].id) || b.attr("data-doid")) {
        var f = b[0].id,
          k = b.attr("data-doid") || "",
          l = b.attr("data-doval") || "",
          m = b.attr("data-doextra") || "",
          q = b.attr("data-dftype") || "page",
          p = b.attr("data-dfid") || "listing",
          r = b.attr("data-dfextra") || b.attr("data-df") || "",
          n = b.attr("data-dfval") || "",
          t;
        t = "product_id".replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        t = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(window.location.search);
        t = null === t ? null : a.decodeURIComponent(t[1].replace(/\+/g, " "));
        var w = b.attr("data-dotype") || b.attr("data-ast") || "product";
        t = !k && t ? t.split(",") : [];
        l = { type: w, id: k ? k : f, extra: m, val: l };
        q = { type: q, id: p, extra: r, val: n };
        -1 < t.indexOf(f) && (l.extra += "fixed-");
        if ((f = b.attr("data-count") || "")) l.extra += "posi" + f;
        d({ name: "impression", cat: "impr" }, l, q, !!k, b);
      }
    },
    event: function (a, b, c) {
      try {
        a && d(a, b, c, !0);
      } catch (f) {}
    },
  };
})(window.alakhNiranjan);
(function (a) {
  a.worker = {
    init: function () {
      0 < a.anConstants.connections - a.anConstants.connectionsCount &&
        (0 < a.worker.image.list.length
          ? a.worker.image.work(
              a.worker.image.list.splice(
                0,
                a.anConstants.connections - a.anConstants.connectionsCount
              )
            )
          : 0 === a.anConstants.connectionsCount &&
            !a.worker.track.stop &&
            0 <
              a.anConstants.connections - a.anConstants.trackConnectionsCount &&
            0 < a.worker.track.list.length &&
            a.worker.track.work(
              a.worker.track.list.splice(
                0,
                a.anConstants.connections - a.anConstants.trackConnectionsCount
              )
            ));
    },
    track: {
      connections: function (f) {
        f
          ? (a.anConstants.trackConnectionsCount += 1)
          : --a.anConstants.trackConnectionsCount;
        0 > a.anConstants.trackConnectionsCount &&
          (a.anConstants.trackConnectionsCount = 0);
        a.worker.init();
      },
      list: a.anConstants.trackList || [],
      work: function (f) {
        f.forEach(function (c) {
          if (c) {
            var d = a.createElement("img");
            d[0].onload = function () {
              a.worker.track.connections(!1);
            };
            d[0].onerror = function () {
              a.worker.track.list.unshift(c);
              a.worker.track.connections(!1);
            };
            d.attr("src", c);
            a.worker.track.connections(!0);
          }
        });
      },
    },
    image: {
      list: a.anConstants.imageList || [],
      work: function (f) {
        f.forEach(function (c) {
          if (c) {
            var d = a('div [data-src="' + c + '"]');
            if (0 < d.length) {
              var b = a.utilities.lazyLoad.image.imageStatus,
                e = a.utilities.lazyLoad.image.impressions;
              b[c] = b[c] || {};
              var f = a.anConstants.date();
              d.each(function () {
                var d = a(this);
                d[0].onload = function () {
                  var d = a(this);
                  d.inView().complete &&
                    (a.log.impression(d),
                    -1 === e.indexOf(c) && e.push(c),
                    b && b[c] && (b[c].status = "logged"));
                  d.attr("data-onload") &&
                    (d.attr("onload", d.attr("data-onload")),
                    d[0].onload.call(this),
                    d.attr("onload", " ").attr("data-onload", " "));
                  d = a.anConstants.date() - f;
                  a.log.event(
                    { name: "imageLoadTime", cat: "perf", ev_val_int: d },
                    { id: c },
                    { type: "image" }
                  );
                  b[c] && ((b[c].loadTime = d), (b[c].status = "loaded"));
                  a.connections(!1);
                };
                d[0].onerror = function () {
                  a(this)[0].onerror = null;
                  b[c].status = "error";
                  a.connections(!1);
                };
                d.attr("loading", "eager").attr("src", c);
                b[c].status = "loading";
                a.connections(!0);
              });
            }
          }
        });
      },
    },
  };
})(window.alakhNiranjan);
(function (a) {
  function f() {
    window.addEventListener("DOMContentLoaded", function () {
      c();
    });
    window.addEventListener("load", function () {
      a.view.init();
    });
  }
  function c(c) {
    a.svg();
    a.view.setMagicView();
    a.view.setBasic();
    c &&
      window.addEventListener("load", function () {
        a.view.init();
      });
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator && !0 === window.navigator.standalone)
    )
      (a.anConstants.pwa = !0),
        a.anConstants.defferedTrackList.push([
          { name: "PWAlaunched" },
          { type: "", id: "", extra: "" },
          { type: "", id: "", extra: "" },
        ]);
    window.performance &&
      (c = window.performance.timing) &&
      c.domContentLoadedEventEnd &&
      c.navigationStart &&
      a.anConstants.defferedTrackList.push([
        {
          name: "loadHTML",
          cat: "perf",
          ev_val_int: c.domContentLoadedEventEnd - c.navigationStart,
        },
        {
          id: a.encodeURIComponent(location.href.split("?")[0]),
          extra: a.encodeURIComponent(location.href.split("?")[1] || ""),
        },
        { type: "", id: "", extra: "" },
      ]);
  }
  "loading" == document.readyState
    ? f()
    : "complete" == document.readyState
    ? (c(), a.view.init())
    : c(!0);
})(window.alakhNiranjan);
