let e, t, n = !1;
const l = "undefined" != typeof window ? window : {}, s = l.document || {head: {}}, o = {
    t: 0,
    l: "",
    jmp: e => e(),
    raf: e => requestAnimationFrame(e),
    ael: (e, t, n, l) => e.addEventListener(t, n, l),
    rel: (e, t, n, l) => e.removeEventListener(t, n, l),
    ce: (e, t) => new CustomEvent(e, t)
  }, r = e => Promise.resolve(e), c = (() => {
    try {
      return new CSSStyleSheet, "function" == typeof (new CSSStyleSheet).replace
    } catch (e) {
    }
    return !1
  })(), i = new WeakMap, u = e => "sc-" + e.o, a = e => "object" == (e = typeof e) || "function" === e,
  f = (e, t, ...n) => {
    let l = null, s = !1, o = !1, r = [];
    const c = t => {
      for (let n = 0; n < t.length; n++) l = t[n], Array.isArray(l) ? c(l) : null != l && "boolean" != typeof l && ((s = "function" != typeof e && !a(l)) && (l += ""), s && o ? r[r.length - 1].i += l : r.push(s ? $(null, l) : l), o = s)
    };
    c(n);
    const i = $(e, null);
    return i.u = t, r.length > 0 && (i.$ = r), i
  }, $ = (e, t) => ({t: 0, h: e, i: t, p: null, $: null}), d = {}, h = (t, n, l) => {
    let o, r, c = n.$[l], i = 0;
    if (null !== c.i) o = c.p = s.createTextNode(c.i); else if (o = c.p = s.createElement(c.h), null != e && o["s-si"] !== e && o.classList.add(o["s-si"] = e), c.$) for (i = 0; i < c.$.length; ++i) r = h(t, c, i), r && o.appendChild(r);
    return o
  }, p = (e, n, l, s, o, r) => {
    let c, i = e;
    for (i.shadowRoot && i.tagName === t && (i = i.shadowRoot); o <= r; ++o) s[o] && (c = h(null, l, o), c && (s[o].p = c, i.insertBefore(c, n)))
  }, y = (e, t, n, l) => {
    for (; t <= n; ++t) (l = e[t]) && l.p.remove()
  }, m = (e, t) => e.h === t.h, w = (e, t) => {
    const n = t.p = e.p, l = e.$, s = t.$, o = t.i;
    null === o ? null !== l && null !== s ? ((e, t, n, l) => {
      let s, o = 0, r = 0, c = t.length - 1, i = t[0], u = t[c], a = l.length - 1, f = l[0], $ = l[a];
      for (; o <= c && r <= a;) null == i ? i = t[++o] : null == u ? u = t[--c] : null == f ? f = l[++r] : null == $ ? $ = l[--a] : m(i, f) ? (w(i, f), i = t[++o], f = l[++r]) : m(u, $) ? (w(u, $), u = t[--c], $ = l[--a]) : m(i, $) ? (w(i, $), e.insertBefore(i.p, u.p.nextSibling), i = t[++o], $ = l[--a]) : m(u, f) ? (w(u, f), e.insertBefore(u.p, i.p), u = t[--c], f = l[++r]) : (s = h(t && t[r], n, r), f = l[++r], s && i.p.parentNode.insertBefore(s, i.p));
      o > c ? p(e, null == l[a + 1] ? null : l[a + 1].p, n, l, r, a) : r > a && y(t, o, c)
    })(n, l, t, s) : null !== s ? (null !== e.i && (n.textContent = ""), p(n, null, t, s, 0, s.length - 1)) : null !== l && y(l, 0, l.length - 1) : e.i !== o && (n.data = o)
  }, b = (e, t) => {
    t && !e.m && t["s-p"] && t["s-p"].push(new Promise((t => e.m = t)))
  }, S = (e, t) => {
    if (e.t |= 16, !(4 & e.t)) return b(e, e.S), B((() => g(e, t)));
    e.t |= 512
  }, g = (e, t) => {
    const n = e.g;
    return C(void 0, (() => M(e, n, t)))
  }, M = async (e, t, n) => {
    const l = e.M, o = l["s-rc"];
    n && (e => {
      const t = e.j, n = e.M, l = t.t, o = ((e, t) => {
        let n = u(t), l = q.get(n);
        if (e = 11 === e.nodeType ? e : s, l) if ("string" == typeof l) {
          let t, o = i.get(e = e.head || e);
          o || i.set(e, o = new Set), o.has(n) || (t = s.createElement("style"), t.innerHTML = l, e.insertBefore(t, e.querySelector("link")), o && o.add(n))
        } else e.adoptedStyleSheets.includes(l) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, l]);
        return n
      })(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
      10 & l && (n["s-sc"] = o, n.classList.add(o + "-h"))
    })(e);
    j(e, t), o && (o.map((e => e())), l["s-rc"] = void 0);
    {
      const t = l["s-p"], n = () => v(e);
      0 === t.length ? n() : (Promise.all(t).then(n), e.t |= 4, t.length = 0)
    }
  }, j = (n, l) => {
    try {
      l = l.render(), n.t &= -17, n.t |= 2, ((n, l) => {
        const s = n.M, o = n.v || $(null, null), r = (e => e && e.h === d)(l) ? l : f(null, null, l);
        t = s.tagName, r.h = null, r.t |= 4, n.v = r, r.p = o.p = s.shadowRoot || s, e = s["s-sc"], w(o, r)
      })(n, l)
    } catch (e) {
      R(e, n.M)
    }
    return null
  }, v = e => {
    const t = e.M, n = e.S;
    64 & e.t || (e.t |= 64, O(t), e.k(t), n || k()), e.m && (e.m(), e.m = void 0), 512 & e.t && z((() => S(e, !1))), e.t &= -517
  }, k = () => {
    O(s.documentElement), z((() => (e => {
      const t = o.ce("appload", {detail: {namespace: "test-comp"}});
      return e.dispatchEvent(t), t
    })(l)))
  }, C = (e, t) => e && e.then ? e.then(t) : t(), O = e => e.classList.add("hydrated"), P = (e, t, n) => {
    if (t.C) {
      const l = Object.entries(t.C), s = e.prototype;
      if (l.map((([e, [l]]) => {
        (31 & l || 2 & n && 32 & l) && Object.defineProperty(s, e, {
          get() {
            return ((e, t) => T(this).O.get(t))(0, e)
          }, set(n) {
            ((e, t, n, l) => {
              const s = T(e), o = s.O.get(t), r = s.t, c = s.g;
              n = ((e, t) => null == e || a(e) ? e : 1 & t ? e + "" : e)(n, l.C[t][0]), 8 & r && void 0 !== o || n === o || (s.O.set(t, n), c && 2 == (18 & r) && S(s, !1))
            })(this, e, n, t)
          }, configurable: !0, enumerable: !0
        })
      })), 1 & n) {
        const t = new Map;
        s.attributeChangedCallback = function (e, n, l) {
          o.jmp((() => {
            const n = t.get(e);
            this.hasOwnProperty(n) && (l = this[n], delete this[n]), this[n] = (null !== l || "boolean" != typeof this[n]) && l
          }))
        }, e.observedAttributes = l.filter((([e, t]) => 15 & t[0])).map((([e, n]) => {
          const l = n[1] || e;
          return t.set(l, e), l
        }))
      }
    }
    return e
  }, x = (e, t = {}) => {
    const n = [], r = t.exclude || [], i = l.customElements, a = s.head, f = a.querySelector("meta[charset]"),
      $ = s.createElement("style"), d = [];
    let h, p = !0;
    Object.assign(o, t), o.l = new URL(t.resourcesUrl || "./", s.baseURI).href, e.map((e => e[1].map((t => {
      const l = {t: t[0], o: t[1], C: t[2], P: t[3]};
      l.C = t[2];
      const s = l.o, a = class extends HTMLElement {
        constructor(e) {
          super(e), L(e = this, l), 1 & l.t && e.attachShadow({mode: "open"})
        }

        connectedCallback() {
          h && (clearTimeout(h), h = null), p ? d.push(this) : o.jmp((() => (e => {
            if (0 == (1 & o.t)) {
              const t = T(e), n = t.j, l = () => {
              };
              if (!(1 & t.t)) {
                t.t |= 1;
                {
                  let n = e;
                  for (; n = n.parentNode || n.host;) if (n["s-p"]) {
                    b(t, t.S = n);
                    break
                  }
                }
                n.C && Object.entries(n.C).map((([t, [n]]) => {
                  if (31 & n && e.hasOwnProperty(t)) {
                    const n = e[t];
                    delete e[t], e[t] = n
                  }
                })), (async (e, t, n, l, s) => {
                  if (0 == (32 & t.t)) {
                    {
                      if (t.t |= 32, (s = W(n)).then) {
                        const e = () => {
                        };
                        s = await s, e()
                      }
                      s.isProxied || (P(s, n, 2), s.isProxied = !0);
                      const e = () => {
                      };
                      t.t |= 8;
                      try {
                        new s(t)
                      } catch (e) {
                        R(e)
                      }
                      t.t &= -9, e()
                    }
                    if (s.style) {
                      let e = s.style;
                      const t = u(n);
                      if (!q.has(t)) {
                        const l = () => {
                        };
                        ((e, t, n) => {
                          let l = q.get(e);
                          c && n ? (l = l || new CSSStyleSheet, l.replace(t)) : l = t, q.set(e, l)
                        })(t, e, !!(1 & n.t)), l()
                      }
                    }
                  }
                  const o = t.S, r = () => S(t, !0);
                  o && o["s-rc"] ? o["s-rc"].push(r) : r()
                })(0, t, n)
              }
              l()
            }
          })(this)))
        }

        disconnectedCallback() {
          o.jmp((() => {
          }))
        }

        componentOnReady() {
          return T(this).T
        }
      };
      l.A = e[0], r.includes(s) || i.get(s) || (n.push(s), i.define(s, P(a, l, 1)))
    })))), $.innerHTML = n + "{visibility:hidden}.hydrated{visibility:inherit}", $.setAttribute("data-styles", ""), a.insertBefore($, f ? f.nextSibling : a.firstChild), p = !1, d.length ? d.map((e => e.connectedCallback())) : o.jmp((() => h = setTimeout(k, 30)))
  }, E = new WeakMap, T = e => E.get(e), A = (e, t) => E.set(t.g = e, t), L = (e, t) => {
    const n = {t: 0, M: e, j: t, O: new Map};
    return n.T = new Promise((e => n.k = e)), e["s-p"] = [], e["s-rc"] = [], E.set(e, n)
  }, R = (e, t) => (0, console.error)(e, t), U = new Map, W = e => {
    const t = e.o.replace(/-/g, "_"), n = e.A, l = U.get(n);
    return l ? l[t] : import(`./${n}.entry.js`).then((e => (U.set(n, e), e[t])), R)
  }, q = new Map, F = [], H = [], N = (e, t) => l => {
    e.push(l), n || (n = !0, t && 4 & o.t ? z(_) : o.raf(_))
  }, V = e => {
    for (let t = 0; t < e.length; t++) try {
      e[t](performance.now())
    } catch (e) {
      R(e)
    }
    e.length = 0
  }, _ = () => {
    V(F), V(H), (n = F.length > 0) && o.raf(_)
  }, z = e => r().then(e), B = N(H, !0);
export {x as b, f as h, r as p, A as r}
