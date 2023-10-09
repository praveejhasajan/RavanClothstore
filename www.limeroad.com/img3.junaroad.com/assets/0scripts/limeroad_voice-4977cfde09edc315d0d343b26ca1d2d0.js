/*
  Copyright (c) 2018 limeroad <https://www.limeroad.com>
 @version    3.0 Stable
*/
(function (a) {
  a.utilities = a.utilities || {};
  a.utilities.voice = {
    v: "0.0.6",
    event: void 0,
    active: void 0,
    lang: function () {
      var a;
      return (a = "en-IN");
    },
    stopMic: function () {
      a.anConstants.recog && a.anConstants.recog.stop();
    },
    startMic: function (m, h) {
      var k = this.parents("an-searchBox")[0],
        l = h.data.split(",")[0],
        d = h.data.split(",")[1],
        b = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition)();
      a.anConstants.recog = b;
      b.lang = a.utilities.voice.lang();
      b.continuous = !0;
      d && (b.continuous = !1);
      b.interimResults = !0;
      b.start();
      a("#vstxt").html(a("#vstxt").attr("data-ready"));
      a("#srhTv").show("table");
      b.onstart = function () {
        a("#vSrchc").addClass("cL");
        a("#vstxt").html(a("#vstxt").attr("data-listen"));
      };
      b.onend = function () {
        a("#vSrchc").removeClass("cL");
        a("#srhTv").hide();
        a("#vstxt").html(" ");
        b.stop();
      };
      b.onerror = function () {
        b.onend();
        b.stop();
      };
      b.onresult = function (f) {
        for (var e = "", d = "", g = f.resultIndex; g < f.results.length; ++g)
          if (f.results[g].isFinal) {
            e += f.results[g][0].transcript;
            a("#vstxt").html(e);
            b.onend();
            var c = a(".srcInpu", k)[0];
            if ("srch" == l)
              (c.value = e),
                (c = k),
                a(".subForm", c).attr("action", "/search/#voices"),
                a.click(a(".srcInpuSub", c)[0]);
            else if ("addrs" == l) {
              /^(?=.*\d)[\d ]+$/.test(e) && (e = e.replace(/\s/g, ""));
              c.value = e.toLowerCase();
              c.focus();
              if (c.oninput) c.oninput();
              if (c.onkeyup) c.onkeyup();
            }
          } else (d += f.results[g][0].transcript), a("#vstxt").html(d);
      };
    },
    startZeroResultMic: function (m, h) {
      var k = this.parents("an-zeroResult")[0],
        l = h.data.split(",")[0],
        d = h.data.split(",")[1],
        b = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition)();
      a.anConstants.recog = b;
      b.lang = a.utilities.voice.lang();
      b.continuous = !0;
      d && (b.continuous = !1);
      b.interimResults = !0;
      b.start();
      a("#vstx").html(a("#vstx").attr("data-ready"));
      a("#srhT").show("table");
      a("#mic").hide();
      a("#desc").hide();
      b.onstart = function () {
        a("#vSrch").addClass("cL");
        a("#mic").hide();
        a("#desc").hide();
        a("#vstx").html(a("#vstx").attr("data-listen"));
      };
      b.onend = function () {
        a("#vSrch").removeClass("cL");
        a("#srhT").hide();
        a("#mic").show("-webkit-inline-box");
        a("#desc").show();
        a("#vstx").html(" ");
        b.stop();
      };
      b.onerror = function () {
        b.onend();
        b.stop();
      };
      b.onresult = function (f) {
        for (var e = "", d = "", g = f.resultIndex; g < f.results.length; ++g)
          if (f.results[g].isFinal) {
            e += f.results[g][0].transcript;
            a("#vstx").html(e);
            b.onend();
            var c = a(".srcInpu", k)[0];
            if ("srch" == l)
              (c.value = e),
                (c = k),
                a(".subForm", c).attr("action", "/search/#voices"),
                a.click(a(".srcInpuSub", c)[0]);
            else if ("addrs" == l) {
              /^(?=.*\d)[\d ]+$/.test(e) && (e = e.replace(/\s/g, ""));
              c.value = e.toLowerCase();
              c.focus();
              if (c.oninput) c.oninput();
              if (c.onkeyup) c.onkeyup();
            }
          } else (d += f.results[g][0].transcript), a("#vstx").html(d);
      };
    },
    startSpeaker: function (m, h) {
      var k = m || "Something error has occurred!";
      if (a.anConstants.globalVoiceOutput && "speechSynthesis" in window) {
        var l = h || a.utilities.voice.lang();
        a.utilities.voice.event &&
          window.cancelAnimationFrame(a.utilities.voice.event);
        if (a.utilities.voice.active) a.utilities.voice.active.onend();
        a.utilities.voice.event = window.requestAnimationFrame(function () {
          a("#vol-I").hide();
          a("#volm-I").show();
          var d = new SpeechSynthesisUtterance(),
            b = window.speechSynthesis.getVoices();
          if (0 == b.length) return !1;
          for (var f = 0; f < b.length; f++)
            if (0 === b[f].lang.indexOf(l)) {
              d.voice = b[f];
              break;
            }
          a.utilities.voice.active = d;
          d.text = k;
          d.onend = function (a) {
            window.speechSynthesis.cancel();
          };
          d.onerror = function (a) {
            d.onend(a);
          };
          speechSynthesis.speak(d);
        });
      }
    },
    muteSpeaker: function () {
      a.utilities.voice.active && (a.utilities.voice.active.volume = 0);
      a.utilities.voice.active && a.utilities.voice.active.onend();
      a.anConstants.globalVoiceOutput = !1;
      a("#volm-I").hide();
      a("#vol-I").show();
    },
    unmuteSpeaker: function () {
      a.utilities.voice.active && (a.utilities.voice.active.volume = 1);
      a.anConstants.globalVoiceOutput = !0;
      a("#volm-I").show();
      a("#vol-I").hide();
    },
    init: function () {
      a.UA.isFBinApp() || a("#vSt").addClass("webVoice");
    },
  };
})(window.alakhNiranjan);
