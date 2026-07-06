function lE(t, a) {
  for (var s = 0; s < a.length; s++) {
    const o = a[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const i in o)
        if (i !== "default" && !(i in t)) {
          const c = Object.getOwnPropertyDescriptor(o, i);
          c &&
            Object.defineProperty(
              t,
              i,
              c.get ? c : { enumerable: !0, get: () => o[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
  new MutationObserver((i) => {
    for (const c of i)
      if (c.type === "childList")
        for (const u of c.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && o(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(i) {
    const c = {};
    return (
      i.integrity && (c.integrity = i.integrity),
      i.referrerPolicy && (c.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function o(i) {
    if (i.ep) return;
    i.ep = !0;
    const c = s(i);
    fetch(i.href, c);
  }
})();
function Tx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var uf = { exports: {} },
  Jo = {};
var sy;
function iE() {
  if (sy) return Jo;
  sy = 1;
  var t = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.fragment");
  function s(o, i, c) {
    var u = null;
    if (
      (c !== void 0 && (u = "" + c),
      i.key !== void 0 && (u = "" + i.key),
      "key" in i)
    ) {
      c = {};
      for (var f in i) f !== "key" && (c[f] = i[f]);
    } else c = i;
    return (
      (i = c.ref),
      { $$typeof: t, type: o, key: u, ref: i !== void 0 ? i : null, props: c }
    );
  }
  return ((Jo.Fragment = a), (Jo.jsx = s), (Jo.jsxs = s), Jo);
}
var oy;
function cE() {
  return (oy || ((oy = 1), (uf.exports = iE())), uf.exports);
}
var m = cE(),
  df = { exports: {} },
  Se = {};
var ly;
function uE() {
  if (ly) return Se;
  ly = 1;
  var t = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    c = Symbol.for("react.consumer"),
    u = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    x = Symbol.for("react.lazy"),
    v = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function A(_) {
    return _ === null || typeof _ != "object"
      ? null
      : ((_ = (S && _[S]) || _["@@iterator"]),
        typeof _ == "function" ? _ : null);
  }
  var N = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    E = {};
  function O(_, X, I) {
    ((this.props = _),
      (this.context = X),
      (this.refs = E),
      (this.updater = I || N));
  }
  ((O.prototype.isReactComponent = {}),
    (O.prototype.setState = function (_, X) {
      if (typeof _ != "object" && typeof _ != "function" && _ != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, _, X, "setState");
    }),
    (O.prototype.forceUpdate = function (_) {
      this.updater.enqueueForceUpdate(this, _, "forceUpdate");
    }));
  function D() {}
  D.prototype = O.prototype;
  function P(_, X, I) {
    ((this.props = _),
      (this.context = X),
      (this.refs = E),
      (this.updater = I || N));
  }
  var G = (P.prototype = new D());
  ((G.constructor = P), w(G, O.prototype), (G.isPureReactComponent = !0));
  var L = Array.isArray;
  function q() {}
  var j = { H: null, A: null, T: null, S: null },
    R = Object.prototype.hasOwnProperty;
  function U(_, X, I) {
    var K = I.ref;
    return {
      $$typeof: t,
      type: _,
      key: X,
      ref: K !== void 0 ? K : null,
      props: I,
    };
  }
  function $(_, X) {
    return U(_.type, X, _.props);
  }
  function Z(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function W(_) {
    var X = { "=": "=0", ":": "=2" };
    return (
      "$" +
      _.replace(/[=:]/g, function (I) {
        return X[I];
      })
    );
  }
  var re = /\/+/g;
  function oe(_, X) {
    return typeof _ == "object" && _ !== null && _.key != null
      ? W("" + _.key)
      : X.toString(36);
  }
  function ie(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (
          (typeof _.status == "string"
            ? _.then(q, q)
            : ((_.status = "pending"),
              _.then(
                function (X) {
                  _.status === "pending" &&
                    ((_.status = "fulfilled"), (_.value = X));
                },
                function (X) {
                  _.status === "pending" &&
                    ((_.status = "rejected"), (_.reason = X));
                },
              )),
          _.status)
        ) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function M(_, X, I, K, ae) {
    var ue = typeof _;
    (ue === "undefined" || ue === "boolean") && (_ = null);
    var ne = !1;
    if (_ === null) ne = !0;
    else
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case t:
            case a:
              ne = !0;
              break;
            case x:
              return ((ne = _._init), M(ne(_._payload), X, I, K, ae));
          }
      }
    if (ne)
      return (
        (ae = ae(_)),
        (ne = K === "" ? "." + oe(_, 0) : K),
        L(ae)
          ? ((I = ""),
            ne != null && (I = ne.replace(re, "$&/") + "/"),
            M(ae, X, I, "", function (Ee) {
              return Ee;
            }))
          : ae != null &&
            (Z(ae) &&
              (ae = $(
                ae,
                I +
                  (ae.key == null || (_ && _.key === ae.key)
                    ? ""
                    : ("" + ae.key).replace(re, "$&/") + "/") +
                  ne,
              )),
            X.push(ae)),
        1
      );
    ne = 0;
    var fe = K === "" ? "." : K + ":";
    if (L(_))
      for (var xe = 0; xe < _.length; xe++)
        ((K = _[xe]), (ue = fe + oe(K, xe)), (ne += M(K, X, I, ue, ae)));
    else if (((xe = A(_)), typeof xe == "function"))
      for (_ = xe.call(_), xe = 0; !(K = _.next()).done; )
        ((K = K.value), (ue = fe + oe(K, xe++)), (ne += M(K, X, I, ue, ae)));
    else if (ue === "object") {
      if (typeof _.then == "function") return M(ie(_), X, I, K, ae);
      throw (
        (X = String(_)),
        Error(
          "Objects are not valid as a React child (found: " +
            (X === "[object Object]"
              ? "object with keys {" + Object.keys(_).join(", ") + "}"
              : X) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ne;
  }
  function V(_, X, I) {
    if (_ == null) return _;
    var K = [],
      ae = 0;
    return (
      M(_, K, "", "", function (ue) {
        return X.call(I, ue, ae++);
      }),
      K
    );
  }
  function H(_) {
    if (_._status === -1) {
      var X = _._result;
      ((X = X()),
        X.then(
          function (I) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 1), (_._result = I));
          },
          function (I) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 2), (_._result = I));
          },
        ),
        _._status === -1 && ((_._status = 0), (_._result = X)));
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var le =
      typeof reportError == "function"
        ? reportError
        : function (_) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var X = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof _ == "object" &&
                  _ !== null &&
                  typeof _.message == "string"
                    ? String(_.message)
                    : String(_),
                error: _,
              });
              if (!window.dispatchEvent(X)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", _);
              return;
            }
            console.error(_);
          },
    de = {
      map: V,
      forEach: function (_, X, I) {
        V(
          _,
          function () {
            X.apply(this, arguments);
          },
          I,
        );
      },
      count: function (_) {
        var X = 0;
        return (
          V(_, function () {
            X++;
          }),
          X
        );
      },
      toArray: function (_) {
        return (
          V(_, function (X) {
            return X;
          }) || []
        );
      },
      only: function (_) {
        if (!Z(_))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return _;
      },
    };
  return (
    (Se.Activity = v),
    (Se.Children = de),
    (Se.Component = O),
    (Se.Fragment = s),
    (Se.Profiler = i),
    (Se.PureComponent = P),
    (Se.StrictMode = o),
    (Se.Suspense = p),
    (Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j),
    (Se.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (_) {
        return j.H.useMemoCache(_);
      },
    }),
    (Se.cache = function (_) {
      return function () {
        return _.apply(null, arguments);
      };
    }),
    (Se.cacheSignal = function () {
      return null;
    }),
    (Se.cloneElement = function (_, X, I) {
      if (_ == null)
        throw Error(
          "The argument must be a React element, but you passed " + _ + ".",
        );
      var K = w({}, _.props),
        ae = _.key;
      if (X != null)
        for (ue in (X.key !== void 0 && (ae = "" + X.key), X))
          !R.call(X, ue) ||
            ue === "key" ||
            ue === "__self" ||
            ue === "__source" ||
            (ue === "ref" && X.ref === void 0) ||
            (K[ue] = X[ue]);
      var ue = arguments.length - 2;
      if (ue === 1) K.children = I;
      else if (1 < ue) {
        for (var ne = Array(ue), fe = 0; fe < ue; fe++)
          ne[fe] = arguments[fe + 2];
        K.children = ne;
      }
      return U(_.type, ae, K);
    }),
    (Se.createContext = function (_) {
      return (
        (_ = {
          $$typeof: u,
          _currentValue: _,
          _currentValue2: _,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (_.Provider = _),
        (_.Consumer = { $$typeof: c, _context: _ }),
        _
      );
    }),
    (Se.createElement = function (_, X, I) {
      var K,
        ae = {},
        ue = null;
      if (X != null)
        for (K in (X.key !== void 0 && (ue = "" + X.key), X))
          R.call(X, K) &&
            K !== "key" &&
            K !== "__self" &&
            K !== "__source" &&
            (ae[K] = X[K]);
      var ne = arguments.length - 2;
      if (ne === 1) ae.children = I;
      else if (1 < ne) {
        for (var fe = Array(ne), xe = 0; xe < ne; xe++)
          fe[xe] = arguments[xe + 2];
        ae.children = fe;
      }
      if (_ && _.defaultProps)
        for (K in ((ne = _.defaultProps), ne))
          ae[K] === void 0 && (ae[K] = ne[K]);
      return U(_, ue, ae);
    }),
    (Se.createRef = function () {
      return { current: null };
    }),
    (Se.forwardRef = function (_) {
      return { $$typeof: f, render: _ };
    }),
    (Se.isValidElement = Z),
    (Se.lazy = function (_) {
      return { $$typeof: x, _payload: { _status: -1, _result: _ }, _init: H };
    }),
    (Se.memo = function (_, X) {
      return { $$typeof: g, type: _, compare: X === void 0 ? null : X };
    }),
    (Se.startTransition = function (_) {
      var X = j.T,
        I = {};
      j.T = I;
      try {
        var K = _(),
          ae = j.S;
        (ae !== null && ae(I, K),
          typeof K == "object" &&
            K !== null &&
            typeof K.then == "function" &&
            K.then(q, le));
      } catch (ue) {
        le(ue);
      } finally {
        (X !== null && I.types !== null && (X.types = I.types), (j.T = X));
      }
    }),
    (Se.unstable_useCacheRefresh = function () {
      return j.H.useCacheRefresh();
    }),
    (Se.use = function (_) {
      return j.H.use(_);
    }),
    (Se.useActionState = function (_, X, I) {
      return j.H.useActionState(_, X, I);
    }),
    (Se.useCallback = function (_, X) {
      return j.H.useCallback(_, X);
    }),
    (Se.useContext = function (_) {
      return j.H.useContext(_);
    }),
    (Se.useDebugValue = function () {}),
    (Se.useDeferredValue = function (_, X) {
      return j.H.useDeferredValue(_, X);
    }),
    (Se.useEffect = function (_, X) {
      return j.H.useEffect(_, X);
    }),
    (Se.useEffectEvent = function (_) {
      return j.H.useEffectEvent(_);
    }),
    (Se.useId = function () {
      return j.H.useId();
    }),
    (Se.useImperativeHandle = function (_, X, I) {
      return j.H.useImperativeHandle(_, X, I);
    }),
    (Se.useInsertionEffect = function (_, X) {
      return j.H.useInsertionEffect(_, X);
    }),
    (Se.useLayoutEffect = function (_, X) {
      return j.H.useLayoutEffect(_, X);
    }),
    (Se.useMemo = function (_, X) {
      return j.H.useMemo(_, X);
    }),
    (Se.useOptimistic = function (_, X) {
      return j.H.useOptimistic(_, X);
    }),
    (Se.useReducer = function (_, X, I) {
      return j.H.useReducer(_, X, I);
    }),
    (Se.useRef = function (_) {
      return j.H.useRef(_);
    }),
    (Se.useState = function (_) {
      return j.H.useState(_);
    }),
    (Se.useSyncExternalStore = function (_, X, I) {
      return j.H.useSyncExternalStore(_, X, I);
    }),
    (Se.useTransition = function () {
      return j.H.useTransition();
    }),
    (Se.version = "19.2.3"),
    Se
  );
}
var iy;
function Sh() {
  return (iy || ((iy = 1), (df.exports = uE())), df.exports);
}
var y = Sh();
const se = Tx(y),
  Nc = lE({ __proto__: null, default: se }, [y]);
var ff = { exports: {} },
  el = {},
  hf = { exports: {} },
  pf = {};
var cy;
function dE() {
  return (
    cy ||
      ((cy = 1),
      (function (t) {
        function a(M, V) {
          var H = M.length;
          M.push(V);
          e: for (; 0 < H; ) {
            var le = (H - 1) >>> 1,
              de = M[le];
            if (0 < i(de, V)) ((M[le] = V), (M[H] = de), (H = le));
            else break e;
          }
        }
        function s(M) {
          return M.length === 0 ? null : M[0];
        }
        function o(M) {
          if (M.length === 0) return null;
          var V = M[0],
            H = M.pop();
          if (H !== V) {
            M[0] = H;
            e: for (var le = 0, de = M.length, _ = de >>> 1; le < _; ) {
              var X = 2 * (le + 1) - 1,
                I = M[X],
                K = X + 1,
                ae = M[K];
              if (0 > i(I, H))
                K < de && 0 > i(ae, I)
                  ? ((M[le] = ae), (M[K] = H), (le = K))
                  : ((M[le] = I), (M[X] = H), (le = X));
              else if (K < de && 0 > i(ae, H))
                ((M[le] = ae), (M[K] = H), (le = K));
              else break e;
            }
          }
          return V;
        }
        function i(M, V) {
          var H = M.sortIndex - V.sortIndex;
          return H !== 0 ? H : M.id - V.id;
        }
        if (
          ((t.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var c = performance;
          t.unstable_now = function () {
            return c.now();
          };
        } else {
          var u = Date,
            f = u.now();
          t.unstable_now = function () {
            return u.now() - f;
          };
        }
        var p = [],
          g = [],
          x = 1,
          v = null,
          S = 3,
          A = !1,
          N = !1,
          w = !1,
          E = !1,
          O = typeof setTimeout == "function" ? setTimeout : null,
          D = typeof clearTimeout == "function" ? clearTimeout : null,
          P = typeof setImmediate < "u" ? setImmediate : null;
        function G(M) {
          for (var V = s(g); V !== null; ) {
            if (V.callback === null) o(g);
            else if (V.startTime <= M)
              (o(g), (V.sortIndex = V.expirationTime), a(p, V));
            else break;
            V = s(g);
          }
        }
        function L(M) {
          if (((w = !1), G(M), !N))
            if (s(p) !== null) ((N = !0), q || ((q = !0), W()));
            else {
              var V = s(g);
              V !== null && ie(L, V.startTime - M);
            }
        }
        var q = !1,
          j = -1,
          R = 5,
          U = -1;
        function $() {
          return E ? !0 : !(t.unstable_now() - U < R);
        }
        function Z() {
          if (((E = !1), q)) {
            var M = t.unstable_now();
            U = M;
            var V = !0;
            try {
              e: {
                ((N = !1), w && ((w = !1), D(j), (j = -1)), (A = !0));
                var H = S;
                try {
                  t: {
                    for (
                      G(M), v = s(p);
                      v !== null && !(v.expirationTime > M && $());
                    ) {
                      var le = v.callback;
                      if (typeof le == "function") {
                        ((v.callback = null), (S = v.priorityLevel));
                        var de = le(v.expirationTime <= M);
                        if (((M = t.unstable_now()), typeof de == "function")) {
                          ((v.callback = de), G(M), (V = !0));
                          break t;
                        }
                        (v === s(p) && o(p), G(M));
                      } else o(p);
                      v = s(p);
                    }
                    if (v !== null) V = !0;
                    else {
                      var _ = s(g);
                      (_ !== null && ie(L, _.startTime - M), (V = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (S = H), (A = !1));
                }
                V = void 0;
              }
            } finally {
              V ? W() : (q = !1);
            }
          }
        }
        var W;
        if (typeof P == "function")
          W = function () {
            P(Z);
          };
        else if (typeof MessageChannel < "u") {
          var re = new MessageChannel(),
            oe = re.port2;
          ((re.port1.onmessage = Z),
            (W = function () {
              oe.postMessage(null);
            }));
        } else
          W = function () {
            O(Z, 0);
          };
        function ie(M, V) {
          j = O(function () {
            M(t.unstable_now());
          }, V);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (t.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (R = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (t.unstable_next = function (M) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = S;
            }
            var H = S;
            S = V;
            try {
              return M();
            } finally {
              S = H;
            }
          }),
          (t.unstable_requestPaint = function () {
            E = !0;
          }),
          (t.unstable_runWithPriority = function (M, V) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var H = S;
            S = M;
            try {
              return V();
            } finally {
              S = H;
            }
          }),
          (t.unstable_scheduleCallback = function (M, V, H) {
            var le = t.unstable_now();
            switch (
              (typeof H == "object" && H !== null
                ? ((H = H.delay),
                  (H = typeof H == "number" && 0 < H ? le + H : le))
                : (H = le),
              M)
            ) {
              case 1:
                var de = -1;
                break;
              case 2:
                de = 250;
                break;
              case 5:
                de = 1073741823;
                break;
              case 4:
                de = 1e4;
                break;
              default:
                de = 5e3;
            }
            return (
              (de = H + de),
              (M = {
                id: x++,
                callback: V,
                priorityLevel: M,
                startTime: H,
                expirationTime: de,
                sortIndex: -1,
              }),
              H > le
                ? ((M.sortIndex = H),
                  a(g, M),
                  s(p) === null &&
                    M === s(g) &&
                    (w ? (D(j), (j = -1)) : (w = !0), ie(L, H - le)))
                : ((M.sortIndex = de),
                  a(p, M),
                  N || A || ((N = !0), q || ((q = !0), W()))),
              M
            );
          }),
          (t.unstable_shouldYield = $),
          (t.unstable_wrapCallback = function (M) {
            var V = S;
            return function () {
              var H = S;
              S = V;
              try {
                return M.apply(this, arguments);
              } finally {
                S = H;
              }
            };
          }));
      })(pf)),
    pf
  );
}
var uy;
function fE() {
  return (uy || ((uy = 1), (hf.exports = dE())), hf.exports);
}
var mf = { exports: {} },
  Rt = {};
var dy;
function hE() {
  if (dy) return Rt;
  dy = 1;
  var t = Sh();
  function a(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        g += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(a(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    i = Symbol.for("react.portal");
  function c(p, g, x) {
    var v =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: i,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: g,
      implementation: x,
    };
  }
  var u = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(p, g) {
    if (p === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return (
    (Rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Rt.createPortal = function (p, g) {
      var x =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11))
        throw Error(a(299));
      return c(p, g, null, x);
    }),
    (Rt.flushSync = function (p) {
      var g = u.T,
        x = o.p;
      try {
        if (((u.T = null), (o.p = 2), p)) return p();
      } finally {
        ((u.T = g), (o.p = x), o.d.f());
      }
    }),
    (Rt.preconnect = function (p, g) {
      typeof p == "string" &&
        (g
          ? ((g = g.crossOrigin),
            (g =
              typeof g == "string"
                ? g === "use-credentials"
                  ? g
                  : ""
                : void 0))
          : (g = null),
        o.d.C(p, g));
    }),
    (Rt.prefetchDNS = function (p) {
      typeof p == "string" && o.d.D(p);
    }),
    (Rt.preinit = function (p, g) {
      if (typeof p == "string" && g && typeof g.as == "string") {
        var x = g.as,
          v = f(x, g.crossOrigin),
          S = typeof g.integrity == "string" ? g.integrity : void 0,
          A = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        x === "style"
          ? o.d.S(p, typeof g.precedence == "string" ? g.precedence : void 0, {
              crossOrigin: v,
              integrity: S,
              fetchPriority: A,
            })
          : x === "script" &&
            o.d.X(p, {
              crossOrigin: v,
              integrity: S,
              fetchPriority: A,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
      }
    }),
    (Rt.preinitModule = function (p, g) {
      if (typeof p == "string")
        if (typeof g == "object" && g !== null) {
          if (g.as == null || g.as === "script") {
            var x = f(g.as, g.crossOrigin);
            o.d.M(p, {
              crossOrigin: x,
              integrity: typeof g.integrity == "string" ? g.integrity : void 0,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(p);
    }),
    (Rt.preload = function (p, g) {
      if (
        typeof p == "string" &&
        typeof g == "object" &&
        g !== null &&
        typeof g.as == "string"
      ) {
        var x = g.as,
          v = f(x, g.crossOrigin);
        o.d.L(p, x, {
          crossOrigin: v,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority:
            typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy:
            typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet:
            typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0,
        });
      }
    }),
    (Rt.preloadModule = function (p, g) {
      if (typeof p == "string")
        if (g) {
          var x = f(g.as, g.crossOrigin);
          o.d.m(p, {
            as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
            crossOrigin: x,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (Rt.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (Rt.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (Rt.useFormState = function (p, g, x) {
      return u.H.useFormState(p, g, x);
    }),
    (Rt.useFormStatus = function () {
      return u.H.useHostTransitionStatus();
    }),
    (Rt.version = "19.2.3"),
    Rt
  );
}
var fy;
function Mx() {
  if (fy) return mf.exports;
  fy = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return (t(), (mf.exports = hE()), mf.exports);
}
var hy;
function pE() {
  if (hy) return el;
  hy = 1;
  var t = fE(),
    a = Sh(),
    s = Mx();
  function o(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function c(e) {
    var n = e,
      r = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do ((n = e), (n.flags & 4098) !== 0 && (r = n.return), (e = n.return));
      while (e);
    }
    return n.tag === 3 ? r : null;
  }
  function u(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function f(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (
        (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (c(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var n = e.alternate;
    if (!n) {
      if (((n = c(e)), n === null)) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var r = e, l = n; ; ) {
      var d = r.return;
      if (d === null) break;
      var h = d.alternate;
      if (h === null) {
        if (((l = d.return), l !== null)) {
          r = l;
          continue;
        }
        break;
      }
      if (d.child === h.child) {
        for (h = d.child; h; ) {
          if (h === r) return (p(d), e);
          if (h === l) return (p(d), n);
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (r.return !== l.return) ((r = d), (l = h));
      else {
        for (var b = !1, C = d.child; C; ) {
          if (C === r) {
            ((b = !0), (r = d), (l = h));
            break;
          }
          if (C === l) {
            ((b = !0), (l = d), (r = h));
            break;
          }
          C = C.sibling;
        }
        if (!b) {
          for (C = h.child; C; ) {
            if (C === r) {
              ((b = !0), (r = h), (l = d));
              break;
            }
            if (C === l) {
              ((b = !0), (l = h), (r = d));
              break;
            }
            C = C.sibling;
          }
          if (!b) throw Error(o(189));
        }
      }
      if (r.alternate !== l) throw Error(o(190));
    }
    if (r.tag !== 3) throw Error(o(188));
    return r.stateNode.current === r ? e : n;
  }
  function x(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((n = x(e)), n !== null)) return n;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign,
    S = Symbol.for("react.element"),
    A = Symbol.for("react.transitional.element"),
    N = Symbol.for("react.portal"),
    w = Symbol.for("react.fragment"),
    E = Symbol.for("react.strict_mode"),
    O = Symbol.for("react.profiler"),
    D = Symbol.for("react.consumer"),
    P = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    L = Symbol.for("react.suspense"),
    q = Symbol.for("react.suspense_list"),
    j = Symbol.for("react.memo"),
    R = Symbol.for("react.lazy"),
    U = Symbol.for("react.activity"),
    $ = Symbol.for("react.memo_cache_sentinel"),
    Z = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Z && e[Z]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var re = Symbol.for("react.client.reference");
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === re ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case O:
        return "Profiler";
      case E:
        return "StrictMode";
      case L:
        return "Suspense";
      case q:
        return "SuspenseList";
      case U:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case N:
          return "Portal";
        case P:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var n = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case j:
          return (
            (n = e.displayName || null),
            n !== null ? n : oe(e.type) || "Memo"
          );
        case R:
          ((n = e._payload), (e = e._init));
          try {
            return oe(e(n));
          } catch {}
      }
    return null;
  }
  var ie = Array.isArray,
    M = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    H = { pending: !1, data: null, method: null, action: null },
    le = [],
    de = -1;
  function _(e) {
    return { current: e };
  }
  function X(e) {
    0 > de || ((e.current = le[de]), (le[de] = null), de--);
  }
  function I(e, n) {
    (de++, (le[de] = e.current), (e.current = n));
  }
  var K = _(null),
    ae = _(null),
    ue = _(null),
    ne = _(null);
  function fe(e, n) {
    switch ((I(ue, n), I(ae, e), I(K, null), n.nodeType)) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Ov(e) : 0;
        break;
      default:
        if (((e = n.tagName), (n = n.namespaceURI)))
          ((n = Ov(n)), (e = _v(n, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (X(K), I(K, e));
  }
  function xe() {
    (X(K), X(ae), X(ue));
  }
  function Ee(e) {
    e.memoizedState !== null && I(ne, e);
    var n = K.current,
      r = _v(n, e.type);
    n !== r && (I(ae, e), I(K, r));
  }
  function Ne(e) {
    (ae.current === e && (X(K), X(ae)),
      ne.current === e && (X(ne), (Xo._currentValue = H)));
  }
  var _e, yt;
  function ft(e) {
    if (_e === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        ((_e = (n && n[1]) || ""),
          (yt =
            -1 <
            r.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < r.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      _e +
      e +
      yt
    );
  }
  var ta = !1;
  function jn(e, n) {
    if (!e || ta) return "";
    ta = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var te = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(te.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(te, []);
                } catch (F) {
                  var Y = F;
                }
                Reflect.construct(e, [], te);
              } else {
                try {
                  te.call();
                } catch (F) {
                  Y = F;
                }
                e.call(te.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (F) {
                Y = F;
              }
              (te = e()) &&
                typeof te.catch == "function" &&
                te.catch(function () {});
            }
          } catch (F) {
            if (F && Y && typeof F.stack == "string") return [F.stack, Y.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      d &&
        d.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var h = l.DetermineComponentFrameRoot(),
        b = h[0],
        C = h[1];
      if (b && C) {
        var T = b.split(`
`),
          Q = C.split(`
`);
        for (
          d = l = 0;
          l < T.length && !T[l].includes("DetermineComponentFrameRoot");
        )
          l++;
        for (; d < Q.length && !Q[d].includes("DetermineComponentFrameRoot"); )
          d++;
        if (l === T.length || d === Q.length)
          for (
            l = T.length - 1, d = Q.length - 1;
            1 <= l && 0 <= d && T[l] !== Q[d];
          )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (T[l] !== Q[d]) {
            if (l !== 1 || d !== 1)
              do
                if ((l--, d--, 0 > d || T[l] !== Q[d])) {
                  var J =
                    `
` + T[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      J.includes("<anonymous>") &&
                      (J = J.replace("<anonymous>", e.displayName)),
                    J
                  );
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      ((ta = !1), (Error.prepareStackTrace = r));
    }
    return (r = e ? e.displayName || e.name : "") ? ft(r) : "";
  }
  function yn(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ft(e.type);
      case 16:
        return ft("Lazy");
      case 13:
        return e.child !== n && n !== null
          ? ft("Suspense Fallback")
          : ft("Suspense");
      case 19:
        return ft("SuspenseList");
      case 0:
      case 15:
        return jn(e.type, !1);
      case 11:
        return jn(e.type.render, !1);
      case 1:
        return jn(e.type, !0);
      case 31:
        return ft("Activity");
      default:
        return "";
    }
  }
  function ro(e) {
    try {
      var n = "",
        r = null;
      do ((n += yn(e, r)), (r = e), (e = e.return));
      while (e);
      return n;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  var $t = Object.prototype.hasOwnProperty,
    so = t.unstable_scheduleCallback,
    oo = t.unstable_cancelCallback,
    _t = t.unstable_shouldYield,
    Oa = t.unstable_requestPaint,
    jt = t.unstable_now,
    Zc = t.unstable_getCurrentPriorityLevel,
    hr = t.unstable_ImmediatePriority,
    Ol = t.unstable_UserBlockingPriority,
    pr = t.unstable_NormalPriority,
    lo = t.unstable_LowPriority,
    na = t.unstable_IdlePriority,
    _l = t.log,
    _a = t.unstable_setDisableYieldValue,
    mr = null,
    Tt = null;
  function xn(e) {
    if (
      (typeof _l == "function" && _a(e),
      Tt && typeof Tt.setStrictMode == "function")
    )
      try {
        Tt.setStrictMode(mr, e);
      } catch {}
  }
  var At = Math.clz32 ? Math.clz32 : Tn,
    Wc = Math.log,
    io = Math.LN2;
  function Tn(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Wc(e) / io) | 0)) | 0);
  }
  var Fr = 256,
    Xr = 262144,
    gr = 4194304;
  function Mn(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function be(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0,
      h = e.suspendedLanes,
      b = e.pingedLanes;
    e = e.warmLanes;
    var C = l & 134217727;
    return (
      C !== 0
        ? ((l = C & ~h),
          l !== 0
            ? (d = Mn(l))
            : ((b &= C),
              b !== 0
                ? (d = Mn(b))
                : r || ((r = C & ~e), r !== 0 && (d = Mn(r)))))
        : ((C = l & ~h),
          C !== 0
            ? (d = Mn(C))
            : b !== 0
              ? (d = Mn(b))
              : r || ((r = l & ~e), r !== 0 && (d = Mn(r)))),
      d === 0
        ? 0
        : n !== 0 &&
            n !== d &&
            (n & h) === 0 &&
            ((h = d & -d),
            (r = n & -n),
            h >= r || (h === 32 && (r & 4194048) !== 0))
          ? n
          : d
    );
  }
  function Ze(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function mt(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Nt() {
    var e = gr;
    return ((gr <<= 1), (gr & 62914560) === 0 && (gr = 4194304), e);
  }
  function ja(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function Je(e, n) {
    ((e.pendingLanes |= n),
      n !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function zt(e, n, r, l, d, h) {
    var b = e.pendingLanes;
    ((e.pendingLanes = r),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= r),
      (e.entangledLanes &= r),
      (e.errorRecoveryDisabledLanes &= r),
      (e.shellSuspendCounter = 0));
    var C = e.entanglements,
      T = e.expirationTimes,
      Q = e.hiddenUpdates;
    for (r = b & ~r; 0 < r; ) {
      var J = 31 - At(r),
        te = 1 << J;
      ((C[J] = 0), (T[J] = -1));
      var Y = Q[J];
      if (Y !== null)
        for (Q[J] = null, J = 0; J < Y.length; J++) {
          var F = Y[J];
          F !== null && (F.lane &= -536870913);
        }
      r &= ~te;
    }
    (l !== 0 && vr(e, l, 0),
      h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(b & ~n)));
  }
  function vr(e, n, r) {
    ((e.pendingLanes |= n), (e.suspendedLanes &= ~n));
    var l = 31 - At(n);
    ((e.entangledLanes |= n),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (r & 261930)));
  }
  function Pt(e, n) {
    var r = (e.entangledLanes |= n);
    for (e = e.entanglements; r; ) {
      var l = 31 - At(r),
        d = 1 << l;
      ((d & n) | (e[l] & n) && (e[l] |= n), (r &= ~d));
    }
  }
  function kt(e, n) {
    var r = n & -n;
    return (
      (r = (r & 42) !== 0 ? 1 : Kr(r)),
      (r & (e.suspendedLanes | n)) !== 0 ? 0 : r
    );
  }
  function Kr(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function bn(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Jc() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Wv(e.type));
  }
  function pp(e, n) {
    var r = V.p;
    try {
      return ((V.p = e), n());
    } finally {
      V.p = r;
    }
  }
  var Ta = Math.random().toString(36).slice(2),
    xt = "__reactFiber$" + Ta,
    Ht = "__reactProps$" + Ta,
    Zr = "__reactContainer$" + Ta,
    eu = "__reactEvents$" + Ta,
    KS = "__reactListeners$" + Ta,
    ZS = "__reactHandles$" + Ta,
    mp = "__reactResources$" + Ta,
    co = "__reactMarker$" + Ta;
  function tu(e) {
    (delete e[xt], delete e[Ht], delete e[eu], delete e[KS], delete e[ZS]);
  }
  function Wr(e) {
    var n = e[xt];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if ((n = r[Zr] || r[xt])) {
        if (
          ((r = n.alternate),
          n.child !== null || (r !== null && r.child !== null))
        )
          for (e = kv(e); e !== null; ) {
            if ((r = e[xt])) return r;
            e = kv(e);
          }
        return n;
      }
      ((e = r), (r = e.parentNode));
    }
    return null;
  }
  function Jr(e) {
    if ((e = e[xt] || e[Zr])) {
      var n = e.tag;
      if (
        n === 5 ||
        n === 6 ||
        n === 13 ||
        n === 31 ||
        n === 26 ||
        n === 27 ||
        n === 3
      )
        return e;
    }
    return null;
  }
  function uo(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(o(33));
  }
  function es(e) {
    var n = e[mp];
    return (
      n ||
        (n = e[mp] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function gt(e) {
    e[co] = !0;
  }
  var gp = new Set(),
    vp = {};
  function yr(e, n) {
    (ts(e, n), ts(e + "Capture", n));
  }
  function ts(e, n) {
    for (vp[e] = n, e = 0; e < n.length; e++) gp.add(n[e]);
  }
  var WS = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    yp = {},
    xp = {};
  function JS(e) {
    return $t.call(xp, e)
      ? !0
      : $t.call(yp, e)
        ? !1
        : WS.test(e)
          ? (xp[e] = !0)
          : ((yp[e] = !0), !1);
  }
  function jl(e, n, r) {
    if (JS(n))
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + r);
      }
  }
  function Tl(e, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + r);
    }
  }
  function aa(e, n, r, l) {
    if (l === null) e.removeAttribute(r);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, "" + l);
    }
  }
  function sn(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function bp(e) {
    var n = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function ew(e, n, r) {
    var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
    if (
      !e.hasOwnProperty(n) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var d = l.get,
        h = l.set;
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (b) {
            ((r = "" + b), h.call(this, b));
          },
        }),
        Object.defineProperty(e, n, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (b) {
            r = "" + b;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[n]);
          },
        }
      );
    }
  }
  function nu(e) {
    if (!e._valueTracker) {
      var n = bp(e) ? "checked" : "value";
      e._valueTracker = ew(e, n, "" + e[n]);
    }
  }
  function Sp(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(),
      l = "";
    return (
      e && (l = bp(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== r ? (n.setValue(e), !0) : !1
    );
  }
  function Ml(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var tw = /[\n"\\]/g;
  function on(e) {
    return e.replace(tw, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function au(e, n, r, l, d, h, b, C) {
    ((e.name = ""),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.type = b)
        : e.removeAttribute("type"),
      n != null
        ? b === "number"
          ? ((n === 0 && e.value === "") || e.value != n) &&
            (e.value = "" + sn(n))
          : e.value !== "" + sn(n) && (e.value = "" + sn(n))
        : (b !== "submit" && b !== "reset") || e.removeAttribute("value"),
      n != null
        ? ru(e, b, sn(n))
        : r != null
          ? ru(e, b, sn(r))
          : l != null && e.removeAttribute("value"),
      d == null && h != null && (e.defaultChecked = !!h),
      d != null &&
        (e.checked = d && typeof d != "function" && typeof d != "symbol"),
      C != null &&
      typeof C != "function" &&
      typeof C != "symbol" &&
      typeof C != "boolean"
        ? (e.name = "" + sn(C))
        : e.removeAttribute("name"));
  }
  function wp(e, n, r, l, d, h, b, C) {
    if (
      (h != null &&
        typeof h != "function" &&
        typeof h != "symbol" &&
        typeof h != "boolean" &&
        (e.type = h),
      n != null || r != null)
    ) {
      if (!((h !== "submit" && h !== "reset") || n != null)) {
        nu(e);
        return;
      }
      ((r = r != null ? "" + sn(r) : ""),
        (n = n != null ? "" + sn(n) : r),
        C || n === e.value || (e.value = n),
        (e.defaultValue = n));
    }
    ((l = l ?? d),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = C ? e.checked : !!l),
      (e.defaultChecked = !!l),
      b != null &&
        typeof b != "function" &&
        typeof b != "symbol" &&
        typeof b != "boolean" &&
        (e.name = b),
      nu(e));
  }
  function ru(e, n, r) {
    (n === "number" && Ml(e.ownerDocument) === e) ||
      e.defaultValue === "" + r ||
      (e.defaultValue = "" + r);
  }
  function ns(e, n, r, l) {
    if (((e = e.options), n)) {
      n = {};
      for (var d = 0; d < r.length; d++) n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        ((d = n.hasOwnProperty("$" + e[r].value)),
          e[r].selected !== d && (e[r].selected = d),
          d && l && (e[r].defaultSelected = !0));
    } else {
      for (r = "" + sn(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          ((e[d].selected = !0), l && (e[d].defaultSelected = !0));
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ep(e, n, r) {
    if (
      n != null &&
      ((n = "" + sn(n)), n !== e.value && (e.value = n), r == null)
    ) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + sn(r) : "";
  }
  function Cp(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(o(92));
        if (ie(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        r = l;
      }
      (r == null && (r = ""), (n = r));
    }
    ((r = sn(n)),
      (e.defaultValue = r),
      (l = e.textContent),
      l === r && l !== "" && l !== null && (e.value = l),
      nu(e));
  }
  function as(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var nw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Ap(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === ""
      ? l
        ? e.setProperty(n, "")
        : n === "float"
          ? (e.cssFloat = "")
          : (e[n] = "")
      : l
        ? e.setProperty(n, r)
        : typeof r != "number" || r === 0 || nw.has(n)
          ? n === "float"
            ? (e.cssFloat = r)
            : (e[n] = ("" + r).trim())
          : (e[n] = r + "px");
  }
  function Np(e, n, r) {
    if (n != null && typeof n != "object") throw Error(o(62));
    if (((e = e.style), r != null)) {
      for (var l in r)
        !r.hasOwnProperty(l) ||
          (n != null && n.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
              ? (e.cssFloat = "")
              : (e[l] = ""));
      for (var d in n)
        ((l = n[d]), n.hasOwnProperty(d) && r[d] !== l && Ap(e, d, l));
    } else for (var h in n) n.hasOwnProperty(h) && Ap(e, h, n[h]);
  }
  function su(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var aw = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    rw =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dl(e) {
    return rw.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ra() {}
  var ou = null;
  function lu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var rs = null,
    ss = null;
  function Rp(e) {
    var n = Jr(e);
    if (n && (e = n.stateNode)) {
      var r = e[Ht] || null;
      e: switch (((e = n.stateNode), n.type)) {
        case "input":
          if (
            (au(
              e,
              r.value,
              r.defaultValue,
              r.defaultValue,
              r.checked,
              r.defaultChecked,
              r.type,
              r.name,
            ),
            (n = r.name),
            r.type === "radio" && n != null)
          ) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (
              r = r.querySelectorAll(
                'input[name="' + on("" + n) + '"][type="radio"]',
              ),
                n = 0;
              n < r.length;
              n++
            ) {
              var l = r[n];
              if (l !== e && l.form === e.form) {
                var d = l[Ht] || null;
                if (!d) throw Error(o(90));
                au(
                  l,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name,
                );
              }
            }
            for (n = 0; n < r.length; n++)
              ((l = r[n]), l.form === e.form && Sp(l));
          }
          break e;
        case "textarea":
          Ep(e, r.value, r.defaultValue);
          break e;
        case "select":
          ((n = r.value), n != null && ns(e, !!r.multiple, n, !1));
      }
    }
  }
  var iu = !1;
  function Op(e, n, r) {
    if (iu) return e(n, r);
    iu = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (
        ((iu = !1),
        (rs !== null || ss !== null) &&
          (bi(), rs && ((n = rs), (e = ss), (ss = rs = null), Rp(n), e)))
      )
        for (n = 0; n < e.length; n++) Rp(e[n]);
    }
  }
  function fo(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[Ht] || null;
    if (l === null) return null;
    r = l[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(o(231, n, typeof r));
    return r;
  }
  var sa = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    cu = !1;
  if (sa)
    try {
      var ho = {};
      (Object.defineProperty(ho, "passive", {
        get: function () {
          cu = !0;
        },
      }),
        window.addEventListener("test", ho, ho),
        window.removeEventListener("test", ho, ho));
    } catch {
      cu = !1;
    }
  var Ma = null,
    uu = null,
    zl = null;
  function _p() {
    if (zl) return zl;
    var e,
      n = uu,
      r = n.length,
      l,
      d = "value" in Ma ? Ma.value : Ma.textContent,
      h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++);
    var b = r - e;
    for (l = 1; l <= b && n[r - l] === d[h - l]; l++);
    return (zl = d.slice(e, 1 < l ? 1 - l : void 0));
  }
  function Pl(e) {
    var n = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
        : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function kl() {
    return !0;
  }
  function jp() {
    return !1;
  }
  function Lt(e) {
    function n(r, l, d, h, b) {
      ((this._reactName = r),
        (this._targetInst = d),
        (this.type = l),
        (this.nativeEvent = h),
        (this.target = b),
        (this.currentTarget = null));
      for (var C in e)
        e.hasOwnProperty(C) && ((r = e[C]), (this[C] = r ? r(h) : h[C]));
      return (
        (this.isDefaultPrevented = (
          h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1
        )
          ? kl
          : jp),
        (this.isPropagationStopped = jp),
        this
      );
    }
    return (
      v(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = kl));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = kl));
        },
        persist: function () {},
        isPersistent: kl,
      }),
      n
    );
  }
  var xr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Hl = Lt(xr),
    po = v({}, xr, { view: 0, detail: 0 }),
    sw = Lt(po),
    du,
    fu,
    mo,
    Ll = v({}, po, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: pu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== mo &&
              (mo && e.type === "mousemove"
                ? ((du = e.screenX - mo.screenX), (fu = e.screenY - mo.screenY))
                : (fu = du = 0),
              (mo = e)),
            du);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : fu;
      },
    }),
    Tp = Lt(Ll),
    ow = v({}, Ll, { dataTransfer: 0 }),
    lw = Lt(ow),
    iw = v({}, po, { relatedTarget: 0 }),
    hu = Lt(iw),
    cw = v({}, xr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    uw = Lt(cw),
    dw = v({}, xr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    fw = Lt(dw),
    hw = v({}, xr, { data: 0 }),
    Mp = Lt(hw),
    pw = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    mw = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    gw = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function vw(e) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(e)
      : (e = gw[e])
        ? !!n[e]
        : !1;
  }
  function pu() {
    return vw;
  }
  var yw = v({}, po, {
      key: function (e) {
        if (e.key) {
          var n = pw[e.key] || e.key;
          if (n !== "Unidentified") return n;
        }
        return e.type === "keypress"
          ? ((e = Pl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? mw[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: pu,
      charCode: function (e) {
        return e.type === "keypress" ? Pl(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Pl(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    xw = Lt(yw),
    bw = v({}, Ll, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Dp = Lt(bw),
    Sw = v({}, po, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: pu,
    }),
    ww = Lt(Sw),
    Ew = v({}, xr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Cw = Lt(Ew),
    Aw = v({}, Ll, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Nw = Lt(Aw),
    Rw = v({}, xr, { newState: 0, oldState: 0 }),
    Ow = Lt(Rw),
    _w = [9, 13, 27, 32],
    mu = sa && "CompositionEvent" in window,
    go = null;
  sa && "documentMode" in document && (go = document.documentMode);
  var jw = sa && "TextEvent" in window && !go,
    zp = sa && (!mu || (go && 8 < go && 11 >= go)),
    Pp = " ",
    kp = !1;
  function Hp(e, n) {
    switch (e) {
      case "keyup":
        return _w.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Lp(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var os = !1;
  function Tw(e, n) {
    switch (e) {
      case "compositionend":
        return Lp(n);
      case "keypress":
        return n.which !== 32 ? null : ((kp = !0), Pp);
      case "textInput":
        return ((e = n.data), e === Pp && kp ? null : e);
      default:
        return null;
    }
  }
  function Mw(e, n) {
    if (os)
      return e === "compositionend" || (!mu && Hp(e, n))
        ? ((e = _p()), (zl = uu = Ma = null), (os = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return zp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Dw = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Up(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Dw[e.type] : n === "textarea";
  }
  function Bp(e, n, r, l) {
    (rs ? (ss ? ss.push(l) : (ss = [l])) : (rs = l),
      (n = Ri(n, "onChange")),
      0 < n.length &&
        ((r = new Hl("onChange", "change", null, r, l)),
        e.push({ event: r, listeners: n })));
  }
  var vo = null,
    yo = null;
  function zw(e) {
    wv(e, 0);
  }
  function Ul(e) {
    var n = uo(e);
    if (Sp(n)) return e;
  }
  function qp(e, n) {
    if (e === "change") return n;
  }
  var Qp = !1;
  if (sa) {
    var gu;
    if (sa) {
      var vu = "oninput" in document;
      if (!vu) {
        var Vp = document.createElement("div");
        (Vp.setAttribute("oninput", "return;"),
          (vu = typeof Vp.oninput == "function"));
      }
      gu = vu;
    } else gu = !1;
    Qp = gu && (!document.documentMode || 9 < document.documentMode);
  }
  function Ip() {
    vo && (vo.detachEvent("onpropertychange", Yp), (yo = vo = null));
  }
  function Yp(e) {
    if (e.propertyName === "value" && Ul(yo)) {
      var n = [];
      (Bp(n, yo, e, lu(e)), Op(zw, n));
    }
  }
  function Pw(e, n, r) {
    e === "focusin"
      ? (Ip(), (vo = n), (yo = r), vo.attachEvent("onpropertychange", Yp))
      : e === "focusout" && Ip();
  }
  function kw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ul(yo);
  }
  function Hw(e, n) {
    if (e === "click") return Ul(n);
  }
  function Lw(e, n) {
    if (e === "input" || e === "change") return Ul(n);
  }
  function Uw(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
  }
  var Gt = typeof Object.is == "function" ? Object.is : Uw;
  function xo(e, n) {
    if (Gt(e, n)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var r = Object.keys(e),
      l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!$t.call(n, d) || !Gt(e[d], n[d])) return !1;
    }
    return !0;
  }
  function $p(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Gp(e, n) {
    var r = $p(e);
    e = 0;
    for (var l; r; ) {
      if (r.nodeType === 3) {
        if (((l = e + r.textContent.length), e <= n && l >= n))
          return { node: r, offset: n - e };
        e = l;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = $p(r);
    }
  }
  function Fp(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Fp(e, n.parentNode)
            : "contains" in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Xp(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var n = Ml(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Ml(e.document);
    }
    return n;
  }
  function yu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        n === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Bw = sa && "documentMode" in document && 11 >= document.documentMode,
    ls = null,
    xu = null,
    bo = null,
    bu = !1;
  function Kp(e, n, r) {
    var l =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    bu ||
      ls == null ||
      ls !== Ml(l) ||
      ((l = ls),
      "selectionStart" in l && yu(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (bo && xo(bo, l)) ||
        ((bo = l),
        (l = Ri(xu, "onSelect")),
        0 < l.length &&
          ((n = new Hl("onSelect", "select", null, n, r)),
          e.push({ event: n, listeners: l }),
          (n.target = ls))));
  }
  function br(e, n) {
    var r = {};
    return (
      (r[e.toLowerCase()] = n.toLowerCase()),
      (r["Webkit" + e] = "webkit" + n),
      (r["Moz" + e] = "moz" + n),
      r
    );
  }
  var is = {
      animationend: br("Animation", "AnimationEnd"),
      animationiteration: br("Animation", "AnimationIteration"),
      animationstart: br("Animation", "AnimationStart"),
      transitionrun: br("Transition", "TransitionRun"),
      transitionstart: br("Transition", "TransitionStart"),
      transitioncancel: br("Transition", "TransitionCancel"),
      transitionend: br("Transition", "TransitionEnd"),
    },
    Su = {},
    Zp = {};
  sa &&
    ((Zp = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete is.animationend.animation,
      delete is.animationiteration.animation,
      delete is.animationstart.animation),
    "TransitionEvent" in window || delete is.transitionend.transition);
  function Sr(e) {
    if (Su[e]) return Su[e];
    if (!is[e]) return e;
    var n = is[e],
      r;
    for (r in n) if (n.hasOwnProperty(r) && r in Zp) return (Su[e] = n[r]);
    return e;
  }
  var Wp = Sr("animationend"),
    Jp = Sr("animationiteration"),
    em = Sr("animationstart"),
    qw = Sr("transitionrun"),
    Qw = Sr("transitionstart"),
    Vw = Sr("transitioncancel"),
    tm = Sr("transitionend"),
    nm = new Map(),
    wu =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  wu.push("scrollEnd");
  function Sn(e, n) {
    (nm.set(e, n), yr(n, [e]));
  }
  var Bl =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var n = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(n)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    ln = [],
    cs = 0,
    Eu = 0;
  function ql() {
    for (var e = cs, n = (Eu = cs = 0); n < e; ) {
      var r = ln[n];
      ln[n++] = null;
      var l = ln[n];
      ln[n++] = null;
      var d = ln[n];
      ln[n++] = null;
      var h = ln[n];
      if (((ln[n++] = null), l !== null && d !== null)) {
        var b = l.pending;
        (b === null ? (d.next = d) : ((d.next = b.next), (b.next = d)),
          (l.pending = d));
      }
      h !== 0 && am(r, d, h);
    }
  }
  function Ql(e, n, r, l) {
    ((ln[cs++] = e),
      (ln[cs++] = n),
      (ln[cs++] = r),
      (ln[cs++] = l),
      (Eu |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function Cu(e, n, r, l) {
    return (Ql(e, n, r, l), Vl(e));
  }
  function wr(e, n) {
    return (Ql(e, null, null, n), Vl(e));
  }
  function am(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      ((h.childLanes |= r),
        (l = h.alternate),
        l !== null && (l.childLanes |= r),
        h.tag === 22 &&
          ((e = h.stateNode), e === null || e._visibility & 1 || (d = !0)),
        (e = h),
        (h = h.return));
    return e.tag === 3
      ? ((h = e.stateNode),
        d &&
          n !== null &&
          ((d = 31 - At(r)),
          (e = h.hiddenUpdates),
          (l = e[d]),
          l === null ? (e[d] = [n]) : l.push(n),
          (n.lane = r | 536870912)),
        h)
      : null;
  }
  function Vl(e) {
    if (50 < Qo) throw ((Qo = 0), (Dd = null), Error(o(185)));
    for (var n = e.return; n !== null; ) ((e = n), (n = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var us = {};
  function Iw(e, n, r, l) {
    ((this.tag = e),
      (this.key = r),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Ft(e, n, r, l) {
    return new Iw(e, n, r, l);
  }
  function Au(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function oa(e, n) {
    var r = e.alternate;
    return (
      r === null
        ? ((r = Ft(e.tag, n, e.key, e.mode)),
          (r.elementType = e.elementType),
          (r.type = e.type),
          (r.stateNode = e.stateNode),
          (r.alternate = e),
          (e.alternate = r))
        : ((r.pendingProps = n),
          (r.type = e.type),
          (r.flags = 0),
          (r.subtreeFlags = 0),
          (r.deletions = null)),
      (r.flags = e.flags & 65011712),
      (r.childLanes = e.childLanes),
      (r.lanes = e.lanes),
      (r.child = e.child),
      (r.memoizedProps = e.memoizedProps),
      (r.memoizedState = e.memoizedState),
      (r.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (r.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (r.sibling = e.sibling),
      (r.index = e.index),
      (r.ref = e.ref),
      (r.refCleanup = e.refCleanup),
      r
    );
  }
  function rm(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return (
      r === null
        ? ((e.childLanes = 0),
          (e.lanes = n),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = r.childLanes),
          (e.lanes = r.lanes),
          (e.child = r.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = r.memoizedProps),
          (e.memoizedState = r.memoizedState),
          (e.updateQueue = r.updateQueue),
          (e.type = r.type),
          (n = r.dependencies),
          (e.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      e
    );
  }
  function Il(e, n, r, l, d, h) {
    var b = 0;
    if (((l = e), typeof e == "function")) Au(e) && (b = 1);
    else if (typeof e == "string")
      b = X2(e, r, K.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case U:
          return ((e = Ft(31, r, n, d)), (e.elementType = U), (e.lanes = h), e);
        case w:
          return Er(r.children, d, h, n);
        case E:
          ((b = 8), (d |= 24));
          break;
        case O:
          return (
            (e = Ft(12, r, n, d | 2)),
            (e.elementType = O),
            (e.lanes = h),
            e
          );
        case L:
          return ((e = Ft(13, r, n, d)), (e.elementType = L), (e.lanes = h), e);
        case q:
          return ((e = Ft(19, r, n, d)), (e.elementType = q), (e.lanes = h), e);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case P:
                b = 10;
                break e;
              case D:
                b = 9;
                break e;
              case G:
                b = 11;
                break e;
              case j:
                b = 14;
                break e;
              case R:
                ((b = 16), (l = null));
                break e;
            }
          ((b = 29),
            (r = Error(o(130, e === null ? "null" : typeof e, ""))),
            (l = null));
      }
    return (
      (n = Ft(b, r, n, d)),
      (n.elementType = e),
      (n.type = l),
      (n.lanes = h),
      n
    );
  }
  function Er(e, n, r, l) {
    return ((e = Ft(7, e, l, n)), (e.lanes = r), e);
  }
  function Nu(e, n, r) {
    return ((e = Ft(6, e, null, n)), (e.lanes = r), e);
  }
  function sm(e) {
    var n = Ft(18, null, null, 0);
    return ((n.stateNode = e), n);
  }
  function Ru(e, n, r) {
    return (
      (n = Ft(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = r),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    );
  }
  var om = new WeakMap();
  function cn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = om.get(e);
      return r !== void 0
        ? r
        : ((n = { value: e, source: n, stack: ro(n) }), om.set(e, n), n);
    }
    return { value: e, source: n, stack: ro(n) };
  }
  var ds = [],
    fs = 0,
    Yl = null,
    So = 0,
    un = [],
    dn = 0,
    Da = null,
    Dn = 1,
    zn = "";
  function la(e, n) {
    ((ds[fs++] = So), (ds[fs++] = Yl), (Yl = e), (So = n));
  }
  function lm(e, n, r) {
    ((un[dn++] = Dn), (un[dn++] = zn), (un[dn++] = Da), (Da = e));
    var l = Dn;
    e = zn;
    var d = 32 - At(l) - 1;
    ((l &= ~(1 << d)), (r += 1));
    var h = 32 - At(n) + d;
    if (30 < h) {
      var b = d - (d % 5);
      ((h = (l & ((1 << b) - 1)).toString(32)),
        (l >>= b),
        (d -= b),
        (Dn = (1 << (32 - At(n) + d)) | (r << d) | l),
        (zn = h + e));
    } else ((Dn = (1 << h) | (r << d) | l), (zn = e));
  }
  function Ou(e) {
    e.return !== null && (la(e, 1), lm(e, 1, 0));
  }
  function _u(e) {
    for (; e === Yl; )
      ((Yl = ds[--fs]), (ds[fs] = null), (So = ds[--fs]), (ds[fs] = null));
    for (; e === Da; )
      ((Da = un[--dn]),
        (un[dn] = null),
        (zn = un[--dn]),
        (un[dn] = null),
        (Dn = un[--dn]),
        (un[dn] = null));
  }
  function im(e, n) {
    ((un[dn++] = Dn),
      (un[dn++] = zn),
      (un[dn++] = Da),
      (Dn = n.id),
      (zn = n.overflow),
      (Da = e));
  }
  var bt = null,
    Xe = null,
    De = !1,
    za = null,
    fn = !1,
    ju = Error(o(519));
  function Pa(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (wo(cn(n, e)), ju);
  }
  function cm(e) {
    var n = e.stateNode,
      r = e.type,
      l = e.memoizedProps;
    switch (((n[xt] = e), (n[Ht] = l), r)) {
      case "dialog":
        (Oe("cancel", n), Oe("close", n));
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Io.length; r++) Oe(Io[r], n);
        break;
      case "source":
        Oe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        (Oe("error", n), Oe("load", n));
        break;
      case "details":
        Oe("toggle", n);
        break;
      case "input":
        (Oe("invalid", n),
          wp(
            n,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ));
        break;
      case "select":
        Oe("invalid", n);
        break;
      case "textarea":
        (Oe("invalid", n), Cp(n, l.value, l.defaultValue, l.children));
    }
    ((r = l.children),
      (typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
      n.textContent === "" + r ||
      l.suppressHydrationWarning === !0 ||
      Nv(n.textContent, r)
        ? (l.popover != null && (Oe("beforetoggle", n), Oe("toggle", n)),
          l.onScroll != null && Oe("scroll", n),
          l.onScrollEnd != null && Oe("scrollend", n),
          l.onClick != null && (n.onclick = ra),
          (n = !0))
        : (n = !1),
      n || Pa(e, !0));
  }
  function um(e) {
    for (bt = e.return; bt; )
      switch (bt.tag) {
        case 5:
        case 31:
        case 13:
          fn = !1;
          return;
        case 27:
        case 3:
          fn = !0;
          return;
        default:
          bt = bt.return;
      }
  }
  function hs(e) {
    if (e !== bt) return !1;
    if (!De) return (um(e), (De = !0), !1);
    var n = e.tag,
      r;
    if (
      ((r = n !== 3 && n !== 27) &&
        ((r = n === 5) &&
          ((r = e.type),
          (r =
            !(r !== "form" && r !== "button") || Fd(e.type, e.memoizedProps))),
        (r = !r)),
      r && Xe && Pa(e),
      um(e),
      n === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Xe = Pv(e);
    } else if (n === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Xe = Pv(e);
    } else
      n === 27
        ? ((n = Xe), Xa(e.type) ? ((e = Jd), (Jd = null), (Xe = e)) : (Xe = n))
        : (Xe = bt ? pn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Cr() {
    ((Xe = bt = null), (De = !1));
  }
  function Tu() {
    var e = za;
    return (
      e !== null &&
        (Qt === null ? (Qt = e) : Qt.push.apply(Qt, e), (za = null)),
      e
    );
  }
  function wo(e) {
    za === null ? (za = [e]) : za.push(e);
  }
  var Mu = _(null),
    Ar = null,
    ia = null;
  function ka(e, n, r) {
    (I(Mu, n._currentValue), (n._currentValue = r));
  }
  function ca(e) {
    ((e._currentValue = Mu.current), X(Mu));
  }
  function Du(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), l !== null && (l.childLanes |= n))
          : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n),
        e === r)
      )
        break;
      e = e.return;
    }
  }
  function zu(e, n, r, l) {
    var d = e.child;
    for (d !== null && (d.return = e); d !== null; ) {
      var h = d.dependencies;
      if (h !== null) {
        var b = d.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var C = h;
          h = d;
          for (var T = 0; T < n.length; T++)
            if (C.context === n[T]) {
              ((h.lanes |= r),
                (C = h.alternate),
                C !== null && (C.lanes |= r),
                Du(h.return, r, e),
                l || (b = null));
              break e;
            }
          h = C.next;
        }
      } else if (d.tag === 18) {
        if (((b = d.return), b === null)) throw Error(o(341));
        ((b.lanes |= r),
          (h = b.alternate),
          h !== null && (h.lanes |= r),
          Du(b, r, e),
          (b = null));
      } else b = d.child;
      if (b !== null) b.return = d;
      else
        for (b = d; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (((d = b.sibling), d !== null)) {
            ((d.return = b.return), (b = d));
            break;
          }
          b = b.return;
        }
      d = b;
    }
  }
  function ps(e, n, r, l) {
    e = null;
    for (var d = n, h = !1; d !== null; ) {
      if (!h) {
        if ((d.flags & 524288) !== 0) h = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var b = d.alternate;
        if (b === null) throw Error(o(387));
        if (((b = b.memoizedProps), b !== null)) {
          var C = d.type;
          Gt(d.pendingProps.value, b.value) ||
            (e !== null ? e.push(C) : (e = [C]));
        }
      } else if (d === ne.current) {
        if (((b = d.alternate), b === null)) throw Error(o(387));
        b.memoizedState.memoizedState !== d.memoizedState.memoizedState &&
          (e !== null ? e.push(Xo) : (e = [Xo]));
      }
      d = d.return;
    }
    (e !== null && zu(n, e, r, l), (n.flags |= 262144));
  }
  function $l(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Gt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Nr(e) {
    ((Ar = e),
      (ia = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function St(e) {
    return dm(Ar, e);
  }
  function Gl(e, n) {
    return (Ar === null && Nr(e), dm(e, n));
  }
  function dm(e, n) {
    var r = n._currentValue;
    if (((n = { context: n, memoizedValue: r, next: null }), ia === null)) {
      if (e === null) throw Error(o(308));
      ((ia = n),
        (e.dependencies = { lanes: 0, firstContext: n }),
        (e.flags |= 524288));
    } else ia = ia.next = n;
    return r;
  }
  var Yw =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (r, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              ((n.aborted = !0),
                e.forEach(function (r) {
                  return r();
                }));
            };
          },
    $w = t.unstable_scheduleCallback,
    Gw = t.unstable_NormalPriority,
    it = {
      $$typeof: P,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Pu() {
    return { controller: new Yw(), data: new Map(), refCount: 0 };
  }
  function Eo(e) {
    (e.refCount--,
      e.refCount === 0 &&
        $w(Gw, function () {
          e.controller.abort();
        }));
  }
  var Co = null,
    ku = 0,
    ms = 0,
    gs = null;
  function Fw(e, n) {
    if (Co === null) {
      var r = (Co = []);
      ((ku = 0),
        (ms = Ud()),
        (gs = {
          status: "pending",
          value: void 0,
          then: function (l) {
            r.push(l);
          },
        }));
    }
    return (ku++, n.then(fm, fm), n);
  }
  function fm() {
    if (--ku === 0 && Co !== null) {
      gs !== null && (gs.status = "fulfilled");
      var e = Co;
      ((Co = null), (ms = 0), (gs = null));
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Xw(e, n) {
    var r = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (d) {
          r.push(d);
        },
      };
    return (
      e.then(
        function () {
          ((l.status = "fulfilled"), (l.value = n));
          for (var d = 0; d < r.length; d++) (0, r[d])(n);
        },
        function (d) {
          for (l.status = "rejected", l.reason = d, d = 0; d < r.length; d++)
            (0, r[d])(void 0);
        },
      ),
      l
    );
  }
  var hm = M.S;
  M.S = function (e, n) {
    ((Kg = jt()),
      typeof n == "object" &&
        n !== null &&
        typeof n.then == "function" &&
        Fw(e, n),
      hm !== null && hm(e, n));
  };
  var Rr = _(null);
  function Hu() {
    var e = Rr.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function Fl(e, n) {
    n === null ? I(Rr, Rr.current) : I(Rr, n.pool);
  }
  function pm() {
    var e = Hu();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var vs = Error(o(460)),
    Lu = Error(o(474)),
    Xl = Error(o(542)),
    Kl = { then: function () {} };
  function mm(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function gm(e, n, r) {
    switch (
      ((r = e[r]),
      r === void 0 ? e.push(n) : r !== n && (n.then(ra, ra), (n = r)),
      n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((e = n.reason), ym(e), e);
      default:
        if (typeof n.status == "string") n.then(ra, ra);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          ((e = n),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (n.status === "pending") {
                  var d = n;
                  ((d.status = "fulfilled"), (d.value = l));
                }
              },
              function (l) {
                if (n.status === "pending") {
                  var d = n;
                  ((d.status = "rejected"), (d.reason = l));
                }
              },
            ));
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((e = n.reason), ym(e), e);
        }
        throw ((_r = n), vs);
    }
  }
  function Or(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function"
        ? ((_r = r), vs)
        : r;
    }
  }
  var _r = null;
  function vm() {
    if (_r === null) throw Error(o(459));
    var e = _r;
    return ((_r = null), e);
  }
  function ym(e) {
    if (e === vs || e === Xl) throw Error(o(483));
  }
  var ys = null,
    Ao = 0;
  function Zl(e) {
    var n = Ao;
    return ((Ao += 1), ys === null && (ys = []), gm(ys, e, n));
  }
  function No(e, n) {
    ((n = n.props.ref), (e.ref = n !== void 0 ? n : null));
  }
  function Wl(e, n) {
    throw n.$$typeof === S
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(n)),
        Error(
          o(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(n).join(", ") + "}"
              : e,
          ),
        ));
  }
  function xm(e) {
    function n(k, z) {
      if (e) {
        var B = k.deletions;
        B === null ? ((k.deletions = [z]), (k.flags |= 16)) : B.push(z);
      }
    }
    function r(k, z) {
      if (!e) return null;
      for (; z !== null; ) (n(k, z), (z = z.sibling));
      return null;
    }
    function l(k) {
      for (var z = new Map(); k !== null; )
        (k.key !== null ? z.set(k.key, k) : z.set(k.index, k), (k = k.sibling));
      return z;
    }
    function d(k, z) {
      return ((k = oa(k, z)), (k.index = 0), (k.sibling = null), k);
    }
    function h(k, z, B) {
      return (
        (k.index = B),
        e
          ? ((B = k.alternate),
            B !== null
              ? ((B = B.index), B < z ? ((k.flags |= 67108866), z) : B)
              : ((k.flags |= 67108866), z))
          : ((k.flags |= 1048576), z)
      );
    }
    function b(k) {
      return (e && k.alternate === null && (k.flags |= 67108866), k);
    }
    function C(k, z, B, ee) {
      return z === null || z.tag !== 6
        ? ((z = Nu(B, k.mode, ee)), (z.return = k), z)
        : ((z = d(z, B)), (z.return = k), z);
    }
    function T(k, z, B, ee) {
      var ve = B.type;
      return ve === w
        ? J(k, z, B.props.children, ee, B.key)
        : z !== null &&
            (z.elementType === ve ||
              (typeof ve == "object" &&
                ve !== null &&
                ve.$$typeof === R &&
                Or(ve) === z.type))
          ? ((z = d(z, B.props)), No(z, B), (z.return = k), z)
          : ((z = Il(B.type, B.key, B.props, null, k.mode, ee)),
            No(z, B),
            (z.return = k),
            z);
    }
    function Q(k, z, B, ee) {
      return z === null ||
        z.tag !== 4 ||
        z.stateNode.containerInfo !== B.containerInfo ||
        z.stateNode.implementation !== B.implementation
        ? ((z = Ru(B, k.mode, ee)), (z.return = k), z)
        : ((z = d(z, B.children || [])), (z.return = k), z);
    }
    function J(k, z, B, ee, ve) {
      return z === null || z.tag !== 7
        ? ((z = Er(B, k.mode, ee, ve)), (z.return = k), z)
        : ((z = d(z, B)), (z.return = k), z);
    }
    function te(k, z, B) {
      if (
        (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
      )
        return ((z = Nu("" + z, k.mode, B)), (z.return = k), z);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case A:
            return (
              (B = Il(z.type, z.key, z.props, null, k.mode, B)),
              No(B, z),
              (B.return = k),
              B
            );
          case N:
            return ((z = Ru(z, k.mode, B)), (z.return = k), z);
          case R:
            return ((z = Or(z)), te(k, z, B));
        }
        if (ie(z) || W(z))
          return ((z = Er(z, k.mode, B, null)), (z.return = k), z);
        if (typeof z.then == "function") return te(k, Zl(z), B);
        if (z.$$typeof === P) return te(k, Gl(k, z), B);
        Wl(k, z);
      }
      return null;
    }
    function Y(k, z, B, ee) {
      var ve = z !== null ? z.key : null;
      if (
        (typeof B == "string" && B !== "") ||
        typeof B == "number" ||
        typeof B == "bigint"
      )
        return ve !== null ? null : C(k, z, "" + B, ee);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case A:
            return B.key === ve ? T(k, z, B, ee) : null;
          case N:
            return B.key === ve ? Q(k, z, B, ee) : null;
          case R:
            return ((B = Or(B)), Y(k, z, B, ee));
        }
        if (ie(B) || W(B)) return ve !== null ? null : J(k, z, B, ee, null);
        if (typeof B.then == "function") return Y(k, z, Zl(B), ee);
        if (B.$$typeof === P) return Y(k, z, Gl(k, B), ee);
        Wl(k, B);
      }
      return null;
    }
    function F(k, z, B, ee, ve) {
      if (
        (typeof ee == "string" && ee !== "") ||
        typeof ee == "number" ||
        typeof ee == "bigint"
      )
        return ((k = k.get(B) || null), C(z, k, "" + ee, ve));
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case A:
            return (
              (k = k.get(ee.key === null ? B : ee.key) || null),
              T(z, k, ee, ve)
            );
          case N:
            return (
              (k = k.get(ee.key === null ? B : ee.key) || null),
              Q(z, k, ee, ve)
            );
          case R:
            return ((ee = Or(ee)), F(k, z, B, ee, ve));
        }
        if (ie(ee) || W(ee))
          return ((k = k.get(B) || null), J(z, k, ee, ve, null));
        if (typeof ee.then == "function") return F(k, z, B, Zl(ee), ve);
        if (ee.$$typeof === P) return F(k, z, B, Gl(z, ee), ve);
        Wl(z, ee);
      }
      return null;
    }
    function he(k, z, B, ee) {
      for (
        var ve = null, He = null, ge = z, Ce = (z = 0), Te = null;
        ge !== null && Ce < B.length;
        Ce++
      ) {
        ge.index > Ce ? ((Te = ge), (ge = null)) : (Te = ge.sibling);
        var Le = Y(k, ge, B[Ce], ee);
        if (Le === null) {
          ge === null && (ge = Te);
          break;
        }
        (e && ge && Le.alternate === null && n(k, ge),
          (z = h(Le, z, Ce)),
          He === null ? (ve = Le) : (He.sibling = Le),
          (He = Le),
          (ge = Te));
      }
      if (Ce === B.length) return (r(k, ge), De && la(k, Ce), ve);
      if (ge === null) {
        for (; Ce < B.length; Ce++)
          ((ge = te(k, B[Ce], ee)),
            ge !== null &&
              ((z = h(ge, z, Ce)),
              He === null ? (ve = ge) : (He.sibling = ge),
              (He = ge)));
        return (De && la(k, Ce), ve);
      }
      for (ge = l(ge); Ce < B.length; Ce++)
        ((Te = F(ge, k, Ce, B[Ce], ee)),
          Te !== null &&
            (e &&
              Te.alternate !== null &&
              ge.delete(Te.key === null ? Ce : Te.key),
            (z = h(Te, z, Ce)),
            He === null ? (ve = Te) : (He.sibling = Te),
            (He = Te)));
      return (
        e &&
          ge.forEach(function (er) {
            return n(k, er);
          }),
        De && la(k, Ce),
        ve
      );
    }
    function ye(k, z, B, ee) {
      if (B == null) throw Error(o(151));
      for (
        var ve = null,
          He = null,
          ge = z,
          Ce = (z = 0),
          Te = null,
          Le = B.next();
        ge !== null && !Le.done;
        Ce++, Le = B.next()
      ) {
        ge.index > Ce ? ((Te = ge), (ge = null)) : (Te = ge.sibling);
        var er = Y(k, ge, Le.value, ee);
        if (er === null) {
          ge === null && (ge = Te);
          break;
        }
        (e && ge && er.alternate === null && n(k, ge),
          (z = h(er, z, Ce)),
          He === null ? (ve = er) : (He.sibling = er),
          (He = er),
          (ge = Te));
      }
      if (Le.done) return (r(k, ge), De && la(k, Ce), ve);
      if (ge === null) {
        for (; !Le.done; Ce++, Le = B.next())
          ((Le = te(k, Le.value, ee)),
            Le !== null &&
              ((z = h(Le, z, Ce)),
              He === null ? (ve = Le) : (He.sibling = Le),
              (He = Le)));
        return (De && la(k, Ce), ve);
      }
      for (ge = l(ge); !Le.done; Ce++, Le = B.next())
        ((Le = F(ge, k, Ce, Le.value, ee)),
          Le !== null &&
            (e &&
              Le.alternate !== null &&
              ge.delete(Le.key === null ? Ce : Le.key),
            (z = h(Le, z, Ce)),
            He === null ? (ve = Le) : (He.sibling = Le),
            (He = Le)));
      return (
        e &&
          ge.forEach(function (oE) {
            return n(k, oE);
          }),
        De && la(k, Ce),
        ve
      );
    }
    function $e(k, z, B, ee) {
      if (
        (typeof B == "object" &&
          B !== null &&
          B.type === w &&
          B.key === null &&
          (B = B.props.children),
        typeof B == "object" && B !== null)
      ) {
        switch (B.$$typeof) {
          case A:
            e: {
              for (var ve = B.key; z !== null; ) {
                if (z.key === ve) {
                  if (((ve = B.type), ve === w)) {
                    if (z.tag === 7) {
                      (r(k, z.sibling),
                        (ee = d(z, B.props.children)),
                        (ee.return = k),
                        (k = ee));
                      break e;
                    }
                  } else if (
                    z.elementType === ve ||
                    (typeof ve == "object" &&
                      ve !== null &&
                      ve.$$typeof === R &&
                      Or(ve) === z.type)
                  ) {
                    (r(k, z.sibling),
                      (ee = d(z, B.props)),
                      No(ee, B),
                      (ee.return = k),
                      (k = ee));
                    break e;
                  }
                  r(k, z);
                  break;
                } else n(k, z);
                z = z.sibling;
              }
              B.type === w
                ? ((ee = Er(B.props.children, k.mode, ee, B.key)),
                  (ee.return = k),
                  (k = ee))
                : ((ee = Il(B.type, B.key, B.props, null, k.mode, ee)),
                  No(ee, B),
                  (ee.return = k),
                  (k = ee));
            }
            return b(k);
          case N:
            e: {
              for (ve = B.key; z !== null; ) {
                if (z.key === ve)
                  if (
                    z.tag === 4 &&
                    z.stateNode.containerInfo === B.containerInfo &&
                    z.stateNode.implementation === B.implementation
                  ) {
                    (r(k, z.sibling),
                      (ee = d(z, B.children || [])),
                      (ee.return = k),
                      (k = ee));
                    break e;
                  } else {
                    r(k, z);
                    break;
                  }
                else n(k, z);
                z = z.sibling;
              }
              ((ee = Ru(B, k.mode, ee)), (ee.return = k), (k = ee));
            }
            return b(k);
          case R:
            return ((B = Or(B)), $e(k, z, B, ee));
        }
        if (ie(B)) return he(k, z, B, ee);
        if (W(B)) {
          if (((ve = W(B)), typeof ve != "function")) throw Error(o(150));
          return ((B = ve.call(B)), ye(k, z, B, ee));
        }
        if (typeof B.then == "function") return $e(k, z, Zl(B), ee);
        if (B.$$typeof === P) return $e(k, z, Gl(k, B), ee);
        Wl(k, B);
      }
      return (typeof B == "string" && B !== "") ||
        typeof B == "number" ||
        typeof B == "bigint"
        ? ((B = "" + B),
          z !== null && z.tag === 6
            ? (r(k, z.sibling), (ee = d(z, B)), (ee.return = k), (k = ee))
            : (r(k, z), (ee = Nu(B, k.mode, ee)), (ee.return = k), (k = ee)),
          b(k))
        : r(k, z);
    }
    return function (k, z, B, ee) {
      try {
        Ao = 0;
        var ve = $e(k, z, B, ee);
        return ((ys = null), ve);
      } catch (ge) {
        if (ge === vs || ge === Xl) throw ge;
        var He = Ft(29, ge, null, k.mode);
        return ((He.lanes = ee), (He.return = k), He);
      }
    };
  }
  var jr = xm(!0),
    bm = xm(!1),
    Ha = !1;
  function Uu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Bu(e, n) {
    ((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function La(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ua(e, n, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Be & 2) !== 0)) {
      var d = l.pending;
      return (
        d === null ? (n.next = n) : ((n.next = d.next), (d.next = n)),
        (l.pending = n),
        (n = Vl(e)),
        am(e, null, r),
        n
      );
    }
    return (Ql(e, l, n, r), Vl(e));
  }
  function Ro(e, n, r) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (r & 4194048) !== 0))
    ) {
      var l = n.lanes;
      ((l &= e.pendingLanes), (r |= l), (n.lanes = r), Pt(e, r));
    }
  }
  function qu(e, n) {
    var r = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), r === l)) {
      var d = null,
        h = null;
      if (((r = r.firstBaseUpdate), r !== null)) {
        do {
          var b = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null,
          };
          (h === null ? (d = h = b) : (h = h.next = b), (r = r.next));
        } while (r !== null);
        h === null ? (d = h = n) : (h = h.next = n);
      } else d = h = n;
      ((r = {
        baseState: l.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = r));
      return;
    }
    ((e = r.lastBaseUpdate),
      e === null ? (r.firstBaseUpdate = n) : (e.next = n),
      (r.lastBaseUpdate = n));
  }
  var Qu = !1;
  function Oo() {
    if (Qu) {
      var e = gs;
      if (e !== null) throw e;
    }
  }
  function _o(e, n, r, l) {
    Qu = !1;
    var d = e.updateQueue;
    Ha = !1;
    var h = d.firstBaseUpdate,
      b = d.lastBaseUpdate,
      C = d.shared.pending;
    if (C !== null) {
      d.shared.pending = null;
      var T = C,
        Q = T.next;
      ((T.next = null), b === null ? (h = Q) : (b.next = Q), (b = T));
      var J = e.alternate;
      J !== null &&
        ((J = J.updateQueue),
        (C = J.lastBaseUpdate),
        C !== b &&
          (C === null ? (J.firstBaseUpdate = Q) : (C.next = Q),
          (J.lastBaseUpdate = T)));
    }
    if (h !== null) {
      var te = d.baseState;
      ((b = 0), (J = Q = T = null), (C = h));
      do {
        var Y = C.lane & -536870913,
          F = Y !== C.lane;
        if (F ? (je & Y) === Y : (l & Y) === Y) {
          (Y !== 0 && Y === ms && (Qu = !0),
            J !== null &&
              (J = J.next =
                {
                  lane: 0,
                  tag: C.tag,
                  payload: C.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var he = e,
              ye = C;
            Y = n;
            var $e = r;
            switch (ye.tag) {
              case 1:
                if (((he = ye.payload), typeof he == "function")) {
                  te = he.call($e, te, Y);
                  break e;
                }
                te = he;
                break e;
              case 3:
                he.flags = (he.flags & -65537) | 128;
              case 0:
                if (
                  ((he = ye.payload),
                  (Y = typeof he == "function" ? he.call($e, te, Y) : he),
                  Y == null)
                )
                  break e;
                te = v({}, te, Y);
                break e;
              case 2:
                Ha = !0;
            }
          }
          ((Y = C.callback),
            Y !== null &&
              ((e.flags |= 64),
              F && (e.flags |= 8192),
              (F = d.callbacks),
              F === null ? (d.callbacks = [Y]) : F.push(Y)));
        } else
          ((F = {
            lane: Y,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null,
          }),
            J === null ? ((Q = J = F), (T = te)) : (J = J.next = F),
            (b |= Y));
        if (((C = C.next), C === null)) {
          if (((C = d.shared.pending), C === null)) break;
          ((F = C),
            (C = F.next),
            (F.next = null),
            (d.lastBaseUpdate = F),
            (d.shared.pending = null));
        }
      } while (!0);
      (J === null && (T = te),
        (d.baseState = T),
        (d.firstBaseUpdate = Q),
        (d.lastBaseUpdate = J),
        h === null && (d.shared.lanes = 0),
        (Ia |= b),
        (e.lanes = b),
        (e.memoizedState = te));
    }
  }
  function Sm(e, n) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(n);
  }
  function wm(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++) Sm(r[e], n);
  }
  var xs = _(null),
    Jl = _(0);
  function Em(e, n) {
    ((e = ya), I(Jl, e), I(xs, n), (ya = e | n.baseLanes));
  }
  function Vu() {
    (I(Jl, ya), I(xs, xs.current));
  }
  function Iu() {
    ((ya = Jl.current), X(xs), X(Jl));
  }
  var Xt = _(null),
    hn = null;
  function Ba(e) {
    var n = e.alternate;
    (I(st, st.current & 1),
      I(Xt, e),
      hn === null &&
        (n === null || xs.current !== null || n.memoizedState !== null) &&
        (hn = e));
  }
  function Yu(e) {
    (I(st, st.current), I(Xt, e), hn === null && (hn = e));
  }
  function Cm(e) {
    e.tag === 22
      ? (I(st, st.current), I(Xt, e), hn === null && (hn = e))
      : qa();
  }
  function qa() {
    (I(st, st.current), I(Xt, Xt.current));
  }
  function Kt(e) {
    (X(Xt), hn === e && (hn = null), X(st));
  }
  var st = _(0);
  function ei(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && ((r = r.dehydrated), r === null || Zd(r) || Wd(r)))
          return n;
      } else if (
        n.tag === 19 &&
        (n.memoizedProps.revealOrder === "forwards" ||
          n.memoizedProps.revealOrder === "backwards" ||
          n.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          n.memoizedProps.revealOrder === "together")
      ) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var ua = 0,
    we = null,
    Ie = null,
    ct = null,
    ti = !1,
    bs = !1,
    Tr = !1,
    ni = 0,
    jo = 0,
    Ss = null,
    Kw = 0;
  function nt() {
    throw Error(o(321));
  }
  function $u(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!Gt(e[r], n[r])) return !1;
    return !0;
  }
  function Gu(e, n, r, l, d, h) {
    return (
      (ua = h),
      (we = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (M.H = e === null || e.memoizedState === null ? lg : id),
      (Tr = !1),
      (h = r(l, d)),
      (Tr = !1),
      bs && (h = Nm(n, r, l, d)),
      Am(e),
      h
    );
  }
  function Am(e) {
    M.H = Do;
    var n = Ie !== null && Ie.next !== null;
    if (((ua = 0), (ct = Ie = we = null), (ti = !1), (jo = 0), (Ss = null), n))
      throw Error(o(300));
    e === null ||
      ut ||
      ((e = e.dependencies), e !== null && $l(e) && (ut = !0));
  }
  function Nm(e, n, r, l) {
    we = e;
    var d = 0;
    do {
      if ((bs && (Ss = null), (jo = 0), (bs = !1), 25 <= d))
        throw Error(o(301));
      if (((d += 1), (ct = Ie = null), e.updateQueue != null)) {
        var h = e.updateQueue;
        ((h.lastEffect = null),
          (h.events = null),
          (h.stores = null),
          h.memoCache != null && (h.memoCache.index = 0));
      }
      ((M.H = ig), (h = n(r, l)));
    } while (bs);
    return h;
  }
  function Zw() {
    var e = M.H,
      n = e.useState()[0];
    return (
      (n = typeof n.then == "function" ? To(n) : n),
      (e = e.useState()[0]),
      (Ie !== null ? Ie.memoizedState : null) !== e && (we.flags |= 1024),
      n
    );
  }
  function Fu() {
    var e = ni !== 0;
    return ((ni = 0), e);
  }
  function Xu(e, n, r) {
    ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~r));
  }
  function Ku(e) {
    if (ti) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        (n !== null && (n.pending = null), (e = e.next));
      }
      ti = !1;
    }
    ((ua = 0), (ct = Ie = we = null), (bs = !1), (jo = ni = 0), (Ss = null));
  }
  function Mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ct === null ? (we.memoizedState = ct = e) : (ct = ct.next = e), ct);
  }
  function ot() {
    if (Ie === null) {
      var e = we.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var n = ct === null ? we.memoizedState : ct.next;
    if (n !== null) ((ct = n), (Ie = e));
    else {
      if (e === null)
        throw we.alternate === null ? Error(o(467)) : Error(o(310));
      ((Ie = e),
        (e = {
          memoizedState: Ie.memoizedState,
          baseState: Ie.baseState,
          baseQueue: Ie.baseQueue,
          queue: Ie.queue,
          next: null,
        }),
        ct === null ? (we.memoizedState = ct = e) : (ct = ct.next = e));
    }
    return ct;
  }
  function ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function To(e) {
    var n = jo;
    return (
      (jo += 1),
      Ss === null && (Ss = []),
      (e = gm(Ss, e, n)),
      (n = we),
      (ct === null ? n.memoizedState : ct.next) === null &&
        ((n = n.alternate),
        (M.H = n === null || n.memoizedState === null ? lg : id)),
      e
    );
  }
  function ri(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return To(e);
      if (e.$$typeof === P) return St(e);
    }
    throw Error(o(438, String(e)));
  }
  function Zu(e) {
    var n = null,
      r = we.updateQueue;
    if ((r !== null && (n = r.memoCache), n == null)) {
      var l = we.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (n = {
              data: l.data.map(function (d) {
                return d.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      r === null && ((r = ai()), (we.updateQueue = r)),
      (r.memoCache = n),
      (r = n.data[n.index]),
      r === void 0)
    )
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++) r[l] = $;
    return (n.index++, r);
  }
  function da(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function si(e) {
    var n = ot();
    return Wu(n, Ie, e);
  }
  function Wu(e, n, r) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = r;
    var d = e.baseQueue,
      h = l.pending;
    if (h !== null) {
      if (d !== null) {
        var b = d.next;
        ((d.next = h.next), (h.next = b));
      }
      ((n.baseQueue = d = h), (l.pending = null));
    }
    if (((h = e.baseState), d === null)) e.memoizedState = h;
    else {
      n = d.next;
      var C = (b = null),
        T = null,
        Q = n,
        J = !1;
      do {
        var te = Q.lane & -536870913;
        if (te !== Q.lane ? (je & te) === te : (ua & te) === te) {
          var Y = Q.revertLane;
          if (Y === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: Q.action,
                  hasEagerState: Q.hasEagerState,
                  eagerState: Q.eagerState,
                  next: null,
                }),
              te === ms && (J = !0));
          else if ((ua & Y) === Y) {
            ((Q = Q.next), Y === ms && (J = !0));
            continue;
          } else
            ((te = {
              lane: 0,
              revertLane: Q.revertLane,
              gesture: null,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null,
            }),
              T === null ? ((C = T = te), (b = h)) : (T = T.next = te),
              (we.lanes |= Y),
              (Ia |= Y));
          ((te = Q.action),
            Tr && r(h, te),
            (h = Q.hasEagerState ? Q.eagerState : r(h, te)));
        } else
          ((Y = {
            lane: te,
            revertLane: Q.revertLane,
            gesture: Q.gesture,
            action: Q.action,
            hasEagerState: Q.hasEagerState,
            eagerState: Q.eagerState,
            next: null,
          }),
            T === null ? ((C = T = Y), (b = h)) : (T = T.next = Y),
            (we.lanes |= te),
            (Ia |= te));
        Q = Q.next;
      } while (Q !== null && Q !== n);
      if (
        (T === null ? (b = h) : (T.next = C),
        !Gt(h, e.memoizedState) && ((ut = !0), J && ((r = gs), r !== null)))
      )
        throw r;
      ((e.memoizedState = h),
        (e.baseState = b),
        (e.baseQueue = T),
        (l.lastRenderedState = h));
    }
    return (d === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function Ju(e) {
    var n = ot(),
      r = n.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch,
      d = r.pending,
      h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var b = (d = d.next);
      do ((h = e(h, b.action)), (b = b.next));
      while (b !== d);
      (Gt(h, n.memoizedState) || (ut = !0),
        (n.memoizedState = h),
        n.baseQueue === null && (n.baseState = h),
        (r.lastRenderedState = h));
    }
    return [h, l];
  }
  function Rm(e, n, r) {
    var l = we,
      d = ot(),
      h = De;
    if (h) {
      if (r === void 0) throw Error(o(407));
      r = r();
    } else r = n();
    var b = !Gt((Ie || d).memoizedState, r);
    if (
      (b && ((d.memoizedState = r), (ut = !0)),
      (d = d.queue),
      nd(jm.bind(null, l, d, e), [e]),
      d.getSnapshot !== n || b || (ct !== null && ct.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        ws(9, { destroy: void 0 }, _m.bind(null, l, d, r, n), null),
        Ge === null)
      )
        throw Error(o(349));
      h || (ua & 127) !== 0 || Om(l, n, r);
    }
    return r;
  }
  function Om(e, n, r) {
    ((e.flags |= 16384),
      (e = { getSnapshot: n, value: r }),
      (n = we.updateQueue),
      n === null
        ? ((n = ai()), (we.updateQueue = n), (n.stores = [e]))
        : ((r = n.stores), r === null ? (n.stores = [e]) : r.push(e)));
  }
  function _m(e, n, r, l) {
    ((n.value = r), (n.getSnapshot = l), Tm(n) && Mm(e));
  }
  function jm(e, n, r) {
    return r(function () {
      Tm(n) && Mm(e);
    });
  }
  function Tm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !Gt(e, r);
    } catch {
      return !0;
    }
  }
  function Mm(e) {
    var n = wr(e, 2);
    n !== null && Vt(n, e, 2);
  }
  function ed(e) {
    var n = Mt();
    if (typeof e == "function") {
      var r = e;
      if (((e = r()), Tr)) {
        xn(!0);
        try {
          r();
        } finally {
          xn(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = e),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: da,
        lastRenderedState: e,
      }),
      n
    );
  }
  function Dm(e, n, r, l) {
    return ((e.baseState = r), Wu(e, Ie, typeof l == "function" ? l : da));
  }
  function Ww(e, n, r, l, d) {
    if (ii(e)) throw Error(o(485));
    if (((e = n.action), e !== null)) {
      var h = {
        payload: d,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (b) {
          h.listeners.push(b);
        },
      };
      (M.T !== null ? r(!0) : (h.isTransition = !1),
        l(h),
        (r = n.pending),
        r === null
          ? ((h.next = n.pending = h), zm(n, h))
          : ((h.next = r.next), (n.pending = r.next = h)));
    }
  }
  function zm(e, n) {
    var r = n.action,
      l = n.payload,
      d = e.state;
    if (n.isTransition) {
      var h = M.T,
        b = {};
      M.T = b;
      try {
        var C = r(d, l),
          T = M.S;
        (T !== null && T(b, C), Pm(e, n, C));
      } catch (Q) {
        td(e, n, Q);
      } finally {
        (h !== null && b.types !== null && (h.types = b.types), (M.T = h));
      }
    } else
      try {
        ((h = r(d, l)), Pm(e, n, h));
      } catch (Q) {
        td(e, n, Q);
      }
  }
  function Pm(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function"
      ? r.then(
          function (l) {
            km(e, n, l);
          },
          function (l) {
            return td(e, n, l);
          },
        )
      : km(e, n, r);
  }
  function km(e, n, r) {
    ((n.status = "fulfilled"),
      (n.value = r),
      Hm(n),
      (e.state = r),
      (n = e.pending),
      n !== null &&
        ((r = n.next),
        r === n ? (e.pending = null) : ((r = r.next), (n.next = r), zm(e, r))));
  }
  function td(e, n, r) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((n.status = "rejected"), (n.reason = r), Hm(n), (n = n.next));
      while (n !== l);
    }
    e.action = null;
  }
  function Hm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Lm(e, n) {
    return n;
  }
  function Um(e, n) {
    if (De) {
      var r = Ge.formState;
      if (r !== null) {
        e: {
          var l = we;
          if (De) {
            if (Xe) {
              t: {
                for (var d = Xe, h = fn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (((d = pn(d.nextSibling)), d === null)) {
                    d = null;
                    break t;
                  }
                }
                ((h = d.data), (d = h === "F!" || h === "F" ? d : null));
              }
              if (d) {
                ((Xe = pn(d.nextSibling)), (l = d.data === "F!"));
                break e;
              }
            }
            Pa(l);
          }
          l = !1;
        }
        l && (n = r[0]);
      }
    }
    return (
      (r = Mt()),
      (r.memoizedState = r.baseState = n),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lm,
        lastRenderedState: n,
      }),
      (r.queue = l),
      (r = rg.bind(null, we, l)),
      (l.dispatch = r),
      (l = ed(!1)),
      (h = ld.bind(null, we, !1, l.queue)),
      (l = Mt()),
      (d = { state: n, dispatch: null, action: e, pending: null }),
      (l.queue = d),
      (r = Ww.bind(null, we, d, h, r)),
      (d.dispatch = r),
      (l.memoizedState = e),
      [n, r, !1]
    );
  }
  function Bm(e) {
    var n = ot();
    return qm(n, Ie, e);
  }
  function qm(e, n, r) {
    if (
      ((n = Wu(e, n, Lm)[0]),
      (e = si(da)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var l = To(n);
      } catch (b) {
        throw b === vs ? Xl : b;
      }
    else l = n;
    n = ot();
    var d = n.queue,
      h = d.dispatch;
    return (
      r !== n.memoizedState &&
        ((we.flags |= 2048),
        ws(9, { destroy: void 0 }, Jw.bind(null, d, r), null)),
      [l, h, e]
    );
  }
  function Jw(e, n) {
    e.action = n;
  }
  function Qm(e) {
    var n = ot(),
      r = Ie;
    if (r !== null) return qm(n, r, e);
    (ot(), (n = n.memoizedState), (r = ot()));
    var l = r.queue.dispatch;
    return ((r.memoizedState = e), [n, l, !1]);
  }
  function ws(e, n, r, l) {
    return (
      (e = { tag: e, create: r, deps: l, inst: n, next: null }),
      (n = we.updateQueue),
      n === null && ((n = ai()), (we.updateQueue = n)),
      (r = n.lastEffect),
      r === null
        ? (n.lastEffect = e.next = e)
        : ((l = r.next), (r.next = e), (e.next = l), (n.lastEffect = e)),
      e
    );
  }
  function Vm() {
    return ot().memoizedState;
  }
  function oi(e, n, r, l) {
    var d = Mt();
    ((we.flags |= e),
      (d.memoizedState = ws(
        1 | n,
        { destroy: void 0 },
        r,
        l === void 0 ? null : l,
      )));
  }
  function li(e, n, r, l) {
    var d = ot();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    Ie !== null && l !== null && $u(l, Ie.memoizedState.deps)
      ? (d.memoizedState = ws(n, h, r, l))
      : ((we.flags |= e), (d.memoizedState = ws(1 | n, h, r, l)));
  }
  function Im(e, n) {
    oi(8390656, 8, e, n);
  }
  function nd(e, n) {
    li(2048, 8, e, n);
  }
  function e2(e) {
    we.flags |= 4;
    var n = we.updateQueue;
    if (n === null) ((n = ai()), (we.updateQueue = n), (n.events = [e]));
    else {
      var r = n.events;
      r === null ? (n.events = [e]) : r.push(e);
    }
  }
  function Ym(e) {
    var n = ot().memoizedState;
    return (
      e2({ ref: n, nextImpl: e }),
      function () {
        if ((Be & 2) !== 0) throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      }
    );
  }
  function $m(e, n) {
    return li(4, 2, e, n);
  }
  function Gm(e, n) {
    return li(4, 4, e, n);
  }
  function Fm(e, n) {
    if (typeof n == "function") {
      e = e();
      var r = n(e);
      return function () {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null;
        }
      );
  }
  function Xm(e, n, r) {
    ((r = r != null ? r.concat([e]) : null), li(4, 4, Fm.bind(null, n, e), r));
  }
  function ad() {}
  function Km(e, n) {
    var r = ot();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && $u(n, l[1]) ? l[0] : ((r.memoizedState = [e, n]), e);
  }
  function Zm(e, n) {
    var r = ot();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && $u(n, l[1])) return l[0];
    if (((l = e()), Tr)) {
      xn(!0);
      try {
        e();
      } finally {
        xn(!1);
      }
    }
    return ((r.memoizedState = [l, n]), l);
  }
  function rd(e, n, r) {
    return r === void 0 || ((ua & 1073741824) !== 0 && (je & 261930) === 0)
      ? (e.memoizedState = n)
      : ((e.memoizedState = r), (e = Wg()), (we.lanes |= e), (Ia |= e), r);
  }
  function Wm(e, n, r, l) {
    return Gt(r, n)
      ? r
      : xs.current !== null
        ? ((e = rd(e, r, l)), Gt(e, n) || (ut = !0), e)
        : (ua & 42) === 0 || ((ua & 1073741824) !== 0 && (je & 261930) === 0)
          ? ((ut = !0), (e.memoizedState = r))
          : ((e = Wg()), (we.lanes |= e), (Ia |= e), n);
  }
  function Jm(e, n, r, l, d) {
    var h = V.p;
    V.p = h !== 0 && 8 > h ? h : 8;
    var b = M.T,
      C = {};
    ((M.T = C), ld(e, !1, n, r));
    try {
      var T = d(),
        Q = M.S;
      if (
        (Q !== null && Q(C, T),
        T !== null && typeof T == "object" && typeof T.then == "function")
      ) {
        var J = Xw(T, l);
        Mo(e, n, J, Jt(e));
      } else Mo(e, n, l, Jt(e));
    } catch (te) {
      Mo(e, n, { then: function () {}, status: "rejected", reason: te }, Jt());
    } finally {
      ((V.p = h),
        b !== null && C.types !== null && (b.types = C.types),
        (M.T = b));
    }
  }
  function t2() {}
  function sd(e, n, r, l) {
    if (e.tag !== 5) throw Error(o(476));
    var d = eg(e).queue;
    Jm(
      e,
      d,
      n,
      H,
      r === null
        ? t2
        : function () {
            return (tg(e), r(l));
          },
    );
  }
  function eg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: H,
      baseState: H,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: da,
        lastRenderedState: H,
      },
      next: null,
    };
    var r = {};
    return (
      (n.next = {
        memoizedState: r,
        baseState: r,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: da,
          lastRenderedState: r,
        },
        next: null,
      }),
      (e.memoizedState = n),
      (e = e.alternate),
      e !== null && (e.memoizedState = n),
      n
    );
  }
  function tg(e) {
    var n = eg(e);
    (n.next === null && (n = e.alternate.memoizedState),
      Mo(e, n.next.queue, {}, Jt()));
  }
  function od() {
    return St(Xo);
  }
  function ng() {
    return ot().memoizedState;
  }
  function ag() {
    return ot().memoizedState;
  }
  function n2(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Jt();
          e = La(r);
          var l = Ua(n, e, r);
          (l !== null && (Vt(l, n, r), Ro(l, n, r)),
            (n = { cache: Pu() }),
            (e.payload = n));
          return;
      }
      n = n.return;
    }
  }
  function a2(e, n, r) {
    var l = Jt();
    ((r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ii(e)
        ? sg(n, r)
        : ((r = Cu(e, n, r, l)), r !== null && (Vt(r, e, l), og(r, n, l))));
  }
  function rg(e, n, r) {
    var l = Jt();
    Mo(e, n, r, l);
  }
  function Mo(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ii(e)) sg(n, d);
    else {
      var h = e.alternate;
      if (
        e.lanes === 0 &&
        (h === null || h.lanes === 0) &&
        ((h = n.lastRenderedReducer), h !== null)
      )
        try {
          var b = n.lastRenderedState,
            C = h(b, r);
          if (((d.hasEagerState = !0), (d.eagerState = C), Gt(C, b)))
            return (Ql(e, n, d, 0), Ge === null && ql(), !1);
        } catch {}
      if (((r = Cu(e, n, d, l)), r !== null))
        return (Vt(r, e, l), og(r, n, l), !0);
    }
    return !1;
  }
  function ld(e, n, r, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Ud(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ii(e))
    ) {
      if (n) throw Error(o(479));
    } else ((n = Cu(e, r, l, 2)), n !== null && Vt(n, e, 2));
  }
  function ii(e) {
    var n = e.alternate;
    return e === we || (n !== null && n === we);
  }
  function sg(e, n) {
    bs = ti = !0;
    var r = e.pending;
    (r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)),
      (e.pending = n));
  }
  function og(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      ((l &= e.pendingLanes), (r |= l), (n.lanes = r), Pt(e, r));
    }
  }
  var Do = {
    readContext: St,
    use: ri,
    useCallback: nt,
    useContext: nt,
    useEffect: nt,
    useImperativeHandle: nt,
    useLayoutEffect: nt,
    useInsertionEffect: nt,
    useMemo: nt,
    useReducer: nt,
    useRef: nt,
    useState: nt,
    useDebugValue: nt,
    useDeferredValue: nt,
    useTransition: nt,
    useSyncExternalStore: nt,
    useId: nt,
    useHostTransitionStatus: nt,
    useFormState: nt,
    useActionState: nt,
    useOptimistic: nt,
    useMemoCache: nt,
    useCacheRefresh: nt,
  };
  Do.useEffectEvent = nt;
  var lg = {
      readContext: St,
      use: ri,
      useCallback: function (e, n) {
        return ((Mt().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: St,
      useEffect: Im,
      useImperativeHandle: function (e, n, r) {
        ((r = r != null ? r.concat([e]) : null),
          oi(4194308, 4, Fm.bind(null, n, e), r));
      },
      useLayoutEffect: function (e, n) {
        return oi(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        oi(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var r = Mt();
        n = n === void 0 ? null : n;
        var l = e();
        if (Tr) {
          xn(!0);
          try {
            e();
          } finally {
            xn(!1);
          }
        }
        return ((r.memoizedState = [l, n]), l);
      },
      useReducer: function (e, n, r) {
        var l = Mt();
        if (r !== void 0) {
          var d = r(n);
          if (Tr) {
            xn(!0);
            try {
              r(n);
            } finally {
              xn(!1);
            }
          }
        } else d = n;
        return (
          (l.memoizedState = l.baseState = d),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: d,
          }),
          (l.queue = e),
          (e = e.dispatch = a2.bind(null, we, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = Mt();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: function (e) {
        e = ed(e);
        var n = e.queue,
          r = rg.bind(null, we, n);
        return ((n.dispatch = r), [e.memoizedState, r]);
      },
      useDebugValue: ad,
      useDeferredValue: function (e, n) {
        var r = Mt();
        return rd(r, e, n);
      },
      useTransition: function () {
        var e = ed(!1);
        return (
          (e = Jm.bind(null, we, e.queue, !0, !1)),
          (Mt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, n, r) {
        var l = we,
          d = Mt();
        if (De) {
          if (r === void 0) throw Error(o(407));
          r = r();
        } else {
          if (((r = n()), Ge === null)) throw Error(o(349));
          (je & 127) !== 0 || Om(l, n, r);
        }
        d.memoizedState = r;
        var h = { value: r, getSnapshot: n };
        return (
          (d.queue = h),
          Im(jm.bind(null, l, h, e), [e]),
          (l.flags |= 2048),
          ws(9, { destroy: void 0 }, _m.bind(null, l, h, r, n), null),
          r
        );
      },
      useId: function () {
        var e = Mt(),
          n = Ge.identifierPrefix;
        if (De) {
          var r = zn,
            l = Dn;
          ((r = (l & ~(1 << (32 - At(l) - 1))).toString(32) + r),
            (n = "_" + n + "R_" + r),
            (r = ni++),
            0 < r && (n += "H" + r.toString(32)),
            (n += "_"));
        } else ((r = Kw++), (n = "_" + n + "r_" + r.toString(32) + "_"));
        return (e.memoizedState = n);
      },
      useHostTransitionStatus: od,
      useFormState: Um,
      useActionState: Um,
      useOptimistic: function (e) {
        var n = Mt();
        n.memoizedState = n.baseState = e;
        var r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = r),
          (n = ld.bind(null, we, !0, r)),
          (r.dispatch = n),
          [e, n]
        );
      },
      useMemoCache: Zu,
      useCacheRefresh: function () {
        return (Mt().memoizedState = n2.bind(null, we));
      },
      useEffectEvent: function (e) {
        var n = Mt(),
          r = { impl: e };
        return (
          (n.memoizedState = r),
          function () {
            if ((Be & 2) !== 0) throw Error(o(440));
            return r.impl.apply(void 0, arguments);
          }
        );
      },
    },
    id = {
      readContext: St,
      use: ri,
      useCallback: Km,
      useContext: St,
      useEffect: nd,
      useImperativeHandle: Xm,
      useInsertionEffect: $m,
      useLayoutEffect: Gm,
      useMemo: Zm,
      useReducer: si,
      useRef: Vm,
      useState: function () {
        return si(da);
      },
      useDebugValue: ad,
      useDeferredValue: function (e, n) {
        var r = ot();
        return Wm(r, Ie.memoizedState, e, n);
      },
      useTransition: function () {
        var e = si(da)[0],
          n = ot().memoizedState;
        return [typeof e == "boolean" ? e : To(e), n];
      },
      useSyncExternalStore: Rm,
      useId: ng,
      useHostTransitionStatus: od,
      useFormState: Bm,
      useActionState: Bm,
      useOptimistic: function (e, n) {
        var r = ot();
        return Dm(r, Ie, e, n);
      },
      useMemoCache: Zu,
      useCacheRefresh: ag,
    };
  id.useEffectEvent = Ym;
  var ig = {
    readContext: St,
    use: ri,
    useCallback: Km,
    useContext: St,
    useEffect: nd,
    useImperativeHandle: Xm,
    useInsertionEffect: $m,
    useLayoutEffect: Gm,
    useMemo: Zm,
    useReducer: Ju,
    useRef: Vm,
    useState: function () {
      return Ju(da);
    },
    useDebugValue: ad,
    useDeferredValue: function (e, n) {
      var r = ot();
      return Ie === null ? rd(r, e, n) : Wm(r, Ie.memoizedState, e, n);
    },
    useTransition: function () {
      var e = Ju(da)[0],
        n = ot().memoizedState;
      return [typeof e == "boolean" ? e : To(e), n];
    },
    useSyncExternalStore: Rm,
    useId: ng,
    useHostTransitionStatus: od,
    useFormState: Qm,
    useActionState: Qm,
    useOptimistic: function (e, n) {
      var r = ot();
      return Ie !== null
        ? Dm(r, Ie, e, n)
        : ((r.baseState = e), [e, r.queue.dispatch]);
    },
    useMemoCache: Zu,
    useCacheRefresh: ag,
  };
  ig.useEffectEvent = Ym;
  function cd(e, n, r, l) {
    ((n = e.memoizedState),
      (r = r(l, n)),
      (r = r == null ? n : v({}, n, r)),
      (e.memoizedState = r),
      e.lanes === 0 && (e.updateQueue.baseState = r));
  }
  var ud = {
    enqueueSetState: function (e, n, r) {
      e = e._reactInternals;
      var l = Jt(),
        d = La(l);
      ((d.payload = n),
        r != null && (d.callback = r),
        (n = Ua(e, d, l)),
        n !== null && (Vt(n, e, l), Ro(n, e, l)));
    },
    enqueueReplaceState: function (e, n, r) {
      e = e._reactInternals;
      var l = Jt(),
        d = La(l);
      ((d.tag = 1),
        (d.payload = n),
        r != null && (d.callback = r),
        (n = Ua(e, d, l)),
        n !== null && (Vt(n, e, l), Ro(n, e, l)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var r = Jt(),
        l = La(r);
      ((l.tag = 2),
        n != null && (l.callback = n),
        (n = Ua(e, l, r)),
        n !== null && (Vt(n, e, r), Ro(n, e, r)));
    },
  };
  function cg(e, n, r, l, d, h, b) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, h, b)
        : n.prototype && n.prototype.isPureReactComponent
          ? !xo(r, l) || !xo(d, h)
          : !0
    );
  }
  function ug(e, n, r, l) {
    ((e = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(r, l),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(r, l),
      n.state !== e && ud.enqueueReplaceState(n, n.state, null));
  }
  function Mr(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var l in n) l !== "ref" && (r[l] = n[l]);
    }
    if ((e = e.defaultProps)) {
      r === n && (r = v({}, r));
      for (var d in e) r[d] === void 0 && (r[d] = e[d]);
    }
    return r;
  }
  function dg(e) {
    Bl(e);
  }
  function fg(e) {
    console.error(e);
  }
  function hg(e) {
    Bl(e);
  }
  function ci(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function pg(e, n, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (d) {
      setTimeout(function () {
        throw d;
      });
    }
  }
  function dd(e, n, r) {
    return (
      (r = La(r)),
      (r.tag = 3),
      (r.payload = { element: null }),
      (r.callback = function () {
        ci(e, n);
      }),
      r
    );
  }
  function mg(e) {
    return ((e = La(e)), (e.tag = 3), e);
  }
  function gg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      ((e.payload = function () {
        return d(h);
      }),
        (e.callback = function () {
          pg(n, r, l);
        }));
    }
    var b = r.stateNode;
    b !== null &&
      typeof b.componentDidCatch == "function" &&
      (e.callback = function () {
        (pg(n, r, l),
          typeof d != "function" &&
            (Ya === null ? (Ya = new Set([this])) : Ya.add(this)));
        var C = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: C !== null ? C : "",
        });
      });
  }
  function r2(e, n, r, l, d) {
    if (
      ((r.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((n = r.alternate),
        n !== null && ps(n, r, d, !0),
        (r = Xt.current),
        r !== null)
      ) {
        switch (r.tag) {
          case 31:
          case 13:
            return (
              hn === null ? Si() : r.alternate === null && at === 0 && (at = 3),
              (r.flags &= -257),
              (r.flags |= 65536),
              (r.lanes = d),
              l === Kl
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null ? (r.updateQueue = new Set([l])) : n.add(l),
                  kd(e, l, d)),
              !1
            );
          case 22:
            return (
              (r.flags |= 65536),
              l === Kl
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (r.updateQueue = n))
                    : ((r = n.retryQueue),
                      r === null ? (n.retryQueue = new Set([l])) : r.add(l)),
                  kd(e, l, d)),
              !1
            );
        }
        throw Error(o(435, r.tag));
      }
      return (kd(e, l, d), Si(), !1);
    }
    if (De)
      return (
        (n = Xt.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = d),
            l !== ju && ((e = Error(o(422), { cause: l })), wo(cn(e, r))))
          : (l !== ju && ((n = Error(o(423), { cause: l })), wo(cn(n, r))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (d &= -d),
            (e.lanes |= d),
            (l = cn(l, r)),
            (d = dd(e.stateNode, l, d)),
            qu(e, d),
            at !== 4 && (at = 2)),
        !1
      );
    var h = Error(o(520), { cause: l });
    if (
      ((h = cn(h, r)),
      qo === null ? (qo = [h]) : qo.push(h),
      at !== 4 && (at = 2),
      n === null)
    )
      return !0;
    ((l = cn(l, r)), (r = n));
    do {
      switch (r.tag) {
        case 3:
          return (
            (r.flags |= 65536),
            (e = d & -d),
            (r.lanes |= e),
            (e = dd(r.stateNode, l, e)),
            qu(r, e),
            !1
          );
        case 1:
          if (
            ((n = r.type),
            (h = r.stateNode),
            (r.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (h !== null &&
                  typeof h.componentDidCatch == "function" &&
                  (Ya === null || !Ya.has(h)))))
          )
            return (
              (r.flags |= 65536),
              (d &= -d),
              (r.lanes |= d),
              (d = mg(d)),
              gg(d, e, r, l),
              qu(r, d),
              !1
            );
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var fd = Error(o(461)),
    ut = !1;
  function wt(e, n, r, l) {
    n.child = e === null ? bm(n, null, r, l) : jr(n, e.child, r, l);
  }
  function vg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var b = {};
      for (var C in l) C !== "ref" && (b[C] = l[C]);
    } else b = l;
    return (
      Nr(n),
      (l = Gu(e, n, r, b, h, d)),
      (C = Fu()),
      e !== null && !ut
        ? (Xu(e, n, d), fa(e, n, d))
        : (De && C && Ou(n), (n.flags |= 1), wt(e, n, l, d), n.child)
    );
  }
  function yg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" &&
        !Au(h) &&
        h.defaultProps === void 0 &&
        r.compare === null
        ? ((n.tag = 15), (n.type = h), xg(e, n, h, l, d))
        : ((e = Il(r.type, null, l, n, n.mode, d)),
          (e.ref = n.ref),
          (e.return = n),
          (n.child = e));
    }
    if (((h = e.child), !bd(e, d))) {
      var b = h.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : xo), r(b, l) && e.ref === n.ref)
      )
        return fa(e, n, d);
    }
    return (
      (n.flags |= 1),
      (e = oa(h, l)),
      (e.ref = n.ref),
      (e.return = n),
      (n.child = e)
    );
  }
  function xg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (xo(h, l) && e.ref === n.ref)
        if (((ut = !1), (n.pendingProps = l = h), bd(e, d)))
          (e.flags & 131072) !== 0 && (ut = !0);
        else return ((n.lanes = e.lanes), fa(e, n, d));
    }
    return hd(e, n, r, l, d);
  }
  function bg(e, n, r, l) {
    var d = l.children,
      h = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        n.stateNode === null &&
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.mode === "hidden")
    ) {
      if ((n.flags & 128) !== 0) {
        if (((h = h !== null ? h.baseLanes | r : r), e !== null)) {
          for (l = n.child = e.child, d = 0; l !== null; )
            ((d = d | l.lanes | l.childLanes), (l = l.sibling));
          l = d & ~h;
        } else ((l = 0), (n.child = null));
        return Sg(e, n, h, r, l);
      }
      if ((r & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Fl(n, h !== null ? h.cachePool : null),
          h !== null ? Em(n, h) : Vu(),
          Cm(n));
      else
        return (
          (l = n.lanes = 536870912),
          Sg(e, n, h !== null ? h.baseLanes | r : r, r, l)
        );
    } else
      h !== null
        ? (Fl(n, h.cachePool), Em(n, h), qa(), (n.memoizedState = null))
        : (e !== null && Fl(n, null), Vu(), qa());
    return (wt(e, n, d, r), n.child);
  }
  function zo(e, n) {
    return (
      (e !== null && e.tag === 22) ||
        n.stateNode !== null ||
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.sibling
    );
  }
  function Sg(e, n, r, l, d) {
    var h = Hu();
    return (
      (h = h === null ? null : { parent: it._currentValue, pool: h }),
      (n.memoizedState = { baseLanes: r, cachePool: h }),
      e !== null && Fl(n, null),
      Vu(),
      Cm(n),
      e !== null && ps(e, n, l, !0),
      (n.childLanes = d),
      null
    );
  }
  function ui(e, n) {
    return (
      (n = fi({ mode: n.mode, children: n.children }, e.mode)),
      (n.ref = e.ref),
      (e.child = n),
      (n.return = e),
      n
    );
  }
  function wg(e, n, r) {
    return (
      jr(n, e.child, null, r),
      (e = ui(n, n.pendingProps)),
      (e.flags |= 2),
      Kt(n),
      (n.memoizedState = null),
      e
    );
  }
  function s2(e, n, r) {
    var l = n.pendingProps,
      d = (n.flags & 128) !== 0;
    if (((n.flags &= -129), e === null)) {
      if (De) {
        if (l.mode === "hidden")
          return ((e = ui(n, l)), (n.lanes = 536870912), zo(null, e));
        if (
          (Yu(n),
          (e = Xe)
            ? ((e = zv(e, fn)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((n.memoizedState = {
                  dehydrated: e,
                  treeContext: Da !== null ? { id: Dn, overflow: zn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (r = sm(e)),
                (r.return = n),
                (n.child = r),
                (bt = n),
                (Xe = null)))
            : (e = null),
          e === null)
        )
          throw Pa(n);
        return ((n.lanes = 536870912), null);
      }
      return ui(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var b = h.dehydrated;
      if ((Yu(n), d))
        if (n.flags & 256) ((n.flags &= -257), (n = wg(e, n, r)));
        else if (n.memoizedState !== null)
          ((n.child = e.child), (n.flags |= 128), (n = null));
        else throw Error(o(558));
      else if (
        (ut || ps(e, n, r, !1), (d = (r & e.childLanes) !== 0), ut || d)
      ) {
        if (
          ((l = Ge),
          l !== null && ((b = kt(l, r)), b !== 0 && b !== h.retryLane))
        )
          throw ((h.retryLane = b), wr(e, b), Vt(l, e, b), fd);
        (Si(), (n = wg(e, n, r)));
      } else
        ((e = h.treeContext),
          (Xe = pn(b.nextSibling)),
          (bt = n),
          (De = !0),
          (za = null),
          (fn = !1),
          e !== null && im(n, e),
          (n = ui(n, l)),
          (n.flags |= 4096));
      return n;
    }
    return (
      (e = oa(e.child, { mode: l.mode, children: l.children })),
      (e.ref = n.ref),
      (n.child = e),
      (e.return = n),
      e
    );
  }
  function di(e, n) {
    var r = n.ref;
    if (r === null) e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object") throw Error(o(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function hd(e, n, r, l, d) {
    return (
      Nr(n),
      (r = Gu(e, n, r, l, void 0, d)),
      (l = Fu()),
      e !== null && !ut
        ? (Xu(e, n, d), fa(e, n, d))
        : (De && l && Ou(n), (n.flags |= 1), wt(e, n, r, d), n.child)
    );
  }
  function Eg(e, n, r, l, d, h) {
    return (
      Nr(n),
      (n.updateQueue = null),
      (r = Nm(n, l, r, d)),
      Am(e),
      (l = Fu()),
      e !== null && !ut
        ? (Xu(e, n, h), fa(e, n, h))
        : (De && l && Ou(n), (n.flags |= 1), wt(e, n, r, h), n.child)
    );
  }
  function Cg(e, n, r, l, d) {
    if ((Nr(n), n.stateNode === null)) {
      var h = us,
        b = r.contextType;
      (typeof b == "object" && b !== null && (h = St(b)),
        (h = new r(l, h)),
        (n.memoizedState =
          h.state !== null && h.state !== void 0 ? h.state : null),
        (h.updater = ud),
        (n.stateNode = h),
        (h._reactInternals = n),
        (h = n.stateNode),
        (h.props = l),
        (h.state = n.memoizedState),
        (h.refs = {}),
        Uu(n),
        (b = r.contextType),
        (h.context = typeof b == "object" && b !== null ? St(b) : us),
        (h.state = n.memoizedState),
        (b = r.getDerivedStateFromProps),
        typeof b == "function" && (cd(n, r, b, l), (h.state = n.memoizedState)),
        typeof r.getDerivedStateFromProps == "function" ||
          typeof h.getSnapshotBeforeUpdate == "function" ||
          (typeof h.UNSAFE_componentWillMount != "function" &&
            typeof h.componentWillMount != "function") ||
          ((b = h.state),
          typeof h.componentWillMount == "function" && h.componentWillMount(),
          typeof h.UNSAFE_componentWillMount == "function" &&
            h.UNSAFE_componentWillMount(),
          b !== h.state && ud.enqueueReplaceState(h, h.state, null),
          _o(n, l, h, d),
          Oo(),
          (h.state = n.memoizedState)),
        typeof h.componentDidMount == "function" && (n.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      h = n.stateNode;
      var C = n.memoizedProps,
        T = Mr(r, C);
      h.props = T;
      var Q = h.context,
        J = r.contextType;
      ((b = us), typeof J == "object" && J !== null && (b = St(J)));
      var te = r.getDerivedStateFromProps;
      ((J =
        typeof te == "function" ||
        typeof h.getSnapshotBeforeUpdate == "function"),
        (C = n.pendingProps !== C),
        J ||
          (typeof h.UNSAFE_componentWillReceiveProps != "function" &&
            typeof h.componentWillReceiveProps != "function") ||
          ((C || Q !== b) && ug(n, h, l, b)),
        (Ha = !1));
      var Y = n.memoizedState;
      ((h.state = Y),
        _o(n, l, h, d),
        Oo(),
        (Q = n.memoizedState),
        C || Y !== Q || Ha
          ? (typeof te == "function" &&
              (cd(n, r, te, l), (Q = n.memoizedState)),
            (T = Ha || cg(n, r, T, l, Y, Q, b))
              ? (J ||
                  (typeof h.UNSAFE_componentWillMount != "function" &&
                    typeof h.componentWillMount != "function") ||
                  (typeof h.componentWillMount == "function" &&
                    h.componentWillMount(),
                  typeof h.UNSAFE_componentWillMount == "function" &&
                    h.UNSAFE_componentWillMount()),
                typeof h.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof h.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = l),
                (n.memoizedState = Q)),
            (h.props = l),
            (h.state = Q),
            (h.context = b),
            (l = T))
          : (typeof h.componentDidMount == "function" && (n.flags |= 4194308),
            (l = !1)));
    } else {
      ((h = n.stateNode),
        Bu(e, n),
        (b = n.memoizedProps),
        (J = Mr(r, b)),
        (h.props = J),
        (te = n.pendingProps),
        (Y = h.context),
        (Q = r.contextType),
        (T = us),
        typeof Q == "object" && Q !== null && (T = St(Q)),
        (C = r.getDerivedStateFromProps),
        (Q =
          typeof C == "function" ||
          typeof h.getSnapshotBeforeUpdate == "function") ||
          (typeof h.UNSAFE_componentWillReceiveProps != "function" &&
            typeof h.componentWillReceiveProps != "function") ||
          ((b !== te || Y !== T) && ug(n, h, l, T)),
        (Ha = !1),
        (Y = n.memoizedState),
        (h.state = Y),
        _o(n, l, h, d),
        Oo());
      var F = n.memoizedState;
      b !== te ||
      Y !== F ||
      Ha ||
      (e !== null && e.dependencies !== null && $l(e.dependencies))
        ? (typeof C == "function" && (cd(n, r, C, l), (F = n.memoizedState)),
          (J =
            Ha ||
            cg(n, r, J, l, Y, F, T) ||
            (e !== null && e.dependencies !== null && $l(e.dependencies)))
            ? (Q ||
                (typeof h.UNSAFE_componentWillUpdate != "function" &&
                  typeof h.componentWillUpdate != "function") ||
                (typeof h.componentWillUpdate == "function" &&
                  h.componentWillUpdate(l, F, T),
                typeof h.UNSAFE_componentWillUpdate == "function" &&
                  h.UNSAFE_componentWillUpdate(l, F, T)),
              typeof h.componentDidUpdate == "function" && (n.flags |= 4),
              typeof h.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof h.componentDidUpdate != "function" ||
                (b === e.memoizedProps && Y === e.memoizedState) ||
                (n.flags |= 4),
              typeof h.getSnapshotBeforeUpdate != "function" ||
                (b === e.memoizedProps && Y === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = l),
              (n.memoizedState = F)),
          (h.props = l),
          (h.state = F),
          (h.context = T),
          (l = J))
        : (typeof h.componentDidUpdate != "function" ||
            (b === e.memoizedProps && Y === e.memoizedState) ||
            (n.flags |= 4),
          typeof h.getSnapshotBeforeUpdate != "function" ||
            (b === e.memoizedProps && Y === e.memoizedState) ||
            (n.flags |= 1024),
          (l = !1));
    }
    return (
      (h = l),
      di(e, n),
      (l = (n.flags & 128) !== 0),
      h || l
        ? ((h = n.stateNode),
          (r =
            l && typeof r.getDerivedStateFromError != "function"
              ? null
              : h.render()),
          (n.flags |= 1),
          e !== null && l
            ? ((n.child = jr(n, e.child, null, d)),
              (n.child = jr(n, null, r, d)))
            : wt(e, n, r, d),
          (n.memoizedState = h.state),
          (e = n.child))
        : (e = fa(e, n, d)),
      e
    );
  }
  function Ag(e, n, r, l) {
    return (Cr(), (n.flags |= 256), wt(e, n, r, l), n.child);
  }
  var pd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function md(e) {
    return { baseLanes: e, cachePool: pm() };
  }
  function gd(e, n, r) {
    return ((e = e !== null ? e.childLanes & ~r : 0), n && (e |= Wt), e);
  }
  function Ng(e, n, r) {
    var l = n.pendingProps,
      d = !1,
      h = (n.flags & 128) !== 0,
      b;
    if (
      ((b = h) ||
        (b =
          e !== null && e.memoizedState === null ? !1 : (st.current & 2) !== 0),
      b && ((d = !0), (n.flags &= -129)),
      (b = (n.flags & 32) !== 0),
      (n.flags &= -33),
      e === null)
    ) {
      if (De) {
        if (
          (d ? Ba(n) : qa(),
          (e = Xe)
            ? ((e = zv(e, fn)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((n.memoizedState = {
                  dehydrated: e,
                  treeContext: Da !== null ? { id: Dn, overflow: zn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (r = sm(e)),
                (r.return = n),
                (n.child = r),
                (bt = n),
                (Xe = null)))
            : (e = null),
          e === null)
        )
          throw Pa(n);
        return (Wd(e) ? (n.lanes = 32) : (n.lanes = 536870912), null);
      }
      var C = l.children;
      return (
        (l = l.fallback),
        d
          ? (qa(),
            (d = n.mode),
            (C = fi({ mode: "hidden", children: C }, d)),
            (l = Er(l, d, r, null)),
            (C.return = n),
            (l.return = n),
            (C.sibling = l),
            (n.child = C),
            (l = n.child),
            (l.memoizedState = md(r)),
            (l.childLanes = gd(e, b, r)),
            (n.memoizedState = pd),
            zo(null, l))
          : (Ba(n), vd(n, C))
      );
    }
    var T = e.memoizedState;
    if (T !== null && ((C = T.dehydrated), C !== null)) {
      if (h)
        n.flags & 256
          ? (Ba(n), (n.flags &= -257), (n = yd(e, n, r)))
          : n.memoizedState !== null
            ? (qa(), (n.child = e.child), (n.flags |= 128), (n = null))
            : (qa(),
              (C = l.fallback),
              (d = n.mode),
              (l = fi({ mode: "visible", children: l.children }, d)),
              (C = Er(C, d, r, null)),
              (C.flags |= 2),
              (l.return = n),
              (C.return = n),
              (l.sibling = C),
              (n.child = l),
              jr(n, e.child, null, r),
              (l = n.child),
              (l.memoizedState = md(r)),
              (l.childLanes = gd(e, b, r)),
              (n.memoizedState = pd),
              (n = zo(null, l)));
      else if ((Ba(n), Wd(C))) {
        if (((b = C.nextSibling && C.nextSibling.dataset), b)) var Q = b.dgst;
        ((b = Q),
          (l = Error(o(419))),
          (l.stack = ""),
          (l.digest = b),
          wo({ value: l, source: null, stack: null }),
          (n = yd(e, n, r)));
      } else if (
        (ut || ps(e, n, r, !1), (b = (r & e.childLanes) !== 0), ut || b)
      ) {
        if (
          ((b = Ge),
          b !== null && ((l = kt(b, r)), l !== 0 && l !== T.retryLane))
        )
          throw ((T.retryLane = l), wr(e, l), Vt(b, e, l), fd);
        (Zd(C) || Si(), (n = yd(e, n, r)));
      } else
        Zd(C)
          ? ((n.flags |= 192), (n.child = e.child), (n = null))
          : ((e = T.treeContext),
            (Xe = pn(C.nextSibling)),
            (bt = n),
            (De = !0),
            (za = null),
            (fn = !1),
            e !== null && im(n, e),
            (n = vd(n, l.children)),
            (n.flags |= 4096));
      return n;
    }
    return d
      ? (qa(),
        (C = l.fallback),
        (d = n.mode),
        (T = e.child),
        (Q = T.sibling),
        (l = oa(T, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = T.subtreeFlags & 65011712),
        Q !== null ? (C = oa(Q, C)) : ((C = Er(C, d, r, null)), (C.flags |= 2)),
        (C.return = n),
        (l.return = n),
        (l.sibling = C),
        (n.child = l),
        zo(null, l),
        (l = n.child),
        (C = e.child.memoizedState),
        C === null
          ? (C = md(r))
          : ((d = C.cachePool),
            d !== null
              ? ((T = it._currentValue),
                (d = d.parent !== T ? { parent: T, pool: T } : d))
              : (d = pm()),
            (C = { baseLanes: C.baseLanes | r, cachePool: d })),
        (l.memoizedState = C),
        (l.childLanes = gd(e, b, r)),
        (n.memoizedState = pd),
        zo(e.child, l))
      : (Ba(n),
        (r = e.child),
        (e = r.sibling),
        (r = oa(r, { mode: "visible", children: l.children })),
        (r.return = n),
        (r.sibling = null),
        e !== null &&
          ((b = n.deletions),
          b === null ? ((n.deletions = [e]), (n.flags |= 16)) : b.push(e)),
        (n.child = r),
        (n.memoizedState = null),
        r);
  }
  function vd(e, n) {
    return (
      (n = fi({ mode: "visible", children: n }, e.mode)),
      (n.return = e),
      (e.child = n)
    );
  }
  function fi(e, n) {
    return ((e = Ft(22, e, null, n)), (e.lanes = 0), e);
  }
  function yd(e, n, r) {
    return (
      jr(n, e.child, null, r),
      (e = vd(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    );
  }
  function Rg(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    (l !== null && (l.lanes |= n), Du(e.return, n, r));
  }
  function xd(e, n, r, l, d, h) {
    var b = e.memoizedState;
    b === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: r,
          tailMode: d,
          treeForkCount: h,
        })
      : ((b.isBackwards = n),
        (b.rendering = null),
        (b.renderingStartTime = 0),
        (b.last = l),
        (b.tail = r),
        (b.tailMode = d),
        (b.treeForkCount = h));
  }
  function Og(e, n, r) {
    var l = n.pendingProps,
      d = l.revealOrder,
      h = l.tail;
    l = l.children;
    var b = st.current,
      C = (b & 2) !== 0;
    if (
      (C ? ((b = (b & 1) | 2), (n.flags |= 128)) : (b &= 1),
      I(st, b),
      wt(e, n, l, r),
      (l = De ? So : 0),
      !C && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Rg(e, r, n);
        else if (e.tag === 19) Rg(e, r, n);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (d) {
      case "forwards":
        for (r = n.child, d = null; r !== null; )
          ((e = r.alternate),
            e !== null && ei(e) === null && (d = r),
            (r = r.sibling));
        ((r = d),
          r === null
            ? ((d = n.child), (n.child = null))
            : ((d = r.sibling), (r.sibling = null)),
          xd(n, !1, d, r, h, l));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, d = n.child, n.child = null; d !== null; ) {
          if (((e = d.alternate), e !== null && ei(e) === null)) {
            n.child = d;
            break;
          }
          ((e = d.sibling), (d.sibling = r), (r = d), (d = e));
        }
        xd(n, !0, r, null, h, l);
        break;
      case "together":
        xd(n, !1, null, null, void 0, l);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function fa(e, n, r) {
    if (
      (e !== null && (n.dependencies = e.dependencies),
      (Ia |= n.lanes),
      (r & n.childLanes) === 0)
    )
      if (e !== null) {
        if ((ps(e, n, r, !1), (r & n.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && n.child !== e.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        e = n.child, r = oa(e, e.pendingProps), n.child = r, r.return = n;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (r = r.sibling = oa(e, e.pendingProps)),
          (r.return = n));
      r.sibling = null;
    }
    return n.child;
  }
  function bd(e, n) {
    return (e.lanes & n) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && $l(e)));
  }
  function o2(e, n, r) {
    switch (n.tag) {
      case 3:
        (fe(n, n.stateNode.containerInfo),
          ka(n, it, e.memoizedState.cache),
          Cr());
        break;
      case 27:
      case 5:
        Ee(n);
        break;
      case 4:
        fe(n, n.stateNode.containerInfo);
        break;
      case 10:
        ka(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null) return ((n.flags |= 128), Yu(n), null);
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Ba(n), (n.flags |= 128), null)
            : (r & n.child.childLanes) !== 0
              ? Ng(e, n, r)
              : (Ba(n), (e = fa(e, n, r)), e !== null ? e.sibling : null);
        Ba(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (
          ((l = (r & n.childLanes) !== 0),
          l || (ps(e, n, r, !1), (l = (r & n.childLanes) !== 0)),
          d)
        ) {
          if (l) return Og(e, n, r);
          n.flags |= 128;
        }
        if (
          ((d = n.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          I(st, st.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((n.lanes = 0), bg(e, n, r, n.pendingProps));
      case 24:
        ka(n, it, e.memoizedState.cache);
    }
    return fa(e, n, r);
  }
  function _g(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps) ut = !0;
      else {
        if (!bd(e, r) && (n.flags & 128) === 0) return ((ut = !1), o2(e, n, r));
        ut = (e.flags & 131072) !== 0;
      }
    else ((ut = !1), De && (n.flags & 1048576) !== 0 && lm(n, So, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (((e = Or(n.elementType)), (n.type = e), typeof e == "function"))
            Au(e)
              ? ((l = Mr(e, l)), (n.tag = 1), (n = Cg(null, n, e, l, r)))
              : ((n.tag = 0), (n = hd(null, n, e, l, r)));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === G) {
                ((n.tag = 11), (n = vg(null, n, e, l, r)));
                break e;
              } else if (d === j) {
                ((n.tag = 14), (n = yg(null, n, e, l, r)));
                break e;
              }
            }
            throw ((n = oe(e) || e), Error(o(306, n, "")));
          }
        }
        return n;
      case 0:
        return hd(e, n, n.type, n.pendingProps, r);
      case 1:
        return ((l = n.type), (d = Mr(l, n.pendingProps)), Cg(e, n, l, d, r));
      case 3:
        e: {
          if ((fe(n, n.stateNode.containerInfo), e === null))
            throw Error(o(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          ((d = h.element), Bu(e, n), _o(n, l, null, r));
          var b = n.memoizedState;
          if (
            ((l = b.cache),
            ka(n, it, l),
            l !== h.cache && zu(n, [it], r, !0),
            Oo(),
            (l = b.element),
            h.isDehydrated)
          )
            if (
              ((h = { element: l, isDehydrated: !1, cache: b.cache }),
              (n.updateQueue.baseState = h),
              (n.memoizedState = h),
              n.flags & 256)
            ) {
              n = Ag(e, n, l, r);
              break e;
            } else if (l !== d) {
              ((d = cn(Error(o(424)), n)), wo(d), (n = Ag(e, n, l, r)));
              break e;
            } else
              for (
                e = n.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  Xe = pn(e.firstChild),
                  bt = n,
                  De = !0,
                  za = null,
                  fn = !0,
                  r = bm(n, null, l, r),
                  n.child = r;
                r;
              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
          else {
            if ((Cr(), l === d)) {
              n = fa(e, n, r);
              break e;
            }
            wt(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          di(e, n),
          e === null
            ? (r = Bv(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = r)
              : De ||
                ((r = n.type),
                (e = n.pendingProps),
                (l = Oi(ue.current).createElement(r)),
                (l[xt] = n),
                (l[Ht] = e),
                Et(l, r, e),
                gt(l),
                (n.stateNode = l))
            : (n.memoizedState = Bv(
                n.type,
                e.memoizedProps,
                n.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ee(n),
          e === null &&
            De &&
            ((l = n.stateNode = Hv(n.type, n.pendingProps, ue.current)),
            (bt = n),
            (fn = !0),
            (d = Xe),
            Xa(n.type) ? ((Jd = d), (Xe = pn(l.firstChild))) : (Xe = d)),
          wt(e, n, n.pendingProps.children, r),
          di(e, n),
          e === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          e === null &&
            De &&
            ((d = l = Xe) &&
              ((l = k2(l, n.type, n.pendingProps, fn)),
              l !== null
                ? ((n.stateNode = l),
                  (bt = n),
                  (Xe = pn(l.firstChild)),
                  (fn = !1),
                  (d = !0))
                : (d = !1)),
            d || Pa(n)),
          Ee(n),
          (d = n.type),
          (h = n.pendingProps),
          (b = e !== null ? e.memoizedProps : null),
          (l = h.children),
          Fd(d, h) ? (l = null) : b !== null && Fd(d, b) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((d = Gu(e, n, Zw, null, null, r)), (Xo._currentValue = d)),
          di(e, n),
          wt(e, n, l, r),
          n.child
        );
      case 6:
        return (
          e === null &&
            De &&
            ((e = r = Xe) &&
              ((r = H2(r, n.pendingProps, fn)),
              r !== null
                ? ((n.stateNode = r), (bt = n), (Xe = null), (e = !0))
                : (e = !1)),
            e || Pa(n)),
          null
        );
      case 13:
        return Ng(e, n, r);
      case 4:
        return (
          fe(n, n.stateNode.containerInfo),
          (l = n.pendingProps),
          e === null ? (n.child = jr(n, null, l, r)) : wt(e, n, l, r),
          n.child
        );
      case 11:
        return vg(e, n, n.type, n.pendingProps, r);
      case 7:
        return (wt(e, n, n.pendingProps, r), n.child);
      case 8:
        return (wt(e, n, n.pendingProps.children, r), n.child);
      case 12:
        return (wt(e, n, n.pendingProps.children, r), n.child);
      case 10:
        return (
          (l = n.pendingProps),
          ka(n, n.type, l.value),
          wt(e, n, l.children, r),
          n.child
        );
      case 9:
        return (
          (d = n.type._context),
          (l = n.pendingProps.children),
          Nr(n),
          (d = St(d)),
          (l = l(d)),
          (n.flags |= 1),
          wt(e, n, l, r),
          n.child
        );
      case 14:
        return yg(e, n, n.type, n.pendingProps, r);
      case 15:
        return xg(e, n, n.type, n.pendingProps, r);
      case 19:
        return Og(e, n, r);
      case 31:
        return s2(e, n, r);
      case 22:
        return bg(e, n, r, n.pendingProps);
      case 24:
        return (
          Nr(n),
          (l = St(it)),
          e === null
            ? ((d = Hu()),
              d === null &&
                ((d = Ge),
                (h = Pu()),
                (d.pooledCache = h),
                h.refCount++,
                h !== null && (d.pooledCacheLanes |= r),
                (d = h)),
              (n.memoizedState = { parent: l, cache: d }),
              Uu(n),
              ka(n, it, d))
            : ((e.lanes & r) !== 0 && (Bu(e, n), _o(n, null, null, r), Oo()),
              (d = e.memoizedState),
              (h = n.memoizedState),
              d.parent !== l
                ? ((d = { parent: l, cache: l }),
                  (n.memoizedState = d),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = d),
                  ka(n, it, l))
                : ((l = h.cache),
                  ka(n, it, l),
                  l !== d.cache && zu(n, [it], r, !0))),
          wt(e, n, n.pendingProps.children, r),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(o(156, n.tag));
  }
  function ha(e) {
    e.flags |= 4;
  }
  function Sd(e, n, r, l, d) {
    if (((n = (e.mode & 32) !== 0) && (n = !1), n)) {
      if (((e.flags |= 16777216), (d & 335544128) === d))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (nv()) e.flags |= 8192;
        else throw ((_r = Kl), Lu);
    } else e.flags &= -16777217;
  }
  function jg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Yv(n)))
      if (nv()) e.flags |= 8192;
      else throw ((_r = Kl), Lu);
  }
  function hi(e, n) {
    (n !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((n = e.tag !== 22 ? Nt() : 536870912), (e.lanes |= n), (Ns |= n)));
  }
  function Po(e, n) {
    if (!De)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null ? (e.tail = null) : (r.sibling = null);
          break;
        case "collapsed":
          r = e.tail;
          for (var l = null; r !== null; )
            (r.alternate !== null && (l = r), (r = r.sibling));
          l === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Ke(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      r = 0,
      l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        ((r |= d.lanes | d.childLanes),
          (l |= d.subtreeFlags & 65011712),
          (l |= d.flags & 65011712),
          (d.return = e),
          (d = d.sibling));
    else
      for (d = e.child; d !== null; )
        ((r |= d.lanes | d.childLanes),
          (l |= d.subtreeFlags),
          (l |= d.flags),
          (d.return = e),
          (d = d.sibling));
    return ((e.subtreeFlags |= l), (e.childLanes = r), n);
  }
  function l2(e, n, r) {
    var l = n.pendingProps;
    switch ((_u(n), n.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ke(n), null);
      case 1:
        return (Ke(n), null);
      case 3:
        return (
          (r = n.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          n.memoizedState.cache !== l && (n.flags |= 2048),
          ca(it),
          xe(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (hs(n)
              ? ha(n)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Tu())),
          Ke(n),
          null
        );
      case 26:
        var d = n.type,
          h = n.memoizedState;
        return (
          e === null
            ? (ha(n),
              h !== null ? (Ke(n), jg(n, h)) : (Ke(n), Sd(n, d, null, l, r)))
            : h
              ? h !== e.memoizedState
                ? (ha(n), Ke(n), jg(n, h))
                : (Ke(n), (n.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== l && ha(n),
                Ke(n),
                Sd(n, d, e, l, r)),
          null
        );
      case 27:
        if (
          (Ne(n),
          (r = ue.current),
          (d = n.type),
          e !== null && n.stateNode != null)
        )
          e.memoizedProps !== l && ha(n);
        else {
          if (!l) {
            if (n.stateNode === null) throw Error(o(166));
            return (Ke(n), null);
          }
          ((e = K.current),
            hs(n) ? cm(n) : ((e = Hv(d, l, r)), (n.stateNode = e), ha(n)));
        }
        return (Ke(n), null);
      case 5:
        if ((Ne(n), (d = n.type), e !== null && n.stateNode != null))
          e.memoizedProps !== l && ha(n);
        else {
          if (!l) {
            if (n.stateNode === null) throw Error(o(166));
            return (Ke(n), null);
          }
          if (((h = K.current), hs(n))) cm(n);
          else {
            var b = Oi(ue.current);
            switch (h) {
              case 1:
                h = b.createElementNS("http://www.w3.org/2000/svg", d);
                break;
              case 2:
                h = b.createElementNS("http://www.w3.org/1998/Math/MathML", d);
                break;
              default:
                switch (d) {
                  case "svg":
                    h = b.createElementNS("http://www.w3.org/2000/svg", d);
                    break;
                  case "math":
                    h = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      d,
                    );
                    break;
                  case "script":
                    ((h = b.createElement("div")),
                      (h.innerHTML = "<script><\/script>"),
                      (h = h.removeChild(h.firstChild)));
                    break;
                  case "select":
                    ((h =
                      typeof l.is == "string"
                        ? b.createElement("select", { is: l.is })
                        : b.createElement("select")),
                      l.multiple
                        ? (h.multiple = !0)
                        : l.size && (h.size = l.size));
                    break;
                  default:
                    h =
                      typeof l.is == "string"
                        ? b.createElement(d, { is: l.is })
                        : b.createElement(d);
                }
            }
            ((h[xt] = n), (h[Ht] = l));
            e: for (b = n.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6) h.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                ((b.child.return = b), (b = b.child));
                continue;
              }
              if (b === n) break e;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === n) break e;
                b = b.return;
              }
              ((b.sibling.return = b.return), (b = b.sibling));
            }
            n.stateNode = h;
            e: switch ((Et(h, d, l), d)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && ha(n);
          }
        }
        return (
          Ke(n),
          Sd(n, n.type, e === null ? null : e.memoizedProps, n.pendingProps, r),
          null
        );
      case 6:
        if (e && n.stateNode != null) e.memoizedProps !== l && ha(n);
        else {
          if (typeof l != "string" && n.stateNode === null) throw Error(o(166));
          if (((e = ue.current), hs(n))) {
            if (
              ((e = n.stateNode),
              (r = n.memoizedProps),
              (l = null),
              (d = bt),
              d !== null)
            )
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            ((e[xt] = n),
              (e = !!(
                e.nodeValue === r ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                Nv(e.nodeValue, r)
              )),
              e || Pa(n, !0));
          } else
            ((e = Oi(e).createTextNode(l)), (e[xt] = n), (n.stateNode = e));
        }
        return (Ke(n), null);
      case 31:
        if (((r = n.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = hs(n)), r !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (
                ((e = n.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(o(557));
              e[xt] = n;
            } else
              (Cr(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (Ke(n), (e = !1));
          } else
            ((r = Tu()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = r),
              (e = !0));
          if (!e) return n.flags & 256 ? (Kt(n), n) : (Kt(n), null);
          if ((n.flags & 128) !== 0) throw Error(o(558));
        }
        return (Ke(n), null);
      case 13:
        if (
          ((l = n.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((d = hs(n)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!d) throw Error(o(318));
              if (
                ((d = n.memoizedState),
                (d = d !== null ? d.dehydrated : null),
                !d)
              )
                throw Error(o(317));
              d[xt] = n;
            } else
              (Cr(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (Ke(n), (d = !1));
          } else
            ((d = Tu()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = d),
              (d = !0));
          if (!d) return n.flags & 256 ? (Kt(n), n) : (Kt(n), null);
        }
        return (
          Kt(n),
          (n.flags & 128) !== 0
            ? ((n.lanes = r), n)
            : ((r = l !== null),
              (e = e !== null && e.memoizedState !== null),
              r &&
                ((l = n.child),
                (d = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (d = l.alternate.memoizedState.cachePool.pool),
                (h = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (h = l.memoizedState.cachePool.pool),
                h !== d && (l.flags |= 2048)),
              r !== e && r && (n.child.flags |= 8192),
              hi(n, n.updateQueue),
              Ke(n),
              null)
        );
      case 4:
        return (xe(), e === null && Vd(n.stateNode.containerInfo), Ke(n), null);
      case 10:
        return (ca(n.type), Ke(n), null);
      case 19:
        if ((X(st), (l = n.memoizedState), l === null)) return (Ke(n), null);
        if (((d = (n.flags & 128) !== 0), (h = l.rendering), h === null))
          if (d) Po(l, !1);
          else {
            if (at !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null; ) {
                if (((h = ei(e)), h !== null)) {
                  for (
                    n.flags |= 128,
                      Po(l, !1),
                      e = h.updateQueue,
                      n.updateQueue = e,
                      hi(n, e),
                      n.subtreeFlags = 0,
                      e = r,
                      r = n.child;
                    r !== null;
                  )
                    (rm(r, e), (r = r.sibling));
                  return (
                    I(st, (st.current & 1) | 2),
                    De && la(n, l.treeForkCount),
                    n.child
                  );
                }
                e = e.sibling;
              }
            l.tail !== null &&
              jt() > yi &&
              ((n.flags |= 128), (d = !0), Po(l, !1), (n.lanes = 4194304));
          }
        else {
          if (!d)
            if (((e = ei(h)), e !== null)) {
              if (
                ((n.flags |= 128),
                (d = !0),
                (e = e.updateQueue),
                (n.updateQueue = e),
                hi(n, e),
                Po(l, !0),
                l.tail === null &&
                  l.tailMode === "hidden" &&
                  !h.alternate &&
                  !De)
              )
                return (Ke(n), null);
            } else
              2 * jt() - l.renderingStartTime > yi &&
                r !== 536870912 &&
                ((n.flags |= 128), (d = !0), Po(l, !1), (n.lanes = 4194304));
          l.isBackwards
            ? ((h.sibling = n.child), (n.child = h))
            : ((e = l.last),
              e !== null ? (e.sibling = h) : (n.child = h),
              (l.last = h));
        }
        return l.tail !== null
          ? ((e = l.tail),
            (l.rendering = e),
            (l.tail = e.sibling),
            (l.renderingStartTime = jt()),
            (e.sibling = null),
            (r = st.current),
            I(st, d ? (r & 1) | 2 : r & 1),
            De && la(n, l.treeForkCount),
            e)
          : (Ke(n), null);
      case 22:
      case 23:
        return (
          Kt(n),
          Iu(),
          (l = n.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (n.flags |= 8192)
            : l && (n.flags |= 8192),
          l
            ? (r & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (Ke(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : Ke(n),
          (r = n.updateQueue),
          r !== null && hi(n, r.retryQueue),
          (r = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (r = e.memoizedState.cachePool.pool),
          (l = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (l = n.memoizedState.cachePool.pool),
          l !== r && (n.flags |= 2048),
          e !== null && X(Rr),
          null
        );
      case 24:
        return (
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          n.memoizedState.cache !== r && (n.flags |= 2048),
          ca(it),
          Ke(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function i2(e, n) {
    switch ((_u(n), n.tag)) {
      case 1:
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 3:
        return (
          ca(it),
          xe(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((n.flags = (e & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Ne(n), null);
      case 31:
        if (n.memoizedState !== null) {
          if ((Kt(n), n.alternate === null)) throw Error(o(340));
          Cr();
        }
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 13:
        if (
          (Kt(n), (e = n.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          Cr();
        }
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 19:
        return (X(st), null);
      case 4:
        return (xe(), null);
      case 10:
        return (ca(n.type), null);
      case 22:
      case 23:
        return (
          Kt(n),
          Iu(),
          e !== null && X(Rr),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 24:
        return (ca(it), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Tg(e, n) {
    switch ((_u(n), n.tag)) {
      case 3:
        (ca(it), xe());
        break;
      case 26:
      case 27:
      case 5:
        Ne(n);
        break;
      case 4:
        xe();
        break;
      case 31:
        n.memoizedState !== null && Kt(n);
        break;
      case 13:
        Kt(n);
        break;
      case 19:
        X(st);
        break;
      case 10:
        ca(n.type);
        break;
      case 22:
      case 23:
        (Kt(n), Iu(), e !== null && X(Rr));
        break;
      case 24:
        ca(it);
    }
  }
  function ko(e, n) {
    try {
      var r = n.updateQueue,
        l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var d = l.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var h = r.create,
              b = r.inst;
            ((l = h()), (b.destroy = l));
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (C) {
      Ve(n, n.return, C);
    }
  }
  function Qa(e, n, r) {
    try {
      var l = n.updateQueue,
        d = l !== null ? l.lastEffect : null;
      if (d !== null) {
        var h = d.next;
        l = h;
        do {
          if ((l.tag & e) === e) {
            var b = l.inst,
              C = b.destroy;
            if (C !== void 0) {
              ((b.destroy = void 0), (d = n));
              var T = r,
                Q = C;
              try {
                Q();
              } catch (J) {
                Ve(d, T, J);
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (J) {
      Ve(n, n.return, J);
    }
  }
  function Mg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        wm(n, r);
      } catch (l) {
        Ve(e, e.return, l);
      }
    }
  }
  function Dg(e, n, r) {
    ((r.props = Mr(e.type, e.memoizedProps)), (r.state = e.memoizedState));
    try {
      r.componentWillUnmount();
    } catch (l) {
      Ve(e, n, l);
    }
  }
  function Ho(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof r == "function" ? (e.refCleanup = r(l)) : (r.current = l);
      }
    } catch (d) {
      Ve(e, n, d);
    }
  }
  function Pn(e, n) {
    var r = e.ref,
      l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          Ve(e, n, d);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          Ve(e, n, d);
        }
      else r.current = null;
  }
  function zg(e) {
    var n = e.type,
      r = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && l.focus();
          break e;
        case "img":
          r.src ? (l.src = r.src) : r.srcSet && (l.srcset = r.srcSet);
      }
    } catch (d) {
      Ve(e, e.return, d);
    }
  }
  function wd(e, n, r) {
    try {
      var l = e.stateNode;
      (j2(l, e.type, r, n), (l[Ht] = n));
    } catch (d) {
      Ve(e, e.return, d);
    }
  }
  function Pg(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Xa(e.type)) ||
      e.tag === 4
    );
  }
  function Ed(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Pg(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Xa(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Cd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode),
        n
          ? (r.nodeType === 9
              ? r.body
              : r.nodeName === "HTML"
                ? r.ownerDocument.body
                : r
            ).insertBefore(e, n)
          : ((n =
              r.nodeType === 9
                ? r.body
                : r.nodeName === "HTML"
                  ? r.ownerDocument.body
                  : r),
            n.appendChild(e),
            (r = r._reactRootContainer),
            r != null || n.onclick !== null || (n.onclick = ra)));
    else if (
      l !== 4 &&
      (l === 27 && Xa(e.type) && ((r = e.stateNode), (n = null)),
      (e = e.child),
      e !== null)
    )
      for (Cd(e, n, r), e = e.sibling; e !== null; )
        (Cd(e, n, r), (e = e.sibling));
  }
  function pi(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode), n ? r.insertBefore(e, n) : r.appendChild(e));
    else if (
      l !== 4 &&
      (l === 27 && Xa(e.type) && (r = e.stateNode), (e = e.child), e !== null)
    )
      for (pi(e, n, r), e = e.sibling; e !== null; )
        (pi(e, n, r), (e = e.sibling));
  }
  function kg(e) {
    var n = e.stateNode,
      r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      (Et(n, l, r), (n[xt] = e), (n[Ht] = r));
    } catch (h) {
      Ve(e, e.return, h);
    }
  }
  var pa = !1,
    dt = !1,
    Ad = !1,
    Hg = typeof WeakSet == "function" ? WeakSet : Set,
    vt = null;
  function c2(e, n) {
    if (((e = e.containerInfo), ($d = Pi), (e = Xp(e)), yu(e))) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = ((r = e.ownerDocument) && r.defaultView) || window;
          var l = r.getSelection && r.getSelection();
          if (l && l.rangeCount !== 0) {
            r = l.anchorNode;
            var d = l.anchorOffset,
              h = l.focusNode;
            l = l.focusOffset;
            try {
              (r.nodeType, h.nodeType);
            } catch {
              r = null;
              break e;
            }
            var b = 0,
              C = -1,
              T = -1,
              Q = 0,
              J = 0,
              te = e,
              Y = null;
            t: for (;;) {
              for (
                var F;
                te !== r || (d !== 0 && te.nodeType !== 3) || (C = b + d),
                  te !== h || (l !== 0 && te.nodeType !== 3) || (T = b + l),
                  te.nodeType === 3 && (b += te.nodeValue.length),
                  (F = te.firstChild) !== null;
              )
                ((Y = te), (te = F));
              for (;;) {
                if (te === e) break t;
                if (
                  (Y === r && ++Q === d && (C = b),
                  Y === h && ++J === l && (T = b),
                  (F = te.nextSibling) !== null)
                )
                  break;
                ((te = Y), (Y = te.parentNode));
              }
              te = F;
            }
            r = C === -1 || T === -1 ? null : { start: C, end: T };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      Gd = { focusedElem: e, selectionRange: r }, Pi = !1, vt = n;
      vt !== null;
    )
      if (
        ((n = vt), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = n), (vt = e));
      else
        for (; vt !== null; ) {
          switch (((n = vt), (h = n.alternate), (e = n.flags), n.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = n.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (r = 0; r < e.length; r++)
                  ((d = e[r]), (d.ref.impl = d.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && h !== null) {
                ((e = void 0),
                  (r = n),
                  (d = h.memoizedProps),
                  (h = h.memoizedState),
                  (l = r.stateNode));
                try {
                  var he = Mr(r.type, d);
                  ((e = l.getSnapshotBeforeUpdate(he, h)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ye) {
                  Ve(r, r.return, ye);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = n.stateNode.containerInfo), (r = e.nodeType), r === 9)
                )
                  Kd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Kd(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = n.sibling), e !== null)) {
            ((e.return = n.return), (vt = e));
            break;
          }
          vt = n.return;
        }
  }
  function Lg(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (ga(e, r), l & 4 && ko(5, r));
        break;
      case 1:
        if ((ga(e, r), l & 4))
          if (((e = r.stateNode), n === null))
            try {
              e.componentDidMount();
            } catch (b) {
              Ve(r, r.return, b);
            }
          else {
            var d = Mr(r.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              e.componentDidUpdate(d, n, e.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              Ve(r, r.return, b);
            }
          }
        (l & 64 && Mg(r), l & 512 && Ho(r, r.return));
        break;
      case 3:
        if ((ga(e, r), l & 64 && ((e = r.updateQueue), e !== null))) {
          if (((n = null), r.child !== null))
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            wm(e, n);
          } catch (b) {
            Ve(r, r.return, b);
          }
        }
        break;
      case 27:
        n === null && l & 4 && kg(r);
      case 26:
      case 5:
        (ga(e, r), n === null && l & 4 && zg(r), l & 512 && Ho(r, r.return));
        break;
      case 12:
        ga(e, r);
        break;
      case 31:
        (ga(e, r), l & 4 && qg(e, r));
        break;
      case 13:
        (ga(e, r),
          l & 4 && Qg(e, r),
          l & 64 &&
            ((e = r.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((r = y2.bind(null, r)), L2(e, r)))));
        break;
      case 22:
        if (((l = r.memoizedState !== null || pa), !l)) {
          ((n = (n !== null && n.memoizedState !== null) || dt), (d = pa));
          var h = dt;
          ((pa = l),
            (dt = n) && !h ? va(e, r, (r.subtreeFlags & 8772) !== 0) : ga(e, r),
            (pa = d),
            (dt = h));
        }
        break;
      case 30:
        break;
      default:
        ga(e, r);
    }
  }
  function Ug(e) {
    var n = e.alternate;
    (n !== null && ((e.alternate = null), Ug(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((n = e.stateNode), n !== null && tu(n)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var We = null,
    Ut = !1;
  function ma(e, n, r) {
    for (r = r.child; r !== null; ) (Bg(e, n, r), (r = r.sibling));
  }
  function Bg(e, n, r) {
    if (Tt && typeof Tt.onCommitFiberUnmount == "function")
      try {
        Tt.onCommitFiberUnmount(mr, r);
      } catch {}
    switch (r.tag) {
      case 26:
        (dt || Pn(r, n),
          ma(e, n, r),
          r.memoizedState
            ? r.memoizedState.count--
            : r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
        break;
      case 27:
        dt || Pn(r, n);
        var l = We,
          d = Ut;
        (Xa(r.type) && ((We = r.stateNode), (Ut = !1)),
          ma(e, n, r),
          $o(r.stateNode),
          (We = l),
          (Ut = d));
        break;
      case 5:
        dt || Pn(r, n);
      case 6:
        if (
          ((l = We),
          (d = Ut),
          (We = null),
          ma(e, n, r),
          (We = l),
          (Ut = d),
          We !== null)
        )
          if (Ut)
            try {
              (We.nodeType === 9
                ? We.body
                : We.nodeName === "HTML"
                  ? We.ownerDocument.body
                  : We
              ).removeChild(r.stateNode);
            } catch (h) {
              Ve(r, n, h);
            }
          else
            try {
              We.removeChild(r.stateNode);
            } catch (h) {
              Ve(r, n, h);
            }
        break;
      case 18:
        We !== null &&
          (Ut
            ? ((e = We),
              Mv(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                r.stateNode,
              ),
              zs(e))
            : Mv(We, r.stateNode));
        break;
      case 4:
        ((l = We),
          (d = Ut),
          (We = r.stateNode.containerInfo),
          (Ut = !0),
          ma(e, n, r),
          (We = l),
          (Ut = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Qa(2, r, n), dt || Qa(4, r, n), ma(e, n, r));
        break;
      case 1:
        (dt ||
          (Pn(r, n),
          (l = r.stateNode),
          typeof l.componentWillUnmount == "function" && Dg(r, n, l)),
          ma(e, n, r));
        break;
      case 21:
        ma(e, n, r);
        break;
      case 22:
        ((dt = (l = dt) || r.memoizedState !== null), ma(e, n, r), (dt = l));
        break;
      default:
        ma(e, n, r);
    }
  }
  function qg(e, n) {
    if (
      n.memoizedState === null &&
      ((e = n.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        zs(e);
      } catch (r) {
        Ve(n, n.return, r);
      }
    }
  }
  function Qg(e, n) {
    if (
      n.memoizedState === null &&
      ((e = n.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        zs(e);
      } catch (r) {
        Ve(n, n.return, r);
      }
  }
  function u2(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return (n === null && (n = e.stateNode = new Hg()), n);
      case 22:
        return (
          (e = e.stateNode),
          (n = e._retryCache),
          n === null && (n = e._retryCache = new Hg()),
          n
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function mi(e, n) {
    var r = u2(e);
    n.forEach(function (l) {
      if (!r.has(l)) {
        r.add(l);
        var d = x2.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function Bt(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l],
          h = e,
          b = n,
          C = b;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (Xa(C.type)) {
                ((We = C.stateNode), (Ut = !1));
                break e;
              }
              break;
            case 5:
              ((We = C.stateNode), (Ut = !1));
              break e;
            case 3:
            case 4:
              ((We = C.stateNode.containerInfo), (Ut = !0));
              break e;
          }
          C = C.return;
        }
        if (We === null) throw Error(o(160));
        (Bg(h, b, d),
          (We = null),
          (Ut = !1),
          (h = d.alternate),
          h !== null && (h.return = null),
          (d.return = null));
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; ) (Vg(n, e), (n = n.sibling));
  }
  var wn = null;
  function Vg(e, n) {
    var r = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Bt(n, e),
          qt(e),
          l & 4 && (Qa(3, e, e.return), ko(3, e), Qa(5, e, e.return)));
        break;
      case 1:
        (Bt(n, e),
          qt(e),
          l & 512 && (dt || r === null || Pn(r, r.return)),
          l & 64 &&
            pa &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((r = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = r === null ? l : r.concat(l))))));
        break;
      case 26:
        var d = wn;
        if (
          (Bt(n, e),
          qt(e),
          l & 512 && (dt || r === null || Pn(r, r.return)),
          l & 4)
        ) {
          var h = r !== null ? r.memoizedState : null;
          if (((l = e.memoizedState), r === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  ((l = e.type),
                    (r = e.memoizedProps),
                    (d = d.ownerDocument || d));
                  t: switch (l) {
                    case "title":
                      ((h = d.getElementsByTagName("title")[0]),
                        (!h ||
                          h[co] ||
                          h[xt] ||
                          h.namespaceURI === "http://www.w3.org/2000/svg" ||
                          h.hasAttribute("itemprop")) &&
                          ((h = d.createElement(l)),
                          d.head.insertBefore(
                            h,
                            d.querySelector("head > title"),
                          )),
                        Et(h, l, r),
                        (h[xt] = e),
                        gt(h),
                        (l = h));
                      break e;
                    case "link":
                      var b = Vv("link", "href", d).get(l + (r.href || ""));
                      if (b) {
                        for (var C = 0; C < b.length; C++)
                          if (
                            ((h = b[C]),
                            h.getAttribute("href") ===
                              (r.href == null || r.href === ""
                                ? null
                                : r.href) &&
                              h.getAttribute("rel") ===
                                (r.rel == null ? null : r.rel) &&
                              h.getAttribute("title") ===
                                (r.title == null ? null : r.title) &&
                              h.getAttribute("crossorigin") ===
                                (r.crossOrigin == null ? null : r.crossOrigin))
                          ) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      ((h = d.createElement(l)),
                        Et(h, l, r),
                        d.head.appendChild(h));
                      break;
                    case "meta":
                      if (
                        (b = Vv("meta", "content", d).get(
                          l + (r.content || ""),
                        ))
                      ) {
                        for (C = 0; C < b.length; C++)
                          if (
                            ((h = b[C]),
                            h.getAttribute("content") ===
                              (r.content == null ? null : "" + r.content) &&
                              h.getAttribute("name") ===
                                (r.name == null ? null : r.name) &&
                              h.getAttribute("property") ===
                                (r.property == null ? null : r.property) &&
                              h.getAttribute("http-equiv") ===
                                (r.httpEquiv == null ? null : r.httpEquiv) &&
                              h.getAttribute("charset") ===
                                (r.charSet == null ? null : r.charSet))
                          ) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      ((h = d.createElement(l)),
                        Et(h, l, r),
                        d.head.appendChild(h));
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  ((h[xt] = e), gt(h), (l = h));
                }
                e.stateNode = l;
              } else Iv(d, e.type, e.stateNode);
            else e.stateNode = Qv(d, l, e.memoizedProps);
          else
            h !== l
              ? (h === null
                  ? r.stateNode !== null &&
                    ((r = r.stateNode), r.parentNode.removeChild(r))
                  : h.count--,
                l === null
                  ? Iv(d, e.type, e.stateNode)
                  : Qv(d, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                wd(e, e.memoizedProps, r.memoizedProps);
        }
        break;
      case 27:
        (Bt(n, e),
          qt(e),
          l & 512 && (dt || r === null || Pn(r, r.return)),
          r !== null && l & 4 && wd(e, e.memoizedProps, r.memoizedProps));
        break;
      case 5:
        if (
          (Bt(n, e),
          qt(e),
          l & 512 && (dt || r === null || Pn(r, r.return)),
          e.flags & 32)
        ) {
          d = e.stateNode;
          try {
            as(d, "");
          } catch (he) {
            Ve(e, e.return, he);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((d = e.memoizedProps), wd(e, d, r !== null ? r.memoizedProps : d)),
          l & 1024 && (Ad = !0));
        break;
      case 6:
        if ((Bt(n, e), qt(e), l & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((l = e.memoizedProps), (r = e.stateNode));
          try {
            r.nodeValue = l;
          } catch (he) {
            Ve(e, e.return, he);
          }
        }
        break;
      case 3:
        if (
          ((Ti = null),
          (d = wn),
          (wn = _i(n.containerInfo)),
          Bt(n, e),
          (wn = d),
          qt(e),
          l & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            zs(n.containerInfo);
          } catch (he) {
            Ve(e, e.return, he);
          }
        Ad && ((Ad = !1), Ig(e));
        break;
      case 4:
        ((l = wn),
          (wn = _i(e.stateNode.containerInfo)),
          Bt(n, e),
          qt(e),
          (wn = l));
        break;
      case 12:
        (Bt(n, e), qt(e));
        break;
      case 31:
        (Bt(n, e),
          qt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), mi(e, l))));
        break;
      case 13:
        (Bt(n, e),
          qt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (r !== null && r.memoizedState !== null) &&
            (vi = jt()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), mi(e, l))));
        break;
      case 22:
        d = e.memoizedState !== null;
        var T = r !== null && r.memoizedState !== null,
          Q = pa,
          J = dt;
        if (
          ((pa = Q || d),
          (dt = J || T),
          Bt(n, e),
          (dt = J),
          (pa = Q),
          qt(e),
          l & 8192)
        )
          e: for (
            n = e.stateNode,
              n._visibility = d ? n._visibility & -2 : n._visibility | 1,
              d && (r === null || T || pa || dt || Dr(e)),
              r = null,
              n = e;
            ;
          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                T = r = n;
                try {
                  if (((h = T.stateNode), d))
                    ((b = h.style),
                      typeof b.setProperty == "function"
                        ? b.setProperty("display", "none", "important")
                        : (b.display = "none"));
                  else {
                    C = T.stateNode;
                    var te = T.memoizedProps.style,
                      Y =
                        te != null && te.hasOwnProperty("display")
                          ? te.display
                          : null;
                    C.style.display =
                      Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (he) {
                  Ve(T, T.return, he);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                T = n;
                try {
                  T.stateNode.nodeValue = d ? "" : T.memoizedProps;
                } catch (he) {
                  Ve(T, T.return, he);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                T = n;
                try {
                  var F = T.stateNode;
                  d ? Dv(F, !0) : Dv(T.stateNode, !1);
                } catch (he) {
                  Ve(T, T.return, he);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === e) &&
              n.child !== null
            ) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              (r === n && (r = null), (n = n.return));
            }
            (r === n && (r = null),
              (n.sibling.return = n.return),
              (n = n.sibling));
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((r = l.retryQueue),
            r !== null && ((l.retryQueue = null), mi(e, r))));
        break;
      case 19:
        (Bt(n, e),
          qt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), mi(e, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Bt(n, e), qt(e));
    }
  }
  function qt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (Pg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(o(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode,
              h = Ed(e);
            pi(e, h, d);
            break;
          case 5:
            var b = r.stateNode;
            r.flags & 32 && (as(b, ""), (r.flags &= -33));
            var C = Ed(e);
            pi(e, C, b);
            break;
          case 3:
          case 4:
            var T = r.stateNode.containerInfo,
              Q = Ed(e);
            Cd(e, Q, T);
            break;
          default:
            throw Error(o(161));
        }
      } catch (J) {
        Ve(e, e.return, J);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Ig(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        (Ig(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function ga(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) (Lg(e, n.alternate, n), (n = n.sibling));
  }
  function Dr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Qa(4, n, n.return), Dr(n));
          break;
        case 1:
          Pn(n, n.return);
          var r = n.stateNode;
          (typeof r.componentWillUnmount == "function" && Dg(n, n.return, r),
            Dr(n));
          break;
        case 27:
          $o(n.stateNode);
        case 26:
        case 5:
          (Pn(n, n.return), Dr(n));
          break;
        case 22:
          n.memoizedState === null && Dr(n);
          break;
        case 30:
          Dr(n);
          break;
        default:
          Dr(n);
      }
      e = e.sibling;
    }
  }
  function va(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate,
        d = e,
        h = n,
        b = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (va(d, h, r), ko(4, h));
          break;
        case 1:
          if (
            (va(d, h, r),
            (l = h),
            (d = l.stateNode),
            typeof d.componentDidMount == "function")
          )
            try {
              d.componentDidMount();
            } catch (Q) {
              Ve(l, l.return, Q);
            }
          if (((l = h), (d = l.updateQueue), d !== null)) {
            var C = l.stateNode;
            try {
              var T = d.shared.hiddenCallbacks;
              if (T !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < T.length; d++)
                  Sm(T[d], C);
            } catch (Q) {
              Ve(l, l.return, Q);
            }
          }
          (r && b & 64 && Mg(h), Ho(h, h.return));
          break;
        case 27:
          kg(h);
        case 26:
        case 5:
          (va(d, h, r), r && l === null && b & 4 && zg(h), Ho(h, h.return));
          break;
        case 12:
          va(d, h, r);
          break;
        case 31:
          (va(d, h, r), r && b & 4 && qg(d, h));
          break;
        case 13:
          (va(d, h, r), r && b & 4 && Qg(d, h));
          break;
        case 22:
          (h.memoizedState === null && va(d, h, r), Ho(h, h.return));
          break;
        case 30:
          break;
        default:
          va(d, h, r);
      }
      n = n.sibling;
    }
  }
  function Nd(e, n) {
    var r = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (r = e.memoizedState.cachePool.pool),
      (e = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (e = n.memoizedState.cachePool.pool),
      e !== r && (e != null && e.refCount++, r != null && Eo(r)));
  }
  function Rd(e, n) {
    ((e = null),
      n.alternate !== null && (e = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== e && (n.refCount++, e != null && Eo(e)));
  }
  function En(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) (Yg(e, n, r, l), (n = n.sibling));
  }
  function Yg(e, n, r, l) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (En(e, n, r, l), d & 2048 && ko(9, n));
        break;
      case 1:
        En(e, n, r, l);
        break;
      case 3:
        (En(e, n, r, l),
          d & 2048 &&
            ((e = null),
            n.alternate !== null && (e = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== e && (n.refCount++, e != null && Eo(e))));
        break;
      case 12:
        if (d & 2048) {
          (En(e, n, r, l), (e = n.stateNode));
          try {
            var h = n.memoizedProps,
              b = h.id,
              C = h.onPostCommit;
            typeof C == "function" &&
              C(
                b,
                n.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (T) {
            Ve(n, n.return, T);
          }
        } else En(e, n, r, l);
        break;
      case 31:
        En(e, n, r, l);
        break;
      case 13:
        En(e, n, r, l);
        break;
      case 23:
        break;
      case 22:
        ((h = n.stateNode),
          (b = n.alternate),
          n.memoizedState !== null
            ? h._visibility & 2
              ? En(e, n, r, l)
              : Lo(e, n)
            : h._visibility & 2
              ? En(e, n, r, l)
              : ((h._visibility |= 2),
                Es(e, n, r, l, (n.subtreeFlags & 10256) !== 0 || !1)),
          d & 2048 && Nd(b, n));
        break;
      case 24:
        (En(e, n, r, l), d & 2048 && Rd(n.alternate, n));
        break;
      default:
        En(e, n, r, l);
    }
  }
  function Es(e, n, r, l, d) {
    for (
      d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child;
      n !== null;
    ) {
      var h = e,
        b = n,
        C = r,
        T = l,
        Q = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          (Es(h, b, C, T, d), ko(8, b));
          break;
        case 23:
          break;
        case 22:
          var J = b.stateNode;
          (b.memoizedState !== null
            ? J._visibility & 2
              ? Es(h, b, C, T, d)
              : Lo(h, b)
            : ((J._visibility |= 2), Es(h, b, C, T, d)),
            d && Q & 2048 && Nd(b.alternate, b));
          break;
        case 24:
          (Es(h, b, C, T, d), d && Q & 2048 && Rd(b.alternate, b));
          break;
        default:
          Es(h, b, C, T, d);
      }
      n = n.sibling;
    }
  }
  function Lo(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e,
          l = n,
          d = l.flags;
        switch (l.tag) {
          case 22:
            (Lo(r, l), d & 2048 && Nd(l.alternate, l));
            break;
          case 24:
            (Lo(r, l), d & 2048 && Rd(l.alternate, l));
            break;
          default:
            Lo(r, l);
        }
        n = n.sibling;
      }
  }
  var Uo = 8192;
  function Cs(e, n, r) {
    if (e.subtreeFlags & Uo)
      for (e = e.child; e !== null; ) ($g(e, n, r), (e = e.sibling));
  }
  function $g(e, n, r) {
    switch (e.tag) {
      case 26:
        (Cs(e, n, r),
          e.flags & Uo &&
            e.memoizedState !== null &&
            K2(r, wn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Cs(e, n, r);
        break;
      case 3:
      case 4:
        var l = wn;
        ((wn = _i(e.stateNode.containerInfo)), Cs(e, n, r), (wn = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = Uo), (Uo = 16777216), Cs(e, n, r), (Uo = l))
            : Cs(e, n, r));
        break;
      default:
        Cs(e, n, r);
    }
  }
  function Gg(e) {
    var n = e.alternate;
    if (n !== null && ((e = n.child), e !== null)) {
      n.child = null;
      do ((n = e.sibling), (e.sibling = null), (e = n));
      while (e !== null);
    }
  }
  function Bo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          ((vt = l), Xg(l, e));
        }
      Gg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Fg(e), (e = e.sibling));
  }
  function Fg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Bo(e), e.flags & 2048 && Qa(9, e, e.return));
        break;
      case 3:
        Bo(e);
        break;
      case 12:
        Bo(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null &&
        n._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((n._visibility &= -3), gi(e))
          : Bo(e);
        break;
      default:
        Bo(e);
    }
  }
  function gi(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          ((vt = l), Xg(l, e));
        }
      Gg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((n = e), n.tag)) {
        case 0:
        case 11:
        case 15:
          (Qa(8, n, n.return), gi(n));
          break;
        case 22:
          ((r = n.stateNode),
            r._visibility & 2 && ((r._visibility &= -3), gi(n)));
          break;
        default:
          gi(n);
      }
      e = e.sibling;
    }
  }
  function Xg(e, n) {
    for (; vt !== null; ) {
      var r = vt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Qa(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var l = r.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Eo(r.memoizedState.cache);
      }
      if (((l = r.child), l !== null)) ((l.return = r), (vt = l));
      else
        e: for (r = e; vt !== null; ) {
          l = vt;
          var d = l.sibling,
            h = l.return;
          if ((Ug(l), l === r)) {
            vt = null;
            break e;
          }
          if (d !== null) {
            ((d.return = h), (vt = d));
            break e;
          }
          vt = h;
        }
    }
  }
  var d2 = {
      getCacheForType: function (e) {
        var n = St(it),
          r = n.data.get(e);
        return (r === void 0 && ((r = e()), n.data.set(e, r)), r);
      },
      cacheSignal: function () {
        return St(it).controller.signal;
      },
    },
    f2 = typeof WeakMap == "function" ? WeakMap : Map,
    Be = 0,
    Ge = null,
    Re = null,
    je = 0,
    Qe = 0,
    Zt = null,
    Va = !1,
    As = !1,
    Od = !1,
    ya = 0,
    at = 0,
    Ia = 0,
    zr = 0,
    _d = 0,
    Wt = 0,
    Ns = 0,
    qo = null,
    Qt = null,
    jd = !1,
    vi = 0,
    Kg = 0,
    yi = 1 / 0,
    xi = null,
    Ya = null,
    ht = 0,
    $a = null,
    Rs = null,
    xa = 0,
    Td = 0,
    Md = null,
    Zg = null,
    Qo = 0,
    Dd = null;
  function Jt() {
    return (Be & 2) !== 0 && je !== 0 ? je & -je : M.T !== null ? Ud() : Jc();
  }
  function Wg() {
    if (Wt === 0)
      if ((je & 536870912) === 0 || De) {
        var e = Xr;
        ((Xr <<= 1), (Xr & 3932160) === 0 && (Xr = 262144), (Wt = e));
      } else Wt = 536870912;
    return ((e = Xt.current), e !== null && (e.flags |= 32), Wt);
  }
  function Vt(e, n, r) {
    (((e === Ge && (Qe === 2 || Qe === 9)) || e.cancelPendingCommit !== null) &&
      (Os(e, 0), Ga(e, je, Wt, !1)),
      Je(e, r),
      ((Be & 2) === 0 || e !== Ge) &&
        (e === Ge &&
          ((Be & 2) === 0 && (zr |= r), at === 4 && Ga(e, je, Wt, !1)),
        kn(e)));
  }
  function Jg(e, n, r) {
    if ((Be & 6) !== 0) throw Error(o(327));
    var l = (!r && (n & 127) === 0 && (n & e.expiredLanes) === 0) || Ze(e, n),
      d = l ? m2(e, n) : Pd(e, n, !0),
      h = l;
    do {
      if (d === 0) {
        As && !l && Ga(e, n, 0, !1);
        break;
      } else {
        if (((r = e.current.alternate), h && !h2(r))) {
          ((d = Pd(e, n, !1)), (h = !1));
          continue;
        }
        if (d === 2) {
          if (((h = n), e.errorRecoveryDisabledLanes & h)) var b = 0;
          else
            ((b = e.pendingLanes & -536870913),
              (b = b !== 0 ? b : b & 536870912 ? 536870912 : 0));
          if (b !== 0) {
            n = b;
            e: {
              var C = e;
              d = qo;
              var T = C.current.memoizedState.isDehydrated;
              if ((T && (Os(C, b).flags |= 256), (b = Pd(C, b, !1)), b !== 2)) {
                if (Od && !T) {
                  ((C.errorRecoveryDisabledLanes |= h), (zr |= h), (d = 4));
                  break e;
                }
                ((h = Qt),
                  (Qt = d),
                  h !== null &&
                    (Qt === null ? (Qt = h) : Qt.push.apply(Qt, h)));
              }
              d = b;
            }
            if (((h = !1), d !== 2)) continue;
          }
        }
        if (d === 1) {
          (Os(e, 0), Ga(e, n, 0, !0));
          break;
        }
        e: {
          switch (((l = e), (h = d), h)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Ga(l, n, Wt, !Va);
              break e;
            case 2:
              Qt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((n & 62914560) === n && ((d = vi + 300 - jt()), 10 < d)) {
            if ((Ga(l, n, Wt, !Va), be(l, 0, !0) !== 0)) break e;
            ((xa = n),
              (l.timeoutHandle = jv(
                ev.bind(
                  null,
                  l,
                  r,
                  Qt,
                  xi,
                  jd,
                  n,
                  Wt,
                  zr,
                  Ns,
                  Va,
                  h,
                  "Throttled",
                  -0,
                  0,
                ),
                d,
              )));
            break e;
          }
          ev(l, r, Qt, xi, jd, n, Wt, zr, Ns, Va, h, null, -0, 0);
        }
      }
      break;
    } while (!0);
    kn(e);
  }
  function ev(e, n, r, l, d, h, b, C, T, Q, J, te, Y, F) {
    if (
      ((e.timeoutHandle = -1),
      (te = n.subtreeFlags),
      te & 8192 || (te & 16785408) === 16785408)
    ) {
      ((te = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ra,
      }),
        $g(n, h, te));
      var he =
        (h & 62914560) === h ? vi - jt() : (h & 4194048) === h ? Kg - jt() : 0;
      if (((he = Z2(te, he)), he !== null)) {
        ((xa = h),
          (e.cancelPendingCommit = he(
            iv.bind(null, e, n, h, r, l, d, b, C, T, J, te, null, Y, F),
          )),
          Ga(e, h, b, !Q));
        return;
      }
    }
    iv(e, n, h, r, l, d, b, C, T);
  }
  function h2(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if (
        (r === 0 || r === 11 || r === 15) &&
        n.flags & 16384 &&
        ((r = n.updateQueue), r !== null && ((r = r.stores), r !== null))
      )
        for (var l = 0; l < r.length; l++) {
          var d = r[l],
            h = d.getSnapshot;
          d = d.value;
          try {
            if (!Gt(h(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (((r = n.child), n.subtreeFlags & 16384 && r !== null))
        ((r.return = n), (n = r));
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function Ga(e, n, r, l) {
    ((n &= ~_d),
      (n &= ~zr),
      (e.suspendedLanes |= n),
      (e.pingedLanes &= ~n),
      l && (e.warmLanes |= n),
      (l = e.expirationTimes));
    for (var d = n; 0 < d; ) {
      var h = 31 - At(d),
        b = 1 << h;
      ((l[h] = -1), (d &= ~b));
    }
    r !== 0 && vr(e, r, n);
  }
  function bi() {
    return (Be & 6) === 0 ? (Vo(0), !1) : !0;
  }
  function zd() {
    if (Re !== null) {
      if (Qe === 0) var e = Re.return;
      else ((e = Re), (ia = Ar = null), Ku(e), (ys = null), (Ao = 0), (e = Re));
      for (; e !== null; ) (Tg(e.alternate, e), (e = e.return));
      Re = null;
    }
  }
  function Os(e, n) {
    var r = e.timeoutHandle;
    (r !== -1 && ((e.timeoutHandle = -1), D2(r)),
      (r = e.cancelPendingCommit),
      r !== null && ((e.cancelPendingCommit = null), r()),
      (xa = 0),
      zd(),
      (Ge = e),
      (Re = r = oa(e.current, null)),
      (je = n),
      (Qe = 0),
      (Zt = null),
      (Va = !1),
      (As = Ze(e, n)),
      (Od = !1),
      (Ns = Wt = _d = zr = Ia = at = 0),
      (Qt = qo = null),
      (jd = !1),
      (n & 8) !== 0 && (n |= n & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - At(l),
          h = 1 << d;
        ((n |= e[d]), (l &= ~h));
      }
    return ((ya = n), ql(), r);
  }
  function tv(e, n) {
    ((we = null),
      (M.H = Do),
      n === vs || n === Xl
        ? ((n = vm()), (Qe = 3))
        : n === Lu
          ? ((n = vm()), (Qe = 4))
          : (Qe =
              n === fd
                ? 8
                : n !== null &&
                    typeof n == "object" &&
                    typeof n.then == "function"
                  ? 6
                  : 1),
      (Zt = n),
      Re === null && ((at = 1), ci(e, cn(n, e.current))));
  }
  function nv() {
    var e = Xt.current;
    return e === null
      ? !0
      : (je & 4194048) === je
        ? hn === null
        : (je & 62914560) === je || (je & 536870912) !== 0
          ? e === hn
          : !1;
  }
  function av() {
    var e = M.H;
    return ((M.H = Do), e === null ? Do : e);
  }
  function rv() {
    var e = M.A;
    return ((M.A = d2), e);
  }
  function Si() {
    ((at = 4),
      Va || ((je & 4194048) !== je && Xt.current !== null) || (As = !0),
      ((Ia & 134217727) === 0 && (zr & 134217727) === 0) ||
        Ge === null ||
        Ga(Ge, je, Wt, !1));
  }
  function Pd(e, n, r) {
    var l = Be;
    Be |= 2;
    var d = av(),
      h = rv();
    ((Ge !== e || je !== n) && ((xi = null), Os(e, n)), (n = !1));
    var b = at;
    e: do
      try {
        if (Qe !== 0 && Re !== null) {
          var C = Re,
            T = Zt;
          switch (Qe) {
            case 8:
              (zd(), (b = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Xt.current === null && (n = !0);
              var Q = Qe;
              if (((Qe = 0), (Zt = null), _s(e, C, T, Q), r && As)) {
                b = 0;
                break e;
              }
              break;
            default:
              ((Q = Qe), (Qe = 0), (Zt = null), _s(e, C, T, Q));
          }
        }
        (p2(), (b = at));
        break;
      } catch (J) {
        tv(e, J);
      }
    while (!0);
    return (
      n && e.shellSuspendCounter++,
      (ia = Ar = null),
      (Be = l),
      (M.H = d),
      (M.A = h),
      Re === null && ((Ge = null), (je = 0), ql()),
      b
    );
  }
  function p2() {
    for (; Re !== null; ) sv(Re);
  }
  function m2(e, n) {
    var r = Be;
    Be |= 2;
    var l = av(),
      d = rv();
    Ge !== e || je !== n
      ? ((xi = null), (yi = jt() + 500), Os(e, n))
      : (As = Ze(e, n));
    e: do
      try {
        if (Qe !== 0 && Re !== null) {
          n = Re;
          var h = Zt;
          t: switch (Qe) {
            case 1:
              ((Qe = 0), (Zt = null), _s(e, n, h, 1));
              break;
            case 2:
            case 9:
              if (mm(h)) {
                ((Qe = 0), (Zt = null), ov(n));
                break;
              }
              ((n = function () {
                ((Qe !== 2 && Qe !== 9) || Ge !== e || (Qe = 7), kn(e));
              }),
                h.then(n, n));
              break e;
            case 3:
              Qe = 7;
              break e;
            case 4:
              Qe = 5;
              break e;
            case 7:
              mm(h)
                ? ((Qe = 0), (Zt = null), ov(n))
                : ((Qe = 0), (Zt = null), _s(e, n, h, 7));
              break;
            case 5:
              var b = null;
              switch (Re.tag) {
                case 26:
                  b = Re.memoizedState;
                case 5:
                case 27:
                  var C = Re;
                  if (b ? Yv(b) : C.stateNode.complete) {
                    ((Qe = 0), (Zt = null));
                    var T = C.sibling;
                    if (T !== null) Re = T;
                    else {
                      var Q = C.return;
                      Q !== null ? ((Re = Q), wi(Q)) : (Re = null);
                    }
                    break t;
                  }
              }
              ((Qe = 0), (Zt = null), _s(e, n, h, 5));
              break;
            case 6:
              ((Qe = 0), (Zt = null), _s(e, n, h, 6));
              break;
            case 8:
              (zd(), (at = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        g2();
        break;
      } catch (J) {
        tv(e, J);
      }
    while (!0);
    return (
      (ia = Ar = null),
      (M.H = l),
      (M.A = d),
      (Be = r),
      Re !== null ? 0 : ((Ge = null), (je = 0), ql(), at)
    );
  }
  function g2() {
    for (; Re !== null && !_t(); ) sv(Re);
  }
  function sv(e) {
    var n = _g(e.alternate, e, ya);
    ((e.memoizedProps = e.pendingProps), n === null ? wi(e) : (Re = n));
  }
  function ov(e) {
    var n = e,
      r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Eg(r, n, n.pendingProps, n.type, void 0, je);
        break;
      case 11:
        n = Eg(r, n, n.pendingProps, n.type.render, n.ref, je);
        break;
      case 5:
        Ku(n);
      default:
        (Tg(r, n), (n = Re = rm(n, ya)), (n = _g(r, n, ya)));
    }
    ((e.memoizedProps = e.pendingProps), n === null ? wi(e) : (Re = n));
  }
  function _s(e, n, r, l) {
    ((ia = Ar = null), Ku(n), (ys = null), (Ao = 0));
    var d = n.return;
    try {
      if (r2(e, d, n, r, je)) {
        ((at = 1), ci(e, cn(r, e.current)), (Re = null));
        return;
      }
    } catch (h) {
      if (d !== null) throw ((Re = d), h);
      ((at = 1), ci(e, cn(r, e.current)), (Re = null));
      return;
    }
    n.flags & 32768
      ? (De || l === 1
          ? (e = !0)
          : As || (je & 536870912) !== 0
            ? (e = !1)
            : ((Va = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = Xt.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        lv(n, e))
      : wi(n);
  }
  function wi(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        lv(n, Va);
        return;
      }
      e = n.return;
      var r = l2(n.alternate, n, ya);
      if (r !== null) {
        Re = r;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        Re = n;
        return;
      }
      Re = n = e;
    } while (n !== null);
    at === 0 && (at = 5);
  }
  function lv(e, n) {
    do {
      var r = i2(e.alternate, e);
      if (r !== null) {
        ((r.flags &= 32767), (Re = r));
        return;
      }
      if (
        ((r = e.return),
        r !== null &&
          ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null)),
        !n && ((e = e.sibling), e !== null))
      ) {
        Re = e;
        return;
      }
      Re = e = r;
    } while (e !== null);
    ((at = 6), (Re = null));
  }
  function iv(e, n, r, l, d, h, b, C, T) {
    e.cancelPendingCommit = null;
    do Ei();
    while (ht !== 0);
    if ((Be & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (
        ((h = n.lanes | n.childLanes),
        (h |= Eu),
        zt(e, r, h, b, C, T),
        e === Ge && ((Re = Ge = null), (je = 0)),
        (Rs = n),
        ($a = e),
        (xa = r),
        (Td = h),
        (Md = d),
        (Zg = l),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            b2(pr, function () {
              return (hv(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = M.T), (M.T = null), (d = V.p), (V.p = 2), (b = Be), (Be |= 4));
        try {
          c2(e, n, r);
        } finally {
          ((Be = b), (V.p = d), (M.T = l));
        }
      }
      ((ht = 1), cv(), uv(), dv());
    }
  }
  function cv() {
    if (ht === 1) {
      ht = 0;
      var e = $a,
        n = Rs,
        r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        ((r = M.T), (M.T = null));
        var l = V.p;
        V.p = 2;
        var d = Be;
        Be |= 4;
        try {
          Vg(n, e);
          var h = Gd,
            b = Xp(e.containerInfo),
            C = h.focusedElem,
            T = h.selectionRange;
          if (
            b !== C &&
            C &&
            C.ownerDocument &&
            Fp(C.ownerDocument.documentElement, C)
          ) {
            if (T !== null && yu(C)) {
              var Q = T.start,
                J = T.end;
              if ((J === void 0 && (J = Q), "selectionStart" in C))
                ((C.selectionStart = Q),
                  (C.selectionEnd = Math.min(J, C.value.length)));
              else {
                var te = C.ownerDocument || document,
                  Y = (te && te.defaultView) || window;
                if (Y.getSelection) {
                  var F = Y.getSelection(),
                    he = C.textContent.length,
                    ye = Math.min(T.start, he),
                    $e = T.end === void 0 ? ye : Math.min(T.end, he);
                  !F.extend && ye > $e && ((b = $e), ($e = ye), (ye = b));
                  var k = Gp(C, ye),
                    z = Gp(C, $e);
                  if (
                    k &&
                    z &&
                    (F.rangeCount !== 1 ||
                      F.anchorNode !== k.node ||
                      F.anchorOffset !== k.offset ||
                      F.focusNode !== z.node ||
                      F.focusOffset !== z.offset)
                  ) {
                    var B = te.createRange();
                    (B.setStart(k.node, k.offset),
                      F.removeAllRanges(),
                      ye > $e
                        ? (F.addRange(B), F.extend(z.node, z.offset))
                        : (B.setEnd(z.node, z.offset), F.addRange(B)));
                  }
                }
              }
            }
            for (te = [], F = C; (F = F.parentNode); )
              F.nodeType === 1 &&
                te.push({ element: F, left: F.scrollLeft, top: F.scrollTop });
            for (
              typeof C.focus == "function" && C.focus(), C = 0;
              C < te.length;
              C++
            ) {
              var ee = te[C];
              ((ee.element.scrollLeft = ee.left),
                (ee.element.scrollTop = ee.top));
            }
          }
          ((Pi = !!$d), (Gd = $d = null));
        } finally {
          ((Be = d), (V.p = l), (M.T = r));
        }
      }
      ((e.current = n), (ht = 2));
    }
  }
  function uv() {
    if (ht === 2) {
      ht = 0;
      var e = $a,
        n = Rs,
        r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        ((r = M.T), (M.T = null));
        var l = V.p;
        V.p = 2;
        var d = Be;
        Be |= 4;
        try {
          Lg(e, n.alternate, n);
        } finally {
          ((Be = d), (V.p = l), (M.T = r));
        }
      }
      ht = 3;
    }
  }
  function dv() {
    if (ht === 4 || ht === 3) {
      ((ht = 0), Oa());
      var e = $a,
        n = Rs,
        r = xa,
        l = Zg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (ht = 5)
        : ((ht = 0), (Rs = $a = null), fv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (
        (d === 0 && (Ya = null),
        bn(r),
        (n = n.stateNode),
        Tt && typeof Tt.onCommitFiberRoot == "function")
      )
        try {
          Tt.onCommitFiberRoot(mr, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((n = M.T), (d = V.p), (V.p = 2), (M.T = null));
        try {
          for (var h = e.onRecoverableError, b = 0; b < l.length; b++) {
            var C = l[b];
            h(C.value, { componentStack: C.stack });
          }
        } finally {
          ((M.T = n), (V.p = d));
        }
      }
      ((xa & 3) !== 0 && Ei(),
        kn(e),
        (d = e.pendingLanes),
        (r & 261930) !== 0 && (d & 42) !== 0
          ? e === Dd
            ? Qo++
            : ((Qo = 0), (Dd = e))
          : (Qo = 0),
        Vo(0));
    }
  }
  function fv(e, n) {
    (e.pooledCacheLanes &= n) === 0 &&
      ((n = e.pooledCache), n != null && ((e.pooledCache = null), Eo(n)));
  }
  function Ei() {
    return (cv(), uv(), dv(), hv());
  }
  function hv() {
    if (ht !== 5) return !1;
    var e = $a,
      n = Td;
    Td = 0;
    var r = bn(xa),
      l = M.T,
      d = V.p;
    try {
      ((V.p = 32 > r ? 32 : r), (M.T = null), (r = Md), (Md = null));
      var h = $a,
        b = xa;
      if (((ht = 0), (Rs = $a = null), (xa = 0), (Be & 6) !== 0))
        throw Error(o(331));
      var C = Be;
      if (
        ((Be |= 4),
        Fg(h.current),
        Yg(h, h.current, b, r),
        (Be = C),
        Vo(0, !1),
        Tt && typeof Tt.onPostCommitFiberRoot == "function")
      )
        try {
          Tt.onPostCommitFiberRoot(mr, h);
        } catch {}
      return !0;
    } finally {
      ((V.p = d), (M.T = l), fv(e, n));
    }
  }
  function pv(e, n, r) {
    ((n = cn(r, n)),
      (n = dd(e.stateNode, n, 2)),
      (e = Ua(e, n, 2)),
      e !== null && (Je(e, 2), kn(e)));
  }
  function Ve(e, n, r) {
    if (e.tag === 3) pv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          pv(n, e, r);
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Ya === null || !Ya.has(l)))
          ) {
            ((e = cn(r, e)),
              (r = mg(2)),
              (l = Ua(n, r, 2)),
              l !== null && (gg(r, l, n, e), Je(l, 2), kn(l)));
            break;
          }
        }
        n = n.return;
      }
  }
  function kd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new f2();
      var d = new Set();
      l.set(n, d);
    } else ((d = l.get(n)), d === void 0 && ((d = new Set()), l.set(n, d)));
    d.has(r) ||
      ((Od = !0), d.add(r), (e = v2.bind(null, e, n, r)), n.then(e, e));
  }
  function v2(e, n, r) {
    var l = e.pingCache;
    (l !== null && l.delete(n),
      (e.pingedLanes |= e.suspendedLanes & r),
      (e.warmLanes &= ~r),
      Ge === e &&
        (je & r) === r &&
        (at === 4 || (at === 3 && (je & 62914560) === je && 300 > jt() - vi)
          ? (Be & 2) === 0 && Os(e, 0)
          : (_d |= r),
        Ns === je && (Ns = 0)),
      kn(e));
  }
  function mv(e, n) {
    (n === 0 && (n = Nt()), (e = wr(e, n)), e !== null && (Je(e, n), kn(e)));
  }
  function y2(e) {
    var n = e.memoizedState,
      r = 0;
    (n !== null && (r = n.retryLane), mv(e, r));
  }
  function x2(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode,
          d = e.memoizedState;
        d !== null && (r = d.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (l !== null && l.delete(n), mv(e, r));
  }
  function b2(e, n) {
    return so(e, n);
  }
  var Ci = null,
    js = null,
    Hd = !1,
    Ai = !1,
    Ld = !1,
    Fa = 0;
  function kn(e) {
    (e !== js &&
      e.next === null &&
      (js === null ? (Ci = js = e) : (js = js.next = e)),
      (Ai = !0),
      Hd || ((Hd = !0), w2()));
  }
  function Vo(e, n) {
    if (!Ld && Ai) {
      Ld = !0;
      do
        for (var r = !1, l = Ci; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var b = l.suspendedLanes,
                C = l.pingedLanes;
              ((h = (1 << (31 - At(42 | e) + 1)) - 1),
                (h &= d & ~(b & ~C)),
                (h = h & 201326741 ? (h & 201326741) | 1 : h ? h | 2 : 0));
            }
            h !== 0 && ((r = !0), xv(l, h));
          } else
            ((h = je),
              (h = be(
                l,
                l === Ge ? h : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (h & 3) === 0 || Ze(l, h) || ((r = !0), xv(l, h)));
          l = l.next;
        }
      while (r);
      Ld = !1;
    }
  }
  function S2() {
    gv();
  }
  function gv() {
    Ai = Hd = !1;
    var e = 0;
    Fa !== 0 && M2() && (e = Fa);
    for (var n = jt(), r = null, l = Ci; l !== null; ) {
      var d = l.next,
        h = vv(l, n);
      (h === 0
        ? ((l.next = null),
          r === null ? (Ci = d) : (r.next = d),
          d === null && (js = r))
        : ((r = l), (e !== 0 || (h & 3) !== 0) && (Ai = !0)),
        (l = d));
    }
    ((ht !== 0 && ht !== 5) || Vo(e), Fa !== 0 && (Fa = 0));
  }
  function vv(e, n) {
    for (
      var r = e.suspendedLanes,
        l = e.pingedLanes,
        d = e.expirationTimes,
        h = e.pendingLanes & -62914561;
      0 < h;
    ) {
      var b = 31 - At(h),
        C = 1 << b,
        T = d[b];
      (T === -1
        ? ((C & r) === 0 || (C & l) !== 0) && (d[b] = mt(C, n))
        : T <= n && (e.expiredLanes |= C),
        (h &= ~C));
    }
    if (
      ((n = Ge),
      (r = je),
      (r = be(
        e,
        e === n ? r : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (l = e.callbackNode),
      r === 0 ||
        (e === n && (Qe === 2 || Qe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && oo(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((r & 3) === 0 || Ze(e, r)) {
      if (((n = r & -r), n === e.callbackPriority)) return n;
      switch ((l !== null && oo(l), bn(r))) {
        case 2:
        case 8:
          r = Ol;
          break;
        case 32:
          r = pr;
          break;
        case 268435456:
          r = na;
          break;
        default:
          r = pr;
      }
      return (
        (l = yv.bind(null, e)),
        (r = so(r, l)),
        (e.callbackPriority = n),
        (e.callbackNode = r),
        n
      );
    }
    return (
      l !== null && l !== null && oo(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function yv(e, n) {
    if (ht !== 0 && ht !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var r = e.callbackNode;
    if (Ei() && e.callbackNode !== r) return null;
    var l = je;
    return (
      (l = be(
        e,
        e === Ge ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (Jg(e, l, n),
          vv(e, jt()),
          e.callbackNode != null && e.callbackNode === r
            ? yv.bind(null, e)
            : null)
    );
  }
  function xv(e, n) {
    if (Ei()) return null;
    Jg(e, n, !0);
  }
  function w2() {
    z2(function () {
      (Be & 6) !== 0 ? so(hr, S2) : gv();
    });
  }
  function Ud() {
    if (Fa === 0) {
      var e = ms;
      (e === 0 && ((e = Fr), (Fr <<= 1), (Fr & 261888) === 0 && (Fr = 256)),
        (Fa = e));
    }
    return Fa;
  }
  function bv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Dl("" + e);
  }
  function Sv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return (
      (r.name = n.name),
      (r.value = n.value),
      e.id && r.setAttribute("form", e.id),
      n.parentNode.insertBefore(r, n),
      (e = new FormData(e)),
      r.parentNode.removeChild(r),
      e
    );
  }
  function E2(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = bv((d[Ht] || null).action),
        b = l.submitter;
      b &&
        ((n = (n = b[Ht] || null)
          ? bv(n.formAction)
          : b.getAttribute("formAction")),
        n !== null && ((h = n), (b = null)));
      var C = new Hl("action", "action", null, l, d);
      e.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Fa !== 0) {
                  var T = b ? Sv(d, b) : new FormData(d);
                  sd(
                    r,
                    { pending: !0, data: T, method: d.method, action: h },
                    null,
                    T,
                  );
                }
              } else
                typeof h == "function" &&
                  (C.preventDefault(),
                  (T = b ? Sv(d, b) : new FormData(d)),
                  sd(
                    r,
                    { pending: !0, data: T, method: d.method, action: h },
                    h,
                    T,
                  ));
            },
            currentTarget: d,
          },
        ],
      });
    }
  }
  for (var Bd = 0; Bd < wu.length; Bd++) {
    var qd = wu[Bd],
      C2 = qd.toLowerCase(),
      A2 = qd[0].toUpperCase() + qd.slice(1);
    Sn(C2, "on" + A2);
  }
  (Sn(Wp, "onAnimationEnd"),
    Sn(Jp, "onAnimationIteration"),
    Sn(em, "onAnimationStart"),
    Sn("dblclick", "onDoubleClick"),
    Sn("focusin", "onFocus"),
    Sn("focusout", "onBlur"),
    Sn(qw, "onTransitionRun"),
    Sn(Qw, "onTransitionStart"),
    Sn(Vw, "onTransitionCancel"),
    Sn(tm, "onTransitionEnd"),
    ts("onMouseEnter", ["mouseout", "mouseover"]),
    ts("onMouseLeave", ["mouseout", "mouseover"]),
    ts("onPointerEnter", ["pointerout", "pointerover"]),
    ts("onPointerLeave", ["pointerout", "pointerover"]),
    yr(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    yr(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    yr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    yr(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    yr(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    yr(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Io =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    N2 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Io),
    );
  function wv(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r],
        d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var b = l.length - 1; 0 <= b; b--) {
            var C = l[b],
              T = C.instance,
              Q = C.currentTarget;
            if (((C = C.listener), T !== h && d.isPropagationStopped()))
              break e;
            ((h = C), (d.currentTarget = Q));
            try {
              h(d);
            } catch (J) {
              Bl(J);
            }
            ((d.currentTarget = null), (h = T));
          }
        else
          for (b = 0; b < l.length; b++) {
            if (
              ((C = l[b]),
              (T = C.instance),
              (Q = C.currentTarget),
              (C = C.listener),
              T !== h && d.isPropagationStopped())
            )
              break e;
            ((h = C), (d.currentTarget = Q));
            try {
              h(d);
            } catch (J) {
              Bl(J);
            }
            ((d.currentTarget = null), (h = T));
          }
      }
    }
  }
  function Oe(e, n) {
    var r = n[eu];
    r === void 0 && (r = n[eu] = new Set());
    var l = e + "__bubble";
    r.has(l) || (Ev(n, e, 2, !1), r.add(l));
  }
  function Qd(e, n, r) {
    var l = 0;
    (n && (l |= 4), Ev(r, e, l, n));
  }
  var Ni = "_reactListening" + Math.random().toString(36).slice(2);
  function Vd(e) {
    if (!e[Ni]) {
      ((e[Ni] = !0),
        gp.forEach(function (r) {
          r !== "selectionchange" && (N2.has(r) || Qd(r, !1, e), Qd(r, !0, e));
        }));
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ni] || ((n[Ni] = !0), Qd("selectionchange", !1, n));
    }
  }
  function Ev(e, n, r, l) {
    switch (Wv(n)) {
      case 2:
        var d = eE;
        break;
      case 8:
        d = tE;
        break;
      default:
        d = rf;
    }
    ((r = d.bind(null, n, r, e)),
      (d = void 0),
      !cu ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (d = !0),
      l
        ? d !== void 0
          ? e.addEventListener(n, r, { capture: !0, passive: d })
          : e.addEventListener(n, r, !0)
        : d !== void 0
          ? e.addEventListener(n, r, { passive: d })
          : e.addEventListener(n, r, !1));
  }
  function Id(e, n, r, l, d) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var C = l.stateNode.containerInfo;
          if (C === d) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var T = b.tag;
              if ((T === 3 || T === 4) && b.stateNode.containerInfo === d)
                return;
              b = b.return;
            }
          for (; C !== null; ) {
            if (((b = Wr(C)), b === null)) return;
            if (((T = b.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              l = h = b;
              continue e;
            }
            C = C.parentNode;
          }
        }
        l = l.return;
      }
    Op(function () {
      var Q = h,
        J = lu(r),
        te = [];
      e: {
        var Y = nm.get(e);
        if (Y !== void 0) {
          var F = Hl,
            he = e;
          switch (e) {
            case "keypress":
              if (Pl(r) === 0) break e;
            case "keydown":
            case "keyup":
              F = xw;
              break;
            case "focusin":
              ((he = "focus"), (F = hu));
              break;
            case "focusout":
              ((he = "blur"), (F = hu));
              break;
            case "beforeblur":
            case "afterblur":
              F = hu;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = Tp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = lw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = ww;
              break;
            case Wp:
            case Jp:
            case em:
              F = uw;
              break;
            case tm:
              F = Cw;
              break;
            case "scroll":
            case "scrollend":
              F = sw;
              break;
            case "wheel":
              F = Nw;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = fw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = Dp;
              break;
            case "toggle":
            case "beforetoggle":
              F = Ow;
          }
          var ye = (n & 4) !== 0,
            $e = !ye && (e === "scroll" || e === "scrollend"),
            k = ye ? (Y !== null ? Y + "Capture" : null) : Y;
          ye = [];
          for (var z = Q, B; z !== null; ) {
            var ee = z;
            if (
              ((B = ee.stateNode),
              (ee = ee.tag),
              (ee !== 5 && ee !== 26 && ee !== 27) ||
                B === null ||
                k === null ||
                ((ee = fo(z, k)), ee != null && ye.push(Yo(z, ee, B))),
              $e)
            )
              break;
            z = z.return;
          }
          0 < ye.length &&
            ((Y = new F(Y, he, null, r, J)),
            te.push({ event: Y, listeners: ye }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((Y = e === "mouseover" || e === "pointerover"),
            (F = e === "mouseout" || e === "pointerout"),
            Y &&
              r !== ou &&
              (he = r.relatedTarget || r.fromElement) &&
              (Wr(he) || he[Zr]))
          )
            break e;
          if (
            (F || Y) &&
            ((Y =
              J.window === J
                ? J
                : (Y = J.ownerDocument)
                  ? Y.defaultView || Y.parentWindow
                  : window),
            F
              ? ((he = r.relatedTarget || r.toElement),
                (F = Q),
                (he = he ? Wr(he) : null),
                he !== null &&
                  (($e = c(he)),
                  (ye = he.tag),
                  he !== $e || (ye !== 5 && ye !== 27 && ye !== 6)) &&
                  (he = null))
              : ((F = null), (he = Q)),
            F !== he)
          ) {
            if (
              ((ye = Tp),
              (ee = "onMouseLeave"),
              (k = "onMouseEnter"),
              (z = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ye = Dp),
                (ee = "onPointerLeave"),
                (k = "onPointerEnter"),
                (z = "pointer")),
              ($e = F == null ? Y : uo(F)),
              (B = he == null ? Y : uo(he)),
              (Y = new ye(ee, z + "leave", F, r, J)),
              (Y.target = $e),
              (Y.relatedTarget = B),
              (ee = null),
              Wr(J) === Q &&
                ((ye = new ye(k, z + "enter", he, r, J)),
                (ye.target = B),
                (ye.relatedTarget = $e),
                (ee = ye)),
              ($e = ee),
              F && he)
            )
              t: {
                for (ye = R2, k = F, z = he, B = 0, ee = k; ee; ee = ye(ee))
                  B++;
                ee = 0;
                for (var ve = z; ve; ve = ye(ve)) ee++;
                for (; 0 < B - ee; ) ((k = ye(k)), B--);
                for (; 0 < ee - B; ) ((z = ye(z)), ee--);
                for (; B--; ) {
                  if (k === z || (z !== null && k === z.alternate)) {
                    ye = k;
                    break t;
                  }
                  ((k = ye(k)), (z = ye(z)));
                }
                ye = null;
              }
            else ye = null;
            (F !== null && Cv(te, Y, F, ye, !1),
              he !== null && $e !== null && Cv(te, $e, he, ye, !0));
          }
        }
        e: {
          if (
            ((Y = Q ? uo(Q) : window),
            (F = Y.nodeName && Y.nodeName.toLowerCase()),
            F === "select" || (F === "input" && Y.type === "file"))
          )
            var He = qp;
          else if (Up(Y))
            if (Qp) He = Lw;
            else {
              He = kw;
              var ge = Pw;
            }
          else
            ((F = Y.nodeName),
              !F ||
              F.toLowerCase() !== "input" ||
              (Y.type !== "checkbox" && Y.type !== "radio")
                ? Q && su(Q.elementType) && (He = qp)
                : (He = Hw));
          if (He && (He = He(e, Q))) {
            Bp(te, He, r, J);
            break e;
          }
          (ge && ge(e, Y, Q),
            e === "focusout" &&
              Q &&
              Y.type === "number" &&
              Q.memoizedProps.value != null &&
              ru(Y, "number", Y.value));
        }
        switch (((ge = Q ? uo(Q) : window), e)) {
          case "focusin":
            (Up(ge) || ge.contentEditable === "true") &&
              ((ls = ge), (xu = Q), (bo = null));
            break;
          case "focusout":
            bo = xu = ls = null;
            break;
          case "mousedown":
            bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((bu = !1), Kp(te, r, J));
            break;
          case "selectionchange":
            if (Bw) break;
          case "keydown":
          case "keyup":
            Kp(te, r, J);
        }
        var Ce;
        if (mu)
          e: {
            switch (e) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          os
            ? Hp(e, r) && (Te = "onCompositionEnd")
            : e === "keydown" &&
              r.keyCode === 229 &&
              (Te = "onCompositionStart");
        (Te &&
          (zp &&
            r.locale !== "ko" &&
            (os || Te !== "onCompositionStart"
              ? Te === "onCompositionEnd" && os && (Ce = _p())
              : ((Ma = J),
                (uu = "value" in Ma ? Ma.value : Ma.textContent),
                (os = !0))),
          (ge = Ri(Q, Te)),
          0 < ge.length &&
            ((Te = new Mp(Te, e, null, r, J)),
            te.push({ event: Te, listeners: ge }),
            Ce
              ? (Te.data = Ce)
              : ((Ce = Lp(r)), Ce !== null && (Te.data = Ce)))),
          (Ce = jw ? Tw(e, r) : Mw(e, r)) &&
            ((Te = Ri(Q, "onBeforeInput")),
            0 < Te.length &&
              ((ge = new Mp("onBeforeInput", "beforeinput", null, r, J)),
              te.push({ event: ge, listeners: Te }),
              (ge.data = Ce))),
          E2(te, e, Q, r, J));
      }
      wv(te, n);
    });
  }
  function Yo(e, n, r) {
    return { instance: e, listener: n, currentTarget: r };
  }
  function Ri(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e,
        h = d.stateNode;
      if (
        ((d = d.tag),
        (d !== 5 && d !== 26 && d !== 27) ||
          h === null ||
          ((d = fo(e, r)),
          d != null && l.unshift(Yo(e, d, h)),
          (d = fo(e, n)),
          d != null && l.push(Yo(e, d, h))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function R2(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Cv(e, n, r, l, d) {
    for (var h = n._reactName, b = []; r !== null && r !== l; ) {
      var C = r,
        T = C.alternate,
        Q = C.stateNode;
      if (((C = C.tag), T !== null && T === l)) break;
      ((C !== 5 && C !== 26 && C !== 27) ||
        Q === null ||
        ((T = Q),
        d
          ? ((Q = fo(r, h)), Q != null && b.unshift(Yo(r, Q, T)))
          : d || ((Q = fo(r, h)), Q != null && b.push(Yo(r, Q, T)))),
        (r = r.return));
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var O2 = /\r\n?/g,
    _2 = /\u0000|\uFFFD/g;
  function Av(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        O2,
        `
`,
      )
      .replace(_2, "");
  }
  function Nv(e, n) {
    return ((n = Av(n)), Av(e) === n);
  }
  function Ye(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string"
          ? n === "body" || (n === "textarea" && l === "") || as(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            n !== "body" &&
            as(e, "" + l);
        break;
      case "className":
        Tl(e, "class", l);
        break;
      case "tabIndex":
        Tl(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Tl(e, r, l);
        break;
      case "style":
        Np(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Tl(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(r);
          break;
        }
        ((l = Dl("" + l)), e.setAttribute(r, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof h == "function" &&
            (r === "formAction"
              ? (n !== "input" && Ye(e, n, "name", d.name, d, null),
                Ye(e, n, "formEncType", d.formEncType, d, null),
                Ye(e, n, "formMethod", d.formMethod, d, null),
                Ye(e, n, "formTarget", d.formTarget, d, null))
              : (Ye(e, n, "encType", d.encType, d, null),
                Ye(e, n, "method", d.method, d, null),
                Ye(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        ((l = Dl("" + l)), e.setAttribute(r, l));
        break;
      case "onClick":
        l != null && (e.onclick = ra);
        break;
      case "onScroll":
        l != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
          if (((r = l.__html), r != null)) {
            if (d.children != null) throw Error(o(60));
            e.innerHTML = r;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((r = Dl("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(r, "" + l)
          : e.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(r, "")
          : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(r, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? e.setAttribute(r, l)
            : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(r, l)
          : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(r)
          : e.setAttribute(r, l);
        break;
      case "popover":
        (Oe("beforetoggle", e), Oe("toggle", e), jl(e, "popover", l));
        break;
      case "xlinkActuate":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        aa(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        aa(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        aa(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        aa(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        jl(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) ||
          (r[0] !== "o" && r[0] !== "O") ||
          (r[1] !== "n" && r[1] !== "N")) &&
          ((r = aw.get(r) || r), jl(e, r, l));
    }
  }
  function Yd(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        Np(e, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
          if (((r = l.__html), r != null)) {
            if (d.children != null) throw Error(o(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? as(e, l)
          : (typeof l == "number" || typeof l == "bigint") && as(e, "" + l);
        break;
      case "onScroll":
        l != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ra);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!vp.hasOwnProperty(r))
          e: {
            if (
              r[0] === "o" &&
              r[1] === "n" &&
              ((d = r.endsWith("Capture")),
              (n = r.slice(2, d ? r.length - 7 : void 0)),
              (h = e[Ht] || null),
              (h = h != null ? h[r] : null),
              typeof h == "function" && e.removeEventListener(n, h, d),
              typeof l == "function")
            ) {
              (typeof h != "function" &&
                h !== null &&
                (r in e
                  ? (e[r] = null)
                  : e.hasAttribute(r) && e.removeAttribute(r)),
                e.addEventListener(n, l, d));
              break e;
            }
            r in e
              ? (e[r] = l)
              : l === !0
                ? e.setAttribute(r, "")
                : jl(e, r, l);
          }
    }
  }
  function Et(e, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Oe("error", e), Oe("load", e));
        var l = !1,
          d = !1,
          h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var b = r[h];
            if (b != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, n));
                default:
                  Ye(e, n, h, b, r, null);
              }
          }
        (d && Ye(e, n, "srcSet", r.srcSet, r, null),
          l && Ye(e, n, "src", r.src, r, null));
        return;
      case "input":
        Oe("invalid", e);
        var C = (h = b = d = null),
          T = null,
          Q = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var J = r[l];
            if (J != null)
              switch (l) {
                case "name":
                  d = J;
                  break;
                case "type":
                  b = J;
                  break;
                case "checked":
                  T = J;
                  break;
                case "defaultChecked":
                  Q = J;
                  break;
                case "value":
                  h = J;
                  break;
                case "defaultValue":
                  C = J;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (J != null) throw Error(o(137, n));
                  break;
                default:
                  Ye(e, n, l, J, r, null);
              }
          }
        wp(e, h, C, T, Q, b, d, !1);
        return;
      case "select":
        (Oe("invalid", e), (l = b = h = null));
        for (d in r)
          if (r.hasOwnProperty(d) && ((C = r[d]), C != null))
            switch (d) {
              case "value":
                h = C;
                break;
              case "defaultValue":
                b = C;
                break;
              case "multiple":
                l = C;
              default:
                Ye(e, n, d, C, r, null);
            }
        ((n = h),
          (r = b),
          (e.multiple = !!l),
          n != null ? ns(e, !!l, n, !1) : r != null && ns(e, !!l, r, !0));
        return;
      case "textarea":
        (Oe("invalid", e), (h = d = l = null));
        for (b in r)
          if (r.hasOwnProperty(b) && ((C = r[b]), C != null))
            switch (b) {
              case "value":
                l = C;
                break;
              case "defaultValue":
                d = C;
                break;
              case "children":
                h = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(o(91));
                break;
              default:
                Ye(e, n, b, C, r, null);
            }
        Cp(e, l, d, h);
        return;
      case "option":
        for (T in r)
          r.hasOwnProperty(T) &&
            ((l = r[T]), l != null) &&
            (T === "selected"
              ? (e.selected =
                  l && typeof l != "function" && typeof l != "symbol")
              : Ye(e, n, T, l, r, null));
        return;
      case "dialog":
        (Oe("beforetoggle", e),
          Oe("toggle", e),
          Oe("cancel", e),
          Oe("close", e));
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Io.length; l++) Oe(Io[l], e);
        break;
      case "image":
        (Oe("error", e), Oe("load", e));
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Oe("error", e), Oe("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Q in r)
          if (r.hasOwnProperty(Q) && ((l = r[Q]), l != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                Ye(e, n, Q, l, r, null);
            }
        return;
      default:
        if (su(n)) {
          for (J in r)
            r.hasOwnProperty(J) &&
              ((l = r[J]), l !== void 0 && Yd(e, n, J, l, r, void 0));
          return;
        }
    }
    for (C in r)
      r.hasOwnProperty(C) && ((l = r[C]), l != null && Ye(e, n, C, l, r, null));
  }
  function j2(e, n, r, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var d = null,
          h = null,
          b = null,
          C = null,
          T = null,
          Q = null,
          J = null;
        for (F in r) {
          var te = r[F];
          if (r.hasOwnProperty(F) && te != null)
            switch (F) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = te;
              default:
                l.hasOwnProperty(F) || Ye(e, n, F, null, l, te);
            }
        }
        for (var Y in l) {
          var F = l[Y];
          if (((te = r[Y]), l.hasOwnProperty(Y) && (F != null || te != null)))
            switch (Y) {
              case "type":
                h = F;
                break;
              case "name":
                d = F;
                break;
              case "checked":
                Q = F;
                break;
              case "defaultChecked":
                J = F;
                break;
              case "value":
                b = F;
                break;
              case "defaultValue":
                C = F;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null) throw Error(o(137, n));
                break;
              default:
                F !== te && Ye(e, n, Y, F, l, te);
            }
        }
        au(e, b, C, T, Q, J, h, d);
        return;
      case "select":
        F = b = C = Y = null;
        for (h in r)
          if (((T = r[h]), r.hasOwnProperty(h) && T != null))
            switch (h) {
              case "value":
                break;
              case "multiple":
                F = T;
              default:
                l.hasOwnProperty(h) || Ye(e, n, h, null, l, T);
            }
        for (d in l)
          if (
            ((h = l[d]),
            (T = r[d]),
            l.hasOwnProperty(d) && (h != null || T != null))
          )
            switch (d) {
              case "value":
                Y = h;
                break;
              case "defaultValue":
                C = h;
                break;
              case "multiple":
                b = h;
              default:
                h !== T && Ye(e, n, d, h, l, T);
            }
        ((n = C),
          (r = b),
          (l = F),
          Y != null
            ? ns(e, !!r, Y, !1)
            : !!l != !!r &&
              (n != null ? ns(e, !!r, n, !0) : ns(e, !!r, r ? [] : "", !1)));
        return;
      case "textarea":
        F = Y = null;
        for (C in r)
          if (
            ((d = r[C]),
            r.hasOwnProperty(C) && d != null && !l.hasOwnProperty(C))
          )
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ye(e, n, C, null, l, d);
            }
        for (b in l)
          if (
            ((d = l[b]),
            (h = r[b]),
            l.hasOwnProperty(b) && (d != null || h != null))
          )
            switch (b) {
              case "value":
                Y = d;
                break;
              case "defaultValue":
                F = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(o(91));
                break;
              default:
                d !== h && Ye(e, n, b, d, l, h);
            }
        Ep(e, Y, F);
        return;
      case "option":
        for (var he in r)
          ((Y = r[he]),
            r.hasOwnProperty(he) &&
              Y != null &&
              !l.hasOwnProperty(he) &&
              (he === "selected"
                ? (e.selected = !1)
                : Ye(e, n, he, null, l, Y)));
        for (T in l)
          ((Y = l[T]),
            (F = r[T]),
            l.hasOwnProperty(T) &&
              Y !== F &&
              (Y != null || F != null) &&
              (T === "selected"
                ? (e.selected =
                    Y && typeof Y != "function" && typeof Y != "symbol")
                : Ye(e, n, T, Y, l, F)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ye in r)
          ((Y = r[ye]),
            r.hasOwnProperty(ye) &&
              Y != null &&
              !l.hasOwnProperty(ye) &&
              Ye(e, n, ye, null, l, Y));
        for (Q in l)
          if (
            ((Y = l[Q]),
            (F = r[Q]),
            l.hasOwnProperty(Q) && Y !== F && (Y != null || F != null))
          )
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null) throw Error(o(137, n));
                break;
              default:
                Ye(e, n, Q, Y, l, F);
            }
        return;
      default:
        if (su(n)) {
          for (var $e in r)
            ((Y = r[$e]),
              r.hasOwnProperty($e) &&
                Y !== void 0 &&
                !l.hasOwnProperty($e) &&
                Yd(e, n, $e, void 0, l, Y));
          for (J in l)
            ((Y = l[J]),
              (F = r[J]),
              !l.hasOwnProperty(J) ||
                Y === F ||
                (Y === void 0 && F === void 0) ||
                Yd(e, n, J, Y, l, F));
          return;
        }
    }
    for (var k in r)
      ((Y = r[k]),
        r.hasOwnProperty(k) &&
          Y != null &&
          !l.hasOwnProperty(k) &&
          Ye(e, n, k, null, l, Y));
    for (te in l)
      ((Y = l[te]),
        (F = r[te]),
        !l.hasOwnProperty(te) ||
          Y === F ||
          (Y == null && F == null) ||
          Ye(e, n, te, Y, l, F));
  }
  function Rv(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function T2() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0;
        l < r.length;
        l++
      ) {
        var d = r[l],
          h = d.transferSize,
          b = d.initiatorType,
          C = d.duration;
        if (h && C && Rv(b)) {
          for (b = 0, C = d.responseEnd, l += 1; l < r.length; l++) {
            var T = r[l],
              Q = T.startTime;
            if (Q > C) break;
            var J = T.transferSize,
              te = T.initiatorType;
            J &&
              Rv(te) &&
              ((T = T.responseEnd), (b += J * (T < C ? 1 : (C - Q) / (T - Q))));
          }
          if ((--l, (n += (8 * (h + b)) / (d.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var $d = null,
    Gd = null;
  function Oi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ov(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _v(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function Fd(e, n) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Xd = null;
  function M2() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Xd
        ? !1
        : ((Xd = e), !0)
      : ((Xd = null), !1);
  }
  var jv = typeof setTimeout == "function" ? setTimeout : void 0,
    D2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Tv = typeof Promise == "function" ? Promise : void 0,
    z2 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Tv < "u"
          ? function (e) {
              return Tv.resolve(null).then(e).catch(P2);
            }
          : jv;
  function P2(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Xa(e) {
    return e === "head";
  }
  function Mv(e, n) {
    var r = n,
      l = 0;
    do {
      var d = r.nextSibling;
      if ((e.removeChild(r), d && d.nodeType === 8))
        if (((r = d.data), r === "/$" || r === "/&")) {
          if (l === 0) {
            (e.removeChild(d), zs(n));
            return;
          }
          l--;
        } else if (
          r === "$" ||
          r === "$?" ||
          r === "$~" ||
          r === "$!" ||
          r === "&"
        )
          l++;
        else if (r === "html") $o(e.ownerDocument.documentElement);
        else if (r === "head") {
          ((r = e.ownerDocument.head), $o(r));
          for (var h = r.firstChild; h; ) {
            var b = h.nextSibling,
              C = h.nodeName;
            (h[co] ||
              C === "SCRIPT" ||
              C === "STYLE" ||
              (C === "LINK" && h.rel.toLowerCase() === "stylesheet") ||
              r.removeChild(h),
              (h = b));
          }
        } else r === "body" && $o(e.ownerDocument.body);
      r = d;
    } while (r);
    zs(n);
  }
  function Dv(e, n) {
    var r = e;
    e = 0;
    do {
      var l = r.nextSibling;
      if (
        (r.nodeType === 1
          ? n
            ? ((r._stashedDisplay = r.style.display),
              (r.style.display = "none"))
            : ((r.style.display = r._stashedDisplay || ""),
              r.getAttribute("style") === "" && r.removeAttribute("style"))
          : r.nodeType === 3 &&
            (n
              ? ((r._stashedText = r.nodeValue), (r.nodeValue = ""))
              : (r.nodeValue = r._stashedText || "")),
        l && l.nodeType === 8)
      )
        if (((r = l.data), r === "/$")) {
          if (e === 0) break;
          e--;
        } else (r !== "$" && r !== "$?" && r !== "$~" && r !== "$!") || e++;
      r = l;
    } while (r);
  }
  function Kd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (((n = n.nextSibling), r.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Kd(r), tu(r));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(r);
    }
  }
  function k2(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[co])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((h = e.getAttribute("rel")),
                h === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                h !== d.rel ||
                e.getAttribute("href") !==
                  (d.href == null || d.href === "" ? null : d.href) ||
                e.getAttribute("crossorigin") !==
                  (d.crossOrigin == null ? null : d.crossOrigin) ||
                e.getAttribute("title") !== (d.title == null ? null : d.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((h = e.getAttribute("src")),
                (h !== (d.src == null ? null : d.src) ||
                  e.getAttribute("type") !== (d.type == null ? null : d.type) ||
                  e.getAttribute("crossorigin") !==
                    (d.crossOrigin == null ? null : d.crossOrigin)) &&
                  h &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var h = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && e.getAttribute("name") === h) return e;
      } else return e;
      if (((e = pn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function H2(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !r) ||
        ((e = pn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function zv(e, n) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = pn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Zd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Wd(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function L2(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading") n();
    else {
      var l = function () {
        (n(), r.removeEventListener("DOMContentLoaded", l));
      };
      (r.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
    }
  }
  function pn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = e.data),
          n === "$" ||
            n === "$!" ||
            n === "$?" ||
            n === "$~" ||
            n === "&" ||
            n === "F!" ||
            n === "F")
        )
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return e;
  }
  var Jd = null;
  function Pv(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0) return pn(e.nextSibling);
          n--;
        } else
          (r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&") ||
            n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function kv(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return e;
          n--;
        } else (r !== "/$" && r !== "/&") || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Hv(e, n, r) {
    switch (((n = Oi(r)), e)) {
      case "html":
        if (((e = n.documentElement), !e)) throw Error(o(452));
        return e;
      case "head":
        if (((e = n.head), !e)) throw Error(o(453));
        return e;
      case "body":
        if (((e = n.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function $o(e) {
    for (var n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
    tu(e);
  }
  var mn = new Map(),
    Lv = new Set();
  function _i(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ba = V.d;
  V.d = { f: U2, r: B2, D: q2, C: Q2, L: V2, m: I2, X: $2, S: Y2, M: G2 };
  function U2() {
    var e = ba.f(),
      n = bi();
    return e || n;
  }
  function B2(e) {
    var n = Jr(e);
    n !== null && n.tag === 5 && n.type === "form" ? tg(n) : ba.r(e);
  }
  var Ts = typeof document > "u" ? null : document;
  function Uv(e, n, r) {
    var l = Ts;
    if (l && typeof n == "string" && n) {
      var d = on(n);
      ((d = 'link[rel="' + e + '"][href="' + d + '"]'),
        typeof r == "string" && (d += '[crossorigin="' + r + '"]'),
        Lv.has(d) ||
          (Lv.add(d),
          (e = { rel: e, crossOrigin: r, href: n }),
          l.querySelector(d) === null &&
            ((n = l.createElement("link")),
            Et(n, "link", e),
            gt(n),
            l.head.appendChild(n))));
    }
  }
  function q2(e) {
    (ba.D(e), Uv("dns-prefetch", e, null));
  }
  function Q2(e, n) {
    (ba.C(e, n), Uv("preconnect", e, n));
  }
  function V2(e, n, r) {
    ba.L(e, n, r);
    var l = Ts;
    if (l && e && n) {
      var d = 'link[rel="preload"][as="' + on(n) + '"]';
      n === "image" && r && r.imageSrcSet
        ? ((d += '[imagesrcset="' + on(r.imageSrcSet) + '"]'),
          typeof r.imageSizes == "string" &&
            (d += '[imagesizes="' + on(r.imageSizes) + '"]'))
        : (d += '[href="' + on(e) + '"]');
      var h = d;
      switch (n) {
        case "style":
          h = Ms(e);
          break;
        case "script":
          h = Ds(e);
      }
      mn.has(h) ||
        ((e = v(
          {
            rel: "preload",
            href: n === "image" && r && r.imageSrcSet ? void 0 : e,
            as: n,
          },
          r,
        )),
        mn.set(h, e),
        l.querySelector(d) !== null ||
          (n === "style" && l.querySelector(Go(h))) ||
          (n === "script" && l.querySelector(Fo(h))) ||
          ((n = l.createElement("link")),
          Et(n, "link", e),
          gt(n),
          l.head.appendChild(n)));
    }
  }
  function I2(e, n) {
    ba.m(e, n);
    var r = Ts;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script",
        d =
          'link[rel="modulepreload"][as="' + on(l) + '"][href="' + on(e) + '"]',
        h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Ds(e);
      }
      if (
        !mn.has(h) &&
        ((e = v({ rel: "modulepreload", href: e }, n)),
        mn.set(h, e),
        r.querySelector(d) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Fo(h))) return;
        }
        ((l = r.createElement("link")),
          Et(l, "link", e),
          gt(l),
          r.head.appendChild(l));
      }
    }
  }
  function Y2(e, n, r) {
    ba.S(e, n, r);
    var l = Ts;
    if (l && e) {
      var d = es(l).hoistableStyles,
        h = Ms(e);
      n = n || "default";
      var b = d.get(h);
      if (!b) {
        var C = { loading: 0, preload: null };
        if ((b = l.querySelector(Go(h)))) C.loading = 5;
        else {
          ((e = v({ rel: "stylesheet", href: e, "data-precedence": n }, r)),
            (r = mn.get(h)) && ef(e, r));
          var T = (b = l.createElement("link"));
          (gt(T),
            Et(T, "link", e),
            (T._p = new Promise(function (Q, J) {
              ((T.onload = Q), (T.onerror = J));
            })),
            T.addEventListener("load", function () {
              C.loading |= 1;
            }),
            T.addEventListener("error", function () {
              C.loading |= 2;
            }),
            (C.loading |= 4),
            ji(b, n, l));
        }
        ((b = { type: "stylesheet", instance: b, count: 1, state: C }),
          d.set(h, b));
      }
    }
  }
  function $2(e, n) {
    ba.X(e, n);
    var r = Ts;
    if (r && e) {
      var l = es(r).hoistableScripts,
        d = Ds(e),
        h = l.get(d);
      h ||
        ((h = r.querySelector(Fo(d))),
        h ||
          ((e = v({ src: e, async: !0 }, n)),
          (n = mn.get(d)) && tf(e, n),
          (h = r.createElement("script")),
          gt(h),
          Et(h, "link", e),
          r.head.appendChild(h)),
        (h = { type: "script", instance: h, count: 1, state: null }),
        l.set(d, h));
    }
  }
  function G2(e, n) {
    ba.M(e, n);
    var r = Ts;
    if (r && e) {
      var l = es(r).hoistableScripts,
        d = Ds(e),
        h = l.get(d);
      h ||
        ((h = r.querySelector(Fo(d))),
        h ||
          ((e = v({ src: e, async: !0, type: "module" }, n)),
          (n = mn.get(d)) && tf(e, n),
          (h = r.createElement("script")),
          gt(h),
          Et(h, "link", e),
          r.head.appendChild(h)),
        (h = { type: "script", instance: h, count: 1, state: null }),
        l.set(d, h));
    }
  }
  function Bv(e, n, r, l) {
    var d = (d = ue.current) ? _i(d) : null;
    if (!d) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string"
          ? ((n = Ms(r.href)),
            (r = es(d).hoistableStyles),
            (l = r.get(n)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              r.set(n, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          r.rel === "stylesheet" &&
          typeof r.href == "string" &&
          typeof r.precedence == "string"
        ) {
          e = Ms(r.href);
          var h = es(d).hoistableStyles,
            b = h.get(e);
          if (
            (b ||
              ((d = d.ownerDocument || d),
              (b = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              h.set(e, b),
              (h = d.querySelector(Go(e))) &&
                !h._p &&
                ((b.instance = h), (b.state.loading = 5)),
              mn.has(e) ||
                ((r = {
                  rel: "preload",
                  as: "style",
                  href: r.href,
                  crossOrigin: r.crossOrigin,
                  integrity: r.integrity,
                  media: r.media,
                  hrefLang: r.hrefLang,
                  referrerPolicy: r.referrerPolicy,
                }),
                mn.set(e, r),
                h || F2(d, e, r, b.state))),
            n && l === null)
          )
            throw Error(o(528, ""));
          return b;
        }
        if (n && l !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (n = r.async),
          (r = r.src),
          typeof r == "string" &&
          n &&
          typeof n != "function" &&
          typeof n != "symbol"
            ? ((n = Ds(r)),
              (r = es(d).hoistableScripts),
              (l = r.get(n)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                r.set(n, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Ms(e) {
    return 'href="' + on(e) + '"';
  }
  function Go(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qv(e) {
    return v({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function F2(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (l.loading = 1)
      : ((n = e.createElement("link")),
        (l.preload = n),
        n.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Et(n, "link", r),
        gt(n),
        e.head.appendChild(n));
  }
  function Ds(e) {
    return '[src="' + on(e) + '"]';
  }
  function Fo(e) {
    return "script[async]" + e;
  }
  function Qv(e, n, r) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + on(r.href) + '"]');
          if (l) return ((n.instance = l), gt(l), l);
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            gt(l),
            Et(l, "style", d),
            ji(l, r.precedence, e),
            (n.instance = l)
          );
        case "stylesheet":
          d = Ms(r.href);
          var h = e.querySelector(Go(d));
          if (h) return ((n.state.loading |= 4), (n.instance = h), gt(h), h);
          ((l = qv(r)),
            (d = mn.get(d)) && ef(l, d),
            (h = (e.ownerDocument || e).createElement("link")),
            gt(h));
          var b = h;
          return (
            (b._p = new Promise(function (C, T) {
              ((b.onload = C), (b.onerror = T));
            })),
            Et(h, "link", l),
            (n.state.loading |= 4),
            ji(h, r.precedence, e),
            (n.instance = h)
          );
        case "script":
          return (
            (h = Ds(r.src)),
            (d = e.querySelector(Fo(h)))
              ? ((n.instance = d), gt(d), d)
              : ((l = r),
                (d = mn.get(h)) && ((l = v({}, r)), tf(l, d)),
                (e = e.ownerDocument || e),
                (d = e.createElement("script")),
                gt(d),
                Et(d, "link", l),
                e.head.appendChild(d),
                (n.instance = d))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((l = n.instance), (n.state.loading |= 4), ji(l, r.precedence, e));
    return n.instance;
  }
  function ji(e, n, r) {
    for (
      var l = r.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        d = l.length ? l[l.length - 1] : null,
        h = d,
        b = 0;
      b < l.length;
      b++
    ) {
      var C = l[b];
      if (C.dataset.precedence === n) h = C;
      else if (h !== d) break;
    }
    h
      ? h.parentNode.insertBefore(e, h.nextSibling)
      : ((n = r.nodeType === 9 ? r.head : r), n.insertBefore(e, n.firstChild));
  }
  function ef(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.title == null && (e.title = n.title));
  }
  function tf(e, n) {
    (e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.integrity == null && (e.integrity = n.integrity));
  }
  var Ti = null;
  function Vv(e, n, r) {
    if (Ti === null) {
      var l = new Map(),
        d = (Ti = new Map());
      d.set(r, l);
    } else ((d = Ti), (l = d.get(r)), l || ((l = new Map()), d.set(r, l)));
    if (l.has(e)) return l;
    for (
      l.set(e, null), r = r.getElementsByTagName(e), d = 0;
      d < r.length;
      d++
    ) {
      var h = r[d];
      if (
        !(
          h[co] ||
          h[xt] ||
          (e === "link" && h.getAttribute("rel") === "stylesheet")
        ) &&
        h.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var b = h.getAttribute(n) || "";
        b = e + b;
        var C = l.get(b);
        C ? C.push(h) : l.set(b, [h]);
      }
    }
    return l;
  }
  function Iv(e, n, r) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        r,
        n === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function X2(e, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof n.precedence != "string" ||
          typeof n.href != "string" ||
          n.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        return n.rel === "stylesheet"
          ? ((e = n.disabled), typeof n.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Yv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function K2(e, n, r, l) {
    if (
      r.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (r.state.loading & 4) === 0
    ) {
      if (r.instance === null) {
        var d = Ms(l.href),
          h = n.querySelector(Go(d));
        if (h) {
          ((n = h._p),
            n !== null &&
              typeof n == "object" &&
              typeof n.then == "function" &&
              (e.count++, (e = Mi.bind(e)), n.then(e, e)),
            (r.state.loading |= 4),
            (r.instance = h),
            gt(h));
          return;
        }
        ((h = n.ownerDocument || n),
          (l = qv(l)),
          (d = mn.get(d)) && ef(l, d),
          (h = h.createElement("link")),
          gt(h));
        var b = h;
        ((b._p = new Promise(function (C, T) {
          ((b.onload = C), (b.onerror = T));
        })),
          Et(h, "link", l),
          (r.instance = h));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(r, n),
        (n = r.state.preload) &&
          (r.state.loading & 3) === 0 &&
          (e.count++,
          (r = Mi.bind(e)),
          n.addEventListener("load", r),
          n.addEventListener("error", r)));
    }
  }
  var nf = 0;
  function Z2(e, n) {
    return (
      e.stylesheets && e.count === 0 && zi(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (r) {
            var l = setTimeout(function () {
              if ((e.stylesheets && zi(e, e.stylesheets), e.unsuspend)) {
                var h = e.unsuspend;
                ((e.unsuspend = null), h());
              }
            }, 6e4 + n);
            0 < e.imgBytes && nf === 0 && (nf = 62500 * T2());
            var d = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && zi(e, e.stylesheets), e.unsuspend))
                ) {
                  var h = e.unsuspend;
                  ((e.unsuspend = null), h());
                }
              },
              (e.imgBytes > nf ? 50 : 800) + n,
            );
            return (
              (e.unsuspend = r),
              function () {
                ((e.unsuspend = null), clearTimeout(l), clearTimeout(d));
              }
            );
          }
        : null
    );
  }
  function Mi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) zi(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Di = null;
  function zi(e, n) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Di = new Map()),
        n.forEach(W2, e),
        (Di = null),
        Mi.call(e)));
  }
  function W2(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Di.get(e);
      if (r) var l = r.get(null);
      else {
        ((r = new Map()), Di.set(e, r));
        for (
          var d = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            h = 0;
          h < d.length;
          h++
        ) {
          var b = d[h];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") &&
            (r.set(b.dataset.precedence, b), (l = b));
        }
        l && r.set(null, l);
      }
      ((d = n.instance),
        (b = d.getAttribute("data-precedence")),
        (h = r.get(b) || l),
        h === l && r.set(null, d),
        r.set(b, d),
        this.count++,
        (l = Mi.bind(this)),
        d.addEventListener("load", l),
        d.addEventListener("error", l),
        h
          ? h.parentNode.insertBefore(d, h.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(d, e.firstChild)),
        (n.state.loading |= 4));
    }
  }
  var Xo = {
    $$typeof: P,
    Provider: null,
    Consumer: null,
    _currentValue: H,
    _currentValue2: H,
    _threadCount: 0,
  };
  function J2(e, n, r, l, d, h, b, C, T) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ja(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ja(0)),
      (this.hiddenUpdates = ja(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = d),
      (this.onCaughtError = h),
      (this.onRecoverableError = b),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = T),
      (this.incompleteTransitions = new Map()));
  }
  function $v(e, n, r, l, d, h, b, C, T, Q, J, te) {
    return (
      (e = new J2(e, n, r, b, T, Q, J, te, C)),
      (n = 1),
      h === !0 && (n |= 24),
      (h = Ft(3, null, null, n)),
      (e.current = h),
      (h.stateNode = e),
      (n = Pu()),
      n.refCount++,
      (e.pooledCache = n),
      n.refCount++,
      (h.memoizedState = { element: l, isDehydrated: r, cache: n }),
      Uu(h),
      e
    );
  }
  function Gv(e) {
    return e ? ((e = us), e) : us;
  }
  function Fv(e, n, r, l, d, h) {
    ((d = Gv(d)),
      l.context === null ? (l.context = d) : (l.pendingContext = d),
      (l = La(n)),
      (l.payload = { element: r }),
      (h = h === void 0 ? null : h),
      h !== null && (l.callback = h),
      (r = Ua(e, l, n)),
      r !== null && (Vt(r, e, n), Ro(r, e, n)));
  }
  function Xv(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function af(e, n) {
    (Xv(e, n), (e = e.alternate) && Xv(e, n));
  }
  function Kv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = wr(e, 67108864);
      (n !== null && Vt(n, e, 67108864), af(e, 67108864));
    }
  }
  function Zv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Jt();
      n = Kr(n);
      var r = wr(e, n);
      (r !== null && Vt(r, e, n), af(e, n));
    }
  }
  var Pi = !0;
  function eE(e, n, r, l) {
    var d = M.T;
    M.T = null;
    var h = V.p;
    try {
      ((V.p = 2), rf(e, n, r, l));
    } finally {
      ((V.p = h), (M.T = d));
    }
  }
  function tE(e, n, r, l) {
    var d = M.T;
    M.T = null;
    var h = V.p;
    try {
      ((V.p = 8), rf(e, n, r, l));
    } finally {
      ((V.p = h), (M.T = d));
    }
  }
  function rf(e, n, r, l) {
    if (Pi) {
      var d = sf(l);
      if (d === null) (Id(e, n, l, ki, r), Jv(e, l));
      else if (aE(d, e, n, r, l)) l.stopPropagation();
      else if ((Jv(e, l), n & 4 && -1 < nE.indexOf(e))) {
        for (; d !== null; ) {
          var h = Jr(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (((h = h.stateNode), h.current.memoizedState.isDehydrated)) {
                  var b = Mn(h.pendingLanes);
                  if (b !== 0) {
                    var C = h;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; b; ) {
                      var T = 1 << (31 - At(b));
                      ((C.entanglements[1] |= T), (b &= ~T));
                    }
                    (kn(h), (Be & 6) === 0 && ((yi = jt() + 500), Vo(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((C = wr(h, 2)), C !== null && Vt(C, h, 2), bi(), af(h, 2));
            }
          if (((h = sf(l)), h === null && Id(e, n, l, ki, r), h === d)) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else Id(e, n, l, null, r);
    }
  }
  function sf(e) {
    return ((e = lu(e)), of(e));
  }
  var ki = null;
  function of(e) {
    if (((ki = null), (e = Wr(e)), e !== null)) {
      var n = c(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (((e = u(n)), e !== null)) return e;
          e = null;
        } else if (r === 31) {
          if (((e = f(n)), e !== null)) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return ((ki = e), null);
  }
  function Wv(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Zc()) {
          case hr:
            return 2;
          case Ol:
            return 8;
          case pr:
          case lo:
            return 32;
          case na:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lf = !1,
    Ka = null,
    Za = null,
    Wa = null,
    Ko = new Map(),
    Zo = new Map(),
    Ja = [],
    nE =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Jv(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ka = null;
        break;
      case "dragenter":
      case "dragleave":
        Za = null;
        break;
      case "mouseover":
      case "mouseout":
        Wa = null;
        break;
      case "pointerover":
      case "pointerout":
        Ko.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Zo.delete(n.pointerId);
    }
  }
  function Wo(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h
      ? ((e = {
          blockedOn: n,
          domEventName: r,
          eventSystemFlags: l,
          nativeEvent: h,
          targetContainers: [d],
        }),
        n !== null && ((n = Jr(n)), n !== null && Kv(n)),
        e)
      : ((e.eventSystemFlags |= l),
        (n = e.targetContainers),
        d !== null && n.indexOf(d) === -1 && n.push(d),
        e);
  }
  function aE(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return ((Ka = Wo(Ka, e, n, r, l, d)), !0);
      case "dragenter":
        return ((Za = Wo(Za, e, n, r, l, d)), !0);
      case "mouseover":
        return ((Wa = Wo(Wa, e, n, r, l, d)), !0);
      case "pointerover":
        var h = d.pointerId;
        return (Ko.set(h, Wo(Ko.get(h) || null, e, n, r, l, d)), !0);
      case "gotpointercapture":
        return (
          (h = d.pointerId),
          Zo.set(h, Wo(Zo.get(h) || null, e, n, r, l, d)),
          !0
        );
    }
    return !1;
  }
  function ey(e) {
    var n = Wr(e.target);
    if (n !== null) {
      var r = c(n);
      if (r !== null) {
        if (((n = r.tag), n === 13)) {
          if (((n = u(r)), n !== null)) {
            ((e.blockedOn = n),
              pp(e.priority, function () {
                Zv(r);
              }));
            return;
          }
        } else if (n === 31) {
          if (((n = f(r)), n !== null)) {
            ((e.blockedOn = n),
              pp(e.priority, function () {
                Zv(r);
              }));
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Hi(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = sf(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(r.type, r);
        ((ou = l), r.target.dispatchEvent(l), (ou = null));
      } else return ((n = Jr(r)), n !== null && Kv(n), (e.blockedOn = r), !1);
      n.shift();
    }
    return !0;
  }
  function ty(e, n, r) {
    Hi(e) && r.delete(n);
  }
  function rE() {
    ((lf = !1),
      Ka !== null && Hi(Ka) && (Ka = null),
      Za !== null && Hi(Za) && (Za = null),
      Wa !== null && Hi(Wa) && (Wa = null),
      Ko.forEach(ty),
      Zo.forEach(ty));
  }
  function Li(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      lf ||
        ((lf = !0),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, rE)));
  }
  var Ui = null;
  function ny(e) {
    Ui !== e &&
      ((Ui = e),
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        Ui === e && (Ui = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n],
            l = e[n + 1],
            d = e[n + 2];
          if (typeof l != "function") {
            if (of(l || r) === null) continue;
            break;
          }
          var h = Jr(r);
          h !== null &&
            (e.splice(n, 3),
            (n -= 3),
            sd(h, { pending: !0, data: d, method: r.method, action: l }, l, d));
        }
      }));
  }
  function zs(e) {
    function n(T) {
      return Li(T, e);
    }
    (Ka !== null && Li(Ka, e),
      Za !== null && Li(Za, e),
      Wa !== null && Li(Wa, e),
      Ko.forEach(n),
      Zo.forEach(n));
    for (var r = 0; r < Ja.length; r++) {
      var l = Ja[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ja.length && ((r = Ja[0]), r.blockedOn === null); )
      (ey(r), r.blockedOn === null && Ja.shift());
    if (((r = (e.ownerDocument || e).$$reactFormReplay), r != null))
      for (l = 0; l < r.length; l += 3) {
        var d = r[l],
          h = r[l + 1],
          b = d[Ht] || null;
        if (typeof h == "function") b || ny(r);
        else if (b) {
          var C = null;
          if (h && h.hasAttribute("formAction")) {
            if (((d = h), (b = h[Ht] || null))) C = b.formAction;
            else if (of(d) !== null) continue;
          } else C = b.action;
          (typeof C == "function" ? (r[l + 1] = C) : (r.splice(l, 3), (l -= 3)),
            ny(r));
        }
      }
  }
  function ay() {
    function e(h) {
      h.canIntercept &&
        h.info === "react-transition" &&
        h.intercept({
          handler: function () {
            return new Promise(function (b) {
              return (d = b);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function n() {
      (d !== null && (d(), (d = null)), l || setTimeout(r, 20));
    }
    function r() {
      if (!l && !navigation.transition) {
        var h = navigation.currentEntry;
        h &&
          h.url != null &&
          navigation.navigate(h.url, {
            state: h.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var l = !1,
        d = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", n),
        navigation.addEventListener("navigateerror", n),
        setTimeout(r, 100),
        function () {
          ((l = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", n),
            navigation.removeEventListener("navigateerror", n),
            d !== null && (d(), (d = null)));
        }
      );
    }
  }
  function cf(e) {
    this._internalRoot = e;
  }
  ((Bi.prototype.render = cf.prototype.render =
    function (e) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      var r = n.current,
        l = Jt();
      Fv(r, l, e, n, null, null);
    }),
    (Bi.prototype.unmount = cf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var n = e.containerInfo;
          (Fv(e.current, 2, null, e, null, null), bi(), (n[Zr] = null));
        }
      }));
  function Bi(e) {
    this._internalRoot = e;
  }
  Bi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = Jc();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < Ja.length && n !== 0 && n < Ja[r].priority; r++);
      (Ja.splice(r, 0, e), r === 0 && ey(e));
    }
  };
  var ry = a.version;
  if (ry !== "19.2.3") throw Error(o(527, ry, "19.2.3"));
  V.findDOMNode = function (e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function"
        ? Error(o(188))
        : ((e = Object.keys(e).join(",")), Error(o(268, e)));
    return (
      (e = g(n)),
      (e = e !== null ? x(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var sE = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.3",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qi.isDisabled && qi.supportsFiber)
      try {
        ((mr = qi.inject(sE)), (Tt = qi));
      } catch {}
  }
  return (
    (el.createRoot = function (e, n) {
      if (!i(e)) throw Error(o(299));
      var r = !1,
        l = "",
        d = dg,
        h = fg,
        b = hg;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (d = n.onUncaughtError),
          n.onCaughtError !== void 0 && (h = n.onCaughtError),
          n.onRecoverableError !== void 0 && (b = n.onRecoverableError)),
        (n = $v(e, 1, !1, null, null, r, l, null, d, h, b, ay)),
        (e[Zr] = n.current),
        Vd(e),
        new cf(n)
      );
    }),
    (el.hydrateRoot = function (e, n, r) {
      if (!i(e)) throw Error(o(299));
      var l = !1,
        d = "",
        h = dg,
        b = fg,
        C = hg,
        T = null;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (l = !0),
          r.identifierPrefix !== void 0 && (d = r.identifierPrefix),
          r.onUncaughtError !== void 0 && (h = r.onUncaughtError),
          r.onCaughtError !== void 0 && (b = r.onCaughtError),
          r.onRecoverableError !== void 0 && (C = r.onRecoverableError),
          r.formState !== void 0 && (T = r.formState)),
        (n = $v(e, 1, !0, n, r ?? null, l, d, T, h, b, C, ay)),
        (n.context = Gv(null)),
        (r = n.current),
        (l = Jt()),
        (l = Kr(l)),
        (d = La(l)),
        (d.callback = null),
        Ua(r, d, l),
        (r = l),
        (n.current.lanes = r),
        Je(n, r),
        kn(n),
        (e[Zr] = n.current),
        Vd(e),
        new Bi(n)
      );
    }),
    (el.version = "19.2.3"),
    el
  );
}
var py;
function mE() {
  if (py) return ff.exports;
  py = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return (t(), (ff.exports = pE()), ff.exports);
}
var gE = mE();
var my = "popstate";
function gy(t) {
  return (
    typeof t == "object" &&
    t != null &&
    "pathname" in t &&
    "search" in t &&
    "hash" in t &&
    "state" in t &&
    "key" in t
  );
}
function vE(t = {}) {
  function a(o, i) {
    let c = i.state?.masked,
      { pathname: u, search: f, hash: p } = c || o.location;
    return Pf(
      "",
      { pathname: u, search: f, hash: p },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
      c
        ? {
            pathname: o.location.pathname,
            search: o.location.search,
            hash: o.location.hash,
          }
        : void 0,
    );
  }
  function s(o, i) {
    return typeof i == "string" ? i : il(i);
  }
  return xE(a, s, null, t);
}
function tt(t, a) {
  if (t === !1 || t === null || typeof t > "u") throw new Error(a);
}
function Gn(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {}
  }
}
function yE() {
  return Math.random().toString(36).substring(2, 10);
}
function vy(t, a) {
  return {
    usr: t.state,
    key: t.key,
    idx: a,
    masked: t.mask
      ? { pathname: t.pathname, search: t.search, hash: t.hash }
      : void 0,
  };
}
function Pf(t, a, s = null, o, i) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...(typeof a == "string" ? Ks(a) : a),
    state: s,
    key: (a && a.key) || o || yE(),
    mask: i,
  };
}
function il({ pathname: t = "/", search: a = "", hash: s = "" }) {
  return (
    a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a),
    s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s),
    t
  );
}
function Ks(t) {
  let a = {};
  if (t) {
    let s = t.indexOf("#");
    s >= 0 && ((a.hash = t.substring(s)), (t = t.substring(0, s)));
    let o = t.indexOf("?");
    (o >= 0 && ((a.search = t.substring(o)), (t = t.substring(0, o))),
      t && (a.pathname = t));
  }
  return a;
}
function xE(t, a, s, o = {}) {
  let { window: i = document.defaultView, v5Compat: c = !1 } = o,
    u = i.history,
    f = "POP",
    p = null,
    g = x();
  g == null && ((g = 0), u.replaceState({ ...u.state, idx: g }, ""));
  function x() {
    return (u.state || { idx: null }).idx;
  }
  function v() {
    f = "POP";
    let E = x(),
      O = E == null ? null : E - g;
    ((g = E), p && p({ action: f, location: w.location, delta: O }));
  }
  function S(E, O) {
    f = "PUSH";
    let D = gy(E) ? E : Pf(w.location, E, O);
    g = x() + 1;
    let P = vy(D, g),
      G = w.createHref(D.mask || D);
    try {
      u.pushState(P, "", G);
    } catch (L) {
      if (L instanceof DOMException && L.name === "DataCloneError") throw L;
      i.location.assign(G);
    }
    c && p && p({ action: f, location: w.location, delta: 1 });
  }
  function A(E, O) {
    f = "REPLACE";
    let D = gy(E) ? E : Pf(w.location, E, O);
    g = x();
    let P = vy(D, g),
      G = w.createHref(D.mask || D);
    (u.replaceState(P, "", G),
      c && p && p({ action: f, location: w.location, delta: 0 }));
  }
  function N(E) {
    return bE(i, E);
  }
  let w = {
    get action() {
      return f;
    },
    get location() {
      return t(i, u);
    },
    listen(E) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(my, v),
        (p = E),
        () => {
          (i.removeEventListener(my, v), (p = null));
        }
      );
    },
    createHref(E) {
      return a(i, E);
    },
    createURL: N,
    encodeLocation(E) {
      let O = N(E);
      return { pathname: O.pathname, search: O.search, hash: O.hash };
    },
    push: S,
    replace: A,
    go(E) {
      return u.go(E);
    },
  };
  return w;
}
function bE(t, a, s = !1) {
  let o = "http://localhost";
  (t &&
    (o = t.location.origin !== "null" ? t.location.origin : t.location.href),
    tt(o, "No window.location.(origin|href) available to create URL"));
  let i = typeof a == "string" ? a : il(a);
  return (
    (i = i.replace(/ $/, "%20")),
    !s && i.startsWith("//") && (i = o + i),
    new URL(i, o)
  );
}
function Dx(t, a, s = "/") {
  return SE(t, a, s, !1);
}
function SE(t, a, s, o, i) {
  let c = typeof a == "string" ? Ks(a) : a,
    u = Ea(c.pathname || "/", s);
  if (u == null) return null;
  let f = wE(t),
    p = null,
    g = zE(u);
  for (let x = 0; p == null && x < f.length; ++x) p = ME(f[x], g, o);
  return p;
}
function wE(t) {
  let a = zx(t);
  return (EE(a), a);
}
function zx(t, a = [], s = [], o = "", i = !1) {
  let c = (u, f, p = i, g) => {
    let x = {
      relativePath: g === void 0 ? u.path || "" : g,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: f,
      route: u,
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(o) && p) return;
      (tt(
        x.relativePath.startsWith(o),
        `Absolute route path "${x.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (x.relativePath = x.relativePath.slice(o.length)));
    }
    let v = An([o, x.relativePath]),
      S = s.concat(x);
    (u.children &&
      u.children.length > 0 &&
      (tt(
        u.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`,
      ),
      zx(u.children, a, S, v, p)),
      !(u.path == null && !u.index) &&
        a.push({ path: v, score: jE(v, u.index), routesMeta: S }));
  };
  return (
    t.forEach((u, f) => {
      if (u.path === "" || !u.path?.includes("?")) c(u, f);
      else for (let p of Px(u.path)) c(u, f, !0, p);
    }),
    a
  );
}
function Px(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...o] = a,
    i = s.endsWith("?"),
    c = s.replace(/\?$/, "");
  if (o.length === 0) return i ? [c, ""] : [c];
  let u = Px(o.join("/")),
    f = [];
  return (
    f.push(...u.map((p) => (p === "" ? c : [c, p].join("/")))),
    i && f.push(...u),
    f.map((p) => (t.startsWith("/") && p === "" ? "/" : p))
  );
}
function EE(t) {
  t.sort((a, s) =>
    a.score !== s.score
      ? s.score - a.score
      : TE(
          a.routesMeta.map((o) => o.childrenIndex),
          s.routesMeta.map((o) => o.childrenIndex),
        ),
  );
}
var CE = /^:[\w-]+$/,
  AE = 3,
  NE = 2,
  RE = 1,
  OE = 10,
  _E = -2,
  yy = (t) => t === "*";
function jE(t, a) {
  let s = t.split("/"),
    o = s.length;
  return (
    s.some(yy) && (o += _E),
    a && (o += NE),
    s
      .filter((i) => !yy(i))
      .reduce((i, c) => i + (CE.test(c) ? AE : c === "" ? RE : OE), o)
  );
}
function TE(t, a) {
  return t.length === a.length && t.slice(0, -1).every((o, i) => o === a[i])
    ? t[t.length - 1] - a[a.length - 1]
    : 0;
}
function ME(t, a, s = !1) {
  let { routesMeta: o } = t,
    i = {},
    c = "/",
    u = [];
  for (let f = 0; f < o.length; ++f) {
    let p = o[f],
      g = f === o.length - 1,
      x = c === "/" ? a : a.slice(c.length) || "/",
      v = uc(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: g },
        x,
      ),
      S = p.route;
    if (
      (!v &&
        g &&
        s &&
        !o[o.length - 1].route.index &&
        (v = uc(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          x,
        )),
      !v)
    )
      return null;
    (Object.assign(i, v.params),
      u.push({
        params: i,
        pathname: An([c, v.pathname]),
        pathnameBase: LE(An([c, v.pathnameBase])),
        route: S,
      }),
      v.pathnameBase !== "/" && (c = An([c, v.pathnameBase])));
  }
  return u;
}
function uc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, o] = DE(t.path, t.caseSensitive, t.end),
    i = a.match(s);
  if (!i) return null;
  let c = i[0],
    u = c.replace(/(.)\/+$/, "$1"),
    f = i.slice(1);
  return {
    params: o.reduce((g, { paramName: x, isOptional: v }, S) => {
      if (x === "*") {
        let N = f[S] || "";
        u = c.slice(0, c.length - N.length).replace(/(.)\/+$/, "$1");
      }
      const A = f[S];
      return (
        v && !A ? (g[x] = void 0) : (g[x] = (A || "").replace(/%2F/g, "/")),
        g
      );
    }, {}),
    pathname: c,
    pathnameBase: u,
    pattern: t,
  };
}
function DE(t, a = !1, s = !0) {
  Gn(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`,
  );
  let o = [],
    i =
      "^" +
      t
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (u, f, p, g, x) => {
          if ((o.push({ paramName: f, isOptional: p != null }), p)) {
            let v = x.charAt(g + u.length);
            return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    t.endsWith("*")
      ? (o.push({ paramName: "*" }),
        (i += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (i += "\\/*$")
        : t !== "" && t !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, a ? void 0 : "i"), o]
  );
}
function zE(t) {
  try {
    return t
      .split("/")
      .map((a) => decodeURIComponent(a).replace(/\//g, "%2F"))
      .join("/");
  } catch (a) {
    return (
      Gn(
        !1,
        `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`,
      ),
      t
    );
  }
}
function Ea(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase())) return null;
  let s = a.endsWith("/") ? a.length - 1 : a.length,
    o = t.charAt(s);
  return o && o !== "/" ? null : t.slice(s) || "/";
}
var PE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function kE(t, a = "/") {
  let {
      pathname: s,
      search: o = "",
      hash: i = "",
    } = typeof t == "string" ? Ks(t) : t,
    c;
  return (
    s
      ? ((s = Hx(s)),
        s.startsWith("/") ? (c = xy(s.substring(1), "/")) : (c = xy(s, a)))
      : (c = a),
    { pathname: c, search: UE(o), hash: BE(i) }
  );
}
function xy(t, a) {
  let s = dc(a).split("/");
  return (
    t.split("/").forEach((i) => {
      i === ".." ? s.length > 1 && s.pop() : i !== "." && s.push(i);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function gf(t, a, s, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function HE(t) {
  return t.filter(
    (a, s) => s === 0 || (a.route.path && a.route.path.length > 0),
  );
}
function kx(t) {
  let a = HE(t);
  return a.map((s, o) => (o === a.length - 1 ? s.pathname : s.pathnameBase));
}
function wh(t, a, s, o = !1) {
  let i;
  typeof t == "string"
    ? (i = Ks(t))
    : ((i = { ...t }),
      tt(
        !i.pathname || !i.pathname.includes("?"),
        gf("?", "pathname", "search", i),
      ),
      tt(
        !i.pathname || !i.pathname.includes("#"),
        gf("#", "pathname", "hash", i),
      ),
      tt(!i.search || !i.search.includes("#"), gf("#", "search", "hash", i)));
  let c = t === "" || i.pathname === "",
    u = c ? "/" : i.pathname,
    f;
  if (u == null) f = s;
  else {
    let v = a.length - 1;
    if (!o && u.startsWith("..")) {
      let S = u.split("/");
      for (; S[0] === ".."; ) (S.shift(), (v -= 1));
      i.pathname = S.join("/");
    }
    f = v >= 0 ? a[v] : "/";
  }
  let p = kE(i, f),
    g = u && u !== "/" && u.endsWith("/"),
    x = (c || u === ".") && s.endsWith("/");
  return (!p.pathname.endsWith("/") && (g || x) && (p.pathname += "/"), p);
}
var Hx = (t) => t.replace(/\/\/+/g, "/"),
  An = (t) => Hx(t.join("/")),
  dc = (t) => t.replace(/\/+$/, ""),
  LE = (t) => dc(t).replace(/^\/*/, "/"),
  UE = (t) => (!t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t),
  BE = (t) => (!t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t),
  qE = class {
    constructor(t, a, s, o = !1) {
      ((this.status = t),
        (this.statusText = a || ""),
        (this.internal = o),
        s instanceof Error
          ? ((this.data = s.toString()), (this.error = s))
          : (this.data = s));
    }
  };
function QE(t) {
  return (
    t != null &&
    typeof t.status == "number" &&
    typeof t.statusText == "string" &&
    typeof t.internal == "boolean" &&
    "data" in t
  );
}
function VE(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return An(a) || "/";
}
var Lx =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Ux(t, a) {
  let s = t;
  if (typeof s != "string" || !PE.test(s))
    return { absoluteURL: void 0, isExternal: !1, to: s };
  let o = s,
    i = !1;
  if (Lx)
    try {
      let c = new URL(window.location.href),
        u = s.startsWith("//") ? new URL(c.protocol + s) : new URL(s),
        f = Ea(u.pathname, a);
      u.origin === c.origin && f != null
        ? (s = f + u.search + u.hash)
        : (i = !0);
    } catch {
      Gn(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: o, isExternal: i, to: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Bx = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Bx);
var IE = ["GET", ...Bx];
new Set(IE);
var Zs = y.createContext(null);
Zs.displayName = "DataRouter";
var Rc = y.createContext(null);
Rc.displayName = "DataRouterState";
var qx = y.createContext(!1);
function YE() {
  return y.useContext(qx);
}
var Qx = y.createContext({ isTransitioning: !1 });
Qx.displayName = "ViewTransition";
var $E = y.createContext(new Map());
$E.displayName = "Fetchers";
var GE = y.createContext(null);
GE.displayName = "Await";
var gn = y.createContext(null);
gn.displayName = "Navigation";
var xl = y.createContext(null);
xl.displayName = "Location";
var Kn = y.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Kn.displayName = "Route";
var Eh = y.createContext(null);
Eh.displayName = "RouteError";
var Vx = "REACT_ROUTER_ERROR",
  FE = "REDIRECT",
  XE = "ROUTE_ERROR_RESPONSE";
function KE(t) {
  if (t.startsWith(`${Vx}:${FE}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (
        typeof a == "object" &&
        a &&
        typeof a.status == "number" &&
        typeof a.statusText == "string" &&
        typeof a.location == "string" &&
        typeof a.reloadDocument == "boolean" &&
        typeof a.replace == "boolean"
      )
        return a;
    } catch {}
}
function ZE(t) {
  if (t.startsWith(`${Vx}:${XE}:{`))
    try {
      let a = JSON.parse(t.slice(40));
      if (
        typeof a == "object" &&
        a &&
        typeof a.status == "number" &&
        typeof a.statusText == "string"
      )
        return new qE(a.status, a.statusText, a.data);
    } catch {}
}
function WE(t, { relative: a } = {}) {
  tt(
    bl(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: s, navigator: o } = y.useContext(gn),
    { hash: i, pathname: c, search: u } = Sl(t, { relative: a }),
    f = c;
  return (
    s !== "/" && (f = c === "/" ? s : An([s, c])),
    o.createHref({ pathname: f, search: u, hash: i })
  );
}
function bl() {
  return y.useContext(xl) != null;
}
function Zn() {
  return (
    tt(
      bl(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    y.useContext(xl).location
  );
}
var Ix =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Yx(t) {
  y.useContext(gn).static || y.useLayoutEffect(t);
}
function $x() {
  let { isDataRoute: t } = y.useContext(Kn);
  return t ? hC() : JE();
}
function JE() {
  tt(
    bl(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let t = y.useContext(Zs),
    { basename: a, navigator: s } = y.useContext(gn),
    { matches: o } = y.useContext(Kn),
    { pathname: i } = Zn(),
    c = JSON.stringify(kx(o)),
    u = y.useRef(!1);
  return (
    Yx(() => {
      u.current = !0;
    }),
    y.useCallback(
      (p, g = {}) => {
        if ((Gn(u.current, Ix), !u.current)) return;
        if (typeof p == "number") {
          s.go(p);
          return;
        }
        let x = wh(p, JSON.parse(c), i, g.relative === "path");
        (t == null &&
          a !== "/" &&
          (x.pathname = x.pathname === "/" ? a : An([a, x.pathname])),
          (g.replace ? s.replace : s.push)(x, g.state, g));
      },
      [a, s, c, i, t],
    )
  );
}
var eC = y.createContext(null);
function tC(t) {
  let a = y.useContext(Kn).outlet;
  return y.useMemo(
    () => a && y.createElement(eC.Provider, { value: t }, a),
    [a, t],
  );
}
function Sl(t, { relative: a } = {}) {
  let { matches: s } = y.useContext(Kn),
    { pathname: o } = Zn(),
    i = JSON.stringify(kx(s));
  return y.useMemo(() => wh(t, JSON.parse(i), o, a === "path"), [t, i, o, a]);
}
function nC(t, a) {
  return Gx(t, a);
}
function Gx(t, a, s) {
  tt(
    bl(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: o } = y.useContext(gn),
    { matches: i } = y.useContext(Kn),
    c = i[i.length - 1],
    u = c ? c.params : {},
    f = c ? c.pathname : "/",
    p = c ? c.pathnameBase : "/",
    g = c && c.route;
  {
    let E = (g && g.path) || "";
    Xx(
      f,
      !g || E.endsWith("*") || E.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E === "/" ? "*" : `${E}/*`}">.`,
    );
  }
  let x = Zn(),
    v;
  if (a) {
    let E = typeof a == "string" ? Ks(a) : a;
    (tt(
      p === "/" || E.pathname?.startsWith(p),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${E.pathname}" was given in the \`location\` prop.`,
    ),
      (v = E));
  } else v = x;
  let S = v.pathname || "/",
    A = S;
  if (p !== "/") {
    let E = p.replace(/^\//, "").split("/");
    A = "/" + S.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let N =
    s && s.state.matches.length
      ? s.state.matches.map((E) =>
          Object.assign(E, { route: s.manifest[E.route.id] || E.route }),
        )
      : Dx(t, { pathname: A });
  (Gn(
    g || N != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `,
  ),
    Gn(
      N == null ||
        N[N.length - 1].route.element !== void 0 ||
        N[N.length - 1].route.Component !== void 0 ||
        N[N.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let w = lC(
    N &&
      N.map((E) =>
        Object.assign({}, E, {
          params: Object.assign({}, u, E.params),
          pathname: An([
            p,
            o.encodeLocation
              ? o.encodeLocation(
                  E.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23"),
                ).pathname
              : E.pathname,
          ]),
          pathnameBase:
            E.pathnameBase === "/"
              ? p
              : An([
                  p,
                  o.encodeLocation
                    ? o.encodeLocation(
                        E.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : E.pathnameBase,
                ]),
        }),
      ),
    i,
    s,
  );
  return a && w
    ? y.createElement(
        xl.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...v,
            },
            navigationType: "POP",
          },
        },
        w,
      )
    : w;
}
function aC() {
  let t = fC(),
    a = QE(t)
      ? `${t.status} ${t.statusText}`
      : t instanceof Error
        ? t.message
        : JSON.stringify(t),
    s = t instanceof Error ? t.stack : null,
    o = "rgba(200,200,200, 0.5)",
    i = { padding: "0.5rem", backgroundColor: o },
    c = { padding: "2px 4px", backgroundColor: o },
    u = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", t),
    (u = y.createElement(
      y.Fragment,
      null,
      y.createElement("p", null, "💿 Hey developer 👋"),
      y.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        y.createElement("code", { style: c }, "ErrorBoundary"),
        " or",
        " ",
        y.createElement("code", { style: c }, "errorElement"),
        " prop on your route.",
      ),
    )),
    y.createElement(
      y.Fragment,
      null,
      y.createElement("h2", null, "Unexpected Application Error!"),
      y.createElement("h3", { style: { fontStyle: "italic" } }, a),
      s ? y.createElement("pre", { style: i }, s) : null,
      u,
    )
  );
}
var rC = y.createElement(aC, null),
  Fx = class extends y.Component {
    constructor(t) {
      (super(t),
        (this.state = {
          location: t.location,
          revalidation: t.revalidation,
          error: t.error,
        }));
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    static getDerivedStateFromProps(t, a) {
      return a.location !== t.location ||
        (a.revalidation !== "idle" && t.revalidation === "idle")
        ? { error: t.error, location: t.location, revalidation: t.revalidation }
        : {
            error: t.error !== void 0 ? t.error : a.error,
            location: a.location,
            revalidation: t.revalidation || a.revalidation,
          };
    }
    componentDidCatch(t, a) {
      this.props.onError
        ? this.props.onError(t, a)
        : console.error(
            "React Router caught the following error during render",
            t,
          );
    }
    render() {
      let t = this.state.error;
      if (
        this.context &&
        typeof t == "object" &&
        t &&
        "digest" in t &&
        typeof t.digest == "string"
      ) {
        const s = ZE(t.digest);
        s && (t = s);
      }
      let a =
        t !== void 0
          ? y.createElement(
              Kn.Provider,
              { value: this.props.routeContext },
              y.createElement(Eh.Provider, {
                value: t,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? y.createElement(sC, { error: t }, a) : a;
    }
  };
Fx.contextType = qx;
var vf = new WeakMap();
function sC({ children: t, error: a }) {
  let { basename: s } = y.useContext(gn);
  if (
    typeof a == "object" &&
    a &&
    "digest" in a &&
    typeof a.digest == "string"
  ) {
    let o = KE(a.digest);
    if (o) {
      let i = vf.get(a);
      if (i) throw i;
      let c = Ux(o.location, s);
      if (Lx && !vf.get(a))
        if (c.isExternal || o.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const u = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(c.to, {
              replace: o.replace,
            }),
          );
          throw (vf.set(a, u), u);
        }
      return y.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${c.absoluteURL || c.to}`,
      });
    }
  }
  return t;
}
function oC({ routeContext: t, match: a, children: s }) {
  let o = y.useContext(Zs);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (a.route.errorElement || a.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = a.route.id),
    y.createElement(Kn.Provider, { value: t }, s)
  );
}
function lC(t, a = [], s) {
  let o = s?.state;
  if (t == null) {
    if (!o) return null;
    if (o.errors) t = o.matches;
    else if (a.length === 0 && !o.initialized && o.matches.length > 0)
      t = o.matches;
    else return null;
  }
  let i = t,
    c = o?.errors;
  if (c != null) {
    let x = i.findIndex((v) => v.route.id && c?.[v.route.id] !== void 0);
    (tt(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`,
    ),
      (i = i.slice(0, Math.min(i.length, x + 1))));
  }
  let u = !1,
    f = -1;
  if (s && o) {
    u = o.renderFallback;
    for (let x = 0; x < i.length; x++) {
      let v = i[x];
      if (
        ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (f = x),
        v.route.id)
      ) {
        let { loaderData: S, errors: A } = o,
          N =
            v.route.loader &&
            !S.hasOwnProperty(v.route.id) &&
            (!A || A[v.route.id] === void 0);
        if (v.route.lazy || N) {
          (s.isStatic && (u = !0),
            f >= 0 ? (i = i.slice(0, f + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  }
  let p = s?.onError,
    g =
      o && p
        ? (x, v) => {
            p(x, {
              location: o.location,
              params: o.matches?.[0]?.params ?? {},
              pattern: VE(o.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return i.reduceRight((x, v, S) => {
    let A,
      N = !1,
      w = null,
      E = null;
    o &&
      ((A = c && v.route.id ? c[v.route.id] : void 0),
      (w = v.route.errorElement || rC),
      u &&
        (f < 0 && S === 0
          ? (Xx(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (N = !0),
            (E = null))
          : f === S &&
            ((N = !0), (E = v.route.hydrateFallbackElement || null))));
    let O = a.concat(i.slice(0, S + 1)),
      D = () => {
        let P;
        return (
          A
            ? (P = w)
            : N
              ? (P = E)
              : v.route.Component
                ? (P = y.createElement(v.route.Component, null))
                : v.route.element
                  ? (P = v.route.element)
                  : (P = x),
          y.createElement(oC, {
            match: v,
            routeContext: { outlet: x, matches: O, isDataRoute: o != null },
            children: P,
          })
        );
      };
    return o && (v.route.ErrorBoundary || v.route.errorElement || S === 0)
      ? y.createElement(Fx, {
          location: o.location,
          revalidation: o.revalidation,
          component: w,
          error: A,
          children: D(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          onError: g,
        })
      : D();
  }, null);
}
function Ch(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function iC(t) {
  let a = y.useContext(Zs);
  return (tt(a, Ch(t)), a);
}
function cC(t) {
  let a = y.useContext(Rc);
  return (tt(a, Ch(t)), a);
}
function uC(t) {
  let a = y.useContext(Kn);
  return (tt(a, Ch(t)), a);
}
function Ah(t) {
  let a = uC(t),
    s = a.matches[a.matches.length - 1];
  return (
    tt(
      s.route.id,
      `${t} can only be used on routes that contain a unique "id"`,
    ),
    s.route.id
  );
}
function dC() {
  return Ah("useRouteId");
}
function fC() {
  let t = y.useContext(Eh),
    a = cC("useRouteError"),
    s = Ah("useRouteError");
  return t !== void 0 ? t : a.errors?.[s];
}
function hC() {
  let { router: t } = iC("useNavigate"),
    a = Ah("useNavigate"),
    s = y.useRef(!1);
  return (
    Yx(() => {
      s.current = !0;
    }),
    y.useCallback(
      async (i, c = {}) => {
        (Gn(s.current, Ix),
          s.current &&
            (typeof i == "number"
              ? await t.navigate(i)
              : await t.navigate(i, { fromRouteId: a, ...c })));
      },
      [t, a],
    )
  );
}
var by = {};
function Xx(t, a, s) {
  !a && !by[t] && ((by[t] = !0), Gn(!1, s));
}
y.memo(pC);
function pC({
  routes: t,
  manifest: a,
  future: s,
  state: o,
  isStatic: i,
  onError: c,
}) {
  return Gx(t, void 0, { manifest: a, state: o, isStatic: i, onError: c });
}
function mC(t) {
  return tC(t.context);
}
function wa(t) {
  tt(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function gC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: o = "POP",
  navigator: i,
  static: c = !1,
  useTransitions: u,
}) {
  tt(
    !bl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let f = t.replace(/^\/*/, "/"),
    p = y.useMemo(
      () => ({
        basename: f,
        navigator: i,
        static: c,
        useTransitions: u,
        future: {},
      }),
      [f, i, c, u],
    );
  typeof s == "string" && (s = Ks(s));
  let {
      pathname: g = "/",
      search: x = "",
      hash: v = "",
      state: S = null,
      key: A = "default",
      mask: N,
    } = s,
    w = y.useMemo(() => {
      let E = Ea(g, f);
      return E == null
        ? null
        : {
            location: {
              pathname: E,
              search: x,
              hash: v,
              state: S,
              key: A,
              mask: N,
            },
            navigationType: o,
          };
    }, [f, g, x, v, S, A, o, N]);
  return (
    Gn(
      w != null,
      `<Router basename="${f}"> is not able to match the URL "${g}${x}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    w == null
      ? null
      : y.createElement(
          gn.Provider,
          { value: p },
          y.createElement(xl.Provider, { children: a, value: w }),
        )
  );
}
function vC({ children: t, location: a }) {
  return nC(kf(t), a);
}
function kf(t, a = []) {
  let s = [];
  return (
    y.Children.forEach(t, (o, i) => {
      if (!y.isValidElement(o)) return;
      let c = [...a, i];
      if (o.type === y.Fragment) {
        s.push.apply(s, kf(o.props.children, c));
        return;
      }
      (tt(
        o.type === wa,
        `[${typeof o.type == "string" ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        tt(
          !o.props.index || !o.props.children,
          "An index route cannot have child routes.",
        ));
      let u = {
        id: o.props.id || c.join("-"),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        middleware: o.props.middleware,
        loader: o.props.loader,
        action: o.props.action,
        hydrateFallbackElement: o.props.hydrateFallbackElement,
        HydrateFallback: o.props.HydrateFallback,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.hasErrorBoundary === !0 ||
          o.props.ErrorBoundary != null ||
          o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      (o.props.children && (u.children = kf(o.props.children, c)), s.push(u));
    }),
    s
  );
}
var nc = "get",
  ac = "application/x-www-form-urlencoded";
function Oc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function yC(t) {
  return Oc(t) && t.tagName.toLowerCase() === "button";
}
function xC(t) {
  return Oc(t) && t.tagName.toLowerCase() === "form";
}
function bC(t) {
  return Oc(t) && t.tagName.toLowerCase() === "input";
}
function SC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function wC(t, a) {
  return t.button === 0 && (!a || a === "_self") && !SC(t);
}
var Qi = null;
function EC() {
  if (Qi === null)
    try {
      (new FormData(document.createElement("form"), 0), (Qi = !1));
    } catch {
      Qi = !0;
    }
  return Qi;
}
var CC = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function yf(t) {
  return t != null && !CC.has(t)
    ? (Gn(
        !1,
        `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ac}"`,
      ),
      null)
    : t;
}
function AC(t, a) {
  let s, o, i, c, u;
  if (xC(t)) {
    let f = t.getAttribute("action");
    ((o = f ? Ea(f, a) : null),
      (s = t.getAttribute("method") || nc),
      (i = yf(t.getAttribute("enctype")) || ac),
      (c = new FormData(t)));
  } else if (yC(t) || (bC(t) && (t.type === "submit" || t.type === "image"))) {
    let f = t.form;
    if (f == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let p = t.getAttribute("formaction") || f.getAttribute("action");
    if (
      ((o = p ? Ea(p, a) : null),
      (s = t.getAttribute("formmethod") || f.getAttribute("method") || nc),
      (i =
        yf(t.getAttribute("formenctype")) ||
        yf(f.getAttribute("enctype")) ||
        ac),
      (c = new FormData(f, t)),
      !EC())
    ) {
      let { name: g, type: x, value: v } = t;
      if (x === "image") {
        let S = g ? `${g}.` : "";
        (c.append(`${S}x`, "0"), c.append(`${S}y`, "0"));
      } else g && c.append(g, v);
    }
  } else {
    if (Oc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((s = nc), (o = null), (i = ac), (u = t));
  }
  return (
    c && i === "text/plain" && ((u = c), (c = void 0)),
    { action: o, method: s.toLowerCase(), encType: i, formData: c, body: u }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Nh(t, a) {
  if (t === !1 || t === null || typeof t > "u") throw new Error(a);
}
function Kx(t, a, s, o) {
  let i =
    typeof t == "string"
      ? new URL(
          t,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : t;
  return (
    s
      ? i.pathname.endsWith("/")
        ? (i.pathname = `${i.pathname}_.${o}`)
        : (i.pathname = `${i.pathname}.${o}`)
      : i.pathname === "/"
        ? (i.pathname = `_root.${o}`)
        : a && Ea(i.pathname, a) === "/"
          ? (i.pathname = `${dc(a)}/_root.${o}`)
          : (i.pathname = `${dc(i.pathname)}.${o}`),
    i
  );
}
async function NC(t, a) {
  if (t.id in a) return a[t.id];
  try {
    let s = await import(t.module);
    return ((a[t.id] = s), s);
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${t.module}\`, reloading page...`,
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function RC(t) {
  return t == null
    ? !1
    : t.href == null
      ? t.rel === "preload" &&
        typeof t.imageSrcSet == "string" &&
        typeof t.imageSizes == "string"
      : typeof t.rel == "string" && typeof t.href == "string";
}
async function OC(t, a, s) {
  let o = await Promise.all(
    t.map(async (i) => {
      let c = a.routes[i.route.id];
      if (c) {
        let u = await NC(c, s);
        return u.links ? u.links() : [];
      }
      return [];
    }),
  );
  return MC(
    o
      .flat(1)
      .filter(RC)
      .filter((i) => i.rel === "stylesheet" || i.rel === "preload")
      .map((i) =>
        i.rel === "stylesheet"
          ? { ...i, rel: "prefetch", as: "style" }
          : { ...i, rel: "prefetch" },
      ),
  );
}
function Sy(t, a, s, o, i, c) {
  let u = (p, g) => (s[g] ? p.route.id !== s[g].route.id : !0),
    f = (p, g) =>
      s[g].pathname !== p.pathname ||
      (s[g].route.path?.endsWith("*") && s[g].params["*"] !== p.params["*"]);
  return c === "assets"
    ? a.filter((p, g) => u(p, g) || f(p, g))
    : c === "data"
      ? a.filter((p, g) => {
          let x = o.routes[p.route.id];
          if (!x || !x.hasLoader) return !1;
          if (u(p, g) || f(p, g)) return !0;
          if (p.route.shouldRevalidate) {
            let v = p.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin,
              ),
              currentParams: s[0]?.params || {},
              nextUrl: new URL(t, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof v == "boolean") return v;
          }
          return !0;
        })
      : [];
}
function _C(t, a, { includeHydrateFallback: s } = {}) {
  return jC(
    t
      .map((o) => {
        let i = a.routes[o.route.id];
        if (!i) return [];
        let c = [i.module];
        return (
          i.clientActionModule && (c = c.concat(i.clientActionModule)),
          i.clientLoaderModule && (c = c.concat(i.clientLoaderModule)),
          s &&
            i.hydrateFallbackModule &&
            (c = c.concat(i.hydrateFallbackModule)),
          i.imports && (c = c.concat(i.imports)),
          c
        );
      })
      .flat(1),
  );
}
function jC(t) {
  return [...new Set(t)];
}
function TC(t) {
  let a = {},
    s = Object.keys(t).sort();
  for (let o of s) a[o] = t[o];
  return a;
}
function MC(t, a) {
  let s = new Set();
  return (
    new Set(a),
    t.reduce((o, i) => {
      let c = JSON.stringify(TC(i));
      return (s.has(c) || (s.add(c), o.push({ key: c, link: i })), o);
    }, [])
  );
}
function Rh() {
  let t = y.useContext(Zs);
  return (
    Nh(
      t,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    t
  );
}
function DC() {
  let t = y.useContext(Rc);
  return (
    Nh(
      t,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    t
  );
}
var Oh = y.createContext(void 0);
Oh.displayName = "FrameworkContext";
function _h() {
  let t = y.useContext(Oh);
  return (
    Nh(t, "You must render this element inside a <HydratedRouter> element"),
    t
  );
}
function zC(t, a) {
  let s = y.useContext(Oh),
    [o, i] = y.useState(!1),
    [c, u] = y.useState(!1),
    {
      onFocus: f,
      onBlur: p,
      onMouseEnter: g,
      onMouseLeave: x,
      onTouchStart: v,
    } = a,
    S = y.useRef(null);
  (y.useEffect(() => {
    if ((t === "render" && u(!0), t === "viewport")) {
      let w = (O) => {
          O.forEach((D) => {
            u(D.isIntersecting);
          });
        },
        E = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        S.current && E.observe(S.current),
        () => {
          E.disconnect();
        }
      );
    }
  }, [t]),
    y.useEffect(() => {
      if (o) {
        let w = setTimeout(() => {
          u(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [o]));
  let A = () => {
      i(!0);
    },
    N = () => {
      (i(!1), u(!1));
    };
  return s
    ? t !== "intent"
      ? [c, S, {}]
      : [
          c,
          S,
          {
            onFocus: tl(f, A),
            onBlur: tl(p, N),
            onMouseEnter: tl(g, A),
            onMouseLeave: tl(x, N),
            onTouchStart: tl(v, A),
          },
        ]
    : [!1, S, {}];
}
function tl(t, a) {
  return (s) => {
    (t && t(s), s.defaultPrevented || a(s));
  };
}
function PC({ page: t, ...a }) {
  let s = YE(),
    { router: o } = Rh(),
    i = y.useMemo(() => Dx(o.routes, t, o.basename), [o.routes, t, o.basename]);
  return i
    ? s
      ? y.createElement(HC, { page: t, matches: i, ...a })
      : y.createElement(LC, { page: t, matches: i, ...a })
    : null;
}
function kC(t) {
  let { manifest: a, routeModules: s } = _h(),
    [o, i] = y.useState([]);
  return (
    y.useEffect(() => {
      let c = !1;
      return (
        OC(t, a, s).then((u) => {
          c || i(u);
        }),
        () => {
          c = !0;
        }
      );
    }, [t, a, s]),
    o
  );
}
function HC({ page: t, matches: a, ...s }) {
  let o = Zn(),
    { future: i } = _h(),
    { basename: c } = Rh(),
    u = y.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return [];
      let f = Kx(t, c, i.v8_trailingSlashAwareDataRequests, "rsc"),
        p = !1,
        g = [];
      for (let x of a)
        typeof x.route.shouldRevalidate == "function"
          ? (p = !0)
          : g.push(x.route.id);
      return (
        p && g.length > 0 && f.searchParams.set("_routes", g.join(",")),
        [f.pathname + f.search]
      );
    }, [c, i.v8_trailingSlashAwareDataRequests, t, o, a]);
  return y.createElement(
    y.Fragment,
    null,
    u.map((f) =>
      y.createElement("link", {
        key: f,
        rel: "prefetch",
        as: "fetch",
        href: f,
        ...s,
      }),
    ),
  );
}
function LC({ page: t, matches: a, ...s }) {
  let o = Zn(),
    { future: i, manifest: c, routeModules: u } = _h(),
    { basename: f } = Rh(),
    { loaderData: p, matches: g } = DC(),
    x = y.useMemo(() => Sy(t, a, g, c, o, "data"), [t, a, g, c, o]),
    v = y.useMemo(() => Sy(t, a, g, c, o, "assets"), [t, a, g, c, o]),
    S = y.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return [];
      let w = new Set(),
        E = !1;
      if (
        (a.forEach((D) => {
          let P = c.routes[D.route.id];
          !P ||
            !P.hasLoader ||
            ((!x.some((G) => G.route.id === D.route.id) &&
              D.route.id in p &&
              u[D.route.id]?.shouldRevalidate) ||
            P.hasClientLoader
              ? (E = !0)
              : w.add(D.route.id));
        }),
        w.size === 0)
      )
        return [];
      let O = Kx(t, f, i.v8_trailingSlashAwareDataRequests, "data");
      return (
        E &&
          w.size > 0 &&
          O.searchParams.set(
            "_routes",
            a
              .filter((D) => w.has(D.route.id))
              .map((D) => D.route.id)
              .join(","),
          ),
        [O.pathname + O.search]
      );
    }, [f, i.v8_trailingSlashAwareDataRequests, p, o, c, x, a, t, u]),
    A = y.useMemo(() => _C(v, c), [v, c]),
    N = kC(v);
  return y.createElement(
    y.Fragment,
    null,
    S.map((w) =>
      y.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...s,
      }),
    ),
    A.map((w) =>
      y.createElement("link", { key: w, rel: "modulepreload", href: w, ...s }),
    ),
    N.map(({ key: w, link: E }) =>
      y.createElement("link", {
        key: w,
        nonce: s.nonce,
        ...E,
        crossOrigin: E.crossOrigin ?? s.crossOrigin,
      }),
    ),
  );
}
function UC(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var BC =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  BC && (window.__reactRouterVersion = "7.17.0");
} catch {}
function qC({ basename: t, children: a, useTransitions: s, window: o }) {
  let i = y.useRef();
  i.current == null && (i.current = vE({ window: o, v5Compat: !0 }));
  let c = i.current,
    [u, f] = y.useState({ action: c.action, location: c.location }),
    p = y.useCallback(
      (g) => {
        s === !1 ? f(g) : y.startTransition(() => f(g));
      },
      [s],
    );
  return (
    y.useLayoutEffect(() => c.listen(p), [c, p]),
    y.createElement(gC, {
      basename: t,
      children: a,
      location: u.location,
      navigationType: u.action,
      navigator: c,
      useTransitions: s,
    })
  );
}
var Zx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  tn = y.forwardRef(function (
    {
      onClick: a,
      discover: s = "render",
      prefetch: o = "none",
      relative: i,
      reloadDocument: c,
      replace: u,
      mask: f,
      state: p,
      target: g,
      to: x,
      preventScrollReset: v,
      viewTransition: S,
      defaultShouldRevalidate: A,
      ...N
    },
    w,
  ) {
    let { basename: E, navigator: O, useTransitions: D } = y.useContext(gn),
      P = typeof x == "string" && Zx.test(x),
      G = Ux(x, E);
    x = G.to;
    let L = WE(x, { relative: i }),
      q = Zn(),
      j = null;
    if (f) {
      let ie = wh(f, [], q.mask ? q.mask.pathname : "/", !0);
      (E !== "/" &&
        (ie.pathname = ie.pathname === "/" ? E : An([E, ie.pathname])),
        (j = O.createHref(ie)));
    }
    let [R, U, $] = zC(o, N),
      Z = YC(x, {
        replace: u,
        mask: f,
        state: p,
        target: g,
        preventScrollReset: v,
        relative: i,
        viewTransition: S,
        defaultShouldRevalidate: A,
        useTransitions: D,
      });
    function W(ie) {
      (a && a(ie), ie.defaultPrevented || Z(ie));
    }
    let re = !(G.isExternal || c),
      oe = y.createElement("a", {
        ...N,
        ...$,
        href: (re ? j : void 0) || G.absoluteURL || L,
        onClick: re ? W : a,
        ref: UC(w, U),
        target: g,
        "data-discover": !P && s === "render" ? "true" : void 0,
      });
    return R && !P
      ? y.createElement(y.Fragment, null, oe, y.createElement(PC, { page: L }))
      : oe;
  });
tn.displayName = "Link";
var QC = y.forwardRef(function (
  {
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: o = "",
    end: i = !1,
    style: c,
    to: u,
    viewTransition: f,
    children: p,
    ...g
  },
  x,
) {
  let v = Sl(u, { relative: g.relative }),
    S = Zn(),
    A = y.useContext(Rc),
    { navigator: N, basename: w } = y.useContext(gn),
    E = A != null && KC(v) && f === !0,
    O = N.encodeLocation ? N.encodeLocation(v).pathname : v.pathname,
    D = S.pathname,
    P =
      A && A.navigation && A.navigation.location
        ? A.navigation.location.pathname
        : null;
  (s ||
    ((D = D.toLowerCase()),
    (P = P ? P.toLowerCase() : null),
    (O = O.toLowerCase())),
    P && w && (P = Ea(P, w) || P));
  const G = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
  let L = D === O || (!i && D.startsWith(O) && D.charAt(G) === "/"),
    q =
      P != null &&
      (P === O || (!i && P.startsWith(O) && P.charAt(O.length) === "/")),
    j = { isActive: L, isPending: q, isTransitioning: E },
    R = L ? a : void 0,
    U;
  typeof o == "function"
    ? (U = o(j))
    : (U = [
        o,
        L ? "active" : null,
        q ? "pending" : null,
        E ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let $ = typeof c == "function" ? c(j) : c;
  return y.createElement(
    tn,
    {
      ...g,
      "aria-current": R,
      className: U,
      ref: x,
      style: $,
      to: u,
      viewTransition: f,
    },
    typeof p == "function" ? p(j) : p,
  );
});
QC.displayName = "NavLink";
var VC = y.forwardRef(
  (
    {
      discover: t = "render",
      fetcherKey: a,
      navigate: s,
      reloadDocument: o,
      replace: i,
      state: c,
      method: u = nc,
      action: f,
      onSubmit: p,
      relative: g,
      preventScrollReset: x,
      viewTransition: v,
      defaultShouldRevalidate: S,
      ...A
    },
    N,
  ) => {
    let { useTransitions: w } = y.useContext(gn),
      E = FC(),
      O = XC(f, { relative: g }),
      D = u.toLowerCase() === "get" ? "get" : "post",
      P = typeof f == "string" && Zx.test(f),
      G = (L) => {
        if ((p && p(L), L.defaultPrevented)) return;
        L.preventDefault();
        let q = L.nativeEvent.submitter,
          j = q?.getAttribute("formmethod") || u,
          R = () =>
            E(q || L.currentTarget, {
              fetcherKey: a,
              method: j,
              navigate: s,
              replace: i,
              state: c,
              relative: g,
              preventScrollReset: x,
              viewTransition: v,
              defaultShouldRevalidate: S,
            });
        w && s !== !1 ? y.startTransition(() => R()) : R();
      };
    return y.createElement("form", {
      ref: N,
      method: D,
      action: O,
      onSubmit: o ? p : G,
      ...A,
      "data-discover": !P && t === "render" ? "true" : void 0,
    });
  },
);
VC.displayName = "Form";
function IC(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wx(t) {
  let a = y.useContext(Zs);
  return (tt(a, IC(t)), a);
}
function YC(
  t,
  {
    target: a,
    replace: s,
    mask: o,
    state: i,
    preventScrollReset: c,
    relative: u,
    viewTransition: f,
    defaultShouldRevalidate: p,
    useTransitions: g,
  } = {},
) {
  let x = $x(),
    v = Zn(),
    S = Sl(t, { relative: u });
  return y.useCallback(
    (A) => {
      if (wC(A, a)) {
        A.preventDefault();
        let N = s !== void 0 ? s : il(v) === il(S),
          w = () =>
            x(t, {
              replace: N,
              mask: o,
              state: i,
              preventScrollReset: c,
              relative: u,
              viewTransition: f,
              defaultShouldRevalidate: p,
            });
        g ? y.startTransition(() => w()) : w();
      }
    },
    [v, x, S, s, o, i, a, t, c, u, f, p, g],
  );
}
var $C = 0,
  GC = () => `__${String(++$C)}__`;
function FC() {
  let { router: t } = Wx("useSubmit"),
    { basename: a } = y.useContext(gn),
    s = dC(),
    o = t.fetch,
    i = t.navigate;
  return y.useCallback(
    async (c, u = {}) => {
      let { action: f, method: p, encType: g, formData: x, body: v } = AC(c, a);
      if (u.navigate === !1) {
        let S = u.fetcherKey || GC();
        await o(S, s, u.action || f, {
          defaultShouldRevalidate: u.defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: x,
          body: v,
          formMethod: u.method || p,
          formEncType: u.encType || g,
          flushSync: u.flushSync,
        });
      } else
        await i(u.action || f, {
          defaultShouldRevalidate: u.defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: x,
          body: v,
          formMethod: u.method || p,
          formEncType: u.encType || g,
          replace: u.replace,
          state: u.state,
          fromRouteId: s,
          flushSync: u.flushSync,
          viewTransition: u.viewTransition,
        });
    },
    [o, i, a, s],
  );
}
function XC(t, { relative: a } = {}) {
  let { basename: s } = y.useContext(gn),
    o = y.useContext(Kn);
  tt(o, "useFormAction must be used inside a RouteContext");
  let [i] = o.matches.slice(-1),
    c = { ...Sl(t || ".", { relative: a }) },
    u = Zn();
  if (t == null) {
    c.search = u.search;
    let f = new URLSearchParams(c.search),
      p = f.getAll("index");
    if (p.some((x) => x === "")) {
      (f.delete("index"),
        p.filter((v) => v).forEach((v) => f.append("index", v)));
      let x = f.toString();
      c.search = x ? `?${x}` : "";
    }
  }
  return (
    (!t || t === ".") &&
      i.route.index &&
      (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (c.pathname = c.pathname === "/" ? s : An([s, c.pathname])),
    il(c)
  );
}
function KC(t, { relative: a } = {}) {
  let s = y.useContext(Qx);
  tt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: o } = Wx("useViewTransitionState"),
    i = Sl(t, { relative: a });
  if (!s.isTransitioning) return !1;
  let c = Ea(s.currentLocation.pathname, o) || s.currentLocation.pathname,
    u = Ea(s.nextLocation.pathname, o) || s.nextLocation.pathname;
  return uc(i.pathname, u) != null || uc(i.pathname, c) != null;
}
var Ir = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(t) {
      return (
        this.listeners.add(t),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(t), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  ZC = class extends Ir {
    #t;
    #e;
    #n;
    constructor() {
      (super(),
        (this.#n = (t) => {
          if (typeof window < "u" && window.addEventListener) {
            const a = () => t();
            return (
              window.addEventListener("visibilitychange", a, !1),
              () => {
                window.removeEventListener("visibilitychange", a);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(t) {
      ((this.#n = t),
        this.#e?.(),
        (this.#e = t((a) => {
          typeof a == "boolean" ? this.setFocused(a) : this.onFocus();
        })));
    }
    setFocused(t) {
      this.#t !== t && ((this.#t = t), this.onFocus());
    }
    onFocus() {
      const t = this.isFocused();
      this.listeners.forEach((a) => {
        a(t);
      });
    }
    isFocused() {
      return typeof this.#t == "boolean"
        ? this.#t
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  jh = new ZC(),
  WC = {
    setTimeout: (t, a) => setTimeout(t, a),
    clearTimeout: (t) => clearTimeout(t),
    setInterval: (t, a) => setInterval(t, a),
    clearInterval: (t) => clearInterval(t),
  },
  JC = class {
    #t = WC;
    #e = !1;
    setTimeoutProvider(t) {
      this.#t = t;
    }
    setTimeout(t, a) {
      return this.#t.setTimeout(t, a);
    }
    clearTimeout(t) {
      this.#t.clearTimeout(t);
    }
    setInterval(t, a) {
      return this.#t.setInterval(t, a);
    }
    clearInterval(t) {
      this.#t.clearInterval(t);
    }
  },
  kr = new JC();
function eA(t) {
  setTimeout(t, 0);
}
var tA = typeof window > "u" || "Deno" in globalThis;
function Ot() {}
function nA(t, a) {
  return typeof t == "function" ? t(a) : t;
}
function Hf(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Jx(t, a) {
  return Math.max(t + (a || 0) - Date.now(), 0);
}
function rr(t, a) {
  return typeof t == "function" ? t(a) : t;
}
function en(t, a) {
  return typeof t == "function" ? t(a) : t;
}
function wy(t, a) {
  const {
    type: s = "all",
    exact: o,
    fetchStatus: i,
    predicate: c,
    queryKey: u,
    stale: f,
  } = t;
  if (u) {
    if (o) {
      if (a.queryHash !== Th(u, a.options)) return !1;
    } else if (!cl(a.queryKey, u)) return !1;
  }
  if (s !== "all") {
    const p = a.isActive();
    if ((s === "active" && !p) || (s === "inactive" && p)) return !1;
  }
  return !(
    (typeof f == "boolean" && a.isStale() !== f) ||
    (i && i !== a.state.fetchStatus) ||
    (c && !c(a))
  );
}
function Ey(t, a) {
  const { exact: s, status: o, predicate: i, mutationKey: c } = t;
  if (c) {
    if (!a.options.mutationKey) return !1;
    if (s) {
      if (or(a.options.mutationKey) !== or(c)) return !1;
    } else if (!cl(a.options.mutationKey, c)) return !1;
  }
  return !((o && a.state.status !== o) || (i && !i(a)));
}
function Th(t, a) {
  return (a?.queryKeyHashFn || or)(t);
}
function or(t) {
  return JSON.stringify(t, (a, s) =>
    Lf(s)
      ? Object.keys(s)
          .sort()
          .reduce((o, i) => ((o[i] = s[i]), o), {})
      : s,
  );
}
function cl(t, a) {
  return t === a
    ? !0
    : typeof t != typeof a
      ? !1
      : t && a && typeof t == "object" && typeof a == "object"
        ? Object.keys(a).every((s) => cl(t[s], a[s]))
        : !1;
}
var aA = Object.prototype.hasOwnProperty;
function Mh(t, a, s = 0) {
  if (t === a) return t;
  if (s > 500) return a;
  const o = Cy(t) && Cy(a);
  if (!o && !(Lf(t) && Lf(a))) return a;
  const c = (o ? t : Object.keys(t)).length,
    u = o ? a : Object.keys(a),
    f = u.length,
    p = o ? new Array(f) : {};
  let g = 0;
  for (let x = 0; x < f; x++) {
    const v = o ? x : u[x],
      S = t[v],
      A = a[v];
    if (S === A) {
      ((p[v] = S), (o ? x < c : aA.call(t, v)) && g++);
      continue;
    }
    if (
      S === null ||
      A === null ||
      typeof S != "object" ||
      typeof A != "object"
    ) {
      p[v] = A;
      continue;
    }
    const N = Mh(S, A, s + 1);
    ((p[v] = N), N === S && g++);
  }
  return c === f && g === c ? t : p;
}
function ul(t, a) {
  if (!a || Object.keys(t).length !== Object.keys(a).length) return !1;
  for (const s in t) if (t[s] !== a[s]) return !1;
  return !0;
}
function Cy(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function Lf(t) {
  if (!Ay(t)) return !1;
  const a = t.constructor;
  if (a === void 0) return !0;
  const s = a.prototype;
  return !(
    !Ay(s) ||
    !s.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(t) !== Object.prototype
  );
}
function Ay(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function rA(t) {
  return new Promise((a) => {
    kr.setTimeout(a, t);
  });
}
function Uf(t, a, s) {
  return typeof s.structuralSharing == "function"
    ? s.structuralSharing(t, a)
    : s.structuralSharing !== !1
      ? Mh(t, a)
      : a;
}
function sA(t, a, s = 0) {
  const o = [...t, a];
  return s && o.length > s ? o.slice(1) : o;
}
function oA(t, a, s = 0) {
  const o = [a, ...t];
  return s && o.length > s ? o.slice(0, -1) : o;
}
var an = Symbol();
function e0(t, a) {
  return !t.queryFn && a?.initialPromise
    ? () => a.initialPromise
    : !t.queryFn || t.queryFn === an
      ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`))
      : t.queryFn;
}
function Dh(t, a) {
  return typeof t == "function" ? t(...a) : !!t;
}
function lA(t, a, s) {
  let o = !1,
    i;
  return (
    Object.defineProperty(t, "signal", {
      enumerable: !0,
      get: () => (
        (i ??= a()),
        o ||
          ((o = !0),
          i.aborted ? s() : i.addEventListener("abort", s, { once: !0 })),
        i
      ),
    }),
    t
  );
}
var dl = (() => {
  let t = () => tA;
  return {
    isServer() {
      return t();
    },
    setIsServer(a) {
      t = a;
    },
  };
})();
function Bf() {
  let t, a;
  const s = new Promise((i, c) => {
    ((t = i), (a = c));
  });
  ((s.status = "pending"), s.catch(() => {}));
  function o(i) {
    (Object.assign(s, i), delete s.resolve, delete s.reject);
  }
  return (
    (s.resolve = (i) => {
      (o({ status: "fulfilled", value: i }), t(i));
    }),
    (s.reject = (i) => {
      (o({ status: "rejected", reason: i }), a(i));
    }),
    s
  );
}
var iA = eA;
function cA() {
  let t = [],
    a = 0,
    s = (f) => {
      f();
    },
    o = (f) => {
      f();
    },
    i = iA;
  const c = (f) => {
      a
        ? t.push(f)
        : i(() => {
            s(f);
          });
    },
    u = () => {
      const f = t;
      ((t = []),
        f.length &&
          i(() => {
            o(() => {
              f.forEach((p) => {
                s(p);
              });
            });
          }));
    };
  return {
    batch: (f) => {
      let p;
      a++;
      try {
        p = f();
      } finally {
        (a--, a || u());
      }
      return p;
    },
    batchCalls:
      (f) =>
      (...p) => {
        c(() => {
          f(...p);
        });
      },
    schedule: c,
    setNotifyFunction: (f) => {
      s = f;
    },
    setBatchNotifyFunction: (f) => {
      o = f;
    },
    setScheduler: (f) => {
      i = f;
    },
  };
}
var rt = cA(),
  uA = class extends Ir {
    #t = !0;
    #e;
    #n;
    constructor() {
      (super(),
        (this.#n = (t) => {
          if (typeof window < "u" && window.addEventListener) {
            const a = () => t(!0),
              s = () => t(!1);
            return (
              window.addEventListener("online", a, !1),
              window.addEventListener("offline", s, !1),
              () => {
                (window.removeEventListener("online", a),
                  window.removeEventListener("offline", s));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(t) {
      ((this.#n = t), this.#e?.(), (this.#e = t(this.setOnline.bind(this))));
    }
    setOnline(t) {
      this.#t !== t &&
        ((this.#t = t),
        this.listeners.forEach((s) => {
          s(t);
        }));
    }
    isOnline() {
      return this.#t;
    }
  },
  fc = new uA();
function dA(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function t0(t) {
  return (t ?? "online") === "online" ? fc.isOnline() : !0;
}
var qf = class extends Error {
  constructor(t) {
    (super("CancelledError"),
      (this.revert = t?.revert),
      (this.silent = t?.silent));
  }
};
function n0(t) {
  let a = !1,
    s = 0,
    o;
  const i = Bf(),
    c = () => i.status !== "pending",
    u = (w) => {
      if (!c()) {
        const E = new qf(w);
        (S(E), t.onCancel?.(E));
      }
    },
    f = () => {
      a = !0;
    },
    p = () => {
      a = !1;
    },
    g = () =>
      jh.isFocused() &&
      (t.networkMode === "always" || fc.isOnline()) &&
      t.canRun(),
    x = () => t0(t.networkMode) && t.canRun(),
    v = (w) => {
      c() || (o?.(), i.resolve(w));
    },
    S = (w) => {
      c() || (o?.(), i.reject(w));
    },
    A = () =>
      new Promise((w) => {
        ((o = (E) => {
          (c() || g()) && w(E);
        }),
          t.onPause?.());
      }).then(() => {
        ((o = void 0), c() || t.onContinue?.());
      }),
    N = () => {
      if (c()) return;
      let w;
      const E = s === 0 ? t.initialPromise : void 0;
      try {
        w = E ?? t.fn();
      } catch (O) {
        w = Promise.reject(O);
      }
      Promise.resolve(w)
        .then(v)
        .catch((O) => {
          if (c()) return;
          const D = t.retry ?? (dl.isServer() ? 0 : 3),
            P = t.retryDelay ?? dA,
            G = typeof P == "function" ? P(s, O) : P,
            L =
              D === !0 ||
              (typeof D == "number" && s < D) ||
              (typeof D == "function" && D(s, O));
          if (a || !L) {
            S(O);
            return;
          }
          (s++,
            t.onFail?.(s, O),
            rA(G)
              .then(() => (g() ? void 0 : A()))
              .then(() => {
                a ? S(O) : N();
              }));
        });
    };
  return {
    promise: i,
    status: () => i.status,
    cancel: u,
    continue: () => (o?.(), i),
    cancelRetry: f,
    continueRetry: p,
    canStart: x,
    start: () => (x() ? N() : A().then(N), i),
  };
}
var a0 = class {
  #t;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    (this.clearGcTimeout(),
      Hf(this.gcTime) &&
        (this.#t = kr.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime)));
  }
  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (dl.isServer() ? 1 / 0 : 300 * 1e3),
    );
  }
  clearGcTimeout() {
    this.#t !== void 0 && (kr.clearTimeout(this.#t), (this.#t = void 0));
  }
};
function fA(t) {
  return {
    onFetch: (a, s) => {
      const o = a.options,
        i = a.fetchOptions?.meta?.fetchMore?.direction,
        c = a.state.data?.pages || [],
        u = a.state.data?.pageParams || [];
      let f = { pages: [], pageParams: [] },
        p = 0;
      const g = async () => {
        let x = !1;
        const v = (N) => {
            lA(
              N,
              () => a.signal,
              () => (x = !0),
            );
          },
          S = e0(a.options, a.fetchOptions),
          A = async (N, w, E) => {
            if (x) return Promise.reject(a.signal.reason);
            if (w == null && N.pages.length) return Promise.resolve(N);
            const D = (() => {
                const q = {
                  client: a.client,
                  queryKey: a.queryKey,
                  pageParam: w,
                  direction: E ? "backward" : "forward",
                  meta: a.options.meta,
                };
                return (v(q), q);
              })(),
              P = await S(D),
              { maxPages: G } = a.options,
              L = E ? oA : sA;
            return {
              pages: L(N.pages, P, G),
              pageParams: L(N.pageParams, w, G),
            };
          };
        if (i && c.length) {
          const N = i === "backward",
            w = N ? r0 : Qf,
            E = { pages: c, pageParams: u },
            O = w(o, E);
          f = await A(E, O, N);
        } else {
          const N = t ?? c.length;
          do {
            const w = p === 0 ? (u[0] ?? o.initialPageParam) : Qf(o, f);
            if (p > 0 && w == null) break;
            ((f = await A(f, w)), p++);
          } while (p < N);
        }
        return f;
      };
      a.options.persister
        ? (a.fetchFn = () =>
            a.options.persister?.(
              g,
              {
                client: a.client,
                queryKey: a.queryKey,
                meta: a.options.meta,
                signal: a.signal,
              },
              s,
            ))
        : (a.fetchFn = g);
    },
  };
}
function Qf(t, { pages: a, pageParams: s }) {
  const o = a.length - 1;
  return a.length > 0 ? t.getNextPageParam(a[o], a, s[o], s) : void 0;
}
function r0(t, { pages: a, pageParams: s }) {
  return a.length > 0 ? t.getPreviousPageParam?.(a[0], a, s[0], s) : void 0;
}
function hA(t, a) {
  return a ? Qf(t, a) != null : !1;
}
function pA(t, a) {
  return !a || !t.getPreviousPageParam ? !1 : r0(t, a) != null;
}
var mA = class extends a0 {
  #t;
  #e;
  #n;
  #a;
  #r;
  #s;
  #l;
  #o;
  constructor(t) {
    (super(),
      (this.#o = !1),
      (this.#l = t.defaultOptions),
      this.setOptions(t.options),
      (this.observers = []),
      (this.#r = t.client),
      (this.#a = this.#r.getQueryCache()),
      (this.queryKey = t.queryKey),
      (this.queryHash = t.queryHash),
      (this.#e = Ry(this.options)),
      (this.state = t.state ?? this.#e),
      this.scheduleGc());
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#t;
  }
  get promise() {
    return this.#s?.promise;
  }
  setOptions(t) {
    if (
      ((this.options = { ...this.#l, ...t }),
      t?._type && (this.#t = t._type),
      this.updateGcTime(this.options.gcTime),
      this.state && this.state.data === void 0)
    ) {
      const a = Ry(this.options);
      a.data !== void 0 &&
        (this.setState(Ny(a.data, a.dataUpdatedAt)), (this.#e = a));
    }
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === "idle" &&
      this.#a.remove(this);
  }
  setData(t, a) {
    const s = Uf(this.state.data, t, this.options);
    return (
      this.#i({
        data: s,
        type: "success",
        dataUpdatedAt: a?.updatedAt,
        manual: a?.manual,
      }),
      s
    );
  }
  setState(t) {
    this.#i({ type: "setState", state: t });
  }
  cancel(t) {
    const a = this.#s?.promise;
    return (this.#s?.cancel(t), a ? a.then(Ot).catch(Ot) : Promise.resolve());
  }
  destroy() {
    (super.destroy(), this.cancel({ silent: !0 }));
  }
  get resetState() {
    return this.#e;
  }
  reset() {
    (this.destroy(), this.setState(this.resetState));
  }
  isActive() {
    return this.observers.some((t) => en(t.options.enabled, this) !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0
      ? !this.isActive()
      : this.options.queryFn === an || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0
      ? this.observers.some((t) => rr(t.options.staleTime, this) === "static")
      : !1;
  }
  isStale() {
    return this.getObserversCount() > 0
      ? this.observers.some((t) => t.getCurrentResult().isStale)
      : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(t = 0) {
    return this.state.data === void 0
      ? !0
      : t === "static"
        ? !1
        : this.state.isInvalidated
          ? !0
          : !Jx(this.state.dataUpdatedAt, t);
  }
  onFocus() {
    (this.observers
      .find((a) => a.shouldFetchOnWindowFocus())
      ?.refetch({ cancelRefetch: !1 }),
      this.#s?.continue());
  }
  onOnline() {
    (this.observers
      .find((a) => a.shouldFetchOnReconnect())
      ?.refetch({ cancelRefetch: !1 }),
      this.#s?.continue());
  }
  addObserver(t) {
    this.observers.includes(t) ||
      (this.observers.push(t),
      this.clearGcTimeout(),
      this.#a.notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) &&
      ((this.observers = this.observers.filter((a) => a !== t)),
      this.observers.length ||
        (this.#s &&
          (this.#o || this.#u()
            ? this.#s.cancel({ revert: !0 })
            : this.#s.cancelRetry()),
        this.scheduleGc()),
      this.#a.notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  #u() {
    return (
      this.state.fetchStatus === "paused" && this.state.status === "pending"
    );
  }
  invalidate() {
    this.state.isInvalidated || this.#i({ type: "invalidate" });
  }
  async fetch(t, a) {
    if (this.state.fetchStatus !== "idle" && this.#s?.status() !== "rejected") {
      if (this.state.data !== void 0 && a?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#s) return (this.#s.continueRetry(), this.#s.promise);
    }
    if ((t && this.setOptions(t), !this.options.queryFn)) {
      const p = this.observers.find((g) => g.options.queryFn);
      p && this.setOptions(p.options);
    }
    const s = new AbortController(),
      o = (p) => {
        Object.defineProperty(p, "signal", {
          enumerable: !0,
          get: () => ((this.#o = !0), s.signal),
        });
      },
      i = () => {
        const p = e0(this.options, a),
          x = (() => {
            const v = {
              client: this.#r,
              queryKey: this.queryKey,
              meta: this.meta,
            };
            return (o(v), v);
          })();
        return (
          (this.#o = !1),
          this.options.persister ? this.options.persister(p, x, this) : p(x)
        );
      },
      u = (() => {
        const p = {
          fetchOptions: a,
          options: this.options,
          queryKey: this.queryKey,
          client: this.#r,
          state: this.state,
          fetchFn: i,
        };
        return (o(p), p);
      })();
    ((this.#t === "infinite"
      ? fA(this.options.pages)
      : this.options.behavior
    )?.onFetch(u, this),
      (this.#n = this.state),
      (this.state.fetchStatus === "idle" ||
        this.state.fetchMeta !== u.fetchOptions?.meta) &&
        this.#i({ type: "fetch", meta: u.fetchOptions?.meta }),
      (this.#s = n0({
        initialPromise: a?.initialPromise,
        fn: u.fetchFn,
        onCancel: (p) => {
          (p instanceof qf &&
            p.revert &&
            this.setState({ ...this.#n, fetchStatus: "idle" }),
            s.abort());
        },
        onFail: (p, g) => {
          this.#i({ type: "failed", failureCount: p, error: g });
        },
        onPause: () => {
          this.#i({ type: "pause" });
        },
        onContinue: () => {
          this.#i({ type: "continue" });
        },
        retry: u.options.retry,
        retryDelay: u.options.retryDelay,
        networkMode: u.options.networkMode,
        canRun: () => !0,
      })));
    try {
      const p = await this.#s.start();
      if (p === void 0) throw new Error(`${this.queryHash} data is undefined`);
      return (
        this.setData(p),
        this.#a.config.onSuccess?.(p, this),
        this.#a.config.onSettled?.(p, this.state.error, this),
        p
      );
    } catch (p) {
      if (p instanceof qf) {
        if (p.silent) return this.#s.promise;
        if (p.revert) {
          if (this.state.data === void 0) throw p;
          return this.state.data;
        }
      }
      throw (
        this.#i({ type: "error", error: p }),
        this.#a.config.onError?.(p, this),
        this.#a.config.onSettled?.(this.state.data, p, this),
        p
      );
    } finally {
      this.scheduleGc();
    }
  }
  #i(t) {
    const a = (s) => {
      switch (t.type) {
        case "failed":
          return {
            ...s,
            fetchFailureCount: t.failureCount,
            fetchFailureReason: t.error,
          };
        case "pause":
          return { ...s, fetchStatus: "paused" };
        case "continue":
          return { ...s, fetchStatus: "fetching" };
        case "fetch":
          return {
            ...s,
            ...s0(s.data, this.options),
            fetchMeta: t.meta ?? null,
          };
        case "success":
          const o = {
            ...s,
            ...Ny(t.data, t.dataUpdatedAt),
            dataUpdateCount: s.dataUpdateCount + 1,
            ...(!t.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
          return ((this.#n = t.manual ? o : void 0), o);
        case "error":
          const i = t.error;
          return {
            ...s,
            error: i,
            errorUpdateCount: s.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: s.fetchFailureCount + 1,
            fetchFailureReason: i,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: !0,
          };
        case "invalidate":
          return { ...s, isInvalidated: !0 };
        case "setState":
          return { ...s, ...t.state };
      }
    };
    ((this.state = a(this.state)),
      rt.batch(() => {
        (this.observers.forEach((s) => {
          s.onQueryUpdate();
        }),
          this.#a.notify({ query: this, type: "updated", action: t }));
      }));
  }
};
function s0(t, a) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: t0(a.networkMode) ? "fetching" : "paused",
    ...(t === void 0 && { error: null, status: "pending" }),
  };
}
function Ny(t, a) {
  return {
    data: t,
    dataUpdatedAt: a ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function Ry(t) {
  const a =
      typeof t.initialData == "function" ? t.initialData() : t.initialData,
    s = a !== void 0,
    o = s
      ? typeof t.initialDataUpdatedAt == "function"
        ? t.initialDataUpdatedAt()
        : t.initialDataUpdatedAt
      : 0;
  return {
    data: a,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? (o ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var wl = class extends Ir {
  constructor(t, a) {
    (super(),
      (this.options = a),
      (this.#t = t),
      (this.#o = null),
      (this.#l = Bf()),
      this.bindMethods(),
      this.setOptions(a));
  }
  #t;
  #e = void 0;
  #n = void 0;
  #a = void 0;
  #r;
  #s;
  #l;
  #o;
  #u;
  #i;
  #h;
  #d;
  #p;
  #c;
  #m = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#e.addObserver(this),
      Oy(this.#e, this.options) ? this.#f() : this.updateResult(),
      this.#x());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Vf(this.#e, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Vf(this.#e, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#b(),
      this.#S(),
      this.#e.removeObserver(this));
  }
  setOptions(t) {
    const a = this.options,
      s = this.#e;
    if (
      ((this.options = this.#t.defaultQueryOptions(t)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof en(this.options.enabled, this.#e) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#w(),
      this.#e.setOptions(this.options),
      a._defaulted &&
        !ul(this.options, a) &&
        this.#t
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#e,
            observer: this,
          }));
    const o = this.hasListeners();
    (o && _y(this.#e, s, this.options, a) && this.#f(),
      this.updateResult(),
      o &&
        (this.#e !== s ||
          en(this.options.enabled, this.#e) !== en(a.enabled, this.#e) ||
          rr(this.options.staleTime, this.#e) !== rr(a.staleTime, this.#e)) &&
        this.#g());
    const i = this.#v();
    o &&
      (this.#e !== s ||
        en(this.options.enabled, this.#e) !== en(a.enabled, this.#e) ||
        i !== this.#c) &&
      this.#y(i);
  }
  getOptimisticResult(t) {
    const a = this.#t.getQueryCache().build(this.#t, t),
      s = this.createResult(a, t);
    return (
      vA(this, s) &&
        ((this.#a = s), (this.#s = this.options), (this.#r = this.#e.state)),
      s
    );
  }
  getCurrentResult() {
    return this.#a;
  }
  trackResult(t, a) {
    return new Proxy(t, {
      get: (s, o) => (
        this.trackProp(o),
        a?.(o),
        o === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#l.status === "pending" &&
            this.#l.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(s, o)
      ),
    });
  }
  trackProp(t) {
    this.#m.add(t);
  }
  getCurrentQuery() {
    return this.#e;
  }
  refetch({ ...t } = {}) {
    return this.fetch({ ...t });
  }
  fetchOptimistic(t) {
    const a = this.#t.defaultQueryOptions(t),
      s = this.#t.getQueryCache().build(this.#t, a);
    return s.fetch().then(() => this.createResult(s, a));
  }
  fetch(t) {
    return this.#f({ ...t, cancelRefetch: t.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#a),
    );
  }
  #f(t) {
    this.#w();
    let a = this.#e.fetch(this.options, t);
    return (t?.throwOnError || (a = a.catch(Ot)), a);
  }
  #g() {
    this.#b();
    const t = rr(this.options.staleTime, this.#e);
    if (dl.isServer() || this.#a.isStale || !Hf(t)) return;
    const s = Jx(this.#a.dataUpdatedAt, t) + 1;
    this.#d = kr.setTimeout(() => {
      this.#a.isStale || this.updateResult();
    }, s);
  }
  #v() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#e)
        : this.options.refetchInterval) ?? !1
    );
  }
  #y(t) {
    (this.#S(),
      (this.#c = t),
      !(
        dl.isServer() ||
        en(this.options.enabled, this.#e) === !1 ||
        !Hf(this.#c) ||
        this.#c === 0
      ) &&
        (this.#p = kr.setInterval(() => {
          (this.options.refetchIntervalInBackground || jh.isFocused()) &&
            this.#f();
        }, this.#c)));
  }
  #x() {
    (this.#g(), this.#y(this.#v()));
  }
  #b() {
    this.#d !== void 0 && (kr.clearTimeout(this.#d), (this.#d = void 0));
  }
  #S() {
    this.#p !== void 0 && (kr.clearInterval(this.#p), (this.#p = void 0));
  }
  createResult(t, a) {
    const s = this.#e,
      o = this.options,
      i = this.#a,
      c = this.#r,
      u = this.#s,
      p = t !== s ? t.state : this.#n,
      { state: g } = t;
    let x = { ...g },
      v = !1,
      S;
    if (a._optimisticResults) {
      const R = this.hasListeners(),
        U = !R && Oy(t, a),
        $ = R && _y(t, s, a, o);
      ((U || $) && (x = { ...x, ...s0(g.data, t.options) }),
        a._optimisticResults === "isRestoring" && (x.fetchStatus = "idle"));
    }
    let { error: A, errorUpdatedAt: N, status: w } = x;
    S = x.data;
    let E = !1;
    if (a.placeholderData !== void 0 && S === void 0 && w === "pending") {
      let R;
      (i?.isPlaceholderData && a.placeholderData === u?.placeholderData
        ? ((R = i.data), (E = !0))
        : (R =
            typeof a.placeholderData == "function"
              ? a.placeholderData(this.#h?.state.data, this.#h)
              : a.placeholderData),
        R !== void 0 && ((w = "success"), (S = Uf(i?.data, R, a)), (v = !0)));
    }
    if (a.select && S !== void 0 && !E)
      if (i && S === c?.data && a.select === this.#u) S = this.#i;
      else
        try {
          ((this.#u = a.select),
            (S = a.select(S)),
            (S = Uf(i?.data, S, a)),
            (this.#i = S),
            (this.#o = null));
        } catch (R) {
          this.#o = R;
        }
    this.#o && ((A = this.#o), (S = this.#i), (N = Date.now()), (w = "error"));
    const O = x.fetchStatus === "fetching",
      D = w === "pending",
      P = w === "error",
      G = D && O,
      L = S !== void 0,
      j = {
        status: w,
        fetchStatus: x.fetchStatus,
        isPending: D,
        isSuccess: w === "success",
        isError: P,
        isInitialLoading: G,
        isLoading: G,
        data: S,
        dataUpdatedAt: x.dataUpdatedAt,
        error: A,
        errorUpdatedAt: N,
        failureCount: x.fetchFailureCount,
        failureReason: x.fetchFailureReason,
        errorUpdateCount: x.errorUpdateCount,
        isFetched: t.isFetched(),
        isFetchedAfterMount:
          x.dataUpdateCount > p.dataUpdateCount ||
          x.errorUpdateCount > p.errorUpdateCount,
        isFetching: O,
        isRefetching: O && !D,
        isLoadingError: P && !L,
        isPaused: x.fetchStatus === "paused",
        isPlaceholderData: v,
        isRefetchError: P && L,
        isStale: zh(t, a),
        refetch: this.refetch,
        promise: this.#l,
        isEnabled: en(a.enabled, t) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const R = j.data !== void 0,
        U = j.status === "error" && !R,
        $ = (re) => {
          U ? re.reject(j.error) : R && re.resolve(j.data);
        },
        Z = () => {
          const re = (this.#l = j.promise = Bf());
          $(re);
        },
        W = this.#l;
      switch (W.status) {
        case "pending":
          t.queryHash === s.queryHash && $(W);
          break;
        case "fulfilled":
          (U || j.data !== W.value) && Z();
          break;
        case "rejected":
          (!U || j.error !== W.reason) && Z();
          break;
      }
    }
    return j;
  }
  updateResult() {
    const t = this.#a,
      a = this.createResult(this.#e, this.options);
    if (
      ((this.#r = this.#e.state),
      (this.#s = this.options),
      this.#r.data !== void 0 && (this.#h = this.#e),
      ul(a, t))
    )
      return;
    this.#a = a;
    const s = () => {
      if (!t) return !0;
      const { notifyOnChangeProps: o } = this.options,
        i = typeof o == "function" ? o() : o;
      if (i === "all" || (!i && !this.#m.size)) return !0;
      const c = new Set(i ?? this.#m);
      return (
        this.options.throwOnError && c.add("error"),
        Object.keys(this.#a).some((u) => {
          const f = u;
          return this.#a[f] !== t[f] && c.has(f);
        })
      );
    };
    this.#E({ listeners: s() });
  }
  #w() {
    const t = this.#t.getQueryCache().build(this.#t, this.options);
    if (t === this.#e) return;
    const a = this.#e;
    ((this.#e = t),
      (this.#n = t.state),
      this.hasListeners() && (a?.removeObserver(this), t.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#x());
  }
  #E(t) {
    rt.batch(() => {
      (t.listeners &&
        this.listeners.forEach((a) => {
          a(this.#a);
        }),
        this.#t
          .getQueryCache()
          .notify({ query: this.#e, type: "observerResultsUpdated" }));
    });
  }
};
function gA(t, a) {
  return (
    en(a.enabled, t) !== !1 &&
    t.state.data === void 0 &&
    !(t.state.status === "error" && en(a.retryOnMount, t) === !1)
  );
}
function Oy(t, a) {
  return gA(t, a) || (t.state.data !== void 0 && Vf(t, a, a.refetchOnMount));
}
function Vf(t, a, s) {
  if (en(a.enabled, t) !== !1 && rr(a.staleTime, t) !== "static") {
    const o = typeof s == "function" ? s(t) : s;
    return o === "always" || (o !== !1 && zh(t, a));
  }
  return !1;
}
function _y(t, a, s, o) {
  return (
    (t !== a || en(o.enabled, t) === !1) &&
    (!s.suspense || t.state.status !== "error") &&
    zh(t, s)
  );
}
function zh(t, a) {
  return en(a.enabled, t) !== !1 && t.isStaleByTime(rr(a.staleTime, t));
}
function vA(t, a) {
  return !ul(t.getCurrentResult(), a);
}
var o0 = class extends wl {
    constructor(t, a) {
      super(t, a);
    }
    bindMethods() {
      (super.bindMethods(),
        (this.fetchNextPage = this.fetchNextPage.bind(this)),
        (this.fetchPreviousPage = this.fetchPreviousPage.bind(this)));
    }
    setOptions(t) {
      ((t._type = "infinite"), super.setOptions(t));
    }
    getOptimisticResult(t) {
      return ((t._type = "infinite"), super.getOptimisticResult(t));
    }
    fetchNextPage(t) {
      return this.fetch({
        ...t,
        meta: { fetchMore: { direction: "forward" } },
      });
    }
    fetchPreviousPage(t) {
      return this.fetch({
        ...t,
        meta: { fetchMore: { direction: "backward" } },
      });
    }
    createResult(t, a) {
      const { state: s } = t,
        o = super.createResult(t, a),
        { isFetching: i, isRefetching: c, isError: u, isRefetchError: f } = o,
        p = s.fetchMeta?.fetchMore?.direction,
        g = u && p === "forward",
        x = i && p === "forward",
        v = u && p === "backward",
        S = i && p === "backward";
      return {
        ...o,
        fetchNextPage: this.fetchNextPage,
        fetchPreviousPage: this.fetchPreviousPage,
        hasNextPage: hA(a, s.data),
        hasPreviousPage: pA(a, s.data),
        isFetchNextPageError: g,
        isFetchingNextPage: x,
        isFetchPreviousPageError: v,
        isFetchingPreviousPage: S,
        isRefetchError: f && !g && !v,
        isRefetching: c && !x && !S,
      };
    }
  },
  yA = class extends a0 {
    #t;
    #e;
    #n;
    #a;
    constructor(t) {
      (super(),
        (this.#t = t.client),
        (this.mutationId = t.mutationId),
        (this.#n = t.mutationCache),
        (this.#e = []),
        (this.state = t.state || l0()),
        this.setOptions(t.options),
        this.scheduleGc());
    }
    setOptions(t) {
      ((this.options = t), this.updateGcTime(this.options.gcTime));
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(t) {
      this.#e.includes(t) ||
        (this.#e.push(t),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", mutation: this, observer: t }));
    }
    removeObserver(t) {
      ((this.#e = this.#e.filter((a) => a !== t)),
        this.scheduleGc(),
        this.#n.notify({
          type: "observerRemoved",
          mutation: this,
          observer: t,
        }));
    }
    optionalRemove() {
      this.#e.length ||
        (this.state.status === "pending"
          ? this.scheduleGc()
          : this.#n.remove(this));
    }
    continue() {
      return this.#a?.continue() ?? this.execute(this.state.variables);
    }
    async execute(t) {
      const a = () => {
          this.#r({ type: "continue" });
        },
        s = {
          client: this.#t,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey,
        };
      this.#a = n0({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(t, s)
            : Promise.reject(new Error("No mutationFn found")),
        onFail: (c, u) => {
          this.#r({ type: "failed", failureCount: c, error: u });
        },
        onPause: () => {
          this.#r({ type: "pause" });
        },
        onContinue: a,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#n.canRun(this),
      });
      const o = this.state.status === "pending",
        i = !this.#a.canStart();
      try {
        if (o) a();
        else {
          (this.#r({ type: "pending", variables: t, isPaused: i }),
            this.#n.config.onMutate &&
              (await this.#n.config.onMutate(t, this, s)));
          const u = await this.options.onMutate?.(t, s);
          u !== this.state.context &&
            this.#r({ type: "pending", context: u, variables: t, isPaused: i });
        }
        const c = await this.#a.start();
        return (
          await this.#n.config.onSuccess?.(c, t, this.state.context, this, s),
          await this.options.onSuccess?.(c, t, this.state.context, s),
          await this.#n.config.onSettled?.(
            c,
            null,
            this.state.variables,
            this.state.context,
            this,
            s,
          ),
          await this.options.onSettled?.(c, null, t, this.state.context, s),
          this.#r({ type: "success", data: c }),
          c
        );
      } catch (c) {
        try {
          await this.#n.config.onError?.(c, t, this.state.context, this, s);
        } catch (u) {
          Promise.reject(u);
        }
        try {
          await this.options.onError?.(c, t, this.state.context, s);
        } catch (u) {
          Promise.reject(u);
        }
        try {
          await this.#n.config.onSettled?.(
            void 0,
            c,
            this.state.variables,
            this.state.context,
            this,
            s,
          );
        } catch (u) {
          Promise.reject(u);
        }
        try {
          await this.options.onSettled?.(void 0, c, t, this.state.context, s);
        } catch (u) {
          Promise.reject(u);
        }
        throw (this.#r({ type: "error", error: c }), c);
      } finally {
        this.#n.runNext(this);
      }
    }
    #r(t) {
      const a = (s) => {
        switch (t.type) {
          case "failed":
            return {
              ...s,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...s, isPaused: !0 };
          case "continue":
            return { ...s, isPaused: !1 };
          case "pending":
            return {
              ...s,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...s,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...s,
              data: void 0,
              error: t.error,
              failureCount: s.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = a(this.state)),
        rt.batch(() => {
          (this.#e.forEach((s) => {
            s.onMutationUpdate(t);
          }),
            this.#n.notify({ mutation: this, type: "updated", action: t }));
        }));
    }
  };
function l0() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var xA = class extends Ir {
  constructor(t = {}) {
    (super(),
      (this.config = t),
      (this.#t = new Set()),
      (this.#e = new Map()),
      (this.#n = 0));
  }
  #t;
  #e;
  #n;
  build(t, a, s) {
    const o = new yA({
      client: t,
      mutationCache: this,
      mutationId: ++this.#n,
      options: t.defaultMutationOptions(a),
      state: s,
    });
    return (this.add(o), o);
  }
  add(t) {
    this.#t.add(t);
    const a = Vi(t);
    if (typeof a == "string") {
      const s = this.#e.get(a);
      s ? s.push(t) : this.#e.set(a, [t]);
    }
    this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    if (this.#t.delete(t)) {
      const a = Vi(t);
      if (typeof a == "string") {
        const s = this.#e.get(a);
        if (s)
          if (s.length > 1) {
            const o = s.indexOf(t);
            o !== -1 && s.splice(o, 1);
          } else s[0] === t && this.#e.delete(a);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const a = Vi(t);
    if (typeof a == "string") {
      const o = this.#e.get(a)?.find((i) => i.state.status === "pending");
      return !o || o === t;
    } else return !0;
  }
  runNext(t) {
    const a = Vi(t);
    return typeof a == "string"
      ? (this.#e
          .get(a)
          ?.find((o) => o !== t && o.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    rt.batch(() => {
      (this.#t.forEach((t) => {
        this.notify({ type: "removed", mutation: t });
      }),
        this.#t.clear(),
        this.#e.clear());
    });
  }
  getAll() {
    return Array.from(this.#t);
  }
  find(t) {
    const a = { exact: !0, ...t };
    return this.getAll().find((s) => Ey(a, s));
  }
  findAll(t = {}) {
    return this.getAll().filter((a) => Ey(t, a));
  }
  notify(t) {
    rt.batch(() => {
      this.listeners.forEach((a) => {
        a(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((a) => a.state.isPaused);
    return rt.batch(() => Promise.all(t.map((a) => a.continue().catch(Ot))));
  }
};
function Vi(t) {
  return t.options.scope?.id;
}
var bA = class extends Ir {
  #t;
  #e = void 0;
  #n;
  #a;
  constructor(a, s) {
    (super(), (this.#t = a), this.setOptions(s), this.bindMethods(), this.#r());
  }
  bindMethods() {
    ((this.mutate = this.mutate.bind(this)),
      (this.reset = this.reset.bind(this)));
  }
  setOptions(a) {
    const s = this.options;
    ((this.options = this.#t.defaultMutationOptions(a)),
      ul(this.options, s) ||
        this.#t
          .getMutationCache()
          .notify({
            type: "observerOptionsUpdated",
            mutation: this.#n,
            observer: this,
          }),
      s?.mutationKey &&
      this.options.mutationKey &&
      or(s.mutationKey) !== or(this.options.mutationKey)
        ? this.reset()
        : this.#n?.state.status === "pending" &&
          this.#n.setOptions(this.options));
  }
  onUnsubscribe() {
    this.hasListeners() || this.#n?.removeObserver(this);
  }
  onMutationUpdate(a) {
    (this.#r(), this.#s(a));
  }
  getCurrentResult() {
    return this.#e;
  }
  reset() {
    (this.#n?.removeObserver(this), (this.#n = void 0), this.#r(), this.#s());
  }
  mutate(a, s) {
    return (
      (this.#a = s),
      this.#n?.removeObserver(this),
      (this.#n = this.#t.getMutationCache().build(this.#t, this.options)),
      this.#n.addObserver(this),
      this.#n.execute(a)
    );
  }
  #r() {
    const a = this.#n?.state ?? l0();
    this.#e = {
      ...a,
      isPending: a.status === "pending",
      isSuccess: a.status === "success",
      isError: a.status === "error",
      isIdle: a.status === "idle",
      mutate: this.mutate,
      reset: this.reset,
    };
  }
  #s(a) {
    rt.batch(() => {
      if (this.#a && this.hasListeners()) {
        const s = this.#e.variables,
          o = this.#e.context,
          i = {
            client: this.#t,
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        if (a?.type === "success") {
          try {
            this.#a.onSuccess?.(a.data, s, o, i);
          } catch (c) {
            Promise.reject(c);
          }
          try {
            this.#a.onSettled?.(a.data, null, s, o, i);
          } catch (c) {
            Promise.reject(c);
          }
        } else if (a?.type === "error") {
          try {
            this.#a.onError?.(a.error, s, o, i);
          } catch (c) {
            Promise.reject(c);
          }
          try {
            this.#a.onSettled?.(void 0, a.error, s, o, i);
          } catch (c) {
            Promise.reject(c);
          }
        }
      }
      this.listeners.forEach((s) => {
        s(this.#e);
      });
    });
  }
};
function jy(t, a) {
  const s = new Set(a);
  return t.filter((o) => !s.has(o));
}
function SA(t, a, s) {
  const o = t.slice(0);
  return ((o[a] = s), o);
}
var wA = class extends Ir {
    #t;
    #e;
    #n;
    #a;
    #r;
    #s;
    #l;
    #o;
    #u;
    #i = [];
    constructor(t, a, s) {
      (super(),
        (this.#t = t),
        (this.#a = s),
        (this.#n = []),
        (this.#r = []),
        (this.#e = []),
        this.setQueries(a));
    }
    onSubscribe() {
      this.listeners.size === 1 &&
        this.#r.forEach((t) => {
          t.subscribe((a) => {
            this.#m(t, a);
          });
        });
    }
    onUnsubscribe() {
      this.listeners.size || this.destroy();
    }
    destroy() {
      ((this.listeners = new Set()),
        this.#r.forEach((t) => {
          t.destroy();
        }));
    }
    setQueries(t, a) {
      ((this.#n = t),
        (this.#a = a),
        rt.batch(() => {
          const s = this.#r,
            o = this.#c(this.#n);
          o.forEach((x) => x.observer.setOptions(x.defaultedQueryOptions));
          const i = o.map((x) => x.observer),
            c = i.map((x) => x.getCurrentResult()),
            u = s.length !== i.length,
            f = i.some((x, v) => x !== s[v]),
            p = u || f,
            g = p
              ? !0
              : c.some((x, v) => {
                  const S = this.#e[v];
                  return !S || !ul(x, S);
                });
          (!p && !g) ||
            (p && ((this.#i = o), (this.#r = i)),
            (this.#e = c),
            this.hasListeners() &&
              (p &&
                (jy(s, i).forEach((x) => {
                  x.destroy();
                }),
                jy(i, s).forEach((x) => {
                  x.subscribe((v) => {
                    this.#m(x, v);
                  });
                })),
              this.#f()));
        }));
    }
    getCurrentResult() {
      return this.#e;
    }
    getQueries() {
      return this.#r.map((t) => t.getCurrentQuery());
    }
    getObservers() {
      return this.#r;
    }
    getOptimisticResult(t, a) {
      const s = this.#c(t),
        o = s.map((c) =>
          c.observer.getOptimisticResult(c.defaultedQueryOptions),
        ),
        i = s.map((c) => c.defaultedQueryOptions.queryHash);
      return [o, (c) => this.#d(c ?? o, a, i), () => this.#h(o, s)];
    }
    #h(t, a) {
      return a.map((s, o) => {
        const i = t[o];
        return s.defaultedQueryOptions.notifyOnChangeProps
          ? i
          : s.observer.trackResult(i, (c) => {
              a.forEach((u) => {
                u.observer.trackProp(c);
              });
            });
      });
    }
    #d(t, a, s) {
      if (a) {
        const o = this.#u,
          i =
            s !== void 0 &&
            o !== void 0 &&
            (o.length !== s.length || s.some((c, u) => c !== o[u]));
        return (
          (!this.#s || this.#e !== this.#o || i || a !== this.#l) &&
            ((this.#l = a),
            (this.#o = this.#e),
            s !== void 0 && (this.#u = s),
            (this.#s = Mh(this.#s, a(t)))),
          this.#s
        );
      }
      return t;
    }
    #p() {
      return (
        this.#a?.combine !== void 0 &&
        this.#r.some(
          (t, a) => t.options.suspense && this.#e[a]?.data === void 0,
        )
      );
    }
    #c(t) {
      const a = new Map();
      this.#r.forEach((o) => {
        const i = o.options.queryHash;
        if (!i) return;
        const c = a.get(i);
        c ? c.push(o) : a.set(i, [o]);
      });
      const s = [];
      return (
        t.forEach((o) => {
          const i = this.#t.defaultQueryOptions(o),
            u = a.get(i.queryHash)?.shift() ?? new wl(this.#t, i);
          s.push({ defaultedQueryOptions: i, observer: u });
        }),
        s
      );
    }
    #m(t, a) {
      const s = this.#r.indexOf(t);
      s !== -1 && ((this.#e = SA(this.#e, s, a)), this.#f());
    }
    #f() {
      if (this.hasListeners()) {
        const t = this.#h(this.#e, this.#i),
          a = this.#p(),
          s = this.#s,
          o = a ? s : this.#d(t, this.#a?.combine);
        (a || s !== o) &&
          rt.batch(() => {
            this.listeners.forEach((i) => {
              i(this.#e);
            });
          });
      }
    }
  },
  EA = class extends Ir {
    constructor(t = {}) {
      (super(), (this.config = t), (this.#t = new Map()));
    }
    #t;
    build(t, a, s) {
      const o = a.queryKey,
        i = a.queryHash ?? Th(o, a);
      let c = this.get(i);
      return (
        c ||
          ((c = new mA({
            client: t,
            queryKey: o,
            queryHash: i,
            options: t.defaultQueryOptions(a),
            state: s,
            defaultOptions: t.getQueryDefaults(o),
          })),
          this.add(c)),
        c
      );
    }
    add(t) {
      this.#t.has(t.queryHash) ||
        (this.#t.set(t.queryHash, t), this.notify({ type: "added", query: t }));
    }
    remove(t) {
      const a = this.#t.get(t.queryHash);
      a &&
        (t.destroy(),
        a === t && this.#t.delete(t.queryHash),
        this.notify({ type: "removed", query: t }));
    }
    clear() {
      rt.batch(() => {
        this.getAll().forEach((t) => {
          this.remove(t);
        });
      });
    }
    get(t) {
      return this.#t.get(t);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(t) {
      const a = { exact: !0, ...t };
      return this.getAll().find((s) => wy(a, s));
    }
    findAll(t = {}) {
      const a = this.getAll();
      return Object.keys(t).length > 0 ? a.filter((s) => wy(t, s)) : a;
    }
    notify(t) {
      rt.batch(() => {
        this.listeners.forEach((a) => {
          a(t);
        });
      });
    }
    onFocus() {
      rt.batch(() => {
        this.getAll().forEach((t) => {
          t.onFocus();
        });
      });
    }
    onOnline() {
      rt.batch(() => {
        this.getAll().forEach((t) => {
          t.onOnline();
        });
      });
    }
  },
  CA = class {
    #t;
    #e;
    #n;
    #a;
    #r;
    #s;
    #l;
    #o;
    constructor(t = {}) {
      ((this.#t = t.queryCache || new EA()),
        (this.#e = t.mutationCache || new xA()),
        (this.#n = t.defaultOptions || {}),
        (this.#a = new Map()),
        (this.#r = new Map()),
        (this.#s = 0));
    }
    mount() {
      (this.#s++,
        this.#s === 1 &&
          ((this.#l = jh.subscribe(async (t) => {
            t && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#o = fc.subscribe(async (t) => {
            t && (await this.resumePausedMutations(), this.#t.onOnline());
          }))));
    }
    unmount() {
      (this.#s--,
        this.#s === 0 &&
          (this.#l?.(), (this.#l = void 0), this.#o?.(), (this.#o = void 0)));
    }
    isFetching(t) {
      return this.#t.findAll({ ...t, fetchStatus: "fetching" }).length;
    }
    isMutating(t) {
      return this.#e.findAll({ ...t, status: "pending" }).length;
    }
    getQueryData(t) {
      const a = this.defaultQueryOptions({ queryKey: t });
      return this.#t.get(a.queryHash)?.state.data;
    }
    ensureQueryData(t) {
      const a = this.defaultQueryOptions(t),
        s = this.#t.build(this, a),
        o = s.state.data;
      return o === void 0
        ? this.fetchQuery(t)
        : (t.revalidateIfStale &&
            s.isStaleByTime(rr(a.staleTime, s)) &&
            this.prefetchQuery(a),
          Promise.resolve(o));
    }
    getQueriesData(t) {
      return this.#t.findAll(t).map(({ queryKey: a, state: s }) => {
        const o = s.data;
        return [a, o];
      });
    }
    setQueryData(t, a, s) {
      const o = this.defaultQueryOptions({ queryKey: t }),
        c = this.#t.get(o.queryHash)?.state.data,
        u = nA(a, c);
      if (u !== void 0)
        return this.#t.build(this, o).setData(u, { ...s, manual: !0 });
    }
    setQueriesData(t, a, s) {
      return rt.batch(() =>
        this.#t
          .findAll(t)
          .map(({ queryKey: o }) => [o, this.setQueryData(o, a, s)]),
      );
    }
    getQueryState(t) {
      const a = this.defaultQueryOptions({ queryKey: t });
      return this.#t.get(a.queryHash)?.state;
    }
    removeQueries(t) {
      const a = this.#t;
      rt.batch(() => {
        a.findAll(t).forEach((s) => {
          a.remove(s);
        });
      });
    }
    resetQueries(t, a) {
      const s = this.#t;
      return rt.batch(
        () => (
          s.findAll(t).forEach((o) => {
            o.reset();
          }),
          this.refetchQueries({ type: "active", ...t }, a)
        ),
      );
    }
    cancelQueries(t, a = {}) {
      const s = { revert: !0, ...a },
        o = rt.batch(() => this.#t.findAll(t).map((i) => i.cancel(s)));
      return Promise.all(o).then(Ot).catch(Ot);
    }
    invalidateQueries(t, a = {}) {
      return rt.batch(
        () => (
          this.#t.findAll(t).forEach((s) => {
            s.invalidate();
          }),
          t?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...t, type: t?.refetchType ?? t?.type ?? "active" },
                a,
              )
        ),
      );
    }
    refetchQueries(t, a = {}) {
      const s = { ...a, cancelRefetch: a.cancelRefetch ?? !0 },
        o = rt.batch(() =>
          this.#t
            .findAll(t)
            .filter((i) => !i.isDisabled() && !i.isStatic())
            .map((i) => {
              let c = i.fetch(void 0, s);
              return (
                s.throwOnError || (c = c.catch(Ot)),
                i.state.fetchStatus === "paused" ? Promise.resolve() : c
              );
            }),
        );
      return Promise.all(o).then(Ot);
    }
    fetchQuery(t) {
      const a = this.defaultQueryOptions(t);
      a.retry === void 0 && (a.retry = !1);
      const s = this.#t.build(this, a);
      return s.isStaleByTime(rr(a.staleTime, s))
        ? s.fetch(a)
        : Promise.resolve(s.state.data);
    }
    prefetchQuery(t) {
      return this.fetchQuery(t).then(Ot).catch(Ot);
    }
    fetchInfiniteQuery(t) {
      return ((t._type = "infinite"), this.fetchQuery(t));
    }
    prefetchInfiniteQuery(t) {
      return this.fetchInfiniteQuery(t).then(Ot).catch(Ot);
    }
    ensureInfiniteQueryData(t) {
      return ((t._type = "infinite"), this.ensureQueryData(t));
    }
    resumePausedMutations() {
      return fc.isOnline()
        ? this.#e.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(t) {
      this.#n = t;
    }
    setQueryDefaults(t, a) {
      this.#a.set(or(t), { queryKey: t, defaultOptions: a });
    }
    getQueryDefaults(t) {
      const a = [...this.#a.values()],
        s = {};
      return (
        a.forEach((o) => {
          cl(t, o.queryKey) && Object.assign(s, o.defaultOptions);
        }),
        s
      );
    }
    setMutationDefaults(t, a) {
      this.#r.set(or(t), { mutationKey: t, defaultOptions: a });
    }
    getMutationDefaults(t) {
      const a = [...this.#r.values()],
        s = {};
      return (
        a.forEach((o) => {
          cl(t, o.mutationKey) && Object.assign(s, o.defaultOptions);
        }),
        s
      );
    }
    defaultQueryOptions(t) {
      if (t._defaulted) return t;
      const a = {
        ...this.#n.queries,
        ...this.getQueryDefaults(t.queryKey),
        ...t,
        _defaulted: !0,
      };
      return (
        a.queryHash || (a.queryHash = Th(a.queryKey, a)),
        a.refetchOnReconnect === void 0 &&
          (a.refetchOnReconnect = a.networkMode !== "always"),
        a.throwOnError === void 0 && (a.throwOnError = !!a.suspense),
        !a.networkMode && a.persister && (a.networkMode = "offlineFirst"),
        a.queryFn === an && (a.enabled = !1),
        a
      );
    }
    defaultMutationOptions(t) {
      return t?._defaulted
        ? t
        : {
            ...this.#n.mutations,
            ...(t?.mutationKey && this.getMutationDefaults(t.mutationKey)),
            ...t,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#t.clear(), this.#e.clear());
    }
  },
  i0 = y.createContext(void 0),
  El = (t) => {
    const a = y.useContext(i0);
    if (t) return t;
    if (!a)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return a;
  },
  AA = ({ client: t, children: a }) => (
    y.useEffect(
      () => (
        t.mount(),
        () => {
          t.unmount();
        }
      ),
      [t],
    ),
    m.jsx(i0.Provider, { value: t, children: a })
  ),
  c0 = y.createContext(!1),
  u0 = () => y.useContext(c0);
c0.Provider;
function NA() {
  let t = !1;
  return {
    clearReset: () => {
      t = !1;
    },
    reset: () => {
      t = !0;
    },
    isReset: () => t,
  };
}
var RA = y.createContext(NA()),
  d0 = () => y.useContext(RA),
  f0 = (t, a, s) => {
    const o =
      s?.state.error && typeof t.throwOnError == "function"
        ? Dh(t.throwOnError, [s.state.error, s])
        : t.throwOnError;
    (t.suspense || t.experimental_prefetchInRender || o) &&
      (a.isReset() || (t.retryOnMount = !1));
  },
  h0 = (t) => {
    y.useEffect(() => {
      t.clearReset();
    }, [t]);
  },
  p0 = ({
    result: t,
    errorResetBoundary: a,
    throwOnError: s,
    query: o,
    suspense: i,
  }) =>
    t.isError &&
    !a.isReset() &&
    !t.isFetching &&
    o &&
    ((i && t.data === void 0) || Dh(s, [t.error, o])),
  Ph = (t, a) => a.state.data === void 0,
  m0 = (t) => {
    if (t.suspense) {
      const s = (i) => (i === "static" ? i : Math.max(i ?? 1e3, 1e3)),
        o = t.staleTime;
      ((t.staleTime = typeof o == "function" ? (...i) => s(o(...i)) : s(o)),
        typeof t.gcTime == "number" && (t.gcTime = Math.max(t.gcTime, 1e3)));
    }
  },
  OA = (t, a) => t.isLoading && t.isFetching && !a,
  If = (t, a) => t?.suspense && a.isPending,
  Yf = (t, a, s) =>
    a.fetchOptimistic(t).catch(() => {
      s.clearReset();
    });
function g0({ queries: t, ...a }, s) {
  const o = El(s),
    i = u0(),
    c = d0(),
    u = y.useMemo(
      () =>
        t.map((w) => {
          const E = o.defaultQueryOptions(w);
          return ((E._optimisticResults = i ? "isRestoring" : "optimistic"), E);
        }),
      [t, o, i],
    );
  (u.forEach((w) => {
    m0(w);
    const E = o.getQueryCache().get(w.queryHash);
    f0(w, c, E);
  }),
    h0(c));
  const [f] = y.useState(() => new wA(o, u, a)),
    [p, g, x] = f.getOptimisticResult(u, a.combine),
    v = !i && a.subscribed !== !1;
  (y.useSyncExternalStore(
    y.useCallback((w) => (v ? f.subscribe(rt.batchCalls(w)) : Ot), [f, v]),
    () => f.getCurrentResult(),
    () => f.getCurrentResult(),
  ),
    y.useEffect(() => {
      f.setQueries(u, a);
    }, [u, a, f]));
  const A = p.some((w, E) => If(u[E], w))
    ? p.flatMap((w, E) => {
        const O = u[E];
        if (O && If(O, w)) {
          const D = new wl(o, O);
          return Yf(O, D, c);
        }
        return [];
      })
    : [];
  if (A.length > 0) throw Promise.all(A);
  const N = p.find((w, E) => {
    const O = u[E];
    return (
      O &&
      p0({
        result: w,
        errorResetBoundary: c,
        throwOnError: O.throwOnError,
        query: o.getQueryCache().get(O.queryHash),
        suspense: O.suspense,
      })
    );
  });
  if (N?.error) throw N.error;
  return g(x());
}
function _c(t, a, s) {
  const o = u0(),
    i = d0(),
    c = El(s),
    u = c.defaultQueryOptions(t);
  c.getDefaultOptions().queries?._experimental_beforeQuery?.(u);
  const f = c.getQueryCache().get(u.queryHash),
    p = t.subscribed !== !1;
  ((u._optimisticResults = o ? "isRestoring" : p ? "optimistic" : void 0),
    m0(u),
    f0(u, i, f),
    h0(i));
  const g = !c.getQueryCache().get(u.queryHash),
    [x] = y.useState(() => new a(c, u)),
    v = x.getOptimisticResult(u),
    S = !o && p;
  if (
    (y.useSyncExternalStore(
      y.useCallback(
        (A) => {
          const N = S ? x.subscribe(rt.batchCalls(A)) : Ot;
          return (x.updateResult(), N);
        },
        [x, S],
      ),
      () => x.getCurrentResult(),
      () => x.getCurrentResult(),
    ),
    y.useEffect(() => {
      x.setOptions(u);
    }, [u, x]),
    If(u, v))
  )
    throw Yf(u, x, i);
  if (
    p0({
      result: v,
      errorResetBoundary: i,
      throwOnError: u.throwOnError,
      query: f,
      suspense: u.suspense,
    })
  )
    throw v.error;
  return (
    c.getDefaultOptions().queries?._experimental_afterQuery?.(u, v),
    u.experimental_prefetchInRender &&
      !dl.isServer() &&
      OA(v, o) &&
      (g ? Yf(u, x, i) : f?.promise)?.catch(Ot).finally(() => {
        x.updateResult();
      }),
    u.notifyOnChangeProps ? v : x.trackResult(v)
  );
}
function _A(t, a) {
  return _c(t, wl, a);
}
function jA(t, a) {
  return _c(
    {
      ...t,
      enabled: !0,
      suspense: !0,
      throwOnError: Ph,
      placeholderData: void 0,
    },
    wl,
    a,
  );
}
function TA(t, a) {
  return _c({ ...t, enabled: !0, suspense: !0, throwOnError: Ph }, o0, a);
}
function MA(t, a) {
  return g0(
    {
      ...t,
      queries: t.queries.map((s) => ({
        ...s,
        suspense: !0,
        throwOnError: Ph,
        enabled: !0,
        placeholderData: void 0,
      })),
    },
    a,
  );
}
function DA(t, a) {
  const s = El(a);
  s.getQueryState(t.queryKey) || s.prefetchQuery(t);
}
function zA(t, a) {
  const s = El(a);
  s.getQueryState(t.queryKey) || s.prefetchInfiniteQuery(t);
}
function PA(t, a) {
  const s = El(a),
    [o] = y.useState(() => new bA(s, t));
  y.useEffect(() => {
    o.setOptions(t);
  }, [o, t]);
  const i = y.useSyncExternalStore(
      y.useCallback((u) => o.subscribe(rt.batchCalls(u)), [o]),
      () => o.getCurrentResult(),
      () => o.getCurrentResult(),
    ),
    c = y.useCallback(
      (u, f) => {
        o.mutate(u, f).catch(Ot);
      },
      [o],
    );
  if (i.error && Dh(o.options.throwOnError, [i.error])) throw i.error;
  return { ...i, mutate: c, mutateAsync: i.mutate };
}
function kA(t, a) {
  return _c(t, o0, a);
}
function Hr(t) {
  return !!t && !Array.isArray(t) && typeof t == "object";
}
function HA() {
  return Object.create(null);
}
const LA = typeof Symbol == "function" && !!Symbol.asyncIterator;
function v0(t) {
  return LA && Hr(t) && Symbol.asyncIterator in t;
}
var UA = Object.create,
  y0 = Object.defineProperty,
  BA = Object.getOwnPropertyDescriptor,
  x0 = Object.getOwnPropertyNames,
  qA = Object.getPrototypeOf,
  QA = Object.prototype.hasOwnProperty,
  Cl = (t, a) =>
    function () {
      return (
        a || (0, t[x0(t)[0]])((a = { exports: {} }).exports, a),
        a.exports
      );
    },
  VA = (t, a, s, o) => {
    if ((a && typeof a == "object") || typeof a == "function")
      for (var i = x0(a), c = 0, u = i.length, f; c < u; c++)
        ((f = i[c]),
          !QA.call(t, f) &&
            f !== s &&
            y0(t, f, {
              get: ((p) => a[p]).bind(null, f),
              enumerable: !(o = BA(a, f)) || o.enumerable,
            }));
    return t;
  },
  jc = (t, a, s) => (
    (s = t != null ? UA(qA(t)) : {}),
    VA(y0(s, "default", { value: t, enumerable: !0 }), t)
  );
const b0 = () => {},
  Ty = (t) => {
    Object.freeze && Object.freeze(t);
  };
function S0(t, a, s) {
  var o;
  const i = a.join(".");
  return (
    ((o = s[i]) !== null && o !== void 0) ||
      (s[i] = new Proxy(b0, {
        get(c, u) {
          if (!(typeof u != "string" || u === "then"))
            return S0(t, [...a, u], s);
        },
        apply(c, u, f) {
          const p = a[a.length - 1];
          if (p === "valueOf" || p === "toString" || p === "toJSON")
            return `tRPC.proxy(${a.slice(0, -1).join(".")})`;
          let g = { args: f, path: a };
          return (
            p === "call"
              ? (g = {
                  args: f.length >= 2 ? [f[1]] : [],
                  path: a.slice(0, -1),
                })
              : p === "apply" &&
                (g = { args: f.length >= 2 ? f[1] : [], path: a.slice(0, -1) }),
            Ty(g.args),
            Ty(g.path),
            t(g)
          );
        },
      })),
    s[i]
  );
}
const Tc = (t) => S0(t, [], HA()),
  kh = (t) =>
    new Proxy(b0, {
      get(a, s) {
        if (s !== "then") return t(s);
      },
    });
var w0 = Cl({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      t,
      a,
    ) {
      function s(o) {
        "@babel/helpers - typeof";
        return (
          (a.exports = s =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (i) {
                  return typeof i;
                }
              : function (i) {
                  return i &&
                    typeof Symbol == "function" &&
                    i.constructor === Symbol &&
                    i !== Symbol.prototype
                    ? "symbol"
                    : typeof i;
                }),
          (a.exports.__esModule = !0),
          (a.exports.default = a.exports),
          s(o)
        );
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  IA = Cl({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      t,
      a,
    ) {
      var s = w0().default;
      function o(i, c) {
        if (s(i) != "object" || !i) return i;
        var u = i[Symbol.toPrimitive];
        if (u !== void 0) {
          var f = u.call(i, c || "default");
          if (s(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (c === "string" ? String : Number)(i);
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  YA = Cl({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      t,
      a,
    ) {
      var s = w0().default,
        o = IA();
      function i(c) {
        var u = o(c, "string");
        return s(u) == "symbol" ? u : u + "";
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  E0 = Cl({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      t,
      a,
    ) {
      var s = YA();
      function o(i, c, u) {
        return (
          (c = s(c)) in i
            ? Object.defineProperty(i, c, {
                value: u,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (i[c] = u),
          i
        );
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  Hh = Cl({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      t,
      a,
    ) {
      var s = E0();
      function o(c, u) {
        var f = Object.keys(c);
        if (Object.getOwnPropertySymbols) {
          var p = Object.getOwnPropertySymbols(c);
          (u &&
            (p = p.filter(function (g) {
              return Object.getOwnPropertyDescriptor(c, g).enumerable;
            })),
            f.push.apply(f, p));
        }
        return f;
      }
      function i(c) {
        for (var u = 1; u < arguments.length; u++) {
          var f = arguments[u] != null ? arguments[u] : {};
          u % 2
            ? o(Object(f), !0).forEach(function (p) {
                s(c, p, f[p]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(f))
              : o(Object(f)).forEach(function (p) {
                  Object.defineProperty(
                    c,
                    p,
                    Object.getOwnPropertyDescriptor(f, p),
                  );
                });
        }
        return c;
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  });
jc(Hh());
jc(E0());
var Ii = jc(Hh());
function $A(t, a) {
  if ("error" in t) {
    const o = a.deserialize(t.error);
    return {
      ok: !1,
      error: (0, Ii.default)((0, Ii.default)({}, t), {}, { error: o }),
    };
  }
  return {
    ok: !0,
    result: (0, Ii.default)(
      (0, Ii.default)({}, t.result),
      (!t.result.type || t.result.type === "data") && {
        type: "data",
        data: a.deserialize(t.result.data),
      },
    ),
  };
}
var xf = class extends Error {
  constructor() {
    super("Unable to transform response from server");
  }
};
function GA(t, a) {
  let s;
  try {
    s = $A(t, a);
  } catch {
    throw new xf();
  }
  if (!s.ok && (!Hr(s.error.error) || typeof s.error.error.code != "number"))
    throw new xf();
  if (s.ok && !Hr(s.result)) throw new xf();
  return s;
}
jc(Hh());
function Mc(t) {
  const a = {
    subscribe(s) {
      let o = null,
        i = !1,
        c = !1,
        u = !1;
      function f() {
        if (o === null) {
          u = !0;
          return;
        }
        c || ((c = !0), typeof o == "function" ? o() : o && o.unsubscribe());
      }
      return (
        (o = t({
          next(p) {
            var g;
            i || (g = s.next) === null || g === void 0 || g.call(s, p);
          },
          error(p) {
            var g;
            i ||
              ((i = !0),
              (g = s.error) === null || g === void 0 || g.call(s, p),
              f());
          },
          complete() {
            var p;
            i ||
              ((i = !0),
              (p = s.complete) === null || p === void 0 || p.call(s),
              f());
          },
        })),
        u && f(),
        { unsubscribe: f }
      );
    },
    pipe(...s) {
      return s.reduce(FA, a);
    },
  };
  return a;
}
function FA(t, a) {
  return a(t);
}
function XA(t) {
  const a = new AbortController();
  return new Promise((o, i) => {
    let c = !1;
    function u() {
      c || ((c = !0), f.unsubscribe());
    }
    a.signal.addEventListener("abort", () => {
      i(a.signal.reason);
    });
    const f = t.subscribe({
      next(p) {
        ((c = !0), o(p), u());
      },
      error(p) {
        i(p);
      },
      complete() {
        (a.abort(), u());
      },
    });
  });
}
var KA = Object.create,
  C0 = Object.defineProperty,
  ZA = Object.getOwnPropertyDescriptor,
  A0 = Object.getOwnPropertyNames,
  WA = Object.getPrototypeOf,
  JA = Object.prototype.hasOwnProperty,
  ur = (t, a) =>
    function () {
      return (
        a || (0, t[A0(t)[0]])((a = { exports: {} }).exports, a),
        a.exports
      );
    },
  eN = (t, a, s, o) => {
    if ((a && typeof a == "object") || typeof a == "function")
      for (var i = A0(a), c = 0, u = i.length, f; c < u; c++)
        ((f = i[c]),
          !JA.call(t, f) &&
            f !== s &&
            C0(t, f, {
              get: ((p) => a[p]).bind(null, f),
              enumerable: !(o = ZA(a, f)) || o.enumerable,
            }));
    return t;
  },
  Yr = (t, a, s) => (
    (s = t != null ? KA(WA(t)) : {}),
    eN(
      a || !t || !t.__esModule
        ? C0(s, "default", { value: t, enumerable: !0 })
        : s,
      t,
    )
  ),
  tN = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(
      t,
      a,
    ) {
      function s(o, i) {
        if (o == null) return {};
        var c = {};
        for (var u in o)
          if ({}.hasOwnProperty.call(o, u)) {
            if (i.includes(u)) continue;
            c[u] = o[u];
          }
        return c;
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  nN = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(
      t,
      a,
    ) {
      var s = tN();
      function o(i, c) {
        if (i == null) return {};
        var u,
          f,
          p = s(i, c);
        if (Object.getOwnPropertySymbols) {
          var g = Object.getOwnPropertySymbols(i);
          for (f = 0; f < g.length; f++)
            ((u = g[f]),
              c.includes(u) ||
                ({}.propertyIsEnumerable.call(i, u) && (p[u] = i[u])));
        }
        return p;
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  N0 = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      t,
      a,
    ) {
      function s(o) {
        "@babel/helpers - typeof";
        return (
          (a.exports = s =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (i) {
                  return typeof i;
                }
              : function (i) {
                  return i &&
                    typeof Symbol == "function" &&
                    i.constructor === Symbol &&
                    i !== Symbol.prototype
                    ? "symbol"
                    : typeof i;
                }),
          (a.exports.__esModule = !0),
          (a.exports.default = a.exports),
          s(o)
        );
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  aN = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      t,
      a,
    ) {
      var s = N0().default;
      function o(i, c) {
        if (s(i) != "object" || !i) return i;
        var u = i[Symbol.toPrimitive];
        if (u !== void 0) {
          var f = u.call(i, c || "default");
          if (s(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (c === "string" ? String : Number)(i);
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  rN = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      t,
      a,
    ) {
      var s = N0().default,
        o = aN();
      function i(c) {
        var u = o(c, "string");
        return s(u) == "symbol" ? u : u + "";
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  sN = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      t,
      a,
    ) {
      var s = rN();
      function o(i, c, u) {
        return (
          (c = s(c)) in i
            ? Object.defineProperty(i, c, {
                value: u,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (i[c] = u),
          i
        );
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  Al = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      t,
      a,
    ) {
      var s = sN();
      function o(c, u) {
        var f = Object.keys(c);
        if (Object.getOwnPropertySymbols) {
          var p = Object.getOwnPropertySymbols(c);
          (u &&
            (p = p.filter(function (g) {
              return Object.getOwnPropertyDescriptor(c, g).enumerable;
            })),
            f.push.apply(f, p));
        }
        return f;
      }
      function i(c) {
        for (var u = 1; u < arguments.length; u++) {
          var f = arguments[u] != null ? arguments[u] : {};
          u % 2
            ? o(Object(f), !0).forEach(function (p) {
                s(c, p, f[p]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(f))
              : o(Object(f)).forEach(function (p) {
                  Object.defineProperty(
                    c,
                    p,
                    Object.getOwnPropertyDescriptor(f, p),
                  );
                });
        }
        return c;
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  oN = Yr(nN(), 1),
  My = Yr(Al(), 1);
const lN = ["cursor", "direction"];
function Un(t, a, s) {
  const o = t.flatMap((i) => i.split("."));
  if (!a && (!s || s === "any")) return o.length ? [o] : [];
  if (s === "infinite" && Hr(a) && ("direction" in a || "cursor" in a)) {
    const { cursor: i, direction: c } = a,
      u = (0, oN.default)(a, lN);
    return [o, { input: u, type: "infinite" }];
  }
  return [
    o,
    (0, My.default)(
      (0, My.default)({}, typeof a < "u" && a !== an && { input: a }),
      s && s !== "any" && { type: s },
    ),
  ];
}
function rc(t) {
  return Un(t, void 0, "any");
}
var iN = Object.create,
  R0 = Object.defineProperty,
  cN = Object.getOwnPropertyDescriptor,
  O0 = Object.getOwnPropertyNames,
  uN = Object.getPrototypeOf,
  dN = Object.prototype.hasOwnProperty,
  Wn = (t, a) =>
    function () {
      return (
        a || (0, t[O0(t)[0]])((a = { exports: {} }).exports, a),
        a.exports
      );
    },
  fN = (t, a, s, o) => {
    if ((a && typeof a == "object") || typeof a == "function")
      for (var i = O0(a), c = 0, u = i.length, f; c < u; c++)
        ((f = i[c]),
          !dN.call(t, f) &&
            f !== s &&
            R0(t, f, {
              get: ((p) => a[p]).bind(null, f),
              enumerable: !(o = cN(a, f)) || o.enumerable,
            }));
    return t;
  },
  lt = (t, a, s) => (
    (s = t != null ? iN(uN(t)) : {}),
    fN(R0(s, "default", { value: t, enumerable: !0 }), t)
  ),
  _0 = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      t,
      a,
    ) {
      function s(o) {
        "@babel/helpers - typeof";
        return (
          (a.exports = s =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (i) {
                  return typeof i;
                }
              : function (i) {
                  return i &&
                    typeof Symbol == "function" &&
                    i.constructor === Symbol &&
                    i !== Symbol.prototype
                    ? "symbol"
                    : typeof i;
                }),
          (a.exports.__esModule = !0),
          (a.exports.default = a.exports),
          s(o)
        );
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  hN = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      t,
      a,
    ) {
      var s = _0().default;
      function o(i, c) {
        if (s(i) != "object" || !i) return i;
        var u = i[Symbol.toPrimitive];
        if (u !== void 0) {
          var f = u.call(i, c || "default");
          if (s(f) != "object") return f;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (c === "string" ? String : Number)(i);
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  pN = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      t,
      a,
    ) {
      var s = _0().default,
        o = hN();
      function i(c) {
        var u = o(c, "string");
        return s(u) == "symbol" ? u : u + "";
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  $r = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      t,
      a,
    ) {
      var s = pN();
      function o(i, c, u) {
        return (
          (c = s(c)) in i
            ? Object.defineProperty(i, c, {
                value: u,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (i[c] = u),
          i
        );
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  On = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      t,
      a,
    ) {
      var s = $r();
      function o(c, u) {
        var f = Object.keys(c);
        if (Object.getOwnPropertySymbols) {
          var p = Object.getOwnPropertySymbols(c);
          (u &&
            (p = p.filter(function (g) {
              return Object.getOwnPropertyDescriptor(c, g).enumerable;
            })),
            f.push.apply(f, p));
        }
        return f;
      }
      function i(c) {
        for (var u = 1; u < arguments.length; u++) {
          var f = arguments[u] != null ? arguments[u] : {};
          u % 2
            ? o(Object(f), !0).forEach(function (p) {
                s(c, p, f[p]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(f))
              : o(Object(f)).forEach(function (p) {
                  Object.defineProperty(
                    c,
                    p,
                    Object.getOwnPropertyDescriptor(f, p),
                  );
                });
        }
        return c;
      }
      ((a.exports = i),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  });
function mN(t) {
  return (a) => {
    let s = 0,
      o = null;
    const i = [];
    function c() {
      o ||
        (o = a.subscribe({
          next(f) {
            for (const g of i) {
              var p;
              (p = g.next) === null || p === void 0 || p.call(g, f);
            }
          },
          error(f) {
            for (const g of i) {
              var p;
              (p = g.error) === null || p === void 0 || p.call(g, f);
            }
          },
          complete() {
            for (const p of i) {
              var f;
              (f = p.complete) === null || f === void 0 || f.call(p);
            }
          },
        }));
    }
    function u() {
      if (s === 0 && o) {
        const f = o;
        ((o = null), f.unsubscribe());
      }
    }
    return Mc(
      (f) => (
        s++,
        i.push(f),
        c(),
        {
          unsubscribe() {
            (s--, u());
            const p = i.findIndex((g) => g === f);
            p > -1 && i.splice(p, 1);
          },
        }
      ),
    );
  };
}
function gN(t) {
  let a = t;
  const s = [],
    o = (u) => {
      (a !== void 0 && u.next(a), s.push(u));
    },
    i = (u) => {
      s.splice(s.indexOf(u), 1);
    },
    c = Mc(
      (u) => (
        o(u),
        () => {
          i(u);
        }
      ),
    );
  return (
    (c.next = (u) => {
      if (a !== u) {
        a = u;
        for (const f of s) f.next(u);
      }
    }),
    (c.get = () => a),
    c
  );
}
function vN(t) {
  return Mc((a) => {
    function s(i = 0, c = t.op) {
      const u = t.links[i];
      if (!u)
        throw new Error(
          "No more links to execute - did you forget to add an ending link?",
        );
      return u({
        op: c,
        next(p) {
          return s(i + 1, p);
        },
      });
    }
    return s().subscribe(a);
  });
}
var Yi = lt($r()),
  Ps = lt(On());
function yN(t) {
  return t instanceof hc;
}
function xN(t) {
  return (
    Hr(t) &&
    Hr(t.error) &&
    typeof t.error.code == "number" &&
    typeof t.error.message == "string"
  );
}
function bN(t, a) {
  return typeof t == "string"
    ? t
    : Hr(t) && typeof t.message == "string"
      ? t.message
      : a;
}
var hc = class sc extends Error {
  constructor(a, s) {
    var o, i;
    const c = s?.cause;
    (super(a, { cause: c }),
      (0, Yi.default)(this, "cause", void 0),
      (0, Yi.default)(this, "shape", void 0),
      (0, Yi.default)(this, "data", void 0),
      (0, Yi.default)(this, "meta", void 0),
      (this.meta = s?.meta),
      (this.cause = c),
      (this.shape =
        s == null || (o = s.result) === null || o === void 0
          ? void 0
          : o.error),
      (this.data =
        s == null || (i = s.result) === null || i === void 0
          ? void 0
          : i.error.data),
      (this.name = "TRPCClientError"),
      Object.setPrototypeOf(this, sc.prototype));
  }
  static from(a, s = {}) {
    const o = a;
    return yN(o)
      ? (s.meta &&
          (o.meta = (0, Ps.default)((0, Ps.default)({}, o.meta), s.meta)),
        o)
      : xN(o)
        ? new sc(
            o.error.message,
            (0, Ps.default)(
              (0, Ps.default)({}, s),
              {},
              { result: o, cause: s.cause },
            ),
          )
        : new sc(
            bN(o, "Unknown error"),
            (0, Ps.default)((0, Ps.default)({}, s), {}, { cause: o }),
          );
  }
};
function SN(t) {
  const a = t;
  return a
    ? "input" in a
      ? a
      : { input: a, output: a }
    : {
        input: { serialize: (s) => s, deserialize: (s) => s },
        output: { serialize: (s) => s, deserialize: (s) => s },
      };
}
const Dy = (t) => typeof t == "function";
function wN(t) {
  if (t) return t;
  if (typeof window < "u" && Dy(window.fetch)) return window.fetch;
  if (typeof globalThis < "u" && Dy(globalThis.fetch)) return globalThis.fetch;
  throw new Error("No fetch implementation found");
}
var sl = lt(On());
function EN(t) {
  return {
    url: t.url.toString(),
    fetch: t.fetch,
    transformer: SN(t.transformer),
    methodOverride: t.methodOverride,
  };
}
function CN(t) {
  const a = {};
  for (let s = 0; s < t.length; s++) {
    const o = t[s];
    a[s] = o;
  }
  return a;
}
const AN = { query: "GET", mutation: "POST", subscription: "PATCH" };
function j0(t) {
  return "input" in t
    ? t.transformer.input.serialize(t.input)
    : CN(t.inputs.map((a) => t.transformer.input.serialize(a)));
}
const T0 = (t) => {
    const a = t.url.split("?");
    let o = a[0].replace(/\/$/, "") + "/" + t.path;
    const i = [];
    if (
      (a[1] && i.push(a[1]),
      "inputs" in t && i.push("batch=1"),
      t.type === "query" || t.type === "subscription")
    ) {
      const c = j0(t);
      c !== void 0 &&
        t.methodOverride !== "POST" &&
        i.push(`input=${encodeURIComponent(JSON.stringify(c))}`);
    }
    return (i.length && (o += "?" + i.join("&")), o);
  },
  NN = (t) => {
    if (t.type === "query" && t.methodOverride !== "POST") return;
    const a = j0(t);
    return a !== void 0 ? JSON.stringify(a) : void 0;
  },
  RN = (t) =>
    TN(
      (0, sl.default)(
        (0, sl.default)({}, t),
        {},
        { contentTypeHeader: "application/json", getUrl: T0, getBody: NN },
      ),
    );
var ON = class extends Error {
  constructor() {
    const t = "AbortError";
    (super(t), (this.name = t), (this.message = t));
  }
};
const _N = (t) => {
  var a;
  if (t?.aborted)
    throw (
      (a = t.throwIfAborted) === null || a === void 0 || a.call(t),
      typeof DOMException < "u"
        ? new DOMException("AbortError", "AbortError")
        : new ON()
    );
};
async function jN(t) {
  var a, s;
  _N(t.signal);
  const o = t.getUrl(t),
    i = t.getBody(t),
    c = (a = t.methodOverride) !== null && a !== void 0 ? a : AN[t.type],
    u = await (async () => {
      const p = await t.headers();
      return Symbol.iterator in p ? Object.fromEntries(p) : p;
    })(),
    f = (0, sl.default)(
      (0, sl.default)(
        (0, sl.default)(
          {},
          t.contentTypeHeader && c !== "GET"
            ? { "content-type": t.contentTypeHeader }
            : {},
        ),
        t.trpcAcceptHeader
          ? {
              [(s = t.trpcAcceptHeaderKey) !== null && s !== void 0
                ? s
                : "trpc-accept"]: t.trpcAcceptHeader,
            }
          : void 0,
      ),
      u,
    );
  return wN(t.fetch)(o, { method: c, signal: t.signal, body: i, headers: f });
}
async function TN(t) {
  const a = {},
    s = await jN(t);
  a.response = s;
  const o = await s.json();
  return ((a.responseJSON = o), { json: o, meta: a });
}
lt(On());
const zy = () => {
  throw new Error(
    "Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new",
  );
};
function Py(t) {
  let a = null,
    s = null;
  const o = () => {
    (clearTimeout(s), (s = null), (a = null));
  };
  function i(f) {
    const p = [[]];
    let g = 0;
    for (;;) {
      const S = f[g];
      if (!S) break;
      const A = p[p.length - 1];
      if (S.aborted) {
        var x;
        ((x = S.reject) === null ||
          x === void 0 ||
          x.call(S, new Error("Aborted")),
          g++);
        continue;
      }
      if (t.validate(A.concat(S).map((w) => w.key))) {
        (A.push(S), g++);
        continue;
      }
      if (A.length === 0) {
        var v;
        ((v = S.reject) === null ||
          v === void 0 ||
          v.call(S, new Error("Input is too big for a single dispatch")),
          g++);
        continue;
      }
      p.push([]);
    }
    return p;
  }
  function c() {
    const f = i(a);
    o();
    for (const p of f) {
      if (!p.length) continue;
      const g = { items: p };
      for (const v of p) v.batch = g;
      t.fetch(g.items.map((v) => v.key))
        .then(async (v) => {
          await Promise.all(
            v.map(async (A, N) => {
              const w = g.items[N];
              try {
                var E;
                const D = await Promise.resolve(A);
                (E = w.resolve) === null || E === void 0 || E.call(w, D);
              } catch (D) {
                var O;
                (O = w.reject) === null || O === void 0 || O.call(w, D);
              }
              ((w.batch = null), (w.reject = null), (w.resolve = null));
            }),
          );
          for (const A of g.items) {
            var S;
            ((S = A.reject) === null ||
              S === void 0 ||
              S.call(A, new Error("Missing result")),
              (A.batch = null));
          }
        })
        .catch((v) => {
          for (const A of g.items) {
            var S;
            ((S = A.reject) === null || S === void 0 || S.call(A, v),
              (A.batch = null));
          }
        });
    }
  }
  function u(f) {
    var p;
    const g = { aborted: !1, key: f, batch: null, resolve: zy, reject: zy },
      x = new Promise((v, S) => {
        var A;
        ((g.reject = S),
          (g.resolve = v),
          ((A = a) !== null && A !== void 0) || (a = []),
          a.push(g));
      });
    return (((p = s) !== null && p !== void 0) || (s = setTimeout(c)), x);
  }
  return { load: u };
}
function MN(...t) {
  const a = new AbortController(),
    s = t.length;
  let o = 0;
  const i = () => {
    ++o === s && a.abort();
  };
  for (const c of t)
    c?.aborted ? i() : c?.addEventListener("abort", i, { once: !0 });
  return a.signal;
}
var $i = lt(On());
function DN(t) {
  var a, s;
  const o = EN(t),
    i = (a = t.maxURLLength) !== null && a !== void 0 ? a : 1 / 0,
    c = (s = t.maxItems) !== null && s !== void 0 ? s : 1 / 0;
  return () => {
    const u = (x) => ({
        validate(v) {
          if (i === 1 / 0 && c === 1 / 0) return !0;
          if (v.length > c) return !1;
          const S = v.map((w) => w.path).join(","),
            A = v.map((w) => w.input);
          return (
            T0(
              (0, $i.default)(
                (0, $i.default)({}, o),
                {},
                { type: x, path: S, inputs: A, signal: null },
              ),
            ).length <= i
          );
        },
        async fetch(v) {
          const S = v.map((D) => D.path).join(","),
            A = v.map((D) => D.input),
            N = MN(...v.map((D) => D.signal)),
            w = await RN(
              (0, $i.default)(
                (0, $i.default)({}, o),
                {},
                {
                  path: S,
                  inputs: A,
                  type: x,
                  headers() {
                    return t.headers
                      ? typeof t.headers == "function"
                        ? t.headers({ opList: v })
                        : t.headers
                      : {};
                  },
                  signal: N,
                },
              ),
            );
          return (Array.isArray(w.json) ? w.json : v.map(() => w.json)).map(
            (D) => ({ meta: w.meta, json: D }),
          );
        },
      }),
      f = Py(u("query")),
      p = Py(u("mutation")),
      g = { query: f, mutation: p };
    return ({ op: x }) =>
      Mc((v) => {
        if (x.type === "subscription")
          throw new Error(
            "Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`",
          );
        const A = g[x.type].load(x);
        let N;
        return (
          A.then((w) => {
            N = w;
            const E = GA(w.json, o.transformer.output);
            if (!E.ok) {
              v.error(hc.from(E.error, { meta: w.meta }));
              return;
            }
            (v.next({ context: w.meta, result: E.result }), v.complete());
          }).catch((w) => {
            v.error(hc.from(w, { meta: N?.meta }));
          }),
          () => {}
        );
      });
  };
}
lt(On());
const M0 = (t, ...a) => (typeof t == "function" ? t(...a) : t);
lt($r());
function zN() {
  let t, a;
  return {
    promise: new Promise((o, i) => {
      ((t = o), (a = i));
    }),
    resolve: t,
    reject: a,
  };
}
async function PN(t) {
  const a = await M0(t.url);
  if (!t.connectionParams) return a;
  const o = `${a.includes("?") ? "&" : "?"}connectionParams=1`;
  return a + o;
}
async function kN(t, a) {
  const s = { method: "connectionParams", data: await M0(t) };
  return a.encode(s);
}
lt($r());
var nr = lt($r());
function HN(t) {
  const { promise: a, resolve: s, reject: o } = zN();
  return (
    t.addEventListener("open", () => {
      (t.removeEventListener("error", o), s());
    }),
    t.addEventListener("error", o),
    a
  );
}
function LN(t, { intervalMs: a, pongTimeoutMs: s }) {
  let o, i;
  function c() {
    o = setTimeout(() => {
      (t.send("PING"),
        (i = setTimeout(() => {
          t.close();
        }, s)));
    }, a);
  }
  function u() {
    (clearTimeout(o), c());
  }
  function f() {
    (clearTimeout(i), u());
  }
  (t.addEventListener("open", c),
    t.addEventListener("message", ({ data: p }) => {
      (clearTimeout(o), c(), p === "PONG" && f());
    }),
    t.addEventListener("close", () => {
      (clearTimeout(o), clearTimeout(i));
    }));
}
var UN = class $f {
  constructor(a) {
    var s;
    if (
      ((0, nr.default)(this, "id", ++$f.connectCount),
      (0, nr.default)(this, "WebSocketPonyfill", void 0),
      (0, nr.default)(this, "urlOptions", void 0),
      (0, nr.default)(this, "keepAliveOpts", void 0),
      (0, nr.default)(this, "encoder", void 0),
      (0, nr.default)(this, "wsObservable", gN(null)),
      (0, nr.default)(this, "openPromise", null),
      (this.WebSocketPonyfill =
        (s = a.WebSocketPonyfill) !== null && s !== void 0 ? s : WebSocket),
      !this.WebSocketPonyfill)
    )
      throw new Error(
        "No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill",
      );
    ((this.urlOptions = a.urlOptions),
      (this.keepAliveOpts = a.keepAlive),
      (this.encoder = a.encoder));
  }
  get ws() {
    return this.wsObservable.get();
  }
  set ws(a) {
    this.wsObservable.next(a);
  }
  isOpen() {
    return (
      !!this.ws &&
      this.ws.readyState === this.WebSocketPonyfill.OPEN &&
      !this.openPromise
    );
  }
  isClosed() {
    return (
      !!this.ws &&
      (this.ws.readyState === this.WebSocketPonyfill.CLOSING ||
        this.ws.readyState === this.WebSocketPonyfill.CLOSED)
    );
  }
  async open() {
    var a = this;
    if (a.openPromise) return a.openPromise;
    a.id = ++$f.connectCount;
    const s = PN(a.urlOptions).then((o) => new a.WebSocketPonyfill(o));
    a.openPromise = s.then(async (o) => {
      ((a.ws = o),
        (o.binaryType = "arraybuffer"),
        o.addEventListener("message", function ({ data: i }) {
          i === "PING" && this.send("PONG");
        }),
        a.keepAliveOpts.enabled && LN(o, a.keepAliveOpts),
        o.addEventListener("close", () => {
          a.ws === o && (a.ws = null);
        }),
        await HN(o),
        a.urlOptions.connectionParams &&
          o.send(await kN(a.urlOptions.connectionParams, a.encoder)));
    });
    try {
      await a.openPromise;
    } finally {
      a.openPromise = null;
    }
  }
  async close() {
    var a = this;
    try {
      await a.openPromise;
    } finally {
      var s;
      (s = a.ws) === null || s === void 0 || s.close();
    }
  }
};
(0, nr.default)(UN, "connectCount", 0);
lt($r());
lt(On());
var bf = lt($r()),
  ky = lt(On()),
  Dc = class {
    constructor(t) {
      ((0, bf.default)(this, "links", void 0),
        (0, bf.default)(this, "runtime", void 0),
        (0, bf.default)(this, "requestId", void 0),
        (this.requestId = 0),
        (this.runtime = {}),
        (this.links = t.links.map((a) => a(this.runtime))));
    }
    $request(t) {
      var a;
      return vN({
        links: this.links,
        op: (0, ky.default)(
          (0, ky.default)({}, t),
          {},
          {
            context: (a = t.context) !== null && a !== void 0 ? a : {},
            id: ++this.requestId,
          },
        ),
      }).pipe(mN());
    }
    async requestAsPromise(t) {
      var a = this;
      try {
        const s = a.$request(t);
        return (await XA(s)).result.data;
      } catch (s) {
        throw hc.from(s);
      }
    }
    query(t, a, s) {
      return this.requestAsPromise({
        type: "query",
        path: t,
        input: a,
        context: s?.context,
        signal: s?.signal,
      });
    }
    mutation(t, a, s) {
      return this.requestAsPromise({
        type: "mutation",
        path: t,
        input: a,
        context: s?.context,
        signal: s?.signal,
      });
    }
    subscription(t, a, s) {
      return this.$request({
        type: "subscription",
        path: t,
        input: a,
        context: s.context,
        signal: s.signal,
      }).subscribe({
        next(i) {
          switch (i.result.type) {
            case "state": {
              var c;
              (c = s.onConnectionStateChange) === null ||
                c === void 0 ||
                c.call(s, i.result);
              break;
            }
            case "started": {
              var u;
              (u = s.onStarted) === null ||
                u === void 0 ||
                u.call(s, { context: i.context });
              break;
            }
            case "stopped": {
              var f;
              (f = s.onStopped) === null || f === void 0 || f.call(s);
              break;
            }
            case "data":
            case void 0: {
              var p;
              (p = s.onData) === null ||
                p === void 0 ||
                p.call(s, i.result.data);
              break;
            }
          }
        },
        error(i) {
          var c;
          (c = s.onError) === null || c === void 0 || c.call(s, i);
        },
        complete() {
          var i;
          (i = s.onComplete) === null || i === void 0 || i.call(s);
        },
      });
    }
  };
const D0 = Symbol.for("trpc_untypedClient"),
  BN = { query: "query", mutate: "mutation", subscribe: "subscription" },
  qN = (t) => BN[t];
function z0(t) {
  const a = Tc(({ path: s, args: o }) => {
    const i = [...s],
      c = qN(i.pop()),
      u = i.join(".");
    return t[c](u, ...o);
  });
  return kh((s) => (s === D0 ? t : a[s]));
}
function QN(t) {
  const a = new Dc(t);
  return z0(a);
}
function Lh(t) {
  return t[D0];
}
lt(On());
lt(On());
var VN = Wn({
  "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
    t,
    a,
  ) {
    function s(i) {
      var c,
        u,
        f,
        p = 2;
      for (
        typeof Symbol < "u" &&
        ((u = Symbol.asyncIterator), (f = Symbol.iterator));
        p--;
      ) {
        if (u && (c = i[u]) != null) return c.call(i);
        if (f && (c = i[f]) != null) return new o(c.call(i));
        ((u = "@@asyncIterator"), (f = "@@iterator"));
      }
      throw new TypeError("Object is not async iterable");
    }
    function o(i) {
      function c(u) {
        if (Object(u) !== u)
          return Promise.reject(new TypeError(u + " is not an object."));
        var f = u.done;
        return Promise.resolve(u.value).then(function (p) {
          return { value: p, done: f };
        });
      }
      return (
        (o = function (f) {
          ((this.s = f), (this.n = f.next));
        }),
        (o.prototype = {
          s: null,
          n: null,
          next: function () {
            return c(this.n.apply(this.s, arguments));
          },
          return: function (f) {
            var p = this.s.return;
            return p === void 0
              ? Promise.resolve({ value: f, done: !0 })
              : c(p.apply(this.s, arguments));
          },
          throw: function (f) {
            var p = this.s.return;
            return p === void 0
              ? Promise.reject(f)
              : c(p.apply(this.s, arguments));
          },
        }),
        new o(i)
      );
    }
    ((a.exports = s),
      (a.exports.__esModule = !0),
      (a.exports.default = a.exports));
  },
});
lt(VN());
lt(On());
var IN = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(
      t,
      a,
    ) {
      function s() {
        var o =
            typeof SuppressedError == "function"
              ? SuppressedError
              : function (f, p) {
                  var g = Error();
                  return (
                    (g.name = "SuppressedError"),
                    (g.error = f),
                    (g.suppressed = p),
                    g
                  );
                },
          i = {},
          c = [];
        function u(f, p) {
          if (p != null) {
            if (Object(p) !== p)
              throw new TypeError(
                "using declarations can only be used with objects, functions, null, or undefined.",
              );
            if (f)
              var g =
                p[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
            if (
              g === void 0 &&
              ((g = p[Symbol.dispose || Symbol.for("Symbol.dispose")]), f)
            )
              var x = g;
            if (typeof g != "function")
              throw new TypeError("Object is not disposable.");
            (x &&
              (g = function () {
                try {
                  x.call(p);
                } catch (S) {
                  return Promise.reject(S);
                }
              }),
              c.push({ v: p, d: g, a: f }));
          } else f && c.push({ d: p, a: f });
          return p;
        }
        return {
          e: i,
          u: u.bind(null, !1),
          a: u.bind(null, !0),
          d: function () {
            var p,
              g = this.e,
              x = 0;
            function v() {
              for (; (p = c.pop()); )
                try {
                  if (!p.a && x === 1)
                    return ((x = 0), c.push(p), Promise.resolve().then(v));
                  if (p.d) {
                    var A = p.d.call(p.v);
                    if (p.a) return ((x |= 2), Promise.resolve(A).then(v, S));
                  } else x |= 1;
                } catch (N) {
                  return S(N);
                }
              if (x === 1)
                return g !== i ? Promise.reject(g) : Promise.resolve();
              if (g !== i) throw g;
            }
            function S(A) {
              return ((g = g !== i ? new o(A, g) : A), v());
            }
            return v();
          },
        };
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  P0 = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(
      t,
      a,
    ) {
      function s(o, i) {
        ((this.v = o), (this.k = i));
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  YN = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(
      t,
      a,
    ) {
      var s = P0();
      function o(i) {
        return new s(i, 0);
      }
      ((a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  $N = Wn({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(
      t,
      a,
    ) {
      var s = P0();
      function o(c) {
        return function () {
          return new i(c.apply(this, arguments));
        };
      }
      function i(c) {
        var u, f;
        function p(x, v) {
          try {
            var S = c[x](v),
              A = S.value,
              N = A instanceof s;
            Promise.resolve(N ? A.v : A).then(
              function (w) {
                if (N) {
                  var E = x === "return" ? "return" : "next";
                  if (!A.k || w.done) return p(E, w);
                  w = c[E](w).value;
                }
                g(S.done ? "return" : "normal", w);
              },
              function (w) {
                p("throw", w);
              },
            );
          } catch (w) {
            g("throw", w);
          }
        }
        function g(x, v) {
          switch (x) {
            case "return":
              u.resolve({ value: v, done: !0 });
              break;
            case "throw":
              u.reject(v);
              break;
            default:
              u.resolve({ value: v, done: !1 });
          }
          (u = u.next) ? p(u.key, u.arg) : (f = null);
        }
        ((this._invoke = function (x, v) {
          return new Promise(function (S, A) {
            var N = { key: x, arg: v, resolve: S, reject: A, next: null };
            f ? (f = f.next = N) : ((u = f = N), p(x, v));
          });
        }),
          typeof c.return != "function" && (this.return = void 0));
      }
      ((i.prototype[
        (typeof Symbol == "function" && Symbol.asyncIterator) ||
          "@@asyncIterator"
      ] = function () {
        return this;
      }),
        (i.prototype.next = function (c) {
          return this._invoke("next", c);
        }),
        (i.prototype.throw = function (c) {
          return this._invoke("throw", c);
        }),
        (i.prototype.return = function (c) {
          return this._invoke("return", c);
        }),
        (a.exports = o),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  });
lt(IN());
lt(YN());
lt($N());
lt(On());
function GN(t) {
  return Tc(({ path: a, args: s }) => {
    var o;
    const i = [...a],
      c = i.pop();
    if (c === "useMutation") return t[c](i, ...s);
    if (c === "_def") return { path: i };
    const [u, ...f] = s,
      p = (o = f[0]) !== null && o !== void 0 ? o : {};
    return t[c](i, u, p);
  });
}
var Sf;
const FN = ["client", "ssrContext", "ssrState", "abortOnUnmount"],
  XN =
    (Sf = y.createContext) === null || Sf === void 0
      ? void 0
      : Sf.call(Nc, null),
  KN = (t) => {
    switch (t) {
      case "queryOptions":
      case "fetch":
      case "ensureData":
      case "prefetch":
      case "getData":
      case "setData":
      case "setQueriesData":
        return "query";
      case "infiniteQueryOptions":
      case "fetchInfinite":
      case "prefetchInfinite":
      case "getInfiniteData":
      case "setInfiniteData":
        return "infinite";
      case "setMutationDefaults":
      case "getMutationDefaults":
      case "isMutating":
      case "cancel":
      case "invalidate":
      case "refetch":
      case "reset":
        return "any";
    }
  };
function ZN(t) {
  return Tc((a) => {
    const s = [...a.path],
      o = s.pop(),
      i = [...a.args],
      c = i.shift(),
      u = KN(o),
      f = Un(s, c, u);
    return {
      infiniteQueryOptions: () => t.infiniteQueryOptions(s, f, i[0]),
      queryOptions: () => t.queryOptions(s, f, ...i),
      fetch: () => t.fetchQuery(f, ...i),
      fetchInfinite: () => t.fetchInfiniteQuery(f, i[0]),
      prefetch: () => t.prefetchQuery(f, ...i),
      prefetchInfinite: () => t.prefetchInfiniteQuery(f, i[0]),
      ensureData: () => t.ensureQueryData(f, ...i),
      invalidate: () => t.invalidateQueries(f, ...i),
      reset: () => t.resetQueries(f, ...i),
      refetch: () => t.refetchQueries(f, ...i),
      cancel: () => t.cancelQuery(f, ...i),
      setData: () => {
        t.setQueryData(f, i[0], i[1]);
      },
      setQueriesData: () => t.setQueriesData(f, i[0], i[1], i[2]),
      setInfiniteData: () => {
        t.setInfiniteQueryData(f, i[0], i[1]);
      },
      getData: () => t.getQueryData(f),
      getInfiniteData: () => t.getInfiniteQueryData(f),
      setMutationDefaults: () => t.setMutationDefaults(rc(s), c),
      getMutationDefaults: () => t.getMutationDefaults(rc(s)),
      isMutating: () => t.isMutating({ mutationKey: rc(s) }),
    }[o]();
  });
}
function WN(t) {
  const a = z0(t.client),
    s = ZN(t);
  return kh((o) => {
    const i = o;
    return i === "client" ? a : FN.includes(i) ? t[i] : s[o];
  });
}
var JN = Yr(Al(), 1);
function Hy(t) {
  const a = t instanceof Dc ? t : Lh(t);
  return Tc((s) => {
    const o = s.path,
      i = o.join("."),
      [c, u] = s.args;
    return (0, JN.default)(
      { queryKey: Un(o, c, "query"), queryFn: () => a.query(i, c, u?.trpc) },
      u,
    );
  });
}
var wf = Yr(Al(), 1);
function Dt(t, a, s) {
  var o;
  const i = t[0];
  let c = (o = t[1]) === null || o === void 0 ? void 0 : o.input;
  if (s) {
    var u;
    c = (0, wf.default)(
      (0, wf.default)(
        (0, wf.default)({}, (u = c) !== null && u !== void 0 ? u : {}),
        s.pageParam ? { cursor: s.pageParam } : {},
      ),
      {},
      { direction: s.direction },
    );
  }
  return [i.join("."), c, a?.trpc];
}
var eR = ur({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
      t,
      a,
    ) {
      function s(i) {
        var c,
          u,
          f,
          p = 2;
        for (
          typeof Symbol < "u" &&
          ((u = Symbol.asyncIterator), (f = Symbol.iterator));
          p--;
        ) {
          if (u && (c = i[u]) != null) return c.call(i);
          if (f && (c = i[f]) != null) return new o(c.call(i));
          ((u = "@@asyncIterator"), (f = "@@iterator"));
        }
        throw new TypeError("Object is not async iterable");
      }
      function o(i) {
        function c(u) {
          if (Object(u) !== u)
            return Promise.reject(new TypeError(u + " is not an object."));
          var f = u.done;
          return Promise.resolve(u.value).then(function (p) {
            return { value: p, done: f };
          });
        }
        return (
          (o = function (f) {
            ((this.s = f), (this.n = f.next));
          }),
          (o.prototype = {
            s: null,
            n: null,
            next: function () {
              return c(this.n.apply(this.s, arguments));
            },
            return: function (f) {
              var p = this.s.return;
              return p === void 0
                ? Promise.resolve({ value: f, done: !0 })
                : c(p.apply(this.s, arguments));
            },
            throw: function (f) {
              var p = this.s.return;
              return p === void 0
                ? Promise.reject(f)
                : c(p.apply(this.s, arguments));
            },
          }),
          new o(i)
        );
      }
      ((a.exports = s),
        (a.exports.__esModule = !0),
        (a.exports.default = a.exports));
    },
  }),
  tR = Yr(eR(), 1);
function Gf(t) {
  return { path: t.path.join(".") };
}
function nl(t) {
  const a = Gf(t);
  return y.useMemo(() => a, [a]);
}
async function k0(t, a, s) {
  const i = a.getQueryCache().build(a, { queryKey: s });
  i.setState({ data: [], status: "success" });
  const c = [];
  var u = !1,
    f = !1,
    p;
  try {
    for (
      var g = (0, tR.default)(t), x;
      (u = !(x = await g.next()).done);
      u = !1
    ) {
      const v = x.value;
      (c.push(v), i.setState({ data: [...c] }));
    }
  } catch (v) {
    ((f = !0), (p = v));
  } finally {
    try {
      u && g.return != null && (await g.return());
    } finally {
      if (f) throw p;
    }
  }
  return c;
}
var Ue = Yr(Al(), 1);
function nR(t) {
  const { client: a, queryClient: s } = t,
    o = a instanceof Dc ? a : Lh(a);
  return {
    infiniteQueryOptions: (i, c, u) => {
      var f, p;
      const g = ((f = c[1]) === null || f === void 0 ? void 0 : f.input) === an,
        x = async (v) => {
          var S;
          const A = (0, Ue.default)(
            (0, Ue.default)({}, u),
            {},
            {
              trpc: (0, Ue.default)(
                (0, Ue.default)({}, u?.trpc),
                !(u == null || (S = u.trpc) === null || S === void 0) &&
                  S.abortOnUnmount
                  ? { signal: v.signal }
                  : { signal: null },
              ),
            },
          );
          return await o.query(
            ...Dt(c, A, { direction: v.direction, pageParam: v.pageParam }),
          );
        };
      return Object.assign(
        (0, Ue.default)(
          (0, Ue.default)({}, u),
          {},
          {
            initialData: u?.initialData,
            queryKey: c,
            queryFn: g ? an : x,
            initialPageParam:
              (p = u?.initialCursor) !== null && p !== void 0 ? p : null,
          },
        ),
        { trpc: Gf({ path: i }) },
      );
    },
    queryOptions: (i, c, u) => {
      var f;
      const p = ((f = c[1]) === null || f === void 0 ? void 0 : f.input) === an,
        g = async (x) => {
          var v;
          const S = (0, Ue.default)(
              (0, Ue.default)({}, u),
              {},
              {
                trpc: (0, Ue.default)(
                  (0, Ue.default)({}, u?.trpc),
                  !(u == null || (v = u.trpc) === null || v === void 0) &&
                    v.abortOnUnmount
                    ? { signal: x.signal }
                    : { signal: null },
                ),
              },
            ),
            A = await o.query(...Dt(c, S));
          return v0(A) ? k0(A, s, c) : A;
        };
      return Object.assign(
        (0, Ue.default)(
          (0, Ue.default)({}, u),
          {},
          { initialData: u?.initialData, queryKey: c, queryFn: p ? an : g },
        ),
        { trpc: Gf({ path: i }) },
      );
    },
    fetchQuery: (i, c) =>
      s.fetchQuery(
        (0, Ue.default)(
          (0, Ue.default)({}, c),
          {},
          { queryKey: i, queryFn: () => o.query(...Dt(i, c)) },
        ),
      ),
    fetchInfiniteQuery: (i, c) => {
      var u;
      return s.fetchInfiniteQuery(
        (0, Ue.default)(
          (0, Ue.default)({}, c),
          {},
          {
            queryKey: i,
            queryFn: ({ pageParam: f, direction: p }) =>
              o.query(...Dt(i, c, { pageParam: f, direction: p })),
            initialPageParam:
              (u = c?.initialCursor) !== null && u !== void 0 ? u : null,
          },
        ),
      );
    },
    prefetchQuery: (i, c) =>
      s.prefetchQuery(
        (0, Ue.default)(
          (0, Ue.default)({}, c),
          {},
          { queryKey: i, queryFn: () => o.query(...Dt(i, c)) },
        ),
      ),
    prefetchInfiniteQuery: (i, c) => {
      var u;
      return s.prefetchInfiniteQuery(
        (0, Ue.default)(
          (0, Ue.default)({}, c),
          {},
          {
            queryKey: i,
            queryFn: ({ pageParam: f, direction: p }) =>
              o.query(...Dt(i, c, { pageParam: f, direction: p })),
            initialPageParam:
              (u = c?.initialCursor) !== null && u !== void 0 ? u : null,
          },
        ),
      );
    },
    ensureQueryData: (i, c) =>
      s.ensureQueryData(
        (0, Ue.default)(
          (0, Ue.default)({}, c),
          {},
          { queryKey: i, queryFn: () => o.query(...Dt(i, c)) },
        ),
      ),
    invalidateQueries: (i, c, u) =>
      s.invalidateQueries(
        (0, Ue.default)((0, Ue.default)({}, c), {}, { queryKey: i }),
        u,
      ),
    resetQueries: (i, c, u) =>
      s.resetQueries(
        (0, Ue.default)((0, Ue.default)({}, c), {}, { queryKey: i }),
        u,
      ),
    refetchQueries: (i, c, u) =>
      s.refetchQueries(
        (0, Ue.default)((0, Ue.default)({}, c), {}, { queryKey: i }),
        u,
      ),
    cancelQuery: (i, c) => s.cancelQueries({ queryKey: i }, c),
    setQueryData: (i, c, u) => s.setQueryData(i, c, u),
    setQueriesData: (i, c, u, f) =>
      s.setQueriesData(
        (0, Ue.default)((0, Ue.default)({}, c), {}, { queryKey: i }),
        u,
        f,
      ),
    getQueryData: (i) => s.getQueryData(i),
    setInfiniteQueryData: (i, c, u) => s.setQueryData(i, c, u),
    getInfiniteQueryData: (i) => s.getQueryData(i),
    setMutationDefaults: (i, c) => {
      const u = i[0],
        f = (p) => o.mutation(...Dt([u, { input: p }], t));
      return s.setMutationDefaults(
        i,
        typeof c == "function" ? c({ canonicalMutationFn: f }) : c,
      );
    },
    getMutationDefaults: (i) => s.getMutationDefaults(i),
    isMutating: (i) =>
      s.isMutating((0, Ue.default)((0, Ue.default)({}, i), {}, { exact: !0 })),
  };
}
var ce = Yr(Al());
const Ly = (t, a) =>
  new Proxy(t, {
    get(o, i) {
      return (a(i), o[i]);
    },
  });
function aR(t) {
  var a, s;
  const o = (a = void 0) !== null && a !== void 0 ? a : (L) => L.originalFn(),
    i = (s = void 0) !== null && s !== void 0 ? s : XN,
    c = QN,
    u = (L) => {
      var q;
      const { abortOnUnmount: j = !1, queryClient: R, ssrContext: U } = L,
        [$, Z] = y.useState((q = L.ssrState) !== null && q !== void 0 ? q : !1),
        W = L.client instanceof Dc ? L.client : Lh(L.client),
        re = y.useMemo(() => nR({ client: W, queryClient: R }), [W, R]),
        oe = y.useMemo(
          () =>
            (0, ce.default)(
              {
                abortOnUnmount: j,
                queryClient: R,
                client: W,
                ssrContext: U ?? null,
                ssrState: $,
              },
              re,
            ),
          [j, W, re, R, U, $],
        );
      return (
        y.useEffect(() => {
          Z((ie) => (ie ? "mounted" : !1));
        }, []),
        m.jsx(i.Provider, { value: oe, children: L.children })
      );
    };
  function f() {
    const L = y.useContext(i);
    if (!L)
      throw new Error(
        "Unable to find tRPC Context. Did you forget to wrap your App inside `withTRPC` HoC?",
      );
    return L;
  }
  function p(L, q) {
    var j;
    const { queryClient: R, ssrState: U } = f();
    return U &&
      U !== "mounted" &&
      ((j = R.getQueryCache().find({ queryKey: L })) === null || j === void 0
        ? void 0
        : j.state.status) === "error"
      ? (0, ce.default)({ retryOnMount: !1 }, q)
      : q;
  }
  function g(L, q, j) {
    var R, U, $, Z, W;
    const re = f(),
      {
        abortOnUnmount: oe,
        client: ie,
        ssrState: M,
        queryClient: V,
        prefetchQuery: H,
      } = re,
      le = Un(L, q, "query"),
      de = V.getQueryDefaults(le),
      _ = q === an;
    typeof window > "u" &&
      M === "prepass" &&
      (j == null || (R = j.trpc) === null || R === void 0 ? void 0 : R.ssr) !==
        !1 &&
      ((U = j?.enabled) !== null && U !== void 0 ? U : de?.enabled) !== !1 &&
      !_ &&
      !V.getQueryCache().find({ queryKey: le }) &&
      H(le, j);
    const X = p(le, (0, ce.default)((0, ce.default)({}, de), j)),
      I =
        ($ =
          (Z =
            j == null || (W = j.trpc) === null || W === void 0
              ? void 0
              : W.abortOnUnmount) !== null && Z !== void 0
            ? Z
            : void 0) !== null && $ !== void 0
          ? $
          : oe,
      K = _A(
        (0, ce.default)(
          (0, ce.default)({}, X),
          {},
          {
            queryKey: le,
            queryFn: _
              ? q
              : async (ae) => {
                  const ue = (0, ce.default)(
                      (0, ce.default)({}, X),
                      {},
                      {
                        trpc: (0, ce.default)(
                          (0, ce.default)({}, X?.trpc),
                          I ? { signal: ae.signal } : { signal: null },
                        ),
                      },
                    ),
                    ne = await ie.query(...Dt(le, ue));
                  return v0(ne) ? k0(ne, V, le) : ne;
                },
          },
        ),
        V,
      );
    return ((K.trpc = nl({ path: L })), K);
  }
  function x(L, q, j) {
    var R, U, $;
    const Z = f(),
      W = Un(L, q, "query"),
      re = q === an,
      oe =
        (R =
          (U =
            j == null || ($ = j.trpc) === null || $ === void 0
              ? void 0
              : $.abortOnUnmount) !== null && U !== void 0
            ? U
            : void 0) !== null && R !== void 0
          ? R
          : Z.abortOnUnmount;
    DA(
      (0, ce.default)(
        (0, ce.default)({}, j),
        {},
        {
          queryKey: W,
          queryFn: re
            ? q
            : (ie) => {
                const M = {
                  trpc: (0, ce.default)(
                    (0, ce.default)({}, j?.trpc),
                    oe ? { signal: ie.signal } : {},
                  ),
                };
                return Z.client.query(...Dt(W, M));
              },
        },
      ),
    );
  }
  function v(L, q, j) {
    var R, U, $;
    const Z = f(),
      W = Un(L, q, "query"),
      re =
        (R =
          (U =
            j == null || ($ = j.trpc) === null || $ === void 0
              ? void 0
              : $.abortOnUnmount) !== null && U !== void 0
            ? U
            : void 0) !== null && R !== void 0
          ? R
          : Z.abortOnUnmount,
      oe = jA(
        (0, ce.default)(
          (0, ce.default)({}, j),
          {},
          {
            queryKey: W,
            queryFn: (ie) => {
              const M = (0, ce.default)(
                (0, ce.default)({}, j),
                {},
                {
                  trpc: (0, ce.default)(
                    (0, ce.default)({}, j?.trpc),
                    re ? { signal: ie.signal } : { signal: null },
                  ),
                },
              );
              return Z.client.query(...Dt(W, M));
            },
          },
        ),
        Z.queryClient,
      );
    return ((oe.trpc = nl({ path: L })), [oe.data, oe]);
  }
  function S(L, q) {
    const { client: j, queryClient: R } = f(),
      U = rc(L),
      $ = R.defaultMutationOptions(R.getMutationDefaults(U)),
      Z = PA(
        (0, ce.default)(
          (0, ce.default)({}, q),
          {},
          {
            mutationKey: U,
            mutationFn: (W) => j.mutation(...Dt([L, { input: W }], q)),
            onSuccess(...W) {
              var re, oe;
              return o({
                originalFn: () => {
                  var M, V, H;
                  return (M =
                    q == null || (V = q.onSuccess) === null || V === void 0
                      ? void 0
                      : V.call(q, ...W)) !== null && M !== void 0
                    ? M
                    : $ == null || (H = $.onSuccess) === null || H === void 0
                      ? void 0
                      : H.call($, ...W);
                },
                queryClient: R,
                meta:
                  (re =
                    (oe = q?.meta) !== null && oe !== void 0 ? oe : $?.meta) !==
                    null && re !== void 0
                    ? re
                    : {},
              });
            },
          },
        ),
        R,
      );
    return ((Z.trpc = nl({ path: L })), Z);
  }
  const A = { data: void 0, error: null, status: "idle" },
    N = { data: void 0, error: null, status: "connecting" };
  function w(L, q, j) {
    var R;
    const U = (R = j?.enabled) !== null && R !== void 0 ? R : q !== an,
      $ = or(Un(L, q, "any")),
      { client: Z } = f(),
      W = y.useRef(j);
    y.useEffect(() => {
      W.current = j;
    });
    const [re] = y.useState(new Set([])),
      oe = y.useCallback(
        (_) => {
          re.add(_);
        },
        [re],
      ),
      ie = y.useRef(null),
      M = y.useCallback(
        (_) => {
          const X = H.current,
            I = (H.current = _(X));
          let K = !1;
          for (const ae of re)
            if (X[ae] !== I[ae]) {
              K = !0;
              break;
            }
          K && de(Ly(I, oe));
        },
        [oe, re],
      ),
      V = y.useCallback(() => {
        var _;
        if (
          ((_ = ie.current) === null || _ === void 0 || _.unsubscribe(), !U)
        ) {
          M(() => (0, ce.default)((0, ce.default)({}, A), {}, { reset: V }));
          return;
        }
        M(() => (0, ce.default)((0, ce.default)({}, N), {}, { reset: V }));
        const X = Z.subscription(L.join("."), q ?? void 0, {
          onStarted: () => {
            var I, K;
            ((I = (K = W.current).onStarted) === null ||
              I === void 0 ||
              I.call(K),
              M((ae) =>
                (0, ce.default)(
                  (0, ce.default)({}, ae),
                  {},
                  { status: "pending", error: null },
                ),
              ));
          },
          onData: (I) => {
            var K, ae;
            ((K = (ae = W.current).onData) === null ||
              K === void 0 ||
              K.call(ae, I),
              M((ue) =>
                (0, ce.default)(
                  (0, ce.default)({}, ue),
                  {},
                  { status: "pending", data: I, error: null },
                ),
              ));
          },
          onError: (I) => {
            var K, ae;
            ((K = (ae = W.current).onError) === null ||
              K === void 0 ||
              K.call(ae, I),
              M((ue) =>
                (0, ce.default)(
                  (0, ce.default)({}, ue),
                  {},
                  { status: "error", error: I },
                ),
              ));
          },
          onConnectionStateChange: (I) => {
            M((K) => {
              switch (I.state) {
                case "idle":
                  return (0, ce.default)(
                    (0, ce.default)({}, K),
                    {},
                    { status: I.state, error: null, data: void 0 },
                  );
                case "connecting":
                  return (0, ce.default)(
                    (0, ce.default)({}, K),
                    {},
                    { error: I.error, status: I.state },
                  );
                case "pending":
                  return K;
              }
            });
          },
          onComplete: () => {
            var I, K;
            ((I = (K = W.current).onComplete) === null ||
              I === void 0 ||
              I.call(K),
              M((ae) =>
                (0, ce.default)(
                  (0, ce.default)({}, ae),
                  {},
                  { status: "idle", error: null, data: void 0 },
                ),
              ));
          },
        });
        ie.current = X;
      }, [Z, $, U, M]);
    y.useEffect(
      () => (
        V(),
        () => {
          var _;
          (_ = ie.current) === null || _ === void 0 || _.unsubscribe();
        }
      ),
      [V],
    );
    const H = y.useRef(
        U
          ? (0, ce.default)((0, ce.default)({}, N), {}, { reset: V })
          : (0, ce.default)((0, ce.default)({}, A), {}, { reset: V }),
      ),
      [le, de] = y.useState(Ly(H.current, oe));
    return le;
  }
  function E(L, q, j) {
    var R, U, $, Z, W;
    const {
        client: re,
        ssrState: oe,
        prefetchInfiniteQuery: ie,
        queryClient: M,
        abortOnUnmount: V,
      } = f(),
      H = Un(L, q, "infinite"),
      le = M.getQueryDefaults(H),
      de = q === an;
    typeof window > "u" &&
      oe === "prepass" &&
      (j == null || (R = j.trpc) === null || R === void 0 ? void 0 : R.ssr) !==
        !1 &&
      ((U = j?.enabled) !== null && U !== void 0 ? U : le?.enabled) !== !1 &&
      !de &&
      !M.getQueryCache().find({ queryKey: H }) &&
      ie(H, (0, ce.default)((0, ce.default)({}, le), j));
    const _ = p(H, (0, ce.default)((0, ce.default)({}, le), j)),
      X =
        ($ =
          j == null || (Z = j.trpc) === null || Z === void 0
            ? void 0
            : Z.abortOnUnmount) !== null && $ !== void 0
          ? $
          : V,
      I = kA(
        (0, ce.default)(
          (0, ce.default)({}, _),
          {},
          {
            initialPageParam:
              (W = j.initialCursor) !== null && W !== void 0 ? W : null,
            persister: j.persister,
            queryKey: H,
            queryFn: de
              ? q
              : (K) => {
                  var ae;
                  const ue = (0, ce.default)(
                    (0, ce.default)({}, _),
                    {},
                    {
                      trpc: (0, ce.default)(
                        (0, ce.default)({}, _?.trpc),
                        X ? { signal: K.signal } : { signal: null },
                      ),
                    },
                  );
                  return re.query(
                    ...Dt(H, ue, {
                      pageParam:
                        (ae = K.pageParam) !== null && ae !== void 0
                          ? ae
                          : j.initialCursor,
                      direction: K.direction,
                    }),
                  );
                },
          },
        ),
        M,
      );
    return ((I.trpc = nl({ path: L })), I);
  }
  function O(L, q, j) {
    var R, U, $;
    const Z = f(),
      W = Un(L, q, "infinite"),
      re = Z.queryClient.getQueryDefaults(W),
      oe = q === an,
      ie = p(W, (0, ce.default)((0, ce.default)({}, re), j)),
      M =
        (R =
          j == null || (U = j.trpc) === null || U === void 0
            ? void 0
            : U.abortOnUnmount) !== null && R !== void 0
          ? R
          : Z.abortOnUnmount;
    zA(
      (0, ce.default)(
        (0, ce.default)({}, j),
        {},
        {
          initialPageParam:
            ($ = j.initialCursor) !== null && $ !== void 0 ? $ : null,
          queryKey: W,
          queryFn: oe
            ? q
            : (V) => {
                var H;
                const le = (0, ce.default)(
                  (0, ce.default)({}, ie),
                  {},
                  {
                    trpc: (0, ce.default)(
                      (0, ce.default)({}, ie?.trpc),
                      M ? { signal: V.signal } : {},
                    ),
                  },
                );
                return Z.client.query(
                  ...Dt(W, le, {
                    pageParam:
                      (H = V.pageParam) !== null && H !== void 0
                        ? H
                        : j.initialCursor,
                    direction: V.direction,
                  }),
                );
              },
        },
      ),
    );
  }
  function D(L, q, j) {
    var R, U, $;
    const Z = f(),
      W = Un(L, q, "infinite"),
      re = Z.queryClient.getQueryDefaults(W),
      oe = p(W, (0, ce.default)((0, ce.default)({}, re), j)),
      ie =
        (R =
          j == null || (U = j.trpc) === null || U === void 0
            ? void 0
            : U.abortOnUnmount) !== null && R !== void 0
          ? R
          : Z.abortOnUnmount,
      M = TA(
        (0, ce.default)(
          (0, ce.default)({}, j),
          {},
          {
            initialPageParam:
              ($ = j.initialCursor) !== null && $ !== void 0 ? $ : null,
            queryKey: W,
            queryFn: (V) => {
              var H;
              const le = (0, ce.default)(
                (0, ce.default)({}, oe),
                {},
                {
                  trpc: (0, ce.default)(
                    (0, ce.default)({}, oe?.trpc),
                    ie ? { signal: V.signal } : {},
                  ),
                },
              );
              return Z.client.query(
                ...Dt(W, le, {
                  pageParam:
                    (H = V.pageParam) !== null && H !== void 0
                      ? H
                      : j.initialCursor,
                  direction: V.direction,
                }),
              );
            },
          },
        ),
        Z.queryClient,
      );
    return ((M.trpc = nl({ path: L })), [M.data, M]);
  }
  return {
    Provider: u,
    createClient: c,
    useContext: f,
    useUtils: f,
    useQuery: g,
    usePrefetchQuery: x,
    useSuspenseQuery: v,
    useQueries: (L, q) => {
      const { ssrState: j, queryClient: R, prefetchQuery: U, client: $ } = f(),
        Z = Hy($),
        W = L(Z);
      if (typeof window > "u" && j === "prepass")
        for (const oe of W) {
          var re;
          const ie = oe;
          ((re = ie.trpc) === null || re === void 0 ? void 0 : re.ssr) !== !1 &&
            !R.getQueryCache().find({ queryKey: ie.queryKey }) &&
            U(ie.queryKey, ie);
        }
      return g0(
        {
          queries: W.map((oe) =>
            (0, ce.default)(
              (0, ce.default)({}, oe),
              {},
              { queryKey: oe.queryKey },
            ),
          ),
          combine: q?.combine,
        },
        R,
      );
    },
    useSuspenseQueries: (L) => {
      const { queryClient: q, client: j } = f(),
        R = Hy(j),
        U = L(R),
        $ = MA(
          {
            queries: U.map((Z) =>
              (0, ce.default)(
                (0, ce.default)({}, Z),
                {},
                { queryFn: Z.queryFn, queryKey: Z.queryKey },
              ),
            ),
          },
          q,
        );
      return [$.map((Z) => Z.data), $];
    },
    useMutation: S,
    useSubscription: w,
    useInfiniteQuery: E,
    usePrefetchInfiniteQuery: O,
    useSuspenseInfiniteQuery: D,
  };
}
function rR(t) {
  const a = GN(t);
  return kh((s) =>
    s === "useContext" || s === "useUtils"
      ? () => {
          const o = t.useUtils();
          return y.useMemo(() => WN(o), [o]);
        }
      : t.hasOwnProperty(s)
        ? t[s]
        : a[s],
  );
}
function sR(t) {
  const a = aR();
  return rR(a);
}
class oR {
  constructor() {
    ((this.keyToValue = new Map()), (this.valueToKey = new Map()));
  }
  set(a, s) {
    (this.keyToValue.set(a, s), this.valueToKey.set(s, a));
  }
  getByKey(a) {
    return this.keyToValue.get(a);
  }
  getByValue(a) {
    return this.valueToKey.get(a);
  }
  clear() {
    (this.keyToValue.clear(), this.valueToKey.clear());
  }
}
class H0 {
  constructor(a) {
    ((this.generateIdentifier = a), (this.kv = new oR()));
  }
  register(a, s) {
    this.kv.getByValue(a) ||
      (s || (s = this.generateIdentifier(a)), this.kv.set(s, a));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(a) {
    return this.kv.getByValue(a);
  }
  getValue(a) {
    return this.kv.getByKey(a);
  }
}
class lR extends H0 {
  constructor() {
    (super((a) => a.name), (this.classToAllowedProps = new Map()));
  }
  register(a, s) {
    typeof s == "object"
      ? (s.allowProps && this.classToAllowedProps.set(a, s.allowProps),
        super.register(a, s.identifier))
      : super.register(a, s);
  }
  getAllowedProps(a) {
    return this.classToAllowedProps.get(a);
  }
}
function iR(t) {
  if ("values" in Object) return Object.values(t);
  const a = [];
  for (const s in t) t.hasOwnProperty(s) && a.push(t[s]);
  return a;
}
function cR(t, a) {
  const s = iR(t);
  if ("find" in s) return s.find(a);
  const o = s;
  for (let i = 0; i < o.length; i++) {
    const c = o[i];
    if (a(c)) return c;
  }
}
function $s(t, a) {
  Object.entries(t).forEach(([s, o]) => a(o, s));
}
function oc(t, a) {
  return t.indexOf(a) !== -1;
}
function Uy(t, a) {
  for (let s = 0; s < t.length; s++) {
    const o = t[s];
    if (a(o)) return o;
  }
}
class uR {
  constructor() {
    this.transfomers = {};
  }
  register(a) {
    this.transfomers[a.name] = a;
  }
  findApplicable(a) {
    return cR(this.transfomers, (s) => s.isApplicable(a));
  }
  findByName(a) {
    return this.transfomers[a];
  }
}
const dR = (t) => Object.prototype.toString.call(t).slice(8, -1),
  L0 = (t) => typeof t > "u",
  fR = (t) => t === null,
  fl = (t) =>
    typeof t != "object" || t === null || t === Object.prototype
      ? !1
      : Object.getPrototypeOf(t) === null
        ? !0
        : Object.getPrototypeOf(t) === Object.prototype,
  Ff = (t) => fl(t) && Object.keys(t).length === 0,
  lr = (t) => Array.isArray(t),
  hR = (t) => typeof t == "string",
  pR = (t) => typeof t == "number" && !isNaN(t),
  mR = (t) => typeof t == "boolean",
  gR = (t) => t instanceof RegExp,
  hl = (t) => t instanceof Map,
  pl = (t) => t instanceof Set,
  U0 = (t) => dR(t) === "Symbol",
  vR = (t) => t instanceof Date && !isNaN(t.valueOf()),
  B0 = (t) => t instanceof Error,
  By = (t) => typeof t == "number" && isNaN(t),
  yR = (t) => mR(t) || fR(t) || L0(t) || pR(t) || hR(t) || U0(t),
  xR = (t) => typeof t == "bigint",
  bR = (t) => t === 1 / 0 || t === -1 / 0,
  SR = (t) => ArrayBuffer.isView(t) && !(t instanceof DataView),
  wR = (t) => t instanceof URL,
  Xf = (t) => t.replace(/\\/g, "\\\\").replace(/\./g, "\\."),
  Ef = (t) => t.map(String).map(Xf).join("."),
  ol = (t, a) => {
    const s = [];
    let o = "";
    for (let c = 0; c < t.length; c++) {
      let u = t.charAt(c);
      if (!a && u === "\\") {
        const g = t.charAt(c + 1);
        if (g === "\\") {
          ((o += "\\"), c++);
          continue;
        } else if (g !== ".") throw Error("invalid path");
      }
      if (u === "\\" && t.charAt(c + 1) === ".") {
        ((o += "."), c++);
        continue;
      }
      if (u === ".") {
        (s.push(o), (o = ""));
        continue;
      }
      o += u;
    }
    const i = o;
    return (s.push(i), s);
  };
function Hn(t, a, s, o) {
  return { isApplicable: t, annotation: a, transform: s, untransform: o };
}
const q0 = [
  Hn(
    L0,
    "undefined",
    () => null,
    () => {},
  ),
  Hn(
    xR,
    "bigint",
    (t) => t.toString(),
    (t) =>
      typeof BigInt < "u"
        ? BigInt(t)
        : (console.error("Please add a BigInt polyfill."), t),
  ),
  Hn(
    vR,
    "Date",
    (t) => t.toISOString(),
    (t) => new Date(t),
  ),
  Hn(
    B0,
    "Error",
    (t, a) => {
      const s = { name: t.name, message: t.message };
      return (
        "cause" in t && (s.cause = t.cause),
        a.allowedErrorProps.forEach((o) => {
          s[o] = t[o];
        }),
        s
      );
    },
    (t, a) => {
      const s = new Error(t.message, { cause: t.cause });
      return (
        (s.name = t.name),
        (s.stack = t.stack),
        a.allowedErrorProps.forEach((o) => {
          s[o] = t[o];
        }),
        s
      );
    },
  ),
  Hn(
    gR,
    "regexp",
    (t) => "" + t,
    (t) => {
      const a = t.slice(1, t.lastIndexOf("/")),
        s = t.slice(t.lastIndexOf("/") + 1);
      return new RegExp(a, s);
    },
  ),
  Hn(
    pl,
    "set",
    (t) => [...t.values()],
    (t) => new Set(t),
  ),
  Hn(
    hl,
    "map",
    (t) => [...t.entries()],
    (t) => new Map(t),
  ),
  Hn(
    (t) => By(t) || bR(t),
    "number",
    (t) => (By(t) ? "NaN" : t > 0 ? "Infinity" : "-Infinity"),
    Number,
  ),
  Hn(
    (t) => t === 0 && 1 / t === -1 / 0,
    "number",
    () => "-0",
    Number,
  ),
  Hn(
    wR,
    "URL",
    (t) => t.toString(),
    (t) => new URL(t),
  ),
];
function zc(t, a, s, o) {
  return { isApplicable: t, annotation: a, transform: s, untransform: o };
}
const Q0 = zc(
    (t, a) => (U0(t) ? !!a.symbolRegistry.getIdentifier(t) : !1),
    (t, a) => ["symbol", a.symbolRegistry.getIdentifier(t)],
    (t) => t.description,
    (t, a, s) => {
      const o = s.symbolRegistry.getValue(a[1]);
      if (!o) throw new Error("Trying to deserialize unknown symbol");
      return o;
    },
  ),
  ER = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray,
  ].reduce((t, a) => ((t[a.name] = a), t), {}),
  V0 = zc(
    SR,
    (t) => ["typed-array", t.constructor.name],
    (t) => [...t],
    (t, a) => {
      const s = ER[a[1]];
      if (!s) throw new Error("Trying to deserialize unknown typed array");
      return new s(t);
    },
  );
function I0(t, a) {
  return t?.constructor ? !!a.classRegistry.getIdentifier(t.constructor) : !1;
}
const Y0 = zc(
    I0,
    (t, a) => ["class", a.classRegistry.getIdentifier(t.constructor)],
    (t, a) => {
      const s = a.classRegistry.getAllowedProps(t.constructor);
      if (!s) return { ...t };
      const o = {};
      return (
        s.forEach((i) => {
          o[i] = t[i];
        }),
        o
      );
    },
    (t, a, s) => {
      const o = s.classRegistry.getValue(a[1]);
      if (!o)
        throw new Error(
          `Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`,
        );
      return Object.assign(Object.create(o.prototype), t);
    },
  ),
  $0 = zc(
    (t, a) => !!a.customTransformerRegistry.findApplicable(t),
    (t, a) => ["custom", a.customTransformerRegistry.findApplicable(t).name],
    (t, a) => a.customTransformerRegistry.findApplicable(t).serialize(t),
    (t, a, s) => {
      const o = s.customTransformerRegistry.findByName(a[1]);
      if (!o) throw new Error("Trying to deserialize unknown custom value");
      return o.deserialize(t);
    },
  ),
  CR = [Y0, Q0, $0, V0],
  qy = (t, a) => {
    const s = Uy(CR, (i) => i.isApplicable(t, a));
    if (s) return { value: s.transform(t, a), type: s.annotation(t, a) };
    const o = Uy(q0, (i) => i.isApplicable(t, a));
    if (o) return { value: o.transform(t, a), type: o.annotation };
  },
  G0 = {};
q0.forEach((t) => {
  G0[t.annotation] = t;
});
const AR = (t, a, s) => {
    if (lr(a))
      switch (a[0]) {
        case "symbol":
          return Q0.untransform(t, a, s);
        case "class":
          return Y0.untransform(t, a, s);
        case "custom":
          return $0.untransform(t, a, s);
        case "typed-array":
          return V0.untransform(t, a, s);
        default:
          throw new Error("Unknown transformation: " + a);
      }
    else {
      const o = G0[a];
      if (!o) throw new Error("Unknown transformation: " + a);
      return o.untransform(t, s);
    }
  },
  Bs = (t, a) => {
    if (a > t.size) throw new Error("index out of bounds");
    const s = t.keys();
    for (; a > 0; ) (s.next(), a--);
    return s.next().value;
  };
function F0(t) {
  if (oc(t, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (oc(t, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (oc(t, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
const NR = (t, a) => {
    F0(a);
    for (let s = 0; s < a.length; s++) {
      const o = a[s];
      if (pl(t)) t = Bs(t, +o);
      else if (hl(t)) {
        const i = +o,
          c = +a[++s] == 0 ? "key" : "value",
          u = Bs(t, i);
        switch (c) {
          case "key":
            t = u;
            break;
          case "value":
            t = t.get(u);
            break;
        }
      } else t = t[o];
    }
    return t;
  },
  Kf = (t, a, s) => {
    if ((F0(a), a.length === 0)) return s(t);
    let o = t;
    for (let c = 0; c < a.length - 1; c++) {
      const u = a[c];
      if (lr(o)) {
        const f = +u;
        o = o[f];
      } else if (fl(o)) o = o[u];
      else if (pl(o)) {
        const f = +u;
        o = Bs(o, f);
      } else if (hl(o)) {
        if (c === a.length - 2) break;
        const p = +u,
          g = +a[++c] == 0 ? "key" : "value",
          x = Bs(o, p);
        switch (g) {
          case "key":
            o = x;
            break;
          case "value":
            o = o.get(x);
            break;
        }
      }
    }
    const i = a[a.length - 1];
    if ((lr(o) ? (o[+i] = s(o[+i])) : fl(o) && (o[i] = s(o[i])), pl(o))) {
      const c = Bs(o, +i),
        u = s(c);
      c !== u && (o.delete(c), o.add(u));
    }
    if (hl(o)) {
      const c = +a[a.length - 2],
        u = Bs(o, c);
      switch (+i == 0 ? "key" : "value") {
        case "key": {
          const p = s(u);
          (o.set(p, o.get(u)), p !== u && o.delete(u));
          break;
        }
        case "value": {
          o.set(u, s(o.get(u)));
          break;
        }
      }
    }
    return t;
  },
  X0 = (t) => t < 1;
function Zf(t, a, s, o = []) {
  if (!t) return;
  const i = X0(s);
  if (!lr(t)) {
    $s(t, (f, p) => Zf(f, a, s, [...o, ...ol(p, i)]));
    return;
  }
  const [c, u] = t;
  (u &&
    $s(u, (f, p) => {
      Zf(f, a, s, [...o, ...ol(p, i)]);
    }),
    a(c, o));
}
function RR(t, a, s, o) {
  return (
    Zf(
      a,
      (i, c) => {
        t = Kf(t, c, (u) => AR(u, i, o));
      },
      s,
    ),
    t
  );
}
function OR(t, a, s) {
  const o = X0(s);
  function i(c, u) {
    const f = NR(t, ol(u, o));
    c.map((p) => ol(p, o)).forEach((p) => {
      t = Kf(t, p, () => f);
    });
  }
  if (lr(a)) {
    const [c, u] = a;
    (c.forEach((f) => {
      t = Kf(t, ol(f, o), () => t);
    }),
      u && $s(u, i));
  } else $s(a, i);
  return t;
}
const _R = (t, a) => fl(t) || lr(t) || hl(t) || pl(t) || B0(t) || I0(t, a);
function jR(t, a, s) {
  const o = s.get(t);
  o ? o.push(a) : s.set(t, [a]);
}
function TR(t, a) {
  const s = {};
  let o;
  return (
    t.forEach((i) => {
      if (i.length <= 1) return;
      a ||
        (i = i.map((f) => f.map(String)).sort((f, p) => f.length - p.length));
      const [c, ...u] = i;
      c.length === 0 ? (o = u.map(Ef)) : (s[Ef(c)] = u.map(Ef));
    }),
    o ? (Ff(s) ? [o] : [o, s]) : Ff(s) ? void 0 : s
  );
}
const K0 = (t, a, s, o, i = [], c = [], u = new Map()) => {
  const f = yR(t);
  if (!f) {
    jR(t, i, a);
    const A = u.get(t);
    if (A) return o ? { transformedValue: null } : A;
  }
  if (!_R(t, s)) {
    const A = qy(t, s),
      N = A
        ? { transformedValue: A.value, annotations: [A.type] }
        : { transformedValue: t };
    return (f || u.set(t, N), N);
  }
  if (oc(c, t)) return { transformedValue: null };
  const p = qy(t, s),
    g = p?.value ?? t,
    x = lr(g) ? [] : {},
    v = {};
  $s(g, (A, N) => {
    if (N === "__proto__" || N === "constructor" || N === "prototype")
      throw new Error(
        `Detected property ${N}. This is a prototype pollution risk, please remove it from your object.`,
      );
    const w = K0(A, a, s, o, [...i, N], [...c, t], u);
    ((x[N] = w.transformedValue),
      lr(w.annotations)
        ? (v[Xf(N)] = w.annotations)
        : fl(w.annotations) &&
          $s(w.annotations, (E, O) => {
            v[Xf(N) + "." + O] = E;
          }));
  });
  const S = Ff(v)
    ? { transformedValue: x, annotations: p ? [p.type] : void 0 }
    : { transformedValue: x, annotations: p ? [p.type, v] : v };
  return (f || u.set(t, S), S);
};
function Z0(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function Qy(t) {
  return Z0(t) === "Array";
}
function MR(t) {
  if (Z0(t) !== "Object") return !1;
  const a = Object.getPrototypeOf(t);
  return !!a && a.constructor === Object && a === Object.prototype;
}
function DR(t, a, s, o, i) {
  const c = {}.propertyIsEnumerable.call(o, a) ? "enumerable" : "nonenumerable";
  (c === "enumerable" && (t[a] = s),
    i &&
      c === "nonenumerable" &&
      Object.defineProperty(t, a, {
        value: s,
        enumerable: !1,
        writable: !0,
        configurable: !0,
      }));
}
function Wf(t, a = {}) {
  if (Qy(t)) return t.map((i) => Wf(i, a));
  if (!MR(t)) return t;
  const s = Object.getOwnPropertyNames(t),
    o = Object.getOwnPropertySymbols(t);
  return [...s, ...o].reduce((i, c) => {
    if (c === "__proto__" || (Qy(a.props) && !a.props.includes(c))) return i;
    const u = t[c],
      f = Wf(u, a);
    return (DR(i, c, f, t, a.nonenumerable), i);
  }, {});
}
class Pe {
  constructor({ dedupe: a = !1 } = {}) {
    ((this.classRegistry = new lR()),
      (this.symbolRegistry = new H0((s) => s.description ?? "")),
      (this.customTransformerRegistry = new uR()),
      (this.allowedErrorProps = []),
      (this.dedupe = a));
  }
  serialize(a) {
    const s = new Map(),
      o = K0(a, s, this, this.dedupe),
      i = { json: o.transformedValue };
    o.annotations && (i.meta = { ...i.meta, values: o.annotations });
    const c = TR(s, this.dedupe);
    return (
      c && (i.meta = { ...i.meta, referentialEqualities: c }),
      i.meta && (i.meta.v = 1),
      i
    );
  }
  deserialize(a, s) {
    const { json: o, meta: i } = a;
    let c = s?.inPlace ? o : Wf(o);
    return (
      i?.values && (c = RR(c, i.values, i.v ?? 0, this)),
      i?.referentialEqualities &&
        (c = OR(c, i.referentialEqualities, i.v ?? 0)),
      c
    );
  }
  stringify(a) {
    return JSON.stringify(this.serialize(a));
  }
  parse(a) {
    return this.deserialize(JSON.parse(a), { inPlace: !0 });
  }
  registerClass(a, s) {
    this.classRegistry.register(a, s);
  }
  registerSymbol(a, s) {
    this.symbolRegistry.register(a, s);
  }
  registerCustom(a, s) {
    this.customTransformerRegistry.register({ name: s, ...a });
  }
  allowErrorProps(...a) {
    this.allowedErrorProps.push(...a);
  }
}
Pe.defaultInstance = new Pe();
Pe.serialize = Pe.defaultInstance.serialize.bind(Pe.defaultInstance);
Pe.deserialize = Pe.defaultInstance.deserialize.bind(Pe.defaultInstance);
Pe.stringify = Pe.defaultInstance.stringify.bind(Pe.defaultInstance);
Pe.parse = Pe.defaultInstance.parse.bind(Pe.defaultInstance);
Pe.registerClass = Pe.defaultInstance.registerClass.bind(Pe.defaultInstance);
Pe.registerSymbol = Pe.defaultInstance.registerSymbol.bind(Pe.defaultInstance);
Pe.registerCustom = Pe.defaultInstance.registerCustom.bind(Pe.defaultInstance);
Pe.allowErrorProps = Pe.defaultInstance.allowErrorProps.bind(
  Pe.defaultInstance,
);
Pe.serialize;
Pe.deserialize;
Pe.stringify;
Pe.parse;
Pe.registerClass;
Pe.registerCustom;
Pe.registerSymbol;
Pe.allowErrorProps;
const Yn = sR(),
  Vy = new CA(),
  zR = Yn.createClient({
    links: [
      DN({
        url: "/api/trpc",
        transformer: Pe,
        fetch(t, a) {
          return globalThis.fetch(t, { ...(a ?? {}), credentials: "include" });
        },
      }),
    ],
  });
function PR({ children: t }) {
  return m.jsx(Yn.Provider, {
    "code-path": "src/providers/trpc.tsx:28:5",
    client: zR,
    queryClient: Vy,
    children: m.jsx(AA, {
      "code-path": "src/providers/trpc.tsx:29:7",
      client: Vy,
      children: t,
    }),
  });
}
const kR = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  HR = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (a, s, o) =>
      o ? o.toUpperCase() : s.toLowerCase(),
    ),
  Iy = (t) => {
    const a = HR(t);
    return a.charAt(0).toUpperCase() + a.slice(1);
  },
  W0 = (...t) =>
    t
      .filter((a, s, o) => !!a && a.trim() !== "" && o.indexOf(a) === s)
      .join(" ")
      .trim(),
  LR = (t) => {
    for (const a in t)
      if (a.startsWith("aria-") || a === "role" || a === "title") return !0;
  };
var UR = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const BR = y.forwardRef(
  (
    {
      color: t = "currentColor",
      size: a = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: o,
      className: i = "",
      children: c,
      iconNode: u,
      ...f
    },
    p,
  ) =>
    y.createElement(
      "svg",
      {
        ref: p,
        ...UR,
        width: a,
        height: a,
        stroke: t,
        strokeWidth: o ? (Number(s) * 24) / Number(a) : s,
        className: W0("lucide", i),
        ...(!c && !LR(f) && { "aria-hidden": "true" }),
        ...f,
      },
      [
        ...u.map(([g, x]) => y.createElement(g, x)),
        ...(Array.isArray(c) ? c : [c]),
      ],
    ),
);
const Me = (t, a) => {
  const s = y.forwardRef(({ className: o, ...i }, c) =>
    y.createElement(BR, {
      ref: c,
      iconNode: a,
      className: W0(`lucide-${kR(Iy(t))}`, `lucide-${t}`, o),
      ...i,
    }),
  );
  return ((s.displayName = Iy(t)), s);
};
const qR = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }],
  ],
  QR = Me("chart-column", qR);
const VR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  J0 = Me("check", VR);
const IR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  Uh = Me("chevron-down", IR);
const YR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  $R = Me("chevron-right", YR);
const GR = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  eb = Me("chevron-up", GR);
const FR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  Jf = Me("circle-alert", FR);
const XR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  Gs = Me("circle-check", XR);
const KR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  ZR = Me("circle-x", KR);
const WR = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  Bh = Me("clock", WR);
const JR = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }],
  ],
  qs = Me("download", JR);
const eO = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    [
      "path",
      {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
        key: "a6xqqp",
      },
    ],
  ],
  tO = Me("external-link", eO);
const nO = [
    [
      "path",
      {
        d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
        key: "1vfytu",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    [
      "path",
      {
        d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
        key: "1etmh7",
      },
    ],
  ],
  Pc = Me("file-headphone", nO);
const aO = [
    ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        key: "oot6mr",
      },
    ],
    ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
    ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }],
  ],
  Yy = Me("hard-drive", aO);
const rO = [
    [
      "path",
      {
        d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
        key: "1xhozi",
      },
    ],
  ],
  ll = Me("headphones", rO);
const sO = [
    [
      "path",
      { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
    ],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }],
  ],
  tb = Me("history", sO);
const oO = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "r6nss1",
      },
    ],
  ],
  lO = Me("house", oO);
const iO = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }],
  ],
  nb = Me("info", iO);
const cO = [
    ["path", { d: "M16 5H3", key: "m91uny" }],
    ["path", { d: "M11 12H3", key: "51ecnj" }],
    ["path", { d: "M11 19H3", key: "zflm78" }],
    ["path", { d: "M21 16V5", key: "yxg4q8" }],
    ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }],
  ],
  ml = Me("list-music", cO);
const uO = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  Lr = Me("loader-circle", uO);
const dO = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  $y = Me("log-out", dO);
const fO = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  hO = Me("menu", fO);
const pO = [
    ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
    ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
    ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }],
  ],
  Ur = Me("music", pO);
const mO = [
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    [
      "path",
      {
        d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
        key: "2d38gg",
      },
    ],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  gO = Me("octagon-x", mO);
const vO = [
    [
      "path",
      {
        d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
        key: "1a0edw",
      },
    ],
    ["path", { d: "M12 22V12", key: "d0xqtd" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
    ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ],
  yO = Me("package", vO);
const xO = [
    ["path", { d: "M13 21h8", key: "1jsn5i" }],
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu",
      },
    ],
  ],
  ab = Me("pen-line", xO);
const bO = [
    [
      "path",
      { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
    ],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ],
  rb = Me("rotate-ccw", bO);
const SO = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  sb = Me("search", SO);
const wO = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  EO = Me("settings", wO);
const CO = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
  ],
  eh = Me("shield", CO);
const AO = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr",
      },
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
  ],
  kc = Me("sparkles", AO);
const NO = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  th = Me("trash-2", NO);
const RO = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq",
      },
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  OO = Me("triangle-alert", RO);
const _O = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  gl = Me("user", _O);
const jO = [
    [
      "path",
      {
        d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
        key: "ftymec",
      },
    ],
    [
      "rect",
      { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" },
    ],
  ],
  Hc = Me("video", jO);
const TO = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  MO = Me("x", TO);
const DO = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  qh = Me("zap", DO);
var zO = (t, a, s, o, i, c, u, f) => {
    let p = document.documentElement,
      g = ["light", "dark"];
    function x(A) {
      ((Array.isArray(t) ? t : [t]).forEach((N) => {
        let w = N === "class",
          E = w && c ? i.map((O) => c[O] || O) : i;
        w
          ? (p.classList.remove(...E), p.classList.add(c && c[A] ? c[A] : A))
          : p.setAttribute(N, A);
      }),
        v(A));
    }
    function v(A) {
      f && g.includes(A) && (p.style.colorScheme = A);
    }
    function S() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (o) x(o);
    else
      try {
        let A = localStorage.getItem(a) || s,
          N = u && A === "system" ? S() : A;
        x(N);
      } catch {}
  },
  PO = y.createContext(void 0),
  kO = { setTheme: (t) => {}, themes: [] },
  HO = () => {
    var t;
    return (t = y.useContext(PO)) != null ? t : kO;
  };
y.memo(
  ({
    forcedTheme: t,
    storageKey: a,
    attribute: s,
    enableSystem: o,
    enableColorScheme: i,
    defaultTheme: c,
    value: u,
    themes: f,
    nonce: p,
    scriptProps: g,
  }) => {
    let x = JSON.stringify([s, a, c, t, f, u, o, i]).slice(1, -1);
    return y.createElement("script", {
      ...g,
      suppressHydrationWarning: !0,
      nonce: typeof window > "u" ? p : "",
      dangerouslySetInnerHTML: { __html: `(${zO.toString()})(${x})` },
    });
  },
);
var Nl = Mx();
const ob = Tx(Nl);
function LO(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0],
    s = document.createElement("style");
  ((s.type = "text/css"),
    a.appendChild(s),
    s.styleSheet
      ? (s.styleSheet.cssText = t)
      : s.appendChild(document.createTextNode(t)));
}
const UO = (t) => {
    switch (t) {
      case "success":
        return QO;
      case "info":
        return IO;
      case "warning":
        return VO;
      case "error":
        return YO;
      default:
        return null;
    }
  },
  BO = Array(12).fill(0),
  qO = ({ visible: t, className: a }) =>
    se.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", a].filter(Boolean).join(" "),
        "data-visible": t,
      },
      se.createElement(
        "div",
        { className: "sonner-spinner" },
        BO.map((s, o) =>
          se.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${o}`,
          }),
        ),
      ),
    ),
  QO = se.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    se.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  VO = se.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    se.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  IO = se.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    se.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  YO = se.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    se.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  $O = se.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    se.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    se.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  GO = () => {
    const [t, a] = se.useState(document.hidden);
    return (
      se.useEffect(() => {
        const s = () => {
          a(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", s),
          () => window.removeEventListener("visibilitychange", s)
        );
      }, []),
      t
    );
  };
let nh = 1;
class FO {
  constructor() {
    ((this.subscribe = (a) => (
      this.subscribers.push(a),
      () => {
        const s = this.subscribers.indexOf(a);
        this.subscribers.splice(s, 1);
      }
    )),
      (this.publish = (a) => {
        this.subscribers.forEach((s) => s(a));
      }),
      (this.addToast = (a) => {
        (this.publish(a), (this.toasts = [...this.toasts, a]));
      }),
      (this.create = (a) => {
        var s;
        const { message: o, ...i } = a,
          c =
            typeof a?.id == "number" ||
            ((s = a.id) == null ? void 0 : s.length) > 0
              ? a.id
              : nh++,
          u = this.toasts.find((p) => p.id === c),
          f = a.dismissible === void 0 ? !0 : a.dismissible;
        return (
          this.dismissedToasts.has(c) && this.dismissedToasts.delete(c),
          u
            ? (this.toasts = this.toasts.map((p) =>
                p.id === c
                  ? (this.publish({ ...p, ...a, id: c, title: o }),
                    { ...p, ...a, id: c, dismissible: f, title: o })
                  : p,
              ))
            : this.addToast({ title: o, ...i, dismissible: f, id: c }),
          c
        );
      }),
      (this.dismiss = (a) => (
        a
          ? (this.dismissedToasts.add(a),
            requestAnimationFrame(() =>
              this.subscribers.forEach((s) => s({ id: a, dismiss: !0 })),
            ))
          : this.toasts.forEach((s) => {
              this.subscribers.forEach((o) => o({ id: s.id, dismiss: !0 }));
            }),
        a
      )),
      (this.message = (a, s) => this.create({ ...s, message: a })),
      (this.error = (a, s) => this.create({ ...s, message: a, type: "error" })),
      (this.success = (a, s) =>
        this.create({ ...s, type: "success", message: a })),
      (this.info = (a, s) => this.create({ ...s, type: "info", message: a })),
      (this.warning = (a, s) =>
        this.create({ ...s, type: "warning", message: a })),
      (this.loading = (a, s) =>
        this.create({ ...s, type: "loading", message: a })),
      (this.promise = (a, s) => {
        if (!s) return;
        let o;
        s.loading !== void 0 &&
          (o = this.create({
            ...s,
            promise: a,
            type: "loading",
            message: s.loading,
            description:
              typeof s.description != "function" ? s.description : void 0,
          }));
        const i = Promise.resolve(a instanceof Function ? a() : a);
        let c = o !== void 0,
          u;
        const f = i
            .then(async (g) => {
              if (((u = ["resolve", g]), se.isValidElement(g)))
                ((c = !1), this.create({ id: o, type: "default", message: g }));
              else if (KO(g) && !g.ok) {
                c = !1;
                const v =
                    typeof s.error == "function"
                      ? await s.error(`HTTP error! status: ${g.status}`)
                      : s.error,
                  S =
                    typeof s.description == "function"
                      ? await s.description(`HTTP error! status: ${g.status}`)
                      : s.description,
                  N =
                    typeof v == "object" && !se.isValidElement(v)
                      ? v
                      : { message: v };
                this.create({ id: o, type: "error", description: S, ...N });
              } else if (g instanceof Error) {
                c = !1;
                const v =
                    typeof s.error == "function" ? await s.error(g) : s.error,
                  S =
                    typeof s.description == "function"
                      ? await s.description(g)
                      : s.description,
                  N =
                    typeof v == "object" && !se.isValidElement(v)
                      ? v
                      : { message: v };
                this.create({ id: o, type: "error", description: S, ...N });
              } else if (s.success !== void 0) {
                c = !1;
                const v =
                    typeof s.success == "function"
                      ? await s.success(g)
                      : s.success,
                  S =
                    typeof s.description == "function"
                      ? await s.description(g)
                      : s.description,
                  N =
                    typeof v == "object" && !se.isValidElement(v)
                      ? v
                      : { message: v };
                this.create({ id: o, type: "success", description: S, ...N });
              }
            })
            .catch(async (g) => {
              if (((u = ["reject", g]), s.error !== void 0)) {
                c = !1;
                const x =
                    typeof s.error == "function" ? await s.error(g) : s.error,
                  v =
                    typeof s.description == "function"
                      ? await s.description(g)
                      : s.description,
                  A =
                    typeof x == "object" && !se.isValidElement(x)
                      ? x
                      : { message: x };
                this.create({ id: o, type: "error", description: v, ...A });
              }
            })
            .finally(() => {
              (c && (this.dismiss(o), (o = void 0)),
                s.finally == null || s.finally.call(s));
            }),
          p = () =>
            new Promise((g, x) =>
              f.then(() => (u[0] === "reject" ? x(u[1]) : g(u[1]))).catch(x),
            );
        return typeof o != "string" && typeof o != "number"
          ? { unwrap: p }
          : Object.assign(o, { unwrap: p });
      }),
      (this.custom = (a, s) => {
        const o = s?.id || nh++;
        return (this.create({ jsx: a(o), id: o, ...s }), o);
      }),
      (this.getActiveToasts = () =>
        this.toasts.filter((a) => !this.dismissedToasts.has(a.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()));
  }
}
const It = new FO(),
  XO = (t, a) => {
    const s = a?.id || nh++;
    return (It.addToast({ title: t, ...a, id: s }), s);
  },
  KO = (t) =>
    t &&
    typeof t == "object" &&
    "ok" in t &&
    typeof t.ok == "boolean" &&
    "status" in t &&
    typeof t.status == "number",
  ZO = XO,
  WO = () => It.toasts,
  JO = () => It.getActiveToasts(),
  Vn = Object.assign(
    ZO,
    {
      success: It.success,
      info: It.info,
      warning: It.warning,
      error: It.error,
      custom: It.custom,
      message: It.message,
      promise: It.promise,
      dismiss: It.dismiss,
      loading: It.loading,
    },
    { getHistory: WO, getToasts: JO },
  );
LO(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}",
);
function Gi(t) {
  return t.label !== void 0;
}
const e_ = 3,
  t_ = "24px",
  n_ = "16px",
  Gy = 4e3,
  a_ = 356,
  r_ = 14,
  s_ = 45,
  o_ = 200;
function Ln(...t) {
  return t.filter(Boolean).join(" ");
}
function l_(t) {
  const [a, s] = t.split("-"),
    o = [];
  return (a && o.push(a), s && o.push(s), o);
}
const i_ = (t) => {
  var a, s, o, i, c, u, f, p, g;
  const {
      invert: x,
      toast: v,
      unstyled: S,
      interacting: A,
      setHeights: N,
      visibleToasts: w,
      heights: E,
      index: O,
      toasts: D,
      expanded: P,
      removeToast: G,
      defaultRichColors: L,
      closeButton: q,
      style: j,
      cancelButtonStyle: R,
      actionButtonStyle: U,
      className: $ = "",
      descriptionClassName: Z = "",
      duration: W,
      position: re,
      gap: oe,
      expandByDefault: ie,
      classNames: M,
      icons: V,
      closeButtonAriaLabel: H = "Close toast",
    } = t,
    [le, de] = se.useState(null),
    [_, X] = se.useState(null),
    [I, K] = se.useState(!1),
    [ae, ue] = se.useState(!1),
    [ne, fe] = se.useState(!1),
    [xe, Ee] = se.useState(!1),
    [Ne, _e] = se.useState(!1),
    [yt, ft] = se.useState(0),
    [ta, jn] = se.useState(0),
    yn = se.useRef(v.duration || W || Gy),
    ro = se.useRef(null),
    $t = se.useRef(null),
    so = O === 0,
    oo = O + 1 <= w,
    _t = v.type,
    Oa = v.dismissible !== !1,
    jt = v.className || "",
    Zc = v.descriptionClassName || "",
    hr = se.useMemo(
      () => E.findIndex((be) => be.toastId === v.id) || 0,
      [E, v.id],
    ),
    Ol = se.useMemo(() => {
      var be;
      return (be = v.closeButton) != null ? be : q;
    }, [v.closeButton, q]),
    pr = se.useMemo(() => v.duration || W || Gy, [v.duration, W]),
    lo = se.useRef(0),
    na = se.useRef(0),
    _l = se.useRef(0),
    _a = se.useRef(null),
    [mr, Tt] = re.split("-"),
    xn = se.useMemo(
      () => E.reduce((be, Ze, mt) => (mt >= hr ? be : be + Ze.height), 0),
      [E, hr],
    ),
    At = GO(),
    Wc = v.invert || x,
    io = _t === "loading";
  ((na.current = se.useMemo(() => hr * oe + xn, [hr, xn])),
    se.useEffect(() => {
      yn.current = pr;
    }, [pr]),
    se.useEffect(() => {
      K(!0);
    }, []),
    se.useEffect(() => {
      const be = $t.current;
      if (be) {
        const Ze = be.getBoundingClientRect().height;
        return (
          jn(Ze),
          N((mt) => [
            { toastId: v.id, height: Ze, position: v.position },
            ...mt,
          ]),
          () => N((mt) => mt.filter((Nt) => Nt.toastId !== v.id))
        );
      }
    }, [N, v.id]),
    se.useLayoutEffect(() => {
      if (!I) return;
      const be = $t.current,
        Ze = be.style.height;
      be.style.height = "auto";
      const mt = be.getBoundingClientRect().height;
      ((be.style.height = Ze),
        jn(mt),
        N((Nt) =>
          Nt.find((Je) => Je.toastId === v.id)
            ? Nt.map((Je) => (Je.toastId === v.id ? { ...Je, height: mt } : Je))
            : [{ toastId: v.id, height: mt, position: v.position }, ...Nt],
        ));
    }, [I, v.title, v.description, N, v.id, v.jsx, v.action, v.cancel]));
  const Tn = se.useCallback(() => {
    (ue(!0),
      ft(na.current),
      N((be) => be.filter((Ze) => Ze.toastId !== v.id)),
      setTimeout(() => {
        G(v);
      }, o_));
  }, [v, G, N, na]);
  (se.useEffect(() => {
    if (
      (v.promise && _t === "loading") ||
      v.duration === 1 / 0 ||
      v.type === "loading"
    )
      return;
    let be;
    return (
      P || A || At
        ? (() => {
            if (_l.current < lo.current) {
              const Nt = new Date().getTime() - lo.current;
              yn.current = yn.current - Nt;
            }
            _l.current = new Date().getTime();
          })()
        : yn.current !== 1 / 0 &&
          ((lo.current = new Date().getTime()),
          (be = setTimeout(() => {
            (v.onAutoClose == null || v.onAutoClose.call(v, v), Tn());
          }, yn.current))),
      () => clearTimeout(be)
    );
  }, [P, A, v, _t, At, Tn]),
    se.useEffect(() => {
      v.delete && (Tn(), v.onDismiss == null || v.onDismiss.call(v, v));
    }, [Tn, v.delete]));
  function Fr() {
    var be;
    if (V?.loading) {
      var Ze;
      return se.createElement(
        "div",
        {
          className: Ln(
            M?.loader,
            v == null || (Ze = v.classNames) == null ? void 0 : Ze.loader,
            "sonner-loader",
          ),
          "data-visible": _t === "loading",
        },
        V.loading,
      );
    }
    return se.createElement(qO, {
      className: Ln(
        M?.loader,
        v == null || (be = v.classNames) == null ? void 0 : be.loader,
      ),
      visible: _t === "loading",
    });
  }
  const Xr = v.icon || V?.[_t] || UO(_t);
  var gr, Mn;
  return se.createElement(
    "li",
    {
      tabIndex: 0,
      ref: $t,
      className: Ln(
        $,
        jt,
        M?.toast,
        v == null || (a = v.classNames) == null ? void 0 : a.toast,
        M?.default,
        M?.[_t],
        v == null || (s = v.classNames) == null ? void 0 : s[_t],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (gr = v.richColors) != null ? gr : L,
      "data-styled": !(v.jsx || v.unstyled || S),
      "data-mounted": I,
      "data-promise": !!v.promise,
      "data-swiped": Ne,
      "data-removed": ae,
      "data-visible": oo,
      "data-y-position": mr,
      "data-x-position": Tt,
      "data-index": O,
      "data-front": so,
      "data-swiping": ne,
      "data-dismissible": Oa,
      "data-type": _t,
      "data-invert": Wc,
      "data-swipe-out": xe,
      "data-swipe-direction": _,
      "data-expanded": !!(P || (ie && I)),
      "data-testid": v.testId,
      style: {
        "--index": O,
        "--toasts-before": O,
        "--z-index": D.length - O,
        "--offset": `${ae ? yt : na.current}px`,
        "--initial-height": ie ? "auto" : `${ta}px`,
        ...j,
        ...v.style,
      },
      onDragEnd: () => {
        (fe(!1), de(null), (_a.current = null));
      },
      onPointerDown: (be) => {
        be.button !== 2 &&
          (io ||
            !Oa ||
            ((ro.current = new Date()),
            ft(na.current),
            be.target.setPointerCapture(be.pointerId),
            be.target.tagName !== "BUTTON" &&
              (fe(!0), (_a.current = { x: be.clientX, y: be.clientY }))));
      },
      onPointerUp: () => {
        var be, Ze, mt;
        if (xe || !Oa) return;
        _a.current = null;
        const Nt = Number(
            ((be = $t.current) == null
              ? void 0
              : be.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0,
          ),
          ja = Number(
            ((Ze = $t.current) == null
              ? void 0
              : Ze.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0,
          ),
          Je =
            new Date().getTime() -
            ((mt = ro.current) == null ? void 0 : mt.getTime()),
          zt = le === "x" ? Nt : ja,
          vr = Math.abs(zt) / Je;
        if (Math.abs(zt) >= s_ || vr > 0.11) {
          (ft(na.current),
            v.onDismiss == null || v.onDismiss.call(v, v),
            X(
              le === "x" ? (Nt > 0 ? "right" : "left") : ja > 0 ? "down" : "up",
            ),
            Tn(),
            Ee(!0));
          return;
        } else {
          var Pt, kt;
          ((Pt = $t.current) == null ||
            Pt.style.setProperty("--swipe-amount-x", "0px"),
            (kt = $t.current) == null ||
              kt.style.setProperty("--swipe-amount-y", "0px"));
        }
        (_e(!1), fe(!1), de(null));
      },
      onPointerMove: (be) => {
        var Ze, mt, Nt;
        if (
          !_a.current ||
          !Oa ||
          ((Ze = window.getSelection()) == null
            ? void 0
            : Ze.toString().length) > 0
        )
          return;
        const Je = be.clientY - _a.current.y,
          zt = be.clientX - _a.current.x;
        var vr;
        const Pt = (vr = t.swipeDirections) != null ? vr : l_(re);
        !le &&
          (Math.abs(zt) > 1 || Math.abs(Je) > 1) &&
          de(Math.abs(zt) > Math.abs(Je) ? "x" : "y");
        let kt = { x: 0, y: 0 };
        const Kr = (bn) => 1 / (1.5 + Math.abs(bn) / 20);
        if (le === "y") {
          if (Pt.includes("top") || Pt.includes("bottom"))
            if (
              (Pt.includes("top") && Je < 0) ||
              (Pt.includes("bottom") && Je > 0)
            )
              kt.y = Je;
            else {
              const bn = Je * Kr(Je);
              kt.y = Math.abs(bn) < Math.abs(Je) ? bn : Je;
            }
        } else if (le === "x" && (Pt.includes("left") || Pt.includes("right")))
          if (
            (Pt.includes("left") && zt < 0) ||
            (Pt.includes("right") && zt > 0)
          )
            kt.x = zt;
          else {
            const bn = zt * Kr(zt);
            kt.x = Math.abs(bn) < Math.abs(zt) ? bn : zt;
          }
        ((Math.abs(kt.x) > 0 || Math.abs(kt.y) > 0) && _e(!0),
          (mt = $t.current) == null ||
            mt.style.setProperty("--swipe-amount-x", `${kt.x}px`),
          (Nt = $t.current) == null ||
            Nt.style.setProperty("--swipe-amount-y", `${kt.y}px`));
      },
    },
    Ol && !v.jsx && _t !== "loading"
      ? se.createElement(
          "button",
          {
            "aria-label": H,
            "data-disabled": io,
            "data-close-button": !0,
            onClick:
              io || !Oa
                ? () => {}
                : () => {
                    (Tn(), v.onDismiss == null || v.onDismiss.call(v, v));
                  },
            className: Ln(
              M?.closeButton,
              v == null || (o = v.classNames) == null ? void 0 : o.closeButton,
            ),
          },
          (Mn = V?.close) != null ? Mn : $O,
        )
      : null,
    (_t || v.icon || v.promise) &&
      v.icon !== null &&
      (V?.[_t] !== null || v.icon)
      ? se.createElement(
          "div",
          {
            "data-icon": "",
            className: Ln(
              M?.icon,
              v == null || (i = v.classNames) == null ? void 0 : i.icon,
            ),
          },
          v.promise || (v.type === "loading" && !v.icon)
            ? v.icon || Fr()
            : null,
          v.type !== "loading" ? Xr : null,
        )
      : null,
    se.createElement(
      "div",
      {
        "data-content": "",
        className: Ln(
          M?.content,
          v == null || (c = v.classNames) == null ? void 0 : c.content,
        ),
      },
      se.createElement(
        "div",
        {
          "data-title": "",
          className: Ln(
            M?.title,
            v == null || (u = v.classNames) == null ? void 0 : u.title,
          ),
        },
        v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title,
      ),
      v.description
        ? se.createElement(
            "div",
            {
              "data-description": "",
              className: Ln(
                Z,
                Zc,
                M?.description,
                v == null || (f = v.classNames) == null
                  ? void 0
                  : f.description,
              ),
            },
            typeof v.description == "function"
              ? v.description()
              : v.description,
          )
        : null,
    ),
    se.isValidElement(v.cancel)
      ? v.cancel
      : v.cancel && Gi(v.cancel)
        ? se.createElement(
            "button",
            {
              "data-button": !0,
              "data-cancel": !0,
              style: v.cancelButtonStyle || R,
              onClick: (be) => {
                Gi(v.cancel) &&
                  Oa &&
                  (v.cancel.onClick == null ||
                    v.cancel.onClick.call(v.cancel, be),
                  Tn());
              },
              className: Ln(
                M?.cancelButton,
                v == null || (p = v.classNames) == null
                  ? void 0
                  : p.cancelButton,
              ),
            },
            v.cancel.label,
          )
        : null,
    se.isValidElement(v.action)
      ? v.action
      : v.action && Gi(v.action)
        ? se.createElement(
            "button",
            {
              "data-button": !0,
              "data-action": !0,
              style: v.actionButtonStyle || U,
              onClick: (be) => {
                Gi(v.action) &&
                  (v.action.onClick == null ||
                    v.action.onClick.call(v.action, be),
                  !be.defaultPrevented && Tn());
              },
              className: Ln(
                M?.actionButton,
                v == null || (g = v.classNames) == null
                  ? void 0
                  : g.actionButton,
              ),
            },
            v.action.label,
          )
        : null,
  );
};
function Fy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t
    ? window.getComputedStyle(document.documentElement).direction
    : t;
}
function c_(t, a) {
  const s = {};
  return (
    [t, a].forEach((o, i) => {
      const c = i === 1,
        u = c ? "--mobile-offset" : "--offset",
        f = c ? n_ : t_;
      function p(g) {
        ["top", "right", "bottom", "left"].forEach((x) => {
          s[`${u}-${x}`] = typeof g == "number" ? `${g}px` : g;
        });
      }
      typeof o == "number" || typeof o == "string"
        ? p(o)
        : typeof o == "object"
          ? ["top", "right", "bottom", "left"].forEach((g) => {
              o[g] === void 0
                ? (s[`${u}-${g}`] = f)
                : (s[`${u}-${g}`] =
                    typeof o[g] == "number" ? `${o[g]}px` : o[g]);
            })
          : p(f);
    }),
    s
  );
}
const u_ = se.forwardRef(function (a, s) {
    const {
        id: o,
        invert: i,
        position: c = "bottom-right",
        hotkey: u = ["altKey", "KeyT"],
        expand: f,
        closeButton: p,
        className: g,
        offset: x,
        mobileOffset: v,
        theme: S = "light",
        richColors: A,
        duration: N,
        style: w,
        visibleToasts: E = e_,
        toastOptions: O,
        dir: D = Fy(),
        gap: P = r_,
        icons: G,
        containerAriaLabel: L = "Notifications",
      } = a,
      [q, j] = se.useState([]),
      R = se.useMemo(
        () =>
          o
            ? q.filter((I) => I.toasterId === o)
            : q.filter((I) => !I.toasterId),
        [q, o],
      ),
      U = se.useMemo(
        () =>
          Array.from(
            new Set(
              [c].concat(R.filter((I) => I.position).map((I) => I.position)),
            ),
          ),
        [R, c],
      ),
      [$, Z] = se.useState([]),
      [W, re] = se.useState(!1),
      [oe, ie] = se.useState(!1),
      [M, V] = se.useState(
        S !== "system"
          ? S
          : typeof window < "u" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
      ),
      H = se.useRef(null),
      le = u.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      de = se.useRef(null),
      _ = se.useRef(!1),
      X = se.useCallback((I) => {
        j((K) => {
          var ae;
          return (
            ((ae = K.find((ue) => ue.id === I.id)) != null && ae.delete) ||
              It.dismiss(I.id),
            K.filter(({ id: ue }) => ue !== I.id)
          );
        });
      }, []);
    return (
      se.useEffect(
        () =>
          It.subscribe((I) => {
            if (I.dismiss) {
              requestAnimationFrame(() => {
                j((K) =>
                  K.map((ae) => (ae.id === I.id ? { ...ae, delete: !0 } : ae)),
                );
              });
              return;
            }
            setTimeout(() => {
              ob.flushSync(() => {
                j((K) => {
                  const ae = K.findIndex((ue) => ue.id === I.id);
                  return ae !== -1
                    ? [
                        ...K.slice(0, ae),
                        { ...K[ae], ...I },
                        ...K.slice(ae + 1),
                      ]
                    : [I, ...K];
                });
              });
            });
          }),
        [q],
      ),
      se.useEffect(() => {
        if (S !== "system") {
          V(S);
          return;
        }
        if (
          (S === "system" &&
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? V("dark")
              : V("light")),
          typeof window > "u")
        )
          return;
        const I = window.matchMedia("(prefers-color-scheme: dark)");
        try {
          I.addEventListener("change", ({ matches: K }) => {
            V(K ? "dark" : "light");
          });
        } catch {
          I.addListener(({ matches: ae }) => {
            try {
              V(ae ? "dark" : "light");
            } catch (ue) {
              console.error(ue);
            }
          });
        }
      }, [S]),
      se.useEffect(() => {
        q.length <= 1 && re(!1);
      }, [q]),
      se.useEffect(() => {
        const I = (K) => {
          var ae;
          if (u.every((fe) => K[fe] || K.code === fe)) {
            var ne;
            (re(!0), (ne = H.current) == null || ne.focus());
          }
          K.code === "Escape" &&
            (document.activeElement === H.current ||
              ((ae = H.current) != null &&
                ae.contains(document.activeElement))) &&
            re(!1);
        };
        return (
          document.addEventListener("keydown", I),
          () => document.removeEventListener("keydown", I)
        );
      }, [u]),
      se.useEffect(() => {
        if (H.current)
          return () => {
            de.current &&
              (de.current.focus({ preventScroll: !0 }),
              (de.current = null),
              (_.current = !1));
          };
      }, [H.current]),
      se.createElement(
        "section",
        {
          ref: s,
          "aria-label": `${L} ${le}`,
          tabIndex: -1,
          "aria-live": "polite",
          "aria-relevant": "additions text",
          "aria-atomic": "false",
          suppressHydrationWarning: !0,
        },
        U.map((I, K) => {
          var ae;
          const [ue, ne] = I.split("-");
          return R.length
            ? se.createElement(
                "ol",
                {
                  key: I,
                  dir: D === "auto" ? Fy() : D,
                  tabIndex: -1,
                  ref: H,
                  className: g,
                  "data-sonner-toaster": !0,
                  "data-sonner-theme": M,
                  "data-y-position": ue,
                  "data-x-position": ne,
                  style: {
                    "--front-toast-height": `${((ae = $[0]) == null ? void 0 : ae.height) || 0}px`,
                    "--width": `${a_}px`,
                    "--gap": `${P}px`,
                    ...w,
                    ...c_(x, v),
                  },
                  onBlur: (fe) => {
                    _.current &&
                      !fe.currentTarget.contains(fe.relatedTarget) &&
                      ((_.current = !1),
                      de.current &&
                        (de.current.focus({ preventScroll: !0 }),
                        (de.current = null)));
                  },
                  onFocus: (fe) => {
                    (fe.target instanceof HTMLElement &&
                      fe.target.dataset.dismissible === "false") ||
                      _.current ||
                      ((_.current = !0), (de.current = fe.relatedTarget));
                  },
                  onMouseEnter: () => re(!0),
                  onMouseMove: () => re(!0),
                  onMouseLeave: () => {
                    oe || re(!1);
                  },
                  onDragEnd: () => re(!1),
                  onPointerDown: (fe) => {
                    (fe.target instanceof HTMLElement &&
                      fe.target.dataset.dismissible === "false") ||
                      ie(!0);
                  },
                  onPointerUp: () => ie(!1),
                },
                R.filter(
                  (fe) => (!fe.position && K === 0) || fe.position === I,
                ).map((fe, xe) => {
                  var Ee, Ne;
                  return se.createElement(i_, {
                    key: fe.id,
                    icons: G,
                    index: xe,
                    toast: fe,
                    defaultRichColors: A,
                    duration: (Ee = O?.duration) != null ? Ee : N,
                    className: O?.className,
                    descriptionClassName: O?.descriptionClassName,
                    invert: i,
                    visibleToasts: E,
                    closeButton: (Ne = O?.closeButton) != null ? Ne : p,
                    interacting: oe,
                    position: I,
                    style: O?.style,
                    unstyled: O?.unstyled,
                    classNames: O?.classNames,
                    cancelButtonStyle: O?.cancelButtonStyle,
                    actionButtonStyle: O?.actionButtonStyle,
                    closeButtonAriaLabel: O?.closeButtonAriaLabel,
                    removeToast: X,
                    toasts: R.filter((_e) => _e.position == fe.position),
                    heights: $.filter((_e) => _e.position == fe.position),
                    setHeights: Z,
                    expandByDefault: f,
                    gap: P,
                    expanded: W,
                    swipeDirections: a.swipeDirections,
                  });
                }),
              )
            : null;
        }),
      )
    );
  }),
  d_ = ({ ...t }) => {
    const { theme: a = "system" } = HO();
    return m.jsx(u_, {
      "code-path": "src/components/ui/sonner.tsx:15:5",
      theme: a,
      className: "toaster group",
      icons: {
        success: m.jsx(Gs, {
          "code-path": "src/components/ui/sonner.tsx:19:18",
          className: "size-4",
        }),
        info: m.jsx(nb, {
          "code-path": "src/components/ui/sonner.tsx:20:15",
          className: "size-4",
        }),
        warning: m.jsx(OO, {
          "code-path": "src/components/ui/sonner.tsx:21:18",
          className: "size-4",
        }),
        error: m.jsx(gO, {
          "code-path": "src/components/ui/sonner.tsx:22:16",
          className: "size-4",
        }),
        loading: m.jsx(Lr, {
          "code-path": "src/components/ui/sonner.tsx:23:18",
          className: "size-4 animate-spin",
        }),
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
      },
      ...t,
    });
  };
function Xy(t, a) {
  if (typeof t == "function") return t(a);
  t != null && (t.current = a);
}
function Ws(...t) {
  return (a) => {
    let s = !1;
    const o = t.map((i) => {
      const c = Xy(i, a);
      return (!s && typeof c == "function" && (s = !0), c);
    });
    if (s)
      return () => {
        for (let i = 0; i < o.length; i++) {
          const c = o[i];
          typeof c == "function" ? c() : Xy(t[i], null);
        }
      };
  };
}
function qe(...t) {
  return y.useCallback(Ws(...t), t);
}
var f_ = Symbol.for("react.lazy"),
  pc = Nc[" use ".trim().toString()];
function h_(t) {
  return typeof t == "object" && t !== null && "then" in t;
}
function lb(t) {
  return (
    t != null &&
    typeof t == "object" &&
    "$$typeof" in t &&
    t.$$typeof === f_ &&
    "_payload" in t &&
    h_(t._payload)
  );
}
function Qh(t) {
  const a = m_(t),
    s = y.forwardRef((o, i) => {
      let { children: c, ...u } = o;
      lb(c) && typeof pc == "function" && (c = pc(c._payload));
      const f = y.Children.toArray(c),
        p = f.find(v_);
      if (p) {
        const g = p.props.children,
          x = f.map((v) =>
            v === p
              ? y.Children.count(g) > 1
                ? y.Children.only(null)
                : y.isValidElement(g)
                  ? g.props.children
                  : null
              : v,
          );
        return m.jsx(a, {
          ...u,
          ref: i,
          children: y.isValidElement(g) ? y.cloneElement(g, void 0, x) : null,
        });
      }
      return m.jsx(a, { ...u, ref: i, children: c });
    });
  return ((s.displayName = `${t}.Slot`), s);
}
var p_ = Qh("Slot");
function m_(t) {
  const a = y.forwardRef((s, o) => {
    let { children: i, ...c } = s;
    if (
      (lb(i) && typeof pc == "function" && (i = pc(i._payload)),
      y.isValidElement(i))
    ) {
      const u = x_(i),
        f = y_(c, i.props);
      return (
        i.type !== y.Fragment && (f.ref = o ? Ws(o, u) : u),
        y.cloneElement(i, f)
      );
    }
    return y.Children.count(i) > 1 ? y.Children.only(null) : null;
  });
  return ((a.displayName = `${t}.SlotClone`), a);
}
var g_ = Symbol("radix.slottable");
function v_(t) {
  return (
    y.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === g_
  );
}
function y_(t, a) {
  const s = { ...a };
  for (const o in a) {
    const i = t[o],
      c = a[o];
    /^on[A-Z]/.test(o)
      ? i && c
        ? (s[o] = (...f) => {
            const p = c(...f);
            return (i(...f), p);
          })
        : i && (s[o] = i)
      : o === "style"
        ? (s[o] = { ...i, ...c })
        : o === "className" && (s[o] = [i, c].filter(Boolean).join(" "));
  }
  return { ...t, ...s };
}
function x_(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
function ib(t) {
  var a,
    s,
    o = "";
  if (typeof t == "string" || typeof t == "number") o += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var i = t.length;
      for (a = 0; a < i; a++)
        t[a] && (s = ib(t[a])) && (o && (o += " "), (o += s));
    } else for (s in t) t[s] && (o && (o += " "), (o += s));
  return o;
}
function cb() {
  for (var t, a, s = 0, o = "", i = arguments.length; s < i; s++)
    (t = arguments[s]) && (a = ib(t)) && (o && (o += " "), (o += a));
  return o;
}
const Ky = (t) => (typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t),
  Zy = cb,
  b_ = (t, a) => (s) => {
    var o;
    if (a?.variants == null) return Zy(t, s?.class, s?.className);
    const { variants: i, defaultVariants: c } = a,
      u = Object.keys(i).map((g) => {
        const x = s?.[g],
          v = c?.[g];
        if (x === null) return null;
        const S = Ky(x) || Ky(v);
        return i[g][S];
      }),
      f =
        s &&
        Object.entries(s).reduce((g, x) => {
          let [v, S] = x;
          return (S === void 0 || (g[v] = S), g);
        }, {}),
      p =
        a == null || (o = a.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((g, x) => {
              let { class: v, className: S, ...A } = x;
              return Object.entries(A).every((N) => {
                let [w, E] = N;
                return Array.isArray(E)
                  ? E.includes({ ...c, ...f }[w])
                  : { ...c, ...f }[w] === E;
              })
                ? [...g, v, S]
                : g;
            }, []);
    return Zy(t, u, p, s?.class, s?.className);
  },
  S_ = (t, a) => {
    const s = new Array(t.length + a.length);
    for (let o = 0; o < t.length; o++) s[o] = t[o];
    for (let o = 0; o < a.length; o++) s[t.length + o] = a[o];
    return s;
  },
  w_ = (t, a) => ({ classGroupId: t, validator: a }),
  ub = (t = new Map(), a = null, s) => ({
    nextPart: t,
    validators: a,
    classGroupId: s,
  }),
  mc = "-",
  Wy = [],
  E_ = "arbitrary..",
  C_ = (t) => {
    const a = N_(t),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: o } = t;
    return {
      getClassGroupId: (u) => {
        if (u.startsWith("[") && u.endsWith("]")) return A_(u);
        const f = u.split(mc),
          p = f[0] === "" && f.length > 1 ? 1 : 0;
        return db(f, p, a);
      },
      getConflictingClassGroupIds: (u, f) => {
        if (f) {
          const p = o[u],
            g = s[u];
          return p ? (g ? S_(g, p) : p) : g || Wy;
        }
        return s[u] || Wy;
      },
    };
  },
  db = (t, a, s) => {
    if (t.length - a === 0) return s.classGroupId;
    const i = t[a],
      c = s.nextPart.get(i);
    if (c) {
      const g = db(t, a + 1, c);
      if (g) return g;
    }
    const u = s.validators;
    if (u === null) return;
    const f = a === 0 ? t.join(mc) : t.slice(a).join(mc),
      p = u.length;
    for (let g = 0; g < p; g++) {
      const x = u[g];
      if (x.validator(f)) return x.classGroupId;
    }
  },
  A_ = (t) =>
    t.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const a = t.slice(1, -1),
            s = a.indexOf(":"),
            o = a.slice(0, s);
          return o ? E_ + o : void 0;
        })(),
  N_ = (t) => {
    const { theme: a, classGroups: s } = t;
    return R_(s, a);
  },
  R_ = (t, a) => {
    const s = ub();
    for (const o in t) {
      const i = t[o];
      Vh(i, s, o, a);
    }
    return s;
  },
  Vh = (t, a, s, o) => {
    const i = t.length;
    for (let c = 0; c < i; c++) {
      const u = t[c];
      O_(u, a, s, o);
    }
  },
  O_ = (t, a, s, o) => {
    if (typeof t == "string") {
      __(t, a, s);
      return;
    }
    if (typeof t == "function") {
      j_(t, a, s, o);
      return;
    }
    T_(t, a, s, o);
  },
  __ = (t, a, s) => {
    const o = t === "" ? a : fb(a, t);
    o.classGroupId = s;
  },
  j_ = (t, a, s, o) => {
    if (M_(t)) {
      Vh(t(o), a, s, o);
      return;
    }
    (a.validators === null && (a.validators = []), a.validators.push(w_(s, t)));
  },
  T_ = (t, a, s, o) => {
    const i = Object.entries(t),
      c = i.length;
    for (let u = 0; u < c; u++) {
      const [f, p] = i[u];
      Vh(p, fb(a, f), s, o);
    }
  },
  fb = (t, a) => {
    let s = t;
    const o = a.split(mc),
      i = o.length;
    for (let c = 0; c < i; c++) {
      const u = o[c];
      let f = s.nextPart.get(u);
      (f || ((f = ub()), s.nextPart.set(u, f)), (s = f));
    }
    return s;
  },
  M_ = (t) => "isThemeGetter" in t && t.isThemeGetter === !0,
  D_ = (t) => {
    if (t < 1) return { get: () => {}, set: () => {} };
    let a = 0,
      s = Object.create(null),
      o = Object.create(null);
    const i = (c, u) => {
      ((s[c] = u), a++, a > t && ((a = 0), (o = s), (s = Object.create(null))));
    };
    return {
      get(c) {
        let u = s[c];
        if (u !== void 0) return u;
        if ((u = o[c]) !== void 0) return (i(c, u), u);
      },
      set(c, u) {
        c in s ? (s[c] = u) : i(c, u);
      },
    };
  },
  ah = "!",
  Jy = ":",
  z_ = [],
  ex = (t, a, s, o, i) => ({
    modifiers: t,
    hasImportantModifier: a,
    baseClassName: s,
    maybePostfixModifierPosition: o,
    isExternal: i,
  }),
  P_ = (t) => {
    const { prefix: a, experimentalParseClassName: s } = t;
    let o = (i) => {
      const c = [];
      let u = 0,
        f = 0,
        p = 0,
        g;
      const x = i.length;
      for (let w = 0; w < x; w++) {
        const E = i[w];
        if (u === 0 && f === 0) {
          if (E === Jy) {
            (c.push(i.slice(p, w)), (p = w + 1));
            continue;
          }
          if (E === "/") {
            g = w;
            continue;
          }
        }
        E === "[" ? u++ : E === "]" ? u-- : E === "(" ? f++ : E === ")" && f--;
      }
      const v = c.length === 0 ? i : i.slice(p);
      let S = v,
        A = !1;
      v.endsWith(ah)
        ? ((S = v.slice(0, -1)), (A = !0))
        : v.startsWith(ah) && ((S = v.slice(1)), (A = !0));
      const N = g && g > p ? g - p : void 0;
      return ex(c, A, S, N);
    };
    if (a) {
      const i = a + Jy,
        c = o;
      o = (u) =>
        u.startsWith(i) ? c(u.slice(i.length)) : ex(z_, !1, u, void 0, !0);
    }
    if (s) {
      const i = o;
      o = (c) => s({ className: c, parseClassName: i });
    }
    return o;
  },
  k_ = (t) => {
    const a = new Map();
    return (
      t.orderSensitiveModifiers.forEach((s, o) => {
        a.set(s, 1e6 + o);
      }),
      (s) => {
        const o = [];
        let i = [];
        for (let c = 0; c < s.length; c++) {
          const u = s[c],
            f = u[0] === "[",
            p = a.has(u);
          f || p
            ? (i.length > 0 && (i.sort(), o.push(...i), (i = [])), o.push(u))
            : i.push(u);
        }
        return (i.length > 0 && (i.sort(), o.push(...i)), o);
      }
    );
  },
  H_ = (t) => ({
    cache: D_(t.cacheSize),
    parseClassName: P_(t),
    sortModifiers: k_(t),
    ...C_(t),
  }),
  L_ = /\s+/,
  U_ = (t, a) => {
    const {
        parseClassName: s,
        getClassGroupId: o,
        getConflictingClassGroupIds: i,
        sortModifiers: c,
      } = a,
      u = [],
      f = t.trim().split(L_);
    let p = "";
    for (let g = f.length - 1; g >= 0; g -= 1) {
      const x = f[g],
        {
          isExternal: v,
          modifiers: S,
          hasImportantModifier: A,
          baseClassName: N,
          maybePostfixModifierPosition: w,
        } = s(x);
      if (v) {
        p = x + (p.length > 0 ? " " + p : p);
        continue;
      }
      let E = !!w,
        O = o(E ? N.substring(0, w) : N);
      if (!O) {
        if (!E) {
          p = x + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (((O = o(N)), !O)) {
          p = x + (p.length > 0 ? " " + p : p);
          continue;
        }
        E = !1;
      }
      const D = S.length === 0 ? "" : S.length === 1 ? S[0] : c(S).join(":"),
        P = A ? D + ah : D,
        G = P + O;
      if (u.indexOf(G) > -1) continue;
      u.push(G);
      const L = i(O, E);
      for (let q = 0; q < L.length; ++q) {
        const j = L[q];
        u.push(P + j);
      }
      p = x + (p.length > 0 ? " " + p : p);
    }
    return p;
  },
  B_ = (...t) => {
    let a = 0,
      s,
      o,
      i = "";
    for (; a < t.length; )
      (s = t[a++]) && (o = hb(s)) && (i && (i += " "), (i += o));
    return i;
  },
  hb = (t) => {
    if (typeof t == "string") return t;
    let a,
      s = "";
    for (let o = 0; o < t.length; o++)
      t[o] && (a = hb(t[o])) && (s && (s += " "), (s += a));
    return s;
  },
  q_ = (t, ...a) => {
    let s, o, i, c;
    const u = (p) => {
        const g = a.reduce((x, v) => v(x), t());
        return (
          (s = H_(g)),
          (o = s.cache.get),
          (i = s.cache.set),
          (c = f),
          f(p)
        );
      },
      f = (p) => {
        const g = o(p);
        if (g) return g;
        const x = U_(p, s);
        return (i(p, x), x);
      };
    return ((c = u), (...p) => c(B_(...p)));
  },
  Q_ = [],
  pt = (t) => {
    const a = (s) => s[t] || Q_;
    return ((a.isThemeGetter = !0), a);
  },
  pb = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  mb = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  V_ = /^\d+\/\d+$/,
  I_ = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Y_ =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  $_ = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  G_ = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  F_ =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ks = (t) => V_.test(t),
  Ae = (t) => !!t && !Number.isNaN(Number(t)),
  tr = (t) => !!t && Number.isInteger(Number(t)),
  Cf = (t) => t.endsWith("%") && Ae(t.slice(0, -1)),
  Sa = (t) => I_.test(t),
  X_ = () => !0,
  K_ = (t) => Y_.test(t) && !$_.test(t),
  gb = () => !1,
  Z_ = (t) => G_.test(t),
  W_ = (t) => F_.test(t),
  J_ = (t) => !pe(t) && !me(t),
  ej = (t) => Js(t, xb, gb),
  pe = (t) => pb.test(t),
  Pr = (t) => Js(t, bb, K_),
  Af = (t) => Js(t, sj, Ae),
  tx = (t) => Js(t, vb, gb),
  tj = (t) => Js(t, yb, W_),
  Fi = (t) => Js(t, Sb, Z_),
  me = (t) => mb.test(t),
  al = (t) => eo(t, bb),
  nj = (t) => eo(t, oj),
  nx = (t) => eo(t, vb),
  aj = (t) => eo(t, xb),
  rj = (t) => eo(t, yb),
  Xi = (t) => eo(t, Sb, !0),
  Js = (t, a, s) => {
    const o = pb.exec(t);
    return o ? (o[1] ? a(o[1]) : s(o[2])) : !1;
  },
  eo = (t, a, s = !1) => {
    const o = mb.exec(t);
    return o ? (o[1] ? a(o[1]) : s) : !1;
  },
  vb = (t) => t === "position" || t === "percentage",
  yb = (t) => t === "image" || t === "url",
  xb = (t) => t === "length" || t === "size" || t === "bg-size",
  bb = (t) => t === "length",
  sj = (t) => t === "number",
  oj = (t) => t === "family-name",
  Sb = (t) => t === "shadow",
  lj = () => {
    const t = pt("color"),
      a = pt("font"),
      s = pt("text"),
      o = pt("font-weight"),
      i = pt("tracking"),
      c = pt("leading"),
      u = pt("breakpoint"),
      f = pt("container"),
      p = pt("spacing"),
      g = pt("radius"),
      x = pt("shadow"),
      v = pt("inset-shadow"),
      S = pt("text-shadow"),
      A = pt("drop-shadow"),
      N = pt("blur"),
      w = pt("perspective"),
      E = pt("aspect"),
      O = pt("ease"),
      D = pt("animate"),
      P = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      G = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      L = () => [...G(), me, pe],
      q = () => ["auto", "hidden", "clip", "visible", "scroll"],
      j = () => ["auto", "contain", "none"],
      R = () => [me, pe, p],
      U = () => [ks, "full", "auto", ...R()],
      $ = () => [tr, "none", "subgrid", me, pe],
      Z = () => ["auto", { span: ["full", tr, me, pe] }, tr, me, pe],
      W = () => [tr, "auto", me, pe],
      re = () => ["auto", "min", "max", "fr", me, pe],
      oe = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      ie = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      M = () => ["auto", ...R()],
      V = () => [
        ks,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...R(),
      ],
      H = () => [t, me, pe],
      le = () => [...G(), nx, tx, { position: [me, pe] }],
      de = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      _ = () => ["auto", "cover", "contain", aj, ej, { size: [me, pe] }],
      X = () => [Cf, al, Pr],
      I = () => ["", "none", "full", g, me, pe],
      K = () => ["", Ae, al, Pr],
      ae = () => ["solid", "dashed", "dotted", "double"],
      ue = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      ne = () => [Ae, Cf, nx, tx],
      fe = () => ["", "none", N, me, pe],
      xe = () => ["none", Ae, me, pe],
      Ee = () => ["none", Ae, me, pe],
      Ne = () => [Ae, me, pe],
      _e = () => [ks, "full", ...R()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Sa],
        breakpoint: [Sa],
        color: [X_],
        container: [Sa],
        "drop-shadow": [Sa],
        ease: ["in", "out", "in-out"],
        font: [J_],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Sa],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Sa],
        shadow: [Sa],
        spacing: ["px", Ae],
        text: [Sa],
        "text-shadow": [Sa],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", ks, pe, me, E] }],
        container: ["container"],
        columns: [{ columns: [Ae, pe, me, f] }],
        "break-after": [{ "break-after": P() }],
        "break-before": [{ "break-before": P() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: L() }],
        overflow: [{ overflow: q() }],
        "overflow-x": [{ "overflow-x": q() }],
        "overflow-y": [{ "overflow-y": q() }],
        overscroll: [{ overscroll: j() }],
        "overscroll-x": [{ "overscroll-x": j() }],
        "overscroll-y": [{ "overscroll-y": j() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: U() }],
        "inset-x": [{ "inset-x": U() }],
        "inset-y": [{ "inset-y": U() }],
        start: [{ start: U() }],
        end: [{ end: U() }],
        top: [{ top: U() }],
        right: [{ right: U() }],
        bottom: [{ bottom: U() }],
        left: [{ left: U() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [tr, "auto", me, pe] }],
        basis: [{ basis: [ks, "full", "auto", f, ...R()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Ae, ks, "auto", "initial", "none", pe] }],
        grow: [{ grow: ["", Ae, me, pe] }],
        shrink: [{ shrink: ["", Ae, me, pe] }],
        order: [{ order: [tr, "first", "last", "none", me, pe] }],
        "grid-cols": [{ "grid-cols": $() }],
        "col-start-end": [{ col: Z() }],
        "col-start": [{ "col-start": W() }],
        "col-end": [{ "col-end": W() }],
        "grid-rows": [{ "grid-rows": $() }],
        "row-start-end": [{ row: Z() }],
        "row-start": [{ "row-start": W() }],
        "row-end": [{ "row-end": W() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": re() }],
        "auto-rows": [{ "auto-rows": re() }],
        gap: [{ gap: R() }],
        "gap-x": [{ "gap-x": R() }],
        "gap-y": [{ "gap-y": R() }],
        "justify-content": [{ justify: [...oe(), "normal"] }],
        "justify-items": [{ "justify-items": [...ie(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...ie()] }],
        "align-content": [{ content: ["normal", ...oe()] }],
        "align-items": [{ items: [...ie(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...ie(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": oe() }],
        "place-items": [{ "place-items": [...ie(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...ie()] }],
        p: [{ p: R() }],
        px: [{ px: R() }],
        py: [{ py: R() }],
        ps: [{ ps: R() }],
        pe: [{ pe: R() }],
        pt: [{ pt: R() }],
        pr: [{ pr: R() }],
        pb: [{ pb: R() }],
        pl: [{ pl: R() }],
        m: [{ m: M() }],
        mx: [{ mx: M() }],
        my: [{ my: M() }],
        ms: [{ ms: M() }],
        me: [{ me: M() }],
        mt: [{ mt: M() }],
        mr: [{ mr: M() }],
        mb: [{ mb: M() }],
        ml: [{ ml: M() }],
        "space-x": [{ "space-x": R() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": R() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: V() }],
        w: [{ w: [f, "screen", ...V()] }],
        "min-w": [{ "min-w": [f, "screen", "none", ...V()] }],
        "max-w": [
          { "max-w": [f, "screen", "none", "prose", { screen: [u] }, ...V()] },
        ],
        h: [{ h: ["screen", "lh", ...V()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...V()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...V()] }],
        "font-size": [{ text: ["base", s, al, Pr] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [o, me, Af] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Cf,
              pe,
            ],
          },
        ],
        "font-family": [{ font: [nj, pe, a] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [i, me, pe] }],
        "line-clamp": [{ "line-clamp": [Ae, "none", me, Af] }],
        leading: [{ leading: [c, ...R()] }],
        "list-image": [{ "list-image": ["none", me, pe] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", me, pe] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: H() }],
        "text-color": [{ text: H() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ae(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Ae, "from-font", "auto", me, Pr] },
        ],
        "text-decoration-color": [{ decoration: H() }],
        "underline-offset": [{ "underline-offset": [Ae, "auto", me, pe] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: R() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              me,
              pe,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", me, pe] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: le() }],
        "bg-repeat": [{ bg: de() }],
        "bg-size": [{ bg: _() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  tr,
                  me,
                  pe,
                ],
                radial: ["", me, pe],
                conic: [tr, me, pe],
              },
              rj,
              tj,
            ],
          },
        ],
        "bg-color": [{ bg: H() }],
        "gradient-from-pos": [{ from: X() }],
        "gradient-via-pos": [{ via: X() }],
        "gradient-to-pos": [{ to: X() }],
        "gradient-from": [{ from: H() }],
        "gradient-via": [{ via: H() }],
        "gradient-to": [{ to: H() }],
        rounded: [{ rounded: I() }],
        "rounded-s": [{ "rounded-s": I() }],
        "rounded-e": [{ "rounded-e": I() }],
        "rounded-t": [{ "rounded-t": I() }],
        "rounded-r": [{ "rounded-r": I() }],
        "rounded-b": [{ "rounded-b": I() }],
        "rounded-l": [{ "rounded-l": I() }],
        "rounded-ss": [{ "rounded-ss": I() }],
        "rounded-se": [{ "rounded-se": I() }],
        "rounded-ee": [{ "rounded-ee": I() }],
        "rounded-es": [{ "rounded-es": I() }],
        "rounded-tl": [{ "rounded-tl": I() }],
        "rounded-tr": [{ "rounded-tr": I() }],
        "rounded-br": [{ "rounded-br": I() }],
        "rounded-bl": [{ "rounded-bl": I() }],
        "border-w": [{ border: K() }],
        "border-w-x": [{ "border-x": K() }],
        "border-w-y": [{ "border-y": K() }],
        "border-w-s": [{ "border-s": K() }],
        "border-w-e": [{ "border-e": K() }],
        "border-w-t": [{ "border-t": K() }],
        "border-w-r": [{ "border-r": K() }],
        "border-w-b": [{ "border-b": K() }],
        "border-w-l": [{ "border-l": K() }],
        "divide-x": [{ "divide-x": K() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": K() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ae(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ae(), "hidden", "none"] }],
        "border-color": [{ border: H() }],
        "border-color-x": [{ "border-x": H() }],
        "border-color-y": [{ "border-y": H() }],
        "border-color-s": [{ "border-s": H() }],
        "border-color-e": [{ "border-e": H() }],
        "border-color-t": [{ "border-t": H() }],
        "border-color-r": [{ "border-r": H() }],
        "border-color-b": [{ "border-b": H() }],
        "border-color-l": [{ "border-l": H() }],
        "divide-color": [{ divide: H() }],
        "outline-style": [{ outline: [...ae(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Ae, me, pe] }],
        "outline-w": [{ outline: ["", Ae, al, Pr] }],
        "outline-color": [{ outline: H() }],
        shadow: [{ shadow: ["", "none", x, Xi, Fi] }],
        "shadow-color": [{ shadow: H() }],
        "inset-shadow": [{ "inset-shadow": ["none", v, Xi, Fi] }],
        "inset-shadow-color": [{ "inset-shadow": H() }],
        "ring-w": [{ ring: K() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: H() }],
        "ring-offset-w": [{ "ring-offset": [Ae, Pr] }],
        "ring-offset-color": [{ "ring-offset": H() }],
        "inset-ring-w": [{ "inset-ring": K() }],
        "inset-ring-color": [{ "inset-ring": H() }],
        "text-shadow": [{ "text-shadow": ["none", S, Xi, Fi] }],
        "text-shadow-color": [{ "text-shadow": H() }],
        opacity: [{ opacity: [Ae, me, pe] }],
        "mix-blend": [
          { "mix-blend": [...ue(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": ue() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [Ae] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": ne() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": ne() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": H() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": H() }],
        "mask-image-t-from-pos": [{ "mask-t-from": ne() }],
        "mask-image-t-to-pos": [{ "mask-t-to": ne() }],
        "mask-image-t-from-color": [{ "mask-t-from": H() }],
        "mask-image-t-to-color": [{ "mask-t-to": H() }],
        "mask-image-r-from-pos": [{ "mask-r-from": ne() }],
        "mask-image-r-to-pos": [{ "mask-r-to": ne() }],
        "mask-image-r-from-color": [{ "mask-r-from": H() }],
        "mask-image-r-to-color": [{ "mask-r-to": H() }],
        "mask-image-b-from-pos": [{ "mask-b-from": ne() }],
        "mask-image-b-to-pos": [{ "mask-b-to": ne() }],
        "mask-image-b-from-color": [{ "mask-b-from": H() }],
        "mask-image-b-to-color": [{ "mask-b-to": H() }],
        "mask-image-l-from-pos": [{ "mask-l-from": ne() }],
        "mask-image-l-to-pos": [{ "mask-l-to": ne() }],
        "mask-image-l-from-color": [{ "mask-l-from": H() }],
        "mask-image-l-to-color": [{ "mask-l-to": H() }],
        "mask-image-x-from-pos": [{ "mask-x-from": ne() }],
        "mask-image-x-to-pos": [{ "mask-x-to": ne() }],
        "mask-image-x-from-color": [{ "mask-x-from": H() }],
        "mask-image-x-to-color": [{ "mask-x-to": H() }],
        "mask-image-y-from-pos": [{ "mask-y-from": ne() }],
        "mask-image-y-to-pos": [{ "mask-y-to": ne() }],
        "mask-image-y-from-color": [{ "mask-y-from": H() }],
        "mask-image-y-to-color": [{ "mask-y-to": H() }],
        "mask-image-radial": [{ "mask-radial": [me, pe] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": ne() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": ne() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": H() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": H() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": G() }],
        "mask-image-conic-pos": [{ "mask-conic": [Ae] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": ne() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": ne() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": H() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": H() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: le() }],
        "mask-repeat": [{ mask: de() }],
        "mask-size": [{ mask: _() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", me, pe] }],
        filter: [{ filter: ["", "none", me, pe] }],
        blur: [{ blur: fe() }],
        brightness: [{ brightness: [Ae, me, pe] }],
        contrast: [{ contrast: [Ae, me, pe] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", A, Xi, Fi] }],
        "drop-shadow-color": [{ "drop-shadow": H() }],
        grayscale: [{ grayscale: ["", Ae, me, pe] }],
        "hue-rotate": [{ "hue-rotate": [Ae, me, pe] }],
        invert: [{ invert: ["", Ae, me, pe] }],
        saturate: [{ saturate: [Ae, me, pe] }],
        sepia: [{ sepia: ["", Ae, me, pe] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", me, pe] }],
        "backdrop-blur": [{ "backdrop-blur": fe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Ae, me, pe] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Ae, me, pe] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Ae, me, pe] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Ae, me, pe] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Ae, me, pe] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Ae, me, pe] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Ae, me, pe] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Ae, me, pe] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": R() }],
        "border-spacing-x": [{ "border-spacing-x": R() }],
        "border-spacing-y": [{ "border-spacing-y": R() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              me,
              pe,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Ae, "initial", me, pe] }],
        ease: [{ ease: ["linear", "initial", O, me, pe] }],
        delay: [{ delay: [Ae, me, pe] }],
        animate: [{ animate: ["none", D, me, pe] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [w, me, pe] }],
        "perspective-origin": [{ "perspective-origin": L() }],
        rotate: [{ rotate: xe() }],
        "rotate-x": [{ "rotate-x": xe() }],
        "rotate-y": [{ "rotate-y": xe() }],
        "rotate-z": [{ "rotate-z": xe() }],
        scale: [{ scale: Ee() }],
        "scale-x": [{ "scale-x": Ee() }],
        "scale-y": [{ "scale-y": Ee() }],
        "scale-z": [{ "scale-z": Ee() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Ne() }],
        "skew-x": [{ "skew-x": Ne() }],
        "skew-y": [{ "skew-y": Ne() }],
        transform: [{ transform: [me, pe, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: L() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: _e() }],
        "translate-x": [{ "translate-x": _e() }],
        "translate-y": [{ "translate-y": _e() }],
        "translate-z": [{ "translate-z": _e() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: H() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: H() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              me,
              pe,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": R() }],
        "scroll-mx": [{ "scroll-mx": R() }],
        "scroll-my": [{ "scroll-my": R() }],
        "scroll-ms": [{ "scroll-ms": R() }],
        "scroll-me": [{ "scroll-me": R() }],
        "scroll-mt": [{ "scroll-mt": R() }],
        "scroll-mr": [{ "scroll-mr": R() }],
        "scroll-mb": [{ "scroll-mb": R() }],
        "scroll-ml": [{ "scroll-ml": R() }],
        "scroll-p": [{ "scroll-p": R() }],
        "scroll-px": [{ "scroll-px": R() }],
        "scroll-py": [{ "scroll-py": R() }],
        "scroll-ps": [{ "scroll-ps": R() }],
        "scroll-pe": [{ "scroll-pe": R() }],
        "scroll-pt": [{ "scroll-pt": R() }],
        "scroll-pr": [{ "scroll-pr": R() }],
        "scroll-pb": [{ "scroll-pb": R() }],
        "scroll-pl": [{ "scroll-pl": R() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", me, pe],
          },
        ],
        fill: [{ fill: ["none", ...H()] }],
        "stroke-w": [{ stroke: [Ae, al, Pr, Af] }],
        stroke: [{ stroke: ["none", ...H()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  ij = q_(lj);
function Fe(...t) {
  return ij(cb(t));
}
const Ih = b_(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
function et({
  className: t,
  variant: a = "default",
  size: s = "default",
  asChild: o = !1,
  ...i
}) {
  const c = o ? p_ : "button";
  return m.jsx(c, {
    "code-path": "src/components/ui/button.tsx:52:5",
    "data-slot": "button",
    "data-variant": a,
    "data-size": s,
    className: Fe(Ih({ variant: a, size: s, className: t })),
    ...i,
  });
}
const cj = "/login";
function uj(t) {
  const { redirectOnUnauthenticated: a = !1, redirectPath: s = cj } = {},
    o = $x(),
    i = Yn.useUtils(),
    {
      data: c,
      isLoading: u,
      error: f,
      refetch: p,
    } = Yn.auth.me.useQuery(void 0, { staleTime: 1e3 * 60 * 5, retry: !1 }),
    g = Yn.auth.logout.useMutation({
      onSuccess: async () => {
        (await i.invalidate(), o(s));
      },
    }),
    x = y.useCallback(() => g.mutate(), [g]);
  return (
    y.useEffect(() => {
      a && !u && !c && window.location.pathname !== s && o(s);
    }, [a, u, c, o, s]),
    y.useMemo(
      () => ({
        user: c ?? null,
        isAuthenticated: !!c,
        isLoading: u || g.isPending,
        error: f,
        logout: x,
        refresh: p,
      }),
      [c, u, g.isPending, f, x, p],
    )
  );
}
function ze(t, a, { checkForDefaultPrevented: s = !0 } = {}) {
  return function (i) {
    if ((t?.(i), s === !1 || !i.defaultPrevented)) return a?.(i);
  };
}
function dj(t, a) {
  const s = y.createContext(a),
    o = (c) => {
      const { children: u, ...f } = c,
        p = y.useMemo(() => f, Object.values(f));
      return m.jsx(s.Provider, { value: p, children: u });
    };
  o.displayName = t + "Provider";
  function i(c) {
    const u = y.useContext(s);
    if (u) return u;
    if (a !== void 0) return a;
    throw new Error(`\`${c}\` must be used within \`${t}\``);
  }
  return [o, i];
}
function Gr(t, a = []) {
  let s = [];
  function o(c, u) {
    const f = y.createContext(u),
      p = s.length;
    s = [...s, u];
    const g = (v) => {
      const { scope: S, children: A, ...N } = v,
        w = S?.[t]?.[p] || f,
        E = y.useMemo(() => N, Object.values(N));
      return m.jsx(w.Provider, { value: E, children: A });
    };
    g.displayName = c + "Provider";
    function x(v, S) {
      const A = S?.[t]?.[p] || f,
        N = y.useContext(A);
      if (N) return N;
      if (u !== void 0) return u;
      throw new Error(`\`${v}\` must be used within \`${c}\``);
    }
    return [g, x];
  }
  const i = () => {
    const c = s.map((u) => y.createContext(u));
    return function (f) {
      const p = f?.[t] || c;
      return y.useMemo(() => ({ [`__scope${t}`]: { ...f, [t]: p } }), [f, p]);
    };
  };
  return ((i.scopeName = t), [o, fj(i, ...a)]);
}
function fj(...t) {
  const a = t[0];
  if (t.length === 1) return a;
  const s = () => {
    const o = t.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (c) {
      const u = o.reduce((f, { useScope: p, scopeName: g }) => {
        const v = p(c)[`__scope${g}`];
        return { ...f, ...v };
      }, {});
      return y.useMemo(() => ({ [`__scope${a.scopeName}`]: u }), [u]);
    };
  };
  return ((s.scopeName = a.scopeName), s);
}
var Ct = globalThis?.document ? y.useLayoutEffect : () => {},
  hj = Nc[" useId ".trim().toString()] || (() => {}),
  pj = 0;
function Qs(t) {
  const [a, s] = y.useState(hj());
  return (
    Ct(() => {
      s((o) => o ?? String(pj++));
    }, [t]),
    t || (a ? `radix-${a}` : "")
  );
}
var mj = Nc[" useInsertionEffect ".trim().toString()] || Ct;
function gc({ prop: t, defaultProp: a, onChange: s = () => {}, caller: o }) {
  const [i, c, u] = gj({ defaultProp: a, onChange: s }),
    f = t !== void 0,
    p = f ? t : i;
  {
    const x = y.useRef(t !== void 0);
    y.useEffect(() => {
      const v = x.current;
      (v !== f &&
        console.warn(
          `${o} is changing from ${v ? "controlled" : "uncontrolled"} to ${f ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (x.current = f));
    }, [f, o]);
  }
  const g = y.useCallback(
    (x) => {
      if (f) {
        const v = vj(x) ? x(t) : x;
        v !== t && u.current?.(v);
      } else c(x);
    },
    [f, t, c, u],
  );
  return [p, g];
}
function gj({ defaultProp: t, onChange: a }) {
  const [s, o] = y.useState(t),
    i = y.useRef(s),
    c = y.useRef(a);
  return (
    mj(() => {
      c.current = a;
    }, [a]),
    y.useEffect(() => {
      i.current !== s && (c.current?.(s), (i.current = s));
    }, [s, i]),
    [s, o, c]
  );
}
function vj(t) {
  return typeof t == "function";
}
function yj(t) {
  const a = xj(t),
    s = y.forwardRef((o, i) => {
      const { children: c, ...u } = o,
        f = y.Children.toArray(c),
        p = f.find(Sj);
      if (p) {
        const g = p.props.children,
          x = f.map((v) =>
            v === p
              ? y.Children.count(g) > 1
                ? y.Children.only(null)
                : y.isValidElement(g)
                  ? g.props.children
                  : null
              : v,
          );
        return m.jsx(a, {
          ...u,
          ref: i,
          children: y.isValidElement(g) ? y.cloneElement(g, void 0, x) : null,
        });
      }
      return m.jsx(a, { ...u, ref: i, children: c });
    });
  return ((s.displayName = `${t}.Slot`), s);
}
function xj(t) {
  const a = y.forwardRef((s, o) => {
    const { children: i, ...c } = s;
    if (y.isValidElement(i)) {
      const u = Ej(i),
        f = wj(c, i.props);
      return (
        i.type !== y.Fragment && (f.ref = o ? Ws(o, u) : u),
        y.cloneElement(i, f)
      );
    }
    return y.Children.count(i) > 1 ? y.Children.only(null) : null;
  });
  return ((a.displayName = `${t}.SlotClone`), a);
}
var bj = Symbol("radix.slottable");
function Sj(t) {
  return (
    y.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === bj
  );
}
function wj(t, a) {
  const s = { ...a };
  for (const o in a) {
    const i = t[o],
      c = a[o];
    /^on[A-Z]/.test(o)
      ? i && c
        ? (s[o] = (...f) => {
            const p = c(...f);
            return (i(...f), p);
          })
        : i && (s[o] = i)
      : o === "style"
        ? (s[o] = { ...i, ...c })
        : o === "className" && (s[o] = [i, c].filter(Boolean).join(" "));
  }
  return { ...t, ...s };
}
function Ej(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
var Cj = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  ke = Cj.reduce((t, a) => {
    const s = yj(`Primitive.${a}`),
      o = y.forwardRef((i, c) => {
        const { asChild: u, ...f } = i,
          p = u ? s : a;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          m.jsx(p, { ...f, ref: c })
        );
      });
    return ((o.displayName = `Primitive.${a}`), { ...t, [a]: o });
  }, {});
function Aj(t, a) {
  t && Nl.flushSync(() => t.dispatchEvent(a));
}
function Yt(t) {
  const a = y.useRef(t);
  return (
    y.useEffect(() => {
      a.current = t;
    }),
    y.useMemo(
      () =>
        (...s) =>
          a.current?.(...s),
      [],
    )
  );
}
function Nj(t, a = globalThis?.document) {
  const s = Yt(t);
  y.useEffect(() => {
    const o = (i) => {
      i.key === "Escape" && s(i);
    };
    return (
      a.addEventListener("keydown", o, { capture: !0 }),
      () => a.removeEventListener("keydown", o, { capture: !0 })
    );
  }, [s, a]);
}
var Rj = "DismissableLayer",
  rh = "dismissableLayer.update",
  Oj = "dismissableLayer.pointerDownOutside",
  _j = "dismissableLayer.focusOutside",
  ax,
  wb = y.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Yh = y.forwardRef((t, a) => {
    const {
        disableOutsidePointerEvents: s = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: c,
        onInteractOutside: u,
        onDismiss: f,
        ...p
      } = t,
      g = y.useContext(wb),
      [x, v] = y.useState(null),
      S = x?.ownerDocument ?? globalThis?.document,
      [, A] = y.useState({}),
      N = qe(a, (j) => v(j)),
      w = Array.from(g.layers),
      [E] = [...g.layersWithOutsidePointerEventsDisabled].slice(-1),
      O = w.indexOf(E),
      D = x ? w.indexOf(x) : -1,
      P = g.layersWithOutsidePointerEventsDisabled.size > 0,
      G = D >= O,
      L = Mj((j) => {
        const R = j.target,
          U = [...g.branches].some(($) => $.contains(R));
        !G || U || (i?.(j), u?.(j), j.defaultPrevented || f?.());
      }, S),
      q = Dj((j) => {
        const R = j.target;
        [...g.branches].some(($) => $.contains(R)) ||
          (c?.(j), u?.(j), j.defaultPrevented || f?.());
      }, S);
    return (
      Nj((j) => {
        D === g.layers.size - 1 &&
          (o?.(j), !j.defaultPrevented && f && (j.preventDefault(), f()));
      }, S),
      y.useEffect(() => {
        if (x)
          return (
            s &&
              (g.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((ax = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = "none")),
              g.layersWithOutsidePointerEventsDisabled.add(x)),
            g.layers.add(x),
            rx(),
            () => {
              s &&
                g.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = ax);
            }
          );
      }, [x, S, s, g]),
      y.useEffect(
        () => () => {
          x &&
            (g.layers.delete(x),
            g.layersWithOutsidePointerEventsDisabled.delete(x),
            rx());
        },
        [x, g],
      ),
      y.useEffect(() => {
        const j = () => A({});
        return (
          document.addEventListener(rh, j),
          () => document.removeEventListener(rh, j)
        );
      }, []),
      m.jsx(ke.div, {
        ...p,
        ref: N,
        style: {
          pointerEvents: P ? (G ? "auto" : "none") : void 0,
          ...t.style,
        },
        onFocusCapture: ze(t.onFocusCapture, q.onFocusCapture),
        onBlurCapture: ze(t.onBlurCapture, q.onBlurCapture),
        onPointerDownCapture: ze(
          t.onPointerDownCapture,
          L.onPointerDownCapture,
        ),
      })
    );
  });
Yh.displayName = Rj;
var jj = "DismissableLayerBranch",
  Tj = y.forwardRef((t, a) => {
    const s = y.useContext(wb),
      o = y.useRef(null),
      i = qe(a, o);
    return (
      y.useEffect(() => {
        const c = o.current;
        if (c)
          return (
            s.branches.add(c),
            () => {
              s.branches.delete(c);
            }
          );
      }, [s.branches]),
      m.jsx(ke.div, { ...t, ref: i })
    );
  });
Tj.displayName = jj;
function Mj(t, a = globalThis?.document) {
  const s = Yt(t),
    o = y.useRef(!1),
    i = y.useRef(() => {});
  return (
    y.useEffect(() => {
      const c = (f) => {
          if (f.target && !o.current) {
            let p = function () {
              Eb(Oj, s, g, { discrete: !0 });
            };
            const g = { originalEvent: f };
            f.pointerType === "touch"
              ? (a.removeEventListener("click", i.current),
                (i.current = p),
                a.addEventListener("click", i.current, { once: !0 }))
              : p();
          } else a.removeEventListener("click", i.current);
          o.current = !1;
        },
        u = window.setTimeout(() => {
          a.addEventListener("pointerdown", c);
        }, 0);
      return () => {
        (window.clearTimeout(u),
          a.removeEventListener("pointerdown", c),
          a.removeEventListener("click", i.current));
      };
    }, [a, s]),
    { onPointerDownCapture: () => (o.current = !0) }
  );
}
function Dj(t, a = globalThis?.document) {
  const s = Yt(t),
    o = y.useRef(!1);
  return (
    y.useEffect(() => {
      const i = (c) => {
        c.target &&
          !o.current &&
          Eb(_j, s, { originalEvent: c }, { discrete: !1 });
      };
      return (
        a.addEventListener("focusin", i),
        () => a.removeEventListener("focusin", i)
      );
    }, [a, s]),
    {
      onFocusCapture: () => (o.current = !0),
      onBlurCapture: () => (o.current = !1),
    }
  );
}
function rx() {
  const t = new CustomEvent(rh);
  document.dispatchEvent(t);
}
function Eb(t, a, s, { discrete: o }) {
  const i = s.originalEvent.target,
    c = new CustomEvent(t, { bubbles: !1, cancelable: !0, detail: s });
  (a && i.addEventListener(t, a, { once: !0 }),
    o ? Aj(i, c) : i.dispatchEvent(c));
}
var Nf = "focusScope.autoFocusOnMount",
  Rf = "focusScope.autoFocusOnUnmount",
  sx = { bubbles: !1, cancelable: !0 },
  zj = "FocusScope",
  $h = y.forwardRef((t, a) => {
    const {
        loop: s = !1,
        trapped: o = !1,
        onMountAutoFocus: i,
        onUnmountAutoFocus: c,
        ...u
      } = t,
      [f, p] = y.useState(null),
      g = Yt(i),
      x = Yt(c),
      v = y.useRef(null),
      S = qe(a, (w) => p(w)),
      A = y.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (y.useEffect(() => {
      if (o) {
        let w = function (P) {
            if (A.paused || !f) return;
            const G = P.target;
            f.contains(G) ? (v.current = G) : ar(v.current, { select: !0 });
          },
          E = function (P) {
            if (A.paused || !f) return;
            const G = P.relatedTarget;
            G !== null && (f.contains(G) || ar(v.current, { select: !0 }));
          },
          O = function (P) {
            if (document.activeElement === document.body)
              for (const L of P) L.removedNodes.length > 0 && ar(f);
          };
        (document.addEventListener("focusin", w),
          document.addEventListener("focusout", E));
        const D = new MutationObserver(O);
        return (
          f && D.observe(f, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", w),
              document.removeEventListener("focusout", E),
              D.disconnect());
          }
        );
      }
    }, [o, f, A.paused]),
      y.useEffect(() => {
        if (f) {
          lx.add(A);
          const w = document.activeElement;
          if (!f.contains(w)) {
            const O = new CustomEvent(Nf, sx);
            (f.addEventListener(Nf, g),
              f.dispatchEvent(O),
              O.defaultPrevented ||
                (Pj(Bj(Cb(f)), { select: !0 }),
                document.activeElement === w && ar(f)));
          }
          return () => {
            (f.removeEventListener(Nf, g),
              setTimeout(() => {
                const O = new CustomEvent(Rf, sx);
                (f.addEventListener(Rf, x),
                  f.dispatchEvent(O),
                  O.defaultPrevented || ar(w ?? document.body, { select: !0 }),
                  f.removeEventListener(Rf, x),
                  lx.remove(A));
              }, 0));
          };
        }
      }, [f, g, x, A]));
    const N = y.useCallback(
      (w) => {
        if ((!s && !o) || A.paused) return;
        const E = w.key === "Tab" && !w.altKey && !w.ctrlKey && !w.metaKey,
          O = document.activeElement;
        if (E && O) {
          const D = w.currentTarget,
            [P, G] = kj(D);
          P && G
            ? !w.shiftKey && O === G
              ? (w.preventDefault(), s && ar(P, { select: !0 }))
              : w.shiftKey &&
                O === P &&
                (w.preventDefault(), s && ar(G, { select: !0 }))
            : O === D && w.preventDefault();
        }
      },
      [s, o, A.paused],
    );
    return m.jsx(ke.div, { tabIndex: -1, ...u, ref: S, onKeyDown: N });
  });
$h.displayName = zj;
function Pj(t, { select: a = !1 } = {}) {
  const s = document.activeElement;
  for (const o of t)
    if ((ar(o, { select: a }), document.activeElement !== s)) return;
}
function kj(t) {
  const a = Cb(t),
    s = ox(a, t),
    o = ox(a.reverse(), t);
  return [s, o];
}
function Cb(t) {
  const a = [],
    s = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (o) => {
        const i = o.tagName === "INPUT" && o.type === "hidden";
        return o.disabled || o.hidden || i
          ? NodeFilter.FILTER_SKIP
          : o.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; s.nextNode(); ) a.push(s.currentNode);
  return a;
}
function ox(t, a) {
  for (const s of t) if (!Hj(s, { upTo: a })) return s;
}
function Hj(t, { upTo: a }) {
  if (getComputedStyle(t).visibility === "hidden") return !0;
  for (; t; ) {
    if (a !== void 0 && t === a) return !1;
    if (getComputedStyle(t).display === "none") return !0;
    t = t.parentElement;
  }
  return !1;
}
function Lj(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function ar(t, { select: a = !1 } = {}) {
  if (t && t.focus) {
    const s = document.activeElement;
    (t.focus({ preventScroll: !0 }), t !== s && Lj(t) && a && t.select());
  }
}
var lx = Uj();
function Uj() {
  let t = [];
  return {
    add(a) {
      const s = t[0];
      (a !== s && s?.pause(), (t = ix(t, a)), t.unshift(a));
    },
    remove(a) {
      ((t = ix(t, a)), t[0]?.resume());
    },
  };
}
function ix(t, a) {
  const s = [...t],
    o = s.indexOf(a);
  return (o !== -1 && s.splice(o, 1), s);
}
function Bj(t) {
  return t.filter((a) => a.tagName !== "A");
}
var qj = "Portal",
  Gh = y.forwardRef((t, a) => {
    const { container: s, ...o } = t,
      [i, c] = y.useState(!1);
    Ct(() => c(!0), []);
    const u = s || (i && globalThis?.document?.body);
    return u ? ob.createPortal(m.jsx(ke.div, { ...o, ref: a }), u) : null;
  });
Gh.displayName = qj;
function Qj(t, a) {
  return y.useReducer((s, o) => a[s][o] ?? s, t);
}
var Na = (t) => {
  const { present: a, children: s } = t,
    o = Vj(a),
    i =
      typeof s == "function" ? s({ present: o.isPresent }) : y.Children.only(s),
    c = qe(o.ref, Ij(i));
  return typeof s == "function" || o.isPresent
    ? y.cloneElement(i, { ref: c })
    : null;
};
Na.displayName = "Presence";
function Vj(t) {
  const [a, s] = y.useState(),
    o = y.useRef(null),
    i = y.useRef(t),
    c = y.useRef("none"),
    u = t ? "mounted" : "unmounted",
    [f, p] = Qj(u, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    y.useEffect(() => {
      const g = Ki(o.current);
      c.current = f === "mounted" ? g : "none";
    }, [f]),
    Ct(() => {
      const g = o.current,
        x = i.current;
      if (x !== t) {
        const S = c.current,
          A = Ki(g);
        (t
          ? p("MOUNT")
          : A === "none" || g?.display === "none"
            ? p("UNMOUNT")
            : p(x && S !== A ? "ANIMATION_OUT" : "UNMOUNT"),
          (i.current = t));
      }
    }, [t, p]),
    Ct(() => {
      if (a) {
        let g;
        const x = a.ownerDocument.defaultView ?? window,
          v = (A) => {
            const w = Ki(o.current).includes(CSS.escape(A.animationName));
            if (A.target === a && w && (p("ANIMATION_END"), !i.current)) {
              const E = a.style.animationFillMode;
              ((a.style.animationFillMode = "forwards"),
                (g = x.setTimeout(() => {
                  a.style.animationFillMode === "forwards" &&
                    (a.style.animationFillMode = E);
                })));
            }
          },
          S = (A) => {
            A.target === a && (c.current = Ki(o.current));
          };
        return (
          a.addEventListener("animationstart", S),
          a.addEventListener("animationcancel", v),
          a.addEventListener("animationend", v),
          () => {
            (x.clearTimeout(g),
              a.removeEventListener("animationstart", S),
              a.removeEventListener("animationcancel", v),
              a.removeEventListener("animationend", v));
          }
        );
      } else p("ANIMATION_END");
    }, [a, p]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(f),
      ref: y.useCallback((g) => {
        ((o.current = g ? getComputedStyle(g) : null), s(g));
      }, []),
    }
  );
}
function Ki(t) {
  return t?.animationName || "none";
}
function Ij(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
var Of = 0;
function Ab() {
  y.useEffect(() => {
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", t[0] ?? cx()),
      document.body.insertAdjacentElement("beforeend", t[1] ?? cx()),
      Of++,
      () => {
        (Of === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((a) => a.remove()),
          Of--);
      }
    );
  }, []);
}
function cx() {
  const t = document.createElement("span");
  return (
    t.setAttribute("data-radix-focus-guard", ""),
    (t.tabIndex = 0),
    (t.style.outline = "none"),
    (t.style.opacity = "0"),
    (t.style.position = "fixed"),
    (t.style.pointerEvents = "none"),
    t
  );
}
var qn = function () {
  return (
    (qn =
      Object.assign ||
      function (a) {
        for (var s, o = 1, i = arguments.length; o < i; o++) {
          s = arguments[o];
          for (var c in s)
            Object.prototype.hasOwnProperty.call(s, c) && (a[c] = s[c]);
        }
        return a;
      }),
    qn.apply(this, arguments)
  );
};
function Nb(t, a) {
  var s = {};
  for (var o in t)
    Object.prototype.hasOwnProperty.call(t, o) &&
      a.indexOf(o) < 0 &&
      (s[o] = t[o]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, o = Object.getOwnPropertySymbols(t); i < o.length; i++)
      a.indexOf(o[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, o[i]) &&
        (s[o[i]] = t[o[i]]);
  return s;
}
function Yj(t, a, s) {
  if (s || arguments.length === 2)
    for (var o = 0, i = a.length, c; o < i; o++)
      (c || !(o in a)) &&
        (c || (c = Array.prototype.slice.call(a, 0, o)), (c[o] = a[o]));
  return t.concat(c || Array.prototype.slice.call(a));
}
var lc = "right-scroll-bar-position",
  ic = "width-before-scroll-bar",
  $j = "with-scroll-bars-hidden",
  Gj = "--removed-body-scroll-bar-size";
function _f(t, a) {
  return (typeof t == "function" ? t(a) : t && (t.current = a), t);
}
function Fj(t, a) {
  var s = y.useState(function () {
    return {
      value: t,
      callback: a,
      facade: {
        get current() {
          return s.value;
        },
        set current(o) {
          var i = s.value;
          i !== o && ((s.value = o), s.callback(o, i));
        },
      },
    };
  })[0];
  return ((s.callback = a), s.facade);
}
var Xj = typeof window < "u" ? y.useLayoutEffect : y.useEffect,
  ux = new WeakMap();
function Kj(t, a) {
  var s = Fj(null, function (o) {
    return t.forEach(function (i) {
      return _f(i, o);
    });
  });
  return (
    Xj(
      function () {
        var o = ux.get(s);
        if (o) {
          var i = new Set(o),
            c = new Set(t),
            u = s.current;
          (i.forEach(function (f) {
            c.has(f) || _f(f, null);
          }),
            c.forEach(function (f) {
              i.has(f) || _f(f, u);
            }));
        }
        ux.set(s, t);
      },
      [t],
    ),
    s
  );
}
function Zj(t) {
  return t;
}
function Wj(t, a) {
  a === void 0 && (a = Zj);
  var s = [],
    o = !1,
    i = {
      read: function () {
        if (o)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return s.length ? s[s.length - 1] : t;
      },
      useMedium: function (c) {
        var u = a(c, o);
        return (
          s.push(u),
          function () {
            s = s.filter(function (f) {
              return f !== u;
            });
          }
        );
      },
      assignSyncMedium: function (c) {
        for (o = !0; s.length; ) {
          var u = s;
          ((s = []), u.forEach(c));
        }
        s = {
          push: function (f) {
            return c(f);
          },
          filter: function () {
            return s;
          },
        };
      },
      assignMedium: function (c) {
        o = !0;
        var u = [];
        if (s.length) {
          var f = s;
          ((s = []), f.forEach(c), (u = s));
        }
        var p = function () {
            var x = u;
            ((u = []), x.forEach(c));
          },
          g = function () {
            return Promise.resolve().then(p);
          };
        (g(),
          (s = {
            push: function (x) {
              (u.push(x), g());
            },
            filter: function (x) {
              return ((u = u.filter(x)), s);
            },
          }));
      },
    };
  return i;
}
function Jj(t) {
  t === void 0 && (t = {});
  var a = Wj(null);
  return ((a.options = qn({ async: !0, ssr: !1 }, t)), a);
}
var Rb = function (t) {
  var a = t.sideCar,
    s = Nb(t, ["sideCar"]);
  if (!a)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var o = a.read();
  if (!o) throw new Error("Sidecar medium not found");
  return y.createElement(o, qn({}, s));
};
Rb.isSideCarExport = !0;
function e3(t, a) {
  return (t.useMedium(a), Rb);
}
var Ob = Jj(),
  jf = function () {},
  Lc = y.forwardRef(function (t, a) {
    var s = y.useRef(null),
      o = y.useState({
        onScrollCapture: jf,
        onWheelCapture: jf,
        onTouchMoveCapture: jf,
      }),
      i = o[0],
      c = o[1],
      u = t.forwardProps,
      f = t.children,
      p = t.className,
      g = t.removeScrollBar,
      x = t.enabled,
      v = t.shards,
      S = t.sideCar,
      A = t.noRelative,
      N = t.noIsolation,
      w = t.inert,
      E = t.allowPinchZoom,
      O = t.as,
      D = O === void 0 ? "div" : O,
      P = t.gapMode,
      G = Nb(t, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      L = S,
      q = Kj([s, a]),
      j = qn(qn({}, G), i);
    return y.createElement(
      y.Fragment,
      null,
      x &&
        y.createElement(L, {
          sideCar: Ob,
          removeScrollBar: g,
          shards: v,
          noRelative: A,
          noIsolation: N,
          inert: w,
          setCallbacks: c,
          allowPinchZoom: !!E,
          lockRef: s,
          gapMode: P,
        }),
      u
        ? y.cloneElement(y.Children.only(f), qn(qn({}, j), { ref: q }))
        : y.createElement(D, qn({}, j, { className: p, ref: q }), f),
    );
  });
Lc.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Lc.classNames = { fullWidth: ic, zeroRight: lc };
var t3 = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function n3() {
  if (!document) return null;
  var t = document.createElement("style");
  t.type = "text/css";
  var a = t3();
  return (a && t.setAttribute("nonce", a), t);
}
function a3(t, a) {
  t.styleSheet
    ? (t.styleSheet.cssText = a)
    : t.appendChild(document.createTextNode(a));
}
function r3(t) {
  var a = document.head || document.getElementsByTagName("head")[0];
  a.appendChild(t);
}
var s3 = function () {
    var t = 0,
      a = null;
    return {
      add: function (s) {
        (t == 0 && (a = n3()) && (a3(a, s), r3(a)), t++);
      },
      remove: function () {
        (t--,
          !t && a && (a.parentNode && a.parentNode.removeChild(a), (a = null)));
      },
    };
  },
  o3 = function () {
    var t = s3();
    return function (a, s) {
      y.useEffect(
        function () {
          return (
            t.add(a),
            function () {
              t.remove();
            }
          );
        },
        [a && s],
      );
    };
  },
  _b = function () {
    var t = o3(),
      a = function (s) {
        var o = s.styles,
          i = s.dynamic;
        return (t(o, i), null);
      };
    return a;
  },
  l3 = { left: 0, top: 0, right: 0, gap: 0 },
  Tf = function (t) {
    return parseInt(t || "", 10) || 0;
  },
  i3 = function (t) {
    var a = window.getComputedStyle(document.body),
      s = a[t === "padding" ? "paddingLeft" : "marginLeft"],
      o = a[t === "padding" ? "paddingTop" : "marginTop"],
      i = a[t === "padding" ? "paddingRight" : "marginRight"];
    return [Tf(s), Tf(o), Tf(i)];
  },
  c3 = function (t) {
    if ((t === void 0 && (t = "margin"), typeof window > "u")) return l3;
    var a = i3(t),
      s = document.documentElement.clientWidth,
      o = window.innerWidth;
    return {
      left: a[0],
      top: a[1],
      right: a[2],
      gap: Math.max(0, o - s + a[2] - a[0]),
    };
  },
  u3 = _b(),
  Vs = "data-scroll-locked",
  d3 = function (t, a, s, o) {
    var i = t.left,
      c = t.top,
      u = t.right,
      f = t.gap;
    return (
      s === void 0 && (s = "margin"),
      `
  .`
        .concat(
          $j,
          ` {
   overflow: hidden `,
        )
        .concat(
          o,
          `;
   padding-right: `,
        )
        .concat(f, "px ")
        .concat(
          o,
          `;
  }
  body[`,
        )
        .concat(
          Vs,
          `] {
    overflow: hidden `,
        )
        .concat(
          o,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            a && "position: relative ".concat(o, ";"),
            s === "margin" &&
              `
    padding-left: `
                .concat(
                  i,
                  `px;
    padding-top: `,
                )
                .concat(
                  c,
                  `px;
    padding-right: `,
                )
                .concat(
                  u,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(f, "px ")
                .concat(
                  o,
                  `;
    `,
                ),
            s === "padding" &&
              "padding-right: ".concat(f, "px ").concat(o, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          lc,
          ` {
    right: `,
        )
        .concat(f, "px ")
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(
          ic,
          ` {
    margin-right: `,
        )
        .concat(f, "px ")
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(lc, " .")
        .concat(
          lc,
          ` {
    right: 0 `,
        )
        .concat(
          o,
          `;
  }
  
  .`,
        )
        .concat(ic, " .")
        .concat(
          ic,
          ` {
    margin-right: 0 `,
        )
        .concat(
          o,
          `;
  }
  
  body[`,
        )
        .concat(
          Vs,
          `] {
    `,
        )
        .concat(Gj, ": ")
        .concat(
          f,
          `px;
  }
`,
        )
    );
  },
  dx = function () {
    var t = parseInt(document.body.getAttribute(Vs) || "0", 10);
    return isFinite(t) ? t : 0;
  },
  f3 = function () {
    y.useEffect(function () {
      return (
        document.body.setAttribute(Vs, (dx() + 1).toString()),
        function () {
          var t = dx() - 1;
          t <= 0
            ? document.body.removeAttribute(Vs)
            : document.body.setAttribute(Vs, t.toString());
        }
      );
    }, []);
  },
  h3 = function (t) {
    var a = t.noRelative,
      s = t.noImportant,
      o = t.gapMode,
      i = o === void 0 ? "margin" : o;
    f3();
    var c = y.useMemo(
      function () {
        return c3(i);
      },
      [i],
    );
    return y.createElement(u3, { styles: d3(c, !a, i, s ? "" : "!important") });
  },
  sh = !1;
if (typeof window < "u")
  try {
    var Zi = Object.defineProperty({}, "passive", {
      get: function () {
        return ((sh = !0), !0);
      },
    });
    (window.addEventListener("test", Zi, Zi),
      window.removeEventListener("test", Zi, Zi));
  } catch {
    sh = !1;
  }
var Hs = sh ? { passive: !1 } : !1,
  p3 = function (t) {
    return t.tagName === "TEXTAREA";
  },
  jb = function (t, a) {
    if (!(t instanceof Element)) return !1;
    var s = window.getComputedStyle(t);
    return (
      s[a] !== "hidden" &&
      !(s.overflowY === s.overflowX && !p3(t) && s[a] === "visible")
    );
  },
  m3 = function (t) {
    return jb(t, "overflowY");
  },
  g3 = function (t) {
    return jb(t, "overflowX");
  },
  fx = function (t, a) {
    var s = a.ownerDocument,
      o = a;
    do {
      typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
      var i = Tb(t, o);
      if (i) {
        var c = Mb(t, o),
          u = c[1],
          f = c[2];
        if (u > f) return !0;
      }
      o = o.parentNode;
    } while (o && o !== s.body);
    return !1;
  },
  v3 = function (t) {
    var a = t.scrollTop,
      s = t.scrollHeight,
      o = t.clientHeight;
    return [a, s, o];
  },
  y3 = function (t) {
    var a = t.scrollLeft,
      s = t.scrollWidth,
      o = t.clientWidth;
    return [a, s, o];
  },
  Tb = function (t, a) {
    return t === "v" ? m3(a) : g3(a);
  },
  Mb = function (t, a) {
    return t === "v" ? v3(a) : y3(a);
  },
  x3 = function (t, a) {
    return t === "h" && a === "rtl" ? -1 : 1;
  },
  b3 = function (t, a, s, o, i) {
    var c = x3(t, window.getComputedStyle(a).direction),
      u = c * o,
      f = s.target,
      p = a.contains(f),
      g = !1,
      x = u > 0,
      v = 0,
      S = 0;
    do {
      if (!f) break;
      var A = Mb(t, f),
        N = A[0],
        w = A[1],
        E = A[2],
        O = w - E - c * N;
      (N || O) && Tb(t, f) && ((v += O), (S += N));
      var D = f.parentNode;
      f = D && D.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? D.host : D;
    } while ((!p && f !== document.body) || (p && (a.contains(f) || a === f)));
    return (((x && Math.abs(v) < 1) || (!x && Math.abs(S) < 1)) && (g = !0), g);
  },
  Wi = function (t) {
    return "changedTouches" in t
      ? [t.changedTouches[0].clientX, t.changedTouches[0].clientY]
      : [0, 0];
  },
  hx = function (t) {
    return [t.deltaX, t.deltaY];
  },
  px = function (t) {
    return t && "current" in t ? t.current : t;
  },
  S3 = function (t, a) {
    return t[0] === a[0] && t[1] === a[1];
  },
  w3 = function (t) {
    return `
  .block-interactivity-`
      .concat(
        t,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        t,
        ` {pointer-events: all;}
`,
      );
  },
  E3 = 0,
  Ls = [];
function C3(t) {
  var a = y.useRef([]),
    s = y.useRef([0, 0]),
    o = y.useRef(),
    i = y.useState(E3++)[0],
    c = y.useState(_b)[0],
    u = y.useRef(t);
  (y.useEffect(
    function () {
      u.current = t;
    },
    [t],
  ),
    y.useEffect(
      function () {
        if (t.inert) {
          document.body.classList.add("block-interactivity-".concat(i));
          var w = Yj([t.lockRef.current], (t.shards || []).map(px), !0).filter(
            Boolean,
          );
          return (
            w.forEach(function (E) {
              return E.classList.add("allow-interactivity-".concat(i));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(i)),
                w.forEach(function (E) {
                  return E.classList.remove("allow-interactivity-".concat(i));
                }));
            }
          );
        }
      },
      [t.inert, t.lockRef.current, t.shards],
    ));
  var f = y.useCallback(function (w, E) {
      if (
        ("touches" in w && w.touches.length === 2) ||
        (w.type === "wheel" && w.ctrlKey)
      )
        return !u.current.allowPinchZoom;
      var O = Wi(w),
        D = s.current,
        P = "deltaX" in w ? w.deltaX : D[0] - O[0],
        G = "deltaY" in w ? w.deltaY : D[1] - O[1],
        L,
        q = w.target,
        j = Math.abs(P) > Math.abs(G) ? "h" : "v";
      if ("touches" in w && j === "h" && q.type === "range") return !1;
      var R = window.getSelection(),
        U = R && R.anchorNode,
        $ = U ? U === q || U.contains(q) : !1;
      if ($) return !1;
      var Z = fx(j, q);
      if (!Z) return !0;
      if ((Z ? (L = j) : ((L = j === "v" ? "h" : "v"), (Z = fx(j, q))), !Z))
        return !1;
      if (
        (!o.current && "changedTouches" in w && (P || G) && (o.current = L), !L)
      )
        return !0;
      var W = o.current || L;
      return b3(W, E, w, W === "h" ? P : G);
    }, []),
    p = y.useCallback(function (w) {
      var E = w;
      if (!(!Ls.length || Ls[Ls.length - 1] !== c)) {
        var O = "deltaY" in E ? hx(E) : Wi(E),
          D = a.current.filter(function (L) {
            return (
              L.name === E.type &&
              (L.target === E.target || E.target === L.shadowParent) &&
              S3(L.delta, O)
            );
          })[0];
        if (D && D.should) {
          E.cancelable && E.preventDefault();
          return;
        }
        if (!D) {
          var P = (u.current.shards || [])
              .map(px)
              .filter(Boolean)
              .filter(function (L) {
                return L.contains(E.target);
              }),
            G = P.length > 0 ? f(E, P[0]) : !u.current.noIsolation;
          G && E.cancelable && E.preventDefault();
        }
      }
    }, []),
    g = y.useCallback(function (w, E, O, D) {
      var P = { name: w, delta: E, target: O, should: D, shadowParent: A3(O) };
      (a.current.push(P),
        setTimeout(function () {
          a.current = a.current.filter(function (G) {
            return G !== P;
          });
        }, 1));
    }, []),
    x = y.useCallback(function (w) {
      ((s.current = Wi(w)), (o.current = void 0));
    }, []),
    v = y.useCallback(function (w) {
      g(w.type, hx(w), w.target, f(w, t.lockRef.current));
    }, []),
    S = y.useCallback(function (w) {
      g(w.type, Wi(w), w.target, f(w, t.lockRef.current));
    }, []);
  y.useEffect(function () {
    return (
      Ls.push(c),
      t.setCallbacks({
        onScrollCapture: v,
        onWheelCapture: v,
        onTouchMoveCapture: S,
      }),
      document.addEventListener("wheel", p, Hs),
      document.addEventListener("touchmove", p, Hs),
      document.addEventListener("touchstart", x, Hs),
      function () {
        ((Ls = Ls.filter(function (w) {
          return w !== c;
        })),
          document.removeEventListener("wheel", p, Hs),
          document.removeEventListener("touchmove", p, Hs),
          document.removeEventListener("touchstart", x, Hs));
      }
    );
  }, []);
  var A = t.removeScrollBar,
    N = t.inert;
  return y.createElement(
    y.Fragment,
    null,
    N ? y.createElement(c, { styles: w3(i) }) : null,
    A
      ? y.createElement(h3, { noRelative: t.noRelative, gapMode: t.gapMode })
      : null,
  );
}
function A3(t) {
  for (var a = null; t !== null; )
    (t instanceof ShadowRoot && ((a = t.host), (t = t.host)),
      (t = t.parentNode));
  return a;
}
const N3 = e3(Ob, C3);
var Fh = y.forwardRef(function (t, a) {
  return y.createElement(Lc, qn({}, t, { ref: a, sideCar: N3 }));
});
Fh.classNames = Lc.classNames;
var R3 = function (t) {
    if (typeof document > "u") return null;
    var a = Array.isArray(t) ? t[0] : t;
    return a.ownerDocument.body;
  },
  Us = new WeakMap(),
  Ji = new WeakMap(),
  ec = {},
  Mf = 0,
  Db = function (t) {
    return t && (t.host || Db(t.parentNode));
  },
  O3 = function (t, a) {
    return a
      .map(function (s) {
        if (t.contains(s)) return s;
        var o = Db(s);
        return o && t.contains(o)
          ? o
          : (console.error(
              "aria-hidden",
              s,
              "in not contained inside",
              t,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (s) {
        return !!s;
      });
  },
  _3 = function (t, a, s, o) {
    var i = O3(a, Array.isArray(t) ? t : [t]);
    ec[s] || (ec[s] = new WeakMap());
    var c = ec[s],
      u = [],
      f = new Set(),
      p = new Set(i),
      g = function (v) {
        !v || f.has(v) || (f.add(v), g(v.parentNode));
      };
    i.forEach(g);
    var x = function (v) {
      !v ||
        p.has(v) ||
        Array.prototype.forEach.call(v.children, function (S) {
          if (f.has(S)) x(S);
          else
            try {
              var A = S.getAttribute(o),
                N = A !== null && A !== "false",
                w = (Us.get(S) || 0) + 1,
                E = (c.get(S) || 0) + 1;
              (Us.set(S, w),
                c.set(S, E),
                u.push(S),
                w === 1 && N && Ji.set(S, !0),
                E === 1 && S.setAttribute(s, "true"),
                N || S.setAttribute(o, "true"));
            } catch (O) {
              console.error("aria-hidden: cannot operate on ", S, O);
            }
        });
    };
    return (
      x(a),
      f.clear(),
      Mf++,
      function () {
        (u.forEach(function (v) {
          var S = Us.get(v) - 1,
            A = c.get(v) - 1;
          (Us.set(v, S),
            c.set(v, A),
            S || (Ji.has(v) || v.removeAttribute(o), Ji.delete(v)),
            A || v.removeAttribute(s));
        }),
          Mf--,
          Mf ||
            ((Us = new WeakMap()),
            (Us = new WeakMap()),
            (Ji = new WeakMap()),
            (ec = {})));
      }
    );
  },
  zb = function (t, a, s) {
    s === void 0 && (s = "data-aria-hidden");
    var o = Array.from(Array.isArray(t) ? t : [t]),
      i = R3(t);
    return i
      ? (o.push.apply(o, Array.from(i.querySelectorAll("[aria-live], script"))),
        _3(o, i, s, "aria-hidden"))
      : function () {
          return null;
        };
  };
function j3(t) {
  const a = T3(t),
    s = y.forwardRef((o, i) => {
      const { children: c, ...u } = o,
        f = y.Children.toArray(c),
        p = f.find(D3);
      if (p) {
        const g = p.props.children,
          x = f.map((v) =>
            v === p
              ? y.Children.count(g) > 1
                ? y.Children.only(null)
                : y.isValidElement(g)
                  ? g.props.children
                  : null
              : v,
          );
        return m.jsx(a, {
          ...u,
          ref: i,
          children: y.isValidElement(g) ? y.cloneElement(g, void 0, x) : null,
        });
      }
      return m.jsx(a, { ...u, ref: i, children: c });
    });
  return ((s.displayName = `${t}.Slot`), s);
}
function T3(t) {
  const a = y.forwardRef((s, o) => {
    const { children: i, ...c } = s;
    if (y.isValidElement(i)) {
      const u = P3(i),
        f = z3(c, i.props);
      return (
        i.type !== y.Fragment && (f.ref = o ? Ws(o, u) : u),
        y.cloneElement(i, f)
      );
    }
    return y.Children.count(i) > 1 ? y.Children.only(null) : null;
  });
  return ((a.displayName = `${t}.SlotClone`), a);
}
var M3 = Symbol("radix.slottable");
function D3(t) {
  return (
    y.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === M3
  );
}
function z3(t, a) {
  const s = { ...a };
  for (const o in a) {
    const i = t[o],
      c = a[o];
    /^on[A-Z]/.test(o)
      ? i && c
        ? (s[o] = (...f) => {
            const p = c(...f);
            return (i(...f), p);
          })
        : i && (s[o] = i)
      : o === "style"
        ? (s[o] = { ...i, ...c })
        : o === "className" && (s[o] = [i, c].filter(Boolean).join(" "));
  }
  return { ...t, ...s };
}
function P3(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
var Uc = "Dialog",
  [Pb, kb] = Gr(Uc),
  [k3, _n] = Pb(Uc),
  Hb = (t) => {
    const {
        __scopeDialog: a,
        children: s,
        open: o,
        defaultOpen: i,
        onOpenChange: c,
        modal: u = !0,
      } = t,
      f = y.useRef(null),
      p = y.useRef(null),
      [g, x] = gc({ prop: o, defaultProp: i ?? !1, onChange: c, caller: Uc });
    return m.jsx(k3, {
      scope: a,
      triggerRef: f,
      contentRef: p,
      contentId: Qs(),
      titleId: Qs(),
      descriptionId: Qs(),
      open: g,
      onOpenChange: x,
      onOpenToggle: y.useCallback(() => x((v) => !v), [x]),
      modal: u,
      children: s,
    });
  };
Hb.displayName = Uc;
var Lb = "DialogTrigger",
  Ub = y.forwardRef((t, a) => {
    const { __scopeDialog: s, ...o } = t,
      i = _n(Lb, s),
      c = qe(a, i.triggerRef);
    return m.jsx(ke.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": i.open,
      "aria-controls": i.contentId,
      "data-state": Zh(i.open),
      ...o,
      ref: c,
      onClick: ze(t.onClick, i.onOpenToggle),
    });
  });
Ub.displayName = Lb;
var Xh = "DialogPortal",
  [H3, Bb] = Pb(Xh, { forceMount: void 0 }),
  qb = (t) => {
    const { __scopeDialog: a, forceMount: s, children: o, container: i } = t,
      c = _n(Xh, a);
    return m.jsx(H3, {
      scope: a,
      forceMount: s,
      children: y.Children.map(o, (u) =>
        m.jsx(Na, {
          present: s || c.open,
          children: m.jsx(Gh, { asChild: !0, container: i, children: u }),
        }),
      ),
    });
  };
qb.displayName = Xh;
var vc = "DialogOverlay",
  Qb = y.forwardRef((t, a) => {
    const s = Bb(vc, t.__scopeDialog),
      { forceMount: o = s.forceMount, ...i } = t,
      c = _n(vc, t.__scopeDialog);
    return c.modal
      ? m.jsx(Na, {
          present: o || c.open,
          children: m.jsx(U3, { ...i, ref: a }),
        })
      : null;
  });
Qb.displayName = vc;
var L3 = j3("DialogOverlay.RemoveScroll"),
  U3 = y.forwardRef((t, a) => {
    const { __scopeDialog: s, ...o } = t,
      i = _n(vc, s);
    return m.jsx(Fh, {
      as: L3,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: m.jsx(ke.div, {
        "data-state": Zh(i.open),
        ...o,
        ref: a,
        style: { pointerEvents: "auto", ...o.style },
      }),
    });
  }),
  Br = "DialogContent",
  Vb = y.forwardRef((t, a) => {
    const s = Bb(Br, t.__scopeDialog),
      { forceMount: o = s.forceMount, ...i } = t,
      c = _n(Br, t.__scopeDialog);
    return m.jsx(Na, {
      present: o || c.open,
      children: c.modal
        ? m.jsx(B3, { ...i, ref: a })
        : m.jsx(q3, { ...i, ref: a }),
    });
  });
Vb.displayName = Br;
var B3 = y.forwardRef((t, a) => {
    const s = _n(Br, t.__scopeDialog),
      o = y.useRef(null),
      i = qe(a, s.contentRef, o);
    return (
      y.useEffect(() => {
        const c = o.current;
        if (c) return zb(c);
      }, []),
      m.jsx(Ib, {
        ...t,
        ref: i,
        trapFocus: s.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ze(t.onCloseAutoFocus, (c) => {
          (c.preventDefault(), s.triggerRef.current?.focus());
        }),
        onPointerDownOutside: ze(t.onPointerDownOutside, (c) => {
          const u = c.detail.originalEvent,
            f = u.button === 0 && u.ctrlKey === !0;
          (u.button === 2 || f) && c.preventDefault();
        }),
        onFocusOutside: ze(t.onFocusOutside, (c) => c.preventDefault()),
      })
    );
  }),
  q3 = y.forwardRef((t, a) => {
    const s = _n(Br, t.__scopeDialog),
      o = y.useRef(!1),
      i = y.useRef(!1);
    return m.jsx(Ib, {
      ...t,
      ref: a,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (c) => {
        (t.onCloseAutoFocus?.(c),
          c.defaultPrevented ||
            (o.current || s.triggerRef.current?.focus(), c.preventDefault()),
          (o.current = !1),
          (i.current = !1));
      },
      onInteractOutside: (c) => {
        (t.onInteractOutside?.(c),
          c.defaultPrevented ||
            ((o.current = !0),
            c.detail.originalEvent.type === "pointerdown" && (i.current = !0)));
        const u = c.target;
        (s.triggerRef.current?.contains(u) && c.preventDefault(),
          c.detail.originalEvent.type === "focusin" &&
            i.current &&
            c.preventDefault());
      },
    });
  }),
  Ib = y.forwardRef((t, a) => {
    const {
        __scopeDialog: s,
        trapFocus: o,
        onOpenAutoFocus: i,
        onCloseAutoFocus: c,
        ...u
      } = t,
      f = _n(Br, s),
      p = y.useRef(null),
      g = qe(a, p);
    return (
      Ab(),
      m.jsxs(m.Fragment, {
        children: [
          m.jsx($h, {
            asChild: !0,
            loop: !0,
            trapped: o,
            onMountAutoFocus: i,
            onUnmountAutoFocus: c,
            children: m.jsx(Yh, {
              role: "dialog",
              id: f.contentId,
              "aria-describedby": f.descriptionId,
              "aria-labelledby": f.titleId,
              "data-state": Zh(f.open),
              ...u,
              ref: g,
              onDismiss: () => f.onOpenChange(!1),
            }),
          }),
          m.jsxs(m.Fragment, {
            children: [
              m.jsx(V3, { titleId: f.titleId }),
              m.jsx(Y3, { contentRef: p, descriptionId: f.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Kh = "DialogTitle",
  Yb = y.forwardRef((t, a) => {
    const { __scopeDialog: s, ...o } = t,
      i = _n(Kh, s);
    return m.jsx(ke.h2, { id: i.titleId, ...o, ref: a });
  });
Yb.displayName = Kh;
var $b = "DialogDescription",
  Gb = y.forwardRef((t, a) => {
    const { __scopeDialog: s, ...o } = t,
      i = _n($b, s);
    return m.jsx(ke.p, { id: i.descriptionId, ...o, ref: a });
  });
Gb.displayName = $b;
var Fb = "DialogClose",
  Xb = y.forwardRef((t, a) => {
    const { __scopeDialog: s, ...o } = t,
      i = _n(Fb, s);
    return m.jsx(ke.button, {
      type: "button",
      ...o,
      ref: a,
      onClick: ze(t.onClick, () => i.onOpenChange(!1)),
    });
  });
Xb.displayName = Fb;
function Zh(t) {
  return t ? "open" : "closed";
}
var Kb = "DialogTitleWarning",
  [Q3, Zb] = dj(Kb, { contentName: Br, titleName: Kh, docsSlug: "dialog" }),
  V3 = ({ titleId: t }) => {
    const a = Zb(Kb),
      s = `\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;
    return (
      y.useEffect(() => {
        t && (document.getElementById(t) || console.error(s));
      }, [s, t]),
      null
    );
  },
  I3 = "DialogDescriptionWarning",
  Y3 = ({ contentRef: t, descriptionId: a }) => {
    const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Zb(I3).contentName}}.`;
    return (
      y.useEffect(() => {
        const i = t.current?.getAttribute("aria-describedby");
        a && i && (document.getElementById(a) || console.warn(o));
      }, [o, t, a]),
      null
    );
  },
  Wb = Hb,
  Jb = Ub,
  e1 = qb,
  t1 = Qb,
  n1 = Vb,
  $3 = Yb,
  G3 = Gb,
  Wh = Xb;
function F3({ ...t }) {
  return m.jsx(Wb, {
    "code-path": "src/components/ui/sheet.tsx:8:10",
    "data-slot": "sheet",
    ...t,
  });
}
function X3({ ...t }) {
  return m.jsx(Jb, {
    "code-path": "src/components/ui/sheet.tsx:14:10",
    "data-slot": "sheet-trigger",
    ...t,
  });
}
function K3({ ...t }) {
  return m.jsx(e1, {
    "code-path": "src/components/ui/sheet.tsx:26:10",
    "data-slot": "sheet-portal",
    ...t,
  });
}
function Z3({ className: t, ...a }) {
  return m.jsx(t1, {
    "code-path": "src/components/ui/sheet.tsx:34:5",
    "data-slot": "sheet-overlay",
    className: Fe(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      t,
    ),
    ...a,
  });
}
function W3({ className: t, children: a, side: s = "right", ...o }) {
  return m.jsxs(K3, {
    "code-path": "src/components/ui/sheet.tsx:54:5",
    children: [
      m.jsx(Z3, { "code-path": "src/components/ui/sheet.tsx:55:7" }),
      m.jsxs(n1, {
        "code-path": "src/components/ui/sheet.tsx:56:7",
        "data-slot": "sheet-content",
        className: Fe(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          s === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          s === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          s === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          s === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          t,
        ),
        ...o,
        children: [
          a,
          m.jsxs(Wh, {
            "code-path": "src/components/ui/sheet.tsx:73:9",
            className:
              "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
            children: [
              m.jsx(MO, {
                "code-path": "src/components/ui/sheet.tsx:74:11",
                className: "size-4",
              }),
              m.jsx("span", {
                "code-path": "src/components/ui/sheet.tsx:75:11",
                className: "sr-only",
                children: "Close",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const mx = [
  { path: "/", label: "Home", icon: lO },
  { path: "/extract", label: "Audio Extractor", icon: Ur },
  { path: "/playlist", label: "Playlist", icon: ml },
  { path: "/history", label: "History", icon: tb },
  { path: "/settings", label: "Settings", icon: EO },
];
function J3({ children: t }) {
  const a = Zn(),
    { user: s, logout: o } = uj(),
    [i, c] = y.useState(!1),
    u = (f) => a.pathname === f;
  return m.jsxs("div", {
    "code-path": "src/components/AppLayout.tsx:34:5",
    className: "min-h-screen bg-background flex",
    children: [
      m.jsxs("aside", {
        "code-path": "src/components/AppLayout.tsx:36:7",
        className:
          "hidden lg:flex flex-col w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm fixed h-full z-30",
        children: [
          m.jsxs("div", {
            "code-path": "src/components/AppLayout.tsx:37:9",
            className: "p-5 flex items-center gap-3",
            children: [
              m.jsx("div", {
                "code-path": "src/components/AppLayout.tsx:38:11",
                className:
                  "w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center",
                children: m.jsx(ll, {
                  "code-path": "src/components/AppLayout.tsx:39:13",
                  className: "w-5 h-5 text-white",
                }),
              }),
              m.jsxs("div", {
                "code-path": "src/components/AppLayout.tsx:41:11",
                children: [
                  m.jsx("h1", {
                    "code-path": "src/components/AppLayout.tsx:42:13",
                    className: "font-bold text-sm leading-tight",
                    children: "YT Extractor",
                  }),
                  m.jsx("p", {
                    "code-path": "src/components/AppLayout.tsx:43:13",
                    className: "text-[10px] text-muted-foreground",
                    children: "Audio & Video",
                  }),
                ],
              }),
            ],
          }),
          m.jsx("nav", {
            "code-path": "src/components/AppLayout.tsx:47:9",
            className: "flex-1 px-3 py-4 space-y-1",
            children: mx.map((f) => {
              const p = f.icon,
                g = u(f.path);
              return m.jsxs(
                tn,
                {
                  "code-path": "src/components/AppLayout.tsx:52:15",
                  to: f.path,
                  className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${g ? "bg-primary/15 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                  children: [
                    m.jsx(p, {
                      "code-path": "src/components/AppLayout.tsx:61:17",
                      className: `w-4.5 h-4.5 ${g ? "text-primary" : ""}`,
                    }),
                    f.label,
                  ],
                },
                f.path,
              );
            }),
          }),
          m.jsx("div", {
            "code-path": "src/components/AppLayout.tsx:68:9",
            className: "p-3 border-t border-border/50",
            children: s
              ? m.jsxs("div", {
                  "code-path": "src/components/AppLayout.tsx:70:13",
                  className: "flex items-center gap-2 px-3 py-2",
                  children: [
                    s.avatar
                      ? m.jsx("img", {
                          "code-path": "src/components/AppLayout.tsx:72:17",
                          src: s.avatar,
                          alt: "",
                          className: "w-7 h-7 rounded-full",
                        })
                      : m.jsx("div", {
                          "code-path": "src/components/AppLayout.tsx:78:17",
                          className:
                            "w-7 h-7 rounded-full bg-muted flex items-center justify-center",
                          children: m.jsx(gl, {
                            "code-path": "src/components/AppLayout.tsx:79:19",
                            className: "w-3.5 h-3.5",
                          }),
                        }),
                    m.jsx("span", {
                      "code-path": "src/components/AppLayout.tsx:82:15",
                      className: "text-sm flex-1 truncate",
                      children: s.name || "User",
                    }),
                    m.jsx("button", {
                      "code-path": "src/components/AppLayout.tsx:83:15",
                      onClick: o,
                      className:
                        "p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors",
                      children: m.jsx($y, {
                        "code-path": "src/components/AppLayout.tsx:87:17",
                        className: "w-3.5 h-3.5",
                      }),
                    }),
                  ],
                })
              : m.jsx(et, {
                  "code-path": "src/components/AppLayout.tsx:91:13",
                  variant: "ghost",
                  size: "sm",
                  className: "w-full",
                  asChild: !0,
                  children: m.jsx(tn, {
                    "code-path": "src/components/AppLayout.tsx:92:15",
                    to: "/login",
                    children: "Sign In",
                  }),
                }),
          }),
        ],
      }),
      m.jsx("div", {
        "code-path": "src/components/AppLayout.tsx:99:7",
        className:
          "lg:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50",
        children: m.jsxs("div", {
          "code-path": "src/components/AppLayout.tsx:100:9",
          className: "flex items-center justify-between px-4 py-3",
          children: [
            m.jsxs("div", {
              "code-path": "src/components/AppLayout.tsx:101:11",
              className: "flex items-center gap-2.5",
              children: [
                m.jsx("div", {
                  "code-path": "src/components/AppLayout.tsx:102:13",
                  className:
                    "w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center",
                  children: m.jsx(ll, {
                    "code-path": "src/components/AppLayout.tsx:103:15",
                    className: "w-4 h-4 text-white",
                  }),
                }),
                m.jsx("span", {
                  "code-path": "src/components/AppLayout.tsx:105:13",
                  className: "font-bold text-sm",
                  children: "YT Extractor",
                }),
              ],
            }),
            m.jsxs(F3, {
              "code-path": "src/components/AppLayout.tsx:107:11",
              open: i,
              onOpenChange: c,
              children: [
                m.jsx(X3, {
                  "code-path": "src/components/AppLayout.tsx:108:13",
                  asChild: !0,
                  children: m.jsx(et, {
                    "code-path": "src/components/AppLayout.tsx:109:15",
                    variant: "ghost",
                    size: "icon",
                    className: "h-9 w-9",
                    children: m.jsx(hO, {
                      "code-path": "src/components/AppLayout.tsx:110:17",
                      className: "w-5 h-5",
                    }),
                  }),
                }),
                m.jsx(W3, {
                  "code-path": "src/components/AppLayout.tsx:113:13",
                  side: "right",
                  className: "w-72 bg-background border-l border-border/50 p-0",
                  children: m.jsxs("div", {
                    "code-path": "src/components/AppLayout.tsx:117:15",
                    className: "flex flex-col h-full",
                    children: [
                      m.jsx("div", {
                        "code-path": "src/components/AppLayout.tsx:118:17",
                        className: "p-5 flex items-center justify-between",
                        children: m.jsxs("div", {
                          "code-path": "src/components/AppLayout.tsx:119:19",
                          className: "flex items-center gap-3",
                          children: [
                            m.jsx("div", {
                              "code-path":
                                "src/components/AppLayout.tsx:120:21",
                              className:
                                "w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center",
                              children: m.jsx(ll, {
                                "code-path":
                                  "src/components/AppLayout.tsx:121:23",
                                className: "w-4 h-4 text-white",
                              }),
                            }),
                            m.jsx("span", {
                              "code-path":
                                "src/components/AppLayout.tsx:123:21",
                              className: "font-bold text-sm",
                              children: "YT Extractor",
                            }),
                          ],
                        }),
                      }),
                      m.jsx("nav", {
                        "code-path": "src/components/AppLayout.tsx:126:17",
                        className: "flex-1 px-3 py-4 space-y-1",
                        children: mx.map((f) => {
                          const p = f.icon,
                            g = u(f.path);
                          return m.jsxs(
                            tn,
                            {
                              "code-path":
                                "src/components/AppLayout.tsx:131:23",
                              to: f.path,
                              onClick: () => c(!1),
                              className: `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${g ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                              children: [
                                m.jsx(p, {
                                  "code-path":
                                    "src/components/AppLayout.tsx:141:25",
                                  className: `w-5 h-5 ${g ? "text-primary" : ""}`,
                                }),
                                f.label,
                              ],
                            },
                            f.path,
                          );
                        }),
                      }),
                      m.jsx("div", {
                        "code-path": "src/components/AppLayout.tsx:149:17",
                        className: "p-4 border-t border-border/50",
                        children: s
                          ? m.jsxs("div", {
                              "code-path":
                                "src/components/AppLayout.tsx:151:21",
                              className: "flex items-center gap-2",
                              children: [
                                m.jsx("div", {
                                  "code-path":
                                    "src/components/AppLayout.tsx:152:23",
                                  className:
                                    "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
                                  children: m.jsx(gl, {
                                    "code-path":
                                      "src/components/AppLayout.tsx:153:25",
                                    className: "w-4 h-4",
                                  }),
                                }),
                                m.jsx("span", {
                                  "code-path":
                                    "src/components/AppLayout.tsx:155:23",
                                  className: "text-sm flex-1",
                                  children: s.name || "User",
                                }),
                                m.jsx("button", {
                                  "code-path":
                                    "src/components/AppLayout.tsx:156:23",
                                  onClick: o,
                                  className:
                                    "p-2 rounded-md hover:bg-destructive/10 text-muted-foreground",
                                  children: m.jsx($y, {
                                    "code-path":
                                      "src/components/AppLayout.tsx:157:25",
                                    className: "w-4 h-4",
                                  }),
                                }),
                              ],
                            })
                          : m.jsx(et, {
                              "code-path":
                                "src/components/AppLayout.tsx:161:21",
                              className: "w-full",
                              asChild: !0,
                              children: m.jsx(tn, {
                                "code-path":
                                  "src/components/AppLayout.tsx:162:23",
                                to: "/login",
                                onClick: () => c(!1),
                                children: "Sign In",
                              }),
                            }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      m.jsx("main", {
        "code-path": "src/components/AppLayout.tsx:173:7",
        className: "flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen",
        children: m.jsx("div", {
          "code-path": "src/components/AppLayout.tsx:174:9",
          className: "p-4 lg:p-8 max-w-6xl mx-auto",
          children: t,
        }),
      }),
    ],
  });
}
const eT = [
    {
      icon: Ur,
      title: "Audio Extraction",
      description:
        "Extract high-quality audio from any YouTube video in seconds. Supports MP3, WAV, M4A, OGG, and WebM formats.",
      color: "from-orange-400 to-amber-500",
    },
    {
      icon: Hc,
      title: "Video Downloader",
      description:
        "Download full videos in multiple qualities. Choose from 360p to best available resolution.",
      color: "from-red-400 to-orange-500",
    },
    {
      icon: ml,
      title: "Playlist Processing",
      description:
        "Convert entire playlists with one click. Edit metadata for each track individually before downloading.",
      color: "from-amber-400 to-yellow-500",
    },
    {
      icon: ab,
      title: "Metadata Editor",
      description:
        "Edit song titles, artist names, album info, and filenames before downloading your audio files.",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: qh,
      title: "Lightning Fast",
      description:
        "Powered by yt-dlp for maximum download speed. Optimized backend for quick processing and delivery.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: eh,
      title: "Private & Secure",
      description:
        "Your download history stays on your device using IndexedDB. No tracking, no data collection.",
      color: "from-violet-400 to-purple-500",
    },
  ],
  tT = [
    { icon: Pc, label: "Audio Formats", value: "5+" },
    { icon: Bh, label: "Avg. Process Time", value: "< 30s" },
    { icon: qs, label: "Max Quality", value: "320kbps" },
    { icon: ll, label: "Supported Sites", value: "YouTube" },
  ];
function nT() {
  return m.jsxs("div", {
    "code-path": "src/pages/Home.tsx:64:5",
    className: "space-y-12 pb-8",
    children: [
      m.jsxs("section", {
        "code-path": "src/pages/Home.tsx:66:7",
        className:
          "relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted border border-border/50 p-8 md:p-12 lg:p-16",
        children: [
          m.jsx("div", {
            "code-path": "src/pages/Home.tsx:67:9",
            className:
              "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(25_95%_53%_/_0.08)_0%,_transparent_50%)]",
          }),
          m.jsx("div", {
            "code-path": "src/pages/Home.tsx:68:9",
            className:
              "absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(35_95%_53%_/_0.05)_0%,_transparent_50%)]",
          }),
          m.jsxs("div", {
            "code-path": "src/pages/Home.tsx:70:9",
            className: "relative z-10 text-center space-y-6 max-w-2xl mx-auto",
            children: [
              m.jsxs("div", {
                "code-path": "src/pages/Home.tsx:71:11",
                className:
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium",
                children: [
                  m.jsx(qh, {
                    "code-path": "src/pages/Home.tsx:72:13",
                    className: "w-3.5 h-3.5",
                  }),
                  "Free & Unlimited",
                ],
              }),
              m.jsxs("h1", {
                "code-path": "src/pages/Home.tsx:76:11",
                className:
                  "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
                children: [
                  "Extract Audio from",
                  " ",
                  m.jsx("span", {
                    "code-path": "src/pages/Home.tsx:78:13",
                    className: "gradient-text",
                    children: "YouTube",
                  }),
                  " Videos",
                ],
              }),
              m.jsx("p", {
                "code-path": "src/pages/Home.tsx:81:11",
                className:
                  "text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto",
                children:
                  "Convert YouTube videos to high-quality audio files. Download entire playlists, edit metadata, and keep track of your downloads — all in one elegant interface.",
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Home.tsx:87:11",
                className:
                  "flex flex-col sm:flex-row gap-3 justify-center pt-2",
                children: [
                  m.jsx(et, {
                    "code-path": "src/pages/Home.tsx:88:13",
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20 gap-2",
                    asChild: !0,
                    children: m.jsxs(tn, {
                      "code-path": "src/pages/Home.tsx:93:15",
                      to: "/extract",
                      children: [
                        m.jsx(Ur, {
                          "code-path": "src/pages/Home.tsx:94:17",
                          className: "w-4 h-4",
                        }),
                        "Extract Audio",
                      ],
                    }),
                  }),
                  m.jsx(et, {
                    "code-path": "src/pages/Home.tsx:98:13",
                    size: "lg",
                    variant: "outline",
                    className: "border-border/80 hover:bg-muted gap-2",
                    asChild: !0,
                    children: m.jsxs(tn, {
                      "code-path": "src/pages/Home.tsx:104:15",
                      to: "/playlist",
                      children: [
                        m.jsx(ml, {
                          "code-path": "src/pages/Home.tsx:105:17",
                          className: "w-4 h-4",
                        }),
                        "Process Playlist",
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      m.jsxs("section", {
        "code-path": "src/pages/Home.tsx:114:7",
        children: [
          m.jsx("h2", {
            "code-path": "src/pages/Home.tsx:115:9",
            className: "text-lg font-semibold mb-4",
            children: "Quick Actions",
          }),
          m.jsxs("div", {
            "code-path": "src/pages/Home.tsx:116:9",
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
            children: [
              m.jsxs(tn, {
                "code-path": "src/pages/Home.tsx:117:11",
                to: "/extract",
                className:
                  "group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                children: [
                  m.jsx("div", {
                    "code-path": "src/pages/Home.tsx:121:13",
                    className:
                      "w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    children: m.jsx(Ur, {
                      "code-path": "src/pages/Home.tsx:122:15",
                      className: "w-5 h-5 text-white",
                    }),
                  }),
                  m.jsx("h3", {
                    "code-path": "src/pages/Home.tsx:124:13",
                    className: "font-semibold text-sm mb-1",
                    children: "Single Audio",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Home.tsx:125:13",
                    className: "text-xs text-muted-foreground",
                    children: "Extract audio from one video",
                  }),
                ],
              }),
              m.jsxs(tn, {
                "code-path": "src/pages/Home.tsx:130:11",
                to: "/playlist",
                className:
                  "group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                children: [
                  m.jsx("div", {
                    "code-path": "src/pages/Home.tsx:134:13",
                    className:
                      "w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    children: m.jsx(ml, {
                      "code-path": "src/pages/Home.tsx:135:15",
                      className: "w-5 h-5 text-white",
                    }),
                  }),
                  m.jsx("h3", {
                    "code-path": "src/pages/Home.tsx:137:13",
                    className: "font-semibold text-sm mb-1",
                    children: "Batch Playlist",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Home.tsx:138:13",
                    className: "text-xs text-muted-foreground",
                    children: "Convert entire playlists",
                  }),
                ],
              }),
              m.jsxs(tn, {
                "code-path": "src/pages/Home.tsx:143:11",
                to: "/extract?mode=video",
                className:
                  "group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                children: [
                  m.jsx("div", {
                    "code-path": "src/pages/Home.tsx:147:13",
                    className:
                      "w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    children: m.jsx(Hc, {
                      "code-path": "src/pages/Home.tsx:148:15",
                      className: "w-5 h-5 text-white",
                    }),
                  }),
                  m.jsx("h3", {
                    "code-path": "src/pages/Home.tsx:150:13",
                    className: "font-semibold text-sm mb-1",
                    children: "Video Download",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Home.tsx:151:13",
                    className: "text-xs text-muted-foreground",
                    children: "Download full video files",
                  }),
                ],
              }),
              m.jsxs(tn, {
                "code-path": "src/pages/Home.tsx:156:11",
                to: "/history",
                className:
                  "group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                children: [
                  m.jsx("div", {
                    "code-path": "src/pages/Home.tsx:160:13",
                    className:
                      "w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                    children: m.jsx(Bh, {
                      "code-path": "src/pages/Home.tsx:161:15",
                      className: "w-5 h-5 text-white",
                    }),
                  }),
                  m.jsx("h3", {
                    "code-path": "src/pages/Home.tsx:163:13",
                    className: "font-semibold text-sm mb-1",
                    children: "History",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Home.tsx:164:13",
                    className: "text-xs text-muted-foreground",
                    children: "View past downloads",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      m.jsx("section", {
        "code-path": "src/pages/Home.tsx:172:7",
        className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
        children: tT.map((t) => {
          const a = t.icon;
          return m.jsxs(
            "div",
            {
              "code-path": "src/pages/Home.tsx:176:13",
              className: "glass-card rounded-xl p-5 text-center",
              children: [
                m.jsx(a, {
                  "code-path": "src/pages/Home.tsx:180:15",
                  className: "w-5 h-5 text-primary mx-auto mb-2",
                }),
                m.jsx("div", {
                  "code-path": "src/pages/Home.tsx:181:15",
                  className: "text-2xl font-bold gradient-text mb-0.5",
                  children: t.value,
                }),
                m.jsx("div", {
                  "code-path": "src/pages/Home.tsx:184:15",
                  className: "text-xs text-muted-foreground",
                  children: t.label,
                }),
              ],
            },
            t.label,
          );
        }),
      }),
      m.jsxs("section", {
        "code-path": "src/pages/Home.tsx:191:7",
        children: [
          m.jsx("h2", {
            "code-path": "src/pages/Home.tsx:192:9",
            className: "text-lg font-semibold mb-4",
            children: "Features",
          }),
          m.jsx("div", {
            "code-path": "src/pages/Home.tsx:193:9",
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: eT.map((t) => {
              const a = t.icon;
              return m.jsxs(
                "div",
                {
                  "code-path": "src/pages/Home.tsx:197:15",
                  className:
                    "glass-card rounded-xl p-5 hover:border-border transition-all duration-300",
                  children: [
                    m.jsx("div", {
                      "code-path": "src/pages/Home.tsx:201:17",
                      className: `w-9 h-9 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mb-3`,
                      children: m.jsx(a, {
                        "code-path": "src/pages/Home.tsx:204:19",
                        className: "w-4.5 h-4.5 text-white",
                      }),
                    }),
                    m.jsx("h3", {
                      "code-path": "src/pages/Home.tsx:206:17",
                      className: "font-semibold text-sm mb-1.5",
                      children: t.title,
                    }),
                    m.jsx("p", {
                      "code-path": "src/pages/Home.tsx:209:17",
                      className:
                        "text-xs text-muted-foreground leading-relaxed",
                      children: t.description,
                    }),
                  ],
                },
                t.title,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
function Qn({ className: t, type: a, ...s }) {
  return m.jsx("input", {
    "code-path": "src/components/ui/input.tsx:7:5",
    type: a,
    "data-slot": "input",
    className: Fe(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      t,
    ),
    ...s,
  });
}
var aT = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  rT = aT.reduce((t, a) => {
    const s = Qh(`Primitive.${a}`),
      o = y.forwardRef((i, c) => {
        const { asChild: u, ...f } = i,
          p = u ? s : a;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          m.jsx(p, { ...f, ref: c })
        );
      });
    return ((o.displayName = `Primitive.${a}`), { ...t, [a]: o });
  }, {}),
  sT = "Label",
  a1 = y.forwardRef((t, a) =>
    m.jsx(rT.label, {
      ...t,
      ref: a,
      onMouseDown: (s) => {
        s.target.closest("button, input, select, textarea") ||
          (t.onMouseDown?.(s),
          !s.defaultPrevented && s.detail > 1 && s.preventDefault());
      },
    }),
  );
a1.displayName = sT;
var oT = a1;
function Bn({ className: t, ...a }) {
  return m.jsx(oT, {
    "code-path": "src/components/ui/label.tsx:13:5",
    "data-slot": "label",
    className: Fe(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      t,
    ),
    ...a,
  });
}
function oh(t, [a, s]) {
  return Math.min(s, Math.max(a, t));
}
function gx(t) {
  const a = lT(t),
    s = y.forwardRef((o, i) => {
      const { children: c, ...u } = o,
        f = y.Children.toArray(c),
        p = f.find(cT);
      if (p) {
        const g = p.props.children,
          x = f.map((v) =>
            v === p
              ? y.Children.count(g) > 1
                ? y.Children.only(null)
                : y.isValidElement(g)
                  ? g.props.children
                  : null
              : v,
          );
        return m.jsx(a, {
          ...u,
          ref: i,
          children: y.isValidElement(g) ? y.cloneElement(g, void 0, x) : null,
        });
      }
      return m.jsx(a, { ...u, ref: i, children: c });
    });
  return ((s.displayName = `${t}.Slot`), s);
}
function lT(t) {
  const a = y.forwardRef((s, o) => {
    const { children: i, ...c } = s;
    if (y.isValidElement(i)) {
      const u = dT(i),
        f = uT(c, i.props);
      return (
        i.type !== y.Fragment && (f.ref = o ? Ws(o, u) : u),
        y.cloneElement(i, f)
      );
    }
    return y.Children.count(i) > 1 ? y.Children.only(null) : null;
  });
  return ((a.displayName = `${t}.SlotClone`), a);
}
var iT = Symbol("radix.slottable");
function cT(t) {
  return (
    y.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === iT
  );
}
function uT(t, a) {
  const s = { ...a };
  for (const o in a) {
    const i = t[o],
      c = a[o];
    /^on[A-Z]/.test(o)
      ? i && c
        ? (s[o] = (...f) => {
            const p = c(...f);
            return (i(...f), p);
          })
        : i && (s[o] = i)
      : o === "style"
        ? (s[o] = { ...i, ...c })
        : o === "className" && (s[o] = [i, c].filter(Boolean).join(" "));
  }
  return { ...t, ...s };
}
function dT(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
function fT(t) {
  const a = t + "CollectionProvider",
    [s, o] = Gr(a),
    [i, c] = s(a, { collectionRef: { current: null }, itemMap: new Map() }),
    u = (w) => {
      const { scope: E, children: O } = w,
        D = se.useRef(null),
        P = se.useRef(new Map()).current;
      return m.jsx(i, { scope: E, itemMap: P, collectionRef: D, children: O });
    };
  u.displayName = a;
  const f = t + "CollectionSlot",
    p = gx(f),
    g = se.forwardRef((w, E) => {
      const { scope: O, children: D } = w,
        P = c(f, O),
        G = qe(E, P.collectionRef);
      return m.jsx(p, { ref: G, children: D });
    });
  g.displayName = f;
  const x = t + "CollectionItemSlot",
    v = "data-radix-collection-item",
    S = gx(x),
    A = se.forwardRef((w, E) => {
      const { scope: O, children: D, ...P } = w,
        G = se.useRef(null),
        L = qe(E, G),
        q = c(x, O);
      return (
        se.useEffect(
          () => (
            q.itemMap.set(G, { ref: G, ...P }),
            () => {
              q.itemMap.delete(G);
            }
          ),
        ),
        m.jsx(S, { [v]: "", ref: L, children: D })
      );
    });
  A.displayName = x;
  function N(w) {
    const E = c(t + "CollectionConsumer", w);
    return se.useCallback(() => {
      const D = E.collectionRef.current;
      if (!D) return [];
      const P = Array.from(D.querySelectorAll(`[${v}]`));
      return Array.from(E.itemMap.values()).sort(
        (q, j) => P.indexOf(q.ref.current) - P.indexOf(j.ref.current),
      );
    }, [E.collectionRef, E.itemMap]);
  }
  return [{ Provider: u, Slot: g, ItemSlot: A }, N, o];
}
var hT = y.createContext(void 0);
function r1(t) {
  const a = y.useContext(hT);
  return t || a || "ltr";
}
const pT = ["top", "right", "bottom", "left"],
  ir = Math.min,
  nn = Math.max,
  yc = Math.round,
  tc = Math.floor,
  $n = (t) => ({ x: t, y: t }),
  mT = { left: "right", right: "left", bottom: "top", top: "bottom" },
  gT = { start: "end", end: "start" };
function lh(t, a, s) {
  return nn(t, ir(a, s));
}
function Ca(t, a) {
  return typeof t == "function" ? t(a) : t;
}
function Aa(t) {
  return t.split("-")[0];
}
function to(t) {
  return t.split("-")[1];
}
function Jh(t) {
  return t === "x" ? "y" : "x";
}
function ep(t) {
  return t === "y" ? "height" : "width";
}
const vT = new Set(["top", "bottom"]);
function In(t) {
  return vT.has(Aa(t)) ? "y" : "x";
}
function tp(t) {
  return Jh(In(t));
}
function yT(t, a, s) {
  s === void 0 && (s = !1);
  const o = to(t),
    i = tp(t),
    c = ep(i);
  let u =
    i === "x"
      ? o === (s ? "end" : "start")
        ? "right"
        : "left"
      : o === "start"
        ? "bottom"
        : "top";
  return (a.reference[c] > a.floating[c] && (u = xc(u)), [u, xc(u)]);
}
function xT(t) {
  const a = xc(t);
  return [ih(t), a, ih(a)];
}
function ih(t) {
  return t.replace(/start|end/g, (a) => gT[a]);
}
const vx = ["left", "right"],
  yx = ["right", "left"],
  bT = ["top", "bottom"],
  ST = ["bottom", "top"];
function wT(t, a, s) {
  switch (t) {
    case "top":
    case "bottom":
      return s ? (a ? yx : vx) : a ? vx : yx;
    case "left":
    case "right":
      return a ? bT : ST;
    default:
      return [];
  }
}
function ET(t, a, s, o) {
  const i = to(t);
  let c = wT(Aa(t), s === "start", o);
  return (
    i && ((c = c.map((u) => u + "-" + i)), a && (c = c.concat(c.map(ih)))),
    c
  );
}
function xc(t) {
  return t.replace(/left|right|bottom|top/g, (a) => mT[a]);
}
function CT(t) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...t };
}
function s1(t) {
  return typeof t != "number"
    ? CT(t)
    : { top: t, right: t, bottom: t, left: t };
}
function bc(t) {
  const { x: a, y: s, width: o, height: i } = t;
  return {
    width: o,
    height: i,
    top: s,
    left: a,
    right: a + o,
    bottom: s + i,
    x: a,
    y: s,
  };
}
function xx(t, a, s) {
  let { reference: o, floating: i } = t;
  const c = In(a),
    u = tp(a),
    f = ep(u),
    p = Aa(a),
    g = c === "y",
    x = o.x + o.width / 2 - i.width / 2,
    v = o.y + o.height / 2 - i.height / 2,
    S = o[f] / 2 - i[f] / 2;
  let A;
  switch (p) {
    case "top":
      A = { x, y: o.y - i.height };
      break;
    case "bottom":
      A = { x, y: o.y + o.height };
      break;
    case "right":
      A = { x: o.x + o.width, y: v };
      break;
    case "left":
      A = { x: o.x - i.width, y: v };
      break;
    default:
      A = { x: o.x, y: o.y };
  }
  switch (to(a)) {
    case "start":
      A[u] -= S * (s && g ? -1 : 1);
      break;
    case "end":
      A[u] += S * (s && g ? -1 : 1);
      break;
  }
  return A;
}
const AT = async (t, a, s) => {
  const {
      placement: o = "bottom",
      strategy: i = "absolute",
      middleware: c = [],
      platform: u,
    } = s,
    f = c.filter(Boolean),
    p = await (u.isRTL == null ? void 0 : u.isRTL(a));
  let g = await u.getElementRects({ reference: t, floating: a, strategy: i }),
    { x, y: v } = xx(g, o, p),
    S = o,
    A = {},
    N = 0;
  for (let w = 0; w < f.length; w++) {
    const { name: E, fn: O } = f[w],
      {
        x: D,
        y: P,
        data: G,
        reset: L,
      } = await O({
        x,
        y: v,
        initialPlacement: o,
        placement: S,
        strategy: i,
        middlewareData: A,
        rects: g,
        platform: u,
        elements: { reference: t, floating: a },
      });
    ((x = D ?? x),
      (v = P ?? v),
      (A = { ...A, [E]: { ...A[E], ...G } }),
      L &&
        N <= 50 &&
        (N++,
        typeof L == "object" &&
          (L.placement && (S = L.placement),
          L.rects &&
            (g =
              L.rects === !0
                ? await u.getElementRects({
                    reference: t,
                    floating: a,
                    strategy: i,
                  })
                : L.rects),
          ({ x, y: v } = xx(g, S, p))),
        (w = -1)));
  }
  return { x, y: v, placement: S, strategy: i, middlewareData: A };
};
async function vl(t, a) {
  var s;
  a === void 0 && (a = {});
  const { x: o, y: i, platform: c, rects: u, elements: f, strategy: p } = t,
    {
      boundary: g = "clippingAncestors",
      rootBoundary: x = "viewport",
      elementContext: v = "floating",
      altBoundary: S = !1,
      padding: A = 0,
    } = Ca(a, t),
    N = s1(A),
    E = f[S ? (v === "floating" ? "reference" : "floating") : v],
    O = bc(
      await c.getClippingRect({
        element:
          (s = await (c.isElement == null ? void 0 : c.isElement(E))) == null ||
          s
            ? E
            : E.contextElement ||
              (await (c.getDocumentElement == null
                ? void 0
                : c.getDocumentElement(f.floating))),
        boundary: g,
        rootBoundary: x,
        strategy: p,
      }),
    ),
    D =
      v === "floating"
        ? { x: o, y: i, width: u.floating.width, height: u.floating.height }
        : u.reference,
    P = await (c.getOffsetParent == null
      ? void 0
      : c.getOffsetParent(f.floating)),
    G = (await (c.isElement == null ? void 0 : c.isElement(P)))
      ? (await (c.getScale == null ? void 0 : c.getScale(P))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    L = bc(
      c.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: f,
            rect: D,
            offsetParent: P,
            strategy: p,
          })
        : D,
    );
  return {
    top: (O.top - L.top + N.top) / G.y,
    bottom: (L.bottom - O.bottom + N.bottom) / G.y,
    left: (O.left - L.left + N.left) / G.x,
    right: (L.right - O.right + N.right) / G.x,
  };
}
const NT = (t) => ({
    name: "arrow",
    options: t,
    async fn(a) {
      const {
          x: s,
          y: o,
          placement: i,
          rects: c,
          platform: u,
          elements: f,
          middlewareData: p,
        } = a,
        { element: g, padding: x = 0 } = Ca(t, a) || {};
      if (g == null) return {};
      const v = s1(x),
        S = { x: s, y: o },
        A = tp(i),
        N = ep(A),
        w = await u.getDimensions(g),
        E = A === "y",
        O = E ? "top" : "left",
        D = E ? "bottom" : "right",
        P = E ? "clientHeight" : "clientWidth",
        G = c.reference[N] + c.reference[A] - S[A] - c.floating[N],
        L = S[A] - c.reference[A],
        q = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(g));
      let j = q ? q[P] : 0;
      (!j || !(await (u.isElement == null ? void 0 : u.isElement(q)))) &&
        (j = f.floating[P] || c.floating[N]);
      const R = G / 2 - L / 2,
        U = j / 2 - w[N] / 2 - 1,
        $ = ir(v[O], U),
        Z = ir(v[D], U),
        W = $,
        re = j - w[N] - Z,
        oe = j / 2 - w[N] / 2 + R,
        ie = lh(W, oe, re),
        M =
          !p.arrow &&
          to(i) != null &&
          oe !== ie &&
          c.reference[N] / 2 - (oe < W ? $ : Z) - w[N] / 2 < 0,
        V = M ? (oe < W ? oe - W : oe - re) : 0;
      return {
        [A]: S[A] + V,
        data: {
          [A]: ie,
          centerOffset: oe - ie - V,
          ...(M && { alignmentOffset: V }),
        },
        reset: M,
      };
    },
  }),
  RT = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "flip",
        options: t,
        async fn(a) {
          var s, o;
          const {
              placement: i,
              middlewareData: c,
              rects: u,
              initialPlacement: f,
              platform: p,
              elements: g,
            } = a,
            {
              mainAxis: x = !0,
              crossAxis: v = !0,
              fallbackPlacements: S,
              fallbackStrategy: A = "bestFit",
              fallbackAxisSideDirection: N = "none",
              flipAlignment: w = !0,
              ...E
            } = Ca(t, a);
          if ((s = c.arrow) != null && s.alignmentOffset) return {};
          const O = Aa(i),
            D = In(f),
            P = Aa(f) === f,
            G = await (p.isRTL == null ? void 0 : p.isRTL(g.floating)),
            L = S || (P || !w ? [xc(f)] : xT(f)),
            q = N !== "none";
          !S && q && L.push(...ET(f, w, N, G));
          const j = [f, ...L],
            R = await vl(a, E),
            U = [];
          let $ = ((o = c.flip) == null ? void 0 : o.overflows) || [];
          if ((x && U.push(R[O]), v)) {
            const oe = yT(i, u, G);
            U.push(R[oe[0]], R[oe[1]]);
          }
          if (
            (($ = [...$, { placement: i, overflows: U }]),
            !U.every((oe) => oe <= 0))
          ) {
            var Z, W;
            const oe = (((Z = c.flip) == null ? void 0 : Z.index) || 0) + 1,
              ie = j[oe];
            if (
              ie &&
              (!(v === "alignment" ? D !== In(ie) : !1) ||
                $.every((H) =>
                  In(H.placement) === D ? H.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: oe, overflows: $ },
                reset: { placement: ie },
              };
            let M =
              (W = $.filter((V) => V.overflows[0] <= 0).sort(
                (V, H) => V.overflows[1] - H.overflows[1],
              )[0]) == null
                ? void 0
                : W.placement;
            if (!M)
              switch (A) {
                case "bestFit": {
                  var re;
                  const V =
                    (re = $.filter((H) => {
                      if (q) {
                        const le = In(H.placement);
                        return le === D || le === "y";
                      }
                      return !0;
                    })
                      .map((H) => [
                        H.placement,
                        H.overflows
                          .filter((le) => le > 0)
                          .reduce((le, de) => le + de, 0),
                      ])
                      .sort((H, le) => H[1] - le[1])[0]) == null
                      ? void 0
                      : re[0];
                  V && (M = V);
                  break;
                }
                case "initialPlacement":
                  M = f;
                  break;
              }
            if (i !== M) return { reset: { placement: M } };
          }
          return {};
        },
      }
    );
  };
function bx(t, a) {
  return {
    top: t.top - a.height,
    right: t.right - a.width,
    bottom: t.bottom - a.height,
    left: t.left - a.width,
  };
}
function Sx(t) {
  return pT.some((a) => t[a] >= 0);
}
const OT = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "hide",
        options: t,
        async fn(a) {
          const { rects: s } = a,
            { strategy: o = "referenceHidden", ...i } = Ca(t, a);
          switch (o) {
            case "referenceHidden": {
              const c = await vl(a, { ...i, elementContext: "reference" }),
                u = bx(c, s.reference);
              return {
                data: { referenceHiddenOffsets: u, referenceHidden: Sx(u) },
              };
            }
            case "escaped": {
              const c = await vl(a, { ...i, altBoundary: !0 }),
                u = bx(c, s.floating);
              return { data: { escapedOffsets: u, escaped: Sx(u) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  o1 = new Set(["left", "top"]);
async function _T(t, a) {
  const { placement: s, platform: o, elements: i } = t,
    c = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)),
    u = Aa(s),
    f = to(s),
    p = In(s) === "y",
    g = o1.has(u) ? -1 : 1,
    x = c && p ? -1 : 1,
    v = Ca(a, t);
  let {
    mainAxis: S,
    crossAxis: A,
    alignmentAxis: N,
  } = typeof v == "number"
    ? { mainAxis: v, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: v.mainAxis || 0,
        crossAxis: v.crossAxis || 0,
        alignmentAxis: v.alignmentAxis,
      };
  return (
    f && typeof N == "number" && (A = f === "end" ? N * -1 : N),
    p ? { x: A * x, y: S * g } : { x: S * g, y: A * x }
  );
}
const jT = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: "offset",
        options: t,
        async fn(a) {
          var s, o;
          const { x: i, y: c, placement: u, middlewareData: f } = a,
            p = await _T(a, t);
          return u === ((s = f.offset) == null ? void 0 : s.placement) &&
            (o = f.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: i + p.x, y: c + p.y, data: { ...p, placement: u } };
        },
      }
    );
  },
  TT = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "shift",
        options: t,
        async fn(a) {
          const { x: s, y: o, placement: i } = a,
            {
              mainAxis: c = !0,
              crossAxis: u = !1,
              limiter: f = {
                fn: (E) => {
                  let { x: O, y: D } = E;
                  return { x: O, y: D };
                },
              },
              ...p
            } = Ca(t, a),
            g = { x: s, y: o },
            x = await vl(a, p),
            v = In(Aa(i)),
            S = Jh(v);
          let A = g[S],
            N = g[v];
          if (c) {
            const E = S === "y" ? "top" : "left",
              O = S === "y" ? "bottom" : "right",
              D = A + x[E],
              P = A - x[O];
            A = lh(D, A, P);
          }
          if (u) {
            const E = v === "y" ? "top" : "left",
              O = v === "y" ? "bottom" : "right",
              D = N + x[E],
              P = N - x[O];
            N = lh(D, N, P);
          }
          const w = f.fn({ ...a, [S]: A, [v]: N });
          return {
            ...w,
            data: { x: w.x - s, y: w.y - o, enabled: { [S]: c, [v]: u } },
          };
        },
      }
    );
  },
  MT = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        options: t,
        fn(a) {
          const { x: s, y: o, placement: i, rects: c, middlewareData: u } = a,
            { offset: f = 0, mainAxis: p = !0, crossAxis: g = !0 } = Ca(t, a),
            x = { x: s, y: o },
            v = In(i),
            S = Jh(v);
          let A = x[S],
            N = x[v];
          const w = Ca(f, a),
            E =
              typeof w == "number"
                ? { mainAxis: w, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...w };
          if (p) {
            const P = S === "y" ? "height" : "width",
              G = c.reference[S] - c.floating[P] + E.mainAxis,
              L = c.reference[S] + c.reference[P] - E.mainAxis;
            A < G ? (A = G) : A > L && (A = L);
          }
          if (g) {
            var O, D;
            const P = S === "y" ? "width" : "height",
              G = o1.has(Aa(i)),
              L =
                c.reference[v] -
                c.floating[P] +
                ((G && ((O = u.offset) == null ? void 0 : O[v])) || 0) +
                (G ? 0 : E.crossAxis),
              q =
                c.reference[v] +
                c.reference[P] +
                (G ? 0 : ((D = u.offset) == null ? void 0 : D[v]) || 0) -
                (G ? E.crossAxis : 0);
            N < L ? (N = L) : N > q && (N = q);
          }
          return { [S]: A, [v]: N };
        },
      }
    );
  },
  DT = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "size",
        options: t,
        async fn(a) {
          var s, o;
          const { placement: i, rects: c, platform: u, elements: f } = a,
            { apply: p = () => {}, ...g } = Ca(t, a),
            x = await vl(a, g),
            v = Aa(i),
            S = to(i),
            A = In(i) === "y",
            { width: N, height: w } = c.floating;
          let E, O;
          v === "top" || v === "bottom"
            ? ((E = v),
              (O =
                S ===
                ((await (u.isRTL == null ? void 0 : u.isRTL(f.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((O = v), (E = S === "end" ? "top" : "bottom"));
          const D = w - x.top - x.bottom,
            P = N - x.left - x.right,
            G = ir(w - x[E], D),
            L = ir(N - x[O], P),
            q = !a.middlewareData.shift;
          let j = G,
            R = L;
          if (
            ((s = a.middlewareData.shift) != null && s.enabled.x && (R = P),
            (o = a.middlewareData.shift) != null && o.enabled.y && (j = D),
            q && !S)
          ) {
            const $ = nn(x.left, 0),
              Z = nn(x.right, 0),
              W = nn(x.top, 0),
              re = nn(x.bottom, 0);
            A
              ? (R = N - 2 * ($ !== 0 || Z !== 0 ? $ + Z : nn(x.left, x.right)))
              : (j =
                  w - 2 * (W !== 0 || re !== 0 ? W + re : nn(x.top, x.bottom)));
          }
          await p({ ...a, availableWidth: R, availableHeight: j });
          const U = await u.getDimensions(f.floating);
          return N !== U.width || w !== U.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Bc() {
  return typeof window < "u";
}
function no(t) {
  return l1(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function rn(t) {
  var a;
  return (
    (t == null || (a = t.ownerDocument) == null ? void 0 : a.defaultView) ||
    window
  );
}
function Jn(t) {
  var a;
  return (a = (l1(t) ? t.ownerDocument : t.document) || window.document) == null
    ? void 0
    : a.documentElement;
}
function l1(t) {
  return Bc() ? t instanceof Node || t instanceof rn(t).Node : !1;
}
function Nn(t) {
  return Bc() ? t instanceof Element || t instanceof rn(t).Element : !1;
}
function Fn(t) {
  return Bc() ? t instanceof HTMLElement || t instanceof rn(t).HTMLElement : !1;
}
function wx(t) {
  return !Bc() || typeof ShadowRoot > "u"
    ? !1
    : t instanceof ShadowRoot || t instanceof rn(t).ShadowRoot;
}
const zT = new Set(["inline", "contents"]);
function Rl(t) {
  const { overflow: a, overflowX: s, overflowY: o, display: i } = Rn(t);
  return /auto|scroll|overlay|hidden|clip/.test(a + o + s) && !zT.has(i);
}
const PT = new Set(["table", "td", "th"]);
function kT(t) {
  return PT.has(no(t));
}
const HT = [":popover-open", ":modal"];
function qc(t) {
  return HT.some((a) => {
    try {
      return t.matches(a);
    } catch {
      return !1;
    }
  });
}
const LT = ["transform", "translate", "scale", "rotate", "perspective"],
  UT = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  BT = ["paint", "layout", "strict", "content"];
function np(t) {
  const a = ap(),
    s = Nn(t) ? Rn(t) : t;
  return (
    LT.some((o) => (s[o] ? s[o] !== "none" : !1)) ||
    (s.containerType ? s.containerType !== "normal" : !1) ||
    (!a && (s.backdropFilter ? s.backdropFilter !== "none" : !1)) ||
    (!a && (s.filter ? s.filter !== "none" : !1)) ||
    UT.some((o) => (s.willChange || "").includes(o)) ||
    BT.some((o) => (s.contain || "").includes(o))
  );
}
function qT(t) {
  let a = cr(t);
  for (; Fn(a) && !Fs(a); ) {
    if (np(a)) return a;
    if (qc(a)) return null;
    a = cr(a);
  }
  return null;
}
function ap() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const QT = new Set(["html", "body", "#document"]);
function Fs(t) {
  return QT.has(no(t));
}
function Rn(t) {
  return rn(t).getComputedStyle(t);
}
function Qc(t) {
  return Nn(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.scrollX, scrollTop: t.scrollY };
}
function cr(t) {
  if (no(t) === "html") return t;
  const a = t.assignedSlot || t.parentNode || (wx(t) && t.host) || Jn(t);
  return wx(a) ? a.host : a;
}
function i1(t) {
  const a = cr(t);
  return Fs(a)
    ? t.ownerDocument
      ? t.ownerDocument.body
      : t.body
    : Fn(a) && Rl(a)
      ? a
      : i1(a);
}
function yl(t, a, s) {
  var o;
  (a === void 0 && (a = []), s === void 0 && (s = !0));
  const i = i1(t),
    c = i === ((o = t.ownerDocument) == null ? void 0 : o.body),
    u = rn(i);
  if (c) {
    const f = ch(u);
    return a.concat(
      u,
      u.visualViewport || [],
      Rl(i) ? i : [],
      f && s ? yl(f) : [],
    );
  }
  return a.concat(i, yl(i, [], s));
}
function ch(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function c1(t) {
  const a = Rn(t);
  let s = parseFloat(a.width) || 0,
    o = parseFloat(a.height) || 0;
  const i = Fn(t),
    c = i ? t.offsetWidth : s,
    u = i ? t.offsetHeight : o,
    f = yc(s) !== c || yc(o) !== u;
  return (f && ((s = c), (o = u)), { width: s, height: o, $: f });
}
function rp(t) {
  return Nn(t) ? t : t.contextElement;
}
function Is(t) {
  const a = rp(t);
  if (!Fn(a)) return $n(1);
  const s = a.getBoundingClientRect(),
    { width: o, height: i, $: c } = c1(a);
  let u = (c ? yc(s.width) : s.width) / o,
    f = (c ? yc(s.height) : s.height) / i;
  return (
    (!u || !Number.isFinite(u)) && (u = 1),
    (!f || !Number.isFinite(f)) && (f = 1),
    { x: u, y: f }
  );
}
const VT = $n(0);
function u1(t) {
  const a = rn(t);
  return !ap() || !a.visualViewport
    ? VT
    : { x: a.visualViewport.offsetLeft, y: a.visualViewport.offsetTop };
}
function IT(t, a, s) {
  return (a === void 0 && (a = !1), !s || (a && s !== rn(t)) ? !1 : a);
}
function qr(t, a, s, o) {
  (a === void 0 && (a = !1), s === void 0 && (s = !1));
  const i = t.getBoundingClientRect(),
    c = rp(t);
  let u = $n(1);
  a && (o ? Nn(o) && (u = Is(o)) : (u = Is(t)));
  const f = IT(c, s, o) ? u1(c) : $n(0);
  let p = (i.left + f.x) / u.x,
    g = (i.top + f.y) / u.y,
    x = i.width / u.x,
    v = i.height / u.y;
  if (c) {
    const S = rn(c),
      A = o && Nn(o) ? rn(o) : o;
    let N = S,
      w = ch(N);
    for (; w && o && A !== N; ) {
      const E = Is(w),
        O = w.getBoundingClientRect(),
        D = Rn(w),
        P = O.left + (w.clientLeft + parseFloat(D.paddingLeft)) * E.x,
        G = O.top + (w.clientTop + parseFloat(D.paddingTop)) * E.y;
      ((p *= E.x),
        (g *= E.y),
        (x *= E.x),
        (v *= E.y),
        (p += P),
        (g += G),
        (N = rn(w)),
        (w = ch(N)));
    }
  }
  return bc({ width: x, height: v, x: p, y: g });
}
function Vc(t, a) {
  const s = Qc(t).scrollLeft;
  return a ? a.left + s : qr(Jn(t)).left + s;
}
function d1(t, a) {
  const s = t.getBoundingClientRect(),
    o = s.left + a.scrollLeft - Vc(t, s),
    i = s.top + a.scrollTop;
  return { x: o, y: i };
}
function YT(t) {
  let { elements: a, rect: s, offsetParent: o, strategy: i } = t;
  const c = i === "fixed",
    u = Jn(o),
    f = a ? qc(a.floating) : !1;
  if (o === u || (f && c)) return s;
  let p = { scrollLeft: 0, scrollTop: 0 },
    g = $n(1);
  const x = $n(0),
    v = Fn(o);
  if (
    (v || (!v && !c)) &&
    ((no(o) !== "body" || Rl(u)) && (p = Qc(o)), Fn(o))
  ) {
    const A = qr(o);
    ((g = Is(o)), (x.x = A.x + o.clientLeft), (x.y = A.y + o.clientTop));
  }
  const S = u && !v && !c ? d1(u, p) : $n(0);
  return {
    width: s.width * g.x,
    height: s.height * g.y,
    x: s.x * g.x - p.scrollLeft * g.x + x.x + S.x,
    y: s.y * g.y - p.scrollTop * g.y + x.y + S.y,
  };
}
function $T(t) {
  return Array.from(t.getClientRects());
}
function GT(t) {
  const a = Jn(t),
    s = Qc(t),
    o = t.ownerDocument.body,
    i = nn(a.scrollWidth, a.clientWidth, o.scrollWidth, o.clientWidth),
    c = nn(a.scrollHeight, a.clientHeight, o.scrollHeight, o.clientHeight);
  let u = -s.scrollLeft + Vc(t);
  const f = -s.scrollTop;
  return (
    Rn(o).direction === "rtl" && (u += nn(a.clientWidth, o.clientWidth) - i),
    { width: i, height: c, x: u, y: f }
  );
}
const Ex = 25;
function FT(t, a) {
  const s = rn(t),
    o = Jn(t),
    i = s.visualViewport;
  let c = o.clientWidth,
    u = o.clientHeight,
    f = 0,
    p = 0;
  if (i) {
    ((c = i.width), (u = i.height));
    const x = ap();
    (!x || (x && a === "fixed")) && ((f = i.offsetLeft), (p = i.offsetTop));
  }
  const g = Vc(o);
  if (g <= 0) {
    const x = o.ownerDocument,
      v = x.body,
      S = getComputedStyle(v),
      A =
        (x.compatMode === "CSS1Compat" &&
          parseFloat(S.marginLeft) + parseFloat(S.marginRight)) ||
        0,
      N = Math.abs(o.clientWidth - v.clientWidth - A);
    N <= Ex && (c -= N);
  } else g <= Ex && (c += g);
  return { width: c, height: u, x: f, y: p };
}
const XT = new Set(["absolute", "fixed"]);
function KT(t, a) {
  const s = qr(t, !0, a === "fixed"),
    o = s.top + t.clientTop,
    i = s.left + t.clientLeft,
    c = Fn(t) ? Is(t) : $n(1),
    u = t.clientWidth * c.x,
    f = t.clientHeight * c.y,
    p = i * c.x,
    g = o * c.y;
  return { width: u, height: f, x: p, y: g };
}
function Cx(t, a, s) {
  let o;
  if (a === "viewport") o = FT(t, s);
  else if (a === "document") o = GT(Jn(t));
  else if (Nn(a)) o = KT(a, s);
  else {
    const i = u1(t);
    o = { x: a.x - i.x, y: a.y - i.y, width: a.width, height: a.height };
  }
  return bc(o);
}
function f1(t, a) {
  const s = cr(t);
  return s === a || !Nn(s) || Fs(s)
    ? !1
    : Rn(s).position === "fixed" || f1(s, a);
}
function ZT(t, a) {
  const s = a.get(t);
  if (s) return s;
  let o = yl(t, [], !1).filter((f) => Nn(f) && no(f) !== "body"),
    i = null;
  const c = Rn(t).position === "fixed";
  let u = c ? cr(t) : t;
  for (; Nn(u) && !Fs(u); ) {
    const f = Rn(u),
      p = np(u);
    (!p && f.position === "fixed" && (i = null),
      (
        c
          ? !p && !i
          : (!p && f.position === "static" && !!i && XT.has(i.position)) ||
            (Rl(u) && !p && f1(t, u))
      )
        ? (o = o.filter((x) => x !== u))
        : (i = f),
      (u = cr(u)));
  }
  return (a.set(t, o), o);
}
function WT(t) {
  let { element: a, boundary: s, rootBoundary: o, strategy: i } = t;
  const u = [
      ...(s === "clippingAncestors"
        ? qc(a)
          ? []
          : ZT(a, this._c)
        : [].concat(s)),
      o,
    ],
    f = u[0],
    p = u.reduce(
      (g, x) => {
        const v = Cx(a, x, i);
        return (
          (g.top = nn(v.top, g.top)),
          (g.right = ir(v.right, g.right)),
          (g.bottom = ir(v.bottom, g.bottom)),
          (g.left = nn(v.left, g.left)),
          g
        );
      },
      Cx(a, f, i),
    );
  return {
    width: p.right - p.left,
    height: p.bottom - p.top,
    x: p.left,
    y: p.top,
  };
}
function JT(t) {
  const { width: a, height: s } = c1(t);
  return { width: a, height: s };
}
function e5(t, a, s) {
  const o = Fn(a),
    i = Jn(a),
    c = s === "fixed",
    u = qr(t, !0, c, a);
  let f = { scrollLeft: 0, scrollTop: 0 };
  const p = $n(0);
  function g() {
    p.x = Vc(i);
  }
  if (o || (!o && !c))
    if (((no(a) !== "body" || Rl(i)) && (f = Qc(a)), o)) {
      const A = qr(a, !0, c, a);
      ((p.x = A.x + a.clientLeft), (p.y = A.y + a.clientTop));
    } else i && g();
  c && !o && i && g();
  const x = i && !o && !c ? d1(i, f) : $n(0),
    v = u.left + f.scrollLeft - p.x - x.x,
    S = u.top + f.scrollTop - p.y - x.y;
  return { x: v, y: S, width: u.width, height: u.height };
}
function Df(t) {
  return Rn(t).position === "static";
}
function Ax(t, a) {
  if (!Fn(t) || Rn(t).position === "fixed") return null;
  if (a) return a(t);
  let s = t.offsetParent;
  return (Jn(t) === s && (s = s.ownerDocument.body), s);
}
function h1(t, a) {
  const s = rn(t);
  if (qc(t)) return s;
  if (!Fn(t)) {
    let i = cr(t);
    for (; i && !Fs(i); ) {
      if (Nn(i) && !Df(i)) return i;
      i = cr(i);
    }
    return s;
  }
  let o = Ax(t, a);
  for (; o && kT(o) && Df(o); ) o = Ax(o, a);
  return o && Fs(o) && Df(o) && !np(o) ? s : o || qT(t) || s;
}
const t5 = async function (t) {
  const a = this.getOffsetParent || h1,
    s = this.getDimensions,
    o = await s(t.floating);
  return {
    reference: e5(t.reference, await a(t.floating), t.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function n5(t) {
  return Rn(t).direction === "rtl";
}
const a5 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: YT,
  getDocumentElement: Jn,
  getClippingRect: WT,
  getOffsetParent: h1,
  getElementRects: t5,
  getClientRects: $T,
  getDimensions: JT,
  getScale: Is,
  isElement: Nn,
  isRTL: n5,
};
function p1(t, a) {
  return (
    t.x === a.x && t.y === a.y && t.width === a.width && t.height === a.height
  );
}
function r5(t, a) {
  let s = null,
    o;
  const i = Jn(t);
  function c() {
    var f;
    (clearTimeout(o), (f = s) == null || f.disconnect(), (s = null));
  }
  function u(f, p) {
    (f === void 0 && (f = !1), p === void 0 && (p = 1), c());
    const g = t.getBoundingClientRect(),
      { left: x, top: v, width: S, height: A } = g;
    if ((f || a(), !S || !A)) return;
    const N = tc(v),
      w = tc(i.clientWidth - (x + S)),
      E = tc(i.clientHeight - (v + A)),
      O = tc(x),
      P = {
        rootMargin: -N + "px " + -w + "px " + -E + "px " + -O + "px",
        threshold: nn(0, ir(1, p)) || 1,
      };
    let G = !0;
    function L(q) {
      const j = q[0].intersectionRatio;
      if (j !== p) {
        if (!G) return u();
        j
          ? u(!1, j)
          : (o = setTimeout(() => {
              u(!1, 1e-7);
            }, 1e3));
      }
      (j === 1 && !p1(g, t.getBoundingClientRect()) && u(), (G = !1));
    }
    try {
      s = new IntersectionObserver(L, { ...P, root: i.ownerDocument });
    } catch {
      s = new IntersectionObserver(L, P);
    }
    s.observe(t);
  }
  return (u(!0), c);
}
function s5(t, a, s, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: c = !0,
      elementResize: u = typeof ResizeObserver == "function",
      layoutShift: f = typeof IntersectionObserver == "function",
      animationFrame: p = !1,
    } = o,
    g = rp(t),
    x = i || c ? [...(g ? yl(g) : []), ...yl(a)] : [];
  x.forEach((O) => {
    (i && O.addEventListener("scroll", s, { passive: !0 }),
      c && O.addEventListener("resize", s));
  });
  const v = g && f ? r5(g, s) : null;
  let S = -1,
    A = null;
  u &&
    ((A = new ResizeObserver((O) => {
      let [D] = O;
      (D &&
        D.target === g &&
        A &&
        (A.unobserve(a),
        cancelAnimationFrame(S),
        (S = requestAnimationFrame(() => {
          var P;
          (P = A) == null || P.observe(a);
        }))),
        s());
    })),
    g && !p && A.observe(g),
    A.observe(a));
  let N,
    w = p ? qr(t) : null;
  p && E();
  function E() {
    const O = qr(t);
    (w && !p1(w, O) && s(), (w = O), (N = requestAnimationFrame(E)));
  }
  return (
    s(),
    () => {
      var O;
      (x.forEach((D) => {
        (i && D.removeEventListener("scroll", s),
          c && D.removeEventListener("resize", s));
      }),
        v?.(),
        (O = A) == null || O.disconnect(),
        (A = null),
        p && cancelAnimationFrame(N));
    }
  );
}
const o5 = jT,
  l5 = TT,
  i5 = RT,
  c5 = DT,
  u5 = OT,
  Nx = NT,
  d5 = MT,
  f5 = (t, a, s) => {
    const o = new Map(),
      i = { platform: a5, ...s },
      c = { ...i.platform, _c: o };
    return AT(t, a, { ...i, platform: c });
  };
var h5 = typeof document < "u",
  p5 = function () {},
  cc = h5 ? y.useLayoutEffect : p5;
function Sc(t, a) {
  if (t === a) return !0;
  if (typeof t != typeof a) return !1;
  if (typeof t == "function" && t.toString() === a.toString()) return !0;
  let s, o, i;
  if (t && a && typeof t == "object") {
    if (Array.isArray(t)) {
      if (((s = t.length), s !== a.length)) return !1;
      for (o = s; o-- !== 0; ) if (!Sc(t[o], a[o])) return !1;
      return !0;
    }
    if (((i = Object.keys(t)), (s = i.length), s !== Object.keys(a).length))
      return !1;
    for (o = s; o-- !== 0; ) if (!{}.hasOwnProperty.call(a, i[o])) return !1;
    for (o = s; o-- !== 0; ) {
      const c = i[o];
      if (!(c === "_owner" && t.$$typeof) && !Sc(t[c], a[c])) return !1;
    }
    return !0;
  }
  return t !== t && a !== a;
}
function m1(t) {
  return typeof window > "u"
    ? 1
    : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Rx(t, a) {
  const s = m1(t);
  return Math.round(a * s) / s;
}
function zf(t) {
  const a = y.useRef(t);
  return (
    cc(() => {
      a.current = t;
    }),
    a
  );
}
function m5(t) {
  t === void 0 && (t = {});
  const {
      placement: a = "bottom",
      strategy: s = "absolute",
      middleware: o = [],
      platform: i,
      elements: { reference: c, floating: u } = {},
      transform: f = !0,
      whileElementsMounted: p,
      open: g,
    } = t,
    [x, v] = y.useState({
      x: 0,
      y: 0,
      strategy: s,
      placement: a,
      middlewareData: {},
      isPositioned: !1,
    }),
    [S, A] = y.useState(o);
  Sc(S, o) || A(o);
  const [N, w] = y.useState(null),
    [E, O] = y.useState(null),
    D = y.useCallback((H) => {
      H !== q.current && ((q.current = H), w(H));
    }, []),
    P = y.useCallback((H) => {
      H !== j.current && ((j.current = H), O(H));
    }, []),
    G = c || N,
    L = u || E,
    q = y.useRef(null),
    j = y.useRef(null),
    R = y.useRef(x),
    U = p != null,
    $ = zf(p),
    Z = zf(i),
    W = zf(g),
    re = y.useCallback(() => {
      if (!q.current || !j.current) return;
      const H = { placement: a, strategy: s, middleware: S };
      (Z.current && (H.platform = Z.current),
        f5(q.current, j.current, H).then((le) => {
          const de = { ...le, isPositioned: W.current !== !1 };
          oe.current &&
            !Sc(R.current, de) &&
            ((R.current = de),
            Nl.flushSync(() => {
              v(de);
            }));
        }));
    }, [S, a, s, Z, W]);
  cc(() => {
    g === !1 &&
      R.current.isPositioned &&
      ((R.current.isPositioned = !1), v((H) => ({ ...H, isPositioned: !1 })));
  }, [g]);
  const oe = y.useRef(!1);
  (cc(
    () => (
      (oe.current = !0),
      () => {
        oe.current = !1;
      }
    ),
    [],
  ),
    cc(() => {
      if ((G && (q.current = G), L && (j.current = L), G && L)) {
        if ($.current) return $.current(G, L, re);
        re();
      }
    }, [G, L, re, $, U]));
  const ie = y.useMemo(
      () => ({ reference: q, floating: j, setReference: D, setFloating: P }),
      [D, P],
    ),
    M = y.useMemo(() => ({ reference: G, floating: L }), [G, L]),
    V = y.useMemo(() => {
      const H = { position: s, left: 0, top: 0 };
      if (!M.floating) return H;
      const le = Rx(M.floating, x.x),
        de = Rx(M.floating, x.y);
      return f
        ? {
            ...H,
            transform: "translate(" + le + "px, " + de + "px)",
            ...(m1(M.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: s, left: le, top: de };
    }, [s, f, M.floating, x.x, x.y]);
  return y.useMemo(
    () => ({ ...x, update: re, refs: ie, elements: M, floatingStyles: V }),
    [x, re, ie, M, V],
  );
}
const g5 = (t) => {
    function a(s) {
      return {}.hasOwnProperty.call(s, "current");
    }
    return {
      name: "arrow",
      options: t,
      fn(s) {
        const { element: o, padding: i } = typeof t == "function" ? t(s) : t;
        return o && a(o)
          ? o.current != null
            ? Nx({ element: o.current, padding: i }).fn(s)
            : {}
          : o
            ? Nx({ element: o, padding: i }).fn(s)
            : {};
      },
    };
  },
  v5 = (t, a) => ({ ...o5(t), options: [t, a] }),
  y5 = (t, a) => ({ ...l5(t), options: [t, a] }),
  x5 = (t, a) => ({ ...d5(t), options: [t, a] }),
  b5 = (t, a) => ({ ...i5(t), options: [t, a] }),
  S5 = (t, a) => ({ ...c5(t), options: [t, a] }),
  w5 = (t, a) => ({ ...u5(t), options: [t, a] }),
  E5 = (t, a) => ({ ...g5(t), options: [t, a] });
var C5 = "Arrow",
  g1 = y.forwardRef((t, a) => {
    const { children: s, width: o = 10, height: i = 5, ...c } = t;
    return m.jsx(ke.svg, {
      ...c,
      ref: a,
      width: o,
      height: i,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: t.asChild ? s : m.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
g1.displayName = C5;
var A5 = g1;
function v1(t) {
  const [a, s] = y.useState(void 0);
  return (
    Ct(() => {
      if (t) {
        s({ width: t.offsetWidth, height: t.offsetHeight });
        const o = new ResizeObserver((i) => {
          if (!Array.isArray(i) || !i.length) return;
          const c = i[0];
          let u, f;
          if ("borderBoxSize" in c) {
            const p = c.borderBoxSize,
              g = Array.isArray(p) ? p[0] : p;
            ((u = g.inlineSize), (f = g.blockSize));
          } else ((u = t.offsetWidth), (f = t.offsetHeight));
          s({ width: u, height: f });
        });
        return (o.observe(t, { box: "border-box" }), () => o.unobserve(t));
      } else s(void 0);
    }, [t]),
    a
  );
}
var sp = "Popper",
  [y1, x1] = Gr(sp),
  [N5, b1] = y1(sp),
  S1 = (t) => {
    const { __scopePopper: a, children: s } = t,
      [o, i] = y.useState(null);
    return m.jsx(N5, { scope: a, anchor: o, onAnchorChange: i, children: s });
  };
S1.displayName = sp;
var w1 = "PopperAnchor",
  E1 = y.forwardRef((t, a) => {
    const { __scopePopper: s, virtualRef: o, ...i } = t,
      c = b1(w1, s),
      u = y.useRef(null),
      f = qe(a, u),
      p = y.useRef(null);
    return (
      y.useEffect(() => {
        const g = p.current;
        ((p.current = o?.current || u.current),
          g !== p.current && c.onAnchorChange(p.current));
      }),
      o ? null : m.jsx(ke.div, { ...i, ref: f })
    );
  });
E1.displayName = w1;
var op = "PopperContent",
  [R5, O5] = y1(op),
  C1 = y.forwardRef((t, a) => {
    const {
        __scopePopper: s,
        side: o = "bottom",
        sideOffset: i = 0,
        align: c = "center",
        alignOffset: u = 0,
        arrowPadding: f = 0,
        avoidCollisions: p = !0,
        collisionBoundary: g = [],
        collisionPadding: x = 0,
        sticky: v = "partial",
        hideWhenDetached: S = !1,
        updatePositionStrategy: A = "optimized",
        onPlaced: N,
        ...w
      } = t,
      E = b1(op, s),
      [O, D] = y.useState(null),
      P = qe(a, (ne) => D(ne)),
      [G, L] = y.useState(null),
      q = v1(G),
      j = q?.width ?? 0,
      R = q?.height ?? 0,
      U = o + (c !== "center" ? "-" + c : ""),
      $ =
        typeof x == "number"
          ? x
          : { top: 0, right: 0, bottom: 0, left: 0, ...x },
      Z = Array.isArray(g) ? g : [g],
      W = Z.length > 0,
      re = { padding: $, boundary: Z.filter(j5), altBoundary: W },
      {
        refs: oe,
        floatingStyles: ie,
        placement: M,
        isPositioned: V,
        middlewareData: H,
      } = m5({
        strategy: "fixed",
        placement: U,
        whileElementsMounted: (...ne) =>
          s5(...ne, { animationFrame: A === "always" }),
        elements: { reference: E.anchor },
        middleware: [
          v5({ mainAxis: i + R, alignmentAxis: u }),
          p &&
            y5({
              mainAxis: !0,
              crossAxis: !1,
              limiter: v === "partial" ? x5() : void 0,
              ...re,
            }),
          p && b5({ ...re }),
          S5({
            ...re,
            apply: ({
              elements: ne,
              rects: fe,
              availableWidth: xe,
              availableHeight: Ee,
            }) => {
              const { width: Ne, height: _e } = fe.reference,
                yt = ne.floating.style;
              (yt.setProperty("--radix-popper-available-width", `${xe}px`),
                yt.setProperty("--radix-popper-available-height", `${Ee}px`),
                yt.setProperty("--radix-popper-anchor-width", `${Ne}px`),
                yt.setProperty("--radix-popper-anchor-height", `${_e}px`));
            },
          }),
          G && E5({ element: G, padding: f }),
          T5({ arrowWidth: j, arrowHeight: R }),
          S && w5({ strategy: "referenceHidden", ...re }),
        ],
      }),
      [le, de] = R1(M),
      _ = Yt(N);
    Ct(() => {
      V && _?.();
    }, [V, _]);
    const X = H.arrow?.x,
      I = H.arrow?.y,
      K = H.arrow?.centerOffset !== 0,
      [ae, ue] = y.useState();
    return (
      Ct(() => {
        O && ue(window.getComputedStyle(O).zIndex);
      }, [O]),
      m.jsx("div", {
        ref: oe.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ie,
          transform: V ? ie.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: ae,
          "--radix-popper-transform-origin": [
            H.transformOrigin?.x,
            H.transformOrigin?.y,
          ].join(" "),
          ...(H.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: t.dir,
        children: m.jsx(R5, {
          scope: s,
          placedSide: le,
          onArrowChange: L,
          arrowX: X,
          arrowY: I,
          shouldHideArrow: K,
          children: m.jsx(ke.div, {
            "data-side": le,
            "data-align": de,
            ...w,
            ref: P,
            style: { ...w.style, animation: V ? void 0 : "none" },
          }),
        }),
      })
    );
  });
C1.displayName = op;
var A1 = "PopperArrow",
  _5 = { top: "bottom", right: "left", bottom: "top", left: "right" },
  N1 = y.forwardRef(function (a, s) {
    const { __scopePopper: o, ...i } = a,
      c = O5(A1, o),
      u = _5[c.placedSide];
    return m.jsx("span", {
      ref: c.onArrowChange,
      style: {
        position: "absolute",
        left: c.arrowX,
        top: c.arrowY,
        [u]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[c.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[c.placedSide],
        visibility: c.shouldHideArrow ? "hidden" : void 0,
      },
      children: m.jsx(A5, {
        ...i,
        ref: s,
        style: { ...i.style, display: "block" },
      }),
    });
  });
N1.displayName = A1;
function j5(t) {
  return t !== null;
}
var T5 = (t) => ({
  name: "transformOrigin",
  options: t,
  fn(a) {
    const { placement: s, rects: o, middlewareData: i } = a,
      u = i.arrow?.centerOffset !== 0,
      f = u ? 0 : t.arrowWidth,
      p = u ? 0 : t.arrowHeight,
      [g, x] = R1(s),
      v = { start: "0%", center: "50%", end: "100%" }[x],
      S = (i.arrow?.x ?? 0) + f / 2,
      A = (i.arrow?.y ?? 0) + p / 2;
    let N = "",
      w = "";
    return (
      g === "bottom"
        ? ((N = u ? v : `${S}px`), (w = `${-p}px`))
        : g === "top"
          ? ((N = u ? v : `${S}px`), (w = `${o.floating.height + p}px`))
          : g === "right"
            ? ((N = `${-p}px`), (w = u ? v : `${A}px`))
            : g === "left" &&
              ((N = `${o.floating.width + p}px`), (w = u ? v : `${A}px`)),
      { data: { x: N, y: w } }
    );
  },
});
function R1(t) {
  const [a, s = "center"] = t.split("-");
  return [a, s];
}
var M5 = S1,
  D5 = E1,
  z5 = C1,
  P5 = N1;
function k5(t) {
  const a = H5(t),
    s = y.forwardRef((o, i) => {
      const { children: c, ...u } = o,
        f = y.Children.toArray(c),
        p = f.find(U5);
      if (p) {
        const g = p.props.children,
          x = f.map((v) =>
            v === p
              ? y.Children.count(g) > 1
                ? y.Children.only(null)
                : y.isValidElement(g)
                  ? g.props.children
                  : null
              : v,
          );
        return m.jsx(a, {
          ...u,
          ref: i,
          children: y.isValidElement(g) ? y.cloneElement(g, void 0, x) : null,
        });
      }
      return m.jsx(a, { ...u, ref: i, children: c });
    });
  return ((s.displayName = `${t}.Slot`), s);
}
function H5(t) {
  const a = y.forwardRef((s, o) => {
    const { children: i, ...c } = s;
    if (y.isValidElement(i)) {
      const u = q5(i),
        f = B5(c, i.props);
      return (
        i.type !== y.Fragment && (f.ref = o ? Ws(o, u) : u),
        y.cloneElement(i, f)
      );
    }
    return y.Children.count(i) > 1 ? y.Children.only(null) : null;
  });
  return ((a.displayName = `${t}.SlotClone`), a);
}
var L5 = Symbol("radix.slottable");
function U5(t) {
  return (
    y.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === L5
  );
}
function B5(t, a) {
  const s = { ...a };
  for (const o in a) {
    const i = t[o],
      c = a[o];
    /^on[A-Z]/.test(o)
      ? i && c
        ? (s[o] = (...f) => {
            const p = c(...f);
            return (i(...f), p);
          })
        : i && (s[o] = i)
      : o === "style"
        ? (s[o] = { ...i, ...c })
        : o === "className" && (s[o] = [i, c].filter(Boolean).join(" "));
  }
  return { ...t, ...s };
}
function q5(t) {
  let a = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    s = a && "isReactWarning" in a && a.isReactWarning;
  return s
    ? t.ref
    : ((a = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (s = a && "isReactWarning" in a && a.isReactWarning),
      s ? t.props.ref : t.props.ref || t.ref);
}
function O1(t) {
  const a = y.useRef({ value: t, previous: t });
  return y.useMemo(
    () => (
      a.current.value !== t &&
        ((a.current.previous = a.current.value), (a.current.value = t)),
      a.current.previous
    ),
    [t],
  );
}
var _1 = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  Q5 = "VisuallyHidden",
  V5 = y.forwardRef((t, a) =>
    m.jsx(ke.span, { ...t, ref: a, style: { ..._1, ...t.style } }),
  );
V5.displayName = Q5;
var I5 = [" ", "Enter", "ArrowUp", "ArrowDown"],
  Y5 = [" ", "Enter"],
  Qr = "Select",
  [Ic, Yc, $5] = fT(Qr),
  [ao] = Gr(Qr, [$5, x1]),
  $c = x1(),
  [G5, dr] = ao(Qr),
  [F5, X5] = ao(Qr),
  j1 = (t) => {
    const {
        __scopeSelect: a,
        children: s,
        open: o,
        defaultOpen: i,
        onOpenChange: c,
        value: u,
        defaultValue: f,
        onValueChange: p,
        dir: g,
        name: x,
        autoComplete: v,
        disabled: S,
        required: A,
        form: N,
      } = t,
      w = $c(a),
      [E, O] = y.useState(null),
      [D, P] = y.useState(null),
      [G, L] = y.useState(!1),
      q = r1(g),
      [j, R] = gc({ prop: o, defaultProp: i ?? !1, onChange: c, caller: Qr }),
      [U, $] = gc({ prop: u, defaultProp: f, onChange: p, caller: Qr }),
      Z = y.useRef(null),
      W = E ? N || !!E.closest("form") : !0,
      [re, oe] = y.useState(new Set()),
      ie = Array.from(re)
        .map((M) => M.props.value)
        .join(";");
    return m.jsx(M5, {
      ...w,
      children: m.jsxs(G5, {
        required: A,
        scope: a,
        trigger: E,
        onTriggerChange: O,
        valueNode: D,
        onValueNodeChange: P,
        valueNodeHasChildren: G,
        onValueNodeHasChildrenChange: L,
        contentId: Qs(),
        value: U,
        onValueChange: $,
        open: j,
        onOpenChange: R,
        dir: q,
        triggerPointerDownPosRef: Z,
        disabled: S,
        children: [
          m.jsx(Ic.Provider, {
            scope: a,
            children: m.jsx(F5, {
              scope: t.__scopeSelect,
              onNativeOptionAdd: y.useCallback((M) => {
                oe((V) => new Set(V).add(M));
              }, []),
              onNativeOptionRemove: y.useCallback((M) => {
                oe((V) => {
                  const H = new Set(V);
                  return (H.delete(M), H);
                });
              }, []),
              children: s,
            }),
          }),
          W
            ? m.jsxs(
                W1,
                {
                  "aria-hidden": !0,
                  required: A,
                  tabIndex: -1,
                  name: x,
                  autoComplete: v,
                  value: U,
                  onChange: (M) => $(M.target.value),
                  disabled: S,
                  form: N,
                  children: [
                    U === void 0 ? m.jsx("option", { value: "" }) : null,
                    Array.from(re),
                  ],
                },
                ie,
              )
            : null,
        ],
      }),
    });
  };
j1.displayName = Qr;
var T1 = "SelectTrigger",
  M1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, disabled: o = !1, ...i } = t,
      c = $c(s),
      u = dr(T1, s),
      f = u.disabled || o,
      p = qe(a, u.onTriggerChange),
      g = Yc(s),
      x = y.useRef("touch"),
      [v, S, A] = eS((w) => {
        const E = g().filter((P) => !P.disabled),
          O = E.find((P) => P.value === u.value),
          D = tS(E, w, O);
        D !== void 0 && u.onValueChange(D.value);
      }),
      N = (w) => {
        (f || (u.onOpenChange(!0), A()),
          w &&
            (u.triggerPointerDownPosRef.current = {
              x: Math.round(w.pageX),
              y: Math.round(w.pageY),
            }));
      };
    return m.jsx(D5, {
      asChild: !0,
      ...c,
      children: m.jsx(ke.button, {
        type: "button",
        role: "combobox",
        "aria-controls": u.contentId,
        "aria-expanded": u.open,
        "aria-required": u.required,
        "aria-autocomplete": "none",
        dir: u.dir,
        "data-state": u.open ? "open" : "closed",
        disabled: f,
        "data-disabled": f ? "" : void 0,
        "data-placeholder": J1(u.value) ? "" : void 0,
        ...i,
        ref: p,
        onClick: ze(i.onClick, (w) => {
          (w.currentTarget.focus(), x.current !== "mouse" && N(w));
        }),
        onPointerDown: ze(i.onPointerDown, (w) => {
          x.current = w.pointerType;
          const E = w.target;
          (E.hasPointerCapture(w.pointerId) &&
            E.releasePointerCapture(w.pointerId),
            w.button === 0 &&
              w.ctrlKey === !1 &&
              w.pointerType === "mouse" &&
              (N(w), w.preventDefault()));
        }),
        onKeyDown: ze(i.onKeyDown, (w) => {
          const E = v.current !== "";
          (!(w.ctrlKey || w.altKey || w.metaKey) &&
            w.key.length === 1 &&
            S(w.key),
            !(E && w.key === " ") &&
              I5.includes(w.key) &&
              (N(), w.preventDefault()));
        }),
      }),
    });
  });
M1.displayName = T1;
var D1 = "SelectValue",
  z1 = y.forwardRef((t, a) => {
    const {
        __scopeSelect: s,
        className: o,
        style: i,
        children: c,
        placeholder: u = "",
        ...f
      } = t,
      p = dr(D1, s),
      { onValueNodeHasChildrenChange: g } = p,
      x = c !== void 0,
      v = qe(a, p.onValueNodeChange);
    return (
      Ct(() => {
        g(x);
      }, [g, x]),
      m.jsx(ke.span, {
        ...f,
        ref: v,
        style: { pointerEvents: "none" },
        children: J1(p.value) ? m.jsx(m.Fragment, { children: u }) : c,
      })
    );
  });
z1.displayName = D1;
var K5 = "SelectIcon",
  P1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, children: o, ...i } = t;
    return m.jsx(ke.span, {
      "aria-hidden": !0,
      ...i,
      ref: a,
      children: o || "▼",
    });
  });
P1.displayName = K5;
var Z5 = "SelectPortal",
  k1 = (t) => m.jsx(Gh, { asChild: !0, ...t });
k1.displayName = Z5;
var Vr = "SelectContent",
  H1 = y.forwardRef((t, a) => {
    const s = dr(Vr, t.__scopeSelect),
      [o, i] = y.useState();
    if (
      (Ct(() => {
        i(new DocumentFragment());
      }, []),
      !s.open)
    ) {
      const c = o;
      return c
        ? Nl.createPortal(
            m.jsx(L1, {
              scope: t.__scopeSelect,
              children: m.jsx(Ic.Slot, {
                scope: t.__scopeSelect,
                children: m.jsx("div", { children: t.children }),
              }),
            }),
            c,
          )
        : null;
    }
    return m.jsx(U1, { ...t, ref: a });
  });
H1.displayName = Vr;
var Cn = 10,
  [L1, fr] = ao(Vr),
  W5 = "SelectContentImpl",
  J5 = k5("SelectContent.RemoveScroll"),
  U1 = y.forwardRef((t, a) => {
    const {
        __scopeSelect: s,
        position: o = "item-aligned",
        onCloseAutoFocus: i,
        onEscapeKeyDown: c,
        onPointerDownOutside: u,
        side: f,
        sideOffset: p,
        align: g,
        alignOffset: x,
        arrowPadding: v,
        collisionBoundary: S,
        collisionPadding: A,
        sticky: N,
        hideWhenDetached: w,
        avoidCollisions: E,
        ...O
      } = t,
      D = dr(Vr, s),
      [P, G] = y.useState(null),
      [L, q] = y.useState(null),
      j = qe(a, (ne) => G(ne)),
      [R, U] = y.useState(null),
      [$, Z] = y.useState(null),
      W = Yc(s),
      [re, oe] = y.useState(!1),
      ie = y.useRef(!1);
    (y.useEffect(() => {
      if (P) return zb(P);
    }, [P]),
      Ab());
    const M = y.useCallback(
        (ne) => {
          const [fe, ...xe] = W().map((_e) => _e.ref.current),
            [Ee] = xe.slice(-1),
            Ne = document.activeElement;
          for (const _e of ne)
            if (
              _e === Ne ||
              (_e?.scrollIntoView({ block: "nearest" }),
              _e === fe && L && (L.scrollTop = 0),
              _e === Ee && L && (L.scrollTop = L.scrollHeight),
              _e?.focus(),
              document.activeElement !== Ne)
            )
              return;
        },
        [W, L],
      ),
      V = y.useCallback(() => M([R, P]), [M, R, P]);
    y.useEffect(() => {
      re && V();
    }, [re, V]);
    const { onOpenChange: H, triggerPointerDownPosRef: le } = D;
    (y.useEffect(() => {
      if (P) {
        let ne = { x: 0, y: 0 };
        const fe = (Ee) => {
            ne = {
              x: Math.abs(Math.round(Ee.pageX) - (le.current?.x ?? 0)),
              y: Math.abs(Math.round(Ee.pageY) - (le.current?.y ?? 0)),
            };
          },
          xe = (Ee) => {
            (ne.x <= 10 && ne.y <= 10
              ? Ee.preventDefault()
              : P.contains(Ee.target) || H(!1),
              document.removeEventListener("pointermove", fe),
              (le.current = null));
          };
        return (
          le.current !== null &&
            (document.addEventListener("pointermove", fe),
            document.addEventListener("pointerup", xe, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener("pointermove", fe),
              document.removeEventListener("pointerup", xe, { capture: !0 }));
          }
        );
      }
    }, [P, H, le]),
      y.useEffect(() => {
        const ne = () => H(!1);
        return (
          window.addEventListener("blur", ne),
          window.addEventListener("resize", ne),
          () => {
            (window.removeEventListener("blur", ne),
              window.removeEventListener("resize", ne));
          }
        );
      }, [H]));
    const [de, _] = eS((ne) => {
        const fe = W().filter((Ne) => !Ne.disabled),
          xe = fe.find((Ne) => Ne.ref.current === document.activeElement),
          Ee = tS(fe, ne, xe);
        Ee && setTimeout(() => Ee.ref.current.focus());
      }),
      X = y.useCallback(
        (ne, fe, xe) => {
          const Ee = !ie.current && !xe;
          ((D.value !== void 0 && D.value === fe) || Ee) &&
            (U(ne), Ee && (ie.current = !0));
        },
        [D.value],
      ),
      I = y.useCallback(() => P?.focus(), [P]),
      K = y.useCallback(
        (ne, fe, xe) => {
          const Ee = !ie.current && !xe;
          ((D.value !== void 0 && D.value === fe) || Ee) && Z(ne);
        },
        [D.value],
      ),
      ae = o === "popper" ? uh : B1,
      ue =
        ae === uh
          ? {
              side: f,
              sideOffset: p,
              align: g,
              alignOffset: x,
              arrowPadding: v,
              collisionBoundary: S,
              collisionPadding: A,
              sticky: N,
              hideWhenDetached: w,
              avoidCollisions: E,
            }
          : {};
    return m.jsx(L1, {
      scope: s,
      content: P,
      viewport: L,
      onViewportChange: q,
      itemRefCallback: X,
      selectedItem: R,
      onItemLeave: I,
      itemTextRefCallback: K,
      focusSelectedItem: V,
      selectedItemText: $,
      position: o,
      isPositioned: re,
      searchRef: de,
      children: m.jsx(Fh, {
        as: J5,
        allowPinchZoom: !0,
        children: m.jsx($h, {
          asChild: !0,
          trapped: D.open,
          onMountAutoFocus: (ne) => {
            ne.preventDefault();
          },
          onUnmountAutoFocus: ze(i, (ne) => {
            (D.trigger?.focus({ preventScroll: !0 }), ne.preventDefault());
          }),
          children: m.jsx(Yh, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: c,
            onPointerDownOutside: u,
            onFocusOutside: (ne) => ne.preventDefault(),
            onDismiss: () => D.onOpenChange(!1),
            children: m.jsx(ae, {
              role: "listbox",
              id: D.contentId,
              "data-state": D.open ? "open" : "closed",
              dir: D.dir,
              onContextMenu: (ne) => ne.preventDefault(),
              ...O,
              ...ue,
              onPlaced: () => oe(!0),
              ref: j,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none",
                ...O.style,
              },
              onKeyDown: ze(O.onKeyDown, (ne) => {
                const fe = ne.ctrlKey || ne.altKey || ne.metaKey;
                if (
                  (ne.key === "Tab" && ne.preventDefault(),
                  !fe && ne.key.length === 1 && _(ne.key),
                  ["ArrowUp", "ArrowDown", "Home", "End"].includes(ne.key))
                ) {
                  let Ee = W()
                    .filter((Ne) => !Ne.disabled)
                    .map((Ne) => Ne.ref.current);
                  if (
                    (["ArrowUp", "End"].includes(ne.key) &&
                      (Ee = Ee.slice().reverse()),
                    ["ArrowUp", "ArrowDown"].includes(ne.key))
                  ) {
                    const Ne = ne.target,
                      _e = Ee.indexOf(Ne);
                    Ee = Ee.slice(_e + 1);
                  }
                  (setTimeout(() => M(Ee)), ne.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
U1.displayName = W5;
var e4 = "SelectItemAlignedPosition",
  B1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, onPlaced: o, ...i } = t,
      c = dr(Vr, s),
      u = fr(Vr, s),
      [f, p] = y.useState(null),
      [g, x] = y.useState(null),
      v = qe(a, (j) => x(j)),
      S = Yc(s),
      A = y.useRef(!1),
      N = y.useRef(!0),
      {
        viewport: w,
        selectedItem: E,
        selectedItemText: O,
        focusSelectedItem: D,
      } = u,
      P = y.useCallback(() => {
        if (c.trigger && c.valueNode && f && g && w && E && O) {
          const j = c.trigger.getBoundingClientRect(),
            R = g.getBoundingClientRect(),
            U = c.valueNode.getBoundingClientRect(),
            $ = O.getBoundingClientRect();
          if (c.dir !== "rtl") {
            const Ne = $.left - R.left,
              _e = U.left - Ne,
              yt = j.left - _e,
              ft = j.width + yt,
              ta = Math.max(ft, R.width),
              jn = window.innerWidth - Cn,
              yn = oh(_e, [Cn, Math.max(Cn, jn - ta)]);
            ((f.style.minWidth = ft + "px"), (f.style.left = yn + "px"));
          } else {
            const Ne = R.right - $.right,
              _e = window.innerWidth - U.right - Ne,
              yt = window.innerWidth - j.right - _e,
              ft = j.width + yt,
              ta = Math.max(ft, R.width),
              jn = window.innerWidth - Cn,
              yn = oh(_e, [Cn, Math.max(Cn, jn - ta)]);
            ((f.style.minWidth = ft + "px"), (f.style.right = yn + "px"));
          }
          const Z = S(),
            W = window.innerHeight - Cn * 2,
            re = w.scrollHeight,
            oe = window.getComputedStyle(g),
            ie = parseInt(oe.borderTopWidth, 10),
            M = parseInt(oe.paddingTop, 10),
            V = parseInt(oe.borderBottomWidth, 10),
            H = parseInt(oe.paddingBottom, 10),
            le = ie + M + re + H + V,
            de = Math.min(E.offsetHeight * 5, le),
            _ = window.getComputedStyle(w),
            X = parseInt(_.paddingTop, 10),
            I = parseInt(_.paddingBottom, 10),
            K = j.top + j.height / 2 - Cn,
            ae = W - K,
            ue = E.offsetHeight / 2,
            ne = E.offsetTop + ue,
            fe = ie + M + ne,
            xe = le - fe;
          if (fe <= K) {
            const Ne = Z.length > 0 && E === Z[Z.length - 1].ref.current;
            f.style.bottom = "0px";
            const _e = g.clientHeight - w.offsetTop - w.offsetHeight,
              yt = Math.max(ae, ue + (Ne ? I : 0) + _e + V),
              ft = fe + yt;
            f.style.height = ft + "px";
          } else {
            const Ne = Z.length > 0 && E === Z[0].ref.current;
            f.style.top = "0px";
            const yt = Math.max(K, ie + w.offsetTop + (Ne ? X : 0) + ue) + xe;
            ((f.style.height = yt + "px"),
              (w.scrollTop = fe - K + w.offsetTop));
          }
          ((f.style.margin = `${Cn}px 0`),
            (f.style.minHeight = de + "px"),
            (f.style.maxHeight = W + "px"),
            o?.(),
            requestAnimationFrame(() => (A.current = !0)));
        }
      }, [S, c.trigger, c.valueNode, f, g, w, E, O, c.dir, o]);
    Ct(() => P(), [P]);
    const [G, L] = y.useState();
    Ct(() => {
      g && L(window.getComputedStyle(g).zIndex);
    }, [g]);
    const q = y.useCallback(
      (j) => {
        j && N.current === !0 && (P(), D?.(), (N.current = !1));
      },
      [P, D],
    );
    return m.jsx(n4, {
      scope: s,
      contentWrapper: f,
      shouldExpandOnScrollRef: A,
      onScrollButtonChange: q,
      children: m.jsx("div", {
        ref: p,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: G,
        },
        children: m.jsx(ke.div, {
          ...i,
          ref: v,
          style: { boxSizing: "border-box", maxHeight: "100%", ...i.style },
        }),
      }),
    });
  });
B1.displayName = e4;
var t4 = "SelectPopperPosition",
  uh = y.forwardRef((t, a) => {
    const {
        __scopeSelect: s,
        align: o = "start",
        collisionPadding: i = Cn,
        ...c
      } = t,
      u = $c(s);
    return m.jsx(z5, {
      ...u,
      ...c,
      ref: a,
      align: o,
      collisionPadding: i,
      style: {
        boxSizing: "border-box",
        ...c.style,
        "--radix-select-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-select-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
uh.displayName = t4;
var [n4, lp] = ao(Vr, {}),
  dh = "SelectViewport",
  q1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, nonce: o, ...i } = t,
      c = fr(dh, s),
      u = lp(dh, s),
      f = qe(a, c.onViewportChange),
      p = y.useRef(0);
    return m.jsxs(m.Fragment, {
      children: [
        m.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: o,
        }),
        m.jsx(Ic.Slot, {
          scope: s,
          children: m.jsx(ke.div, {
            "data-radix-select-viewport": "",
            role: "presentation",
            ...i,
            ref: f,
            style: {
              position: "relative",
              flex: 1,
              overflow: "hidden auto",
              ...i.style,
            },
            onScroll: ze(i.onScroll, (g) => {
              const x = g.currentTarget,
                { contentWrapper: v, shouldExpandOnScrollRef: S } = u;
              if (S?.current && v) {
                const A = Math.abs(p.current - x.scrollTop);
                if (A > 0) {
                  const N = window.innerHeight - Cn * 2,
                    w = parseFloat(v.style.minHeight),
                    E = parseFloat(v.style.height),
                    O = Math.max(w, E);
                  if (O < N) {
                    const D = O + A,
                      P = Math.min(N, D),
                      G = D - P;
                    ((v.style.height = P + "px"),
                      v.style.bottom === "0px" &&
                        ((x.scrollTop = G > 0 ? G : 0),
                        (v.style.justifyContent = "flex-end")));
                  }
                }
              }
              p.current = x.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
q1.displayName = dh;
var Q1 = "SelectGroup",
  [a4, r4] = ao(Q1),
  s4 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, ...o } = t,
      i = Qs();
    return m.jsx(a4, {
      scope: s,
      id: i,
      children: m.jsx(ke.div, {
        role: "group",
        "aria-labelledby": i,
        ...o,
        ref: a,
      }),
    });
  });
s4.displayName = Q1;
var V1 = "SelectLabel",
  o4 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, ...o } = t,
      i = r4(V1, s);
    return m.jsx(ke.div, { id: i.id, ...o, ref: a });
  });
o4.displayName = V1;
var wc = "SelectItem",
  [l4, I1] = ao(wc),
  Y1 = y.forwardRef((t, a) => {
    const {
        __scopeSelect: s,
        value: o,
        disabled: i = !1,
        textValue: c,
        ...u
      } = t,
      f = dr(wc, s),
      p = fr(wc, s),
      g = f.value === o,
      [x, v] = y.useState(c ?? ""),
      [S, A] = y.useState(!1),
      N = qe(a, (D) => p.itemRefCallback?.(D, o, i)),
      w = Qs(),
      E = y.useRef("touch"),
      O = () => {
        i || (f.onValueChange(o), f.onOpenChange(!1));
      };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
      );
    return m.jsx(l4, {
      scope: s,
      value: o,
      disabled: i,
      textId: w,
      isSelected: g,
      onItemTextChange: y.useCallback((D) => {
        v((P) => P || (D?.textContent ?? "").trim());
      }, []),
      children: m.jsx(Ic.ItemSlot, {
        scope: s,
        value: o,
        disabled: i,
        textValue: x,
        children: m.jsx(ke.div, {
          role: "option",
          "aria-labelledby": w,
          "data-highlighted": S ? "" : void 0,
          "aria-selected": g && S,
          "data-state": g ? "checked" : "unchecked",
          "aria-disabled": i || void 0,
          "data-disabled": i ? "" : void 0,
          tabIndex: i ? void 0 : -1,
          ...u,
          ref: N,
          onFocus: ze(u.onFocus, () => A(!0)),
          onBlur: ze(u.onBlur, () => A(!1)),
          onClick: ze(u.onClick, () => {
            E.current !== "mouse" && O();
          }),
          onPointerUp: ze(u.onPointerUp, () => {
            E.current === "mouse" && O();
          }),
          onPointerDown: ze(u.onPointerDown, (D) => {
            E.current = D.pointerType;
          }),
          onPointerMove: ze(u.onPointerMove, (D) => {
            ((E.current = D.pointerType),
              i
                ? p.onItemLeave?.()
                : E.current === "mouse" &&
                  D.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: ze(u.onPointerLeave, (D) => {
            D.currentTarget === document.activeElement && p.onItemLeave?.();
          }),
          onKeyDown: ze(u.onKeyDown, (D) => {
            (p.searchRef?.current !== "" && D.key === " ") ||
              (Y5.includes(D.key) && O(), D.key === " " && D.preventDefault());
          }),
        }),
      }),
    });
  });
Y1.displayName = wc;
var rl = "SelectItemText",
  $1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, className: o, style: i, ...c } = t,
      u = dr(rl, s),
      f = fr(rl, s),
      p = I1(rl, s),
      g = X5(rl, s),
      [x, v] = y.useState(null),
      S = qe(
        a,
        (O) => v(O),
        p.onItemTextChange,
        (O) => f.itemTextRefCallback?.(O, p.value, p.disabled),
      ),
      A = x?.textContent,
      N = y.useMemo(
        () =>
          m.jsx(
            "option",
            { value: p.value, disabled: p.disabled, children: A },
            p.value,
          ),
        [p.disabled, p.value, A],
      ),
      { onNativeOptionAdd: w, onNativeOptionRemove: E } = g;
    return (
      Ct(() => (w(N), () => E(N)), [w, E, N]),
      m.jsxs(m.Fragment, {
        children: [
          m.jsx(ke.span, { id: p.textId, ...c, ref: S }),
          p.isSelected && u.valueNode && !u.valueNodeHasChildren
            ? Nl.createPortal(c.children, u.valueNode)
            : null,
        ],
      })
    );
  });
$1.displayName = rl;
var G1 = "SelectItemIndicator",
  F1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, ...o } = t;
    return I1(G1, s).isSelected
      ? m.jsx(ke.span, { "aria-hidden": !0, ...o, ref: a })
      : null;
  });
F1.displayName = G1;
var fh = "SelectScrollUpButton",
  X1 = y.forwardRef((t, a) => {
    const s = fr(fh, t.__scopeSelect),
      o = lp(fh, t.__scopeSelect),
      [i, c] = y.useState(!1),
      u = qe(a, o.onScrollButtonChange);
    return (
      Ct(() => {
        if (s.viewport && s.isPositioned) {
          let f = function () {
            const g = p.scrollTop > 0;
            c(g);
          };
          const p = s.viewport;
          return (
            f(),
            p.addEventListener("scroll", f),
            () => p.removeEventListener("scroll", f)
          );
        }
      }, [s.viewport, s.isPositioned]),
      i
        ? m.jsx(Z1, {
            ...t,
            ref: u,
            onAutoScroll: () => {
              const { viewport: f, selectedItem: p } = s;
              f && p && (f.scrollTop = f.scrollTop - p.offsetHeight);
            },
          })
        : null
    );
  });
X1.displayName = fh;
var hh = "SelectScrollDownButton",
  K1 = y.forwardRef((t, a) => {
    const s = fr(hh, t.__scopeSelect),
      o = lp(hh, t.__scopeSelect),
      [i, c] = y.useState(!1),
      u = qe(a, o.onScrollButtonChange);
    return (
      Ct(() => {
        if (s.viewport && s.isPositioned) {
          let f = function () {
            const g = p.scrollHeight - p.clientHeight,
              x = Math.ceil(p.scrollTop) < g;
            c(x);
          };
          const p = s.viewport;
          return (
            f(),
            p.addEventListener("scroll", f),
            () => p.removeEventListener("scroll", f)
          );
        }
      }, [s.viewport, s.isPositioned]),
      i
        ? m.jsx(Z1, {
            ...t,
            ref: u,
            onAutoScroll: () => {
              const { viewport: f, selectedItem: p } = s;
              f && p && (f.scrollTop = f.scrollTop + p.offsetHeight);
            },
          })
        : null
    );
  });
K1.displayName = hh;
var Z1 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, onAutoScroll: o, ...i } = t,
      c = fr("SelectScrollButton", s),
      u = y.useRef(null),
      f = Yc(s),
      p = y.useCallback(() => {
        u.current !== null &&
          (window.clearInterval(u.current), (u.current = null));
      }, []);
    return (
      y.useEffect(() => () => p(), [p]),
      Ct(() => {
        f()
          .find((x) => x.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: "nearest" });
      }, [f]),
      m.jsx(ke.div, {
        "aria-hidden": !0,
        ...i,
        ref: a,
        style: { flexShrink: 0, ...i.style },
        onPointerDown: ze(i.onPointerDown, () => {
          u.current === null && (u.current = window.setInterval(o, 50));
        }),
        onPointerMove: ze(i.onPointerMove, () => {
          (c.onItemLeave?.(),
            u.current === null && (u.current = window.setInterval(o, 50)));
        }),
        onPointerLeave: ze(i.onPointerLeave, () => {
          p();
        }),
      })
    );
  }),
  i4 = "SelectSeparator",
  c4 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, ...o } = t;
    return m.jsx(ke.div, { "aria-hidden": !0, ...o, ref: a });
  });
c4.displayName = i4;
var ph = "SelectArrow",
  u4 = y.forwardRef((t, a) => {
    const { __scopeSelect: s, ...o } = t,
      i = $c(s),
      c = dr(ph, s),
      u = fr(ph, s);
    return c.open && u.position === "popper"
      ? m.jsx(P5, { ...i, ...o, ref: a })
      : null;
  });
u4.displayName = ph;
var d4 = "SelectBubbleInput",
  W1 = y.forwardRef(({ __scopeSelect: t, value: a, ...s }, o) => {
    const i = y.useRef(null),
      c = qe(o, i),
      u = O1(a);
    return (
      y.useEffect(() => {
        const f = i.current;
        if (!f) return;
        const p = window.HTMLSelectElement.prototype,
          x = Object.getOwnPropertyDescriptor(p, "value").set;
        if (u !== a && x) {
          const v = new Event("change", { bubbles: !0 });
          (x.call(f, a), f.dispatchEvent(v));
        }
      }, [u, a]),
      m.jsx(ke.select, {
        ...s,
        style: { ..._1, ...s.style },
        ref: c,
        defaultValue: a,
      })
    );
  });
W1.displayName = d4;
function J1(t) {
  return t === "" || t === void 0;
}
function eS(t) {
  const a = Yt(t),
    s = y.useRef(""),
    o = y.useRef(0),
    i = y.useCallback(
      (u) => {
        const f = s.current + u;
        (a(f),
          (function p(g) {
            ((s.current = g),
              window.clearTimeout(o.current),
              g !== "" && (o.current = window.setTimeout(() => p(""), 1e3)));
          })(f));
      },
      [a],
    ),
    c = y.useCallback(() => {
      ((s.current = ""), window.clearTimeout(o.current));
    }, []);
  return (
    y.useEffect(() => () => window.clearTimeout(o.current), []),
    [s, i, c]
  );
}
function tS(t, a, s) {
  const i = a.length > 1 && Array.from(a).every((g) => g === a[0]) ? a[0] : a,
    c = s ? t.indexOf(s) : -1;
  let u = f4(t, Math.max(c, 0));
  i.length === 1 && (u = u.filter((g) => g !== s));
  const p = u.find((g) =>
    g.textValue.toLowerCase().startsWith(i.toLowerCase()),
  );
  return p !== s ? p : void 0;
}
function f4(t, a) {
  return t.map((s, o) => t[(a + o) % t.length]);
}
var h4 = j1,
  p4 = M1,
  m4 = z1,
  g4 = P1,
  v4 = k1,
  y4 = H1,
  x4 = q1,
  b4 = Y1,
  S4 = $1,
  w4 = F1,
  E4 = X1,
  C4 = K1;
function mh({ ...t }) {
  return m.jsx(h4, {
    "code-path": "src/components/ui/select.tsx:10:10",
    "data-slot": "select",
    ...t,
  });
}
function gh({ ...t }) {
  return m.jsx(m4, {
    "code-path": "src/components/ui/select.tsx:22:10",
    "data-slot": "select-value",
    ...t,
  });
}
function vh({ className: t, size: a = "default", children: s, ...o }) {
  return m.jsxs(p4, {
    "code-path": "src/components/ui/select.tsx:34:5",
    "data-slot": "select-trigger",
    "data-size": a,
    className: Fe(
      "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      t,
    ),
    ...o,
    children: [
      s,
      m.jsx(g4, {
        "code-path": "src/components/ui/select.tsx:44:7",
        asChild: !0,
        children: m.jsx(Uh, {
          "code-path": "src/components/ui/select.tsx:45:9",
          className: "size-4 opacity-50",
        }),
      }),
    ],
  });
}
function yh({
  className: t,
  children: a,
  position: s = "item-aligned",
  align: o = "center",
  ...i
}) {
  return m.jsx(v4, {
    "code-path": "src/components/ui/select.tsx:59:5",
    children: m.jsxs(y4, {
      "code-path": "src/components/ui/select.tsx:60:7",
      "data-slot": "select-content",
      className: Fe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        s === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        t,
      ),
      position: s,
      align: o,
      ...i,
      children: [
        m.jsx(A4, { "code-path": "src/components/ui/select.tsx:72:9" }),
        m.jsx(x4, {
          "code-path": "src/components/ui/select.tsx:73:9",
          className: Fe(
            "p-1",
            s === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          ),
          children: a,
        }),
        m.jsx(N4, { "code-path": "src/components/ui/select.tsx:82:9" }),
      ],
    }),
  });
}
function xh({ className: t, children: a, ...s }) {
  return m.jsxs(b4, {
    "code-path": "src/components/ui/select.tsx:107:5",
    "data-slot": "select-item",
    className: Fe(
      "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      t,
    ),
    ...s,
    children: [
      m.jsx("span", {
        "code-path": "src/components/ui/select.tsx:115:7",
        "data-slot": "select-item-indicator",
        className: "absolute right-2 flex size-3.5 items-center justify-center",
        children: m.jsx(w4, {
          "code-path": "src/components/ui/select.tsx:119:9",
          children: m.jsx(J0, {
            "code-path": "src/components/ui/select.tsx:120:11",
            className: "size-4",
          }),
        }),
      }),
      m.jsx(S4, {
        "code-path": "src/components/ui/select.tsx:123:7",
        children: a,
      }),
    ],
  });
}
function A4({ className: t, ...a }) {
  return m.jsx(E4, {
    "code-path": "src/components/ui/select.tsx:146:5",
    "data-slot": "select-scroll-up-button",
    className: Fe("flex cursor-default items-center justify-center py-1", t),
    ...a,
    children: m.jsx(eb, {
      "code-path": "src/components/ui/select.tsx:154:7",
      className: "size-4",
    }),
  });
}
function N4({ className: t, ...a }) {
  return m.jsx(C4, {
    "code-path": "src/components/ui/select.tsx:164:5",
    "data-slot": "select-scroll-down-button",
    className: Fe("flex cursor-default items-center justify-center py-1", t),
    ...a,
    children: m.jsx(Uh, {
      "code-path": "src/components/ui/select.tsx:172:7",
      className: "size-4",
    }),
  });
}
function R4(t, a = []) {
  let s = [];
  function o(c, u) {
    const f = y.createContext(u);
    f.displayName = c + "Context";
    const p = s.length;
    s = [...s, u];
    const g = (v) => {
      const { scope: S, children: A, ...N } = v,
        w = S?.[t]?.[p] || f,
        E = y.useMemo(() => N, Object.values(N));
      return m.jsx(w.Provider, { value: E, children: A });
    };
    g.displayName = c + "Provider";
    function x(v, S) {
      const A = S?.[t]?.[p] || f,
        N = y.useContext(A);
      if (N) return N;
      if (u !== void 0) return u;
      throw new Error(`\`${v}\` must be used within \`${c}\``);
    }
    return [g, x];
  }
  const i = () => {
    const c = s.map((u) => y.createContext(u));
    return function (f) {
      const p = f?.[t] || c;
      return y.useMemo(() => ({ [`__scope${t}`]: { ...f, [t]: p } }), [f, p]);
    };
  };
  return ((i.scopeName = t), [o, O4(i, ...a)]);
}
function O4(...t) {
  const a = t[0];
  if (t.length === 1) return a;
  const s = () => {
    const o = t.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (c) {
      const u = o.reduce((f, { useScope: p, scopeName: g }) => {
        const v = p(c)[`__scope${g}`];
        return { ...f, ...v };
      }, {});
      return y.useMemo(() => ({ [`__scope${a.scopeName}`]: u }), [u]);
    };
  };
  return ((s.scopeName = a.scopeName), s);
}
var _4 = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  nS = _4.reduce((t, a) => {
    const s = Qh(`Primitive.${a}`),
      o = y.forwardRef((i, c) => {
        const { asChild: u, ...f } = i,
          p = u ? s : a;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          m.jsx(p, { ...f, ref: c })
        );
      });
    return ((o.displayName = `Primitive.${a}`), { ...t, [a]: o });
  }, {}),
  ip = "Progress",
  cp = 100,
  [j4] = R4(ip),
  [T4, M4] = j4(ip),
  aS = y.forwardRef((t, a) => {
    const {
      __scopeProgress: s,
      value: o = null,
      max: i,
      getValueLabel: c = D4,
      ...u
    } = t;
    (i || i === 0) && !Ox(i) && console.error(z4(`${i}`, "Progress"));
    const f = Ox(i) ? i : cp;
    o !== null && !_x(o, f) && console.error(P4(`${o}`, "Progress"));
    const p = _x(o, f) ? o : null,
      g = Ec(p) ? c(p, f) : void 0;
    return m.jsx(T4, {
      scope: s,
      value: p,
      max: f,
      children: m.jsx(nS.div, {
        "aria-valuemax": f,
        "aria-valuemin": 0,
        "aria-valuenow": Ec(p) ? p : void 0,
        "aria-valuetext": g,
        role: "progressbar",
        "data-state": oS(p, f),
        "data-value": p ?? void 0,
        "data-max": f,
        ...u,
        ref: a,
      }),
    });
  });
aS.displayName = ip;
var rS = "ProgressIndicator",
  sS = y.forwardRef((t, a) => {
    const { __scopeProgress: s, ...o } = t,
      i = M4(rS, s);
    return m.jsx(nS.div, {
      "data-state": oS(i.value, i.max),
      "data-value": i.value ?? void 0,
      "data-max": i.max,
      ...o,
      ref: a,
    });
  });
sS.displayName = rS;
function D4(t, a) {
  return `${Math.round((t / a) * 100)}%`;
}
function oS(t, a) {
  return t == null ? "indeterminate" : t === a ? "complete" : "loading";
}
function Ec(t) {
  return typeof t == "number";
}
function Ox(t) {
  return Ec(t) && !isNaN(t) && t > 0;
}
function _x(t, a) {
  return Ec(t) && !isNaN(t) && t <= a && t >= 0;
}
function z4(t, a) {
  return `Invalid prop \`max\` of value \`${t}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${cp}\`.`;
}
function P4(t, a) {
  return `Invalid prop \`value\` of value \`${t}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${cp} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var k4 = aS,
  H4 = sS;
function lS({ className: t, value: a, ...s }) {
  return m.jsx(k4, {
    "code-path": "src/components/ui/progress.tsx:12:5",
    "data-slot": "progress",
    className: Fe(
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      t,
    ),
    ...s,
    children: m.jsx(H4, {
      "code-path": "src/components/ui/progress.tsx:20:7",
      "data-slot": "progress-indicator",
      className: "bg-primary h-full w-full flex-1 transition-all",
      style: { transform: `translateX(-${100 - (a || 0)}%)` },
    }),
  });
}
const L4 = "yt-audio-extractor",
  U4 = 1,
  Xn = "downloadHistory";
function Gc() {
  return new Promise((t, a) => {
    const s = indexedDB.open(L4, U4);
    ((s.onerror = () => a(s.error)),
      (s.onsuccess = () => t(s.result)),
      (s.onupgradeneeded = (o) => {
        const i = o.target.result;
        if (!i.objectStoreNames.contains(Xn)) {
          const c = i.createObjectStore(Xn, {
            keyPath: "id",
            autoIncrement: !0,
          });
          (c.createIndex("createdAt", "createdAt", { unique: !1 }),
            c.createIndex("videoId", "videoId", { unique: !1 }),
            c.createIndex("status", "status", { unique: !1 }));
        }
      }));
  });
}
async function iS(t) {
  const a = await Gc();
  return new Promise((s, o) => {
    const i = a.transaction(Xn, "readwrite"),
      c = i.objectStore(Xn),
      u = { ...t, createdAt: new Date().toISOString() },
      f = c.add(u);
    ((f.onsuccess = () => s(f.result)),
      (f.onerror = () => o(f.error)),
      (i.oncomplete = () => a.close()));
  });
}
async function cS() {
  const t = await Gc();
  return new Promise((a, s) => {
    const o = t.transaction(Xn, "readonly"),
      u = o.objectStore(Xn).index("createdAt").openCursor(null, "prev"),
      f = [];
    ((u.onsuccess = () => {
      const p = u.result;
      p && f.length < 100 ? (f.push(p.value), p.continue()) : a(f);
    }),
      (u.onerror = () => s(u.error)),
      (o.oncomplete = () => t.close()));
  });
}
async function B4(t) {
  const a = await Gc();
  return new Promise((s, o) => {
    const i = a.transaction(Xn, "readwrite"),
      u = i.objectStore(Xn).delete(t);
    ((u.onsuccess = () => s()),
      (u.onerror = () => o(u.error)),
      (i.oncomplete = () => a.close()));
  });
}
async function uS() {
  const t = await Gc();
  return new Promise((a, s) => {
    const o = t.transaction(Xn, "readwrite"),
      c = o.objectStore(Xn).clear();
    ((c.onsuccess = () => a()),
      (c.onerror = () => s(c.error)),
      (o.oncomplete = () => t.close()));
  });
}
async function dS() {
  const t = await cS();
  return {
    total: t.length,
    completed: t.filter((a) => a.status === "completed").length,
    failed: t.filter((a) => a.status === "failed").length,
    processing: t.filter((a) => a.status === "processing").length,
    totalSize: t.reduce((a, s) => a + (s.fileSize || 0), 0),
  };
}
const q4 = [
    { value: "mp3", label: "MP3", desc: "Best compatibility" },
    { value: "wav", label: "WAV", desc: "Uncompressed" },
    { value: "m4a", label: "M4A", desc: "Apple format" },
    { value: "ogg", label: "OGG", desc: "Open source" },
    { value: "webm_audio", label: "WebM Audio", desc: "Web optimized" },
  ],
  Q4 = [
    { value: "best", label: "Best Quality", desc: "Highest available" },
    { value: "1080p", label: "1080p", desc: "Full HD" },
    { value: "720p", label: "720p", desc: "HD" },
    { value: "480p", label: "480p", desc: "SD" },
    { value: "360p", label: "360p", desc: "Low data" },
  ];
function V4() {
  const [t, a] = y.useState(""),
    [s, o] = y.useState("audio"),
    [i, c] = y.useState("mp3"),
    [u, f] = y.useState("best"),
    [p, g] = y.useState({ title: "", artist: "", album: "", filename: "" }),
    [x, v] = y.useState(!1),
    [S, A] = y.useState(0),
    [N, w] = y.useState(null),
    E = Yn.youtube.getVideoInfo.useQuery({ url: t }, { enabled: !1 }),
    O = Yn.youtube.extractAudio.useMutation(),
    D = Yn.youtube.downloadVideo.useMutation(),
    P = async () => {
      if (!t.trim()) return;
      w(null);
      const R = await E.refetch();
      R.data &&
        g({
          title: R.data.title || "",
          artist: R.data.uploader || "",
          album: "",
          filename: `${R.data.title || "audio"}`
            .replace(/[^a-zA-Z0-9\-_\s]/g, "")
            .trim(),
        });
    },
    G = async () => {
      if (E.data) {
        (v(!0), A(10));
        try {
          let R;
          (s === "audio"
            ? (R = await O.mutateAsync({ url: t, format: i, metadata: p }))
            : (R = await D.mutateAsync({
                url: t,
                quality: u,
                filename: p.filename,
              })),
            A(100),
            w(R),
            await iS({
              videoId: E.data.videoId,
              youtubeUrl: t,
              title: p.title || E.data.title,
              artist: p.artist || E.data.uploader,
              album: p.album || "",
              thumbnail: E.data.thumbnail,
              format: s === "audio" ? i : "mp4",
              duration: E.data.duration,
              fileSize: R.fileSize || 0,
              filename: R.filename,
              downloadUrl: R.downloadUrl,
              status: "completed",
              type: s === "audio" ? "audio" : "video",
            }),
            Vn.success("Download Ready", {
              description: `${R.filename} is ready for download`,
            }));
          const U = document.createElement("a");
          ((U.href = R.downloadUrl), (U.download = R.filename), U.click());
        } catch (R) {
          Vn.error("Error", { description: R.message || "Failed to process" });
        } finally {
          v(!1);
        }
      }
    },
    L = () => {
      (a(""),
        w(null),
        g({ title: "", artist: "", album: "", filename: "" }),
        A(0));
    },
    q = (R) => {
      const U = Math.floor(R / 60),
        $ = R % 60,
        Z = Math.floor(U / 60);
      return Z > 0
        ? `${Z}:${(U % 60).toString().padStart(2, "0")}:${$.toString().padStart(2, "0")}`
        : `${U}:${$.toString().padStart(2, "0")}`;
    },
    j = (R) => {
      if (!R) return "Unknown";
      const U = R / (1024 * 1024);
      return U > 1024 ? `${(U / 1024).toFixed(2)} GB` : `${U.toFixed(1)} MB`;
    };
  return m.jsxs("div", {
    "code-path": "src/pages/Extractor.tsx:170:5",
    className: "space-y-6 max-w-2xl mx-auto",
    children: [
      m.jsxs("div", {
        "code-path": "src/pages/Extractor.tsx:172:7",
        className: "text-center space-y-2",
        children: [
          m.jsxs("div", {
            "code-path": "src/pages/Extractor.tsx:173:9",
            className:
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2",
            children: [
              m.jsx(kc, {
                "code-path": "src/pages/Extractor.tsx:174:11",
                className: "w-3 h-3",
              }),
              s === "audio" ? "Audio Extractor" : "Video Downloader",
            ],
          }),
          m.jsx("h1", {
            "code-path": "src/pages/Extractor.tsx:177:9",
            className: "text-2xl font-bold",
            children: s === "audio" ? "Extract Audio" : "Download Video",
          }),
          m.jsx("p", {
            "code-path": "src/pages/Extractor.tsx:180:9",
            className: "text-sm text-muted-foreground",
            children: "Paste a YouTube URL to get started",
          }),
        ],
      }),
      m.jsx("div", {
        "code-path": "src/pages/Extractor.tsx:186:7",
        className: "flex justify-center",
        children: m.jsxs("div", {
          "code-path": "src/pages/Extractor.tsx:187:9",
          className: "inline-flex bg-muted rounded-lg p-1 gap-1",
          children: [
            m.jsxs("button", {
              "code-path": "src/pages/Extractor.tsx:188:11",
              onClick: () => o("audio"),
              className: `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${s === "audio" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                m.jsx(Ur, {
                  "code-path": "src/pages/Extractor.tsx:196:13",
                  className: "w-4 h-4",
                }),
                "Audio",
              ],
            }),
            m.jsxs("button", {
              "code-path": "src/pages/Extractor.tsx:199:11",
              onClick: () => o("video"),
              className: `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${s === "video" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                m.jsx(Hc, {
                  "code-path": "src/pages/Extractor.tsx:207:13",
                  className: "w-4 h-4",
                }),
                "Video",
              ],
            }),
          ],
        }),
      }),
      m.jsx("div", {
        "code-path": "src/pages/Extractor.tsx:214:7",
        className: "glass-card rounded-xl p-4 space-y-4",
        children: m.jsxs("div", {
          "code-path": "src/pages/Extractor.tsx:215:9",
          className: "flex gap-2",
          children: [
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:216:11",
              className: "flex-1 relative",
              children: [
                m.jsx(Qn, {
                  "code-path": "src/pages/Extractor.tsx:217:13",
                  placeholder: "https://www.youtube.com/watch?v=...",
                  value: t,
                  onChange: (R) => a(R.target.value),
                  onKeyDown: (R) => R.key === "Enter" && P(),
                  className:
                    "pr-10 bg-background/50 border-border/60 focus:border-primary/50",
                }),
                t &&
                  m.jsx("button", {
                    "code-path": "src/pages/Extractor.tsx:225:15",
                    onClick: () => a(""),
                    className:
                      "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    children: m.jsx(rb, {
                      "code-path": "src/pages/Extractor.tsx:229:17",
                      className: "w-4 h-4",
                    }),
                  }),
              ],
            }),
            m.jsxs(et, {
              "code-path": "src/pages/Extractor.tsx:233:11",
              onClick: P,
              disabled: !t.trim() || E.isFetching,
              className:
                "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 gap-2",
              children: [
                E.isFetching
                  ? m.jsx(Lr, {
                      "code-path": "src/pages/Extractor.tsx:239:15",
                      className: "w-4 h-4 animate-spin",
                    })
                  : m.jsx(sb, {
                      "code-path": "src/pages/Extractor.tsx:241:15",
                      className: "w-4 h-4",
                    }),
                "Fetch",
              ],
            }),
          ],
        }),
      }),
      E.data &&
        !N &&
        m.jsxs("div", {
          "code-path": "src/pages/Extractor.tsx:250:9",
          className: "animate-fade-in-up space-y-4",
          children: [
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:252:11",
              className: "glass-card rounded-xl overflow-hidden",
              children: [
                m.jsxs("div", {
                  "code-path": "src/pages/Extractor.tsx:253:13",
                  className: "aspect-video relative bg-black/50",
                  children: [
                    m.jsx("img", {
                      "code-path": "src/pages/Extractor.tsx:254:15",
                      src: E.data.thumbnail,
                      alt: E.data.title,
                      className: "w-full h-full object-cover",
                      onError: (R) => {
                        R.target.src = `https://img.youtube.com/vi/${E.data.videoId}/hqdefault.jpg`;
                      },
                    }),
                    E.data.duration > 0 &&
                      m.jsx("div", {
                        "code-path": "src/pages/Extractor.tsx:263:17",
                        className:
                          "absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-medium text-white",
                        children: q(E.data.duration),
                      }),
                  ],
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/Extractor.tsx:268:13",
                  className: "p-4 space-y-3",
                  children: [
                    m.jsx("h3", {
                      "code-path": "src/pages/Extractor.tsx:269:15",
                      className:
                        "font-semibold text-sm leading-snug line-clamp-2",
                      children: E.data.title,
                    }),
                    m.jsxs("div", {
                      "code-path": "src/pages/Extractor.tsx:272:15",
                      className:
                        "flex items-center gap-4 text-xs text-muted-foreground",
                      children: [
                        m.jsxs("span", {
                          "code-path": "src/pages/Extractor.tsx:273:17",
                          className: "flex items-center gap-1",
                          children: [
                            m.jsx(gl, {
                              "code-path": "src/pages/Extractor.tsx:274:19",
                              className: "w-3 h-3",
                            }),
                            E.data.uploader,
                          ],
                        }),
                        m.jsxs("span", {
                          "code-path": "src/pages/Extractor.tsx:277:17",
                          className: "flex items-center gap-1",
                          children: [
                            m.jsx(tO, {
                              "code-path": "src/pages/Extractor.tsx:278:19",
                              className: "w-3 h-3",
                            }),
                            E.data.videoId,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:286:11",
              className: "glass-card rounded-xl p-4 space-y-3",
              children: [
                m.jsxs(Bn, {
                  "code-path": "src/pages/Extractor.tsx:287:13",
                  className: "text-sm font-medium flex items-center gap-2",
                  children: [
                    m.jsx(Pc, {
                      "code-path": "src/pages/Extractor.tsx:288:15",
                      className: "w-4 h-4 text-primary",
                    }),
                    s === "audio" ? "Audio Format" : "Video Quality",
                  ],
                }),
                s === "audio"
                  ? m.jsxs(mh, {
                      "code-path": "src/pages/Extractor.tsx:292:15",
                      value: i,
                      onValueChange: c,
                      children: [
                        m.jsx(vh, {
                          "code-path": "src/pages/Extractor.tsx:293:17",
                          className: "bg-background/50",
                          children: m.jsx(gh, {
                            "code-path": "src/pages/Extractor.tsx:294:19",
                          }),
                        }),
                        m.jsx(yh, {
                          "code-path": "src/pages/Extractor.tsx:296:17",
                          children: q4.map((R) =>
                            m.jsx(
                              xh,
                              {
                                "code-path": "src/pages/Extractor.tsx:298:21",
                                value: R.value,
                                children: m.jsxs("div", {
                                  "code-path": "src/pages/Extractor.tsx:299:23",
                                  className:
                                    "flex items-center justify-between w-full gap-4",
                                  children: [
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/Extractor.tsx:300:25",
                                      children: R.label,
                                    }),
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/Extractor.tsx:301:25",
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: R.desc,
                                    }),
                                  ],
                                }),
                              },
                              R.value,
                            ),
                          ),
                        }),
                      ],
                    })
                  : m.jsxs(mh, {
                      "code-path": "src/pages/Extractor.tsx:310:15",
                      value: u,
                      onValueChange: f,
                      children: [
                        m.jsx(vh, {
                          "code-path": "src/pages/Extractor.tsx:311:17",
                          className: "bg-background/50",
                          children: m.jsx(gh, {
                            "code-path": "src/pages/Extractor.tsx:312:19",
                          }),
                        }),
                        m.jsx(yh, {
                          "code-path": "src/pages/Extractor.tsx:314:17",
                          children: Q4.map((R) =>
                            m.jsx(
                              xh,
                              {
                                "code-path": "src/pages/Extractor.tsx:316:21",
                                value: R.value,
                                children: m.jsxs("div", {
                                  "code-path": "src/pages/Extractor.tsx:317:23",
                                  className:
                                    "flex items-center justify-between w-full gap-4",
                                  children: [
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/Extractor.tsx:318:25",
                                      children: R.label,
                                    }),
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/Extractor.tsx:319:25",
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: R.desc,
                                    }),
                                  ],
                                }),
                              },
                              R.value,
                            ),
                          ),
                        }),
                      ],
                    }),
              ],
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:331:11",
              className: "glass-card rounded-xl p-4 space-y-4",
              children: [
                m.jsxs(Bn, {
                  "code-path": "src/pages/Extractor.tsx:332:13",
                  className: "text-sm font-medium flex items-center gap-2",
                  children: [
                    m.jsx(ab, {
                      "code-path": "src/pages/Extractor.tsx:333:15",
                      className: "w-4 h-4 text-primary",
                    }),
                    "Edit Metadata",
                  ],
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/Extractor.tsx:336:13",
                  className: "space-y-3",
                  children: [
                    m.jsxs("div", {
                      "code-path": "src/pages/Extractor.tsx:337:15",
                      children: [
                        m.jsx(Bn, {
                          "code-path": "src/pages/Extractor.tsx:338:17",
                          className:
                            "text-xs text-muted-foreground mb-1.5 block",
                          children: "Title",
                        }),
                        m.jsx(Qn, {
                          "code-path": "src/pages/Extractor.tsx:341:17",
                          value: p.title,
                          onChange: (R) => g({ ...p, title: R.target.value }),
                          placeholder: "Song title",
                          className: "bg-background/50 border-border/60",
                        }),
                      ],
                    }),
                    m.jsxs("div", {
                      "code-path": "src/pages/Extractor.tsx:350:15",
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        m.jsxs("div", {
                          "code-path": "src/pages/Extractor.tsx:351:17",
                          children: [
                            m.jsx(Bn, {
                              "code-path": "src/pages/Extractor.tsx:352:19",
                              className:
                                "text-xs text-muted-foreground mb-1.5 block",
                              children: "Artist",
                            }),
                            m.jsx(Qn, {
                              "code-path": "src/pages/Extractor.tsx:355:19",
                              value: p.artist,
                              onChange: (R) =>
                                g({ ...p, artist: R.target.value }),
                              placeholder: "Artist name",
                              className: "bg-background/50 border-border/60",
                            }),
                          ],
                        }),
                        m.jsxs("div", {
                          "code-path": "src/pages/Extractor.tsx:364:17",
                          children: [
                            m.jsx(Bn, {
                              "code-path": "src/pages/Extractor.tsx:365:19",
                              className:
                                "text-xs text-muted-foreground mb-1.5 block",
                              children: "Album",
                            }),
                            m.jsx(Qn, {
                              "code-path": "src/pages/Extractor.tsx:368:19",
                              value: p.album,
                              onChange: (R) =>
                                g({ ...p, album: R.target.value }),
                              placeholder: "Album name",
                              className: "bg-background/50 border-border/60",
                            }),
                          ],
                        }),
                      ],
                    }),
                    m.jsxs("div", {
                      "code-path": "src/pages/Extractor.tsx:378:15",
                      children: [
                        m.jsx(Bn, {
                          "code-path": "src/pages/Extractor.tsx:379:17",
                          className:
                            "text-xs text-muted-foreground mb-1.5 block",
                          children: "Filename",
                        }),
                        m.jsx(Qn, {
                          "code-path": "src/pages/Extractor.tsx:382:17",
                          value: p.filename,
                          onChange: (R) =>
                            g({ ...p, filename: R.target.value }),
                          placeholder: "Custom filename (without extension)",
                          className: "bg-background/50 border-border/60",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m.jsx(et, {
              "code-path": "src/pages/Extractor.tsx:395:11",
              onClick: G,
              disabled: x,
              className:
                "w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20 h-12 text-sm font-semibold gap-2",
              children: x
                ? m.jsxs(m.Fragment, {
                    children: [
                      m.jsx(Lr, {
                        "code-path": "src/pages/Extractor.tsx:402:17",
                        className: "w-4 h-4 animate-spin",
                      }),
                      "Processing...",
                    ],
                  })
                : s === "audio"
                  ? m.jsxs(m.Fragment, {
                      children: [
                        m.jsx(qs, {
                          "code-path": "src/pages/Extractor.tsx:407:17",
                          className: "w-4 h-4",
                        }),
                        "Extract & Download Audio",
                      ],
                    })
                  : m.jsxs(m.Fragment, {
                      children: [
                        m.jsx(qs, {
                          "code-path": "src/pages/Extractor.tsx:412:17",
                          className: "w-4 h-4",
                        }),
                        "Download Video",
                      ],
                    }),
            }),
            x &&
              m.jsxs("div", {
                "code-path": "src/pages/Extractor.tsx:419:13",
                className: "space-y-2",
                children: [
                  m.jsx(lS, {
                    "code-path": "src/pages/Extractor.tsx:420:15",
                    value: S,
                    className: "h-2",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Extractor.tsx:421:15",
                    className: "text-xs text-center text-muted-foreground",
                    children:
                      "Downloading and converting... this may take a moment",
                  }),
                ],
              }),
          ],
        }),
      E.error &&
        m.jsxs("div", {
          "code-path": "src/pages/Extractor.tsx:431:9",
          className:
            "glass-card rounded-xl p-6 text-center space-y-3 border-destructive/30",
          children: [
            m.jsx(Jf, {
              "code-path": "src/pages/Extractor.tsx:432:11",
              className: "w-10 h-10 text-destructive mx-auto",
            }),
            m.jsx("h3", {
              "code-path": "src/pages/Extractor.tsx:433:11",
              className: "font-semibold text-sm",
              children: "Failed to fetch video",
            }),
            m.jsx("p", {
              "code-path": "src/pages/Extractor.tsx:434:11",
              className: "text-xs text-muted-foreground",
              children: E.error.message || "Please check the URL and try again",
            }),
            m.jsx(et, {
              "code-path": "src/pages/Extractor.tsx:437:11",
              variant: "outline",
              size: "sm",
              onClick: P,
              children: "Try Again",
            }),
          ],
        }),
      N &&
        m.jsxs("div", {
          "code-path": "src/pages/Extractor.tsx:445:9",
          className:
            "animate-fade-in-up glass-card rounded-xl p-6 text-center space-y-4 border-primary/20 glow-orange-sm",
          children: [
            m.jsx(Gs, {
              "code-path": "src/pages/Extractor.tsx:446:11",
              className: "w-12 h-12 text-emerald-500 mx-auto",
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:447:11",
              children: [
                m.jsx("h3", {
                  "code-path": "src/pages/Extractor.tsx:448:13",
                  className: "font-semibold text-base mb-1",
                  children: "Download Complete!",
                }),
                m.jsx("p", {
                  "code-path": "src/pages/Extractor.tsx:449:13",
                  className: "text-sm text-muted-foreground",
                  children: N.filename,
                }),
                N.fileSize > 0 &&
                  m.jsxs("p", {
                    "code-path": "src/pages/Extractor.tsx:453:15",
                    className: "text-xs text-muted-foreground mt-1",
                    children: ["Size: ", j(N.fileSize)],
                  }),
              ],
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Extractor.tsx:458:11",
              className: "flex gap-2 justify-center",
              children: [
                m.jsxs(et, {
                  "code-path": "src/pages/Extractor.tsx:459:13",
                  onClick: () => {
                    const R = document.createElement("a");
                    ((R.href = N.downloadUrl),
                      (R.download = N.filename),
                      R.click());
                  },
                  className:
                    "bg-gradient-to-r from-orange-500 to-amber-600 gap-2",
                  children: [
                    m.jsx(qs, {
                      "code-path": "src/pages/Extractor.tsx:468:15",
                      className: "w-4 h-4",
                    }),
                    "Download File",
                  ],
                }),
                m.jsx(et, {
                  "code-path": "src/pages/Extractor.tsx:471:13",
                  variant: "outline",
                  onClick: L,
                  children: "Convert Another",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
var Fc = "Checkbox",
  [I4] = Gr(Fc),
  [Y4, up] = I4(Fc);
function $4(t) {
  const {
      __scopeCheckbox: a,
      checked: s,
      children: o,
      defaultChecked: i,
      disabled: c,
      form: u,
      name: f,
      onCheckedChange: p,
      required: g,
      value: x = "on",
      internal_do_not_use_render: v,
    } = t,
    [S, A] = gc({ prop: s, defaultProp: i ?? !1, onChange: p, caller: Fc }),
    [N, w] = y.useState(null),
    [E, O] = y.useState(null),
    D = y.useRef(!1),
    P = N ? !!u || !!N.closest("form") : !0,
    G = {
      checked: S,
      disabled: c,
      setChecked: A,
      control: N,
      setControl: w,
      name: f,
      form: u,
      value: x,
      hasConsumerStoppedPropagationRef: D,
      required: g,
      defaultChecked: sr(i) ? !1 : i,
      isFormControl: P,
      bubbleInput: E,
      setBubbleInput: O,
    };
  return m.jsx(Y4, { scope: a, ...G, children: G4(v) ? v(G) : o });
}
var fS = "CheckboxTrigger",
  hS = y.forwardRef(
    ({ __scopeCheckbox: t, onKeyDown: a, onClick: s, ...o }, i) => {
      const {
          control: c,
          value: u,
          disabled: f,
          checked: p,
          required: g,
          setControl: x,
          setChecked: v,
          hasConsumerStoppedPropagationRef: S,
          isFormControl: A,
          bubbleInput: N,
        } = up(fS, t),
        w = qe(i, x),
        E = y.useRef(p);
      return (
        y.useEffect(() => {
          const O = c?.form;
          if (O) {
            const D = () => v(E.current);
            return (
              O.addEventListener("reset", D),
              () => O.removeEventListener("reset", D)
            );
          }
        }, [c, v]),
        m.jsx(ke.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": sr(p) ? "mixed" : p,
          "aria-required": g,
          "data-state": xS(p),
          "data-disabled": f ? "" : void 0,
          disabled: f,
          value: u,
          ...o,
          ref: w,
          onKeyDown: ze(a, (O) => {
            O.key === "Enter" && O.preventDefault();
          }),
          onClick: ze(s, (O) => {
            (v((D) => (sr(D) ? !0 : !D)),
              N &&
                A &&
                ((S.current = O.isPropagationStopped()),
                S.current || O.stopPropagation()));
          }),
        })
      );
    },
  );
hS.displayName = fS;
var pS = y.forwardRef((t, a) => {
  const {
    __scopeCheckbox: s,
    name: o,
    checked: i,
    defaultChecked: c,
    required: u,
    disabled: f,
    value: p,
    onCheckedChange: g,
    form: x,
    ...v
  } = t;
  return m.jsx($4, {
    __scopeCheckbox: s,
    checked: i,
    defaultChecked: c,
    disabled: f,
    required: u,
    onCheckedChange: g,
    name: o,
    form: x,
    value: p,
    internal_do_not_use_render: ({ isFormControl: S }) =>
      m.jsxs(m.Fragment, {
        children: [
          m.jsx(hS, { ...v, ref: a, __scopeCheckbox: s }),
          S && m.jsx(yS, { __scopeCheckbox: s }),
        ],
      }),
  });
});
pS.displayName = Fc;
var mS = "CheckboxIndicator",
  gS = y.forwardRef((t, a) => {
    const { __scopeCheckbox: s, forceMount: o, ...i } = t,
      c = up(mS, s);
    return m.jsx(Na, {
      present: o || sr(c.checked) || c.checked === !0,
      children: m.jsx(ke.span, {
        "data-state": xS(c.checked),
        "data-disabled": c.disabled ? "" : void 0,
        ...i,
        ref: a,
        style: { pointerEvents: "none", ...t.style },
      }),
    });
  });
gS.displayName = mS;
var vS = "CheckboxBubbleInput",
  yS = y.forwardRef(({ __scopeCheckbox: t, ...a }, s) => {
    const {
        control: o,
        hasConsumerStoppedPropagationRef: i,
        checked: c,
        defaultChecked: u,
        required: f,
        disabled: p,
        name: g,
        value: x,
        form: v,
        bubbleInput: S,
        setBubbleInput: A,
      } = up(vS, t),
      N = qe(s, A),
      w = O1(c),
      E = v1(o);
    y.useEffect(() => {
      const D = S;
      if (!D) return;
      const P = window.HTMLInputElement.prototype,
        L = Object.getOwnPropertyDescriptor(P, "checked").set,
        q = !i.current;
      if (w !== c && L) {
        const j = new Event("click", { bubbles: q });
        ((D.indeterminate = sr(c)),
          L.call(D, sr(c) ? !1 : c),
          D.dispatchEvent(j));
      }
    }, [S, w, c, i]);
    const O = y.useRef(sr(c) ? !1 : c);
    return m.jsx(ke.input, {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: u ?? O.current,
      required: f,
      disabled: p,
      name: g,
      value: x,
      form: v,
      ...a,
      tabIndex: -1,
      ref: N,
      style: {
        ...a.style,
        ...E,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        transform: "translateX(-100%)",
      },
    });
  });
yS.displayName = vS;
function G4(t) {
  return typeof t == "function";
}
function sr(t) {
  return t === "indeterminate";
}
function xS(t) {
  return sr(t) ? "indeterminate" : t ? "checked" : "unchecked";
}
function F4({ className: t, ...a }) {
  return m.jsx(pS, {
    "code-path": "src/components/ui/checkbox.tsx:14:5",
    "data-slot": "checkbox",
    className: Fe(
      "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      t,
    ),
    ...a,
    children: m.jsx(gS, {
      "code-path": "src/components/ui/checkbox.tsx:22:7",
      "data-slot": "checkbox-indicator",
      className: "grid place-content-center text-current transition-none",
      children: m.jsx(J0, {
        "code-path": "src/components/ui/checkbox.tsx:26:9",
        className: "size-3.5",
      }),
    }),
  });
}
function X4(t, a) {
  return y.useReducer((s, o) => a[s][o] ?? s, t);
}
var dp = "ScrollArea",
  [bS] = Gr(dp),
  [K4, vn] = bS(dp),
  SS = y.forwardRef((t, a) => {
    const {
        __scopeScrollArea: s,
        type: o = "hover",
        dir: i,
        scrollHideDelay: c = 600,
        ...u
      } = t,
      [f, p] = y.useState(null),
      [g, x] = y.useState(null),
      [v, S] = y.useState(null),
      [A, N] = y.useState(null),
      [w, E] = y.useState(null),
      [O, D] = y.useState(0),
      [P, G] = y.useState(0),
      [L, q] = y.useState(!1),
      [j, R] = y.useState(!1),
      U = qe(a, (Z) => p(Z)),
      $ = r1(i);
    return m.jsx(K4, {
      scope: s,
      type: o,
      dir: $,
      scrollHideDelay: c,
      scrollArea: f,
      viewport: g,
      onViewportChange: x,
      content: v,
      onContentChange: S,
      scrollbarX: A,
      onScrollbarXChange: N,
      scrollbarXEnabled: L,
      onScrollbarXEnabledChange: q,
      scrollbarY: w,
      onScrollbarYChange: E,
      scrollbarYEnabled: j,
      onScrollbarYEnabledChange: R,
      onCornerWidthChange: D,
      onCornerHeightChange: G,
      children: m.jsx(ke.div, {
        dir: $,
        ...u,
        ref: U,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": O + "px",
          "--radix-scroll-area-corner-height": P + "px",
          ...t.style,
        },
      }),
    });
  });
SS.displayName = dp;
var wS = "ScrollAreaViewport",
  ES = y.forwardRef((t, a) => {
    const { __scopeScrollArea: s, children: o, nonce: i, ...c } = t,
      u = vn(wS, s),
      f = y.useRef(null),
      p = qe(a, f, u.onViewportChange);
    return m.jsxs(m.Fragment, {
      children: [
        m.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: i,
        }),
        m.jsx(ke.div, {
          "data-radix-scroll-area-viewport": "",
          ...c,
          ref: p,
          style: {
            overflowX: u.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: u.scrollbarYEnabled ? "scroll" : "hidden",
            ...t.style,
          },
          children: m.jsx("div", {
            ref: u.onContentChange,
            style: { minWidth: "100%", display: "table" },
            children: o,
          }),
        }),
      ],
    });
  });
ES.displayName = wS;
var ea = "ScrollAreaScrollbar",
  CS = y.forwardRef((t, a) => {
    const { forceMount: s, ...o } = t,
      i = vn(ea, t.__scopeScrollArea),
      { onScrollbarXEnabledChange: c, onScrollbarYEnabledChange: u } = i,
      f = t.orientation === "horizontal";
    return (
      y.useEffect(
        () => (
          f ? c(!0) : u(!0),
          () => {
            f ? c(!1) : u(!1);
          }
        ),
        [f, c, u],
      ),
      i.type === "hover"
        ? m.jsx(Z4, { ...o, ref: a, forceMount: s })
        : i.type === "scroll"
          ? m.jsx(W4, { ...o, ref: a, forceMount: s })
          : i.type === "auto"
            ? m.jsx(AS, { ...o, ref: a, forceMount: s })
            : i.type === "always"
              ? m.jsx(fp, { ...o, ref: a })
              : null
    );
  });
CS.displayName = ea;
var Z4 = y.forwardRef((t, a) => {
    const { forceMount: s, ...o } = t,
      i = vn(ea, t.__scopeScrollArea),
      [c, u] = y.useState(!1);
    return (
      y.useEffect(() => {
        const f = i.scrollArea;
        let p = 0;
        if (f) {
          const g = () => {
              (window.clearTimeout(p), u(!0));
            },
            x = () => {
              p = window.setTimeout(() => u(!1), i.scrollHideDelay);
            };
          return (
            f.addEventListener("pointerenter", g),
            f.addEventListener("pointerleave", x),
            () => {
              (window.clearTimeout(p),
                f.removeEventListener("pointerenter", g),
                f.removeEventListener("pointerleave", x));
            }
          );
        }
      }, [i.scrollArea, i.scrollHideDelay]),
      m.jsx(Na, {
        present: s || c,
        children: m.jsx(AS, {
          "data-state": c ? "visible" : "hidden",
          ...o,
          ref: a,
        }),
      })
    );
  }),
  W4 = y.forwardRef((t, a) => {
    const { forceMount: s, ...o } = t,
      i = vn(ea, t.__scopeScrollArea),
      c = t.orientation === "horizontal",
      u = Kc(() => p("SCROLL_END"), 100),
      [f, p] = X4("hidden", {
        hidden: { SCROLL: "scrolling" },
        scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" },
        interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
        idle: {
          HIDE: "hidden",
          SCROLL: "scrolling",
          POINTER_ENTER: "interacting",
        },
      });
    return (
      y.useEffect(() => {
        if (f === "idle") {
          const g = window.setTimeout(() => p("HIDE"), i.scrollHideDelay);
          return () => window.clearTimeout(g);
        }
      }, [f, i.scrollHideDelay, p]),
      y.useEffect(() => {
        const g = i.viewport,
          x = c ? "scrollLeft" : "scrollTop";
        if (g) {
          let v = g[x];
          const S = () => {
            const A = g[x];
            (v !== A && (p("SCROLL"), u()), (v = A));
          };
          return (
            g.addEventListener("scroll", S),
            () => g.removeEventListener("scroll", S)
          );
        }
      }, [i.viewport, c, p, u]),
      m.jsx(Na, {
        present: s || f !== "hidden",
        children: m.jsx(fp, {
          "data-state": f === "hidden" ? "hidden" : "visible",
          ...o,
          ref: a,
          onPointerEnter: ze(t.onPointerEnter, () => p("POINTER_ENTER")),
          onPointerLeave: ze(t.onPointerLeave, () => p("POINTER_LEAVE")),
        }),
      })
    );
  }),
  AS = y.forwardRef((t, a) => {
    const s = vn(ea, t.__scopeScrollArea),
      { forceMount: o, ...i } = t,
      [c, u] = y.useState(!1),
      f = t.orientation === "horizontal",
      p = Kc(() => {
        if (s.viewport) {
          const g = s.viewport.offsetWidth < s.viewport.scrollWidth,
            x = s.viewport.offsetHeight < s.viewport.scrollHeight;
          u(f ? g : x);
        }
      }, 10);
    return (
      Xs(s.viewport, p),
      Xs(s.content, p),
      m.jsx(Na, {
        present: o || c,
        children: m.jsx(fp, {
          "data-state": c ? "visible" : "hidden",
          ...i,
          ref: a,
        }),
      })
    );
  }),
  fp = y.forwardRef((t, a) => {
    const { orientation: s = "vertical", ...o } = t,
      i = vn(ea, t.__scopeScrollArea),
      c = y.useRef(null),
      u = y.useRef(0),
      [f, p] = y.useState({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
      }),
      g = jS(f.viewport, f.content),
      x = {
        ...o,
        sizes: f,
        onSizesChange: p,
        hasThumb: g > 0 && g < 1,
        onThumbChange: (S) => (c.current = S),
        onThumbPointerUp: () => (u.current = 0),
        onThumbPointerDown: (S) => (u.current = S),
      };
    function v(S, A) {
      return rM(S, u.current, f, A);
    }
    return s === "horizontal"
      ? m.jsx(J4, {
          ...x,
          ref: a,
          onThumbPositionChange: () => {
            if (i.viewport && c.current) {
              const S = i.viewport.scrollLeft,
                A = jx(S, f, i.dir);
              c.current.style.transform = `translate3d(${A}px, 0, 0)`;
            }
          },
          onWheelScroll: (S) => {
            i.viewport && (i.viewport.scrollLeft = S);
          },
          onDragScroll: (S) => {
            i.viewport && (i.viewport.scrollLeft = v(S, i.dir));
          },
        })
      : s === "vertical"
        ? m.jsx(eM, {
            ...x,
            ref: a,
            onThumbPositionChange: () => {
              if (i.viewport && c.current) {
                const S = i.viewport.scrollTop,
                  A = jx(S, f);
                c.current.style.transform = `translate3d(0, ${A}px, 0)`;
              }
            },
            onWheelScroll: (S) => {
              i.viewport && (i.viewport.scrollTop = S);
            },
            onDragScroll: (S) => {
              i.viewport && (i.viewport.scrollTop = v(S));
            },
          })
        : null;
  }),
  J4 = y.forwardRef((t, a) => {
    const { sizes: s, onSizesChange: o, ...i } = t,
      c = vn(ea, t.__scopeScrollArea),
      [u, f] = y.useState(),
      p = y.useRef(null),
      g = qe(a, p, c.onScrollbarXChange);
    return (
      y.useEffect(() => {
        p.current && f(getComputedStyle(p.current));
      }, [p]),
      m.jsx(RS, {
        "data-orientation": "horizontal",
        ...i,
        ref: g,
        sizes: s,
        style: {
          bottom: 0,
          left: c.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
          right: c.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
          "--radix-scroll-area-thumb-width": Xc(s) + "px",
          ...t.style,
        },
        onThumbPointerDown: (x) => t.onThumbPointerDown(x.x),
        onDragScroll: (x) => t.onDragScroll(x.x),
        onWheelScroll: (x, v) => {
          if (c.viewport) {
            const S = c.viewport.scrollLeft + x.deltaX;
            (t.onWheelScroll(S), MS(S, v) && x.preventDefault());
          }
        },
        onResize: () => {
          p.current &&
            c.viewport &&
            u &&
            o({
              content: c.viewport.scrollWidth,
              viewport: c.viewport.offsetWidth,
              scrollbar: {
                size: p.current.clientWidth,
                paddingStart: Ac(u.paddingLeft),
                paddingEnd: Ac(u.paddingRight),
              },
            });
        },
      })
    );
  }),
  eM = y.forwardRef((t, a) => {
    const { sizes: s, onSizesChange: o, ...i } = t,
      c = vn(ea, t.__scopeScrollArea),
      [u, f] = y.useState(),
      p = y.useRef(null),
      g = qe(a, p, c.onScrollbarYChange);
    return (
      y.useEffect(() => {
        p.current && f(getComputedStyle(p.current));
      }, [p]),
      m.jsx(RS, {
        "data-orientation": "vertical",
        ...i,
        ref: g,
        sizes: s,
        style: {
          top: 0,
          right: c.dir === "ltr" ? 0 : void 0,
          left: c.dir === "rtl" ? 0 : void 0,
          bottom: "var(--radix-scroll-area-corner-height)",
          "--radix-scroll-area-thumb-height": Xc(s) + "px",
          ...t.style,
        },
        onThumbPointerDown: (x) => t.onThumbPointerDown(x.y),
        onDragScroll: (x) => t.onDragScroll(x.y),
        onWheelScroll: (x, v) => {
          if (c.viewport) {
            const S = c.viewport.scrollTop + x.deltaY;
            (t.onWheelScroll(S), MS(S, v) && x.preventDefault());
          }
        },
        onResize: () => {
          p.current &&
            c.viewport &&
            u &&
            o({
              content: c.viewport.scrollHeight,
              viewport: c.viewport.offsetHeight,
              scrollbar: {
                size: p.current.clientHeight,
                paddingStart: Ac(u.paddingTop),
                paddingEnd: Ac(u.paddingBottom),
              },
            });
        },
      })
    );
  }),
  [tM, NS] = bS(ea),
  RS = y.forwardRef((t, a) => {
    const {
        __scopeScrollArea: s,
        sizes: o,
        hasThumb: i,
        onThumbChange: c,
        onThumbPointerUp: u,
        onThumbPointerDown: f,
        onThumbPositionChange: p,
        onDragScroll: g,
        onWheelScroll: x,
        onResize: v,
        ...S
      } = t,
      A = vn(ea, s),
      [N, w] = y.useState(null),
      E = qe(a, (U) => w(U)),
      O = y.useRef(null),
      D = y.useRef(""),
      P = A.viewport,
      G = o.content - o.viewport,
      L = Yt(x),
      q = Yt(p),
      j = Kc(v, 10);
    function R(U) {
      if (O.current) {
        const $ = U.clientX - O.current.left,
          Z = U.clientY - O.current.top;
        g({ x: $, y: Z });
      }
    }
    return (
      y.useEffect(() => {
        const U = ($) => {
          const Z = $.target;
          N?.contains(Z) && L($, G);
        };
        return (
          document.addEventListener("wheel", U, { passive: !1 }),
          () => document.removeEventListener("wheel", U, { passive: !1 })
        );
      }, [P, N, G, L]),
      y.useEffect(q, [o, q]),
      Xs(N, j),
      Xs(A.content, j),
      m.jsx(tM, {
        scope: s,
        scrollbar: N,
        hasThumb: i,
        onThumbChange: Yt(c),
        onThumbPointerUp: Yt(u),
        onThumbPositionChange: q,
        onThumbPointerDown: Yt(f),
        children: m.jsx(ke.div, {
          ...S,
          ref: E,
          style: { position: "absolute", ...S.style },
          onPointerDown: ze(t.onPointerDown, (U) => {
            U.button === 0 &&
              (U.target.setPointerCapture(U.pointerId),
              (O.current = N.getBoundingClientRect()),
              (D.current = document.body.style.webkitUserSelect),
              (document.body.style.webkitUserSelect = "none"),
              A.viewport && (A.viewport.style.scrollBehavior = "auto"),
              R(U));
          }),
          onPointerMove: ze(t.onPointerMove, R),
          onPointerUp: ze(t.onPointerUp, (U) => {
            const $ = U.target;
            ($.hasPointerCapture(U.pointerId) &&
              $.releasePointerCapture(U.pointerId),
              (document.body.style.webkitUserSelect = D.current),
              A.viewport && (A.viewport.style.scrollBehavior = ""),
              (O.current = null));
          }),
        }),
      })
    );
  }),
  Cc = "ScrollAreaThumb",
  OS = y.forwardRef((t, a) => {
    const { forceMount: s, ...o } = t,
      i = NS(Cc, t.__scopeScrollArea);
    return m.jsx(Na, {
      present: s || i.hasThumb,
      children: m.jsx(nM, { ref: a, ...o }),
    });
  }),
  nM = y.forwardRef((t, a) => {
    const { __scopeScrollArea: s, style: o, ...i } = t,
      c = vn(Cc, s),
      u = NS(Cc, s),
      { onThumbPositionChange: f } = u,
      p = qe(a, (v) => u.onThumbChange(v)),
      g = y.useRef(void 0),
      x = Kc(() => {
        g.current && (g.current(), (g.current = void 0));
      }, 100);
    return (
      y.useEffect(() => {
        const v = c.viewport;
        if (v) {
          const S = () => {
            if ((x(), !g.current)) {
              const A = sM(v, f);
              ((g.current = A), f());
            }
          };
          return (
            f(),
            v.addEventListener("scroll", S),
            () => v.removeEventListener("scroll", S)
          );
        }
      }, [c.viewport, x, f]),
      m.jsx(ke.div, {
        "data-state": u.hasThumb ? "visible" : "hidden",
        ...i,
        ref: p,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...o,
        },
        onPointerDownCapture: ze(t.onPointerDownCapture, (v) => {
          const A = v.target.getBoundingClientRect(),
            N = v.clientX - A.left,
            w = v.clientY - A.top;
          u.onThumbPointerDown({ x: N, y: w });
        }),
        onPointerUp: ze(t.onPointerUp, u.onThumbPointerUp),
      })
    );
  });
OS.displayName = Cc;
var hp = "ScrollAreaCorner",
  _S = y.forwardRef((t, a) => {
    const s = vn(hp, t.__scopeScrollArea),
      o = !!(s.scrollbarX && s.scrollbarY);
    return s.type !== "scroll" && o ? m.jsx(aM, { ...t, ref: a }) : null;
  });
_S.displayName = hp;
var aM = y.forwardRef((t, a) => {
  const { __scopeScrollArea: s, ...o } = t,
    i = vn(hp, s),
    [c, u] = y.useState(0),
    [f, p] = y.useState(0),
    g = !!(c && f);
  return (
    Xs(i.scrollbarX, () => {
      const x = i.scrollbarX?.offsetHeight || 0;
      (i.onCornerHeightChange(x), p(x));
    }),
    Xs(i.scrollbarY, () => {
      const x = i.scrollbarY?.offsetWidth || 0;
      (i.onCornerWidthChange(x), u(x));
    }),
    g
      ? m.jsx(ke.div, {
          ...o,
          ref: a,
          style: {
            width: c,
            height: f,
            position: "absolute",
            right: i.dir === "ltr" ? 0 : void 0,
            left: i.dir === "rtl" ? 0 : void 0,
            bottom: 0,
            ...t.style,
          },
        })
      : null
  );
});
function Ac(t) {
  return t ? parseInt(t, 10) : 0;
}
function jS(t, a) {
  const s = t / a;
  return isNaN(s) ? 0 : s;
}
function Xc(t) {
  const a = jS(t.viewport, t.content),
    s = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    o = (t.scrollbar.size - s) * a;
  return Math.max(o, 18);
}
function rM(t, a, s, o = "ltr") {
  const i = Xc(s),
    c = i / 2,
    u = a || c,
    f = i - u,
    p = s.scrollbar.paddingStart + u,
    g = s.scrollbar.size - s.scrollbar.paddingEnd - f,
    x = s.content - s.viewport,
    v = o === "ltr" ? [0, x] : [x * -1, 0];
  return TS([p, g], v)(t);
}
function jx(t, a, s = "ltr") {
  const o = Xc(a),
    i = a.scrollbar.paddingStart + a.scrollbar.paddingEnd,
    c = a.scrollbar.size - i,
    u = a.content - a.viewport,
    f = c - o,
    p = s === "ltr" ? [0, u] : [u * -1, 0],
    g = oh(t, p);
  return TS([0, u], [0, f])(g);
}
function TS(t, a) {
  return (s) => {
    if (t[0] === t[1] || a[0] === a[1]) return a[0];
    const o = (a[1] - a[0]) / (t[1] - t[0]);
    return a[0] + o * (s - t[0]);
  };
}
function MS(t, a) {
  return t > 0 && t < a;
}
var sM = (t, a = () => {}) => {
  let s = { left: t.scrollLeft, top: t.scrollTop },
    o = 0;
  return (
    (function i() {
      const c = { left: t.scrollLeft, top: t.scrollTop },
        u = s.left !== c.left,
        f = s.top !== c.top;
      ((u || f) && a(), (s = c), (o = window.requestAnimationFrame(i)));
    })(),
    () => window.cancelAnimationFrame(o)
  );
};
function Kc(t, a) {
  const s = Yt(t),
    o = y.useRef(0);
  return (
    y.useEffect(() => () => window.clearTimeout(o.current), []),
    y.useCallback(() => {
      (window.clearTimeout(o.current), (o.current = window.setTimeout(s, a)));
    }, [s, a])
  );
}
function Xs(t, a) {
  const s = Yt(a);
  Ct(() => {
    let o = 0;
    if (t) {
      const i = new ResizeObserver(() => {
        (cancelAnimationFrame(o), (o = window.requestAnimationFrame(s)));
      });
      return (
        i.observe(t),
        () => {
          (window.cancelAnimationFrame(o), i.unobserve(t));
        }
      );
    }
  }, [t, s]);
}
var oM = SS,
  lM = ES,
  iM = _S;
function bh({ className: t, children: a, ...s }) {
  return m.jsxs(oM, {
    "code-path": "src/components/ui/scroll-area.tsx:14:5",
    "data-slot": "scroll-area",
    className: Fe("relative", t),
    ...s,
    children: [
      m.jsx(lM, {
        "code-path": "src/components/ui/scroll-area.tsx:19:7",
        "data-slot": "scroll-area-viewport",
        className:
          "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
        children: a,
      }),
      m.jsx(cM, { "code-path": "src/components/ui/scroll-area.tsx:25:7" }),
      m.jsx(iM, { "code-path": "src/components/ui/scroll-area.tsx:26:7" }),
    ],
  });
}
function cM({ className: t, orientation: a = "vertical", ...s }) {
  return m.jsx(CS, {
    "code-path": "src/components/ui/scroll-area.tsx:37:5",
    "data-slot": "scroll-area-scrollbar",
    orientation: a,
    className: Fe(
      "flex touch-none p-px transition-colors select-none",
      a === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      a === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      t,
    ),
    ...s,
    children: m.jsx(OS, {
      "code-path": "src/components/ui/scroll-area.tsx:50:7",
      "data-slot": "scroll-area-thumb",
      className: "bg-border relative flex-1 rounded-full",
    }),
  });
}
const uM = [
  { value: "mp3", label: "MP3", desc: "Best compatibility" },
  { value: "wav", label: "WAV", desc: "Uncompressed" },
  { value: "m4a", label: "M4A", desc: "Apple format" },
  { value: "ogg", label: "OGG", desc: "Open source" },
  { value: "webm_audio", label: "WebM Audio", desc: "Web optimized" },
];
function dM() {
  const [t, a] = y.useState(""),
    [s, o] = y.useState("mp3"),
    [i, c] = y.useState(null),
    [u, f] = y.useState(new Set()),
    [p, g] = y.useState({}),
    [x, v] = y.useState(!1),
    [S, A] = y.useState(null),
    N = Yn.youtube.getPlaylistInfo.useQuery({ url: t }, { enabled: !1 }),
    w = Yn.youtube.processPlaylist.useMutation(),
    E = async () => {
      if (!t.trim()) return;
      A(null);
      const U = (await N.refetch()).data;
      if (U) {
        const $ = U.videos,
          Z = new Set($.map((re) => re.videoId));
        f(Z);
        const W = {};
        ($.forEach((re) => {
          W[re.videoId] = {
            title: re.title || "",
            artist: re.uploader || "",
            album: U.title || "",
            filename: `${re.title || "audio"}`
              .replace(/[^a-zA-Z0-9\-_\s]/g, "")
              .trim(),
          };
        }),
          g(W));
      }
    },
    O = (R) => {
      f((U) => {
        const $ = new Set(U);
        return ($.has(R) ? $.delete(R) : $.add(R), $);
      });
    },
    D = () => {
      if (!N.data) return;
      const R = N.data.videos;
      u.size === R.length ? f(new Set()) : f(new Set(R.map((U) => U.videoId)));
    },
    P = (R, U) => {
      g(($) => ({ ...$, [R]: { ...$[R], ...U } }));
    },
    G = async () => {
      if (!N.data || u.size === 0) return;
      v(!0);
      const U = N.data.videos
        .filter(($) => u.has($.videoId))
        .map(($) => ({
          videoId: $.videoId,
          title: $.title,
          url: $.url,
          metadata: p[$.videoId] || {
            title: $.title,
            artist: $.uploader,
            album: N.data.title,
            filename: $.title,
          },
        }));
      try {
        const $ = await w.mutateAsync({ url: t, format: s, videos: U });
        A($);
        for (const Z of $.results)
          Z.status === "completed" &&
            (await iS({
              videoId: Z.videoId,
              youtubeUrl: `https://www.youtube.com/watch?v=${Z.videoId}`,
              title: Z.title,
              artist: p[Z.videoId]?.artist || "",
              album: p[Z.videoId]?.album || "",
              thumbnail: `https://img.youtube.com/vi/${Z.videoId}/mqdefault.jpg`,
              format: s,
              duration: 0,
              fileSize: Z.fileSize || 0,
              filename: Z.filename,
              downloadUrl: Z.downloadUrl,
              status: "completed",
              type: "audio",
            }));
        Vn.success("Playlist Processed", {
          description: `${$.completed} of ${$.totalProcessed} files ready`,
        });
        for (const Z of $.results)
          if (Z.status === "completed" && Z.downloadUrl) {
            await new Promise((re) => setTimeout(re, 300));
            const W = document.createElement("a");
            ((W.href = Z.downloadUrl), (W.download = Z.filename), W.click());
          }
      } catch ($) {
        Vn.error("Error", {
          description: $.message || "Failed to process playlist",
        });
      } finally {
        v(!1);
      }
    },
    L = () => {
      (a(""), A(null), f(new Set()), g({}));
    },
    q = u.size,
    j = N.data?.videos.length || 0;
  return m.jsxs("div", {
    "code-path": "src/pages/Playlist.tsx:206:5",
    className: "space-y-6 max-w-3xl mx-auto",
    children: [
      m.jsxs("div", {
        "code-path": "src/pages/Playlist.tsx:208:7",
        className: "text-center space-y-2",
        children: [
          m.jsxs("div", {
            "code-path": "src/pages/Playlist.tsx:209:9",
            className:
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2",
            children: [
              m.jsx(kc, {
                "code-path": "src/pages/Playlist.tsx:210:11",
                className: "w-3 h-3",
              }),
              "Batch Processing",
            ],
          }),
          m.jsx("h1", {
            "code-path": "src/pages/Playlist.tsx:213:9",
            className: "text-2xl font-bold",
            children: "Playlist Converter",
          }),
          m.jsx("p", {
            "code-path": "src/pages/Playlist.tsx:214:9",
            className: "text-sm text-muted-foreground",
            children:
              "Convert entire playlists with individual metadata editing",
          }),
        ],
      }),
      m.jsx("div", {
        "code-path": "src/pages/Playlist.tsx:220:7",
        className: "glass-card rounded-xl p-4 space-y-4",
        children: m.jsxs("div", {
          "code-path": "src/pages/Playlist.tsx:221:9",
          className: "flex gap-2",
          children: [
            m.jsxs("div", {
              "code-path": "src/pages/Playlist.tsx:222:11",
              className: "flex-1 relative",
              children: [
                m.jsx(Qn, {
                  "code-path": "src/pages/Playlist.tsx:223:13",
                  placeholder: "https://www.youtube.com/playlist?list=...",
                  value: t,
                  onChange: (R) => a(R.target.value),
                  onKeyDown: (R) => R.key === "Enter" && E(),
                  className:
                    "pr-10 bg-background/50 border-border/60 focus:border-primary/50",
                }),
                t &&
                  m.jsx("button", {
                    "code-path": "src/pages/Playlist.tsx:231:15",
                    onClick: () => a(""),
                    className:
                      "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    children: m.jsx(rb, {
                      "code-path": "src/pages/Playlist.tsx:235:17",
                      className: "w-4 h-4",
                    }),
                  }),
              ],
            }),
            m.jsxs(et, {
              "code-path": "src/pages/Playlist.tsx:239:11",
              onClick: E,
              disabled: !t.trim() || N.isFetching,
              className:
                "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 gap-2",
              children: [
                N.isFetching
                  ? m.jsx(Lr, {
                      "code-path": "src/pages/Playlist.tsx:245:15",
                      className: "w-4 h-4 animate-spin",
                    })
                  : m.jsx(sb, {
                      "code-path": "src/pages/Playlist.tsx:247:15",
                      className: "w-4 h-4",
                    }),
                "Fetch",
              ],
            }),
          ],
        }),
      }),
      N.data &&
        !S &&
        m.jsxs("div", {
          "code-path": "src/pages/Playlist.tsx:256:9",
          className: "animate-fade-in-up space-y-4",
          children: [
            m.jsxs("div", {
              "code-path": "src/pages/Playlist.tsx:258:11",
              className: "glass-card rounded-xl p-4 space-y-3",
              children: [
                m.jsx("div", {
                  "code-path": "src/pages/Playlist.tsx:259:13",
                  className: "flex items-start justify-between gap-4",
                  children: m.jsxs("div", {
                    "code-path": "src/pages/Playlist.tsx:260:15",
                    className: "flex-1 min-w-0",
                    children: [
                      m.jsx("h2", {
                        "code-path": "src/pages/Playlist.tsx:261:17",
                        className:
                          "font-semibold text-sm leading-snug line-clamp-2",
                        children: N.data.title,
                      }),
                      m.jsxs("p", {
                        "code-path": "src/pages/Playlist.tsx:264:17",
                        className:
                          "text-xs text-muted-foreground mt-1 flex items-center gap-2",
                        children: [
                          m.jsx(gl, {
                            "code-path": "src/pages/Playlist.tsx:265:19",
                            className: "w-3 h-3",
                          }),
                          N.data.uploader,
                          m.jsx("span", {
                            "code-path": "src/pages/Playlist.tsx:267:19",
                            className: "text-border",
                            children: "|",
                          }),
                          m.jsx(ml, {
                            "code-path": "src/pages/Playlist.tsx:268:19",
                            className: "w-3 h-3",
                          }),
                          j,
                          " videos",
                        ],
                      }),
                    ],
                  }),
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/Playlist.tsx:275:13",
                  className:
                    "flex flex-col sm:flex-row gap-3 pt-2 border-t border-border/50",
                  children: [
                    m.jsx("div", {
                      "code-path": "src/pages/Playlist.tsx:276:15",
                      className: "flex-1",
                      children: m.jsxs(mh, {
                        "code-path": "src/pages/Playlist.tsx:277:17",
                        value: s,
                        onValueChange: o,
                        children: [
                          m.jsxs(vh, {
                            "code-path": "src/pages/Playlist.tsx:278:19",
                            className: "bg-background/50 h-9 text-xs",
                            children: [
                              m.jsx(Pc, {
                                "code-path": "src/pages/Playlist.tsx:279:21",
                                className: "w-3.5 h-3.5 mr-2 text-primary",
                              }),
                              m.jsx(gh, {
                                "code-path": "src/pages/Playlist.tsx:280:21",
                              }),
                            ],
                          }),
                          m.jsx(yh, {
                            "code-path": "src/pages/Playlist.tsx:282:19",
                            children: uM.map((R) =>
                              m.jsx(
                                xh,
                                {
                                  "code-path": "src/pages/Playlist.tsx:284:23",
                                  value: R.value,
                                  children: m.jsxs("div", {
                                    "code-path":
                                      "src/pages/Playlist.tsx:285:25",
                                    className:
                                      "flex items-center justify-between w-full gap-4",
                                    children: [
                                      m.jsx("span", {
                                        "code-path":
                                          "src/pages/Playlist.tsx:286:27",
                                        children: R.label,
                                      }),
                                      m.jsx("span", {
                                        "code-path":
                                          "src/pages/Playlist.tsx:287:27",
                                        className:
                                          "text-xs text-muted-foreground",
                                        children: R.desc,
                                      }),
                                    ],
                                  }),
                                },
                                R.value,
                              ),
                            ),
                          }),
                        ],
                      }),
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/Playlist.tsx:296:15",
                      className: "flex items-center gap-2",
                      children: m.jsx(et, {
                        "code-path": "src/pages/Playlist.tsx:297:17",
                        variant: "outline",
                        size: "sm",
                        onClick: D,
                        className: "text-xs h-9",
                        children: q === j ? "Deselect All" : "Select All",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            m.jsx("div", {
              "code-path": "src/pages/Playlist.tsx:310:11",
              className: "glass-card rounded-xl overflow-hidden",
              children: m.jsx(bh, {
                "code-path": "src/pages/Playlist.tsx:311:13",
                className: "max-h-[500px]",
                children: m.jsx("div", {
                  "code-path": "src/pages/Playlist.tsx:312:15",
                  className: "divide-y divide-border/50",
                  children: N.data.videos.map((R) => {
                    const U = u.has(R.videoId),
                      $ = i === R.videoId,
                      Z = p[R.videoId];
                    return m.jsxs(
                      "div",
                      {
                        "code-path": "src/pages/Playlist.tsx:319:21",
                        className: `transition-colors ${U ? "bg-primary/5" : ""}`,
                        children: [
                          m.jsxs("div", {
                            "code-path": "src/pages/Playlist.tsx:325:23",
                            className:
                              "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30",
                            onClick: () => O(R.videoId),
                            children: [
                              m.jsx(F4, {
                                "code-path": "src/pages/Playlist.tsx:329:25",
                                checked: U,
                                onCheckedChange: () => O(R.videoId),
                                onClick: (W) => W.stopPropagation(),
                                className: "border-border/60",
                              }),
                              m.jsx("img", {
                                "code-path": "src/pages/Playlist.tsx:335:25",
                                src: R.thumbnail,
                                alt: "",
                                className:
                                  "w-12 h-9 rounded object-cover bg-muted flex-shrink-0",
                                onError: (W) => {
                                  W.target.src = `https://img.youtube.com/vi/${R.videoId}/default.jpg`;
                                },
                              }),
                              m.jsxs("div", {
                                "code-path": "src/pages/Playlist.tsx:343:25",
                                className: "flex-1 min-w-0",
                                children: [
                                  m.jsx("p", {
                                    "code-path":
                                      "src/pages/Playlist.tsx:344:27",
                                    className:
                                      "text-xs font-medium leading-snug line-clamp-2",
                                    children: R.title,
                                  }),
                                  m.jsxs("p", {
                                    "code-path":
                                      "src/pages/Playlist.tsx:347:27",
                                    className:
                                      "text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1",
                                    children: [
                                      m.jsx(gl, {
                                        "code-path":
                                          "src/pages/Playlist.tsx:348:29",
                                        className: "w-2.5 h-2.5",
                                      }),
                                      R.uploader,
                                    ],
                                  }),
                                ],
                              }),
                              m.jsx("button", {
                                "code-path": "src/pages/Playlist.tsx:352:25",
                                onClick: (W) => {
                                  (W.stopPropagation(),
                                    c($ ? null : R.videoId));
                                },
                                className:
                                  "p-1 rounded hover:bg-muted text-muted-foreground",
                                children: $
                                  ? m.jsx(eb, {
                                      "code-path":
                                        "src/pages/Playlist.tsx:360:29",
                                      className: "w-4 h-4",
                                    })
                                  : m.jsx(Uh, {
                                      "code-path":
                                        "src/pages/Playlist.tsx:362:29",
                                      className: "w-4 h-4",
                                    }),
                              }),
                            ],
                          }),
                          $ &&
                            Z &&
                            m.jsxs("div", {
                              "code-path": "src/pages/Playlist.tsx:369:25",
                              className:
                                "px-3 pb-3 pl-12 space-y-2 animate-fade-in-up",
                              children: [
                                m.jsxs("div", {
                                  "code-path": "src/pages/Playlist.tsx:370:27",
                                  className: "grid grid-cols-2 gap-2",
                                  children: [
                                    m.jsxs("div", {
                                      "code-path":
                                        "src/pages/Playlist.tsx:371:29",
                                      children: [
                                        m.jsx(Bn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:372:31",
                                          className:
                                            "text-[10px] text-muted-foreground",
                                          children: "Title",
                                        }),
                                        m.jsx(Qn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:375:31",
                                          value: Z.title,
                                          onChange: (W) =>
                                            P(R.videoId, {
                                              title: W.target.value,
                                            }),
                                          className:
                                            "h-8 text-xs bg-background/50 border-border/60",
                                        }),
                                      ],
                                    }),
                                    m.jsxs("div", {
                                      "code-path":
                                        "src/pages/Playlist.tsx:385:29",
                                      children: [
                                        m.jsx(Bn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:386:31",
                                          className:
                                            "text-[10px] text-muted-foreground",
                                          children: "Artist",
                                        }),
                                        m.jsx(Qn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:389:31",
                                          value: Z.artist,
                                          onChange: (W) =>
                                            P(R.videoId, {
                                              artist: W.target.value,
                                            }),
                                          className:
                                            "h-8 text-xs bg-background/50 border-border/60",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsxs("div", {
                                  "code-path": "src/pages/Playlist.tsx:400:27",
                                  className: "grid grid-cols-2 gap-2",
                                  children: [
                                    m.jsxs("div", {
                                      "code-path":
                                        "src/pages/Playlist.tsx:401:29",
                                      children: [
                                        m.jsx(Bn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:402:31",
                                          className:
                                            "text-[10px] text-muted-foreground",
                                          children: "Album",
                                        }),
                                        m.jsx(Qn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:405:31",
                                          value: Z.album,
                                          onChange: (W) =>
                                            P(R.videoId, {
                                              album: W.target.value,
                                            }),
                                          className:
                                            "h-8 text-xs bg-background/50 border-border/60",
                                        }),
                                      ],
                                    }),
                                    m.jsxs("div", {
                                      "code-path":
                                        "src/pages/Playlist.tsx:415:29",
                                      children: [
                                        m.jsx(Bn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:416:31",
                                          className:
                                            "text-[10px] text-muted-foreground",
                                          children: "Filename",
                                        }),
                                        m.jsx(Qn, {
                                          "code-path":
                                            "src/pages/Playlist.tsx:419:31",
                                          value: Z.filename,
                                          onChange: (W) =>
                                            P(R.videoId, {
                                              filename: W.target.value,
                                            }),
                                          className:
                                            "h-8 text-xs bg-background/50 border-border/60",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      },
                      R.videoId,
                    );
                  }),
                }),
              }),
            }),
            m.jsx(et, {
              "code-path": "src/pages/Playlist.tsx:440:11",
              onClick: G,
              disabled: x || q === 0,
              className:
                "w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20 h-12 text-sm font-semibold gap-2",
              children: x
                ? m.jsxs(m.Fragment, {
                    children: [
                      m.jsx(Lr, {
                        "code-path": "src/pages/Playlist.tsx:447:17",
                        className: "w-4 h-4 animate-spin",
                      }),
                      "Processing ",
                      q,
                      " videos...",
                    ],
                  })
                : m.jsxs(m.Fragment, {
                    children: [
                      m.jsx(yO, {
                        "code-path": "src/pages/Playlist.tsx:452:17",
                        className: "w-4 h-4",
                      }),
                      "Download ",
                      q,
                      " Audio",
                      q !== 1 ? "s" : "",
                    ],
                  }),
            }),
          ],
        }),
      N.error &&
        m.jsxs("div", {
          "code-path": "src/pages/Playlist.tsx:462:9",
          className:
            "glass-card rounded-xl p-6 text-center space-y-3 border-destructive/30",
          children: [
            m.jsx(Jf, {
              "code-path": "src/pages/Playlist.tsx:463:11",
              className: "w-10 h-10 text-destructive mx-auto",
            }),
            m.jsx("h3", {
              "code-path": "src/pages/Playlist.tsx:464:11",
              className: "font-semibold text-sm",
              children: "Failed to fetch playlist",
            }),
            m.jsx("p", {
              "code-path": "src/pages/Playlist.tsx:465:11",
              className: "text-xs text-muted-foreground",
              children: N.error.message || "Please check the URL and try again",
            }),
            m.jsx(et, {
              "code-path": "src/pages/Playlist.tsx:468:11",
              variant: "outline",
              size: "sm",
              onClick: E,
              children: "Try Again",
            }),
          ],
        }),
      S &&
        m.jsxs("div", {
          "code-path": "src/pages/Playlist.tsx:476:9",
          className:
            "animate-fade-in-up glass-card rounded-xl p-6 space-y-4 border-primary/20 glow-orange-sm",
          children: [
            m.jsxs("div", {
              "code-path": "src/pages/Playlist.tsx:477:11",
              className: "text-center space-y-2",
              children: [
                m.jsx(Gs, {
                  "code-path": "src/pages/Playlist.tsx:478:13",
                  className: "w-12 h-12 text-emerald-500 mx-auto",
                }),
                m.jsx("h3", {
                  "code-path": "src/pages/Playlist.tsx:479:13",
                  className: "font-semibold text-base",
                  children: "Playlist Processed!",
                }),
                m.jsxs("p", {
                  "code-path": "src/pages/Playlist.tsx:480:13",
                  className: "text-sm text-muted-foreground",
                  children: [
                    S.completed,
                    " completed, ",
                    S.failed,
                    " failed out of",
                    " ",
                    S.totalProcessed,
                  ],
                }),
              ],
            }),
            m.jsx(bh, {
              "code-path": "src/pages/Playlist.tsx:486:11",
              className: "max-h-[300px]",
              children: m.jsx("div", {
                "code-path": "src/pages/Playlist.tsx:487:13",
                className: "space-y-2",
                children: S.results.map((R) =>
                  m.jsxs(
                    "div",
                    {
                      "code-path": "src/pages/Playlist.tsx:489:17",
                      className: `flex items-center gap-3 p-2.5 rounded-lg ${R.status === "completed" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-destructive/10 border border-destructive/20"}`,
                      children: [
                        R.status === "completed"
                          ? m.jsx(Gs, {
                              "code-path": "src/pages/Playlist.tsx:498:21",
                              className:
                                "w-4 h-4 text-emerald-500 flex-shrink-0",
                            })
                          : m.jsx(Jf, {
                              "code-path": "src/pages/Playlist.tsx:500:21",
                              className:
                                "w-4 h-4 text-destructive flex-shrink-0",
                            }),
                        m.jsx("span", {
                          "code-path": "src/pages/Playlist.tsx:502:19",
                          className: "text-xs flex-1 line-clamp-1",
                          children: R.title,
                        }),
                        R.filename &&
                          m.jsx("span", {
                            "code-path": "src/pages/Playlist.tsx:504:21",
                            className: "text-[10px] text-muted-foreground",
                            children: R.filename,
                          }),
                      ],
                    },
                    R.videoId,
                  ),
                ),
              }),
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Playlist.tsx:513:11",
              className: "flex gap-2 justify-center",
              children: [
                m.jsxs(et, {
                  "code-path": "src/pages/Playlist.tsx:514:13",
                  onClick: () => {
                    for (const R of S.results)
                      R.status === "completed" &&
                        R.downloadUrl &&
                        setTimeout(() => {
                          const U = document.createElement("a");
                          ((U.href = R.downloadUrl),
                            (U.download = R.filename),
                            U.click());
                        }, 200);
                  },
                  className:
                    "bg-gradient-to-r from-orange-500 to-amber-600 gap-2",
                  children: [
                    m.jsx(qs, {
                      "code-path": "src/pages/Playlist.tsx:529:15",
                      className: "w-4 h-4",
                    }),
                    "Download All",
                  ],
                }),
                m.jsx(et, {
                  "code-path": "src/pages/Playlist.tsx:532:13",
                  variant: "outline",
                  onClick: L,
                  children: "Process Another",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
var fM = Symbol("radix.slottable");
function hM(t) {
  const a = ({ children: s }) => m.jsx(m.Fragment, { children: s });
  return ((a.displayName = `${t}.Slottable`), (a.__radixId = fM), a);
}
var DS = "AlertDialog",
  [pM] = Gr(DS, [kb]),
  Ra = kb(),
  zS = (t) => {
    const { __scopeAlertDialog: a, ...s } = t,
      o = Ra(a);
    return m.jsx(Wb, { ...o, ...s, modal: !0 });
  };
zS.displayName = DS;
var mM = "AlertDialogTrigger",
  PS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      i = Ra(s);
    return m.jsx(Jb, { ...i, ...o, ref: a });
  });
PS.displayName = mM;
var gM = "AlertDialogPortal",
  kS = (t) => {
    const { __scopeAlertDialog: a, ...s } = t,
      o = Ra(a);
    return m.jsx(e1, { ...o, ...s });
  };
kS.displayName = gM;
var vM = "AlertDialogOverlay",
  HS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      i = Ra(s);
    return m.jsx(t1, { ...i, ...o, ref: a });
  });
HS.displayName = vM;
var Ys = "AlertDialogContent",
  [yM, xM] = pM(Ys),
  bM = hM("AlertDialogContent"),
  LS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, children: o, ...i } = t,
      c = Ra(s),
      u = y.useRef(null),
      f = qe(a, u),
      p = y.useRef(null);
    return m.jsx(Q3, {
      contentName: Ys,
      titleName: US,
      docsSlug: "alert-dialog",
      children: m.jsx(yM, {
        scope: s,
        cancelRef: p,
        children: m.jsxs(n1, {
          role: "alertdialog",
          ...c,
          ...i,
          ref: f,
          onOpenAutoFocus: ze(i.onOpenAutoFocus, (g) => {
            (g.preventDefault(), p.current?.focus({ preventScroll: !0 }));
          }),
          onPointerDownOutside: (g) => g.preventDefault(),
          onInteractOutside: (g) => g.preventDefault(),
          children: [m.jsx(bM, { children: o }), m.jsx(wM, { contentRef: u })],
        }),
      }),
    });
  });
LS.displayName = Ys;
var US = "AlertDialogTitle",
  BS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      i = Ra(s);
    return m.jsx($3, { ...i, ...o, ref: a });
  });
BS.displayName = US;
var qS = "AlertDialogDescription",
  QS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      i = Ra(s);
    return m.jsx(G3, { ...i, ...o, ref: a });
  });
QS.displayName = qS;
var SM = "AlertDialogAction",
  VS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      i = Ra(s);
    return m.jsx(Wh, { ...i, ...o, ref: a });
  });
VS.displayName = SM;
var IS = "AlertDialogCancel",
  YS = y.forwardRef((t, a) => {
    const { __scopeAlertDialog: s, ...o } = t,
      { cancelRef: i } = xM(IS, s),
      c = Ra(s),
      u = qe(a, i);
    return m.jsx(Wh, { ...c, ...o, ref: u });
  });
YS.displayName = IS;
var wM = ({ contentRef: t }) => {
    const a = `\`${Ys}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${Ys}\` by passing a \`${qS}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${Ys}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
    return (
      y.useEffect(() => {
        document.getElementById(t.current?.getAttribute("aria-describedby")) ||
          console.warn(a);
      }, [a, t]),
      null
    );
  },
  EM = zS,
  CM = PS,
  AM = kS,
  NM = HS,
  RM = LS,
  OM = VS,
  _M = YS,
  jM = BS,
  TM = QS;
function MM({ ...t }) {
  return m.jsx(EM, {
    "code-path": "src/components/ui/alert-dialog.tsx:10:10",
    "data-slot": "alert-dialog",
    ...t,
  });
}
function DM({ ...t }) {
  return m.jsx(CM, {
    "code-path": "src/components/ui/alert-dialog.tsx:17:5",
    "data-slot": "alert-dialog-trigger",
    ...t,
  });
}
function zM({ ...t }) {
  return m.jsx(AM, {
    "code-path": "src/components/ui/alert-dialog.tsx:25:5",
    "data-slot": "alert-dialog-portal",
    ...t,
  });
}
function PM({ className: t, ...a }) {
  return m.jsx(NM, {
    "code-path": "src/components/ui/alert-dialog.tsx:34:5",
    "data-slot": "alert-dialog-overlay",
    className: Fe(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      t,
    ),
    ...a,
  });
}
function kM({ className: t, ...a }) {
  return m.jsxs(zM, {
    "code-path": "src/components/ui/alert-dialog.tsx:50:5",
    children: [
      m.jsx(PM, { "code-path": "src/components/ui/alert-dialog.tsx:51:7" }),
      m.jsx(RM, {
        "code-path": "src/components/ui/alert-dialog.tsx:52:7",
        "data-slot": "alert-dialog-content",
        className: Fe(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          t,
        ),
        ...a,
      }),
    ],
  });
}
function HM({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/alert-dialog.tsx:69:5",
    "data-slot": "alert-dialog-header",
    className: Fe("flex flex-col gap-2 text-center sm:text-left", t),
    ...a,
  });
}
function LM({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/alert-dialog.tsx:82:5",
    "data-slot": "alert-dialog-footer",
    className: Fe("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", t),
    ...a,
  });
}
function UM({ className: t, ...a }) {
  return m.jsx(jM, {
    "code-path": "src/components/ui/alert-dialog.tsx:98:5",
    "data-slot": "alert-dialog-title",
    className: Fe("text-lg font-semibold", t),
    ...a,
  });
}
function BM({ className: t, ...a }) {
  return m.jsx(TM, {
    "code-path": "src/components/ui/alert-dialog.tsx:111:5",
    "data-slot": "alert-dialog-description",
    className: Fe("text-muted-foreground text-sm", t),
    ...a,
  });
}
function qM({ className: t, ...a }) {
  return m.jsx(OM, {
    "code-path": "src/components/ui/alert-dialog.tsx:124:5",
    className: Fe(Ih(), t),
    ...a,
  });
}
function QM({ className: t, ...a }) {
  return m.jsx(_M, {
    "code-path": "src/components/ui/alert-dialog.tsx:136:5",
    className: Fe(Ih({ variant: "outline" }), t),
    ...a,
  });
}
function VM() {
  const [t, a] = y.useState([]),
    [s, o] = y.useState({
      total: 0,
      completed: 0,
      failed: 0,
      processing: 0,
      totalSize: 0,
    }),
    [i, c] = y.useState(!0),
    [u, f] = y.useState("all"),
    p = y.useCallback(async () => {
      try {
        const E = await cS();
        a(E);
        const O = await dS();
        o(O);
      } catch (E) {
        console.error("Failed to load history:", E);
      } finally {
        c(!1);
      }
    }, []);
  y.useEffect(() => {
    p();
  }, [p]);
  const g = async (E) => {
      try {
        (await B4(E),
          await p(),
          Vn.success("Deleted", { description: "Item removed from history" }));
      } catch {
        Vn.error("Error", { description: "Failed to delete item" });
      }
    },
    x = async () => {
      try {
        (await uS(),
          await p(),
          Vn.success("Cleared", {
            description: "All history has been cleared",
          }));
      } catch {
        Vn.error("Error", { description: "Failed to clear history" });
      }
    },
    v = (E) => {
      if (E.downloadUrl) {
        const O = document.createElement("a");
        ((O.href = E.downloadUrl), (O.download = E.filename), O.click());
      }
    },
    S = (E) =>
      new Date(E).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    A = (E) => {
      if (!E) return "—";
      const O = E / (1024 * 1024);
      return O > 1024 ? `${(O / 1024).toFixed(1)} GB` : `${O.toFixed(1)} MB`;
    },
    N = t.filter((E) => (u === "all" ? !0 : E.type === u)),
    w = (E) => {
      switch (E) {
        case "completed":
          return m.jsx(Gs, {
            "code-path": "src/pages/History.tsx:126:16",
            className: "w-3.5 h-3.5 text-emerald-500",
          });
        case "failed":
          return m.jsx(ZR, {
            "code-path": "src/pages/History.tsx:128:16",
            className: "w-3.5 h-3.5 text-destructive",
          });
        case "processing":
          return m.jsx(Lr, {
            "code-path": "src/pages/History.tsx:130:16",
            className: "w-3.5 h-3.5 text-primary animate-spin",
          });
        default:
          return m.jsx(Bh, {
            "code-path": "src/pages/History.tsx:132:16",
            className: "w-3.5 h-3.5 text-muted-foreground",
          });
      }
    };
  return i
    ? m.jsx("div", {
        "code-path": "src/pages/History.tsx:138:7",
        className: "flex items-center justify-center py-20",
        children: m.jsx(Lr, {
          "code-path": "src/pages/History.tsx:139:9",
          className: "w-6 h-6 animate-spin text-primary",
        }),
      })
    : m.jsxs("div", {
        "code-path": "src/pages/History.tsx:145:5",
        className: "space-y-6 max-w-3xl mx-auto",
        children: [
          m.jsxs("div", {
            "code-path": "src/pages/History.tsx:147:7",
            className: "text-center space-y-2",
            children: [
              m.jsxs("div", {
                "code-path": "src/pages/History.tsx:148:9",
                className:
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2",
                children: [
                  m.jsx(kc, {
                    "code-path": "src/pages/History.tsx:149:11",
                    className: "w-3 h-3",
                  }),
                  "Local Storage",
                ],
              }),
              m.jsx("h1", {
                "code-path": "src/pages/History.tsx:152:9",
                className: "text-2xl font-bold",
                children: "Download History",
              }),
              m.jsx("p", {
                "code-path": "src/pages/History.tsx:153:9",
                className: "text-sm text-muted-foreground",
                children: "Your downloads are stored locally on your device",
              }),
            ],
          }),
          t.length > 0 &&
            m.jsxs("div", {
              "code-path": "src/pages/History.tsx:160:9",
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
              children: [
                m.jsxs("div", {
                  "code-path": "src/pages/History.tsx:161:11",
                  className: "glass-card rounded-xl p-4 text-center",
                  children: [
                    m.jsx(QR, {
                      "code-path": "src/pages/History.tsx:162:13",
                      className: "w-5 h-5 text-primary mx-auto mb-1.5",
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:163:13",
                      className: "text-xl font-bold",
                      children: s.total,
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:164:13",
                      className: "text-[10px] text-muted-foreground",
                      children: "Total",
                    }),
                  ],
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/History.tsx:166:11",
                  className: "glass-card rounded-xl p-4 text-center",
                  children: [
                    m.jsx(Gs, {
                      "code-path": "src/pages/History.tsx:167:13",
                      className: "w-5 h-5 text-emerald-500 mx-auto mb-1.5",
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:168:13",
                      className: "text-xl font-bold text-emerald-500",
                      children: s.completed,
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:171:13",
                      className: "text-[10px] text-muted-foreground",
                      children: "Completed",
                    }),
                  ],
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/History.tsx:173:11",
                  className: "glass-card rounded-xl p-4 text-center",
                  children: [
                    m.jsx(Ur, {
                      "code-path": "src/pages/History.tsx:174:13",
                      className: "w-5 h-5 text-primary mx-auto mb-1.5",
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:175:13",
                      className: "text-xl font-bold",
                      children: t.filter((E) => E.type === "audio").length,
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:178:13",
                      className: "text-[10px] text-muted-foreground",
                      children: "Audio",
                    }),
                  ],
                }),
                m.jsxs("div", {
                  "code-path": "src/pages/History.tsx:180:11",
                  className: "glass-card rounded-xl p-4 text-center",
                  children: [
                    m.jsx(Pc, {
                      "code-path": "src/pages/History.tsx:181:13",
                      className: "w-5 h-5 text-primary mx-auto mb-1.5",
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:182:13",
                      className: "text-xl font-bold",
                      children: A(s.totalSize),
                    }),
                    m.jsx("div", {
                      "code-path": "src/pages/History.tsx:185:13",
                      className: "text-[10px] text-muted-foreground",
                      children: "Total Size",
                    }),
                  ],
                }),
              ],
            }),
          t.length > 0 &&
            m.jsxs("div", {
              "code-path": "src/pages/History.tsx:192:9",
              className: "flex items-center justify-between",
              children: [
                m.jsx("div", {
                  "code-path": "src/pages/History.tsx:193:11",
                  className: "flex gap-1 bg-muted rounded-lg p-1",
                  children: ["all", "audio", "video"].map((E) =>
                    m.jsx(
                      "button",
                      {
                        "code-path": "src/pages/History.tsx:195:15",
                        onClick: () => f(E),
                        className: `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${u === E ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                        children:
                          E === "all"
                            ? "All"
                            : E === "audio"
                              ? "Audio"
                              : "Video",
                      },
                      E,
                    ),
                  ),
                }),
                m.jsxs(MM, {
                  "code-path": "src/pages/History.tsx:212:11",
                  children: [
                    m.jsx(DM, {
                      "code-path": "src/pages/History.tsx:213:13",
                      asChild: !0,
                      children: m.jsxs(et, {
                        "code-path": "src/pages/History.tsx:214:15",
                        variant: "ghost",
                        size: "sm",
                        className:
                          "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 text-xs",
                        children: [
                          m.jsx(th, {
                            "code-path": "src/pages/History.tsx:219:17",
                            className: "w-3.5 h-3.5",
                          }),
                          "Clear All",
                        ],
                      }),
                    }),
                    m.jsxs(kM, {
                      "code-path": "src/pages/History.tsx:223:13",
                      className: "bg-card border-border",
                      children: [
                        m.jsxs(HM, {
                          "code-path": "src/pages/History.tsx:224:15",
                          children: [
                            m.jsx(UM, {
                              "code-path": "src/pages/History.tsx:225:17",
                              className: "text-sm",
                              children: "Clear Download History",
                            }),
                            m.jsx(BM, {
                              "code-path": "src/pages/History.tsx:228:17",
                              className: "text-xs",
                              children:
                                "This will permanently remove all download history from your device. This action cannot be undone.",
                            }),
                          ],
                        }),
                        m.jsxs(LM, {
                          "code-path": "src/pages/History.tsx:233:15",
                          children: [
                            m.jsx(QM, {
                              "code-path": "src/pages/History.tsx:234:17",
                              className: "text-xs",
                              children: "Cancel",
                            }),
                            m.jsx(qM, {
                              "code-path": "src/pages/History.tsx:235:17",
                              onClick: x,
                              className:
                                "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs",
                              children: "Clear All",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          N.length > 0
            ? m.jsx("div", {
                "code-path": "src/pages/History.tsx:249:9",
                className: "glass-card rounded-xl overflow-hidden",
                children: m.jsx(bh, {
                  "code-path": "src/pages/History.tsx:250:11",
                  className: "max-h-[600px]",
                  children: m.jsx("div", {
                    "code-path": "src/pages/History.tsx:251:13",
                    className: "divide-y divide-border/50",
                    children: N.map((E) =>
                      m.jsxs(
                        "div",
                        {
                          "code-path": "src/pages/History.tsx:253:17",
                          className:
                            "flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors group",
                          children: [
                            m.jsxs("div", {
                              "code-path": "src/pages/History.tsx:258:19",
                              className: "relative flex-shrink-0",
                              children: [
                                E.thumbnail
                                  ? m.jsx("img", {
                                      "code-path":
                                        "src/pages/History.tsx:260:23",
                                      src: E.thumbnail,
                                      alt: "",
                                      className:
                                        "w-14 h-10 rounded object-cover bg-muted",
                                      onError: (O) => {
                                        O.target.style.display = "none";
                                      },
                                    })
                                  : m.jsx("div", {
                                      "code-path":
                                        "src/pages/History.tsx:269:23",
                                      className:
                                        "w-14 h-10 rounded bg-muted flex items-center justify-center",
                                      children:
                                        E.type === "audio"
                                          ? m.jsx(Ur, {
                                              "code-path":
                                                "src/pages/History.tsx:271:27",
                                              className:
                                                "w-4 h-4 text-muted-foreground",
                                            })
                                          : m.jsx(Hc, {
                                              "code-path":
                                                "src/pages/History.tsx:273:27",
                                              className:
                                                "w-4 h-4 text-muted-foreground",
                                            }),
                                    }),
                                m.jsx("div", {
                                  "code-path": "src/pages/History.tsx:277:21",
                                  className: "absolute -bottom-1 -right-1",
                                  children: w(E.status),
                                }),
                              ],
                            }),
                            m.jsxs("div", {
                              "code-path": "src/pages/History.tsx:283:19",
                              className: "flex-1 min-w-0",
                              children: [
                                m.jsx("p", {
                                  "code-path": "src/pages/History.tsx:284:21",
                                  className:
                                    "text-xs font-medium leading-snug line-clamp-1",
                                  children: E.title || "Untitled",
                                }),
                                m.jsxs("div", {
                                  "code-path": "src/pages/History.tsx:287:21",
                                  className: "flex items-center gap-2 mt-0.5",
                                  children: [
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/History.tsx:288:23",
                                      className:
                                        "text-[10px] text-muted-foreground",
                                      children: E.artist,
                                    }),
                                    E.album &&
                                      m.jsxs(m.Fragment, {
                                        children: [
                                          m.jsx("span", {
                                            "code-path":
                                              "src/pages/History.tsx:293:27",
                                            className:
                                              "text-[10px] text-border",
                                            children: "|",
                                          }),
                                          m.jsx("span", {
                                            "code-path":
                                              "src/pages/History.tsx:294:27",
                                            className:
                                              "text-[10px] text-muted-foreground",
                                            children: E.album,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                                m.jsxs("div", {
                                  "code-path": "src/pages/History.tsx:300:21",
                                  className: "flex items-center gap-2 mt-0.5",
                                  children: [
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/History.tsx:301:23",
                                      className:
                                        "text-[10px] text-primary font-medium uppercase",
                                      children: E.format,
                                    }),
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/History.tsx:304:23",
                                      className:
                                        "text-[10px] text-muted-foreground",
                                      children: A(E.fileSize),
                                    }),
                                    m.jsx("span", {
                                      "code-path":
                                        "src/pages/History.tsx:307:23",
                                      className:
                                        "text-[10px] text-muted-foreground",
                                      children: S(E.createdAt),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            m.jsxs("div", {
                              "code-path": "src/pages/History.tsx:314:19",
                              className:
                                "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                              children: [
                                E.downloadUrl &&
                                  E.status === "completed" &&
                                  m.jsx(et, {
                                    "code-path": "src/pages/History.tsx:316:23",
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: () => v(E),
                                    children: m.jsx(qs, {
                                      "code-path":
                                        "src/pages/History.tsx:322:25",
                                      className: "w-3.5 h-3.5",
                                    }),
                                  }),
                                m.jsx(et, {
                                  "code-path": "src/pages/History.tsx:325:21",
                                  variant: "ghost",
                                  size: "icon",
                                  className:
                                    "h-7 w-7 text-destructive hover:text-destructive",
                                  onClick: () => E.id && g(E.id),
                                  children: m.jsx(th, {
                                    "code-path": "src/pages/History.tsx:331:23",
                                    className: "w-3.5 h-3.5",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        },
                        E.id,
                      ),
                    ),
                  }),
                }),
              })
            : m.jsxs("div", {
                "code-path": "src/pages/History.tsx:340:9",
                className: "glass-card rounded-xl p-12 text-center space-y-4",
                children: [
                  m.jsx(tb, {
                    "code-path": "src/pages/History.tsx:341:11",
                    className: "w-12 h-12 text-muted-foreground/50 mx-auto",
                  }),
                  m.jsxs("div", {
                    "code-path": "src/pages/History.tsx:342:11",
                    children: [
                      m.jsx("h3", {
                        "code-path": "src/pages/History.tsx:343:13",
                        className: "font-semibold text-sm mb-1",
                        children: "No Downloads Yet",
                      }),
                      m.jsx("p", {
                        "code-path": "src/pages/History.tsx:344:13",
                        className:
                          "text-xs text-muted-foreground max-w-xs mx-auto",
                        children:
                          "Your download history will appear here. Start by extracting audio from a YouTube video.",
                      }),
                    ],
                  }),
                  m.jsx(et, {
                    "code-path": "src/pages/History.tsx:349:11",
                    variant: "outline",
                    size: "sm",
                    asChild: !0,
                    children: m.jsx("a", {
                      "code-path": "src/pages/History.tsx:350:13",
                      href: "/extract",
                      children: "Start Extracting",
                    }),
                  }),
                ],
              }),
        ],
      });
}
function IM() {
  const [t, a] = y.useState({ used: 0, total: 0, percent: 0 }),
    [s, o] = y.useState({ total: 0, completed: 0, failed: 0, totalSize: 0 });
  y.useEffect(() => {
    (i(), c());
  }, []);
  const i = async () => {
      try {
        if ("storage" in navigator && "estimate" in navigator.storage) {
          const g = await navigator.storage.estimate(),
            x = g.usage || 0,
            v = g.quota || 0;
          a({
            used: x,
            total: v,
            percent: v > 0 ? Math.round((x / v) * 100) : 0,
          });
        }
      } catch (g) {
        console.warn("Storage estimation not available:", g);
      }
    },
    c = async () => {
      try {
        const g = await dS();
        o(g);
      } catch (g) {
        console.error("Failed to load stats:", g);
      }
    },
    u = async () => {
      try {
        (await uS(),
          await c(),
          Vn.success("History Cleared", {
            description: "All download history has been removed",
          }));
      } catch {
        Vn.error("Error", { description: "Failed to clear history" });
      }
    },
    f = (g) => {
      if (g === 0) return "0 B";
      const x = 1024,
        v = ["B", "KB", "MB", "GB"],
        S = Math.floor(Math.log(g) / Math.log(x));
      return `${parseFloat((g / Math.pow(x, S)).toFixed(1))} ${v[S]}`;
    },
    p = (g) => {
      if (!g) return "0 MB";
      const x = g / (1024 * 1024);
      return x > 1024 ? `${(x / 1024).toFixed(1)} GB` : `${x.toFixed(1)} MB`;
    };
  return m.jsxs("div", {
    "code-path": "src/pages/Settings.tsx:91:5",
    className: "space-y-6 max-w-2xl mx-auto",
    children: [
      m.jsxs("div", {
        "code-path": "src/pages/Settings.tsx:93:7",
        className: "text-center space-y-2",
        children: [
          m.jsxs("div", {
            "code-path": "src/pages/Settings.tsx:94:9",
            className:
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2",
            children: [
              m.jsx(kc, {
                "code-path": "src/pages/Settings.tsx:95:11",
                className: "w-3 h-3",
              }),
              "Preferences",
            ],
          }),
          m.jsx("h1", {
            "code-path": "src/pages/Settings.tsx:98:9",
            className: "text-2xl font-bold",
            children: "Settings",
          }),
          m.jsx("p", {
            "code-path": "src/pages/Settings.tsx:99:9",
            className: "text-sm text-muted-foreground",
            children: "Manage your app preferences and storage",
          }),
        ],
      }),
      m.jsxs("div", {
        "code-path": "src/pages/Settings.tsx:105:7",
        className: "glass-card rounded-xl p-5 space-y-4",
        children: [
          m.jsxs("div", {
            "code-path": "src/pages/Settings.tsx:106:9",
            className: "flex items-center gap-4",
            children: [
              m.jsx("div", {
                "code-path": "src/pages/Settings.tsx:107:11",
                className:
                  "w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20",
                children: m.jsx(ll, {
                  "code-path": "src/pages/Settings.tsx:108:13",
                  className: "w-6 h-6 text-white",
                }),
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:110:11",
                children: [
                  m.jsx("h2", {
                    "code-path": "src/pages/Settings.tsx:111:13",
                    className: "font-semibold text-sm",
                    children: "YT Audio Extractor",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Settings.tsx:112:13",
                    className: "text-xs text-muted-foreground",
                    children: "Version 1.0.0 · Free & Open Source",
                  }),
                ],
              }),
            ],
          }),
          m.jsxs("div", {
            "code-path": "src/pages/Settings.tsx:118:9",
            className: "grid grid-cols-3 gap-3 pt-2 border-t border-border/50",
            children: [
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:119:11",
                className: "text-center p-2 rounded-lg bg-muted/50",
                children: [
                  m.jsx(qh, {
                    "code-path": "src/pages/Settings.tsx:120:13",
                    className: "w-4 h-4 text-primary mx-auto mb-1",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Settings.tsx:121:13",
                    className: "text-[10px] text-muted-foreground",
                    children: "Fast",
                  }),
                ],
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:123:11",
                className: "text-center p-2 rounded-lg bg-muted/50",
                children: [
                  m.jsx(eh, {
                    "code-path": "src/pages/Settings.tsx:124:13",
                    className: "w-4 h-4 text-emerald-500 mx-auto mb-1",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Settings.tsx:125:13",
                    className: "text-[10px] text-muted-foreground",
                    children: "Private",
                  }),
                ],
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:127:11",
                className: "text-center p-2 rounded-lg bg-muted/50",
                children: [
                  m.jsx(Yy, {
                    "code-path": "src/pages/Settings.tsx:128:13",
                    className: "w-4 h-4 text-blue-500 mx-auto mb-1",
                  }),
                  m.jsx("p", {
                    "code-path": "src/pages/Settings.tsx:129:13",
                    className: "text-[10px] text-muted-foreground",
                    children: "Local Storage",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      m.jsxs("div", {
        "code-path": "src/pages/Settings.tsx:135:7",
        className: "glass-card rounded-xl overflow-hidden",
        children: [
          m.jsx("div", {
            "code-path": "src/pages/Settings.tsx:136:9",
            className: "p-4 border-b border-border/50",
            children: m.jsxs("h3", {
              "code-path": "src/pages/Settings.tsx:137:11",
              className: "font-semibold text-sm flex items-center gap-2",
              children: [
                m.jsx(Yy, {
                  "code-path": "src/pages/Settings.tsx:138:13",
                  className: "w-4 h-4 text-primary",
                }),
                "Storage",
              ],
            }),
          }),
          m.jsxs("div", {
            "code-path": "src/pages/Settings.tsx:142:9",
            className: "p-4 space-y-4",
            children: [
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:144:11",
                children: [
                  m.jsxs("div", {
                    "code-path": "src/pages/Settings.tsx:145:13",
                    className: "flex justify-between text-xs mb-2",
                    children: [
                      m.jsx("span", {
                        "code-path": "src/pages/Settings.tsx:146:15",
                        className: "text-muted-foreground",
                        children: "Browser Storage Used",
                      }),
                      m.jsxs("span", {
                        "code-path": "src/pages/Settings.tsx:147:15",
                        className: "font-medium",
                        children: [f(t.used), " / ", f(t.total)],
                      }),
                    ],
                  }),
                  m.jsx(lS, {
                    "code-path": "src/pages/Settings.tsx:151:13",
                    value: t.percent,
                    className: "h-2",
                  }),
                ],
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:155:11",
                className: "grid grid-cols-3 gap-3 pt-2",
                children: [
                  m.jsxs("div", {
                    "code-path": "src/pages/Settings.tsx:156:13",
                    className: "text-center p-2 rounded-lg bg-muted/50",
                    children: [
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:157:15",
                        className: "text-lg font-bold",
                        children: s.total,
                      }),
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:158:15",
                        className: "text-[10px] text-muted-foreground",
                        children: "Downloads",
                      }),
                    ],
                  }),
                  m.jsxs("div", {
                    "code-path": "src/pages/Settings.tsx:160:13",
                    className: "text-center p-2 rounded-lg bg-muted/50",
                    children: [
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:161:15",
                        className: "text-lg font-bold text-emerald-500",
                        children: s.completed,
                      }),
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:164:15",
                        className: "text-[10px] text-muted-foreground",
                        children: "Completed",
                      }),
                    ],
                  }),
                  m.jsxs("div", {
                    "code-path": "src/pages/Settings.tsx:166:13",
                    className: "text-center p-2 rounded-lg bg-muted/50",
                    children: [
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:167:15",
                        className: "text-lg font-bold",
                        children: p(s.totalSize),
                      }),
                      m.jsx("p", {
                        "code-path": "src/pages/Settings.tsx:168:15",
                        className: "text-[10px] text-muted-foreground",
                        children: "Total Size",
                      }),
                    ],
                  }),
                ],
              }),
              m.jsx("div", {
                "code-path": "src/pages/Settings.tsx:173:11",
                className: "pt-2 border-t border-border/50",
                children: m.jsxs(et, {
                  "code-path": "src/pages/Settings.tsx:174:13",
                  variant: "outline",
                  size: "sm",
                  className:
                    "w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 gap-2",
                  onClick: u,
                  disabled: s.total === 0,
                  children: [
                    m.jsx(th, {
                      "code-path": "src/pages/Settings.tsx:181:15",
                      className: "w-3.5 h-3.5",
                    }),
                    "Clear Download History",
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      m.jsxs("div", {
        "code-path": "src/pages/Settings.tsx:189:7",
        className: "glass-card rounded-xl overflow-hidden",
        children: [
          m.jsx("div", {
            "code-path": "src/pages/Settings.tsx:190:9",
            className: "p-4 border-b border-border/50",
            children: m.jsxs("h3", {
              "code-path": "src/pages/Settings.tsx:191:11",
              className: "font-semibold text-sm flex items-center gap-2",
              children: [
                m.jsx(nb, {
                  "code-path": "src/pages/Settings.tsx:192:13",
                  className: "w-4 h-4 text-primary",
                }),
                "About",
              ],
            }),
          }),
          m.jsxs("div", {
            "code-path": "src/pages/Settings.tsx:196:9",
            className: "divide-y divide-border/50",
            children: [
              m.jsx("div", {
                "code-path": "src/pages/Settings.tsx:197:11",
                className: "p-4",
                children: m.jsx("p", {
                  "code-path": "src/pages/Settings.tsx:198:13",
                  className: "text-xs text-muted-foreground leading-relaxed",
                  children:
                    "YT Audio Extractor is a free tool for extracting audio from YouTube videos and playlists. All processing happens on our secure servers, and your download history is stored locally on your device using IndexedDB — we never track or store your personal data.",
                }),
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:205:11",
                className: "p-4",
                children: [
                  m.jsx("h4", {
                    "code-path": "src/pages/Settings.tsx:206:13",
                    className: "text-xs font-medium mb-2",
                    children: "Supported Formats",
                  }),
                  m.jsx("div", {
                    "code-path": "src/pages/Settings.tsx:207:13",
                    className: "flex flex-wrap gap-1.5",
                    children: [
                      "MP3",
                      "WAV",
                      "M4A",
                      "OGG",
                      "WebM Audio",
                      "MP4 Video",
                    ].map((g) =>
                      m.jsx(
                        "span",
                        {
                          "code-path": "src/pages/Settings.tsx:210:19",
                          className:
                            "px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium",
                          children: g,
                        },
                        g,
                      ),
                    ),
                  }),
                ],
              }),
              m.jsxs("div", {
                "code-path": "src/pages/Settings.tsx:220:11",
                className: "p-4",
                children: [
                  m.jsx("h4", {
                    "code-path": "src/pages/Settings.tsx:221:13",
                    className: "text-xs font-medium mb-2",
                    children: "Features",
                  }),
                  m.jsx("ul", {
                    "code-path": "src/pages/Settings.tsx:222:13",
                    className: "space-y-1.5",
                    children: [
                      "Extract audio from single YouTube videos",
                      "Batch process entire playlists",
                      "Edit metadata (title, artist, album, filename) before download",
                      "Download full video files in multiple qualities",
                      "Local download history with IndexedDB",
                      "Mobile-first responsive design",
                    ].map((g) =>
                      m.jsxs(
                        "li",
                        {
                          "code-path": "src/pages/Settings.tsx:231:17",
                          className:
                            "text-xs text-muted-foreground flex items-start gap-2",
                          children: [
                            m.jsx($R, {
                              "code-path": "src/pages/Settings.tsx:235:19",
                              className:
                                "w-3 h-3 text-primary mt-0.5 flex-shrink-0",
                            }),
                            g,
                          ],
                        },
                        g,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      m.jsx("div", {
        "code-path": "src/pages/Settings.tsx:245:7",
        className: "glass-card rounded-xl p-4 border-primary/10",
        children: m.jsxs("div", {
          "code-path": "src/pages/Settings.tsx:246:9",
          className: "flex items-start gap-3",
          children: [
            m.jsx(eh, {
              "code-path": "src/pages/Settings.tsx:247:11",
              className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5",
            }),
            m.jsxs("div", {
              "code-path": "src/pages/Settings.tsx:248:11",
              children: [
                m.jsx("h3", {
                  "code-path": "src/pages/Settings.tsx:249:13",
                  className: "font-medium text-sm mb-1",
                  children: "Privacy First",
                }),
                m.jsx("p", {
                  "code-path": "src/pages/Settings.tsx:250:13",
                  className: "text-xs text-muted-foreground leading-relaxed",
                  children:
                    "Your download history is stored exclusively in your browser's IndexedDB. We do not collect, track, or share any of your personal data. All audio extraction processing happens on our secure servers, and downloaded files are temporarily stored only for delivery.",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function $S({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/card.tsx:7:5",
    "data-slot": "card",
    className: Fe(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      t,
    ),
    ...a,
  });
}
function GS({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/card.tsx:20:5",
    "data-slot": "card-header",
    className: Fe(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      t,
    ),
    ...a,
  });
}
function FS({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/card.tsx:33:5",
    "data-slot": "card-title",
    className: Fe("leading-none font-semibold", t),
    ...a,
  });
}
function XS({ className: t, ...a }) {
  return m.jsx("div", {
    "code-path": "src/components/ui/card.tsx:66:5",
    "data-slot": "card-content",
    className: Fe("px-6", t),
    ...a,
  });
}
function YM() {
  const t = "https://auth.kimi.com",
    a = "19f1363f-5622-8a7e-8000-0000fc8f24a1",
    s = `${window.location.origin}/api/oauth/callback`,
    o = btoa(s),
    i = new URL(`${t}/api/oauth/authorize`);
  return (
    i.searchParams.set("client_id", a),
    i.searchParams.set("redirect_uri", s),
    i.searchParams.set("response_type", "code"),
    i.searchParams.set("scope", "profile"),
    i.searchParams.set("state", o),
    i.toString()
  );
}
function $M() {
  return m.jsx("div", {
    "code-path": "src/pages/Login.tsx:22:5",
    className: "min-h-screen flex items-center justify-center",
    children: m.jsxs($S, {
      "code-path": "src/pages/Login.tsx:23:7",
      className: "w-full max-w-sm",
      children: [
        m.jsx(GS, {
          "code-path": "src/pages/Login.tsx:24:9",
          className: "text-center",
          children: m.jsx(FS, {
            "code-path": "src/pages/Login.tsx:25:11",
            children: "Welcome",
          }),
        }),
        m.jsx(XS, {
          "code-path": "src/pages/Login.tsx:27:9",
          children: m.jsx(et, {
            "code-path": "src/pages/Login.tsx:28:11",
            className: "w-full",
            size: "lg",
            onClick: () => {
              window.location.href = YM();
            },
            children: "Sign in with Kimi",
          }),
        }),
      ],
    }),
  });
}
function GM() {
  return m.jsx("div", {
    "code-path": "src/pages/NotFound.tsx:7:5",
    className: "min-h-screen flex items-center justify-center",
    children: m.jsxs($S, {
      "code-path": "src/pages/NotFound.tsx:8:7",
      className: "w-full max-w-sm text-center",
      children: [
        m.jsx(GS, {
          "code-path": "src/pages/NotFound.tsx:9:9",
          children: m.jsx(FS, {
            "code-path": "src/pages/NotFound.tsx:10:11",
            className: "text-4xl font-bold",
            children: "404",
          }),
        }),
        m.jsxs(XS, {
          "code-path": "src/pages/NotFound.tsx:12:9",
          className: "space-y-4",
          children: [
            m.jsx("p", {
              "code-path": "src/pages/NotFound.tsx:13:11",
              className: "text-muted-foreground",
              children: "Page not found",
            }),
            m.jsx(et, {
              "code-path": "src/pages/NotFound.tsx:14:11",
              asChild: !0,
              className: "w-full",
              children: m.jsx(tn, {
                "code-path": "src/pages/NotFound.tsx:15:13",
                to: "/",
                children: "Back to Home",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function FM() {
  return m.jsx(J3, {
    "code-path": "src/App.tsx:13:5",
    children: m.jsx(mC, { "code-path": "src/App.tsx:14:7" }),
  });
}
function XM() {
  return m.jsxs(vC, {
    "code-path": "src/App.tsx:21:5",
    children: [
      m.jsx(wa, {
        "code-path": "src/App.tsx:22:7",
        path: "/login",
        element: m.jsx($M, { "code-path": "src/App.tsx:22:37" }),
      }),
      m.jsxs(wa, {
        "code-path": "src/App.tsx:23:7",
        element: m.jsx(FM, { "code-path": "src/App.tsx:23:23" }),
        children: [
          m.jsx(wa, {
            "code-path": "src/App.tsx:24:9",
            path: "/",
            element: m.jsx(nT, { "code-path": "src/App.tsx:24:34" }),
          }),
          m.jsx(wa, {
            "code-path": "src/App.tsx:25:9",
            path: "/extract",
            element: m.jsx(V4, { "code-path": "src/App.tsx:25:41" }),
          }),
          m.jsx(wa, {
            "code-path": "src/App.tsx:26:9",
            path: "/playlist",
            element: m.jsx(dM, { "code-path": "src/App.tsx:26:42" }),
          }),
          m.jsx(wa, {
            "code-path": "src/App.tsx:27:9",
            path: "/history",
            element: m.jsx(VM, { "code-path": "src/App.tsx:27:41" }),
          }),
          m.jsx(wa, {
            "code-path": "src/App.tsx:28:9",
            path: "/settings",
            element: m.jsx(IM, { "code-path": "src/App.tsx:28:42" }),
          }),
          m.jsx(wa, {
            "code-path": "src/App.tsx:29:9",
            path: "*",
            element: m.jsx(GM, { "code-path": "src/App.tsx:29:34" }),
          }),
        ],
      }),
    ],
  });
}
gE.createRoot(document.getElementById("root")).render(
  m.jsx(y.StrictMode, {
    "code-path": "src/main.tsx:10:3",
    children: m.jsx(qC, {
      "code-path": "src/main.tsx:11:5",
      children: m.jsxs(PR, {
        "code-path": "src/main.tsx:12:7",
        children: [
          m.jsx(XM, { "code-path": "src/main.tsx:13:9" }),
          m.jsx(d_, {
            "code-path": "src/main.tsx:14:9",
            position: "top-center",
            richColors: !0,
          }),
        ],
      }),
    }),
  }),
);
