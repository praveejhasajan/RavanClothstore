/*
  Copyright (c) 2018 limeroad <https://www.limeroad.com>
 @version    3.0 Stable
*/
(function (a) {
  a.utilities = a.utilities || {};
  a.utilities.sw = {
    v: "0.1.4",
    initPush: function () {
      var b = a.createElement("script")[0];
      b.async = 1;
      b.type = "text/javascript";
      b.onload = function () {
        var b = a.createElement("script")[0];
        b.async = 1;
        b.type = "text/javascript";
        b.onload = function () {
          function b(e, l) {
            if (!h(e)) {
              var c = {
                  email: a.anConstants.Useremail,
                  uuid: a.anConstants.Useruuid,
                  currentToken: e,
                  sw_version_no: a.utilities.sw.v,
                },
                d;
              l
                ? (a.log.event(
                    { name: "webpushpopuptoken" },
                    { type: "update", id: e },
                    {},
                    !0
                  ),
                  (d = "/notification/update_web_notification"),
                  (c.swIdn = window.localStorage.getItem("uniq_key")))
                : (a.log.event(
                    { name: "webpushpopuptoken" },
                    { type: "create", id: e },
                    {},
                    !0
                  ),
                  (d = "/notification/create_web_notification"));
              a.xhr()
                .post(d, a.stringifyJSON(c), "j")
                .success(function (a) {
                  l || window.localStorage.setItem("uniq_key", a);
                  f(e);
                })
                .error(function (b) {
                  a.log.event(
                    { name: "webpushpopuptoken" },
                    { type: l ? "updateError" : "createError", id: e },
                    {},
                    !0
                  );
                });
            }
          }
          function h(a) {
            return window.localStorage.getItem("sentToServer") == a;
          }
          function f(a) {
            window.localStorage.setItem("sentToServer", a);
          }
          function m(e) {
            k.getToken()
              .then(function (e) {
                e
                  ? (a.log.event(
                      { name: "webpushpopuptoken" },
                      { type: "getToken", id: e },
                      {},
                      !0
                    ),
                    window.localStorage.getItem("uniq_key")
                      ? b(e, !0)
                      : b(e, !1))
                  : (a.log.event(
                      { name: "webpushpopuperror" },
                      { type: "token not found" },
                      { type: "tokenError", extra: a.utilities.sw.v },
                      !0
                    ),
                    f(null));
              })
              .catch(function (b) {
                a.log.event(
                  { name: "webpushpopuperror" },
                  { type: b },
                  { type: "tokenError", extra: a.utilities.sw.v },
                  !0
                );
                f(null);
              });
          }
          if (!window.firebase.messaging.isSupported()) return !1;
          window.firebase.initializeApp({
            apiKey: "AIzaSyBUJuzlgeS_zyaJfzvhGBnKe0LlYWL5mbU",
            authDomain: "limeroad-com-api-project-108238792422.firebaseapp.com",
            databaseURL:
              "https://limeroad-com-api-project-108238792422.firebaseio.com",
            projectId: "limeroad.com:api-project-108238792422",
            storageBucket: "undefined",
            messagingSenderId: "108238792422",
            appId: "1:108238792422:web:546a3959837cb5e0dbbd27",
            measurementId: "G-GXXB4S5GJN",
          });
          var k = window.firebase.messaging(),
            c = a.createElement("script")[0],
            g = a.createElement("script")[0];
          c.async = 1;
          c.type = "text/javascript";
          g.async = 1;
          g.type = "text/javascript";
          c.onload = function () {
            window.firebase.analytics.isSupported().then(function () {
              a.log = a.log || {};
              a.log.firebaseEvent = window.firebase.analytics();
              a.perfMetrics = window.perfMetrics || void 0;
              a.perfMetrics &&
                a.perfMetrics.onFirstInputDelay(function (a, b) {
                  window.ga &&
                    "function" == typeof window.ga &&
                    window.ga("send", "event", {
                      eventCategory: "Perf Metrics",
                      eventAction: "first-input-delay",
                      eventLabel: b.type,
                      eventValue: Math.round(a),
                      nonInteraction: !0,
                    });
                });
            });
          };
          g.onload = function () {
            window.firebase.performance();
          };
          c.src =
            "https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js";
          g.src =
            "https://www.gstatic.com/firebasejs/7.17.1/firebase-performance.js";
          document.body.appendChild(c);
          document.body.appendChild(g);
          c = g = null;
          window.swRegistration && k.useServiceWorker(window.swRegistration);
          "Notification" in window &&
            (c = Notification.permission) &&
            "granted" == c &&
            m(!0);
          k.onTokenRefresh(function () {
            k.getToken()
              .then(function (e) {
                a.log.event(
                  { name: "webpushpopuprefreshtoken" },
                  { type: "token", id: e },
                  { extra: a.utilities.sw.v },
                  !0
                );
                b(e, !0);
              })
              .catch(function (b) {
                a.log.event(
                  { name: "webpushpopuprefreshtokenerror" },
                  { type: b },
                  { extra: a.utilities.sw.v },
                  !0
                );
              });
          });
          a.requestBrowserPermission = function (b, c, f) {
            "default" == Notification.permission &&
              Notification.requestPermission()
                .then(function (d) {
                  try {
                    a.log.event(
                      { name: "webpushpopup" },
                      { type: Notification.permission, id: b || "" },
                      { extra: a.utilities.sw.v },
                      !0
                    );
                  } catch (c) {}
                  m(!0);
                })
                .catch(function (d) {
                  try {
                    a.log.event(
                      { name: "webpushpopuperror" },
                      { type: d, id: b || "" },
                      { type: "permissionError", extra: a.utilities.sw.v },
                      !0
                    );
                  } catch (c) {}
                  m(!0);
                });
            a("#vSt").removeClass("webnotif");
            f && a.utilities.default.decideActionStrip(c, f);
          };
          a.requestPermission = function (b, c, f, d) {
            null == c
              ? (a.requestBrowserPermission(b),
                a.log.event(
                  { name: "GetNotifiedClicked" },
                  { type: "requestPermission", id: b, extra: "" }
                ))
              : "GetNotifiedClicked" === c && d
              ? (a.log.event(
                  { name: "ActionStripclicked" },
                  { type: "Get notified" },
                  { val: d.vendor_id || "", extra: a.utilities.sw.v }
                ),
                a.requestBrowserPermission(b, f, d))
              : "SaveContactClicked" === c && d
              ? (a.log.event(
                  { name: "ActionStripclicked" },
                  { type: "Save Contact" },
                  { val: d.vendor_id || "", extra: a.utilities.sw.v }
                ),
                a.utilities.default.saveContact(d))
              : "DownloadPwaClicked" === c &&
                d &&
                (a.utilities.sw.initATHS(b, f, d),
                a.log.event(
                  { name: "ActionStripclicked" },
                  { type: "Download Store" },
                  { val: d.vendor_id || "", extra: a.utilities.sw.v }
                ));
          };
          a.giveNotifPermission = function () {
            var b = a.anConstants.pageName;
            a.requestBrowserPermission(b);
            a.log.event(
              { name: "webpushoptin" },
              { type: "granted", id: b || "" },
              { extra: a.utilities.sw.v },
              !0
            );
          };
          a.denyNotifPermission = function () {
            var b = a.anConstants.pageName;
            a.cookie("webpushnotif", "opt_in_denied", 15);
            a.log.event(
              { name: "webpushoptin" },
              { type: "denied", id: b || "" },
              { extra: a.utilities.sw.v },
              !0
            );
          };
        };
        b.src =
          "https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js";
        document.body.appendChild(b);
        b = null;
      };
      b.src = "https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js";
      document.body.appendChild(b);
      b = null;
    },
    initATHS: function (b, f, n) {
      a.anConstants.deferredPrompt &&
        (a.anConstants.deferredPrompt.prompt(),
        a.anConstants.deferredPrompt.userChoice.then(function (h) {
          a.log.event(
            { name: "a2hspopchoice" },
            { type: h.outcome, id: b || "" },
            {},
            !0
          );
          "accepted" === h.outcome &&
            (a("#vSt").removeClass("a2hs"),
            a("#vSt").removeClass("pwa"),
            a("#seller_store_a2hs").hide(),
            a("#seller_store_pwa").hide(),
            n && a.utilities.default.decideActionStrip(f, n));
          a.anConstants.deferredPrompt = null;
        }),
        a.log.event({ name: "a2hspopshown" }, { id: b || "" }, {}, !0));
    },
    init: function () {
      navigator.serviceWorker
        .register("/sw.js", {})
        .then(function (b) {
          window.swRegistration = b;
          a.log.event({ name: "SWInit" }, { type: "sw" }, {}, !0);
          !a.anConstants.pwa &&
            a.anConstants.deferredPrompt &&
            (a("#vSt").addClass("a2hs"),
            a("#seller_store_a2hs").length && a("#seller_store_a2hs").show());
          "Notification" in window &&
            ((b = Notification.permission),
            "denied" !== b
              ? (a.log.event(
                  { name: "webpushpopupnotdenied" },
                  { type: b },
                  { extra: a.utilities.sw.v },
                  !0
                ),
                a.utilities.sw.initPush(),
                "granted" != b && a("#vSt").addClass("webnotif"))
              : a.log.event(
                  { name: "webpushpopupdenied" },
                  { type: b },
                  { extra: a.utilities.sw.v },
                  !0
                ),
            -1 < window.location.pathname.indexOf("o2o/") &&
              ("denied" === b || "granted" === b) &&
              (a.utilities.sw.initPush(),
              (b = new Proxy(new URLSearchParams(window.location.search), {
                get: function (a, b) {
                  return a.get(b);
                },
              })) &&
                (b = b.vendor_id) &&
                a.utilities.default.decideActionStrip(!1, { vendor_id: b })));
        })
        .catch(function (b) {
          a.log.event(
            { name: "SWNotSupported" },
            { type: b },
            { extra: a.utilities.sw.v },
            !0
          );
        });
    },
  };
})(window.alakhNiranjan);
