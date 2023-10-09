/*
  Copyright (c) 2018 limeroad <https://www.limeroad.com>
 @version    3.0 Stable
*/
(function (a) {
  a.utilities = a.utilities || {};
  a.utilities.newu = {
    v: "0.0.3",
    a: function (d) {
      var b = this.attr("data-a"),
        c = this.attr("data-b");
      d = this.hasClass("rngsldr");
      "top_level" == b ||
        d ||
        (a("span", this.parent()[0]).removeClass("cF bgL").addClass("c9 bgF"),
        a("span", this[0]).addClass("cF bgL").removeClass("c9 bgF"));
      "top_level" == b
        ? (a.anConstants.kyc.occasion && delete a.anConstants.kyc.occasion,
          a.anConstants.kyc.price && delete a.anConstants.kyc.price,
          a.utilities.default.resetCategoryNavigation())
        : "occasion" == b &&
          "true" == a.anConstants.touch &&
          (a.utilities.newu._sp(this, c),
          a.anConstants.kyc.price && delete a.anConstants.kyc.price);
      a.anConstants.kyc[b] = c;
      b = "/shopping_assistance";
      c = 0;
      if (a.anConstants.kyc.top_level)
        if (
          ((b = b + "/?top_level=" + a.anConstants.kyc.top_level),
          a.anConstants.kyc.occasion)
        ) {
          b = b + "&occasion=" + a.anConstants.kyc.occasion;
          if (a.anConstants.kyc.price || d)
            return a.utilities.newu._go(this, void 0, d), !1;
          if ("true" == a.anConstants.touch)
            a("#m, #w, #g").hide(),
              a.utilities.newu._sp(this, a.anConstants.kyc.occasion);
          else {
            a.utilities.newu._go(this);
            return;
          }
        } else
          a("#g").hide(),
            a(".nupprice").hide(),
            "Women" == a.anConstants.kyc.top_level
              ? (a("#m").hide(), a("#w").show())
              : (a("#w").hide(), a("#m").show());
      else
        for (a("#m, #w").hide(), a("#g").show(), c = 8; 21 > c; c++)
          a("#p" + c).hide();
      a.anConstants.kyc.price ||
        (a.utilities.default.scrollDOM(),
        a.view.evalScripts(),
        a.view.pushView(b));
    },
    _sp: function (d, b) {
      var c = a("#" + b).show();
      a(".occ", c[0])[0] && a(".occ", c[0]).html(d.html());
    },
    _go: function (d, b, c) {
      var e = "/kyc/?noPer=1";
      if (void 0 === b || 0 === a.parseInt(b)) b = 0;
      a.anConstants.ad_id && (e = e + "&ad_id=" + a.anConstants.ad_id);
      if (a.anConstants.kyc.top_level)
        if (
          ((e =
            e +
            "&top_level=" +
            a.anConstants.kyc.top_level.replace(/['"]+/g, "")),
          (a.anConstants.kyc.price || c) && a.anConstants.kyc.occasion)
        )
          (e =
            e +
            "&occasion=" +
            a.anConstants.kyc.occasion.replace(/['"]+/g, "")),
            (e = e + "&price=" + a.anConstants.kyc.price.replace(/['"]+/g, ""));
        else {
          var g = d.attr("data-b"),
            e = e + "&occasion=" + g + "&price=0";
          a.anConstants.kyc.occasion = g;
          a.anConstants.kyc.price = "0";
        }
      e = e + "&page=" + b;
      a.utilities.default.loader("in");
      a.xhr()
        .get(e + "&ajax=true")
        .success(function (b) {
          var g = a.utilities.default.anAttr(d);
          "false" == a.anConstants.touch &&
            a.utilities.default.updateLayout.call(d, null, null, !0);
          g.href = e;
          a.utilities.default.updateView.call(d, null, b, g);
          c &&
            ((b = a(".priceRange", c[0])),
            (b[0].disabled = !1),
            (b[1].disabled = !1),
            a.view.replaceView());
        })
        .error(function () {
          a.utilities.default.loader(!1);
          if (c) {
            var b = a(".priceRange", c[0]);
            b[0].disabled = !1;
            b[1].disabled = !1;
          }
        });
    },
    prsl: function (d) {
      d = a(".rngsldr")[0];
      for (
        var b = a(".priceRange", d),
          c = a(".cnctn", d)[0],
          e = a(".rngVal", d)[0],
          g = a(".rngVal", d)[1],
          h = a.parseInt(b[0].max),
          l = "false" == a(d).attr("data-ready"),
          k = 0,
          f = [];
        2 > k;
        k++
      )
        f.push(a.parseInt(b[k].value)),
          l && (b[k].value = a.anConstants.kyc.price.split("__")[k]);
      if (l) return !1;
      this.addClass("rngfc");
      if (300 > Math.abs(f[0] - f[1]) || f[0] > f[1])
        "thumb1" == this.attr("data-thumb")
          ? ((b[0].value = f[1] - 200), (b[1].value = f[1]))
          : ((b[0].value = f[0]), (b[1].value = f[0] + 200));
      c.style.left = "calc(" + (f[0] / h) * 100 + "% - 10px)";
      c.style.right = "calc(" + (100 - (f[1] / h) * 100) + "% + 10px)";
      e.value = "\u20b9" + b[0].value;
      g.value = "\u20b9" + b[1].value;
      a(d).attr("data-b", b[0].value + "__" + b[1].value);
    },
    prsled: function (d) {
      var b = a(".rngsldr")[0];
      a(b).attr("data-b") || a(b).attr("data-b", a.anConstants.kyc.price);
      this.removeClass("rngfc");
      if ("false" == a(b).attr("data-ready")) return !1;
      a.utilities.default.loader("in");
      a(b).attr("data-ready", "false");
      this[0].disabled = !0;
      a.utilities.newu.a.call(a(b), d);
    },
    selectFacet: function (d, b, c, e) {
      var g = document.getElementById(c),
        h = g.querySelector(".wsN");
      c = h.offsetHeight;
      g.style.minHeight = c + "px";
      h.style.display = "none";
      e = document.getElementById(e);
      e.style.display = "block";
      e.style.top = c / 2 + "px";
      d = a(d);
      e = document.querySelectorAll(".shaking-div");
      for (c = 0; c < e.length; c++) e[c].classList.remove("shaking-div");
      (b = document.getElementById(b).querySelector(".bd2L")) &&
        b.classList.remove("bd2L");
      d.addClass("bd2L");
    },
  };
})(window.alakhNiranjan);
