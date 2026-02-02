(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)");
function BailoutToCSR({ reason, children }) {
    if (typeof window === 'undefined') {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)");
function PreloadChunks({ moduleIds }) {
    // Early return in client compilation and only load requestStore on server side
    if (typeof window !== 'undefined') {
        return null;
    }
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const dplId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = `${workStore.assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(chunk)}${dplId}`;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style",
                    nonce: workStore.nonce
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low',
                    nonce: workStore.nonce
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                typeof window === 'undefined' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : null,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: mergedOptions.loadableGenerated?.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/object-assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var assign = Object.assign.bind(Object);
module.exports = assign;
module.exports.default = module.exports; //# sourceMappingURL=object-assign.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
        // nor polyfill, then a plain number is used for performance.
        var hasSymbol = typeof Symbol === 'function' && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
        // (unstable) APIs that have been removed. Can we remove the symbols?
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
        function isValidElementType(type) {
            return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
            if (typeof object === 'object' && object !== null) {
                var $$typeof = object.$$typeof;
                switch($$typeof){
                    case REACT_ELEMENT_TYPE:
                        var type = object.type;
                        switch(type){
                            case REACT_ASYNC_MODE_TYPE:
                            case REACT_CONCURRENT_MODE_TYPE:
                            case REACT_FRAGMENT_TYPE:
                            case REACT_PROFILER_TYPE:
                            case REACT_STRICT_MODE_TYPE:
                            case REACT_SUSPENSE_TYPE:
                                return type;
                            default:
                                var $$typeofType = type && type.$$typeof;
                                switch($$typeofType){
                                    case REACT_CONTEXT_TYPE:
                                    case REACT_FORWARD_REF_TYPE:
                                    case REACT_LAZY_TYPE:
                                    case REACT_MEMO_TYPE:
                                    case REACT_PROVIDER_TYPE:
                                        return $$typeofType;
                                    default:
                                        return $$typeof;
                                }
                        }
                    case REACT_PORTAL_TYPE:
                        return $$typeof;
                }
            }
            return undefined;
        } // AsyncMode is deprecated along with isAsyncMode
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated
        function isAsyncMode(object) {
            {
                if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                    hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint
                    console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
                }
            }
            return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
            return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
            return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
    })();
}
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/node_modules/react-is/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js [app-client] (ecmascript)");
}
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/has.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/checkPropTypes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
var printWarning = function() {};
if ("TURBOPACK compile-time truthy", 1) {
    var ReactPropTypesSecret = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)");
    var loggedTypeFailures = {};
    var has = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/has.js [app-client] (ecmascript)");
    printWarning = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */ function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if ("TURBOPACK compile-time truthy", 1) {
        for(var typeSpecName in typeSpecs){
            if (has(typeSpecs, typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== 'function') {
                        var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                        err.name = 'Invariant Violation';
                        throw err;
                    }
                    error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                } catch (ex) {
                    error = ex;
                }
                if (error && !(error instanceof Error)) {
                    printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
                }
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;
                    var stack = getStack ? getStack() : '';
                    printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
                }
            }
        }
    }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */ checkPropTypes.resetWarningCache = function() {
    if (("TURBOPACK compile-time value", "development") !== 'production') {
        loggedTypeFailures = {};
    }
};
module.exports = checkPropTypes;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/factoryWithTypeCheckers.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
var ReactIs = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/node_modules/react-is/index.js [app-client] (ecmascript)");
var assign = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/object-assign.js [app-client] (ecmascript)");
var ReactPropTypesSecret = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)");
var has = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/lib/has.js [app-client] (ecmascript)");
var checkPropTypes = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/checkPropTypes.js [app-client] (ecmascript)");
var printWarning = function() {};
if ("TURBOPACK compile-time truthy", 1) {
    printWarning = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
}
function emptyFunctionThatReturnsNull() {
    return null;
}
module.exports = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */ var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
    /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */ function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
            return iteratorFn;
        }
    }
    /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */ var ANONYMOUS = '<<anonymous>>';
    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bigint: createPrimitiveTypeChecker('bigint'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
    };
    /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */ /*eslint-disable no-self-compare*/ function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    }
    /*eslint-enable no-self-compare*/ /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */ function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === 'object' ? data : {};
        this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
        if (("TURBOPACK compile-time value", "development") !== 'production') {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                    // New behavior only for users of `prop-types` package
                    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
                    err.name = 'Invariant Violation';
                    throw err;
                } else if (("TURBOPACK compile-time value", "development") !== 'production' && typeof console !== 'undefined') {
                    // Old behavior for people using React.PropTypes
                    var cacheKey = componentName + ':' + propName;
                    if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                    manualPropTypeWarningCount < 3) {
                        printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
                        manualPropTypeCallCache[cacheKey] = true;
                        manualPropTypeWarningCount++;
                    }
                }
            }
            if (props[propName] == null) {
                if (isRequired) {
                    if (props[propName] === null) {
                        return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
                    }
                    return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
                }
                return null;
            } else {
                return validate(props, propName, componentName, location, propFullName);
            }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
                // `propValue` being instance of, say, date/regexp, pass the 'object'
                // check, but we can offer a more precise error message here rather than
                // 'of type `object`'.
                var preciseType = getPreciseType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
                    expectedType: expectedType
                });
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
            }
            for(var i = 0; i < propValue.length; i++){
                var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
                if (error instanceof Error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!ReactIs.isValidElementType(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
            if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (arguments.length > 1) {
                    printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
                } else {
                    printWarning('Invalid argument supplied to oneOf, expected an array.');
                }
            }
            return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for(var i = 0; i < expectedValues.length; i++){
                if (is(propValue, expectedValues[i])) {
                    return null;
                }
            }
            var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                var type = getPreciseType(value);
                if (type === 'symbol') {
                    return String(value);
                }
                return value;
            });
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
            }
            for(var key in propValue){
                if (has(propValue, key)) {
                    var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                    if (error instanceof Error) {
                        return error;
                    }
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
            ("TURBOPACK compile-time truthy", 1) ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : "TURBOPACK unreachable";
            return emptyFunctionThatReturnsNull;
        }
        for(var i = 0; i < arrayOfTypeCheckers.length; i++){
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== 'function') {
                printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
                return emptyFunctionThatReturnsNull;
            }
        }
        function validate(props, propName, componentName, location, propFullName) {
            var expectedTypes = [];
            for(var i = 0; i < arrayOfTypeCheckers.length; i++){
                var checker = arrayOfTypeCheckers[i];
                var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
                if (checkerResult == null) {
                    return null;
                }
                if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
                    expectedTypes.push(checkerResult.data.expectedType);
                }
            }
            var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
    }
    function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            for(var key in shapeTypes){
                var checker = shapeTypes[key];
                if (typeof checker !== 'function') {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            // We need to check all keys in case some are required but missing from props.
            var allKeys = assign({}, props[propName], shapeTypes);
            for(var key in allKeys){
                var checker = shapeTypes[key];
                if (has(shapeTypes, key) && typeof checker !== 'function') {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                if (!checker) {
                    return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
        switch(typeof propValue){
            case 'number':
            case 'string':
            case 'undefined':
                return true;
            case 'boolean':
                return !propValue;
            case 'object':
                if (Array.isArray(propValue)) {
                    return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                    return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                    var iterator = iteratorFn.call(propValue);
                    var step;
                    if (iteratorFn !== propValue.entries) {
                        while(!(step = iterator.next()).done){
                            if (!isNode(step.value)) {
                                return false;
                            }
                        }
                    } else {
                        // Iterator will provide entry [k,v] tuples rather than values.
                        while(!(step = iterator.next()).done){
                            var entry = step.value;
                            if (entry) {
                                if (!isNode(entry[1])) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    return false;
                }
                return true;
            default:
                return false;
        }
    }
    function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
            return true;
        }
        // falsy value can't be a Symbol
        if (!propValue) {
            return false;
        }
        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
            return true;
        }
        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
            return true;
        }
        return false;
    }
    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
            return 'array';
        }
        if (propValue instanceof RegExp) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return 'object';
        }
        if (isSymbol(propType, propValue)) {
            return 'symbol';
        }
        return propType;
    }
    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
            return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
            if (propValue instanceof Date) {
                return 'date';
            } else if (propValue instanceof RegExp) {
                return 'regexp';
            }
        }
        return propType;
    }
    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch(type){
            case 'array':
            case 'object':
                return 'an ' + type;
            case 'boolean':
            case 'date':
            case 'regexp':
                return 'a ' + type;
            default:
                return type;
        }
    }
    // Returns class name of the object, if any.
    function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
        }
        return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
if ("TURBOPACK compile-time truthy", 1) {
    var ReactIs = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/node_modules/react-is/index.js [app-client] (ecmascript)");
    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/factoryWithTypeCheckers.js [app-client] (ecmascript)")(ReactIs.isElement, throwOnDirectAccess);
} else //TURBOPACK unreachable
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function get(element) {
    return getComputedStyle(element);
}
function set(element, obj) {
    for(var key in obj){
        var val = obj[key];
        if (typeof val === 'number') {
            val = val + "px";
        }
        element.style[key] = val;
    }
    return element;
}
function div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}
var elMatches = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function matches(element, query) {
    if (!elMatches) {
        throw new Error('No element matching method supported');
    }
    return elMatches.call(element, query);
}
function remove(element) {
    if (element.remove) {
        element.remove();
    } else {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
}
function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function(child) {
        return matches(child, selector);
    });
}
var cls = {
    main: 'ps',
    rtl: 'ps__rtl',
    element: {
        thumb: function(x) {
            return "ps__thumb-" + x;
        },
        rail: function(x) {
            return "ps__rail-" + x;
        },
        consuming: 'ps__child--consume'
    },
    state: {
        focus: 'ps--focus',
        clicking: 'ps--clicking',
        active: function(x) {
            return "ps--active-" + x;
        },
        scrolling: function(x) {
            return "ps--scrolling-" + x;
        }
    }
};
/*
 * Helper methods
 */ var scrollingClassTimeout = {
    x: null,
    y: null
};
function addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = cls.state.scrolling(x);
    if (classList.contains(className)) {
        clearTimeout(scrollingClassTimeout[x]);
    } else {
        classList.add(className);
    }
}
function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(function() {
        return i.isAlive && i.element.classList.remove(cls.state.scrolling(x));
    }, i.settings.scrollingThreshold);
}
function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
}
var EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
};
var prototypeAccessors = {
    isEmpty: {
        configurable: true
    }
};
EventElement.prototype.bind = function bind(eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
        this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
};
EventElement.prototype.unbind = function unbind(eventName, target) {
    var this$1 = this;
    this.handlers[eventName] = this.handlers[eventName].filter(function(handler) {
        if (target && handler !== target) {
            return true;
        }
        this$1.element.removeEventListener(eventName, handler, false);
        return false;
    });
};
EventElement.prototype.unbindAll = function unbindAll() {
    for(var name in this.handlers){
        this.unbind(name);
    }
};
prototypeAccessors.isEmpty.get = function() {
    var this$1 = this;
    return Object.keys(this.handlers).every(function(key) {
        return this$1.handlers[key].length === 0;
    });
};
Object.defineProperties(EventElement.prototype, prototypeAccessors);
var EventManager = function EventManager() {
    this.eventElements = [];
};
EventManager.prototype.eventElement = function eventElement(element) {
    var ee = this.eventElements.filter(function(ee) {
        return ee.element === element;
    })[0];
    if (!ee) {
        ee = new EventElement(element);
        this.eventElements.push(ee);
    }
    return ee;
};
EventManager.prototype.bind = function bind(element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
};
EventManager.prototype.unbind = function unbind(element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);
    if (ee.isEmpty) {
        // remove
        this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
};
EventManager.prototype.unbindAll = function unbindAll() {
    this.eventElements.forEach(function(e) {
        return e.unbindAll();
    });
    this.eventElements = [];
};
EventManager.prototype.once = function once(element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function(evt) {
        ee.unbind(eventName, onceHandler);
        handler(evt);
    };
    ee.bind(eventName, onceHandler);
};
function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
        return new CustomEvent(name);
    } else {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(name, false, false, undefined);
        return evt;
    }
}
function processScrollDiff(i, axis, diff, useScrollingClass, forceFireReachEvent) {
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var fields;
    if (axis === 'top') {
        fields = [
            'contentHeight',
            'containerHeight',
            'scrollTop',
            'y',
            'up',
            'down'
        ];
    } else if (axis === 'left') {
        fields = [
            'contentWidth',
            'containerWidth',
            'scrollLeft',
            'x',
            'left',
            'right'
        ];
    } else {
        throw new Error('A proper axis should be provided');
    }
    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
}
function processScrollDiff$1(i, diff, ref, useScrollingClass, forceFireReachEvent) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;
    var element = i.element;
    // reset reach
    i.reach[y] = null;
    // 1 for subpixel rounding
    if (element[scrollTop] < 1) {
        i.reach[y] = 'start';
    }
    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
        i.reach[y] = 'end';
    }
    if (diff) {
        element.dispatchEvent(createEvent("ps-scroll-" + y));
        if (diff < 0) {
            element.dispatchEvent(createEvent("ps-scroll-" + up));
        } else if (diff > 0) {
            element.dispatchEvent(createEvent("ps-scroll-" + down));
        }
        if (useScrollingClass) {
            setScrollingClassInstantly(i, y);
        }
    }
    if (i.reach[y] && (diff || forceFireReachEvent)) {
        element.dispatchEvent(createEvent("ps-" + y + "-reach-" + i.reach[y]));
    }
}
function toInt(x) {
    return parseInt(x, 10) || 0;
}
function isEditable(el) {
    return matches(el, 'input,[contenteditable]') || matches(el, 'select,[contenteditable]') || matches(el, 'textarea,[contenteditable]') || matches(el, 'button,[contenteditable]');
}
function outerWidth(element) {
    var styles = get(element);
    return toInt(styles.width) + toInt(styles.paddingLeft) + toInt(styles.paddingRight) + toInt(styles.borderLeftWidth) + toInt(styles.borderRightWidth);
}
var env = {
    isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
    supportsTouch: typeof window !== 'undefined' && ('ontouchstart' in window || 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome: typeof navigator !== 'undefined' && /Chrome/i.test(navigator && navigator.userAgent)
};
function updateGeometry(i) {
    var element = i.element;
    var roundedScrollTop = Math.floor(element.scrollTop);
    var rect = element.getBoundingClientRect();
    i.containerWidth = Math.round(rect.width);
    i.containerHeight = Math.round(rect.height);
    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;
    if (!element.contains(i.scrollbarXRail)) {
        // clean up and append
        queryChildren(element, cls.element.rail('x')).forEach(function(el) {
            return remove(el);
        });
        element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
        // clean up and append
        queryChildren(element, cls.element.rail('y')).forEach(function(el) {
            return remove(el);
        });
        element.appendChild(i.scrollbarYRail);
    }
    if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
        i.scrollbarXActive = true;
        i.railXWidth = i.containerWidth - i.railXMarginWidth;
        i.railXRatio = i.containerWidth / i.railXWidth;
        i.scrollbarXWidth = getThumbSize(i, toInt(i.railXWidth * i.containerWidth / i.contentWidth));
        i.scrollbarXLeft = toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
    } else {
        i.scrollbarXActive = false;
    }
    if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
        i.scrollbarYActive = true;
        i.railYHeight = i.containerHeight - i.railYMarginHeight;
        i.railYRatio = i.containerHeight / i.railYHeight;
        i.scrollbarYHeight = getThumbSize(i, toInt(i.railYHeight * i.containerHeight / i.contentHeight));
        i.scrollbarYTop = toInt(roundedScrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
    } else {
        i.scrollbarYActive = false;
    }
    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
        i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
        i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }
    updateCss(element, i);
    if (i.scrollbarXActive) {
        element.classList.add(cls.state.active('x'));
    } else {
        element.classList.remove(cls.state.active('x'));
        i.scrollbarXWidth = 0;
        i.scrollbarXLeft = 0;
        element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
    }
    if (i.scrollbarYActive) {
        element.classList.add(cls.state.active('y'));
    } else {
        element.classList.remove(cls.state.active('y'));
        i.scrollbarYHeight = 0;
        i.scrollbarYTop = 0;
        element.scrollTop = 0;
    }
}
function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
        thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
        thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
}
function updateCss(element, i) {
    var xRailOffset = {
        width: i.railXWidth
    };
    var roundedScrollTop = Math.floor(element.scrollTop);
    if (i.isRtl) {
        xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
    } else {
        xRailOffset.left = element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
        xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    } else {
        xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    }
    set(i.scrollbarXRail, xRailOffset);
    var yRailOffset = {
        top: roundedScrollTop,
        height: i.railYHeight
    };
    if (i.isScrollbarYUsingRight) {
        if (i.isRtl) {
            yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth - 9;
        } else {
            yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
        }
    } else {
        if (i.isRtl) {
            yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
        } else {
            yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
        }
    }
    set(i.scrollbarYRail, yRailOffset);
    set(i.scrollbarX, {
        left: i.scrollbarXLeft,
        width: i.scrollbarXWidth - i.railBorderXWidth
    });
    set(i.scrollbarY, {
        top: i.scrollbarYTop,
        height: i.scrollbarYHeight - i.railBorderYWidth
    });
}
function clickRail(i) {
    var element = i.element;
    i.event.bind(i.scrollbarY, 'mousedown', function(e) {
        return e.stopPropagation();
    });
    i.event.bind(i.scrollbarYRail, 'mousedown', function(e) {
        var positionTop = e.pageY - window.pageYOffset - i.scrollbarYRail.getBoundingClientRect().top;
        var direction = positionTop > i.scrollbarYTop ? 1 : -1;
        i.element.scrollTop += direction * i.containerHeight;
        updateGeometry(i);
        e.stopPropagation();
    });
    i.event.bind(i.scrollbarX, 'mousedown', function(e) {
        return e.stopPropagation();
    });
    i.event.bind(i.scrollbarXRail, 'mousedown', function(e) {
        var positionLeft = e.pageX - window.pageXOffset - i.scrollbarXRail.getBoundingClientRect().left;
        var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;
        i.element.scrollLeft += direction * i.containerWidth;
        updateGeometry(i);
        e.stopPropagation();
    });
}
function dragThumb(i) {
    bindMouseScrollHandler(i, [
        'containerWidth',
        'contentWidth',
        'pageX',
        'railXWidth',
        'scrollbarX',
        'scrollbarXWidth',
        'scrollLeft',
        'x',
        'scrollbarXRail'
    ]);
    bindMouseScrollHandler(i, [
        'containerHeight',
        'contentHeight',
        'pageY',
        'railYHeight',
        'scrollbarY',
        'scrollbarYHeight',
        'scrollTop',
        'y',
        'scrollbarYRail'
    ]);
}
function bindMouseScrollHandler(i, ref) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];
    var element = i.element;
    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;
    function mouseMoveHandler(e) {
        if (e.touches && e.touches[0]) {
            e[pageY] = e.touches[0].pageY;
        }
        element[scrollTop] = startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
        addScrollingClass(i, y);
        updateGeometry(i);
        e.stopPropagation();
        if (e.type.startsWith('touch') && e.changedTouches.length > 1) {
            e.preventDefault();
        }
    }
    function mouseUpHandler() {
        removeScrollingClass(i, y);
        i[scrollbarYRail].classList.remove(cls.state.clicking);
        i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }
    function bindMoves(e, touchMode) {
        startingScrollTop = element[scrollTop];
        if (touchMode && e.touches) {
            e[pageY] = e.touches[0].pageY;
        }
        startingMousePageY = e[pageY];
        scrollBy = (i[contentHeight] - i[containerHeight]) / (i[railYHeight] - i[scrollbarYHeight]);
        if (!touchMode) {
            i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
            i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
            e.preventDefault();
        } else {
            i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
        }
        i[scrollbarYRail].classList.add(cls.state.clicking);
        e.stopPropagation();
    }
    i.event.bind(i[scrollbarY], 'mousedown', function(e) {
        bindMoves(e);
    });
    i.event.bind(i[scrollbarY], 'touchstart', function(e) {
        bindMoves(e, true);
    });
}
function keyboard(i) {
    var element = i.element;
    var elementHovered = function() {
        return matches(element, ':hover');
    };
    var scrollbarFocused = function() {
        return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus');
    };
    function shouldPreventDefault(deltaX, deltaY) {
        var scrollTop = Math.floor(element.scrollTop);
        if (deltaX === 0) {
            if (!i.scrollbarYActive) {
                return false;
            }
            if (scrollTop === 0 && deltaY > 0 || scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0) {
                return !i.settings.wheelPropagation;
            }
        }
        var scrollLeft = element.scrollLeft;
        if (deltaY === 0) {
            if (!i.scrollbarXActive) {
                return false;
            }
            if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0) {
                return !i.settings.wheelPropagation;
            }
        }
        return true;
    }
    i.event.bind(i.ownerDocument, 'keydown', function(e) {
        if (e.isDefaultPrevented && e.isDefaultPrevented() || e.defaultPrevented) {
            return;
        }
        if (!elementHovered() && !scrollbarFocused()) {
            return;
        }
        var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
        if (activeElement) {
            if (activeElement.tagName === 'IFRAME') {
                activeElement = activeElement.contentDocument.activeElement;
            } else {
                // go deeper if element is a webcomponent
                while(activeElement.shadowRoot){
                    activeElement = activeElement.shadowRoot.activeElement;
                }
            }
            if (isEditable(activeElement)) {
                return;
            }
        }
        var deltaX = 0;
        var deltaY = 0;
        switch(e.which){
            case 37:
                if (e.metaKey) {
                    deltaX = -i.contentWidth;
                } else if (e.altKey) {
                    deltaX = -i.containerWidth;
                } else {
                    deltaX = -30;
                }
                break;
            case 38:
                if (e.metaKey) {
                    deltaY = i.contentHeight;
                } else if (e.altKey) {
                    deltaY = i.containerHeight;
                } else {
                    deltaY = 30;
                }
                break;
            case 39:
                if (e.metaKey) {
                    deltaX = i.contentWidth;
                } else if (e.altKey) {
                    deltaX = i.containerWidth;
                } else {
                    deltaX = 30;
                }
                break;
            case 40:
                if (e.metaKey) {
                    deltaY = -i.contentHeight;
                } else if (e.altKey) {
                    deltaY = -i.containerHeight;
                } else {
                    deltaY = -30;
                }
                break;
            case 32:
                if (e.shiftKey) {
                    deltaY = i.containerHeight;
                } else {
                    deltaY = -i.containerHeight;
                }
                break;
            case 33:
                deltaY = i.containerHeight;
                break;
            case 34:
                deltaY = -i.containerHeight;
                break;
            case 36:
                deltaY = i.contentHeight;
                break;
            case 35:
                deltaY = -i.contentHeight;
                break;
            default:
                return;
        }
        if (i.settings.suppressScrollX && deltaX !== 0) {
            return;
        }
        if (i.settings.suppressScrollY && deltaY !== 0) {
            return;
        }
        element.scrollTop -= deltaY;
        element.scrollLeft += deltaX;
        updateGeometry(i);
        if (shouldPreventDefault(deltaX, deltaY)) {
            e.preventDefault();
        }
    });
}
function wheel(i) {
    var element = i.element;
    function shouldPreventDefault(deltaX, deltaY) {
        var roundedScrollTop = Math.floor(element.scrollTop);
        var isTop = element.scrollTop === 0;
        var isBottom = roundedScrollTop + element.offsetHeight === element.scrollHeight;
        var isLeft = element.scrollLeft === 0;
        var isRight = element.scrollLeft + element.offsetWidth === element.scrollWidth;
        var hitsBound;
        // pick axis with primary direction
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            hitsBound = isTop || isBottom;
        } else {
            hitsBound = isLeft || isRight;
        }
        return hitsBound ? !i.settings.wheelPropagation : true;
    }
    function getDeltaFromEvent(e) {
        var deltaX = e.deltaX;
        var deltaY = -1 * e.deltaY;
        if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
            // OS X Safari
            deltaX = -1 * e.wheelDeltaX / 6;
            deltaY = e.wheelDeltaY / 6;
        }
        if (e.deltaMode && e.deltaMode === 1) {
            // Firefox in deltaMode 1: Line scrolling
            deltaX *= 10;
            deltaY *= 10;
        }
        if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */ ) {
            // IE in some mouse drivers
            deltaX = 0;
            deltaY = e.wheelDelta;
        }
        if (e.shiftKey) {
            // reverse axis with shift key
            return [
                -deltaY,
                -deltaX
            ];
        }
        return [
            deltaX,
            deltaY
        ];
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
        // FIXME: this is a workaround for <select> issue in FF and IE #571
        if (!env.isWebKit && element.querySelector('select:focus')) {
            return true;
        }
        if (!element.contains(target)) {
            return false;
        }
        var cursor = target;
        while(cursor && cursor !== element){
            if (cursor.classList.contains(cls.element.consuming)) {
                return true;
            }
            var style = get(cursor);
            // if deltaY && vertical scrollable
            if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
                var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
                if (maxScrollTop > 0) {
                    if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) {
                        return true;
                    }
                }
            }
            // if deltaX && horizontal scrollable
            if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
                var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
                if (maxScrollLeft > 0) {
                    if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) {
                        return true;
                    }
                }
            }
            cursor = cursor.parentNode;
        }
        return false;
    }
    function mousewheelHandler(e) {
        var ref = getDeltaFromEvent(e);
        var deltaX = ref[0];
        var deltaY = ref[1];
        if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
            return;
        }
        var shouldPrevent = false;
        if (!i.settings.useBothWheelAxes) {
            // deltaX will only be used for horizontal scrolling and deltaY will
            // only be used for vertical scrolling - this is the default
            element.scrollTop -= deltaY * i.settings.wheelSpeed;
            element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else if (i.scrollbarYActive && !i.scrollbarXActive) {
            // only vertical scrollbar is active and useBothWheelAxes option is
            // active, so let's scroll vertical bar using both mouse wheel axes
            if (deltaY) {
                element.scrollTop -= deltaY * i.settings.wheelSpeed;
            } else {
                element.scrollTop += deltaX * i.settings.wheelSpeed;
            }
            shouldPrevent = true;
        } else if (i.scrollbarXActive && !i.scrollbarYActive) {
            // useBothWheelAxes and only horizontal bar is active, so use both
            // wheel axes for horizontal bar
            if (deltaX) {
                element.scrollLeft += deltaX * i.settings.wheelSpeed;
            } else {
                element.scrollLeft -= deltaY * i.settings.wheelSpeed;
            }
            shouldPrevent = true;
        }
        updateGeometry(i);
        shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
        if (shouldPrevent && !e.ctrlKey) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    if (typeof window.onwheel !== 'undefined') {
        i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
        i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
}
function touch(i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
        return;
    }
    var element = i.element;
    function shouldPrevent(deltaX, deltaY) {
        var scrollTop = Math.floor(element.scrollTop);
        var scrollLeft = element.scrollLeft;
        var magnitudeX = Math.abs(deltaX);
        var magnitudeY = Math.abs(deltaY);
        if (magnitudeY > magnitudeX) {
            // user is perhaps trying to swipe up/down the page
            if (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight || deltaY > 0 && scrollTop === 0) {
                // set prevent for mobile Chrome refresh
                return window.scrollY === 0 && deltaY > 0 && env.isChrome;
            }
        } else if (magnitudeX > magnitudeY) {
            // user is perhaps trying to swipe left/right across the page
            if (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth || deltaX > 0 && scrollLeft === 0) {
                return true;
            }
        }
        return true;
    }
    function applyTouchMove(differenceX, differenceY) {
        element.scrollTop -= differenceY;
        element.scrollLeft -= differenceX;
        updateGeometry(i);
    }
    var startOffset = {};
    var startTime = 0;
    var speed = {};
    var easingLoop = null;
    function getTouch(e) {
        if (e.targetTouches) {
            return e.targetTouches[0];
        } else {
            // Maybe IE pointer
            return e;
        }
    }
    function shouldHandle(e) {
        if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
            return false;
        }
        if (e.targetTouches && e.targetTouches.length === 1) {
            return true;
        }
        if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
            return true;
        }
        return false;
    }
    function touchStart(e) {
        if (!shouldHandle(e)) {
            return;
        }
        var touch = getTouch(e);
        startOffset.pageX = touch.pageX;
        startOffset.pageY = touch.pageY;
        startTime = new Date().getTime();
        if (easingLoop !== null) {
            clearInterval(easingLoop);
        }
    }
    function shouldBeConsumedByChild(target, deltaX, deltaY) {
        if (!element.contains(target)) {
            return false;
        }
        var cursor = target;
        while(cursor && cursor !== element){
            if (cursor.classList.contains(cls.element.consuming)) {
                return true;
            }
            var style = get(cursor);
            // if deltaY && vertical scrollable
            if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
                var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
                if (maxScrollTop > 0) {
                    if (cursor.scrollTop > 0 && deltaY < 0 || cursor.scrollTop < maxScrollTop && deltaY > 0) {
                        return true;
                    }
                }
            }
            // if deltaX && horizontal scrollable
            if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
                var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
                if (maxScrollLeft > 0) {
                    if (cursor.scrollLeft > 0 && deltaX < 0 || cursor.scrollLeft < maxScrollLeft && deltaX > 0) {
                        return true;
                    }
                }
            }
            cursor = cursor.parentNode;
        }
        return false;
    }
    function touchMove(e) {
        if (shouldHandle(e)) {
            var touch = getTouch(e);
            var currentOffset = {
                pageX: touch.pageX,
                pageY: touch.pageY
            };
            var differenceX = currentOffset.pageX - startOffset.pageX;
            var differenceY = currentOffset.pageY - startOffset.pageY;
            if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
                return;
            }
            applyTouchMove(differenceX, differenceY);
            startOffset = currentOffset;
            var currentTime = new Date().getTime();
            var timeGap = currentTime - startTime;
            if (timeGap > 0) {
                speed.x = differenceX / timeGap;
                speed.y = differenceY / timeGap;
                startTime = currentTime;
            }
            if (shouldPrevent(differenceX, differenceY)) {
                e.preventDefault();
            }
        }
    }
    function touchEnd() {
        if (i.settings.swipeEasing) {
            clearInterval(easingLoop);
            easingLoop = setInterval(function() {
                if (i.isInitialized) {
                    clearInterval(easingLoop);
                    return;
                }
                if (!speed.x && !speed.y) {
                    clearInterval(easingLoop);
                    return;
                }
                if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                    clearInterval(easingLoop);
                    return;
                }
                if (!i.element) {
                    clearInterval(easingLoop);
                    return;
                }
                applyTouchMove(speed.x * 30, speed.y * 30);
                speed.x *= 0.8;
                speed.y *= 0.8;
            }, 10);
        }
    }
    if (env.supportsTouch) {
        i.event.bind(element, 'touchstart', touchStart);
        i.event.bind(element, 'touchmove', touchMove);
        i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
        if (window.PointerEvent) {
            i.event.bind(element, 'pointerdown', touchStart);
            i.event.bind(element, 'pointermove', touchMove);
            i.event.bind(element, 'pointerup', touchEnd);
        } else if (window.MSPointerEvent) {
            i.event.bind(element, 'MSPointerDown', touchStart);
            i.event.bind(element, 'MSPointerMove', touchMove);
            i.event.bind(element, 'MSPointerUp', touchEnd);
        }
    }
}
var defaultSettings = function() {
    return {
        handlers: [
            'click-rail',
            'drag-thumb',
            'keyboard',
            'wheel',
            'touch'
        ],
        maxScrollbarLength: null,
        minScrollbarLength: null,
        scrollingThreshold: 1000,
        scrollXMarginOffset: 0,
        scrollYMarginOffset: 0,
        suppressScrollX: false,
        suppressScrollY: false,
        swipeEasing: true,
        useBothWheelAxes: false,
        wheelPropagation: true,
        wheelSpeed: 1
    };
};
var handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch
};
var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if (userSettings === void 0) userSettings = {};
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element || !element.nodeName) {
        throw new Error('no element is specified to initialize PerfectScrollbar');
    }
    this.element = element;
    element.classList.add(cls.main);
    this.settings = defaultSettings();
    for(var key in userSettings){
        this.settings[key] = userSettings[key];
    }
    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;
    var focus = function() {
        return element.classList.add(cls.state.focus);
    };
    var blur = function() {
        return element.classList.remove(cls.state.focus);
    };
    this.isRtl = get(element).direction === 'rtl';
    if (this.isRtl === true) {
        element.classList.add(cls.rtl);
    }
    this.isNegativeScroll = function() {
        var originalScrollLeft = element.scrollLeft;
        var result = null;
        element.scrollLeft = -1;
        result = element.scrollLeft < 0;
        element.scrollLeft = originalScrollLeft;
        return result;
    }();
    this.negativeScrollAdjustment = this.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;
    this.scrollbarXRail = div(cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
        this.isScrollbarXUsingBottom = false;
        this.scrollbarXTop = toInt(railXStyle.top);
    } else {
        this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth = toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    set(this.scrollbarXRail, {
        display: 'block'
    });
    this.railXMarginWidth = toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, {
        display: ''
    });
    this.railXWidth = null;
    this.railXRatio = null;
    this.scrollbarYRail = div(cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
        this.isScrollbarYUsingRight = false;
        this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
        this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth = toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, {
        display: 'block'
    });
    this.railYMarginHeight = toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, {
        display: ''
    });
    this.railYHeight = null;
    this.railYRatio = null;
    this.reach = {
        x: element.scrollLeft <= 0 ? 'start' : element.scrollLeft >= this.contentWidth - this.containerWidth ? 'end' : null,
        y: element.scrollTop <= 0 ? 'start' : element.scrollTop >= this.contentHeight - this.containerHeight ? 'end' : null
    };
    this.isAlive = true;
    this.settings.handlers.forEach(function(handlerName) {
        return handlers[handlerName](this$1);
    });
    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function(e) {
        return this$1.onScroll(e);
    });
    updateGeometry(this);
};
PerfectScrollbar.prototype.update = function update() {
    if (!this.isAlive) {
        return;
    }
    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0;
    // Recalculate rail margins
    set(this.scrollbarXRail, {
        display: 'block'
    });
    set(this.scrollbarYRail, {
        display: 'block'
    });
    this.railXMarginWidth = toInt(get(this.scrollbarXRail).marginLeft) + toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight = toInt(get(this.scrollbarYRail).marginTop) + toInt(get(this.scrollbarYRail).marginBottom);
    // Hide scrollbars not to affect scrollWidth and scrollHeight
    set(this.scrollbarXRail, {
        display: 'none'
    });
    set(this.scrollbarYRail, {
        display: 'none'
    });
    updateGeometry(this);
    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);
    set(this.scrollbarXRail, {
        display: ''
    });
    set(this.scrollbarYRail, {
        display: ''
    });
};
PerfectScrollbar.prototype.onScroll = function onScroll(e) {
    if (!this.isAlive) {
        return;
    }
    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(this, 'left', this.element.scrollLeft - this.lastScrollLeft);
    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
};
PerfectScrollbar.prototype.destroy = function destroy() {
    if (!this.isAlive) {
        return;
    }
    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();
    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;
    this.isAlive = false;
};
PerfectScrollbar.prototype.removePsClasses = function removePsClasses() {
    this.element.className = this.element.className.split(' ').filter(function(name) {
        return !name.match(/^ps([-_].+|)$/);
    }).join(' ');
};
const __TURBOPACK__default__export__ = PerfectScrollbar;
 //# sourceMappingURL=perfect-scrollbar.esm.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-perfect-scrollbar/lib/scrollbar.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _extends = Object.assign || function(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source){
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
var _createClass = function() {
    function defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _react = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _react2 = _interopRequireDefault(_react);
var _propTypes = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/prop-types/index.js [app-client] (ecmascript)");
var _perfectScrollbar = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js [app-client] (ecmascript)");
var _perfectScrollbar2 = _interopRequireDefault(_perfectScrollbar);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectWithoutProperties(obj, keys) {
    var target = {};
    for(var i in obj){
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var handlerNameByEvent = {
    'ps-scroll-y': 'onScrollY',
    'ps-scroll-x': 'onScrollX',
    'ps-scroll-up': 'onScrollUp',
    'ps-scroll-down': 'onScrollDown',
    'ps-scroll-left': 'onScrollLeft',
    'ps-scroll-right': 'onScrollRight',
    'ps-y-reach-start': 'onYReachStart',
    'ps-y-reach-end': 'onYReachEnd',
    'ps-x-reach-start': 'onXReachStart',
    'ps-x-reach-end': 'onXReachEnd'
};
Object.freeze(handlerNameByEvent);
var ScrollBar = function(_Component) {
    _inherits(ScrollBar, _Component);
    function ScrollBar(props) {
        _classCallCheck(this, ScrollBar);
        var _this = _possibleConstructorReturn(this, (ScrollBar.__proto__ || Object.getPrototypeOf(ScrollBar)).call(this, props));
        _this.handleRef = _this.handleRef.bind(_this);
        _this._handlerByEvent = {};
        return _this;
    }
    _createClass(ScrollBar, [
        {
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.option) {
                    console.warn('react-perfect-scrollbar: the "option" prop has been deprecated in favor of "options"');
                }
                this._ps = new _perfectScrollbar2.default(this._container, this.props.options || this.props.option);
                // hook up events
                this._updateEventHook();
                this._updateClassName();
            }
        },
        {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                this._updateEventHook(prevProps);
                this.updateScroll();
                if (prevProps.className !== this.props.className) {
                    this._updateClassName();
                }
            }
        },
        {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _this2 = this;
                // unhook up evens
                Object.keys(this._handlerByEvent).forEach(function(key) {
                    var value = _this2._handlerByEvent[key];
                    if (value) {
                        _this2._container.removeEventListener(key, value, false);
                    }
                });
                this._handlerByEvent = {};
                this._ps.destroy();
                this._ps = null;
            }
        },
        {
            key: '_updateEventHook',
            value: function _updateEventHook() {
                var _this3 = this;
                var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                // hook up events
                Object.keys(handlerNameByEvent).forEach(function(key) {
                    var callback = _this3.props[handlerNameByEvent[key]];
                    var prevCallback = prevProps[handlerNameByEvent[key]];
                    if (callback !== prevCallback) {
                        if (prevCallback) {
                            var prevHandler = _this3._handlerByEvent[key];
                            _this3._container.removeEventListener(key, prevHandler, false);
                            _this3._handlerByEvent[key] = null;
                        }
                        if (callback) {
                            var handler = function handler() {
                                return callback(_this3._container);
                            };
                            _this3._container.addEventListener(key, handler, false);
                            _this3._handlerByEvent[key] = handler;
                        }
                    }
                });
            }
        },
        {
            key: '_updateClassName',
            value: function _updateClassName() {
                var className = this.props.className;
                var psClassNames = this._container.className.split(' ').filter(function(name) {
                    return name.match(/^ps([-_].+|)$/);
                }).join(' ');
                if (this._container) {
                    this._container.className = 'scrollbar-container' + (className ? ' ' + className : '') + (psClassNames ? ' ' + psClassNames : '');
                }
            }
        },
        {
            key: 'updateScroll',
            value: function updateScroll() {
                this.props.onSync(this._ps);
            }
        },
        {
            key: 'handleRef',
            value: function handleRef(ref) {
                this._container = ref;
                this.props.containerRef(ref);
            }
        },
        {
            key: 'render',
            value: function render() {
                var _props = this.props, className = _props.className, style = _props.style, option = _props.option, options = _props.options, containerRef = _props.containerRef, onScrollY = _props.onScrollY, onScrollX = _props.onScrollX, onScrollUp = _props.onScrollUp, onScrollDown = _props.onScrollDown, onScrollLeft = _props.onScrollLeft, onScrollRight = _props.onScrollRight, onYReachStart = _props.onYReachStart, onYReachEnd = _props.onYReachEnd, onXReachStart = _props.onXReachStart, onXReachEnd = _props.onXReachEnd, component = _props.component, onSync = _props.onSync, children = _props.children, remainProps = _objectWithoutProperties(_props, [
                    'className',
                    'style',
                    'option',
                    'options',
                    'containerRef',
                    'onScrollY',
                    'onScrollX',
                    'onScrollUp',
                    'onScrollDown',
                    'onScrollLeft',
                    'onScrollRight',
                    'onYReachStart',
                    'onYReachEnd',
                    'onXReachStart',
                    'onXReachEnd',
                    'component',
                    'onSync',
                    'children'
                ]);
                var Comp = component;
                return _react2.default.createElement(Comp, _extends({
                    style: style,
                    ref: this.handleRef
                }, remainProps), children);
            }
        }
    ]);
    return ScrollBar;
}(_react.Component);
exports.default = ScrollBar;
ScrollBar.defaultProps = {
    className: '',
    style: undefined,
    option: undefined,
    options: undefined,
    containerRef: function containerRef() {},
    onScrollY: undefined,
    onScrollX: undefined,
    onScrollUp: undefined,
    onScrollDown: undefined,
    onScrollLeft: undefined,
    onScrollRight: undefined,
    onYReachStart: undefined,
    onYReachEnd: undefined,
    onXReachStart: undefined,
    onXReachEnd: undefined,
    onSync: function onSync(ps) {
        return ps.update();
    },
    component: 'div'
};
ScrollBar.propTypes = {
    children: _propTypes.PropTypes.node.isRequired,
    className: _propTypes.PropTypes.string,
    style: _propTypes.PropTypes.object,
    option: _propTypes.PropTypes.object,
    options: _propTypes.PropTypes.object,
    containerRef: _propTypes.PropTypes.func,
    onScrollY: _propTypes.PropTypes.func,
    onScrollX: _propTypes.PropTypes.func,
    onScrollUp: _propTypes.PropTypes.func,
    onScrollDown: _propTypes.PropTypes.func,
    onScrollLeft: _propTypes.PropTypes.func,
    onScrollRight: _propTypes.PropTypes.func,
    onYReachStart: _propTypes.PropTypes.func,
    onYReachEnd: _propTypes.PropTypes.func,
    onXReachStart: _propTypes.PropTypes.func,
    onXReachEnd: _propTypes.PropTypes.func,
    onSync: _propTypes.PropTypes.func,
    component: _propTypes.PropTypes.string
};
module.exports = exports['default'];
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-perfect-scrollbar/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _scrollbar = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-perfect-scrollbar/lib/scrollbar.js [app-client] (ecmascript)");
var _scrollbar2 = _interopRequireDefault(_scrollbar);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports.default = _scrollbar2.default;
module.exports = exports['default'];
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/clsx/dist/clsx.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function r(e) {
    var o, t, f = "";
    if ("string" == typeof e || "number" == typeof e) f += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var n = e.length;
        for(o = 0; o < n; o++)e[o] && (t = r(e[o])) && (f && (f += " "), f += t);
    } else for(t in e)e[t] && (f && (f += " "), f += t);
    return f;
}
function e() {
    for(var e, o, t = 0, f = "", n = arguments.length; t < n; t++)(e = arguments[t]) && (o = r(e)) && (f && (f += " "), f += o);
    return f;
}
module.exports = e, module.exports.clsx = e;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-onclickoutside/dist/react-onclickoutside.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IGNORE_CLASS_NAME",
    ()=>IGNORE_CLASS_NAME,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
;
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
} /**
 * Check whether some DOM node is our Component's node.
 */ 
function isNodeFound(current, componentNode, ignoreClass) {
    if (current === componentNode) {
        return true;
    } // SVG <use/> elements do not technically reside in the rendered DOM, so
    // they do not have classList directly, but they offer a link to their
    // corresponding element, which can have classList. This extra check is for
    // that case.
    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
    if (current.correspondingElement) {
        return current.correspondingElement.classList.contains(ignoreClass);
    }
    return current.classList.contains(ignoreClass);
}
/**
 * Try to find our node in a hierarchy of nodes, returning the document
 * node as highest node if our node is not found in the path up.
 */ function findHighest(current, componentNode, ignoreClass) {
    if (current === componentNode) {
        return true;
    } // If source=local then this event came from 'somewhere'
    // inside and should be ignored. We could handle this with
    // a layered approach, too, but that requires going back to
    // thinking in terms of Dom node nesting, running counter
    // to React's 'you shouldn't care about the DOM' philosophy.
    // Also cover shadowRoot node by checking current.host
    while(current.parentNode || current.host){
        // Only check normal node without shadowRoot
        if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
            return true;
        }
        current = current.parentNode || current.host;
    }
    return current;
}
/**
 * Check if the browser scrollbar was clicked
 */ function clickedScrollbar(evt) {
    return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
} // ideally will get replaced with external dep
// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
var testPassiveEventSupport = function testPassiveEventSupport() {
    if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
        return;
    }
    var passive = false;
    var options = Object.defineProperty({}, 'passive', {
        get: function get() {
            passive = true;
        }
    });
    var noop = function noop() {};
    window.addEventListener('testPassiveEventSupport', noop, options);
    window.removeEventListener('testPassiveEventSupport', noop, options);
    return passive;
};
function autoInc(seed) {
    if (seed === void 0) {
        seed = 0;
    }
    return function() {
        return ++seed;
    };
}
var uid = autoInc();
var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = [
    'touchstart',
    'touchmove'
];
var IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';
/**
 * Options for addEventHandler and removeEventHandler
 */ function getEventHandlerOptions(instance, eventName) {
    var handlerOptions = {};
    var isTouchEvent = touchEvents.indexOf(eventName) !== -1;
    if (isTouchEvent && passiveEventSupport) {
        handlerOptions.passive = !instance.props.preventDefault;
    }
    return handlerOptions;
}
/**
 * This function generates the HOC function that you'll use
 * in order to impart onOutsideClick listening to an
 * arbitrary component. It gets called at the end of the
 * bootstrapping code to yield an instance of the
 * onClickOutsideHOC function defined inside setupHOC().
 */ function onClickOutsideHOC(WrappedComponent, config) {
    var _class, _temp;
    var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    return _temp = _class = /*#__PURE__*/ function(_Component) {
        _inheritsLoose(onClickOutside, _Component);
        function onClickOutside(props) {
            var _this;
            _this = _Component.call(this, props) || this;
            _this.__outsideClickHandler = function(event) {
                if (typeof _this.__clickOutsideHandlerProp === 'function') {
                    _this.__clickOutsideHandlerProp(event);
                    return;
                }
                var instance = _this.getInstance();
                if (typeof instance.props.handleClickOutside === 'function') {
                    instance.props.handleClickOutside(event);
                    return;
                }
                if (typeof instance.handleClickOutside === 'function') {
                    instance.handleClickOutside(event);
                    return;
                }
                throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
            };
            _this.__getComponentNode = function() {
                var instance = _this.getInstance();
                if (config && typeof config.setClickOutsideRef === 'function') {
                    return config.setClickOutsideRef()(instance);
                }
                if (typeof instance.setClickOutsideRef === 'function') {
                    return instance.setClickOutsideRef();
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findDOMNode"])(instance);
            };
            _this.enableOnClickOutside = function() {
                if (typeof document === 'undefined' || enabledInstances[_this._uid]) {
                    return;
                }
                if (typeof passiveEventSupport === 'undefined') {
                    passiveEventSupport = testPassiveEventSupport();
                }
                enabledInstances[_this._uid] = true;
                var events = _this.props.eventTypes;
                if (!events.forEach) {
                    events = [
                        events
                    ];
                }
                handlersMap[_this._uid] = function(event) {
                    if (_this.componentNode === null) return;
                    if (_this.initTimeStamp > event.timeStamp) return;
                    if (_this.props.preventDefault) {
                        event.preventDefault();
                    }
                    if (_this.props.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
                    var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;
                    if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
                        return;
                    }
                    _this.__outsideClickHandler(event);
                };
                events.forEach(function(eventName) {
                    document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
                });
            };
            _this.disableOnClickOutside = function() {
                delete enabledInstances[_this._uid];
                var fn = handlersMap[_this._uid];
                if (fn && typeof document !== 'undefined') {
                    var events = _this.props.eventTypes;
                    if (!events.forEach) {
                        events = [
                            events
                        ];
                    }
                    events.forEach(function(eventName) {
                        return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
                    });
                    delete handlersMap[_this._uid];
                }
            };
            _this.getRef = function(ref) {
                return _this.instanceRef = ref;
            };
            _this._uid = uid();
            _this.initTimeStamp = performance.now();
            return _this;
        }
        /**
     * Access the WrappedComponent's instance.
     */ var _proto = onClickOutside.prototype;
        _proto.getInstance = function getInstance() {
            if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
                return this;
            }
            var ref = this.instanceRef;
            return ref.getInstance ? ref.getInstance() : ref;
        };
        /**
     * Add click listeners to the current document,
     * linked to this component's state.
     */ _proto.componentDidMount = function componentDidMount() {
            // If we are in an environment without a DOM such
            // as shallow rendering or snapshots then we exit
            // early to prevent any unhandled errors being thrown.
            if (typeof document === 'undefined' || !document.createElement) {
                return;
            }
            var instance = this.getInstance();
            if (config && typeof config.handleClickOutside === 'function') {
                this.__clickOutsideHandlerProp = config.handleClickOutside(instance);
                if (typeof this.__clickOutsideHandlerProp !== 'function') {
                    throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
                }
            }
            this.componentNode = this.__getComponentNode(); // return early so we dont initiate onClickOutside
            if (this.props.disableOnClickOutside) return;
            this.enableOnClickOutside();
        };
        _proto.componentDidUpdate = function componentDidUpdate() {
            this.componentNode = this.__getComponentNode();
        };
        _proto.componentWillUnmount = function componentWillUnmount() {
            this.disableOnClickOutside();
        };
        /**
     * Pass-through render
     */ _proto.render = function render() {
            // eslint-disable-next-line no-unused-vars
            var _this$props = this.props;
            _this$props.excludeScrollbar;
            var props = _objectWithoutPropertiesLoose(_this$props, [
                "excludeScrollbar"
            ]);
            if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
                props.ref = this.getRef;
            } else {
                props.wrappedRef = this.getRef;
            }
            props.disableOnClickOutside = this.disableOnClickOutside;
            props.enableOnClickOutside = this.enableOnClickOutside;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(WrappedComponent, props);
        };
        return onClickOutside;
    }(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"]), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
        eventTypes: [
            'mousedown',
            'touchstart'
        ],
        excludeScrollbar: config && config.excludeScrollbar || false,
        outsideClickIgnoreClass: IGNORE_CLASS_NAME,
        preventDefault: false,
        stopPropagation: false
    }, _class.getClass = function() {
        return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
    }, _temp;
}
const __TURBOPACK__default__export__ = onClickOutsideHOC;
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getComputedStyle",
    ()=>getComputedStyle,
    "getContainingBlock",
    ()=>getContainingBlock,
    "getDocumentElement",
    ()=>getDocumentElement,
    "getNearestOverflowAncestor",
    ()=>getNearestOverflowAncestor,
    "getNodeName",
    ()=>getNodeName,
    "getNodeScroll",
    ()=>getNodeScroll,
    "getOverflowAncestors",
    ()=>getOverflowAncestors,
    "getParentNode",
    ()=>getParentNode,
    "getWindow",
    ()=>getWindow,
    "isContainingBlock",
    ()=>isContainingBlock,
    "isElement",
    ()=>isElement,
    "isHTMLElement",
    ()=>isHTMLElement,
    "isLastTraversableNode",
    ()=>isLastTraversableNode,
    "isNode",
    ()=>isNode,
    "isOverflowElement",
    ()=>isOverflowElement,
    "isShadowRoot",
    ()=>isShadowRoot,
    "isTableElement",
    ()=>isTableElement,
    "isWebKit",
    ()=>isWebKit
]);
function getNodeName(node) {
    if (isNode(node)) {
        return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
}
function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
        return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
    const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && ![
        'inline',
        'contents'
    ].includes(display);
}
function isTableElement(element) {
    return [
        'table',
        'td',
        'th'
    ].includes(getNodeName(element));
}
function isContainingBlock(element) {
    const webkit = isWebKit();
    const css = getComputedStyle(element);
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || [
        'transform',
        'perspective',
        'filter'
    ].some((value)=>(css.willChange || '').includes(value)) || [
        'paint',
        'layout',
        'strict',
        'content'
    ].some((value)=>(css.contain || '').includes(value));
}
function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while(isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)){
        if (isContainingBlock(currentNode)) {
            return currentNode;
        }
        currentNode = getParentNode(currentNode);
    }
    return null;
}
function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
    return [
        'html',
        'body',
        '#document'
    ].includes(getNodeName(node));
}
function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
    if (isElement(element)) {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
    }
    return {
        scrollLeft: element.pageXOffset,
        scrollTop: element.pageYOffset
    };
}
function getParentNode(node) {
    if (getNodeName(node) === 'html') {
        return node;
    }
    const result = // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
        return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
        return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
        list = [];
    }
    if (traverseIframes === void 0) {
        traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
        return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */ __turbopack_context__.s([
    "alignments",
    ()=>alignments,
    "clamp",
    ()=>clamp,
    "createCoords",
    ()=>createCoords,
    "evaluate",
    ()=>evaluate,
    "expandPaddingObject",
    ()=>expandPaddingObject,
    "floor",
    ()=>floor,
    "getAlignment",
    ()=>getAlignment,
    "getAlignmentAxis",
    ()=>getAlignmentAxis,
    "getAlignmentSides",
    ()=>getAlignmentSides,
    "getAxisLength",
    ()=>getAxisLength,
    "getExpandedPlacements",
    ()=>getExpandedPlacements,
    "getOppositeAlignmentPlacement",
    ()=>getOppositeAlignmentPlacement,
    "getOppositeAxis",
    ()=>getOppositeAxis,
    "getOppositeAxisPlacements",
    ()=>getOppositeAxisPlacements,
    "getOppositePlacement",
    ()=>getOppositePlacement,
    "getPaddingObject",
    ()=>getPaddingObject,
    "getSide",
    ()=>getSide,
    "getSideAxis",
    ()=>getSideAxis,
    "max",
    ()=>max,
    "min",
    ()=>min,
    "placements",
    ()=>placements,
    "rectToClientRect",
    ()=>rectToClientRect,
    "round",
    ()=>round,
    "sides",
    ()=>sides
]);
const sides = [
    'top',
    'right',
    'bottom',
    'left'
];
const alignments = [
    'start',
    'end'
];
const placements = /*#__PURE__*/ sides.reduce((acc, side)=>acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v)=>({
        x: v,
        y: v
    });
const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
};
const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
};
function clamp(start, value, end) {
    return max(start, min(value, end));
}
function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
    return placement.split('-')[0];
}
function getAlignment(placement) {
    return placement.split('-')[1];
}
function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
    return [
        'top',
        'bottom'
    ].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
        rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
        mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [
        mainAlignmentSide,
        getOppositePlacement(mainAlignmentSide)
    ];
}
function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [
        getOppositeAlignmentPlacement(placement),
        oppositePlacement,
        getOppositeAlignmentPlacement(oppositePlacement)
    ];
}
function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment)=>oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
    const lr = [
        'left',
        'right'
    ];
    const rl = [
        'right',
        'left'
    ];
    const tb = [
        'top',
        'bottom'
    ];
    const bt = [
        'bottom',
        'top'
    ];
    switch(side){
        case 'top':
        case 'bottom':
            if (rtl) return isStart ? rl : lr;
            return isStart ? lr : rl;
        case 'left':
        case 'right':
            return isStart ? tb : bt;
        default:
            return [];
    }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
        list = list.map((side)=>side + "-" + alignment);
        if (flipAlignment) {
            list = list.concat(list.map(getOppositeAlignmentPlacement));
        }
    }
    return list;
}
function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side)=>oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding
    };
}
function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
    };
}
function rectToClientRect(rect) {
    const { x, y, width, height } = rect;
    return {
        width,
        height,
        top: y,
        left: x,
        right: x + width,
        bottom: y + height,
        x,
        y
    };
}
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/core/dist/floating-ui.core.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrow",
    ()=>arrow,
    "autoPlacement",
    ()=>autoPlacement,
    "computePosition",
    ()=>computePosition,
    "detectOverflow",
    ()=>detectOverflow,
    "flip",
    ()=>flip,
    "hide",
    ()=>hide,
    "inline",
    ()=>inline,
    "limitShift",
    ()=>limitShift,
    "offset",
    ()=>offset,
    "shift",
    ()=>shift,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
;
;
function computeCoordsFromPlacement(_ref, placement, rtl) {
    let { reference, floating } = _ref;
    const sideAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(placement);
    const alignmentAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignmentAxis"])(placement);
    const alignLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAxisLength"])(alignmentAxis);
    const side = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch(side){
        case 'top':
            coords = {
                x: commonX,
                y: reference.y - floating.height
            };
            break;
        case 'bottom':
            coords = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;
        case 'right':
            coords = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;
        case 'left':
            coords = {
                x: reference.x - floating.width,
                y: commonY
            };
            break;
        default:
            coords = {
                x: reference.x,
                y: reference.y
            };
    }
    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement)){
        case 'start':
            coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
            break;
        case 'end':
            coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
            break;
    }
    return coords;
}
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */ const computePosition = async (reference, floating, config)=>{
    const { placement = 'bottom', strategy = 'absolute', middleware = [], platform } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
        reference,
        floating,
        strategy
    });
    let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for(let i = 0; i < validMiddleware.length; i++){
        const { name, fn } = validMiddleware[i];
        const { x: nextX, y: nextY, data, reset } = await fn({
            x,
            y,
            initialPlacement: placement,
            placement: statefulPlacement,
            strategy,
            middlewareData,
            rects,
            platform,
            elements: {
                reference,
                floating
            }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
            ...middlewareData,
            [name]: {
                ...middlewareData[name],
                ...data
            }
        };
        if (reset && resetCount <= 50) {
            resetCount++;
            if (typeof reset === 'object') {
                if (reset.placement) {
                    statefulPlacement = reset.placement;
                }
                if (reset.rects) {
                    rects = reset.rects === true ? await platform.getElementRects({
                        reference,
                        floating,
                        strategy
                    }) : reset.rects;
                }
                ({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
            }
            i = -1;
        }
    }
    return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
    };
};
/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */ async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
        options = {};
    }
    const { x, y, platform, rects, elements, strategy } = state;
    const { boundary = 'clippingAncestors', rootBoundary = 'viewport', elementContext = 'floating', altBoundary = false, padding = 0 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
    const paddingObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaddingObject"])(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])(await platform.getClippingRect({
        element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
        boundary,
        rootBoundary,
        strategy
    }));
    const rect = elementContext === 'floating' ? {
        x,
        y,
        width: rects.floating.width,
        height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    };
    const elementClientRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements,
        rect,
        offsetParent,
        strategy
    }) : rect);
    return {
        top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
        bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
        left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
        right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */ const arrow = (options)=>({
        name: 'arrow',
        options,
        async fn (state) {
            const { x, y, placement, rects, platform, elements, middlewareData } = state;
            // Since `element` is required, we don't Partial<> the type.
            const { element, padding = 0 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state) || {};
            if (element == null) {
                return {};
            }
            const paddingObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaddingObject"])(padding);
            const coords = {
                x,
                y
            };
            const axis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignmentAxis"])(placement);
            const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAxisLength"])(axis);
            const arrowDimensions = await platform.getDimensions(element);
            const isYAxis = axis === 'y';
            const minProp = isYAxis ? 'top' : 'left';
            const maxProp = isYAxis ? 'bottom' : 'right';
            const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
            const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
            const startDiff = coords[axis] - rects.reference[axis];
            const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
            let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
            // DOM platform can return `window` as the `offsetParent`.
            if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) {
                clientSize = elements.floating[clientProp] || rects.floating[length];
            }
            const centerToReference = endDiff / 2 - startDiff / 2;
            // If the padding is large enough that it causes the arrow to no longer be
            // centered, modify the padding so that it is centered.
            const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
            const minPadding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(paddingObject[minProp], largestPossiblePadding);
            const maxPadding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(paddingObject[maxProp], largestPossiblePadding);
            // Make sure the arrow doesn't overflow the floating element if the center
            // point is outside the floating element's bounds.
            const min$1 = minPadding;
            const max = clientSize - arrowDimensions[length] - maxPadding;
            const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
            const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(min$1, center, max);
            // If the reference is small enough that the arrow's padding causes it to
            // to point to nothing for an aligned placement, adjust the offset of the
            // floating element itself. To ensure `shift()` continues to take action,
            // a single reset is performed when this is true.
            const shouldAddOffset = !middlewareData.arrow && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
            const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
            return {
                [axis]: coords[axis] + alignmentOffset,
                data: {
                    [axis]: offset,
                    centerOffset: center - offset - alignmentOffset,
                    ...shouldAddOffset && {
                        alignmentOffset
                    }
                },
                reset: shouldAddOffset
            };
        }
    });
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [
        ...allowedPlacements.filter((placement)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) === alignment),
        ...allowedPlacements.filter((placement)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) !== alignment)
    ] : allowedPlacements.filter((placement)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter((placement)=>{
        if (alignment) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement) === alignment || (autoAlignment ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOppositeAlignmentPlacement"])(placement) !== placement : false);
        }
        return true;
    });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */ const autoPlacement = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'autoPlacement',
        options,
        async fn (state) {
            var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
            const { rects, middlewareData, placement, platform, elements } = state;
            const { crossAxis = false, alignment, allowedPlacements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["placements"], autoAlignment = true, ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            const placements$1 = alignment !== undefined || allowedPlacements === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["placements"] ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
            const currentPlacement = placements$1[currentIndex];
            if (currentPlacement == null) {
                return {};
            }
            const alignmentSides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignmentSides"])(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
            // Make `computeCoords` start from the right place.
            if (placement !== currentPlacement) {
                return {
                    reset: {
                        placement: placements$1[0]
                    }
                };
            }
            const currentOverflows = [
                overflow[(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(currentPlacement)],
                overflow[alignmentSides[0]],
                overflow[alignmentSides[1]]
            ];
            const allOverflows = [
                ...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [],
                {
                    placement: currentPlacement,
                    overflows: currentOverflows
                }
            ];
            const nextPlacement = placements$1[currentIndex + 1];
            // There are more placements to check.
            if (nextPlacement) {
                return {
                    data: {
                        index: currentIndex + 1,
                        overflows: allOverflows
                    },
                    reset: {
                        placement: nextPlacement
                    }
                };
            }
            const placementsSortedByMostSpace = allOverflows.map((d)=>{
                const alignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(d.placement);
                return [
                    d.placement,
                    alignment && crossAxis ? // Check along the mainAxis and main crossAxis side.
                    d.overflows.slice(0, 2).reduce((acc, v)=>acc + v, 0) : // Check only the mainAxis.
                    d.overflows[0],
                    d.overflows
                ];
            }).sort((a, b)=>a[1] - b[1]);
            const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d)=>d[2].slice(0, // Aligned placements should not check their opposite crossAxis
                // side.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(d[0]) ? 2 : 3).every((v)=>v <= 0));
            const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
            if (resetPlacement !== placement) {
                return {
                    data: {
                        index: currentIndex + 1,
                        overflows: allOverflows
                    },
                    reset: {
                        placement: resetPlacement
                    }
                };
            }
            return {};
        }
    };
};
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */ const flip = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'flip',
        options,
        async fn (state) {
            var _middlewareData$arrow, _middlewareData$flip;
            const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
            const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = 'bestFit', fallbackAxisSideDirection = 'none', flipAlignment = true, ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            // If a reset by the arrow was caused due to an alignment offset being
            // added, we should skip any logic now since `flip()` has already done its
            // work.
            // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
            if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
                return {};
            }
            const side = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement);
            const isBasePlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(initialPlacement) === initialPlacement;
            const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
            const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOppositePlacement"])(initialPlacement)
            ] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExpandedPlacements"])(initialPlacement));
            if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
                fallbackPlacements.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOppositeAxisPlacements"])(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
            }
            const placements = [
                initialPlacement,
                ...fallbackPlacements
            ];
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const overflows = [];
            let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
            if (checkMainAxis) {
                overflows.push(overflow[side]);
            }
            if (checkCrossAxis) {
                const sides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignmentSides"])(placement, rects, rtl);
                overflows.push(overflow[sides[0]], overflow[sides[1]]);
            }
            overflowsData = [
                ...overflowsData,
                {
                    placement,
                    overflows
                }
            ];
            // One or more sides is overflowing.
            if (!overflows.every((side)=>side <= 0)) {
                var _middlewareData$flip2, _overflowsData$filter;
                const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
                const nextPlacement = placements[nextIndex];
                if (nextPlacement) {
                    // Try next placement and re-run the lifecycle.
                    return {
                        data: {
                            index: nextIndex,
                            overflows: overflowsData
                        },
                        reset: {
                            placement: nextPlacement
                        }
                    };
                }
                // First, find the candidates that fit on the mainAxis side of overflow,
                // then find the placement that fits the best on the main crossAxis side.
                let resetPlacement = (_overflowsData$filter = overflowsData.filter((d)=>d.overflows[0] <= 0).sort((a, b)=>a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
                // Otherwise fallback.
                if (!resetPlacement) {
                    switch(fallbackStrategy){
                        case 'bestFit':
                            {
                                var _overflowsData$map$so;
                                const placement = (_overflowsData$map$so = overflowsData.map((d)=>[
                                        d.placement,
                                        d.overflows.filter((overflow)=>overflow > 0).reduce((acc, overflow)=>acc + overflow, 0)
                                    ]).sort((a, b)=>a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                                if (placement) {
                                    resetPlacement = placement;
                                }
                                break;
                            }
                        case 'initialPlacement':
                            resetPlacement = initialPlacement;
                            break;
                    }
                }
                if (placement !== resetPlacement) {
                    return {
                        reset: {
                            placement: resetPlacement
                        }
                    };
                }
            }
            return {};
        }
    };
};
function getSideOffsets(overflow, rect) {
    return {
        top: overflow.top - rect.height,
        right: overflow.right - rect.width,
        bottom: overflow.bottom - rect.height,
        left: overflow.left - rect.width
    };
}
function isAnySideFullyClipped(overflow) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sides"].some((side)=>overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */ const hide = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'hide',
        options,
        async fn (state) {
            const { rects } = state;
            const { strategy = 'referenceHidden', ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            switch(strategy){
                case 'referenceHidden':
                    {
                        const overflow = await detectOverflow(state, {
                            ...detectOverflowOptions,
                            elementContext: 'reference'
                        });
                        const offsets = getSideOffsets(overflow, rects.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: offsets,
                                referenceHidden: isAnySideFullyClipped(offsets)
                            }
                        };
                    }
                case 'escaped':
                    {
                        const overflow = await detectOverflow(state, {
                            ...detectOverflowOptions,
                            altBoundary: true
                        });
                        const offsets = getSideOffsets(overflow, rects.floating);
                        return {
                            data: {
                                escapedOffsets: offsets,
                                escaped: isAnySideFullyClipped(offsets)
                            }
                        };
                    }
                default:
                    {
                        return {};
                    }
            }
        }
    };
};
function getBoundingRect(rects) {
    const minX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(...rects.map((rect)=>rect.left));
    const minY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(...rects.map((rect)=>rect.top));
    const maxX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(...rects.map((rect)=>rect.right));
    const maxY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(...rects.map((rect)=>rect.bottom));
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}
function getRectsByLine(rects) {
    const sortedRects = rects.slice().sort((a, b)=>a.y - b.y);
    const groups = [];
    let prevRect = null;
    for(let i = 0; i < sortedRects.length; i++){
        const rect = sortedRects[i];
        if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
            groups.push([
                rect
            ]);
        } else {
            groups[groups.length - 1].push(rect);
        }
        prevRect = rect;
    }
    return groups.map((rect)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */ const inline = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'inline',
        options,
        async fn (state) {
            const { placement, elements, rects, platform, strategy } = state;
            // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
            // ClientRect's bounds, despite the event listener being triggered. A
            // padding of 2 seems to handle this issue.
            const { padding = 2, x, y } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            const nativeClientRects = Array.from(await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference)) || []);
            const clientRects = getRectsByLine(nativeClientRects);
            const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])(getBoundingRect(nativeClientRects));
            const paddingObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaddingObject"])(padding);
            function getBoundingClientRect() {
                // There are two rects and they are disjoined.
                if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
                    // Find the first rect in which the point is fully inside.
                    return clientRects.find((rect)=>x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
                }
                // There are 2 or more connected rects.
                if (clientRects.length >= 2) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(placement) === 'y') {
                        const firstRect = clientRects[0];
                        const lastRect = clientRects[clientRects.length - 1];
                        const isTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement) === 'top';
                        const top = firstRect.top;
                        const bottom = lastRect.bottom;
                        const left = isTop ? firstRect.left : lastRect.left;
                        const right = isTop ? firstRect.right : lastRect.right;
                        const width = right - left;
                        const height = bottom - top;
                        return {
                            top,
                            bottom,
                            left,
                            right,
                            width,
                            height,
                            x: left,
                            y: top
                        };
                    }
                    const isLeftSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement) === 'left';
                    const maxRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(...clientRects.map((rect)=>rect.right));
                    const minLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(...clientRects.map((rect)=>rect.left));
                    const measureRects = clientRects.filter((rect)=>isLeftSide ? rect.left === minLeft : rect.right === maxRight);
                    const top = measureRects[0].top;
                    const bottom = measureRects[measureRects.length - 1].bottom;
                    const left = minLeft;
                    const right = maxRight;
                    const width = right - left;
                    const height = bottom - top;
                    return {
                        top,
                        bottom,
                        left,
                        right,
                        width,
                        height,
                        x: left,
                        y: top
                    };
                }
                return fallback;
            }
            const resetRects = await platform.getElementRects({
                reference: {
                    getBoundingClientRect
                },
                floating: elements.floating,
                strategy
            });
            if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
                return {
                    reset: {
                        rects: resetRects
                    }
                };
            }
            return {};
        }
    };
};
// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
    const { placement, platform, elements } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement);
    const alignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement);
    const isVertical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(placement) === 'y';
    const mainAxisMulti = [
        'left',
        'top'
    ].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
    // eslint-disable-next-line prefer-const
    let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === 'number' ? {
        mainAxis: rawValue,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: 0,
        crossAxis: 0,
        alignmentAxis: null,
        ...rawValue
    };
    if (alignment && typeof alignmentAxis === 'number') {
        crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
    } : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
    };
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */ const offset = function(options) {
    if (options === void 0) {
        options = 0;
    }
    return {
        name: 'offset',
        options,
        async fn (state) {
            var _middlewareData$offse, _middlewareData$arrow;
            const { x, y, placement, middlewareData } = state;
            const diffCoords = await convertValueToCoords(state, options);
            // If the placement is the same and the arrow caused an alignment offset
            // then we don't need to change the positioning coordinates.
            if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
                return {};
            }
            return {
                x: x + diffCoords.x,
                y: y + diffCoords.y,
                data: {
                    ...diffCoords,
                    placement
                }
            };
        }
    };
};
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */ const shift = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'shift',
        options,
        async fn (state) {
            const { x, y, placement } = state;
            const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = {
                fn: (_ref)=>{
                    let { x, y } = _ref;
                    return {
                        x,
                        y
                    };
                }
            }, ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            const coords = {
                x,
                y
            };
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const crossAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement));
            const mainAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOppositeAxis"])(crossAxis);
            let mainAxisCoord = coords[mainAxis];
            let crossAxisCoord = coords[crossAxis];
            if (checkMainAxis) {
                const minSide = mainAxis === 'y' ? 'top' : 'left';
                const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
                const min = mainAxisCoord + overflow[minSide];
                const max = mainAxisCoord - overflow[maxSide];
                mainAxisCoord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(min, mainAxisCoord, max);
            }
            if (checkCrossAxis) {
                const minSide = crossAxis === 'y' ? 'top' : 'left';
                const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
                const min = crossAxisCoord + overflow[minSide];
                const max = crossAxisCoord - overflow[maxSide];
                crossAxisCoord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(min, crossAxisCoord, max);
            }
            const limitedCoords = limiter.fn({
                ...state,
                [mainAxis]: mainAxisCoord,
                [crossAxis]: crossAxisCoord
            });
            return {
                ...limitedCoords,
                data: {
                    x: limitedCoords.x - x,
                    y: limitedCoords.y - y
                }
            };
        }
    };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */ const limitShift = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        options,
        fn (state) {
            const { x, y, placement, rects, middlewareData } = state;
            const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            const coords = {
                x,
                y
            };
            const crossAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(placement);
            const mainAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOppositeAxis"])(crossAxis);
            let mainAxisCoord = coords[mainAxis];
            let crossAxisCoord = coords[crossAxis];
            const rawOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(offset, state);
            const computedOffset = typeof rawOffset === 'number' ? {
                mainAxis: rawOffset,
                crossAxis: 0
            } : {
                mainAxis: 0,
                crossAxis: 0,
                ...rawOffset
            };
            if (checkMainAxis) {
                const len = mainAxis === 'y' ? 'height' : 'width';
                const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
                const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
                if (mainAxisCoord < limitMin) {
                    mainAxisCoord = limitMin;
                } else if (mainAxisCoord > limitMax) {
                    mainAxisCoord = limitMax;
                }
            }
            if (checkCrossAxis) {
                var _middlewareData$offse, _middlewareData$offse2;
                const len = mainAxis === 'y' ? 'width' : 'height';
                const isOriginSide = [
                    'top',
                    'left'
                ].includes((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement));
                const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
                const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
                if (crossAxisCoord < limitMin) {
                    crossAxisCoord = limitMin;
                } else if (crossAxisCoord > limitMax) {
                    crossAxisCoord = limitMax;
                }
            }
            return {
                [mainAxis]: mainAxisCoord,
                [crossAxis]: crossAxisCoord
            };
        }
    };
};
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */ const size = function(options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: 'size',
        options,
        async fn (state) {
            const { placement, rects, platform, elements } = state;
            const { apply = ()=>{}, ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options, state);
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const side = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSide"])(placement);
            const alignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlignment"])(placement);
            const isYAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSideAxis"])(placement) === 'y';
            const { width, height } = rects.floating;
            let heightSide;
            let widthSide;
            if (side === 'top' || side === 'bottom') {
                heightSide = side;
                widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? 'start' : 'end') ? 'left' : 'right';
            } else {
                widthSide = side;
                heightSide = alignment === 'end' ? 'top' : 'bottom';
            }
            const maximumClippingHeight = height - overflow.top - overflow.bottom;
            const maximumClippingWidth = width - overflow.left - overflow.right;
            const overflowAvailableHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(height - overflow[heightSide], maximumClippingHeight);
            const overflowAvailableWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(width - overflow[widthSide], maximumClippingWidth);
            const noShift = !state.middlewareData.shift;
            let availableHeight = overflowAvailableHeight;
            let availableWidth = overflowAvailableWidth;
            if (isYAxis) {
                availableWidth = alignment || noShift ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
            } else {
                availableHeight = alignment || noShift ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
            }
            if (noShift && !alignment) {
                const xMin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.left, 0);
                const xMax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.right, 0);
                const yMin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.top, 0);
                const yMax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.bottom, 0);
                if (isYAxis) {
                    availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.left, overflow.right));
                } else {
                    availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(overflow.top, overflow.bottom));
                }
            }
            await apply({
                ...state,
                availableWidth,
                availableHeight
            });
            const nextDimensions = await platform.getDimensions(elements.floating);
            if (width !== nextDimensions.width || height !== nextDimensions.height) {
                return {
                    reset: {
                        rects: true
                    }
                };
            }
            return {};
        }
    };
};
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrow",
    ()=>arrow,
    "autoPlacement",
    ()=>autoPlacement,
    "autoUpdate",
    ()=>autoUpdate,
    "computePosition",
    ()=>computePosition,
    "detectOverflow",
    ()=>detectOverflow,
    "flip",
    ()=>flip,
    "hide",
    ()=>hide,
    "inline",
    ()=>inline,
    "limitShift",
    ()=>limitShift,
    "offset",
    ()=>offset,
    "platform",
    ()=>platform,
    "shift",
    ()=>shift,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/core/dist/floating-ui.core.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
;
;
;
function getCssDimensions(element) {
    const css = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(width) !== offsetWidth || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(height) !== offsetHeight;
    if (shouldFallback) {
        width = offsetWidth;
        height = offsetHeight;
    }
    return {
        width,
        height,
        $: shouldFallback
    };
}
function unwrapElement(element) {
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(element) ? element.contextElement : element;
}
function getScale(element) {
    const domElement = unwrapElement(element);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domElement)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(1);
    }
    const rect = domElement.getBoundingClientRect();
    const { width, height, $ } = getCssDimensions(domElement);
    let x = ($ ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(rect.width) : rect.width) / width;
    let y = ($ ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(rect.height) : rect.height) / height;
    // 0, NaN, or Infinity should always fallback to 1.
    if (!x || !Number.isFinite(x)) {
        x = 1;
    }
    if (!y || !Number.isFinite(y)) {
        y = 1;
    }
    return {
        x,
        y
    };
}
const noOffsets = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(0);
function getVisualOffsets(element) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(element);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"])() || !win.visualViewport) {
        return noOffsets;
    }
    return {
        x: win.visualViewport.offsetLeft,
        y: win.visualViewport.offsetTop
    };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
        isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(element)) {
        return false;
    }
    return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
        includeScale = false;
    }
    if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(1);
    if (includeScale) {
        if (offsetParent) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(offsetParent)) {
                scale = getScale(offsetParent);
            }
        } else {
            scale = getScale(element);
        }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
        const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(domElement);
        const offsetWin = offsetParent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(offsetParent) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(offsetParent) : offsetParent;
        let currentWin = win;
        let currentIFrame = currentWin.frameElement;
        while(currentIFrame && offsetParent && offsetWin !== currentWin){
            const iframeScale = getScale(currentIFrame);
            const iframeRect = currentIFrame.getBoundingClientRect();
            const css = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(currentIFrame);
            const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
            const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
            x *= iframeScale.x;
            y *= iframeScale.y;
            width *= iframeScale.x;
            height *= iframeScale.y;
            x += left;
            y += top;
            currentWin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(currentIFrame);
            currentIFrame = currentWin.frameElement;
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])({
        width,
        height,
        x,
        y
    });
}
const topLayerSelectors = [
    ':popover-open',
    ':modal'
];
function isTopLayer(element) {
    return topLayerSelectors.some((selector)=>{
        try {
            return element.matches(selector);
        } catch (e) {
            return false;
        }
    });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let { elements, rect, offsetParent, strategy } = _ref;
    const isFixed = strategy === 'fixed';
    const documentElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
        return rect;
    }
    let scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    let scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(1);
    const offsets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(0);
    const isOffsetParentAnElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(offsetParent) !== 'body' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOverflowElement"])(documentElement)) {
            scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeScroll"])(offsetParent);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(offsetParent)) {
            const offsetRect = getBoundingClientRect(offsetParent);
            scale = getScale(offsetParent);
            offsets.x = offsetRect.x + offsetParent.clientLeft;
            offsets.y = offsetRect.y + offsetParent.clientTop;
        }
    }
    return {
        width: rect.width * scale.x,
        height: rect.height * scale.y,
        x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
        y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
}
function getClientRects(element) {
    return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(element)).left + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeScroll"])(element).scrollLeft;
}
// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(element);
    const scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeScroll"])(element);
    const body = element.ownerDocument.body;
    const width = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(body).direction === 'rtl') {
        x += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(html.clientWidth, body.clientWidth) - width;
    }
    return {
        width,
        height,
        x,
        y
    };
}
function getViewportRect(element, strategy) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(element);
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        const visualViewportBased = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"])();
        if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width,
        height,
        x,
        y
    };
}
// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) ? getScale(element) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
        width,
        height,
        x,
        y
    };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
        rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
        rect = getDocumentRect((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(element));
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(clippingAncestor)) {
        rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
        const visualOffsets = getVisualOffsets(element);
        rect = {
            ...clippingAncestor,
            x: clippingAncestor.x - visualOffsets.x,
            y: clippingAncestor.y - visualOffsets.y
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectToClientRect"])(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(element);
    if (parentNode === stopNode || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(parentNode) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(parentNode)) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}
// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
        return cachedResult;
    }
    let result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(element, [], false).filter((el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(el) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element).position === 'fixed';
    let currentNode = elementIsFixed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(element) : element;
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(currentNode) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(currentNode)){
        const computedStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(currentNode);
        const currentNodeIsContaining = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainingBlock"])(currentNode);
        if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
            currentContainingBlockComputedStyle = null;
        }
        const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && [
            'absolute',
            'fixed'
        ].includes(currentContainingBlockComputedStyle.position) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOverflowElement"])(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
        if (shouldDropCurrentNode) {
            // Drop non-containing blocks.
            result = result.filter((ancestor)=>ancestor !== currentNode);
        } else {
            // Record last containing block for next iteration.
            currentContainingBlockComputedStyle = computedStyle;
        }
        currentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(currentNode);
    }
    cache.set(element, result);
    return result;
}
// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
    let { element, boundary, rootBoundary, strategy } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [
        ...elementClippingAncestors,
        rootBoundary
    ];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor)=>{
        const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
        accRect.top = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(rect.top, accRect.top);
        accRect.right = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(rect.right, accRect.right);
        accRect.bottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(rect.bottom, accRect.bottom);
        accRect.left = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(rect.left, accRect.left);
        return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
        width: clippingRect.right - clippingRect.left,
        height: clippingRect.bottom - clippingRect.top,
        x: clippingRect.left,
        y: clippingRect.top
    };
}
function getDimensions(element) {
    const { width, height } = getCssDimensions(element);
    return {
        width,
        height
    };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(offsetParent);
    const documentElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const offsets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCoords"])(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(offsetParent) !== 'body' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOverflowElement"])(documentElement)) {
            scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeScroll"])(offsetParent);
        }
        if (isOffsetParentAnElement) {
            const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
            offsets.x = offsetRect.x + offsetParent.clientLeft;
            offsets.y = offsetRect.y + offsetParent.clientTop;
        } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
        }
    }
    const x = rect.left + scroll.scrollLeft - offsets.x;
    const y = rect.top + scroll.scrollTop - offsets.y;
    return {
        x,
        y,
        width: rect.width,
        height: rect.height
    };
}
function isStaticPositioned(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element).position === 'static';
}
function getTrueOffsetParent(element, polyfill) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element).position === 'fixed') {
        return null;
    }
    if (polyfill) {
        return polyfill(element);
    }
    return element.offsetParent;
}
// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(element);
    if (isTopLayer(element)) {
        return win;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element)) {
        let svgOffsetParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(element);
        while(svgOffsetParent && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(svgOffsetParent)){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
                return svgOffsetParent;
            }
            svgOffsetParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(svgOffsetParent);
        }
        return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while(offsetParent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTableElement"])(offsetParent) && isStaticPositioned(offsetParent)){
        offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(offsetParent) && isStaticPositioned(offsetParent) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainingBlock"])(offsetParent)) {
        return win;
    }
    return offsetParent || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContainingBlock"])(element) || win;
}
const getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
            x: 0,
            y: 0,
            width: floatingDimensions.width,
            height: floatingDimensions.height
        }
    };
};
function isRTL(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(element).direction === 'rtl';
}
const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"],
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"],
    isRTL
};
// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocumentElement"])(element);
    function cleanup() {
        var _io;
        clearTimeout(timeoutId);
        (_io = io) == null || _io.disconnect();
        io = null;
    }
    function refresh(skip, threshold) {
        if (skip === void 0) {
            skip = false;
        }
        if (threshold === void 0) {
            threshold = 1;
        }
        cleanup();
        const { left, top, width, height } = element.getBoundingClientRect();
        if (!skip) {
            onMove();
        }
        if (!width || !height) {
            return;
        }
        const insetTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(top);
        const insetRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(root.clientWidth - (left + width));
        const insetBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(root.clientHeight - (top + height));
        const insetLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(left);
        const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
        const options = {
            rootMargin,
            threshold: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(1, threshold)) || 1
        };
        let isFirstUpdate = true;
        function handleObserve(entries) {
            const ratio = entries[0].intersectionRatio;
            if (ratio !== threshold) {
                if (!isFirstUpdate) {
                    return refresh();
                }
                if (!ratio) {
                    // If the reference is clipped, the ratio is 0. Throttle the refresh
                    // to prevent an infinite loop of updates.
                    timeoutId = setTimeout(()=>{
                        refresh(false, 1e-7);
                    }, 1000);
                } else {
                    refresh(false, ratio);
                }
            }
            isFirstUpdate = false;
        }
        // Older browsers don't support a `document` as the root and will throw an
        // error.
        try {
            io = new IntersectionObserver(handleObserve, {
                ...options,
                // Handle <iframe>s
                root: root.ownerDocument
            });
        } catch (e) {
            io = new IntersectionObserver(handleObserve, options);
        }
        io.observe(element);
    }
    refresh(true);
    return cleanup;
}
/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */ function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
        options = {};
    }
    const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === 'function', layoutShift = typeof IntersectionObserver === 'function', animationFrame = false } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [
        ...referenceEl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(referenceEl) : [],
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(floating)
    ] : [];
    ancestors.forEach((ancestor)=>{
        ancestorScroll && ancestor.addEventListener('scroll', update, {
            passive: true
        });
        ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
        resizeObserver = new ResizeObserver((_ref)=>{
            let [firstEntry] = _ref;
            if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
                // Prevent update loops when using the `size` middleware.
                // https://github.com/floating-ui/floating-ui/issues/1740
                resizeObserver.unobserve(floating);
                cancelAnimationFrame(reobserveFrame);
                reobserveFrame = requestAnimationFrame(()=>{
                    var _resizeObserver;
                    (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
                });
            }
            update();
        });
        if (referenceEl && !animationFrame) {
            resizeObserver.observe(referenceEl);
        }
        resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
        frameLoop();
    }
    function frameLoop() {
        const nextRefRect = getBoundingClientRect(reference);
        if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
            update();
        }
        prevRefRect = nextRefRect;
        frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return ()=>{
        var _resizeObserver2;
        ancestors.forEach((ancestor)=>{
            ancestorScroll && ancestor.removeEventListener('scroll', update);
            ancestorResize && ancestor.removeEventListener('resize', update);
        });
        cleanupIo == null || cleanupIo();
        (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
        resizeObserver = null;
        if (animationFrame) {
            cancelAnimationFrame(frameId);
        }
    };
}
/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */ const detectOverflow = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectOverflow"];
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */ const offset = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"];
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */ const autoPlacement = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoPlacement"];
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */ const shift = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"];
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */ const flip = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"];
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */ const size = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"];
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */ const hide = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hide"];
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */ const arrow = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["arrow"];
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */ const inline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["inline"];
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */ const limitShift = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limitShift"];
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */ const computePosition = (reference, floating, options)=>{
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
        platform,
        ...options
    };
    const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$core$2f$dist$2f$floating$2d$ui$2e$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computePosition"])(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
    });
};
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrow",
    ()=>arrow,
    "autoPlacement",
    ()=>autoPlacement,
    "flip",
    ()=>flip,
    "hide",
    ()=>hide,
    "inline",
    ()=>inline,
    "limitShift",
    ()=>limitShift,
    "offset",
    ()=>offset,
    "shift",
    ()=>shift,
    "size",
    ()=>size,
    "useFloating",
    ()=>useFloating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
;
;
;
;
var index = typeof document !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        return false;
    }
    if (typeof a === 'function' && a.toString() === b.toString()) {
        return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === 'object') {
        if (Array.isArray(a)) {
            length = a.length;
            if (length !== b.length) return false;
            for(i = length; i-- !== 0;){
                if (!deepEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }
        for(i = length; i-- !== 0;){
            if (!({}).hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }
        for(i = length; i-- !== 0;){
            const key = keys[i];
            if (key === '_owner' && a.$$typeof) {
                continue;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return a !== a && b !== b;
}
function getDPR(element) {
    if (typeof window === 'undefined') {
        return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](value);
    index(()=>{
        ref.current = value;
    });
    return ref;
}
/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */ function useFloating(options) {
    if (options === void 0) {
        options = {};
    }
    const { placement = 'bottom', strategy = 'absolute', middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        x: 0,
        y: 0,
        strategy,
        placement,
        middlewareData: {},
        isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
        setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [_floating, _setFloating] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const setReference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[setReference]": (node)=>{
            if (node !== referenceRef.current) {
                referenceRef.current = node;
                _setReference(node);
            }
        }
    }["useFloating.useCallback[setReference]"], []);
    const setFloating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[setFloating]": (node)=>{
            if (node !== floatingRef.current) {
                floatingRef.current = node;
                _setFloating(node);
            }
        }
    }["useFloating.useCallback[setFloating]"], []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const floatingRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const dataRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform);
    const update = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFloating.useCallback[update]": ()=>{
            if (!referenceRef.current || !floatingRef.current) {
                return;
            }
            const config = {
                placement,
                strategy,
                middleware: latestMiddleware
            };
            if (platformRef.current) {
                config.platform = platformRef.current;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computePosition"])(referenceRef.current, floatingRef.current, config).then({
                "useFloating.useCallback[update]": (data)=>{
                    const fullData = {
                        ...data,
                        isPositioned: true
                    };
                    if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
                        dataRef.current = fullData;
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                            "useFloating.useCallback[update]": ()=>{
                                setData(fullData);
                            }
                        }["useFloating.useCallback[update]"]);
                    }
                }
            }["useFloating.useCallback[update]"]);
        }
    }["useFloating.useCallback[update]"], [
        latestMiddleware,
        placement,
        strategy,
        platformRef
    ]);
    index(()=>{
        if (open === false && dataRef.current.isPositioned) {
            dataRef.current.isPositioned = false;
            setData((data)=>({
                    ...data,
                    isPositioned: false
                }));
        }
    }, [
        open
    ]);
    const isMountedRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    index(()=>{
        isMountedRef.current = true;
        return ()=>{
            isMountedRef.current = false;
        };
    }, []);
    index(()=>{
        if (referenceEl) referenceRef.current = referenceEl;
        if (floatingEl) floatingRef.current = floatingEl;
        if (referenceEl && floatingEl) {
            if (whileElementsMountedRef.current) {
                return whileElementsMountedRef.current(referenceEl, floatingEl, update);
            }
            update();
        }
    }, [
        referenceEl,
        floatingEl,
        update,
        whileElementsMountedRef,
        hasWhileElementsMounted
    ]);
    const refs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[refs]": ()=>({
                reference: referenceRef,
                floating: floatingRef,
                setReference,
                setFloating
            })
    }["useFloating.useMemo[refs]"], [
        setReference,
        setFloating
    ]);
    const elements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[elements]": ()=>({
                reference: referenceEl,
                floating: floatingEl
            })
    }["useFloating.useMemo[elements]"], [
        referenceEl,
        floatingEl
    ]);
    const floatingStyles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo[floatingStyles]": ()=>{
            const initialStyles = {
                position: strategy,
                left: 0,
                top: 0
            };
            if (!elements.floating) {
                return initialStyles;
            }
            const x = roundByDPR(elements.floating, data.x);
            const y = roundByDPR(elements.floating, data.y);
            if (transform) {
                return {
                    ...initialStyles,
                    transform: "translate(" + x + "px, " + y + "px)",
                    ...getDPR(elements.floating) >= 1.5 && {
                        willChange: 'transform'
                    }
                };
            }
            return {
                position: strategy,
                left: x,
                top: y
            };
        }
    }["useFloating.useMemo[floatingStyles]"], [
        strategy,
        transform,
        elements.floating,
        data.x,
        data.y
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFloating.useMemo": ()=>({
                ...data,
                update,
                refs,
                elements,
                floatingStyles
            })
    }["useFloating.useMemo"], [
        data,
        update,
        refs,
        elements,
        floatingStyles
    ]);
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */ const arrow$1 = (options)=>{
    function isRef(value) {
        return ({}).hasOwnProperty.call(value, 'current');
    }
    return {
        name: 'arrow',
        options,
        fn (state) {
            const { element, padding } = typeof options === 'function' ? options(state) : options;
            if (element && isRef(element)) {
                if (element.current != null) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["arrow"])({
                        element: element.current,
                        padding
                    }).fn(state);
                }
                return {};
            }
            if (element) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["arrow"])({
                    element,
                    padding
                }).fn(state);
            }
            return {};
        }
    };
};
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */ const offset = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */ const shift = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */ const limitShift = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limitShift"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */ const flip = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */ const size = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */ const autoPlacement = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoPlacement"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */ const hide = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hide"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */ const inline = (options, deps)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["inline"])(options),
        options: [
            options,
            deps
        ]
    });
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */ const arrow = (options, deps)=>({
        ...arrow$1(options),
        options: [
            options,
            deps
        ]
    });
;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/tabbable/dist/index.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/ // NOTE: separate `:not()` selectors has broader browser support than the newer
//  `:not([inert], [inert] *)` (Feb 2023)
// CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
//  the entire query to fail, resulting in no nodes found, which will break a lot
//  of things... so we have to rely on JS to identify nodes inside an inert container
__turbopack_context__.s([
    "focusable",
    ()=>focusable,
    "getTabIndex",
    ()=>getTabIndex,
    "isFocusable",
    ()=>isFocusable,
    "isTabbable",
    ()=>isTabbable,
    "tabbable",
    ()=>tabbable
]);
var candidateSelectors = [
    'input:not([inert])',
    'select:not([inert])',
    'textarea:not([inert])',
    'a[href]:not([inert])',
    'button:not([inert])',
    '[tabindex]:not(slot):not([inert])',
    'audio[controls]:not([inert])',
    'video[controls]:not([inert])',
    '[contenteditable]:not([contenteditable="false"]):not([inert])',
    'details>summary:first-of-type:not([inert])',
    'details:not([inert])'
];
var candidateSelector = /* #__PURE__ */ candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
    var _element$getRootNode;
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
/**
 * Determines if a node is inert or in an inert ancestor.
 * @param {Element} [node]
 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
 *  see if any of them are inert. If false, only `node` itself is considered.
 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
 *  False if `node` is falsy.
 */ var isInert = function isInert(node, lookUp) {
    var _node$getAttribute;
    if (lookUp === void 0) {
        lookUp = true;
    }
    // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
    //  JS API property; we have to check the attribute, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's an active element
    var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
    var inert = inertAtt === '' || inertAtt === 'true';
    // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
    //  if it weren't for `matches()` not being a function on shadow roots; the following
    //  code works for any kind of node
    // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
    //  so it likely would not support `:is([inert] *)` either...
    var result = inert || lookUp && node && isInert(node.parentNode); // recursive
    return result;
};
/**
 * Determines if a node's content is editable.
 * @param {Element} [node]
 * @returns True if it's content-editable; false if it's not or `node` is falsy.
 */ var isContentEditable = function isContentEditable(node) {
    var _node$getAttribute2;
    // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
    //  to use the attribute directly to check for this, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's a non-editable element
    var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
    return attValue === '' || attValue === 'true';
};
/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */ var getCandidates = function getCandidates(el, includeContainer, filter) {
    // even if `includeContainer=false`, we still have to check it for inertness because
    //  if it's inert, all its children are inert
    if (isInert(el)) {
        return [];
    }
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
};
/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */ /**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */ /**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */ /**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */ /**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */ var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while(elementsToCheck.length){
        var element = elementsToCheck.shift();
        if (isInert(element, false)) {
            continue;
        }
        if (element.tagName === 'SLOT') {
            // add shadow dom slot scope (slot itself cannot be focusable)
            var assigned = element.assignedElements();
            var content = assigned.length ? assigned : element.children;
            var nestedCandidates = getCandidatesIteratively(content, true, options);
            if (options.flatten) {
                candidates.push.apply(candidates, nestedCandidates);
            } else {
                candidates.push({
                    scopeParent: element,
                    candidates: nestedCandidates
                });
            }
        } else {
            // check candidate element
            var validCandidate = matches.call(element, candidateSelector);
            if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
                candidates.push(element);
            }
            // iterate over shadow content if possible
            var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
            typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
            // no inert look up because we're already drilling down and checking for inertness
            //  on the way down, so all containers to this root node should have already been
            //  vetted as non-inert
            var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
            if (shadowRoot && validShadowRoot) {
                // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
                //  shadow exists, so look at light dom children as fallback BUT create a scope for any
                //  child candidates found because they're likely slotted elements (elements that are
                //  children of the web component element (which has the shadow), in the light dom, but
                //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
                //  _after_ we return from this recursive call
                var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
                if (options.flatten) {
                    candidates.push.apply(candidates, _nestedCandidates);
                } else {
                    candidates.push({
                        scopeParent: element,
                        candidates: _nestedCandidates
                    });
                }
            } else {
                // there's not shadow so just dig into the element's (light dom) children
                //  __without__ giving the element special scope treatment
                elementsToCheck.unshift.apply(elementsToCheck, element.children);
            }
        }
    }
    return candidates;
};
/**
 * @private
 * Determines if the node has an explicitly specified `tabindex` attribute.
 * @param {HTMLElement} node
 * @returns {boolean} True if so; false if not.
 */ var hasTabIndex = function hasTabIndex(node) {
    return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};
/**
 * Determine the tab index of a given node.
 * @param {HTMLElement} node
 * @returns {number} Tab order (negative, 0, or positive number).
 * @throws {Error} If `node` is falsy.
 */ var getTabIndex = function getTabIndex(node) {
    if (!node) {
        throw new Error('No node provided');
    }
    if (node.tabIndex < 0) {
        // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
        // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
        // yet they are still part of the regular tab order; in FF, they get a default
        // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
        // order, consider their tab index to be 0.
        // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
        // so if they don't have a tabindex attribute specifically set, assume it's 0.
        if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
            return 0;
        }
    }
    return node.tabIndex;
};
/**
 * Determine the tab index of a given node __for sort order purposes__.
 * @param {HTMLElement} node
 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
 *  inserted into the correct sort position.
 * @returns {number} Tab order (negative, 0, or positive number).
 */ var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
    var tabIndex = getTabIndex(node);
    if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
        return 0;
    }
    return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
    return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
    return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
    var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === 'SUMMARY';
    });
    return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
    for(var i = 0; i < nodes.length; i++){
        if (nodes[i].checked && nodes[i].form === form) {
            return nodes[i];
        }
    }
};
var isTabbableRadio = function isTabbableRadio(node) {
    if (!node.name) {
        return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
        radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
        try {
            radioSet = queryRadios(node.name);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
            return false;
        }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
};
var isRadio = function isRadio(node) {
    return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
    return isRadio(node) && !isTabbableRadio(node);
};
// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
    var _nodeRoot;
    // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
    //  (but NOT _the_ document; see second 'If' comment below for more).
    // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
    //  is attached, and the one we need to check if it's in the document or not (because the
    //  shadow, and all nodes it contains, is never considered in the document since shadows
    //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
    //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
    //  visibility, including all the nodes it contains). The host could be any normal node,
    //  or a custom element (i.e. web component). Either way, that's the one that is considered
    //  part of the document, not the shadow root, nor any of its children (i.e. the node being
    //  tested).
    // To further complicate things, we have to look all the way up until we find a shadow HOST
    //  that is attached (or find none) because the node might be in nested shadows...
    // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
    //  document (per the docs) and while it's a Document-type object, that document does not
    //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
    //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
    //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
    //  node is actually detached.
    // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
    //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
    //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
    //  `ownerDocument` will be `null`, hence the optional chaining on it.
    var nodeRoot = node && getRootNode(node);
    var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
    // in some cases, a detached node will return itself as the root instead of a document or
    //  shadow root object, in which case, we shouldn't try to look further up the host chain
    var attached = false;
    if (nodeRoot && nodeRoot !== node) {
        var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
        attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
        while(!attached && nodeRootHost){
            var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
            // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
            //  which means we need to get the host's host and check if that parent host is contained
            //  in (i.e. attached to) the document
            nodeRoot = getRootNode(nodeRootHost);
            nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
            attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
        }
    }
    return attached;
};
var isZeroArea = function isZeroArea(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
    var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
    // NOTE: visibility will be `undefined` if node is detached from the document
    //  (see notes about this further down), which means we will consider it visible
    //  (this is legacy behavior from a very long way back)
    // NOTE: we check this regardless of `displayCheck="none"` because this is a
    //  _visibility_ check, not a _display_ check
    if (getComputedStyle(node).visibility === 'hidden') {
        return true;
    }
    var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
        return true;
    }
    if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
        if (typeof getShadowRoot === 'function') {
            // figure out if we should consider the node to be in an undisclosed shadow and use the
            //  'non-zero-area' fallback
            var originalNode = node;
            while(node){
                var parentElement = node.parentElement;
                var rootNode = getRootNode(node);
                if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
                ) {
                    // node has an undisclosed shadow which means we can only treat it as a black box, so we
                    //  fall back to a non-zero-area test
                    return isZeroArea(node);
                } else if (node.assignedSlot) {
                    // iterate up slot
                    node = node.assignedSlot;
                } else if (!parentElement && rootNode !== node.ownerDocument) {
                    // cross shadow boundary
                    node = rootNode.host;
                } else {
                    // iterate up normal dom
                    node = parentElement;
                }
            }
            node = originalNode;
        }
        // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
        //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
        //  it might be a falsy value, which means shadow DOM support is disabled
        // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
        //  now we can just test to see if it would normally be visible or not, provided it's
        //  attached to the main document.
        // NOTE: We must consider case where node is inside a shadow DOM and given directly to
        //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.
        if (isNodeAttached(node)) {
            // this works wherever the node is: if there's at least one client rect, it's
            //  somehow displayed; it also covers the CSS 'display: contents' case where the
            //  node itself is hidden in place of its contents; and there's no need to search
            //  up the hierarchy either
            return !node.getClientRects().length;
        }
        // Else, the node isn't attached to the document, which means the `getClientRects()`
        //  API will __always__ return zero rects (this can happen, for example, if React
        //  is used to render nodes onto a detached tree, as confirmed in this thread:
        //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
        //
        // It also means that even window.getComputedStyle(node).display will return `undefined`
        //  because styles are only computed for nodes that are in the document.
        //
        // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
        //  somehow. Though it was never stated officially, anyone who has ever used tabbable
        //  APIs on nodes in detached containers has actually implicitly used tabbable in what
        //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
        //  considering __everything__ to be visible because of the innability to determine styles.
        //
        // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
        //  nodes as visible with the 'none' fallback.__
        if (displayCheck !== 'legacy-full') {
            return true; // hidden
        }
    // else, fallback to 'none' mode and consider the node visible
    } else if (displayCheck === 'non-zero-area') {
        // NOTE: Even though this tests that the node's client rect is non-zero to determine
        //  whether it's displayed, and that a detached node will __always__ have a zero-area
        //  client rect, we don't special-case for whether the node is attached or not. In
        //  this mode, we do want to consider nodes that have a zero area to be hidden at all
        //  times, and that includes attached or not.
        return isZeroArea(node);
    }
    // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
    //  it's visible
    return false;
};
// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement;
        // check if `node` is contained in a disabled <fieldset>
        while(parentNode){
            if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
                // look for the first <legend> among the children of the disabled <fieldset>
                for(var i = 0; i < parentNode.children.length; i++){
                    var child = parentNode.children.item(i);
                    // when the first <legend> (in document order) is found
                    if (child.tagName === 'LEGEND') {
                        // if its parent <fieldset> is not nested in another disabled <fieldset>,
                        // return whether `node` is a descendant of its first <legend>
                        return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
                    }
                }
                // the disabled <fieldset> containing `node` has no <legend>
                return true;
            }
            parentNode = parentNode.parentElement;
        }
    }
    // else, node's tabbable/focusable state should not be affected by a fieldset's
    //  enabled/disabled state
    return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
    if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
    //  because we're limited in the type of selectors we can use in JSDom (see related
    //  note related to `candidateSelectors`)
    isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
    }
    return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
    if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
        return false;
    }
    return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
        return true;
    }
    // If a custom element has an explicit negative tabindex,
    // browsers will not allow tab targeting said element's children.
    return false;
};
/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */ var sortByOrder = function sortByOrder(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function(item, i) {
        var isScope = !!item.scopeParent;
        var element = isScope ? item.scopeParent : item;
        var candidateTabindex = getSortOrderTabIndex(element, isScope);
        var elements = isScope ? sortByOrder(item.candidates) : element;
        if (candidateTabindex === 0) {
            isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
        } else {
            orderedTabbables.push({
                documentOrder: i,
                tabIndex: candidateTabindex,
                item: item,
                isScope: isScope,
                content: elements
            });
        }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
    }, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([
            container
        ], options.includeContainer, {
            filter: isNodeMatchingSelectorTabbable.bind(null, options),
            flatten: false,
            getShadowRoot: options.getShadowRoot,
            shadowRootFilter: isValidShadowRootTabbable
        });
    } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([
            container
        ], options.includeContainer, {
            filter: isNodeMatchingSelectorFocusable.bind(null, options),
            flatten: true,
            getShadowRoot: options.getShadowRoot
        });
    } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
};
var isTabbable = function isTabbable(node, options) {
    options = options || {};
    if (!node) {
        throw new Error('No node provided');
    }
    if (matches.call(node, candidateSelector) === false) {
        return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */ candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
    options = options || {};
    if (!node) {
        throw new Error('No node provided');
    }
    if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
    }
    return isNodeMatchingSelectorFocusable(options, node);
};
;
 //# sourceMappingURL=index.esm.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-filepond/dist/react-filepond.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * react-filepond v7.1.2
 * A handy FilePond adapter component for React
 * 
 * Copyright (c) 2022 PQINA
 * https://pqina.nl/filepond
 * 
 * Licensed under the MIT license.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilePond = exports.FileStatus = exports.registerPlugin = undefined;
var _createClass = function() {
    function defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _react = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _react2 = _interopRequireDefault(_react);
var _filepond = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/filepond/dist/filepond.js [app-client] (ecmascript)");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
// Import required methods and styles from the FilePond module, should not need anything else
// We need to be able to call the registerPlugin method directly so we can add plugins
exports.registerPlugin = _filepond.registerPlugin;
exports.FileStatus = _filepond.FileStatus;
// Do this once
var isSupported = (0, _filepond.supported)();
// filtered methods
var filteredMethods = [
    "setOptions",
    "on",
    "off",
    "onOnce",
    "appendTo",
    "insertAfter",
    "insertBefore",
    "isAttachedTo",
    "replaceElement",
    "restoreElement",
    "destroy"
];
// The React <FilePond/> wrapper
var FilePond = exports.FilePond = function(_React$Component) {
    _inherits(FilePond, _React$Component);
    function FilePond(props) {
        _classCallCheck(this, FilePond);
        var _this = _possibleConstructorReturn(this, (FilePond.__proto__ || Object.getPrototypeOf(FilePond)).call(this, props));
        _this.allowFilesSync = true;
        return _this;
    }
    // Will setup FilePond instance when mounted
    _createClass(FilePond, [
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;
                // clone the input so we can restore it in unmount
                this._input = this._element.querySelector('input[type="file"]');
                this._inputClone = this._input.cloneNode();
                // exit here if not supported
                if (!isSupported) return;
                var options = Object.assign({}, this.props);
                // if onupdate files is defined, make sure setFiles does not cause race condition
                if (options.onupdatefiles) {
                    var cb = options.onupdatefiles;
                    options.onupdatefiles = function(items) {
                        _this2.allowFilesSync = false;
                        cb(items);
                    };
                }
                // Create our pond
                this._pond = (0, _filepond.create)(this._input, options);
                // Reference pond methods to FilePond component instance
                Object.keys(this._pond).filter(function(key) {
                    return !filteredMethods.includes(key);
                }).forEach(function(key) {
                    _this2[key] = _this2._pond[key];
                });
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                // exit when no pond defined
                if (!this._pond) return;
                // This fixed <Strict> errors
                // FilePond destroy is async so we have to move FilePond to a bin element so it can no longer affect current element tree as React unmount / mount is sync
                var bin = document.createElement("div");
                bin.append(this._pond.element);
                bin.id = "foo";
                // now we call destroy so FilePond can start it's destroy logic
                this._pond.destroy();
                this._pond = undefined;
                // we re-add the original file input element so everything is as it was before
                this._element.append(this._inputClone);
            }
        },
        {
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate() {
                if (!this.allowFilesSync) {
                    this.allowFilesSync = true;
                    return false;
                }
                return true;
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                // exit when no pond defined
                if (!this._pond) return;
                var options = Object.assign({}, this.props);
                // this is only set onces, on didmount
                delete options.onupdatefiles;
                // update pond options based on new props
                this._pond.setOptions(options);
            }
        },
        {
            key: "render",
            value: function render() {
                var _this3 = this;
                var _props = this.props, id = _props.id, name = _props.name, className = _props.className, allowMultiple = _props.allowMultiple, required = _props.required, captureMethod = _props.captureMethod, acceptedFileTypes = _props.acceptedFileTypes;
                return (0, _react.createElement)("div", {
                    className: "filepond--wrapper",
                    ref: function ref(element) {
                        return _this3._element = element;
                    }
                }, (0, _react.createElement)("input", {
                    type: "file",
                    name: name,
                    id: id,
                    accept: acceptedFileTypes,
                    multiple: allowMultiple,
                    required: required,
                    className: className,
                    capture: captureMethod
                }));
            }
        }
    ]);
    return FilePond;
}(_react2.default.Component);
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*!
 * FilePondPluginImageExifOrientation 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */ /* eslint-disable */ (function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = factory() : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    'use strict';
    // test if file is of type image
    var isJPEG = function isJPEG(file) {
        return /^image\/jpeg/.test(file.type);
    };
    var Marker = {
        JPEG: 0xffd8,
        APP1: 0xffe1,
        EXIF: 0x45786966,
        TIFF: 0x4949,
        Orientation: 0x0112,
        Unknown: 0xff00
    };
    var getUint16 = function getUint16(view, offset) {
        var little = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return view.getUint16(offset, little);
    };
    var getUint32 = function getUint32(view, offset) {
        var little = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return view.getUint32(offset, little);
    };
    var getImageOrientation = function getImageOrientation(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var view = new DataView(e.target.result);
                // Every JPEG file starts from binary value '0xFFD8'
                if (getUint16(view, 0) !== Marker.JPEG) {
                    // This aint no JPEG
                    resolve(-1);
                    return;
                }
                var length = view.byteLength;
                var offset = 2;
                while(offset < length){
                    var marker = getUint16(view, offset);
                    offset += 2;
                    // There's our APP1 Marker
                    if (marker === Marker.APP1) {
                        if (getUint32(view, offset += 2) !== Marker.EXIF) {
                            break;
                        }
                        // Get TIFF Header
                        var little = getUint16(view, offset += 6) === Marker.TIFF;
                        offset += getUint32(view, offset + 4, little);
                        var tags = getUint16(view, offset, little);
                        offset += 2;
                        for(var i = 0; i < tags; i++){
                            // found the orientation tag
                            if (getUint16(view, offset + i * 12, little) === Marker.Orientation) {
                                resolve(getUint16(view, offset + i * 12 + 8, little));
                                return;
                            }
                        }
                    } else if ((marker & Marker.Unknown) !== Marker.Unknown) {
                        break;
                    } else {
                        offset += getUint16(view, offset);
                    }
                }
                // Nothing found
                resolve(-1);
            };
            // we don't need to read the entire file to get the orientation
            reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
        });
    };
    var IS_BROWSER = function() {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }();
    var isBrowser = function isBrowser() {
        return IS_BROWSER;
    };
    // 2x1 pixel image 90CW rotated with orientation header
    var testSrc = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=';
    // should correct orientation if is presented in landscape, in which case the browser doesn't autocorrect
    var shouldCorrect = undefined;
    var testImage = isBrowser() ? new Image() : {};
    testImage.onload = function() {
        return shouldCorrect = testImage.naturalWidth > testImage.naturalHeight;
    };
    testImage.src = testSrc;
    var shouldCorrectImageExifOrientation = function shouldCorrectImageExifOrientation() {
        return shouldCorrect;
    };
    /**
   * Read Image Orientation Plugin
   */ var plugin = function plugin(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, isFile = utils.isFile;
        // subscribe to file load and append required info
        addFilter('DID_LOAD_ITEM', function(item, _ref2) {
            var query = _ref2.query;
            return new Promise(function(resolve, reject) {
                // get file reference
                var file = item.file;
                // if this is not a jpeg image we are not interested
                if (!isFile(file) || !isJPEG(file) || !query('GET_ALLOW_IMAGE_EXIF_ORIENTATION') || !shouldCorrectImageExifOrientation()) {
                    // continue with the unaltered dataset
                    return resolve(item);
                }
                // get orientation from exif data
                getImageOrientation(file).then(function(orientation) {
                    item.setMetadata('exif', {
                        orientation: orientation
                    });
                    resolve(item);
                });
            });
        });
        // Expose plugin options
        return {
            options: {
                // Enable or disable image orientation reading
                allowImageExifOrientation: [
                    true,
                    Type.BOOLEAN
                ]
            }
        };
    };
    // fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
    var isBrowser$1 = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    if (isBrowser$1) {
        document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', {
            detail: plugin
        }));
    }
    return plugin;
});
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*!
 * FilePondPluginImagePreview 4.6.12
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */ /* eslint-disable */ (function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = factory() : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    'use strict';
    // test if file is of type image and can be viewed in canvas
    var isPreviewableImage = function isPreviewableImage(file) {
        return /^image/.test(file.type);
    };
    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
        }
        return _typeof(obj);
    }
    var REACT_ELEMENT_TYPE;
    function _jsx(type, props, key, children) {
        if (!REACT_ELEMENT_TYPE) {
            REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
        }
        var defaultProps = type && type.defaultProps;
        var childrenLength = arguments.length - 3;
        if (!props && childrenLength !== 0) {
            props = {
                children: void 0
            };
        }
        if (props && defaultProps) {
            for(var propName in defaultProps){
                if (props[propName] === void 0) {
                    props[propName] = defaultProps[propName];
                }
            }
        } else if (!props) {
            props = defaultProps || {};
        }
        if (childrenLength === 1) {
            props.children = children;
        } else if (childrenLength > 1) {
            var childArray = new Array(childrenLength);
            for(var i = 0; i < childrenLength; i++){
                childArray[i] = arguments[i + 3];
            }
            props.children = childArray;
        }
        return {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key === undefined ? null : '' + key,
            ref: null,
            props: props,
            _owner: null
        };
    }
    function _asyncIterator(iterable) {
        var method;
        if (typeof Symbol === 'function') {
            if (Symbol.asyncIterator) {
                method = iterable[Symbol.asyncIterator];
                if (method != null) return method.call(iterable);
            }
            if (Symbol.iterator) {
                method = iterable[Symbol.iterator];
                if (method != null) return method.call(iterable);
            }
        }
        throw new TypeError('Object is not async iterable');
    }
    function _AwaitValue(value) {
        this.wrapped = value;
    }
    function _AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
            return new Promise(function(resolve, reject) {
                var request = {
                    key: key,
                    arg: arg,
                    resolve: resolve,
                    reject: reject,
                    next: null
                };
                if (back) {
                    back = back.next = request;
                } else {
                    front = back = request;
                    resume(key, arg);
                }
            });
        }
        function resume(key, arg) {
            try {
                var result = gen[key](arg);
                var value = result.value;
                var wrappedAwait = value instanceof _AwaitValue;
                Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                    if (wrappedAwait) {
                        resume('next', arg);
                        return;
                    }
                    settle(result.done ? 'return' : 'normal', arg);
                }, function(err) {
                    resume('throw', err);
                });
            } catch (err) {
                settle('throw', err);
            }
        }
        function settle(type, value) {
            switch(type){
                case 'return':
                    front.resolve({
                        value: value,
                        done: true
                    });
                    break;
                case 'throw':
                    front.reject(value);
                    break;
                default:
                    front.resolve({
                        value: value,
                        done: false
                    });
                    break;
            }
            front = front.next;
            if (front) {
                resume(front.key, front.arg);
            } else {
                back = null;
            }
        }
        this._invoke = send;
        if (typeof gen.return !== 'function') {
            this.return = undefined;
        }
    }
    if (typeof Symbol === 'function' && Symbol.asyncIterator) {
        _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
            return this;
        };
    }
    _AsyncGenerator.prototype.next = function(arg) {
        return this._invoke('next', arg);
    };
    _AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke('throw', arg);
    };
    _AsyncGenerator.prototype.return = function(arg) {
        return this._invoke('return', arg);
    };
    function _wrapAsyncGenerator(fn) {
        return function() {
            return new _AsyncGenerator(fn.apply(this, arguments));
        };
    }
    function _awaitAsyncGenerator(value) {
        return new _AwaitValue(value);
    }
    function _asyncGeneratorDelegate(inner, awaitWrap) {
        var iter = {}, waiting = false;
        function pump(key, value) {
            waiting = true;
            value = new Promise(function(resolve) {
                resolve(inner[key](value));
            });
            return {
                done: false,
                value: awaitWrap(value)
            };
        }
        if (typeof Symbol === 'function' && Symbol.iterator) {
            iter[Symbol.iterator] = function() {
                return this;
            };
        }
        iter.next = function(value) {
            if (waiting) {
                waiting = false;
                return value;
            }
            return pump('next', value);
        };
        if (typeof inner.throw === 'function') {
            iter.throw = function(value) {
                if (waiting) {
                    waiting = false;
                    throw value;
                }
                return pump('throw', value);
            };
        }
        if (typeof inner.return === 'function') {
            iter.return = function(value) {
                return pump('return', value);
            };
        }
        return iter;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self1 = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self1, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
                }
                _next(undefined);
            });
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    function _defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _defineEnumerableProperties(obj, descs) {
        for(var key in descs){
            var desc = descs[key];
            desc.configurable = desc.enumerable = true;
            if ('value' in desc) desc.writable = true;
            Object.defineProperty(obj, key, desc);
        }
        if (Object.getOwnPropertySymbols) {
            var objectSymbols = Object.getOwnPropertySymbols(descs);
            for(var i = 0; i < objectSymbols.length; i++){
                var sym = objectSymbols[i];
                var desc = descs[sym];
                desc.configurable = desc.enumerable = true;
                if ('value' in desc) desc.writable = true;
                Object.defineProperty(obj, sym, desc);
            }
        }
        return obj;
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function _extends() {
        _extends = Object.assign || function(target) {
            for(var i = 1; i < arguments.length; i++){
                var source = arguments[i];
                for(var key in source){
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }
    function _objectSpread(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys.forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        }
        return target;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }
    function isNativeReflectConstruct() {
        if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === 'function') return true;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function _construct(Parent, args, Class) {
        if (isNativeReflectConstruct()) {
            _construct = Reflect.construct;
        } else {
            _construct = function _construct(Parent, args, Class) {
                var a = [
                    null
                ];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a);
                var instance = new Constructor();
                if (Class) _setPrototypeOf(instance, Class.prototype);
                return instance;
            };
        }
        return _construct.apply(null, arguments);
    }
    function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf('[native code]') !== -1;
    }
    function _wrapNativeSuper(Class) {
        var _cache = typeof Map === 'function' ? new Map() : undefined;
        _wrapNativeSuper = function _wrapNativeSuper(Class) {
            if (Class === null || !_isNativeFunction(Class)) return Class;
            if (typeof Class !== 'function') {
                throw new TypeError('Super expression must either be null or a function');
            }
            if (typeof _cache !== 'undefined') {
                if (_cache.has(Class)) return _cache.get(Class);
                _cache.set(Class, Wrapper);
            }
            function Wrapper() {
                return _construct(Class, arguments, _getPrototypeOf(this).constructor);
            }
            Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            return _setPrototypeOf(Wrapper, Class);
        };
        return _wrapNativeSuper(Class);
    }
    function _instanceof(left, right) {
        if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
            return right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    }
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for(var key in obj){
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                            Object.defineProperty(newObj, key, desc);
                        } else {
                            newObj[key] = obj[key];
                        }
                    }
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _newArrowCheck(innerThis, boundThis) {
        if (innerThis !== boundThis) {
            throw new TypeError('Cannot instantiate an arrow function');
        }
    }
    function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError('Cannot destructure undefined');
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            target[key] = source[key];
        }
        return target;
    }
    function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for(i = 0; i < sourceSymbolKeys.length; i++){
                key = sourceSymbolKeys[i];
                if (excluded.indexOf(key) >= 0) continue;
                if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
                target[key] = source[key];
            }
        }
        return target;
    }
    function _assertThisInitialized(self1) {
        if (self1 === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self1;
    }
    function _possibleConstructorReturn(self1, call) {
        if (call && (typeof call === 'object' || typeof call === 'function')) {
            return call;
        }
        return _assertThisInitialized(self1);
    }
    function _superPropBase(object, property) {
        while(!Object.prototype.hasOwnProperty.call(object, property)){
            object = _getPrototypeOf(object);
            if (object === null) break;
        }
        return object;
    }
    function _get(target, property, receiver) {
        if (typeof Reflect !== 'undefined' && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);
                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.get) {
                    return desc.get.call(receiver);
                }
                return desc.value;
            };
        }
        return _get(target, property, receiver || target);
    }
    function set(target, property, value, receiver) {
        if (typeof Reflect !== 'undefined' && Reflect.set) {
            set = Reflect.set;
        } else {
            set = function set(target, property, value, receiver) {
                var base = _superPropBase(target, property);
                var desc;
                if (base) {
                    desc = Object.getOwnPropertyDescriptor(base, property);
                    if (desc.set) {
                        desc.set.call(receiver, value);
                        return true;
                    } else if (!desc.writable) {
                        return false;
                    }
                }
                desc = Object.getOwnPropertyDescriptor(receiver, property);
                if (desc) {
                    if (!desc.writable) {
                        return false;
                    }
                    desc.value = value;
                    Object.defineProperty(receiver, property, desc);
                } else {
                    _defineProperty(receiver, property, value);
                }
                return true;
            };
        }
        return set(target, property, value, receiver);
    }
    function _set(target, property, value, receiver, isStrict) {
        var s = set(target, property, value, receiver || target);
        if (!s && isStrict) {
            throw new Error('failed to set property');
        }
        return value;
    }
    function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
            raw = strings.slice(0);
        }
        return Object.freeze(Object.defineProperties(strings, {
            raw: {
                value: Object.freeze(raw)
            }
        }));
    }
    function _taggedTemplateLiteralLoose(strings, raw) {
        if (!raw) {
            raw = strings.slice(0);
        }
        strings.raw = raw;
        return strings;
    }
    function _temporalRef(val, name) {
        if (val === _temporalUndefined) {
            throw new ReferenceError(name + ' is not defined - temporal dead zone');
        } else {
            return val;
        }
    }
    function _readOnlyError(name) {
        throw new Error('"' + name + '" is read-only');
    }
    function _classNameTDZError(name) {
        throw new Error('Class "' + name + '" cannot be referenced in computed property keys.');
    }
    var _temporalUndefined = {};
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }
    function _slicedToArrayLoose(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
    }
    function _toArray(arr) {
        return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
            return arr2;
        }
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]') return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally{
            try {
                if (!_n && _i['return'] != null) _i['return']();
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _iterableToArrayLimitLoose(arr, i) {
        var _arr = [];
        for(var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;){
            _arr.push(_step.value);
            if (i && _arr.length === i) break;
        }
        return _arr;
    }
    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance');
    }
    function _nonIterableRest() {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
    function _skipFirstGeneratorNext(fn) {
        return function() {
            var it = fn.apply(this, arguments);
            it.next();
            return it;
        };
    }
    function _toPrimitive(input, hint) {
        if (typeof input !== 'object' || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
            var res = prim.call(input, hint || 'default');
            if (typeof res !== 'object') return res;
            throw new TypeError('@@toPrimitive must return a primitive value.');
        }
        return (hint === 'string' ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, 'string');
        return typeof key === 'symbol' ? key : String(key);
    }
    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.');
    }
    function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }
    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function(key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function(desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);
        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }
        if (desc.initializer === void 0) {
            Object.defineProperty(target, property, desc);
            desc = null;
        }
        return desc;
    }
    var id = 0;
    function _classPrivateFieldLooseKey(name) {
        return '__private_' + id++ + '_' + name;
    }
    function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
            throw new TypeError('attempted to use private field on non-instance');
        }
        return receiver;
    }
    function _classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError('attempted to get private field on non-instance');
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function _classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError('attempted to set private field on non-instance');
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError('attempted to set read only private field');
            }
            descriptor.value = value;
        }
        return value;
    }
    function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
        if (receiver !== classConstructor) {
            throw new TypeError('Private static access of wrong provenance');
        }
        return descriptor.value;
    }
    function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
        if (receiver !== classConstructor) {
            throw new TypeError('Private static access of wrong provenance');
        }
        if (!descriptor.writable) {
            throw new TypeError('attempted to set read only private field');
        }
        descriptor.value = value;
        return value;
    }
    function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
        if (receiver !== classConstructor) {
            throw new TypeError('Private static access of wrong provenance');
        }
        return method;
    }
    function _classStaticPrivateMethodSet() {
        throw new TypeError('attempted to set read only static private field');
    }
    function _decorate(decorators, factory, superClass, mixins) {
        var api = _getDecoratorsApi();
        if (mixins) {
            for(var i = 0; i < mixins.length; i++){
                api = mixins[i](api);
            }
        }
        var r = factory(function initialize(O) {
            api.initializeInstanceElements(O, decorated.elements);
        }, superClass);
        var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
        api.initializeClassElements(r.F, decorated.elements);
        return api.runClassFinishers(r.F, decorated.finishers);
    }
    function _getDecoratorsApi() {
        _getDecoratorsApi = function() {
            return api;
        };
        var api = {
            elementsDefinitionOrder: [
                [
                    'method'
                ],
                [
                    'field'
                ]
            ],
            initializeInstanceElements: function(O, elements) {
                [
                    'method',
                    'field'
                ].forEach(function(kind) {
                    elements.forEach(function(element) {
                        if (element.kind === kind && element.placement === 'own') {
                            this.defineClassElement(O, element);
                        }
                    }, this);
                }, this);
            },
            initializeClassElements: function(F, elements) {
                var proto = F.prototype;
                [
                    'method',
                    'field'
                ].forEach(function(kind) {
                    elements.forEach(function(element) {
                        var placement = element.placement;
                        if (element.kind === kind && (placement === 'static' || placement === 'prototype')) {
                            var receiver = placement === 'static' ? F : proto;
                            this.defineClassElement(receiver, element);
                        }
                    }, this);
                }, this);
            },
            defineClassElement: function(receiver, element) {
                var descriptor = element.descriptor;
                if (element.kind === 'field') {
                    var initializer = element.initializer;
                    descriptor = {
                        enumerable: descriptor.enumerable,
                        writable: descriptor.writable,
                        configurable: descriptor.configurable,
                        value: initializer === void 0 ? void 0 : initializer.call(receiver)
                    };
                }
                Object.defineProperty(receiver, element.key, descriptor);
            },
            decorateClass: function(elements, decorators) {
                var newElements = [];
                var finishers = [];
                var placements = {
                    static: [],
                    prototype: [],
                    own: []
                };
                elements.forEach(function(element) {
                    this.addElementPlacement(element, placements);
                }, this);
                elements.forEach(function(element) {
                    if (!_hasDecorators(element)) return newElements.push(element);
                    var elementFinishersExtras = this.decorateElement(element, placements);
                    newElements.push(elementFinishersExtras.element);
                    newElements.push.apply(newElements, elementFinishersExtras.extras);
                    finishers.push.apply(finishers, elementFinishersExtras.finishers);
                }, this);
                if (!decorators) {
                    return {
                        elements: newElements,
                        finishers: finishers
                    };
                }
                var result = this.decorateConstructor(newElements, decorators);
                finishers.push.apply(finishers, result.finishers);
                result.finishers = finishers;
                return result;
            },
            addElementPlacement: function(element, placements, silent) {
                var keys = placements[element.placement];
                if (!silent && keys.indexOf(element.key) !== -1) {
                    throw new TypeError('Duplicated element (' + element.key + ')');
                }
                keys.push(element.key);
            },
            decorateElement: function(element, placements) {
                var extras = [];
                var finishers = [];
                for(var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--){
                    var keys = placements[element.placement];
                    keys.splice(keys.indexOf(element.key), 1);
                    var elementObject = this.fromElementDescriptor(element);
                    var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
                    element = elementFinisherExtras.element;
                    this.addElementPlacement(element, placements);
                    if (elementFinisherExtras.finisher) {
                        finishers.push(elementFinisherExtras.finisher);
                    }
                    var newExtras = elementFinisherExtras.extras;
                    if (newExtras) {
                        for(var j = 0; j < newExtras.length; j++){
                            this.addElementPlacement(newExtras[j], placements);
                        }
                        extras.push.apply(extras, newExtras);
                    }
                }
                return {
                    element: element,
                    finishers: finishers,
                    extras: extras
                };
            },
            decorateConstructor: function(elements, decorators) {
                var finishers = [];
                for(var i = decorators.length - 1; i >= 0; i--){
                    var obj = this.fromClassDescriptor(elements);
                    var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);
                    if (elementsAndFinisher.finisher !== undefined) {
                        finishers.push(elementsAndFinisher.finisher);
                    }
                    if (elementsAndFinisher.elements !== undefined) {
                        elements = elementsAndFinisher.elements;
                        for(var j = 0; j < elements.length - 1; j++){
                            for(var k = j + 1; k < elements.length; k++){
                                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                                    throw new TypeError('Duplicated element (' + elements[j].key + ')');
                                }
                            }
                        }
                    }
                }
                return {
                    elements: elements,
                    finishers: finishers
                };
            },
            fromElementDescriptor: function(element) {
                var obj = {
                    kind: element.kind,
                    key: element.key,
                    placement: element.placement,
                    descriptor: element.descriptor
                };
                var desc = {
                    value: 'Descriptor',
                    configurable: true
                };
                Object.defineProperty(obj, Symbol.toStringTag, desc);
                if (element.kind === 'field') obj.initializer = element.initializer;
                return obj;
            },
            toElementDescriptors: function(elementObjects) {
                if (elementObjects === undefined) return;
                return _toArray(elementObjects).map(function(elementObject) {
                    var element = this.toElementDescriptor(elementObject);
                    this.disallowProperty(elementObject, 'finisher', 'An element descriptor');
                    this.disallowProperty(elementObject, 'extras', 'An element descriptor');
                    return element;
                }, this);
            },
            toElementDescriptor: function(elementObject) {
                var kind = String(elementObject.kind);
                if (kind !== 'method' && kind !== 'field') {
                    throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
                }
                var key = _toPropertyKey(elementObject.key);
                var placement = String(elementObject.placement);
                if (placement !== 'static' && placement !== 'prototype' && placement !== 'own') {
                    throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
                }
                var descriptor = elementObject.descriptor;
                this.disallowProperty(elementObject, 'elements', 'An element descriptor');
                var element = {
                    kind: kind,
                    key: key,
                    placement: placement,
                    descriptor: Object.assign({}, descriptor)
                };
                if (kind !== 'field') {
                    this.disallowProperty(elementObject, 'initializer', 'A method descriptor');
                } else {
                    this.disallowProperty(descriptor, 'get', 'The property descriptor of a field descriptor');
                    this.disallowProperty(descriptor, 'set', 'The property descriptor of a field descriptor');
                    this.disallowProperty(descriptor, 'value', 'The property descriptor of a field descriptor');
                    element.initializer = elementObject.initializer;
                }
                return element;
            },
            toElementFinisherExtras: function(elementObject) {
                var element = this.toElementDescriptor(elementObject);
                var finisher = _optionalCallableProperty(elementObject, 'finisher');
                var extras = this.toElementDescriptors(elementObject.extras);
                return {
                    element: element,
                    finisher: finisher,
                    extras: extras
                };
            },
            fromClassDescriptor: function(elements) {
                var obj = {
                    kind: 'class',
                    elements: elements.map(this.fromElementDescriptor, this)
                };
                var desc = {
                    value: 'Descriptor',
                    configurable: true
                };
                Object.defineProperty(obj, Symbol.toStringTag, desc);
                return obj;
            },
            toClassDescriptor: function(obj) {
                var kind = String(obj.kind);
                if (kind !== 'class') {
                    throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
                }
                this.disallowProperty(obj, 'key', 'A class descriptor');
                this.disallowProperty(obj, 'placement', 'A class descriptor');
                this.disallowProperty(obj, 'descriptor', 'A class descriptor');
                this.disallowProperty(obj, 'initializer', 'A class descriptor');
                this.disallowProperty(obj, 'extras', 'A class descriptor');
                var finisher = _optionalCallableProperty(obj, 'finisher');
                var elements = this.toElementDescriptors(obj.elements);
                return {
                    elements: elements,
                    finisher: finisher
                };
            },
            runClassFinishers: function(constructor, finishers) {
                for(var i = 0; i < finishers.length; i++){
                    var newConstructor = (0, finishers[i])(constructor);
                    if (newConstructor !== undefined) {
                        if (typeof newConstructor !== 'function') {
                            throw new TypeError('Finishers must return a constructor.');
                        }
                        constructor = newConstructor;
                    }
                }
                return constructor;
            },
            disallowProperty: function(obj, name, objectType) {
                if (obj[name] !== undefined) {
                    throw new TypeError(objectType + " can't have a ." + name + ' property.');
                }
            }
        };
        return api;
    }
    function _createElementDescriptor(def) {
        var key = _toPropertyKey(def.key);
        var descriptor;
        if (def.kind === 'method') {
            descriptor = {
                value: def.value,
                writable: true,
                configurable: true,
                enumerable: false
            };
        } else if (def.kind === 'get') {
            descriptor = {
                get: def.value,
                configurable: true,
                enumerable: false
            };
        } else if (def.kind === 'set') {
            descriptor = {
                set: def.value,
                configurable: true,
                enumerable: false
            };
        } else if (def.kind === 'field') {
            descriptor = {
                configurable: true,
                writable: true,
                enumerable: true
            };
        }
        var element = {
            kind: def.kind === 'field' ? 'field' : 'method',
            key: key,
            placement: def.static ? 'static' : def.kind === 'field' ? 'own' : 'prototype',
            descriptor: descriptor
        };
        if (def.decorators) element.decorators = def.decorators;
        if (def.kind === 'field') element.initializer = def.value;
        return element;
    }
    function _coalesceGetterSetter(element, other) {
        if (element.descriptor.get !== undefined) {
            other.descriptor.get = element.descriptor.get;
        } else {
            other.descriptor.set = element.descriptor.set;
        }
    }
    function _coalesceClassElements(elements) {
        var newElements = [];
        var isSameElement = function(other) {
            return other.kind === 'method' && other.key === element.key && other.placement === element.placement;
        };
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            var other;
            if (element.kind === 'method' && (other = newElements.find(isSameElement))) {
                if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
                    if (_hasDecorators(element) || _hasDecorators(other)) {
                        throw new ReferenceError('Duplicated methods (' + element.key + ") can't be decorated.");
                    }
                    other.descriptor = element.descriptor;
                } else {
                    if (_hasDecorators(element)) {
                        if (_hasDecorators(other)) {
                            throw new ReferenceError("Decorators can't be placed on different accessors with for " + 'the same property (' + element.key + ').');
                        }
                        other.decorators = element.decorators;
                    }
                    _coalesceGetterSetter(element, other);
                }
            } else {
                newElements.push(element);
            }
        }
        return newElements;
    }
    function _hasDecorators(element) {
        return element.decorators && element.decorators.length;
    }
    function _isDataDescriptor(desc) {
        return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
    }
    function _optionalCallableProperty(obj, name) {
        var value = obj[name];
        if (value !== undefined && typeof value !== 'function') {
            throw new TypeError("Expected '" + name + "' to be a function");
        }
        return value;
    }
    function _classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
            throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
    }
    function _classPrivateMethodSet() {
        throw new TypeError('attempted to reassign private method');
    }
    function _wrapRegExp(re, groups) {
        _wrapRegExp = function(re, groups) {
            return new BabelRegExp(re, groups);
        };
        var _RegExp = _wrapNativeSuper(RegExp);
        var _super = RegExp.prototype;
        var _groups = new WeakMap();
        function BabelRegExp(re, groups) {
            var _this = _RegExp.call(this, re);
            _groups.set(_this, groups);
            return _this;
        }
        _inherits(BabelRegExp, _RegExp);
        BabelRegExp.prototype.exec = function(str) {
            var result = _super.exec.call(this, str);
            if (result) result.groups = buildGroups(result, this);
            return result;
        };
        BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
            if (typeof substitution === 'string') {
                var groups = _groups.get(this);
                return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function(_, name) {
                    return '$' + groups[name];
                }));
            } else if (typeof substitution === 'function') {
                var _this = this;
                return _super[Symbol.replace].call(this, str, function() {
                    var args = [];
                    args.push.apply(args, arguments);
                    if (typeof args[args.length - 1] !== 'object') {
                        args.push(buildGroups(args, _this));
                    }
                    return substitution.apply(this, args);
                });
            } else {
                return _super[Symbol.replace].call(this, str, substitution);
            }
        };
        function buildGroups(result, re) {
            var g = _groups.get(re);
            return Object.keys(g).reduce(function(groups, name) {
                groups[name] = result[g[name]];
                return groups;
            }, Object.create(null));
        }
        return _wrapRegExp.apply(this, arguments);
    }
    var vectorMultiply = function vectorMultiply(v, amount) {
        return createVector(v.x * amount, v.y * amount);
    };
    var vectorAdd = function vectorAdd(a, b) {
        return createVector(a.x + b.x, a.y + b.y);
    };
    var vectorNormalize = function vectorNormalize(v) {
        var l = Math.sqrt(v.x * v.x + v.y * v.y);
        if (l === 0) {
            return {
                x: 0,
                y: 0
            };
        }
        return createVector(v.x / l, v.y / l);
    };
    var vectorRotate = function vectorRotate(v, radians, origin) {
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var t = createVector(v.x - origin.x, v.y - origin.y);
        return createVector(origin.x + cos * t.x - sin * t.y, origin.y + sin * t.x + cos * t.y);
    };
    var createVector = function createVector() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return {
            x: x,
            y: y
        };
    };
    var getMarkupValue = function getMarkupValue(value, size) {
        var scalar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var axis = arguments.length > 3 ? arguments[3] : undefined;
        if (typeof value === 'string') {
            return parseFloat(value) * scalar;
        }
        if (typeof value === 'number') {
            return value * (axis ? size[axis] : Math.min(size.width, size.height));
        }
        return;
    };
    var getMarkupStyles = function getMarkupStyles(markup, size, scale) {
        var lineStyle = markup.borderStyle || markup.lineStyle || 'solid';
        var fill = markup.backgroundColor || markup.fontColor || 'transparent';
        var stroke = markup.borderColor || markup.lineColor || 'transparent';
        var strokeWidth = getMarkupValue(markup.borderWidth || markup.lineWidth, size, scale);
        var lineCap = markup.lineCap || 'round';
        var lineJoin = markup.lineJoin || 'round';
        var dashes = typeof lineStyle === 'string' ? '' : lineStyle.map(function(v) {
            return getMarkupValue(v, size, scale);
        }).join(',');
        var opacity = markup.opacity || 1;
        return {
            'stroke-linecap': lineCap,
            'stroke-linejoin': lineJoin,
            'stroke-width': strokeWidth || 0,
            'stroke-dasharray': dashes,
            stroke: stroke,
            fill: fill,
            opacity: opacity
        };
    };
    var isDefined = function isDefined(value) {
        return value != null;
    };
    var getMarkupRect = function getMarkupRect(rect, size) {
        var scalar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var left = getMarkupValue(rect.x, size, scalar, 'width') || getMarkupValue(rect.left, size, scalar, 'width');
        var top = getMarkupValue(rect.y, size, scalar, 'height') || getMarkupValue(rect.top, size, scalar, 'height');
        var width = getMarkupValue(rect.width, size, scalar, 'width');
        var height = getMarkupValue(rect.height, size, scalar, 'height');
        var right = getMarkupValue(rect.right, size, scalar, 'width');
        var bottom = getMarkupValue(rect.bottom, size, scalar, 'height');
        if (!isDefined(top)) {
            if (isDefined(height) && isDefined(bottom)) {
                top = size.height - height - bottom;
            } else {
                top = bottom;
            }
        }
        if (!isDefined(left)) {
            if (isDefined(width) && isDefined(right)) {
                left = size.width - width - right;
            } else {
                left = right;
            }
        }
        if (!isDefined(width)) {
            if (isDefined(left) && isDefined(right)) {
                width = size.width - left - right;
            } else {
                width = 0;
            }
        }
        if (!isDefined(height)) {
            if (isDefined(top) && isDefined(bottom)) {
                height = size.height - top - bottom;
            } else {
                height = 0;
            }
        }
        return {
            x: left || 0,
            y: top || 0,
            width: width || 0,
            height: height || 0
        };
    };
    var pointsToPathShape = function pointsToPathShape(points) {
        return points.map(function(point, index) {
            return ''.concat(index === 0 ? 'M' : 'L', ' ').concat(point.x, ' ').concat(point.y);
        }).join(' ');
    };
    var setAttributes = function setAttributes(element, attr) {
        return Object.keys(attr).forEach(function(key) {
            return element.setAttribute(key, attr[key]);
        });
    };
    var ns = 'http://www.w3.org/2000/svg';
    var svg = function svg(tag, attr) {
        var element = document.createElementNS(ns, tag);
        if (attr) {
            setAttributes(element, attr);
        }
        return element;
    };
    var updateRect = function updateRect(element) {
        return setAttributes(element, Object.assign({}, element.rect, element.styles));
    };
    var updateEllipse = function updateEllipse(element) {
        var cx = element.rect.x + element.rect.width * 0.5;
        var cy = element.rect.y + element.rect.height * 0.5;
        var rx = element.rect.width * 0.5;
        var ry = element.rect.height * 0.5;
        return setAttributes(element, Object.assign({
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry
        }, element.styles));
    };
    var IMAGE_FIT_STYLE = {
        contain: 'xMidYMid meet',
        cover: 'xMidYMid slice'
    };
    var updateImage = function updateImage(element, markup) {
        setAttributes(element, Object.assign({}, element.rect, element.styles, {
            preserveAspectRatio: IMAGE_FIT_STYLE[markup.fit] || 'none'
        }));
    };
    var TEXT_ANCHOR = {
        left: 'start',
        center: 'middle',
        right: 'end'
    };
    var updateText = function updateText(element, markup, size, scale) {
        var fontSize = getMarkupValue(markup.fontSize, size, scale);
        var fontFamily = markup.fontFamily || 'sans-serif';
        var fontWeight = markup.fontWeight || 'normal';
        var textAlign = TEXT_ANCHOR[markup.textAlign] || 'start';
        setAttributes(element, Object.assign({}, element.rect, element.styles, {
            'stroke-width': 0,
            'font-weight': fontWeight,
            'font-size': fontSize,
            'font-family': fontFamily,
            'text-anchor': textAlign
        }));
        // update text
        if (element.text !== markup.text) {
            element.text = markup.text;
            element.textContent = markup.text.length ? markup.text : ' ';
        }
    };
    var updateLine = function updateLine(element, markup, size, scale) {
        setAttributes(element, Object.assign({}, element.rect, element.styles, {
            fill: 'none'
        }));
        var line = element.childNodes[0];
        var begin = element.childNodes[1];
        var end = element.childNodes[2];
        var origin = element.rect;
        var target = {
            x: element.rect.x + element.rect.width,
            y: element.rect.y + element.rect.height
        };
        setAttributes(line, {
            x1: origin.x,
            y1: origin.y,
            x2: target.x,
            y2: target.y
        });
        if (!markup.lineDecoration) return;
        begin.style.display = 'none';
        end.style.display = 'none';
        var v = vectorNormalize({
            x: target.x - origin.x,
            y: target.y - origin.y
        });
        var l = getMarkupValue(0.05, size, scale);
        if (markup.lineDecoration.indexOf('arrow-begin') !== -1) {
            var arrowBeginRotationPoint = vectorMultiply(v, l);
            var arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
            var arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
            var arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
            setAttributes(begin, {
                style: 'display:block;',
                d: 'M'.concat(arrowBeginA.x, ',').concat(arrowBeginA.y, ' L').concat(origin.x, ',').concat(origin.y, ' L').concat(arrowBeginB.x, ',').concat(arrowBeginB.y)
            });
        }
        if (markup.lineDecoration.indexOf('arrow-end') !== -1) {
            var arrowEndRotationPoint = vectorMultiply(v, -l);
            var arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
            var arrowEndA = vectorRotate(target, 2, arrowEndCenter);
            var arrowEndB = vectorRotate(target, -2, arrowEndCenter);
            setAttributes(end, {
                style: 'display:block;',
                d: 'M'.concat(arrowEndA.x, ',').concat(arrowEndA.y, ' L').concat(target.x, ',').concat(target.y, ' L').concat(arrowEndB.x, ',').concat(arrowEndB.y)
            });
        }
    };
    var updatePath = function updatePath(element, markup, size, scale) {
        setAttributes(element, Object.assign({}, element.styles, {
            fill: 'none',
            d: pointsToPathShape(markup.points.map(function(point) {
                return {
                    x: getMarkupValue(point.x, size, scale, 'width'),
                    y: getMarkupValue(point.y, size, scale, 'height')
                };
            }))
        }));
    };
    var createShape = function createShape(node) {
        return function(markup) {
            return svg(node, {
                id: markup.id
            });
        };
    };
    var createImage = function createImage(markup) {
        var shape = svg('image', {
            id: markup.id,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            opacity: '0'
        });
        shape.onload = function() {
            shape.setAttribute('opacity', markup.opacity || 1);
        };
        shape.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', markup.src);
        return shape;
    };
    var createLine = function createLine(markup) {
        var shape = svg('g', {
            id: markup.id,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        });
        var line = svg('line');
        shape.appendChild(line);
        var begin = svg('path');
        shape.appendChild(begin);
        var end = svg('path');
        shape.appendChild(end);
        return shape;
    };
    var CREATE_TYPE_ROUTES = {
        image: createImage,
        rect: createShape('rect'),
        ellipse: createShape('ellipse'),
        text: createShape('text'),
        path: createShape('path'),
        line: createLine
    };
    var UPDATE_TYPE_ROUTES = {
        rect: updateRect,
        ellipse: updateEllipse,
        image: updateImage,
        text: updateText,
        path: updatePath,
        line: updateLine
    };
    var createMarkupByType = function createMarkupByType(type, markup) {
        return CREATE_TYPE_ROUTES[type](markup);
    };
    var updateMarkupByType = function updateMarkupByType(element, type, markup, size, scale) {
        if (type !== 'path') {
            element.rect = getMarkupRect(markup, size, scale);
        }
        element.styles = getMarkupStyles(markup, size, scale);
        UPDATE_TYPE_ROUTES[type](element, markup, size, scale);
    };
    var MARKUP_RECT = [
        'x',
        'y',
        'left',
        'top',
        'right',
        'bottom',
        'width',
        'height'
    ];
    var toOptionalFraction = function toOptionalFraction(value) {
        return typeof value === 'string' && /%/.test(value) ? parseFloat(value) / 100 : value;
    };
    // adds default markup properties, clones markup
    var prepareMarkup = function prepareMarkup(markup) {
        var _markup = _slicedToArray(markup, 2), type = _markup[0], props = _markup[1];
        var rect = props.points ? {} : MARKUP_RECT.reduce(function(prev, curr) {
            prev[curr] = toOptionalFraction(props[curr]);
            return prev;
        }, {});
        return [
            type,
            Object.assign({
                zIndex: 0
            }, props, rect)
        ];
    };
    var sortMarkupByZIndex = function sortMarkupByZIndex(a, b) {
        if (a[1].zIndex > b[1].zIndex) {
            return 1;
        }
        if (a[1].zIndex < b[1].zIndex) {
            return -1;
        }
        return 0;
    };
    var createMarkupView = function createMarkupView(_) {
        return _.utils.createView({
            name: 'image-preview-markup',
            tag: 'svg',
            ignoreRect: true,
            mixins: {
                apis: [
                    'width',
                    'height',
                    'crop',
                    'markup',
                    'resize',
                    'dirty'
                ]
            },
            write: function write(_ref) {
                var root = _ref.root, props = _ref.props;
                if (!props.dirty) return;
                var crop = props.crop, resize = props.resize, markup = props.markup;
                var viewWidth = props.width;
                var viewHeight = props.height;
                var cropWidth = crop.width;
                var cropHeight = crop.height;
                if (resize) {
                    var _size = resize.size;
                    var outputWidth = _size && _size.width;
                    var outputHeight = _size && _size.height;
                    var outputFit = resize.mode;
                    var outputUpscale = resize.upscale;
                    if (outputWidth && !outputHeight) outputHeight = outputWidth;
                    if (outputHeight && !outputWidth) outputWidth = outputHeight;
                    var shouldUpscale = cropWidth < outputWidth && cropHeight < outputHeight;
                    if (!shouldUpscale || shouldUpscale && outputUpscale) {
                        var scalarWidth = outputWidth / cropWidth;
                        var scalarHeight = outputHeight / cropHeight;
                        if (outputFit === 'force') {
                            cropWidth = outputWidth;
                            cropHeight = outputHeight;
                        } else {
                            var scalar;
                            if (outputFit === 'cover') {
                                scalar = Math.max(scalarWidth, scalarHeight);
                            } else if (outputFit === 'contain') {
                                scalar = Math.min(scalarWidth, scalarHeight);
                            }
                            cropWidth = cropWidth * scalar;
                            cropHeight = cropHeight * scalar;
                        }
                    }
                }
                var size = {
                    width: viewWidth,
                    height: viewHeight
                };
                root.element.setAttribute('width', size.width);
                root.element.setAttribute('height', size.height);
                var scale = Math.min(viewWidth / cropWidth, viewHeight / cropHeight);
                // clear
                root.element.innerHTML = '';
                // get filter
                var markupFilter = root.query('GET_IMAGE_PREVIEW_MARKUP_FILTER');
                // draw new
                markup.filter(markupFilter).map(prepareMarkup).sort(sortMarkupByZIndex).forEach(function(markup) {
                    var _markup = _slicedToArray(markup, 2), type = _markup[0], settings = _markup[1];
                    // create
                    var element = createMarkupByType(type, settings);
                    // update
                    updateMarkupByType(element, type, settings, size, scale);
                    // add
                    root.element.appendChild(element);
                });
            }
        });
    };
    var createVector$1 = function createVector(x, y) {
        return {
            x: x,
            y: y
        };
    };
    var vectorDot = function vectorDot(a, b) {
        return a.x * b.x + a.y * b.y;
    };
    var vectorSubtract = function vectorSubtract(a, b) {
        return createVector$1(a.x - b.x, a.y - b.y);
    };
    var vectorDistanceSquared = function vectorDistanceSquared(a, b) {
        return vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
    };
    var vectorDistance = function vectorDistance(a, b) {
        return Math.sqrt(vectorDistanceSquared(a, b));
    };
    var getOffsetPointOnEdge = function getOffsetPointOnEdge(length, rotation) {
        var a = length;
        var A = 1.5707963267948966;
        var B = rotation;
        var C = 1.5707963267948966 - rotation;
        var sinA = Math.sin(A);
        var sinB = Math.sin(B);
        var sinC = Math.sin(C);
        var cosC = Math.cos(C);
        var ratio = a / sinA;
        var b = ratio * sinB;
        var c = ratio * sinC;
        return createVector$1(cosC * b, cosC * c);
    };
    var getRotatedRectSize = function getRotatedRectSize(rect, rotation) {
        var w = rect.width;
        var h = rect.height;
        var hor = getOffsetPointOnEdge(w, rotation);
        var ver = getOffsetPointOnEdge(h, rotation);
        var tl = createVector$1(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
        var tr = createVector$1(rect.x + rect.width + Math.abs(ver.y), rect.y + Math.abs(ver.x));
        var bl = createVector$1(rect.x - Math.abs(ver.y), rect.y + rect.height - Math.abs(ver.x));
        return {
            width: vectorDistance(tl, tr),
            height: vectorDistance(tl, bl)
        };
    };
    var calculateCanvasSize = function calculateCanvasSize(image, canvasAspectRatio) {
        var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var imageAspectRatio = image.height / image.width;
        // determine actual pixels on x and y axis
        var canvasWidth = 1;
        var canvasHeight = canvasAspectRatio;
        var imgWidth = 1;
        var imgHeight = imageAspectRatio;
        if (imgHeight > canvasHeight) {
            imgHeight = canvasHeight;
            imgWidth = imgHeight / imageAspectRatio;
        }
        var scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        var width = image.width / (zoom * scalar * imgWidth);
        var height = width * canvasAspectRatio;
        return {
            width: width,
            height: height
        };
    };
    var getImageRectZoomFactor = function getImageRectZoomFactor(imageRect, cropRect, rotation, center) {
        // calculate available space round image center position
        var cx = center.x > 0.5 ? 1 - center.x : center.x;
        var cy = center.y > 0.5 ? 1 - center.y : center.y;
        var imageWidth = cx * 2 * imageRect.width;
        var imageHeight = cy * 2 * imageRect.height;
        // calculate rotated crop rectangle size
        var rotatedCropSize = getRotatedRectSize(cropRect, rotation);
        // calculate scalar required to fit image
        return Math.max(rotatedCropSize.width / imageWidth, rotatedCropSize.height / imageHeight);
    };
    var getCenteredCropRect = function getCenteredCropRect(container, aspectRatio) {
        var width = container.width;
        var height = width * aspectRatio;
        if (height > container.height) {
            height = container.height;
            width = height / aspectRatio;
        }
        var x = (container.width - width) * 0.5;
        var y = (container.height - height) * 0.5;
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    };
    var getCurrentCropSize = function getCurrentCropSize(imageSize) {
        var crop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var zoom = crop.zoom, rotation = crop.rotation, center = crop.center, aspectRatio = crop.aspectRatio;
        if (!aspectRatio) aspectRatio = imageSize.height / imageSize.width;
        var canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
        var canvasCenter = {
            x: canvasSize.width * 0.5,
            y: canvasSize.height * 0.5
        };
        var stage = {
            x: 0,
            y: 0,
            width: canvasSize.width,
            height: canvasSize.height,
            center: canvasCenter
        };
        var shouldLimit = typeof crop.scaleToFit === 'undefined' || crop.scaleToFit;
        var stageZoomFactor = getImageRectZoomFactor(imageSize, getCenteredCropRect(stage, aspectRatio), rotation, shouldLimit ? center : {
            x: 0.5,
            y: 0.5
        });
        var scale = zoom * stageZoomFactor;
        // start drawing
        return {
            widthFloat: canvasSize.width / scale,
            heightFloat: canvasSize.height / scale,
            width: Math.round(canvasSize.width / scale),
            height: Math.round(canvasSize.height / scale)
        };
    };
    var IMAGE_SCALE_SPRING_PROPS = {
        type: 'spring',
        stiffness: 0.5,
        damping: 0.45,
        mass: 10
    };
    // does horizontal and vertical flipping
    var createBitmapView = function createBitmapView(_) {
        return _.utils.createView({
            name: 'image-bitmap',
            ignoreRect: true,
            mixins: {
                styles: [
                    'scaleX',
                    'scaleY'
                ]
            },
            create: function create(_ref) {
                var root = _ref.root, props = _ref.props;
                root.appendChild(props.image);
            }
        });
    };
    // shifts and rotates image
    var createImageCanvasWrapper = function createImageCanvasWrapper(_) {
        return _.utils.createView({
            name: 'image-canvas-wrapper',
            tag: 'div',
            ignoreRect: true,
            mixins: {
                apis: [
                    'crop',
                    'width',
                    'height'
                ],
                styles: [
                    'originX',
                    'originY',
                    'translateX',
                    'translateY',
                    'scaleX',
                    'scaleY',
                    'rotateZ'
                ],
                animations: {
                    originX: IMAGE_SCALE_SPRING_PROPS,
                    originY: IMAGE_SCALE_SPRING_PROPS,
                    scaleX: IMAGE_SCALE_SPRING_PROPS,
                    scaleY: IMAGE_SCALE_SPRING_PROPS,
                    translateX: IMAGE_SCALE_SPRING_PROPS,
                    translateY: IMAGE_SCALE_SPRING_PROPS,
                    rotateZ: IMAGE_SCALE_SPRING_PROPS
                }
            },
            create: function create(_ref2) {
                var root = _ref2.root, props = _ref2.props;
                props.width = props.image.width;
                props.height = props.image.height;
                root.ref.bitmap = root.appendChildView(root.createChildView(createBitmapView(_), {
                    image: props.image
                }));
            },
            write: function write(_ref3) {
                var root = _ref3.root, props = _ref3.props;
                var flip = props.crop.flip;
                var bitmap = root.ref.bitmap;
                bitmap.scaleX = flip.horizontal ? -1 : 1;
                bitmap.scaleY = flip.vertical ? -1 : 1;
            }
        });
    };
    // clips canvas to correct aspect ratio
    var createClipView = function createClipView(_) {
        return _.utils.createView({
            name: 'image-clip',
            tag: 'div',
            ignoreRect: true,
            mixins: {
                apis: [
                    'crop',
                    'markup',
                    'resize',
                    'width',
                    'height',
                    'dirty',
                    'background'
                ],
                styles: [
                    'width',
                    'height',
                    'opacity'
                ],
                animations: {
                    opacity: {
                        type: 'tween',
                        duration: 250
                    }
                }
            },
            didWriteView: function didWriteView(_ref4) {
                var root = _ref4.root, props = _ref4.props;
                if (!props.background) return;
                root.element.style.backgroundColor = props.background;
            },
            create: function create(_ref5) {
                var root = _ref5.root, props = _ref5.props;
                root.ref.image = root.appendChildView(root.createChildView(createImageCanvasWrapper(_), Object.assign({}, props)));
                root.ref.createMarkup = function() {
                    if (root.ref.markup) return;
                    root.ref.markup = root.appendChildView(root.createChildView(createMarkupView(_), Object.assign({}, props)));
                };
                root.ref.destroyMarkup = function() {
                    if (!root.ref.markup) return;
                    root.removeChildView(root.ref.markup);
                    root.ref.markup = null;
                };
                // set up transparency grid
                var transparencyIndicator = root.query('GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR');
                if (transparencyIndicator === null) return;
                // grid pattern
                if (transparencyIndicator === 'grid') {
                    root.element.dataset.transparencyIndicator = transparencyIndicator;
                } else {
                    root.element.dataset.transparencyIndicator = 'color';
                }
            },
            write: function write(_ref6) {
                var root = _ref6.root, props = _ref6.props, shouldOptimize = _ref6.shouldOptimize;
                var crop = props.crop, markup = props.markup, resize = props.resize, dirty = props.dirty, width = props.width, height = props.height;
                root.ref.image.crop = crop;
                var stage = {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    center: {
                        x: width * 0.5,
                        y: height * 0.5
                    }
                };
                var image = {
                    width: root.ref.image.width,
                    height: root.ref.image.height
                };
                var origin = {
                    x: crop.center.x * image.width,
                    y: crop.center.y * image.height
                };
                var translation = {
                    x: stage.center.x - image.width * crop.center.x,
                    y: stage.center.y - image.height * crop.center.y
                };
                var rotation = Math.PI * 2 + crop.rotation % (Math.PI * 2);
                var cropAspectRatio = crop.aspectRatio || image.height / image.width;
                var shouldLimit = typeof crop.scaleToFit === 'undefined' || crop.scaleToFit;
                var stageZoomFactor = getImageRectZoomFactor(image, getCenteredCropRect(stage, cropAspectRatio), rotation, shouldLimit ? crop.center : {
                    x: 0.5,
                    y: 0.5
                });
                var scale = crop.zoom * stageZoomFactor;
                // update markup view
                if (markup && markup.length) {
                    root.ref.createMarkup();
                    root.ref.markup.width = width;
                    root.ref.markup.height = height;
                    root.ref.markup.resize = resize;
                    root.ref.markup.dirty = dirty;
                    root.ref.markup.markup = markup;
                    root.ref.markup.crop = getCurrentCropSize(image, crop);
                } else if (root.ref.markup) {
                    root.ref.destroyMarkup();
                }
                // update image view
                var imageView = root.ref.image;
                // don't update clip layout
                if (shouldOptimize) {
                    imageView.originX = null;
                    imageView.originY = null;
                    imageView.translateX = null;
                    imageView.translateY = null;
                    imageView.rotateZ = null;
                    imageView.scaleX = null;
                    imageView.scaleY = null;
                    return;
                }
                imageView.originX = origin.x;
                imageView.originY = origin.y;
                imageView.translateX = translation.x;
                imageView.translateY = translation.y;
                imageView.rotateZ = rotation;
                imageView.scaleX = scale;
                imageView.scaleY = scale;
            }
        });
    };
    var createImageView = function createImageView(_) {
        return _.utils.createView({
            name: 'image-preview',
            tag: 'div',
            ignoreRect: true,
            mixins: {
                apis: [
                    'image',
                    'crop',
                    'markup',
                    'resize',
                    'dirty',
                    'background'
                ],
                styles: [
                    'translateY',
                    'scaleX',
                    'scaleY',
                    'opacity'
                ],
                animations: {
                    scaleX: IMAGE_SCALE_SPRING_PROPS,
                    scaleY: IMAGE_SCALE_SPRING_PROPS,
                    translateY: IMAGE_SCALE_SPRING_PROPS,
                    opacity: {
                        type: 'tween',
                        duration: 400
                    }
                }
            },
            create: function create(_ref7) {
                var root = _ref7.root, props = _ref7.props;
                root.ref.clip = root.appendChildView(root.createChildView(createClipView(_), {
                    id: props.id,
                    image: props.image,
                    crop: props.crop,
                    markup: props.markup,
                    resize: props.resize,
                    dirty: props.dirty,
                    background: props.background
                }));
            },
            write: function write(_ref8) {
                var root = _ref8.root, props = _ref8.props, shouldOptimize = _ref8.shouldOptimize;
                var clip = root.ref.clip;
                var image = props.image, crop = props.crop, markup = props.markup, resize = props.resize, dirty = props.dirty;
                clip.crop = crop;
                clip.markup = markup;
                clip.resize = resize;
                clip.dirty = dirty;
                // don't update clip layout
                clip.opacity = shouldOptimize ? 0 : 1;
                // don't re-render if optimizing or hidden (width will be zero resulting in weird animations)
                if (shouldOptimize || root.rect.element.hidden) return;
                // calculate scaled preview image size
                var imageAspectRatio = image.height / image.width;
                var aspectRatio = crop.aspectRatio || imageAspectRatio;
                // calculate container size
                var containerWidth = root.rect.inner.width;
                var containerHeight = root.rect.inner.height;
                var fixedPreviewHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
                var minPreviewHeight = root.query('GET_IMAGE_PREVIEW_MIN_HEIGHT');
                var maxPreviewHeight = root.query('GET_IMAGE_PREVIEW_MAX_HEIGHT');
                var panelAspectRatio = root.query('GET_PANEL_ASPECT_RATIO');
                var allowMultiple = root.query('GET_ALLOW_MULTIPLE');
                if (panelAspectRatio && !allowMultiple) {
                    fixedPreviewHeight = containerWidth * panelAspectRatio;
                    aspectRatio = panelAspectRatio;
                }
                // determine clip width and height
                var clipHeight = fixedPreviewHeight !== null ? fixedPreviewHeight : Math.max(minPreviewHeight, Math.min(containerWidth * aspectRatio, maxPreviewHeight));
                var clipWidth = clipHeight / aspectRatio;
                if (clipWidth > containerWidth) {
                    clipWidth = containerWidth;
                    clipHeight = clipWidth * aspectRatio;
                }
                if (clipHeight > containerHeight) {
                    clipHeight = containerHeight;
                    clipWidth = containerHeight / aspectRatio;
                }
                clip.width = clipWidth;
                clip.height = clipHeight;
            }
        });
    };
    var SVG_MASK = '<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">\n    <defs>\n        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">\n            <stop offset=\'50%\' stop-color=\'#000000\'/>\n            <stop offset=\'56%\' stop-color=\'#0a0a0a\'/>\n            <stop offset=\'63%\' stop-color=\'#262626\'/>\n            <stop offset=\'69%\' stop-color=\'#4f4f4f\'/>\n            <stop offset=\'75%\' stop-color=\'#808080\'/>\n            <stop offset=\'81%\' stop-color=\'#b1b1b1\'/>\n            <stop offset=\'88%\' stop-color=\'#dadada\'/>\n            <stop offset=\'94%\' stop-color=\'#f6f6f6\'/>\n            <stop offset=\'100%\' stop-color=\'#ffffff\'/>\n        </radialGradient>\n        <mask id="mask-__UID__">\n            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>\n        </mask>\n    </defs>\n    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>\n</svg>';
    var SVGMaskUniqueId = 0;
    var createImageOverlayView = function createImageOverlayView(fpAPI) {
        return fpAPI.utils.createView({
            name: 'image-preview-overlay',
            tag: 'div',
            ignoreRect: true,
            create: function create(_ref) {
                var root = _ref.root, props = _ref.props;
                var mask = SVG_MASK;
                if (document.querySelector('base')) {
                    var url = new URL(window.location.href.replace(window.location.hash, '')).href;
                    mask = mask.replace(/url\(\#/g, 'url(' + url + '#');
                }
                SVGMaskUniqueId++;
                root.element.classList.add('filepond--image-preview-overlay-'.concat(props.status));
                root.element.innerHTML = mask.replace(/__UID__/g, SVGMaskUniqueId);
            },
            mixins: {
                styles: [
                    'opacity'
                ],
                animations: {
                    opacity: {
                        type: 'spring',
                        mass: 25
                    }
                }
            }
        });
    };
    /**
   * Bitmap Worker
   */ var BitmapWorker = function BitmapWorker() {
        self.onmessage = function(e) {
            createImageBitmap(e.data.message.file).then(function(bitmap) {
                self.postMessage({
                    id: e.data.id,
                    message: bitmap
                }, [
                    bitmap
                ]);
            });
        };
    };
    /**
   * ColorMatrix Worker
   */ var ColorMatrixWorker = function ColorMatrixWorker() {
        self.onmessage = function(e) {
            var imageData = e.data.message.imageData;
            var matrix = e.data.message.colorMatrix;
            var data1 = imageData.data;
            var l = data1.length;
            var m11 = matrix[0];
            var m12 = matrix[1];
            var m13 = matrix[2];
            var m14 = matrix[3];
            var m15 = matrix[4];
            var m21 = matrix[5];
            var m22 = matrix[6];
            var m23 = matrix[7];
            var m24 = matrix[8];
            var m25 = matrix[9];
            var m31 = matrix[10];
            var m32 = matrix[11];
            var m33 = matrix[12];
            var m34 = matrix[13];
            var m35 = matrix[14];
            var m41 = matrix[15];
            var m42 = matrix[16];
            var m43 = matrix[17];
            var m44 = matrix[18];
            var m45 = matrix[19];
            var index = 0, r = 0.0, g = 0.0, b = 0.0, a = 0.0;
            for(; index < l; index += 4){
                r = data1[index] / 255;
                g = data1[index + 1] / 255;
                b = data1[index + 2] / 255;
                a = data1[index + 3] / 255;
                data1[index] = Math.max(0, Math.min((r * m11 + g * m12 + b * m13 + a * m14 + m15) * 255, 255));
                data1[index + 1] = Math.max(0, Math.min((r * m21 + g * m22 + b * m23 + a * m24 + m25) * 255, 255));
                data1[index + 2] = Math.max(0, Math.min((r * m31 + g * m32 + b * m33 + a * m34 + m35) * 255, 255));
                data1[index + 3] = Math.max(0, Math.min((r * m41 + g * m42 + b * m43 + a * m44 + m45) * 255, 255));
            }
            self.postMessage({
                id: e.data.id,
                message: imageData
            }, [
                imageData.data.buffer
            ]);
        };
    };
    var getImageSize = function getImageSize(url, cb) {
        var image = new Image();
        image.onload = function() {
            var width = image.naturalWidth;
            var height = image.naturalHeight;
            image = null;
            cb(width, height);
        };
        image.src = url;
    };
    var transforms = {
        1: function _() {
            return [
                1,
                0,
                0,
                1,
                0,
                0
            ];
        },
        2: function _(width) {
            return [
                -1,
                0,
                0,
                1,
                width,
                0
            ];
        },
        3: function _(width, height) {
            return [
                -1,
                0,
                0,
                -1,
                width,
                height
            ];
        },
        4: function _(width, height) {
            return [
                1,
                0,
                0,
                -1,
                0,
                height
            ];
        },
        5: function _() {
            return [
                0,
                1,
                1,
                0,
                0,
                0
            ];
        },
        6: function _(width, height) {
            return [
                0,
                1,
                -1,
                0,
                height,
                0
            ];
        },
        7: function _(width, height) {
            return [
                0,
                -1,
                -1,
                0,
                height,
                width
            ];
        },
        8: function _(width) {
            return [
                0,
                -1,
                1,
                0,
                0,
                width
            ];
        }
    };
    var fixImageOrientation = function fixImageOrientation(ctx, width, height, orientation) {
        // no orientation supplied
        if (orientation === -1) {
            return;
        }
        ctx.transform.apply(ctx, transforms[orientation](width, height));
    };
    // draws the preview image to canvas
    var createPreviewImage = function createPreviewImage(data1, width, height, orientation) {
        // can't draw on half pixels
        width = Math.round(width);
        height = Math.round(height);
        // draw image
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        // if is rotated incorrectly swap width and height
        if (orientation >= 5 && orientation <= 8) {
            var _ref = [
                height,
                width
            ];
            width = _ref[0];
            height = _ref[1];
        }
        // correct image orientation
        fixImageOrientation(ctx, width, height, orientation);
        // draw the image
        ctx.drawImage(data1, 0, 0, width, height);
        return canvas;
    };
    var isBitmap = function isBitmap(file) {
        return /^image/.test(file.type) && !/svg/.test(file.type);
    };
    var MAX_WIDTH = 10;
    var MAX_HEIGHT = 10;
    var calculateAverageColor = function calculateAverageColor(image) {
        var scalar = Math.min(MAX_WIDTH / image.width, MAX_HEIGHT / image.height);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = canvas.width = Math.ceil(image.width * scalar);
        var height = canvas.height = Math.ceil(image.height * scalar);
        ctx.drawImage(image, 0, 0, width, height);
        var data1 = null;
        try {
            data1 = ctx.getImageData(0, 0, width, height).data;
        } catch (e) {
            return null;
        }
        var l = data1.length;
        var r = 0;
        var g = 0;
        var b = 0;
        var i = 0;
        for(; i < l; i += 4){
            r += data1[i] * data1[i];
            g += data1[i + 1] * data1[i + 1];
            b += data1[i + 2] * data1[i + 2];
        }
        r = averageColor(r, l);
        g = averageColor(g, l);
        b = averageColor(b, l);
        return {
            r: r,
            g: g,
            b: b
        };
    };
    var averageColor = function averageColor(c, l) {
        return Math.floor(Math.sqrt(c / (l / 4)));
    };
    var cloneCanvas = function cloneCanvas(origin, target) {
        target = target || document.createElement('canvas');
        target.width = origin.width;
        target.height = origin.height;
        var ctx = target.getContext('2d');
        ctx.drawImage(origin, 0, 0);
        return target;
    };
    var cloneImageData = function cloneImageData(imageData) {
        var id;
        try {
            id = new ImageData(imageData.width, imageData.height);
        } catch (e) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            id = ctx.createImageData(imageData.width, imageData.height);
        }
        id.data.set(new Uint8ClampedArray(imageData.data));
        return id;
    };
    var loadImage = function loadImage(url) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function(e) {
                reject(e);
            };
            img.src = url;
        });
    };
    var createImageWrapperView = function createImageWrapperView(_) {
        // create overlay view
        var OverlayView = createImageOverlayView(_);
        var ImageView = createImageView(_);
        var createWorker = _.utils.createWorker;
        var applyFilter = function applyFilter(root, filter, target) {
            return new Promise(function(resolve) {
                // will store image data for future filter updates
                if (!root.ref.imageData) {
                    root.ref.imageData = target.getContext('2d').getImageData(0, 0, target.width, target.height);
                }
                // get image data reference
                var imageData = cloneImageData(root.ref.imageData);
                if (!filter || filter.length !== 20) {
                    target.getContext('2d').putImageData(imageData, 0, 0);
                    return resolve();
                }
                var worker = createWorker(ColorMatrixWorker);
                worker.post({
                    imageData: imageData,
                    colorMatrix: filter
                }, function(response) {
                    // apply filtered colors
                    target.getContext('2d').putImageData(response, 0, 0);
                    // stop worker
                    worker.terminate();
                    // done!
                    resolve();
                }, [
                    imageData.data.buffer
                ]);
            });
        };
        var removeImageView = function removeImageView(root, imageView) {
            root.removeChildView(imageView);
            imageView.image.width = 1;
            imageView.image.height = 1;
            imageView._destroy();
        };
        // remove an image
        var shiftImage = function shiftImage(_ref) {
            var root = _ref.root;
            var imageView = root.ref.images.shift();
            imageView.opacity = 0;
            imageView.translateY = -15;
            root.ref.imageViewBin.push(imageView);
            return imageView;
        };
        // add new image
        var pushImage = function pushImage(_ref2) {
            var root = _ref2.root, props = _ref2.props, image = _ref2.image;
            var id = props.id;
            var item = root.query('GET_ITEM', {
                id: id
            });
            if (!item) return;
            var crop = item.getMetadata('crop') || {
                center: {
                    x: 0.5,
                    y: 0.5
                },
                flip: {
                    horizontal: false,
                    vertical: false
                },
                zoom: 1,
                rotation: 0,
                aspectRatio: null
            };
            var background = root.query('GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR');
            var markup;
            var resize;
            var dirty = false;
            if (root.query('GET_IMAGE_PREVIEW_MARKUP_SHOW')) {
                markup = item.getMetadata('markup') || [];
                resize = item.getMetadata('resize');
                dirty = true;
            }
            // append image presenter
            var imageView = root.appendChildView(root.createChildView(ImageView, {
                id: id,
                image: image,
                crop: crop,
                resize: resize,
                markup: markup,
                dirty: dirty,
                background: background,
                opacity: 0,
                scaleX: 1.15,
                scaleY: 1.15,
                translateY: 15
            }), root.childViews.length);
            root.ref.images.push(imageView);
            // reveal the preview image
            imageView.opacity = 1;
            imageView.scaleX = 1;
            imageView.scaleY = 1;
            imageView.translateY = 0;
            // the preview is now ready to be drawn
            setTimeout(function() {
                root.dispatch('DID_IMAGE_PREVIEW_SHOW', {
                    id: id
                });
            }, 250);
        };
        var updateImage = function updateImage(_ref3) {
            var root = _ref3.root, props = _ref3.props;
            var item = root.query('GET_ITEM', {
                id: props.id
            });
            if (!item) return;
            var imageView = root.ref.images[root.ref.images.length - 1];
            imageView.crop = item.getMetadata('crop');
            imageView.background = root.query('GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR');
            if (root.query('GET_IMAGE_PREVIEW_MARKUP_SHOW')) {
                imageView.dirty = true;
                imageView.resize = item.getMetadata('resize');
                imageView.markup = item.getMetadata('markup');
            }
        };
        // replace image preview
        var didUpdateItemMetadata = function didUpdateItemMetadata(_ref4) {
            var root = _ref4.root, props = _ref4.props, action = _ref4.action;
            // only filter and crop trigger redraw
            if (!/crop|filter|markup|resize/.test(action.change.key)) return;
            // no images to update, exit
            if (!root.ref.images.length) return;
            // no item found, exit
            var item = root.query('GET_ITEM', {
                id: props.id
            });
            if (!item) return;
            // for now, update existing image when filtering
            if (/filter/.test(action.change.key)) {
                var imageView = root.ref.images[root.ref.images.length - 1];
                applyFilter(root, action.change.value, imageView.image);
                return;
            }
            if (/crop|markup|resize/.test(action.change.key)) {
                var crop = item.getMetadata('crop');
                var image = root.ref.images[root.ref.images.length - 1];
                // if aspect ratio has changed, we need to create a new image
                if (crop && crop.aspectRatio && image.crop && image.crop.aspectRatio && Math.abs(crop.aspectRatio - image.crop.aspectRatio) > 0.00001) {
                    var _imageView = shiftImage({
                        root: root
                    });
                    pushImage({
                        root: root,
                        props: props,
                        image: cloneCanvas(_imageView.image)
                    });
                } else {
                    updateImage({
                        root: root,
                        props: props
                    });
                }
            }
        };
        var canCreateImageBitmap = function canCreateImageBitmap(file) {
            // Firefox versions before 58 will freeze when running createImageBitmap
            // in a Web Worker so we detect those versions and return false for support
            var userAgent = window.navigator.userAgent;
            var isFirefox = userAgent.match(/Firefox\/([0-9]+)\./);
            var firefoxVersion = isFirefox ? parseInt(isFirefox[1]) : null;
            if (firefoxVersion !== null && firefoxVersion <= 58) return false;
            return 'createImageBitmap' in window && isBitmap(file);
        };
        /**
     * Write handler for when preview container has been created
     */ var didCreatePreviewContainer = function didCreatePreviewContainer(_ref5) {
            var root = _ref5.root, props = _ref5.props;
            var id = props.id;
            // we need to get the file data to determine the eventual image size
            var item = root.query('GET_ITEM', id);
            if (!item) return;
            // get url to file (we'll revoke it later on when done)
            var fileURL = URL.createObjectURL(item.file);
            // determine image size of this item
            getImageSize(fileURL, function(width, height) {
                // we can now scale the panel to the final size
                root.dispatch('DID_IMAGE_PREVIEW_CALCULATE_SIZE', {
                    id: id,
                    width: width,
                    height: height
                });
            });
        };
        var drawPreview = function drawPreview(_ref6) {
            var root = _ref6.root, props = _ref6.props;
            var id = props.id;
            // we need to get the file data to determine the eventual image size
            var item = root.query('GET_ITEM', id);
            if (!item) return;
            // get url to file (we'll revoke it later on when done)
            var fileURL = URL.createObjectURL(item.file);
            // fallback
            var loadPreviewFallback = function loadPreviewFallback() {
                // let's scale the image in the main thread :(
                loadImage(fileURL).then(previewImageLoaded);
            };
            // image is now ready
            var previewImageLoaded = function previewImageLoaded(imageData) {
                // the file url is no longer needed
                URL.revokeObjectURL(fileURL);
                // draw the scaled down version here and use that as source so bitmapdata can be closed
                // orientation info
                var exif = item.getMetadata('exif') || {};
                var orientation = exif.orientation || -1;
                // get width and height from action, and swap if orientation is incorrect
                var width = imageData.width, height = imageData.height;
                // if no width or height, just return early.
                if (!width || !height) return;
                if (orientation >= 5 && orientation <= 8) {
                    var _ref7 = [
                        height,
                        width
                    ];
                    width = _ref7[0];
                    height = _ref7[1];
                }
                // scale canvas based on pixel density
                // we multiply by .75 as that creates smaller but still clear images on screens with high res displays
                var pixelDensityFactor = Math.max(1, window.devicePixelRatio * 0.75);
                // we want as much pixels to work with as possible,
                // this multiplies the minimum image resolution,
                // so when zooming in it doesn't get too blurry
                var zoomFactor = root.query('GET_IMAGE_PREVIEW_ZOOM_FACTOR');
                // imaeg scale factor
                var scaleFactor = zoomFactor * pixelDensityFactor;
                // calculate scaled preview image size
                var previewImageRatio = height / width;
                // calculate image preview height and width
                var previewContainerWidth = root.rect.element.width;
                var previewContainerHeight = root.rect.element.height;
                var imageWidth = previewContainerWidth;
                var imageHeight = imageWidth * previewImageRatio;
                if (previewImageRatio > 1) {
                    imageWidth = Math.min(width, previewContainerWidth * scaleFactor);
                    imageHeight = imageWidth * previewImageRatio;
                } else {
                    imageHeight = Math.min(height, previewContainerHeight * scaleFactor);
                    imageWidth = imageHeight / previewImageRatio;
                }
                // transfer to image tag so no canvas memory wasted on iOS
                var previewImage = createPreviewImage(imageData, imageWidth, imageHeight, orientation);
                // done
                var done = function done() {
                    // calculate average image color, disabled for now
                    var averageColor = root.query('GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR') ? calculateAverageColor(data) : null;
                    item.setMetadata('color', averageColor, true);
                    // data has been transferred to canvas ( if was ImageBitmap )
                    if ('close' in imageData) {
                        imageData.close();
                    }
                    // show the overlay
                    root.ref.overlayShadow.opacity = 1;
                    // create the first image
                    pushImage({
                        root: root,
                        props: props,
                        image: previewImage
                    });
                };
                // apply filter
                var filter = item.getMetadata('filter');
                if (filter) {
                    applyFilter(root, filter, previewImage).then(done);
                } else {
                    done();
                }
            };
            // if we support scaling using createImageBitmap we use a worker
            if (canCreateImageBitmap(item.file)) {
                // let's scale the image in a worker
                var worker = createWorker(BitmapWorker);
                worker.post({
                    file: item.file
                }, function(imageBitmap) {
                    // destroy worker
                    worker.terminate();
                    // no bitmap returned, must be something wrong,
                    // try the oldschool way
                    if (!imageBitmap) {
                        loadPreviewFallback();
                        return;
                    }
                    // yay we got our bitmap, let's continue showing the preview
                    previewImageLoaded(imageBitmap);
                });
            } else {
                // create fallback preview
                loadPreviewFallback();
            }
        };
        /**
     * Write handler for when the preview image is ready to be animated
     */ var didDrawPreview = function didDrawPreview(_ref8) {
            var root = _ref8.root;
            // get last added image
            var image = root.ref.images[root.ref.images.length - 1];
            image.translateY = 0;
            image.scaleX = 1.0;
            image.scaleY = 1.0;
            image.opacity = 1;
        };
        /**
     * Write handler for when the preview has been loaded
     */ var restoreOverlay = function restoreOverlay(_ref9) {
            var root = _ref9.root;
            root.ref.overlayShadow.opacity = 1;
            root.ref.overlayError.opacity = 0;
            root.ref.overlaySuccess.opacity = 0;
        };
        var didThrowError = function didThrowError(_ref10) {
            var root = _ref10.root;
            root.ref.overlayShadow.opacity = 0.25;
            root.ref.overlayError.opacity = 1;
        };
        var didCompleteProcessing = function didCompleteProcessing(_ref11) {
            var root = _ref11.root;
            root.ref.overlayShadow.opacity = 0.25;
            root.ref.overlaySuccess.opacity = 1;
        };
        /**
     * Constructor
     */ var create = function create(_ref12) {
            var root = _ref12.root;
            // image view
            root.ref.images = [];
            // the preview image data (we need this to filter the image)
            root.ref.imageData = null;
            // image bin
            root.ref.imageViewBin = [];
            // image overlays
            root.ref.overlayShadow = root.appendChildView(root.createChildView(OverlayView, {
                opacity: 0,
                status: 'idle'
            }));
            root.ref.overlaySuccess = root.appendChildView(root.createChildView(OverlayView, {
                opacity: 0,
                status: 'success'
            }));
            root.ref.overlayError = root.appendChildView(root.createChildView(OverlayView, {
                opacity: 0,
                status: 'failure'
            }));
        };
        return _.utils.createView({
            name: 'image-preview-wrapper',
            create: create,
            styles: [
                'height'
            ],
            apis: [
                'height'
            ],
            destroy: function destroy(_ref13) {
                var root = _ref13.root;
                // we resize the image so memory on iOS 12 is released more quickly (it seems)
                root.ref.images.forEach(function(imageView) {
                    imageView.image.width = 1;
                    imageView.image.height = 1;
                });
            },
            didWriteView: function didWriteView(_ref14) {
                var root = _ref14.root;
                root.ref.images.forEach(function(imageView) {
                    imageView.dirty = false;
                });
            },
            write: _.utils.createRoute({
                // image preview stated
                DID_IMAGE_PREVIEW_DRAW: didDrawPreview,
                DID_IMAGE_PREVIEW_CONTAINER_CREATE: didCreatePreviewContainer,
                DID_FINISH_CALCULATE_PREVIEWSIZE: drawPreview,
                DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata,
                // file states
                DID_THROW_ITEM_LOAD_ERROR: didThrowError,
                DID_THROW_ITEM_PROCESSING_ERROR: didThrowError,
                DID_THROW_ITEM_INVALID: didThrowError,
                DID_COMPLETE_ITEM_PROCESSING: didCompleteProcessing,
                DID_START_ITEM_PROCESSING: restoreOverlay,
                DID_REVERT_ITEM_PROCESSING: restoreOverlay
            }, function(_ref15) {
                var root = _ref15.root;
                // views on death row
                var viewsToRemove = root.ref.imageViewBin.filter(function(imageView) {
                    return imageView.opacity === 0;
                });
                // views to retain
                root.ref.imageViewBin = root.ref.imageViewBin.filter(function(imageView) {
                    return imageView.opacity > 0;
                });
                // remove these views
                viewsToRemove.forEach(function(imageView) {
                    return removeImageView(root, imageView);
                });
                viewsToRemove.length = 0;
            })
        });
    };
    /**
   * Image Preview Plugin
   */ var plugin = function plugin(fpAPI) {
        var addFilter = fpAPI.addFilter, utils = fpAPI.utils;
        var Type = utils.Type, createRoute = utils.createRoute, isFile = utils.isFile;
        // imagePreviewView
        var imagePreviewView = createImageWrapperView(fpAPI);
        // called for each view that is created right after the 'create' method
        addFilter('CREATE_VIEW', function(viewAPI) {
            // get reference to created view
            var is = viewAPI.is, view = viewAPI.view, query = viewAPI.query;
            // only hook up to item view and only if is enabled for this cropper
            if (!is('file') || !query('GET_ALLOW_IMAGE_PREVIEW')) return;
            // create the image preview plugin, but only do so if the item is an image
            var didLoadItem = function didLoadItem(_ref) {
                var root = _ref.root, props = _ref.props;
                var id = props.id;
                var item = query('GET_ITEM', id);
                // item could theoretically have been removed in the mean time
                if (!item || !isFile(item.file) || item.archived) return;
                // get the file object
                var file = item.file;
                // exit if this is not an image
                if (!isPreviewableImage(file)) return;
                // test if is filtered
                if (!query('GET_IMAGE_PREVIEW_FILTER_ITEM')(item)) return;
                // exit if image size is too high and no createImageBitmap support
                // this would simply bring the browser to its knees and that is not what we want
                var supportsCreateImageBitmap = 'createImageBitmap' in (window || {});
                var maxPreviewFileSize = query('GET_IMAGE_PREVIEW_MAX_FILE_SIZE');
                if (!supportsCreateImageBitmap && maxPreviewFileSize && file.size > maxPreviewFileSize) return;
                // set preview view
                root.ref.imagePreview = view.appendChildView(view.createChildView(imagePreviewView, {
                    id: id
                }));
                // update height if is fixed
                var fixedPreviewHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
                if (fixedPreviewHeight) {
                    root.dispatch('DID_UPDATE_PANEL_HEIGHT', {
                        id: item.id,
                        height: fixedPreviewHeight
                    });
                }
                // now ready
                var queue = !supportsCreateImageBitmap && file.size > query('GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE');
                root.dispatch('DID_IMAGE_PREVIEW_CONTAINER_CREATE', {
                    id: id
                }, queue);
            };
            var rescaleItem = function rescaleItem(root, props) {
                if (!root.ref.imagePreview) return;
                var id = props.id;
                // get item
                var item = root.query('GET_ITEM', {
                    id: id
                });
                if (!item) return;
                // if is fixed height or panel has aspect ratio, exit here, height has already been defined
                var panelAspectRatio = root.query('GET_PANEL_ASPECT_RATIO');
                var itemPanelAspectRatio = root.query('GET_ITEM_PANEL_ASPECT_RATIO');
                var fixedHeight = root.query('GET_IMAGE_PREVIEW_HEIGHT');
                if (panelAspectRatio || itemPanelAspectRatio || fixedHeight) return;
                // no data!
                var _root$ref = root.ref, imageWidth = _root$ref.imageWidth, imageHeight = _root$ref.imageHeight;
                if (!imageWidth || !imageHeight) return;
                // get height min and max
                var minPreviewHeight = root.query('GET_IMAGE_PREVIEW_MIN_HEIGHT');
                var maxPreviewHeight = root.query('GET_IMAGE_PREVIEW_MAX_HEIGHT');
                // orientation info
                var exif = item.getMetadata('exif') || {};
                var orientation = exif.orientation || -1;
                // get width and height from action, and swap of orientation is incorrect
                if (orientation >= 5 && orientation <= 8) {
                    var _ref2 = [
                        imageHeight,
                        imageWidth
                    ];
                    imageWidth = _ref2[0];
                    imageHeight = _ref2[1];
                }
                // scale up width and height when we're dealing with an SVG
                if (!isBitmap(item.file) || root.query('GET_IMAGE_PREVIEW_UPSCALE')) {
                    var scalar = 2048 / imageWidth;
                    imageWidth *= scalar;
                    imageHeight *= scalar;
                }
                // image aspect ratio
                var imageAspectRatio = imageHeight / imageWidth;
                // we need the item to get to the crop size
                var previewAspectRatio = (item.getMetadata('crop') || {}).aspectRatio || imageAspectRatio;
                // preview height range
                var previewHeightMax = Math.max(minPreviewHeight, Math.min(imageHeight, maxPreviewHeight));
                var itemWidth = root.rect.element.width;
                var previewHeight = Math.min(itemWidth * previewAspectRatio, previewHeightMax);
                // request update to panel height
                root.dispatch('DID_UPDATE_PANEL_HEIGHT', {
                    id: item.id,
                    height: previewHeight
                });
            };
            var didResizeView = function didResizeView(_ref3) {
                var root = _ref3.root;
                // actions in next write operation
                root.ref.shouldRescale = true;
            };
            var didUpdateItemMetadata = function didUpdateItemMetadata(_ref4) {
                var root = _ref4.root, action = _ref4.action;
                if (action.change.key !== 'crop') return;
                // actions in next write operation
                root.ref.shouldRescale = true;
            };
            var didCalculatePreviewSize = function didCalculatePreviewSize(_ref5) {
                var root = _ref5.root, action = _ref5.action;
                // remember dimensions
                root.ref.imageWidth = action.width;
                root.ref.imageHeight = action.height;
                // actions in next write operation
                root.ref.shouldRescale = true;
                root.ref.shouldDrawPreview = true;
                // as image load could take a while and fire when draw loop is resting we need to give it a kick
                root.dispatch('KICK');
            };
            // start writing
            view.registerWriter(createRoute({
                DID_RESIZE_ROOT: didResizeView,
                DID_STOP_RESIZE: didResizeView,
                DID_LOAD_ITEM: didLoadItem,
                DID_IMAGE_PREVIEW_CALCULATE_SIZE: didCalculatePreviewSize,
                DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata
            }, function(_ref6) {
                var root = _ref6.root, props = _ref6.props;
                // no preview view attached
                if (!root.ref.imagePreview) return;
                // don't do anything while hidden
                if (root.rect.element.hidden) return;
                // resize the item panel
                if (root.ref.shouldRescale) {
                    rescaleItem(root, props);
                    root.ref.shouldRescale = false;
                }
                if (root.ref.shouldDrawPreview) {
                    // queue till next frame so we're sure the height has been applied this forces the draw image call inside the wrapper view to use the correct height
                    requestAnimationFrame(function() {
                        // this requestAnimationFrame nesting is horrible but it fixes an issue with 100hz displays on Chrome
                        // https://github.com/pqina/filepond-plugin-image-preview/issues/57
                        requestAnimationFrame(function() {
                            root.dispatch('DID_FINISH_CALCULATE_PREVIEWSIZE', {
                                id: props.id
                            });
                        });
                    });
                    root.ref.shouldDrawPreview = false;
                }
            }));
        });
        // expose plugin
        return {
            options: {
                // Enable or disable image preview
                allowImagePreview: [
                    true,
                    Type.BOOLEAN
                ],
                // filters file items to determine which are shown as preview
                imagePreviewFilterItem: [
                    function() {
                        return true;
                    },
                    Type.FUNCTION
                ],
                // Fixed preview height
                imagePreviewHeight: [
                    null,
                    Type.INT
                ],
                // Min image height
                imagePreviewMinHeight: [
                    44,
                    Type.INT
                ],
                // Max image height
                imagePreviewMaxHeight: [
                    256,
                    Type.INT
                ],
                // Max size of preview file for when createImageBitmap is not supported
                imagePreviewMaxFileSize: [
                    null,
                    Type.INT
                ],
                // The amount of extra pixels added to the image preview to allow comfortable zooming
                imagePreviewZoomFactor: [
                    2,
                    Type.INT
                ],
                // Should we upscale small images to fit the max bounding box of the preview area
                imagePreviewUpscale: [
                    false,
                    Type.BOOLEAN
                ],
                // Max size of preview file that we allow to try to instant preview if createImageBitmap is not supported, else image is queued for loading
                imagePreviewMaxInstantPreviewFileSize: [
                    1000000,
                    Type.INT
                ],
                // Style of the transparancy indicator used behind images
                imagePreviewTransparencyIndicator: [
                    null,
                    Type.STRING
                ],
                // Enables or disables reading average image color
                imagePreviewCalculateAverageImageColor: [
                    false,
                    Type.BOOLEAN
                ],
                // Enables or disables the previewing of markup
                imagePreviewMarkupShow: [
                    true,
                    Type.BOOLEAN
                ],
                // Allows filtering of markup to only show certain shapes
                imagePreviewMarkupFilter: [
                    function() {
                        return true;
                    },
                    Type.FUNCTION
                ]
            }
        };
    };
    // fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    if (isBrowser) {
        document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', {
            detail: plugin
        }));
    }
    return plugin;
});
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/atoa/atoa.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = function atoa(a, n) {
    return Array.prototype.slice.call(a, n);
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/ticky/ticky-browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var si = typeof setImmediate === 'function', tick;
if (si) {
    tick = function(fn) {
        setImmediate(fn);
    };
} else {
    tick = function(fn) {
        setTimeout(fn, 0);
    };
}
module.exports = tick;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/contra/debounce.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var ticky = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/ticky/ticky-browser.js [app-client] (ecmascript)");
module.exports = function debounce(fn, args, ctx) {
    if (!fn) {
        return;
    }
    ticky(function run() {
        fn.apply(ctx || null, args || []);
    });
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/contra/emitter.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var atoa = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/atoa/atoa.js [app-client] (ecmascript)");
var debounce = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/contra/debounce.js [app-client] (ecmascript)");
module.exports = function emitter(thing, options) {
    var opts = options || {};
    var evt = {};
    if (thing === undefined) {
        thing = {};
    }
    thing.on = function(type, fn) {
        if (!evt[type]) {
            evt[type] = [
                fn
            ];
        } else {
            evt[type].push(fn);
        }
        return thing;
    };
    thing.once = function(type, fn) {
        fn._once = true; // thing.off(fn) still works!
        thing.on(type, fn);
        return thing;
    };
    thing.off = function(type, fn) {
        var c = arguments.length;
        if (c === 1) {
            delete evt[type];
        } else if (c === 0) {
            evt = {};
        } else {
            var et = evt[type];
            if (!et) {
                return thing;
            }
            et.splice(et.indexOf(fn), 1);
        }
        return thing;
    };
    thing.emit = function() {
        var args = atoa(arguments);
        return thing.emitterSnapshot(args.shift()).apply(this, args);
    };
    thing.emitterSnapshot = function(type) {
        var et = (evt[type] || []).slice(0);
        return function() {
            var args = atoa(arguments);
            var ctx = this || thing;
            if (type === 'error' && opts.throws !== false && !et.length) {
                throw args.length === 1 ? args[0] : args;
            }
            et.forEach(function emitter(listen) {
                if (opts.async) {
                    debounce(listen, args, ctx);
                } else {
                    listen.apply(ctx, args);
                }
                if (listen._once) {
                    thing.off(type, listen);
                }
            });
            return thing;
        };
    };
    return thing;
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/custom-event/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var NativeCustomEvent = /*TURBOPACK member replacement*/ __turbopack_context__.g.CustomEvent;
function useNative() {
    try {
        var p = new NativeCustomEvent('cat', {
            detail: {
                foo: 'bar'
            }
        });
        return 'cat' === p.type && 'bar' === p.detail.foo;
    } catch (e) {}
    return false;
}
/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */ module.exports = useNative() ? NativeCustomEvent : // IE >= 9
'function' === typeof document.createEvent ? function CustomEvent(type, params) {
    var e = document.createEvent('CustomEvent');
    if (params) {
        e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
    } else {
        e.initCustomEvent(type, false, false, void 0);
    }
    return e;
} : // IE <= 8
function CustomEvent(type, params) {
    var e = document.createEventObject();
    e.type = type;
    if (params) {
        e.bubbles = Boolean(params.bubbles);
        e.cancelable = Boolean(params.cancelable);
        e.detail = params.detail;
    } else {
        e.bubbles = false;
        e.cancelable = false;
        e.detail = void 0;
    }
    return e;
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/crossvent/src/eventmap.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var eventmap = [];
var eventname = '';
var ron = /^on/;
for(eventname in /*TURBOPACK member replacement*/ __turbopack_context__.g){
    if (ron.test(eventname)) {
        eventmap.push(eventname.slice(2));
    }
}
module.exports = eventmap;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/crossvent/src/crossvent.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var customEvent = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/custom-event/index.js [app-client] (ecmascript)");
var eventmap = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/crossvent/src/eventmap.js [app-client] (ecmascript)");
var doc = /*TURBOPACK member replacement*/ __turbopack_context__.g.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];
if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.addEventListener) {
    addEvent = addEventHard;
    removeEvent = removeEventHard;
}
module.exports = {
    add: addEvent,
    remove: removeEvent,
    fabricate: fabricateEvent
};
function addEventEasy(el, type, fn, capturing) {
    return el.addEventListener(type, fn, capturing);
}
function addEventHard(el, type, fn) {
    return el.attachEvent('on' + type, wrap(el, type, fn));
}
function removeEventEasy(el, type, fn, capturing) {
    return el.removeEventListener(type, fn, capturing);
}
function removeEventHard(el, type, fn) {
    var listener = unwrap(el, type, fn);
    if (listener) {
        return el.detachEvent('on' + type, listener);
    }
}
function fabricateEvent(el, type, model) {
    var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
    if (el.dispatchEvent) {
        el.dispatchEvent(e);
    } else {
        el.fireEvent('on' + type, e);
    }
    function makeClassicEvent() {
        var e;
        if (doc.createEvent) {
            e = doc.createEvent('Event');
            e.initEvent(type, true, true);
        } else if (doc.createEventObject) {
            e = doc.createEventObject();
        }
        return e;
    }
    function makeCustomEvent() {
        return new customEvent(type, {
            detail: model
        });
    }
}
function wrapperFactory(el, type, fn) {
    return function wrapper(originalEvent) {
        var e = originalEvent || /*TURBOPACK member replacement*/ __turbopack_context__.g.event;
        e.target = e.target || e.srcElement;
        e.preventDefault = e.preventDefault || function preventDefault() {
            e.returnValue = false;
        };
        e.stopPropagation = e.stopPropagation || function stopPropagation() {
            e.cancelBubble = true;
        };
        e.which = e.which || e.keyCode;
        fn.call(el, e);
    };
}
function wrap(el, type, fn) {
    var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
    hardCache.push({
        wrapper: wrapper,
        element: el,
        type: type,
        fn: fn
    });
    return wrapper;
}
function unwrap(el, type, fn) {
    var i = find(el, type, fn);
    if (i) {
        var wrapper = hardCache[i].wrapper;
        hardCache.splice(i, 1); // free up a tad of memory
        return wrapper;
    }
}
function find(el, type, fn) {
    var i, item;
    for(i = 0; i < hardCache.length; i++){
        item = hardCache[i];
        if (item.element === el && item.type === type && item.fn === fn) {
            return i;
        }
    }
}
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/dragula/classes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';
function lookupClass(className) {
    var cached = cache[className];
    if (cached) {
        cached.lastIndex = 0;
    } else {
        cache[className] = cached = new RegExp(start + className + end, 'g');
    }
    return cached;
}
function addClass(el, className) {
    var current = el.className;
    if (!current.length) {
        el.className = className;
    } else if (!lookupClass(className).test(current)) {
        el.className += ' ' + className;
    }
}
function rmClass(el, className) {
    el.className = el.className.replace(lookupClass(className), ' ').trim();
}
module.exports = {
    add: addClass,
    rm: rmClass
};
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/dragula/dragula.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var emitter = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/contra/emitter.js [app-client] (ecmascript)");
var crossvent = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/crossvent/src/crossvent.js [app-client] (ecmascript)");
var classes = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/dragula/classes.js [app-client] (ecmascript)");
var doc = document;
var documentElement = doc.documentElement;
function dragula(initialContainers, options) {
    var len = arguments.length;
    if (len === 1 && Array.isArray(initialContainers) === false) {
        options = initialContainers;
        initialContainers = [];
    }
    var _mirror; // mirror image
    var _source; // source container
    var _item; // item being dragged
    var _offsetX; // reference x
    var _offsetY; // reference y
    var _moveX; // reference move x
    var _moveY; // reference move y
    var _initialSibling; // reference sibling when grabbed
    var _currentSibling; // reference sibling now
    var _copy; // item used for copying
    var _renderTimer; // timer for setTimeout renderMirrorImage
    var _lastDropTarget = null; // last container item was over
    var _grabbed; // holds mousedown context until first mousemove
    var o = options || {};
    if (o.moves === void 0) {
        o.moves = always;
    }
    if (o.accepts === void 0) {
        o.accepts = always;
    }
    if (o.invalid === void 0) {
        o.invalid = invalidTarget;
    }
    if (o.containers === void 0) {
        o.containers = initialContainers || [];
    }
    if (o.isContainer === void 0) {
        o.isContainer = never;
    }
    if (o.copy === void 0) {
        o.copy = false;
    }
    if (o.copySortSource === void 0) {
        o.copySortSource = false;
    }
    if (o.revertOnSpill === void 0) {
        o.revertOnSpill = false;
    }
    if (o.removeOnSpill === void 0) {
        o.removeOnSpill = false;
    }
    if (o.direction === void 0) {
        o.direction = 'vertical';
    }
    if (o.ignoreInputTextSelection === void 0) {
        o.ignoreInputTextSelection = true;
    }
    if (o.mirrorContainer === void 0) {
        o.mirrorContainer = doc.body;
    }
    var drake = emitter({
        containers: o.containers,
        start: manualStart,
        end: end,
        cancel: cancel,
        remove: remove,
        destroy: destroy,
        canMove: canMove,
        dragging: false
    });
    if (o.removeOnSpill === true) {
        drake.on('over', spillOver).on('out', spillOut);
    }
    events();
    return drake;
    //TURBOPACK unreachable
    ;
    function isContainer(el) {
        return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
    }
    function events(remove) {
        var op = remove ? 'remove' : 'add';
        touchy(documentElement, op, 'mousedown', grab);
        touchy(documentElement, op, 'mouseup', release);
    }
    function eventualMovements(remove) {
        var op = remove ? 'remove' : 'add';
        touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
    }
    function movements(remove) {
        var op = remove ? 'remove' : 'add';
        crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
        crossvent[op](documentElement, 'click', preventGrabbed);
    }
    function destroy() {
        events(true);
        release({});
    }
    function preventGrabbed(e) {
        if (_grabbed) {
            e.preventDefault();
        }
    }
    function grab(e) {
        _moveX = e.clientX;
        _moveY = e.clientY;
        var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
        if (ignore) {
            return; // we only care about honest-to-god left clicks and touch events
        }
        var item = e.target;
        var context = canStart(item);
        if (!context) {
            return;
        }
        _grabbed = context;
        eventualMovements();
        if (e.type === 'mousedown') {
            if (isInput(item)) {
                item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
            } else {
                e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
            }
        }
    }
    function startBecauseMouseMoved(e) {
        if (!_grabbed) {
            return;
        }
        if (whichMouseButton(e) === 0) {
            release({});
            return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
        }
        // truthy check fixes #239, equality fixes #207
        if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
            return;
        }
        if (o.ignoreInputTextSelection) {
            var clientX = getCoord('clientX', e);
            var clientY = getCoord('clientY', e);
            var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
            if (isInput(elementBehindCursor)) {
                return;
            }
        }
        var grabbed = _grabbed; // call to end() unsets _grabbed
        eventualMovements(true);
        movements();
        end();
        start(grabbed);
        var offset = getOffset(_item);
        _offsetX = getCoord('pageX', e) - offset.left;
        _offsetY = getCoord('pageY', e) - offset.top;
        classes.add(_copy || _item, 'gu-transit');
        renderMirrorImage();
        drag(e);
    }
    function canStart(item) {
        if (drake.dragging && _mirror) {
            return;
        }
        if (isContainer(item)) {
            return; // don't drag container itself
        }
        var handle = item;
        while(getParent(item) && isContainer(getParent(item)) === false){
            if (o.invalid(item, handle)) {
                return;
            }
            item = getParent(item); // drag target should be a top element
            if (!item) {
                return;
            }
        }
        var source = getParent(item);
        if (!source) {
            return;
        }
        if (o.invalid(item, handle)) {
            return;
        }
        var movable = o.moves(item, source, handle, nextEl(item));
        if (!movable) {
            return;
        }
        return {
            item: item,
            source: source
        };
    }
    function canMove(item) {
        return !!canStart(item);
    }
    function manualStart(item) {
        var context = canStart(item);
        if (context) {
            start(context);
        }
    }
    function start(context) {
        if (isCopy(context.item, context.source)) {
            _copy = context.item.cloneNode(true);
            drake.emit('cloned', _copy, context.item, 'copy');
        }
        _source = context.source;
        _item = context.item;
        _initialSibling = _currentSibling = nextEl(context.item);
        drake.dragging = true;
        drake.emit('drag', _item, _source);
    }
    function invalidTarget() {
        return false;
    }
    function end() {
        if (!drake.dragging) {
            return;
        }
        var item = _copy || _item;
        drop(item, getParent(item));
    }
    function ungrab() {
        _grabbed = false;
        eventualMovements(true);
        movements(true);
    }
    function release(e) {
        ungrab();
        if (!drake.dragging) {
            return;
        }
        var item = _copy || _item;
        var clientX = getCoord('clientX', e);
        var clientY = getCoord('clientY', e);
        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
        if (dropTarget && (_copy && o.copySortSource || !_copy || dropTarget !== _source)) {
            drop(item, dropTarget);
        } else if (o.removeOnSpill) {
            remove();
        } else {
            cancel();
        }
    }
    function drop(item, target) {
        var parent = getParent(item);
        if (_copy && o.copySortSource && target === _source) {
            parent.removeChild(_item);
        }
        if (isInitialPlacement(target)) {
            drake.emit('cancel', item, _source, _source);
        } else {
            drake.emit('drop', item, target, _source, _currentSibling);
        }
        cleanup();
    }
    function remove() {
        if (!drake.dragging) {
            return;
        }
        var item = _copy || _item;
        var parent = getParent(item);
        if (parent) {
            parent.removeChild(item);
        }
        drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
        cleanup();
    }
    function cancel(revert) {
        if (!drake.dragging) {
            return;
        }
        var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
        var item = _copy || _item;
        var parent = getParent(item);
        var initial = isInitialPlacement(parent);
        if (initial === false && reverts) {
            if (_copy) {
                if (parent) {
                    parent.removeChild(_copy);
                }
            } else {
                _source.insertBefore(item, _initialSibling);
            }
        }
        if (initial || reverts) {
            drake.emit('cancel', item, _source, _source);
        } else {
            drake.emit('drop', item, parent, _source, _currentSibling);
        }
        cleanup();
    }
    function cleanup() {
        var item = _copy || _item;
        ungrab();
        removeMirrorImage();
        if (item) {
            classes.rm(item, 'gu-transit');
        }
        if (_renderTimer) {
            clearTimeout(_renderTimer);
        }
        drake.dragging = false;
        if (_lastDropTarget) {
            drake.emit('out', item, _lastDropTarget, _source);
        }
        drake.emit('dragend', item);
        _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
    }
    function isInitialPlacement(target, s) {
        var sibling;
        if (s !== void 0) {
            sibling = s;
        } else if (_mirror) {
            sibling = _currentSibling;
        } else {
            sibling = nextEl(_copy || _item);
        }
        return target === _source && sibling === _initialSibling;
    }
    function findDropTarget(elementBehindCursor, clientX, clientY) {
        var target = elementBehindCursor;
        while(target && !accepted()){
            target = getParent(target);
        }
        return target;
        //TURBOPACK unreachable
        ;
        function accepted() {
            var droppable = isContainer(target);
            if (droppable === false) {
                return false;
            }
            var immediate = getImmediateChild(target, elementBehindCursor);
            var reference = getReference(target, immediate, clientX, clientY);
            var initial = isInitialPlacement(target, reference);
            if (initial) {
                return true; // should always be able to drop it right back where it was
            }
            return o.accepts(_item, target, _source, reference);
        }
    }
    function drag(e) {
        if (!_mirror) {
            return;
        }
        e.preventDefault();
        var clientX = getCoord('clientX', e);
        var clientY = getCoord('clientY', e);
        var x = clientX - _offsetX;
        var y = clientY - _offsetY;
        _mirror.style.left = x + 'px';
        _mirror.style.top = y + 'px';
        var item = _copy || _item;
        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
        var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
        if (changed || dropTarget === null) {
            out();
            _lastDropTarget = dropTarget;
            over();
        }
        var parent = getParent(item);
        if (dropTarget === _source && _copy && !o.copySortSource) {
            if (parent) {
                parent.removeChild(item);
            }
            return;
        }
        var reference;
        var immediate = getImmediateChild(dropTarget, elementBehindCursor);
        if (immediate !== null) {
            reference = getReference(dropTarget, immediate, clientX, clientY);
        } else if (o.revertOnSpill === true && !_copy) {
            reference = _initialSibling;
            dropTarget = _source;
        } else {
            if (_copy && parent) {
                parent.removeChild(item);
            }
            return;
        }
        if (reference === null && changed || reference !== item && reference !== nextEl(item)) {
            _currentSibling = reference;
            dropTarget.insertBefore(item, reference);
            drake.emit('shadow', item, dropTarget, _source);
        }
        function moved(type) {
            drake.emit(type, item, _lastDropTarget, _source);
        }
        function over() {
            if (changed) {
                moved('over');
            }
        }
        function out() {
            if (_lastDropTarget) {
                moved('out');
            }
        }
    }
    function spillOver(el) {
        classes.rm(el, 'gu-hide');
    }
    function spillOut(el) {
        if (drake.dragging) {
            classes.add(el, 'gu-hide');
        }
    }
    function renderMirrorImage() {
        if (_mirror) {
            return;
        }
        var rect = _item.getBoundingClientRect();
        _mirror = _item.cloneNode(true);
        _mirror.style.width = getRectWidth(rect) + 'px';
        _mirror.style.height = getRectHeight(rect) + 'px';
        classes.rm(_mirror, 'gu-transit');
        classes.add(_mirror, 'gu-mirror');
        o.mirrorContainer.appendChild(_mirror);
        touchy(documentElement, 'add', 'mousemove', drag);
        classes.add(o.mirrorContainer, 'gu-unselectable');
        drake.emit('cloned', _mirror, _item, 'mirror');
    }
    function removeMirrorImage() {
        if (_mirror) {
            classes.rm(o.mirrorContainer, 'gu-unselectable');
            touchy(documentElement, 'remove', 'mousemove', drag);
            getParent(_mirror).removeChild(_mirror);
            _mirror = null;
        }
    }
    function getImmediateChild(dropTarget, target) {
        var immediate = target;
        while(immediate !== dropTarget && getParent(immediate) !== dropTarget){
            immediate = getParent(immediate);
        }
        if (immediate === documentElement) {
            return null;
        }
        return immediate;
    }
    function getReference(dropTarget, target, x, y) {
        var horizontal = o.direction === 'horizontal';
        var reference = target !== dropTarget ? inside() : outside();
        return reference;
        //TURBOPACK unreachable
        ;
        function outside() {
            var len = dropTarget.children.length;
            var i;
            var el;
            var rect;
            for(i = 0; i < len; i++){
                el = dropTarget.children[i];
                rect = el.getBoundingClientRect();
                if (horizontal && rect.left + rect.width / 2 > x) {
                    return el;
                }
                if (!horizontal && rect.top + rect.height / 2 > y) {
                    return el;
                }
            }
            return null;
        }
        function inside() {
            var rect = target.getBoundingClientRect();
            if (horizontal) {
                return resolve(x > rect.left + getRectWidth(rect) / 2);
            }
            return resolve(y > rect.top + getRectHeight(rect) / 2);
        }
        function resolve(after) {
            return after ? nextEl(target) : target;
        }
    }
    function isCopy(item, container) {
        return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
    }
}
function touchy(el, op, type, fn) {
    var touch = {
        mouseup: 'touchend',
        mousedown: 'touchstart',
        mousemove: 'touchmove'
    };
    var pointers = {
        mouseup: 'pointerup',
        mousedown: 'pointerdown',
        mousemove: 'pointermove'
    };
    var microsoft = {
        mouseup: 'MSPointerUp',
        mousedown: 'MSPointerDown',
        mousemove: 'MSPointerMove'
    };
    if (/*TURBOPACK member replacement*/ __turbopack_context__.g.navigator.pointerEnabled) {
        crossvent[op](el, pointers[type], fn);
    } else if (/*TURBOPACK member replacement*/ __turbopack_context__.g.navigator.msPointerEnabled) {
        crossvent[op](el, microsoft[type], fn);
    } else {
        crossvent[op](el, touch[type], fn);
        crossvent[op](el, type, fn);
    }
}
function whichMouseButton(e) {
    if (e.touches !== void 0) {
        return e.touches.length;
    }
    if (e.which !== void 0 && e.which !== 0) {
        return e.which;
    } // see https://github.com/bevacqua/dragula/issues/261
    if (e.buttons !== void 0) {
        return e.buttons;
    }
    var button = e.button;
    if (button !== void 0) {
        return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
    }
}
function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
        top: rect.top + getScroll('scrollTop', 'pageYOffset')
    };
}
function getScroll(scrollProp, offsetProp) {
    if (typeof /*TURBOPACK member replacement*/ __turbopack_context__.g[offsetProp] !== 'undefined') {
        return /*TURBOPACK member replacement*/ __turbopack_context__.g[offsetProp];
    }
    if (documentElement.clientHeight) {
        return documentElement[scrollProp];
    }
    return doc.body[scrollProp];
}
function getElementBehindPoint(point, x, y) {
    var p = point || {};
    var state = p.className;
    var el;
    p.className += ' gu-hide';
    el = doc.elementFromPoint(x, y);
    p.className = state;
    return el;
}
function never() {
    return false;
}
function always() {
    return true;
}
function getRectWidth(rect) {
    return rect.width || rect.right - rect.left;
}
function getRectHeight(rect) {
    return rect.height || rect.bottom - rect.top;
}
function getParent(el) {
    return el.parentNode === doc ? null : el.parentNode;
}
function isInput(el) {
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el);
}
function isEditable(el) {
    if (!el) {
        return false;
    } // no parents were editable
    if (el.contentEditable === 'false') {
        return false;
    } // stop the lookup
    if (el.contentEditable === 'true') {
        return true;
    } // found a contentEditable element in the chain
    return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}
function nextEl(el) {
    return el.nextElementSibling || manually();
    //TURBOPACK unreachable
    ;
    function manually() {
        var sibling = el;
        do {
            sibling = sibling.nextSibling;
        }while (sibling && sibling.nodeType !== 1)
        return sibling;
    }
}
function getEventHost(e) {
    // on touchend event, we have to use `e.changedTouches`
    // see http://stackoverflow.com/questions/7192563/touchend-event-properties
    // see https://github.com/bevacqua/dragula/issues/34
    if (e.targetTouches && e.targetTouches.length) {
        return e.targetTouches[0];
    }
    if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0];
    }
    return e;
}
function getCoord(coord, e) {
    var host = getEventHost(e);
    var missMap = {
        pageX: 'clientX',
        pageY: 'clientY' // IE8
    };
    if (coord in missMap && !(coord in host) && missMap[coord] in host) {
        coord = missMap[coord];
    }
    return host[coord];
}
module.exports = dragula;
}),
]);

//# sourceMappingURL=39735_1b16e7f2._.js.map