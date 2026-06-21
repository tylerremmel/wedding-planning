(function () {
  var e = Object.create,
    t = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    r = Object.getOwnPropertyNames,
    i = Object.getPrototypeOf,
    a = Object.prototype.hasOwnProperty,
    o = (e, t) => () => (
      t || (e((t = { exports: {} }).exports, t), (e = null)),
      t.exports
    ),
    s = (e, i, o, s) => {
      if ((i && typeof i == `object`) || typeof i == `function`)
        for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
          ((d = c[l]),
            !a.call(e, d) &&
              d !== o &&
              t(e, d, {
                get: ((e) => i[e]).bind(null, d),
                enumerable: !(s = n(i, d)) || s.enumerable,
              }));
      return e;
    },
    c = (n, r, a) => (
      (a = n == null ? {} : e(i(n))),
      s(
        r || !n || !n.__esModule
          ? t(a, `default`, { value: n, enumerable: !0 })
          : a,
        n,
      )
    ),
    l = o((e) => {
      var t = Symbol.for(`react.element`),
        n = Symbol.for(`react.portal`),
        r = Symbol.for(`react.fragment`),
        i = Symbol.for(`react.strict_mode`),
        a = Symbol.for(`react.profiler`),
        o = Symbol.for(`react.provider`),
        s = Symbol.for(`react.context`),
        c = Symbol.for(`react.forward_ref`),
        l = Symbol.for(`react.suspense`),
        u = Symbol.for(`react.memo`),
        d = Symbol.for(`react.lazy`),
        f = Symbol.iterator;
      function p(e) {
        return typeof e != `object` || !e
          ? null
          : ((e = (f && e[f]) || e[`@@iterator`]),
            typeof e == `function` ? e : null);
      }
      var m = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        h = Object.assign,
        g = {};
      function _(e, t, n) {
        ((this.props = e),
          (this.context = t),
          (this.refs = g),
          (this.updater = n || m));
      }
      ((_.prototype.isReactComponent = {}),
        (_.prototype.setState = function (e, t) {
          if (typeof e != `object` && typeof e != `function` && e != null)
            throw Error(
              `setState(...): takes an object of state variables to update or a function which returns an object of state variables.`,
            );
          this.updater.enqueueSetState(this, e, t, `setState`);
        }),
        (_.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
        }));
      function v() {}
      v.prototype = _.prototype;
      function y(e, t, n) {
        ((this.props = e),
          (this.context = t),
          (this.refs = g),
          (this.updater = n || m));
      }
      var b = (y.prototype = new v());
      ((b.constructor = y), h(b, _.prototype), (b.isPureReactComponent = !0));
      var x = Array.isArray,
        S = Object.prototype.hasOwnProperty,
        C = { current: null },
        w = { key: !0, ref: !0, __self: !0, __source: !0 };
      function T(e, n, r) {
        var i,
          a = {},
          o = null,
          s = null;
        if (n != null)
          for (i in (n.ref !== void 0 && (s = n.ref),
          n.key !== void 0 && (o = `` + n.key),
          n))
            S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
        var c = arguments.length - 2;
        if (c === 1) a.children = r;
        else if (1 < c) {
          for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
          a.children = l;
        }
        if (e && e.defaultProps)
          for (i in ((c = e.defaultProps), c)) a[i] === void 0 && (a[i] = c[i]);
        return {
          $$typeof: t,
          type: e,
          key: o,
          ref: s,
          props: a,
          _owner: C.current,
        };
      }
      function E(e, n) {
        return {
          $$typeof: t,
          type: e.type,
          key: n,
          ref: e.ref,
          props: e.props,
          _owner: e._owner,
        };
      }
      function D(e) {
        return typeof e == `object` && !!e && e.$$typeof === t;
      }
      function O(e) {
        var t = { "=": `=0`, ":": `=2` };
        return (
          `$` +
          e.replace(/[=:]/g, function (e) {
            return t[e];
          })
        );
      }
      var k = /\/+/g;
      function A(e, t) {
        return typeof e == `object` && e && e.key != null
          ? O(`` + e.key)
          : t.toString(36);
      }
      function ee(e, r, i, a, o) {
        var s = typeof e;
        (s === `undefined` || s === `boolean`) && (e = null);
        var c = !1;
        if (e === null) c = !0;
        else
          switch (s) {
            case `string`:
            case `number`:
              c = !0;
              break;
            case `object`:
              switch (e.$$typeof) {
                case t:
                case n:
                  c = !0;
              }
          }
        if (c)
          return (
            (c = e),
            (o = o(c)),
            (e = a === `` ? `.` + A(c, 0) : a),
            x(o)
              ? ((i = ``),
                e != null && (i = e.replace(k, `$&/`) + `/`),
                ee(o, r, i, ``, function (e) {
                  return e;
                }))
              : o != null &&
                (D(o) &&
                  (o = E(
                    o,
                    i +
                      (!o.key || (c && c.key === o.key)
                        ? ``
                        : (`` + o.key).replace(k, `$&/`) + `/`) +
                      e,
                  )),
                r.push(o)),
            1
          );
        if (((c = 0), (a = a === `` ? `.` : a + `:`), x(e)))
          for (var l = 0; l < e.length; l++) {
            s = e[l];
            var u = a + A(s, l);
            c += ee(s, r, i, u, o);
          }
        else if (((u = p(e)), typeof u == `function`))
          for (e = u.call(e), l = 0; !(s = e.next()).done; )
            ((s = s.value), (u = a + A(s, l++)), (c += ee(s, r, i, u, o)));
        else if (s === `object`)
          throw (
            (r = String(e)),
            Error(
              `Objects are not valid as a React child (found: ` +
                (r === `[object Object]`
                  ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                  : r) +
                `). If you meant to render a collection of children, use an array instead.`,
            )
          );
        return c;
      }
      function j(e, t, n) {
        if (e == null) return e;
        var r = [],
          i = 0;
        return (
          ee(e, r, ``, ``, function (e) {
            return t.call(n, e, i++);
          }),
          r
        );
      }
      function te(e) {
        if (e._status === -1) {
          var t = e._result;
          ((t = t()),
            t.then(
              function (t) {
                (e._status === 0 || e._status === -1) &&
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (e._status === 0 || e._status === -1) &&
                  ((e._status = 2), (e._result = t));
              },
            ),
            e._status === -1 && ((e._status = 0), (e._result = t)));
        }
        if (e._status === 1) return e._result.default;
        throw e._result;
      }
      var M = { current: null },
        N = { transition: null },
        ne = {
          ReactCurrentDispatcher: M,
          ReactCurrentBatchConfig: N,
          ReactCurrentOwner: C,
        };
      function re() {
        throw Error(`act(...) is not supported in production builds of React.`);
      }
      ((e.Children = {
        map: j,
        forEach: function (e, t, n) {
          j(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            j(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            j(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!D(e))
            throw Error(
              `React.Children.only expected to receive a single React element child.`,
            );
          return e;
        },
      }),
        (e.Component = _),
        (e.Fragment = r),
        (e.Profiler = a),
        (e.PureComponent = y),
        (e.StrictMode = i),
        (e.Suspense = l),
        (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne),
        (e.act = re),
        (e.cloneElement = function (e, n, r) {
          if (e == null)
            throw Error(
              `React.cloneElement(...): The argument must be a React element, but you passed ` +
                e +
                `.`,
            );
          var i = h({}, e.props),
            a = e.key,
            o = e.ref,
            s = e._owner;
          if (n != null) {
            if (
              (n.ref !== void 0 && ((o = n.ref), (s = C.current)),
              n.key !== void 0 && (a = `` + n.key),
              e.type && e.type.defaultProps)
            )
              var c = e.type.defaultProps;
            for (l in n)
              S.call(n, l) &&
                !w.hasOwnProperty(l) &&
                (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
          }
          var l = arguments.length - 2;
          if (l === 1) i.children = r;
          else if (1 < l) {
            c = Array(l);
            for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
            i.children = c;
          }
          return {
            $$typeof: t,
            type: e.type,
            key: a,
            ref: o,
            props: i,
            _owner: s,
          };
        }),
        (e.createContext = function (e) {
          return (
            (e = {
              $$typeof: s,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null,
            }),
            (e.Provider = { $$typeof: o, _context: e }),
            (e.Consumer = e)
          );
        }),
        (e.createElement = T),
        (e.createFactory = function (e) {
          var t = T.bind(null, e);
          return ((t.type = e), t);
        }),
        (e.createRef = function () {
          return { current: null };
        }),
        (e.forwardRef = function (e) {
          return { $$typeof: c, render: e };
        }),
        (e.isValidElement = D),
        (e.lazy = function (e) {
          return {
            $$typeof: d,
            _payload: { _status: -1, _result: e },
            _init: te,
          };
        }),
        (e.memo = function (e, t) {
          return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
        }),
        (e.startTransition = function (e) {
          var t = N.transition;
          N.transition = {};
          try {
            e();
          } finally {
            N.transition = t;
          }
        }),
        (e.unstable_act = re),
        (e.useCallback = function (e, t) {
          return M.current.useCallback(e, t);
        }),
        (e.useContext = function (e) {
          return M.current.useContext(e);
        }),
        (e.useDebugValue = function () {}),
        (e.useDeferredValue = function (e) {
          return M.current.useDeferredValue(e);
        }),
        (e.useEffect = function (e, t) {
          return M.current.useEffect(e, t);
        }),
        (e.useId = function () {
          return M.current.useId();
        }),
        (e.useImperativeHandle = function (e, t, n) {
          return M.current.useImperativeHandle(e, t, n);
        }),
        (e.useInsertionEffect = function (e, t) {
          return M.current.useInsertionEffect(e, t);
        }),
        (e.useLayoutEffect = function (e, t) {
          return M.current.useLayoutEffect(e, t);
        }),
        (e.useMemo = function (e, t) {
          return M.current.useMemo(e, t);
        }),
        (e.useReducer = function (e, t, n) {
          return M.current.useReducer(e, t, n);
        }),
        (e.useRef = function (e) {
          return M.current.useRef(e);
        }),
        (e.useState = function (e) {
          return M.current.useState(e);
        }),
        (e.useSyncExternalStore = function (e, t, n) {
          return M.current.useSyncExternalStore(e, t, n);
        }),
        (e.useTransition = function () {
          return M.current.useTransition();
        }),
        (e.version = `18.3.1`));
    }),
    u = o((e, t) => {
      t.exports = l();
    }),
    d = o((e) => {
      function t(e, t) {
        var n = e.length;
        e.push(t);
        a: for (; 0 < n; ) {
          var r = (n - 1) >>> 1,
            a = e[r];
          if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
          else break a;
        }
      }
      function n(e) {
        return e.length === 0 ? null : e[0];
      }
      function r(e) {
        if (e.length === 0) return null;
        var t = e[0],
          n = e.pop();
        if (n !== t) {
          e[0] = n;
          a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
            var s = 2 * (r + 1) - 1,
              c = e[s],
              l = s + 1,
              u = e[l];
            if (0 > i(c, n))
              l < a && 0 > i(u, c)
                ? ((e[r] = u), (e[l] = n), (r = l))
                : ((e[r] = c), (e[s] = n), (r = s));
            else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
            else break a;
          }
        }
        return t;
      }
      function i(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return n === 0 ? e.id - t.id : n;
      }
      if (
        typeof performance == `object` &&
        typeof performance.now == `function`
      ) {
        var a = performance;
        e.unstable_now = function () {
          return a.now();
        };
      } else {
        var o = Date,
          s = o.now();
        e.unstable_now = function () {
          return o.now() - s;
        };
      }
      var c = [],
        l = [],
        u = 1,
        d = null,
        f = 3,
        p = !1,
        m = !1,
        h = !1,
        g = typeof setTimeout == `function` ? setTimeout : null,
        _ = typeof clearTimeout == `function` ? clearTimeout : null,
        v = typeof setImmediate < `u` ? setImmediate : null;
      typeof navigator < `u` &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function y(e) {
        for (var i = n(l); i !== null; ) {
          if (i.callback === null) r(l);
          else if (i.startTime <= e)
            (r(l), (i.sortIndex = i.expirationTime), t(c, i));
          else break;
          i = n(l);
        }
      }
      function b(e) {
        if (((h = !1), y(e), !m))
          if (n(c) !== null) ((m = !0), j(x));
          else {
            var t = n(l);
            t !== null && te(b, t.startTime - e);
          }
      }
      function x(t, i) {
        ((m = !1), h && ((h = !1), _(w), (w = -1)), (p = !0));
        var a = f;
        try {
          for (
            y(i), d = n(c);
            d !== null && (!(d.expirationTime > i) || (t && !D()));
          ) {
            var o = d.callback;
            if (typeof o == `function`) {
              ((d.callback = null), (f = d.priorityLevel));
              var s = o(d.expirationTime <= i);
              ((i = e.unstable_now()),
                typeof s == `function` ? (d.callback = s) : d === n(c) && r(c),
                y(i));
            } else r(c);
            d = n(c);
          }
          if (d !== null) var u = !0;
          else {
            var g = n(l);
            (g !== null && te(b, g.startTime - i), (u = !1));
          }
          return u;
        } finally {
          ((d = null), (f = a), (p = !1));
        }
      }
      var S = !1,
        C = null,
        w = -1,
        T = 5,
        E = -1;
      function D() {
        return !(e.unstable_now() - E < T);
      }
      function O() {
        if (C !== null) {
          var t = e.unstable_now();
          E = t;
          var n = !0;
          try {
            n = C(!0, t);
          } finally {
            n ? k() : ((S = !1), (C = null));
          }
        } else S = !1;
      }
      var k;
      if (typeof v == `function`)
        k = function () {
          v(O);
        };
      else if (typeof MessageChannel < `u`) {
        var A = new MessageChannel(),
          ee = A.port2;
        ((A.port1.onmessage = O),
          (k = function () {
            ee.postMessage(null);
          }));
      } else
        k = function () {
          g(O, 0);
        };
      function j(e) {
        ((C = e), S || ((S = !0), k()));
      }
      function te(t, n) {
        w = g(function () {
          t(e.unstable_now());
        }, n);
      }
      ((e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (e) {
          e.callback = null;
        }),
        (e.unstable_continueExecution = function () {
          m || p || ((m = !0), j(x));
        }),
        (e.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
              )
            : (T = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
          return f;
        }),
        (e.unstable_getFirstCallbackNode = function () {
          return n(c);
        }),
        (e.unstable_next = function (e) {
          switch (f) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = f;
          }
          var n = f;
          f = t;
          try {
            return e();
          } finally {
            f = n;
          }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = f;
          f = e;
          try {
            return t();
          } finally {
            f = n;
          }
        }),
        (e.unstable_scheduleCallback = function (r, i, a) {
          var o = e.unstable_now();
          switch (
            (typeof a == `object` && a
              ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
              : (a = o),
            r)
          ) {
            case 1:
              var s = -1;
              break;
            case 2:
              s = 250;
              break;
            case 5:
              s = 1073741823;
              break;
            case 4:
              s = 1e4;
              break;
            default:
              s = 5e3;
          }
          return (
            (s = a + s),
            (r = {
              id: u++,
              callback: i,
              priorityLevel: r,
              startTime: a,
              expirationTime: s,
              sortIndex: -1,
            }),
            a > o
              ? ((r.sortIndex = a),
                t(l, r),
                n(c) === null &&
                  r === n(l) &&
                  (h ? (_(w), (w = -1)) : (h = !0), te(b, a - o)))
              : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), j(x))),
            r
          );
        }),
        (e.unstable_shouldYield = D),
        (e.unstable_wrapCallback = function (e) {
          var t = f;
          return function () {
            var n = f;
            f = t;
            try {
              return e.apply(this, arguments);
            } finally {
              f = n;
            }
          };
        }));
    }),
    f = o((e, t) => {
      t.exports = d();
    }),
    p = o((e) => {
      var t = u(),
        n = f();
      function r(e) {
        for (
          var t = `https://reactjs.org/docs/error-decoder.html?invariant=` + e,
            n = 1;
          n < arguments.length;
          n++
        )
          t += `&args[]=` + encodeURIComponent(arguments[n]);
        return (
          `Minified React error #` +
          e +
          `; visit ` +
          t +
          ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        );
      }
      var i = new Set(),
        a = {};
      function o(e, t) {
        (s(e, t), s(e + `Capture`, t));
      }
      function s(e, t) {
        for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
      }
      var c = !(
          typeof window > `u` ||
          window.document === void 0 ||
          window.document.createElement === void 0
        ),
        l = Object.prototype.hasOwnProperty,
        d =
          /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        p = {},
        m = {};
      function h(e) {
        return l.call(m, e)
          ? !0
          : l.call(p, e)
            ? !1
            : d.test(e)
              ? (m[e] = !0)
              : ((p[e] = !0), !1);
      }
      function g(e, t, n, r) {
        if (n !== null && n.type === 0) return !1;
        switch (typeof t) {
          case `function`:
          case `symbol`:
            return !0;
          case `boolean`:
            return r
              ? !1
              : n === null
                ? ((e = e.toLowerCase().slice(0, 5)),
                  e !== `data-` && e !== `aria-`)
                : !n.acceptsBooleans;
          default:
            return !1;
        }
      }
      function _(e, t, n, r) {
        if (t == null || g(e, t, n, r)) return !0;
        if (r) return !1;
        if (n !== null)
          switch (n.type) {
            case 3:
              return !t;
            case 4:
              return !1 === t;
            case 5:
              return isNaN(t);
            case 6:
              return isNaN(t) || 1 > t;
          }
        return !1;
      }
      function v(e, t, n, r, i, a, o) {
        ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
          (this.attributeName = r),
          (this.attributeNamespace = i),
          (this.mustUseProperty = n),
          (this.propertyName = e),
          (this.type = t),
          (this.sanitizeURL = a),
          (this.removeEmptyString = o));
      }
      var y = {};
      (`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`
        .split(` `)
        .forEach(function (e) {
          y[e] = new v(e, 0, !1, e, null, !1, !1);
        }),
        [
          [`acceptCharset`, `accept-charset`],
          [`className`, `class`],
          [`htmlFor`, `for`],
          [`httpEquiv`, `http-equiv`],
        ].forEach(function (e) {
          var t = e[0];
          y[t] = new v(t, 1, !1, e[1], null, !1, !1);
        }),
        [`contentEditable`, `draggable`, `spellCheck`, `value`].forEach(
          function (e) {
            y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
          },
        ),
        [
          `autoReverse`,
          `externalResourcesRequired`,
          `focusable`,
          `preserveAlpha`,
        ].forEach(function (e) {
          y[e] = new v(e, 2, !1, e, null, !1, !1);
        }),
        `allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`
          .split(` `)
          .forEach(function (e) {
            y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
          }),
        [`checked`, `multiple`, `muted`, `selected`].forEach(function (e) {
          y[e] = new v(e, 3, !0, e, null, !1, !1);
        }),
        [`capture`, `download`].forEach(function (e) {
          y[e] = new v(e, 4, !1, e, null, !1, !1);
        }),
        [`cols`, `rows`, `size`, `span`].forEach(function (e) {
          y[e] = new v(e, 6, !1, e, null, !1, !1);
        }),
        [`rowSpan`, `start`].forEach(function (e) {
          y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
        }));
      var b = /[\-:]([a-z])/g;
      function x(e) {
        return e[1].toUpperCase();
      }
      (`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`
        .split(` `)
        .forEach(function (e) {
          var t = e.replace(b, x);
          y[t] = new v(t, 1, !1, e, null, !1, !1);
        }),
        `xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`
          .split(` `)
          .forEach(function (e) {
            var t = e.replace(b, x);
            y[t] = new v(t, 1, !1, e, `http://www.w3.org/1999/xlink`, !1, !1);
          }),
        [`xml:base`, `xml:lang`, `xml:space`].forEach(function (e) {
          var t = e.replace(b, x);
          y[t] = new v(
            t,
            1,
            !1,
            e,
            `http://www.w3.org/XML/1998/namespace`,
            !1,
            !1,
          );
        }),
        [`tabIndex`, `crossOrigin`].forEach(function (e) {
          y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
        }),
        (y.xlinkHref = new v(
          `xlinkHref`,
          1,
          !1,
          `xlink:href`,
          `http://www.w3.org/1999/xlink`,
          !0,
          !1,
        )),
        [`src`, `href`, `action`, `formAction`].forEach(function (e) {
          y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
        }));
      function S(e, t, n, r) {
        var i = y.hasOwnProperty(t) ? y[t] : null;
        (i === null
          ? r ||
            !(2 < t.length) ||
            (t[0] !== `o` && t[0] !== `O`) ||
            (t[1] !== `n` && t[1] !== `N`)
          : i.type !== 0) &&
          (_(t, n, i, r) && (n = null),
          r || i === null
            ? h(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, `` + n))
            : i.mustUseProperty
              ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : ``) : n)
              : ((t = i.attributeName),
                (r = i.attributeNamespace),
                n === null
                  ? e.removeAttribute(t)
                  : ((i = i.type),
                    (n = i === 3 || (i === 4 && !0 === n) ? `` : `` + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
      }
      var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
        w = Symbol.for(`react.element`),
        T = Symbol.for(`react.portal`),
        E = Symbol.for(`react.fragment`),
        D = Symbol.for(`react.strict_mode`),
        O = Symbol.for(`react.profiler`),
        k = Symbol.for(`react.provider`),
        A = Symbol.for(`react.context`),
        ee = Symbol.for(`react.forward_ref`),
        j = Symbol.for(`react.suspense`),
        te = Symbol.for(`react.suspense_list`),
        M = Symbol.for(`react.memo`),
        N = Symbol.for(`react.lazy`),
        ne = Symbol.for(`react.offscreen`),
        re = Symbol.iterator;
      function ie(e) {
        return typeof e != `object` || !e
          ? null
          : ((e = (re && e[re]) || e[`@@iterator`]),
            typeof e == `function` ? e : null);
      }
      var P = Object.assign,
        ae;
      function oe(e) {
        if (ae === void 0)
          try {
            throw Error();
          } catch (e) {
            var t = e.stack.trim().match(/\n( *(at )?)/);
            ae = (t && t[1]) || ``;
          }
        return (
          `
` +
          ae +
          e
        );
      }
      var se = !1;
      function ce(e, t) {
        if (!e || se) return ``;
        se = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (t)
            if (
              ((t = function () {
                throw Error();
              }),
              Object.defineProperty(t.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == `object` && Reflect.construct)
            ) {
              try {
                Reflect.construct(t, []);
              } catch (e) {
                var r = e;
              }
              Reflect.construct(e, [], t);
            } else {
              try {
                t.call();
              } catch (e) {
                r = e;
              }
              e.call(t.prototype);
            }
          else {
            try {
              throw Error();
            } catch (e) {
              r = e;
            }
            e();
          }
        } catch (t) {
          if (t && r && typeof t.stack == `string`) {
            for (
              var i = t.stack.split(`
`),
                a = r.stack.split(`
`),
                o = i.length - 1,
                s = a.length - 1;
              1 <= o && 0 <= s && i[o] !== a[s];
            )
              s--;
            for (; 1 <= o && 0 <= s; o--, s--)
              if (i[o] !== a[s]) {
                if (o !== 1 || s !== 1)
                  do
                    if ((o--, s--, 0 > s || i[o] !== a[s])) {
                      var c =
                        `
` + i[o].replace(` at new `, ` at `);
                      return (
                        e.displayName &&
                          c.includes(`<anonymous>`) &&
                          (c = c.replace(`<anonymous>`, e.displayName)),
                        c
                      );
                    }
                  while (1 <= o && 0 <= s);
                break;
              }
          }
        } finally {
          ((se = !1), (Error.prepareStackTrace = n));
        }
        return (e = e ? e.displayName || e.name : ``) ? oe(e) : ``;
      }
      function le(e) {
        switch (e.tag) {
          case 5:
            return oe(e.type);
          case 16:
            return oe(`Lazy`);
          case 13:
            return oe(`Suspense`);
          case 19:
            return oe(`SuspenseList`);
          case 0:
          case 2:
          case 15:
            return ((e = ce(e.type, !1)), e);
          case 11:
            return ((e = ce(e.type.render, !1)), e);
          case 1:
            return ((e = ce(e.type, !0)), e);
          default:
            return ``;
        }
      }
      function ue(e) {
        if (e == null) return null;
        if (typeof e == `function`) return e.displayName || e.name || null;
        if (typeof e == `string`) return e;
        switch (e) {
          case E:
            return `Fragment`;
          case T:
            return `Portal`;
          case O:
            return `Profiler`;
          case D:
            return `StrictMode`;
          case j:
            return `Suspense`;
          case te:
            return `SuspenseList`;
        }
        if (typeof e == `object`)
          switch (e.$$typeof) {
            case A:
              return (e.displayName || `Context`) + `.Consumer`;
            case k:
              return (e._context.displayName || `Context`) + `.Provider`;
            case ee:
              var t = e.render;
              return (
                (e = e.displayName),
                (e ||=
                  ((e = t.displayName || t.name || ``),
                  e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
                e
              );
            case M:
              return (
                (t = e.displayName || null),
                t === null ? ue(e.type) || `Memo` : t
              );
            case N:
              ((t = e._payload), (e = e._init));
              try {
                return ue(e(t));
              } catch {}
          }
        return null;
      }
      function de(e) {
        var t = e.type;
        switch (e.tag) {
          case 24:
            return `Cache`;
          case 9:
            return (t.displayName || `Context`) + `.Consumer`;
          case 10:
            return (t._context.displayName || `Context`) + `.Provider`;
          case 18:
            return `DehydratedFragment`;
          case 11:
            return (
              (e = t.render),
              (e = e.displayName || e.name || ``),
              t.displayName ||
                (e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)
            );
          case 7:
            return `Fragment`;
          case 5:
            return t;
          case 4:
            return `Portal`;
          case 3:
            return `Root`;
          case 6:
            return `Text`;
          case 16:
            return ue(t);
          case 8:
            return t === D ? `StrictMode` : `Mode`;
          case 22:
            return `Offscreen`;
          case 12:
            return `Profiler`;
          case 21:
            return `Scope`;
          case 13:
            return `Suspense`;
          case 19:
            return `SuspenseList`;
          case 25:
            return `TracingMarker`;
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if (typeof t == `function`) return t.displayName || t.name || null;
            if (typeof t == `string`) return t;
        }
        return null;
      }
      function fe(e) {
        switch (typeof e) {
          case `boolean`:
          case `number`:
          case `string`:
          case `undefined`:
            return e;
          case `object`:
            return e;
          default:
            return ``;
        }
      }
      function pe(e) {
        var t = e.type;
        return (
          (e = e.nodeName) &&
          e.toLowerCase() === `input` &&
          (t === `checkbox` || t === `radio`)
        );
      }
      function me(e) {
        var t = pe(e) ? `checked` : `value`,
          n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
          r = `` + e[t];
        if (
          !e.hasOwnProperty(t) &&
          n !== void 0 &&
          typeof n.get == `function` &&
          typeof n.set == `function`
        ) {
          var i = n.get,
            a = n.set;
          return (
            Object.defineProperty(e, t, {
              configurable: !0,
              get: function () {
                return i.call(this);
              },
              set: function (e) {
                ((r = `` + e), a.call(this, e));
              },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
              getValue: function () {
                return r;
              },
              setValue: function (e) {
                r = `` + e;
              },
              stopTracking: function () {
                ((e._valueTracker = null), delete e[t]);
              },
            }
          );
        }
      }
      function he(e) {
        e._valueTracker ||= me(e);
      }
      function ge(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
          r = ``;
        return (
          e && (r = pe(e) ? (e.checked ? `true` : `false`) : e.value),
          (e = r),
          e === n ? !1 : (t.setValue(e), !0)
        );
      }
      function _e(e) {
        if (((e ||= typeof document < `u` ? document : void 0), e === void 0))
          return null;
        try {
          return e.activeElement || e.body;
        } catch {
          return e.body;
        }
      }
      function ve(e, t) {
        var n = t.checked;
        return P({}, t, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: void 0,
          checked: n ?? e._wrapperState.initialChecked,
        });
      }
      function ye(e, t) {
        var n = t.defaultValue == null ? `` : t.defaultValue,
          r = t.checked == null ? t.defaultChecked : t.checked;
        ((n = fe(t.value == null ? n : t.value)),
          (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
              t.type === `checkbox` || t.type === `radio`
                ? t.checked != null
                : t.value != null,
          }));
      }
      function be(e, t) {
        ((t = t.checked), t != null && S(e, `checked`, t, !1));
      }
      function xe(e, t) {
        be(e, t);
        var n = fe(t.value),
          r = t.type;
        if (n != null)
          r === `number`
            ? ((n === 0 && e.value === ``) || e.value != n) &&
              (e.value = `` + n)
            : e.value !== `` + n && (e.value = `` + n);
        else if (r === `submit` || r === `reset`) {
          e.removeAttribute(`value`);
          return;
        }
        (t.hasOwnProperty(`value`)
          ? Ce(e, t.type, n)
          : t.hasOwnProperty(`defaultValue`) &&
            Ce(e, t.type, fe(t.defaultValue)),
          t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked));
      }
      function Se(e, t, n) {
        if (t.hasOwnProperty(`value`) || t.hasOwnProperty(`defaultValue`)) {
          var r = t.type;
          if (
            !(
              (r !== `submit` && r !== `reset`) ||
              (t.value !== void 0 && t.value !== null)
            )
          )
            return;
          ((t = `` + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t));
        }
        ((n = e.name),
          n !== `` && (e.name = ``),
          (e.defaultChecked = !!e._wrapperState.initialChecked),
          n !== `` && (e.name = n));
      }
      function Ce(e, t, n) {
        (t !== `number` || _e(e.ownerDocument) !== e) &&
          (n == null
            ? (e.defaultValue = `` + e._wrapperState.initialValue)
            : e.defaultValue !== `` + n && (e.defaultValue = `` + n));
      }
      var we = Array.isArray;
      function Te(e, t, n, r) {
        if (((e = e.options), t)) {
          t = {};
          for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
          for (n = 0; n < e.length; n++)
            ((i = t.hasOwnProperty(`$` + e[n].value)),
              e[n].selected !== i && (e[n].selected = i),
              i && r && (e[n].defaultSelected = !0));
        } else {
          for (n = `` + fe(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
              ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
              return;
            }
            t !== null || e[i].disabled || (t = e[i]);
          }
          t !== null && (t.selected = !0);
        }
      }
      function Ee(e, t) {
        if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
        return P({}, t, {
          value: void 0,
          defaultValue: void 0,
          children: `` + e._wrapperState.initialValue,
        });
      }
      function De(e, t) {
        var n = t.value;
        if (n == null) {
          if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(r(92));
            if (we(n)) {
              if (1 < n.length) throw Error(r(93));
              n = n[0];
            }
            t = n;
          }
          ((t ??= ``), (n = t));
        }
        e._wrapperState = { initialValue: fe(n) };
      }
      function Oe(e, t) {
        var n = fe(t.value),
          r = fe(t.defaultValue);
        (n != null &&
          ((n = `` + n),
          n !== e.value && (e.value = n),
          t.defaultValue == null &&
            e.defaultValue !== n &&
            (e.defaultValue = n)),
          r != null && (e.defaultValue = `` + r));
      }
      function ke(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue &&
          t !== `` &&
          t !== null &&
          (e.value = t);
      }
      function F(e) {
        switch (e) {
          case `svg`:
            return `http://www.w3.org/2000/svg`;
          case `math`:
            return `http://www.w3.org/1998/Math/MathML`;
          default:
            return `http://www.w3.org/1999/xhtml`;
        }
      }
      function Ae(e, t) {
        return e == null || e === `http://www.w3.org/1999/xhtml`
          ? F(t)
          : e === `http://www.w3.org/2000/svg` && t === `foreignObject`
            ? `http://www.w3.org/1999/xhtml`
            : e;
      }
      var je,
        Me = (function (e) {
          return typeof MSApp < `u` && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                MSApp.execUnsafeLocalFunction(function () {
                  return e(t, n, r, i);
                });
              }
            : e;
        })(function (e, t) {
          if (
            e.namespaceURI !== `http://www.w3.org/2000/svg` ||
            `innerHTML` in e
          )
            e.innerHTML = t;
          else {
            for (
              je ||= document.createElement(`div`),
                je.innerHTML = `<svg>` + t.valueOf().toString() + `</svg>`,
                t = je.firstChild;
              e.firstChild;
            )
              e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
          }
        });
      function Ne(e, t) {
        if (t) {
          var n = e.firstChild;
          if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
          }
        }
        e.textContent = t;
      }
      var Pe = {
          animationIterationCount: !0,
          aspectRatio: !0,
          borderImageOutset: !0,
          borderImageSlice: !0,
          borderImageWidth: !0,
          boxFlex: !0,
          boxFlexGroup: !0,
          boxOrdinalGroup: !0,
          columnCount: !0,
          columns: !0,
          flex: !0,
          flexGrow: !0,
          flexPositive: !0,
          flexShrink: !0,
          flexNegative: !0,
          flexOrder: !0,
          gridArea: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowSpan: !0,
          gridRowStart: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnSpan: !0,
          gridColumnStart: !0,
          fontWeight: !0,
          lineClamp: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          tabSize: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeDasharray: !0,
          strokeDashoffset: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
          strokeWidth: !0,
        },
        Fe = [`Webkit`, `ms`, `Moz`, `O`];
      Object.keys(Pe).forEach(function (e) {
        Fe.forEach(function (t) {
          ((t = t + e.charAt(0).toUpperCase() + e.substring(1)),
            (Pe[t] = Pe[e]));
        });
      });
      function Ie(e, t, n) {
        return t == null || typeof t == `boolean` || t === ``
          ? ``
          : n ||
              typeof t != `number` ||
              t === 0 ||
              (Pe.hasOwnProperty(e) && Pe[e])
            ? (`` + t).trim()
            : t + `px`;
      }
      function Le(e, t) {
        for (var n in ((e = e.style), t))
          if (t.hasOwnProperty(n)) {
            var r = n.indexOf(`--`) === 0,
              i = Ie(n, t[n], r);
            (n === `float` && (n = `cssFloat`),
              r ? e.setProperty(n, i) : (e[n] = i));
          }
      }
      var Re = P(
        { menuitem: !0 },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
      );
      function ze(e, t) {
        if (t) {
          if (
            Re[e] &&
            (t.children != null || t.dangerouslySetInnerHTML != null)
          )
            throw Error(r(137, e));
          if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(r(60));
            if (
              typeof t.dangerouslySetInnerHTML != `object` ||
              !(`__html` in t.dangerouslySetInnerHTML)
            )
              throw Error(r(61));
          }
          if (t.style != null && typeof t.style != `object`) throw Error(r(62));
        }
      }
      function Be(e, t) {
        if (e.indexOf(`-`) === -1) return typeof t.is == `string`;
        switch (e) {
          case `annotation-xml`:
          case `color-profile`:
          case `font-face`:
          case `font-face-src`:
          case `font-face-uri`:
          case `font-face-format`:
          case `font-face-name`:
          case `missing-glyph`:
            return !1;
          default:
            return !0;
        }
      }
      var Ve = null;
      function He(e) {
        return (
          (e = e.target || e.srcElement || window),
          e.correspondingUseElement && (e = e.correspondingUseElement),
          e.nodeType === 3 ? e.parentNode : e
        );
      }
      var Ue = null,
        We = null,
        Ge = null;
      function Ke(e) {
        if ((e = Vi(e))) {
          if (typeof Ue != `function`) throw Error(r(280));
          var t = e.stateNode;
          t && ((t = Ui(t)), Ue(e.stateNode, e.type, t));
        }
      }
      function qe(e) {
        We ? (Ge ? Ge.push(e) : (Ge = [e])) : (We = e);
      }
      function Je() {
        if (We) {
          var e = We,
            t = Ge;
          if (((Ge = We = null), Ke(e), t))
            for (e = 0; e < t.length; e++) Ke(t[e]);
        }
      }
      function Ye(e, t) {
        return e(t);
      }
      function Xe() {}
      var Ze = !1;
      function Qe(e, t, n) {
        if (Ze) return e(t, n);
        Ze = !0;
        try {
          return Ye(e, t, n);
        } finally {
          ((Ze = !1), (We !== null || Ge !== null) && (Xe(), Je()));
        }
      }
      function $e(e, t) {
        var n = e.stateNode;
        if (n === null) return null;
        var i = Ui(n);
        if (i === null) return null;
        n = i[t];
        a: switch (t) {
          case `onClick`:
          case `onClickCapture`:
          case `onDoubleClick`:
          case `onDoubleClickCapture`:
          case `onMouseDown`:
          case `onMouseDownCapture`:
          case `onMouseMove`:
          case `onMouseMoveCapture`:
          case `onMouseUp`:
          case `onMouseUpCapture`:
          case `onMouseEnter`:
            ((i = !i.disabled) ||
              ((e = e.type),
              (i = !(
                e === `button` ||
                e === `input` ||
                e === `select` ||
                e === `textarea`
              ))),
              (e = !i));
            break a;
          default:
            e = !1;
        }
        if (e) return null;
        if (n && typeof n != `function`) throw Error(r(231, t, typeof n));
        return n;
      }
      var et = !1;
      if (c)
        try {
          var tt = {};
          (Object.defineProperty(tt, "passive", {
            get: function () {
              et = !0;
            },
          }),
            window.addEventListener(`test`, tt, tt),
            window.removeEventListener(`test`, tt, tt));
        } catch {
          et = !1;
        }
      function nt(e, t, n, r, i, a, o, s, c) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          t.apply(n, l);
        } catch (e) {
          this.onError(e);
        }
      }
      var rt = !1,
        it = null,
        at = !1,
        ot = null,
        st = {
          onError: function (e) {
            ((rt = !0), (it = e));
          },
        };
      function ct(e, t, n, r, i, a, o, s, c) {
        ((rt = !1), (it = null), nt.apply(st, arguments));
      }
      function lt(e, t, n, i, a, o, s, c, l) {
        if ((ct.apply(this, arguments), rt)) {
          if (rt) {
            var u = it;
            ((rt = !1), (it = null));
          } else throw Error(r(198));
          at || ((at = !0), (ot = u));
        }
      }
      function ut(e) {
        var t = e,
          n = e;
        if (e.alternate) for (; t.return; ) t = t.return;
        else {
          e = t;
          do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
          while (e);
        }
        return t.tag === 3 ? n : null;
      }
      function dt(e) {
        if (e.tag === 13) {
          var t = e.memoizedState;
          if (
            (t === null &&
              ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
          )
            return t.dehydrated;
        }
        return null;
      }
      function ft(e) {
        if (ut(e) !== e) throw Error(r(188));
      }
      function pt(e) {
        var t = e.alternate;
        if (!t) {
          if (((t = ut(e)), t === null)) throw Error(r(188));
          return t === e ? e : null;
        }
        for (var n = e, i = t; ; ) {
          var a = n.return;
          if (a === null) break;
          var o = a.alternate;
          if (o === null) {
            if (((i = a.return), i !== null)) {
              n = i;
              continue;
            }
            break;
          }
          if (a.child === o.child) {
            for (o = a.child; o; ) {
              if (o === n) return (ft(a), e);
              if (o === i) return (ft(a), t);
              o = o.sibling;
            }
            throw Error(r(188));
          }
          if (n.return !== i.return) ((n = a), (i = o));
          else {
            for (var s = !1, c = a.child; c; ) {
              if (c === n) {
                ((s = !0), (n = a), (i = o));
                break;
              }
              if (c === i) {
                ((s = !0), (i = a), (n = o));
                break;
              }
              c = c.sibling;
            }
            if (!s) {
              for (c = o.child; c; ) {
                if (c === n) {
                  ((s = !0), (n = o), (i = a));
                  break;
                }
                if (c === i) {
                  ((s = !0), (i = o), (n = a));
                  break;
                }
                c = c.sibling;
              }
              if (!s) throw Error(r(189));
            }
          }
          if (n.alternate !== i) throw Error(r(190));
        }
        if (n.tag !== 3) throw Error(r(188));
        return n.stateNode.current === n ? e : t;
      }
      function mt(e) {
        return ((e = pt(e)), e === null ? null : ht(e));
      }
      function ht(e) {
        if (e.tag === 5 || e.tag === 6) return e;
        for (e = e.child; e !== null; ) {
          var t = ht(e);
          if (t !== null) return t;
          e = e.sibling;
        }
        return null;
      }
      var gt = n.unstable_scheduleCallback,
        _t = n.unstable_cancelCallback,
        vt = n.unstable_shouldYield,
        yt = n.unstable_requestPaint,
        bt = n.unstable_now,
        xt = n.unstable_getCurrentPriorityLevel,
        St = n.unstable_ImmediatePriority,
        Ct = n.unstable_UserBlockingPriority,
        wt = n.unstable_NormalPriority,
        Tt = n.unstable_LowPriority,
        Et = n.unstable_IdlePriority,
        Dt = null,
        Ot = null;
      function kt(e) {
        if (Ot && typeof Ot.onCommitFiberRoot == `function`)
          try {
            Ot.onCommitFiberRoot(Dt, e, void 0, (e.current.flags & 128) == 128);
          } catch {}
      }
      var At = Math.clz32 ? Math.clz32 : Nt,
        jt = Math.log,
        Mt = Math.LN2;
      function Nt(e) {
        return ((e >>>= 0), e === 0 ? 32 : (31 - ((jt(e) / Mt) | 0)) | 0);
      }
      var Pt = 64,
        Ft = 4194304;
      function It(e) {
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
            return e & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return e & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return e;
        }
      }
      function Lt(e, t) {
        var n = e.pendingLanes;
        if (n === 0) return 0;
        var r = 0,
          i = e.suspendedLanes,
          a = e.pingedLanes,
          o = n & 268435455;
        if (o !== 0) {
          var s = o & ~i;
          s === 0 ? ((a &= o), a !== 0 && (r = It(a))) : (r = It(s));
        } else ((o = n & ~i), o === 0 ? a !== 0 && (r = It(a)) : (r = It(o)));
        if (r === 0) return 0;
        if (
          t !== 0 &&
          t !== r &&
          (t & i) === 0 &&
          ((i = r & -r), (a = t & -t), i >= a || (i === 16 && a & 4194240))
        )
          return t;
        if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
          for (e = e.entanglements, t &= r; 0 < t; )
            ((n = 31 - At(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
        return r;
      }
      function Rt(e, t) {
        switch (e) {
          case 1:
          case 2:
          case 4:
            return t + 250;
          case 8:
          case 16:
          case 32:
          case 64:
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
            return t + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function zt(e, t) {
        for (
          var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            a = e.pendingLanes;
          0 < a;
        ) {
          var o = 31 - At(a),
            s = 1 << o,
            c = i[o];
          (c === -1
            ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Rt(s, t))
            : c <= t && (e.expiredLanes |= s),
            (a &= ~s));
        }
      }
      function Bt(e) {
        return (
          (e = e.pendingLanes & -1073741825),
          e === 0 ? (e & 1073741824 ? 1073741824 : 0) : e
        );
      }
      function Vt() {
        var e = Pt;
        return ((Pt <<= 1), !(Pt & 4194240) && (Pt = 64), e);
      }
      function Ht(e) {
        for (var t = [], n = 0; 31 > n; n++) t.push(e);
        return t;
      }
      function Ut(e, t, n) {
        ((e.pendingLanes |= t),
          t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
          (e = e.eventTimes),
          (t = 31 - At(t)),
          (e[t] = n));
      }
      function Wt(e, t) {
        var n = e.pendingLanes & ~t;
        ((e.pendingLanes = t),
          (e.suspendedLanes = 0),
          (e.pingedLanes = 0),
          (e.expiredLanes &= t),
          (e.mutableReadLanes &= t),
          (e.entangledLanes &= t),
          (t = e.entanglements));
        var r = e.eventTimes;
        for (e = e.expirationTimes; 0 < n; ) {
          var i = 31 - At(n),
            a = 1 << i;
          ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a));
        }
      }
      function Gt(e, t) {
        var n = (e.entangledLanes |= t);
        for (e = e.entanglements; n; ) {
          var r = 31 - At(n),
            i = 1 << r;
          ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
        }
      }
      var I = 0;
      function Kt(e) {
        return (
          (e &= -e),
          1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
        );
      }
      var qt,
        Jt,
        Yt,
        Xt,
        Zt,
        Qt = !1,
        $t = [],
        en = null,
        tn = null,
        nn = null,
        rn = new Map(),
        an = new Map(),
        on = [],
        sn =
          `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(
            ` `,
          );
      function L(e, t) {
        switch (e) {
          case `focusin`:
          case `focusout`:
            en = null;
            break;
          case `dragenter`:
          case `dragleave`:
            tn = null;
            break;
          case `mouseover`:
          case `mouseout`:
            nn = null;
            break;
          case `pointerover`:
          case `pointerout`:
            rn.delete(t.pointerId);
            break;
          case `gotpointercapture`:
          case `lostpointercapture`:
            an.delete(t.pointerId);
        }
      }
      function cn(e, t, n, r, i, a) {
        return e === null || e.nativeEvent !== a
          ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: a,
              targetContainers: [i],
            }),
            t !== null && ((t = Vi(t)), t !== null && Jt(t)),
            e)
          : ((e.eventSystemFlags |= r),
            (t = e.targetContainers),
            i !== null && t.indexOf(i) === -1 && t.push(i),
            e);
      }
      function ln(e, t, n, r, i) {
        switch (t) {
          case `focusin`:
            return ((en = cn(en, e, t, n, r, i)), !0);
          case `dragenter`:
            return ((tn = cn(tn, e, t, n, r, i)), !0);
          case `mouseover`:
            return ((nn = cn(nn, e, t, n, r, i)), !0);
          case `pointerover`:
            var a = i.pointerId;
            return (rn.set(a, cn(rn.get(a) || null, e, t, n, r, i)), !0);
          case `gotpointercapture`:
            return (
              (a = i.pointerId),
              an.set(a, cn(an.get(a) || null, e, t, n, r, i)),
              !0
            );
        }
        return !1;
      }
      function un(e) {
        var t = V(e.target);
        if (t !== null) {
          var n = ut(t);
          if (n !== null) {
            if (((t = n.tag), t === 13)) {
              if (((t = dt(n)), t !== null)) {
                ((e.blockedOn = t),
                  Zt(e.priority, function () {
                    Yt(n);
                  }));
                return;
              }
            } else if (
              t === 3 &&
              n.stateNode.current.memoizedState.isDehydrated
            ) {
              e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
              return;
            }
          }
        }
        e.blockedOn = null;
      }
      function dn(e) {
        if (e.blockedOn !== null) return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
          var n = Sn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
          if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            ((Ve = r), n.target.dispatchEvent(r), (Ve = null));
          } else
            return ((t = Vi(n)), t !== null && Jt(t), (e.blockedOn = n), !1);
          t.shift();
        }
        return !0;
      }
      function fn(e, t, n) {
        dn(e) && n.delete(t);
      }
      function pn() {
        ((Qt = !1),
          en !== null && dn(en) && (en = null),
          tn !== null && dn(tn) && (tn = null),
          nn !== null && dn(nn) && (nn = null),
          rn.forEach(fn),
          an.forEach(fn));
      }
      function mn(e, t) {
        e.blockedOn === t &&
          ((e.blockedOn = null),
          Qt ||
            ((Qt = !0),
            n.unstable_scheduleCallback(n.unstable_NormalPriority, pn)));
      }
      function hn(e) {
        function t(t) {
          return mn(t, e);
        }
        if (0 < $t.length) {
          mn($t[0], e);
          for (var n = 1; n < $t.length; n++) {
            var r = $t[n];
            r.blockedOn === e && (r.blockedOn = null);
          }
        }
        for (
          en !== null && mn(en, e),
            tn !== null && mn(tn, e),
            nn !== null && mn(nn, e),
            rn.forEach(t),
            an.forEach(t),
            n = 0;
          n < on.length;
          n++
        )
          ((r = on[n]), r.blockedOn === e && (r.blockedOn = null));
        for (; 0 < on.length && ((n = on[0]), n.blockedOn === null); )
          (un(n), n.blockedOn === null && on.shift());
      }
      var gn = C.ReactCurrentBatchConfig,
        _n = !0;
      function vn(e, t, n, r) {
        var i = I,
          a = gn.transition;
        gn.transition = null;
        try {
          ((I = 1), bn(e, t, n, r));
        } finally {
          ((I = i), (gn.transition = a));
        }
      }
      function yn(e, t, n, r) {
        var i = I,
          a = gn.transition;
        gn.transition = null;
        try {
          ((I = 4), bn(e, t, n, r));
        } finally {
          ((I = i), (gn.transition = a));
        }
      }
      function bn(e, t, n, r) {
        if (_n) {
          var i = Sn(e, t, n, r);
          if (i === null) (hi(e, t, r, xn, n), L(e, r));
          else if (ln(i, e, t, n, r)) r.stopPropagation();
          else if ((L(e, r), t & 4 && -1 < sn.indexOf(e))) {
            for (; i !== null; ) {
              var a = Vi(i);
              if (
                (a !== null && qt(a),
                (a = Sn(e, t, n, r)),
                a === null && hi(e, t, r, xn, n),
                a === i)
              )
                break;
              i = a;
            }
            i !== null && r.stopPropagation();
          } else hi(e, t, r, null, n);
        }
      }
      var xn = null;
      function Sn(e, t, n, r) {
        if (((xn = null), (e = He(r)), (e = V(e)), e !== null))
          if (((t = ut(e)), t === null)) e = null;
          else if (((n = t.tag), n === 13)) {
            if (((e = dt(t)), e !== null)) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        return ((xn = e), null);
      }
      function Cn(e) {
        switch (e) {
          case `cancel`:
          case `click`:
          case `close`:
          case `contextmenu`:
          case `copy`:
          case `cut`:
          case `auxclick`:
          case `dblclick`:
          case `dragend`:
          case `dragstart`:
          case `drop`:
          case `focusin`:
          case `focusout`:
          case `input`:
          case `invalid`:
          case `keydown`:
          case `keypress`:
          case `keyup`:
          case `mousedown`:
          case `mouseup`:
          case `paste`:
          case `pause`:
          case `play`:
          case `pointercancel`:
          case `pointerdown`:
          case `pointerup`:
          case `ratechange`:
          case `reset`:
          case `resize`:
          case `seeked`:
          case `submit`:
          case `touchcancel`:
          case `touchend`:
          case `touchstart`:
          case `volumechange`:
          case `change`:
          case `selectionchange`:
          case `textInput`:
          case `compositionstart`:
          case `compositionend`:
          case `compositionupdate`:
          case `beforeblur`:
          case `afterblur`:
          case `beforeinput`:
          case `blur`:
          case `fullscreenchange`:
          case `focus`:
          case `hashchange`:
          case `popstate`:
          case `select`:
          case `selectstart`:
            return 1;
          case `drag`:
          case `dragenter`:
          case `dragexit`:
          case `dragleave`:
          case `dragover`:
          case `mousemove`:
          case `mouseout`:
          case `mouseover`:
          case `pointermove`:
          case `pointerout`:
          case `pointerover`:
          case `scroll`:
          case `toggle`:
          case `touchmove`:
          case `wheel`:
          case `mouseenter`:
          case `mouseleave`:
          case `pointerenter`:
          case `pointerleave`:
            return 4;
          case `message`:
            switch (xt()) {
              case St:
                return 1;
              case Ct:
                return 4;
              case wt:
              case Tt:
                return 16;
              case Et:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var wn = null,
        Tn = null,
        En = null;
      function Dn() {
        if (En) return En;
        var e,
          t = Tn,
          n = t.length,
          r,
          i = `value` in wn ? wn.value : wn.textContent,
          a = i.length;
        for (e = 0; e < n && t[e] === i[e]; e++);
        var o = n - e;
        for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
        return (En = i.slice(e, 1 < r ? 1 - r : void 0));
      }
      function On(e) {
        var t = e.keyCode;
        return (
          `charCode` in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
          e === 10 && (e = 13),
          32 <= e || e === 13 ? e : 0
        );
      }
      function kn() {
        return !0;
      }
      function An() {
        return !1;
      }
      function jn(e) {
        function t(t, n, r, i, a) {
          for (var o in ((this._reactName = t),
          (this._targetInst = r),
          (this.type = n),
          (this.nativeEvent = i),
          (this.target = a),
          (this.currentTarget = null),
          e))
            e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
          return (
            (this.isDefaultPrevented = (
              i.defaultPrevented == null
                ? !1 === i.returnValue
                : i.defaultPrevented
            )
              ? kn
              : An),
            (this.isPropagationStopped = An),
            this
          );
        }
        return (
          P(t.prototype, {
            preventDefault: function () {
              this.defaultPrevented = !0;
              var e = this.nativeEvent;
              e &&
                (e.preventDefault
                  ? e.preventDefault()
                  : typeof e.returnValue != `unknown` && (e.returnValue = !1),
                (this.isDefaultPrevented = kn));
            },
            stopPropagation: function () {
              var e = this.nativeEvent;
              e &&
                (e.stopPropagation
                  ? e.stopPropagation()
                  : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
                (this.isPropagationStopped = kn));
            },
            persist: function () {},
            isPersistent: kn,
          }),
          t
        );
      }
      var Mn = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: function (e) {
            return e.timeStamp || Date.now();
          },
          defaultPrevented: 0,
          isTrusted: 0,
        },
        Nn = jn(Mn),
        Pn = P({}, Mn, { view: 0, detail: 0 }),
        Fn = jn(Pn),
        In,
        Ln,
        Rn,
        zn = P({}, Pn, {
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
          getModifierState: Xn,
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
            return `movementX` in e
              ? e.movementX
              : (e !== Rn &&
                  (Rn && e.type === `mousemove`
                    ? ((In = e.screenX - Rn.screenX),
                      (Ln = e.screenY - Rn.screenY))
                    : (Ln = In = 0),
                  (Rn = e)),
                In);
          },
          movementY: function (e) {
            return `movementY` in e ? e.movementY : Ln;
          },
        }),
        Bn = jn(zn),
        Vn = jn(P({}, zn, { dataTransfer: 0 })),
        Hn = jn(P({}, Pn, { relatedTarget: 0 })),
        Un = jn(
          P({}, Mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
        ),
        Wn = jn(
          P({}, Mn, {
            clipboardData: function (e) {
              return `clipboardData` in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
        ),
        Gn = jn(P({}, Mn, { data: 0 })),
        Kn = {
          Esc: `Escape`,
          Spacebar: ` `,
          Left: `ArrowLeft`,
          Up: `ArrowUp`,
          Right: `ArrowRight`,
          Down: `ArrowDown`,
          Del: `Delete`,
          Win: `OS`,
          Menu: `ContextMenu`,
          Apps: `ContextMenu`,
          Scroll: `ScrollLock`,
          MozPrintableKey: `Unidentified`,
        },
        qn = {
          8: `Backspace`,
          9: `Tab`,
          12: `Clear`,
          13: `Enter`,
          16: `Shift`,
          17: `Control`,
          18: `Alt`,
          19: `Pause`,
          20: `CapsLock`,
          27: `Escape`,
          32: ` `,
          33: `PageUp`,
          34: `PageDown`,
          35: `End`,
          36: `Home`,
          37: `ArrowLeft`,
          38: `ArrowUp`,
          39: `ArrowRight`,
          40: `ArrowDown`,
          45: `Insert`,
          46: `Delete`,
          112: `F1`,
          113: `F2`,
          114: `F3`,
          115: `F4`,
          116: `F5`,
          117: `F6`,
          118: `F7`,
          119: `F8`,
          120: `F9`,
          121: `F10`,
          122: `F11`,
          123: `F12`,
          144: `NumLock`,
          145: `ScrollLock`,
          224: `Meta`,
        },
        Jn = {
          Alt: `altKey`,
          Control: `ctrlKey`,
          Meta: `metaKey`,
          Shift: `shiftKey`,
        };
      function Yn(e) {
        var t = this.nativeEvent;
        return t.getModifierState
          ? t.getModifierState(e)
          : (e = Jn[e])
            ? !!t[e]
            : !1;
      }
      function Xn() {
        return Yn;
      }
      var Zn = jn(
          P({}, Pn, {
            key: function (e) {
              if (e.key) {
                var t = Kn[e.key] || e.key;
                if (t !== `Unidentified`) return t;
              }
              return e.type === `keypress`
                ? ((e = On(e)), e === 13 ? `Enter` : String.fromCharCode(e))
                : e.type === `keydown` || e.type === `keyup`
                  ? qn[e.keyCode] || `Unidentified`
                  : ``;
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Xn,
            charCode: function (e) {
              return e.type === `keypress` ? On(e) : 0;
            },
            keyCode: function (e) {
              return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
            },
            which: function (e) {
              return e.type === `keypress`
                ? On(e)
                : e.type === `keydown` || e.type === `keyup`
                  ? e.keyCode
                  : 0;
            },
          }),
        ),
        Qn = jn(
          P({}, zn, {
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
        ),
        $n = jn(
          P({}, Pn, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Xn,
          }),
        ),
        er = jn(
          P({}, Mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
        ),
        tr = jn(
          P({}, zn, {
            deltaX: function (e) {
              return `deltaX` in e
                ? e.deltaX
                : `wheelDeltaX` in e
                  ? -e.wheelDeltaX
                  : 0;
            },
            deltaY: function (e) {
              return `deltaY` in e
                ? e.deltaY
                : `wheelDeltaY` in e
                  ? -e.wheelDeltaY
                  : `wheelDelta` in e
                    ? -e.wheelDelta
                    : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
        ),
        nr = [9, 13, 27, 32],
        rr = c && `CompositionEvent` in window,
        ir = null;
      c && `documentMode` in document && (ir = document.documentMode);
      var ar = c && `TextEvent` in window && !ir,
        or = c && (!rr || (ir && 8 < ir && 11 >= ir)),
        sr = ` `,
        cr = !1;
      function lr(e, t) {
        switch (e) {
          case `keyup`:
            return nr.indexOf(t.keyCode) !== -1;
          case `keydown`:
            return t.keyCode !== 229;
          case `keypress`:
          case `mousedown`:
          case `focusout`:
            return !0;
          default:
            return !1;
        }
      }
      function ur(e) {
        return (
          (e = e.detail),
          typeof e == `object` && `data` in e ? e.data : null
        );
      }
      var dr = !1;
      function fr(e, t) {
        switch (e) {
          case `compositionend`:
            return ur(t);
          case `keypress`:
            return t.which === 32 ? ((cr = !0), sr) : null;
          case `textInput`:
            return ((e = t.data), e === sr && cr ? null : e);
          default:
            return null;
        }
      }
      function pr(e, t) {
        if (dr)
          return e === `compositionend` || (!rr && lr(e, t))
            ? ((e = Dn()), (En = Tn = wn = null), (dr = !1), e)
            : null;
        switch (e) {
          case `paste`:
            return null;
          case `keypress`:
            if (
              !(t.ctrlKey || t.altKey || t.metaKey) ||
              (t.ctrlKey && t.altKey)
            ) {
              if (t.char && 1 < t.char.length) return t.char;
              if (t.which) return String.fromCharCode(t.which);
            }
            return null;
          case `compositionend`:
            return or && t.locale !== `ko` ? null : t.data;
          default:
            return null;
        }
      }
      var mr = {
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
      function hr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === `input` ? !!mr[e.type] : t === `textarea`;
      }
      function gr(e, t, n, r) {
        (qe(r),
          (t = _i(t, `onChange`)),
          0 < t.length &&
            ((n = new Nn(`onChange`, `change`, null, n, r)),
            e.push({ event: n, listeners: t })));
      }
      var _r = null,
        vr = null;
      function yr(e) {
        ui(e, 0);
      }
      function br(e) {
        if (ge(Hi(e))) return e;
      }
      function xr(e, t) {
        if (e === `change`) return t;
      }
      var Sr = !1;
      if (c) {
        var Cr;
        if (c) {
          var wr = `oninput` in document;
          if (!wr) {
            var Tr = document.createElement(`div`);
            (Tr.setAttribute(`oninput`, `return;`),
              (wr = typeof Tr.oninput == `function`));
          }
          Cr = wr;
        } else Cr = !1;
        Sr = Cr && (!document.documentMode || 9 < document.documentMode);
      }
      function Er() {
        _r && (_r.detachEvent(`onpropertychange`, Dr), (vr = _r = null));
      }
      function Dr(e) {
        if (e.propertyName === `value` && br(vr)) {
          var t = [];
          (gr(t, vr, e, He(e)), Qe(yr, t));
        }
      }
      function Or(e, t, n) {
        e === `focusin`
          ? (Er(), (_r = t), (vr = n), _r.attachEvent(`onpropertychange`, Dr))
          : e === `focusout` && Er();
      }
      function kr(e) {
        if (e === `selectionchange` || e === `keyup` || e === `keydown`)
          return br(vr);
      }
      function Ar(e, t) {
        if (e === `click`) return br(t);
      }
      function jr(e, t) {
        if (e === `input` || e === `change`) return br(t);
      }
      function Mr(e, t) {
        return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
      }
      var Nr = typeof Object.is == `function` ? Object.is : Mr;
      function Pr(e, t) {
        if (Nr(e, t)) return !0;
        if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
        var n = Object.keys(e),
          r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (r = 0; r < n.length; r++) {
          var i = n[r];
          if (!l.call(t, i) || !Nr(e[i], t[i])) return !1;
        }
        return !0;
      }
      function Fr(e) {
        for (; e && e.firstChild; ) e = e.firstChild;
        return e;
      }
      function Ir(e, t) {
        var n = Fr(e);
        e = 0;
        for (var r; n; ) {
          if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
              return { node: n, offset: t - e };
            e = r;
          }
          a: {
            for (; n; ) {
              if (n.nextSibling) {
                n = n.nextSibling;
                break a;
              }
              n = n.parentNode;
            }
            n = void 0;
          }
          n = Fr(n);
        }
      }
      function Lr(e, t) {
        return e && t
          ? e === t
            ? !0
            : e && e.nodeType === 3
              ? !1
              : t && t.nodeType === 3
                ? Lr(e, t.parentNode)
                : `contains` in e
                  ? e.contains(t)
                  : e.compareDocumentPosition
                    ? !!(e.compareDocumentPosition(t) & 16)
                    : !1
          : !1;
      }
      function Rr() {
        for (var e = window, t = _e(); t instanceof e.HTMLIFrameElement; ) {
          try {
            var n = typeof t.contentWindow.location.href == `string`;
          } catch {
            n = !1;
          }
          if (n) e = t.contentWindow;
          else break;
          t = _e(e.document);
        }
        return t;
      }
      function zr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return (
          t &&
          ((t === `input` &&
            (e.type === `text` ||
              e.type === `search` ||
              e.type === `tel` ||
              e.type === `url` ||
              e.type === `password`)) ||
            t === `textarea` ||
            e.contentEditable === `true`)
        );
      }
      function Br(e) {
        var t = Rr(),
          n = e.focusedElem,
          r = e.selectionRange;
        if (
          t !== n &&
          n &&
          n.ownerDocument &&
          Lr(n.ownerDocument.documentElement, n)
        ) {
          if (r !== null && zr(n)) {
            if (
              ((t = r.start),
              (e = r.end),
              e === void 0 && (e = t),
              `selectionStart` in n)
            )
              ((n.selectionStart = t),
                (n.selectionEnd = Math.min(e, n.value.length)));
            else if (
              ((e =
                ((t = n.ownerDocument || document) && t.defaultView) || window),
              e.getSelection)
            ) {
              e = e.getSelection();
              var i = n.textContent.length,
                a = Math.min(r.start, i);
              ((r = r.end === void 0 ? a : Math.min(r.end, i)),
                !e.extend && a > r && ((i = r), (r = a), (a = i)),
                (i = Ir(n, a)));
              var o = Ir(n, r);
              i &&
                o &&
                (e.rangeCount !== 1 ||
                  e.anchorNode !== i.node ||
                  e.anchorOffset !== i.offset ||
                  e.focusNode !== o.node ||
                  e.focusOffset !== o.offset) &&
                ((t = t.createRange()),
                t.setStart(i.node, i.offset),
                e.removeAllRanges(),
                a > r
                  ? (e.addRange(t), e.extend(o.node, o.offset))
                  : (t.setEnd(o.node, o.offset), e.addRange(t)));
            }
          }
          for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
              t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
          for (
            typeof n.focus == `function` && n.focus(), n = 0;
            n < t.length;
            n++
          )
            ((e = t[n]),
              (e.element.scrollLeft = e.left),
              (e.element.scrollTop = e.top));
        }
      }
      var Vr = c && `documentMode` in document && 11 >= document.documentMode,
        Hr = null,
        Ur = null,
        Wr = null,
        Gr = !1;
      function Kr(e, t, n) {
        var r =
          n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        Gr ||
          Hr == null ||
          Hr !== _e(r) ||
          ((r = Hr),
          `selectionStart` in r && zr(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                (r.ownerDocument && r.ownerDocument.defaultView) ||
                window
              ).getSelection()),
              (r = {
                anchorNode: r.anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset,
              })),
          (Wr && Pr(Wr, r)) ||
            ((Wr = r),
            (r = _i(Ur, `onSelect`)),
            0 < r.length &&
              ((t = new Nn(`onSelect`, `select`, null, t, n)),
              e.push({ event: t, listeners: r }),
              (t.target = Hr))));
      }
      function qr(e, t) {
        var n = {};
        return (
          (n[e.toLowerCase()] = t.toLowerCase()),
          (n[`Webkit` + e] = `webkit` + t),
          (n[`Moz` + e] = `moz` + t),
          n
        );
      }
      var Jr = {
          animationend: qr(`Animation`, `AnimationEnd`),
          animationiteration: qr(`Animation`, `AnimationIteration`),
          animationstart: qr(`Animation`, `AnimationStart`),
          transitionend: qr(`Transition`, `TransitionEnd`),
        },
        Yr = {},
        Xr = {};
      c &&
        ((Xr = document.createElement(`div`).style),
        `AnimationEvent` in window ||
          (delete Jr.animationend.animation,
          delete Jr.animationiteration.animation,
          delete Jr.animationstart.animation),
        `TransitionEvent` in window || delete Jr.transitionend.transition);
      function Zr(e) {
        if (Yr[e]) return Yr[e];
        if (!Jr[e]) return e;
        var t = Jr[e],
          n;
        for (n in t) if (t.hasOwnProperty(n) && n in Xr) return (Yr[e] = t[n]);
        return e;
      }
      var Qr = Zr(`animationend`),
        $r = Zr(`animationiteration`),
        ei = Zr(`animationstart`),
        ti = Zr(`transitionend`),
        ni = new Map(),
        ri =
          `abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
            ` `,
          );
      function ii(e, t) {
        (ni.set(e, t), o(t, [e]));
      }
      for (var ai = 0; ai < ri.length; ai++) {
        var oi = ri[ai];
        ii(oi.toLowerCase(), `on` + (oi[0].toUpperCase() + oi.slice(1)));
      }
      (ii(Qr, `onAnimationEnd`),
        ii($r, `onAnimationIteration`),
        ii(ei, `onAnimationStart`),
        ii(`dblclick`, `onDoubleClick`),
        ii(`focusin`, `onFocus`),
        ii(`focusout`, `onBlur`),
        ii(ti, `onTransitionEnd`),
        s(`onMouseEnter`, [`mouseout`, `mouseover`]),
        s(`onMouseLeave`, [`mouseout`, `mouseover`]),
        s(`onPointerEnter`, [`pointerout`, `pointerover`]),
        s(`onPointerLeave`, [`pointerout`, `pointerover`]),
        o(
          `onChange`,
          `change click focusin focusout input keydown keyup selectionchange`.split(
            ` `,
          ),
        ),
        o(
          `onSelect`,
          `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
            ` `,
          ),
        ),
        o(`onBeforeInput`, [
          `compositionend`,
          `keypress`,
          `textInput`,
          `paste`,
        ]),
        o(
          `onCompositionEnd`,
          `compositionend focusout keydown keypress keyup mousedown`.split(` `),
        ),
        o(
          `onCompositionStart`,
          `compositionstart focusout keydown keypress keyup mousedown`.split(
            ` `,
          ),
        ),
        o(
          `onCompositionUpdate`,
          `compositionupdate focusout keydown keypress keyup mousedown`.split(
            ` `,
          ),
        ));
      var si =
          `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
            ` `,
          ),
        ci = new Set(
          `cancel close invalid load scroll toggle`.split(` `).concat(si),
        );
      function li(e, t, n) {
        var r = e.type || `unknown-event`;
        ((e.currentTarget = n), lt(r, t, void 0, e), (e.currentTarget = null));
      }
      function ui(e, t) {
        t = (t & 4) != 0;
        for (var n = 0; n < e.length; n++) {
          var r = e[n],
            i = r.event;
          r = r.listeners;
          a: {
            var a = void 0;
            if (t)
              for (var o = r.length - 1; 0 <= o; o--) {
                var s = r[o],
                  c = s.instance,
                  l = s.currentTarget;
                if (((s = s.listener), c !== a && i.isPropagationStopped()))
                  break a;
                (li(i, s, l), (a = c));
              }
            else
              for (o = 0; o < r.length; o++) {
                if (
                  ((s = r[o]),
                  (c = s.instance),
                  (l = s.currentTarget),
                  (s = s.listener),
                  c !== a && i.isPropagationStopped())
                )
                  break a;
                (li(i, s, l), (a = c));
              }
          }
        }
        if (at) throw ((e = ot), (at = !1), (ot = null), e);
      }
      function R(e, t) {
        var n = t[zi];
        n === void 0 && (n = t[zi] = new Set());
        var r = e + `__bubble`;
        n.has(r) || (mi(t, e, 2, !1), n.add(r));
      }
      function di(e, t, n) {
        var r = 0;
        (t && (r |= 4), mi(n, e, r, t));
      }
      var fi = `_reactListening` + Math.random().toString(36).slice(2);
      function pi(e) {
        if (!e[fi]) {
          ((e[fi] = !0),
            i.forEach(function (t) {
              t !== `selectionchange` &&
                (ci.has(t) || di(t, !1, e), di(t, !0, e));
            }));
          var t = e.nodeType === 9 ? e : e.ownerDocument;
          t === null || t[fi] || ((t[fi] = !0), di(`selectionchange`, !1, t));
        }
      }
      function mi(e, t, n, r) {
        switch (Cn(t)) {
          case 1:
            var i = vn;
            break;
          case 4:
            i = yn;
            break;
          default:
            i = bn;
        }
        ((n = i.bind(null, t, n, e)),
          (i = void 0),
          !et ||
            (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) ||
            (i = !0),
          r
            ? i === void 0
              ? e.addEventListener(t, n, !0)
              : e.addEventListener(t, n, { capture: !0, passive: i })
            : i === void 0
              ? e.addEventListener(t, n, !1)
              : e.addEventListener(t, n, { passive: i }));
      }
      function hi(e, t, n, r, i) {
        var a = r;
        if (!(t & 1) && !(t & 2) && r !== null)
          a: for (;;) {
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
              var s = r.stateNode.containerInfo;
              if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
              if (o === 4)
                for (o = r.return; o !== null; ) {
                  var c = o.tag;
                  if (
                    (c === 3 || c === 4) &&
                    ((c = o.stateNode.containerInfo),
                    c === i || (c.nodeType === 8 && c.parentNode === i))
                  )
                    return;
                  o = o.return;
                }
              for (; s !== null; ) {
                if (((o = V(s)), o === null)) return;
                if (((c = o.tag), c === 5 || c === 6)) {
                  r = a = o;
                  continue a;
                }
                s = s.parentNode;
              }
            }
            r = r.return;
          }
        Qe(function () {
          var r = a,
            i = He(n),
            o = [];
          a: {
            var s = ni.get(e);
            if (s !== void 0) {
              var c = Nn,
                l = e;
              switch (e) {
                case `keypress`:
                  if (On(n) === 0) break a;
                case `keydown`:
                case `keyup`:
                  c = Zn;
                  break;
                case `focusin`:
                  ((l = `focus`), (c = Hn));
                  break;
                case `focusout`:
                  ((l = `blur`), (c = Hn));
                  break;
                case `beforeblur`:
                case `afterblur`:
                  c = Hn;
                  break;
                case `click`:
                  if (n.button === 2) break a;
                case `auxclick`:
                case `dblclick`:
                case `mousedown`:
                case `mousemove`:
                case `mouseup`:
                case `mouseout`:
                case `mouseover`:
                case `contextmenu`:
                  c = Bn;
                  break;
                case `drag`:
                case `dragend`:
                case `dragenter`:
                case `dragexit`:
                case `dragleave`:
                case `dragover`:
                case `dragstart`:
                case `drop`:
                  c = Vn;
                  break;
                case `touchcancel`:
                case `touchend`:
                case `touchmove`:
                case `touchstart`:
                  c = $n;
                  break;
                case Qr:
                case $r:
                case ei:
                  c = Un;
                  break;
                case ti:
                  c = er;
                  break;
                case `scroll`:
                  c = Fn;
                  break;
                case `wheel`:
                  c = tr;
                  break;
                case `copy`:
                case `cut`:
                case `paste`:
                  c = Wn;
                  break;
                case `gotpointercapture`:
                case `lostpointercapture`:
                case `pointercancel`:
                case `pointerdown`:
                case `pointermove`:
                case `pointerout`:
                case `pointerover`:
                case `pointerup`:
                  c = Qn;
              }
              var u = (t & 4) != 0,
                d = !u && e === `scroll`,
                f = u ? (s === null ? null : s + `Capture`) : s;
              u = [];
              for (var p = r, m; p !== null; ) {
                m = p;
                var h = m.stateNode;
                if (
                  (m.tag === 5 &&
                    h !== null &&
                    ((m = h),
                    f !== null &&
                      ((h = $e(p, f)), h != null && u.push(gi(p, h, m)))),
                  d)
                )
                  break;
                p = p.return;
              }
              0 < u.length &&
                ((s = new c(s, l, null, n, i)),
                o.push({ event: s, listeners: u }));
            }
          }
          if (!(t & 7)) {
            a: {
              if (
                ((s = e === `mouseover` || e === `pointerover`),
                (c = e === `mouseout` || e === `pointerout`),
                s &&
                  n !== Ve &&
                  (l = n.relatedTarget || n.fromElement) &&
                  (V(l) || l[Ri]))
              )
                break a;
              if (
                (c || s) &&
                ((s =
                  i.window === i
                    ? i
                    : (s = i.ownerDocument)
                      ? s.defaultView || s.parentWindow
                      : window),
                c
                  ? ((l = n.relatedTarget || n.toElement),
                    (c = r),
                    (l = l ? V(l) : null),
                    l !== null &&
                      ((d = ut(l)), l !== d || (l.tag !== 5 && l.tag !== 6)) &&
                      (l = null))
                  : ((c = null), (l = r)),
                c !== l)
              ) {
                if (
                  ((u = Bn),
                  (h = `onMouseLeave`),
                  (f = `onMouseEnter`),
                  (p = `mouse`),
                  (e === `pointerout` || e === `pointerover`) &&
                    ((u = Qn),
                    (h = `onPointerLeave`),
                    (f = `onPointerEnter`),
                    (p = `pointer`)),
                  (d = c == null ? s : Hi(c)),
                  (m = l == null ? s : Hi(l)),
                  (s = new u(h, p + `leave`, c, n, i)),
                  (s.target = d),
                  (s.relatedTarget = m),
                  (h = null),
                  V(i) === r &&
                    ((u = new u(f, p + `enter`, l, n, i)),
                    (u.target = m),
                    (u.relatedTarget = d),
                    (h = u)),
                  (d = h),
                  c && l)
                )
                  b: {
                    for (u = c, f = l, p = 0, m = u; m; m = vi(m)) p++;
                    for (m = 0, h = f; h; h = vi(h)) m++;
                    for (; 0 < p - m; ) ((u = vi(u)), p--);
                    for (; 0 < m - p; ) ((f = vi(f)), m--);
                    for (; p--; ) {
                      if (u === f || (f !== null && u === f.alternate)) break b;
                      ((u = vi(u)), (f = vi(f)));
                    }
                    u = null;
                  }
                else u = null;
                (c !== null && yi(o, s, c, u, !1),
                  l !== null && d !== null && yi(o, d, l, u, !0));
              }
            }
            a: {
              if (
                ((s = r ? Hi(r) : window),
                (c = s.nodeName && s.nodeName.toLowerCase()),
                c === `select` || (c === `input` && s.type === `file`))
              )
                var g = xr;
              else if (hr(s))
                if (Sr) g = jr;
                else {
                  g = kr;
                  var _ = Or;
                }
              else
                (c = s.nodeName) &&
                  c.toLowerCase() === `input` &&
                  (s.type === `checkbox` || s.type === `radio`) &&
                  (g = Ar);
              if ((g &&= g(e, r))) {
                gr(o, g, n, i);
                break a;
              }
              (_ && _(e, s, r),
                e === `focusout` &&
                  (_ = s._wrapperState) &&
                  _.controlled &&
                  s.type === `number` &&
                  Ce(s, `number`, s.value));
            }
            switch (((_ = r ? Hi(r) : window), e)) {
              case `focusin`:
                (hr(_) || _.contentEditable === `true`) &&
                  ((Hr = _), (Ur = r), (Wr = null));
                break;
              case `focusout`:
                Wr = Ur = Hr = null;
                break;
              case `mousedown`:
                Gr = !0;
                break;
              case `contextmenu`:
              case `mouseup`:
              case `dragend`:
                ((Gr = !1), Kr(o, n, i));
                break;
              case `selectionchange`:
                if (Vr) break;
              case `keydown`:
              case `keyup`:
                Kr(o, n, i);
            }
            var v;
            if (rr)
              b: {
                switch (e) {
                  case `compositionstart`:
                    var y = `onCompositionStart`;
                    break b;
                  case `compositionend`:
                    y = `onCompositionEnd`;
                    break b;
                  case `compositionupdate`:
                    y = `onCompositionUpdate`;
                    break b;
                }
                y = void 0;
              }
            else
              dr
                ? lr(e, n) && (y = `onCompositionEnd`)
                : e === `keydown` &&
                  n.keyCode === 229 &&
                  (y = `onCompositionStart`);
            (y &&
              (or &&
                n.locale !== `ko` &&
                (dr || y !== `onCompositionStart`
                  ? y === `onCompositionEnd` && dr && (v = Dn())
                  : ((wn = i),
                    (Tn = `value` in wn ? wn.value : wn.textContent),
                    (dr = !0))),
              (_ = _i(r, y)),
              0 < _.length &&
                ((y = new Gn(y, e, null, n, i)),
                o.push({ event: y, listeners: _ }),
                v ? (y.data = v) : ((v = ur(n)), v !== null && (y.data = v)))),
              (v = ar ? fr(e, n) : pr(e, n)) &&
                ((r = _i(r, `onBeforeInput`)),
                0 < r.length &&
                  ((i = new Gn(`onBeforeInput`, `beforeinput`, null, n, i)),
                  o.push({ event: i, listeners: r }),
                  (i.data = v))));
          }
          ui(o, t);
        });
      }
      function gi(e, t, n) {
        return { instance: e, listener: t, currentTarget: n };
      }
      function _i(e, t) {
        for (var n = t + `Capture`, r = []; e !== null; ) {
          var i = e,
            a = i.stateNode;
          (i.tag === 5 &&
            a !== null &&
            ((i = a),
            (a = $e(e, n)),
            a != null && r.unshift(gi(e, a, i)),
            (a = $e(e, t)),
            a != null && r.push(gi(e, a, i))),
            (e = e.return));
        }
        return r;
      }
      function vi(e) {
        if (e === null) return null;
        do e = e.return;
        while (e && e.tag !== 5);
        return e || null;
      }
      function yi(e, t, n, r, i) {
        for (var a = t._reactName, o = []; n !== null && n !== r; ) {
          var s = n,
            c = s.alternate,
            l = s.stateNode;
          if (c !== null && c === r) break;
          (s.tag === 5 &&
            l !== null &&
            ((s = l),
            i
              ? ((c = $e(n, a)), c != null && o.unshift(gi(n, c, s)))
              : i || ((c = $e(n, a)), c != null && o.push(gi(n, c, s)))),
            (n = n.return));
        }
        o.length !== 0 && e.push({ event: t, listeners: o });
      }
      var bi = /\r\n?/g,
        xi = /\u0000|\uFFFD/g;
      function Si(e) {
        return (typeof e == `string` ? e : `` + e)
          .replace(
            bi,
            `
`,
          )
          .replace(xi, ``);
      }
      function Ci(e, t, n) {
        if (((t = Si(t)), Si(e) !== t && n)) throw Error(r(425));
      }
      function wi() {}
      var Ti = null,
        Ei = null;
      function Di(e, t) {
        return (
          e === `textarea` ||
          e === `noscript` ||
          typeof t.children == `string` ||
          typeof t.children == `number` ||
          (typeof t.dangerouslySetInnerHTML == `object` &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
        );
      }
      var z = typeof setTimeout == `function` ? setTimeout : void 0,
        Oi = typeof clearTimeout == `function` ? clearTimeout : void 0,
        ki = typeof Promise == `function` ? Promise : void 0,
        Ai =
          typeof queueMicrotask == `function`
            ? queueMicrotask
            : ki === void 0
              ? z
              : function (e) {
                  return ki.resolve(null).then(e).catch(ji);
                };
      function ji(e) {
        setTimeout(function () {
          throw e;
        });
      }
      function Mi(e, t) {
        var n = t,
          r = 0;
        do {
          var i = n.nextSibling;
          if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === `/$`)) {
              if (r === 0) {
                (e.removeChild(i), hn(t));
                return;
              }
              r--;
            } else (n !== `$` && n !== `$?` && n !== `$!`) || r++;
          n = i;
        } while (n);
        hn(t);
      }
      function Ni(e) {
        for (; e != null; e = e.nextSibling) {
          var t = e.nodeType;
          if (t === 1 || t === 3) break;
          if (t === 8) {
            if (((t = e.data), t === `$` || t === `$!` || t === `$?`)) break;
            if (t === `/$`) return null;
          }
        }
        return e;
      }
      function Pi(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === `$` || n === `$!` || n === `$?`) {
              if (t === 0) return e;
              t--;
            } else n === `/$` && t++;
          }
          e = e.previousSibling;
        }
        return null;
      }
      var Fi = Math.random().toString(36).slice(2),
        Ii = `__reactFiber$` + Fi,
        Li = `__reactProps$` + Fi,
        Ri = `__reactContainer$` + Fi,
        zi = `__reactEvents$` + Fi,
        B = `__reactListeners$` + Fi,
        Bi = `__reactHandles$` + Fi;
      function V(e) {
        var t = e[Ii];
        if (t) return t;
        for (var n = e.parentNode; n; ) {
          if ((t = n[Ri] || n[Ii])) {
            if (
              ((n = t.alternate),
              t.child !== null || (n !== null && n.child !== null))
            )
              for (e = Pi(e); e !== null; ) {
                if ((n = e[Ii])) return n;
                e = Pi(e);
              }
            return t;
          }
          ((e = n), (n = e.parentNode));
        }
        return null;
      }
      function Vi(e) {
        return (
          (e = e[Ii] || e[Ri]),
          !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
        );
      }
      function Hi(e) {
        if (e.tag === 5 || e.tag === 6) return e.stateNode;
        throw Error(r(33));
      }
      function Ui(e) {
        return e[Li] || null;
      }
      var Wi = [],
        Gi = -1;
      function Ki(e) {
        return { current: e };
      }
      function H(e) {
        0 > Gi || ((e.current = Wi[Gi]), (Wi[Gi] = null), Gi--);
      }
      function U(e, t) {
        (Gi++, (Wi[Gi] = e.current), (e.current = t));
      }
      var qi = {},
        W = Ki(qi),
        Ji = Ki(!1),
        Yi = qi;
      function Xi(e, t) {
        var n = e.type.contextTypes;
        if (!n) return qi;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
          return r.__reactInternalMemoizedMaskedChildContext;
        var i = {},
          a;
        for (a in n) i[a] = t[a];
        return (
          r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
          i
        );
      }
      function Zi(e) {
        return ((e = e.childContextTypes), e != null);
      }
      function Qi() {
        (H(Ji), H(W));
      }
      function $i(e, t, n) {
        if (W.current !== qi) throw Error(r(168));
        (U(W, t), U(Ji, n));
      }
      function ea(e, t, n) {
        var i = e.stateNode;
        if (((t = t.childContextTypes), typeof i.getChildContext != `function`))
          return n;
        for (var a in ((i = i.getChildContext()), i))
          if (!(a in t)) throw Error(r(108, de(e) || `Unknown`, a));
        return P({}, n, i);
      }
      function ta(e) {
        return (
          (e =
            ((e = e.stateNode) &&
              e.__reactInternalMemoizedMergedChildContext) ||
            qi),
          (Yi = W.current),
          U(W, e),
          U(Ji, Ji.current),
          !0
        );
      }
      function na(e, t, n) {
        var i = e.stateNode;
        if (!i) throw Error(r(169));
        (n
          ? ((e = ea(e, t, Yi)),
            (i.__reactInternalMemoizedMergedChildContext = e),
            H(Ji),
            H(W),
            U(W, e))
          : H(Ji),
          U(Ji, n));
      }
      var ra = null,
        ia = !1,
        aa = !1;
      function oa(e) {
        ra === null ? (ra = [e]) : ra.push(e);
      }
      function sa(e) {
        ((ia = !0), oa(e));
      }
      function ca() {
        if (!aa && ra !== null) {
          aa = !0;
          var e = 0,
            t = I;
          try {
            var n = ra;
            for (I = 1; e < n.length; e++) {
              var r = n[e];
              do r = r(!0);
              while (r !== null);
            }
            ((ra = null), (ia = !1));
          } catch (t) {
            throw (ra !== null && (ra = ra.slice(e + 1)), gt(St, ca), t);
          } finally {
            ((I = t), (aa = !1));
          }
        }
        return null;
      }
      var la = [],
        ua = 0,
        da = null,
        fa = 0,
        pa = [],
        ma = 0,
        ha = null,
        ga = 1,
        _a = ``;
      function va(e, t) {
        ((la[ua++] = fa), (la[ua++] = da), (da = e), (fa = t));
      }
      function ya(e, t, n) {
        ((pa[ma++] = ga), (pa[ma++] = _a), (pa[ma++] = ha), (ha = e));
        var r = ga;
        e = _a;
        var i = 32 - At(r) - 1;
        ((r &= ~(1 << i)), (n += 1));
        var a = 32 - At(t) + i;
        if (30 < a) {
          var o = i - (i % 5);
          ((a = (r & ((1 << o) - 1)).toString(32)),
            (r >>= o),
            (i -= o),
            (ga = (1 << (32 - At(t) + i)) | (n << i) | r),
            (_a = a + e));
        } else ((ga = (1 << a) | (n << i) | r), (_a = e));
      }
      function ba(e) {
        e.return !== null && (va(e, 1), ya(e, 1, 0));
      }
      function xa(e) {
        for (; e === da; )
          ((da = la[--ua]), (la[ua] = null), (fa = la[--ua]), (la[ua] = null));
        for (; e === ha; )
          ((ha = pa[--ma]),
            (pa[ma] = null),
            (_a = pa[--ma]),
            (pa[ma] = null),
            (ga = pa[--ma]),
            (pa[ma] = null));
      }
      var Sa = null,
        Ca = null,
        G = !1,
        wa = null;
      function Ta(e, t) {
        var n = Kl(5, null, null, 0);
        ((n.elementType = `DELETED`),
          (n.stateNode = t),
          (n.return = e),
          (t = e.deletions),
          t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
      }
      function Ea(e, t) {
        switch (e.tag) {
          case 5:
            var n = e.type;
            return (
              (t =
                t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                  ? null
                  : t),
              t === null
                ? !1
                : ((e.stateNode = t), (Sa = e), (Ca = Ni(t.firstChild)), !0)
            );
          case 6:
            return (
              (t = e.pendingProps === `` || t.nodeType !== 3 ? null : t),
              t === null ? !1 : ((e.stateNode = t), (Sa = e), (Ca = null), !0)
            );
          case 13:
            return (
              (t = t.nodeType === 8 ? t : null),
              t === null
                ? !1
                : ((n = ha === null ? null : { id: ga, overflow: _a }),
                  (e.memoizedState = {
                    dehydrated: t,
                    treeContext: n,
                    retryLane: 1073741824,
                  }),
                  (n = Kl(18, null, null, 0)),
                  (n.stateNode = t),
                  (n.return = e),
                  (e.child = n),
                  (Sa = e),
                  (Ca = null),
                  !0)
            );
          default:
            return !1;
        }
      }
      function Da(e) {
        return (e.mode & 1) != 0 && (e.flags & 128) == 0;
      }
      function Oa(e) {
        if (G) {
          var t = Ca;
          if (t) {
            var n = t;
            if (!Ea(e, t)) {
              if (Da(e)) throw Error(r(418));
              t = Ni(n.nextSibling);
              var i = Sa;
              t && Ea(e, t)
                ? Ta(i, n)
                : ((e.flags = (e.flags & -4097) | 2), (G = !1), (Sa = e));
            }
          } else {
            if (Da(e)) throw Error(r(418));
            ((e.flags = (e.flags & -4097) | 2), (G = !1), (Sa = e));
          }
        }
      }
      function ka(e) {
        for (
          e = e.return;
          e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
        )
          e = e.return;
        Sa = e;
      }
      function Aa(e) {
        if (e !== Sa) return !1;
        if (!G) return (ka(e), (G = !0), !1);
        var t;
        if (
          ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== `head` && t !== `body` && !Di(e.type, e.memoizedProps))),
          (t &&= Ca))
        ) {
          if (Da(e)) throw (ja(), Error(r(418)));
          for (; t; ) (Ta(e, t), (t = Ni(t.nextSibling)));
        }
        if ((ka(e), e.tag === 13)) {
          if (
            ((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e)
          )
            throw Error(r(317));
          a: {
            for (e = e.nextSibling, t = 0; e; ) {
              if (e.nodeType === 8) {
                var n = e.data;
                if (n === `/$`) {
                  if (t === 0) {
                    Ca = Ni(e.nextSibling);
                    break a;
                  }
                  t--;
                } else (n !== `$` && n !== `$!` && n !== `$?`) || t++;
              }
              e = e.nextSibling;
            }
            Ca = null;
          }
        } else Ca = Sa ? Ni(e.stateNode.nextSibling) : null;
        return !0;
      }
      function ja() {
        for (var e = Ca; e; ) e = Ni(e.nextSibling);
      }
      function Ma() {
        ((Ca = Sa = null), (G = !1));
      }
      function Na(e) {
        wa === null ? (wa = [e]) : wa.push(e);
      }
      var Pa = C.ReactCurrentBatchConfig;
      function Fa(e, t, n) {
        if (
          ((e = n.ref),
          e !== null && typeof e != `function` && typeof e != `object`)
        ) {
          if (n._owner) {
            if (((n = n._owner), n)) {
              if (n.tag !== 1) throw Error(r(309));
              var i = n.stateNode;
            }
            if (!i) throw Error(r(147, e));
            var a = i,
              o = `` + e;
            return t !== null &&
              t.ref !== null &&
              typeof t.ref == `function` &&
              t.ref._stringRef === o
              ? t.ref
              : ((t = function (e) {
                  var t = a.refs;
                  e === null ? delete t[o] : (t[o] = e);
                }),
                (t._stringRef = o),
                t);
          }
          if (typeof e != `string`) throw Error(r(284));
          if (!n._owner) throw Error(r(290, e));
        }
        return e;
      }
      function Ia(e, t) {
        throw (
          (e = Object.prototype.toString.call(t)),
          Error(
            r(
              31,
              e === `[object Object]`
                ? `object with keys {` + Object.keys(t).join(`, `) + `}`
                : e,
            ),
          )
        );
      }
      function La(e) {
        var t = e._init;
        return t(e._payload);
      }
      function Ra(e) {
        function t(t, n) {
          if (e) {
            var r = t.deletions;
            r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
          }
        }
        function n(n, r) {
          if (!e) return null;
          for (; r !== null; ) (t(n, r), (r = r.sibling));
          return null;
        }
        function i(e, t) {
          for (e = new Map(); t !== null; )
            (t.key === null ? e.set(t.index, t) : e.set(t.key, t),
              (t = t.sibling));
          return e;
        }
        function a(e, t) {
          return ((e = Yl(e, t)), (e.index = 0), (e.sibling = null), e);
        }
        function o(t, n, r) {
          return (
            (t.index = r),
            e
              ? ((r = t.alternate),
                r === null
                  ? ((t.flags |= 2), n)
                  : ((r = r.index), r < n ? ((t.flags |= 2), n) : r))
              : ((t.flags |= 1048576), n)
          );
        }
        function s(t) {
          return (e && t.alternate === null && (t.flags |= 2), t);
        }
        function c(e, t, n, r) {
          return t === null || t.tag !== 6
            ? ((t = $l(n, e.mode, r)), (t.return = e), t)
            : ((t = a(t, n)), (t.return = e), t);
        }
        function l(e, t, n, r) {
          var i = n.type;
          return i === E
            ? d(e, t, n.props.children, r, n.key)
            : t !== null &&
                (t.elementType === i ||
                  (typeof i == `object` &&
                    i &&
                    i.$$typeof === N &&
                    La(i) === t.type))
              ? ((r = a(t, n.props)), (r.ref = Fa(e, t, n)), (r.return = e), r)
              : ((r = Xl(n.type, n.key, n.props, null, e.mode, r)),
                (r.ref = Fa(e, t, n)),
                (r.return = e),
                r);
        }
        function u(e, t, n, r) {
          return t === null ||
            t.tag !== 4 ||
            t.stateNode.containerInfo !== n.containerInfo ||
            t.stateNode.implementation !== n.implementation
            ? ((t = eu(n, e.mode, r)), (t.return = e), t)
            : ((t = a(t, n.children || [])), (t.return = e), t);
        }
        function d(e, t, n, r, i) {
          return t === null || t.tag !== 7
            ? ((t = Zl(n, e.mode, r, i)), (t.return = e), t)
            : ((t = a(t, n)), (t.return = e), t);
        }
        function f(e, t, n) {
          if ((typeof t == `string` && t !== ``) || typeof t == `number`)
            return ((t = $l(`` + t, e.mode, n)), (t.return = e), t);
          if (typeof t == `object` && t) {
            switch (t.$$typeof) {
              case w:
                return (
                  (n = Xl(t.type, t.key, t.props, null, e.mode, n)),
                  (n.ref = Fa(e, null, t)),
                  (n.return = e),
                  n
                );
              case T:
                return ((t = eu(t, e.mode, n)), (t.return = e), t);
              case N:
                var r = t._init;
                return f(e, r(t._payload), n);
            }
            if (we(t) || ie(t))
              return ((t = Zl(t, e.mode, n, null)), (t.return = e), t);
            Ia(e, t);
          }
          return null;
        }
        function p(e, t, n, r) {
          var i = t === null ? null : t.key;
          if ((typeof n == `string` && n !== ``) || typeof n == `number`)
            return i === null ? c(e, t, `` + n, r) : null;
          if (typeof n == `object` && n) {
            switch (n.$$typeof) {
              case w:
                return n.key === i ? l(e, t, n, r) : null;
              case T:
                return n.key === i ? u(e, t, n, r) : null;
              case N:
                return ((i = n._init), p(e, t, i(n._payload), r));
            }
            if (we(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
            Ia(e, n);
          }
          return null;
        }
        function m(e, t, n, r, i) {
          if ((typeof r == `string` && r !== ``) || typeof r == `number`)
            return ((e = e.get(n) || null), c(t, e, `` + r, i));
          if (typeof r == `object` && r) {
            switch (r.$$typeof) {
              case w:
                return (
                  (e = e.get(r.key === null ? n : r.key) || null),
                  l(t, e, r, i)
                );
              case T:
                return (
                  (e = e.get(r.key === null ? n : r.key) || null),
                  u(t, e, r, i)
                );
              case N:
                var a = r._init;
                return m(e, t, n, a(r._payload), i);
            }
            if (we(r) || ie(r))
              return ((e = e.get(n) || null), d(t, e, r, i, null));
            Ia(t, r);
          }
          return null;
        }
        function h(r, a, s, c) {
          for (
            var l = null, u = null, d = a, h = (a = 0), g = null;
            d !== null && h < s.length;
            h++
          ) {
            d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
            var _ = p(r, d, s[h], c);
            if (_ === null) {
              d === null && (d = g);
              break;
            }
            (e && d && _.alternate === null && t(r, d),
              (a = o(_, a, h)),
              u === null ? (l = _) : (u.sibling = _),
              (u = _),
              (d = g));
          }
          if (h === s.length) return (n(r, d), G && va(r, h), l);
          if (d === null) {
            for (; h < s.length; h++)
              ((d = f(r, s[h], c)),
                d !== null &&
                  ((a = o(d, a, h)),
                  u === null ? (l = d) : (u.sibling = d),
                  (u = d)));
            return (G && va(r, h), l);
          }
          for (d = i(r, d); h < s.length; h++)
            ((g = m(d, r, h, s[h], c)),
              g !== null &&
                (e &&
                  g.alternate !== null &&
                  d.delete(g.key === null ? h : g.key),
                (a = o(g, a, h)),
                u === null ? (l = g) : (u.sibling = g),
                (u = g)));
          return (
            e &&
              d.forEach(function (e) {
                return t(r, e);
              }),
            G && va(r, h),
            l
          );
        }
        function g(a, s, c, l) {
          var u = ie(c);
          if (typeof u != `function`) throw Error(r(150));
          if (((c = u.call(c)), c == null)) throw Error(r(151));
          for (
            var d = (u = null), h = s, g = (s = 0), _ = null, v = c.next();
            h !== null && !v.done;
            g++, v = c.next()
          ) {
            h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
            var y = p(a, h, v.value, l);
            if (y === null) {
              h === null && (h = _);
              break;
            }
            (e && h && y.alternate === null && t(a, h),
              (s = o(y, s, g)),
              d === null ? (u = y) : (d.sibling = y),
              (d = y),
              (h = _));
          }
          if (v.done) return (n(a, h), G && va(a, g), u);
          if (h === null) {
            for (; !v.done; g++, v = c.next())
              ((v = f(a, v.value, l)),
                v !== null &&
                  ((s = o(v, s, g)),
                  d === null ? (u = v) : (d.sibling = v),
                  (d = v)));
            return (G && va(a, g), u);
          }
          for (h = i(a, h); !v.done; g++, v = c.next())
            ((v = m(h, a, g, v.value, l)),
              v !== null &&
                (e &&
                  v.alternate !== null &&
                  h.delete(v.key === null ? g : v.key),
                (s = o(v, s, g)),
                d === null ? (u = v) : (d.sibling = v),
                (d = v)));
          return (
            e &&
              h.forEach(function (e) {
                return t(a, e);
              }),
            G && va(a, g),
            u
          );
        }
        function _(e, r, i, o) {
          if (
            (typeof i == `object` &&
              i &&
              i.type === E &&
              i.key === null &&
              (i = i.props.children),
            typeof i == `object` && i)
          ) {
            switch (i.$$typeof) {
              case w:
                a: {
                  for (var c = i.key, l = r; l !== null; ) {
                    if (l.key === c) {
                      if (((c = i.type), c === E)) {
                        if (l.tag === 7) {
                          (n(e, l.sibling),
                            (r = a(l, i.props.children)),
                            (r.return = e),
                            (e = r));
                          break a;
                        }
                      } else if (
                        l.elementType === c ||
                        (typeof c == `object` &&
                          c &&
                          c.$$typeof === N &&
                          La(c) === l.type)
                      ) {
                        (n(e, l.sibling),
                          (r = a(l, i.props)),
                          (r.ref = Fa(e, l, i)),
                          (r.return = e),
                          (e = r));
                        break a;
                      }
                      n(e, l);
                      break;
                    } else t(e, l);
                    l = l.sibling;
                  }
                  i.type === E
                    ? ((r = Zl(i.props.children, e.mode, o, i.key)),
                      (r.return = e),
                      (e = r))
                    : ((o = Xl(i.type, i.key, i.props, null, e.mode, o)),
                      (o.ref = Fa(e, r, i)),
                      (o.return = e),
                      (e = o));
                }
                return s(e);
              case T:
                a: {
                  for (l = i.key; r !== null; ) {
                    if (r.key === l)
                      if (
                        r.tag === 4 &&
                        r.stateNode.containerInfo === i.containerInfo &&
                        r.stateNode.implementation === i.implementation
                      ) {
                        (n(e, r.sibling),
                          (r = a(r, i.children || [])),
                          (r.return = e),
                          (e = r));
                        break a;
                      } else {
                        n(e, r);
                        break;
                      }
                    else t(e, r);
                    r = r.sibling;
                  }
                  ((r = eu(i, e.mode, o)), (r.return = e), (e = r));
                }
                return s(e);
              case N:
                return ((l = i._init), _(e, r, l(i._payload), o));
            }
            if (we(i)) return h(e, r, i, o);
            if (ie(i)) return g(e, r, i, o);
            Ia(e, i);
          }
          return (typeof i == `string` && i !== ``) || typeof i == `number`
            ? ((i = `` + i),
              r !== null && r.tag === 6
                ? (n(e, r.sibling), (r = a(r, i)), (r.return = e), (e = r))
                : (n(e, r), (r = $l(i, e.mode, o)), (r.return = e), (e = r)),
              s(e))
            : n(e, r);
        }
        return _;
      }
      var za = Ra(!0),
        Ba = Ra(!1),
        Va = Ki(null),
        Ha = null,
        Ua = null,
        Wa = null;
      function Ga() {
        Wa = Ua = Ha = null;
      }
      function Ka(e) {
        var t = Va.current;
        (H(Va), (e._currentValue = t));
      }
      function qa(e, t, n) {
        for (; e !== null; ) {
          var r = e.alternate;
          if (
            ((e.childLanes & t) === t
              ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
              : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
            e === n)
          )
            break;
          e = e.return;
        }
      }
      function Ja(e, t) {
        ((Ha = e),
          (Wa = Ua = null),
          (e = e.dependencies),
          e !== null &&
            e.firstContext !== null &&
            ((e.lanes & t) !== 0 && (Ps = !0), (e.firstContext = null)));
      }
      function Ya(e) {
        var t = e._currentValue;
        if (Wa !== e)
          if (
            ((e = { context: e, memoizedValue: t, next: null }), Ua === null)
          ) {
            if (Ha === null) throw Error(r(308));
            ((Ua = e), (Ha.dependencies = { lanes: 0, firstContext: e }));
          } else Ua = Ua.next = e;
        return t;
      }
      var Xa = null;
      function Za(e) {
        Xa === null ? (Xa = [e]) : Xa.push(e);
      }
      function Qa(e, t, n, r) {
        var i = t.interleaved;
        return (
          i === null
            ? ((n.next = n), Za(t))
            : ((n.next = i.next), (i.next = n)),
          (t.interleaved = n),
          $a(e, r)
        );
      }
      function $a(e, t) {
        e.lanes |= t;
        var n = e.alternate;
        for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
          ((e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return));
        return n.tag === 3 ? n.stateNode : null;
      }
      var eo = !1;
      function to(e) {
        e.updateQueue = {
          baseState: e.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, interleaved: null, lanes: 0 },
          effects: null,
        };
      }
      function no(e, t) {
        ((e = e.updateQueue),
          t.updateQueue === e &&
            (t.updateQueue = {
              baseState: e.baseState,
              firstBaseUpdate: e.firstBaseUpdate,
              lastBaseUpdate: e.lastBaseUpdate,
              shared: e.shared,
              effects: e.effects,
            }));
      }
      function ro(e, t) {
        return {
          eventTime: e,
          lane: t,
          tag: 0,
          payload: null,
          callback: null,
          next: null,
        };
      }
      function io(e, t, n) {
        var r = e.updateQueue;
        if (r === null) return null;
        if (((r = r.shared), $ & 2)) {
          var i = r.pending;
          return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            $a(e, n)
          );
        }
        return (
          (i = r.interleaved),
          i === null
            ? ((t.next = t), Za(r))
            : ((t.next = i.next), (i.next = t)),
          (r.interleaved = t),
          $a(e, n)
        );
      }
      function ao(e, t, n) {
        if (
          ((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194240))
        ) {
          var r = t.lanes;
          ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Gt(e, n));
        }
      }
      function oo(e, t) {
        var n = e.updateQueue,
          r = e.alternate;
        if (r !== null && ((r = r.updateQueue), n === r)) {
          var i = null,
            a = null;
          if (((n = n.firstBaseUpdate), n !== null)) {
            do {
              var o = {
                eventTime: n.eventTime,
                lane: n.lane,
                tag: n.tag,
                payload: n.payload,
                callback: n.callback,
                next: null,
              };
              (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
            } while (n !== null);
            a === null ? (i = a = t) : (a = a.next = t);
          } else i = a = t;
          ((n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: a,
            shared: r.shared,
            effects: r.effects,
          }),
            (e.updateQueue = n));
          return;
        }
        ((e = n.lastBaseUpdate),
          e === null ? (n.firstBaseUpdate = t) : (e.next = t),
          (n.lastBaseUpdate = t));
      }
      function so(e, t, n, r) {
        var i = e.updateQueue;
        eo = !1;
        var a = i.firstBaseUpdate,
          o = i.lastBaseUpdate,
          s = i.shared.pending;
        if (s !== null) {
          i.shared.pending = null;
          var c = s,
            l = c.next;
          ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
          var u = e.alternate;
          u !== null &&
            ((u = u.updateQueue),
            (s = u.lastBaseUpdate),
            s !== o &&
              (s === null ? (u.firstBaseUpdate = l) : (s.next = l),
              (u.lastBaseUpdate = c)));
        }
        if (a !== null) {
          var d = i.baseState;
          ((o = 0), (u = l = c = null), (s = a));
          do {
            var f = s.lane,
              p = s.eventTime;
            if ((r & f) === f) {
              u !== null &&
                (u = u.next =
                  {
                    eventTime: p,
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null,
                  });
              a: {
                var m = e,
                  h = s;
                switch (((f = t), (p = n), h.tag)) {
                  case 1:
                    if (((m = h.payload), typeof m == `function`)) {
                      d = m.call(p, d, f);
                      break a;
                    }
                    d = m;
                    break a;
                  case 3:
                    m.flags = (m.flags & -65537) | 128;
                  case 0:
                    if (
                      ((m = h.payload),
                      (f = typeof m == `function` ? m.call(p, d, f) : m),
                      f == null)
                    )
                      break a;
                    d = P({}, d, f);
                    break a;
                  case 2:
                    eo = !0;
                }
              }
              s.callback !== null &&
                s.lane !== 0 &&
                ((e.flags |= 64),
                (f = i.effects),
                f === null ? (i.effects = [s]) : f.push(s));
            } else
              ((p = {
                eventTime: p,
                lane: f,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null,
              }),
                u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
                (o |= f));
            if (((s = s.next), s === null)) {
              if (((s = i.shared.pending), s === null)) break;
              ((f = s),
                (s = f.next),
                (f.next = null),
                (i.lastBaseUpdate = f),
                (i.shared.pending = null));
            }
          } while (1);
          if (
            (u === null && (c = d),
            (i.baseState = c),
            (i.firstBaseUpdate = l),
            (i.lastBaseUpdate = u),
            (t = i.shared.interleaved),
            t !== null)
          ) {
            i = t;
            do ((o |= i.lane), (i = i.next));
            while (i !== t);
          } else a === null && (i.shared.lanes = 0);
          ((Jc |= o), (e.lanes = o), (e.memoizedState = d));
        }
      }
      function co(e, t, n) {
        if (((e = t.effects), (t.effects = null), e !== null))
          for (t = 0; t < e.length; t++) {
            var i = e[t],
              a = i.callback;
            if (a !== null) {
              if (((i.callback = null), (i = n), typeof a != `function`))
                throw Error(r(191, a));
              a.call(i);
            }
          }
      }
      var lo = {},
        uo = Ki(lo),
        fo = Ki(lo),
        po = Ki(lo);
      function mo(e) {
        if (e === lo) throw Error(r(174));
        return e;
      }
      function ho(e, t) {
        switch ((U(po, t), U(fo, e), U(uo, lo), (e = t.nodeType), e)) {
          case 9:
          case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Ae(null, ``);
            break;
          default:
            ((e = e === 8 ? t.parentNode : t),
              (t = e.namespaceURI || null),
              (e = e.tagName),
              (t = Ae(t, e)));
        }
        (H(uo), U(uo, t));
      }
      function go() {
        (H(uo), H(fo), H(po));
      }
      function _o(e) {
        mo(po.current);
        var t = mo(uo.current),
          n = Ae(t, e.type);
        t !== n && (U(fo, e), U(uo, n));
      }
      function vo(e) {
        fo.current === e && (H(uo), H(fo));
      }
      var K = Ki(0);
      function yo(e) {
        for (var t = e; t !== null; ) {
          if (t.tag === 13) {
            var n = t.memoizedState;
            if (
              n !== null &&
              ((n = n.dehydrated),
              n === null || n.data === `$?` || n.data === `$!`)
            )
              return t;
          } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
          } else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
        return null;
      }
      var bo = [];
      function xo() {
        for (var e = 0; e < bo.length; e++)
          bo[e]._workInProgressVersionPrimary = null;
        bo.length = 0;
      }
      var So = C.ReactCurrentDispatcher,
        Co = C.ReactCurrentBatchConfig,
        wo = 0,
        q = null,
        To = null,
        Eo = null,
        Do = !1,
        Oo = !1,
        ko = 0,
        Ao = 0;
      function jo() {
        throw Error(r(321));
      }
      function Mo(e, t) {
        if (t === null) return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
          if (!Nr(e[n], t[n])) return !1;
        return !0;
      }
      function No(e, t, n, i, a, o) {
        if (
          ((wo = o),
          (q = t),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.lanes = 0),
          (So.current = e === null || e.memoizedState === null ? ms : hs),
          (e = n(i, a)),
          Oo)
        ) {
          o = 0;
          do {
            if (((Oo = !1), (ko = 0), 25 <= o)) throw Error(r(301));
            ((o += 1),
              (Eo = To = null),
              (t.updateQueue = null),
              (So.current = gs),
              (e = n(i, a)));
          } while (Oo);
        }
        if (
          ((So.current = ps),
          (t = To !== null && To.next !== null),
          (wo = 0),
          (Eo = To = q = null),
          (Do = !1),
          t)
        )
          throw Error(r(300));
        return e;
      }
      function Po() {
        var e = ko !== 0;
        return ((ko = 0), e);
      }
      function Fo() {
        var e = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null,
        };
        return (
          Eo === null ? (q.memoizedState = Eo = e) : (Eo = Eo.next = e),
          Eo
        );
      }
      function Io() {
        if (To === null) {
          var e = q.alternate;
          e = e === null ? null : e.memoizedState;
        } else e = To.next;
        var t = Eo === null ? q.memoizedState : Eo.next;
        if (t !== null) ((Eo = t), (To = e));
        else {
          if (e === null) throw Error(r(310));
          ((To = e),
            (e = {
              memoizedState: To.memoizedState,
              baseState: To.baseState,
              baseQueue: To.baseQueue,
              queue: To.queue,
              next: null,
            }),
            Eo === null ? (q.memoizedState = Eo = e) : (Eo = Eo.next = e));
        }
        return Eo;
      }
      function Lo(e, t) {
        return typeof t == `function` ? t(e) : t;
      }
      function Ro(e) {
        var t = Io(),
          n = t.queue;
        if (n === null) throw Error(r(311));
        n.lastRenderedReducer = e;
        var i = To,
          a = i.baseQueue,
          o = n.pending;
        if (o !== null) {
          if (a !== null) {
            var s = a.next;
            ((a.next = o.next), (o.next = s));
          }
          ((i.baseQueue = a = o), (n.pending = null));
        }
        if (a !== null) {
          ((o = a.next), (i = i.baseState));
          var c = (s = null),
            l = null,
            u = o;
          do {
            var d = u.lane;
            if ((wo & d) === d)
              (l !== null &&
                (l = l.next =
                  {
                    lane: 0,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                  }),
                (i = u.hasEagerState ? u.eagerState : e(i, u.action)));
            else {
              var f = {
                lane: d,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              };
              (l === null ? ((c = l = f), (s = i)) : (l = l.next = f),
                (q.lanes |= d),
                (Jc |= d));
            }
            u = u.next;
          } while (u !== null && u !== o);
          (l === null ? (s = i) : (l.next = c),
            Nr(i, t.memoizedState) || (Ps = !0),
            (t.memoizedState = i),
            (t.baseState = s),
            (t.baseQueue = l),
            (n.lastRenderedState = i));
        }
        if (((e = n.interleaved), e !== null)) {
          a = e;
          do ((o = a.lane), (q.lanes |= o), (Jc |= o), (a = a.next));
          while (a !== e);
        } else a === null && (n.lanes = 0);
        return [t.memoizedState, n.dispatch];
      }
      function zo(e) {
        var t = Io(),
          n = t.queue;
        if (n === null) throw Error(r(311));
        n.lastRenderedReducer = e;
        var i = n.dispatch,
          a = n.pending,
          o = t.memoizedState;
        if (a !== null) {
          n.pending = null;
          var s = (a = a.next);
          do ((o = e(o, s.action)), (s = s.next));
          while (s !== a);
          (Nr(o, t.memoizedState) || (Ps = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o));
        }
        return [o, i];
      }
      function Bo() {}
      function Vo(e, t) {
        var n = q,
          i = Io(),
          a = t(),
          o = !Nr(i.memoizedState, a);
        if (
          (o && ((i.memoizedState = a), (Ps = !0)),
          (i = i.queue),
          J(Wo.bind(null, n, i, e), [e]),
          i.getSnapshot !== t || o || (Eo !== null && Eo.memoizedState.tag & 1))
        ) {
          if (
            ((n.flags |= 2048),
            Jo(9, Uo.bind(null, n, i, a, t), void 0, null),
            Vc === null)
          )
            throw Error(r(349));
          wo & 30 || Ho(n, t, a);
        }
        return a;
      }
      function Ho(e, t, n) {
        ((e.flags |= 16384),
          (e = { getSnapshot: t, value: n }),
          (t = q.updateQueue),
          t === null
            ? ((t = { lastEffect: null, stores: null }),
              (q.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
      }
      function Uo(e, t, n, r) {
        ((t.value = n), (t.getSnapshot = r), Go(t) && Ko(e));
      }
      function Wo(e, t, n) {
        return n(function () {
          Go(t) && Ko(e);
        });
      }
      function Go(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var n = t();
          return !Nr(e, n);
        } catch {
          return !0;
        }
      }
      function Ko(e) {
        var t = $a(e, 1);
        t !== null && ml(t, e, 1, -1);
      }
      function qo(e) {
        var t = Fo();
        return (
          typeof e == `function` && (e = e()),
          (t.memoizedState = t.baseState = e),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Lo,
            lastRenderedState: e,
          }),
          (t.queue = e),
          (e = e.dispatch = ls.bind(null, q, e)),
          [t.memoizedState, e]
        );
      }
      function Jo(e, t, n, r) {
        return (
          (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
          (t = q.updateQueue),
          t === null
            ? ((t = { lastEffect: null, stores: null }),
              (q.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                ? (t.lastEffect = e.next = e)
                : ((r = n.next),
                  (n.next = e),
                  (e.next = r),
                  (t.lastEffect = e))),
          e
        );
      }
      function Yo() {
        return Io().memoizedState;
      }
      function Xo(e, t, n, r) {
        var i = Fo();
        ((q.flags |= e),
          (i.memoizedState = Jo(1 | t, n, void 0, r === void 0 ? null : r)));
      }
      function Zo(e, t, n, r) {
        var i = Io();
        r = r === void 0 ? null : r;
        var a = void 0;
        if (To !== null) {
          var o = To.memoizedState;
          if (((a = o.destroy), r !== null && Mo(r, o.deps))) {
            i.memoizedState = Jo(t, n, a, r);
            return;
          }
        }
        ((q.flags |= e), (i.memoizedState = Jo(1 | t, n, a, r)));
      }
      function Qo(e, t) {
        return Xo(8390656, 8, e, t);
      }
      function J(e, t) {
        return Zo(2048, 8, e, t);
      }
      function $o(e, t) {
        return Zo(4, 2, e, t);
      }
      function Y(e, t) {
        return Zo(4, 4, e, t);
      }
      function es(e, t) {
        if (typeof t == `function`)
          return (
            (e = e()),
            t(e),
            function () {
              t(null);
            }
          );
        if (t != null)
          return (
            (e = e()),
            (t.current = e),
            function () {
              t.current = null;
            }
          );
      }
      function ts(e, t, n) {
        return (
          (n = n == null ? null : n.concat([e])),
          Zo(4, 4, es.bind(null, t, e), n)
        );
      }
      function ns() {}
      function rs(e, t) {
        var n = Io();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        return r !== null && t !== null && Mo(t, r[1])
          ? r[0]
          : ((n.memoizedState = [e, t]), e);
      }
      function is(e, t) {
        var n = Io();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        return r !== null && t !== null && Mo(t, r[1])
          ? r[0]
          : ((e = e()), (n.memoizedState = [e, t]), e);
      }
      function as(e, t, n) {
        return wo & 21
          ? (Nr(n, t) ||
              ((n = Vt()), (q.lanes |= n), (Jc |= n), (e.baseState = !0)),
            t)
          : (e.baseState && ((e.baseState = !1), (Ps = !0)),
            (e.memoizedState = n));
      }
      function os(e, t) {
        var n = I;
        ((I = n !== 0 && 4 > n ? n : 4), e(!0));
        var r = Co.transition;
        Co.transition = {};
        try {
          (e(!1), t());
        } finally {
          ((I = n), (Co.transition = r));
        }
      }
      function ss() {
        return Io().memoizedState;
      }
      function cs(e, t, n) {
        var r = pl(e);
        if (
          ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
          us(e))
        )
          ds(t, n);
        else if (((n = Qa(e, t, n, r)), n !== null)) {
          var i = fl();
          (ml(n, e, r, i), fs(n, t, r));
        }
      }
      function ls(e, t, n) {
        var r = pl(e),
          i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          };
        if (us(e)) ds(t, i);
        else {
          var a = e.alternate;
          if (
            e.lanes === 0 &&
            (a === null || a.lanes === 0) &&
            ((a = t.lastRenderedReducer), a !== null)
          )
            try {
              var o = t.lastRenderedState,
                s = a(o, n);
              if (((i.hasEagerState = !0), (i.eagerState = s), Nr(s, o))) {
                var c = t.interleaved;
                (c === null
                  ? ((i.next = i), Za(t))
                  : ((i.next = c.next), (c.next = i)),
                  (t.interleaved = i));
                return;
              }
            } catch {}
          ((n = Qa(e, t, i, r)),
            n !== null && ((i = fl()), ml(n, e, r, i), fs(n, t, r)));
        }
      }
      function us(e) {
        var t = e.alternate;
        return e === q || (t !== null && t === q);
      }
      function ds(e, t) {
        Oo = Do = !0;
        var n = e.pending;
        (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (e.pending = t));
      }
      function fs(e, t, n) {
        if (n & 4194240) {
          var r = t.lanes;
          ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Gt(e, n));
        }
      }
      var ps = {
          readContext: Ya,
          useCallback: jo,
          useContext: jo,
          useEffect: jo,
          useImperativeHandle: jo,
          useInsertionEffect: jo,
          useLayoutEffect: jo,
          useMemo: jo,
          useReducer: jo,
          useRef: jo,
          useState: jo,
          useDebugValue: jo,
          useDeferredValue: jo,
          useTransition: jo,
          useMutableSource: jo,
          useSyncExternalStore: jo,
          useId: jo,
          unstable_isNewReconciler: !1,
        },
        ms = {
          readContext: Ya,
          useCallback: function (e, t) {
            return ((Fo().memoizedState = [e, t === void 0 ? null : t]), e);
          },
          useContext: Ya,
          useEffect: Qo,
          useImperativeHandle: function (e, t, n) {
            return (
              (n = n == null ? null : n.concat([e])),
              Xo(4194308, 4, es.bind(null, t, e), n)
            );
          },
          useLayoutEffect: function (e, t) {
            return Xo(4194308, 4, e, t);
          },
          useInsertionEffect: function (e, t) {
            return Xo(4, 2, e, t);
          },
          useMemo: function (e, t) {
            var n = Fo();
            return (
              (t = t === void 0 ? null : t),
              (e = e()),
              (n.memoizedState = [e, t]),
              e
            );
          },
          useReducer: function (e, t, n) {
            var r = Fo();
            return (
              (t = n === void 0 ? t : n(t)),
              (r.memoizedState = r.baseState = t),
              (e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t,
              }),
              (r.queue = e),
              (e = e.dispatch = cs.bind(null, q, e)),
              [r.memoizedState, e]
            );
          },
          useRef: function (e) {
            var t = Fo();
            return ((e = { current: e }), (t.memoizedState = e));
          },
          useState: qo,
          useDebugValue: ns,
          useDeferredValue: function (e) {
            return (Fo().memoizedState = e);
          },
          useTransition: function () {
            var e = qo(!1),
              t = e[0];
            return (
              (e = os.bind(null, e[1])),
              (Fo().memoizedState = e),
              [t, e]
            );
          },
          useMutableSource: function () {},
          useSyncExternalStore: function (e, t, n) {
            var i = q,
              a = Fo();
            if (G) {
              if (n === void 0) throw Error(r(407));
              n = n();
            } else {
              if (((n = t()), Vc === null)) throw Error(r(349));
              wo & 30 || Ho(i, t, n);
            }
            a.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
              (a.queue = o),
              Qo(Wo.bind(null, i, o, e), [e]),
              (i.flags |= 2048),
              Jo(9, Uo.bind(null, i, o, n, t), void 0, null),
              n
            );
          },
          useId: function () {
            var e = Fo(),
              t = Vc.identifierPrefix;
            if (G) {
              var n = _a,
                r = ga;
              ((n = (r & ~(1 << (32 - At(r) - 1))).toString(32) + n),
                (t = `:` + t + `R` + n),
                (n = ko++),
                0 < n && (t += `H` + n.toString(32)),
                (t += `:`));
            } else ((n = Ao++), (t = `:` + t + `r` + n.toString(32) + `:`));
            return (e.memoizedState = t);
          },
          unstable_isNewReconciler: !1,
        },
        hs = {
          readContext: Ya,
          useCallback: rs,
          useContext: Ya,
          useEffect: J,
          useImperativeHandle: ts,
          useInsertionEffect: $o,
          useLayoutEffect: Y,
          useMemo: is,
          useReducer: Ro,
          useRef: Yo,
          useState: function () {
            return Ro(Lo);
          },
          useDebugValue: ns,
          useDeferredValue: function (e) {
            return as(Io(), To.memoizedState, e);
          },
          useTransition: function () {
            return [Ro(Lo)[0], Io().memoizedState];
          },
          useMutableSource: Bo,
          useSyncExternalStore: Vo,
          useId: ss,
          unstable_isNewReconciler: !1,
        },
        gs = {
          readContext: Ya,
          useCallback: rs,
          useContext: Ya,
          useEffect: J,
          useImperativeHandle: ts,
          useInsertionEffect: $o,
          useLayoutEffect: Y,
          useMemo: is,
          useReducer: zo,
          useRef: Yo,
          useState: function () {
            return zo(Lo);
          },
          useDebugValue: ns,
          useDeferredValue: function (e) {
            var t = Io();
            return To === null
              ? (t.memoizedState = e)
              : as(t, To.memoizedState, e);
          },
          useTransition: function () {
            return [zo(Lo)[0], Io().memoizedState];
          },
          useMutableSource: Bo,
          useSyncExternalStore: Vo,
          useId: ss,
          unstable_isNewReconciler: !1,
        };
      function _s(e, t) {
        if (e && e.defaultProps) {
          for (var n in ((t = P({}, t)), (e = e.defaultProps), e))
            t[n] === void 0 && (t[n] = e[n]);
          return t;
        }
        return t;
      }
      function vs(e, t, n, r) {
        ((t = e.memoizedState),
          (n = n(r, t)),
          (n = n == null ? t : P({}, t, n)),
          (e.memoizedState = n),
          e.lanes === 0 && (e.updateQueue.baseState = n));
      }
      var ys = {
        isMounted: function (e) {
          return (e = e._reactInternals) ? ut(e) === e : !1;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternals;
          var r = fl(),
            i = pl(e),
            a = ro(r, i);
          ((a.payload = t),
            n != null && (a.callback = n),
            (t = io(e, a, i)),
            t !== null && (ml(t, e, i, r), ao(t, e, i)));
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternals;
          var r = fl(),
            i = pl(e),
            a = ro(r, i);
          ((a.tag = 1),
            (a.payload = t),
            n != null && (a.callback = n),
            (t = io(e, a, i)),
            t !== null && (ml(t, e, i, r), ao(t, e, i)));
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternals;
          var n = fl(),
            r = pl(e),
            i = ro(n, r);
          ((i.tag = 2),
            t != null && (i.callback = t),
            (t = io(e, i, r)),
            t !== null && (ml(t, e, r, n), ao(t, e, r)));
        },
      };
      function bs(e, t, n, r, i, a, o) {
        return (
          (e = e.stateNode),
          typeof e.shouldComponentUpdate == `function`
            ? e.shouldComponentUpdate(r, a, o)
            : t.prototype && t.prototype.isPureReactComponent
              ? !Pr(n, r) || !Pr(i, a)
              : !0
        );
      }
      function xs(e, t, n) {
        var r = !1,
          i = qi,
          a = t.contextType;
        return (
          typeof a == `object` && a
            ? (a = Ya(a))
            : ((i = Zi(t) ? Yi : W.current),
              (r = t.contextTypes),
              (a = (r = r != null) ? Xi(e, i) : qi)),
          (t = new t(n, a)),
          (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
          (t.updater = ys),
          (e.stateNode = t),
          (t._reactInternals = e),
          r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = a)),
          t
        );
      }
      function Ss(e, t, n, r) {
        ((e = t.state),
          typeof t.componentWillReceiveProps == `function` &&
            t.componentWillReceiveProps(n, r),
          typeof t.UNSAFE_componentWillReceiveProps == `function` &&
            t.UNSAFE_componentWillReceiveProps(n, r),
          t.state !== e && ys.enqueueReplaceState(t, t.state, null));
      }
      function Cs(e, t, n, r) {
        var i = e.stateNode;
        ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), to(e));
        var a = t.contextType;
        (typeof a == `object` && a
          ? (i.context = Ya(a))
          : ((a = Zi(t) ? Yi : W.current), (i.context = Xi(e, a))),
          (i.state = e.memoizedState),
          (a = t.getDerivedStateFromProps),
          typeof a == `function` &&
            (vs(e, t, a, n), (i.state = e.memoizedState)),
          typeof t.getDerivedStateFromProps == `function` ||
            typeof i.getSnapshotBeforeUpdate == `function` ||
            (typeof i.UNSAFE_componentWillMount != `function` &&
              typeof i.componentWillMount != `function`) ||
            ((t = i.state),
            typeof i.componentWillMount == `function` && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == `function` &&
              i.UNSAFE_componentWillMount(),
            t !== i.state && ys.enqueueReplaceState(i, i.state, null),
            so(e, n, i, r),
            (i.state = e.memoizedState)),
          typeof i.componentDidMount == `function` && (e.flags |= 4194308));
      }
      function ws(e, t) {
        try {
          var n = ``,
            r = t;
          do ((n += le(r)), (r = r.return));
          while (r);
          var i = n;
        } catch (e) {
          i =
            `
Error generating stack: ` +
            e.message +
            `
` +
            e.stack;
        }
        return { value: e, source: t, stack: i, digest: null };
      }
      function Ts(e, t, n) {
        return { value: e, source: null, stack: n ?? null, digest: t ?? null };
      }
      function Es(e, t) {
        try {
          console.error(t.value);
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
      var Ds = typeof WeakMap == `function` ? WeakMap : Map;
      function Os(e, t, n) {
        ((n = ro(-1, n)), (n.tag = 3), (n.payload = { element: null }));
        var r = t.value;
        return (
          (n.callback = function () {
            (nl || ((nl = !0), (rl = r)), Es(e, t));
          }),
          n
        );
      }
      function ks(e, t, n) {
        ((n = ro(-1, n)), (n.tag = 3));
        var r = e.type.getDerivedStateFromError;
        if (typeof r == `function`) {
          var i = t.value;
          ((n.payload = function () {
            return r(i);
          }),
            (n.callback = function () {
              Es(e, t);
            }));
        }
        var a = e.stateNode;
        return (
          a !== null &&
            typeof a.componentDidCatch == `function` &&
            (n.callback = function () {
              (Es(e, t),
                typeof r != `function` &&
                  (il === null ? (il = new Set([this])) : il.add(this)));
              var n = t.stack;
              this.componentDidCatch(t.value, {
                componentStack: n === null ? `` : n,
              });
            }),
          n
        );
      }
      function As(e, t, n) {
        var r = e.pingCache;
        if (r === null) {
          r = e.pingCache = new Ds();
          var i = new Set();
          r.set(t, i);
        } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
        i.has(n) || (i.add(n), (e = zl.bind(null, e, t, n)), t.then(e, e));
      }
      function js(e) {
        do {
          var t;
          if (
            ((t = e.tag === 13) &&
              ((t = e.memoizedState),
              (t = t === null ? !0 : t.dehydrated !== null)),
            t)
          )
            return e;
          e = e.return;
        } while (e !== null);
        return null;
      }
      function Ms(e, t, n, r, i) {
        return e.mode & 1
          ? ((e.flags |= 65536), (e.lanes = i), e)
          : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                  (n.alternate === null
                    ? (n.tag = 17)
                    : ((t = ro(-1, 1)), (t.tag = 2), io(n, t, 1))),
                (n.lanes |= 1)),
            e);
      }
      var Ns = C.ReactCurrentOwner,
        Ps = !1;
      function Fs(e, t, n, r) {
        t.child = e === null ? Ba(t, null, n, r) : za(t, e.child, n, r);
      }
      function Is(e, t, n, r, i) {
        n = n.render;
        var a = t.ref;
        return (
          Ja(t, i),
          (r = No(e, t, n, r, a, i)),
          (n = Po()),
          e !== null && !Ps
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              tc(e, t, i))
            : (G && n && ba(t), (t.flags |= 1), Fs(e, t, r, i), t.child)
        );
      }
      function Ls(e, t, n, r, i) {
        if (e === null) {
          var a = n.type;
          return typeof a == `function` &&
            !ql(a) &&
            a.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = a), Rs(e, t, a, r, i))
            : ((e = Xl(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
        }
        if (((a = e.child), (e.lanes & i) === 0)) {
          var o = a.memoizedProps;
          if (
            ((n = n.compare),
            (n = n === null ? Pr : n),
            n(o, r) && e.ref === t.ref)
          )
            return tc(e, t, i);
        }
        return (
          (t.flags |= 1),
          (e = Yl(a, r)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e)
        );
      }
      function Rs(e, t, n, r, i) {
        if (e !== null) {
          var a = e.memoizedProps;
          if (Pr(a, r) && e.ref === t.ref)
            if (((Ps = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
              e.flags & 131072 && (Ps = !0);
            else return ((t.lanes = e.lanes), tc(e, t, i));
        }
        return Vs(e, t, n, r, i);
      }
      function zs(e, t, n) {
        var r = t.pendingProps,
          i = r.children,
          a = e === null ? null : e.memoizedState;
        if (r.mode === `hidden`)
          if (!(t.mode & 1))
            ((t.memoizedState = {
              baseLanes: 0,
              cachePool: null,
              transitions: null,
            }),
              U(Gc, Wc),
              (Wc |= n));
          else {
            if (!(n & 1073741824))
              return (
                (e = a === null ? n : a.baseLanes | n),
                (t.lanes = t.childLanes = 1073741824),
                (t.memoizedState = {
                  baseLanes: e,
                  cachePool: null,
                  transitions: null,
                }),
                (t.updateQueue = null),
                U(Gc, Wc),
                (Wc |= e),
                null
              );
            ((t.memoizedState = {
              baseLanes: 0,
              cachePool: null,
              transitions: null,
            }),
              (r = a === null ? n : a.baseLanes),
              U(Gc, Wc),
              (Wc |= r));
          }
        else
          (a === null
            ? (r = n)
            : ((r = a.baseLanes | n), (t.memoizedState = null)),
            U(Gc, Wc),
            (Wc |= r));
        return (Fs(e, t, i, n), t.child);
      }
      function Bs(e, t) {
        var n = t.ref;
        ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
          ((t.flags |= 512), (t.flags |= 2097152));
      }
      function Vs(e, t, n, r, i) {
        var a = Zi(n) ? Yi : W.current;
        return (
          (a = Xi(t, a)),
          Ja(t, i),
          (n = No(e, t, n, r, a, i)),
          (r = Po()),
          e !== null && !Ps
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              tc(e, t, i))
            : (G && r && ba(t), (t.flags |= 1), Fs(e, t, n, i), t.child)
        );
      }
      function Hs(e, t, n, r, i) {
        if (Zi(n)) {
          var a = !0;
          ta(t);
        } else a = !1;
        if ((Ja(t, i), t.stateNode === null))
          (ec(e, t), xs(t, n, r), Cs(t, n, r, i), (r = !0));
        else if (e === null) {
          var o = t.stateNode,
            s = t.memoizedProps;
          o.props = s;
          var c = o.context,
            l = n.contextType;
          typeof l == `object` && l
            ? (l = Ya(l))
            : ((l = Zi(n) ? Yi : W.current), (l = Xi(t, l)));
          var u = n.getDerivedStateFromProps,
            d =
              typeof u == `function` ||
              typeof o.getSnapshotBeforeUpdate == `function`;
          (d ||
            (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
              typeof o.componentWillReceiveProps != `function`) ||
            ((s !== r || c !== l) && Ss(t, o, r, l)),
            (eo = !1));
          var f = t.memoizedState;
          ((o.state = f),
            so(t, r, o, i),
            (c = t.memoizedState),
            s !== r || f !== c || Ji.current || eo
              ? (typeof u == `function` &&
                  (vs(t, n, u, r), (c = t.memoizedState)),
                (s = eo || bs(t, n, s, r, f, c, l))
                  ? (d ||
                      (typeof o.UNSAFE_componentWillMount != `function` &&
                        typeof o.componentWillMount != `function`) ||
                      (typeof o.componentWillMount == `function` &&
                        o.componentWillMount(),
                      typeof o.UNSAFE_componentWillMount == `function` &&
                        o.UNSAFE_componentWillMount()),
                    typeof o.componentDidMount == `function` &&
                      (t.flags |= 4194308))
                  : (typeof o.componentDidMount == `function` &&
                      (t.flags |= 4194308),
                    (t.memoizedProps = r),
                    (t.memoizedState = c)),
                (o.props = r),
                (o.state = c),
                (o.context = l),
                (r = s))
              : (typeof o.componentDidMount == `function` &&
                  (t.flags |= 4194308),
                (r = !1)));
        } else {
          ((o = t.stateNode),
            no(e, t),
            (s = t.memoizedProps),
            (l = t.type === t.elementType ? s : _s(t.type, s)),
            (o.props = l),
            (d = t.pendingProps),
            (f = o.context),
            (c = n.contextType),
            typeof c == `object` && c
              ? (c = Ya(c))
              : ((c = Zi(n) ? Yi : W.current), (c = Xi(t, c))));
          var p = n.getDerivedStateFromProps;
          ((u =
            typeof p == `function` ||
            typeof o.getSnapshotBeforeUpdate == `function`) ||
            (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
              typeof o.componentWillReceiveProps != `function`) ||
            ((s !== d || f !== c) && Ss(t, o, r, c)),
            (eo = !1),
            (f = t.memoizedState),
            (o.state = f),
            so(t, r, o, i));
          var m = t.memoizedState;
          s !== d || f !== m || Ji.current || eo
            ? (typeof p == `function` &&
                (vs(t, n, p, r), (m = t.memoizedState)),
              (l = eo || bs(t, n, l, r, f, m, c) || !1)
                ? (u ||
                    (typeof o.UNSAFE_componentWillUpdate != `function` &&
                      typeof o.componentWillUpdate != `function`) ||
                    (typeof o.componentWillUpdate == `function` &&
                      o.componentWillUpdate(r, m, c),
                    typeof o.UNSAFE_componentWillUpdate == `function` &&
                      o.UNSAFE_componentWillUpdate(r, m, c)),
                  typeof o.componentDidUpdate == `function` && (t.flags |= 4),
                  typeof o.getSnapshotBeforeUpdate == `function` &&
                    (t.flags |= 1024))
                : (typeof o.componentDidUpdate != `function` ||
                    (s === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 4),
                  typeof o.getSnapshotBeforeUpdate != `function` ||
                    (s === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 1024),
                  (t.memoizedProps = r),
                  (t.memoizedState = m)),
              (o.props = r),
              (o.state = m),
              (o.context = c),
              (r = l))
            : (typeof o.componentDidUpdate != `function` ||
                (s === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != `function` ||
                (s === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 1024),
              (r = !1));
        }
        return Us(e, t, n, r, a, i);
      }
      function Us(e, t, n, r, i, a) {
        Bs(e, t);
        var o = (t.flags & 128) != 0;
        if (!r && !o) return (i && na(t, n, !1), tc(e, t, a));
        ((r = t.stateNode), (Ns.current = t));
        var s =
          o && typeof n.getDerivedStateFromError != `function`
            ? null
            : r.render();
        return (
          (t.flags |= 1),
          e !== null && o
            ? ((t.child = za(t, e.child, null, a)),
              (t.child = za(t, null, s, a)))
            : Fs(e, t, s, a),
          (t.memoizedState = r.state),
          i && na(t, n, !0),
          t.child
        );
      }
      function Ws(e) {
        var t = e.stateNode;
        (t.pendingContext
          ? $i(e, t.pendingContext, t.pendingContext !== t.context)
          : t.context && $i(e, t.context, !1),
          ho(e, t.containerInfo));
      }
      function X(e, t, n, r, i) {
        return (Ma(), Na(i), (t.flags |= 256), Fs(e, t, n, r), t.child);
      }
      var Gs = { dehydrated: null, treeContext: null, retryLane: 0 };
      function Ks(e) {
        return { baseLanes: e, cachePool: null, transitions: null };
      }
      function qs(e, t, n) {
        var r = t.pendingProps,
          i = K.current,
          a = !1,
          o = (t.flags & 128) != 0,
          s;
        if (
          ((s = o) ||
            (s = e !== null && e.memoizedState === null ? !1 : (i & 2) != 0),
          s
            ? ((a = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
          U(K, i & 1),
          e === null)
        )
          return (
            Oa(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
              ? (t.mode & 1
                  ? e.data === `$!`
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824)
                  : (t.lanes = 1),
                null)
              : ((o = r.children),
                (e = r.fallback),
                a
                  ? ((r = t.mode),
                    (a = t.child),
                    (o = { mode: `hidden`, children: o }),
                    !(r & 1) && a !== null
                      ? ((a.childLanes = 0), (a.pendingProps = o))
                      : (a = Ql(o, r, 0, null)),
                    (e = Zl(e, r, n, null)),
                    (a.return = t),
                    (e.return = t),
                    (a.sibling = e),
                    (t.child = a),
                    (t.child.memoizedState = Ks(n)),
                    (t.memoizedState = Gs),
                    e)
                  : Js(t, o))
          );
        if (
          ((i = e.memoizedState),
          i !== null && ((s = i.dehydrated), s !== null))
        )
          return Xs(e, t, o, r, s, i, n);
        if (a) {
          ((a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling));
          var c = { mode: `hidden`, children: r.children };
          return (
            !(o & 1) && t.child !== i
              ? ((r = t.child),
                (r.childLanes = 0),
                (r.pendingProps = c),
                (t.deletions = null))
              : ((r = Yl(i, c)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
            s === null
              ? ((a = Zl(a, o, n, null)), (a.flags |= 2))
              : (a = Yl(s, a)),
            (a.return = t),
            (r.return = t),
            (r.sibling = a),
            (t.child = r),
            (r = a),
            (a = t.child),
            (o = e.child.memoizedState),
            (o =
              o === null
                ? Ks(n)
                : {
                    baseLanes: o.baseLanes | n,
                    cachePool: null,
                    transitions: o.transitions,
                  }),
            (a.memoizedState = o),
            (a.childLanes = e.childLanes & ~n),
            (t.memoizedState = Gs),
            r
          );
        }
        return (
          (a = e.child),
          (e = a.sibling),
          (r = Yl(a, { mode: `visible`, children: r.children })),
          !(t.mode & 1) && (r.lanes = n),
          (r.return = t),
          (r.sibling = null),
          e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
          (t.child = r),
          (t.memoizedState = null),
          r
        );
      }
      function Js(e, t) {
        return (
          (t = Ql({ mode: `visible`, children: t }, e.mode, 0, null)),
          (t.return = e),
          (e.child = t)
        );
      }
      function Ys(e, t, n, r) {
        return (
          r !== null && Na(r),
          za(t, e.child, null, n),
          (e = Js(t, t.pendingProps.children)),
          (e.flags |= 2),
          (t.memoizedState = null),
          e
        );
      }
      function Xs(e, t, n, i, a, o, s) {
        if (n)
          return t.flags & 256
            ? ((t.flags &= -257), (i = Ts(Error(r(422)))), Ys(e, t, s, i))
            : t.memoizedState === null
              ? ((o = i.fallback),
                (a = t.mode),
                (i = Ql({ mode: `visible`, children: i.children }, a, 0, null)),
                (o = Zl(o, a, s, null)),
                (o.flags |= 2),
                (i.return = t),
                (o.return = t),
                (i.sibling = o),
                (t.child = i),
                t.mode & 1 && za(t, e.child, null, s),
                (t.child.memoizedState = Ks(s)),
                (t.memoizedState = Gs),
                o)
              : ((t.child = e.child), (t.flags |= 128), null);
        if (!(t.mode & 1)) return Ys(e, t, s, null);
        if (a.data === `$!`) {
          if (((i = a.nextSibling && a.nextSibling.dataset), i)) var c = i.dgst;
          return (
            (i = c),
            (o = Error(r(419))),
            (i = Ts(o, i, void 0)),
            Ys(e, t, s, i)
          );
        }
        if (((c = (s & e.childLanes) !== 0), Ps || c)) {
          if (((i = Vc), i !== null)) {
            switch (s & -s) {
              case 4:
                a = 2;
                break;
              case 16:
                a = 8;
                break;
              case 64:
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
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                a = 32;
                break;
              case 536870912:
                a = 268435456;
                break;
              default:
                a = 0;
            }
            ((a = (a & (i.suspendedLanes | s)) === 0 ? a : 0),
              a !== 0 &&
                a !== o.retryLane &&
                ((o.retryLane = a), $a(e, a), ml(i, e, a, -1)));
          }
          return (Ol(), (i = Ts(Error(r(421)))), Ys(e, t, s, i));
        }
        return a.data === `$?`
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = Vl.bind(null, e)),
            (a._reactRetry = t),
            null)
          : ((e = o.treeContext),
            (Ca = Ni(a.nextSibling)),
            (Sa = t),
            (G = !0),
            (wa = null),
            e !== null &&
              ((pa[ma++] = ga),
              (pa[ma++] = _a),
              (pa[ma++] = ha),
              (ga = e.id),
              (_a = e.overflow),
              (ha = t)),
            (t = Js(t, i.children)),
            (t.flags |= 4096),
            t);
      }
      function Zs(e, t, n) {
        e.lanes |= t;
        var r = e.alternate;
        (r !== null && (r.lanes |= t), qa(e.return, t, n));
      }
      function Qs(e, t, n, r, i) {
        var a = e.memoizedState;
        a === null
          ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i,
            })
          : ((a.isBackwards = t),
            (a.rendering = null),
            (a.renderingStartTime = 0),
            (a.last = r),
            (a.tail = n),
            (a.tailMode = i));
      }
      function $s(e, t, n) {
        var r = t.pendingProps,
          i = r.revealOrder,
          a = r.tail;
        if ((Fs(e, t, r.children, n), (r = K.current), r & 2))
          ((r = (r & 1) | 2), (t.flags |= 128));
        else {
          if (e !== null && e.flags & 128)
            a: for (e = t.child; e !== null; ) {
              if (e.tag === 13) e.memoizedState !== null && Zs(e, n, t);
              else if (e.tag === 19) Zs(e, n, t);
              else if (e.child !== null) {
                ((e.child.return = e), (e = e.child));
                continue;
              }
              if (e === t) break a;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t) break a;
                e = e.return;
              }
              ((e.sibling.return = e.return), (e = e.sibling));
            }
          r &= 1;
        }
        if ((U(K, r), !(t.mode & 1))) t.memoizedState = null;
        else
          switch (i) {
            case `forwards`:
              for (n = t.child, i = null; n !== null; )
                ((e = n.alternate),
                  e !== null && yo(e) === null && (i = n),
                  (n = n.sibling));
              ((n = i),
                n === null
                  ? ((i = t.child), (t.child = null))
                  : ((i = n.sibling), (n.sibling = null)),
                Qs(t, !1, i, n, a));
              break;
            case `backwards`:
              for (n = null, i = t.child, t.child = null; i !== null; ) {
                if (((e = i.alternate), e !== null && yo(e) === null)) {
                  t.child = i;
                  break;
                }
                ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
              }
              Qs(t, !0, n, null, a);
              break;
            case `together`:
              Qs(t, !1, null, null, void 0);
              break;
            default:
              t.memoizedState = null;
          }
        return t.child;
      }
      function ec(e, t) {
        !(t.mode & 1) &&
          e !== null &&
          ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
      }
      function tc(e, t, n) {
        if (
          (e !== null && (t.dependencies = e.dependencies),
          (Jc |= t.lanes),
          (n & t.childLanes) === 0)
        )
          return null;
        if (e !== null && t.child !== e.child) throw Error(r(153));
        if (t.child !== null) {
          for (
            e = t.child, n = Yl(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;
          )
            ((e = e.sibling),
              (n = n.sibling = Yl(e, e.pendingProps)),
              (n.return = t));
          n.sibling = null;
        }
        return t.child;
      }
      function nc(e, t, n) {
        switch (t.tag) {
          case 3:
            (Ws(t), Ma());
            break;
          case 5:
            _o(t);
            break;
          case 1:
            Zi(t.type) && ta(t);
            break;
          case 4:
            ho(t, t.stateNode.containerInfo);
            break;
          case 10:
            var r = t.type._context,
              i = t.memoizedProps.value;
            (U(Va, r._currentValue), (r._currentValue = i));
            break;
          case 13:
            if (((r = t.memoizedState), r !== null))
              return r.dehydrated === null
                ? (n & t.child.childLanes) === 0
                  ? (U(K, K.current & 1),
                    (e = tc(e, t, n)),
                    e === null ? null : e.sibling)
                  : qs(e, t, n)
                : (U(K, K.current & 1), (t.flags |= 128), null);
            U(K, K.current & 1);
            break;
          case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
              if (r) return $s(e, t, n);
              t.flags |= 128;
            }
            if (
              ((i = t.memoizedState),
              i !== null &&
                ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
              U(K, K.current),
              r)
            )
              break;
            return null;
          case 22:
          case 23:
            return ((t.lanes = 0), zs(e, t, n));
        }
        return tc(e, t, n);
      }
      var rc = function (e, t) {
          for (var n = t.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.child !== null) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === t) break;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) return;
              n = n.return;
            }
            ((n.sibling.return = n.return), (n = n.sibling));
          }
        },
        ic = function (e, t, n, r) {
          var i = e.memoizedProps;
          if (i !== r) {
            ((e = t.stateNode), mo(uo.current));
            var o = null;
            switch (n) {
              case `input`:
                ((i = ve(e, i)), (r = ve(e, r)), (o = []));
                break;
              case `select`:
                ((i = P({}, i, { value: void 0 })),
                  (r = P({}, r, { value: void 0 })),
                  (o = []));
                break;
              case `textarea`:
                ((i = Ee(e, i)), (r = Ee(e, r)), (o = []));
                break;
              default:
                typeof i.onClick != `function` &&
                  typeof r.onClick == `function` &&
                  (e.onclick = wi);
            }
            ze(n, r);
            var s;
            for (u in ((n = null), i))
              if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
                if (u === `style`) {
                  var c = i[u];
                  for (s in c) c.hasOwnProperty(s) && ((n ||= {}), (n[s] = ``));
                } else
                  u !== `dangerouslySetInnerHTML` &&
                    u !== `children` &&
                    u !== `suppressContentEditableWarning` &&
                    u !== `suppressHydrationWarning` &&
                    u !== `autoFocus` &&
                    (a.hasOwnProperty(u)
                      ? (o ||= [])
                      : (o ||= []).push(u, null));
            for (u in r) {
              var l = r[u];
              if (
                ((c = i?.[u]),
                r.hasOwnProperty(u) && l !== c && (l != null || c != null))
              )
                if (u === `style`)
                  if (c) {
                    for (s in c)
                      !c.hasOwnProperty(s) ||
                        (l && l.hasOwnProperty(s)) ||
                        ((n ||= {}), (n[s] = ``));
                    for (s in l)
                      l.hasOwnProperty(s) &&
                        c[s] !== l[s] &&
                        ((n ||= {}), (n[s] = l[s]));
                  } else (n || ((o ||= []), o.push(u, n)), (n = l));
                else
                  u === `dangerouslySetInnerHTML`
                    ? ((l = l ? l.__html : void 0),
                      (c = c ? c.__html : void 0),
                      l != null && c !== l && (o ||= []).push(u, l))
                    : u === `children`
                      ? (typeof l != `string` && typeof l != `number`) ||
                        (o ||= []).push(u, `` + l)
                      : u !== `suppressContentEditableWarning` &&
                        u !== `suppressHydrationWarning` &&
                        (a.hasOwnProperty(u)
                          ? (l != null && u === `onScroll` && R(`scroll`, e),
                            o || c === l || (o = []))
                          : (o ||= []).push(u, l));
            }
            n && (o ||= []).push(`style`, n);
            var u = o;
            (t.updateQueue = u) && (t.flags |= 4);
          }
        },
        ac = function (e, t, n, r) {
          n !== r && (t.flags |= 4);
        };
      function oc(e, t) {
        if (!G)
          switch (e.tailMode) {
            case `hidden`:
              t = e.tail;
              for (var n = null; t !== null; )
                (t.alternate !== null && (n = t), (t = t.sibling));
              n === null ? (e.tail = null) : (n.sibling = null);
              break;
            case `collapsed`:
              n = e.tail;
              for (var r = null; n !== null; )
                (n.alternate !== null && (r = n), (n = n.sibling));
              r === null
                ? t || e.tail === null
                  ? (e.tail = null)
                  : (e.tail.sibling = null)
                : (r.sibling = null);
          }
      }
      function sc(e) {
        var t = e.alternate !== null && e.alternate.child === e.child,
          n = 0,
          r = 0;
        if (t)
          for (var i = e.child; i !== null; )
            ((n |= i.lanes | i.childLanes),
              (r |= i.subtreeFlags & 14680064),
              (r |= i.flags & 14680064),
              (i.return = e),
              (i = i.sibling));
        else
          for (i = e.child; i !== null; )
            ((n |= i.lanes | i.childLanes),
              (r |= i.subtreeFlags),
              (r |= i.flags),
              (i.return = e),
              (i = i.sibling));
        return ((e.subtreeFlags |= r), (e.childLanes = n), t);
      }
      function cc(e, t, n) {
        var i = t.pendingProps;
        switch ((xa(t), t.tag)) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return (sc(t), null);
          case 1:
            return (Zi(t.type) && Qi(), sc(t), null);
          case 3:
            return (
              (i = t.stateNode),
              go(),
              H(Ji),
              H(W),
              xo(),
              i.pendingContext &&
                ((i.context = i.pendingContext), (i.pendingContext = null)),
              (e === null || e.child === null) &&
                (Aa(t)
                  ? (t.flags |= 4)
                  : e === null ||
                    (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                    ((t.flags |= 1024), wa !== null && (vl(wa), (wa = null)))),
              sc(t),
              null
            );
          case 5:
            vo(t);
            var o = mo(po.current);
            if (((n = t.type), e !== null && t.stateNode != null))
              (ic(e, t, n, i, o),
                e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
            else {
              if (!i) {
                if (t.stateNode === null) throw Error(r(166));
                return (sc(t), null);
              }
              if (((e = mo(uo.current)), Aa(t))) {
                ((i = t.stateNode), (n = t.type));
                var s = t.memoizedProps;
                switch (
                  ((i[Ii] = t), (i[Li] = s), (e = (t.mode & 1) != 0), n)
                ) {
                  case `dialog`:
                    (R(`cancel`, i), R(`close`, i));
                    break;
                  case `iframe`:
                  case `object`:
                  case `embed`:
                    R(`load`, i);
                    break;
                  case `video`:
                  case `audio`:
                    for (o = 0; o < si.length; o++) R(si[o], i);
                    break;
                  case `source`:
                    R(`error`, i);
                    break;
                  case `img`:
                  case `image`:
                  case `link`:
                    (R(`error`, i), R(`load`, i));
                    break;
                  case `details`:
                    R(`toggle`, i);
                    break;
                  case `input`:
                    (ye(i, s), R(`invalid`, i));
                    break;
                  case `select`:
                    ((i._wrapperState = { wasMultiple: !!s.multiple }),
                      R(`invalid`, i));
                    break;
                  case `textarea`:
                    (De(i, s), R(`invalid`, i));
                }
                for (var c in (ze(n, s), (o = null), s))
                  if (s.hasOwnProperty(c)) {
                    var l = s[c];
                    c === `children`
                      ? typeof l == `string`
                        ? i.textContent !== l &&
                          (!0 !== s.suppressHydrationWarning &&
                            Ci(i.textContent, l, e),
                          (o = [`children`, l]))
                        : typeof l == `number` &&
                          i.textContent !== `` + l &&
                          (!0 !== s.suppressHydrationWarning &&
                            Ci(i.textContent, l, e),
                          (o = [`children`, `` + l]))
                      : a.hasOwnProperty(c) &&
                        l != null &&
                        c === `onScroll` &&
                        R(`scroll`, i);
                  }
                switch (n) {
                  case `input`:
                    (he(i), Se(i, s, !0));
                    break;
                  case `textarea`:
                    (he(i), ke(i));
                    break;
                  case `select`:
                  case `option`:
                    break;
                  default:
                    typeof s.onClick == `function` && (i.onclick = wi);
                }
                ((i = o), (t.updateQueue = i), i !== null && (t.flags |= 4));
              } else {
                ((c = o.nodeType === 9 ? o : o.ownerDocument),
                  e === `http://www.w3.org/1999/xhtml` && (e = F(n)),
                  e === `http://www.w3.org/1999/xhtml`
                    ? n === `script`
                      ? ((e = c.createElement(`div`)),
                        (e.innerHTML = `<script><\/script>`),
                        (e = e.removeChild(e.firstChild)))
                      : typeof i.is == `string`
                        ? (e = c.createElement(n, { is: i.is }))
                        : ((e = c.createElement(n)),
                          n === `select` &&
                            ((c = e),
                            i.multiple
                              ? (c.multiple = !0)
                              : i.size && (c.size = i.size)))
                    : (e = c.createElementNS(e, n)),
                  (e[Ii] = t),
                  (e[Li] = i),
                  rc(e, t, !1, !1),
                  (t.stateNode = e));
                a: {
                  switch (((c = Be(n, i)), n)) {
                    case `dialog`:
                      (R(`cancel`, e), R(`close`, e), (o = i));
                      break;
                    case `iframe`:
                    case `object`:
                    case `embed`:
                      (R(`load`, e), (o = i));
                      break;
                    case `video`:
                    case `audio`:
                      for (o = 0; o < si.length; o++) R(si[o], e);
                      o = i;
                      break;
                    case `source`:
                      (R(`error`, e), (o = i));
                      break;
                    case `img`:
                    case `image`:
                    case `link`:
                      (R(`error`, e), R(`load`, e), (o = i));
                      break;
                    case `details`:
                      (R(`toggle`, e), (o = i));
                      break;
                    case `input`:
                      (ye(e, i), (o = ve(e, i)), R(`invalid`, e));
                      break;
                    case `option`:
                      o = i;
                      break;
                    case `select`:
                      ((e._wrapperState = { wasMultiple: !!i.multiple }),
                        (o = P({}, i, { value: void 0 })),
                        R(`invalid`, e));
                      break;
                    case `textarea`:
                      (De(e, i), (o = Ee(e, i)), R(`invalid`, e));
                      break;
                    default:
                      o = i;
                  }
                  for (s in (ze(n, o), (l = o), l))
                    if (l.hasOwnProperty(s)) {
                      var u = l[s];
                      s === `style`
                        ? Le(e, u)
                        : s === `dangerouslySetInnerHTML`
                          ? ((u = u ? u.__html : void 0), u != null && Me(e, u))
                          : s === `children`
                            ? typeof u == `string`
                              ? (n !== `textarea` || u !== ``) && Ne(e, u)
                              : typeof u == `number` && Ne(e, `` + u)
                            : s !== `suppressContentEditableWarning` &&
                              s !== `suppressHydrationWarning` &&
                              s !== `autoFocus` &&
                              (a.hasOwnProperty(s)
                                ? u != null &&
                                  s === `onScroll` &&
                                  R(`scroll`, e)
                                : u != null && S(e, s, u, c));
                    }
                  switch (n) {
                    case `input`:
                      (he(e), Se(e, i, !1));
                      break;
                    case `textarea`:
                      (he(e), ke(e));
                      break;
                    case `option`:
                      i.value != null &&
                        e.setAttribute(`value`, `` + fe(i.value));
                      break;
                    case `select`:
                      ((e.multiple = !!i.multiple),
                        (s = i.value),
                        s == null
                          ? i.defaultValue != null &&
                            Te(e, !!i.multiple, i.defaultValue, !0)
                          : Te(e, !!i.multiple, s, !1));
                      break;
                    default:
                      typeof o.onClick == `function` && (e.onclick = wi);
                  }
                  switch (n) {
                    case `button`:
                    case `input`:
                    case `select`:
                    case `textarea`:
                      i = !!i.autoFocus;
                      break a;
                    case `img`:
                      i = !0;
                      break a;
                    default:
                      i = !1;
                  }
                }
                i && (t.flags |= 4);
              }
              t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return (sc(t), null);
          case 6:
            if (e && t.stateNode != null) ac(e, t, e.memoizedProps, i);
            else {
              if (typeof i != `string` && t.stateNode === null)
                throw Error(r(166));
              if (((n = mo(po.current)), mo(uo.current), Aa(t))) {
                if (
                  ((i = t.stateNode),
                  (n = t.memoizedProps),
                  (i[Ii] = t),
                  (s = i.nodeValue !== n) && ((e = Sa), e !== null))
                )
                  switch (e.tag) {
                    case 3:
                      Ci(i.nodeValue, n, (e.mode & 1) != 0);
                      break;
                    case 5:
                      !0 !== e.memoizedProps.suppressHydrationWarning &&
                        Ci(i.nodeValue, n, (e.mode & 1) != 0);
                  }
                s && (t.flags |= 4);
              } else
                ((i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(
                  i,
                )),
                  (i[Ii] = t),
                  (t.stateNode = i));
            }
            return (sc(t), null);
          case 13:
            if (
              (H(K),
              (i = t.memoizedState),
              e === null ||
                (e.memoizedState !== null &&
                  e.memoizedState.dehydrated !== null))
            ) {
              if (G && Ca !== null && t.mode & 1 && !(t.flags & 128))
                (ja(), Ma(), (t.flags |= 98560), (s = !1));
              else if (((s = Aa(t)), i !== null && i.dehydrated !== null)) {
                if (e === null) {
                  if (!s) throw Error(r(318));
                  if (
                    ((s = t.memoizedState),
                    (s = s === null ? null : s.dehydrated),
                    !s)
                  )
                    throw Error(r(317));
                  s[Ii] = t;
                } else
                  (Ma(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    (t.flags |= 4));
                (sc(t), (s = !1));
              } else (wa !== null && (vl(wa), (wa = null)), (s = !0));
              if (!s) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
              ? ((t.lanes = n), t)
              : ((i = i !== null),
                i !== (e !== null && e.memoizedState !== null) &&
                  i &&
                  ((t.child.flags |= 8192),
                  t.mode & 1 &&
                    (e === null || K.current & 1
                      ? Kc === 0 && (Kc = 3)
                      : Ol())),
                t.updateQueue !== null && (t.flags |= 4),
                sc(t),
                null);
          case 4:
            return (
              go(),
              e === null && pi(t.stateNode.containerInfo),
              sc(t),
              null
            );
          case 10:
            return (Ka(t.type._context), sc(t), null);
          case 17:
            return (Zi(t.type) && Qi(), sc(t), null);
          case 19:
            if ((H(K), (s = t.memoizedState), s === null)) return (sc(t), null);
            if (((i = (t.flags & 128) != 0), (c = s.rendering), c === null))
              if (i) oc(s, !1);
              else {
                if (Kc !== 0 || (e !== null && e.flags & 128))
                  for (e = t.child; e !== null; ) {
                    if (((c = yo(e)), c !== null)) {
                      for (
                        t.flags |= 128,
                          oc(s, !1),
                          i = c.updateQueue,
                          i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                          t.subtreeFlags = 0,
                          i = n,
                          n = t.child;
                        n !== null;
                      )
                        ((s = n),
                          (e = i),
                          (s.flags &= 14680066),
                          (c = s.alternate),
                          c === null
                            ? ((s.childLanes = 0),
                              (s.lanes = e),
                              (s.child = null),
                              (s.subtreeFlags = 0),
                              (s.memoizedProps = null),
                              (s.memoizedState = null),
                              (s.updateQueue = null),
                              (s.dependencies = null),
                              (s.stateNode = null))
                            : ((s.childLanes = c.childLanes),
                              (s.lanes = c.lanes),
                              (s.child = c.child),
                              (s.subtreeFlags = 0),
                              (s.deletions = null),
                              (s.memoizedProps = c.memoizedProps),
                              (s.memoizedState = c.memoizedState),
                              (s.updateQueue = c.updateQueue),
                              (s.type = c.type),
                              (e = c.dependencies),
                              (s.dependencies =
                                e === null
                                  ? null
                                  : {
                                      lanes: e.lanes,
                                      firstContext: e.firstContext,
                                    })),
                          (n = n.sibling));
                      return (U(K, (K.current & 1) | 2), t.child);
                    }
                    e = e.sibling;
                  }
                s.tail !== null &&
                  bt() > el &&
                  ((t.flags |= 128), (i = !0), oc(s, !1), (t.lanes = 4194304));
              }
            else {
              if (!i)
                if (((e = yo(c)), e !== null)) {
                  if (
                    ((t.flags |= 128),
                    (i = !0),
                    (n = e.updateQueue),
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    oc(s, !0),
                    s.tail === null &&
                      s.tailMode === `hidden` &&
                      !c.alternate &&
                      !G)
                  )
                    return (sc(t), null);
                } else
                  2 * bt() - s.renderingStartTime > el &&
                    n !== 1073741824 &&
                    ((t.flags |= 128),
                    (i = !0),
                    oc(s, !1),
                    (t.lanes = 4194304));
              s.isBackwards
                ? ((c.sibling = t.child), (t.child = c))
                : ((n = s.last),
                  n === null ? (t.child = c) : (n.sibling = c),
                  (s.last = c));
            }
            return s.tail === null
              ? (sc(t), null)
              : ((t = s.tail),
                (s.rendering = t),
                (s.tail = t.sibling),
                (s.renderingStartTime = bt()),
                (t.sibling = null),
                (n = K.current),
                U(K, i ? (n & 1) | 2 : n & 1),
                t);
          case 22:
          case 23:
            return (
              wl(),
              (i = t.memoizedState !== null),
              e !== null &&
                (e.memoizedState !== null) !== i &&
                (t.flags |= 8192),
              i && t.mode & 1
                ? Wc & 1073741824 &&
                  (sc(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                : sc(t),
              null
            );
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(r(156, t.tag));
      }
      function lc(e, t) {
        switch ((xa(t), t.tag)) {
          case 1:
            return (
              Zi(t.type) && Qi(),
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 3:
            return (
              go(),
              H(Ji),
              H(W),
              xo(),
              (e = t.flags),
              e & 65536 && !(e & 128)
                ? ((t.flags = (e & -65537) | 128), t)
                : null
            );
          case 5:
            return (vo(t), null);
          case 13:
            if (
              (H(K), (e = t.memoizedState), e !== null && e.dehydrated !== null)
            ) {
              if (t.alternate === null) throw Error(r(340));
              Ma();
            }
            return (
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 19:
            return (H(K), null);
          case 4:
            return (go(), null);
          case 10:
            return (Ka(t.type._context), null);
          case 22:
          case 23:
            return (wl(), null);
          case 24:
            return null;
          default:
            return null;
        }
      }
      var uc = !1,
        dc = !1,
        fc = typeof WeakSet == `function` ? WeakSet : Set,
        Z = null;
      function pc(e, t) {
        var n = e.ref;
        if (n !== null)
          if (typeof n == `function`)
            try {
              n(null);
            } catch (n) {
              Rl(e, t, n);
            }
          else n.current = null;
      }
      function mc(e, t, n) {
        try {
          n();
        } catch (n) {
          Rl(e, t, n);
        }
      }
      var hc = !1;
      function Q(e, t) {
        if (((Ti = _n), (e = Rr()), zr(e))) {
          if (`selectionStart` in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
          else
            a: {
              n = ((n = e.ownerDocument) && n.defaultView) || window;
              var i = n.getSelection && n.getSelection();
              if (i && i.rangeCount !== 0) {
                n = i.anchorNode;
                var a = i.anchorOffset,
                  o = i.focusNode;
                i = i.focusOffset;
                try {
                  (n.nodeType, o.nodeType);
                } catch {
                  n = null;
                  break a;
                }
                var s = 0,
                  c = -1,
                  l = -1,
                  u = 0,
                  d = 0,
                  f = e,
                  p = null;
                b: for (;;) {
                  for (
                    var m;
                    f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                      f !== o || (i !== 0 && f.nodeType !== 3) || (l = s + i),
                      f.nodeType === 3 && (s += f.nodeValue.length),
                      (m = f.firstChild) !== null;
                  )
                    ((p = f), (f = m));
                  for (;;) {
                    if (f === e) break b;
                    if (
                      (p === n && ++u === a && (c = s),
                      p === o && ++d === i && (l = s),
                      (m = f.nextSibling) !== null)
                    )
                      break;
                    ((f = p), (p = f.parentNode));
                  }
                  f = m;
                }
                n = c === -1 || l === -1 ? null : { start: c, end: l };
              } else n = null;
            }
          n ||= { start: 0, end: 0 };
        } else n = null;
        for (
          Ei = { focusedElem: e, selectionRange: n }, _n = !1, Z = t;
          Z !== null;
        )
          if (((t = Z), (e = t.child), t.subtreeFlags & 1028 && e !== null))
            ((e.return = t), (Z = e));
          else
            for (; Z !== null; ) {
              t = Z;
              try {
                var h = t.alternate;
                if (t.flags & 1024)
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      break;
                    case 1:
                      if (h !== null) {
                        var g = h.memoizedProps,
                          _ = h.memoizedState,
                          v = t.stateNode;
                        v.__reactInternalSnapshotBeforeUpdate =
                          v.getSnapshotBeforeUpdate(
                            t.elementType === t.type ? g : _s(t.type, g),
                            _,
                          );
                      }
                      break;
                    case 3:
                      var y = t.stateNode.containerInfo;
                      y.nodeType === 1
                        ? (y.textContent = ``)
                        : y.nodeType === 9 &&
                          y.documentElement &&
                          y.removeChild(y.documentElement);
                      break;
                    case 5:
                    case 6:
                    case 4:
                    case 17:
                      break;
                    default:
                      throw Error(r(163));
                  }
              } catch (e) {
                Rl(t, t.return, e);
              }
              if (((e = t.sibling), e !== null)) {
                ((e.return = t.return), (Z = e));
                break;
              }
              Z = t.return;
            }
        return ((h = hc), (hc = !1), h);
      }
      function gc(e, t, n) {
        var r = t.updateQueue;
        if (((r = r === null ? null : r.lastEffect), r !== null)) {
          var i = (r = r.next);
          do {
            if ((i.tag & e) === e) {
              var a = i.destroy;
              ((i.destroy = void 0), a !== void 0 && mc(t, n, a));
            }
            i = i.next;
          } while (i !== r);
        }
      }
      function _c(e, t) {
        if (
          ((t = t.updateQueue),
          (t = t === null ? null : t.lastEffect),
          t !== null)
        ) {
          var n = (t = t.next);
          do {
            if ((n.tag & e) === e) {
              var r = n.create;
              n.destroy = r();
            }
            n = n.next;
          } while (n !== t);
        }
      }
      function vc(e) {
        var t = e.ref;
        if (t !== null) {
          var n = e.stateNode;
          switch (e.tag) {
            case 5:
              e = n;
              break;
            default:
              e = n;
          }
          typeof t == `function` ? t(e) : (t.current = e);
        }
      }
      function yc(e) {
        var t = e.alternate;
        (t !== null && ((e.alternate = null), yc(t)),
          (e.child = null),
          (e.deletions = null),
          (e.sibling = null),
          e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
              (delete t[Ii],
              delete t[Li],
              delete t[zi],
              delete t[B],
              delete t[Bi])),
          (e.stateNode = null),
          (e.return = null),
          (e.dependencies = null),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.pendingProps = null),
          (e.stateNode = null),
          (e.updateQueue = null));
      }
      function bc(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 4;
      }
      function xc(e) {
        a: for (;;) {
          for (; e.sibling === null; ) {
            if (e.return === null || bc(e.return)) return null;
            e = e.return;
          }
          for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
          ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
            ((e.child.return = e), (e = e.child));
          }
          if (!(e.flags & 2)) return e.stateNode;
        }
      }
      function Sc(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
          ((e = e.stateNode),
            t
              ? n.nodeType === 8
                ? n.parentNode.insertBefore(e, t)
                : n.insertBefore(e, t)
              : (n.nodeType === 8
                  ? ((t = n.parentNode), t.insertBefore(e, n))
                  : ((t = n), t.appendChild(e)),
                (n = n._reactRootContainer),
                n != null || t.onclick !== null || (t.onclick = wi)));
        else if (r !== 4 && ((e = e.child), e !== null))
          for (Sc(e, t, n), e = e.sibling; e !== null; )
            (Sc(e, t, n), (e = e.sibling));
      }
      function Cc(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
          ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
        else if (r !== 4 && ((e = e.child), e !== null))
          for (Cc(e, t, n), e = e.sibling; e !== null; )
            (Cc(e, t, n), (e = e.sibling));
      }
      var wc = null,
        Tc = !1;
      function Ec(e, t, n) {
        for (n = n.child; n !== null; ) (Dc(e, t, n), (n = n.sibling));
      }
      function Dc(e, t, n) {
        if (Ot && typeof Ot.onCommitFiberUnmount == `function`)
          try {
            Ot.onCommitFiberUnmount(Dt, n);
          } catch {}
        switch (n.tag) {
          case 5:
            dc || pc(n, t);
          case 6:
            var r = wc,
              i = Tc;
            ((wc = null),
              Ec(e, t, n),
              (wc = r),
              (Tc = i),
              wc !== null &&
                (Tc
                  ? ((e = wc),
                    (n = n.stateNode),
                    e.nodeType === 8
                      ? e.parentNode.removeChild(n)
                      : e.removeChild(n))
                  : wc.removeChild(n.stateNode)));
            break;
          case 18:
            wc !== null &&
              (Tc
                ? ((e = wc),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? Mi(e.parentNode, n)
                    : e.nodeType === 1 && Mi(e, n),
                  hn(e))
                : Mi(wc, n.stateNode));
            break;
          case 4:
            ((r = wc),
              (i = Tc),
              (wc = n.stateNode.containerInfo),
              (Tc = !0),
              Ec(e, t, n),
              (wc = r),
              (Tc = i));
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (
              !dc &&
              ((r = n.updateQueue),
              r !== null && ((r = r.lastEffect), r !== null))
            ) {
              i = r = r.next;
              do {
                var a = i,
                  o = a.destroy;
                ((a = a.tag),
                  o !== void 0 && (a & 2 || a & 4) && mc(n, t, o),
                  (i = i.next));
              } while (i !== r);
            }
            Ec(e, t, n);
            break;
          case 1:
            if (
              !dc &&
              (pc(n, t),
              (r = n.stateNode),
              typeof r.componentWillUnmount == `function`)
            )
              try {
                ((r.props = n.memoizedProps),
                  (r.state = n.memoizedState),
                  r.componentWillUnmount());
              } catch (e) {
                Rl(n, t, e);
              }
            Ec(e, t, n);
            break;
          case 21:
            Ec(e, t, n);
            break;
          case 22:
            n.mode & 1
              ? ((dc = (r = dc) || n.memoizedState !== null),
                Ec(e, t, n),
                (dc = r))
              : Ec(e, t, n);
            break;
          default:
            Ec(e, t, n);
        }
      }
      function Oc(e) {
        var t = e.updateQueue;
        if (t !== null) {
          e.updateQueue = null;
          var n = e.stateNode;
          (n === null && (n = e.stateNode = new fc()),
            t.forEach(function (t) {
              var r = Hl.bind(null, e, t);
              n.has(t) || (n.add(t), t.then(r, r));
            }));
        }
      }
      function kc(e, t) {
        var n = t.deletions;
        if (n !== null)
          for (var i = 0; i < n.length; i++) {
            var a = n[i];
            try {
              var o = e,
                s = t,
                c = s;
              a: for (; c !== null; ) {
                switch (c.tag) {
                  case 5:
                    ((wc = c.stateNode), (Tc = !1));
                    break a;
                  case 3:
                    ((wc = c.stateNode.containerInfo), (Tc = !0));
                    break a;
                  case 4:
                    ((wc = c.stateNode.containerInfo), (Tc = !0));
                    break a;
                }
                c = c.return;
              }
              if (wc === null) throw Error(r(160));
              (Dc(o, s, a), (wc = null), (Tc = !1));
              var l = a.alternate;
              (l !== null && (l.return = null), (a.return = null));
            } catch (e) {
              Rl(a, t, e);
            }
          }
        if (t.subtreeFlags & 12854)
          for (t = t.child; t !== null; ) (Ac(t, e), (t = t.sibling));
      }
      function Ac(e, t) {
        var n = e.alternate,
          i = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            if ((kc(t, e), jc(e), i & 4)) {
              try {
                (gc(3, e, e.return), _c(3, e));
              } catch (t) {
                Rl(e, e.return, t);
              }
              try {
                gc(5, e, e.return);
              } catch (t) {
                Rl(e, e.return, t);
              }
            }
            break;
          case 1:
            (kc(t, e), jc(e), i & 512 && n !== null && pc(n, n.return));
            break;
          case 5:
            if (
              (kc(t, e),
              jc(e),
              i & 512 && n !== null && pc(n, n.return),
              e.flags & 32)
            ) {
              var a = e.stateNode;
              try {
                Ne(a, ``);
              } catch (t) {
                Rl(e, e.return, t);
              }
            }
            if (i & 4 && ((a = e.stateNode), a != null)) {
              var o = e.memoizedProps,
                s = n === null ? o : n.memoizedProps,
                c = e.type,
                l = e.updateQueue;
              if (((e.updateQueue = null), l !== null))
                try {
                  (c === `input` &&
                    o.type === `radio` &&
                    o.name != null &&
                    be(a, o),
                    Be(c, s));
                  var u = Be(c, o);
                  for (s = 0; s < l.length; s += 2) {
                    var d = l[s],
                      f = l[s + 1];
                    d === `style`
                      ? Le(a, f)
                      : d === `dangerouslySetInnerHTML`
                        ? Me(a, f)
                        : d === `children`
                          ? Ne(a, f)
                          : S(a, d, f, u);
                  }
                  switch (c) {
                    case `input`:
                      xe(a, o);
                      break;
                    case `textarea`:
                      Oe(a, o);
                      break;
                    case `select`:
                      var p = a._wrapperState.wasMultiple;
                      a._wrapperState.wasMultiple = !!o.multiple;
                      var m = o.value;
                      m == null
                        ? p !== !!o.multiple &&
                          (o.defaultValue == null
                            ? Te(a, !!o.multiple, o.multiple ? [] : ``, !1)
                            : Te(a, !!o.multiple, o.defaultValue, !0))
                        : Te(a, !!o.multiple, m, !1);
                  }
                  a[Li] = o;
                } catch (t) {
                  Rl(e, e.return, t);
                }
            }
            break;
          case 6:
            if ((kc(t, e), jc(e), i & 4)) {
              if (e.stateNode === null) throw Error(r(162));
              ((a = e.stateNode), (o = e.memoizedProps));
              try {
                a.nodeValue = o;
              } catch (t) {
                Rl(e, e.return, t);
              }
            }
            break;
          case 3:
            if (
              (kc(t, e),
              jc(e),
              i & 4 && n !== null && n.memoizedState.isDehydrated)
            )
              try {
                hn(t.containerInfo);
              } catch (t) {
                Rl(e, e.return, t);
              }
            break;
          case 4:
            (kc(t, e), jc(e));
            break;
          case 13:
            (kc(t, e),
              jc(e),
              (a = e.child),
              a.flags & 8192 &&
                ((o = a.memoizedState !== null),
                (a.stateNode.isHidden = o),
                !o ||
                  (a.alternate !== null &&
                    a.alternate.memoizedState !== null) ||
                  ($c = bt())),
              i & 4 && Oc(e));
            break;
          case 22:
            if (
              ((d = n !== null && n.memoizedState !== null),
              e.mode & 1
                ? ((dc = (u = dc) || d), kc(t, e), (dc = u))
                : kc(t, e),
              jc(e),
              i & 8192)
            ) {
              if (
                ((u = e.memoizedState !== null),
                (e.stateNode.isHidden = u) && !d && e.mode & 1)
              )
                for (Z = e, d = e.child; d !== null; ) {
                  for (f = Z = d; Z !== null; ) {
                    switch (((p = Z), (m = p.child), p.tag)) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        gc(4, p, p.return);
                        break;
                      case 1:
                        pc(p, p.return);
                        var h = p.stateNode;
                        if (typeof h.componentWillUnmount == `function`) {
                          ((i = p), (n = p.return));
                          try {
                            ((t = i),
                              (h.props = t.memoizedProps),
                              (h.state = t.memoizedState),
                              h.componentWillUnmount());
                          } catch (e) {
                            Rl(i, n, e);
                          }
                        }
                        break;
                      case 5:
                        pc(p, p.return);
                        break;
                      case 22:
                        if (p.memoizedState !== null) {
                          Fc(f);
                          continue;
                        }
                    }
                    m === null ? Fc(f) : ((m.return = p), (Z = m));
                  }
                  d = d.sibling;
                }
              a: for (d = null, f = e; ; ) {
                if (f.tag === 5) {
                  if (d === null) {
                    d = f;
                    try {
                      ((a = f.stateNode),
                        u
                          ? ((o = a.style),
                            typeof o.setProperty == `function`
                              ? o.setProperty(`display`, `none`, `important`)
                              : (o.display = `none`))
                          : ((c = f.stateNode),
                            (l = f.memoizedProps.style),
                            (s =
                              l != null && l.hasOwnProperty(`display`)
                                ? l.display
                                : null),
                            (c.style.display = Ie(`display`, s))));
                    } catch (t) {
                      Rl(e, e.return, t);
                    }
                  }
                } else if (f.tag === 6) {
                  if (d === null)
                    try {
                      f.stateNode.nodeValue = u ? `` : f.memoizedProps;
                    } catch (t) {
                      Rl(e, e.return, t);
                    }
                } else if (
                  ((f.tag !== 22 && f.tag !== 23) ||
                    f.memoizedState === null ||
                    f === e) &&
                  f.child !== null
                ) {
                  ((f.child.return = f), (f = f.child));
                  continue;
                }
                if (f === e) break a;
                for (; f.sibling === null; ) {
                  if (f.return === null || f.return === e) break a;
                  (d === f && (d = null), (f = f.return));
                }
                (d === f && (d = null),
                  (f.sibling.return = f.return),
                  (f = f.sibling));
              }
            }
            break;
          case 19:
            (kc(t, e), jc(e), i & 4 && Oc(e));
            break;
          case 21:
            break;
          default:
            (kc(t, e), jc(e));
        }
      }
      function jc(e) {
        var t = e.flags;
        if (t & 2) {
          try {
            a: {
              for (var n = e.return; n !== null; ) {
                if (bc(n)) {
                  var i = n;
                  break a;
                }
                n = n.return;
              }
              throw Error(r(160));
            }
            switch (i.tag) {
              case 5:
                var a = i.stateNode;
                (i.flags & 32 && (Ne(a, ``), (i.flags &= -33)),
                  Cc(e, xc(e), a));
                break;
              case 3:
              case 4:
                var o = i.stateNode.containerInfo;
                Sc(e, xc(e), o);
                break;
              default:
                throw Error(r(161));
            }
          } catch (t) {
            Rl(e, e.return, t);
          }
          e.flags &= -3;
        }
        t & 4096 && (e.flags &= -4097);
      }
      function Mc(e, t, n) {
        ((Z = e), Nc(e, t, n));
      }
      function Nc(e, t, n) {
        for (var r = (e.mode & 1) != 0; Z !== null; ) {
          var i = Z,
            a = i.child;
          if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || uc;
            if (!o) {
              var s = i.alternate,
                c = (s !== null && s.memoizedState !== null) || dc;
              s = uc;
              var l = dc;
              if (((uc = o), (dc = c) && !l))
                for (Z = i; Z !== null; )
                  ((o = Z),
                    (c = o.child),
                    (o.tag === 22 && o.memoizedState !== null) || c === null
                      ? Ic(i)
                      : ((c.return = o), (Z = c)));
              for (; a !== null; ) ((Z = a), Nc(a, t, n), (a = a.sibling));
              ((Z = i), (uc = s), (dc = l));
            }
            Pc(e, t, n);
          } else
            i.subtreeFlags & 8772 && a !== null
              ? ((a.return = i), (Z = a))
              : Pc(e, t, n);
        }
      }
      function Pc(e) {
        for (; Z !== null; ) {
          var t = Z;
          if (t.flags & 8772) {
            var n = t.alternate;
            try {
              if (t.flags & 8772)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    dc || _c(5, t);
                    break;
                  case 1:
                    var i = t.stateNode;
                    if (t.flags & 4 && !dc)
                      if (n === null) i.componentDidMount();
                      else {
                        var a =
                          t.elementType === t.type
                            ? n.memoizedProps
                            : _s(t.type, n.memoizedProps);
                        i.componentDidUpdate(
                          a,
                          n.memoizedState,
                          i.__reactInternalSnapshotBeforeUpdate,
                        );
                      }
                    var o = t.updateQueue;
                    o !== null && co(t, o, i);
                    break;
                  case 3:
                    var s = t.updateQueue;
                    if (s !== null) {
                      if (((n = null), t.child !== null))
                        switch (t.child.tag) {
                          case 5:
                            n = t.child.stateNode;
                            break;
                          case 1:
                            n = t.child.stateNode;
                        }
                      co(t, s, n);
                    }
                    break;
                  case 5:
                    var c = t.stateNode;
                    if (n === null && t.flags & 4) {
                      n = c;
                      var l = t.memoizedProps;
                      switch (t.type) {
                        case `button`:
                        case `input`:
                        case `select`:
                        case `textarea`:
                          l.autoFocus && n.focus();
                          break;
                        case `img`:
                          l.src && (n.src = l.src);
                      }
                    }
                    break;
                  case 6:
                    break;
                  case 4:
                    break;
                  case 12:
                    break;
                  case 13:
                    if (t.memoizedState === null) {
                      var u = t.alternate;
                      if (u !== null) {
                        var d = u.memoizedState;
                        if (d !== null) {
                          var f = d.dehydrated;
                          f !== null && hn(f);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                  case 25:
                    break;
                  default:
                    throw Error(r(163));
                }
              dc || (t.flags & 512 && vc(t));
            } catch (e) {
              Rl(t, t.return, e);
            }
          }
          if (t === e) {
            Z = null;
            break;
          }
          if (((n = t.sibling), n !== null)) {
            ((n.return = t.return), (Z = n));
            break;
          }
          Z = t.return;
        }
      }
      function Fc(e) {
        for (; Z !== null; ) {
          var t = Z;
          if (t === e) {
            Z = null;
            break;
          }
          var n = t.sibling;
          if (n !== null) {
            ((n.return = t.return), (Z = n));
            break;
          }
          Z = t.return;
        }
      }
      function Ic(e) {
        for (; Z !== null; ) {
          var t = Z;
          try {
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                var n = t.return;
                try {
                  _c(4, t);
                } catch (e) {
                  Rl(t, n, e);
                }
                break;
              case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == `function`) {
                  var i = t.return;
                  try {
                    r.componentDidMount();
                  } catch (e) {
                    Rl(t, i, e);
                  }
                }
                var a = t.return;
                try {
                  vc(t);
                } catch (e) {
                  Rl(t, a, e);
                }
                break;
              case 5:
                var o = t.return;
                try {
                  vc(t);
                } catch (e) {
                  Rl(t, o, e);
                }
            }
          } catch (e) {
            Rl(t, t.return, e);
          }
          if (t === e) {
            Z = null;
            break;
          }
          var s = t.sibling;
          if (s !== null) {
            ((s.return = t.return), (Z = s));
            break;
          }
          Z = t.return;
        }
      }
      var Lc = Math.ceil,
        Rc = C.ReactCurrentDispatcher,
        zc = C.ReactCurrentOwner,
        Bc = C.ReactCurrentBatchConfig,
        $ = 0,
        Vc = null,
        Hc = null,
        Uc = 0,
        Wc = 0,
        Gc = Ki(0),
        Kc = 0,
        qc = null,
        Jc = 0,
        Yc = 0,
        Xc = 0,
        Zc = null,
        Qc = null,
        $c = 0,
        el = 1 / 0,
        tl = null,
        nl = !1,
        rl = null,
        il = null,
        al = !1,
        ol = null,
        sl = 0,
        cl = 0,
        ll = null,
        ul = -1,
        dl = 0;
      function fl() {
        return $ & 6 ? bt() : ul === -1 ? (ul = bt()) : ul;
      }
      function pl(e) {
        return e.mode & 1
          ? $ & 2 && Uc !== 0
            ? Uc & -Uc
            : Pa.transition === null
              ? ((e = I),
                e === 0
                  ? ((e = window.event),
                    (e = e === void 0 ? 16 : Cn(e.type)),
                    e)
                  : e)
              : (dl === 0 && (dl = Vt()), dl)
          : 1;
      }
      function ml(e, t, n, i) {
        if (50 < cl) throw ((cl = 0), (ll = null), Error(r(185)));
        (Ut(e, n, i),
          (!($ & 2) || e !== Vc) &&
            (e === Vc && (!($ & 2) && (Yc |= n), Kc === 4 && bl(e, Uc)),
            hl(e, i),
            n === 1 &&
              $ === 0 &&
              !(t.mode & 1) &&
              ((el = bt() + 500), ia && ca())));
      }
      function hl(e, t) {
        var n = e.callbackNode;
        zt(e, t);
        var r = Lt(e, e === Vc ? Uc : 0);
        if (r === 0)
          (n !== null && _t(n),
            (e.callbackNode = null),
            (e.callbackPriority = 0));
        else if (((t = r & -r), e.callbackPriority !== t)) {
          if ((n != null && _t(n), t === 1))
            (e.tag === 0 ? sa(xl.bind(null, e)) : oa(xl.bind(null, e)),
              Ai(function () {
                !($ & 6) && ca();
              }),
              (n = null));
          else {
            switch (Kt(r)) {
              case 1:
                n = St;
                break;
              case 4:
                n = Ct;
                break;
              case 16:
                n = wt;
                break;
              case 536870912:
                n = Et;
                break;
              default:
                n = wt;
            }
            n = Wl(n, gl.bind(null, e));
          }
          ((e.callbackPriority = t), (e.callbackNode = n));
        }
      }
      function gl(e, t) {
        if (((ul = -1), (dl = 0), $ & 6)) throw Error(r(327));
        var n = e.callbackNode;
        if (Il() && e.callbackNode !== n) return null;
        var i = Lt(e, e === Vc ? Uc : 0);
        if (i === 0) return null;
        if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = kl(e, i);
        else {
          t = i;
          var a = $;
          $ |= 2;
          var o = Dl();
          (Vc !== e || Uc !== t) && ((tl = null), (el = bt() + 500), Tl(e, t));
          do
            try {
              jl();
              break;
            } catch (t) {
              El(e, t);
            }
          while (1);
          (Ga(),
            (Rc.current = o),
            ($ = a),
            Hc === null ? ((Vc = null), (Uc = 0), (t = Kc)) : (t = 0));
        }
        if (t !== 0) {
          if (
            (t === 2 && ((a = Bt(e)), a !== 0 && ((i = a), (t = _l(e, a)))),
            t === 1)
          )
            throw ((n = qc), Tl(e, 0), bl(e, i), hl(e, bt()), n);
          if (t === 6) bl(e, i);
          else {
            if (
              ((a = e.current.alternate),
              !(i & 30) &&
                !yl(a) &&
                ((t = kl(e, i)),
                t === 2 && ((o = Bt(e)), o !== 0 && ((i = o), (t = _l(e, o)))),
                t === 1))
            )
              throw ((n = qc), Tl(e, 0), bl(e, i), hl(e, bt()), n);
            switch (((e.finishedWork = a), (e.finishedLanes = i), t)) {
              case 0:
              case 1:
                throw Error(r(345));
              case 2:
                Pl(e, Qc, tl);
                break;
              case 3:
                if (
                  (bl(e, i),
                  (i & 130023424) === i && ((t = $c + 500 - bt()), 10 < t))
                ) {
                  if (Lt(e, 0) !== 0) break;
                  if (((a = e.suspendedLanes), (a & i) !== i)) {
                    (fl(), (e.pingedLanes |= e.suspendedLanes & a));
                    break;
                  }
                  e.timeoutHandle = z(Pl.bind(null, e, Qc, tl), t);
                  break;
                }
                Pl(e, Qc, tl);
                break;
              case 4:
                if ((bl(e, i), (i & 4194240) === i)) break;
                for (t = e.eventTimes, a = -1; 0 < i; ) {
                  var s = 31 - At(i);
                  ((o = 1 << s), (s = t[s]), s > a && (a = s), (i &= ~o));
                }
                if (
                  ((i = a),
                  (i = bt() - i),
                  (i =
                    (120 > i
                      ? 120
                      : 480 > i
                        ? 480
                        : 1080 > i
                          ? 1080
                          : 1920 > i
                            ? 1920
                            : 3e3 > i
                              ? 3e3
                              : 4320 > i
                                ? 4320
                                : 1960 * Lc(i / 1960)) - i),
                  10 < i)
                ) {
                  e.timeoutHandle = z(Pl.bind(null, e, Qc, tl), i);
                  break;
                }
                Pl(e, Qc, tl);
                break;
              case 5:
                Pl(e, Qc, tl);
                break;
              default:
                throw Error(r(329));
            }
          }
        }
        return (hl(e, bt()), e.callbackNode === n ? gl.bind(null, e) : null);
      }
      function _l(e, t) {
        var n = Zc;
        return (
          e.current.memoizedState.isDehydrated && (Tl(e, t).flags |= 256),
          (e = kl(e, t)),
          e !== 2 && ((t = Qc), (Qc = n), t !== null && vl(t)),
          e
        );
      }
      function vl(e) {
        Qc === null ? (Qc = e) : Qc.push.apply(Qc, e);
      }
      function yl(e) {
        for (var t = e; ; ) {
          if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
              for (var r = 0; r < n.length; r++) {
                var i = n[r],
                  a = i.getSnapshot;
                i = i.value;
                try {
                  if (!Nr(a(), i)) return !1;
                } catch {
                  return !1;
                }
              }
          }
          if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            ((n.return = t), (t = n));
          else {
            if (t === e) break;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) return !0;
              t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
          }
        }
        return !0;
      }
      function bl(e, t) {
        for (
          t &= ~Xc,
            t &= ~Yc,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
          0 < t;
        ) {
          var n = 31 - At(t),
            r = 1 << n;
          ((e[n] = -1), (t &= ~r));
        }
      }
      function xl(e) {
        if ($ & 6) throw Error(r(327));
        Il();
        var t = Lt(e, 0);
        if (!(t & 1)) return (hl(e, bt()), null);
        var n = kl(e, t);
        if (e.tag !== 0 && n === 2) {
          var i = Bt(e);
          i !== 0 && ((t = i), (n = _l(e, i)));
        }
        if (n === 1) throw ((n = qc), Tl(e, 0), bl(e, t), hl(e, bt()), n);
        if (n === 6) throw Error(r(345));
        return (
          (e.finishedWork = e.current.alternate),
          (e.finishedLanes = t),
          Pl(e, Qc, tl),
          hl(e, bt()),
          null
        );
      }
      function Sl(e, t) {
        var n = $;
        $ |= 1;
        try {
          return e(t);
        } finally {
          (($ = n), $ === 0 && ((el = bt() + 500), ia && ca()));
        }
      }
      function Cl(e) {
        ol !== null && ol.tag === 0 && !($ & 6) && Il();
        var t = $;
        $ |= 1;
        var n = Bc.transition,
          r = I;
        try {
          if (((Bc.transition = null), (I = 1), e)) return e();
        } finally {
          ((I = r), (Bc.transition = n), ($ = t), !($ & 6) && ca());
        }
      }
      function wl() {
        ((Wc = Gc.current), H(Gc));
      }
      function Tl(e, t) {
        ((e.finishedWork = null), (e.finishedLanes = 0));
        var n = e.timeoutHandle;
        if ((n !== -1 && ((e.timeoutHandle = -1), Oi(n)), Hc !== null))
          for (n = Hc.return; n !== null; ) {
            var r = n;
            switch ((xa(r), r.tag)) {
              case 1:
                ((r = r.type.childContextTypes), r != null && Qi());
                break;
              case 3:
                (go(), H(Ji), H(W), xo());
                break;
              case 5:
                vo(r);
                break;
              case 4:
                go();
                break;
              case 13:
                H(K);
                break;
              case 19:
                H(K);
                break;
              case 10:
                Ka(r.type._context);
                break;
              case 22:
              case 23:
                wl();
            }
            n = n.return;
          }
        if (
          ((Vc = e),
          (Hc = e = Yl(e.current, null)),
          (Uc = Wc = t),
          (Kc = 0),
          (qc = null),
          (Xc = Yc = Jc = 0),
          (Qc = Zc = null),
          Xa !== null)
        ) {
          for (t = 0; t < Xa.length; t++)
            if (((n = Xa[t]), (r = n.interleaved), r !== null)) {
              n.interleaved = null;
              var i = r.next,
                a = n.pending;
              if (a !== null) {
                var o = a.next;
                ((a.next = i), (r.next = o));
              }
              n.pending = r;
            }
          Xa = null;
        }
        return e;
      }
      function El(e, t) {
        do {
          var n = Hc;
          try {
            if ((Ga(), (So.current = ps), Do)) {
              for (var i = q.memoizedState; i !== null; ) {
                var a = i.queue;
                (a !== null && (a.pending = null), (i = i.next));
              }
              Do = !1;
            }
            if (
              ((wo = 0),
              (Eo = To = q = null),
              (Oo = !1),
              (ko = 0),
              (zc.current = null),
              n === null || n.return === null)
            ) {
              ((Kc = 1), (qc = t), (Hc = null));
              break;
            }
            a: {
              var o = e,
                s = n.return,
                c = n,
                l = t;
              if (
                ((t = Uc),
                (c.flags |= 32768),
                typeof l == `object` && l && typeof l.then == `function`)
              ) {
                var u = l,
                  d = c,
                  f = d.tag;
                if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                  var p = d.alternate;
                  p
                    ? ((d.updateQueue = p.updateQueue),
                      (d.memoizedState = p.memoizedState),
                      (d.lanes = p.lanes))
                    : ((d.updateQueue = null), (d.memoizedState = null));
                }
                var m = js(s);
                if (m !== null) {
                  ((m.flags &= -257),
                    Ms(m, s, c, o, t),
                    m.mode & 1 && As(o, u, t),
                    (t = m),
                    (l = u));
                  var h = t.updateQueue;
                  if (h === null) {
                    var g = new Set();
                    (g.add(l), (t.updateQueue = g));
                  } else h.add(l);
                  break a;
                } else {
                  if (!(t & 1)) {
                    (As(o, u, t), Ol());
                    break a;
                  }
                  l = Error(r(426));
                }
              } else if (G && c.mode & 1) {
                var _ = js(s);
                if (_ !== null) {
                  (!(_.flags & 65536) && (_.flags |= 256),
                    Ms(_, s, c, o, t),
                    Na(ws(l, c)));
                  break a;
                }
              }
              ((o = l = ws(l, c)),
                Kc !== 4 && (Kc = 2),
                Zc === null ? (Zc = [o]) : Zc.push(o),
                (o = s));
              do {
                switch (o.tag) {
                  case 3:
                    ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                    var v = Os(o, l, t);
                    oo(o, v);
                    break a;
                  case 1:
                    c = l;
                    var y = o.type,
                      b = o.stateNode;
                    if (
                      !(o.flags & 128) &&
                      (typeof y.getDerivedStateFromError == `function` ||
                        (b !== null &&
                          typeof b.componentDidCatch == `function` &&
                          (il === null || !il.has(b))))
                    ) {
                      ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                      var x = ks(o, c, t);
                      oo(o, x);
                      break a;
                    }
                }
                o = o.return;
              } while (o !== null);
            }
            Nl(n);
          } catch (e) {
            ((t = e), Hc === n && n !== null && (Hc = n = n.return));
            continue;
          }
          break;
        } while (1);
      }
      function Dl() {
        var e = Rc.current;
        return ((Rc.current = ps), e === null ? ps : e);
      }
      function Ol() {
        ((Kc === 0 || Kc === 3 || Kc === 2) && (Kc = 4),
          Vc === null ||
            (!(Jc & 268435455) && !(Yc & 268435455)) ||
            bl(Vc, Uc));
      }
      function kl(e, t) {
        var n = $;
        $ |= 2;
        var i = Dl();
        (Vc !== e || Uc !== t) && ((tl = null), Tl(e, t));
        do
          try {
            Al();
            break;
          } catch (t) {
            El(e, t);
          }
        while (1);
        if ((Ga(), ($ = n), (Rc.current = i), Hc !== null)) throw Error(r(261));
        return ((Vc = null), (Uc = 0), Kc);
      }
      function Al() {
        for (; Hc !== null; ) Ml(Hc);
      }
      function jl() {
        for (; Hc !== null && !vt(); ) Ml(Hc);
      }
      function Ml(e) {
        var t = Ul(e.alternate, e, Wc);
        ((e.memoizedProps = e.pendingProps),
          t === null ? Nl(e) : (Hc = t),
          (zc.current = null));
      }
      function Nl(e) {
        var t = e;
        do {
          var n = t.alternate;
          if (((e = t.return), t.flags & 32768)) {
            if (((n = lc(n, t)), n !== null)) {
              ((n.flags &= 32767), (Hc = n));
              return;
            }
            if (e !== null)
              ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
            else {
              ((Kc = 6), (Hc = null));
              return;
            }
          } else if (((n = cc(n, t, Wc)), n !== null)) {
            Hc = n;
            return;
          }
          if (((t = t.sibling), t !== null)) {
            Hc = t;
            return;
          }
          Hc = t = e;
        } while (t !== null);
        Kc === 0 && (Kc = 5);
      }
      function Pl(e, t, n) {
        var r = I,
          i = Bc.transition;
        try {
          ((Bc.transition = null), (I = 1), Fl(e, t, n, r));
        } finally {
          ((Bc.transition = i), (I = r));
        }
        return null;
      }
      function Fl(e, t, n, i) {
        do Il();
        while (ol !== null);
        if ($ & 6) throw Error(r(327));
        n = e.finishedWork;
        var a = e.finishedLanes;
        if (n === null) return null;
        if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
          throw Error(r(177));
        ((e.callbackNode = null), (e.callbackPriority = 0));
        var o = n.lanes | n.childLanes;
        if (
          (Wt(e, o),
          e === Vc && ((Hc = Vc = null), (Uc = 0)),
          (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            al ||
            ((al = !0),
            Wl(wt, function () {
              return (Il(), null);
            })),
          (o = (n.flags & 15990) != 0),
          n.subtreeFlags & 15990 || o)
        ) {
          ((o = Bc.transition), (Bc.transition = null));
          var s = I;
          I = 1;
          var c = $;
          (($ |= 4),
            (zc.current = null),
            Q(e, n),
            Ac(n, e),
            Br(Ei),
            (_n = !!Ti),
            (Ei = Ti = null),
            (e.current = n),
            Mc(n, e, a),
            yt(),
            ($ = c),
            (I = s),
            (Bc.transition = o));
        } else e.current = n;
        if (
          (al && ((al = !1), (ol = e), (sl = a)),
          (o = e.pendingLanes),
          o === 0 && (il = null),
          kt(n.stateNode, i),
          hl(e, bt()),
          t !== null)
        )
          for (i = e.onRecoverableError, n = 0; n < t.length; n++)
            ((a = t[n]),
              i(a.value, { componentStack: a.stack, digest: a.digest }));
        if (nl) throw ((nl = !1), (e = rl), (rl = null), e);
        return (
          sl & 1 && e.tag !== 0 && Il(),
          (o = e.pendingLanes),
          o & 1 ? (e === ll ? cl++ : ((cl = 0), (ll = e))) : (cl = 0),
          ca(),
          null
        );
      }
      function Il() {
        if (ol !== null) {
          var e = Kt(sl),
            t = Bc.transition,
            n = I;
          try {
            if (((Bc.transition = null), (I = 16 > e ? 16 : e), ol === null))
              var i = !1;
            else {
              if (((e = ol), (ol = null), (sl = 0), $ & 6)) throw Error(r(331));
              var a = $;
              for ($ |= 4, Z = e.current; Z !== null; ) {
                var o = Z,
                  s = o.child;
                if (Z.flags & 16) {
                  var c = o.deletions;
                  if (c !== null) {
                    for (var l = 0; l < c.length; l++) {
                      var u = c[l];
                      for (Z = u; Z !== null; ) {
                        var d = Z;
                        switch (d.tag) {
                          case 0:
                          case 11:
                          case 15:
                            gc(8, d, o);
                        }
                        var f = d.child;
                        if (f !== null) ((f.return = d), (Z = f));
                        else
                          for (; Z !== null; ) {
                            d = Z;
                            var p = d.sibling,
                              m = d.return;
                            if ((yc(d), d === u)) {
                              Z = null;
                              break;
                            }
                            if (p !== null) {
                              ((p.return = m), (Z = p));
                              break;
                            }
                            Z = m;
                          }
                      }
                    }
                    var h = o.alternate;
                    if (h !== null) {
                      var g = h.child;
                      if (g !== null) {
                        h.child = null;
                        do {
                          var _ = g.sibling;
                          ((g.sibling = null), (g = _));
                        } while (g !== null);
                      }
                    }
                    Z = o;
                  }
                }
                if (o.subtreeFlags & 2064 && s !== null)
                  ((s.return = o), (Z = s));
                else
                  b: for (; Z !== null; ) {
                    if (((o = Z), o.flags & 2048))
                      switch (o.tag) {
                        case 0:
                        case 11:
                        case 15:
                          gc(9, o, o.return);
                      }
                    var v = o.sibling;
                    if (v !== null) {
                      ((v.return = o.return), (Z = v));
                      break b;
                    }
                    Z = o.return;
                  }
              }
              var y = e.current;
              for (Z = y; Z !== null; ) {
                s = Z;
                var b = s.child;
                if (s.subtreeFlags & 2064 && b !== null)
                  ((b.return = s), (Z = b));
                else
                  b: for (s = y; Z !== null; ) {
                    if (((c = Z), c.flags & 2048))
                      try {
                        switch (c.tag) {
                          case 0:
                          case 11:
                          case 15:
                            _c(9, c);
                        }
                      } catch (e) {
                        Rl(c, c.return, e);
                      }
                    if (c === s) {
                      Z = null;
                      break b;
                    }
                    var x = c.sibling;
                    if (x !== null) {
                      ((x.return = c.return), (Z = x));
                      break b;
                    }
                    Z = c.return;
                  }
              }
              if (
                (($ = a),
                ca(),
                Ot && typeof Ot.onPostCommitFiberRoot == `function`)
              )
                try {
                  Ot.onPostCommitFiberRoot(Dt, e);
                } catch {}
              i = !0;
            }
            return i;
          } finally {
            ((I = n), (Bc.transition = t));
          }
        }
        return !1;
      }
      function Ll(e, t, n) {
        ((t = ws(n, t)),
          (t = Os(e, t, 1)),
          (e = io(e, t, 1)),
          (t = fl()),
          e !== null && (Ut(e, 1, t), hl(e, t)));
      }
      function Rl(e, t, n) {
        if (e.tag === 3) Ll(e, e, n);
        else
          for (; t !== null; ) {
            if (t.tag === 3) {
              Ll(t, e, n);
              break;
            } else if (t.tag === 1) {
              var r = t.stateNode;
              if (
                typeof t.type.getDerivedStateFromError == `function` ||
                (typeof r.componentDidCatch == `function` &&
                  (il === null || !il.has(r)))
              ) {
                ((e = ws(n, e)),
                  (e = ks(t, e, 1)),
                  (t = io(t, e, 1)),
                  (e = fl()),
                  t !== null && (Ut(t, 1, e), hl(t, e)));
                break;
              }
            }
            t = t.return;
          }
      }
      function zl(e, t, n) {
        var r = e.pingCache;
        (r !== null && r.delete(t),
          (t = fl()),
          (e.pingedLanes |= e.suspendedLanes & n),
          Vc === e &&
            (Uc & n) === n &&
            (Kc === 4 ||
            (Kc === 3 && (Uc & 130023424) === Uc && 500 > bt() - $c)
              ? Tl(e, 0)
              : (Xc |= n)),
          hl(e, t));
      }
      function Bl(e, t) {
        t === 0 &&
          (e.mode & 1
            ? ((t = Ft), (Ft <<= 1), !(Ft & 130023424) && (Ft = 4194304))
            : (t = 1));
        var n = fl();
        ((e = $a(e, t)), e !== null && (Ut(e, t, n), hl(e, n)));
      }
      function Vl(e) {
        var t = e.memoizedState,
          n = 0;
        (t !== null && (n = t.retryLane), Bl(e, n));
      }
      function Hl(e, t) {
        var n = 0;
        switch (e.tag) {
          case 13:
            var i = e.stateNode,
              a = e.memoizedState;
            a !== null && (n = a.retryLane);
            break;
          case 19:
            i = e.stateNode;
            break;
          default:
            throw Error(r(314));
        }
        (i !== null && i.delete(t), Bl(e, n));
      }
      var Ul = function (e, t, n) {
        if (e !== null)
          if (e.memoizedProps !== t.pendingProps || Ji.current) Ps = !0;
          else {
            if ((e.lanes & n) === 0 && !(t.flags & 128))
              return ((Ps = !1), nc(e, t, n));
            Ps = !!(e.flags & 131072);
          }
        else ((Ps = !1), G && t.flags & 1048576 && ya(t, fa, t.index));
        switch (((t.lanes = 0), t.tag)) {
          case 2:
            var i = t.type;
            (ec(e, t), (e = t.pendingProps));
            var a = Xi(t, W.current);
            (Ja(t, n), (a = No(null, t, i, e, a, n)));
            var o = Po();
            return (
              (t.flags |= 1),
              typeof a == `object` &&
              a &&
              typeof a.render == `function` &&
              a.$$typeof === void 0
                ? ((t.tag = 1),
                  (t.memoizedState = null),
                  (t.updateQueue = null),
                  Zi(i) ? ((o = !0), ta(t)) : (o = !1),
                  (t.memoizedState =
                    a.state !== null && a.state !== void 0 ? a.state : null),
                  to(t),
                  (a.updater = ys),
                  (t.stateNode = a),
                  (a._reactInternals = t),
                  Cs(t, i, e, n),
                  (t = Us(null, t, i, !0, o, n)))
                : ((t.tag = 0),
                  G && o && ba(t),
                  Fs(null, t, a, n),
                  (t = t.child)),
              t
            );
          case 16:
            i = t.elementType;
            a: {
              switch (
                (ec(e, t),
                (e = t.pendingProps),
                (a = i._init),
                (i = a(i._payload)),
                (t.type = i),
                (a = t.tag = Jl(i)),
                (e = _s(i, e)),
                a)
              ) {
                case 0:
                  t = Vs(null, t, i, e, n);
                  break a;
                case 1:
                  t = Hs(null, t, i, e, n);
                  break a;
                case 11:
                  t = Is(null, t, i, e, n);
                  break a;
                case 14:
                  t = Ls(null, t, i, _s(i.type, e), n);
                  break a;
              }
              throw Error(r(306, i, ``));
            }
            return t;
          case 0:
            return (
              (i = t.type),
              (a = t.pendingProps),
              (a = t.elementType === i ? a : _s(i, a)),
              Vs(e, t, i, a, n)
            );
          case 1:
            return (
              (i = t.type),
              (a = t.pendingProps),
              (a = t.elementType === i ? a : _s(i, a)),
              Hs(e, t, i, a, n)
            );
          case 3:
            a: {
              if ((Ws(t), e === null)) throw Error(r(387));
              ((i = t.pendingProps),
                (o = t.memoizedState),
                (a = o.element),
                no(e, t),
                so(t, i, null, n));
              var s = t.memoizedState;
              if (((i = s.element), o.isDehydrated))
                if (
                  ((o = {
                    element: i,
                    isDehydrated: !1,
                    cache: s.cache,
                    pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                    transitions: s.transitions,
                  }),
                  (t.updateQueue.baseState = o),
                  (t.memoizedState = o),
                  t.flags & 256)
                ) {
                  ((a = ws(Error(r(423)), t)), (t = X(e, t, i, n, a)));
                  break a;
                } else if (i !== a) {
                  ((a = ws(Error(r(424)), t)), (t = X(e, t, i, n, a)));
                  break a;
                } else
                  for (
                    Ca = Ni(t.stateNode.containerInfo.firstChild),
                      Sa = t,
                      G = !0,
                      wa = null,
                      n = Ba(t, null, i, n),
                      t.child = n;
                    n;
                  )
                    ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
              else {
                if ((Ma(), i === a)) {
                  t = tc(e, t, n);
                  break a;
                }
                Fs(e, t, i, n);
              }
              t = t.child;
            }
            return t;
          case 5:
            return (
              _o(t),
              e === null && Oa(t),
              (i = t.type),
              (a = t.pendingProps),
              (o = e === null ? null : e.memoizedProps),
              (s = a.children),
              Di(i, a) ? (s = null) : o !== null && Di(i, o) && (t.flags |= 32),
              Bs(e, t),
              Fs(e, t, s, n),
              t.child
            );
          case 6:
            return (e === null && Oa(t), null);
          case 13:
            return qs(e, t, n);
          case 4:
            return (
              ho(t, t.stateNode.containerInfo),
              (i = t.pendingProps),
              e === null ? (t.child = za(t, null, i, n)) : Fs(e, t, i, n),
              t.child
            );
          case 11:
            return (
              (i = t.type),
              (a = t.pendingProps),
              (a = t.elementType === i ? a : _s(i, a)),
              Is(e, t, i, a, n)
            );
          case 7:
            return (Fs(e, t, t.pendingProps, n), t.child);
          case 8:
            return (Fs(e, t, t.pendingProps.children, n), t.child);
          case 12:
            return (Fs(e, t, t.pendingProps.children, n), t.child);
          case 10:
            a: {
              if (
                ((i = t.type._context),
                (a = t.pendingProps),
                (o = t.memoizedProps),
                (s = a.value),
                U(Va, i._currentValue),
                (i._currentValue = s),
                o !== null)
              )
                if (Nr(o.value, s)) {
                  if (o.children === a.children && !Ji.current) {
                    t = tc(e, t, n);
                    break a;
                  }
                } else
                  for (
                    o = t.child, o !== null && (o.return = t);
                    o !== null;
                  ) {
                    var c = o.dependencies;
                    if (c !== null) {
                      s = o.child;
                      for (var l = c.firstContext; l !== null; ) {
                        if (l.context === i) {
                          if (o.tag === 1) {
                            ((l = ro(-1, n & -n)), (l.tag = 2));
                            var u = o.updateQueue;
                            if (u !== null) {
                              u = u.shared;
                              var d = u.pending;
                              (d === null
                                ? (l.next = l)
                                : ((l.next = d.next), (d.next = l)),
                                (u.pending = l));
                            }
                          }
                          ((o.lanes |= n),
                            (l = o.alternate),
                            l !== null && (l.lanes |= n),
                            qa(o.return, n, t),
                            (c.lanes |= n));
                          break;
                        }
                        l = l.next;
                      }
                    } else if (o.tag === 10)
                      s = o.type === t.type ? null : o.child;
                    else if (o.tag === 18) {
                      if (((s = o.return), s === null)) throw Error(r(341));
                      ((s.lanes |= n),
                        (c = s.alternate),
                        c !== null && (c.lanes |= n),
                        qa(s, n, t),
                        (s = o.sibling));
                    } else s = o.child;
                    if (s !== null) s.return = o;
                    else
                      for (s = o; s !== null; ) {
                        if (s === t) {
                          s = null;
                          break;
                        }
                        if (((o = s.sibling), o !== null)) {
                          ((o.return = s.return), (s = o));
                          break;
                        }
                        s = s.return;
                      }
                    o = s;
                  }
              (Fs(e, t, a.children, n), (t = t.child));
            }
            return t;
          case 9:
            return (
              (a = t.type),
              (i = t.pendingProps.children),
              Ja(t, n),
              (a = Ya(a)),
              (i = i(a)),
              (t.flags |= 1),
              Fs(e, t, i, n),
              t.child
            );
          case 14:
            return (
              (i = t.type),
              (a = _s(i, t.pendingProps)),
              (a = _s(i.type, a)),
              Ls(e, t, i, a, n)
            );
          case 15:
            return Rs(e, t, t.type, t.pendingProps, n);
          case 17:
            return (
              (i = t.type),
              (a = t.pendingProps),
              (a = t.elementType === i ? a : _s(i, a)),
              ec(e, t),
              (t.tag = 1),
              Zi(i) ? ((e = !0), ta(t)) : (e = !1),
              Ja(t, n),
              xs(t, i, a),
              Cs(t, i, a, n),
              Us(null, t, i, !0, e, n)
            );
          case 19:
            return $s(e, t, n);
          case 22:
            return zs(e, t, n);
        }
        throw Error(r(156, t.tag));
      };
      function Wl(e, t) {
        return gt(e, t);
      }
      function Gl(e, t, n, r) {
        ((this.tag = e),
          (this.key = n),
          (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
              null),
          (this.index = 0),
          (this.ref = null),
          (this.pendingProps = t),
          (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
              null),
          (this.mode = r),
          (this.subtreeFlags = this.flags = 0),
          (this.deletions = null),
          (this.childLanes = this.lanes = 0),
          (this.alternate = null));
      }
      function Kl(e, t, n, r) {
        return new Gl(e, t, n, r);
      }
      function ql(e) {
        return ((e = e.prototype), !(!e || !e.isReactComponent));
      }
      function Jl(e) {
        if (typeof e == `function`) return +!!ql(e);
        if (e != null) {
          if (((e = e.$$typeof), e === ee)) return 11;
          if (e === M) return 14;
        }
        return 2;
      }
      function Yl(e, t) {
        var n = e.alternate;
        return (
          n === null
            ? ((n = Kl(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
          (n.flags = e.flags & 14680064),
          (n.childLanes = e.childLanes),
          (n.lanes = e.lanes),
          (n.child = e.child),
          (n.memoizedProps = e.memoizedProps),
          (n.memoizedState = e.memoizedState),
          (n.updateQueue = e.updateQueue),
          (t = e.dependencies),
          (n.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext }),
          (n.sibling = e.sibling),
          (n.index = e.index),
          (n.ref = e.ref),
          n
        );
      }
      function Xl(e, t, n, i, a, o) {
        var s = 2;
        if (((i = e), typeof e == `function`)) ql(e) && (s = 1);
        else if (typeof e == `string`) s = 5;
        else
          a: switch (e) {
            case E:
              return Zl(n.children, a, o, t);
            case D:
              ((s = 8), (a |= 8));
              break;
            case O:
              return (
                (e = Kl(12, n, t, a | 2)),
                (e.elementType = O),
                (e.lanes = o),
                e
              );
            case j:
              return (
                (e = Kl(13, n, t, a)),
                (e.elementType = j),
                (e.lanes = o),
                e
              );
            case te:
              return (
                (e = Kl(19, n, t, a)),
                (e.elementType = te),
                (e.lanes = o),
                e
              );
            case ne:
              return Ql(n, a, o, t);
            default:
              if (typeof e == `object` && e)
                switch (e.$$typeof) {
                  case k:
                    s = 10;
                    break a;
                  case A:
                    s = 9;
                    break a;
                  case ee:
                    s = 11;
                    break a;
                  case M:
                    s = 14;
                    break a;
                  case N:
                    ((s = 16), (i = null));
                    break a;
                }
              throw Error(r(130, e == null ? e : typeof e, ``));
          }
        return (
          (t = Kl(s, n, t, a)),
          (t.elementType = e),
          (t.type = i),
          (t.lanes = o),
          t
        );
      }
      function Zl(e, t, n, r) {
        return ((e = Kl(7, e, r, t)), (e.lanes = n), e);
      }
      function Ql(e, t, n, r) {
        return (
          (e = Kl(22, e, r, t)),
          (e.elementType = ne),
          (e.lanes = n),
          (e.stateNode = { isHidden: !1 }),
          e
        );
      }
      function $l(e, t, n) {
        return ((e = Kl(6, e, null, t)), (e.lanes = n), e);
      }
      function eu(e, t, n) {
        return (
          (t = Kl(4, e.children === null ? [] : e.children, e.key, t)),
          (t.lanes = n),
          (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
          }),
          t
        );
      }
      function tu(e, t, n, r, i) {
        ((this.tag = t),
          (this.containerInfo = e),
          (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
              null),
          (this.timeoutHandle = -1),
          (this.callbackNode = this.pendingContext = this.context = null),
          (this.callbackPriority = 0),
          (this.eventTimes = Ht(0)),
          (this.expirationTimes = Ht(-1)),
          (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
              0),
          (this.entanglements = Ht(0)),
          (this.identifierPrefix = r),
          (this.onRecoverableError = i),
          (this.mutableSourceEagerHydrationData = null));
      }
      function nu(e, t, n, r, i, a, o, s, c) {
        return (
          (e = new tu(e, t, n, s, c)),
          t === 1 ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
          (a = Kl(3, null, null, t)),
          (e.current = a),
          (a.stateNode = e),
          (a.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
          }),
          to(a),
          e
        );
      }
      function ru(e, t, n) {
        var r =
          3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
          $$typeof: T,
          key: r == null ? null : `` + r,
          children: e,
          containerInfo: t,
          implementation: n,
        };
      }
      function iu(e) {
        if (!e) return qi;
        e = e._reactInternals;
        a: {
          if (ut(e) !== e || e.tag !== 1) throw Error(r(170));
          var t = e;
          do {
            switch (t.tag) {
              case 3:
                t = t.stateNode.context;
                break a;
              case 1:
                if (Zi(t.type)) {
                  t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            t = t.return;
          } while (t !== null);
          throw Error(r(171));
        }
        if (e.tag === 1) {
          var n = e.type;
          if (Zi(n)) return ea(e, n, t);
        }
        return t;
      }
      function au(e, t, n, r, i, a, o, s, c) {
        return (
          (e = nu(n, r, !0, e, i, a, o, s, c)),
          (e.context = iu(null)),
          (n = e.current),
          (r = fl()),
          (i = pl(n)),
          (a = ro(r, i)),
          (a.callback = t ?? null),
          io(n, a, i),
          (e.current.lanes = i),
          Ut(e, i, r),
          hl(e, r),
          e
        );
      }
      function ou(e, t, n, r) {
        var i = t.current,
          a = fl(),
          o = pl(i);
        return (
          (n = iu(n)),
          t.context === null ? (t.context = n) : (t.pendingContext = n),
          (t = ro(a, o)),
          (t.payload = { element: e }),
          (r = r === void 0 ? null : r),
          r !== null && (t.callback = r),
          (e = io(i, t, o)),
          e !== null && (ml(e, i, o, a), ao(e, i, o)),
          o
        );
      }
      function su(e) {
        if (((e = e.current), !e.child)) return null;
        switch (e.child.tag) {
          case 5:
            return e.child.stateNode;
          default:
            return e.child.stateNode;
        }
      }
      function cu(e, t) {
        if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
          var n = e.retryLane;
          e.retryLane = n !== 0 && n < t ? n : t;
        }
      }
      function lu(e, t) {
        (cu(e, t), (e = e.alternate) && cu(e, t));
      }
      function uu() {
        return null;
      }
      var du =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              console.error(e);
            };
      function fu(e) {
        this._internalRoot = e;
      }
      ((pu.prototype.render = fu.prototype.render =
        function (e) {
          var t = this._internalRoot;
          if (t === null) throw Error(r(409));
          ou(e, t, null, null);
        }),
        (pu.prototype.unmount = fu.prototype.unmount =
          function () {
            var e = this._internalRoot;
            if (e !== null) {
              this._internalRoot = null;
              var t = e.containerInfo;
              (Cl(function () {
                ou(null, e, null, null);
              }),
                (t[Ri] = null));
            }
          }));
      function pu(e) {
        this._internalRoot = e;
      }
      pu.prototype.unstable_scheduleHydration = function (e) {
        if (e) {
          var t = Xt();
          e = { blockedOn: null, target: e, priority: t };
          for (var n = 0; n < on.length && t !== 0 && t < on[n].priority; n++);
          (on.splice(n, 0, e), n === 0 && un(e));
        }
      };
      function mu(e) {
        return !(
          !e ||
          (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        );
      }
      function hu(e) {
        return !(
          !e ||
          (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
              e.nodeValue !== ` react-mount-point-unstable `))
        );
      }
      function gu() {}
      function _u(e, t, n, r, i) {
        if (i) {
          if (typeof r == `function`) {
            var a = r;
            r = function () {
              var e = su(o);
              a.call(e);
            };
          }
          var o = au(t, r, e, 0, null, !1, !1, ``, gu);
          return (
            (e._reactRootContainer = o),
            (e[Ri] = o.current),
            pi(e.nodeType === 8 ? e.parentNode : e),
            Cl(),
            o
          );
        }
        for (; (i = e.lastChild); ) e.removeChild(i);
        if (typeof r == `function`) {
          var s = r;
          r = function () {
            var e = su(c);
            s.call(e);
          };
        }
        var c = nu(e, 0, !1, null, null, !1, !1, ``, gu);
        return (
          (e._reactRootContainer = c),
          (e[Ri] = c.current),
          pi(e.nodeType === 8 ? e.parentNode : e),
          Cl(function () {
            ou(t, c, n, r);
          }),
          c
        );
      }
      function vu(e, t, n, r, i) {
        var a = n._reactRootContainer;
        if (a) {
          var o = a;
          if (typeof i == `function`) {
            var s = i;
            i = function () {
              var e = su(o);
              s.call(e);
            };
          }
          ou(t, o, e, i);
        } else o = _u(n, t, e, i, r);
        return su(o);
      }
      ((qt = function (e) {
        switch (e.tag) {
          case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
              var n = It(t.pendingLanes);
              n !== 0 &&
                (Gt(t, n | 1),
                hl(t, bt()),
                !($ & 6) && ((el = bt() + 500), ca()));
            }
            break;
          case 13:
            (Cl(function () {
              var t = $a(e, 1);
              t !== null && ml(t, e, 1, fl());
            }),
              lu(e, 1));
        }
      }),
        (Jt = function (e) {
          if (e.tag === 13) {
            var t = $a(e, 134217728);
            (t !== null && ml(t, e, 134217728, fl()), lu(e, 134217728));
          }
        }),
        (Yt = function (e) {
          if (e.tag === 13) {
            var t = pl(e),
              n = $a(e, t);
            (n !== null && ml(n, e, t, fl()), lu(e, t));
          }
        }),
        (Xt = function () {
          return I;
        }),
        (Zt = function (e, t) {
          var n = I;
          try {
            return ((I = e), t());
          } finally {
            I = n;
          }
        }),
        (Ue = function (e, t, n) {
          switch (t) {
            case `input`:
              if ((xe(e, n), (t = n.name), n.type === `radio` && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                  n = n.querySelectorAll(
                    `input[name=` + JSON.stringify(`` + t) + `][type="radio"]`,
                  ),
                    t = 0;
                  t < n.length;
                  t++
                ) {
                  var i = n[t];
                  if (i !== e && i.form === e.form) {
                    var a = Ui(i);
                    if (!a) throw Error(r(90));
                    (ge(i), xe(i, a));
                  }
                }
              }
              break;
            case `textarea`:
              Oe(e, n);
              break;
            case `select`:
              ((t = n.value), t != null && Te(e, !!n.multiple, t, !1));
          }
        }),
        (Ye = Sl),
        (Xe = Cl));
      var yu = { usingClientEntryPoint: !1, Events: [Vi, Hi, Ui, qe, Je, Sl] },
        bu = {
          findFiberByHostInstance: V,
          bundleType: 0,
          version: `18.3.1`,
          rendererPackageName: `react-dom`,
        },
        xu = {
          bundleType: bu.bundleType,
          version: bu.version,
          rendererPackageName: bu.rendererPackageName,
          rendererConfig: bu.rendererConfig,
          overrideHookState: null,
          overrideHookStateDeletePath: null,
          overrideHookStateRenamePath: null,
          overrideProps: null,
          overridePropsDeletePath: null,
          overridePropsRenamePath: null,
          setErrorHandler: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: C.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return ((e = mt(e)), e === null ? null : e.stateNode);
          },
          findFiberByHostInstance: bu.findFiberByHostInstance || uu,
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
          reconcilerVersion: `18.3.1-next-f1338f8080-20240426`,
        };
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
        var Su = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!Su.isDisabled && Su.supportsFiber)
          try {
            ((Dt = Su.inject(xu)), (Ot = Su));
          } catch {}
      }
      ((e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu),
        (e.createPortal = function (e, t) {
          var n =
            2 < arguments.length && arguments[2] !== void 0
              ? arguments[2]
              : null;
          if (!mu(t)) throw Error(r(200));
          return ru(e, t, null, n);
        }),
        (e.createRoot = function (e, t) {
          if (!mu(e)) throw Error(r(299));
          var n = !1,
            i = ``,
            a = du;
          return (
            t != null &&
              (!0 === t.unstable_strictMode && (n = !0),
              t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
              t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
            (t = nu(e, 1, !1, null, null, n, !1, i, a)),
            (e[Ri] = t.current),
            pi(e.nodeType === 8 ? e.parentNode : e),
            new fu(t)
          );
        }),
        (e.findDOMNode = function (e) {
          if (e == null) return null;
          if (e.nodeType === 1) return e;
          var t = e._reactInternals;
          if (t === void 0)
            throw typeof e.render == `function`
              ? Error(r(188))
              : ((e = Object.keys(e).join(`,`)), Error(r(268, e)));
          return ((e = mt(t)), (e = e === null ? null : e.stateNode), e);
        }),
        (e.flushSync = function (e) {
          return Cl(e);
        }),
        (e.hydrate = function (e, t, n) {
          if (!hu(t)) throw Error(r(200));
          return vu(null, e, t, !0, n);
        }),
        (e.hydrateRoot = function (e, t, n) {
          if (!mu(e)) throw Error(r(405));
          var i = (n != null && n.hydratedSources) || null,
            a = !1,
            o = ``,
            s = du;
          if (
            (n != null &&
              (!0 === n.unstable_strictMode && (a = !0),
              n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
              n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
            (t = au(t, null, e, 1, n ?? null, a, !1, o, s)),
            (e[Ri] = t.current),
            pi(e),
            i)
          )
            for (e = 0; e < i.length; e++)
              ((n = i[e]),
                (a = n._getVersion),
                (a = a(n._source)),
                t.mutableSourceEagerHydrationData == null
                  ? (t.mutableSourceEagerHydrationData = [n, a])
                  : t.mutableSourceEagerHydrationData.push(n, a));
          return new pu(t);
        }),
        (e.render = function (e, t, n) {
          if (!hu(t)) throw Error(r(200));
          return vu(null, e, t, !1, n);
        }),
        (e.unmountComponentAtNode = function (e) {
          if (!hu(e)) throw Error(r(40));
          return e._reactRootContainer
            ? (Cl(function () {
                vu(null, null, e, !1, function () {
                  ((e._reactRootContainer = null), (e[Ri] = null));
                });
              }),
              !0)
            : !1;
        }),
        (e.unstable_batchedUpdates = Sl),
        (e.unstable_renderSubtreeIntoContainer = function (e, t, n, i) {
          if (!hu(n)) throw Error(r(200));
          if (e == null || e._reactInternals === void 0) throw Error(r(38));
          return vu(e, t, n, !1, i);
        }),
        (e.version = `18.3.1-next-f1338f8080-20240426`));
    }),
    m = o((e, t) => {
      function n() {
        if (
          !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
          )
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
          } catch (e) {
            console.error(e);
          }
      }
      (n(), (t.exports = p()));
    }),
    h = c(
      o((e) => {
        var t = m();
        ((e.createRoot = t.createRoot), (e.hydrateRoot = t.hydrateRoot));
      })(),
      1,
    ),
    g = c(u(), 1),
    _ = `colors`,
    v = `sizes`,
    y = `space`,
    b = {
      gap: y,
      gridGap: y,
      columnGap: y,
      gridColumnGap: y,
      rowGap: y,
      gridRowGap: y,
      inset: y,
      insetBlock: y,
      insetBlockEnd: y,
      insetBlockStart: y,
      insetInline: y,
      insetInlineEnd: y,
      insetInlineStart: y,
      margin: y,
      marginTop: y,
      marginRight: y,
      marginBottom: y,
      marginLeft: y,
      marginBlock: y,
      marginBlockEnd: y,
      marginBlockStart: y,
      marginInline: y,
      marginInlineEnd: y,
      marginInlineStart: y,
      padding: y,
      paddingTop: y,
      paddingRight: y,
      paddingBottom: y,
      paddingLeft: y,
      paddingBlock: y,
      paddingBlockEnd: y,
      paddingBlockStart: y,
      paddingInline: y,
      paddingInlineEnd: y,
      paddingInlineStart: y,
      top: y,
      right: y,
      bottom: y,
      left: y,
      scrollMargin: y,
      scrollMarginTop: y,
      scrollMarginRight: y,
      scrollMarginBottom: y,
      scrollMarginLeft: y,
      scrollMarginX: y,
      scrollMarginY: y,
      scrollMarginBlock: y,
      scrollMarginBlockEnd: y,
      scrollMarginBlockStart: y,
      scrollMarginInline: y,
      scrollMarginInlineEnd: y,
      scrollMarginInlineStart: y,
      scrollPadding: y,
      scrollPaddingTop: y,
      scrollPaddingRight: y,
      scrollPaddingBottom: y,
      scrollPaddingLeft: y,
      scrollPaddingX: y,
      scrollPaddingY: y,
      scrollPaddingBlock: y,
      scrollPaddingBlockEnd: y,
      scrollPaddingBlockStart: y,
      scrollPaddingInline: y,
      scrollPaddingInlineEnd: y,
      scrollPaddingInlineStart: y,
      fontSize: `fontSizes`,
      background: _,
      backgroundColor: _,
      backgroundImage: _,
      borderImage: _,
      border: _,
      borderBlock: _,
      borderBlockEnd: _,
      borderBlockStart: _,
      borderBottom: _,
      borderBottomColor: _,
      borderColor: _,
      borderInline: _,
      borderInlineEnd: _,
      borderInlineStart: _,
      borderLeft: _,
      borderLeftColor: _,
      borderRight: _,
      borderRightColor: _,
      borderTop: _,
      borderTopColor: _,
      caretColor: _,
      color: _,
      columnRuleColor: _,
      fill: _,
      outline: _,
      outlineColor: _,
      stroke: _,
      textDecorationColor: _,
      fontFamily: `fonts`,
      fontWeight: `fontWeights`,
      lineHeight: `lineHeights`,
      letterSpacing: `letterSpacings`,
      blockSize: v,
      minBlockSize: v,
      maxBlockSize: v,
      inlineSize: v,
      minInlineSize: v,
      maxInlineSize: v,
      width: v,
      minWidth: v,
      maxWidth: v,
      height: v,
      minHeight: v,
      maxHeight: v,
      flexBasis: v,
      gridTemplateColumns: v,
      gridTemplateRows: v,
      borderWidth: `borderWidths`,
      borderTopWidth: `borderWidths`,
      borderRightWidth: `borderWidths`,
      borderBottomWidth: `borderWidths`,
      borderLeftWidth: `borderWidths`,
      borderStyle: `borderStyles`,
      borderTopStyle: `borderStyles`,
      borderRightStyle: `borderStyles`,
      borderBottomStyle: `borderStyles`,
      borderLeftStyle: `borderStyles`,
      borderRadius: `radii`,
      borderTopLeftRadius: `radii`,
      borderTopRightRadius: `radii`,
      borderBottomRightRadius: `radii`,
      borderBottomLeftRadius: `radii`,
      boxShadow: `shadows`,
      textShadow: `shadows`,
      transition: `transitions`,
      zIndex: `zIndices`,
    },
    x = (e, t) =>
      typeof t == `function`
        ? { "()": Function.prototype.toString.call(t) }
        : t,
    S = () => {
      let e = Object.create(null);
      return (t, n, ...r) => {
        let i = ((e) => JSON.stringify(e, x))(t);
        return i in e ? e[i] : (e[i] = n(t, ...r));
      };
    },
    C = Symbol.for(`sxs.internal`),
    w = (e, t) =>
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)),
    T = (e) => {
      for (let t in e) return !0;
      return !1;
    },
    { hasOwnProperty: E } = Object.prototype,
    D = (e) =>
      e.includes(`-`) ? e : e.replace(/[A-Z]/g, (e) => `-` + e.toLowerCase()),
    O = /\s+(?![^()]*\))/,
    k = (e) => (t) => e(...(typeof t == `string` ? String(t).split(O) : [t])),
    A = {
      appearance: (e) => ({ WebkitAppearance: e, appearance: e }),
      backfaceVisibility: (e) => ({
        WebkitBackfaceVisibility: e,
        backfaceVisibility: e,
      }),
      backdropFilter: (e) => ({ WebkitBackdropFilter: e, backdropFilter: e }),
      backgroundClip: (e) => ({ WebkitBackgroundClip: e, backgroundClip: e }),
      boxDecorationBreak: (e) => ({
        WebkitBoxDecorationBreak: e,
        boxDecorationBreak: e,
      }),
      clipPath: (e) => ({ WebkitClipPath: e, clipPath: e }),
      content: (e) => ({
        content:
          e.includes(`"`) ||
          e.includes(`'`) ||
          /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(
            e,
          )
            ? e
            : `"${e}"`,
      }),
      hyphens: (e) => ({ WebkitHyphens: e, hyphens: e }),
      maskImage: (e) => ({ WebkitMaskImage: e, maskImage: e }),
      maskSize: (e) => ({ WebkitMaskSize: e, maskSize: e }),
      tabSize: (e) => ({ MozTabSize: e, tabSize: e }),
      textSizeAdjust: (e) => ({ WebkitTextSizeAdjust: e, textSizeAdjust: e }),
      userSelect: (e) => ({ WebkitUserSelect: e, userSelect: e }),
      marginBlock: k((e, t) => ({
        marginBlockStart: e,
        marginBlockEnd: t || e,
      })),
      marginInline: k((e, t) => ({
        marginInlineStart: e,
        marginInlineEnd: t || e,
      })),
      maxSize: k((e, t) => ({ maxBlockSize: e, maxInlineSize: t || e })),
      minSize: k((e, t) => ({ minBlockSize: e, minInlineSize: t || e })),
      paddingBlock: k((e, t) => ({
        paddingBlockStart: e,
        paddingBlockEnd: t || e,
      })),
      paddingInline: k((e, t) => ({
        paddingInlineStart: e,
        paddingInlineEnd: t || e,
      })),
    },
    ee = /([\d.]+)([^]*)/,
    j = (e, t) =>
      e.length
        ? e.reduce(
            (e, n) => (
              e.push(
                ...t.map((e) =>
                  e.includes(`&`)
                    ? e.replace(
                        /&/g,
                        /[ +>|~]/.test(n) && /&.*&/.test(e) ? `:is(${n})` : n,
                      )
                    : n + ` ` + e,
                ),
              ),
              e
            ),
            [],
          )
        : t,
    te = (e, t) =>
      e in M && typeof t == `string`
        ? t.replace(
            /^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,
            (t, n, r, i) =>
              n +
              (r === `stretch`
                ? `-moz-available${i};${D(e)}:${n}-webkit-fill-available`
                : `-moz-fit-content${i};${D(e)}:${n}fit-content`) +
              i,
          )
        : String(t),
    M = {
      blockSize: 1,
      height: 1,
      inlineSize: 1,
      maxBlockSize: 1,
      maxHeight: 1,
      maxInlineSize: 1,
      maxWidth: 1,
      minBlockSize: 1,
      minHeight: 1,
      minInlineSize: 1,
      minWidth: 1,
      width: 1,
    },
    N = (e) => (e ? e + `-` : ``),
    ne = (e, t, n) =>
      e.replace(
        /([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,
        (e, r, i, a, o) =>
          (a == `$`) == !!i
            ? e
            : (r || a == `--` ? `calc(` : ``) +
              `var(--` +
              (a === `$`
                ? N(t) + (o.includes(`$`) ? `` : N(n)) + o.replace(/\$/g, `-`)
                : o) +
              `)` +
              (r || a == `--` ? `*` + (r || ``) + (i || `1`) + `)` : ``),
      ),
    re = /\s*,\s*(?![^()]*\))/,
    ie = Object.prototype.toString,
    P = (e, t, n, r, i) => {
      let a,
        o,
        s,
        c = (e, t, n) => {
          let l,
            u,
            d = (e) => {
              for (l in e) {
                let m = l.charCodeAt(0) === 64;
                for (u of m && Array.isArray(e[l]) ? e[l] : [e[l]]) {
                  let e = /[A-Z]/.test((p = l))
                      ? p
                      : p.replace(/-[^]/g, (e) => e[1].toUpperCase()),
                    h =
                      typeof u == `object` &&
                      u &&
                      u.toString === ie &&
                      (!r.utils[e] || !t.length);
                  if (e in r.utils && !h) {
                    let t = r.utils[e];
                    if (t !== o) {
                      ((o = t), d(t(u)), (o = null));
                      continue;
                    }
                  } else if (e in A) {
                    let t = A[e];
                    if (t !== s) {
                      ((s = t), d(t(u)), (s = null));
                      continue;
                    }
                  }
                  if (
                    (m &&
                      ((f =
                        l.slice(1) in r.media
                          ? `@media ` + r.media[l.slice(1)]
                          : l),
                      (l = f.replace(
                        /\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,
                        (e, t, n, r, i, a) => {
                          let o = ee.test(t),
                            s = 0.0625 * (o ? -1 : 1),
                            [c, l] = o ? [r, t] : [t, r];
                          return (
                            `(` +
                            (n[0] === `=`
                              ? ``
                              : (n[0] === `>`) === o
                                ? `max-`
                                : `min-`) +
                            c +
                            `:` +
                            (n[0] !== `=` && n.length === 1
                              ? l.replace(
                                  ee,
                                  (e, t, r) =>
                                    Number(t) + s * (n === `>` ? 1 : -1) + r,
                                )
                              : l) +
                            (i
                              ? `) and (` +
                                (i[0] === `>` ? `min-` : `max-`) +
                                c +
                                `:` +
                                (i.length === 1
                                  ? a.replace(
                                      ee,
                                      (e, t, n) =>
                                        Number(t) +
                                        s * (i === `>` ? -1 : 1) +
                                        n,
                                    )
                                  : a)
                              : ``) +
                            `)`
                          );
                        },
                      ))),
                    h)
                  ) {
                    let e = m ? n.concat(l) : [...n],
                      r = m ? [...t] : j(t, l.split(re));
                    (a !== void 0 && i(ae(...a)), (a = void 0), c(u, r, e));
                  } else
                    (a === void 0 && (a = [[], t, n]),
                      (l =
                        m || l.charCodeAt(0) !== 36
                          ? l
                          : `--${N(r.prefix)}${l.slice(1).replace(/\$/g, `-`)}`),
                      (u = h
                        ? u
                        : typeof u == `number`
                          ? u && e in oe
                            ? String(u) + `px`
                            : String(u)
                          : ne(te(e, u ?? ``), r.prefix, r.themeMap[e])),
                      a[0].push(`${m ? `${l} ` : `${D(l)}:`}${u}`));
                }
              }
              var f, p;
            };
          (d(e), a !== void 0 && i(ae(...a)), (a = void 0));
        };
      c(e, t, n);
    },
    ae = (e, t, n) =>
      `${n.map((e) => `${e}{`).join(``)}${t.length ? `${t.join(`,`)}{` : ``}${e.join(`;`)}${t.length ? `}` : ``}${Array(n.length ? n.length + 1 : 0).join(`}`)}`,
    oe = {
      animationDelay: 1,
      animationDuration: 1,
      backgroundSize: 1,
      blockSize: 1,
      border: 1,
      borderBlock: 1,
      borderBlockEnd: 1,
      borderBlockEndWidth: 1,
      borderBlockStart: 1,
      borderBlockStartWidth: 1,
      borderBlockWidth: 1,
      borderBottom: 1,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
      borderBottomWidth: 1,
      borderEndEndRadius: 1,
      borderEndStartRadius: 1,
      borderInlineEnd: 1,
      borderInlineEndWidth: 1,
      borderInlineStart: 1,
      borderInlineStartWidth: 1,
      borderInlineWidth: 1,
      borderLeft: 1,
      borderLeftWidth: 1,
      borderRadius: 1,
      borderRight: 1,
      borderRightWidth: 1,
      borderSpacing: 1,
      borderStartEndRadius: 1,
      borderStartStartRadius: 1,
      borderTop: 1,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      borderTopWidth: 1,
      borderWidth: 1,
      bottom: 1,
      columnGap: 1,
      columnRule: 1,
      columnRuleWidth: 1,
      columnWidth: 1,
      containIntrinsicSize: 1,
      flexBasis: 1,
      fontSize: 1,
      gap: 1,
      gridAutoColumns: 1,
      gridAutoRows: 1,
      gridTemplateColumns: 1,
      gridTemplateRows: 1,
      height: 1,
      inlineSize: 1,
      inset: 1,
      insetBlock: 1,
      insetBlockEnd: 1,
      insetBlockStart: 1,
      insetInline: 1,
      insetInlineEnd: 1,
      insetInlineStart: 1,
      left: 1,
      letterSpacing: 1,
      margin: 1,
      marginBlock: 1,
      marginBlockEnd: 1,
      marginBlockStart: 1,
      marginBottom: 1,
      marginInline: 1,
      marginInlineEnd: 1,
      marginInlineStart: 1,
      marginLeft: 1,
      marginRight: 1,
      marginTop: 1,
      maxBlockSize: 1,
      maxHeight: 1,
      maxInlineSize: 1,
      maxWidth: 1,
      minBlockSize: 1,
      minHeight: 1,
      minInlineSize: 1,
      minWidth: 1,
      offsetDistance: 1,
      offsetRotate: 1,
      outline: 1,
      outlineOffset: 1,
      outlineWidth: 1,
      overflowClipMargin: 1,
      padding: 1,
      paddingBlock: 1,
      paddingBlockEnd: 1,
      paddingBlockStart: 1,
      paddingBottom: 1,
      paddingInline: 1,
      paddingInlineEnd: 1,
      paddingInlineStart: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingTop: 1,
      perspective: 1,
      right: 1,
      rowGap: 1,
      scrollMargin: 1,
      scrollMarginBlock: 1,
      scrollMarginBlockEnd: 1,
      scrollMarginBlockStart: 1,
      scrollMarginBottom: 1,
      scrollMarginInline: 1,
      scrollMarginInlineEnd: 1,
      scrollMarginInlineStart: 1,
      scrollMarginLeft: 1,
      scrollMarginRight: 1,
      scrollMarginTop: 1,
      scrollPadding: 1,
      scrollPaddingBlock: 1,
      scrollPaddingBlockEnd: 1,
      scrollPaddingBlockStart: 1,
      scrollPaddingBottom: 1,
      scrollPaddingInline: 1,
      scrollPaddingInlineEnd: 1,
      scrollPaddingInlineStart: 1,
      scrollPaddingLeft: 1,
      scrollPaddingRight: 1,
      scrollPaddingTop: 1,
      shapeMargin: 1,
      textDecoration: 1,
      textDecorationThickness: 1,
      textIndent: 1,
      textUnderlineOffset: 1,
      top: 1,
      transitionDelay: 1,
      transitionDuration: 1,
      verticalAlign: 1,
      width: 1,
      wordSpacing: 1,
    },
    se = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97)),
    ce = (e) =>
      ((e) => {
        let t,
          n = ``;
        for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = se(t % 52) + n;
        return se(t % 52) + n;
      })(
        ((e, t) => {
          let n = t.length;
          for (; n; ) e = (33 * e) ^ t.charCodeAt(--n);
          return e;
        })(5381, JSON.stringify(e)) >>> 0,
      ),
    le = [
      `themed`,
      `global`,
      `styled`,
      `onevar`,
      `resonevar`,
      `allvar`,
      `inline`,
    ],
    ue = (e) => {
      if (e.href && !e.href.startsWith(location.origin)) return !1;
      try {
        return !!e.cssRules;
      } catch {
        return !1;
      }
    },
    de = (e) => {
      let t,
        n = () => {
          let { cssRules: e } = t.sheet;
          return [].map
            .call(e, (n, r) => {
              let { cssText: i } = n,
                a = ``;
              if (i.startsWith(`--sxs`)) return ``;
              if (e[r - 1] && (a = e[r - 1].cssText).startsWith(`--sxs`)) {
                if (!n.cssRules.length) return ``;
                for (let e in t.rules)
                  if (t.rules[e].group === n)
                    return `--sxs{--sxs:${[...t.rules[e].cache].join(` `)}}${i}`;
                return n.cssRules.length ? `${a}${i}` : ``;
              }
              return i;
            })
            .join(``);
        },
        r = () => {
          if (t) {
            let { rules: e, sheet: n } = t;
            if (!n.deleteRule) {
              for (; Object(Object(n.cssRules)[0]).type === 3; )
                n.cssRules.splice(0, 1);
              n.cssRules = [];
            }
            for (let t in e) delete e[t];
          }
          let i = Object(e).styleSheets || [];
          for (let e of i)
            if (ue(e)) {
              for (let i = 0, a = e.cssRules; a[i]; ++i) {
                let o = Object(a[i]);
                if (o.type !== 1) continue;
                let s = Object(a[i + 1]);
                if (s.type !== 4) continue;
                ++i;
                let { cssText: c } = o;
                if (!c.startsWith(`--sxs`)) continue;
                let l = c.slice(14, -3).trim().split(/\s+/),
                  u = le[l[0]];
                u &&
                  ((t ||= { sheet: e, reset: r, rules: {}, toString: n }),
                  (t.rules[u] = { group: s, index: i, cache: new Set(l) }));
              }
              if (t) break;
            }
          if (!t) {
            let i = (e, t) => ({
              type: t,
              cssRules: [],
              insertRule(e, t) {
                this.cssRules.splice(
                  t,
                  0,
                  i(
                    e,
                    { import: 3, undefined: 1 }[
                      (e.toLowerCase().match(/^@([a-z]+)/) || [])[1]
                    ] || 4,
                  ),
                );
              },
              get cssText() {
                return e === `@media{}`
                  ? `@media{${[].map.call(this.cssRules, (e) => e.cssText).join(``)}}`
                  : e;
              },
            });
            t = {
              sheet: e
                ? (e.head || e).appendChild(document.createElement(`style`))
                    .sheet
                : i(``, `text/css`),
              rules: {},
              reset: r,
              toString: n,
            };
          }
          let { sheet: a, rules: o } = t;
          for (let e = le.length - 1; e >= 0; --e) {
            let t = le[e];
            if (!o[t]) {
              let n = le[e + 1],
                r = o[n] ? o[n].index : a.cssRules.length;
              (a.insertRule(`@media{}`, r),
                a.insertRule(`--sxs{--sxs:${e}}`, r),
                (o[t] = {
                  group: a.cssRules[r + 1],
                  index: r,
                  cache: new Set([e]),
                }));
            }
            fe(o[t]);
          }
        };
      return (r(), t);
    },
    fe = (e) => {
      let t = e.group,
        n = t.cssRules.length;
      e.apply = (e) => {
        try {
          (t.insertRule(e, n), ++n);
        } catch {}
      };
    },
    pe = Symbol(),
    me = S(),
    he = (e, t) =>
      me(e, () => (...n) => {
        let r = { type: null, composers: new Set() };
        for (let t of n)
          if (t != null)
            if (t[C]) {
              r.type ??= t[C].type;
              for (let e of t[C].composers) r.composers.add(e);
            } else
              t.constructor !== Object || t.$$typeof
                ? (r.type ??= t)
                : r.composers.add(ge(t, e));
        return (
          (r.type ??= `span`),
          r.composers.size || r.composers.add([`PJLV`, {}, [], [], {}, []]),
          _e(e, r, t)
        );
      }),
    ge = (
      { variants: e, compoundVariants: t, defaultVariants: n, ...r },
      i,
    ) => {
      let a = `${N(i.prefix)}c-${ce(r)}`,
        o = [],
        s = [],
        c = Object.create(null),
        l = [];
      for (let e in n) c[e] = String(n[e]);
      if (typeof e == `object` && e)
        for (let t in e) {
          ((u = c), (d = t), E.call(u, d) || (c[t] = `undefined`));
          let n = e[t];
          for (let e in n) {
            let r = { [t]: String(e) };
            String(e) === `undefined` && l.push(t);
            let i = n[e],
              a = [r, i, !T(i)];
            o.push(a);
          }
        }
      var u, d;
      if (typeof t == `object` && t)
        for (let e of t) {
          let { css: t, ...n } = e;
          t = (typeof t == `object` && t) || {};
          for (let e in n) n[e] = String(n[e]);
          let r = [n, t, !T(t)];
          s.push(r);
        }
      return [a, r, o, s, c, l];
    },
    _e = (e, t, n) => {
      let [r, i, a, o] = ve(t.composers),
        s =
          typeof t.type == `function` || t.type.$$typeof
            ? ((e) => {
                function t() {
                  for (let n = 0; n < t[pe].length; n++) {
                    let [r, i] = t[pe][n];
                    e.rules[r].apply(i);
                  }
                  return ((t[pe] = []), null);
                }
                return (
                  (t[pe] = []),
                  (t.rules = {}),
                  le.forEach(
                    (e) => (t.rules[e] = { apply: (n) => t[pe].push([e, n]) }),
                  ),
                  t
                );
              })(n)
            : null,
        c = (s || n).rules,
        l = `.${r}${i.length > 1 ? `:where(.${i.slice(1).join(`.`)})` : ``}`,
        u = (u) => {
          u = (typeof u == `object` && u) || be;
          let { css: d, ...f } = u,
            p = {};
          for (let e in a)
            if ((delete f[e], e in u)) {
              let t = u[e];
              typeof t == `object` && t
                ? (p[e] = { "@initial": a[e], ...t })
                : ((t = String(t)),
                  (p[e] = t !== `undefined` || o.has(e) ? t : a[e]));
            } else p[e] = a[e];
          let m = new Set([...i]);
          for (let [r, i, a, o] of t.composers) {
            n.rules.styled.cache.has(r) ||
              (n.rules.styled.cache.add(r),
              P(i, [`.${r}`], [], e, (e) => {
                c.styled.apply(e);
              }));
            let t = ye(a, p, e.media),
              s = ye(o, p, e.media, !0);
            for (let i of t)
              if (i !== void 0)
                for (let [t, a, o] of i) {
                  let i = `${r}-${ce(a)}-${t}`;
                  m.add(i);
                  let s = (o ? n.rules.resonevar : n.rules.onevar).cache,
                    l = o ? c.resonevar : c.onevar;
                  s.has(i) ||
                    (s.add(i),
                    P(a, [`.${i}`], [], e, (e) => {
                      l.apply(e);
                    }));
                }
            for (let t of s)
              if (t !== void 0)
                for (let [i, a] of t) {
                  let t = `${r}-${ce(a)}-${i}`;
                  (m.add(t),
                    n.rules.allvar.cache.has(t) ||
                      (n.rules.allvar.cache.add(t),
                      P(a, [`.${t}`], [], e, (e) => {
                        c.allvar.apply(e);
                      })));
                }
          }
          if (typeof d == `object` && d) {
            let t = `${r}-i${ce(d)}-css`;
            (m.add(t),
              n.rules.inline.cache.has(t) ||
                (n.rules.inline.cache.add(t),
                P(d, [`.${t}`], [], e, (e) => {
                  c.inline.apply(e);
                })));
          }
          for (let e of String(u.className || ``)
            .trim()
            .split(/\s+/))
            e && m.add(e);
          let h = (f.className = [...m].join(` `));
          return {
            type: t.type,
            className: h,
            selector: l,
            props: f,
            toString: () => h,
            deferredInjector: s,
          };
        };
      return w(u, {
        className: r,
        selector: l,
        [C]: t,
        toString: () => (n.rules.styled.cache.has(r) || u(), r),
      });
    },
    ve = (e) => {
      let t = ``,
        n = [],
        r = {},
        i = [];
      for (let [a, , , , o, s] of e) {
        (t === `` && (t = a), n.push(a), i.push(...s));
        for (let e in o) {
          let t = o[e];
          (r[e] === void 0 || t !== `undefined` || s.includes(t)) && (r[e] = t);
        }
      }
      return [t, n, r, new Set(i)];
    },
    ye = (e, t, n, r) => {
      let i = [];
      e: for (let [a, o, s] of e) {
        if (s) continue;
        let e,
          c = 0,
          l = !1;
        for (e in a) {
          let r = a[e],
            i = t[e];
          if (i !== r) {
            if (typeof i != `object` || !i) continue e;
            {
              let e,
                t,
                a = 0;
              for (let o in i) {
                if (r === String(i[o])) {
                  if (o !== `@initial`) {
                    let e = o.slice(1);
                    ((t ||= []).push(
                      e in n ? n[e] : o.replace(/^@media ?/, ``),
                    ),
                      (l = !0));
                  }
                  ((c += a), (e = !0));
                }
                ++a;
              }
              if (
                (t && t.length && (o = { [`@media ` + t.join(`, `)]: o }), !e)
              )
                continue e;
            }
          }
        }
        (i[c] = i[c] || []).push([r ? `cv` : `${e}-${a[e]}`, o, l]);
      }
      return i;
    },
    be = {},
    xe = S(),
    Se = (e, t) =>
      xe(e, () => (...n) => {
        let r = () => {
          for (let r of n) {
            r = (typeof r == `object` && r) || {};
            let n = ce(r);
            if (!t.rules.global.cache.has(n)) {
              if ((t.rules.global.cache.add(n), `@import` in r)) {
                let e =
                  [].indexOf.call(t.sheet.cssRules, t.rules.themed.group) - 1;
                for (let n of [].concat(r[`@import`]))
                  ((n = n.includes(`"`) || n.includes(`'`) ? n : `"${n}"`),
                    t.sheet.insertRule(`@import ${n};`, e++));
                delete r[`@import`];
              }
              P(r, [], [], e, (e) => {
                t.rules.global.apply(e);
              });
            }
          }
          return ``;
        };
        return w(r, { toString: r });
      }),
    Ce = S(),
    we = (e, t) =>
      Ce(e, () => (n) => {
        let r = `${N(e.prefix)}k-${ce(n)}`,
          i = () => {
            if (!t.rules.global.cache.has(r)) {
              t.rules.global.cache.add(r);
              let i = [];
              P(n, [], [], e, (e) => i.push(e));
              let a = `@keyframes ${r}{${i.join(``)}}`;
              t.rules.global.apply(a);
            }
            return r;
          };
        return w(i, {
          get name() {
            return i();
          },
          toString: i,
        });
      }),
    Te = class {
      constructor(e, t, n, r) {
        ((this.token = e == null ? `` : String(e)),
          (this.value = t == null ? `` : String(t)),
          (this.scale = n == null ? `` : String(n)),
          (this.prefix = r == null ? `` : String(r)));
      }
      get computedValue() {
        return `var(` + this.variable + `)`;
      }
      get variable() {
        return `--` + N(this.prefix) + N(this.scale) + this.token;
      }
      toString() {
        return this.computedValue;
      }
    },
    Ee = S(),
    De = (e, t) =>
      Ee(e, () => (n, r) => {
        r = (typeof n == `object` && n) || Object(r);
        let i = `.${(n = (n = typeof n == `string` ? n : ``) || `${N(e.prefix)}t-${ce(r)}`)}`,
          a = {},
          o = [];
        for (let t in r) {
          a[t] = {};
          for (let n in r[t]) {
            let i = `--${N(e.prefix)}${t}-${n}`,
              s = ne(String(r[t][n]), e.prefix, t);
            ((a[t][n] = new Te(n, s, t, e.prefix)), o.push(`${i}:${s}`));
          }
        }
        let s = () => {
          if (o.length && !t.rules.themed.cache.has(n)) {
            t.rules.themed.cache.add(n);
            let i = `${r === e.theme ? `:root,` : ``}.${n}{${o.join(`;`)}}`;
            t.rules.themed.apply(i);
          }
          return n;
        };
        return {
          ...a,
          get className() {
            return s();
          },
          selector: i,
          toString: s,
        };
      }),
    Oe = S(),
    ke = S(),
    {
      styled: F,
      css: Ae,
      globalCss: je,
      keyframes: Me,
    } = ((e) => {
      let t = ((e) => {
        let t = !1,
          n = Oe(e, (e) => {
            t = !0;
            let n =
                `prefix` in (e = (typeof e == `object` && e) || {})
                  ? String(e.prefix)
                  : ``,
              r = (typeof e.media == `object` && e.media) || {},
              i =
                typeof e.root == `object`
                  ? e.root || null
                  : globalThis.document || null,
              a = (typeof e.theme == `object` && e.theme) || {},
              o = {
                prefix: n,
                media: r,
                theme: a,
                themeMap: (typeof e.themeMap == `object` && e.themeMap) || {
                  ...b,
                },
                utils: (typeof e.utils == `object` && e.utils) || {},
              },
              s = de(i),
              c = {
                css: he(o, s),
                globalCss: Se(o, s),
                keyframes: we(o, s),
                createTheme: De(o, s),
                reset() {
                  (s.reset(), c.theme.toString());
                },
                theme: {},
                sheet: s,
                config: o,
                prefix: n,
                getCssText: s.toString,
                toString: s.toString,
              };
            return (String((c.theme = c.createTheme(a))), c);
          });
        return (t || n.reset(), n);
      })(e);
      return (
        (t.styled = (({ config: e, sheet: t }) =>
          ke(e, () => {
            let n = he(e, t);
            return (...e) => {
              let t = n(...e),
                r = t[C].type,
                i = g.forwardRef((e, n) => {
                  let i = (e && e.as) || r,
                    { props: a, deferredInjector: o } = t(e);
                  return (
                    delete a.as,
                    (a.ref = n),
                    o
                      ? g.createElement(
                          g.Fragment,
                          null,
                          g.createElement(i, a),
                          g.createElement(o, null),
                        )
                      : g.createElement(i, a)
                  );
                });
              return (
                (i.className = t.className),
                (i.displayName = `Styled.${r.displayName || r.name || r}`),
                (i.selector = t.selector),
                (i.toString = () => t.selector),
                (i[C] = t[C]),
                i
              );
            };
          }))(t)),
        t
      );
    })({
      theme: {
        colors: {
          gray100: `#f8fafc`,
          gray200: `#f1f3f5`,
          gray300: `#e9ecef`,
          gray400: `#ced4da`,
          gray500: `#868e96`,
          gray600: `#495057`,
          gray700: `#343a40`,
          gray800: `#212529`,
          blue100: `#e7f5ff`,
          blue200: `#d0ebff`,
          blue300: `#a5d8ff`,
          blue400: `#74c0fc`,
          blue500: `#339af0`,
          blue600: `#228be6`,
          blue700: `#1c7ed6`,
          blue800: `#1971c2`,
          red100: `#fff5f5`,
          red200: `#ffe3e3`,
          red300: `#ffc9c9`,
          red400: `#ffa8a8`,
          red500: `#ff6b6b`,
          red600: `#fa5252`,
          red700: `#f03e3e`,
          red800: `#e03131`,
          white: `#ffffff`,
        },
        fonts: { body: `Inter, system-ui, sans-serif` },
        radii: { sm: `8px`, md: `12px`, lg: `16px` },
        shadows: { card: `0 12px 32px rgba(15, 23, 42, 0.08)` },
      },
      media: { sm: `(min-width: 640px)`, lg: `(min-width: 1024px)` },
      utils: { px: (e) => ({ paddingLeft: e, paddingRight: e }) },
    }),
    Ne = je({
      "*": { boxSizing: `border-box` },
      html: { fontSize: `16px` },
      body: {
        margin: 0,
        minHeight: `100vh`,
        fontFamily: `$body`,
        backgroundColor: `$gray100`,
        color: `$gray800`,
      },
      button: { fontFamily: `$body` },
      a: { color: `inherit`, textDecoration: `none` },
    }),
    Pe = `https://airtable-proxy-olive.vercel.app`;
  function Fe(e) {
    return e && typeof e == `object`
      ? typeof e.error == `string`
        ? e.error
        : e.error && typeof e.error == `object`
          ? e.error.message || e.error.type || JSON.stringify(e.error)
          : JSON.stringify(e)
      : typeof e == `string`
        ? e
        : `Unknown error`;
  }
  function Ie(e, t) {
    let n = Fe(t) || e.statusText || `Unknown error`,
      r = Error(n);
    return (
      e.status === 401 &&
        /invalid or expired user session token|invalid authentication token/i.test(
          n,
        ) &&
        (r.isAuthError = !0),
      t &&
        t.details &&
        t.details.error &&
        t.details.error.type === `INVALID_API_VERSION` &&
        (r.isAuthError = !0),
      (e.status === 429 || /rate limited/i.test(n)) && (r.isRateLimit = !0),
      r
    );
  }
  async function Le(e) {
    try {
      return await e.json();
    } catch {
      return await e.text();
    }
  }
  async function Re(e) {
    try {
      let t = await fetch(`${Pe}/api/records`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ userToken: e }),
      });
      if (t.ok) return await t.json();
      let n = await Le(t);
      throw (
        console.error(`Airtable proxy /api/records failed`, t.status, n),
        Ie(t, n)
      );
    } catch (e) {
      throw (console.error(`Airtable proxy request failed`, e), e);
    }
  }
  async function ze(e, t) {
    try {
      let n = await fetch(`${Pe}/api/comments?recordId=${e}`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ userToken: t }),
      });
      if (n.ok) return await n.json();
      let r = Ie(n, await Le(n));
      throw (
        (n.status === 429 || r.isRateLimit) &&
          (r.message = `Rate limited. Comments are temporarily unavailable. Please try again later.`),
        r
      );
    } catch (e) {
      throw (console.error(`Comment fetch failed`, e), e);
    }
  }
  async function Be(e, t, n) {
    try {
      let r = await fetch(`${Pe}/api/submit`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ userToken: n, recordId: e, commentText: t }),
      });
      if (r.ok) return await r.json();
      throw Ie(r, await Le(r));
    } catch (e) {
      throw (console.error(`Comment submit failed`, e), e);
    }
  }
  async function Ve(e) {
    try {
      let t = await fetch(`${Pe}/api/profile`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ userToken: e }),
      });
      return t.ok ? await t.json() : null;
    } catch {
      return null;
    }
  }
  async function He(e, t, n) {
    try {
      let r = await fetch(`${Pe}/api/reactions`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ userToken: n, venueId: e, type: t }),
      });
      if (r.ok) return await r.json();
      throw Ie(r, await Le(r));
    } catch (e) {
      throw (console.error(`Reaction submit failed`, e), e);
    }
  }
  var Ue = `5cf62d42-4eab-4c8c-9509-5aba4e28c22d`,
    We = `https://airtable-proxy-olive.vercel.app`,
    Ge = `https://tylerremmel.github.io/wedding-planning/venues/`;
  function Ke() {
    try {
      return window.location.origin + window.location.pathname;
    } catch {
      return Ge;
    }
  }
  function qe(e) {
    let t = ``,
      n = new Uint32Array(e);
    window.crypto.getRandomValues(n);
    for (let r = 0; r < e; r++)
      t += `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`[
        n[r] % 66
      ];
    return t;
  }
  async function Je(e) {
    let t = new TextEncoder().encode(e),
      n = await window.crypto.subtle.digest(`SHA-256`, t);
    return btoa(String.fromCharCode(...new Uint8Array(n)))
      .replace(/\+/g, `-`)
      .replace(/\//g, `_`)
      .replace(/=+$/, ``);
  }
  async function Ye() {
    let e = qe(16),
      t = qe(64);
    (localStorage.setItem(`oauth_state`, e),
      localStorage.setItem(`oauth_code_verifier`, t));
    let n = await Je(t),
      r = new URLSearchParams();
    (r.append(`response_type`, `code`),
      r.append(`client_id`, Ue),
      r.append(`redirect_uri`, Ke()),
      r.append(
        `scope`,
        `user.email:read data.records:read data.records:write data.recordComments:read data.recordComments:write`,
      ),
      r.append(`state`, e),
      r.append(`code_challenge`, n),
      r.append(`code_challenge_method`, `S256`));
    let i = `https://airtable.com/oauth2/v1/authorize?${r.toString()}`;
    window.location.href = i;
  }
  async function Xe(e) {
    try {
      let t = await fetch(`${We}/api/auth`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({
          code: e,
          redirectUri: Ke(),
          codeVerifier: localStorage.getItem(`oauth_code_verifier`),
        }),
      });
      if (t.ok) {
        let e = await t.json();
        return (
          localStorage.setItem(`airtable_user_token`, e.access_token),
          localStorage.setItem(`user_email`, `Verified User`),
          !0
        );
      } else {
        let e = await t.json();
        return (console.error(`exchangeCodeForToken error`, e), !1);
      }
    } catch (e) {
      return (console.error(e), !1);
    }
  }
  function Ze() {
    let e = localStorage.getItem(`airtable_user_token`);
    return e && e !== `undefined` && e !== `null` ? e : null;
  }
  function Qe() {
    (localStorage.clear(), window.location.reload());
  }
  var $e = Me({ "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } }),
    et = F(`article`, {
      backgroundColor: `$white`,
      border: `1px solid $gray300`,
      borderRadius: `$lg`,
      overflow: `hidden`,
      boxShadow: `$card`,
      display: `flex`,
      flexDirection: `column`,
      cursor: `pointer`,
      transition: `background 0.25s ease`,
      "&:hover": { backgroundColor: `$gray100` },
    }),
    tt = F(`figure`, {
      position: `relative`,
      width: `100%`,
      aspectRatio: `1 / 1`,
      overflow: `hidden`,
      backgroundColor: `$gray200`,
      marginBottom: 0,
    }),
    nt = F(`img`, {
      width: `100%`,
      height: `100%`,
      objectFit: `cover`,
      objectPosition: `center`,
      display: `block`,
    }),
    rt = F(`button`, {
      position: `absolute`,
      top: `50%`,
      transform: `translateY(-50%)`,
      width: `36px`,
      height: `36px`,
      borderRadius: `50%`,
      backgroundColor: `rgba(255,255,255,0.92)`,
      border: `none`,
      color: `$gray800`,
      fontWeight: 700,
      cursor: `pointer`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      boxShadow: `0 2px 8px rgba(0,0,0,0.08)`,
      variants: {
        position: { left: { left: `15px` }, right: { right: `15px` } },
      },
      transition: `background 0.25s ease`,
      "&:hover": { backgroundColor: `rgba(235,235,235,0.92)` },
    }),
    it = F(`div`, { padding: `16px` }),
    at = F(`div`, {
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `flex-start`,
      marginBottom: `4px`,
    }),
    ot = F(`div`, {
      textDecoration: `none`,
      color: `inherit`,
      "& h3": { margin: 0, fontSize: `1.1rem`, fontWeight: 700 },
    }),
    st = F(`p`, { color: `$gray500`, fontSize: `0.85rem`, lineHeight: 1.5 }),
    ct = F(`p`, {
      margin: `0 0 12px`,
      color: `$gray600`,
      fontSize: `0.95rem`,
      lineHeight: 1.5,
    }),
    lt = F(`div`, { borderTop: `1px solid $gray200`, paddingTop: `16px` });
  F(`div`, {
    fontSize: `0.9rem`,
    fontWeight: 700,
    color: `$gray700`,
    marginBottom: `10px`,
  });
  var ut = F(`div`, { display: `grid`, gap: `12px` }),
    dt = F(`div`, {
      display: `block`,
      fontSize: `0.9rem`,
      lineHeight: 1.4,
      color: `$gray700`,
    }),
    ft = F(`span`, {
      fontWeight: 700,
      color: `$gray800`,
      whiteSpace: `nowrap`,
      paddingRight: `4px`,
    }),
    pt = F(`span`, { color: `$gray700`, paddingTop: `12px` }),
    mt = F(`div`, {}),
    ht = F(`div`, { display: `flex`, gap: `8px` }),
    gt = F(`button`, {
      display: `inline-flex`,
      gap: `4px`,
      alignItems: `center`,
      padding: `8px 12px`,
      borderRadius: `$sm`,
      border: `none`,
      cursor: `pointer`,
      fontWeight: 700,
      fontSize: `0.8rem`,
      lineHeight: 1,
      textDecoration: `none !important`,
      transition: `background 0.25s ease`,
      "&:disabled": { opacity: 0.65, cursor: `not-allowed` },
      variants: {
        color: {
          blue: {
            backgroundColor: `$blue700`,
            color: `$white`,
            "&:hover": { backgroundColor: `$blue800` },
          },
          red: {
            backgroundColor: `$red700`,
            color: `$white`,
            "&:hover": { backgroundColor: `$red800` },
          },
          gray: {
            backgroundColor: `$gray300`,
            color: `$gray800`,
            "&:hover": { backgroundColor: `$gray400` },
          },
          black: {
            backgroundColor: `$gray800`,
            color: `$white`,
            "&:hover": { backgroundColor: `$gray700` },
          },
        },
      },
    }),
    _t = F(`span`, { position: `relative`, top: `2px` }),
    vt = F(`form`, { display: `grid`, gap: `12px`, marginTop: `12px` }),
    yt = F(`textarea`, {
      width: `100%`,
      minHeight: `80px`,
      padding: `12px`,
      borderRadius: `$sm`,
      border: `1px solid $gray300`,
      resize: `vertical`,
      fontSize: `0.95rem`,
      color: `$gray800`,
      backgroundColor: `$white`,
    }),
    bt = F(`div`, { justifySelf: `flex-end`, display: `flex`, gap: `8px` }),
    xt = F(`div`, { fontSize: `0.85rem`, color: `$gray500` }),
    St = F(`div`, {
      padding: `24px`,
      width: `calc(50vw + 0.1 * min(100vw, 1240px) - 20px)`,
    }),
    Ct = F(`button`, {
      position: `absolute`,
      top: `24px`,
      right: `24px`,
      padding: `10px`,
      height: `38px`,
      width: `38px`,
      borderRadius: `100px`,
      border: `1px solid $gray300`,
      backgroundColor: `$white`,
      color: `$gray800`,
      fontWeight: 700,
      transition: `background 0.25s ease`,
      "&:hover": { backgroundColor: `$gray200` },
    }),
    wt = F(`h2`, {
      fontSize: `1.5rem`,
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: `16px`,
      paddingRight: `60px`,
      wordBreak: `break-word`,
    }),
    Tt = F(`div`, { display: `flex`, gap: `12px` }),
    Et = F(`div`, {
      display: `flex`,
      alignItems: `center`,
      gap: `8px`,
      marginBottom: `6px`,
      fontSize: `0.9rem`,
      color: `$gray500`,
      a: {
        transition: `color 0.25s ease`,
        textDecoration: `none`,
        color: `inherit`,
        "&:hover": { textDecoration: `none`, color: `$gray700` },
      },
    }),
    Dt = F(`div`, { marginBottom: `16px` }),
    Ot = F(`div`, {
      borderBottom: `1px solid $gray200`,
      padding: `16px 0`,
      marginBottom: `16px`,
      position: `sticky`,
      top: `0px`,
      backgroundColor: `$white`,
      zIndex: 1,
    }),
    kt = F(`div`, {
      fontSize: `0.95rem`,
      lineHeight: 1.5,
      color: `$gray700`,
      marginBottom: `24px`,
    }),
    At = F(`div`, {
      display: `flex`,
      flexDirection: `column`,
      flexWrap: `wrap`,
      gap: `16px`,
      marginTop: `24px`,
      paddingTop: `24px`,
      borderTop: `1px solid $gray200`,
    }),
    jt = F(`div`, {
      position: `relative`,
      overflow: `hidden`,
      borderRadius: `$sm`,
      backgroundColor: `$gray200`,
    }),
    Mt = F(`div`, {
      position: `absolute`,
      inset: 0,
      backgroundColor: `$gray300`,
      animation: `${$e} 1.5s ease-in-out infinite`,
    }),
    Nt = F(`img`, {
      width: `100%`,
      height: `100%`,
      objectFit: `cover`,
      objectPosition: `center`,
      display: `block`,
      transition: `opacity 0.3s ease`,
    }),
    Pt = {
      color: void 0,
      size: void 0,
      className: void 0,
      style: void 0,
      attr: void 0,
    },
    Ft = g.createContext && g.createContext(Pt),
    It = [`attr`, `size`, `title`];
  function Lt(e, t) {
    if (e == null) return {};
    var n,
      r,
      i = Rt(e, t);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (r = 0; r < a.length; r++)
        ((n = a[r]),
          t.indexOf(n) === -1 &&
            {}.propertyIsEnumerable.call(e, n) &&
            (i[n] = e[n]));
    }
    return i;
  }
  function Rt(e, t) {
    if (e == null) return {};
    var n = {};
    for (var r in e)
      if ({}.hasOwnProperty.call(e, r)) {
        if (t.indexOf(r) !== -1) continue;
        n[r] = e[r];
      }
    return n;
  }
  function zt() {
    return (
      (zt = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      zt.apply(null, arguments)
    );
  }
  function Bt(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function Vt(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] == null ? {} : arguments[t];
      t % 2
        ? Bt(Object(n), !0).forEach(function (t) {
            Ht(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Bt(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function Ht(e, t, n) {
    return (
      (t = Ut(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function Ut(e) {
    var t = Wt(e, `string`);
    return typeof t == `symbol` ? t : t + ``;
  }
  function Wt(e, t) {
    if (typeof e != `object` || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
      var r = n.call(e, t || `default`);
      if (typeof r != `object`) return r;
      throw TypeError(`@@toPrimitive must return a primitive value.`);
    }
    return (t === `string` ? String : Number)(e);
  }
  function Gt(e) {
    return (
      e &&
      e.map((e, t) =>
        g.createElement(e.tag, Vt({ key: t }, e.attr), Gt(e.child)),
      )
    );
  }
  function I(e) {
    return (t) =>
      g.createElement(Kt, zt({ attr: Vt({}, e.attr) }, t), Gt(e.child));
  }
  function Kt(e) {
    var t = (t) => {
      var { attr: n, size: r, title: i } = e,
        a = Lt(e, It),
        o = r || t.size || `1em`,
        s;
      return (
        t.className && (s = t.className),
        e.className && (s = (s ? s + ` ` : ``) + e.className),
        g.createElement(
          `svg`,
          zt(
            { stroke: `currentColor`, fill: `currentColor`, strokeWidth: `0` },
            t.attr,
            n,
            a,
            {
              className: s,
              style: Vt(Vt({ color: e.color || t.color }, t.style), e.style),
              height: o,
              width: o,
              xmlns: `http://www.w3.org/2000/svg`,
            },
          ),
          i && g.createElement(`title`, null, i),
          e.children,
        )
      );
    };
    return Ft === void 0
      ? t(Pt)
      : g.createElement(Ft.Consumer, null, (e) => t(e));
  }
  function qt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function Jt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function Yt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function Xt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 384 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function Zt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function Qt(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function $t(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function en(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function tn(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M466.27 225.31c4.674-22.647.864-44.538-8.99-62.99 2.958-23.868-4.021-48.565-17.34-66.99C438.986 39.423 404.117 0 327 0c-7 0-15 .01-22.22.01C201.195.01 168.997 40 128 40h-10.845c-5.64-4.975-13.042-8-21.155-8H32C14.327 32 0 46.327 0 64v240c0 17.673 14.327 32 32 32h64c11.842 0 22.175-6.438 27.708-16h7.052c19.146 16.953 46.013 60.653 68.76 83.4 13.667 13.667 10.153 108.6 71.76 108.6 57.58 0 95.27-31.936 95.27-104.73 0-18.41-3.93-33.73-8.85-46.54h36.48c48.602 0 85.82-41.565 85.82-85.58 0-19.15-4.96-34.99-13.73-49.84zM64 296c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm330.18 16.73H290.19c0 37.82 28.36 55.37 28.36 94.54 0 23.75 0 56.73-47.27 56.73-18.91-18.91-9.46-66.18-37.82-94.54C206.9 342.89 167.28 272 138.92 272H128V85.83c53.611 0 100.001-37.82 171.64-37.82h37.82c35.512 0 60.82 17.12 53.12 65.9 15.2 8.16 26.5 36.44 13.94 57.57 21.581 20.384 18.699 51.065 5.21 65.62 9.45 0 22.36 18.91 22.27 37.81-.09 18.91-16.71 37.82-37.82 37.82z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function nn(e) {
    return I({
      tag: `svg`,
      attr: { viewBox: `0 0 512 512` },
      child: [
        {
          tag: `path`,
          attr: {
            d: `M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z`,
          },
          child: [],
        },
      ],
    })(e);
  }
  function rn(e) {
    var t,
      n,
      r = ``;
    if (typeof e == `string` || typeof e == `number`) r += e;
    else if (typeof e == `object`)
      if (Array.isArray(e)) {
        var i = e.length;
        for (t = 0; t < i; t++)
          e[t] && (n = rn(e[t])) && (r && (r += ` `), (r += n));
      } else for (n in e) e[n] && (r && (r += ` `), (r += n));
    return r;
  }
  function an() {
    for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
      (e = arguments[n]) && (t = rn(e)) && (r && (r += ` `), (r += t));
    return r;
  }
  function on(e, t, n = void 0) {
    let r = {};
    for (let i in e) {
      let a = e[i],
        o = ``,
        s = !0;
      for (let e = 0; e < a.length; e += 1) {
        let r = a[e];
        r &&
          ((o += (s === !0 ? `` : ` `) + t(r)),
          (s = !1),
          n && n[r] && (o += ` ` + n[r]));
      }
      r[i] = o;
    }
    return r;
  }
  var sn = o((e) => {
      var t = u(),
        n = Symbol.for(`react.element`),
        r = Symbol.for(`react.fragment`),
        i = Object.prototype.hasOwnProperty,
        a =
          t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentOwner,
        o = { key: !0, ref: !0, __self: !0, __source: !0 };
      function s(e, t, r) {
        var s,
          c = {},
          l = null,
          u = null;
        for (s in (r !== void 0 && (l = `` + r),
        t.key !== void 0 && (l = `` + t.key),
        t.ref !== void 0 && (u = t.ref),
        t))
          i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
        if (e && e.defaultProps)
          for (s in ((t = e.defaultProps), t)) c[s] === void 0 && (c[s] = t[s]);
        return {
          $$typeof: n,
          type: e,
          key: l,
          ref: u,
          props: c,
          _owner: a.current,
        };
      }
      ((e.Fragment = r), (e.jsx = s), (e.jsxs = s));
    }),
    L = o((e, t) => {
      t.exports = sn();
    })(),
    cn = g.createContext(),
    ln = () => g.useContext(cn) ?? !1;
  function un(e) {
    return (e && e.ownerDocument) || document;
  }
  function dn(e) {
    return un(e).defaultView || window;
  }
  function fn(e = window) {
    let t = e.document.documentElement.clientWidth;
    return e.innerWidth - t;
  }
  function pn(e) {
    let t = un(e);
    return t.body === e
      ? dn(e).innerWidth > t.documentElement.clientWidth
      : e.scrollHeight > e.clientHeight;
  }
  function mn(e, t) {
    t
      ? e.setAttribute(`aria-hidden`, `true`)
      : e.removeAttribute(`aria-hidden`);
  }
  function hn(e) {
    return parseFloat(dn(e).getComputedStyle(e).paddingRight) || 0;
  }
  function gn(e) {
    let t = [
        `TEMPLATE`,
        `SCRIPT`,
        `STYLE`,
        `LINK`,
        `MAP`,
        `META`,
        `NOSCRIPT`,
        `PICTURE`,
        `COL`,
        `COLGROUP`,
        `PARAM`,
        `SLOT`,
        `SOURCE`,
        `TRACK`,
      ].includes(e.tagName),
      n = e.tagName === `INPUT` && e.getAttribute(`type`) === `hidden`;
    return t || n;
  }
  function _n(e, t, n, r, i) {
    let a = [t, n, ...r];
    [].forEach.call(e.children, (e) => {
      let t = !a.includes(e),
        n = !gn(e);
      t && n && mn(e, i);
    });
  }
  function vn(e, t) {
    let n = -1;
    return (e.some((e, r) => (t(e) ? ((n = r), !0) : !1)), n);
  }
  function yn(e, t) {
    let n = [],
      r = e.container;
    if (!t.disableScrollLock) {
      if (pn(r)) {
        let e = fn(dn(r));
        (n.push({
          value: r.style.paddingRight,
          property: `padding-right`,
          el: r,
        }),
          (r.style.paddingRight = `${hn(r) + e}px`));
        let t = un(r).querySelectorAll(`.mui-fixed`);
        [].forEach.call(t, (t) => {
          (n.push({
            value: t.style.paddingRight,
            property: `padding-right`,
            el: t,
          }),
            (t.style.paddingRight = `${hn(t) + e}px`));
        });
      }
      let e;
      if (r.parentNode instanceof DocumentFragment) e = un(r).body;
      else {
        let t = r.parentElement,
          n = dn(r);
        e =
          t?.nodeName === `HTML` && n.getComputedStyle(t).overflowY === `scroll`
            ? t
            : r;
      }
      (n.push(
        { value: e.style.overflow, property: `overflow`, el: e },
        { value: e.style.overflowX, property: `overflow-x`, el: e },
        { value: e.style.overflowY, property: `overflow-y`, el: e },
      ),
        (e.style.overflow = `hidden`));
    }
    return () => {
      n.forEach(({ value: e, el: t, property: n }) => {
        e ? t.style.setProperty(n, e) : t.style.removeProperty(n);
      });
    };
  }
  function bn(e) {
    let t = [];
    return (
      [].forEach.call(e.children, (e) => {
        e.getAttribute(`aria-hidden`) === `true` && t.push(e);
      }),
      t
    );
  }
  var xn = class {
    constructor() {
      ((this.modals = []), (this.containers = []));
    }
    add(e, t) {
      let n = this.modals.indexOf(e);
      if (n !== -1) return n;
      ((n = this.modals.length),
        this.modals.push(e),
        e.modalRef && mn(e.modalRef, !1));
      let r = bn(t);
      _n(t, e.mount, e.modalRef, r, !0);
      let i = vn(this.containers, (e) => e.container === t);
      return i === -1
        ? (this.containers.push({
            modals: [e],
            container: t,
            restore: null,
            hiddenSiblings: r,
          }),
          n)
        : (this.containers[i].modals.push(e), n);
    }
    mount(e, t) {
      let n = vn(this.containers, (t) => t.modals.includes(e)),
        r = this.containers[n];
      r.restore ||= yn(r, t);
    }
    remove(e, t = !0) {
      let n = this.modals.indexOf(e);
      if (n === -1) return n;
      let r = vn(this.containers, (t) => t.modals.includes(e)),
        i = this.containers[r];
      if (
        (i.modals.splice(i.modals.indexOf(e), 1),
        this.modals.splice(n, 1),
        i.modals.length === 0)
      )
        (i.restore && i.restore(),
          e.modalRef && mn(e.modalRef, t),
          _n(i.container, e.mount, e.modalRef, i.hiddenSiblings, !1),
          this.containers.splice(r, 1));
      else {
        let e = i.modals[i.modals.length - 1];
        e.modalRef && mn(e.modalRef, !1);
      }
      return n;
    }
    isTopModal(e) {
      return (
        this.modals.length > 0 && this.modals[this.modals.length - 1] === e
      );
    }
  };
  function Sn(...e) {
    let t = g.useRef(void 0),
      n = g.useCallback((t) => {
        let n = e.map((e) => {
          if (e == null) return null;
          if (typeof e == `function`) {
            let n = e,
              r = n(t);
            return typeof r == `function`
              ? r
              : () => {
                  n(null);
                };
          }
          return (
            (e.current = t),
            () => {
              e.current = null;
            }
          );
        });
        return () => {
          n.forEach((e) => e?.());
        };
      }, e);
    return g.useMemo(
      () =>
        e.every((e) => e == null)
          ? null
          : (e) => {
              ((t.current &&= (t.current(), void 0)),
                e != null && (t.current = n(e)));
            },
      e,
    );
  }
  function Cn(e) {
    return e?.ref || null;
  }
  function wn(e, t) {
    if (!e || !t) return !1;
    if (e.contains(t)) return !0;
    let n = t.getRootNode?.();
    if (n && n instanceof ShadowRoot) {
      let n = t;
      for (; n; ) {
        if (e === n) return !0;
        n = n.parentNode ?? n.host ?? null;
      }
    }
    return !1;
  }
  var Tn = wn;
  function En(e) {
    let t = e.activeElement;
    for (; t?.shadowRoot?.activeElement != null; )
      t = t.shadowRoot.activeElement;
    return t;
  }
  var Dn = En,
    On = `data-mui-focusable`;
  function kn(e) {
    return e
      ? e.hasAttribute(`data-mui-focusable`)
        ? e
        : e.querySelector(`[${On}]`)
      : null;
  }
  var An = [
    `input`,
    `select`,
    `textarea`,
    `a[href]`,
    `button`,
    `[tabindex]`,
    `audio[controls]`,
    `video[controls]`,
    `[contenteditable]:not([contenteditable="false"])`,
  ].join(`,`);
  function jn(e) {
    let t = parseInt(e.getAttribute(`tabindex`) || ``, 10);
    return Number.isNaN(t)
      ? e.contentEditable === `true` ||
        ((e.nodeName === `AUDIO` ||
          e.nodeName === `VIDEO` ||
          e.nodeName === `DETAILS`) &&
          e.getAttribute(`tabindex`) === null)
        ? 0
        : e.tabIndex
      : t;
  }
  function Mn(e) {
    if (e.tagName !== `INPUT` || e.type !== `radio` || !e.name) return !1;
    let t = (t) => e.ownerDocument.querySelector(`input[type="radio"]${t}`),
      n = t(`[name="${e.name}"]:checked`);
    return ((n ||= t(`[name="${e.name}"]`)), n !== e);
  }
  function Nn(e) {
    return !(
      e.disabled ||
      (e.tagName === `INPUT` && e.type === `hidden`) ||
      Mn(e)
    );
  }
  function Pn(e) {
    let t = [],
      n = [];
    return (
      Array.from(e.querySelectorAll(An)).forEach((e, r) => {
        let i = jn(e);
        i === -1 ||
          !Nn(e) ||
          (i === 0
            ? t.push(e)
            : n.push({ documentOrder: r, tabIndex: i, node: e }));
      }),
      n
        .sort((e, t) =>
          e.tabIndex === t.tabIndex
            ? e.documentOrder - t.documentOrder
            : e.tabIndex - t.tabIndex,
        )
        .map((e) => e.node)
        .concat(t)
    );
  }
  function Fn() {
    return !0;
  }
  function In(e) {
    let {
        children: t,
        disableAutoFocus: n = !1,
        disableEnforceFocus: r = !1,
        disableRestoreFocus: i = !1,
        getTabbable: a = Pn,
        isEnabled: o = Fn,
        open: s,
      } = e,
      c = g.useRef(!1),
      l = g.useRef(null),
      u = g.useRef(null),
      d = g.useRef(null),
      f = g.useRef(null),
      p = g.useRef(!1),
      m = g.useRef(null),
      h = Sn(Cn(t), m),
      _ = g.useRef(null);
    (g.useEffect(() => {
      !s || !m.current || (p.current = !n);
    }, [n, s]),
      g.useEffect(() => {
        if (((c.current = !1), !s || !m.current)) return;
        let e = Dn(un(m.current)),
          t = kn(m.current) ?? m.current;
        return (
          Tn(m.current, e) ||
            (t.hasAttribute(`tabIndex`) || t.setAttribute(`tabIndex`, `-1`),
            p.current && t.focus()),
          () => {
            !i &&
              d.current &&
              ((c.current = !0), d.current.focus(), (d.current = null));
          }
        );
      }, [s]),
      g.useEffect(() => {
        if (!s || !m.current) return;
        let e = un(m.current),
          t = (t) => {
            if (((_.current = t), r || !o() || t.key !== `Tab`)) return;
            let n = m.current,
              i = Dn(e);
            if (n === null) return;
            let s = kn(n);
            if (i === n || i === s) {
              let e = a(n);
              if (e.length === 0) return;
              (t.preventDefault(),
                t.shiftKey ? e[e.length - 1].focus() : e[0].focus());
              return;
            }
            if (Tn(n, i)) {
              let e = a(n),
                r = e.indexOf(i);
              if (r === -1 || !e.some((e) => jn(e) > 0)) return;
              t.preventDefault();
              let o = 0;
              ((o = t.shiftKey
                ? r <= 0
                  ? e.length - 1
                  : r - 1
                : r === e.length - 1
                  ? 0
                  : r + 1),
                e[o].focus());
            }
          },
          n = () => {
            let t = m.current;
            if (t === null) return;
            let n = Dn(e);
            if (!e.hasFocus() || !o() || c.current) {
              c.current = !1;
              return;
            }
            if (Tn(t, n) || (r && n !== l.current && n !== u.current)) return;
            if (n !== f.current) f.current = null;
            else if (f.current !== null) return;
            if (!p.current) return;
            let i = [];
            if (
              ((n === l.current || n === u.current) && (i = a(m.current)),
              i.length > 0)
            ) {
              let e = !!(_.current?.shiftKey && _.current?.key === `Tab`),
                t = i[0],
                n = i[i.length - 1];
              typeof t != `string` &&
                typeof n != `string` &&
                (e ? n.focus() : t.focus());
            } else t.focus();
          };
        (e.addEventListener(`focusin`, n),
          e.addEventListener(`keydown`, t, !0));
        let i = setInterval(() => {
          let t = Dn(e);
          t && t.tagName === `BODY` && n();
        }, 50);
        return () => {
          (clearInterval(i),
            e.removeEventListener(`focusin`, n),
            e.removeEventListener(`keydown`, t, !0));
        };
      }, [n, r, i, o, s, a]));
    let v = (e) => {
        (d.current === null && (d.current = e.relatedTarget),
          (p.current = !0),
          (f.current = e.target));
        let n = t.props.onFocus;
        n && n(e);
      },
      y = (e) => {
        (d.current === null && (d.current = e.relatedTarget), (p.current = !0));
      };
    return (0, L.jsxs)(g.Fragment, {
      children: [
        (0, L.jsx)(`div`, {
          tabIndex: s ? 0 : -1,
          onFocus: y,
          ref: l,
          "data-testid": `sentinelStart`,
        }),
        g.cloneElement(t, { ref: h, onFocus: v }),
        (0, L.jsx)(`div`, {
          tabIndex: s ? 0 : -1,
          onFocus: y,
          ref: u,
          "data-testid": `sentinelEnd`,
        }),
      ],
    });
  }
  var Ln = typeof window < `u` ? g.useLayoutEffect : g.useEffect;
  function Rn(e, t) {
    typeof e == `function` ? e(t) : e && (e.current = t);
  }
  var zn = c(m(), 1);
  function Bn(e) {
    return typeof e == `function` ? e() : e;
  }
  var Vn = g.forwardRef(function (e, t) {
    let { children: n, container: r, disablePortal: i = !1 } = e,
      [a, o] = g.useState(null),
      s = Sn(g.isValidElement(n) ? Cn(n) : null, t);
    if (
      (Ln(() => {
        i || o(Bn(r) || document.body);
      }, [r, i]),
      Ln(() => {
        if (a && !i)
          return (
            Rn(t, a),
            () => {
              Rn(t, null);
            }
          );
      }, [t, a, i]),
      i)
    ) {
      if (g.isValidElement(n)) {
        let e = { ref: s };
        return g.cloneElement(n, e);
      }
      return n;
    }
    return a && zn.createPortal(n, a);
  });
  function Hn(e, t) {
    let n = Array.isArray(t),
      r = Array.isArray(e);
    return qn(t)
      ? t
      : Jn(e)
        ? Yn(t)
        : n && r
          ? Gn(e, t)
          : n === r
            ? Xn(e, t)
            : Yn(t);
  }
  function Un(e) {
    let t = 0,
      n = e.length,
      r = Array(n);
    for (t = 0; t < n; t += 1) r[t] = Yn(e[t]);
    return r;
  }
  function Wn(e) {
    let t = {};
    for (let n in e)
      n === `__proto__` ||
        n === `constructor` ||
        n === `prototype` ||
        (t[n] = Yn(e[n]));
    return t;
  }
  function Gn(e, t) {
    let n = e.length;
    for (let r = 0; r < t.length; r += 1) e[n + r] = Yn(t[r]);
    return e;
  }
  function Kn(e) {
    return (
      typeof e == `object` &&
      !!e &&
      !(e instanceof RegExp) &&
      !(e instanceof Date)
    );
  }
  function qn(e) {
    return typeof e != `object` || !e;
  }
  function Jn(e) {
    return (
      typeof e != `object` || !e || e instanceof RegExp || e instanceof Date
    );
  }
  function Yn(e) {
    return Kn(e) ? (Array.isArray(e) ? Un(e) : Wn(e)) : e;
  }
  function Xn(e, t) {
    for (let n in t)
      n === `__proto__` ||
        n === `constructor` ||
        n === `prototype` ||
        (n in e ? (e[n] = Hn(e[n], t[n])) : (e[n] = Yn(t[n])));
    return e;
  }
  function Zn(e, ...t) {
    let n = new URL(`https://mui.com/production-error/?code=${e}`);
    return (
      t.forEach((e) => n.searchParams.append(`args[]`, e)),
      `Minified MUI error #${e}; visit ${n} for the full message.`
    );
  }
  function Qn(e) {
    if (typeof e != `string`) throw Error(Zn(7));
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  function $n(e) {
    if (e == null) return !0;
    for (let t in e) return !1;
    return !0;
  }
  var er = o((e) => {
      var t = Symbol.for(`react.fragment`),
        n = Symbol.for(`react.strict_mode`),
        r = Symbol.for(`react.profiler`),
        i = Symbol.for(`react.consumer`),
        a = Symbol.for(`react.context`),
        o = Symbol.for(`react.forward_ref`),
        s = Symbol.for(`react.suspense`),
        c = Symbol.for(`react.suspense_list`),
        l = Symbol.for(`react.memo`),
        u = Symbol.for(`react.lazy`),
        d = Symbol.for(`react.client.reference`);
      e.isValidElementType = function (e) {
        return !!(
          typeof e == `string` ||
          typeof e == `function` ||
          e === t ||
          e === r ||
          e === n ||
          e === s ||
          e === c ||
          (typeof e == `object` &&
            e &&
            (e.$$typeof === u ||
              e.$$typeof === l ||
              e.$$typeof === a ||
              e.$$typeof === i ||
              e.$$typeof === o ||
              e.$$typeof === d ||
              e.getModuleId !== void 0))
        );
      };
    }),
    tr = o((e, t) => {
      t.exports = er();
    })();
  function nr(e) {
    if (typeof e != `object` || !e) return !1;
    let t = Object.getPrototypeOf(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  }
  function rr(e) {
    if (g.isValidElement(e) || (0, tr.isValidElementType)(e) || !nr(e))
      return e;
    let t = {};
    return (
      Object.keys(e).forEach((n) => {
        t[n] = rr(e[n]);
      }),
      t
    );
  }
  function ir(e, t, n = { clone: !0 }) {
    let r = n.clone ? { ...e } : e;
    return (
      nr(e) &&
        nr(t) &&
        Object.keys(t).forEach((i) => {
          g.isValidElement(t[i]) || (0, tr.isValidElementType)(t[i])
            ? (r[i] = t[i])
            : nr(t[i]) && Object.prototype.hasOwnProperty.call(e, i) && nr(e[i])
              ? (r[i] = ir(e[i], t[i], n))
              : n.clone
                ? (r[i] = nr(t[i]) ? rr(t[i]) : t[i])
                : (r[i] = t[i]);
        }),
      r
    );
  }
  var ar = /min-width:\s*([0-9.]+)/;
  function or(e, t) {
    if (!e.containerQueries || !sr(t)) return t;
    let n = [];
    for (let e in t) e.startsWith(`@container`) && n.push(e);
    n.sort((e, t) => (e.match(ar)?.[1] || 0) - +(t.match(ar)?.[1] || 0));
    let r = t;
    for (let e = 0; e < n.length; e += 1) {
      let t = n[e],
        i = r[t];
      (delete r[t], (r[t] = i));
    }
    return r;
  }
  function sr(e) {
    for (let t in e) if (t.startsWith(`@container`)) return !0;
    return !1;
  }
  function cr(e, t) {
    return (
      t === `@` ||
      (t.startsWith(`@`) &&
        (e.some((e) => t.startsWith(`@${e}`)) || !!t.match(/^@\d/)))
    );
  }
  function lr(e, t) {
    let n = t.match(/^@([^/]+)?\/?(.+)?$/);
    if (!n) return null;
    let [, r, i] = n,
      a = Number.isNaN(+r) ? r || 0 : +r;
    return e.containerQueries(i).up(a);
  }
  function ur(e) {
    let t = (e, t) => e.replace(`@media`, t ? `@container ${t}` : `@container`);
    function n(n, r) {
      ((n.up = (...n) => t(e.breakpoints.up(...n), r)),
        (n.down = (...n) => t(e.breakpoints.down(...n), r)),
        (n.between = (...n) => t(e.breakpoints.between(...n), r)),
        (n.only = (...n) => t(e.breakpoints.only(...n), r)),
        (n.not = (...n) => {
          let i = t(e.breakpoints.not(...n), r);
          return i.includes(`not all and`)
            ? i
                .replace(`not all and `, ``)
                .replace(`min-width:`, `width<`)
                .replace(`max-width:`, `width>`)
                .replace(`and`, `or`)
            : i;
        }));
    }
    let r = {},
      i = (e) => (n(r, e), r);
    return (n(i), { ...e, containerQueries: i });
  }
  var dr = (e) => {
    let t = Object.keys(e).map((t) => ({ key: t, val: e[t] })) || [];
    return (
      t.sort((e, t) => e.val - t.val),
      t.reduce((e, t) => ({ ...e, [t.key]: t.val }), {})
    );
  };
  function fr(e) {
    let {
        values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
        unit: n = `px`,
        step: r = 5,
        ...i
      } = e,
      a = dr(t),
      o = Object.keys(a);
    function s(e) {
      return `@media (min-width:${typeof t[e] == `number` ? t[e] : e}${n})`;
    }
    function c(e) {
      return `@media (max-width:${(typeof t[e] == `number` ? t[e] : e) - r / 100}${n})`;
    }
    function l(e, i) {
      let a = o.indexOf(i);
      return `@media (min-width:${typeof t[e] == `number` ? t[e] : e}${n}) and (max-width:${(a !== -1 && typeof t[o[a]] == `number` ? t[o[a]] : i) - r / 100}${n})`;
    }
    function u(e) {
      return o.indexOf(e) + 1 < o.length ? l(e, o[o.indexOf(e) + 1]) : s(e);
    }
    function d(e) {
      let t = o.indexOf(e);
      return t === 0
        ? s(o[1])
        : t === o.length - 1
          ? c(o[t])
          : l(e, o[o.indexOf(e) + 1]).replace(`@media`, `@media not all and`);
    }
    let f = [];
    for (let e = 0; e < o.length; e += 1) f.push(s(o[e]));
    return {
      keys: o,
      values: a,
      up: s,
      down: c,
      between: l,
      only: u,
      not: d,
      unit: n,
      internal_mediaKeys: f,
      ...i,
    };
  }
  var pr = {},
    mr = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    hr = fr({ values: mr }),
    gr = {
      containerQueries: (e) => ({
        up: (t) => {
          let n = typeof t == `number` ? t : mr[t] || t;
          return (
            typeof n == `number` && (n = `${n}px`),
            e
              ? `@container ${e} (min-width:${n})`
              : `@container (min-width:${n})`
          );
        },
      }),
    };
  function _r(e, t, n) {
    let r = {};
    return vr(r, e.theme, t, (e, t, i) => {
      let a = n(t, i);
      e ? (r[e] = a) : Hn(r, a);
    });
  }
  function vr(e, t, n, r) {
    if (((t ??= pr), Array.isArray(n))) {
      let i = t.breakpoints ?? hr;
      for (let t = 0; t < n.length; t += 1)
        yr(e, i.up(i.keys[t]), n[t], void 0, r);
      return e;
    }
    if (typeof n == `object`) {
      let i = t.breakpoints ?? hr,
        a = i.values ?? mr;
      for (let o in n)
        if (cr(i.keys, o)) {
          let i = lr(t.containerQueries ? t : gr, o);
          i && yr(e, i, n[o], o, r);
        } else if (o in a) yr(e, i.up(o), n[o], o, r);
        else {
          let t = o;
          e[t] = n[t];
        }
      return e;
    }
    return (r(void 0, n), e);
  }
  function yr(e, t, n, r, i) {
    ((e[t] ??= {}), i(t, n, r));
  }
  function br(e = hr) {
    let { internal_mediaKeys: t } = e,
      n = {};
    for (let e = 0; e < t.length; e += 1) n[t[e]] = {};
    return n;
  }
  function xr(e, t) {
    let n = e.internal_mediaKeys;
    for (let e = 0; e < n.length; e += 1) {
      let r = n[e];
      $n(t[r]) && delete t[r];
    }
    return t;
  }
  function Sr(e, t) {
    if (Array.isArray(t)) return !0;
    if (typeof t == `object` && t) {
      for (let n = 0; n < e.keys.length; n += 1) if (e.keys[n] in t) return !0;
      let n = Object.keys(t);
      for (let t = 0; t < n.length; t += 1) if (cr(e.keys, n[t])) return !0;
    }
    return !1;
  }
  function Cr(e, t, n, r) {
    let i;
    return (
      (i =
        typeof e == `function`
          ? e(n)
          : Array.isArray(e)
            ? e[n] || n
            : (typeof n == `string` && wr(e, n, !0, r)) || n),
      t && (i = t(i, n, e)),
      i
    );
  }
  function wr(e, t, n = !0, r = void 0) {
    if (!e || !t) return null;
    let i = t.split(`.`);
    if (e.vars && n) {
      let t = Tr(e.vars, i, r);
      if (t != null) return t;
    }
    return Tr(e, i, r);
  }
  function Tr(e, t, n = void 0) {
    let r,
      i = e,
      a = 0;
    for (; a < t.length; ) {
      if (i == null) return i;
      ((r = i), (i = i[t[a]]), (a += 1));
    }
    if (n && i === void 0) {
      let e = t[t.length - 1],
        i = `${n}${e === "default" ? `` : Qn(e)}`;
      return r?.[i];
    }
    return i;
  }
  function Er(e) {
    let { prop: t, cssProperty: n = e.prop, themeKey: r, transform: i } = e,
      a = (e) => {
        if (e[t] == null) return null;
        let a = e[t],
          o = e.theme,
          s = wr(o, r) || {};
        return _r(e, a, (e) => {
          let r = Cr(s, i, e, t);
          return n === !1 ? r : { [n]: r };
        });
      };
    return ((a.propTypes = {}), (a.filterProps = [t]), a);
  }
  var Dr = { internal_cache: {} },
    Or = { m: `margin`, p: `padding` },
    kr = {
      t: `Top`,
      r: `Right`,
      b: `Bottom`,
      l: `Left`,
      x: [`Left`, `Right`],
      y: [`Top`, `Bottom`],
    },
    Ar = { marginX: `mx`, marginY: `my`, paddingX: `px`, paddingY: `py` },
    jr = {};
  for (let e in Or) jr[e] = [Or[e]];
  for (let e in Or)
    for (let t in kr) {
      let n = Or[e],
        r = kr[t],
        i = Array.isArray(r) ? r.map((e) => n + e) : [n + r];
      jr[e + t] = i;
    }
  for (let e in Ar) jr[e] = jr[Ar[e]];
  var Mr = new Set([
      `m`,
      `mt`,
      `mr`,
      `mb`,
      `ml`,
      `mx`,
      `my`,
      `margin`,
      `marginTop`,
      `marginRight`,
      `marginBottom`,
      `marginLeft`,
      `marginX`,
      `marginY`,
      `marginInline`,
      `marginInlineStart`,
      `marginInlineEnd`,
      `marginBlock`,
      `marginBlockStart`,
      `marginBlockEnd`,
    ]),
    Nr = new Set([
      `p`,
      `pt`,
      `pr`,
      `pb`,
      `pl`,
      `px`,
      `py`,
      `padding`,
      `paddingTop`,
      `paddingRight`,
      `paddingBottom`,
      `paddingLeft`,
      `paddingX`,
      `paddingY`,
      `paddingInline`,
      `paddingInlineStart`,
      `paddingInlineEnd`,
      `paddingBlock`,
      `paddingBlockStart`,
      `paddingBlockEnd`,
    ]),
    Pr = new Set([...Mr, ...Nr]);
  function Fr(e, t, n, r) {
    let i = wr(e, t, !0) ?? n;
    return typeof i == `number` || typeof i == `string`
      ? (e) =>
          typeof e == `string`
            ? e
            : typeof i == `string`
              ? i.startsWith(`var(`) && e === 0
                ? 0
                : i.startsWith(`var(`) && e === 1
                  ? i
                  : `calc(${e} * ${i})`
              : i * e
      : Array.isArray(i)
        ? (e) => {
            if (typeof e == `string`) return e;
            let t = i[Math.abs(e)];
            return e >= 0
              ? t
              : typeof t == `number`
                ? -t
                : typeof t == `string` && t.startsWith(`var(`)
                  ? `calc(-1 * ${t})`
                  : `-${t}`;
          }
        : typeof i == `function`
          ? i
          : () => void 0;
  }
  function Ir(e) {
    return Fr(e, `spacing`, 8, `spacing`);
  }
  function Lr(e, t) {
    return typeof t == `string` || t == null ? t : e(t);
  }
  var Rr = [``];
  function zr(e, t) {
    let n = e.theme ?? Dr,
      r = n?.internal_cache?.unarySpacing ?? Ir(n),
      i = {};
    for (let n in e) {
      if (!t.has(n)) continue;
      let a = jr[n] ?? ((Rr[0] = n), Rr),
        o = e[n];
      vr(i, e.theme, o, (e, t) => {
        let n = e ? i[e] : i;
        for (let e = 0; e < a.length; e += 1) n[a[e]] = Lr(r, t);
      });
    }
    return i;
  }
  function Br(e) {
    return zr(e, Mr);
  }
  ((Br.propTypes = {}), (Br.filterProps = Mr));
  function Vr(e) {
    return zr(e, Nr);
  }
  ((Vr.propTypes = {}), (Vr.filterProps = Nr));
  function Hr(e) {
    return zr(e, Pr);
  }
  ((Hr.propTypes = {}), (Hr.filterProps = Pr));
  function Ur(...e) {
    let t = e.reduce(
        (e, t) => (
          t.filterProps.forEach((n) => {
            e[n] = t;
          }),
          e
        ),
        {},
      ),
      n = (e) => {
        let n = {};
        for (let r in e) t[r] && Hn(n, t[r](e));
        return n;
      };
    return (
      (n.propTypes = {}),
      (n.filterProps = e.reduce((e, t) => e.concat(t.filterProps), [])),
      n
    );
  }
  function Wr(e) {
    return typeof e == `number` ? `${e}px solid` : e;
  }
  function Gr(e, t) {
    return Er({ prop: e, themeKey: `borders`, transform: t });
  }
  var Kr = Gr(`border`, Wr),
    qr = Gr(`borderTop`, Wr),
    Jr = Gr(`borderRight`, Wr),
    Yr = Gr(`borderBottom`, Wr),
    Xr = Gr(`borderLeft`, Wr),
    Zr = Gr(`borderColor`),
    Qr = Gr(`borderTopColor`),
    $r = Gr(`borderRightColor`),
    ei = Gr(`borderBottomColor`),
    ti = Gr(`borderLeftColor`),
    ni = Gr(`outline`, Wr),
    ri = Gr(`outlineColor`),
    ii = (e) => {
      if (e.borderRadius !== void 0 && e.borderRadius !== null) {
        let t = Fr(e.theme, `shape.borderRadius`, 4, `borderRadius`);
        return _r(e, e.borderRadius, (e) => ({ borderRadius: Lr(t, e) }));
      }
      return null;
    };
  ((ii.propTypes = {}),
    (ii.filterProps = [`borderRadius`]),
    Ur(Kr, qr, Jr, Yr, Xr, Zr, Qr, $r, ei, ti, ii, ni, ri));
  var ai = (e) => {
    if (e.gap !== void 0 && e.gap !== null) {
      let t = Fr(e.theme, `spacing`, 8, `gap`);
      return _r(e, e.gap, (e) => ({ gap: Lr(t, e) }));
    }
    return null;
  };
  ((ai.propTypes = {}), (ai.filterProps = [`gap`]));
  var oi = (e) => {
    if (e.columnGap !== void 0 && e.columnGap !== null) {
      let t = Fr(e.theme, `spacing`, 8, `columnGap`);
      return _r(e, e.columnGap, (e) => ({ columnGap: Lr(t, e) }));
    }
    return null;
  };
  ((oi.propTypes = {}), (oi.filterProps = [`columnGap`]));
  var si = (e) => {
    if (e.rowGap !== void 0 && e.rowGap !== null) {
      let t = Fr(e.theme, `spacing`, 8, `rowGap`);
      return _r(e, e.rowGap, (e) => ({ rowGap: Lr(t, e) }));
    }
    return null;
  };
  ((si.propTypes = {}),
    (si.filterProps = [`rowGap`]),
    Ur(
      ai,
      oi,
      si,
      Er({ prop: `gridColumn` }),
      Er({ prop: `gridRow` }),
      Er({ prop: `gridAutoFlow` }),
      Er({ prop: `gridAutoColumns` }),
      Er({ prop: `gridAutoRows` }),
      Er({ prop: `gridTemplateColumns` }),
      Er({ prop: `gridTemplateRows` }),
      Er({ prop: `gridTemplateAreas` }),
      Er({ prop: `gridArea` }),
    ));
  function ci(e, t) {
    return t === `grey` ? t : e;
  }
  Ur(
    Er({ prop: `color`, themeKey: `palette`, transform: ci }),
    Er({
      prop: `bgcolor`,
      cssProperty: `backgroundColor`,
      themeKey: `palette`,
      transform: ci,
    }),
    Er({ prop: `backgroundColor`, themeKey: `palette`, transform: ci }),
  );
  function li(e) {
    return e <= 1 && e !== 0 ? `${e * 100}%` : e;
  }
  var ui = Er({ prop: `width`, transform: li }),
    R = (e) =>
      e.maxWidth !== void 0 && e.maxWidth !== null
        ? _r(e, e.maxWidth, (t) => {
            let n = e.theme?.breakpoints?.values?.[t] || mr[t];
            return n
              ? e.theme?.breakpoints?.unit === `px`
                ? { maxWidth: n }
                : { maxWidth: `${n}${e.theme.breakpoints.unit}` }
              : { maxWidth: li(t) };
          })
        : null;
  R.filterProps = [`maxWidth`];
  var di = Er({ prop: `minWidth`, transform: li }),
    fi = Er({ prop: `height`, transform: li }),
    pi = Er({ prop: `maxHeight`, transform: li }),
    mi = Er({ prop: `minHeight`, transform: li });
  (Er({ prop: `size`, cssProperty: `width`, transform: li }),
    Er({ prop: `size`, cssProperty: `height`, transform: li }),
    Ur(ui, R, di, fi, pi, mi, Er({ prop: `boxSizing` })));
  var hi = {
      border: { themeKey: `borders`, transform: Wr },
      borderTop: { themeKey: `borders`, transform: Wr },
      borderRight: { themeKey: `borders`, transform: Wr },
      borderBottom: { themeKey: `borders`, transform: Wr },
      borderLeft: { themeKey: `borders`, transform: Wr },
      borderColor: { themeKey: `palette` },
      borderTopColor: { themeKey: `palette` },
      borderRightColor: { themeKey: `palette` },
      borderBottomColor: { themeKey: `palette` },
      borderLeftColor: { themeKey: `palette` },
      outline: { themeKey: `borders`, transform: Wr },
      outlineColor: { themeKey: `palette` },
      borderRadius: { themeKey: `shape.borderRadius`, style: ii },
      color: { themeKey: `palette`, transform: ci },
      bgcolor: {
        themeKey: `palette`,
        cssProperty: `backgroundColor`,
        transform: ci,
      },
      backgroundColor: { themeKey: `palette`, transform: ci },
      p: { style: Vr },
      pt: { style: Vr },
      pr: { style: Vr },
      pb: { style: Vr },
      pl: { style: Vr },
      px: { style: Vr },
      py: { style: Vr },
      padding: { style: Vr },
      paddingTop: { style: Vr },
      paddingRight: { style: Vr },
      paddingBottom: { style: Vr },
      paddingLeft: { style: Vr },
      paddingX: { style: Vr },
      paddingY: { style: Vr },
      paddingInline: { style: Vr },
      paddingInlineStart: { style: Vr },
      paddingInlineEnd: { style: Vr },
      paddingBlock: { style: Vr },
      paddingBlockStart: { style: Vr },
      paddingBlockEnd: { style: Vr },
      m: { style: Br },
      mt: { style: Br },
      mr: { style: Br },
      mb: { style: Br },
      ml: { style: Br },
      mx: { style: Br },
      my: { style: Br },
      margin: { style: Br },
      marginTop: { style: Br },
      marginRight: { style: Br },
      marginBottom: { style: Br },
      marginLeft: { style: Br },
      marginX: { style: Br },
      marginY: { style: Br },
      marginInline: { style: Br },
      marginInlineStart: { style: Br },
      marginInlineEnd: { style: Br },
      marginBlock: { style: Br },
      marginBlockStart: { style: Br },
      marginBlockEnd: { style: Br },
      displayPrint: {
        cssProperty: !1,
        transform: (e) => ({ "@media print": { display: e } }),
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      gap: { style: ai },
      rowGap: { style: si },
      columnGap: { style: oi },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      position: {},
      zIndex: { themeKey: `zIndex` },
      top: {},
      right: {},
      bottom: {},
      left: {},
      boxShadow: { themeKey: `shadows` },
      width: { transform: li },
      maxWidth: { style: R },
      minWidth: { transform: li },
      height: { transform: li },
      maxHeight: { transform: li },
      minHeight: { transform: li },
      boxSizing: {},
      font: { themeKey: `font` },
      fontFamily: { themeKey: `typography` },
      fontSize: { themeKey: `typography` },
      fontStyle: { themeKey: `typography` },
      fontWeight: { themeKey: `typography` },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: { cssProperty: !1, themeKey: `typography` },
    },
    gi = {};
  function _i() {
    function e(t) {
      if (!t.sx) return null;
      let { sx: n, theme: r = gi, nested: i } = t,
        a = r.unstable_sxConfig ?? hi,
        o = { sx: null, theme: r, nested: !0 };
      function s(n) {
        let s = n;
        if (typeof n == `function`) s = n(r);
        else if (typeof n != `object`) return n;
        if (!s) return null;
        let c = r.breakpoints ?? hr,
          l = br(c);
        for (let n in s) {
          let i = bi(s[n], r);
          if (i != null) {
            if (typeof i != `object`) {
              yi(l, n, i, r, a);
              continue;
            }
            if (a[n]) {
              yi(l, n, i, r, a);
              continue;
            }
            Sr(c, i)
              ? vr(l, t.theme, i, (e, t) => {
                  l[e][n] = t;
                })
              : ((o.sx = i), (l[n] = e(o)));
          }
        }
        return !i && r.modularCssLayers
          ? { "@layer sx": or(r, xr(c, l)) }
          : or(r, xr(c, l));
      }
      return Array.isArray(n) ? n.map(s) : s(n);
    }
    return ((e.filterProps = [`sx`]), e);
  }
  var vi = _i();
  function yi(e, t, n, r, i) {
    let a = i[t];
    if (!a) {
      e[t] = n;
      return;
    }
    if (n == null) return;
    let { themeKey: o } = a;
    if (o === `typography` && n === `inherit`) {
      e[t] = n;
      return;
    }
    let { style: s } = a;
    if (s) {
      Hn(e, s({ [t]: n, theme: r }));
      return;
    }
    let { cssProperty: c = t, transform: l } = a,
      u = wr(r, o);
    vr(e, r, n, (n, r) => {
      let i = Cr(u, l, r, t);
      c === !1 ? Hn(n ? e[n] : e, i) : n ? (e[n][c] = i) : (e[c] = i);
    });
  }
  function bi(e, t) {
    return typeof e == `function` ? e(t) : e;
  }
  function xi() {
    return (
      (xi = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      xi.apply(null, arguments)
    );
  }
  var Si = !1;
  function Ci(e) {
    if (e.sheet) return e.sheet;
    for (var t = 0; t < document.styleSheets.length; t++)
      if (document.styleSheets[t].ownerNode === e)
        return document.styleSheets[t];
  }
  function wi(e) {
    var t = document.createElement(`style`);
    return (
      t.setAttribute(`data-emotion`, e.key),
      e.nonce !== void 0 && t.setAttribute(`nonce`, e.nonce),
      t.appendChild(document.createTextNode(``)),
      t.setAttribute(`data-s`, ``),
      t
    );
  }
  var Ti = (function () {
      function e(e) {
        var t = this;
        ((this._insertTag = function (e) {
          var n =
            t.tags.length === 0
              ? t.insertionPoint
                ? t.insertionPoint.nextSibling
                : t.prepend
                  ? t.container.firstChild
                  : t.before
              : t.tags[t.tags.length - 1].nextSibling;
          (t.container.insertBefore(e, n), t.tags.push(e));
        }),
          (this.isSpeedy = e.speedy === void 0 ? !Si : e.speedy),
          (this.tags = []),
          (this.ctr = 0),
          (this.nonce = e.nonce),
          (this.key = e.key),
          (this.container = e.container),
          (this.prepend = e.prepend),
          (this.insertionPoint = e.insertionPoint),
          (this.before = null));
      }
      var t = e.prototype;
      return (
        (t.hydrate = function (e) {
          e.forEach(this._insertTag);
        }),
        (t.insert = function (e) {
          this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
            this._insertTag(wi(this));
          var t = this.tags[this.tags.length - 1];
          if (this.isSpeedy) {
            var n = Ci(t);
            try {
              n.insertRule(e, n.cssRules.length);
            } catch {}
          } else t.appendChild(document.createTextNode(e));
          this.ctr++;
        }),
        (t.flush = function () {
          (this.tags.forEach(function (e) {
            return e.parentNode?.removeChild(e);
          }),
            (this.tags = []),
            (this.ctr = 0));
        }),
        e
      );
    })(),
    Ei = `-ms-`,
    Di = `-moz-`,
    z = `-webkit-`,
    Oi = `comm`,
    ki = `rule`,
    Ai = `decl`,
    ji = `@import`,
    Mi = `@keyframes`,
    Ni = `@layer`,
    Pi = Math.abs,
    Fi = String.fromCharCode,
    Ii = Object.assign;
  function Li(e, t) {
    return V(e, 0) ^ 45
      ? (((((((t << 2) ^ V(e, 0)) << 2) ^ V(e, 1)) << 2) ^ V(e, 2)) << 2) ^
          V(e, 3)
      : 0;
  }
  function Ri(e) {
    return e.trim();
  }
  function zi(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function B(e, t, n) {
    return e.replace(t, n);
  }
  function Bi(e, t) {
    return e.indexOf(t);
  }
  function V(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function Vi(e, t, n) {
    return e.slice(t, n);
  }
  function Hi(e) {
    return e.length;
  }
  function Ui(e) {
    return e.length;
  }
  function Wi(e, t) {
    return (t.push(e), e);
  }
  function Gi(e, t) {
    return e.map(t).join(``);
  }
  var Ki = 1,
    H = 1,
    U = 0,
    qi = 0,
    W = 0,
    Ji = ``;
  function Yi(e, t, n, r, i, a, o) {
    return {
      value: e,
      root: t,
      parent: n,
      type: r,
      props: i,
      children: a,
      line: Ki,
      column: H,
      length: o,
      return: ``,
    };
  }
  function Xi(e, t) {
    return Ii(
      Yi(``, null, null, ``, null, null, 0),
      e,
      { length: -e.length },
      t,
    );
  }
  function Zi() {
    return W;
  }
  function Qi() {
    return (
      (W = qi > 0 ? V(Ji, --qi) : 0),
      H--,
      W === 10 && ((H = 1), Ki--),
      W
    );
  }
  function $i() {
    return (
      (W = qi < U ? V(Ji, qi++) : 0),
      H++,
      W === 10 && ((H = 1), Ki++),
      W
    );
  }
  function ea() {
    return V(Ji, qi);
  }
  function ta() {
    return qi;
  }
  function na(e, t) {
    return Vi(Ji, e, t);
  }
  function ra(e) {
    switch (e) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function ia(e) {
    return ((Ki = H = 1), (U = Hi((Ji = e))), (qi = 0), []);
  }
  function aa(e) {
    return ((Ji = ``), e);
  }
  function oa(e) {
    return Ri(na(qi - 1, la(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function sa(e) {
    for (; (W = ea()) && W < 33; ) $i();
    return ra(e) > 2 || ra(W) > 3 ? `` : ` `;
  }
  function ca(e, t) {
    for (
      ;
      --t &&
      $i() &&
      !(W < 48 || W > 102 || (W > 57 && W < 65) || (W > 70 && W < 97));
    );
    return na(e, ta() + (t < 6 && ea() == 32 && $i() == 32));
  }
  function la(e) {
    for (; $i(); )
      switch (W) {
        case e:
          return qi;
        case 34:
        case 39:
          e !== 34 && e !== 39 && la(W);
          break;
        case 40:
          e === 41 && la(e);
          break;
        case 92:
          $i();
          break;
      }
    return qi;
  }
  function ua(e, t) {
    for (; $i() && e + W !== 57 && !(e + W === 84 && ea() === 47); );
    return `/*` + na(t, qi - 1) + `*` + Fi(e === 47 ? e : $i());
  }
  function da(e) {
    for (; !ra(ea()); ) $i();
    return na(e, qi);
  }
  function fa(e) {
    return aa(pa(``, null, null, null, [``], (e = ia(e)), 0, [0], e));
  }
  function pa(e, t, n, r, i, a, o, s, c) {
    for (
      var l = 0,
        u = 0,
        d = o,
        f = 0,
        p = 0,
        m = 0,
        h = 1,
        g = 1,
        _ = 1,
        v = 0,
        y = ``,
        b = i,
        x = a,
        S = r,
        C = y;
      g;
    )
      switch (((m = v), (v = $i()))) {
        case 40:
          if (m != 108 && V(C, d - 1) == 58) {
            Bi((C += B(oa(v), `&`, `&\f`)), `&\f`) != -1 && (_ = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          C += oa(v);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          C += sa(m);
          break;
        case 92:
          C += ca(ta() - 1, 7);
          continue;
        case 47:
          switch (ea()) {
            case 42:
            case 47:
              Wi(ha(ua($i(), ta()), t, n), c);
              break;
            default:
              C += `/`;
          }
          break;
        case 123 * h:
          s[l++] = Hi(C) * _;
        case 125 * h:
        case 59:
        case 0:
          switch (v) {
            case 0:
            case 125:
              g = 0;
            case 59 + u:
              (_ == -1 && (C = B(C, /\f/g, ``)),
                p > 0 &&
                  Hi(C) - d &&
                  Wi(
                    p > 32
                      ? ga(C + `;`, r, n, d - 1)
                      : ga(B(C, ` `, ``) + `;`, r, n, d - 2),
                    c,
                  ));
              break;
            case 59:
              C += `;`;
            default:
              if (
                (Wi((S = ma(C, t, n, l, u, i, s, y, (b = []), (x = []), d)), a),
                v === 123)
              )
                if (u === 0) pa(C, t, S, S, b, a, d, s, x);
                else
                  switch (f === 99 && V(C, 3) === 110 ? 100 : f) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      pa(
                        e,
                        S,
                        S,
                        r && Wi(ma(e, S, S, 0, 0, i, s, y, i, (b = []), d), x),
                        i,
                        x,
                        d,
                        s,
                        r ? b : x,
                      );
                      break;
                    default:
                      pa(C, S, S, S, [``], x, 0, s, x);
                  }
          }
          ((l = u = p = 0), (h = _ = 1), (y = C = ``), (d = o));
          break;
        case 58:
          ((d = 1 + Hi(C)), (p = m));
        default:
          if (h < 1) {
            if (v == 123) --h;
            else if (v == 125 && h++ == 0 && Qi() == 125) continue;
          }
          switch (((C += Fi(v)), v * h)) {
            case 38:
              _ = u > 0 ? 1 : ((C += `\f`), -1);
              break;
            case 44:
              ((s[l++] = (Hi(C) - 1) * _), (_ = 1));
              break;
            case 64:
              (ea() === 45 && (C += oa($i())),
                (f = ea()),
                (u = d = Hi((y = C += da(ta())))),
                v++);
              break;
            case 45:
              m === 45 && Hi(C) == 2 && (h = 0);
          }
      }
    return a;
  }
  function ma(e, t, n, r, i, a, o, s, c, l, u) {
    for (
      var d = i - 1, f = i === 0 ? a : [``], p = Ui(f), m = 0, h = 0, g = 0;
      m < r;
      ++m
    )
      for (var _ = 0, v = Vi(e, d + 1, (d = Pi((h = o[m])))), y = e; _ < p; ++_)
        (y = Ri(h > 0 ? f[_] + ` ` + v : B(v, /&\f/g, f[_]))) && (c[g++] = y);
    return Yi(e, t, n, i === 0 ? ki : s, c, l, u);
  }
  function ha(e, t, n) {
    return Yi(e, t, n, Oi, Fi(Zi()), Vi(e, 2, -2), 0);
  }
  function ga(e, t, n, r) {
    return Yi(e, t, n, Ai, Vi(e, 0, r), Vi(e, r + 1, -1), r);
  }
  function _a(e, t) {
    for (var n = ``, r = Ui(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || ``;
    return n;
  }
  function va(e, t, n, r) {
    switch (e.type) {
      case Ni:
        if (e.children.length) break;
      case ji:
      case Ai:
        return (e.return = e.return || e.value);
      case Oi:
        return ``;
      case Mi:
        return (e.return = e.value + `{` + _a(e.children, r) + `}`);
      case ki:
        e.value = e.props.join(`,`);
    }
    return Hi((n = _a(e.children, r)))
      ? (e.return = e.value + `{` + n + `}`)
      : ``;
  }
  function ya(e) {
    var t = Ui(e);
    return function (n, r, i, a) {
      for (var o = ``, s = 0; s < t; s++) o += e[s](n, r, i, a) || ``;
      return o;
    };
  }
  function ba(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  function xa(e) {
    var t = Object.create(null);
    return function (n) {
      return (t[n] === void 0 && (t[n] = e(n)), t[n]);
    };
  }
  var Sa = function (e, t, n) {
      for (
        var r = 0, i = 0;
        (r = i), (i = ea()), r === 38 && i === 12 && (t[n] = 1), !ra(i);
      )
        $i();
      return na(e, qi);
    },
    Ca = function (e, t) {
      var n = -1,
        r = 44;
      do
        switch (ra(r)) {
          case 0:
            (r === 38 && ea() === 12 && (t[n] = 1), (e[n] += Sa(qi - 1, t, n)));
            break;
          case 2:
            e[n] += oa(r);
            break;
          case 4:
            if (r === 44) {
              ((e[++n] = ea() === 58 ? `&\f` : ``), (t[n] = e[n].length));
              break;
            }
          default:
            e[n] += Fi(r);
        }
      while ((r = $i()));
      return e;
    },
    G = function (e, t) {
      return aa(Ca(ia(e), t));
    },
    wa = new WeakMap(),
    Ta = function (e) {
      if (!(e.type !== `rule` || !e.parent || e.length < 1)) {
        for (
          var t = e.value,
            n = e.parent,
            r = e.column === n.column && e.line === n.line;
          n.type !== `rule`;
        )
          if (((n = n.parent), !n)) return;
        if (
          !(e.props.length === 1 && t.charCodeAt(0) !== 58 && !wa.get(n)) &&
          !r
        ) {
          wa.set(e, !0);
          for (
            var i = [], a = G(t, i), o = n.props, s = 0, c = 0;
            s < a.length;
            s++
          )
            for (var l = 0; l < o.length; l++, c++)
              e.props[c] = i[s]
                ? a[s].replace(/&\f/g, o[l])
                : o[l] + ` ` + a[s];
        }
      }
    },
    Ea = function (e) {
      if (e.type === `decl`) {
        var t = e.value;
        t.charCodeAt(0) === 108 &&
          t.charCodeAt(2) === 98 &&
          ((e.return = ``), (e.value = ``));
      }
    };
  function Da(e, t) {
    switch (Li(e, t)) {
      case 5103:
        return z + `print-` + e + e;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return z + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return z + e + Di + e + Ei + e + e;
      case 6828:
      case 4268:
        return z + e + Ei + e + e;
      case 6165:
        return z + e + Ei + `flex-` + e + e;
      case 5187:
        return (
          z + e + B(e, /(\w+).+(:[^]+)/, z + `box-$1$2` + Ei + `flex-$1$2`) + e
        );
      case 5443:
        return z + e + Ei + `flex-item-` + B(e, /flex-|-self/, ``) + e;
      case 4675:
        return (
          z +
          e +
          Ei +
          `flex-line-pack` +
          B(e, /align-content|flex-|-self/, ``) +
          e
        );
      case 5548:
        return z + e + Ei + B(e, `shrink`, `negative`) + e;
      case 5292:
        return z + e + Ei + B(e, `basis`, `preferred-size`) + e;
      case 6060:
        return (
          z +
          `box-` +
          B(e, `-grow`, ``) +
          z +
          e +
          Ei +
          B(e, `grow`, `positive`) +
          e
        );
      case 4554:
        return z + B(e, /([^-])(transform)/g, `$1` + z + `$2`) + e;
      case 6187:
        return (
          B(B(B(e, /(zoom-|grab)/, z + `$1`), /(image-set)/, z + `$1`), e, ``) +
          e
        );
      case 5495:
      case 3959:
        return B(e, /(image-set\([^]*)/, z + "$1$`$1");
      case 4968:
        return (
          B(
            B(e, /(.+:)(flex-)?(.*)/, z + `box-pack:$3` + Ei + `flex-pack:$3`),
            /s.+-b[^;]+/,
            `justify`,
          ) +
          z +
          e +
          e
        );
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return B(e, /(.+)-inline(.+)/, z + `$1$2`) + e;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (Hi(e) - 1 - t > 6)
          switch (V(e, t + 1)) {
            case 109:
              if (V(e, t + 4) !== 45) break;
            case 102:
              return (
                B(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  `$1` +
                    z +
                    `$2-$3$1` +
                    Di +
                    (V(e, t + 3) == 108 ? `$3` : `$2-$3`),
                ) + e
              );
            case 115:
              return ~Bi(e, `stretch`)
                ? Da(B(e, `stretch`, `fill-available`), t) + e
                : e;
          }
        break;
      case 4949:
        if (V(e, t + 1) !== 115) break;
      case 6444:
        switch (V(e, Hi(e) - 3 - (~Bi(e, `!important`) && 10))) {
          case 107:
            return B(e, `:`, `:` + z) + e;
          case 101:
            return (
              B(
                e,
                /(.+:)([^;!]+)(;|!.+)?/,
                `$1` +
                  z +
                  (V(e, 14) === 45 ? `inline-` : ``) +
                  `box$3$1` +
                  z +
                  `$2$3$1` +
                  Ei +
                  `$2box$3`,
              ) + e
            );
        }
        break;
      case 5936:
        switch (V(e, t + 11)) {
          case 114:
            return z + e + Ei + B(e, /[svh]\w+-[tblr]{2}/, `tb`) + e;
          case 108:
            return z + e + Ei + B(e, /[svh]\w+-[tblr]{2}/, `tb-rl`) + e;
          case 45:
            return z + e + Ei + B(e, /[svh]\w+-[tblr]{2}/, `lr`) + e;
        }
        return z + e + Ei + e + e;
    }
    return e;
  }
  var Oa = [
      function (e, t, n, r) {
        if (e.length > -1 && !e.return)
          switch (e.type) {
            case Ai:
              e.return = Da(e.value, e.length);
              break;
            case Mi:
              return _a([Xi(e, { value: B(e.value, `@`, `@` + z) })], r);
            case ki:
              if (e.length)
                return Gi(e.props, function (t) {
                  switch (zi(t, /(::plac\w+|:read-\w+)/)) {
                    case `:read-only`:
                    case `:read-write`:
                      return _a(
                        [
                          Xi(e, {
                            props: [B(t, /:(read-\w+)/, `:` + Di + `$1`)],
                          }),
                        ],
                        r,
                      );
                    case `::placeholder`:
                      return _a(
                        [
                          Xi(e, {
                            props: [B(t, /:(plac\w+)/, `:` + z + `input-$1`)],
                          }),
                          Xi(e, {
                            props: [B(t, /:(plac\w+)/, `:` + Di + `$1`)],
                          }),
                          Xi(e, {
                            props: [B(t, /:(plac\w+)/, Ei + `input-$1`)],
                          }),
                        ],
                        r,
                      );
                  }
                  return ``;
                });
          }
      },
    ],
    ka = function (e) {
      var t = e.key;
      if (t === `css`) {
        var n = document.querySelectorAll(`style[data-emotion]:not([data-s])`);
        Array.prototype.forEach.call(n, function (e) {
          e.getAttribute(`data-emotion`).indexOf(` `) !== -1 &&
            (document.head.appendChild(e), e.setAttribute(`data-s`, ``));
        });
      }
      var r = e.stylisPlugins || Oa,
        i = {},
        a,
        o = [];
      ((a = e.container || document.head),
        Array.prototype.forEach.call(
          document.querySelectorAll(`style[data-emotion^="` + t + ` "]`),
          function (e) {
            for (
              var t = e.getAttribute(`data-emotion`).split(` `), n = 1;
              n < t.length;
              n++
            )
              i[t[n]] = !0;
            o.push(e);
          },
        ));
      var s,
        c = [Ta, Ea],
        l,
        u = [
          va,
          ba(function (e) {
            l.insert(e);
          }),
        ],
        d = ya(c.concat(r, u)),
        f = function (e) {
          return _a(fa(e), d);
        };
      s = function (e, t, n, r) {
        ((l = n),
          f(e ? e + `{` + t.styles + `}` : t.styles),
          r && (p.inserted[t.name] = !0));
      };
      var p = {
        key: t,
        sheet: new Ti({
          key: t,
          container: a,
          nonce: e.nonce,
          speedy: e.speedy,
          prepend: e.prepend,
          insertionPoint: e.insertionPoint,
        }),
        nonce: e.nonce,
        inserted: i,
        registered: {},
        insert: s,
      };
      return (p.sheet.hydrate(o), p);
    },
    Aa = !0;
  function ja(e, t, n) {
    var r = ``;
    return (
      n.split(` `).forEach(function (n) {
        e[n] === void 0 ? n && (r += n + ` `) : t.push(e[n] + `;`);
      }),
      r
    );
  }
  var Ma = function (e, t, n) {
      var r = e.key + `-` + t.name;
      (n === !1 || Aa === !1) &&
        e.registered[r] === void 0 &&
        (e.registered[r] = t.styles);
    },
    Na = function (e, t, n) {
      Ma(e, t, n);
      var r = e.key + `-` + t.name;
      if (e.inserted[t.name] === void 0) {
        var i = t;
        do (e.insert(t === i ? `.` + r : ``, i, e.sheet, !0), (i = i.next));
        while (i !== void 0);
      }
    };
  function Pa(e) {
    for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4)
      ((n =
        (e.charCodeAt(r) & 255) |
        ((e.charCodeAt(++r) & 255) << 8) |
        ((e.charCodeAt(++r) & 255) << 16) |
        ((e.charCodeAt(++r) & 255) << 24)),
        (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
        (n ^= n >>> 24),
        (t =
          ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)) ^
          ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16))));
    switch (i) {
      case 3:
        t ^= (e.charCodeAt(r + 2) & 255) << 16;
      case 2:
        t ^= (e.charCodeAt(r + 1) & 255) << 8;
      case 1:
        ((t ^= e.charCodeAt(r) & 255),
          (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
    }
    return (
      (t ^= t >>> 13),
      (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
      ((t ^ (t >>> 15)) >>> 0).toString(36)
    );
  }
  var Fa = {
      animationIterationCount: 1,
      aspectRatio: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      scale: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
    },
    Ia = !1,
    La = /[A-Z]|^ms/g,
    Ra = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
    za = function (e) {
      return e.charCodeAt(1) === 45;
    },
    Ba = function (e) {
      return e != null && typeof e != `boolean`;
    },
    Va = xa(function (e) {
      return za(e) ? e : e.replace(La, `-$&`).toLowerCase();
    }),
    Ha = function (e, t) {
      switch (e) {
        case `animation`:
        case `animationName`:
          if (typeof t == `string`)
            return t.replace(Ra, function (e, t, n) {
              return ((qa = { name: t, styles: n, next: qa }), t);
            });
      }
      return Fa[e] !== 1 && !za(e) && typeof t == `number` && t !== 0
        ? t + `px`
        : t;
    },
    Ua = `Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.`;
  function Wa(e, t, n) {
    if (n == null) return ``;
    var r = n;
    if (r.__emotion_styles !== void 0) return r;
    switch (typeof n) {
      case `boolean`:
        return ``;
      case `object`:
        var i = n;
        if (i.anim === 1)
          return ((qa = { name: i.name, styles: i.styles, next: qa }), i.name);
        var a = n;
        if (a.styles !== void 0) {
          var o = a.next;
          if (o !== void 0)
            for (; o !== void 0; )
              ((qa = { name: o.name, styles: o.styles, next: qa }),
                (o = o.next));
          return a.styles + `;`;
        }
        return Ga(e, t, n);
      case `function`:
        if (e !== void 0) {
          var s = qa,
            c = n(e);
          return ((qa = s), Wa(e, t, c));
        }
        break;
    }
    var l = n;
    if (t == null) return l;
    var u = t[l];
    return u === void 0 ? l : u;
  }
  function Ga(e, t, n) {
    var r = ``;
    if (Array.isArray(n))
      for (var i = 0; i < n.length; i++) r += Wa(e, t, n[i]) + `;`;
    else
      for (var a in n) {
        var o = n[a];
        if (typeof o != `object`) {
          var s = o;
          t != null && t[s] !== void 0
            ? (r += a + `{` + t[s] + `}`)
            : Ba(s) && (r += Va(a) + `:` + Ha(a, s) + `;`);
        } else {
          if (a === `NO_COMPONENT_SELECTOR` && Ia) throw Error(Ua);
          if (
            Array.isArray(o) &&
            typeof o[0] == `string` &&
            (t == null || t[o[0]] === void 0)
          )
            for (var c = 0; c < o.length; c++)
              Ba(o[c]) && (r += Va(a) + `:` + Ha(a, o[c]) + `;`);
          else {
            var l = Wa(e, t, o);
            switch (a) {
              case `animation`:
              case `animationName`:
                r += Va(a) + `:` + l + `;`;
                break;
              default:
                r += a + `{` + l + `}`;
            }
          }
        }
      }
    return r;
  }
  var Ka = /label:\s*([^\s;{]+)\s*(;|$)/g,
    qa;
  function Ja(e, t, n) {
    if (
      e.length === 1 &&
      typeof e[0] == `object` &&
      e[0] !== null &&
      e[0].styles !== void 0
    )
      return e[0];
    var r = !0,
      i = ``;
    qa = void 0;
    var a = e[0];
    a == null || a.raw === void 0
      ? ((r = !1), (i += Wa(n, t, a)))
      : (i += a[0]);
    for (var o = 1; o < e.length; o++)
      ((i += Wa(n, t, e[o])), r && (i += a[o]));
    Ka.lastIndex = 0;
    for (var s = ``, c; (c = Ka.exec(i)) !== null; ) s += `-` + c[1];
    return { name: Pa(i) + s, styles: i, next: qa };
  }
  var Ya = function (e) {
      return e();
    },
    Xa = g.useInsertionEffect ? g.useInsertionEffect : !1,
    Za = Xa || Ya;
  Xa || g.useLayoutEffect;
  var Qa = g.createContext(
    typeof HTMLElement < `u` ? ka({ key: `css` }) : null,
  );
  Qa.Provider;
  var $a = function (e) {
      return (0, g.forwardRef)(function (t, n) {
        return e(t, (0, g.useContext)(Qa), n);
      });
    },
    eo = g.createContext({});
  ({}).hasOwnProperty;
  var to =
      /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
    no = xa(function (e) {
      return (
        to.test(e) ||
        (e.charCodeAt(0) === 111 &&
          e.charCodeAt(1) === 110 &&
          e.charCodeAt(2) < 91)
      );
    }),
    ro = !1,
    io = no,
    ao = function (e) {
      return e !== `theme`;
    },
    oo = function (e) {
      return typeof e == `string` && e.charCodeAt(0) > 96 ? io : ao;
    },
    so = function (e, t, n) {
      var r;
      if (t) {
        var i = t.shouldForwardProp;
        r =
          e.__emotion_forwardProp && i
            ? function (t) {
                return e.__emotion_forwardProp(t) && i(t);
              }
            : i;
      }
      return (typeof r != `function` && n && (r = e.__emotion_forwardProp), r);
    },
    co = function (e) {
      var t = e.cache,
        n = e.serialized,
        r = e.isStringTag;
      return (
        Ma(t, n, r),
        Za(function () {
          return Na(t, n, r);
        }),
        null
      );
    },
    lo = function e(t, n) {
      var r = t.__emotion_real === t,
        i = (r && t.__emotion_base) || t,
        a,
        o;
      n !== void 0 && ((a = n.label), (o = n.target));
      var s = so(t, n, r),
        c = s || oo(i),
        l = !c(`as`);
      return function () {
        var u = arguments,
          d =
            r && t.__emotion_styles !== void 0
              ? t.__emotion_styles.slice(0)
              : [];
        if (
          (a !== void 0 && d.push(`label:` + a + `;`),
          u[0] == null || u[0].raw === void 0)
        )
          d.push.apply(d, u);
        else {
          var f = u[0];
          d.push(f[0]);
          for (var p = u.length, m = 1; m < p; m++) d.push(u[m], f[m]);
        }
        var h = $a(function (e, t, n) {
          var r = (l && e.as) || i,
            a = ``,
            u = [],
            f = e;
          if (e.theme == null) {
            for (var p in ((f = {}), e)) f[p] = e[p];
            f.theme = g.useContext(eo);
          }
          typeof e.className == `string`
            ? (a = ja(t.registered, u, e.className))
            : e.className != null && (a = e.className + ` `);
          var m = Ja(d.concat(u), t.registered, f);
          ((a += t.key + `-` + m.name), o !== void 0 && (a += ` ` + o));
          var h = l && s === void 0 ? oo(r) : c,
            _ = {};
          for (var v in e) (l && v === `as`) || (h(v) && (_[v] = e[v]));
          return (
            (_.className = a),
            n && (_.ref = n),
            g.createElement(
              g.Fragment,
              null,
              g.createElement(co, {
                cache: t,
                serialized: m,
                isStringTag: typeof r == `string`,
              }),
              g.createElement(r, _),
            )
          );
        });
        return (
          (h.displayName =
            a === void 0
              ? `Styled(` +
                (typeof i == `string`
                  ? i
                  : i.displayName || i.name || `Component`) +
                `)`
              : a),
          (h.defaultProps = t.defaultProps),
          (h.__emotion_real = h),
          (h.__emotion_base = i),
          (h.__emotion_styles = d),
          (h.__emotion_forwardProp = s),
          Object.defineProperty(h, "toString", {
            value: function () {
              return o === void 0 && ro ? `NO_COMPONENT_SELECTOR` : `.` + o;
            },
          }),
          (h.withComponent = function (t, r) {
            return e(
              t,
              xi({}, n, r, { shouldForwardProp: so(h, r, !0) }),
            ).apply(void 0, d);
          }),
          h
        );
      };
    },
    uo =
      `a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.big.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.keygen.label.legend.li.link.main.map.mark.marquee.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strong.style.sub.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.title.tr.track.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.foreignObject.g.image.line.linearGradient.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.text.tspan`.split(
        `.`,
      ),
    fo = lo.bind(null);
  uo.forEach(function (e) {
    fo[e] = fo(e);
  });
  function po(e, t) {
    return fo(e, t);
  }
  function mo(e, t) {
    Array.isArray(e.__emotion_styles) &&
      (e.__emotion_styles = t(e.__emotion_styles));
  }
  var ho = [];
  function go(e) {
    return ((ho[0] = e), Ja(ho));
  }
  var _o = { borderRadius: 4 };
  function vo(e = 8, t = Ir({ spacing: e })) {
    if (e.mui) return e;
    let n = (...e) =>
      (e.length === 0 ? [1] : e)
        .map((e) => {
          let n = t(e);
          return typeof n == `number` ? `${n}px` : n;
        })
        .join(` `);
    return ((n.mui = !0), n);
  }
  function K(e, t) {
    let n = this;
    if (n.vars) {
      if (!n.colorSchemes?.[e] || typeof n.getColorSchemeSelector != `function`)
        return {};
      let r = n.getColorSchemeSelector(e);
      return r === `&`
        ? t
        : ((r.includes(`data-`) || r.includes(`.`)) &&
            (r = `*:where(${r.replace(/\s*&$/, ``)}) &`),
          { [r]: t });
    }
    return n.palette.mode === e ? t : {};
  }
  function yo(e = {}, ...t) {
    let {
        breakpoints: n = {},
        palette: r = {},
        spacing: i,
        shape: a = {},
        ...o
      } = e,
      s = fr(n),
      c = vo(i),
      l = ir(
        {
          breakpoints: s,
          direction: `ltr`,
          components: {},
          palette: { mode: `light`, ...r },
          spacing: c,
          shape: { ..._o, ...a },
        },
        o,
      );
    return (
      (l = ur(l)),
      (l.applyStyles = K),
      (l = t.reduce((e, t) => ir(e, t), l)),
      (l.unstable_sxConfig = { ...hi, ...o?.unstable_sxConfig }),
      (l.unstable_sx = function (e) {
        return vi({ sx: e, theme: this });
      }),
      (l.internal_cache = {}),
      l
    );
  }
  function bo(e) {
    return Object.keys(e).length === 0;
  }
  function xo(e = null) {
    let t = g.useContext(eo);
    return !t || bo(t) ? e : t;
  }
  var So = yo();
  function Co(e = So) {
    return xo(e);
  }
  var wo = (e) => e,
    q = (() => {
      let e = wo;
      return {
        configure(t) {
          e = t;
        },
        generate(t) {
          return e(t);
        },
        reset() {
          e = wo;
        },
      };
    })(),
    To = {
      active: `active`,
      checked: `checked`,
      completed: `completed`,
      disabled: `disabled`,
      error: `error`,
      expanded: `expanded`,
      focused: `focused`,
      focusVisible: `focusVisible`,
      open: `open`,
      readOnly: `readOnly`,
      required: `required`,
      selected: `selected`,
    };
  function Eo(e, t, n = `Mui`) {
    let r = To[t];
    return r ? `${n}-${r}` : `${q.generate(e)}-${t}`;
  }
  function Do(e, t, n = `Mui`) {
    let r = {};
    return (
      t.forEach((t) => {
        r[t] = Eo(e, t, n);
      }),
      r
    );
  }
  function Oo(e) {
    let { variants: t, ...n } = e,
      r = { variants: t, style: go(n), isProcessed: !0 };
    return (
      r.style === n ||
        (t &&
          t.forEach((e) => {
            typeof e.style != `function` && (e.style = go(e.style));
          })),
      r
    );
  }
  var ko = yo();
  function Ao(e) {
    return e !== `ownerState` && e !== `theme` && e !== `sx` && e !== `as`;
  }
  function jo(e, t) {
    return (
      t &&
        e &&
        typeof e == `object` &&
        e.styles &&
        !e.styles.startsWith(`@layer`) &&
        (e.styles = `@layer ${t}{${String(e.styles)}}`),
      e
    );
  }
  function Mo(e) {
    return e ? (t, n) => n[e] : null;
  }
  function No(e, t, n) {
    e.theme = $n(e.theme) ? n : e.theme[t] || e.theme;
  }
  function Po(e, t, n) {
    let r = typeof t == `function` ? t(e) : t;
    if (Array.isArray(r)) return r.flatMap((t) => Po(e, t, n));
    if (Array.isArray(r?.variants)) {
      let t;
      if (r.isProcessed) t = n ? jo(r.style, n) : r.style;
      else {
        let { variants: e, ...i } = r;
        t = n ? jo(go(i), n) : i;
      }
      return Fo(e, r.variants, [t], n);
    }
    return r?.isProcessed
      ? n
        ? jo(go(r.style), n)
        : r.style
      : n
        ? jo(go(r), n)
        : r;
  }
  function Fo(e, t, n = [], r = void 0) {
    let i;
    variantLoop: for (let a = 0; a < t.length; a += 1) {
      let o = t[a];
      if (typeof o.props == `function`) {
        if (
          ((i ??= { ...e, ...e.ownerState, ownerState: e.ownerState }),
          !o.props(i))
        )
          continue;
      } else
        for (let t in o.props)
          if (e[t] !== o.props[t] && e.ownerState?.[t] !== o.props[t])
            continue variantLoop;
      typeof o.style == `function`
        ? ((i ??= { ...e, ...e.ownerState, ownerState: e.ownerState }),
          n.push(r ? jo(go(o.style(i)), r) : o.style(i)))
        : n.push(r ? jo(go(o.style), r) : o.style);
    }
    return n;
  }
  function Io(e = {}) {
    let {
      themeId: t,
      defaultTheme: n = ko,
      rootShouldForwardProp: r = Ao,
      slotShouldForwardProp: i = Ao,
    } = e;
    function a(e) {
      No(e, t, n);
    }
    return (e, t = {}) => {
      mo(e, (e) => e.filter((e) => e !== vi));
      let {
          name: n,
          slot: o,
          skipVariantsResolver: s,
          skipSx: c,
          overridesResolver: l = Mo(Ro(o)),
          ...u
        } = t,
        d = (n && n.startsWith(`Mui`)) || o ? `components` : `custom`,
        f = s === void 0 ? (o && o !== `Root` && o !== `root`) || !1 : s,
        p = c || !1,
        m = Ao;
      o === `Root` || o === `root`
        ? (m = r)
        : o
          ? (m = i)
          : Lo(e) && (m = void 0);
      let h = po(e, { shouldForwardProp: m, label: void 0, ...u }),
        g = (e) => {
          if (e.__emotion_real === e) return e;
          if (typeof e == `function`)
            return function (t) {
              return Po(t, e, t.theme.modularCssLayers ? d : void 0);
            };
          if (nr(e)) {
            let t = Oo(e);
            return function (e) {
              return t.variants
                ? Po(e, t, e.theme.modularCssLayers ? d : void 0)
                : e.theme.modularCssLayers
                  ? jo(t.style, d)
                  : t.style;
            };
          }
          return e;
        },
        _ = (...t) => {
          let r = [],
            i = t.map(g),
            o = [];
          if (
            (r.push(a),
            n &&
              l &&
              o.push(function (e) {
                let t = e.theme.components?.[n]?.styleOverrides;
                if (!t) return null;
                let r = {};
                for (let n in t)
                  r[n] = Po(
                    e,
                    t[n],
                    e.theme.modularCssLayers ? `theme` : void 0,
                  );
                return l(e, r);
              }),
            n &&
              !f &&
              o.push(function (e) {
                let t = e.theme?.components?.[n]?.variants;
                return t
                  ? Fo(e, t, [], e.theme.modularCssLayers ? `theme` : void 0)
                  : null;
              }),
            p || o.push(vi),
            Array.isArray(i[0]))
          ) {
            let e = i.shift(),
              t = Array(r.length).fill(``),
              n = Array(o.length).fill(``),
              a;
            ((a = [...t, ...e, ...n]),
              (a.raw = [...t, ...e.raw, ...n]),
              r.unshift(a));
          }
          let s = h(...r, ...i, ...o);
          return (e.muiName && (s.muiName = e.muiName), s);
        };
      return (h.withConfig && (_.withConfig = h.withConfig), _);
    };
  }
  function Lo(e) {
    return typeof e == `string` && e.charCodeAt(0) > 96;
  }
  function Ro(e) {
    return e && e.charAt(0).toLowerCase() + e.slice(1);
  }
  function zo(e, t, n = !1) {
    let r = { ...t };
    for (let i in e)
      if (Object.prototype.hasOwnProperty.call(e, i)) {
        let a = i;
        if (a === `components` || a === `slots`) r[a] = { ...e[a], ...r[a] };
        else if (a === `componentsProps` || a === `slotProps`) {
          let i = e[a],
            o = t[a];
          if (!o) r[a] = i || {};
          else if (!i) r[a] = o;
          else {
            r[a] = { ...o };
            for (let e in i)
              if (Object.prototype.hasOwnProperty.call(i, e)) {
                let t = e;
                r[a][t] = zo(i[t], o[t], n);
              }
          }
        } else
          a === `className` && n && t.className !== void 0
            ? (r.className = an(e?.className, t?.className))
            : a === `style` && n && t.style
              ? (r.style = { ...e?.style, ...t?.style })
              : r[a] === void 0 && (r[a] = e[a]);
      }
    return r;
  }
  function Bo(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
    return Math.max(t, Math.min(e, n));
  }
  function Vo(e, t = 0, n = 1) {
    return Bo(e, t, n);
  }
  function Ho(e) {
    e = e.slice(1);
    let t = RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, `g`),
      n = e.match(t);
    return (
      n && n[0].length === 1 && (n = n.map((e) => e + e)),
      n
        ? `rgb${n.length === 4 ? `a` : ``}(${n.map((e, t) => (t < 3 ? parseInt(e, 16) : Math.round((parseInt(e, 16) / 255) * 1e3) / 1e3)).join(`, `)})`
        : ``
    );
  }
  function Uo(e) {
    if (e.type) return e;
    if (e.charAt(0) === `#`) return Uo(Ho(e));
    let t = e.indexOf(`(`),
      n = e.substring(0, t);
    if (![`rgb`, `rgba`, `hsl`, `hsla`, `color`].includes(n))
      throw Error(Zn(9, e));
    let r = e.substring(t + 1, e.length - 1),
      i;
    if (n === `color`) {
      if (
        ((r = r.split(` `)),
        (i = r.shift()),
        r.length === 4 && r[3].charAt(0) === `/` && (r[3] = r[3].slice(1)),
        ![`srgb`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec-2020`].includes(
          i,
        ))
      )
        throw Error(Zn(10, i));
    } else r = r.split(`,`);
    return (
      (r = r.map((e) => parseFloat(e))),
      { type: n, values: r, colorSpace: i }
    );
  }
  var Wo = (e) => {
      let t = Uo(e);
      return t.values
        .slice(0, 3)
        .map((e, n) => (t.type.includes(`hsl`) && n !== 0 ? `${e}%` : e))
        .join(` `);
    },
    Go = (e, t) => {
      try {
        return Wo(e);
      } catch {
        return e;
      }
    };
  function Ko(e) {
    let { type: t, colorSpace: n } = e,
      { values: r } = e;
    return (
      t.includes(`rgb`)
        ? (r = r.map((e, t) => (t < 3 ? parseInt(e, 10) : e)))
        : t.includes(`hsl`) && ((r[1] = `${r[1]}%`), (r[2] = `${r[2]}%`)),
      (r = t.includes(`color`) ? `${n} ${r.join(` `)}` : `${r.join(`, `)}`),
      `${t}(${r})`
    );
  }
  function qo(e) {
    e = Uo(e);
    let { values: t } = e,
      n = t[0],
      r = t[1] / 100,
      i = t[2] / 100,
      a = r * Math.min(i, 1 - i),
      o = (e, t = (e + n / 30) % 12) =>
        i - a * Math.max(Math.min(t - 3, 9 - t, 1), -1),
      s = `rgb`,
      c = [
        Math.round(o(0) * 255),
        Math.round(o(8) * 255),
        Math.round(o(4) * 255),
      ];
    return (
      e.type === `hsla` && ((s += `a`), c.push(t[3])),
      Ko({ type: s, values: c })
    );
  }
  function Jo(e) {
    e = Uo(e);
    let t = e.type === `hsl` || e.type === `hsla` ? Uo(qo(e)).values : e.values;
    return (
      (t = t.map(
        (t) => (
          e.type !== `color` && (t /= 255),
          t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4
        ),
      )),
      Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
    );
  }
  function Yo(e, t) {
    let n = Jo(e),
      r = Jo(t);
    return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
  }
  function Xo(e, t) {
    return (
      (e = Uo(e)),
      (t = Vo(t)),
      (e.type === `rgb` || e.type === `hsl`) && (e.type += `a`),
      e.type === `color` ? (e.values[3] = `/${t}`) : (e.values[3] = t),
      Ko(e)
    );
  }
  function Zo(e, t, n) {
    try {
      return Xo(e, t);
    } catch {
      return e;
    }
  }
  function Qo(e, t) {
    if (((e = Uo(e)), (t = Vo(t)), e.type.includes(`hsl`)))
      e.values[2] *= 1 - t;
    else if (e.type.includes(`rgb`) || e.type.includes(`color`))
      for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - t;
    return Ko(e);
  }
  function J(e, t, n) {
    try {
      return Qo(e, t);
    } catch {
      return e;
    }
  }
  function $o(e, t) {
    if (((e = Uo(e)), (t = Vo(t)), e.type.includes(`hsl`)))
      e.values[2] += (100 - e.values[2]) * t;
    else if (e.type.includes(`rgb`))
      for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * t;
    else if (e.type.includes(`color`))
      for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * t;
    return Ko(e);
  }
  function Y(e, t, n) {
    try {
      return $o(e, t);
    } catch {
      return e;
    }
  }
  function es(e, t = 0.15) {
    return Jo(e) > 0.5 ? Qo(e, t) : $o(e, t);
  }
  function ts(e, t, n) {
    try {
      return es(e, t);
    } catch {
      return e;
    }
  }
  var ns = g.createContext(void 0);
  function rs(e) {
    let { theme: t, name: n, props: r } = e;
    if (!t || !t.components || !t.components[n]) return r;
    let i = t.components[n];
    return i.defaultProps
      ? zo(i.defaultProps, r, t.components.mergeClassNameAndStyle)
      : !i.styleOverrides && !i.variants
        ? zo(i, r, t.components.mergeClassNameAndStyle)
        : r;
  }
  function is({ props: e, name: t }) {
    return rs({ props: e, name: t, theme: { components: g.useContext(ns) } });
  }
  var as = { theme: void 0 };
  function os(e) {
    let t, n;
    return function (r) {
      let i = t;
      return (
        (i === void 0 || r.theme !== n) &&
          ((as.theme = r.theme), (i = Oo(e(as))), (t = i), (n = r.theme)),
        i
      );
    };
  }
  function ss(e = ``) {
    function t(...n) {
      if (!n.length) return ``;
      let r = n[0];
      return typeof r == `string` &&
        !r.match(
          /(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/,
        )
        ? `, var(--${e ? `${e}-` : ``}${r}${t(...n.slice(1))})`
        : `, ${r}`;
    }
    return (n, ...r) => `var(--${e ? `${e}-` : ``}${n}${t(...r)})`;
  }
  var cs = (e, t, n, r = []) => {
      let i = e;
      t.forEach((e, a) => {
        a === t.length - 1
          ? Array.isArray(i)
            ? (i[Number(e)] = n)
            : i && typeof i == `object` && (i[e] = n)
          : i &&
            typeof i == `object` &&
            (i[e] || (i[e] = r.includes(e) ? [] : {}), (i = i[e]));
      });
    },
    ls = (e, t, n) => {
      function r(e, i = [], a = []) {
        Object.entries(e).forEach(([e, o]) => {
          (!n || (n && !n([...i, e]))) &&
            o != null &&
            (typeof o == `object` && Object.keys(o).length > 0
              ? r(o, [...i, e], Array.isArray(o) ? [...a, e] : a)
              : t([...i, e], o, a));
        });
      }
      r(e);
    },
    us = (e, t) =>
      typeof t == `number`
        ? [`lineHeight`, `fontWeight`, `opacity`, `zIndex`].some((t) =>
            e.includes(t),
          ) || e[e.length - 1].toLowerCase().includes(`opacity`)
          ? t
          : `${t}px`
        : t;
  function ds(e, t) {
    let { prefix: n, shouldSkipGeneratingVar: r } = t || {},
      i = {},
      a = {},
      o = {};
    return (
      ls(
        e,
        (e, t, s) => {
          if (
            (typeof t == `string` || typeof t == `number`) &&
            (!r || !r(e, t))
          ) {
            let r = `--${n ? `${n}-` : ``}${e.join(`-`)}`,
              c = us(e, t);
            (Object.assign(i, { [r]: c }),
              cs(a, e, `var(${r})`, s),
              cs(o, e, `var(${r}, ${c})`, s));
          }
        },
        (e) => e[0] === `vars`,
      ),
      { css: i, vars: a, varsWithDefaults: o }
    );
  }
  function fs(e, t = {}) {
    let {
        getSelector: n = _,
        disableCssColorScheme: r,
        colorSchemeSelector: i,
        enableContrastVars: a,
      } = t,
      {
        colorSchemes: o = {},
        components: s,
        defaultColorScheme: c = `light`,
        ...l
      } = e,
      { vars: u, css: d, varsWithDefaults: f } = ds(l, t),
      p = f,
      m = {},
      { [c]: h, ...g } = o;
    if (
      (Object.entries(g || {}).forEach(([e, n]) => {
        let { vars: r, css: i, varsWithDefaults: a } = ds(n, t);
        ((p = ir(p, a)), (m[e] = { css: i, vars: r }));
      }),
      h)
    ) {
      let { css: e, vars: n, varsWithDefaults: r } = ds(h, t);
      ((p = ir(p, r)), (m[c] = { css: e, vars: n }));
    }
    function _(t, n) {
      let r = i;
      if (
        (i === `class` && (r = `.%s`),
        i === `data` && (r = `[data-%s]`),
        i?.startsWith(`data-`) && !i.includes(`%s`) && (r = `[${i}="%s"]`),
        t)
      ) {
        if (r === `media`)
          return e.defaultColorScheme === t
            ? `:root`
            : {
                [`@media (prefers-color-scheme: ${o[t]?.palette?.mode || t})`]:
                  { ":root": n },
              };
        if (r)
          return e.defaultColorScheme === t
            ? `:root, ${r.replace(`%s`, String(t))}`
            : r.replace(`%s`, String(t));
      }
      return `:root`;
    }
    return {
      vars: p,
      generateThemeVars: () => {
        let e = { ...u };
        return (
          Object.entries(m).forEach(([, { vars: t }]) => {
            e = ir(e, t);
          }),
          e
        );
      },
      generateStyleSheets: () => {
        let t = [],
          i = e.defaultColorScheme || `light`;
        function s(e, n) {
          Object.keys(n).length &&
            t.push(typeof e == `string` ? { [e]: { ...n } } : e);
        }
        s(n(void 0, { ...d }), d);
        let { [i]: c, ...l } = m;
        if (c) {
          let { css: e } = c,
            t = o[i]?.palette?.mode,
            a = !r && t ? { colorScheme: t, ...e } : { ...e };
          s(n(i, { ...a }), a);
        }
        return (
          Object.entries(l).forEach(([e, { css: t }]) => {
            let i = o[e]?.palette?.mode,
              a = !r && i ? { colorScheme: i, ...t } : { ...t };
            s(n(e, { ...a }), a);
          }),
          a &&
            t.push({
              ":root": {
                "--__l-threshold": `0.7`,
                "--__l": `clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)`,
                "--__a": `clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)`,
              },
            }),
          t
        );
      },
    };
  }
  function ps(e) {
    return function (t) {
      return e === `media`
        ? `@media (prefers-color-scheme: ${t})`
        : e
          ? e.startsWith(`data-`) && !e.includes(`%s`)
            ? `[${e}="${t}"] &`
            : e === `class`
              ? `.${t} &`
              : e === `data`
                ? `[data-${t}] &`
                : `${e.replace(`%s`, t)} &`
          : `&`;
    };
  }
  var ms = { black: `#000`, white: `#fff` },
    hs = {
      50: `#fafafa`,
      100: `#f5f5f5`,
      200: `#eeeeee`,
      300: `#e0e0e0`,
      400: `#bdbdbd`,
      500: `#9e9e9e`,
      600: `#757575`,
      700: `#616161`,
      800: `#424242`,
      900: `#212121`,
      A100: `#f5f5f5`,
      A200: `#eeeeee`,
      A400: `#bdbdbd`,
      A700: `#616161`,
    },
    gs = {
      50: `#f3e5f5`,
      100: `#e1bee7`,
      200: `#ce93d8`,
      300: `#ba68c8`,
      400: `#ab47bc`,
      500: `#9c27b0`,
      600: `#8e24aa`,
      700: `#7b1fa2`,
      800: `#6a1b9a`,
      900: `#4a148c`,
      A100: `#ea80fc`,
      A200: `#e040fb`,
      A400: `#d500f9`,
      A700: `#aa00ff`,
    },
    _s = {
      50: `#ffebee`,
      100: `#ffcdd2`,
      200: `#ef9a9a`,
      300: `#e57373`,
      400: `#ef5350`,
      500: `#f44336`,
      600: `#e53935`,
      700: `#d32f2f`,
      800: `#c62828`,
      900: `#b71c1c`,
      A100: `#ff8a80`,
      A200: `#ff5252`,
      A400: `#ff1744`,
      A700: `#d50000`,
    },
    vs = {
      50: `#fff3e0`,
      100: `#ffe0b2`,
      200: `#ffcc80`,
      300: `#ffb74d`,
      400: `#ffa726`,
      500: `#ff9800`,
      600: `#fb8c00`,
      700: `#f57c00`,
      800: `#ef6c00`,
      900: `#e65100`,
      A100: `#ffd180`,
      A200: `#ffab40`,
      A400: `#ff9100`,
      A700: `#ff6d00`,
    },
    ys = {
      50: `#e3f2fd`,
      100: `#bbdefb`,
      200: `#90caf9`,
      300: `#64b5f6`,
      400: `#42a5f5`,
      500: `#2196f3`,
      600: `#1e88e5`,
      700: `#1976d2`,
      800: `#1565c0`,
      900: `#0d47a1`,
      A100: `#82b1ff`,
      A200: `#448aff`,
      A400: `#2979ff`,
      A700: `#2962ff`,
    },
    bs = {
      50: `#e1f5fe`,
      100: `#b3e5fc`,
      200: `#81d4fa`,
      300: `#4fc3f7`,
      400: `#29b6f6`,
      500: `#03a9f4`,
      600: `#039be5`,
      700: `#0288d1`,
      800: `#0277bd`,
      900: `#01579b`,
      A100: `#80d8ff`,
      A200: `#40c4ff`,
      A400: `#00b0ff`,
      A700: `#0091ea`,
    },
    xs = {
      50: `#e8f5e9`,
      100: `#c8e6c9`,
      200: `#a5d6a7`,
      300: `#81c784`,
      400: `#66bb6a`,
      500: `#4caf50`,
      600: `#43a047`,
      700: `#388e3c`,
      800: `#2e7d32`,
      900: `#1b5e20`,
      A100: `#b9f6ca`,
      A200: `#69f0ae`,
      A400: `#00e676`,
      A700: `#00c853`,
    };
  function Ss() {
    return {
      text: {
        primary: `rgba(0, 0, 0, 0.87)`,
        secondary: `rgba(0, 0, 0, 0.6)`,
        disabled: `rgba(0, 0, 0, 0.38)`,
      },
      divider: `rgba(0, 0, 0, 0.12)`,
      background: { paper: ms.white, default: ms.white },
      action: {
        active: `rgba(0, 0, 0, 0.54)`,
        hover: `rgba(0, 0, 0, 0.04)`,
        hoverOpacity: 0.04,
        selected: `rgba(0, 0, 0, 0.08)`,
        selectedOpacity: 0.08,
        disabled: `rgba(0, 0, 0, 0.26)`,
        disabledBackground: `rgba(0, 0, 0, 0.12)`,
        disabledOpacity: 0.38,
        focus: `rgba(0, 0, 0, 0.12)`,
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    };
  }
  var Cs = Ss();
  function ws() {
    return {
      text: {
        primary: ms.white,
        secondary: `rgba(255, 255, 255, 0.7)`,
        disabled: `rgba(255, 255, 255, 0.5)`,
        icon: `rgba(255, 255, 255, 0.5)`,
      },
      divider: `rgba(255, 255, 255, 0.12)`,
      background: { paper: `#121212`, default: `#121212` },
      action: {
        active: ms.white,
        hover: `rgba(255, 255, 255, 0.08)`,
        hoverOpacity: 0.08,
        selected: `rgba(255, 255, 255, 0.16)`,
        selectedOpacity: 0.16,
        disabled: `rgba(255, 255, 255, 0.3)`,
        disabledBackground: `rgba(255, 255, 255, 0.12)`,
        disabledOpacity: 0.38,
        focus: `rgba(255, 255, 255, 0.12)`,
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      },
    };
  }
  var Ts = ws();
  function Es(e, t, n, r) {
    let i = r.light || r,
      a = r.dark || r * 1.5;
    e[t] ||
      (e.hasOwnProperty(n)
        ? (e[t] = e[n])
        : t === `light`
          ? (e.light = $o(e.main, i))
          : t === `dark` && (e.dark = Qo(e.main, a)));
  }
  function Ds(e, t, n, r, i) {
    let a = i.light || i,
      o = i.dark || i * 1.5;
    t[n] ||
      (t.hasOwnProperty(r)
        ? (t[n] = t[r])
        : n === `light`
          ? (t.light = `color-mix(in ${e}, ${t.main}, #fff ${(a * 100).toFixed(0)}%)`)
          : n === `dark` &&
            (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(o * 100).toFixed(0)}%)`));
  }
  function Os(e = `light`) {
    return e === `dark`
      ? { main: ys[200], light: ys[50], dark: ys[400] }
      : { main: ys[700], light: ys[400], dark: ys[800] };
  }
  function ks(e = `light`) {
    return e === `dark`
      ? { main: gs[200], light: gs[50], dark: gs[400] }
      : { main: gs[500], light: gs[300], dark: gs[700] };
  }
  function As(e = `light`) {
    return e === `dark`
      ? { main: _s[500], light: _s[300], dark: _s[700] }
      : { main: _s[700], light: _s[400], dark: _s[800] };
  }
  function js(e = `light`) {
    return e === `dark`
      ? { main: bs[400], light: bs[300], dark: bs[700] }
      : { main: bs[700], light: bs[500], dark: bs[900] };
  }
  function Ms(e = `light`) {
    return e === `dark`
      ? { main: xs[400], light: xs[300], dark: xs[700] }
      : { main: xs[800], light: xs[500], dark: xs[900] };
  }
  function Ns(e = `light`) {
    return e === `dark`
      ? { main: vs[400], light: vs[300], dark: vs[700] }
      : { main: `#ed6c02`, light: vs[500], dark: vs[900] };
  }
  function Ps(e) {
    return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
  }
  function Fs(e) {
    let {
        mode: t = `light`,
        contrastThreshold: n = 3,
        tonalOffset: r = 0.2,
        colorSpace: i,
        ...a
      } = e,
      o = e.primary || Os(t),
      s = e.secondary || ks(t),
      c = e.error || As(t),
      l = e.info || js(t),
      u = e.success || Ms(t),
      d = e.warning || Ns(t);
    function f(e) {
      return i
        ? Ps(e)
        : Yo(e, Ts.text.primary) >= n
          ? Ts.text.primary
          : Cs.text.primary;
    }
    let p = ({
        color: e,
        name: t,
        mainShade: n = 500,
        lightShade: a = 300,
        darkShade: o = 700,
      }) => {
        if (
          ((e = { ...e }),
          !e.main && e[n] && (e.main = e[n]),
          !e.hasOwnProperty(`main`))
        )
          throw Error(Zn(11, t ? ` (${t})` : ``, n));
        if (typeof e.main != `string`)
          throw Error(Zn(12, t ? ` (${t})` : ``, JSON.stringify(e.main)));
        return (
          i
            ? (Ds(i, e, `light`, a, r), Ds(i, e, `dark`, o, r))
            : (Es(e, `light`, a, r), Es(e, `dark`, o, r)),
          (e.contrastText ||= f(e.main)),
          e
        );
      },
      m;
    return (
      t === `light` ? (m = Ss()) : t === `dark` && (m = ws()),
      ir(
        {
          common: { ...ms },
          mode: t,
          primary: p({ color: o, name: `primary` }),
          secondary: p({
            color: s,
            name: `secondary`,
            mainShade: `A400`,
            lightShade: `A200`,
            darkShade: `A700`,
          }),
          error: p({ color: c, name: `error` }),
          warning: p({ color: d, name: `warning` }),
          info: p({ color: l, name: `info` }),
          success: p({ color: u, name: `success` }),
          grey: hs,
          contrastThreshold: n,
          getContrastText: f,
          augmentColor: p,
          tonalOffset: r,
          ...m,
        },
        a,
      )
    );
  }
  function Is(e) {
    let t = {};
    return (
      Object.entries(e).forEach((e) => {
        let [n, r] = e;
        typeof r == `object` &&
          (t[n] =
            `${r.fontStyle ? `${r.fontStyle} ` : ``}${r.fontVariant ? `${r.fontVariant} ` : ``}${r.fontWeight ? `${r.fontWeight} ` : ``}${r.fontStretch ? `${r.fontStretch} ` : ``}${r.fontSize || ``}${r.lineHeight ? `/${r.lineHeight} ` : ``}${r.fontFamily || ``}`);
      }),
      t
    );
  }
  function Ls(e, t) {
    return {
      toolbar: {
        minHeight: 56,
        [e.up(`xs`)]: { "@media (orientation: landscape)": { minHeight: 48 } },
        [e.up(`sm`)]: { minHeight: 64 },
      },
      ...t,
    };
  }
  function Rs(e) {
    return Math.round(e * 1e5) / 1e5;
  }
  var zs = { textTransform: `uppercase` },
    Bs = `"Roboto", "Helvetica", "Arial", sans-serif`;
  function Vs(e, t) {
    let {
        fontFamily: n = Bs,
        fontSize: r = 14,
        fontWeightLight: i = 300,
        fontWeightRegular: a = 400,
        fontWeightMedium: o = 500,
        fontWeightBold: s = 700,
        htmlFontSize: c = 16,
        allVariants: l,
        pxToRem: u,
        ...d
      } = typeof t == `function` ? t(e) : t,
      f = r / 14,
      p = u || ((e) => `${(e / c) * f}rem`),
      m = (e, t, r, i, a) => ({
        fontFamily: n,
        fontWeight: e,
        fontSize: p(t),
        lineHeight: r,
        ...(n === Bs ? { letterSpacing: `${Rs(i / t)}em` } : {}),
        ...a,
        ...l,
      });
    return ir(
      {
        htmlFontSize: c,
        pxToRem: p,
        fontFamily: n,
        fontSize: r,
        fontWeightLight: i,
        fontWeightRegular: a,
        fontWeightMedium: o,
        fontWeightBold: s,
        h1: m(i, 96, 1.167, -1.5),
        h2: m(i, 60, 1.2, -0.5),
        h3: m(a, 48, 1.167, 0),
        h4: m(a, 34, 1.235, 0.25),
        h5: m(a, 24, 1.334, 0),
        h6: m(o, 20, 1.6, 0.15),
        subtitle1: m(a, 16, 1.75, 0.15),
        subtitle2: m(o, 14, 1.57, 0.1),
        body1: m(a, 16, 1.5, 0.15),
        body2: m(a, 14, 1.43, 0.15),
        button: m(o, 14, 1.75, 0.4, zs),
        caption: m(a, 12, 1.66, 0.4),
        overline: m(a, 12, 2.66, 1, zs),
        inherit: {
          fontFamily: `inherit`,
          fontWeight: `inherit`,
          fontSize: `inherit`,
          lineHeight: `inherit`,
          letterSpacing: `inherit`,
        },
      },
      d,
      { clone: !1 },
    );
  }
  var Hs = 0.2,
    Us = 0.14,
    Ws = 0.12;
  function X(...e) {
    return [
      `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Hs})`,
      `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Us})`,
      `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ws})`,
    ].join(`,`);
  }
  var Gs = [
      `none`,
      X(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      X(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      X(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      X(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
      X(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      X(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
      X(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      X(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
      X(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
      X(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
      X(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      X(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
      X(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
      X(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
      X(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      X(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
      X(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
      X(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
      X(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
      X(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
      X(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
      X(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
      X(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
      X(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    ],
    Ks = [`all`],
    qs = {},
    Js = {
      easeInOut: `cubic-bezier(0.4, 0, 0.2, 1)`,
      easeOut: `cubic-bezier(0.0, 0, 0.2, 1)`,
      easeIn: `cubic-bezier(0.4, 0, 1, 1)`,
      sharp: `cubic-bezier(0.4, 0, 0.6, 1)`,
    },
    Ys = {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    };
  function Xs(e) {
    return `${Math.round(e)}ms`;
  }
  function Zs(e) {
    if (!e) return 0;
    let t = e / 36;
    return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
  }
  function Qs(e) {
    let t = { ...e };
    delete t.reducedMotion;
    let n = { ...Js, ...t.easing },
      r = { ...Ys, ...t.duration };
    return {
      getAutoHeightDuration: Zs,
      create:
        t.create ??
        ((e = Ks, t = qs) => {
          let {
            duration: i = r.standard,
            easing: a = n.easeInOut,
            delay: o = 0,
            ...s
          } = t;
          return (Array.isArray(e) ? e : [e])
            .map(
              (e) =>
                `${e} ${typeof i == `string` ? i : Xs(i)} ${a} ${typeof o == `string` ? o : Xs(o)}`,
            )
            .join(`,`);
        }),
      ...t,
      easing: n,
      duration: r,
    };
  }
  var $s = {};
  function ec(e = $s) {
    return { reducedMotion: `never`, ...e };
  }
  var tc = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  };
  function nc(e) {
    return (
      nr(e) ||
      e === void 0 ||
      typeof e == `string` ||
      typeof e == `boolean` ||
      typeof e == `number` ||
      Array.isArray(e)
    );
  }
  function rc(e = {}) {
    let t = { ...e };
    function n(e) {
      let t = Object.entries(e);
      for (let r = 0; r < t.length; r++) {
        let [i, a] = t[r];
        !nc(a) || i.startsWith(`unstable_`) || i.startsWith(`internal_`)
          ? delete e[i]
          : nr(a) && ((e[i] = { ...a }), n(e[i]));
      }
    }
    return (
      n(t),
      `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`
    );
  }
  function ic(e) {
    return typeof e == `number`
      ? `${(e * 100).toFixed(0)}%`
      : `calc((${e}) * 100%)`;
  }
  var ac = (e) => {
    if (!Number.isNaN(+e)) return +e;
    let t = e.match(/\d*\.?\d+/g);
    if (!t) return 0;
    let n = 0;
    for (let e = 0; e < t.length; e += 1) n += +t[e];
    return n;
  };
  function oc(e) {
    Object.assign(e, {
      alpha(t, n) {
        let r = this || e;
        return r.colorSpace
          ? `oklch(from ${t} l c h / ${typeof n == `string` ? `calc(${n})` : n})`
          : r.vars
            ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, `var(--$1Channel)`)} / ${typeof n == `string` ? `calc(${n})` : n})`
            : Xo(t, ac(n));
      },
      lighten(t, n) {
        let r = this || e;
        return r.colorSpace
          ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${ic(n)})`
          : $o(t, n);
      },
      darken(t, n) {
        let r = this || e;
        return r.colorSpace
          ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${ic(n)})`
          : Qo(t, n);
      },
    });
  }
  function sc(e = {}, ...t) {
    let {
      breakpoints: n,
      mixins: r = {},
      spacing: i,
      palette: a = {},
      motion: o = {},
      transitions: s = {},
      typography: c = {},
      shape: l,
      colorSpace: u,
      ...d
    } = e;
    if (e.vars && e.generateThemeVars === void 0) throw Error(Zn(22));
    let f = Fs({ ...a, colorSpace: u }),
      p = yo(e),
      m = ir(p, {
        mixins: Ls(p.breakpoints, r),
        palette: f,
        shadows: Gs.slice(),
        typography: Vs(f, c),
        motion: ec(o),
        transitions: Qs(s),
        zIndex: { ...tc },
      });
    return (
      (m = ir(m, d)),
      (m = t.reduce((e, t) => ir(e, t), m)),
      delete m.transitions.reducedMotion,
      (m.unstable_sxConfig = { ...hi, ...d?.unstable_sxConfig }),
      (m.unstable_sx = function (e) {
        return vi({ sx: e, theme: this });
      }),
      (m.toRuntimeSource = rc),
      oc(m),
      m
    );
  }
  function cc(e) {
    let t;
    return (
      (t = e < 1 ? 5.11916 * e ** 2 : 4.5 * Math.log(e + 1) + 2),
      Math.round(t * 10) / 1e3
    );
  }
  var lc = [...Array(25)].map((e, t) => {
    if (t === 0) return `none`;
    let n = cc(t);
    return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
  });
  function uc(e) {
    return {
      inputPlaceholder: e === `dark` ? 0.5 : 0.42,
      inputUnderline: e === `dark` ? 0.7 : 0.42,
      switchTrackDisabled: e === `dark` ? 0.2 : 0.12,
      switchTrack: e === `dark` ? 0.3 : 0.38,
    };
  }
  function dc(e) {
    return e === `dark` ? lc : [];
  }
  function fc(e) {
    let {
        palette: t = { mode: `light` },
        opacity: n,
        overlays: r,
        colorSpace: i,
        ...a
      } = e,
      o = Fs({ ...t, colorSpace: i });
    return {
      palette: o,
      opacity: { ...uc(o.mode), ...n },
      overlays: r || dc(o.mode),
      ...a,
    };
  }
  function Z(e) {
    return (
      e[0] === `motion` ||
      !!e[0].match(
        /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/,
      ) ||
      !!e[0].match(/sxConfig$/) ||
      (e[0] === `palette` &&
        !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/))
    );
  }
  var pc = (e) => [
      ...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ``}overlays-${n}`),
      `--${e ? `${e}-` : ``}palette-AppBar-darkBg`,
      `--${e ? `${e}-` : ``}palette-AppBar-darkColor`,
    ],
    mc = (e) => (t, n) => {
      let r = e.rootSelector || `:root`,
        i = e.colorSchemeSelector,
        a = i;
      if (
        (i === `class` && (a = `.%s`),
        i === `data` && (a = `[data-%s]`),
        i?.startsWith(`data-`) && !i.includes(`%s`) && (a = `[${i}="%s"]`),
        e.defaultColorScheme === t)
      ) {
        if (t === `dark`) {
          let i = {};
          return (
            pc(e.cssVarPrefix).forEach((e) => {
              ((i[e] = n[e]), delete n[e]);
            }),
            a === `media`
              ? { [r]: n, "@media (prefers-color-scheme: dark)": { [r]: i } }
              : a
                ? {
                    [a.replace(`%s`, t)]: i,
                    [`${r}, ${a.replace(`%s`, t)}`]: n,
                  }
                : { [r]: { ...n, ...i } }
          );
        }
        if (a && a !== `media`) return `${r}, ${a.replace(`%s`, String(t))}`;
      } else if (t) {
        if (a === `media`)
          return {
            [`@media (prefers-color-scheme: ${String(t)})`]: { [r]: n },
          };
        if (a) return a.replace(`%s`, String(t));
      }
      return r;
    };
  function hc(e, t) {
    t.forEach((t) => {
      e[t] || (e[t] = {});
    });
  }
  function Q(e, t, n) {
    !e[t] && n && (e[t] = n);
  }
  function gc(e) {
    return typeof e != `string` || !e.startsWith(`hsl`) ? e : qo(e);
  }
  function _c(e, t) {
    `${t}Channel` in e ||
      (e[`${t}Channel`] = Go(
        gc(e[t]),
        `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`,
      ));
  }
  function vc(e) {
    return typeof e == `number`
      ? `${e}px`
      : typeof e == `string` || typeof e == `function` || Array.isArray(e)
        ? e
        : `8px`;
  }
  var yc = (e) => {
      try {
        return e();
      } catch {}
    },
    bc = (e = `mui`) => ss(e);
  function xc(e, t, n, r, i) {
    if (!n) return;
    n = n === !0 ? {} : n;
    let a = i === `dark` ? `dark` : `light`;
    if (!r) {
      t[i] = fc({ ...n, palette: { mode: a, ...n?.palette }, colorSpace: e });
      return;
    }
    let { palette: o, ...s } = sc({
      ...r,
      palette: { mode: a, ...n?.palette },
      colorSpace: e,
    });
    return (
      (t[i] = {
        ...n,
        palette: o,
        opacity: { ...uc(a), ...n?.opacity },
        overlays: n?.overlays || dc(a),
      }),
      s
    );
  }
  function Sc(e = {}, ...t) {
    let {
        colorSchemes: n = { light: !0 },
        defaultColorScheme: r,
        disableCssColorScheme: i = !1,
        cssVarPrefix: a = `mui`,
        nativeColor: o = !1,
        shouldSkipGeneratingVar: s = Z,
        colorSchemeSelector: c = n.light && n.dark ? `media` : void 0,
        rootSelector: l = `:root`,
        ...u
      } = e,
      d = Object.keys(n)[0],
      f = r || (n.light && d !== `light` ? `light` : d),
      p = bc(a),
      { [f]: m, light: h, dark: g, ..._ } = n,
      v = { ..._ },
      y = m;
    if (
      (((f === `dark` && !(`dark` in n)) ||
        (f === `light` && !(`light` in n))) &&
        (y = !0),
      !y)
    )
      throw Error(Zn(21, f));
    let b;
    o && (b = `oklch`);
    let x = xc(b, v, y, u, f);
    (h && !v.light && xc(b, v, h, void 0, `light`),
      g && !v.dark && xc(b, v, g, void 0, `dark`));
    let S = {
      defaultColorScheme: f,
      ...x,
      cssVarPrefix: a,
      colorSchemeSelector: c,
      rootSelector: l,
      getCssVar: p,
      colorSchemes: v,
      font: { ...Is(x.typography), ...x.font },
      spacing: vc(u.spacing),
    };
    (Object.keys(S.colorSchemes).forEach((e) => {
      let t = S.colorSchemes[e].palette,
        n = (e) => {
          let n = e.split(`-`),
            r = n[1],
            i = n[2];
          return p(e, t[r][i]);
        };
      (t.mode === `light` &&
        (Q(t.common, `background`, `#fff`),
        Q(t.common, `onBackground`, `#000`)),
        t.mode === `dark` &&
          (Q(t.common, `background`, `#000`),
          Q(t.common, `onBackground`, `#fff`)));
      function r(e, t, n) {
        if (b) {
          let r;
          return (
            e === Zo && (r = `transparent ${((1 - n) * 100).toFixed(0)}%`),
            e === J && (r = `#000 ${(n * 100).toFixed(0)}%`),
            e === Y && (r = `#fff ${(n * 100).toFixed(0)}%`),
            `color-mix(in ${b}, ${t}, ${r})`
          );
        }
        return e(t, n);
      }
      if (
        (hc(t, [
          `Alert`,
          `AppBar`,
          `Avatar`,
          `Button`,
          `Chip`,
          `FilledInput`,
          `LinearProgress`,
          `Skeleton`,
          `Slider`,
          `SnackbarContent`,
          `SpeedDialAction`,
          `StepConnector`,
          `StepContent`,
          `Switch`,
          `TableCell`,
          `Tooltip`,
        ]),
        t.mode === `light`)
      ) {
        (Q(
          t.Alert,
          `errorColor`,
          r(J, o ? p(`palette-error-light`) : t.error.light, 0.6),
        ),
          Q(
            t.Alert,
            `infoColor`,
            r(J, o ? p(`palette-info-light`) : t.info.light, 0.6),
          ),
          Q(
            t.Alert,
            `successColor`,
            r(J, o ? p(`palette-success-light`) : t.success.light, 0.6),
          ),
          Q(
            t.Alert,
            `warningColor`,
            r(J, o ? p(`palette-warning-light`) : t.warning.light, 0.6),
          ),
          Q(t.Alert, `errorFilledBg`, n(`palette-error-main`)),
          Q(t.Alert, `infoFilledBg`, n(`palette-info-main`)),
          Q(t.Alert, `successFilledBg`, n(`palette-success-main`)),
          Q(t.Alert, `warningFilledBg`, n(`palette-warning-main`)),
          Q(
            t.Alert,
            `errorFilledColor`,
            yc(() => t.getContrastText(t.error.main)),
          ),
          Q(
            t.Alert,
            `infoFilledColor`,
            yc(() => t.getContrastText(t.info.main)),
          ),
          Q(
            t.Alert,
            `successFilledColor`,
            yc(() => t.getContrastText(t.success.main)),
          ),
          Q(
            t.Alert,
            `warningFilledColor`,
            yc(() => t.getContrastText(t.warning.main)),
          ),
          Q(
            t.Alert,
            `errorStandardBg`,
            r(Y, o ? p(`palette-error-light`) : t.error.light, 0.9),
          ),
          Q(
            t.Alert,
            `infoStandardBg`,
            r(Y, o ? p(`palette-info-light`) : t.info.light, 0.9),
          ),
          Q(
            t.Alert,
            `successStandardBg`,
            r(Y, o ? p(`palette-success-light`) : t.success.light, 0.9),
          ),
          Q(
            t.Alert,
            `warningStandardBg`,
            r(Y, o ? p(`palette-warning-light`) : t.warning.light, 0.9),
          ),
          Q(t.Alert, `errorIconColor`, n(`palette-error-main`)),
          Q(t.Alert, `infoIconColor`, n(`palette-info-main`)),
          Q(t.Alert, `successIconColor`, n(`palette-success-main`)),
          Q(t.Alert, `warningIconColor`, n(`palette-warning-main`)),
          Q(t.AppBar, `defaultBg`, n(`palette-grey-100`)),
          Q(t.Avatar, `defaultBg`, n(`palette-grey-400`)),
          Q(t.Button, `inheritContainedBg`, n(`palette-grey-300`)),
          Q(t.Button, `inheritContainedHoverBg`, n(`palette-grey-A100`)),
          Q(t.Chip, `defaultBorder`, n(`palette-grey-400`)),
          Q(t.Chip, `defaultAvatarColor`, n(`palette-grey-700`)),
          Q(t.Chip, `defaultIconColor`, n(`palette-grey-700`)),
          Q(t.FilledInput, `bg`, `rgba(0, 0, 0, 0.06)`),
          Q(t.FilledInput, `hoverBg`, `rgba(0, 0, 0, 0.09)`),
          Q(t.FilledInput, `disabledBg`, `rgba(0, 0, 0, 0.12)`),
          Q(
            t.LinearProgress,
            `primaryBg`,
            r(Y, o ? p(`palette-primary-main`) : t.primary.main, 0.62),
          ),
          Q(
            t.LinearProgress,
            `secondaryBg`,
            r(Y, o ? p(`palette-secondary-main`) : t.secondary.main, 0.62),
          ),
          Q(
            t.LinearProgress,
            `errorBg`,
            r(Y, o ? p(`palette-error-main`) : t.error.main, 0.62),
          ),
          Q(
            t.LinearProgress,
            `infoBg`,
            r(Y, o ? p(`palette-info-main`) : t.info.main, 0.62),
          ),
          Q(
            t.LinearProgress,
            `successBg`,
            r(Y, o ? p(`palette-success-main`) : t.success.main, 0.62),
          ),
          Q(
            t.LinearProgress,
            `warningBg`,
            r(Y, o ? p(`palette-warning-light`) : t.warning.main, 0.62),
          ),
          Q(
            t.Skeleton,
            `bg`,
            b
              ? r(Zo, o ? p(`palette-text-primary`) : t.text.primary, 0.11)
              : `rgba(${n(`palette-text-primaryChannel`)} / 0.11)`,
          ),
          Q(
            t.Slider,
            `primaryTrack`,
            r(Y, o ? p(`palette-primary-main`) : t.primary.main, 0.62),
          ),
          Q(
            t.Slider,
            `secondaryTrack`,
            r(Y, o ? p(`palette-secondary-main`) : t.secondary.main, 0.62),
          ),
          Q(
            t.Slider,
            `errorTrack`,
            r(Y, o ? p(`palette-error-main`) : t.error.main, 0.62),
          ),
          Q(
            t.Slider,
            `infoTrack`,
            r(Y, o ? p(`palette-info-main`) : t.info.main, 0.62),
          ),
          Q(
            t.Slider,
            `successTrack`,
            r(Y, o ? p(`palette-success-main`) : t.success.main, 0.62),
          ),
          Q(
            t.Slider,
            `warningTrack`,
            r(Y, o ? p(`palette-warning-main`) : t.warning.main, 0.62),
          ));
        let e = b
          ? r(
              J,
              o ? p(`palette-background-default`) : t.background.default,
              0.6825,
            )
          : ts(t.background.default, 0.8);
        (Q(t.SnackbarContent, `bg`, e),
          Q(
            t.SnackbarContent,
            `color`,
            yc(() => (b ? Ts.text.primary : t.getContrastText(e))),
          ),
          Q(t.SpeedDialAction, `fabHoverBg`, ts(t.background.paper, 0.15)),
          Q(t.StepConnector, `border`, n(`palette-grey-400`)),
          Q(t.StepContent, `border`, n(`palette-grey-400`)),
          Q(t.Switch, `defaultColor`, n(`palette-common-white`)),
          Q(t.Switch, `defaultDisabledColor`, n(`palette-grey-100`)),
          Q(
            t.Switch,
            `primaryDisabledColor`,
            r(Y, o ? p(`palette-primary-main`) : t.primary.main, 0.62),
          ),
          Q(
            t.Switch,
            `secondaryDisabledColor`,
            r(Y, o ? p(`palette-secondary-main`) : t.secondary.main, 0.62),
          ),
          Q(
            t.Switch,
            `errorDisabledColor`,
            r(Y, o ? p(`palette-error-main`) : t.error.main, 0.62),
          ),
          Q(
            t.Switch,
            `infoDisabledColor`,
            r(Y, o ? p(`palette-info-main`) : t.info.main, 0.62),
          ),
          Q(
            t.Switch,
            `successDisabledColor`,
            r(Y, o ? p(`palette-success-main`) : t.success.main, 0.62),
          ),
          Q(
            t.Switch,
            `warningDisabledColor`,
            r(Y, o ? p(`palette-warning-main`) : t.warning.main, 0.62),
          ),
          Q(
            t.TableCell,
            `border`,
            r(Y, Zo(o ? p(`palette-divider`) : t.divider, 1), 0.88),
          ),
          Q(
            t.Tooltip,
            `bg`,
            r(Zo, o ? p(`palette-grey-700`) : t.grey[700], 0.92),
          ));
      }
      if (t.mode === `dark`) {
        (Q(
          t.Alert,
          `errorColor`,
          r(Y, o ? p(`palette-error-light`) : t.error.light, 0.6),
        ),
          Q(
            t.Alert,
            `infoColor`,
            r(Y, o ? p(`palette-info-light`) : t.info.light, 0.6),
          ),
          Q(
            t.Alert,
            `successColor`,
            r(Y, o ? p(`palette-success-light`) : t.success.light, 0.6),
          ),
          Q(
            t.Alert,
            `warningColor`,
            r(Y, o ? p(`palette-warning-light`) : t.warning.light, 0.6),
          ),
          Q(t.Alert, `errorFilledBg`, n(`palette-error-dark`)),
          Q(t.Alert, `infoFilledBg`, n(`palette-info-dark`)),
          Q(t.Alert, `successFilledBg`, n(`palette-success-dark`)),
          Q(t.Alert, `warningFilledBg`, n(`palette-warning-dark`)),
          Q(
            t.Alert,
            `errorFilledColor`,
            yc(() => t.getContrastText(t.error.dark)),
          ),
          Q(
            t.Alert,
            `infoFilledColor`,
            yc(() => t.getContrastText(t.info.dark)),
          ),
          Q(
            t.Alert,
            `successFilledColor`,
            yc(() => t.getContrastText(t.success.dark)),
          ),
          Q(
            t.Alert,
            `warningFilledColor`,
            yc(() => t.getContrastText(t.warning.dark)),
          ),
          Q(
            t.Alert,
            `errorStandardBg`,
            r(J, o ? p(`palette-error-light`) : t.error.light, 0.9),
          ),
          Q(
            t.Alert,
            `infoStandardBg`,
            r(J, o ? p(`palette-info-light`) : t.info.light, 0.9),
          ),
          Q(
            t.Alert,
            `successStandardBg`,
            r(J, o ? p(`palette-success-light`) : t.success.light, 0.9),
          ),
          Q(
            t.Alert,
            `warningStandardBg`,
            r(J, o ? p(`palette-warning-light`) : t.warning.light, 0.9),
          ),
          Q(t.Alert, `errorIconColor`, n(`palette-error-main`)),
          Q(t.Alert, `infoIconColor`, n(`palette-info-main`)),
          Q(t.Alert, `successIconColor`, n(`palette-success-main`)),
          Q(t.Alert, `warningIconColor`, n(`palette-warning-main`)),
          Q(t.AppBar, `defaultBg`, n(`palette-grey-900`)),
          Q(t.AppBar, `darkBg`, n(`palette-background-paper`)),
          Q(t.AppBar, `darkColor`, n(`palette-text-primary`)),
          Q(t.Avatar, `defaultBg`, n(`palette-grey-600`)),
          Q(t.Button, `inheritContainedBg`, n(`palette-grey-800`)),
          Q(t.Button, `inheritContainedHoverBg`, n(`palette-grey-700`)),
          Q(t.Chip, `defaultBorder`, n(`palette-grey-700`)),
          Q(t.Chip, `defaultAvatarColor`, n(`palette-grey-300`)),
          Q(t.Chip, `defaultIconColor`, n(`palette-grey-300`)),
          Q(t.FilledInput, `bg`, `rgba(255, 255, 255, 0.09)`),
          Q(t.FilledInput, `hoverBg`, `rgba(255, 255, 255, 0.13)`),
          Q(t.FilledInput, `disabledBg`, `rgba(255, 255, 255, 0.12)`),
          Q(
            t.LinearProgress,
            `primaryBg`,
            r(J, o ? p(`palette-primary-main`) : t.primary.main, 0.5),
          ),
          Q(
            t.LinearProgress,
            `secondaryBg`,
            r(J, o ? p(`palette-secondary-main`) : t.secondary.main, 0.5),
          ),
          Q(
            t.LinearProgress,
            `errorBg`,
            r(J, o ? p(`palette-error-main`) : t.error.main, 0.5),
          ),
          Q(
            t.LinearProgress,
            `infoBg`,
            r(J, o ? p(`palette-info-main`) : t.info.main, 0.5),
          ),
          Q(
            t.LinearProgress,
            `successBg`,
            r(J, o ? p(`palette-success-main`) : t.success.main, 0.5),
          ),
          Q(
            t.LinearProgress,
            `warningBg`,
            r(J, o ? p(`palette-warning-main`) : t.warning.main, 0.5),
          ),
          Q(
            t.Skeleton,
            `bg`,
            b
              ? r(Zo, o ? p(`palette-text-primary`) : t.text.primary, 0.13)
              : `rgba(${n(`palette-text-primaryChannel`)} / 0.13)`,
          ),
          Q(
            t.Slider,
            `primaryTrack`,
            r(J, o ? p(`palette-primary-main`) : t.primary.main, 0.5),
          ),
          Q(
            t.Slider,
            `secondaryTrack`,
            r(J, o ? p(`palette-secondary-main`) : t.secondary.main, 0.5),
          ),
          Q(
            t.Slider,
            `errorTrack`,
            r(J, o ? p(`palette-error-main`) : t.error.main, 0.5),
          ),
          Q(
            t.Slider,
            `infoTrack`,
            r(J, o ? p(`palette-info-main`) : t.info.main, 0.5),
          ),
          Q(
            t.Slider,
            `successTrack`,
            r(J, o ? p(`palette-success-main`) : t.success.main, 0.5),
          ),
          Q(
            t.Slider,
            `warningTrack`,
            r(J, o ? p(`palette-warning-light`) : t.warning.main, 0.5),
          ));
        let e = b
          ? r(
              Y,
              o ? p(`palette-background-default`) : t.background.default,
              0.985,
            )
          : ts(t.background.default, 0.98);
        (Q(t.SnackbarContent, `bg`, e),
          Q(
            t.SnackbarContent,
            `color`,
            yc(() => (b ? Cs.text.primary : t.getContrastText(e))),
          ),
          Q(t.SpeedDialAction, `fabHoverBg`, ts(t.background.paper, 0.15)),
          Q(t.StepConnector, `border`, n(`palette-grey-600`)),
          Q(t.StepContent, `border`, n(`palette-grey-600`)),
          Q(t.Switch, `defaultColor`, n(`palette-grey-300`)),
          Q(t.Switch, `defaultDisabledColor`, n(`palette-grey-600`)),
          Q(
            t.Switch,
            `primaryDisabledColor`,
            r(J, o ? p(`palette-primary-main`) : t.primary.main, 0.55),
          ),
          Q(
            t.Switch,
            `secondaryDisabledColor`,
            r(J, o ? p(`palette-secondary-main`) : t.secondary.main, 0.55),
          ),
          Q(
            t.Switch,
            `errorDisabledColor`,
            r(J, o ? p(`palette-error-main`) : t.error.main, 0.55),
          ),
          Q(
            t.Switch,
            `infoDisabledColor`,
            r(J, o ? p(`palette-info-main`) : t.info.main, 0.55),
          ),
          Q(
            t.Switch,
            `successDisabledColor`,
            r(J, o ? p(`palette-success-main`) : t.success.main, 0.55),
          ),
          Q(
            t.Switch,
            `warningDisabledColor`,
            r(J, o ? p(`palette-warning-light`) : t.warning.main, 0.55),
          ),
          Q(
            t.TableCell,
            `border`,
            r(J, Zo(o ? p(`palette-divider`) : t.divider, 1), 0.68),
          ),
          Q(
            t.Tooltip,
            `bg`,
            r(Zo, o ? p(`palette-grey-700`) : t.grey[700], 0.92),
          ));
      }
      (o ||
        (_c(t.background, `default`),
        _c(t.background, `paper`),
        _c(t.common, `background`),
        _c(t.common, `onBackground`),
        _c(t, `divider`)),
        Object.keys(t).forEach((e) => {
          let n = t[e];
          e !== `tonalOffset` &&
            !o &&
            n &&
            typeof n == `object` &&
            (n.main && Q(t[e], `mainChannel`, Go(gc(n.main))),
            n.light && Q(t[e], `lightChannel`, Go(gc(n.light))),
            n.dark && Q(t[e], `darkChannel`, Go(gc(n.dark))),
            n.contrastText &&
              Q(t[e], `contrastTextChannel`, Go(gc(n.contrastText))),
            e === `text` && (_c(t[e], `primary`), _c(t[e], `secondary`)),
            e === `action` &&
              (n.active && _c(t[e], `active`),
              n.selected && _c(t[e], `selected`)));
        }));
    }),
      (S = t.reduce((e, t) => ir(e, t), S)));
    let C = {
        prefix: a,
        disableCssColorScheme: i,
        shouldSkipGeneratingVar: s,
        getSelector: mc(S),
        enableContrastVars: o,
      },
      { vars: w, generateThemeVars: T, generateStyleSheets: E } = fs(S, C);
    return (
      (S.vars = w),
      Object.entries(S.colorSchemes[S.defaultColorScheme]).forEach(([e, t]) => {
        S[e] = t;
      }),
      (S.generateThemeVars = T),
      (S.generateStyleSheets = E),
      (S.generateSpacing = function () {
        return vo(u.spacing, Ir(this));
      }),
      (S.getColorSchemeSelector = ps(c)),
      (S.spacing = S.generateSpacing()),
      (S.shouldSkipGeneratingVar = s),
      (S.unstable_sxConfig = { ...hi, ...u?.unstable_sxConfig }),
      (S.unstable_sx = function (e) {
        return vi({ sx: e, theme: this });
      }),
      (S.internal_cache = {}),
      (S.toRuntimeSource = rc),
      S
    );
  }
  function Cc(e, t, n) {
    e.colorSchemes &&
      n &&
      (e.colorSchemes[t] = {
        ...(n !== !0 && n),
        palette: Fs({ ...(n === !0 ? {} : n.palette), mode: t }),
      });
  }
  function wc(e = {}, ...t) {
    let {
        palette: n,
        cssVariables: r = !1,
        colorSchemes: i = n ? void 0 : { light: !0 },
        defaultColorScheme: a = n?.mode,
        ...o
      } = e,
      s = a || `light`,
      c = i?.[s],
      l = {
        ...i,
        ...(n
          ? { [s]: { ...(typeof c != `boolean` && c), palette: n } }
          : void 0),
      };
    if (r === !1) {
      if (!(`colorSchemes` in e)) return sc(e, ...t);
      let r = n;
      `palette` in e ||
        (l[s] &&
          (l[s] === !0
            ? s === `dark` && (r = { mode: `dark` })
            : (r = l[s].palette)));
      let i = sc({ ...e, palette: r }, ...t);
      return (
        (i.defaultColorScheme = s),
        (i.colorSchemes = l),
        i.palette.mode === `light` &&
          ((i.colorSchemes.light = {
            ...(l.light !== !0 && l.light),
            palette: i.palette,
          }),
          Cc(i, `dark`, l.dark)),
        i.palette.mode === `dark` &&
          ((i.colorSchemes.dark = {
            ...(l.dark !== !0 && l.dark),
            palette: i.palette,
          }),
          Cc(i, `light`, l.light)),
        i
      );
    }
    return (
      !n && !(`light` in l) && s === `light` && (l.light = !0),
      Sc(
        {
          ...o,
          colorSchemes: l,
          defaultColorScheme: s,
          ...(typeof r != `boolean` && r),
        },
        ...t,
      )
    );
  }
  var Tc = wc(),
    Ec = `$$material`;
  function Dc() {
    let e = Co(Tc);
    return e.$$material || e;
  }
  function Oc(e) {
    return e !== `ownerState` && e !== `theme` && e !== `sx` && e !== `as`;
  }
  var kc = (e) => Oc(e) && e !== `classes`,
    Ac = Io({ themeId: Ec, defaultTheme: Tc, rootShouldForwardProp: kc }),
    jc = os;
  function Mc(e) {
    return is(e);
  }
  function Nc(e) {
    return typeof e == `string`;
  }
  function Pc(e, t, n) {
    return e === void 0 || Nc(e)
      ? t
      : { ...t, ownerState: { ...t.ownerState, ...n } };
  }
  function Fc(e, t, n) {
    return typeof e == `function` ? e(t, n) : e;
  }
  function Ic(e, t) {
    let n = e.charCodeAt(2);
    return (
      e[0] === `o` &&
      e[1] === `n` &&
      n >= 65 &&
      n <= 90 &&
      typeof t == `function`
    );
  }
  function Lc(e) {
    if (e === void 0) return {};
    let t = {};
    for (let n of Object.keys(e)) Ic(n, e[n]) && (t[n] = e[n]);
    return t;
  }
  function Rc(e) {
    if (e === void 0) return {};
    let t = {};
    return (
      Object.keys(e)
        .filter((t) => !(t.match(/^on[A-Z]/) && typeof e[t] == `function`))
        .forEach((n) => {
          t[n] = e[n];
        }),
      t
    );
  }
  function zc(e) {
    let {
      getSlotProps: t,
      additionalProps: n,
      externalSlotProps: r,
      externalForwardedProps: i,
      className: a,
    } = e;
    if (!t) {
      let e = an(n?.className, a, i?.className, r?.className),
        t = { ...n?.style, ...i?.style, ...r?.style },
        o = { ...n, ...i, ...r };
      return (
        e.length > 0 && (o.className = e),
        Object.keys(t).length > 0 && (o.style = t),
        { props: o, internalRef: void 0 }
      );
    }
    let o = Lc({ ...i, ...r }),
      s = Rc(r),
      c = Rc(i),
      l = t(o),
      u = an(l?.className, n?.className, a, i?.className, r?.className),
      d = { ...l?.style, ...n?.style, ...i?.style, ...r?.style },
      f = { ...l, ...n, ...c, ...s };
    return (
      u.length > 0 && (f.className = u),
      Object.keys(d).length > 0 && (f.style = d),
      { props: f, internalRef: l.ref }
    );
  }
  function Bc(e, t) {
    let {
        className: n,
        elementType: r,
        ownerState: i,
        externalForwardedProps: a,
        internalForwardedProps: o,
        shouldForwardComponentProp: s = !1,
        ...c
      } = t,
      {
        component: l,
        slots: u = { [e]: void 0 },
        slotProps: d = { [e]: void 0 },
        ...f
      } = a,
      p = u[e] || r,
      m = Fc(d[e], i),
      {
        props: { component: h, ...g },
        internalRef: _,
      } = zc({
        className: n,
        ...c,
        externalForwardedProps: e === `root` ? f : void 0,
        externalSlotProps: m,
      }),
      v = Sn(_, m?.ref, t.ref),
      y = e === `root` ? h || l : h;
    return [
      p,
      Pc(
        p,
        {
          ...(e === `root` && !l && !u[e] && o),
          ...(e !== `root` && !u[e] && o),
          ...g,
          ...(y && !s && { as: y }),
          ...(y && s && { component: y }),
          ref: v,
        },
        i,
      ),
    ];
  }
  var $ = {};
  function Vc(e, t) {
    let n = g.useRef($);
    return (n.current === $ && (n.current = e(t)), n);
  }
  function Hc(e) {
    let t = Vc(() => Uc(e)).current;
    return ((t.next = e), Ln(t.effect), t);
  }
  function Uc(e) {
    let t = {
      current: e,
      next: e,
      effect: () => {
        t.current = t.next;
      },
    };
    return t;
  }
  var Wc = g.createContext(null),
    Gc = { transition: `none` };
  function Kc(e, t) {
    return e === `always`
      ? t
      : e === `system`
        ? { "@media (prefers-reduced-motion: reduce)": t }
        : null;
  }
  var qc = (e) => e.scrollTop,
    Jc = { offsetX: 0, offsetY: 0 },
    Yc = {},
    Xc = [`all`],
    Zc = {},
    Qc = {
      matrix: [4, 5],
      matrix3d: [12, 13],
      translate: [0, 1],
      translate3d: [0, 1],
      translateX: [0, null],
      translateY: [null, 0],
    };
  function $c(e) {
    let t = parseFloat(e ?? ``);
    return Number.isNaN(t) ? 0 : t;
  }
  function el(e) {
    let t = e.match(
      /^(matrix|matrix3d|translate|translate3d|translateX|translateY)\((.+)\)$/,
    );
    return t ? { type: t[1], values: t[2].split(`,`).map($c) } : null;
  }
  function tl(e, t) {
    return t === null ? 0 : e[t] || 0;
  }
  function nl(e) {
    if (!e || e === `none`) return Jc;
    let t = el(e);
    if (!t) return Jc;
    let { type: n, values: r } = t,
      i = Qc[n];
    return i ? { offsetX: tl(r, i[0]), offsetY: tl(r, i[1]) } : Jc;
  }
  function rl(e, t) {
    return (n) => {
      if (t) {
        let r = e.current;
        n === void 0 ? t(r) : t(r, n);
      }
    };
  }
  function il(e, t, n, r, i, a) {
    let o = e === `exited` && !t ? r : n[e] || n.exited;
    return i || a ? { ...o, ...i, ...a } : o;
  }
  function al(e, t) {
    let { timeout: n, easing: r, style: i = Yc } = e;
    return {
      duration:
        i.transitionDuration ?? (typeof n == `number` ? n : n[t.mode] || 0),
      easing:
        i.transitionTimingFunction ?? (typeof r == `object` ? r[t.mode] : r),
      delay: i.transitionDelay,
    };
  }
  function ol(e, t) {
    let n = t ?? Gc;
    return Kc(e.motion?.reducedMotion, n);
  }
  function sl(e, t = Xc, n = Zc) {
    let r = e.transitions?.create?.(t, n),
      i = ol(e);
    if (r === void 0) return i ?? Yc;
    let a = { transition: r };
    return i ? { ...a, ...i } : a;
  }
  function cl(e) {
    if (e == null) return { appear: void 0, enter: void 0, exit: void 0 };
    if (typeof e == `number`) return { appear: e, enter: e, exit: e };
    let t = e.enter,
      n = e.exit;
    return { appear: e.appear === void 0 ? t : e.appear, enter: t, exit: n };
  }
  function ll(e) {
    if (e.autoTimeout != null) return e.autoTimeout;
    let t = cl(e.timeout);
    return e.currentStatus === `entering`
      ? e.isAppearing
        ? (t.appear ?? t.enter ?? null)
        : (t.enter ?? null)
      : (t.exit ?? null);
  }
  function ul(e) {
    let {
        in: t = !1,
        appear: n = !1,
        enter: r = !0,
        exit: i = !0,
        mountOnEnter: a = !1,
        unmountOnExit: o = !1,
        timeout: s,
        addEndListener: c,
        reduceMotion: l = !1,
        getAutoTimeout: u,
        nodeRef: d,
        onEnter: f,
        onEntering: p,
        onEntered: m,
        onExit: h,
        onExiting: _,
        onExited: v,
        children: y,
        ...b
      } = e,
      x = g.useContext(Wc),
      S = x && !x.isMounting ? r : n,
      [C, w] = g.useState(() =>
        t ? (S ? `exited` : `entered`) : a || o ? `unmounted` : `exited`,
      ),
      T = g.useRef(C);
    ((T.current = C),
      t && C === `unmounted` && ((T.current = `exited`), w(`exited`)));
    let E = g.useRef(t && S),
      D = g.useRef(!1),
      O = g.useRef(null),
      k = g.useRef(C),
      A = g.useRef(!1),
      ee = g.useRef(l),
      j = Hc({
        timeout: s,
        addEndListener: c,
        reduceMotion: l,
        getAutoTimeout: u,
        onEnter: f,
        onEntering: p,
        onEntered: m,
        onExit: h,
        onExiting: _,
        onExited: v,
        enter: r,
        exit: i,
        mountOnEnter: a,
        unmountOnExit: o,
        nodeRef: d,
        parentGroup: x,
      }),
      te = g.useCallback(() => {
        O.current !== null && (O.current.cancel(), (O.current = null));
      }, []),
      M = g.useCallback((e) => {
        let t = !0,
          n = () => {
            t && ((t = !1), (O.current = null), e());
          };
        return (
          (n.cancel = () => {
            t = !1;
          }),
          (O.current = n),
          n
        );
      }, []),
      N = g.useCallback(
        (e, t) => {
          let n,
            r = () => {
              n !== void 0 && (clearTimeout(n), (n = void 0));
            },
            i = M(() => {
              (r(), (T.current = e), w(e));
            }),
            a = i.cancel;
          i.cancel = () => {
            (r(), a());
          };
          let o = j.current.nodeRef.current,
            s = j.current.addEndListener,
            c = j.current.getAutoTimeout !== void 0,
            l = j.current.getAutoTimeout?.(),
            u = ll({
              currentStatus: t,
              isAppearing: A.current,
              timeout: j.current.timeout,
              autoTimeout: l,
            }),
            d = ee.current,
            f = u ?? (d && c ? 0 : null),
            p = (e) => {
              n = setTimeout(i, e);
            };
          if (!o) {
            p(0);
            return;
          }
          if (s) {
            (f != null && p(d ? 0 : f), s.length >= 2 ? s(o, i) : s(i));
            return;
          }
          p(d ? 0 : (u ?? 0));
        },
        [M, j],
      ),
      ne = g.useCallback(
        (e) => {
          let t = j.current,
            n = t.parentGroup ? t.parentGroup.isMounting : e;
          if (((A.current = n), !e && !t.enter)) {
            ((T.current = `entered`), w(`entered`));
            return;
          }
          ((ee.current = t.reduceMotion),
            t.onEnter?.(n),
            (T.current = `entering`),
            w(`entering`));
        },
        [j],
      ),
      re = g.useCallback(() => {
        let e = j.current;
        if (!e.exit) {
          ((T.current = `exited`), w(`exited`));
          return;
        }
        ((ee.current = e.reduceMotion),
          e.onExit?.(),
          (T.current = `exiting`),
          w(`exiting`));
      }, [j]),
      ie = g.useCallback(
        (e, t) => {
          if ((te(), t === `entering`)) {
            let t = j.current;
            if (t.mountOnEnter || t.unmountOnExit) {
              let e = t.nodeRef.current;
              e && qc(e);
            }
            ne(e);
          } else re();
        },
        [te, ne, re, j],
      );
    return (
      Ln(
        () => (
          (D.current = !0),
          E.current && ((E.current = !1), ie(!0, `entering`)),
          () => {
            ((D.current = !1), te());
          }
        ),
        [te, ie],
      ),
      Ln(() => {
        if (!D.current) return;
        let e = T.current;
        t
          ? e !== `entering` && e !== `entered` && ie(!1, `entering`)
          : e === `entering` || e === `entered`
            ? ie(!1, `exiting`)
            : e === `exited` &&
              o &&
              ((T.current = `unmounted`), w(`unmounted`));
      }, [t, C, o, ie]),
      Ln(() => {
        if (C === `unmounted` || k.current === `unmounted`) {
          k.current = C;
          return;
        }
        if (k.current === C) return;
        k.current = C;
        let e = j.current;
        C === `entering`
          ? (e.onEntering?.(A.current), N(`entered`, `entering`))
          : C === `exiting`
            ? (e.onExiting?.(), N(`exited`, `exiting`))
            : C === `entered`
              ? e.onEntered?.(A.current)
              : C === `exited` && e.onExited?.();
      }, [j, N, C]),
      C === `unmounted`
        ? null
        : (0, L.jsx)(Wc.Provider, { value: null, children: y(C, b) })
    );
  }
  var dl = `(prefers-reduced-motion: reduce)`,
    fl = 0,
    pl = `0ms`,
    ml = () => {},
    hl = () => !1,
    gl = () => !0,
    _l = () => ml;
  function vl(e) {
    let [t, n] = g.useState(() => ({ enabled: e, matches: e ? null : !1 })),
      r = t.matches;
    return (
      t.enabled !== e && ((r = null), e || (r = !1)),
      Ln(() => {
        let r = (t) => {
          n((n) =>
            n.enabled === e && n.matches === t ? n : { enabled: e, matches: t },
          );
        };
        if (!e) {
          t.enabled && r(!1);
          return;
        }
        if (typeof window > `u` || typeof window.matchMedia != `function`) {
          r(!1);
          return;
        }
        let i = window.matchMedia(dl),
          a = () => {
            r(i.matches);
          };
        return (
          a(),
          i.addEventListener(`change`, a),
          () => {
            i.removeEventListener(`change`, a);
          }
        );
      }, [e, t.enabled]),
      r
    );
  }
  var yl = { ...g }.useSyncExternalStore;
  function bl(e) {
    let t = e ? gl : hl,
      [n, r] = g.useMemo(() => {
        if (!e || typeof window > `u` || typeof window.matchMedia != `function`)
          return [hl, _l];
        let t = window.matchMedia(dl);
        return [
          () => t.matches,
          (e) => (
            t.addEventListener(`change`, e),
            () => {
              t.removeEventListener(`change`, e);
            }
          ),
        ];
      }, [e]);
    return yl(r, n, t);
  }
  var xl = yl === void 0 ? vl : bl;
  function Sl(e, t) {
    let n = xl(!t && e === `system`),
      r = !t && (e === `always` || (e === `system` && n !== !1));
    return g.useMemo(
      () => ({
        shouldReduceMotion: r,
        getTransitionTiming(e) {
          return r ? { duration: fl, delay: pl } : e;
        },
      }),
      [r],
    );
  }
  var Cl = Sn,
    wl = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    },
    Tl = { opacity: 0, visibility: `hidden` },
    El = g.forwardRef(function (e, t) {
      let n = Dc(),
        r = {
          enter: n.transitions.duration.enteringScreen,
          exit: n.transitions.duration.leavingScreen,
        },
        {
          addEndListener: i,
          appear: a = !0,
          children: o,
          disablePrefersReducedMotion: s = !1,
          easing: c,
          in: l,
          onEnter: u,
          onEntered: d,
          onEntering: f,
          onExit: p,
          onExited: m,
          onExiting: h,
          style: _,
          timeout: v = r,
          ...y
        } = e,
        b = Sl(n.motion.reducedMotion, s),
        x = g.useRef(null),
        S = Cl(x, Cn(o), t),
        C = rl(x, f),
        w = rl(x, (e, t) => {
          b.shouldReduceMotion || qc(e);
          let r = al({ style: _, timeout: v, easing: c }, { mode: `enter` }),
            i = b.getTransitionTiming({ duration: r.duration, delay: r.delay });
          ((e.style.transition = n.transitions.create(`opacity`, {
            duration: i.duration,
            easing: r.easing,
            delay: i.delay,
          })),
            u && u(e, t));
        }),
        T = rl(x, d),
        E = rl(x, h);
      return (0, L.jsx)(ul, {
        appear: a,
        in: l,
        nodeRef: x,
        onEnter: w,
        onEntered: T,
        onEntering: C,
        onExit: rl(x, (e) => {
          let t = al({ style: _, timeout: v, easing: c }, { mode: `exit` }),
            r = b.getTransitionTiming({ duration: t.duration, delay: t.delay });
          ((e.style.transition = n.transitions.create(`opacity`, {
            duration: r.duration,
            easing: t.easing,
            delay: r.delay,
          })),
            p && p(e));
        }),
        onExited: rl(x, (e) => {
          ((e.style.transition = ``), m && m(e));
        }),
        onExiting: E,
        addEndListener: i
          ? (e) => {
              i(x.current, e);
            }
          : void 0,
        reduceMotion: b.shouldReduceMotion,
        timeout: v,
        ...y,
        children: (e, { ownerState: t, ...n }) => {
          let r = il(e, l, wl, Tl, _, o.props.style);
          return g.cloneElement(o, { style: r, ref: S, ...n });
        },
      });
    });
  function Dl(e) {
    return Eo(`MuiBackdrop`, e);
  }
  Do(`MuiBackdrop`, [`root`, `invisible`]);
  var Ol = (e) => {
      let { classes: t, invisible: n } = e;
      return on({ root: [`root`, n && `invisible`] }, Dl, t);
    },
    kl = Ac(`div`, {
      name: `MuiBackdrop`,
      slot: `Root`,
      overridesResolver: (e, t) => {
        let { ownerState: n } = e;
        return [t.root, n.invisible && t.invisible];
      },
    })({
      position: `fixed`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      backgroundColor: `rgba(0, 0, 0, 0.5)`,
      WebkitTapHighlightColor: `transparent`,
      variants: [
        { props: { invisible: !0 }, style: { backgroundColor: `transparent` } },
      ],
    }),
    Al = g.forwardRef(function (e, t) {
      let n = Mc({ props: e, name: `MuiBackdrop` }),
        {
          children: r,
          className: i,
          component: a = `div`,
          invisible: o = !1,
          open: s,
          slotProps: c = {},
          slots: l = {},
          transitionDuration: u,
          ...d
        } = n,
        f = { ...n, component: a, invisible: o },
        p = Ol(f),
        m = { component: a, slots: l, slotProps: c },
        [h, g] = Bc(`root`, {
          elementType: kl,
          externalForwardedProps: m,
          className: an(p.root, i),
          ownerState: f,
        }),
        [_, v] = Bc(`transition`, {
          elementType: El,
          externalForwardedProps: m,
          ownerState: f,
        });
      return (0, L.jsx)(_, {
        in: s,
        timeout: u,
        ...d,
        ...v,
        children: (0, L.jsx)(h, { ...g, ref: t, children: r }),
      });
    });
  function jl(e) {
    let t = g.useRef(e);
    return (
      Ln(() => {
        t.current = e;
      }),
      g.useRef((...e) => (0, t.current)(...e)).current
    );
  }
  function Ml(...e) {
    return e.reduce(
      (e, t) =>
        t == null
          ? e
          : function (...n) {
              (e.apply(this, n), t.apply(this, n));
            },
      () => {},
    );
  }
  function Nl(e) {
    return typeof e == `function` ? e() : e;
  }
  function Pl(e) {
    return e ? e.props.hasOwnProperty(`in`) : !1;
  }
  var Fl = () => {},
    Il = new xn();
  function Ll(e) {
    let {
        container: t,
        disableScrollLock: n = !1,
        closeAfterTransition: r = !1,
        onTransitionEnter: i,
        onTransitionExited: a,
        children: o,
        onClose: s,
        open: c,
        rootRef: l,
      } = e,
      u = g.useRef({}),
      d = g.useRef(null),
      f = g.useRef(null),
      p = Sn(f, l),
      [m, h] = g.useState(!c),
      _ = Pl(o),
      v = !0;
    (e[`aria-hidden`] === `false` || e[`aria-hidden`] === !1) && (v = !1);
    let y = () => un(d.current),
      b = () => (
        (u.current.modalRef = f.current),
        (u.current.mount = d.current),
        u.current
      ),
      x = () => {
        (Il.mount(b(), { disableScrollLock: n }),
          f.current && (f.current.scrollTop = 0));
      },
      S = jl(() => {
        let e = Nl(t) || y().body;
        (Il.add(b(), e), f.current && x());
      }),
      C = () => Il.isTopModal(b()),
      w = jl((e) => {
        ((d.current = e),
          e && (c && C() ? x() : f.current && mn(f.current, v)));
      }),
      T = g.useCallback(() => {
        Il.remove(b(), v);
      }, [v]);
    (g.useEffect(
      () => () => {
        T();
      },
      [T],
    ),
      g.useEffect(() => {
        c ? S() : (!_ || !r) && T();
      }, [c, T, _, r, S]));
    let E = (e) => (t) => {
        (e.onKeyDown?.(t),
          !(t.key !== `Escape` || t.which === 229 || !C()) &&
            (t.stopPropagation(), s && s(t, `escapeKeyDown`)));
      },
      D = (e) => (t) => {
        (e.onClick?.(t),
          t.target === t.currentTarget && s && s(t, `backdropClick`));
      };
    return {
      getRootProps: (t = {}) => {
        let n = Lc(e);
        (delete n.onTransitionEnter, delete n.onTransitionExited);
        let r = { ...n, ...t };
        return { role: `presentation`, ...r, onKeyDown: E(r), ref: p };
      },
      getBackdropProps: (e = {}) => {
        let t = e;
        return { "aria-hidden": !0, ...t, onClick: D(t), open: c };
      },
      getTransitionProps: () => ({
        onEnter: Ml(() => {
          (h(!1), i && i());
        }, o?.props.onEnter ?? Fl),
        onExited: Ml(() => {
          (h(!0), a && a(), r && T());
        }, o?.props.onExited ?? Fl),
      }),
      rootRef: p,
      portalRef: w,
      isTopModal: C,
      exited: m,
      hasTransition: _,
    };
  }
  function Rl(e) {
    return Eo(`MuiModal`, e);
  }
  Do(`MuiModal`, [`root`, `hidden`, `backdrop`]);
  var zl = (e) => {
      let { open: t, exited: n, classes: r } = e;
      return on(
        { root: [`root`, !t && n && `hidden`], backdrop: [`backdrop`] },
        Rl,
        r,
      );
    },
    Bl = Ac(`div`, {
      name: `MuiModal`,
      slot: `Root`,
      overridesResolver: (e, t) => {
        let { ownerState: n } = e;
        return [t.root, !n.open && n.exited && t.hidden];
      },
    })(
      jc(({ theme: e }) => ({
        position: `fixed`,
        zIndex: (e.vars || e).zIndex.modal,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        variants: [
          {
            props: ({ ownerState: e }) => !e.open && e.exited,
            style: { visibility: `hidden` },
          },
        ],
      })),
    ),
    Vl = Ac(Al, { name: `MuiModal`, slot: `Backdrop` })({ zIndex: -1 }),
    Hl = g.forwardRef(function (e, t) {
      let n = Mc({ name: `MuiModal`, props: e }),
        {
          classes: r,
          className: i,
          closeAfterTransition: a = !1,
          children: o,
          container: s,
          component: c,
          disableAutoFocus: l = !1,
          disableEnforceFocus: u = !1,
          disablePortal: d = !1,
          disableRestoreFocus: f = !1,
          disableScrollLock: p = !1,
          hideBackdrop: m = !1,
          keepMounted: h = !1,
          onClose: _,
          onTransitionEnter: v,
          onTransitionExited: y,
          open: b,
          slotProps: x = {},
          slots: S = {},
          theme: C,
          ...w
        } = n,
        T = {
          ...n,
          closeAfterTransition: a,
          disableAutoFocus: l,
          disableEnforceFocus: u,
          disablePortal: d,
          disableRestoreFocus: f,
          disableScrollLock: p,
          hideBackdrop: m,
          keepMounted: h,
        },
        {
          getRootProps: E,
          getBackdropProps: D,
          getTransitionProps: O,
          portalRef: k,
          isTopModal: A,
          exited: ee,
          hasTransition: j,
        } = Ll({ ...T, rootRef: t }),
        te = { ...T, exited: ee },
        M = zl(te),
        N = {};
      if ((o.props.tabIndex === void 0 && (N.tabIndex = `-1`), j)) {
        let { onEnter: e, onExited: t } = O();
        ((N.onEnter = e), (N.onExited = t));
      }
      let ne = { slots: S, slotProps: x },
        [re, ie] = Bc(`root`, {
          ref: t,
          elementType: Bl,
          externalForwardedProps: { ...ne, ...w, component: c },
          getSlotProps: E,
          ownerState: te,
          className: an(i, M?.root, !te.open && te.exited && M?.hidden),
        }),
        [P, ae] = Bc(`backdrop`, {
          elementType: Vl,
          externalForwardedProps: ne,
          shouldForwardComponentProp: !0,
          getSlotProps: (e) =>
            D({
              ...e,
              onClick: (t) => {
                e?.onClick && e.onClick(t);
              },
            }),
          className: M?.backdrop,
          ownerState: te,
        });
      return !h && !b && (!j || ee)
        ? null
        : (0, L.jsx)(Vn, {
            ref: k,
            container: s,
            disablePortal: d,
            children: (0, L.jsxs)(re, {
              ...ie,
              children: [
                m ? null : (0, L.jsx)(P, { ...ae }),
                (0, L.jsx)(In, {
                  disableEnforceFocus: u,
                  disableAutoFocus: l,
                  disableRestoreFocus: f,
                  isEnabled: A,
                  open: b,
                  children: g.cloneElement(o, N),
                }),
              ],
            }),
          });
    });
  function Ul(e, t = 166) {
    let n;
    function r(...r) {
      (clearTimeout(n),
        (n = setTimeout(() => {
          e.apply(this, r);
        }, t)));
    }
    return (
      (r.clear = () => {
        clearTimeout(n);
      }),
      r
    );
  }
  var Wl = Ul,
    Gl = Qn,
    Kl = dn;
  function ql(e, t) {
    if (!e) return t;
    function n(e, t) {
      let n = {};
      return (
        Object.keys(t).forEach((r) => {
          Ic(r, t[r]) &&
            typeof e[r] == `function` &&
            (n[r] = (...n) => {
              (e[r](...n), t[r](...n));
            });
        }),
        n
      );
    }
    if (typeof e == `function` || typeof t == `function`)
      return (r) => {
        let i = typeof t == `function` ? t(r) : t,
          a = typeof e == `function` ? e({ ...r, ...i }) : e,
          o = an(r?.className, i?.className, a?.className),
          s = n(a, i);
        return {
          ...i,
          ...a,
          ...s,
          ...(!!o && { className: o }),
          ...(i?.style && a?.style && { style: { ...i.style, ...a.style } }),
          ...(i?.sx &&
            a?.sx && {
              sx: [
                ...(Array.isArray(i.sx) ? i.sx : [i.sx]),
                ...(Array.isArray(a.sx) ? a.sx : [a.sx]),
              ],
            }),
        };
      };
    let r = t,
      i = n(e, r),
      a = an(r?.className, e?.className);
    return {
      ...t,
      ...e,
      ...i,
      ...(!!a && { className: a }),
      ...(r?.style && e?.style && { style: { ...r.style, ...e.style } }),
      ...(r?.sx &&
        e?.sx && {
          sx: [
            ...(Array.isArray(r.sx) ? r.sx : [r.sx]),
            ...(Array.isArray(e.sx) ? e.sx : [e.sx]),
          ],
        }),
    };
  }
  var Jl = { visibility: `hidden` },
    Yl = {};
  function Xl(e) {
    return typeof e == `string` && /^translate\(.+,\s*.+\)$/.test(e);
  }
  function Zl(e, t, n, r = Yl) {
    let { resetInlineTransform: i = !0 } = r,
      a = n && n.getBoundingClientRect(),
      o = Kl(t),
      s,
      c;
    if (i) {
      let e = t.style.transform,
        n = t.style.transition;
      ((t.style.transition = ``),
        (t.style.transform = ``),
        (s = t.getBoundingClientRect()),
        (c = o.getComputedStyle(t).getPropertyValue(`transform`)),
        (t.style.transform = e),
        (t.style.transition = n));
    } else
      ((s = t.getBoundingClientRect()),
        (c = o.getComputedStyle(t).getPropertyValue(`transform`)));
    let { offsetX: l, offsetY: u } = nl(c);
    return e === `left`
      ? a
        ? `translateX(${a.right + l - s.left}px)`
        : `translateX(${o.innerWidth + l - s.left}px)`
      : e === `right`
        ? a
          ? `translateX(-${s.right - a.left - l}px)`
          : `translateX(-${s.left + s.width - l}px)`
        : e === `up`
          ? a
            ? `translateY(${a.bottom + u - s.top}px)`
            : `translateY(${o.innerHeight + u - s.top}px)`
          : a
            ? `translateY(-${s.top - a.top + s.height - u}px)`
            : `translateY(-${s.top + s.height - u}px)`;
  }
  function Ql(e) {
    return typeof e == `function` ? e() : e;
  }
  function $l(e, t, n, r) {
    let i = Zl(e, t, Ql(n), r);
    i && (t.style.transform = i);
  }
  var eu = g.forwardRef(function (e, t) {
    let n = Dc(),
      r = {
        enter: n.transitions.easing.easeOut,
        exit: n.transitions.easing.sharp,
      },
      i = {
        enter: n.transitions.duration.enteringScreen,
        exit: n.transitions.duration.leavingScreen,
      },
      {
        addEndListener: a,
        appear: o = !0,
        children: s,
        container: c,
        disablePrefersReducedMotion: l = !1,
        direction: u = `down`,
        easing: d = r,
        in: f,
        onEnter: p,
        onEntered: m,
        onEntering: h,
        onExit: _,
        onExited: v,
        onExiting: y,
        style: b,
        timeout: x = i,
        ...S
      } = e,
      C = Sl(n.motion.reducedMotion, l),
      w = g.useRef(null),
      T = g.useRef(!1),
      E = Cl(Cn(s), w, t),
      D = rl(w, (e, t) => {
        ($l(u, e, c), C.shouldReduceMotion || qc(e), p && p(e, t));
      }),
      O = rl(w, (e, t) => {
        let r = al({ timeout: x, style: b, easing: d }, { mode: `enter` }),
          i = C.getTransitionTiming({ duration: r.duration, delay: r.delay });
        ((e.style.transition = n.transitions.create(`transform`, {
          duration: i.duration,
          easing: r.easing,
          delay: i.delay,
        })),
          (e.style.transform = `none`),
          h && h(e, t));
      }),
      k = rl(w, m),
      A = rl(w, y),
      ee = rl(w, (e) => {
        let t = al({ timeout: x, style: b, easing: d }, { mode: `exit` }),
          r = C.getTransitionTiming({ duration: t.duration, delay: t.delay });
        e.style.transition = n.transitions.create(`transform`, {
          duration: r.duration,
          easing: t.easing,
          delay: r.delay,
        });
        let i = Xl(e.style.transform);
        ((T.current = i), $l(u, e, c, { resetInlineTransform: !i }), _ && _(e));
      }),
      j = rl(w, (e) => {
        ((T.current = !1), (e.style.transition = ``), v && v(e));
      }),
      te = a
        ? (e) => {
            a(w.current, e);
          }
        : void 0,
      M = g.useCallback(() => {
        w.current && $l(u, w.current, c);
      }, [u, c]);
    return (
      g.useEffect(() => {
        if (f || u === `down` || u === `right`) return;
        let e = Wl(() => {
            w.current && $l(u, w.current, c);
          }),
          t = Kl(w.current);
        return (
          t.addEventListener(`resize`, e),
          () => {
            (e.clear(), t.removeEventListener(`resize`, e));
          }
        );
      }, [u, f, c]),
      g.useEffect(() => {
        !f && !T.current && M();
      }, [f, M]),
      (0, L.jsx)(ul, {
        nodeRef: w,
        onEnter: D,
        onEntered: k,
        onEntering: O,
        onExit: ee,
        onExited: j,
        onExiting: A,
        addEndListener: te,
        appear: o,
        in: f,
        reduceMotion: C.shouldReduceMotion,
        timeout: x,
        ...S,
        children: (e, { ownerState: t, ...n }) => {
          let r;
          return (
            (r =
              e === `exited` && !f
                ? b || s.props.style
                  ? { visibility: `hidden`, ...b, ...s.props.style }
                  : Jl
                : b && s.props.style
                  ? { ...b, ...s.props.style }
                  : b || s.props.style),
            g.cloneElement(s, { ref: E, style: r, ...n })
          );
        },
      })
    );
  });
  function tu(e) {
    return Eo(`MuiPaper`, e);
  }
  Do(
    `MuiPaper`,
    `root.rounded.outlined.elevation.elevation0.elevation1.elevation2.elevation3.elevation4.elevation5.elevation6.elevation7.elevation8.elevation9.elevation10.elevation11.elevation12.elevation13.elevation14.elevation15.elevation16.elevation17.elevation18.elevation19.elevation20.elevation21.elevation22.elevation23.elevation24`.split(
      `.`,
    ),
  );
  var nu = (e) => {
      let { square: t, elevation: n, variant: r, classes: i } = e;
      return on(
        {
          root: [
            `root`,
            r,
            !t && `rounded`,
            r === `elevation` && `elevation${n}`,
          ],
        },
        tu,
        i,
      );
    },
    ru = Ac(`div`, {
      name: `MuiPaper`,
      slot: `Root`,
      overridesResolver: (e, t) => {
        let { ownerState: n } = e;
        return [
          t.root,
          t[n.variant],
          !n.square && t.rounded,
          n.variant === `elevation` && t[`elevation${n.elevation}`],
        ];
      },
    })(
      jc(({ theme: e }) => ({
        backgroundColor: (e.vars || e).palette.background.paper,
        color: (e.vars || e).palette.text.primary,
        ...sl(e, `box-shadow`),
        variants: [
          {
            props: ({ ownerState: e }) => !e.square,
            style: { borderRadius: e.shape.borderRadius },
          },
          {
            props: { variant: `outlined` },
            style: { border: `1px solid ${(e.vars || e).palette.divider}` },
          },
          {
            props: { variant: `elevation` },
            style: {
              boxShadow: `var(--Paper-shadow)`,
              backgroundImage: `var(--Paper-overlay)`,
            },
          },
        ],
      })),
    ),
    iu = g.forwardRef(function (e, t) {
      let n = Mc({ props: e, name: `MuiPaper` }),
        r = Dc(),
        {
          className: i,
          component: a = `div`,
          elevation: o = 1,
          square: s = !1,
          variant: c = `elevation`,
          ...l
        } = n,
        u = { ...n, component: a, elevation: o, square: s, variant: c };
      return (0, L.jsx)(ru, {
        as: a,
        ownerState: u,
        className: an(nu(u).root, i),
        ref: t,
        ...l,
        style: {
          ...(c === `elevation` && {
            "--Paper-shadow": (r.vars || r).shadows[o],
            ...(r.vars && { "--Paper-overlay": r.vars.overlays?.[o] }),
            ...(!r.vars &&
              r.palette.mode === `dark` && {
                "--Paper-overlay": `linear-gradient(${Xo(`#fff`, cc(o))}, ${Xo(`#fff`, cc(o))})`,
              }),
          }),
          ...l.style,
        },
      });
    });
  function au(e) {
    return Eo(`MuiDrawer`, e);
  }
  Do(`MuiDrawer`, [
    `root`,
    `docked`,
    `paper`,
    `anchorLeft`,
    `anchorRight`,
    `anchorTop`,
    `anchorBottom`,
    `modal`,
  ]);
  var ou = (e, t) => {
      let { ownerState: n } = e;
      return [
        t.root,
        (n.variant === `permanent` || n.variant === `persistent`) && t.docked,
        n.variant === `temporary` && t.modal,
      ];
    },
    su = (e) => {
      let { classes: t, anchor: n, variant: r } = e;
      return on(
        {
          root: [`root`, `anchor${Gl(n)}`],
          docked: [(r === `permanent` || r === `persistent`) && `docked`],
          modal: [`modal`],
          paper: [`paper`],
        },
        au,
        t,
      );
    },
    cu = Ac(Hl, { name: `MuiDrawer`, slot: `Root`, overridesResolver: ou })(
      jc(({ theme: e }) => ({ zIndex: (e.vars || e).zIndex.drawer })),
    ),
    lu = Ac(`div`, {
      shouldForwardProp: kc,
      name: `MuiDrawer`,
      slot: `Docked`,
      skipVariantsResolver: !1,
      overridesResolver: ou,
    })({ flex: `0 0 auto` }),
    uu = Ac(iu, { name: `MuiDrawer`, slot: `Paper` })(
      jc(({ theme: e }) => ({
        overflowY: `auto`,
        display: `flex`,
        flexDirection: `column`,
        height: `100%`,
        flex: `1 0 auto`,
        zIndex: (e.vars || e).zIndex.drawer,
        WebkitOverflowScrolling: `touch`,
        position: `fixed`,
        top: 0,
        outline: 0,
        variants: [
          { props: { anchor: `left` }, style: { left: 0 } },
          {
            props: { anchor: `top` },
            style: {
              top: 0,
              left: 0,
              right: 0,
              height: `auto`,
              maxHeight: `100%`,
            },
          },
          { props: { anchor: `right` }, style: { right: 0 } },
          {
            props: { anchor: `bottom` },
            style: {
              top: `auto`,
              left: 0,
              bottom: 0,
              right: 0,
              height: `auto`,
              maxHeight: `100%`,
            },
          },
          {
            props: ({ ownerState: e }) =>
              e.anchor === `left` && e.variant !== `temporary`,
            style: {
              borderRight: `1px solid ${(e.vars || e).palette.divider}`,
            },
          },
          {
            props: ({ ownerState: e }) =>
              e.anchor === `top` && e.variant !== `temporary`,
            style: {
              borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
            },
          },
          {
            props: ({ ownerState: e }) =>
              e.anchor === `right` && e.variant !== `temporary`,
            style: { borderLeft: `1px solid ${(e.vars || e).palette.divider}` },
          },
          {
            props: ({ ownerState: e }) =>
              e.anchor === `bottom` && e.variant !== `temporary`,
            style: { borderTop: `1px solid ${(e.vars || e).palette.divider}` },
          },
        ],
      })),
    ),
    du = { left: `right`, right: `left`, top: `down`, bottom: `up` };
  function fu(e) {
    return [`left`, `right`].includes(e);
  }
  function pu({ direction: e }, t) {
    return e === `rtl` && fu(t) ? du[t] : t;
  }
  var mu = g.forwardRef(function (e, t) {
    let n = Mc({ props: e, name: `MuiDrawer` }),
      r = Dc(),
      i = ln(),
      a = {
        enter: r.transitions.duration.enteringScreen,
        exit: r.transitions.duration.leavingScreen,
      },
      {
        anchor: o = `left`,
        children: s,
        className: c,
        elevation: l = 16,
        hideBackdrop: u = !1,
        ModalProps: d = {},
        onClose: f,
        open: p = !1,
        transitionDuration: m = a,
        variant: h = `temporary`,
        slots: _ = {},
        slotProps: v = {},
        ...y
      } = n,
      b = g.useRef(!1),
      x = g.useRef(null),
      S = Cl(t, x);
    g.useEffect(() => {
      b.current = !0;
    }, []);
    let C = g.useCallback(() => x.current, []),
      w = pu({ direction: i ? `rtl` : `ltr` }, o),
      T = o,
      E = { ...n, anchor: T, elevation: l, open: p, variant: h, ...y },
      D = su(E),
      O = {
        slots: _,
        slotProps: {
          ...v,
          backdrop: ql(v.backdrop, { transitionDuration: m }),
        },
      },
      [k, A] = Bc(`root`, {
        ref: S,
        elementType: cu,
        className: an(D.root, D.modal, c),
        shouldForwardComponentProp: !0,
        ownerState: E,
        externalForwardedProps: { ...O, ...y, ...d },
        additionalProps: {
          closeAfterTransition: !0,
          open: p,
          onClose: f,
          hideBackdrop: u,
          slots: { backdrop: O.slots.backdrop },
          slotProps: { backdrop: O.slotProps.backdrop },
        },
      }),
      [ee, j] = Bc(`paper`, {
        elementType: uu,
        shouldForwardComponentProp: !0,
        className: D.paper,
        ownerState: E,
        externalForwardedProps: O,
        additionalProps: {
          elevation: h === `temporary` ? l : 0,
          square: !0,
          ...(h === `temporary` && {
            role: `dialog`,
            "aria-modal": `true`,
            "data-mui-focusable": ``,
            tabIndex: -1,
          }),
        },
      }),
      [te, M] = Bc(`docked`, {
        elementType: lu,
        ref: S,
        className: an(D.root, D.docked, c),
        ownerState: E,
        externalForwardedProps: O,
        additionalProps: y,
      }),
      [N, ne] = Bc(`transition`, {
        elementType: eu,
        ownerState: E,
        externalForwardedProps: O,
        additionalProps: {
          in: p,
          direction: du[w],
          timeout: m,
          appear: b.current,
          ...(h === `temporary` &&
            (_.transition == null || _.transition === eu) && { container: C }),
        },
      }),
      re = (0, L.jsx)(ee, { ...j, children: s });
    if (h === `permanent`) return (0, L.jsx)(te, { ...M, children: re });
    let ie = (0, L.jsx)(N, { ...ne, children: re });
    return h === `persistent`
      ? (0, L.jsx)(te, { ...M, children: ie })
      : (0, L.jsx)(k, { ...A, children: ie });
  });
  function hu({
    variant: e = `card`,
    showCommentForm: t,
    setShowCommentForm: n,
    commentText: r,
    setCommentText: i,
    isSubmitting: a,
    handleCommentSubmit: o,
    submitStatus: s,
    isReacting: c,
    canReact: l,
    isReactionActive: u,
    localCounts: d,
    handleReactionClick: f,
    reactionStatus: p,
    commentsLoading: m,
    comments: h,
  }) {
    return (0, L.jsxs)(e === `drawer` ? Ot : lt, {
      children: [
        (0, L.jsxs)(mt, {
          children: [
            t
              ? (0, L.jsxs)(vt, {
                  onSubmit: o,
                  children: [
                    (0, L.jsx)(yt, {
                      value: r,
                      onClick: (e) => {
                        e.stopPropagation();
                      },
                      onChange: (e) => i(e.target.value),
                      placeholder: `Add a verified comment...`,
                      name: `commentText`,
                      required: !0,
                    }),
                    (0, L.jsxs)(bt, {
                      children: [
                        (0, L.jsx)(gt, {
                          color: `gray`,
                          type: `button`,
                          disabled: a,
                          onClick: (e) => {
                            (e.stopPropagation(), i(``), n(!1));
                          },
                          children: `Cancel`,
                        }),
                        (0, L.jsx)(gt, {
                          color: `black`,
                          type: `submit`,
                          disabled: a,
                          onClick: (e) => e.stopPropagation(),
                          children: a ? `Posting...` : `Post Comment`,
                        }),
                      ],
                    }),
                  ],
                })
              : (0, L.jsxs)(ht, {
                  children: [
                    (0, L.jsx)(gt, {
                      color: `blue`,
                      type: `button`,
                      onClick: (e) => {
                        (e.stopPropagation(), n(!0));
                      },
                      children: `Add note`,
                    }),
                    (0, L.jsxs)(gt, {
                      color: u(`heart`) ? `red` : `gray`,
                      type: `button`,
                      disabled: c || !l,
                      "aria-pressed": u(`heart`),
                      onClick: (e) => {
                        (e.stopPropagation(), f(`heart`));
                      },
                      children: [
                        (0, L.jsx)(_t, {
                          children: u(`heart`)
                            ? (0, L.jsx)(Qt, {})
                            : (0, L.jsx)(nn, {}),
                        }),
                        ` `,
                        d.heart,
                      ],
                    }),
                    (0, L.jsxs)(gt, {
                      color: u(`thumbs_up`) ? `blue` : `gray`,
                      type: `button`,
                      disabled: c || !l,
                      "aria-pressed": u(`thumbs_up`),
                      onClick: (e) => {
                        (e.stopPropagation(), f(`thumbs_up`));
                      },
                      children: [
                        (0, L.jsx)(_t, {
                          children: u(`thumbs_up`)
                            ? (0, L.jsx)(qt, {})
                            : (0, L.jsx)(en, {}),
                        }),
                        ` `,
                        d.thumbs_up,
                      ],
                    }),
                    (0, L.jsxs)(gt, {
                      color: u(`thumbs_down`) ? `black` : `gray`,
                      type: `button`,
                      disabled: c || !l,
                      "aria-pressed": u(`thumbs_down`),
                      onClick: (e) => {
                        (e.stopPropagation(), f(`thumbs_down`));
                      },
                      children: [
                        (0, L.jsx)(_t, {
                          children: u(`thumbs_down`)
                            ? (0, L.jsx)(Jt, {})
                            : (0, L.jsx)(tn, {}),
                        }),
                        ` `,
                        d.thumbs_down,
                      ],
                    }),
                  ],
                }),
            s && (0, L.jsx)(xt, { children: s }),
            p && (0, L.jsx)(xt, { children: p }),
          ],
        }),
        (0, L.jsx)(ut, {
          children: m
            ? (0, L.jsx)(xt, { children: `Comments loading...` })
            : h.length === 0
              ? null
              : h.map((e, t) =>
                  (0, L.jsxs)(
                    dt,
                    {
                      children: [
                        (0, L.jsxs)(ft, {
                          children: [
                            e.author?.name?.split(` `)[0] || `User`,
                            `:`,
                          ],
                        }),
                        (0, L.jsx)(pt, { children: e.text }),
                      ],
                    },
                    t,
                  ),
                ),
        }),
      ],
    });
  }
  function gu({ src: e, alt: t, placeholderDataUri: n }) {
    let [r, i] = (0, g.useState)(!1);
    return (0, L.jsxs)(jt, {
      children: [
        !r && (0, L.jsx)(Mt, {}),
        (0, L.jsx)(Nt, {
          src: e,
          alt: t,
          loading: `lazy`,
          css: { opacity: +!!r },
          onLoad: () => i(!0),
          onError: (e) => {
            ((e.currentTarget.src = n), i(!0));
          },
        }),
      ],
    });
  }
  function _u({
    record: e,
    userToken: t,
    userEmail: n = null,
    shouldLoadComments: r = !1,
    onCommentsLoaded: i = () => {},
  }) {
    let [a, o] = (0, g.useState)(0),
      [s, c] = (0, g.useState)([]),
      [l, u] = (0, g.useState)(!1),
      [d, f] = (0, g.useState)(!1),
      [p, m] = (0, g.useState)(``),
      [h, _] = (0, g.useState)(!1),
      [v, y] = (0, g.useState)(``),
      [b, x] = (0, g.useState)(!1),
      [S, C] = (0, g.useState)(``),
      [w, T] = (0, g.useState)(() => ae(e.fields, n)),
      [E, D] = (0, g.useState)(() => P(e.fields)),
      O = e.fields,
      k = !!(t || Ze()),
      A = [];
    try {
      A = JSON.parse(O[`Images JSON`] || `[]`);
    } catch {
      A = [];
    }
    let ee = `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'600'%20height%3D'400'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%2523e9ecef'%2F%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%25236c757d'%20font-family%3D'Arial%2C%20sans-serif'%20font-size%3D'24'%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E`;
    A.length === 0 && (A = [ee]);
    let [j, te] = (0, g.useState)(!1);
    function M(e) {
      return new Promise((t) => setTimeout(t, e));
    }
    (0, g.useEffect)(() => {
      (T(ae(e.fields, n)), D(P(e.fields)));
    }, [e.fields, n]);
    let N = (e) => w.has(e);
    (0, g.useEffect)(() => {
      let n = !1,
        a = !1;
      async function o() {
        u(!0);
        let r = t || Ze(),
          o = 0,
          s = null;
        for (; o < 3 && !n; )
          try {
            let t = await ze(e.id, r);
            n || (c(t.comments || []), (a = !0));
            break;
          } catch (e) {
            if (((s = e), e && e.isAuthError)) {
              (n || c([]), Qe());
              return;
            }
            let t =
              !!(e && e.isRateLimit) ||
              /rate limited|too many requests/i.test(e?.message || ``);
            if (((o += 1), n || !t || o >= 3)) {
              (console.debug(`Failed to load comments:`, e), n || c([]));
              break;
            }
            await M(250 * 2 ** (o - 1));
          }
        if (!n && (u(!1), a && !j)) {
          te(!0);
          try {
            i(e.id);
          } catch (e) {
            console.debug(`onCommentsLoaded callback failed`, e);
          }
        }
        !a &&
          s &&
          !n &&
          console.debug(`Comment loading failed after retries:`, s);
      }
      return (
        r && !j && o(),
        () => {
          n = !0;
        }
      );
    }, [e.id, t, r, j, i]);
    async function ne(n) {
      n.preventDefault();
      let r = S.trim();
      if (!r) return;
      (_(!0), m(`Posting comment...`));
      let i = t || Ze();
      try {
        for (let t = 0; t < 5; t++)
          try {
            (await Be(e.id, r, i), C(``), f(!1));
            try {
              (await new Promise((e) => setTimeout(e, 1e3)),
                c((await ze(e.id, i)).comments || []));
            } catch {}
            (m(`Success!`), setTimeout(() => m(``), 3e3));
            return;
          } catch (e) {
            if (e && e.isRateLimit && t < 4) {
              await new Promise((e) => setTimeout(e, 1e3));
              continue;
            }
            throw e;
          }
      } catch (e) {
        e && e.isRateLimit
          ? m(`Too many requests — please try again in a moment.`)
          : e && e.isAuthError
            ? (Qe(), m(`Session expired. Please log in again.`))
            : m(`Error: ${e.message || `Unable to submit comment.`}`);
      } finally {
        _(!1);
      }
    }
    async function re(n) {
      if (b) return;
      let r = t || Ze();
      if (!r) {
        y(`Please sign in before reacting.`);
        return;
      }
      (x(!0), y(`Recording ${n.replace(/_/g, ` `)}...`));
      try {
        for (let t = 0; t < 5; t++)
          try {
            let t = await He(e.id, n, r);
            (T((e) => {
              let r = new Set(e);
              return (t?.active === !1 ? r.delete(n) : r.add(n), r);
            }),
              D((e) => ({
                ...e,
                [n]: t?.active === !1 ? Math.max(0, e[n] - 1) : e[n] + 1,
              })),
              y(`Verified reaction recorded.`),
              setTimeout(() => y(``), 3e3));
            return;
          } catch (e) {
            if (e && e.isRateLimit && t < 4) {
              await new Promise((e) => setTimeout(e, 1e3));
              continue;
            }
            throw e;
          }
      } catch (e) {
        let t = e?.message || `Unable to record reaction.`;
        e && e.isAuthError
          ? y(`Session expired. Please log in again.`)
          : e && e.isRateLimit
            ? y(`Too many requests — please wait a moment and try again.`)
            : /missing userToken|missing venueId|missing type/i.test(t)
              ? y(`Unable to record reaction: ${t}`)
              : y(`Error sending reaction: ${t}`);
      } finally {
        x(!1);
      }
    }
    function ie(e) {
      if (!e && e !== 0) return null;
      let t = String(e)
        .trim()
        .toLowerCase()
        .replace(/[-\s]+/g, `_`);
      switch (t) {
        case `hearts`:
        case `love`:
        case `loved`:
        case `favorite`:
        case `favourite`:
          return `heart`;
        case `thumbs_up`:
        case `thumbsup`:
        case `thumbs_up_reaction`:
        case `thumbs-up`:
        case `like`:
        case `liked`:
          return `thumbs_up`;
        case `thumbs_down`:
        case `thumbsdown`:
        case `thumbs_down_reaction`:
        case `thumbs-down`:
        case `dislike`:
        case `disliked`:
          return `thumbs_down`;
        default:
          return t;
      }
    }
    function P(e) {
      let t = { heart: 0, thumbs_up: 0, thumbs_down: 0 },
        n = e[`All reactions`];
      return (
        n &&
          typeof n == `string` &&
          n.split(`,`).forEach((e) => {
            let n = e.indexOf(`|`);
            if (n === -1) return;
            let r = e.slice(n + 1).trim();
            r in t && t[r]++;
          }),
        t
      );
    }
    function ae(e, t) {
      let n = e[`All reactions`];
      if (n && typeof n == `string` && t) {
        let e = new Set();
        return (
          n.split(`,`).forEach((n) => {
            let r = n.indexOf(`|`);
            if (r === -1) return;
            let i = n.slice(0, r).trim(),
              a = n.slice(r + 1).trim();
            i === t &&
              [`heart`, `thumbs_up`, `thumbs_down`].includes(a) &&
              e.add(a);
          }),
          e
        );
      }
      let r = [
          `Venue reactions`,
          `Reaction types`,
          `Reactions`,
          `My reactions`,
          `User reactions`,
          `Current user reactions`,
          `My reaction`,
          `User reaction`,
          `Reaction type`,
          `User reaction type`,
        ],
        i = [];
      return (
        r.forEach((t) => {
          let n = e[t];
          Array.isArray(n)
            ? i.push(...n)
            : typeof n == `string` && n.trim() && i.push(...n.split(/\s*,\s*/));
        }),
        Object.entries({
          heart: [`Heart`, `Heart reaction`, `Loved`, `Favorite`, `Favourite`],
          thumbs_up: [`Thumbs up`, `Thumbs up reaction`, `Like`, `Liked`],
          thumbs_down: [
            `Thumbs down`,
            `Thumbs down reaction`,
            `Dislike`,
            `Disliked`,
          ],
        }).forEach(([t, n]) => {
          n.forEach((n) => {
            let r = e[n];
            (r === !0 ||
              r === 1 ||
              r === `1` ||
              r === `true` ||
              r === `True` ||
              r === `yes` ||
              r === `Yes`) &&
              i.push(t);
          });
        }),
        new Set(
          i
            .map(ie)
            .filter((e) => [`heart`, `thumbs_up`, `thumbs_down`].includes(e)),
        )
      );
    }
    let oe = A[a],
      [se, ce] = (0, g.useState)(!1),
      le = (e) => () => {
        ce(e);
      };
    return (0, L.jsxs)(et, {
      onClick: (e) => {
        e.currentTarget.contains(e.target) && le(!0)();
      },
      children: [
        (0, L.jsxs)(tt, {
          children: [
            (0, L.jsx)(nt, {
              src: oe,
              alt: O[`Venue name`],
              loading: `lazy`,
              onError: (e) => {
                e.currentTarget.src = ee;
              },
            }),
            A.length > 1 &&
              (0, L.jsxs)(L.Fragment, {
                children: [
                  (0, L.jsx)(rt, {
                    position: `left`,
                    onClick: (e) => {
                      (e.stopPropagation(), o(a === 0 ? A.length - 1 : a - 1));
                    },
                    children: `‹`,
                  }),
                  (0, L.jsx)(rt, {
                    position: `right`,
                    onClick: (e) => {
                      (e.stopPropagation(), o(a === A.length - 1 ? 0 : a + 1));
                    },
                    children: `›`,
                  }),
                ],
              }),
          ],
        }),
        (0, L.jsxs)(it, {
          children: [
            (0, L.jsx)(at, {
              children: (0, L.jsx)(ot, {
                children: (0, L.jsx)(`h3`, { children: O[`Venue name`] }),
              }),
            }),
            O[`Vibe check`] &&
              (0, L.jsx)(ct, { children: O[`Vibe check`] || `` }),
            (0, L.jsxs)(st, {
              children: [
                (0, L.jsx)(_t, { children: (0, L.jsx)(Xt, {}) }),
                ` `,
                O.City || ``,
                O.City && O.State ? `, ` : ``,
                O.State || ``,
              ],
            }),
            (0, L.jsx)(hu, {
              variant: `card`,
              showCommentForm: d,
              setShowCommentForm: f,
              commentText: S,
              setCommentText: C,
              isSubmitting: h,
              handleCommentSubmit: ne,
              submitStatus: p,
              isReacting: b,
              canReact: k,
              isReactionActive: N,
              localCounts: E,
              handleReactionClick: re,
              reactionStatus: v,
              commentsLoading: l,
              comments: s,
            }),
          ],
        }),
        (0, L.jsx)(mu, {
          anchor: `left`,
          open: se,
          onClose: le(!1),
          children: (0, L.jsxs)(St, {
            onClick: (e) => e.stopPropagation(),
            children: [
              (0, L.jsx)(Ct, {
                onClick: le(!1),
                "aria-label": `Close drawer`,
                children: `✕`,
              }),
              (0, L.jsx)(wt, { children: O[`Venue name`] }),
              (0, L.jsxs)(Dt, {
                children: [
                  O[`Full address`] &&
                    (0, L.jsxs)(Et, {
                      children: [
                        (0, L.jsx)(_t, { children: (0, L.jsx)(Xt, {}) }),
                        ` `,
                        O[`Full address`],
                      ],
                    }),
                  O[`Phone number`] &&
                    (0, L.jsxs)(Et, {
                      children: [
                        (0, L.jsx)(_t, { children: (0, L.jsx)(Yt, {}) }),
                        ` `,
                        O[`Phone number`],
                      ],
                    }),
                  O.Email &&
                    (0, L.jsxs)(Et, {
                      children: [
                        (0, L.jsx)(_t, { children: (0, L.jsx)($t, {}) }),
                        ` `,
                        (0, L.jsx)(`a`, {
                          href: `mailto:${O.Email}`,
                          children: O.Email,
                        }),
                      ],
                    }),
                ],
              }),
              (0, L.jsxs)(Tt, {
                children: [
                  O.URL &&
                    (0, L.jsxs)(gt, {
                      as: `a`,
                      color: `gray`,
                      href: O.URL,
                      target: `_blank`,
                      rel: `noopener noreferrer`,
                      children: [
                        (0, L.jsx)(_t, { children: (0, L.jsx)(Zt, {}) }),
                        ` `,
                        `Link 1`,
                      ],
                    }),
                  O[`URL 2`] &&
                    (0, L.jsxs)(gt, {
                      as: `a`,
                      color: `gray`,
                      href: O[`URL 2`],
                      target: `_blank`,
                      rel: `noopener noreferrer`,
                      children: [
                        (0, L.jsx)(_t, { children: (0, L.jsx)(Zt, {}) }),
                        ` `,
                        `Link 2`,
                      ],
                    }),
                ],
              }),
              (0, L.jsx)(hu, {
                variant: `drawer`,
                showCommentForm: d,
                setShowCommentForm: f,
                commentText: S,
                setCommentText: C,
                isSubmitting: h,
                handleCommentSubmit: ne,
                submitStatus: p,
                isReacting: b,
                canReact: k,
                isReactionActive: N,
                localCounts: E,
                handleReactionClick: re,
                reactionStatus: v,
                commentsLoading: l,
                comments: s,
              }),
              (0, L.jsxs)(kt, {
                children: [
                  O[`Vibe check`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Vibe check:` }),
                        ` `,
                        O[`Vibe check`],
                      ],
                    }),
                  O.Capacity &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Capacity:` }),
                        ` `,
                        O.Capacity,
                      ],
                    }),
                  O[`Capacity notes`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Capacity notes:` }),
                        ` `,
                        O[`Capacity notes`],
                      ],
                    }),
                  O[`Ideal season(s)`]?.length > 0 &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Ideal seasons:` }),
                        ` `,
                        O[`Ideal season(s)`].join(`, `),
                      ],
                    }),
                  O[`Pet friendly?`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Pet friendly:` }),
                        ` Yes`,
                      ],
                    }),
                  O[`Pet notes`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Pet notes:` }),
                        ` `,
                        O[`Pet notes`],
                      ],
                    }),
                  O[`Deposit info`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Deposit info:` }),
                        ` `,
                        O[`Deposit info`],
                      ],
                    }),
                  O[`Extras/notes`] &&
                    (0, L.jsxs)(`p`, {
                      children: [
                        (0, L.jsx)(`strong`, { children: `Extras/notes:` }),
                        ` `,
                        O[`Extras/notes`],
                      ],
                    }),
                ],
              }),
              A.filter((e) => e !== ee).length > 0 &&
                (0, L.jsx)(At, {
                  children: A.filter((e) => e !== ee).map((e, t) =>
                    (0, L.jsx)(
                      gu,
                      {
                        src: e,
                        alt: `${O[`Venue name`]} photo ${t + 1}`,
                        placeholderDataUri: ee,
                      },
                      t,
                    ),
                  ),
                }),
            ],
          }),
        }),
      ],
    });
  }
  var vu = F(`section`, {
      maxWidth: `1240px`,
      margin: `0 auto`,
      padding: `24px 16px 40px`,
    }),
    yu = F(`div`, {
      display: `flex`,
      flexDirection: `column`,
      gap: `12px`,
      marginBottom: `28px`,
      padding: `22px`,
      borderRadius: `$lg`,
      backgroundColor: `$white`,
      boxShadow: `$card`,
      "@lg": {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
      },
    }),
    bu = F(`div`, { color: `$gray700`, fontSize: `0.95rem`, lineHeight: 1.6 }),
    xu = F(`div`, { display: `flex`, gap: `12px`, flexWrap: `wrap` }),
    Su = F(`button`, {
      padding: `10px 16px`,
      borderRadius: `$sm`,
      border: `none`,
      cursor: `pointer`,
      fontWeight: 700,
      transition: `transform 0.15s ease`,
      "&:hover": { transform: `translateY(-1px)` },
      variants: {
        intent: {
          primary: { backgroundColor: `$blue500`, color: `$white` },
          danger: { backgroundColor: `$red500`, color: `$white` },
          secondary: { backgroundColor: `$gray300`, color: `$gray800` },
        },
      },
    }),
    Cu = F(`div`, {
      display: `grid`,
      gap: `28px`,
      marginBottom: `24px`,
      gridTemplateColumns: `6fr 4fr`,
    }),
    wu = F(`div`, { display: `none` }),
    Tu = F(`div`, { display: `grid`, gap: `28px` }),
    Eu = F(`div`, {
      position: `sticky`,
      top: `24px`,
      height: `calc(100vh - 48px)`,
      borderRadius: `$md`,
      backgroundColor: `$gray400`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      color: `$white`,
      fontSize: `0.95rem`,
      boxShadow: `$card`,
    }),
    Du = F(`input`, {
      width: `100%`,
      padding: `12px 14px`,
      borderRadius: `$sm`,
      border: `1px solid $gray300`,
      fontSize: `0.95rem`,
      color: `$gray800`,
      backgroundColor: `$white`,
    }),
    Ou = F(`select`, {
      width: `100%`,
      padding: `12px 14px`,
      borderRadius: `$sm`,
      border: `1px solid $gray300`,
      backgroundColor: `$white`,
      fontSize: `0.95rem`,
      color: `$gray800`,
    }),
    ku = F(`div`, {
      display: `grid`,
      gap: `28px`,
      gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
    }),
    Au = F(`div`, {
      padding: `16px 18px`,
      borderRadius: `$md`,
      backgroundColor: `$white`,
      boxShadow: `$card`,
      color: `$gray700`,
    });
  function ju() {
    let [e, t] = (0, g.useState)([]),
      [n, r] = (0, g.useState)(`Checking login status...`),
      [i, a] = (0, g.useState)(!1),
      [o, s] = (0, g.useState)(Ze()),
      [c, l] = (0, g.useState)(null),
      [u, d] = (0, g.useState)(0),
      [f, p] = (0, g.useState)(``),
      [m, h] = (0, g.useState)(``),
      [_, v] = (0, g.useState)(`name`);
    (0, g.useEffect)(() => {
      let e = new URLSearchParams(window.location.search).get(`code`);
      if (e) {
        (r(`Verifying authentication credentials...`),
          (async () => {
            if (await Xe(e)) {
              s(Ze());
              let e = new URL(window.location.href);
              ((e.search = ``),
                window.history.replaceState({}, document.title, e.toString()),
                r(`Authentication successful. Loading records...`),
                x());
            } else r(`Authentication failed. Please try again.`);
          })());
        return;
      }
      o
        ? (r(`Session authorized. Fetching live dataset...`),
          Ve(o).then((e) => {
            e?.email && l(e.email);
          }),
          x())
        : r(`Log in with an approved Airtable account to unlock entries.`);
    }, [o]);
    function y() {
      (localStorage.removeItem(`airtable_user_token`),
        localStorage.removeItem(`user_email`),
        s(null));
    }
    function b(e) {
      return new Promise((t) => setTimeout(t, e));
    }
    async function x() {
      (a(!0), p(``));
      let e = o || Ze(),
        n = 0;
      try {
        for (; n < 3; )
          try {
            let n = await Re(e);
            n.records && n.records.length > 0 ? (t(n.records), d(0)) : t([]);
            return;
          } catch (e) {
            let i = `Unable to fetch records.`,
              a = !1,
              o = !1;
            try {
              e && typeof e == `object`
                ? ((i = e.message || e.error || JSON.stringify(e)),
                  (a = !!e.isAuthError),
                  (o = !!e.isRateLimit))
                : typeof e == `string` && (i = e);
            } catch {
              i = String(e);
            }
            if (
              a ||
              /UNAUTHORIZED|Invalid authentication token|401|Invalid or expired user session token|INVALID_API_VERSION/i.test(
                i,
              )
            ) {
              (y(), r(`Session expired. Please log in again.`), p(``), t([]));
              return;
            }
            if (
              (!o && /rate limited|too many requests/i.test(i) && (o = !0),
              (n += 1),
              o && n < 3)
            ) {
              let e = 250 * 2 ** (n - 1);
              (r(`Rate limit encountered. Retrying in ${e}ms...`), await b(e));
              continue;
            }
            p(i || `Unable to fetch records.`);
            return;
          }
      } finally {
        (a(!1),
          r((e) => (e === `Session expired. Please log in again.` ? e : ``)));
      }
    }
    let S = (0, g.useMemo)(() => {
      let t = m.toLowerCase().trim();
      return e
        .filter((e) => {
          let n = e.fields[`Venue name`] || ``,
            r = e.fields[`Full address`] || ``;
          return n.toLowerCase().includes(t) || r.toLowerCase().includes(t);
        })
        .sort((e, t) =>
          _ === `name`
            ? (e.fields[`Venue name`] || ``).localeCompare(
                t.fields[`Venue name`] || ``,
              )
            : 0,
        );
    }, [e, m, _]);
    return (0, L.jsxs)(vu, {
      children: [
        (0, L.jsxs)(yu, {
          children: [
            (0, L.jsxs)(bu, {
              children: [
                (0, L.jsx)(`p`, { children: n }),
                f &&
                  (0, L.jsx)(`p`, { style: { color: `#e03131` }, children: f }),
              ],
            }),
            (0, L.jsx)(xu, {
              children: o
                ? (0, L.jsxs)(L.Fragment, {
                    children: [
                      (0, L.jsx)(Su, {
                        intent: `secondary`,
                        onClick: x,
                        children: `Refresh venues`,
                      }),
                      (0, L.jsx)(Su, {
                        intent: `danger`,
                        onClick: Qe,
                        children: `Log Out`,
                      }),
                    ],
                  })
                : (0, L.jsx)(Su, {
                    intent: `primary`,
                    onClick: Ye,
                    children: `Log In with Airtable`,
                  }),
            }),
          ],
        }),
        (0, L.jsxs)(Cu, {
          children: [
            (0, L.jsxs)(Tu, {
              children: [
                (0, L.jsxs)(wu, {
                  children: [
                    (0, L.jsx)(Du, {
                      name: `filterText`,
                      value: m,
                      onChange: (e) => h(e.target.value),
                      placeholder: `Filter by venue name or address`,
                      "aria-label": `Venue search`,
                    }),
                    (0, L.jsx)(Ou, {
                      name: `sortKey`,
                      value: _,
                      onChange: (e) => v(e.target.value),
                      "aria-label": `Sort venues`,
                      children: (0, L.jsx)(`option`, {
                        value: `name`,
                        children: `Sort by name`,
                      }),
                    }),
                  ],
                }),
                i
                  ? (0, L.jsx)(Au, { children: `Loading venue cards…` })
                  : S.length > 0
                    ? (0, L.jsx)(ku, {
                        children: S.map((e, t) =>
                          (0, L.jsx)(
                            _u,
                            {
                              record: e,
                              userToken: o,
                              userEmail: c,
                              shouldLoadComments: t === u,
                              onCommentsLoaded: () =>
                                d((e) => Math.max(e, t + 1)),
                            },
                            e.id,
                          ),
                        ),
                      })
                    : (0, L.jsx)(Au, { children: `No venues available yet.` }),
              ],
            }),
            (0, L.jsx)(Eu, {
              children: `Map placeholder — map integration can be added here later.`,
            }),
          ],
        }),
      ],
    });
  }
  (Ne(),
    h
      .createRoot(document.getElementById(`airtable-interface-root`))
      .render((0, L.jsx)(ju, {})));
})();
