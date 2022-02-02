!(function (t, e) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = e())
    : typeof define === 'function' && define.amd
    ? define(e)
    : (t.microfeedback = e())
})(this, function () {
  'use strict'
  const q =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (t) {
          return typeof t
        }
      : function (t) {
          return t &&
            typeof Symbol === 'function' &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t
        }
  const i = function (t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  const n = (function () {
    function n(t, e) {
      for (let o = 0; o < e.length; o++) {
        const n = e[o]
        ;(n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n)
      }
    }
    return function (t, e, o) {
      return e && n(t.prototype, e), o && n(t, o), t
    }
  })()
  const r =
    Object.assign ||
    function (t) {
      for (let e = 1; e < arguments.length; e++) {
        const o = arguments[e]
        for (const n in o)
          Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
      }
      return t
    }
  const a = function t(e, o, n) {
    e === null && (e = Function.prototype)
    const a = Object.getOwnPropertyDescriptor(e, o)
    if (void 0 === a) {
      const s = Object.getPrototypeOf(e)
      return s === null ? void 0 : t(s, o, n)
    }
    if ('value' in a) return a.value
    const r = a.get
    return void 0 !== r ? r.call(n) : void 0
  }
  const s = function (t, e) {
    if (typeof e !== 'function' && e !== null)
      throw new TypeError(
        'Super expression must either be null or a function, not ' + typeof e
      )
    ;(t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0,
      },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(t, e)
          : (t.__proto__ = e))
  }
  const l = function (t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return !e || (typeof e !== 'object' && typeof e !== 'function') ? t : e
  }
  const M = function (t, e) {
    if (Array.isArray(t)) return t
    if (Symbol.iterator in Object(t))
      return (function (t, e) {
        const o = []
        let n = !0
        let a = !1
        let s = void 0
        try {
          for (
            var r, i = t[Symbol.iterator]();
            !(n = (r = i.next()).done) &&
            (o.push(r.value), !e || o.length !== e);
            n = !0
          );
        } catch (t) {
          ;(a = !0), (s = t)
        } finally {
          try {
            !n && i.return && i.return()
          } finally {
            if (a) throw s
          }
        }
        return o
      })(t, e)
    throw new TypeError('Invalid attempt to destructure non-iterable instance')
  }
  const e = 'SweetAlert2:'
  const B = function (t) {
    console.warn(e + ' ' + t)
  }
  const V = function (t) {
    console.error(e + ' ' + t)
  }
  const o = []
  const c = function (t) {
    o.includes(t) || (o.push(t), B(t))
  }
  const H = function (t) {
    return typeof t === 'function' ? t() : t
  }
  const R = function (t) {
    return (
      (void 0 === t ? 'undefined' : q(t)) === 'object' &&
      typeof t.then === 'function'
    )
  }
  const t = Object.freeze({
    cancel: 'cancel',
    backdrop: 'overlay',
    close: 'close',
    esc: 'esc',
    timer: 'timer',
  })
  const u = function (t) {
    const e = {}
    for (const o in t) e[t[o]] = 'swal2-' + t[o]
    return e
  }
  const D = u([
    'container',
    'shown',
    'height-auto',
    'iosfix',
    'popup',
    'modal',
    'no-backdrop',
    'toast',
    'toast-shown',
    'fade',
    'show',
    'hide',
    'noanimation',
    'close',
    'title',
    'header',
    'content',
    'actions',
    'confirm',
    'cancel',
    'footer',
    'icon',
    'icon-text',
    'image',
    'input',
    'has-input',
    'file',
    'range',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'inputerror',
    'validationerror',
    'progresssteps',
    'activeprogressstep',
    'progresscircle',
    'progressline',
    'loading',
    'styled',
    'top',
    'top-start',
    'top-end',
    'top-left',
    'top-right',
    'center',
    'center-start',
    'center-end',
    'center-left',
    'center-right',
    'bottom',
    'bottom-start',
    'bottom-end',
    'bottom-left',
    'bottom-right',
    'grow-row',
    'grow-column',
    'grow-fullscreen',
  ])
  const S = u(['success', 'warning', 'info', 'question', 'error'])
  const p = { previousBodyPadding: null }
  const d = function (t, e) {
    return !!t.classList && t.classList.contains(e)
  }
  const I = function (t) {
    if ((t.focus(), t.type !== 'file')) {
      const e = t.value
      ;(t.value = ''), (t.value = e)
    }
  }
  const w = function (t, e, o) {
    t &&
      e &&
      (typeof e === 'string' && (e = e.split(/\s+/).filter(Boolean)),
      e.forEach(function (e) {
        t.forEach
          ? t.forEach(function (t) {
              o ? t.classList.add(e) : t.classList.remove(e)
            })
          : o
          ? t.classList.add(e)
          : t.classList.remove(e)
      }))
  }
  const N = function (t, e) {
    w(t, e, !0)
  }
  const E = function (t, e) {
    w(t, e, !1)
  }
  const W = function (t, e) {
    for (let o = 0; o < t.childNodes.length; o++)
      if (d(t.childNodes[o], e)) return t.childNodes[o]
  }
  const F = function (t) {
    ;(t.style.opacity = ''),
      (t.style.display = t.id === D.content ? 'block' : 'flex')
  }
  const U = function (t) {
    ;(t.style.opacity = ''), (t.style.display = 'none')
  }
  const P = function (t) {
    for (; t.firstChild; ) t.removeChild(t.firstChild)
  }
  const Y = function (t) {
    return t && (t.offsetWidth || t.offsetHeight || t.getClientRects().length)
  }
  const j = function (t, e) {
    t.style.removeProperty
      ? t.style.removeProperty(e)
      : t.style.removeAttribute(e)
  }
  const L = function () {
    return document.body.querySelector('.' + D.container)
  }
  const f = function (t) {
    const e = L()
    return e ? e.querySelector('.' + t) : null
  }
  const $ = function () {
    return f(D.popup)
  }
  const K = function () {
    return $().querySelectorAll('.' + D.icon)
  }
  const X = function () {
    return f(D.title)
  }
  const Q = function () {
    return f(D.content)
  }
  const Z = function () {
    return f(D.image)
  }
  const J = function () {
    return f(D.progresssteps)
  }
  const G = function () {
    return f(D.confirm)
  }
  const tt = function () {
    return f(D.cancel)
  }
  const et = function () {
    return f(D.actions)
  }
  const ot = function () {
    return f(D.footer)
  }
  const nt = function () {
    return f(D.close)
  }
  const at = function () {
    const t = Array.prototype.slice
      .call(
        $().querySelectorAll(
          '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
        )
      )
      .sort(function (t, e) {
        return (
          (t = parseInt(t.getAttribute('tabindex'))),
          (e = parseInt(e.getAttribute('tabindex'))) < t ? 1 : t < e ? -1 : 0
        )
      })
    const e = Array.prototype.slice.call(
      $().querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'
      )
    )
    return (function (t) {
      for (var e = [], o = 0; o < t.length; o++)
        !e.includes(t[o]) && e.push(t[o])
      return e
    })(t.concat(e))
  }
  const m = function () {
    return !document.body.classList.contains(D['toast-shown'])
  }
  const h = function () {
    return typeof window === 'undefined' || typeof document === 'undefined'
  }
  const g = (
    '\n <div aria-labelledby="' +
    D.title +
    '" aria-describedby="' +
    D.content +
    '" class="' +
    D.popup +
    '" tabindex="-1">\n   <div class="' +
    D.header +
    '">\n     <ul class="' +
    D.progresssteps +
    '"></ul>\n     <div class="' +
    D.icon +
    ' ' +
    S.error +
    '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' +
    D.icon +
    ' ' +
    S.question +
    '">\n       <span class="' +
    D['icon-text'] +
    '">?</span>\n      </div>\n     <div class="' +
    D.icon +
    ' ' +
    S.warning +
    '">\n       <span class="' +
    D['icon-text'] +
    '">!</span>\n      </div>\n     <div class="' +
    D.icon +
    ' ' +
    S.info +
    '">\n       <span class="' +
    D['icon-text'] +
    '">i</span>\n      </div>\n     <div class="' +
    D.icon +
    ' ' +
    S.success +
    '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' +
    D.image +
    '" />\n     <h2 class="' +
    D.title +
    '" id="' +
    D.title +
    '"></h2>\n     <button type="button" class="' +
    D.close +
    '">×</button>\n   </div>\n   <div class="' +
    D.content +
    '">\n     <div id="' +
    D.content +
    '"></div>\n     <input class="' +
    D.input +
    '" />\n     <input type="file" class="' +
    D.file +
    '" />\n     <div class="' +
    D.range +
    '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' +
    D.select +
    '"></select>\n     <div class="' +
    D.radio +
    '"></div>\n     <label for="' +
    D.checkbox +
    '" class="' +
    D.checkbox +
    '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' +
    D.textarea +
    '"></textarea>\n     <div class="' +
    D.validationerror +
    '" id="' +
    D.validationerror +
    '"></div>\n   </div>\n   <div class="' +
    D.actions +
    '">\n     <button type="button" class="' +
    D.confirm +
    '">OK</button>\n     <button type="button" class="' +
    D.cancel +
    '">Cancel</button>\n   </div>\n   <div class="' +
    D.footer +
    '">\n   </div>\n </div>\n'
  ).replace(/(^|\n)\s*/g, '')
  const st = function (t) {
    const e = L()
    if (
      (e &&
        (e.parentNode.removeChild(e),
        E(
          [document.documentElement, document.body],
          [D['no-backdrop'], D['has-input'], D['toast-shown']]
        )),
      !h())
    ) {
      const o = document.createElement('div')
      ;(o.className = D.container),
        (o.innerHTML = g),
        (typeof t.target === 'string'
          ? document.querySelector(t.target)
          : t.target
        ).appendChild(o)
      const n = $()
      const a = Q()
      const s = W(a, D.input)
      const r = W(a, D.file)
      const i = a.querySelector('.' + D.range + ' input')
      const l = a.querySelector('.' + D.range + ' output')
      const c = W(a, D.select)
      const u = a.querySelector('.' + D.checkbox + ' input')
      const p = W(a, D.textarea)
      n.setAttribute('role', t.toast ? 'alert' : 'dialog'),
        n.setAttribute('aria-live', t.toast ? 'polite' : 'assertive'),
        t.toast || n.setAttribute('aria-modal', 'true')
      let d = void 0
      const w = function (t) {
        kt.isVisible() && d !== t.target.value && kt.resetValidationError(),
          (d = t.target.value)
      }
      return (
        (s.oninput = w),
        (r.onchange = w),
        (c.onchange = w),
        (u.onchange = w),
        (p.oninput = w),
        (i.oninput = function (t) {
          w(t), (l.value = i.value)
        }),
        (i.onchange = function (t) {
          w(t), (i.nextSibling.value = i.value)
        }),
        n
      )
    }
    V('SweetAlert2 requires document to initialize')
  }
  const rt = function (t, e) {
    if (!t) return U(e)
    if ((void 0 === t ? 'undefined' : q(t)) === 'object')
      if (((e.innerHTML = ''), 0 in t))
        for (let o = 0; o in t; o++) e.appendChild(t[o].cloneNode(!0))
      else e.appendChild(t.cloneNode(!0))
    else t && (e.innerHTML = t)
    F(e)
  }
  const b = (function () {
    if (h()) return !1
    const t = document.createElement('div')
    const e = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend',
    }
    for (const o in e)
      if (e.hasOwnProperty(o) && void 0 !== t.style[o]) return e[o]
    return !1
  })()
  const y = function () {
    p.previousBodyPadding === null &&
      document.body.scrollHeight > window.innerHeight &&
      ((p.previousBodyPadding = parseInt(
        window.getComputedStyle(document.body).getPropertyValue('padding-right')
      )),
      (document.body.style.paddingRight =
        p.previousBodyPadding +
        (function () {
          if ('ontouchstart' in window || navigator.msMaxTouchPoints) return 0
          const t = document.createElement('div')
          ;(t.style.width = '50px'),
            (t.style.height = '50px'),
            (t.style.overflow = 'scroll'),
            document.body.appendChild(t)
          const e = t.offsetWidth - t.clientWidth
          return document.body.removeChild(t), e
        })() +
        'px'))
  }
  const it = {}
  const v = function (t, e) {
    const o = L()
    const n = $()
    if (n) {
      t !== null && typeof t === 'function' && t(n), E(n, D.show), N(n, D.hide)
      const a = function () {
        document.body.classList.contains(D['toast-shown']) ||
          (!(function () {
            if (it.previousActiveElement && it.previousActiveElement.focus) {
              const t = window.scrollX
              const e = window.scrollY
              ;(it.restoreFocusTimeout = setTimeout(function () {
                it.previousActiveElement.focus(),
                  (it.previousActiveElement = null)
              }, 100)),
                void 0 !== t && void 0 !== e && window.scrollTo(t, e)
            }
          })(),
          window.removeEventListener('keydown', it.keydownHandler, {
            capture: !0,
          }),
          (it.keydownHandlerAdded = !1)),
          o.parentNode && o.parentNode.removeChild(o),
          E(
            [document.documentElement, document.body],
            [
              D.shown,
              D['height-auto'],
              D['no-backdrop'],
              D['has-input'],
              D['toast-shown'],
            ]
          ),
          m() &&
            (p.previousBodyPadding !== null &&
              ((document.body.style.paddingRight = p.previousBodyPadding),
              (p.previousBodyPadding = null)),
            (function () {
              if (d(document.body, D.iosfix)) {
                const t = parseInt(document.body.style.top, 10)
                E(document.body, D.iosfix),
                  (document.body.style.top = ''),
                  (document.body.scrollTop = -1 * t)
              }
            })()),
          e !== null &&
            typeof e === 'function' &&
            setTimeout(function () {
              e()
            })
      }
      b && !d(n, D.noanimation)
        ? n.addEventListener(b, function t() {
            n.removeEventListener(b, t), d(n, D.hide) && a()
          })
        : a()
    }
  }
  function x(t) {
    const e = function t() {
      for (var e = arguments.length, o = Array(e), n = 0; n < e; n++)
        o[n] = arguments[n]
      if (!(this instanceof t))
        return new (Function.prototype.bind.apply(t, [null].concat(o)))()
      Object.getPrototypeOf(t).apply(this, o)
    }
    return (
      (e.prototype = r(Object.create(t.prototype), { constructor: e })),
      typeof Object.setPrototypeOf === 'function'
        ? Object.setPrototypeOf(e, t)
        : (e.__proto__ = t),
      e
    )
  }
  const k = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: null,
    toast: !1,
    customClass: '',
    target: 'body',
    backdrop: !0,
    animation: !0,
    heightAuto: !0,
    allowOutsideClick: !0,
    allowEscapeKey: !0,
    allowEnterKey: !0,
    showConfirmButton: !0,
    showCancelButton: !1,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: null,
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: null,
    cancelButtonClass: null,
    buttonsStyling: !0,
    reverseButtons: !1,
    focusConfirm: !0,
    focusCancel: !1,
    showCloseButton: !1,
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: !1,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: '',
    imageClass: null,
    timer: null,
    width: null,
    padding: null,
    background: null,
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: !0,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    grow: !1,
    position: 'center',
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: null,
    onBeforeOpen: null,
    onAfterClose: null,
    onOpen: null,
    onClose: null,
    useRejections: !1,
    expectRejections: !1,
  }
  const C = ['useRejections', 'expectRejections']
  const A = function (t) {
    return k.hasOwnProperty(t) || t === 'extraParams'
  }
  const O = function (t) {
    return C.includes(t)
  }
  const lt = function (t) {
    for (const e in t)
      A(e) || B('Unknown parameter "' + e + '"'),
        O(e) &&
          c(
            'The parameter "' +
              e +
              '" is deprecated and will be removed in the next major release.'
          )
  }
  const T =
    '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.'
  let z = {}
  let _ = []
  const ct = function () {
    let t = $()
    t || kt(''), (t = $())
    const e = et()
    const o = G()
    const n = tt()
    F(e),
      F(o),
      N([t, e], D.loading),
      (o.disabled = !0),
      (n.disabled = !0),
      t.setAttribute('data-loading', !0),
      t.setAttribute('aria-busy', !0),
      t.focus()
  }
  const ut = Object.freeze({
    isValidParameter: A,
    isDeprecatedParameter: O,
    argsToParams(o) {
      const n = {}
      switch (q(o[0])) {
        case 'string':
          ;['title', 'html', 'type'].forEach(function (t, e) {
            switch (q(o[e])) {
              case 'string':
                n[t] = o[e]
                break
              case 'undefined':
                break
              default:
                V(
                  'Unexpected type of ' +
                    t +
                    '! Expected "string", got ' +
                    q(o[e])
                )
            }
          })
          break
        case 'object':
          r(n, o[0])
          break
        default:
          return (
            V(
              'Unexpected type of argument! Expected "string" or "object", got ' +
                q(o[0])
            ),
            !1
          )
      }
      return n
    },
    adaptInputValidator(o) {
      return function (t, e) {
        return o.call(this, t, e).then(
          function () {},
          function (t) {
            return t
          }
        )
      }
    },
    close: v,
    closePopup: v,
    closeModal: v,
    closeToast: v,
    isVisible() {
      return !!$()
    },
    clickConfirm() {
      return G().click()
    },
    clickCancel() {
      return tt().click()
    },
    getPopup: $,
    getTitle: X,
    getContent: Q,
    getImage: Z,
    getButtonsWrapper() {
      return (
        c(
          'swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead'
        ),
        f(D.actions)
      )
    },
    getActions: et,
    getConfirmButton: G,
    getCancelButton: tt,
    getFooter: ot,
    isLoading() {
      return $().hasAttribute('data-loading')
    },
    fire() {
      for (var t = arguments.length, e = Array(t), o = 0; o < t; o++)
        e[o] = arguments[o]
      return new (Function.prototype.bind.apply(this, [null].concat(e)))()
    },
    mixin(o) {
      return x(
        (function (t) {
          function e() {
            return (
              i(this, e),
              l(
                this,
                (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)
              )
            )
          }
          return (
            s(e, this),
            n(e, [
              {
                key: '_main',
                value(t) {
                  return a(
                    e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                    '_main',
                    this
                  ).call(this, r({}, o, t))
                },
              },
            ]),
            e
          )
        })()
      )
    },
    queue(t) {
      const s = this
      _ = t
      const r = function () {
        ;(_ = []), document.body.removeAttribute('data-swal2-queue-step')
      }
      const i = []
      return new Promise(function (a, t) {
        !(function e(o, n) {
          o < _.length
            ? (document.body.setAttribute('data-swal2-queue-step', o),
              s(_[o]).then(function (t) {
                void 0 !== t.value
                  ? (i.push(t.value), e(o + 1, n))
                  : (r(), a({ dismiss: t.dismiss }))
              }))
            : (r(), a({ value: i }))
        })(0)
      })
    },
    getQueueStep() {
      return document.body.getAttribute('data-swal2-queue-step')
    },
    insertQueueStep(t, e) {
      return e && e < _.length ? _.splice(e, 0, t) : _.push(t)
    },
    deleteQueueStep(t) {
      void 0 !== _[t] && _.splice(t, 1)
    },
    showLoading: ct,
    enableLoading: ct,
    getTimerLeft() {
      return it.timeout && it.timeout.getTimerLeft()
    },
  })
  if (typeof window !== 'undefined' && typeof window.WeakMap !== 'function') {
    let pt = 0
    ;(window.Symbol = function (t) {
      return (
        '__' + t + '_' + Math.floor(1e9 * Math.random()) + '_' + ++pt + '__'
      )
    }),
      (Symbol.iterator = Symbol('Symbol.iterator')),
      (window.WeakMap = (function (o, n, e) {
        function t() {
          n(this, o, { value: Symbol('WeakMap') })
        }
        return (
          (t.prototype = {
            delete(t) {
              delete t[this[o]]
            },
            get(t) {
              return t[this[o]]
            },
            has(t) {
              return e.call(t, this[o])
            },
            set(t, e) {
              n(t, this[o], { configurable: !0, value: e })
            },
          }),
          t
        )
      })(Symbol('WeakMap'), Object.defineProperty, {}.hasOwnProperty))
  }
  const dt = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  }
  function wt() {
    const t = dt.innerParams.get(this)
    const e = dt.domCache.get(this)
    t.showConfirmButton ||
      (U(e.confirmButton), t.showCancelButton || U(e.actions)),
      E([e.popup, e.actions], D.loading),
      e.popup.removeAttribute('aria-busy'),
      e.popup.removeAttribute('data-loading'),
      (e.confirmButton.disabled = !1),
      (e.cancelButton.disabled = !1)
  }
  const ft = function t(e, o) {
    let n, a, s
    i(this, t)
    let r = o
    ;(this.start = function () {
      ;(s = !0), (a = new Date()), (n = setTimeout(e, r))
    }),
      (this.stop = function () {
        ;(s = !1), clearTimeout(n), (r -= new Date() - a)
      }),
      (this.getTimerLeft = function () {
        return s && (this.stop(), this.start()), r
      }),
      (this.getStateRunning = function () {
        return s
      }),
      this.start()
  }
  const mt = {
    email(t, e) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)
        ? Promise.resolve()
        : Promise.reject(
            e && e.validationMessage
              ? e.validationMessage
              : 'Invalid email address'
          )
    },
    url(t, e) {
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(
        t
      )
        ? Promise.resolve()
        : Promise.reject(
            e && e.validationMessage ? e.validationMessage : 'Invalid URL'
          )
    },
  }
  const ht = function (t) {
    const e = L()
    const o = $()
    t.onBeforeOpen !== null &&
      typeof t.onBeforeOpen === 'function' &&
      t.onBeforeOpen(o),
      t.animation ? (N(o, D.show), N(e, D.fade), E(o, D.hide)) : E(o, D.fade),
      F(o),
      (e.style.overflowY = 'hidden'),
      b && !d(o, D.noanimation)
        ? o.addEventListener(b, function t() {
            o.removeEventListener(b, t), (e.style.overflowY = 'auto')
          })
        : (e.style.overflowY = 'auto'),
      N([document.documentElement, document.body, e], D.shown),
      t.heightAuto &&
        t.backdrop &&
        !t.toast &&
        N([document.documentElement, document.body], D['height-auto']),
      m() &&
        (y(),
        (function () {
          if (
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !window.MSStream &&
            !d(document.body, D.iosfix)
          ) {
            const t = document.body.scrollTop
            ;(document.body.style.top = -1 * t + 'px'),
              N(document.body, D.iosfix)
          }
        })()),
      it.previousActiveElement ||
        (it.previousActiveElement = document.activeElement),
      t.onOpen !== null &&
        typeof t.onOpen === 'function' &&
        setTimeout(function () {
          t.onOpen(o)
        })
  }
  const gt = Object.freeze({
    hideLoading: wt,
    disableLoading: wt,
    getInput(t) {
      const e = dt.innerParams.get(this)
      const o = dt.domCache.get(this)
      if (!(t = t || e.input)) return null
      switch (t) {
        case 'select':
        case 'textarea':
        case 'file':
          return W(o.content, D[t])
        case 'checkbox':
          return o.popup.querySelector('.' + D.checkbox + ' input')
        case 'radio':
          return (
            o.popup.querySelector('.' + D.radio + ' input:checked') ||
            o.popup.querySelector('.' + D.radio + ' input:first-child')
          )
        case 'range':
          return o.popup.querySelector('.' + D.range + ' input')
        default:
          return W(o.content, D.input)
      }
    },
    enableButtons() {
      const t = dt.domCache.get(this)
      ;(t.confirmButton.disabled = !1), (t.cancelButton.disabled = !1)
    },
    disableButtons() {
      const t = dt.domCache.get(this)
      ;(t.confirmButton.disabled = !0), (t.cancelButton.disabled = !0)
    },
    enableConfirmButton() {
      dt.domCache.get(this).confirmButton.disabled = !1
    },
    disableConfirmButton() {
      dt.domCache.get(this).confirmButton.disabled = !0
    },
    enableInput() {
      const t = this.getInput()
      if (!t) return !1
      if (t.type === 'radio')
        for (
          let e = t.parentNode.parentNode.querySelectorAll('input'), o = 0;
          o < e.length;
          o++
        )
          e[o].disabled = !1
      else t.disabled = !1
    },
    disableInput() {
      const t = this.getInput()
      if (!t) return !1
      if (t && t.type === 'radio')
        for (
          let e = t.parentNode.parentNode.querySelectorAll('input'), o = 0;
          o < e.length;
          o++
        )
          e[o].disabled = !0
      else t.disabled = !0
    },
    showValidationError(t) {
      const e = dt.domCache.get(this)
      e.validationError.innerHTML = t
      const o = window.getComputedStyle(e.popup)
      ;(e.validationError.style.marginLeft =
        '-' + o.getPropertyValue('padding-left')),
        (e.validationError.style.marginRight =
          '-' + o.getPropertyValue('padding-right')),
        F(e.validationError)
      const n = this.getInput()
      n &&
        (n.setAttribute('aria-invalid', !0),
        n.setAttribute('aria-describedBy', D.validationerror),
        I(n),
        N(n, D.inputerror))
    },
    resetValidationError() {
      const t = dt.domCache.get(this)
      t.validationError && U(t.validationError)
      const e = this.getInput()
      e &&
        (e.removeAttribute('aria-invalid'),
        e.removeAttribute('aria-describedBy'),
        E(e, D.inputerror))
    },
    _main(t) {
      const O = this
      lt(t)
      const T = r({}, k, t)
      !(function (a) {
        a.inputValidator ||
          Object.keys(mt).forEach(function (t) {
            a.input === t &&
              (a.inputValidator = a.expectRejections
                ? mt[t]
                : kt.adaptInputValidator(mt[t]))
          }),
          (!a.target ||
            (typeof a.target === 'string' &&
              !document.querySelector(a.target)) ||
            (typeof a.target !== 'string' && !a.target.appendChild)) &&
            (B('Target parameter is not valid, defaulting to "body"'),
            (a.target = 'body'))
        let t = void 0
        const e = $()
        const o =
          typeof a.target === 'string'
            ? document.querySelector(a.target)
            : a.target
        ;(t = e && o && e.parentNode !== o.parentNode ? st(a) : e || st(a)),
          a.width &&
            (t.style.width =
              typeof a.width === 'number' ? a.width + 'px' : a.width),
          a.padding &&
            (t.style.padding =
              typeof a.padding === 'number' ? a.padding + 'px' : a.padding),
          a.background && (t.style.background = a.background)
        for (
          let n = window
              .getComputedStyle(t)
              .getPropertyValue('background-color'),
            s = t.querySelectorAll(
              '[class^=swal2-success-circular-line], .swal2-success-fix'
            ),
            r = 0;
          r < s.length;
          r++
        )
          s[r].style.backgroundColor = n
        const i = L()
        const l = X()
        const c = Q().querySelector('#' + D.content)
        const u = et()
        const p = G()
        const d = tt()
        const w = nt()
        const f = ot()
        if (
          (a.titleText
            ? (l.textContent = a.titleText)
            : a.title && (l.innerHTML = a.title.split('\n').join('<br />')),
          typeof a.backdrop === 'string'
            ? (L().style.background = a.backdrop)
            : a.backdrop ||
              N([document.documentElement, document.body], D['no-backdrop']),
          a.html
            ? rt(a.html, c)
            : a.text
            ? ((c.textContent = a.text), F(c))
            : U(c),
          a.position in D
            ? N(i, D[a.position])
            : (B(
                'The "position" parameter is not valid, defaulting to "center"'
              ),
              N(i, D.center)),
          a.grow && typeof a.grow === 'string')
        ) {
          const m = 'grow-' + a.grow
          m in D && N(i, D[m])
        }
        typeof a.animation === 'function' && (a.animation = a.animation.call()),
          a.showCloseButton
            ? (w.setAttribute('aria-label', a.closeButtonAriaLabel), F(w))
            : U(w),
          (t.className = D.popup),
          a.toast
            ? (N([document.documentElement, document.body], D['toast-shown']),
              N(t, D.toast))
            : N(t, D.modal),
          a.customClass && N(t, a.customClass)
        const h = J()
        const g = parseInt(
          a.currentProgressStep === null
            ? kt.getQueueStep()
            : a.currentProgressStep,
          10
        )
        a.progressSteps && a.progressSteps.length
          ? (F(h),
            P(h),
            g >= a.progressSteps.length &&
              B(
                'Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)'
              ),
            a.progressSteps.forEach(function (t, e) {
              const o = document.createElement('li')
              if (
                (N(o, D.progresscircle),
                (o.innerHTML = t),
                e === g && N(o, D.activeprogressstep),
                h.appendChild(o),
                e !== a.progressSteps.length - 1)
              ) {
                const n = document.createElement('li')
                N(n, D.progressline),
                  a.progressStepsDistance &&
                    (n.style.width = a.progressStepsDistance),
                  h.appendChild(n)
              }
            }))
          : U(h)
        for (let b = K(), y = 0; y < b.length; y++) U(b[y])
        if (a.type) {
          let v = !1
          for (const x in S)
            if (a.type === x) {
              v = !0
              break
            }
          if (!v) return V('Unknown alert type: ' + a.type)
          const k = t.querySelector('.' + D.icon + '.' + S[a.type])
          F(k), a.animation && N(k, 'swal2-animate-' + a.type + '-icon')
        }
        const C = Z()
        if (
          (a.imageUrl
            ? (C.setAttribute('src', a.imageUrl),
              C.setAttribute('alt', a.imageAlt),
              F(C),
              a.imageWidth
                ? C.setAttribute('width', a.imageWidth)
                : C.removeAttribute('width'),
              a.imageHeight
                ? C.setAttribute('height', a.imageHeight)
                : C.removeAttribute('height'),
              (C.className = D.image),
              a.imageClass && N(C, a.imageClass))
            : U(C),
          a.showCancelButton ? (d.style.display = 'inline-block') : U(d),
          a.showConfirmButton ? j(p, 'display') : U(p),
          a.showConfirmButton || a.showCancelButton ? F(u) : U(u),
          (p.innerHTML = a.confirmButtonText),
          (d.innerHTML = a.cancelButtonText),
          p.setAttribute('aria-label', a.confirmButtonAriaLabel),
          d.setAttribute('aria-label', a.cancelButtonAriaLabel),
          (p.className = D.confirm),
          N(p, a.confirmButtonClass),
          (d.className = D.cancel),
          N(d, a.cancelButtonClass),
          a.buttonsStyling)
        ) {
          N([p, d], D.styled),
            a.confirmButtonColor &&
              (p.style.backgroundColor = a.confirmButtonColor),
            a.cancelButtonColor &&
              (d.style.backgroundColor = a.cancelButtonColor)
          const A = window
            .getComputedStyle(p)
            .getPropertyValue('background-color')
          ;(p.style.borderLeftColor = A), (p.style.borderRightColor = A)
        } else
          E([p, d], D.styled),
            (p.style.backgroundColor =
              p.style.borderLeftColor =
              p.style.borderRightColor =
                ''),
            (d.style.backgroundColor =
              d.style.borderLeftColor =
              d.style.borderRightColor =
                '')
        rt(a.footer, f),
          !0 === a.animation ? E(t, D.noanimation) : N(t, D.noanimation),
          a.showLoaderOnConfirm &&
            !a.preConfirm &&
            B(
              'showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request'
            )
      })(T),
        Object.freeze(T),
        dt.innerParams.set(this, T),
        it.timeout && (it.timeout.stop(), delete it.timeout),
        clearTimeout(it.restoreFocusTimeout)
      const z = {
        popup: $(),
        container: L(),
        content: Q(),
        actions: et(),
        confirmButton: G(),
        cancelButton: tt(),
        closeButton: nt(),
        validationError: f(D.validationerror),
        progressSteps: J(),
      }
      dt.domCache.set(this, z)
      const _ = this.constructor
      return new Promise(function (e, o) {
        const n = function (t) {
          _.closePopup(T.onClose, T.onAfterClose),
            T.useRejections ? e(t) : e({ value: t })
        }
        const c = function (t) {
          _.closePopup(T.onClose, T.onAfterClose),
            T.useRejections ? o(t) : e({ dismiss: t })
        }
        const u = function (t) {
          _.closePopup(T.onClose, T.onAfterClose), o(t)
        }
        T.timer &&
          (it.timeout = new ft(function () {
            c('timer'), delete it.timeout
          }, T.timer)),
          T.input &&
            setTimeout(function () {
              const t = O.getInput()
              t && I(t)
            }, 0)
        for (
          var p = function (e) {
              if ((T.showLoaderOnConfirm && _.showLoading(), T.preConfirm)) {
                O.resetValidationError()
                const t = Promise.resolve().then(function () {
                  return T.preConfirm(e, T.extraParams)
                })
                T.expectRejections
                  ? t.then(
                      function (t) {
                        return n(t || e)
                      },
                      function (t) {
                        O.hideLoading(), t && O.showValidationError(t)
                      }
                    )
                  : t.then(
                      function (t) {
                        Y(z.validationError) || !1 === t
                          ? O.hideLoading()
                          : n(t || e)
                      },
                      function (t) {
                        return u(t)
                      }
                    )
              } else n(e)
            },
            t = function (t) {
              const e = t || window.event
              const o = e.target || e.srcElement
              const n = z.confirmButton
              const a = z.cancelButton
              const s = n && (n === o || n.contains(o))
              const r = a && (a === o || a.contains(o))
              switch (e.type) {
                case 'click':
                  if (s && _.isVisible())
                    if ((O.disableButtons(), T.input)) {
                      const i = (function () {
                        const t = O.getInput()
                        if (!t) return null
                        switch (T.input) {
                          case 'checkbox':
                            return t.checked ? 1 : 0
                          case 'radio':
                            return t.checked ? t.value : null
                          case 'file':
                            return t.files.length ? t.files[0] : null
                          default:
                            return T.inputAutoTrim ? t.value.trim() : t.value
                        }
                      })()
                      if (T.inputValidator) {
                        O.disableInput()
                        const l = Promise.resolve().then(function () {
                          return T.inputValidator(i, T.extraParams)
                        })
                        T.expectRejections
                          ? l.then(
                              function () {
                                O.enableButtons(), O.enableInput(), p(i)
                              },
                              function (t) {
                                O.enableButtons(),
                                  O.enableInput(),
                                  t && O.showValidationError(t)
                              }
                            )
                          : l.then(
                              function (t) {
                                O.enableButtons(),
                                  O.enableInput(),
                                  t ? O.showValidationError(t) : p(i)
                              },
                              function (t) {
                                return u(t)
                              }
                            )
                      } else p(i)
                    } else p(!0)
                  else
                    r &&
                      _.isVisible() &&
                      (O.disableButtons(), c(_.DismissReason.cancel))
              }
            },
            a = z.popup.querySelectorAll('button'),
            s = 0;
          s < a.length;
          s++
        )
          (a[s].onclick = t),
            (a[s].onmouseover = t),
            (a[s].onmouseout = t),
            (a[s].onmousedown = t)
        if (
          ((z.closeButton.onclick = function () {
            c(_.DismissReason.close)
          }),
          T.toast)
        )
          z.popup.onclick = function (t) {
            T.showConfirmButton ||
              T.showCancelButton ||
              T.showCloseButton ||
              T.input ||
              (_.closePopup(T.onClose, T.onAfterClose),
              c(_.DismissReason.close))
          }
        else {
          let r = !1
          ;(z.popup.onmousedown = function () {
            z.container.onmouseup = function (t) {
              ;(z.container.onmouseup = void 0),
                t.target === z.container && (r = !0)
            }
          }),
            (z.container.onmousedown = function () {
              z.popup.onmouseup = function (t) {
                ;(z.popup.onmouseup = void 0),
                  (t.target === z.popup || z.popup.contains(t.target)) &&
                    (r = !0)
              }
            }),
            (z.container.onclick = function (t) {
              r
                ? (r = !1)
                : t.target === z.container &&
                  H(T.allowOutsideClick) &&
                  c(_.DismissReason.backdrop)
            })
        }
        T.reverseButtons
          ? z.confirmButton.parentNode.insertBefore(
              z.cancelButton,
              z.confirmButton
            )
          : z.confirmButton.parentNode.insertBefore(
              z.confirmButton,
              z.cancelButton
            )
        const i = function (t, e) {
          for (let o = at(T.focusCancel), n = 0; n < o.length; n++) {
            ;(t += e) === o.length ? (t = 0) : t === -1 && (t = o.length - 1)
            const a = o[t]
            if (Y(a)) return a.focus()
          }
          z.popup.focus()
        }
        it.keydownHandlerAdded &&
          (window.removeEventListener('keydown', it.keydownHandler, {
            capture: !0,
          }),
          (it.keydownHandlerAdded = !1)),
          T.toast ||
            ((it.keydownHandler = function (t) {
              return (function (t, e) {
                if ((t.stopPropagation(), t.key !== 'Enter' || t.isComposing))
                  if (t.key === 'Tab') {
                    for (
                      var o = t.target || t.srcElement,
                        n = at(e.focusCancel),
                        a = -1,
                        s = 0;
                      s < n.length;
                      s++
                    )
                      if (o === n[s]) {
                        a = s
                        break
                      }
                    t.shiftKey ? i(a, -1) : i(a, 1),
                      t.stopPropagation(),
                      t.preventDefault()
                  } else
                    [
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                      'Left',
                      'Right',
                      'Up',
                      'Down',
                    ].includes(t.key)
                      ? document.activeElement === z.confirmButton &&
                        Y(z.cancelButton)
                        ? z.cancelButton.focus()
                        : document.activeElement === z.cancelButton &&
                          Y(z.confirmButton) &&
                          z.confirmButton.focus()
                      : (t.key !== 'Escape' && t.key !== 'Esc') ||
                        !0 !== H(e.allowEscapeKey) ||
                        c(_.DismissReason.esc)
                else if (
                  t.target &&
                  O.getInput() &&
                  t.target.outerHTML === O.getInput().outerHTML
                ) {
                  if (['textarea', 'file'].includes(e.input)) return
                  _.clickConfirm(), t.preventDefault()
                }
              })(t, T)
            }),
            window.addEventListener('keydown', it.keydownHandler, {
              capture: !0,
            }),
            (it.keydownHandlerAdded = !0)),
          O.enableButtons(),
          O.hideLoading(),
          O.resetValidationError(),
          T.input && N(document.body, D['has-input'])
        for (
          var l = [
              'input',
              'file',
              'range',
              'select',
              'radio',
              'checkbox',
              'textarea',
            ],
            d = void 0,
            w = 0;
          w < l.length;
          w++
        ) {
          const f = D[l[w]]
          const m = W(z.content, f)
          if ((d = O.getInput(l[w]))) {
            for (const h in d.attributes)
              if (d.attributes.hasOwnProperty(h)) {
                const g = d.attributes[h].name
                g !== 'type' && g !== 'value' && d.removeAttribute(g)
              }
            for (const b in T.inputAttributes)
              d.setAttribute(b, T.inputAttributes[b])
          }
          ;(m.className = f), T.inputClass && N(m, T.inputClass), U(m)
        }
        let y = void 0
        switch (T.input) {
          case 'text':
          case 'email':
          case 'password':
          case 'number':
          case 'tel':
          case 'url':
            ;((d = W(z.content, D.input)).value = T.inputValue),
              (d.placeholder = T.inputPlaceholder),
              (d.type = T.input),
              F(d)
            break
          case 'file':
            ;((d = W(z.content, D.file)).placeholder = T.inputPlaceholder),
              (d.type = T.input),
              F(d)
            break
          case 'range':
            var v = W(z.content, D.range)
            var x = v.querySelector('input')
            var k = v.querySelector('output')
            ;(x.value = T.inputValue),
              (x.type = T.input),
              (k.value = T.inputValue),
              F(v)
            break
          case 'select':
            var C = W(z.content, D.select)
            if (((C.innerHTML = ''), T.inputPlaceholder)) {
              const A = document.createElement('option')
              ;(A.innerHTML = T.inputPlaceholder),
                (A.value = ''),
                (A.disabled = !0),
                (A.selected = !0),
                C.appendChild(A)
            }
            y = function (t) {
              t.forEach(function (t) {
                const e = M(t, 2)
                const o = e[0]
                const n = e[1]
                const a = document.createElement('option')
                ;(a.value = o),
                  (a.innerHTML = n),
                  T.inputValue.toString() === o.toString() && (a.selected = !0),
                  C.appendChild(a)
              }),
                F(C),
                C.focus()
            }
            break
          case 'radio':
            var B = W(z.content, D.radio)
            ;(B.innerHTML = ''),
              (y = function (t) {
                t.forEach(function (t) {
                  const e = M(t, 2)
                  const o = e[0]
                  const n = e[1]
                  const a = document.createElement('input')
                  const s = document.createElement('label')
                  ;(a.type = 'radio'),
                    (a.name = D.radio),
                    (a.value = o),
                    T.inputValue.toString() === o.toString() &&
                      (a.checked = !0),
                    (s.innerHTML = n),
                    s.insertBefore(a, s.firstChild),
                    B.appendChild(s)
                }),
                  F(B)
                const e = B.querySelectorAll('input')
                e.length && e[0].focus()
              })
            break
          case 'checkbox':
            var S = W(z.content, D.checkbox)
            var E = O.getInput('checkbox')
            ;(E.type = 'checkbox'),
              (E.value = 1),
              (E.id = D.checkbox),
              (E.checked = Boolean(T.inputValue))
            var P = S.getElementsByTagName('span')
            P.length && S.removeChild(P[0]),
              ((P = document.createElement('span')).innerHTML =
                T.inputPlaceholder),
              S.appendChild(P),
              F(S)
            break
          case 'textarea':
            var j = W(z.content, D.textarea)
            ;(j.value = T.inputValue),
              (j.placeholder = T.inputPlaceholder),
              F(j)
            break
          case null:
            break
          default:
            V(
              'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' +
                T.input +
                '"'
            )
        }
        if (T.input === 'select' || T.input === 'radio') {
          const L = function (t) {
            return y(
              ((e = t),
              (o = []),
              typeof Map !== 'undefined' && e instanceof Map
                ? e.forEach(function (t, e) {
                    o.push([e, t])
                  })
                : Object.keys(e).forEach(function (t) {
                    o.push([t, e[t]])
                  }),
              o)
            )
            let e, o
          }
          R(T.inputOptions)
            ? (_.showLoading(),
              T.inputOptions.then(function (t) {
                O.hideLoading(), L(t)
              }))
            : q(T.inputOptions) === 'object'
            ? L(T.inputOptions)
            : V(
                'Unexpected type of inputOptions! Expected object, Map or Promise, got ' +
                  q(T.inputOptions)
              )
        } else
          ['text', 'email', 'number', 'tel', 'textarea'].includes(T.input) &&
            R(T.inputValue) &&
            (_.showLoading(),
            U(d),
            T.inputValue
              .then(function (t) {
                ;(d.value = T.input === 'number' ? parseFloat(t) || 0 : t + ''),
                  F(d),
                  O.hideLoading()
              })
              .catch(function (t) {
                V('Error in inputValue promise: ' + t),
                  (d.value = ''),
                  F(d),
                  O.hideLoading()
              }))
        ht(T),
          T.toast ||
            (H(T.allowEnterKey)
              ? T.focusCancel && Y(z.cancelButton)
                ? z.cancelButton.focus()
                : T.focusConfirm && Y(z.confirmButton)
                ? z.confirmButton.focus()
                : i(-1, 1)
              : document.activeElement && document.activeElement.blur()),
          (z.container.scrollTop = 0)
      })
    },
  })
  let bt = void 0
  function yt() {
    if (typeof window !== 'undefined') {
      typeof Promise === 'undefined' &&
        V(
          'This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)'
        )
      for (var t = arguments.length, e = Array(t), o = 0; o < t; o++)
        e[o] = arguments[o]
      if (void 0 === e[0])
        return V('SweetAlert2 expects at least 1 attribute!'), !1
      bt = this
      const n = Object.freeze(this.constructor.argsToParams(e))
      Object.defineProperties(this, {
        params: { value: n, writable: !1, enumerable: !0 },
      })
      const a = this._main(this.params)
      dt.promise.set(this, a)
    }
  }
  ;(yt.prototype.then = function (t, e) {
    return dt.promise.get(this).then(t, e)
  }),
    (yt.prototype.catch = function (t) {
      return dt.promise.get(this).catch(t)
    }),
    (yt.prototype.finally = function (t) {
      return dt.promise.get(this).finally(t)
    }),
    r(yt.prototype, gt),
    r(yt, ut),
    Object.keys(gt).forEach(function (e) {
      yt[e] = function () {
        let t
        if (bt) return (t = bt)[e].apply(t, arguments)
      }
    }),
    (yt.DismissReason = t),
    (yt.noop = function () {}),
    (yt.version = '7.22.2')
  let vt
  let xt
  var kt = x(
    ((vt = yt),
    (xt = (function (t) {
      function e() {
        return (
          i(this, e),
          l(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)
          )
        )
      }
      return (
        s(e, vt),
        n(
          e,
          [
            {
              key: '_main',
              value(t) {
                return a(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  '_main',
                  this
                ).call(this, r({}, z, t))
              },
            },
          ],
          [
            {
              key: 'setDefaults',
              value(e) {
                if (
                  (c(T), !e || (void 0 === e ? 'undefined' : q(e)) !== 'object')
                )
                  throw new TypeError(
                    'SweetAlert2: The argument for setDefaults() is required and has to be a object'
                  )
                lt(e),
                  Object.keys(e).forEach(function (t) {
                    vt.isValidParameter(t) && (z[t] = e[t])
                  })
              },
            },
            {
              key: 'resetDefaults',
              value() {
                c(T), (z = {})
              },
            },
          ]
        ),
        e
      )
    })()),
    typeof window !== 'undefined' &&
      q(window._swalDefaults) === 'object' &&
      xt.setDefaults(window._swalDefaults),
    xt)
  )
  function Ct(t, e) {
    void 0 === e && (e = {})
    const o = e.insertAt
    if (t && typeof document !== 'undefined') {
      const n = document.head || document.getElementsByTagName('head')[0]
      const a = document.createElement('style')
      ;(a.type = 'text/css'),
        o === 'top' && n.firstChild
          ? n.insertBefore(a, n.firstChild)
          : n.appendChild(a),
        a.styleSheet
          ? (a.styleSheet.cssText = t)
          : a.appendChild(document.createTextNode(t))
    }
  }
  kt.default = kt
  Ct(
    'button.microfeedback-button{cursor:pointer;text-decoration:none;position:fixed;bottom:0;right:3.125em;padding:4px 7px;font-size:.875em;border-radius:5px 5px 0 0;z-index:1;transition:all .2s ease-in-out;border:none;margin:0;width:auto;overflow:visible;background:transparent;color:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}button.microfeedback-button--clicked,button.microfeedback-button:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNikAQAACIAHF/uBd8AAAAASUVORK5CYII=");padding-bottom:10px}'
  )
  const At = { method: 'POST', url: null, payload: null }
  const Bt = document
  const St = 'microfeedback-button--clicked'
  const Et = {
    url: null,
    buttonText: 'Feedback',
    buttonAriaLabel: 'Send feedback',
    title: 'Send feedback',
    placeholder: 'Describe your issue or share your ideas',
    extra: null,
    backgroundColor: '#3085d6',
    color: '#fff',
    optimistic: !0,
    showDialog(e) {
      const o = {
        title: e.options.title,
        input: 'textarea',
        inputPlaceholder: e.options.placeholder,
        showCancelButton: !0,
        confirmButtonText: 'Send',
      }
      return (
        e.options.optimistic ||
          ((o.showLoaderOnConfirm = !0),
          (o.preConfirm = function (t) {
            return e.onSubmit({ value: t })
          }),
          (o.allowOutsideClick = function () {
            return !kt.isLoading()
          })),
        Object.keys(e.options).forEach(function (t) {
          kt.isValidParameter(t) && (o[t] = e.options[t])
        }),
        e.alert(o)
      )
    },
    showSuccessDialog(t) {
      return t.alert(
        'Thank you!',
        'Your feedback has been submitted.',
        'success'
      )
    },
    getPayload(t, e) {
      const o = { body: e.value }
      return t.options.extra && (o.extra = t.options.extra), o
    },
    preSend(t, e) {
      if (t.options.optimistic) return t.options.showSuccessDialog(t, e)
    },
    sendRequest(t, e, o) {
      return (
        (a = r({}, At, { url: e, method: 'POST', payload: o })),
        new Promise(function (e, o) {
          const n = new XMLHttpRequest()
          n.open(a.method, a.url, !0),
            n.setRequestHeader('Content-Type', 'application/json'),
            n.setRequestHeader('Accept', 'application/json'),
            n.send(JSON.stringify(a.payload)),
            n.addEventListener('load', function () {
              if (n.status < 400) {
                const t = JSON.parse(n.response)
                e(t)
              } else o(new Error(n.statusText))
            }),
            n.addEventListener('error', function () {
              o(new Error('Network Error'))
            })
        })
      )
      let a
    },
    onSuccess(t, e, o) {
      if (!t.options.optimistic) return t.options.showSuccessDialog(t, e, o)
    },
    onFailure() {},
  }
  const Pt = (function () {
    function s(t, e) {
      i(this, s)
      let o
      const n = t instanceof HTMLElement ? e : t
      if (
        ((this.options = r({}, Et, n)),
        this.options.url ||
          console.warn(
            'options.url not provided. Feedback will only be logged to the console.'
          ),
        (this.appended = !1),
        (this._parent = null),
        t instanceof HTMLElement)
      )
        this.el = t
      else {
        const a = Bt.createElement('div')
        ;(a.innerHTML =
          '<button aria-label="' +
          (o = this.options).buttonAriaLabel +
          '" style="background-color: ' +
          o.backgroundColor +
          '; color: ' +
          o.color +
          '" class="microfeedback-button">' +
          o.buttonText +
          '</button>'),
          Bt.body.appendChild(a),
          (this._parent = a),
          (this.appended = !0),
          (this.el = a.querySelector('.microfeedback-button'))
      }
      this.el.addEventListener('click', this.onClick.bind(this), !1)
    }
    return (
      n(s, [
        {
          key: 'alert',
          value() {
            return kt.apply(void 0, arguments)
          },
        },
        {
          key: 'onSubmit',
          value(t) {
            if (t.dismiss) return null
            const e = this.options.getPayload(this, t)
            if (e.body) {
              this.options.preSend(this, t)
              let o = void 0
              const n =
                typeof this.options.url === 'function'
                  ? this.options.url(this, t)
                  : this.options.url
              return (
                n
                  ? (o = this.options.sendRequest(this, n, e, t))
                  : (console.debug('microfeedback payload:'),
                    console.debug(e),
                    (o = Promise.resolve(e))),
                o.then(
                  this.options.onSuccess.bind(this, this, t),
                  this.options.onFailure.bind(this, this, t)
                )
              )
            }
          },
        },
        {
          key: 'onClick',
          value(t) {
            const e = this
            t && t.preventDefault(), this.el.classList.add(St)
            const o = this.options.showDialog(this).then(function (t) {
              return e.el.classList.remove(St), t
            })
            return (
              this.options.optimistic && o.then(this.onSubmit.bind(this)), o
            )
          },
        },
        {
          key: 'destroy',
          value() {
            this.el.removeEventListener('click', this.onClick.bind(this)),
              this.appended && Bt.body.removeChild(this._parent)
          },
        },
      ]),
      s
    )
  })()
  const jt = function (t, e) {
    return new Pt(t, e)
  }
  jt.MicroFeedbackButton = Pt
  return (
    Ct(
      '@keyframes a{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}to{transform:scale(1)}}@keyframes b{0%{transform:scale(1);opacity:1}to{transform:scale(.5);opacity:0}}@keyframes c{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}to{top:2.8125em;left:.875em;width:1.5625em}}@keyframes d{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}to{top:2.375em;right:.5em;width:2.9375em}}@keyframes e{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}to{transform:rotate(-405deg)}}@keyframes f{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}to{margin-top:0;transform:scale(1);opacity:1}}@keyframes g{0%{transform:rotateX(100deg);opacity:0}to{transform:rotateX(0deg);opacity:1}}body.swal2-toast-shown.swal2-has-input>.swal2-container>.swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-shown.swal2-has-input>.swal2-container>.swal2-toast .swal2-actions{flex:1;align-self:stretch;justify-content:flex-end;height:2.2em}body.swal2-toast-shown.swal2-has-input>.swal2-container>.swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-shown.swal2-has-input>.swal2-container>.swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-shown.swal2-has-input>.swal2-container>.swal2-toast .swal2-validationerror{font-size:1em}body.swal2-toast-shown>.swal2-container{position:fixed;background-color:transparent}body.swal2-toast-shown>.swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown>.swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown>.swal2-container.swal2-top-end,body.swal2-toast-shown>.swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown>.swal2-container.swal2-top-left,body.swal2-toast-shown>.swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown>.swal2-container.swal2-center-left,body.swal2-toast-shown>.swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown>.swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown>.swal2-container.swal2-center-end,body.swal2-toast-shown>.swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown>.swal2-container.swal2-bottom-left,body.swal2-toast-shown>.swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown>.swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown>.swal2-container.swal2-bottom-end,body.swal2-toast-shown>.swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;box-shadow:0 0 .625em #d9d9d9;overflow-y:hidden}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-close{position:static}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon-text{font-size:2em;font-weight:700;line-height:1em}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{animation:h .5s}.swal2-popup.swal2-toast.swal2-hide{animation:i .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{animation:j .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{animation:k .75s}@keyframes h{0%{transform:translateY(-.625em) rotate(2deg);opacity:0}33%{transform:translateY(0) rotate(-2deg);opacity:.5}66%{transform:translateY(.3125em) rotate(2deg);opacity:.7}to{transform:translateY(0) rotate(0);opacity:1}}@keyframes i{0%{opacity:1}33%{opacity:.5}to{transform:rotate(1deg);opacity:0}}@keyframes j{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}to{top:1.125em;left:.1875em;width:.75em}}@keyframes k{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}to{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:10px;background-color:transparent;z-index:15;overflow-x:hidden;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right)>.swal2-modal{margin:auto}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem;box-sizing:border-box}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{align-items:center;justify-content:center;margin:1.25em auto 0}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{width:2.5em;height:2.5em;margin:.46875em;padding:0;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;box-sizing:border-box;animation:l 1.5s linear 0s infinite normal;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm:after{display:inline-block;width:15px;height:15px;margin-left:5px;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff;content:"";animation:l 1.5s linear 0s infinite normal}.swal2-popup .swal2-styled{margin:0 .3125em;padding:.625em 2em;font-weight:500;box-shadow:none}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled:focus{outline:none;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding-top:1em;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;transition:color .1s ease-out;border:none;border-radius:0;background:transparent;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer;overflow:hidden}.swal2-popup .swal2-close:hover{transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;font-size:1.125em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);box-sizing:border-box}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;margin:1em auto;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:.75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validationerror{display:none;align-items:center;justify-content:center;padding:.625em;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;overflow:hidden}.swal2-popup .swal2-validationerror:before{display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center;content:"!";zoom:normal}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;box-sizing:content-box;-ms-user-select:none;user-select:none;zoom:normal}.swal2-icon-text{font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;top:-.25em;left:-.25em;width:100%;height:100%;border:.25em solid hsla(98,55%,69%,.3);border-radius:50%;z-index:2;box-sizing:content-box}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg);z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;height:.3125em;border-radius:.125em;background-color:#a5dc86;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-progresssteps{align-items:center;margin:0 0 1.25em;padding:0;font-weight:600}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center;z-index:4}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle,.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{width:2.5em;height:.4em;margin:0 -1px;background:#3085d6;z-index:3}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{animation:a .3s}.swal2-show.swal2-noanimation{animation:none}.swal2-hide{animation:b .15s forwards}.swal2-hide.swal2-noanimation{animation:none}[dir=rtl] .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{animation:c .75s}.swal2-animate-success-icon .swal2-success-line-long{animation:d .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{animation:e 4.25s ease-in}.swal2-animate-error-icon{animation:g .5s}.swal2-animate-error-icon .swal2-x-mark{animation:f .5s}@keyframes l{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}'
    ),
    jt
  )
})
