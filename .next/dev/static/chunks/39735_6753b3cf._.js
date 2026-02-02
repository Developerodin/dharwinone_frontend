(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/dharwin_boilerplate/node_modules/react-table/dist/react-table.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? factory(exports, __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)")) : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(exports1, React) {
    'use strict';
    React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
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
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
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
    function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (typeof res !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
    }
    var renderErr = 'Renderer Error ☝️';
    var actions = {
        init: 'init'
    };
    var defaultRenderer = function defaultRenderer(_ref) {
        var _ref$value = _ref.value, value = _ref$value === void 0 ? '' : _ref$value;
        return value;
    };
    var emptyRenderer = function emptyRenderer() {
        return React.createElement(React.Fragment, null, "\xA0");
    };
    var defaultColumn = {
        Cell: defaultRenderer,
        width: 150,
        minWidth: 0,
        maxWidth: Number.MAX_SAFE_INTEGER
    };
    function mergeProps() {
        for(var _len = arguments.length, propList = new Array(_len), _key = 0; _key < _len; _key++){
            propList[_key] = arguments[_key];
        }
        return propList.reduce(function(props, next) {
            var style = next.style, className = next.className, rest = _objectWithoutPropertiesLoose(next, [
                "style",
                "className"
            ]);
            props = _extends({}, props, {}, rest);
            if (style) {
                props.style = props.style ? _extends({}, props.style || {}, {}, style || {}) : style;
            }
            if (className) {
                props.className = props.className ? props.className + ' ' + className : className;
            }
            if (props.className === '') {
                delete props.className;
            }
            return props;
        }, {});
    }
    function handlePropGetter(prevProps, userProps, meta) {
        // Handle a lambda, pass it the previous props
        if (typeof userProps === 'function') {
            return handlePropGetter({}, userProps(prevProps, meta));
        } // Handle an array, merge each item as separate props
        if (Array.isArray(userProps)) {
            return mergeProps.apply(void 0, [
                prevProps
            ].concat(userProps));
        } // Handle an object by default, merge the two objects
        return mergeProps(prevProps, userProps);
    }
    var makePropGetter = function makePropGetter(hooks, meta) {
        if (meta === void 0) {
            meta = {};
        }
        return function(userProps) {
            if (userProps === void 0) {
                userProps = {};
            }
            return [].concat(hooks, [
                userProps
            ]).reduce(function(prev, next) {
                return handlePropGetter(prev, next, _extends({}, meta, {
                    userProps: userProps
                }));
            }, {});
        };
    };
    var reduceHooks = function reduceHooks(hooks, initial, meta, allowUndefined) {
        if (meta === void 0) {
            meta = {};
        }
        return hooks.reduce(function(prev, next) {
            var nextValue = next(prev, meta);
            {
                if (!allowUndefined && typeof nextValue === 'undefined') {
                    console.info(next);
                    throw new Error('React Table: A reducer hook ☝️ just returned undefined! This is not allowed.');
                }
            }
            return nextValue;
        }, initial);
    };
    var loopHooks = function loopHooks(hooks, context, meta) {
        if (meta === void 0) {
            meta = {};
        }
        return hooks.forEach(function(hook) {
            var nextValue = hook(context, meta);
            {
                if (typeof nextValue !== 'undefined') {
                    console.info(hook, nextValue);
                    throw new Error('React Table: A loop-type hook ☝️ just returned a value! This is not allowed.');
                }
            }
        });
    };
    function ensurePluginOrder(plugins, befores, pluginName, afters) {
        if (afters) {
            throw new Error("Defining plugins in the \"after\" section of ensurePluginOrder is no longer supported (see plugin " + pluginName + ")");
        }
        var pluginIndex = plugins.findIndex(function(plugin) {
            return plugin.pluginName === pluginName;
        });
        if (pluginIndex === -1) {
            {
                throw new Error("The plugin \"" + pluginName + "\" was not found in the plugin list!\nThis usually means you need to need to name your plugin hook by setting the 'pluginName' property of the hook function, eg:\n\n  " + pluginName + ".pluginName = '" + pluginName + "'\n");
            }
        }
        befores.forEach(function(before) {
            var beforeIndex = plugins.findIndex(function(plugin) {
                return plugin.pluginName === before;
            });
            if (beforeIndex > -1 && beforeIndex > pluginIndex) {
                {
                    throw new Error("React Table: The " + pluginName + " plugin hook must be placed after the " + before + " plugin hook!");
                }
            }
        });
    }
    function functionalUpdate(updater, old) {
        return typeof updater === 'function' ? updater(old) : updater;
    }
    function useGetLatest(obj) {
        var ref = React.useRef();
        ref.current = obj;
        return React.useCallback({
            "useGetLatest.useCallback": function() {
                return ref.current;
            }
        }["useGetLatest.useCallback"], []);
    } // SSR has issues with useLayoutEffect still, so use useEffect during SSR
    var safeUseLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;
    function useMountedLayoutEffect(fn, deps) {
        var mountedRef = React.useRef(false);
        safeUseLayoutEffect(function() {
            if (mountedRef.current) {
                fn();
            }
            mountedRef.current = true; // eslint-disable-next-line
        }, deps);
    }
    function useAsyncDebounce(defaultFn, defaultWait) {
        if (defaultWait === void 0) {
            defaultWait = 0;
        }
        var debounceRef = React.useRef({});
        var getDefaultFn = useGetLatest(defaultFn);
        var getDefaultWait = useGetLatest(defaultWait);
        return React.useCallback(/*#__PURE__*/ ({
            "useAsyncDebounce.useCallback": function() {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                    var _len2, args, _key2, _args2 = arguments;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while(1){
                            switch(_context2.prev = _context2.next){
                                case 0:
                                    for(_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
                                        args[_key2] = _args2[_key2];
                                    }
                                    if (!debounceRef.current.promise) {
                                        debounceRef.current.promise = new Promise({
                                            "useAsyncDebounce.useCallback._ref2._callee2._callee2$": function(resolve, reject) {
                                                debounceRef.current.resolve = resolve;
                                                debounceRef.current.reject = reject;
                                            }
                                        }["useAsyncDebounce.useCallback._ref2._callee2._callee2$"]);
                                    }
                                    if (debounceRef.current.timeout) {
                                        clearTimeout(debounceRef.current.timeout);
                                    }
                                    debounceRef.current.timeout = setTimeout(/*#__PURE__*/ _asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while(1){
                                                switch(_context.prev = _context.next){
                                                    case 0:
                                                        delete debounceRef.current.timeout;
                                                        _context.prev = 1;
                                                        _context.t0 = debounceRef.current;
                                                        _context.next = 5;
                                                        return getDefaultFn().apply(void 0, args);
                                                    case 5:
                                                        _context.t1 = _context.sent;
                                                        _context.t0.resolve.call(_context.t0, _context.t1);
                                                        _context.next = 12;
                                                        break;
                                                    case 9:
                                                        _context.prev = 9;
                                                        _context.t2 = _context["catch"](1);
                                                        debounceRef.current.reject(_context.t2);
                                                    case 12:
                                                        _context.prev = 12;
                                                        delete debounceRef.current.promise;
                                                        return _context.finish(12);
                                                    case 15:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, null, [
                                            [
                                                1,
                                                9,
                                                12,
                                                15
                                            ]
                                        ]);
                                    })), getDefaultWait());
                                    return _context2.abrupt("return", debounceRef.current.promise);
                                case 5:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                }));
                return ({
                    "useAsyncDebounce.useCallback": function() {
                        return _ref2.apply(this, arguments);
                    }
                })["useAsyncDebounce.useCallback"];
            }
        })["useAsyncDebounce.useCallback"](), [
            getDefaultFn,
            getDefaultWait
        ]);
    }
    function makeRenderer(instance, column, meta) {
        if (meta === void 0) {
            meta = {};
        }
        return function(type, userProps) {
            if (userProps === void 0) {
                userProps = {};
            }
            var Comp = typeof type === 'string' ? column[type] : type;
            if (typeof Comp === 'undefined') {
                console.info(column);
                throw new Error(renderErr);
            }
            return flexRender(Comp, _extends({}, instance, {
                column: column
            }, meta, {}, userProps));
        };
    }
    function flexRender(Comp, props) {
        return isReactComponent(Comp) ? React.createElement(Comp, props) : Comp;
    }
    function isReactComponent(component) {
        return isClassComponent(component) || typeof component === 'function' || isExoticComponent(component);
    }
    function isClassComponent(component) {
        return typeof component === 'function' && function() {
            var proto = Object.getPrototypeOf(component);
            return proto.prototype && proto.prototype.isReactComponent;
        }();
    }
    function isExoticComponent(component) {
        return typeof component === 'object' && typeof component.$$typeof === 'symbol' && [
            'react.memo',
            'react.forward_ref'
        ].includes(component.$$typeof.description);
    }
    function linkColumnStructure(columns, parent, depth) {
        if (depth === void 0) {
            depth = 0;
        }
        return columns.map(function(column) {
            column = _extends({}, column, {
                parent: parent,
                depth: depth
            });
            assignColumnAccessor(column);
            if (column.columns) {
                column.columns = linkColumnStructure(column.columns, column, depth + 1);
            }
            return column;
        });
    }
    function flattenColumns(columns) {
        return flattenBy(columns, 'columns');
    }
    function assignColumnAccessor(column) {
        // First check for string accessor
        var id = column.id, accessor = column.accessor, Header = column.Header;
        if (typeof accessor === 'string') {
            id = id || accessor;
            var accessorPath = accessor.split('.');
            accessor = function accessor(row) {
                return getBy(row, accessorPath);
            };
        }
        if (!id && typeof Header === 'string' && Header) {
            id = Header;
        }
        if (!id && column.columns) {
            console.error(column);
            throw new Error('A column ID (or unique "Header" value) is required!');
        }
        if (!id) {
            console.error(column);
            throw new Error('A column ID (or string accessor) is required!');
        }
        Object.assign(column, {
            id: id,
            accessor: accessor
        });
        return column;
    }
    function decorateColumn(column, userDefaultColumn) {
        if (!userDefaultColumn) {
            throw new Error();
        }
        Object.assign(column, _extends({
            // Make sure there is a fallback header, just in case
            Header: emptyRenderer,
            Footer: emptyRenderer
        }, defaultColumn, {}, userDefaultColumn, {}, column));
        Object.assign(column, {
            originalWidth: column.width
        });
        return column;
    } // Build the header groups from the bottom up
    function makeHeaderGroups(allColumns, defaultColumn, additionalHeaderProperties) {
        if (additionalHeaderProperties === void 0) {
            additionalHeaderProperties = function additionalHeaderProperties() {
                return {};
            };
        }
        var headerGroups = [];
        var scanColumns = allColumns;
        var uid = 0;
        var getUID = function getUID() {
            return uid++;
        };
        var _loop = function _loop() {
            // The header group we are creating
            var headerGroup = {
                headers: []
            }; // The parent columns we're going to scan next
            var parentColumns = [];
            var hasParents = scanColumns.some(function(d) {
                return d.parent;
            }); // Scan each column for parents
            scanColumns.forEach(function(column) {
                // What is the latest (last) parent column?
                var latestParentColumn = [].concat(parentColumns).reverse()[0];
                var newParent;
                if (hasParents) {
                    // If the column has a parent, add it if necessary
                    if (column.parent) {
                        newParent = _extends({}, column.parent, {
                            originalId: column.parent.id,
                            id: column.parent.id + "_" + getUID(),
                            headers: [
                                column
                            ]
                        }, additionalHeaderProperties(column));
                    } else {
                        // If other columns have parents, we'll need to add a place holder if necessary
                        var originalId = column.id + "_placeholder";
                        newParent = decorateColumn(_extends({
                            originalId: originalId,
                            id: column.id + "_placeholder_" + getUID(),
                            placeholderOf: column,
                            headers: [
                                column
                            ]
                        }, additionalHeaderProperties(column)), defaultColumn);
                    } // If the resulting parent columns are the same, just add
                    // the column and increment the header span
                    if (latestParentColumn && latestParentColumn.originalId === newParent.originalId) {
                        latestParentColumn.headers.push(column);
                    } else {
                        parentColumns.push(newParent);
                    }
                }
                headerGroup.headers.push(column);
            });
            headerGroups.push(headerGroup); // Start scanning the parent columns
            scanColumns = parentColumns;
        };
        while(scanColumns.length){
            _loop();
        }
        return headerGroups.reverse();
    }
    var pathObjCache = new Map();
    function getBy(obj, path, def) {
        if (!path) {
            return obj;
        }
        var cacheKey = typeof path === 'function' ? path : JSON.stringify(path);
        var pathObj = pathObjCache.get(cacheKey) || function() {
            var pathObj = makePathArray(path);
            pathObjCache.set(cacheKey, pathObj);
            return pathObj;
        }();
        var val;
        try {
            val = pathObj.reduce(function(cursor, pathPart) {
                return cursor[pathPart];
            }, obj);
        } catch (e) {}
        return typeof val !== 'undefined' ? val : def;
    }
    function getFirstDefined() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        for(var i = 0; i < args.length; i += 1){
            if (typeof args[i] !== 'undefined') {
                return args[i];
            }
        }
    }
    function isFunction(a) {
        if (typeof a === 'function') {
            return a;
        }
    }
    function flattenBy(arr, key) {
        var flat = [];
        var recurse = function recurse(arr) {
            arr.forEach(function(d) {
                if (!d[key]) {
                    flat.push(d);
                } else {
                    recurse(d[key]);
                }
            });
        };
        recurse(arr);
        return flat;
    }
    function expandRows(rows, _ref) {
        var manualExpandedKey = _ref.manualExpandedKey, expanded = _ref.expanded, _ref$expandSubRows = _ref.expandSubRows, expandSubRows = _ref$expandSubRows === void 0 ? true : _ref$expandSubRows;
        var expandedRows = [];
        var handleRow = function handleRow(row, addToExpandedRows) {
            if (addToExpandedRows === void 0) {
                addToExpandedRows = true;
            }
            row.isExpanded = row.original && row.original[manualExpandedKey] || expanded[row.id];
            row.canExpand = row.subRows && !!row.subRows.length;
            if (addToExpandedRows) {
                expandedRows.push(row);
            }
            if (row.subRows && row.subRows.length && row.isExpanded) {
                row.subRows.forEach(function(row) {
                    return handleRow(row, expandSubRows);
                });
            }
        };
        rows.forEach(function(row) {
            return handleRow(row);
        });
        return expandedRows;
    }
    function getFilterMethod(filter, userFilterTypes, filterTypes) {
        return isFunction(filter) || userFilterTypes[filter] || filterTypes[filter] || filterTypes.text;
    }
    function shouldAutoRemoveFilter(autoRemove, value, column) {
        return autoRemove ? autoRemove(value, column) : typeof value === 'undefined';
    }
    function unpreparedAccessWarning() {
        throw new Error('React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.');
    }
    var passiveSupported = null;
    function passiveEventSupported() {
        // memoize support to avoid adding multiple test events
        if (typeof passiveSupported === 'boolean') return passiveSupported;
        var supported = false;
        try {
            var options = {
                get passive () {
                    supported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            supported = false;
        }
        passiveSupported = supported;
        return passiveSupported;
    } //
    var reOpenBracket = /\[/g;
    var reCloseBracket = /\]/g;
    function makePathArray(obj) {
        return flattenDeep(obj) // remove all periods in parts
        .map(function(d) {
            return String(d).replace('.', '_');
        }) // join parts using period
        .join('.') // replace brackets with periods
        .replace(reOpenBracket, '.').replace(reCloseBracket, '') // split it back out on periods
        .split('.');
    }
    function flattenDeep(arr, newArr) {
        if (newArr === void 0) {
            newArr = [];
        }
        if (!Array.isArray(arr)) {
            newArr.push(arr);
        } else {
            for(var i = 0; i < arr.length; i += 1){
                flattenDeep(arr[i], newArr);
            }
        }
        return newArr;
    }
    var defaultGetTableProps = function defaultGetTableProps(props) {
        return _extends({
            role: 'table'
        }, props);
    };
    var defaultGetTableBodyProps = function defaultGetTableBodyProps(props) {
        return _extends({
            role: 'rowgroup'
        }, props);
    };
    var defaultGetHeaderProps = function defaultGetHeaderProps(props, _ref) {
        var column = _ref.column;
        return _extends({
            key: "header_" + column.id,
            colSpan: column.totalVisibleHeaderCount,
            role: 'columnheader'
        }, props);
    };
    var defaultGetFooterProps = function defaultGetFooterProps(props, _ref2) {
        var column = _ref2.column;
        return _extends({
            key: "footer_" + column.id,
            colSpan: column.totalVisibleHeaderCount
        }, props);
    };
    var defaultGetHeaderGroupProps = function defaultGetHeaderGroupProps(props, _ref3) {
        var index = _ref3.index;
        return _extends({
            key: "headerGroup_" + index,
            role: 'row'
        }, props);
    };
    var defaultGetFooterGroupProps = function defaultGetFooterGroupProps(props, _ref4) {
        var index = _ref4.index;
        return _extends({
            key: "footerGroup_" + index
        }, props);
    };
    var defaultGetRowProps = function defaultGetRowProps(props, _ref5) {
        var row = _ref5.row;
        return _extends({
            key: "row_" + row.id,
            role: 'row'
        }, props);
    };
    var defaultGetCellProps = function defaultGetCellProps(props, _ref6) {
        var cell = _ref6.cell;
        return _extends({
            key: "cell_" + cell.row.id + "_" + cell.column.id,
            role: 'cell'
        }, props);
    };
    function makeDefaultPluginHooks() {
        return {
            useOptions: [],
            stateReducers: [],
            useControlledState: [],
            columns: [],
            columnsDeps: [],
            allColumns: [],
            allColumnsDeps: [],
            accessValue: [],
            materializedColumns: [],
            materializedColumnsDeps: [],
            useInstanceAfterData: [],
            visibleColumns: [],
            visibleColumnsDeps: [],
            headerGroups: [],
            headerGroupsDeps: [],
            useInstanceBeforeDimensions: [],
            useInstance: [],
            prepareRow: [],
            getTableProps: [
                defaultGetTableProps
            ],
            getTableBodyProps: [
                defaultGetTableBodyProps
            ],
            getHeaderGroupProps: [
                defaultGetHeaderGroupProps
            ],
            getFooterGroupProps: [
                defaultGetFooterGroupProps
            ],
            getHeaderProps: [
                defaultGetHeaderProps
            ],
            getFooterProps: [
                defaultGetFooterProps
            ],
            getRowProps: [
                defaultGetRowProps
            ],
            getCellProps: [
                defaultGetCellProps
            ],
            useFinalInstance: []
        };
    }
    actions.resetHiddenColumns = 'resetHiddenColumns';
    actions.toggleHideColumn = 'toggleHideColumn';
    actions.setHiddenColumns = 'setHiddenColumns';
    actions.toggleHideAllColumns = 'toggleHideAllColumns';
    var useColumnVisibility = function useColumnVisibility(hooks) {
        hooks.getToggleHiddenProps = [
            defaultGetToggleHiddenProps
        ];
        hooks.getToggleHideAllColumnsProps = [
            defaultGetToggleHideAllColumnsProps
        ];
        hooks.stateReducers.push(reducer);
        hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
        hooks.headerGroupsDeps.push(function(deps, _ref) {
            var instance = _ref.instance;
            return [].concat(deps, [
                instance.state.hiddenColumns
            ]);
        });
        hooks.useInstance.push(useInstance);
    };
    useColumnVisibility.pluginName = 'useColumnVisibility';
    var defaultGetToggleHiddenProps = function defaultGetToggleHiddenProps(props, _ref2) {
        var column = _ref2.column;
        return [
            props,
            {
                onChange: function onChange(e) {
                    column.toggleHidden(!e.target.checked);
                },
                style: {
                    cursor: 'pointer'
                },
                checked: column.isVisible,
                title: 'Toggle Column Visible'
            }
        ];
    };
    var defaultGetToggleHideAllColumnsProps = function defaultGetToggleHideAllColumnsProps(props, _ref3) {
        var instance = _ref3.instance;
        return [
            props,
            {
                onChange: function onChange(e) {
                    instance.toggleHideAllColumns(!e.target.checked);
                },
                style: {
                    cursor: 'pointer'
                },
                checked: !instance.allColumnsHidden && !instance.state.hiddenColumns.length,
                title: 'Toggle All Columns Hidden',
                indeterminate: !instance.allColumnsHidden && instance.state.hiddenColumns.length
            }
        ];
    };
    function reducer(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                hiddenColumns: []
            }, state);
        }
        if (action.type === actions.resetHiddenColumns) {
            return _extends({}, state, {
                hiddenColumns: instance.initialState.hiddenColumns || []
            });
        }
        if (action.type === actions.toggleHideColumn) {
            var should = typeof action.value !== 'undefined' ? action.value : !state.hiddenColumns.includes(action.columnId);
            var hiddenColumns = should ? [].concat(state.hiddenColumns, [
                action.columnId
            ]) : state.hiddenColumns.filter(function(d) {
                return d !== action.columnId;
            });
            return _extends({}, state, {
                hiddenColumns: hiddenColumns
            });
        }
        if (action.type === actions.setHiddenColumns) {
            return _extends({}, state, {
                hiddenColumns: functionalUpdate(action.value, state.hiddenColumns)
            });
        }
        if (action.type === actions.toggleHideAllColumns) {
            var shouldAll = typeof action.value !== 'undefined' ? action.value : !state.hiddenColumns.length;
            return _extends({}, state, {
                hiddenColumns: shouldAll ? instance.allColumns.map(function(d) {
                    return d.id;
                }) : []
            });
        }
    }
    function useInstanceBeforeDimensions(instance) {
        var headers = instance.headers, hiddenColumns = instance.state.hiddenColumns;
        var isMountedRef = React.useRef(false);
        if (!isMountedRef.current) ;
        var handleColumn = function handleColumn(column, parentVisible) {
            column.isVisible = parentVisible && !hiddenColumns.includes(column.id);
            var totalVisibleHeaderCount = 0;
            if (column.headers && column.headers.length) {
                column.headers.forEach(function(subColumn) {
                    return totalVisibleHeaderCount += handleColumn(subColumn, column.isVisible);
                });
            } else {
                totalVisibleHeaderCount = column.isVisible ? 1 : 0;
            }
            column.totalVisibleHeaderCount = totalVisibleHeaderCount;
            return totalVisibleHeaderCount;
        };
        var totalVisibleHeaderCount = 0;
        headers.forEach(function(subHeader) {
            return totalVisibleHeaderCount += handleColumn(subHeader, true);
        });
    }
    function useInstance(instance) {
        var columns = instance.columns, flatHeaders = instance.flatHeaders, dispatch = instance.dispatch, allColumns = instance.allColumns, getHooks = instance.getHooks, hiddenColumns = instance.state.hiddenColumns, _instance$autoResetHi = instance.autoResetHiddenColumns, autoResetHiddenColumns = _instance$autoResetHi === void 0 ? true : _instance$autoResetHi;
        var getInstance = useGetLatest(instance);
        var allColumnsHidden = allColumns.length === hiddenColumns.length;
        var toggleHideColumn = React.useCallback({
            "useInstance.useCallback[toggleHideColumn]": function(columnId, value) {
                return dispatch({
                    type: actions.toggleHideColumn,
                    columnId: columnId,
                    value: value
                });
            }
        }["useInstance.useCallback[toggleHideColumn]"], [
            dispatch
        ]);
        var setHiddenColumns = React.useCallback({
            "useInstance.useCallback[setHiddenColumns]": function(value) {
                return dispatch({
                    type: actions.setHiddenColumns,
                    value: value
                });
            }
        }["useInstance.useCallback[setHiddenColumns]"], [
            dispatch
        ]);
        var toggleHideAllColumns = React.useCallback({
            "useInstance.useCallback[toggleHideAllColumns]": function(value) {
                return dispatch({
                    type: actions.toggleHideAllColumns,
                    value: value
                });
            }
        }["useInstance.useCallback[toggleHideAllColumns]"], [
            dispatch
        ]);
        var getToggleHideAllColumnsProps = makePropGetter(getHooks().getToggleHideAllColumnsProps, {
            instance: getInstance()
        });
        flatHeaders.forEach(function(column) {
            column.toggleHidden = function(value) {
                dispatch({
                    type: actions.toggleHideColumn,
                    columnId: column.id,
                    value: value
                });
            };
            column.getToggleHiddenProps = makePropGetter(getHooks().getToggleHiddenProps, {
                instance: getInstance(),
                column: column
            });
        });
        var getAutoResetHiddenColumns = useGetLatest(autoResetHiddenColumns);
        useMountedLayoutEffect({
            "useInstance.useMountedLayoutEffect": function() {
                if (getAutoResetHiddenColumns()) {
                    dispatch({
                        type: actions.resetHiddenColumns
                    });
                }
            }
        }["useInstance.useMountedLayoutEffect"], [
            dispatch,
            columns
        ]);
        Object.assign(instance, {
            allColumnsHidden: allColumnsHidden,
            toggleHideColumn: toggleHideColumn,
            setHiddenColumns: setHiddenColumns,
            toggleHideAllColumns: toggleHideAllColumns,
            getToggleHideAllColumnsProps: getToggleHideAllColumnsProps
        });
    }
    var defaultInitialState = {};
    var defaultColumnInstance = {};
    var defaultReducer = function defaultReducer(state, action, prevState) {
        return state;
    };
    var defaultGetSubRows = function defaultGetSubRows(row, index) {
        return row.subRows || [];
    };
    var defaultGetRowId = function defaultGetRowId(row, index, parent) {
        return "" + (parent ? [
            parent.id,
            index
        ].join('.') : index);
    };
    var defaultUseControlledState = function defaultUseControlledState(d) {
        return d;
    };
    function applyDefaults(props) {
        var _props$initialState = props.initialState, initialState = _props$initialState === void 0 ? defaultInitialState : _props$initialState, _props$defaultColumn = props.defaultColumn, defaultColumn = _props$defaultColumn === void 0 ? defaultColumnInstance : _props$defaultColumn, _props$getSubRows = props.getSubRows, getSubRows = _props$getSubRows === void 0 ? defaultGetSubRows : _props$getSubRows, _props$getRowId = props.getRowId, getRowId = _props$getRowId === void 0 ? defaultGetRowId : _props$getRowId, _props$stateReducer = props.stateReducer, stateReducer = _props$stateReducer === void 0 ? defaultReducer : _props$stateReducer, _props$useControlledS = props.useControlledState, useControlledState = _props$useControlledS === void 0 ? defaultUseControlledState : _props$useControlledS, rest = _objectWithoutPropertiesLoose(props, [
            "initialState",
            "defaultColumn",
            "getSubRows",
            "getRowId",
            "stateReducer",
            "useControlledState"
        ]);
        return _extends({}, rest, {
            initialState: initialState,
            defaultColumn: defaultColumn,
            getSubRows: getSubRows,
            getRowId: getRowId,
            stateReducer: stateReducer,
            useControlledState: useControlledState
        });
    }
    var useTable = function useTable(props) {
        for(var _len = arguments.length, plugins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            plugins[_key - 1] = arguments[_key];
        }
        // Apply default props
        props = applyDefaults(props); // Add core plugins
        plugins = [
            useColumnVisibility
        ].concat(plugins); // Create the table instance
        var instanceRef = React.useRef({}); // Create a getter for the instance (helps avoid a lot of potential memory leaks)
        var getInstance = useGetLatest(instanceRef.current); // Assign the props, plugins and hooks to the instance
        Object.assign(getInstance(), _extends({}, props, {
            plugins: plugins,
            hooks: makeDefaultPluginHooks()
        })); // Allow plugins to register hooks as early as possible
        plugins.filter(Boolean).forEach(function(plugin) {
            plugin(getInstance().hooks);
        }); // Consume all hooks and make a getter for them
        var getHooks = useGetLatest(getInstance().hooks);
        getInstance().getHooks = getHooks;
        delete getInstance().hooks; // Allow useOptions hooks to modify the options coming into the table
        Object.assign(getInstance(), reduceHooks(getHooks().useOptions, applyDefaults(props)));
        var _getInstance = getInstance(), data = _getInstance.data, userColumns = _getInstance.columns, initialState = _getInstance.initialState, defaultColumn = _getInstance.defaultColumn, getSubRows = _getInstance.getSubRows, getRowId = _getInstance.getRowId, stateReducer = _getInstance.stateReducer, useControlledState = _getInstance.useControlledState; // Setup user reducer ref
        var getStateReducer = useGetLatest(stateReducer); // Build the reducer
        var reducer = React.useCallback({
            "useTable.useCallback[reducer]": function(state, action) {
                // Detect invalid actions
                if (!action.type) {
                    console.info({
                        action: action
                    });
                    throw new Error('Unknown Action 👆');
                } // Reduce the state from all plugin reducers
                return [].concat(getHooks().stateReducers, Array.isArray(getStateReducer()) ? getStateReducer() : [
                    getStateReducer()
                ]).reduce({
                    "useTable.useCallback[reducer]": function(s, handler) {
                        return handler(s, action, state, getInstance()) || s;
                    }
                }["useTable.useCallback[reducer]"], state);
            }
        }["useTable.useCallback[reducer]"], [
            getHooks,
            getStateReducer,
            getInstance
        ]); // Start the reducer
        var _React$useReducer = React.useReducer(reducer, undefined, {
            "useTable.useReducer[_React$useReducer]": function() {
                return reducer(initialState, {
                    type: actions.init
                });
            }
        }["useTable.useReducer[_React$useReducer]"]), reducerState = _React$useReducer[0], dispatch = _React$useReducer[1]; // Allow the user to control the final state with hooks
        var state = reduceHooks([].concat(getHooks().useControlledState, [
            useControlledState
        ]), reducerState, {
            instance: getInstance()
        });
        Object.assign(getInstance(), {
            state: state,
            dispatch: dispatch
        }); // Decorate All the columns
        var columns = React.useMemo({
            "useTable.useMemo[columns]": function() {
                return linkColumnStructure(reduceHooks(getHooks().columns, userColumns, {
                    instance: getInstance()
                }));
            }
        }["useTable.useMemo[columns]"], [
            getHooks,
            getInstance,
            userColumns
        ].concat(reduceHooks(getHooks().columnsDeps, [], {
            instance: getInstance()
        })));
        getInstance().columns = columns; // Get the flat list of all columns and allow hooks to decorate
        // those columns (and trigger this memoization via deps)
        var allColumns = React.useMemo({
            "useTable.useMemo[allColumns]": function() {
                return reduceHooks(getHooks().allColumns, flattenColumns(columns), {
                    instance: getInstance()
                }).map(assignColumnAccessor);
            }
        }["useTable.useMemo[allColumns]"], [
            columns,
            getHooks,
            getInstance
        ].concat(reduceHooks(getHooks().allColumnsDeps, [], {
            instance: getInstance()
        })));
        getInstance().allColumns = allColumns; // Access the row model using initial columns
        var _React$useMemo = React.useMemo({
            "useTable.useMemo[_React$useMemo]": function() {
                var rows = [];
                var flatRows = [];
                var rowsById = {};
                var allColumnsQueue = [].concat(allColumns);
                while(allColumnsQueue.length){
                    var column = allColumnsQueue.shift();
                    accessRowsForColumn({
                        data: data,
                        rows: rows,
                        flatRows: flatRows,
                        rowsById: rowsById,
                        column: column,
                        getRowId: getRowId,
                        getSubRows: getSubRows,
                        accessValueHooks: getHooks().accessValue,
                        getInstance: getInstance
                    });
                }
                return [
                    rows,
                    flatRows,
                    rowsById
                ];
            }
        }["useTable.useMemo[_React$useMemo]"], [
            allColumns,
            data,
            getRowId,
            getSubRows,
            getHooks,
            getInstance
        ]), rows = _React$useMemo[0], flatRows = _React$useMemo[1], rowsById = _React$useMemo[2];
        Object.assign(getInstance(), {
            rows: rows,
            initialRows: [].concat(rows),
            flatRows: flatRows,
            rowsById: rowsById // materializedColumns,
        });
        loopHooks(getHooks().useInstanceAfterData, getInstance()); // Get the flat list of all columns AFTER the rows
        // have been access, and allow hooks to decorate
        // those columns (and trigger this memoization via deps)
        var visibleColumns = React.useMemo({
            "useTable.useMemo[visibleColumns]": function() {
                return reduceHooks(getHooks().visibleColumns, allColumns, {
                    instance: getInstance()
                }).map({
                    "useTable.useMemo[visibleColumns]": function(d) {
                        return decorateColumn(d, defaultColumn);
                    }
                }["useTable.useMemo[visibleColumns]"]);
            }
        }["useTable.useMemo[visibleColumns]"], [
            getHooks,
            allColumns,
            getInstance,
            defaultColumn
        ].concat(reduceHooks(getHooks().visibleColumnsDeps, [], {
            instance: getInstance()
        }))); // Combine new visible columns with all columns
        allColumns = React.useMemo({
            "useTable.useMemo": function() {
                var columns = [].concat(visibleColumns);
                allColumns.forEach({
                    "useTable.useMemo": function(column) {
                        if (!columns.find({
                            "useTable.useMemo": function(d) {
                                return d.id === column.id;
                            }
                        }["useTable.useMemo"])) {
                            columns.push(column);
                        }
                    }
                }["useTable.useMemo"]);
                return columns;
            }
        }["useTable.useMemo"], [
            allColumns,
            visibleColumns
        ]);
        getInstance().allColumns = allColumns;
        {
            var duplicateColumns = allColumns.filter(function(column, i) {
                return allColumns.findIndex(function(d) {
                    return d.id === column.id;
                }) !== i;
            });
            if (duplicateColumns.length) {
                console.info(allColumns);
                throw new Error("Duplicate columns were found with ids: \"" + duplicateColumns.map(function(d) {
                    return d.id;
                }).join(', ') + "\" in the columns array above");
            }
        }
        var headerGroups = React.useMemo({
            "useTable.useMemo[headerGroups]": function() {
                return reduceHooks(getHooks().headerGroups, makeHeaderGroups(visibleColumns, defaultColumn), getInstance());
            }
        }["useTable.useMemo[headerGroups]"], [
            getHooks,
            visibleColumns,
            defaultColumn,
            getInstance
        ].concat(reduceHooks(getHooks().headerGroupsDeps, [], {
            instance: getInstance()
        })));
        getInstance().headerGroups = headerGroups; // Get the first level of headers
        var headers = React.useMemo({
            "useTable.useMemo[headers]": function() {
                return headerGroups.length ? headerGroups[0].headers : [];
            }
        }["useTable.useMemo[headers]"], [
            headerGroups
        ]);
        getInstance().headers = headers; // Provide a flat header list for utilities
        getInstance().flatHeaders = headerGroups.reduce(function(all, headerGroup) {
            return [].concat(all, headerGroup.headers);
        }, []);
        loopHooks(getHooks().useInstanceBeforeDimensions, getInstance()); // Filter columns down to visible ones
        var visibleColumnsDep = visibleColumns.filter(function(d) {
            return d.isVisible;
        }).map(function(d) {
            return d.id;
        }).sort().join('_');
        visibleColumns = React.useMemo({
            "useTable.useMemo": function() {
                return visibleColumns.filter({
                    "useTable.useMemo": function(d) {
                        return d.isVisible;
                    }
                }["useTable.useMemo"]);
            }
        }["useTable.useMemo"], [
            visibleColumns,
            visibleColumnsDep
        ]);
        getInstance().visibleColumns = visibleColumns; // Header Visibility is needed by this point
        var _calculateHeaderWidth = calculateHeaderWidths(headers), totalColumnsMinWidth = _calculateHeaderWidth[0], totalColumnsWidth = _calculateHeaderWidth[1], totalColumnsMaxWidth = _calculateHeaderWidth[2];
        getInstance().totalColumnsMinWidth = totalColumnsMinWidth;
        getInstance().totalColumnsWidth = totalColumnsWidth;
        getInstance().totalColumnsMaxWidth = totalColumnsMaxWidth;
        loopHooks(getHooks().useInstance, getInstance()) // Each materialized header needs to be assigned a render function and other
        ;
        [].concat(getInstance().flatHeaders, getInstance().allColumns).forEach(function(column) {
            // Give columns/headers rendering power
            column.render = makeRenderer(getInstance(), column); // Give columns/headers a default getHeaderProps
            column.getHeaderProps = makePropGetter(getHooks().getHeaderProps, {
                instance: getInstance(),
                column: column
            }); // Give columns/headers a default getFooterProps
            column.getFooterProps = makePropGetter(getHooks().getFooterProps, {
                instance: getInstance(),
                column: column
            });
        });
        getInstance().headerGroups = React.useMemo({
            "useTable.useMemo": function() {
                return headerGroups.filter({
                    "useTable.useMemo": function(headerGroup, i) {
                        // Filter out any headers and headerGroups that don't have visible columns
                        headerGroup.headers = headerGroup.headers.filter({
                            "useTable.useMemo": function(column) {
                                var recurse = function recurse(headers) {
                                    return headers.filter({
                                        "useTable.useMemo.recurse": function(column) {
                                            if (column.headers) {
                                                return recurse(column.headers);
                                            }
                                            return column.isVisible;
                                        }
                                    }["useTable.useMemo.recurse"]).length;
                                };
                                if (column.headers) {
                                    return recurse(column.headers);
                                }
                                return column.isVisible;
                            }
                        }["useTable.useMemo"]); // Give headerGroups getRowProps
                        if (headerGroup.headers.length) {
                            headerGroup.getHeaderGroupProps = makePropGetter(getHooks().getHeaderGroupProps, {
                                instance: getInstance(),
                                headerGroup: headerGroup,
                                index: i
                            });
                            headerGroup.getFooterGroupProps = makePropGetter(getHooks().getFooterGroupProps, {
                                instance: getInstance(),
                                headerGroup: headerGroup,
                                index: i
                            });
                            return true;
                        }
                        return false;
                    }
                }["useTable.useMemo"]);
            }
        }["useTable.useMemo"], [
            headerGroups,
            getInstance,
            getHooks
        ]);
        getInstance().footerGroups = [].concat(getInstance().headerGroups).reverse(); // The prepareRow function is absolutely necessary and MUST be called on
        // any rows the user wishes to be displayed.
        getInstance().prepareRow = React.useCallback({
            "useTable.useCallback": function(row) {
                row.getRowProps = makePropGetter(getHooks().getRowProps, {
                    instance: getInstance(),
                    row: row
                }); // Build the visible cells for each row
                row.allCells = allColumns.map({
                    "useTable.useCallback": function(column) {
                        var value = row.values[column.id];
                        var cell = {
                            column: column,
                            row: row,
                            value: value
                        }; // Give each cell a getCellProps base
                        cell.getCellProps = makePropGetter(getHooks().getCellProps, {
                            instance: getInstance(),
                            cell: cell
                        }); // Give each cell a renderer function (supports multiple renderers)
                        cell.render = makeRenderer(getInstance(), column, {
                            row: row,
                            cell: cell,
                            value: value
                        });
                        return cell;
                    }
                }["useTable.useCallback"]);
                row.cells = visibleColumns.map({
                    "useTable.useCallback": function(column) {
                        return row.allCells.find({
                            "useTable.useCallback": function(cell) {
                                return cell.column.id === column.id;
                            }
                        }["useTable.useCallback"]);
                    }
                }["useTable.useCallback"]); // need to apply any row specific hooks (useExpanded requires this)
                loopHooks(getHooks().prepareRow, row, {
                    instance: getInstance()
                });
            }
        }["useTable.useCallback"], [
            getHooks,
            getInstance,
            allColumns,
            visibleColumns
        ]);
        getInstance().getTableProps = makePropGetter(getHooks().getTableProps, {
            instance: getInstance()
        });
        getInstance().getTableBodyProps = makePropGetter(getHooks().getTableBodyProps, {
            instance: getInstance()
        });
        loopHooks(getHooks().useFinalInstance, getInstance());
        return getInstance();
    };
    function calculateHeaderWidths(headers, left) {
        if (left === void 0) {
            left = 0;
        }
        var sumTotalMinWidth = 0;
        var sumTotalWidth = 0;
        var sumTotalMaxWidth = 0;
        var sumTotalFlexWidth = 0;
        headers.forEach(function(header) {
            var subHeaders = header.headers;
            header.totalLeft = left;
            if (subHeaders && subHeaders.length) {
                var _calculateHeaderWidth2 = calculateHeaderWidths(subHeaders, left), totalMinWidth = _calculateHeaderWidth2[0], totalWidth = _calculateHeaderWidth2[1], totalMaxWidth = _calculateHeaderWidth2[2], totalFlexWidth = _calculateHeaderWidth2[3];
                header.totalMinWidth = totalMinWidth;
                header.totalWidth = totalWidth;
                header.totalMaxWidth = totalMaxWidth;
                header.totalFlexWidth = totalFlexWidth;
            } else {
                header.totalMinWidth = header.minWidth;
                header.totalWidth = Math.min(Math.max(header.minWidth, header.width), header.maxWidth);
                header.totalMaxWidth = header.maxWidth;
                header.totalFlexWidth = header.canResize ? header.totalWidth : 0;
            }
            if (header.isVisible) {
                left += header.totalWidth;
                sumTotalMinWidth += header.totalMinWidth;
                sumTotalWidth += header.totalWidth;
                sumTotalMaxWidth += header.totalMaxWidth;
                sumTotalFlexWidth += header.totalFlexWidth;
            }
        });
        return [
            sumTotalMinWidth,
            sumTotalWidth,
            sumTotalMaxWidth,
            sumTotalFlexWidth
        ];
    }
    function accessRowsForColumn(_ref) {
        var data = _ref.data, rows = _ref.rows, flatRows = _ref.flatRows, rowsById = _ref.rowsById, column = _ref.column, getRowId = _ref.getRowId, getSubRows = _ref.getSubRows, accessValueHooks = _ref.accessValueHooks, getInstance = _ref.getInstance;
        // Access the row's data column-by-column
        // We do it this way so we can incrementally add materialized
        // columns after the first pass and avoid excessive looping
        var accessRow = function accessRow(originalRow, rowIndex, depth, parent, parentRows) {
            if (depth === void 0) {
                depth = 0;
            }
            // Keep the original reference around
            var original = originalRow;
            var id = getRowId(originalRow, rowIndex, parent);
            var row = rowsById[id]; // If the row hasn't been created, let's make it
            if (!row) {
                row = {
                    id: id,
                    original: original,
                    index: rowIndex,
                    depth: depth,
                    cells: [
                        {}
                    ] // This is a dummy cell
                }; // Override common array functions (and the dummy cell's getCellProps function)
                // to show an error if it is accessed without calling prepareRow
                row.cells.map = unpreparedAccessWarning;
                row.cells.filter = unpreparedAccessWarning;
                row.cells.forEach = unpreparedAccessWarning;
                row.cells[0].getCellProps = unpreparedAccessWarning; // Create the cells and values
                row.values = {}; // Push this row into the parentRows array
                parentRows.push(row); // Keep track of every row in a flat array
                flatRows.push(row); // Also keep track of every row by its ID
                rowsById[id] = row; // Get the original subrows
                row.originalSubRows = getSubRows(originalRow, rowIndex); // Then recursively access them
                if (row.originalSubRows) {
                    var subRows = [];
                    row.originalSubRows.forEach(function(d, i) {
                        return accessRow(d, i, depth + 1, row, subRows);
                    }); // Keep the new subRows array on the row
                    row.subRows = subRows;
                }
            } else if (row.subRows) {
                // If the row exists, then it's already been accessed
                // Keep recursing, but don't worry about passing the
                // accumlator array (those rows already exist)
                row.originalSubRows.forEach(function(d, i) {
                    return accessRow(d, i, depth + 1, row);
                });
            } // If the column has an accessor, use it to get a value
            if (column.accessor) {
                row.values[column.id] = column.accessor(originalRow, rowIndex, row, parentRows, data);
            } // Allow plugins to manipulate the column value
            row.values[column.id] = reduceHooks(accessValueHooks, row.values[column.id], {
                row: row,
                column: column,
                instance: getInstance()
            }, true);
        };
        data.forEach(function(originalRow, rowIndex) {
            return accessRow(originalRow, rowIndex, 0, undefined, rows);
        });
    }
    actions.resetExpanded = 'resetExpanded';
    actions.toggleRowExpanded = 'toggleRowExpanded';
    actions.toggleAllRowsExpanded = 'toggleAllRowsExpanded';
    var useExpanded = function useExpanded(hooks) {
        hooks.getToggleAllRowsExpandedProps = [
            defaultGetToggleAllRowsExpandedProps
        ];
        hooks.getToggleRowExpandedProps = [
            defaultGetToggleRowExpandedProps
        ];
        hooks.stateReducers.push(reducer$1);
        hooks.useInstance.push(useInstance$1);
        hooks.prepareRow.push(prepareRow);
    };
    useExpanded.pluginName = 'useExpanded';
    var defaultGetToggleAllRowsExpandedProps = function defaultGetToggleAllRowsExpandedProps(props, _ref) {
        var instance = _ref.instance;
        return [
            props,
            {
                onClick: function onClick(e) {
                    instance.toggleAllRowsExpanded();
                },
                style: {
                    cursor: 'pointer'
                },
                title: 'Toggle All Rows Expanded'
            }
        ];
    };
    var defaultGetToggleRowExpandedProps = function defaultGetToggleRowExpandedProps(props, _ref2) {
        var row = _ref2.row;
        return [
            props,
            {
                onClick: function onClick() {
                    row.toggleRowExpanded();
                },
                style: {
                    cursor: 'pointer'
                },
                title: 'Toggle Row Expanded'
            }
        ];
    }; // Reducer
    function reducer$1(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                expanded: {}
            }, state);
        }
        if (action.type === actions.resetExpanded) {
            return _extends({}, state, {
                expanded: instance.initialState.expanded || {}
            });
        }
        if (action.type === actions.toggleAllRowsExpanded) {
            var value = action.value;
            var rowsById = instance.rowsById;
            var isAllRowsExpanded = Object.keys(rowsById).length === Object.keys(state.expanded).length;
            var expandAll = typeof value !== 'undefined' ? value : !isAllRowsExpanded;
            if (expandAll) {
                var expanded = {};
                Object.keys(rowsById).forEach(function(rowId) {
                    expanded[rowId] = true;
                });
                return _extends({}, state, {
                    expanded: expanded
                });
            }
            return _extends({}, state, {
                expanded: {}
            });
        }
        if (action.type === actions.toggleRowExpanded) {
            var id = action.id, setExpanded = action.value;
            var exists = state.expanded[id];
            var shouldExist = typeof setExpanded !== 'undefined' ? setExpanded : !exists;
            if (!exists && shouldExist) {
                var _extends2;
                return _extends({}, state, {
                    expanded: _extends({}, state.expanded, (_extends2 = {}, _extends2[id] = true, _extends2))
                });
            } else if (exists && !shouldExist) {
                var _state$expanded = state.expanded, _ = _state$expanded[id], rest = _objectWithoutPropertiesLoose(_state$expanded, [
                    id
                ].map(_toPropertyKey));
                return _extends({}, state, {
                    expanded: rest
                });
            } else {
                return state;
            }
        }
    }
    function useInstance$1(instance) {
        var data = instance.data, rows = instance.rows, rowsById = instance.rowsById, _instance$manualExpan = instance.manualExpandedKey, manualExpandedKey = _instance$manualExpan === void 0 ? 'expanded' : _instance$manualExpan, _instance$paginateExp = instance.paginateExpandedRows, paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp, _instance$expandSubRo = instance.expandSubRows, expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo, _instance$autoResetEx = instance.autoResetExpanded, autoResetExpanded = _instance$autoResetEx === void 0 ? true : _instance$autoResetEx, getHooks = instance.getHooks, plugins = instance.plugins, expanded = instance.state.expanded, dispatch = instance.dispatch;
        ensurePluginOrder(plugins, [
            'useSortBy',
            'useGroupBy',
            'usePivotColumns',
            'useGlobalFilter'
        ], 'useExpanded');
        var getAutoResetExpanded = useGetLatest(autoResetExpanded);
        var isAllRowsExpanded = Boolean(Object.keys(rowsById).length && Object.keys(expanded).length);
        if (isAllRowsExpanded) {
            if (Object.keys(rowsById).some(function(id) {
                return !expanded[id];
            })) {
                isAllRowsExpanded = false;
            }
        } // Bypass any effects from firing when this changes
        useMountedLayoutEffect({
            "useInstance$1.useMountedLayoutEffect": function() {
                if (getAutoResetExpanded()) {
                    dispatch({
                        type: actions.resetExpanded
                    });
                }
            }
        }["useInstance$1.useMountedLayoutEffect"], [
            dispatch,
            data
        ]);
        var toggleRowExpanded = React.useCallback({
            "useInstance$1.useCallback[toggleRowExpanded]": function(id, value) {
                dispatch({
                    type: actions.toggleRowExpanded,
                    id: id,
                    value: value
                });
            }
        }["useInstance$1.useCallback[toggleRowExpanded]"], [
            dispatch
        ]);
        var toggleAllRowsExpanded = React.useCallback({
            "useInstance$1.useCallback[toggleAllRowsExpanded]": function(value) {
                return dispatch({
                    type: actions.toggleAllRowsExpanded,
                    value: value
                });
            }
        }["useInstance$1.useCallback[toggleAllRowsExpanded]"], [
            dispatch
        ]);
        var expandedRows = React.useMemo({
            "useInstance$1.useMemo[expandedRows]": function() {
                if (paginateExpandedRows) {
                    return expandRows(rows, {
                        manualExpandedKey: manualExpandedKey,
                        expanded: expanded,
                        expandSubRows: expandSubRows
                    });
                }
                return rows;
            }
        }["useInstance$1.useMemo[expandedRows]"], [
            paginateExpandedRows,
            rows,
            manualExpandedKey,
            expanded,
            expandSubRows
        ]);
        var expandedDepth = React.useMemo({
            "useInstance$1.useMemo[expandedDepth]": function() {
                return findExpandedDepth(expanded);
            }
        }["useInstance$1.useMemo[expandedDepth]"], [
            expanded
        ]);
        var getInstance = useGetLatest(instance);
        var getToggleAllRowsExpandedProps = makePropGetter(getHooks().getToggleAllRowsExpandedProps, {
            instance: getInstance()
        });
        Object.assign(instance, {
            preExpandedRows: rows,
            expandedRows: expandedRows,
            rows: expandedRows,
            expandedDepth: expandedDepth,
            isAllRowsExpanded: isAllRowsExpanded,
            toggleRowExpanded: toggleRowExpanded,
            toggleAllRowsExpanded: toggleAllRowsExpanded,
            getToggleAllRowsExpandedProps: getToggleAllRowsExpandedProps
        });
    }
    function prepareRow(row, _ref3) {
        var getHooks = _ref3.instance.getHooks, instance = _ref3.instance;
        row.toggleRowExpanded = function(set) {
            return instance.toggleRowExpanded(row.id, set);
        };
        row.getToggleRowExpandedProps = makePropGetter(getHooks().getToggleRowExpandedProps, {
            instance: instance,
            row: row
        });
    }
    function findExpandedDepth(expanded) {
        var maxDepth = 0;
        Object.keys(expanded).forEach(function(id) {
            var splitId = id.split('.');
            maxDepth = Math.max(maxDepth, splitId.length);
        });
        return maxDepth;
    }
    var text = function text(rows, ids, filterValue) {
        rows = rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
            });
        });
        return rows;
    };
    text.autoRemove = function(val) {
        return !val;
    };
    var exactText = function exactText(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue !== undefined ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
            });
        });
    };
    exactText.autoRemove = function(val) {
        return !val;
    };
    var exactTextCase = function exactTextCase(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue !== undefined ? String(rowValue) === String(filterValue) : true;
            });
        });
    };
    exactTextCase.autoRemove = function(val) {
        return !val;
    };
    var includes = function includes(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue.includes(filterValue);
            });
        });
    };
    includes.autoRemove = function(val) {
        return !val || !val.length;
    };
    var includesAll = function includesAll(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue && rowValue.length && filterValue.every(function(val) {
                    return rowValue.includes(val);
                });
            });
        });
    };
    includesAll.autoRemove = function(val) {
        return !val || !val.length;
    };
    var includesSome = function includesSome(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue && rowValue.length && filterValue.some(function(val) {
                    return rowValue.includes(val);
                });
            });
        });
    };
    includesSome.autoRemove = function(val) {
        return !val || !val.length;
    };
    var includesValue = function includesValue(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return filterValue.includes(rowValue);
            });
        });
    };
    includesValue.autoRemove = function(val) {
        return !val || !val.length;
    };
    var exact = function exact(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue === filterValue;
            });
        });
    };
    exact.autoRemove = function(val) {
        return typeof val === 'undefined';
    };
    var equals = function equals(rows, ids, filterValue) {
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id]; // eslint-disable-next-line eqeqeq
                return rowValue == filterValue;
            });
        });
    };
    equals.autoRemove = function(val) {
        return val == null;
    };
    var between = function between(rows, ids, filterValue) {
        var _ref = filterValue || [], min = _ref[0], max = _ref[1];
        min = typeof min === 'number' ? min : -Infinity;
        max = typeof max === 'number' ? max : Infinity;
        if (min > max) {
            var temp = min;
            min = max;
            max = temp;
        }
        return rows.filter(function(row) {
            return ids.some(function(id) {
                var rowValue = row.values[id];
                return rowValue >= min && rowValue <= max;
            });
        });
    };
    between.autoRemove = function(val) {
        return !val || typeof val[0] !== 'number' && typeof val[1] !== 'number';
    };
    var filterTypes = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        text: text,
        exactText: exactText,
        exactTextCase: exactTextCase,
        includes: includes,
        includesAll: includesAll,
        includesSome: includesSome,
        includesValue: includesValue,
        exact: exact,
        equals: equals,
        between: between
    });
    actions.resetFilters = 'resetFilters';
    actions.setFilter = 'setFilter';
    actions.setAllFilters = 'setAllFilters';
    var useFilters = function useFilters(hooks) {
        hooks.stateReducers.push(reducer$2);
        hooks.useInstance.push(useInstance$2);
    };
    useFilters.pluginName = 'useFilters';
    function reducer$2(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                filters: []
            }, state);
        }
        if (action.type === actions.resetFilters) {
            return _extends({}, state, {
                filters: instance.initialState.filters || []
            });
        }
        if (action.type === actions.setFilter) {
            var columnId = action.columnId, filterValue = action.filterValue;
            var allColumns = instance.allColumns, userFilterTypes = instance.filterTypes;
            var column = allColumns.find(function(d) {
                return d.id === columnId;
            });
            if (!column) {
                throw new Error("React-Table: Could not find a column with id: " + columnId);
            }
            var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);
            var previousfilter = state.filters.find(function(d) {
                return d.id === columnId;
            });
            var newFilter = functionalUpdate(filterValue, previousfilter && previousfilter.value); //
            if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter, column)) {
                return _extends({}, state, {
                    filters: state.filters.filter(function(d) {
                        return d.id !== columnId;
                    })
                });
            }
            if (previousfilter) {
                return _extends({}, state, {
                    filters: state.filters.map(function(d) {
                        if (d.id === columnId) {
                            return {
                                id: columnId,
                                value: newFilter
                            };
                        }
                        return d;
                    })
                });
            }
            return _extends({}, state, {
                filters: [].concat(state.filters, [
                    {
                        id: columnId,
                        value: newFilter
                    }
                ])
            });
        }
        if (action.type === actions.setAllFilters) {
            var filters = action.filters;
            var _allColumns = instance.allColumns, _userFilterTypes = instance.filterTypes;
            return _extends({}, state, {
                // Filter out undefined values
                filters: functionalUpdate(filters, state.filters).filter(function(filter) {
                    var column = _allColumns.find(function(d) {
                        return d.id === filter.id;
                    });
                    var filterMethod = getFilterMethod(column.filter, _userFilterTypes || {}, filterTypes);
                    if (shouldAutoRemoveFilter(filterMethod.autoRemove, filter.value, column)) {
                        return false;
                    }
                    return true;
                })
            });
        }
    }
    function useInstance$2(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns = instance.allColumns, userFilterTypes = instance.filterTypes, manualFilters = instance.manualFilters, _instance$defaultCanF = instance.defaultCanFilter, defaultCanFilter = _instance$defaultCanF === void 0 ? false : _instance$defaultCanF, disableFilters = instance.disableFilters, filters = instance.state.filters, dispatch = instance.dispatch, _instance$autoResetFi = instance.autoResetFilters, autoResetFilters = _instance$autoResetFi === void 0 ? true : _instance$autoResetFi;
        var setFilter = React.useCallback({
            "useInstance$2.useCallback[setFilter]": function(columnId, filterValue) {
                dispatch({
                    type: actions.setFilter,
                    columnId: columnId,
                    filterValue: filterValue
                });
            }
        }["useInstance$2.useCallback[setFilter]"], [
            dispatch
        ]);
        var setAllFilters = React.useCallback({
            "useInstance$2.useCallback[setAllFilters]": function(filters) {
                dispatch({
                    type: actions.setAllFilters,
                    filters: filters
                });
            }
        }["useInstance$2.useCallback[setAllFilters]"], [
            dispatch
        ]);
        allColumns.forEach(function(column) {
            var id = column.id, accessor = column.accessor, columnDefaultCanFilter = column.defaultCanFilter, columnDisableFilters = column.disableFilters; // Determine if a column is filterable
            column.canFilter = accessor ? getFirstDefined(columnDisableFilters === true ? false : undefined, disableFilters === true ? false : undefined, true) : getFirstDefined(columnDefaultCanFilter, defaultCanFilter, false); // Provide the column a way of updating the filter value
            column.setFilter = function(val) {
                return setFilter(column.id, val);
            }; // Provide the current filter value to the column for
            // convenience
            var found = filters.find(function(d) {
                return d.id === id;
            });
            column.filterValue = found && found.value;
        });
        var _React$useMemo = React.useMemo({
            "useInstance$2.useMemo[_React$useMemo]": function() {
                if (manualFilters || !filters.length) {
                    return [
                        rows,
                        flatRows,
                        rowsById
                    ];
                }
                var filteredFlatRows = [];
                var filteredRowsById = {}; // Filters top level and nested rows
                var filterRows = function filterRows(rows, depth) {
                    if (depth === void 0) {
                        depth = 0;
                    }
                    var filteredRows = rows;
                    filteredRows = filters.reduce({
                        "useInstance$2.useMemo[_React$useMemo].filterRows": function(filteredSoFar, _ref) {
                            var columnId = _ref.id, filterValue = _ref.value;
                            // Find the filters column
                            var column = allColumns.find({
                                "useInstance$2.useMemo[_React$useMemo].filterRows.column": function(d) {
                                    return d.id === columnId;
                                }
                            }["useInstance$2.useMemo[_React$useMemo].filterRows.column"]);
                            if (!column) {
                                return filteredSoFar;
                            }
                            if (depth === 0) {
                                column.preFilteredRows = filteredSoFar;
                            }
                            var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);
                            if (!filterMethod) {
                                console.warn("Could not find a valid 'column.filter' for column with the ID: " + column.id + ".");
                                return filteredSoFar;
                            } // Pass the rows, id, filterValue and column to the filterMethod
                            // to get the filtered rows back
                            column.filteredRows = filterMethod(filteredSoFar, [
                                columnId
                            ], filterValue);
                            return column.filteredRows;
                        }
                    }["useInstance$2.useMemo[_React$useMemo].filterRows"], rows); // Apply the filter to any subRows
                    // We technically could do this recursively in the above loop,
                    // but that would severely hinder the API for the user, since they
                    // would be required to do that recursion in some scenarios
                    filteredRows.forEach({
                        "useInstance$2.useMemo[_React$useMemo].filterRows": function(row) {
                            filteredFlatRows.push(row);
                            filteredRowsById[row.id] = row;
                            if (!row.subRows) {
                                return;
                            }
                            row.subRows = row.subRows && row.subRows.length > 0 ? filterRows(row.subRows, depth + 1) : row.subRows;
                        }
                    }["useInstance$2.useMemo[_React$useMemo].filterRows"]);
                    return filteredRows;
                };
                return [
                    filterRows(rows),
                    filteredFlatRows,
                    filteredRowsById
                ];
            }
        }["useInstance$2.useMemo[_React$useMemo]"], [
            manualFilters,
            filters,
            rows,
            flatRows,
            rowsById,
            allColumns,
            userFilterTypes
        ]), filteredRows = _React$useMemo[0], filteredFlatRows = _React$useMemo[1], filteredRowsById = _React$useMemo[2];
        React.useMemo({
            "useInstance$2.useMemo": function() {
                // Now that each filtered column has it's partially filtered rows,
                // lets assign the final filtered rows to all of the other columns
                var nonFilteredColumns = allColumns.filter({
                    "useInstance$2.useMemo.nonFilteredColumns": function(column) {
                        return !filters.find({
                            "useInstance$2.useMemo.nonFilteredColumns": function(d) {
                                return d.id === column.id;
                            }
                        }["useInstance$2.useMemo.nonFilteredColumns"]);
                    }
                }["useInstance$2.useMemo.nonFilteredColumns"]); // This essentially enables faceted filter options to be built easily
                // using every column's preFilteredRows value
                nonFilteredColumns.forEach({
                    "useInstance$2.useMemo": function(column) {
                        column.preFilteredRows = filteredRows;
                        column.filteredRows = filteredRows;
                    }
                }["useInstance$2.useMemo"]);
            }
        }["useInstance$2.useMemo"], [
            filteredRows,
            filters,
            allColumns
        ]);
        var getAutoResetFilters = useGetLatest(autoResetFilters);
        useMountedLayoutEffect({
            "useInstance$2.useMountedLayoutEffect": function() {
                if (getAutoResetFilters()) {
                    dispatch({
                        type: actions.resetFilters
                    });
                }
            }
        }["useInstance$2.useMountedLayoutEffect"], [
            dispatch,
            manualFilters ? null : data
        ]);
        Object.assign(instance, {
            preFilteredRows: rows,
            preFilteredFlatRows: flatRows,
            preFilteredRowsById: rowsById,
            filteredRows: filteredRows,
            filteredFlatRows: filteredFlatRows,
            filteredRowsById: filteredRowsById,
            rows: filteredRows,
            flatRows: filteredFlatRows,
            rowsById: filteredRowsById,
            setFilter: setFilter,
            setAllFilters: setAllFilters
        });
    }
    actions.resetGlobalFilter = 'resetGlobalFilter';
    actions.setGlobalFilter = 'setGlobalFilter';
    var useGlobalFilter = function useGlobalFilter(hooks) {
        hooks.stateReducers.push(reducer$3);
        hooks.useInstance.push(useInstance$3);
    };
    useGlobalFilter.pluginName = 'useGlobalFilter';
    function reducer$3(state, action, previousState, instance) {
        if (action.type === actions.resetGlobalFilter) {
            return _extends({}, state, {
                globalFilter: instance.initialState.globalFilter || undefined
            });
        }
        if (action.type === actions.setGlobalFilter) {
            var filterValue = action.filterValue;
            var userFilterTypes = instance.userFilterTypes;
            var filterMethod = getFilterMethod(instance.globalFilter, userFilterTypes || {}, filterTypes);
            var newFilter = functionalUpdate(filterValue, state.globalFilter); //
            if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter)) {
                var globalFilter = state.globalFilter, stateWithoutGlobalFilter = _objectWithoutPropertiesLoose(state, [
                    "globalFilter"
                ]);
                return stateWithoutGlobalFilter;
            }
            return _extends({}, state, {
                globalFilter: newFilter
            });
        }
    }
    function useInstance$3(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns = instance.allColumns, userFilterTypes = instance.filterTypes, globalFilter = instance.globalFilter, manualGlobalFilter = instance.manualGlobalFilter, globalFilterValue = instance.state.globalFilter, dispatch = instance.dispatch, _instance$autoResetGl = instance.autoResetGlobalFilter, autoResetGlobalFilter = _instance$autoResetGl === void 0 ? true : _instance$autoResetGl, disableGlobalFilter = instance.disableGlobalFilter;
        var setGlobalFilter = React.useCallback({
            "useInstance$3.useCallback[setGlobalFilter]": function(filterValue) {
                dispatch({
                    type: actions.setGlobalFilter,
                    filterValue: filterValue
                });
            }
        }["useInstance$3.useCallback[setGlobalFilter]"], [
            dispatch
        ]); // TODO: Create a filter cache for incremental high speed multi-filtering
        // This gets pretty complicated pretty fast, since you have to maintain a
        // cache for each row group (top-level rows, and each row's recursive subrows)
        // This would make multi-filtering a lot faster though. Too far?
        var _React$useMemo = React.useMemo({
            "useInstance$3.useMemo[_React$useMemo]": function() {
                if (manualGlobalFilter || typeof globalFilterValue === 'undefined') {
                    return [
                        rows,
                        flatRows,
                        rowsById
                    ];
                }
                var filteredFlatRows = [];
                var filteredRowsById = {};
                var filterMethod = getFilterMethod(globalFilter, userFilterTypes || {}, filterTypes);
                if (!filterMethod) {
                    console.warn("Could not find a valid 'globalFilter' option.");
                    return rows;
                }
                allColumns.forEach({
                    "useInstance$3.useMemo[_React$useMemo]": function(column) {
                        var columnDisableGlobalFilter = column.disableGlobalFilter;
                        column.canFilter = getFirstDefined(columnDisableGlobalFilter === true ? false : undefined, disableGlobalFilter === true ? false : undefined, true);
                    }
                }["useInstance$3.useMemo[_React$useMemo]"]);
                var filterableColumns = allColumns.filter({
                    "useInstance$3.useMemo[_React$useMemo].filterableColumns": function(c) {
                        return c.canFilter === true;
                    }
                }["useInstance$3.useMemo[_React$useMemo].filterableColumns"]); // Filters top level and nested rows
                var filterRows = function filterRows(filteredRows) {
                    filteredRows = filterMethod(filteredRows, filterableColumns.map({
                        "useInstance$3.useMemo[_React$useMemo].filterRows": function(d) {
                            return d.id;
                        }
                    }["useInstance$3.useMemo[_React$useMemo].filterRows"]), globalFilterValue);
                    filteredRows.forEach({
                        "useInstance$3.useMemo[_React$useMemo].filterRows": function(row) {
                            filteredFlatRows.push(row);
                            filteredRowsById[row.id] = row;
                            row.subRows = row.subRows && row.subRows.length ? filterRows(row.subRows) : row.subRows;
                        }
                    }["useInstance$3.useMemo[_React$useMemo].filterRows"]);
                    return filteredRows;
                };
                return [
                    filterRows(rows),
                    filteredFlatRows,
                    filteredRowsById
                ];
            }
        }["useInstance$3.useMemo[_React$useMemo]"], [
            manualGlobalFilter,
            globalFilterValue,
            globalFilter,
            userFilterTypes,
            allColumns,
            rows,
            flatRows,
            rowsById,
            disableGlobalFilter
        ]), globalFilteredRows = _React$useMemo[0], globalFilteredFlatRows = _React$useMemo[1], globalFilteredRowsById = _React$useMemo[2];
        var getAutoResetGlobalFilter = useGetLatest(autoResetGlobalFilter);
        useMountedLayoutEffect({
            "useInstance$3.useMountedLayoutEffect": function() {
                if (getAutoResetGlobalFilter()) {
                    dispatch({
                        type: actions.resetGlobalFilter
                    });
                }
            }
        }["useInstance$3.useMountedLayoutEffect"], [
            dispatch,
            manualGlobalFilter ? null : data
        ]);
        Object.assign(instance, {
            preGlobalFilteredRows: rows,
            preGlobalFilteredFlatRows: flatRows,
            preGlobalFilteredRowsById: rowsById,
            globalFilteredRows: globalFilteredRows,
            globalFilteredFlatRows: globalFilteredFlatRows,
            globalFilteredRowsById: globalFilteredRowsById,
            rows: globalFilteredRows,
            flatRows: globalFilteredFlatRows,
            rowsById: globalFilteredRowsById,
            setGlobalFilter: setGlobalFilter,
            disableGlobalFilter: disableGlobalFilter
        });
    }
    function sum(values, aggregatedValues) {
        // It's faster to just add the aggregations together instead of
        // process leaf nodes individually
        return aggregatedValues.reduce(function(sum, next) {
            return sum + (typeof next === 'number' ? next : 0);
        }, 0);
    }
    function min(values) {
        var min = values[0] || 0;
        values.forEach(function(value) {
            if (typeof value === 'number') {
                min = Math.min(min, value);
            }
        });
        return min;
    }
    function max(values) {
        var max = values[0] || 0;
        values.forEach(function(value) {
            if (typeof value === 'number') {
                max = Math.max(max, value);
            }
        });
        return max;
    }
    function minMax(values) {
        var min = values[0] || 0;
        var max = values[0] || 0;
        values.forEach(function(value) {
            if (typeof value === 'number') {
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        });
        return min + ".." + max;
    }
    function average(values) {
        return sum(null, values) / values.length;
    }
    function median(values) {
        if (!values.length) {
            return null;
        }
        var mid = Math.floor(values.length / 2);
        var nums = [].concat(values).sort(function(a, b) {
            return a - b;
        });
        return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
    function unique(values) {
        return Array.from(new Set(values).values());
    }
    function uniqueCount(values) {
        return new Set(values).size;
    }
    function count(values) {
        return values.length;
    }
    var aggregations = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        sum: sum,
        min: min,
        max: max,
        minMax: minMax,
        average: average,
        median: median,
        unique: unique,
        uniqueCount: uniqueCount,
        count: count
    });
    var emptyArray = [];
    var emptyObject = {}; // Actions
    actions.resetGroupBy = 'resetGroupBy';
    actions.setGroupBy = 'setGroupBy';
    actions.toggleGroupBy = 'toggleGroupBy';
    var useGroupBy = function useGroupBy(hooks) {
        hooks.getGroupByToggleProps = [
            defaultGetGroupByToggleProps
        ];
        hooks.stateReducers.push(reducer$4);
        hooks.visibleColumnsDeps.push(function(deps, _ref) {
            var instance = _ref.instance;
            return [].concat(deps, [
                instance.state.groupBy
            ]);
        });
        hooks.visibleColumns.push(visibleColumns);
        hooks.useInstance.push(useInstance$4);
        hooks.prepareRow.push(prepareRow$1);
    };
    useGroupBy.pluginName = 'useGroupBy';
    var defaultGetGroupByToggleProps = function defaultGetGroupByToggleProps(props, _ref2) {
        var header = _ref2.header;
        return [
            props,
            {
                onClick: header.canGroupBy ? function(e) {
                    e.persist();
                    header.toggleGroupBy();
                } : undefined,
                style: {
                    cursor: header.canGroupBy ? 'pointer' : undefined
                },
                title: 'Toggle GroupBy'
            }
        ];
    }; // Reducer
    function reducer$4(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                groupBy: []
            }, state);
        }
        if (action.type === actions.resetGroupBy) {
            return _extends({}, state, {
                groupBy: instance.initialState.groupBy || []
            });
        }
        if (action.type === actions.setGroupBy) {
            var value = action.value;
            return _extends({}, state, {
                groupBy: value
            });
        }
        if (action.type === actions.toggleGroupBy) {
            var columnId = action.columnId, setGroupBy = action.value;
            var resolvedGroupBy = typeof setGroupBy !== 'undefined' ? setGroupBy : !state.groupBy.includes(columnId);
            if (resolvedGroupBy) {
                return _extends({}, state, {
                    groupBy: [].concat(state.groupBy, [
                        columnId
                    ])
                });
            }
            return _extends({}, state, {
                groupBy: state.groupBy.filter(function(d) {
                    return d !== columnId;
                })
            });
        }
    }
    function visibleColumns(columns, _ref3) {
        var groupBy = _ref3.instance.state.groupBy;
        // Sort grouped columns to the start of the column list
        // before the headers are built
        var groupByColumns = groupBy.map(function(g) {
            return columns.find(function(col) {
                return col.id === g;
            });
        }).filter(Boolean);
        var nonGroupByColumns = columns.filter(function(col) {
            return !groupBy.includes(col.id);
        });
        columns = [].concat(groupByColumns, nonGroupByColumns);
        columns.forEach(function(column) {
            column.isGrouped = groupBy.includes(column.id);
            column.groupedIndex = groupBy.indexOf(column.id);
        });
        return columns;
    }
    var defaultUserAggregations = {};
    function useInstance$4(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns = instance.allColumns, flatHeaders = instance.flatHeaders, _instance$groupByFn = instance.groupByFn, groupByFn = _instance$groupByFn === void 0 ? defaultGroupByFn : _instance$groupByFn, manualGroupBy = instance.manualGroupBy, _instance$aggregation = instance.aggregations, userAggregations = _instance$aggregation === void 0 ? defaultUserAggregations : _instance$aggregation, plugins = instance.plugins, groupBy = instance.state.groupBy, dispatch = instance.dispatch, _instance$autoResetGr = instance.autoResetGroupBy, autoResetGroupBy = _instance$autoResetGr === void 0 ? true : _instance$autoResetGr, disableGroupBy = instance.disableGroupBy, defaultCanGroupBy = instance.defaultCanGroupBy, getHooks = instance.getHooks;
        ensurePluginOrder(plugins, [
            'useColumnOrder',
            'useFilters'
        ], 'useGroupBy');
        var getInstance = useGetLatest(instance);
        allColumns.forEach(function(column) {
            var accessor = column.accessor, defaultColumnGroupBy = column.defaultGroupBy, columnDisableGroupBy = column.disableGroupBy;
            column.canGroupBy = accessor ? getFirstDefined(column.canGroupBy, columnDisableGroupBy === true ? false : undefined, disableGroupBy === true ? false : undefined, true) : getFirstDefined(column.canGroupBy, defaultColumnGroupBy, defaultCanGroupBy, false);
            if (column.canGroupBy) {
                column.toggleGroupBy = function() {
                    return instance.toggleGroupBy(column.id);
                };
            }
            column.Aggregated = column.Aggregated || column.Cell;
        });
        var toggleGroupBy = React.useCallback({
            "useInstance$4.useCallback[toggleGroupBy]": function(columnId, value) {
                dispatch({
                    type: actions.toggleGroupBy,
                    columnId: columnId,
                    value: value
                });
            }
        }["useInstance$4.useCallback[toggleGroupBy]"], [
            dispatch
        ]);
        var setGroupBy = React.useCallback({
            "useInstance$4.useCallback[setGroupBy]": function(value) {
                dispatch({
                    type: actions.setGroupBy,
                    value: value
                });
            }
        }["useInstance$4.useCallback[setGroupBy]"], [
            dispatch
        ]);
        flatHeaders.forEach(function(header) {
            header.getGroupByToggleProps = makePropGetter(getHooks().getGroupByToggleProps, {
                instance: getInstance(),
                header: header
            });
        });
        var _React$useMemo = React.useMemo({
            "useInstance$4.useMemo[_React$useMemo]": function() {
                if (manualGroupBy || !groupBy.length) {
                    return [
                        rows,
                        flatRows,
                        rowsById,
                        emptyArray,
                        emptyObject,
                        flatRows,
                        rowsById
                    ];
                } // Ensure that the list of filtered columns exist
                var existingGroupBy = groupBy.filter({
                    "useInstance$4.useMemo[_React$useMemo].existingGroupBy": function(g) {
                        return allColumns.find({
                            "useInstance$4.useMemo[_React$useMemo].existingGroupBy": function(col) {
                                return col.id === g;
                            }
                        }["useInstance$4.useMemo[_React$useMemo].existingGroupBy"]);
                    }
                }["useInstance$4.useMemo[_React$useMemo].existingGroupBy"]); // Find the columns that can or are aggregating
                // Uses each column to aggregate rows into a single value
                var aggregateRowsToValues = function aggregateRowsToValues(leafRows, groupedRows, depth) {
                    var values = {};
                    allColumns.forEach({
                        "useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues": function(column) {
                            // Don't aggregate columns that are in the groupBy
                            if (existingGroupBy.includes(column.id)) {
                                values[column.id] = groupedRows[0] ? groupedRows[0].values[column.id] : null;
                                return;
                            } // Aggregate the values
                            var aggregateFn = typeof column.aggregate === 'function' ? column.aggregate : userAggregations[column.aggregate] || aggregations[column.aggregate];
                            if (aggregateFn) {
                                // Get the columnValues to aggregate
                                var groupedValues = groupedRows.map({
                                    "useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues.groupedValues": function(row) {
                                        return row.values[column.id];
                                    }
                                }["useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues.groupedValues"]); // Get the columnValues to aggregate
                                var leafValues = leafRows.map({
                                    "useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues.leafValues": function(row) {
                                        var columnValue = row.values[column.id];
                                        if (!depth && column.aggregateValue) {
                                            var aggregateValueFn = typeof column.aggregateValue === 'function' ? column.aggregateValue : userAggregations[column.aggregateValue] || aggregations[column.aggregateValue];
                                            if (!aggregateValueFn) {
                                                console.info({
                                                    column: column
                                                });
                                                throw new Error("React Table: Invalid column.aggregateValue option for column listed above");
                                            }
                                            columnValue = aggregateValueFn(columnValue, row, column);
                                        }
                                        return columnValue;
                                    }
                                }["useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues.leafValues"]);
                                values[column.id] = aggregateFn(leafValues, groupedValues);
                            } else if (column.aggregate) {
                                console.info({
                                    column: column
                                });
                                throw new Error("React Table: Invalid column.aggregate option for column listed above");
                            } else {
                                values[column.id] = null;
                            }
                        }
                    }["useInstance$4.useMemo[_React$useMemo].aggregateRowsToValues"]);
                    return values;
                };
                var groupedFlatRows = [];
                var groupedRowsById = {};
                var onlyGroupedFlatRows = [];
                var onlyGroupedRowsById = {};
                var nonGroupedFlatRows = [];
                var nonGroupedRowsById = {}; // Recursively group the data
                var groupUpRecursively = function groupUpRecursively(rows, depth, parentId) {
                    if (depth === void 0) {
                        depth = 0;
                    }
                    // This is the last level, just return the rows
                    if (depth === existingGroupBy.length) {
                        return rows.map({
                            "useInstance$4.useMemo[_React$useMemo].groupUpRecursively": function(row) {
                                return _extends({}, row, {
                                    depth: depth
                                });
                            }
                        }["useInstance$4.useMemo[_React$useMemo].groupUpRecursively"]);
                    }
                    var columnId = existingGroupBy[depth]; // Group the rows together for this level
                    var rowGroupsMap = groupByFn(rows, columnId); // Peform aggregations for each group
                    var aggregatedGroupedRows = Object.entries(rowGroupsMap).map({
                        "useInstance$4.useMemo[_React$useMemo].groupUpRecursively.aggregatedGroupedRows": function(_ref4, index) {
                            var groupByVal = _ref4[0], groupedRows = _ref4[1];
                            var id = columnId + ":" + groupByVal;
                            id = parentId ? parentId + ">" + id : id; // First, Recurse to group sub rows before aggregation
                            var subRows = groupUpRecursively(groupedRows, depth + 1, id); // Flatten the leaf rows of the rows in this group
                            var leafRows = depth ? flattenBy(groupedRows, 'leafRows') : groupedRows;
                            var values = aggregateRowsToValues(leafRows, groupedRows, depth);
                            var row = {
                                id: id,
                                isGrouped: true,
                                groupByID: columnId,
                                groupByVal: groupByVal,
                                values: values,
                                subRows: subRows,
                                leafRows: leafRows,
                                depth: depth,
                                index: index
                            };
                            subRows.forEach({
                                "useInstance$4.useMemo[_React$useMemo].groupUpRecursively.aggregatedGroupedRows": function(subRow) {
                                    groupedFlatRows.push(subRow);
                                    groupedRowsById[subRow.id] = subRow;
                                    if (subRow.isGrouped) {
                                        onlyGroupedFlatRows.push(subRow);
                                        onlyGroupedRowsById[subRow.id] = subRow;
                                    } else {
                                        nonGroupedFlatRows.push(subRow);
                                        nonGroupedRowsById[subRow.id] = subRow;
                                    }
                                }
                            }["useInstance$4.useMemo[_React$useMemo].groupUpRecursively.aggregatedGroupedRows"]);
                            return row;
                        }
                    }["useInstance$4.useMemo[_React$useMemo].groupUpRecursively.aggregatedGroupedRows"]);
                    return aggregatedGroupedRows;
                };
                var groupedRows = groupUpRecursively(rows);
                groupedRows.forEach({
                    "useInstance$4.useMemo[_React$useMemo]": function(subRow) {
                        groupedFlatRows.push(subRow);
                        groupedRowsById[subRow.id] = subRow;
                        if (subRow.isGrouped) {
                            onlyGroupedFlatRows.push(subRow);
                            onlyGroupedRowsById[subRow.id] = subRow;
                        } else {
                            nonGroupedFlatRows.push(subRow);
                            nonGroupedRowsById[subRow.id] = subRow;
                        }
                    }
                }["useInstance$4.useMemo[_React$useMemo]"]); // Assign the new data
                return [
                    groupedRows,
                    groupedFlatRows,
                    groupedRowsById,
                    onlyGroupedFlatRows,
                    onlyGroupedRowsById,
                    nonGroupedFlatRows,
                    nonGroupedRowsById
                ];
            }
        }["useInstance$4.useMemo[_React$useMemo]"], [
            manualGroupBy,
            groupBy,
            rows,
            flatRows,
            rowsById,
            allColumns,
            userAggregations,
            groupByFn
        ]), groupedRows = _React$useMemo[0], groupedFlatRows = _React$useMemo[1], groupedRowsById = _React$useMemo[2], onlyGroupedFlatRows = _React$useMemo[3], onlyGroupedRowsById = _React$useMemo[4], nonGroupedFlatRows = _React$useMemo[5], nonGroupedRowsById = _React$useMemo[6];
        var getAutoResetGroupBy = useGetLatest(autoResetGroupBy);
        useMountedLayoutEffect({
            "useInstance$4.useMountedLayoutEffect": function() {
                if (getAutoResetGroupBy()) {
                    dispatch({
                        type: actions.resetGroupBy
                    });
                }
            }
        }["useInstance$4.useMountedLayoutEffect"], [
            dispatch,
            manualGroupBy ? null : data
        ]);
        Object.assign(instance, {
            preGroupedRows: rows,
            preGroupedFlatRow: flatRows,
            preGroupedRowsById: rowsById,
            groupedRows: groupedRows,
            groupedFlatRows: groupedFlatRows,
            groupedRowsById: groupedRowsById,
            onlyGroupedFlatRows: onlyGroupedFlatRows,
            onlyGroupedRowsById: onlyGroupedRowsById,
            nonGroupedFlatRows: nonGroupedFlatRows,
            nonGroupedRowsById: nonGroupedRowsById,
            rows: groupedRows,
            flatRows: groupedFlatRows,
            rowsById: groupedRowsById,
            toggleGroupBy: toggleGroupBy,
            setGroupBy: setGroupBy
        });
    }
    function prepareRow$1(row) {
        row.allCells.forEach(function(cell) {
            var _row$subRows;
            // Grouped cells are in the groupBy and the pivot cell for the row
            cell.isGrouped = cell.column.isGrouped && cell.column.id === row.groupByID; // Placeholder cells are any columns in the groupBy that are not grouped
            cell.isPlaceholder = !cell.isGrouped && cell.column.isGrouped; // Aggregated cells are not grouped, not repeated, but still have subRows
            cell.isAggregated = !cell.isGrouped && !cell.isPlaceholder && ((_row$subRows = row.subRows) == null ? void 0 : _row$subRows.length);
        });
    }
    function defaultGroupByFn(rows, columnId) {
        return rows.reduce(function(prev, row, i) {
            // TODO: Might want to implement a key serializer here so
            // irregular column values can still be grouped if needed?
            var resKey = "" + row.values[columnId];
            prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
            prev[resKey].push(row);
            return prev;
        }, {});
    }
    var reSplitAlphaNumeric = /([0-9]+)/gm; // Mixed sorting is slow, but very inclusive of many edge cases.
    // It handles numbers, mixed alphanumeric combinations, and even
    // null, undefined, and Infinity
    var alphanumeric = function alphanumeric(rowA, rowB, columnId) {
        var _getRowValuesByColumn = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn[0], b = _getRowValuesByColumn[1]; // Force to strings (or "" for unsupported types)
        a = toString(a);
        b = toString(b); // Split on number groups, but keep the delimiter
        // Then remove falsey split values
        a = a.split(reSplitAlphaNumeric).filter(Boolean);
        b = b.split(reSplitAlphaNumeric).filter(Boolean); // While
        while(a.length && b.length){
            var aa = a.shift();
            var bb = b.shift();
            var an = parseInt(aa, 10);
            var bn = parseInt(bb, 10);
            var combo = [
                an,
                bn
            ].sort(); // Both are string
            if (isNaN(combo[0])) {
                if (aa > bb) {
                    return 1;
                }
                if (bb > aa) {
                    return -1;
                }
                continue;
            } // One is a string, one is a number
            if (isNaN(combo[1])) {
                return isNaN(an) ? -1 : 1;
            } // Both are numbers
            if (an > bn) {
                return 1;
            }
            if (bn > an) {
                return -1;
            }
        }
        return a.length - b.length;
    };
    function datetime(rowA, rowB, columnId) {
        var _getRowValuesByColumn2 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn2[0], b = _getRowValuesByColumn2[1];
        a = a.getTime();
        b = b.getTime();
        return compareBasic(a, b);
    }
    function basic(rowA, rowB, columnId) {
        var _getRowValuesByColumn3 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn3[0], b = _getRowValuesByColumn3[1];
        return compareBasic(a, b);
    }
    function string(rowA, rowB, columnId) {
        var _getRowValuesByColumn4 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn4[0], b = _getRowValuesByColumn4[1];
        a = a.split('').filter(Boolean);
        b = b.split('').filter(Boolean);
        while(a.length && b.length){
            var aa = a.shift();
            var bb = b.shift();
            var alower = aa.toLowerCase();
            var blower = bb.toLowerCase(); // Case insensitive comparison until characters match
            if (alower > blower) {
                return 1;
            }
            if (blower > alower) {
                return -1;
            } // If lowercase characters are identical
            if (aa > bb) {
                return 1;
            }
            if (bb > aa) {
                return -1;
            }
            continue;
        }
        return a.length - b.length;
    }
    function number(rowA, rowB, columnId) {
        var _getRowValuesByColumn5 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn5[0], b = _getRowValuesByColumn5[1];
        var replaceNonNumeric = /[^0-9.]/gi;
        a = Number(String(a).replace(replaceNonNumeric, ''));
        b = Number(String(b).replace(replaceNonNumeric, ''));
        return compareBasic(a, b);
    } // Utils
    function compareBasic(a, b) {
        return a === b ? 0 : a > b ? 1 : -1;
    }
    function getRowValuesByColumnID(row1, row2, columnId) {
        return [
            row1.values[columnId],
            row2.values[columnId]
        ];
    }
    function toString(a) {
        if (typeof a === 'number') {
            if (isNaN(a) || a === Infinity || a === -Infinity) {
                return '';
            }
            return String(a);
        }
        if (typeof a === 'string') {
            return a;
        }
        return '';
    }
    var sortTypes = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        alphanumeric: alphanumeric,
        datetime: datetime,
        basic: basic,
        string: string,
        number: number
    });
    actions.resetSortBy = 'resetSortBy';
    actions.setSortBy = 'setSortBy';
    actions.toggleSortBy = 'toggleSortBy';
    actions.clearSortBy = 'clearSortBy';
    defaultColumn.sortType = 'alphanumeric';
    defaultColumn.sortDescFirst = false;
    var useSortBy = function useSortBy(hooks) {
        hooks.getSortByToggleProps = [
            defaultGetSortByToggleProps
        ];
        hooks.stateReducers.push(reducer$5);
        hooks.useInstance.push(useInstance$5);
    };
    useSortBy.pluginName = 'useSortBy';
    var defaultGetSortByToggleProps = function defaultGetSortByToggleProps(props, _ref) {
        var instance = _ref.instance, column = _ref.column;
        var _instance$isMultiSort = instance.isMultiSortEvent, isMultiSortEvent = _instance$isMultiSort === void 0 ? function(e) {
            return e.shiftKey;
        } : _instance$isMultiSort;
        return [
            props,
            {
                onClick: column.canSort ? function(e) {
                    e.persist();
                    column.toggleSortBy(undefined, !instance.disableMultiSort && isMultiSortEvent(e));
                } : undefined,
                style: {
                    cursor: column.canSort ? 'pointer' : undefined
                },
                title: column.canSort ? 'Toggle SortBy' : undefined
            }
        ];
    }; // Reducer
    function reducer$5(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                sortBy: []
            }, state);
        }
        if (action.type === actions.resetSortBy) {
            return _extends({}, state, {
                sortBy: instance.initialState.sortBy || []
            });
        }
        if (action.type === actions.clearSortBy) {
            var sortBy = state.sortBy;
            var newSortBy = sortBy.filter(function(d) {
                return d.id !== action.columnId;
            });
            return _extends({}, state, {
                sortBy: newSortBy
            });
        }
        if (action.type === actions.setSortBy) {
            var _sortBy = action.sortBy;
            return _extends({}, state, {
                sortBy: _sortBy
            });
        }
        if (action.type === actions.toggleSortBy) {
            var columnId = action.columnId, desc = action.desc, multi = action.multi;
            var allColumns = instance.allColumns, disableMultiSort = instance.disableMultiSort, disableSortRemove = instance.disableSortRemove, disableMultiRemove = instance.disableMultiRemove, _instance$maxMultiSor = instance.maxMultiSortColCount, maxMultiSortColCount = _instance$maxMultiSor === void 0 ? Number.MAX_SAFE_INTEGER : _instance$maxMultiSor;
            var _sortBy2 = state.sortBy; // Find the column for this columnId
            var column = allColumns.find(function(d) {
                return d.id === columnId;
            });
            var sortDescFirst = column.sortDescFirst; // Find any existing sortBy for this column
            var existingSortBy = _sortBy2.find(function(d) {
                return d.id === columnId;
            });
            var existingIndex = _sortBy2.findIndex(function(d) {
                return d.id === columnId;
            });
            var hasDescDefined = typeof desc !== 'undefined' && desc !== null;
            var _newSortBy = []; // What should we do with this sort action?
            var sortAction;
            if (!disableMultiSort && multi) {
                if (existingSortBy) {
                    sortAction = 'toggle';
                } else {
                    sortAction = 'add';
                }
            } else {
                // Normal mode
                if (existingIndex !== _sortBy2.length - 1 || _sortBy2.length !== 1) {
                    sortAction = 'replace';
                } else if (existingSortBy) {
                    sortAction = 'toggle';
                } else {
                    sortAction = 'replace';
                }
            } // Handle toggle states that will remove the sortBy
            if (sortAction === 'toggle' && // Must be toggling
            !disableSortRemove && // If disableSortRemove, disable in general
            !hasDescDefined && (multi ? !disableMultiRemove : true) && (existingSortBy && // Finally, detect if it should indeed be removed
            existingSortBy.desc && !sortDescFirst || !existingSortBy.desc && sortDescFirst)) {
                sortAction = 'remove';
            }
            if (sortAction === 'replace') {
                _newSortBy = [
                    {
                        id: columnId,
                        desc: hasDescDefined ? desc : sortDescFirst
                    }
                ];
            } else if (sortAction === 'add') {
                _newSortBy = [].concat(_sortBy2, [
                    {
                        id: columnId,
                        desc: hasDescDefined ? desc : sortDescFirst
                    }
                ]); // Take latest n columns
                _newSortBy.splice(0, _newSortBy.length - maxMultiSortColCount);
            } else if (sortAction === 'toggle') {
                // This flips (or sets) the
                _newSortBy = _sortBy2.map(function(d) {
                    if (d.id === columnId) {
                        return _extends({}, d, {
                            desc: hasDescDefined ? desc : !existingSortBy.desc
                        });
                    }
                    return d;
                });
            } else if (sortAction === 'remove') {
                _newSortBy = _sortBy2.filter(function(d) {
                    return d.id !== columnId;
                });
            }
            return _extends({}, state, {
                sortBy: _newSortBy
            });
        }
    }
    function useInstance$5(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, allColumns = instance.allColumns, _instance$orderByFn = instance.orderByFn, orderByFn = _instance$orderByFn === void 0 ? defaultOrderByFn : _instance$orderByFn, userSortTypes = instance.sortTypes, manualSortBy = instance.manualSortBy, defaultCanSort = instance.defaultCanSort, disableSortBy = instance.disableSortBy, flatHeaders = instance.flatHeaders, sortBy = instance.state.sortBy, dispatch = instance.dispatch, plugins = instance.plugins, getHooks = instance.getHooks, _instance$autoResetSo = instance.autoResetSortBy, autoResetSortBy = _instance$autoResetSo === void 0 ? true : _instance$autoResetSo;
        ensurePluginOrder(plugins, [
            'useFilters',
            'useGlobalFilter',
            'useGroupBy',
            'usePivotColumns'
        ], 'useSortBy');
        var setSortBy = React.useCallback({
            "useInstance$5.useCallback[setSortBy]": function(sortBy) {
                dispatch({
                    type: actions.setSortBy,
                    sortBy: sortBy
                });
            }
        }["useInstance$5.useCallback[setSortBy]"], [
            dispatch
        ]); // Updates sorting based on a columnId, desc flag and multi flag
        var toggleSortBy = React.useCallback({
            "useInstance$5.useCallback[toggleSortBy]": function(columnId, desc, multi) {
                dispatch({
                    type: actions.toggleSortBy,
                    columnId: columnId,
                    desc: desc,
                    multi: multi
                });
            }
        }["useInstance$5.useCallback[toggleSortBy]"], [
            dispatch
        ]); // use reference to avoid memory leak in #1608
        var getInstance = useGetLatest(instance); // Add the getSortByToggleProps method to columns and headers
        flatHeaders.forEach(function(column) {
            var accessor = column.accessor, defaultColumnCanSort = column.canSort, columnDisableSortBy = column.disableSortBy, id = column.id;
            var canSort = accessor ? getFirstDefined(columnDisableSortBy === true ? false : undefined, disableSortBy === true ? false : undefined, true) : getFirstDefined(defaultCanSort, defaultColumnCanSort, false);
            column.canSort = canSort;
            if (column.canSort) {
                column.toggleSortBy = function(desc, multi) {
                    return toggleSortBy(column.id, desc, multi);
                };
                column.clearSortBy = function() {
                    dispatch({
                        type: actions.clearSortBy,
                        columnId: column.id
                    });
                };
            }
            column.getSortByToggleProps = makePropGetter(getHooks().getSortByToggleProps, {
                instance: getInstance(),
                column: column
            });
            var columnSort = sortBy.find(function(d) {
                return d.id === id;
            });
            column.isSorted = !!columnSort;
            column.sortedIndex = sortBy.findIndex(function(d) {
                return d.id === id;
            });
            column.isSortedDesc = column.isSorted ? columnSort.desc : undefined;
        });
        var _React$useMemo = React.useMemo({
            "useInstance$5.useMemo[_React$useMemo]": function() {
                if (manualSortBy || !sortBy.length) {
                    return [
                        rows,
                        flatRows
                    ];
                }
                var sortedFlatRows = []; // Filter out sortBys that correspond to non existing columns
                var availableSortBy = sortBy.filter({
                    "useInstance$5.useMemo[_React$useMemo].availableSortBy": function(sort) {
                        return allColumns.find({
                            "useInstance$5.useMemo[_React$useMemo].availableSortBy": function(col) {
                                return col.id === sort.id;
                            }
                        }["useInstance$5.useMemo[_React$useMemo].availableSortBy"]);
                    }
                }["useInstance$5.useMemo[_React$useMemo].availableSortBy"]);
                var sortData = function sortData(rows) {
                    // Use the orderByFn to compose multiple sortBy's together.
                    // This will also perform a stable sorting using the row index
                    // if needed.
                    var sortedData = orderByFn(rows, availableSortBy.map({
                        "useInstance$5.useMemo[_React$useMemo].sortData.sortedData": function(sort) {
                            // Support custom sorting methods for each column
                            var column = allColumns.find({
                                "useInstance$5.useMemo[_React$useMemo].sortData.sortedData.column": function(d) {
                                    return d.id === sort.id;
                                }
                            }["useInstance$5.useMemo[_React$useMemo].sortData.sortedData.column"]);
                            if (!column) {
                                throw new Error("React-Table: Could not find a column with id: " + sort.id + " while sorting");
                            }
                            var sortType = column.sortType; // Look up sortBy functions in this order:
                            // column function
                            // column string lookup on user sortType
                            // column string lookup on built-in sortType
                            // default function
                            // default string lookup on user sortType
                            // default string lookup on built-in sortType
                            var sortMethod = isFunction(sortType) || (userSortTypes || {})[sortType] || sortTypes[sortType];
                            if (!sortMethod) {
                                throw new Error("React-Table: Could not find a valid sortType of '" + sortType + "' for column '" + sort.id + "'.");
                            } // Return the correct sortFn.
                            // This function should always return in ascending order
                            return ({
                                "useInstance$5.useMemo[_React$useMemo].sortData.sortedData": function(a, b) {
                                    return sortMethod(a, b, sort.id, sort.desc);
                                }
                            })["useInstance$5.useMemo[_React$useMemo].sortData.sortedData"];
                        }
                    }["useInstance$5.useMemo[_React$useMemo].sortData.sortedData"]), availableSortBy.map({
                        "useInstance$5.useMemo[_React$useMemo].sortData.sortedData": function(sort) {
                            // Detect and use the sortInverted option
                            var column = allColumns.find({
                                "useInstance$5.useMemo[_React$useMemo].sortData.sortedData.column": function(d) {
                                    return d.id === sort.id;
                                }
                            }["useInstance$5.useMemo[_React$useMemo].sortData.sortedData.column"]);
                            if (column && column.sortInverted) {
                                return sort.desc;
                            }
                            return !sort.desc;
                        }
                    }["useInstance$5.useMemo[_React$useMemo].sortData.sortedData"])); // If there are sub-rows, sort them
                    sortedData.forEach({
                        "useInstance$5.useMemo[_React$useMemo].sortData": function(row) {
                            sortedFlatRows.push(row);
                            if (!row.subRows || row.subRows.length === 0) {
                                return;
                            }
                            row.subRows = sortData(row.subRows);
                        }
                    }["useInstance$5.useMemo[_React$useMemo].sortData"]);
                    return sortedData;
                };
                return [
                    sortData(rows),
                    sortedFlatRows
                ];
            }
        }["useInstance$5.useMemo[_React$useMemo]"], [
            manualSortBy,
            sortBy,
            rows,
            flatRows,
            allColumns,
            orderByFn,
            userSortTypes
        ]), sortedRows = _React$useMemo[0], sortedFlatRows = _React$useMemo[1];
        var getAutoResetSortBy = useGetLatest(autoResetSortBy);
        useMountedLayoutEffect({
            "useInstance$5.useMountedLayoutEffect": function() {
                if (getAutoResetSortBy()) {
                    dispatch({
                        type: actions.resetSortBy
                    });
                }
            }
        }["useInstance$5.useMountedLayoutEffect"], [
            manualSortBy ? null : data
        ]);
        Object.assign(instance, {
            preSortedRows: rows,
            preSortedFlatRows: flatRows,
            sortedRows: sortedRows,
            sortedFlatRows: sortedFlatRows,
            rows: sortedRows,
            flatRows: sortedFlatRows,
            setSortBy: setSortBy,
            toggleSortBy: toggleSortBy
        });
    }
    function defaultOrderByFn(arr, funcs, dirs) {
        return [].concat(arr).sort(function(rowA, rowB) {
            for(var i = 0; i < funcs.length; i += 1){
                var sortFn = funcs[i];
                var desc = dirs[i] === false || dirs[i] === 'desc';
                var sortInt = sortFn(rowA, rowB);
                if (sortInt !== 0) {
                    return desc ? -sortInt : sortInt;
                }
            }
            return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
        });
    }
    var pluginName = 'usePagination'; // Actions
    actions.resetPage = 'resetPage';
    actions.gotoPage = 'gotoPage';
    actions.setPageSize = 'setPageSize';
    var usePagination = function usePagination(hooks) {
        hooks.stateReducers.push(reducer$6);
        hooks.useInstance.push(useInstance$6);
    };
    usePagination.pluginName = pluginName;
    function reducer$6(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                pageSize: 10,
                pageIndex: 0
            }, state);
        }
        if (action.type === actions.resetPage) {
            return _extends({}, state, {
                pageIndex: instance.initialState.pageIndex || 0
            });
        }
        if (action.type === actions.gotoPage) {
            var pageCount = instance.pageCount, page = instance.page;
            var newPageIndex = functionalUpdate(action.pageIndex, state.pageIndex);
            var canNavigate = false;
            if (newPageIndex > state.pageIndex) {
                // next page
                canNavigate = pageCount === -1 ? page.length >= state.pageSize : newPageIndex < pageCount;
            } else if (newPageIndex < state.pageIndex) {
                // prev page
                canNavigate = newPageIndex > -1;
            }
            if (!canNavigate) {
                return state;
            }
            return _extends({}, state, {
                pageIndex: newPageIndex
            });
        }
        if (action.type === actions.setPageSize) {
            var pageSize = action.pageSize;
            var topRowIndex = state.pageSize * state.pageIndex;
            var pageIndex = Math.floor(topRowIndex / pageSize);
            return _extends({}, state, {
                pageIndex: pageIndex,
                pageSize: pageSize
            });
        }
    }
    function useInstance$6(instance) {
        var rows = instance.rows, _instance$autoResetPa = instance.autoResetPage, autoResetPage = _instance$autoResetPa === void 0 ? true : _instance$autoResetPa, _instance$manualExpan = instance.manualExpandedKey, manualExpandedKey = _instance$manualExpan === void 0 ? 'expanded' : _instance$manualExpan, plugins = instance.plugins, userPageCount = instance.pageCount, _instance$paginateExp = instance.paginateExpandedRows, paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp, _instance$expandSubRo = instance.expandSubRows, expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo, _instance$state = instance.state, pageSize = _instance$state.pageSize, pageIndex = _instance$state.pageIndex, expanded = _instance$state.expanded, globalFilter = _instance$state.globalFilter, filters = _instance$state.filters, groupBy = _instance$state.groupBy, sortBy = _instance$state.sortBy, dispatch = instance.dispatch, data = instance.data, manualPagination = instance.manualPagination;
        ensurePluginOrder(plugins, [
            'useGlobalFilter',
            'useFilters',
            'useGroupBy',
            'useSortBy',
            'useExpanded'
        ], 'usePagination');
        var getAutoResetPage = useGetLatest(autoResetPage);
        useMountedLayoutEffect({
            "useInstance$6.useMountedLayoutEffect": function() {
                if (getAutoResetPage()) {
                    dispatch({
                        type: actions.resetPage
                    });
                }
            }
        }["useInstance$6.useMountedLayoutEffect"], [
            dispatch,
            manualPagination ? null : data,
            globalFilter,
            filters,
            groupBy,
            sortBy
        ]);
        var pageCount = manualPagination ? userPageCount : Math.ceil(rows.length / pageSize);
        var pageOptions = React.useMemo({
            "useInstance$6.useMemo[pageOptions]": function() {
                return pageCount > 0 ? [].concat(new Array(pageCount)).fill(null).map({
                    "useInstance$6.useMemo[pageOptions]": function(d, i) {
                        return i;
                    }
                }["useInstance$6.useMemo[pageOptions]"]) : [];
            }
        }["useInstance$6.useMemo[pageOptions]"], [
            pageCount
        ]);
        var page = React.useMemo({
            "useInstance$6.useMemo[page]": function() {
                var page;
                if (manualPagination) {
                    page = rows;
                } else {
                    var pageStart = pageSize * pageIndex;
                    var pageEnd = pageStart + pageSize;
                    page = rows.slice(pageStart, pageEnd);
                }
                if (paginateExpandedRows) {
                    return page;
                }
                return expandRows(page, {
                    manualExpandedKey: manualExpandedKey,
                    expanded: expanded,
                    expandSubRows: expandSubRows
                });
            }
        }["useInstance$6.useMemo[page]"], [
            expandSubRows,
            expanded,
            manualExpandedKey,
            manualPagination,
            pageIndex,
            pageSize,
            paginateExpandedRows,
            rows
        ]);
        var canPreviousPage = pageIndex > 0;
        var canNextPage = pageCount === -1 ? page.length >= pageSize : pageIndex < pageCount - 1;
        var gotoPage = React.useCallback({
            "useInstance$6.useCallback[gotoPage]": function(pageIndex) {
                dispatch({
                    type: actions.gotoPage,
                    pageIndex: pageIndex
                });
            }
        }["useInstance$6.useCallback[gotoPage]"], [
            dispatch
        ]);
        var previousPage = React.useCallback({
            "useInstance$6.useCallback[previousPage]": function() {
                return gotoPage({
                    "useInstance$6.useCallback[previousPage]": function(old) {
                        return old - 1;
                    }
                }["useInstance$6.useCallback[previousPage]"]);
            }
        }["useInstance$6.useCallback[previousPage]"], [
            gotoPage
        ]);
        var nextPage = React.useCallback({
            "useInstance$6.useCallback[nextPage]": function() {
                return gotoPage({
                    "useInstance$6.useCallback[nextPage]": function(old) {
                        return old + 1;
                    }
                }["useInstance$6.useCallback[nextPage]"]);
            }
        }["useInstance$6.useCallback[nextPage]"], [
            gotoPage
        ]);
        var setPageSize = React.useCallback({
            "useInstance$6.useCallback[setPageSize]": function(pageSize) {
                dispatch({
                    type: actions.setPageSize,
                    pageSize: pageSize
                });
            }
        }["useInstance$6.useCallback[setPageSize]"], [
            dispatch
        ]);
        Object.assign(instance, {
            pageOptions: pageOptions,
            pageCount: pageCount,
            page: page,
            canPreviousPage: canPreviousPage,
            canNextPage: canNextPage,
            gotoPage: gotoPage,
            previousPage: previousPage,
            nextPage: nextPage,
            setPageSize: setPageSize
        });
    }
    actions.resetPivot = 'resetPivot';
    actions.togglePivot = 'togglePivot';
    var _UNSTABLE_usePivotColumns = function _UNSTABLE_usePivotColumns(hooks) {
        hooks.getPivotToggleProps = [
            defaultGetPivotToggleProps
        ];
        hooks.stateReducers.push(reducer$7);
        hooks.useInstanceAfterData.push(useInstanceAfterData);
        hooks.allColumns.push(allColumns);
        hooks.accessValue.push(accessValue);
        hooks.materializedColumns.push(materializedColumns);
        hooks.materializedColumnsDeps.push(materializedColumnsDeps);
        hooks.visibleColumns.push(visibleColumns$1);
        hooks.visibleColumnsDeps.push(visibleColumnsDeps);
        hooks.useInstance.push(useInstance$7);
        hooks.prepareRow.push(prepareRow$2);
    };
    _UNSTABLE_usePivotColumns.pluginName = 'usePivotColumns';
    var defaultPivotColumns = [];
    var defaultGetPivotToggleProps = function defaultGetPivotToggleProps(props, _ref) {
        var header = _ref.header;
        return [
            props,
            {
                onClick: header.canPivot ? function(e) {
                    e.persist();
                    header.togglePivot();
                } : undefined,
                style: {
                    cursor: header.canPivot ? 'pointer' : undefined
                },
                title: 'Toggle Pivot'
            }
        ];
    }; // Reducer
    function reducer$7(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                pivotColumns: defaultPivotColumns
            }, state);
        }
        if (action.type === actions.resetPivot) {
            return _extends({}, state, {
                pivotColumns: instance.initialState.pivotColumns || defaultPivotColumns
            });
        }
        if (action.type === actions.togglePivot) {
            var columnId = action.columnId, setPivot = action.value;
            var resolvedPivot = typeof setPivot !== 'undefined' ? setPivot : !state.pivotColumns.includes(columnId);
            if (resolvedPivot) {
                return _extends({}, state, {
                    pivotColumns: [].concat(state.pivotColumns, [
                        columnId
                    ])
                });
            }
            return _extends({}, state, {
                pivotColumns: state.pivotColumns.filter(function(d) {
                    return d !== columnId;
                })
            });
        }
    }
    function useInstanceAfterData(instance) {
        instance.allColumns.forEach(function(column) {
            column.isPivotSource = instance.state.pivotColumns.includes(column.id);
        });
    }
    function allColumns(columns, _ref2) {
        var instance = _ref2.instance;
        columns.forEach(function(column) {
            column.isPivotSource = instance.state.pivotColumns.includes(column.id);
            column.uniqueValues = new Set();
        });
        return columns;
    }
    function accessValue(value, _ref3) {
        var column = _ref3.column;
        if (column.uniqueValues && typeof value !== 'undefined') {
            column.uniqueValues.add(value);
        }
        return value;
    }
    function materializedColumns(materialized, _ref4) {
        var instance = _ref4.instance;
        var allColumns = instance.allColumns, state = instance.state;
        if (!state.pivotColumns.length || !state.groupBy || !state.groupBy.length) {
            return materialized;
        }
        var pivotColumns = state.pivotColumns.map(function(id) {
            return allColumns.find(function(d) {
                return d.id === id;
            });
        }).filter(Boolean);
        var sourceColumns = allColumns.filter(function(d) {
            return !d.isPivotSource && !state.groupBy.includes(d.id) && !state.pivotColumns.includes(d.id);
        });
        var buildPivotColumns = function buildPivotColumns(depth, parent, pivotFilters) {
            if (depth === void 0) {
                depth = 0;
            }
            if (pivotFilters === void 0) {
                pivotFilters = [];
            }
            var pivotColumn = pivotColumns[depth];
            if (!pivotColumn) {
                return sourceColumns.map(function(sourceColumn) {
                    // TODO: We could offer support here for renesting pivoted
                    // columns inside copies of their header groups. For now,
                    // that seems like it would be (1) overkill on nesting, considering
                    // you already get nesting for every pivot level and (2)
                    // really hard. :)
                    return _extends({}, sourceColumn, {
                        canPivot: false,
                        isPivoted: true,
                        parent: parent,
                        depth: depth,
                        id: "" + (parent ? parent.id + "." + sourceColumn.id : sourceColumn.id),
                        accessor: function accessor(originalRow, i, row) {
                            if (pivotFilters.every(function(filter) {
                                return filter(row);
                            })) {
                                return row.values[sourceColumn.id];
                            }
                        }
                    });
                });
            }
            var uniqueValues = Array.from(pivotColumn.uniqueValues).sort();
            return uniqueValues.map(function(uniqueValue) {
                var columnGroup = _extends({}, pivotColumn, {
                    Header: pivotColumn.PivotHeader || typeof pivotColumn.header === 'string' ? pivotColumn.Header + ": " + uniqueValue : uniqueValue,
                    isPivotGroup: true,
                    parent: parent,
                    depth: depth,
                    id: parent ? parent.id + "." + pivotColumn.id + "." + uniqueValue : pivotColumn.id + "." + uniqueValue,
                    pivotValue: uniqueValue
                });
                columnGroup.columns = buildPivotColumns(depth + 1, columnGroup, [].concat(pivotFilters, [
                    function(row) {
                        return row.values[pivotColumn.id] === uniqueValue;
                    }
                ]));
                return columnGroup;
            });
        };
        var newMaterialized = flattenColumns(buildPivotColumns());
        return [].concat(materialized, newMaterialized);
    }
    function materializedColumnsDeps(deps, _ref5) {
        var _ref5$instance$state = _ref5.instance.state, pivotColumns = _ref5$instance$state.pivotColumns, groupBy = _ref5$instance$state.groupBy;
        return [].concat(deps, [
            pivotColumns,
            groupBy
        ]);
    }
    function visibleColumns$1(visibleColumns, _ref6) {
        var state = _ref6.instance.state;
        visibleColumns = visibleColumns.filter(function(d) {
            return !d.isPivotSource;
        });
        if (state.pivotColumns.length && state.groupBy && state.groupBy.length) {
            visibleColumns = visibleColumns.filter(function(column) {
                return column.isGrouped || column.isPivoted;
            });
        }
        return visibleColumns;
    }
    function visibleColumnsDeps(deps, _ref7) {
        var instance = _ref7.instance;
        return [].concat(deps, [
            instance.state.pivotColumns,
            instance.state.groupBy
        ]);
    }
    function useInstance$7(instance) {
        var columns = instance.columns, allColumns = instance.allColumns, flatHeaders = instance.flatHeaders, getHooks = instance.getHooks, plugins = instance.plugins, dispatch = instance.dispatch, _instance$autoResetPi = instance.autoResetPivot, autoResetPivot = _instance$autoResetPi === void 0 ? true : _instance$autoResetPi, manaulPivot = instance.manaulPivot, disablePivot = instance.disablePivot, defaultCanPivot = instance.defaultCanPivot;
        ensurePluginOrder(plugins, [
            'useGroupBy'
        ], 'usePivotColumns');
        var getInstance = useGetLatest(instance);
        allColumns.forEach(function(column) {
            var accessor = column.accessor, defaultColumnPivot = column.defaultPivot, columnDisablePivot = column.disablePivot;
            column.canPivot = accessor ? getFirstDefined(column.canPivot, columnDisablePivot === true ? false : undefined, disablePivot === true ? false : undefined, true) : getFirstDefined(column.canPivot, defaultColumnPivot, defaultCanPivot, false);
            if (column.canPivot) {
                column.togglePivot = function() {
                    return instance.togglePivot(column.id);
                };
            }
            column.Aggregated = column.Aggregated || column.Cell;
        });
        var togglePivot = function togglePivot(columnId, value) {
            dispatch({
                type: actions.togglePivot,
                columnId: columnId,
                value: value
            });
        };
        flatHeaders.forEach(function(header) {
            header.getPivotToggleProps = makePropGetter(getHooks().getPivotToggleProps, {
                instance: getInstance(),
                header: header
            });
        });
        var getAutoResetPivot = useGetLatest(autoResetPivot);
        useMountedLayoutEffect({
            "useInstance$7.useMountedLayoutEffect": function() {
                if (getAutoResetPivot()) {
                    dispatch({
                        type: actions.resetPivot
                    });
                }
            }
        }["useInstance$7.useMountedLayoutEffect"], [
            dispatch,
            manaulPivot ? null : columns
        ]);
        Object.assign(instance, {
            togglePivot: togglePivot
        });
    }
    function prepareRow$2(row) {
        row.allCells.forEach(function(cell) {
            // Grouped cells are in the pivotColumns and the pivot cell for the row
            cell.isPivoted = cell.column.isPivoted;
        });
    }
    var pluginName$1 = 'useRowSelect'; // Actions
    actions.resetSelectedRows = 'resetSelectedRows';
    actions.toggleAllRowsSelected = 'toggleAllRowsSelected';
    actions.toggleRowSelected = 'toggleRowSelected';
    actions.toggleAllPageRowsSelected = 'toggleAllPageRowsSelected';
    var useRowSelect = function useRowSelect(hooks) {
        hooks.getToggleRowSelectedProps = [
            defaultGetToggleRowSelectedProps
        ];
        hooks.getToggleAllRowsSelectedProps = [
            defaultGetToggleAllRowsSelectedProps
        ];
        hooks.getToggleAllPageRowsSelectedProps = [
            defaultGetToggleAllPageRowsSelectedProps
        ];
        hooks.stateReducers.push(reducer$8);
        hooks.useInstance.push(useInstance$8);
        hooks.prepareRow.push(prepareRow$3);
    };
    useRowSelect.pluginName = pluginName$1;
    var defaultGetToggleRowSelectedProps = function defaultGetToggleRowSelectedProps(props, _ref) {
        var instance = _ref.instance, row = _ref.row;
        var _instance$manualRowSe = instance.manualRowSelectedKey, manualRowSelectedKey = _instance$manualRowSe === void 0 ? 'isSelected' : _instance$manualRowSe;
        var checked = false;
        if (row.original && row.original[manualRowSelectedKey]) {
            checked = true;
        } else {
            checked = row.isSelected;
        }
        return [
            props,
            {
                onChange: function onChange(e) {
                    row.toggleRowSelected(e.target.checked);
                },
                style: {
                    cursor: 'pointer'
                },
                checked: checked,
                title: 'Toggle Row Selected',
                indeterminate: row.isSomeSelected
            }
        ];
    };
    var defaultGetToggleAllRowsSelectedProps = function defaultGetToggleAllRowsSelectedProps(props, _ref2) {
        var instance = _ref2.instance;
        return [
            props,
            {
                onChange: function onChange(e) {
                    instance.toggleAllRowsSelected(e.target.checked);
                },
                style: {
                    cursor: 'pointer'
                },
                checked: instance.isAllRowsSelected,
                title: 'Toggle All Rows Selected',
                indeterminate: Boolean(!instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length)
            }
        ];
    };
    var defaultGetToggleAllPageRowsSelectedProps = function defaultGetToggleAllPageRowsSelectedProps(props, _ref3) {
        var instance = _ref3.instance;
        return [
            props,
            {
                onChange: function onChange(e) {
                    instance.toggleAllPageRowsSelected(e.target.checked);
                },
                style: {
                    cursor: 'pointer'
                },
                checked: instance.isAllPageRowsSelected,
                title: 'Toggle All Current Page Rows Selected',
                indeterminate: Boolean(!instance.isAllPageRowsSelected && instance.page.some(function(_ref4) {
                    var id = _ref4.id;
                    return instance.state.selectedRowIds[id];
                }))
            }
        ];
    }; // eslint-disable-next-line max-params
    function reducer$8(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                selectedRowIds: {}
            }, state);
        }
        if (action.type === actions.resetSelectedRows) {
            return _extends({}, state, {
                selectedRowIds: instance.initialState.selectedRowIds || {}
            });
        }
        if (action.type === actions.toggleAllRowsSelected) {
            var setSelected = action.value;
            var isAllRowsSelected = instance.isAllRowsSelected, rowsById = instance.rowsById, _instance$nonGroupedR = instance.nonGroupedRowsById, nonGroupedRowsById = _instance$nonGroupedR === void 0 ? rowsById : _instance$nonGroupedR;
            var selectAll = typeof setSelected !== 'undefined' ? setSelected : !isAllRowsSelected; // Only remove/add the rows that are visible on the screen
            //  Leave all the other rows that are selected alone.
            var selectedRowIds = Object.assign({}, state.selectedRowIds);
            if (selectAll) {
                Object.keys(nonGroupedRowsById).forEach(function(rowId) {
                    selectedRowIds[rowId] = true;
                });
            } else {
                Object.keys(nonGroupedRowsById).forEach(function(rowId) {
                    delete selectedRowIds[rowId];
                });
            }
            return _extends({}, state, {
                selectedRowIds: selectedRowIds
            });
        }
        if (action.type === actions.toggleRowSelected) {
            var id = action.id, _setSelected = action.value;
            var _rowsById = instance.rowsById, _instance$selectSubRo = instance.selectSubRows, selectSubRows = _instance$selectSubRo === void 0 ? true : _instance$selectSubRo, getSubRows = instance.getSubRows;
            var isSelected = state.selectedRowIds[id];
            var shouldExist = typeof _setSelected !== 'undefined' ? _setSelected : !isSelected;
            if (isSelected === shouldExist) {
                return state;
            }
            var newSelectedRowIds = _extends({}, state.selectedRowIds);
            var handleRowById = function handleRowById(id) {
                var row = _rowsById[id];
                if (row) {
                    if (!row.isGrouped) {
                        if (shouldExist) {
                            newSelectedRowIds[id] = true;
                        } else {
                            delete newSelectedRowIds[id];
                        }
                    }
                    if (selectSubRows && getSubRows(row)) {
                        return getSubRows(row).forEach(function(row) {
                            return handleRowById(row.id);
                        });
                    }
                }
            };
            handleRowById(id);
            return _extends({}, state, {
                selectedRowIds: newSelectedRowIds
            });
        }
        if (action.type === actions.toggleAllPageRowsSelected) {
            var _setSelected2 = action.value;
            var page = instance.page, _rowsById2 = instance.rowsById, _instance$selectSubRo2 = instance.selectSubRows, _selectSubRows = _instance$selectSubRo2 === void 0 ? true : _instance$selectSubRo2, isAllPageRowsSelected = instance.isAllPageRowsSelected, _getSubRows = instance.getSubRows;
            var _selectAll = typeof _setSelected2 !== 'undefined' ? _setSelected2 : !isAllPageRowsSelected;
            var _newSelectedRowIds = _extends({}, state.selectedRowIds);
            var _handleRowById = function _handleRowById(id) {
                var row = _rowsById2[id];
                if (!row.isGrouped) {
                    if (_selectAll) {
                        _newSelectedRowIds[id] = true;
                    } else {
                        delete _newSelectedRowIds[id];
                    }
                }
                if (_selectSubRows && _getSubRows(row)) {
                    return _getSubRows(row).forEach(function(row) {
                        return _handleRowById(row.id);
                    });
                }
            };
            page.forEach(function(row) {
                return _handleRowById(row.id);
            });
            return _extends({}, state, {
                selectedRowIds: _newSelectedRowIds
            });
        }
        return state;
    }
    function useInstance$8(instance) {
        var data = instance.data, rows = instance.rows, getHooks = instance.getHooks, plugins = instance.plugins, rowsById = instance.rowsById, _instance$nonGroupedR2 = instance.nonGroupedRowsById, nonGroupedRowsById = _instance$nonGroupedR2 === void 0 ? rowsById : _instance$nonGroupedR2, _instance$autoResetSe = instance.autoResetSelectedRows, autoResetSelectedRows = _instance$autoResetSe === void 0 ? true : _instance$autoResetSe, selectedRowIds = instance.state.selectedRowIds, _instance$selectSubRo3 = instance.selectSubRows, selectSubRows = _instance$selectSubRo3 === void 0 ? true : _instance$selectSubRo3, dispatch = instance.dispatch, page = instance.page, getSubRows = instance.getSubRows;
        ensurePluginOrder(plugins, [
            'useFilters',
            'useGroupBy',
            'useSortBy',
            'useExpanded',
            'usePagination'
        ], 'useRowSelect');
        var selectedFlatRows = React.useMemo({
            "useInstance$8.useMemo[selectedFlatRows]": function() {
                var selectedFlatRows = [];
                rows.forEach({
                    "useInstance$8.useMemo[selectedFlatRows]": function(row) {
                        var isSelected = selectSubRows ? getRowIsSelected(row, selectedRowIds, getSubRows) : !!selectedRowIds[row.id];
                        row.isSelected = !!isSelected;
                        row.isSomeSelected = isSelected === null;
                        if (isSelected) {
                            selectedFlatRows.push(row);
                        }
                    }
                }["useInstance$8.useMemo[selectedFlatRows]"]);
                return selectedFlatRows;
            }
        }["useInstance$8.useMemo[selectedFlatRows]"], [
            rows,
            selectSubRows,
            selectedRowIds,
            getSubRows
        ]);
        var isAllRowsSelected = Boolean(Object.keys(nonGroupedRowsById).length && Object.keys(selectedRowIds).length);
        var isAllPageRowsSelected = isAllRowsSelected;
        if (isAllRowsSelected) {
            if (Object.keys(nonGroupedRowsById).some(function(id) {
                return !selectedRowIds[id];
            })) {
                isAllRowsSelected = false;
            }
        }
        if (!isAllRowsSelected) {
            if (page && page.length && page.some(function(_ref5) {
                var id = _ref5.id;
                return !selectedRowIds[id];
            })) {
                isAllPageRowsSelected = false;
            }
        }
        var getAutoResetSelectedRows = useGetLatest(autoResetSelectedRows);
        useMountedLayoutEffect({
            "useInstance$8.useMountedLayoutEffect": function() {
                if (getAutoResetSelectedRows()) {
                    dispatch({
                        type: actions.resetSelectedRows
                    });
                }
            }
        }["useInstance$8.useMountedLayoutEffect"], [
            dispatch,
            data
        ]);
        var toggleAllRowsSelected = React.useCallback({
            "useInstance$8.useCallback[toggleAllRowsSelected]": function(value) {
                return dispatch({
                    type: actions.toggleAllRowsSelected,
                    value: value
                });
            }
        }["useInstance$8.useCallback[toggleAllRowsSelected]"], [
            dispatch
        ]);
        var toggleAllPageRowsSelected = React.useCallback({
            "useInstance$8.useCallback[toggleAllPageRowsSelected]": function(value) {
                return dispatch({
                    type: actions.toggleAllPageRowsSelected,
                    value: value
                });
            }
        }["useInstance$8.useCallback[toggleAllPageRowsSelected]"], [
            dispatch
        ]);
        var toggleRowSelected = React.useCallback({
            "useInstance$8.useCallback[toggleRowSelected]": function(id, value) {
                return dispatch({
                    type: actions.toggleRowSelected,
                    id: id,
                    value: value
                });
            }
        }["useInstance$8.useCallback[toggleRowSelected]"], [
            dispatch
        ]);
        var getInstance = useGetLatest(instance);
        var getToggleAllRowsSelectedProps = makePropGetter(getHooks().getToggleAllRowsSelectedProps, {
            instance: getInstance()
        });
        var getToggleAllPageRowsSelectedProps = makePropGetter(getHooks().getToggleAllPageRowsSelectedProps, {
            instance: getInstance()
        });
        Object.assign(instance, {
            selectedFlatRows: selectedFlatRows,
            isAllRowsSelected: isAllRowsSelected,
            isAllPageRowsSelected: isAllPageRowsSelected,
            toggleRowSelected: toggleRowSelected,
            toggleAllRowsSelected: toggleAllRowsSelected,
            getToggleAllRowsSelectedProps: getToggleAllRowsSelectedProps,
            getToggleAllPageRowsSelectedProps: getToggleAllPageRowsSelectedProps,
            toggleAllPageRowsSelected: toggleAllPageRowsSelected
        });
    }
    function prepareRow$3(row, _ref6) {
        var instance = _ref6.instance;
        row.toggleRowSelected = function(set) {
            return instance.toggleRowSelected(row.id, set);
        };
        row.getToggleRowSelectedProps = makePropGetter(instance.getHooks().getToggleRowSelectedProps, {
            instance: instance,
            row: row
        });
    }
    function getRowIsSelected(row, selectedRowIds, getSubRows) {
        if (selectedRowIds[row.id]) {
            return true;
        }
        var subRows = getSubRows(row);
        if (subRows && subRows.length) {
            var allChildrenSelected = true;
            var someSelected = false;
            subRows.forEach(function(subRow) {
                // Bail out early if we know both of these
                if (someSelected && !allChildrenSelected) {
                    return;
                }
                if (getRowIsSelected(subRow, selectedRowIds, getSubRows)) {
                    someSelected = true;
                } else {
                    allChildrenSelected = false;
                }
            });
            return allChildrenSelected ? true : someSelected ? null : false;
        }
        return false;
    }
    var defaultInitialRowStateAccessor = function defaultInitialRowStateAccessor(row) {
        return {};
    };
    var defaultInitialCellStateAccessor = function defaultInitialCellStateAccessor(cell) {
        return {};
    }; // Actions
    actions.setRowState = 'setRowState';
    actions.setCellState = 'setCellState';
    actions.resetRowState = 'resetRowState';
    var useRowState = function useRowState(hooks) {
        hooks.stateReducers.push(reducer$9);
        hooks.useInstance.push(useInstance$9);
        hooks.prepareRow.push(prepareRow$4);
    };
    useRowState.pluginName = 'useRowState';
    function reducer$9(state, action, previousState, instance) {
        var _instance$initialRowS = instance.initialRowStateAccessor, initialRowStateAccessor = _instance$initialRowS === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS, _instance$initialCell = instance.initialCellStateAccessor, initialCellStateAccessor = _instance$initialCell === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell, rowsById = instance.rowsById;
        if (action.type === actions.init) {
            return _extends({
                rowState: {}
            }, state);
        }
        if (action.type === actions.resetRowState) {
            return _extends({}, state, {
                rowState: instance.initialState.rowState || {}
            });
        }
        if (action.type === actions.setRowState) {
            var _extends2;
            var rowId = action.rowId, value = action.value;
            var oldRowState = typeof state.rowState[rowId] !== 'undefined' ? state.rowState[rowId] : initialRowStateAccessor(rowsById[rowId]);
            return _extends({}, state, {
                rowState: _extends({}, state.rowState, (_extends2 = {}, _extends2[rowId] = functionalUpdate(value, oldRowState), _extends2))
            });
        }
        if (action.type === actions.setCellState) {
            var _oldRowState$cellStat, _rowsById$_rowId, _rowsById$_rowId$cell, _extends3, _extends4;
            var _rowId = action.rowId, columnId = action.columnId, _value = action.value;
            var _oldRowState = typeof state.rowState[_rowId] !== 'undefined' ? state.rowState[_rowId] : initialRowStateAccessor(rowsById[_rowId]);
            var oldCellState = typeof (_oldRowState == null ? void 0 : (_oldRowState$cellStat = _oldRowState.cellState) == null ? void 0 : _oldRowState$cellStat[columnId]) !== 'undefined' ? _oldRowState.cellState[columnId] : initialCellStateAccessor((_rowsById$_rowId = rowsById[_rowId]) == null ? void 0 : (_rowsById$_rowId$cell = _rowsById$_rowId.cells) == null ? void 0 : _rowsById$_rowId$cell.find(function(cell) {
                return cell.column.id === columnId;
            }));
            return _extends({}, state, {
                rowState: _extends({}, state.rowState, (_extends4 = {}, _extends4[_rowId] = _extends({}, _oldRowState, {
                    cellState: _extends({}, _oldRowState.cellState || {}, (_extends3 = {}, _extends3[columnId] = functionalUpdate(_value, oldCellState), _extends3))
                }), _extends4))
            });
        }
    }
    function useInstance$9(instance) {
        var _instance$autoResetRo = instance.autoResetRowState, autoResetRowState = _instance$autoResetRo === void 0 ? true : _instance$autoResetRo, data = instance.data, dispatch = instance.dispatch;
        var setRowState = React.useCallback({
            "useInstance$9.useCallback[setRowState]": function(rowId, value) {
                return dispatch({
                    type: actions.setRowState,
                    rowId: rowId,
                    value: value
                });
            }
        }["useInstance$9.useCallback[setRowState]"], [
            dispatch
        ]);
        var setCellState = React.useCallback({
            "useInstance$9.useCallback[setCellState]": function(rowId, columnId, value) {
                return dispatch({
                    type: actions.setCellState,
                    rowId: rowId,
                    columnId: columnId,
                    value: value
                });
            }
        }["useInstance$9.useCallback[setCellState]"], [
            dispatch
        ]);
        var getAutoResetRowState = useGetLatest(autoResetRowState);
        useMountedLayoutEffect({
            "useInstance$9.useMountedLayoutEffect": function() {
                if (getAutoResetRowState()) {
                    dispatch({
                        type: actions.resetRowState
                    });
                }
            }
        }["useInstance$9.useMountedLayoutEffect"], [
            data
        ]);
        Object.assign(instance, {
            setRowState: setRowState,
            setCellState: setCellState
        });
    }
    function prepareRow$4(row, _ref) {
        var instance = _ref.instance;
        var _instance$initialRowS2 = instance.initialRowStateAccessor, initialRowStateAccessor = _instance$initialRowS2 === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS2, _instance$initialCell2 = instance.initialCellStateAccessor, initialCellStateAccessor = _instance$initialCell2 === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell2, rowState = instance.state.rowState;
        if (row) {
            row.state = typeof rowState[row.id] !== 'undefined' ? rowState[row.id] : initialRowStateAccessor(row);
            row.setState = function(updater) {
                return instance.setRowState(row.id, updater);
            };
            row.cells.forEach(function(cell) {
                if (!row.state.cellState) {
                    row.state.cellState = {};
                }
                cell.state = typeof row.state.cellState[cell.column.id] !== 'undefined' ? row.state.cellState[cell.column.id] : initialCellStateAccessor(cell);
                cell.setState = function(updater) {
                    return instance.setCellState(row.id, cell.column.id, updater);
                };
            });
        }
    }
    actions.resetColumnOrder = 'resetColumnOrder';
    actions.setColumnOrder = 'setColumnOrder';
    var useColumnOrder = function useColumnOrder(hooks) {
        hooks.stateReducers.push(reducer$a);
        hooks.visibleColumnsDeps.push(function(deps, _ref) {
            var instance = _ref.instance;
            return [].concat(deps, [
                instance.state.columnOrder
            ]);
        });
        hooks.visibleColumns.push(visibleColumns$2);
        hooks.useInstance.push(useInstance$a);
    };
    useColumnOrder.pluginName = 'useColumnOrder';
    function reducer$a(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                columnOrder: []
            }, state);
        }
        if (action.type === actions.resetColumnOrder) {
            return _extends({}, state, {
                columnOrder: instance.initialState.columnOrder || []
            });
        }
        if (action.type === actions.setColumnOrder) {
            return _extends({}, state, {
                columnOrder: functionalUpdate(action.columnOrder, state.columnOrder)
            });
        }
    }
    function visibleColumns$2(columns, _ref2) {
        var columnOrder = _ref2.instance.state.columnOrder;
        // If there is no order, return the normal columns
        if (!columnOrder || !columnOrder.length) {
            return columns;
        }
        var columnOrderCopy = [].concat(columnOrder); // If there is an order, make a copy of the columns
        var columnsCopy = [].concat(columns); // And make a new ordered array of the columns
        var columnsInOrder = []; // Loop over the columns and place them in order into the new array
        var _loop = function _loop() {
            var targetColumnId = columnOrderCopy.shift();
            var foundIndex = columnsCopy.findIndex(function(d) {
                return d.id === targetColumnId;
            });
            if (foundIndex > -1) {
                columnsInOrder.push(columnsCopy.splice(foundIndex, 1)[0]);
            }
        };
        while(columnsCopy.length && columnOrderCopy.length){
            _loop();
        } // If there are any columns left, add them to the end
        return [].concat(columnsInOrder, columnsCopy);
    }
    function useInstance$a(instance) {
        var dispatch = instance.dispatch;
        instance.setColumnOrder = React.useCallback({
            "useInstance$a.useCallback": function(columnOrder) {
                return dispatch({
                    type: actions.setColumnOrder,
                    columnOrder: columnOrder
                });
            }
        }["useInstance$a.useCallback"], [
            dispatch
        ]);
    }
    defaultColumn.canResize = true; // Actions
    actions.columnStartResizing = 'columnStartResizing';
    actions.columnResizing = 'columnResizing';
    actions.columnDoneResizing = 'columnDoneResizing';
    actions.resetResize = 'resetResize';
    var useResizeColumns = function useResizeColumns(hooks) {
        hooks.getResizerProps = [
            defaultGetResizerProps
        ];
        hooks.getHeaderProps.push({
            style: {
                position: 'relative'
            }
        });
        hooks.stateReducers.push(reducer$b);
        hooks.useInstance.push(useInstance$b);
        hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions$1);
    };
    var defaultGetResizerProps = function defaultGetResizerProps(props, _ref) {
        var instance = _ref.instance, header = _ref.header;
        var dispatch = instance.dispatch;
        var onResizeStart = function onResizeStart(e, header) {
            var isTouchEvent = false;
            if (e.type === 'touchstart') {
                // lets not respond to multiple touches (e.g. 2 or 3 fingers)
                if (e.touches && e.touches.length > 1) {
                    return;
                }
                isTouchEvent = true;
            }
            var headersToResize = getLeafHeaders(header);
            var headerIdWidths = headersToResize.map(function(d) {
                return [
                    d.id,
                    d.totalWidth
                ];
            });
            var clientX = isTouchEvent ? Math.round(e.touches[0].clientX) : e.clientX;
            var raf;
            var mostRecentClientX;
            var dispatchEnd = function dispatchEnd() {
                window.cancelAnimationFrame(raf);
                raf = null;
                dispatch({
                    type: actions.columnDoneResizing
                });
            };
            var dispatchMove = function dispatchMove() {
                window.cancelAnimationFrame(raf);
                raf = null;
                dispatch({
                    type: actions.columnResizing,
                    clientX: mostRecentClientX
                });
            };
            var scheduleDispatchMoveOnNextAnimationFrame = function scheduleDispatchMoveOnNextAnimationFrame(clientXPos) {
                mostRecentClientX = clientXPos;
                if (!raf) {
                    raf = window.requestAnimationFrame(dispatchMove);
                }
            };
            var handlersAndEvents = {
                mouse: {
                    moveEvent: 'mousemove',
                    moveHandler: function moveHandler(e) {
                        return scheduleDispatchMoveOnNextAnimationFrame(e.clientX);
                    },
                    upEvent: 'mouseup',
                    upHandler: function upHandler(e) {
                        document.removeEventListener('mousemove', handlersAndEvents.mouse.moveHandler);
                        document.removeEventListener('mouseup', handlersAndEvents.mouse.upHandler);
                        dispatchEnd();
                    }
                },
                touch: {
                    moveEvent: 'touchmove',
                    moveHandler: function moveHandler(e) {
                        if (e.cancelable) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        scheduleDispatchMoveOnNextAnimationFrame(e.touches[0].clientX);
                        return false;
                    },
                    upEvent: 'touchend',
                    upHandler: function upHandler(e) {
                        document.removeEventListener(handlersAndEvents.touch.moveEvent, handlersAndEvents.touch.moveHandler);
                        document.removeEventListener(handlersAndEvents.touch.upEvent, handlersAndEvents.touch.moveHandler);
                        dispatchEnd();
                    }
                }
            };
            var events = isTouchEvent ? handlersAndEvents.touch : handlersAndEvents.mouse;
            var passiveIfSupported = passiveEventSupported() ? {
                passive: false
            } : false;
            document.addEventListener(events.moveEvent, events.moveHandler, passiveIfSupported);
            document.addEventListener(events.upEvent, events.upHandler, passiveIfSupported);
            dispatch({
                type: actions.columnStartResizing,
                columnId: header.id,
                columnWidth: header.totalWidth,
                headerIdWidths: headerIdWidths,
                clientX: clientX
            });
        };
        return [
            props,
            {
                onMouseDown: function onMouseDown(e) {
                    return e.persist() || onResizeStart(e, header);
                },
                onTouchStart: function onTouchStart(e) {
                    return e.persist() || onResizeStart(e, header);
                },
                style: {
                    cursor: 'col-resize'
                },
                draggable: false,
                role: 'separator'
            }
        ];
    };
    useResizeColumns.pluginName = 'useResizeColumns';
    function reducer$b(state, action) {
        if (action.type === actions.init) {
            return _extends({
                columnResizing: {
                    columnWidths: {}
                }
            }, state);
        }
        if (action.type === actions.resetResize) {
            return _extends({}, state, {
                columnResizing: {
                    columnWidths: {}
                }
            });
        }
        if (action.type === actions.columnStartResizing) {
            var clientX = action.clientX, columnId = action.columnId, columnWidth = action.columnWidth, headerIdWidths = action.headerIdWidths;
            return _extends({}, state, {
                columnResizing: _extends({}, state.columnResizing, {
                    startX: clientX,
                    headerIdWidths: headerIdWidths,
                    columnWidth: columnWidth,
                    isResizingColumn: columnId
                })
            });
        }
        if (action.type === actions.columnResizing) {
            var _clientX = action.clientX;
            var _state$columnResizing = state.columnResizing, startX = _state$columnResizing.startX, _columnWidth = _state$columnResizing.columnWidth, _state$columnResizing2 = _state$columnResizing.headerIdWidths, _headerIdWidths = _state$columnResizing2 === void 0 ? [] : _state$columnResizing2;
            var deltaX = _clientX - startX;
            var percentageDeltaX = deltaX / _columnWidth;
            var newColumnWidths = {};
            _headerIdWidths.forEach(function(_ref2) {
                var headerId = _ref2[0], headerWidth = _ref2[1];
                newColumnWidths[headerId] = Math.max(headerWidth + headerWidth * percentageDeltaX, 0);
            });
            return _extends({}, state, {
                columnResizing: _extends({}, state.columnResizing, {
                    columnWidths: _extends({}, state.columnResizing.columnWidths, {}, newColumnWidths)
                })
            });
        }
        if (action.type === actions.columnDoneResizing) {
            return _extends({}, state, {
                columnResizing: _extends({}, state.columnResizing, {
                    startX: null,
                    isResizingColumn: null
                })
            });
        }
    }
    var useInstanceBeforeDimensions$1 = function useInstanceBeforeDimensions(instance) {
        var flatHeaders = instance.flatHeaders, disableResizing = instance.disableResizing, getHooks = instance.getHooks, columnResizing = instance.state.columnResizing;
        var getInstance = useGetLatest(instance);
        flatHeaders.forEach(function(header) {
            var canResize = getFirstDefined(header.disableResizing === true ? false : undefined, disableResizing === true ? false : undefined, true);
            header.canResize = canResize;
            header.width = columnResizing.columnWidths[header.id] || header.originalWidth || header.width;
            header.isResizing = columnResizing.isResizingColumn === header.id;
            if (canResize) {
                header.getResizerProps = makePropGetter(getHooks().getResizerProps, {
                    instance: getInstance(),
                    header: header
                });
            }
        });
    };
    function useInstance$b(instance) {
        var plugins = instance.plugins, dispatch = instance.dispatch, _instance$autoResetRe = instance.autoResetResize, autoResetResize = _instance$autoResetRe === void 0 ? true : _instance$autoResetRe, columns = instance.columns;
        ensurePluginOrder(plugins, [
            'useAbsoluteLayout'
        ], 'useResizeColumns');
        var getAutoResetResize = useGetLatest(autoResetResize);
        useMountedLayoutEffect({
            "useInstance$b.useMountedLayoutEffect": function() {
                if (getAutoResetResize()) {
                    dispatch({
                        type: actions.resetResize
                    });
                }
            }
        }["useInstance$b.useMountedLayoutEffect"], [
            columns
        ]);
        var resetResizing = React.useCallback({
            "useInstance$b.useCallback[resetResizing]": function() {
                return dispatch({
                    type: actions.resetResize
                });
            }
        }["useInstance$b.useCallback[resetResizing]"], [
            dispatch
        ]);
        Object.assign(instance, {
            resetResizing: resetResizing
        });
    }
    function getLeafHeaders(header) {
        var leafHeaders = [];
        var recurseHeader = function recurseHeader(header) {
            if (header.columns && header.columns.length) {
                header.columns.map(recurseHeader);
            }
            leafHeaders.push(header);
        };
        recurseHeader(header);
        return leafHeaders;
    }
    var cellStyles = {
        position: 'absolute',
        top: 0
    };
    var useAbsoluteLayout = function useAbsoluteLayout(hooks) {
        hooks.getTableBodyProps.push(getRowStyles);
        hooks.getRowProps.push(getRowStyles);
        hooks.getHeaderGroupProps.push(getRowStyles);
        hooks.getFooterGroupProps.push(getRowStyles);
        hooks.getHeaderProps.push(function(props, _ref) {
            var column = _ref.column;
            return [
                props,
                {
                    style: _extends({}, cellStyles, {
                        left: column.totalLeft + "px",
                        width: column.totalWidth + "px"
                    })
                }
            ];
        });
        hooks.getCellProps.push(function(props, _ref2) {
            var cell = _ref2.cell;
            return [
                props,
                {
                    style: _extends({}, cellStyles, {
                        left: cell.column.totalLeft + "px",
                        width: cell.column.totalWidth + "px"
                    })
                }
            ];
        });
        hooks.getFooterProps.push(function(props, _ref3) {
            var column = _ref3.column;
            return [
                props,
                {
                    style: _extends({}, cellStyles, {
                        left: column.totalLeft + "px",
                        width: column.totalWidth + "px"
                    })
                }
            ];
        });
    };
    useAbsoluteLayout.pluginName = 'useAbsoluteLayout';
    var getRowStyles = function getRowStyles(props, _ref4) {
        var instance = _ref4.instance;
        return [
            props,
            {
                style: {
                    position: 'relative',
                    width: instance.totalColumnsWidth + "px"
                }
            }
        ];
    };
    var cellStyles$1 = {
        display: 'inline-block',
        boxSizing: 'border-box'
    };
    var getRowStyles$1 = function getRowStyles(props, _ref) {
        var instance = _ref.instance;
        return [
            props,
            {
                style: {
                    display: 'flex',
                    width: instance.totalColumnsWidth + "px"
                }
            }
        ];
    };
    var useBlockLayout = function useBlockLayout(hooks) {
        hooks.getRowProps.push(getRowStyles$1);
        hooks.getHeaderGroupProps.push(getRowStyles$1);
        hooks.getFooterGroupProps.push(getRowStyles$1);
        hooks.getHeaderProps.push(function(props, _ref2) {
            var column = _ref2.column;
            return [
                props,
                {
                    style: _extends({}, cellStyles$1, {
                        width: column.totalWidth + "px"
                    })
                }
            ];
        });
        hooks.getCellProps.push(function(props, _ref3) {
            var cell = _ref3.cell;
            return [
                props,
                {
                    style: _extends({}, cellStyles$1, {
                        width: cell.column.totalWidth + "px"
                    })
                }
            ];
        });
        hooks.getFooterProps.push(function(props, _ref4) {
            var column = _ref4.column;
            return [
                props,
                {
                    style: _extends({}, cellStyles$1, {
                        width: column.totalWidth + "px"
                    })
                }
            ];
        });
    };
    useBlockLayout.pluginName = 'useBlockLayout';
    function useFlexLayout(hooks) {
        hooks.getTableProps.push(getTableProps);
        hooks.getRowProps.push(getRowStyles$2);
        hooks.getHeaderGroupProps.push(getRowStyles$2);
        hooks.getFooterGroupProps.push(getRowStyles$2);
        hooks.getHeaderProps.push(getHeaderProps);
        hooks.getCellProps.push(getCellProps);
        hooks.getFooterProps.push(getFooterProps);
    }
    useFlexLayout.pluginName = 'useFlexLayout';
    var getTableProps = function getTableProps(props, _ref) {
        var instance = _ref.instance;
        return [
            props,
            {
                style: {
                    minWidth: instance.totalColumnsMinWidth + "px"
                }
            }
        ];
    };
    var getRowStyles$2 = function getRowStyles(props, _ref2) {
        var instance = _ref2.instance;
        return [
            props,
            {
                style: {
                    display: 'flex',
                    flex: '1 0 auto',
                    minWidth: instance.totalColumnsMinWidth + "px"
                }
            }
        ];
    };
    var getHeaderProps = function getHeaderProps(props, _ref3) {
        var column = _ref3.column;
        return [
            props,
            {
                style: {
                    boxSizing: 'border-box',
                    flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : undefined,
                    minWidth: column.totalMinWidth + "px",
                    width: column.totalWidth + "px"
                }
            }
        ];
    };
    var getCellProps = function getCellProps(props, _ref4) {
        var cell = _ref4.cell;
        return [
            props,
            {
                style: {
                    boxSizing: 'border-box',
                    flex: cell.column.totalFlexWidth + " 0 auto",
                    minWidth: cell.column.totalMinWidth + "px",
                    width: cell.column.totalWidth + "px"
                }
            }
        ];
    };
    var getFooterProps = function getFooterProps(props, _ref5) {
        var column = _ref5.column;
        return [
            props,
            {
                style: {
                    boxSizing: 'border-box',
                    flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : undefined,
                    minWidth: column.totalMinWidth + "px",
                    width: column.totalWidth + "px"
                }
            }
        ];
    };
    actions.columnStartResizing = 'columnStartResizing';
    actions.columnResizing = 'columnResizing';
    actions.columnDoneResizing = 'columnDoneResizing';
    actions.resetResize = 'resetResize';
    function useGridLayout(hooks) {
        hooks.stateReducers.push(reducer$c);
        hooks.getTableProps.push(getTableProps$1);
        hooks.getHeaderProps.push(getHeaderProps$1);
        hooks.getRowProps.push(getRowProps);
    }
    useGridLayout.pluginName = 'useGridLayout';
    var getTableProps$1 = function getTableProps(props, _ref) {
        var instance = _ref.instance;
        var gridTemplateColumns = instance.visibleColumns.map(function(column) {
            var _instance$state$colum;
            if (instance.state.gridLayout.columnWidths[column.id]) return instance.state.gridLayout.columnWidths[column.id] + "px"; // When resizing, lock the width of all unset columns
            // instead of using user-provided width or defaultColumn width,
            // which could potentially be 'auto' or 'fr' units that don't scale linearly
            if ((_instance$state$colum = instance.state.columnResizing) == null ? void 0 : _instance$state$colum.isResizingColumn) return instance.state.gridLayout.startWidths[column.id] + "px";
            if (typeof column.width === 'number') return column.width + "px";
            return column.width;
        });
        return [
            props,
            {
                style: {
                    display: "grid",
                    gridTemplateColumns: gridTemplateColumns.join(" ")
                }
            }
        ];
    };
    var getHeaderProps$1 = function getHeaderProps(props, _ref2) {
        var column = _ref2.column;
        return [
            props,
            {
                id: "header-cell-" + column.id,
                style: {
                    position: "sticky",
                    //enables a scroll wrapper to be placed around the table and have sticky headers
                    gridColumn: "span " + column.totalVisibleHeaderCount
                }
            }
        ];
    };
    var getRowProps = function getRowProps(props, _ref3) {
        var row = _ref3.row;
        if (row.isExpanded) {
            return [
                props,
                {
                    style: {
                        gridColumn: "1 / " + (row.cells.length + 1)
                    }
                }
            ];
        }
        return [
            props,
            {}
        ];
    };
    function reducer$c(state, action, previousState, instance) {
        if (action.type === actions.init) {
            return _extends({
                gridLayout: {
                    columnWidths: {}
                }
            }, state);
        }
        if (action.type === actions.resetResize) {
            return _extends({}, state, {
                gridLayout: {
                    columnWidths: {}
                }
            });
        }
        if (action.type === actions.columnStartResizing) {
            var columnId = action.columnId, headerIdWidths = action.headerIdWidths;
            var columnWidth = getElementWidth(columnId);
            if (columnWidth !== undefined) {
                var startWidths = instance.visibleColumns.reduce(function(acc, column) {
                    var _extends2;
                    return _extends({}, acc, (_extends2 = {}, _extends2[column.id] = getElementWidth(column.id), _extends2));
                }, {});
                var minWidths = instance.visibleColumns.reduce(function(acc, column) {
                    var _extends3;
                    return _extends({}, acc, (_extends3 = {}, _extends3[column.id] = column.minWidth, _extends3));
                }, {});
                var maxWidths = instance.visibleColumns.reduce(function(acc, column) {
                    var _extends4;
                    return _extends({}, acc, (_extends4 = {}, _extends4[column.id] = column.maxWidth, _extends4));
                }, {});
                var headerIdGridWidths = headerIdWidths.map(function(_ref4) {
                    var headerId = _ref4[0];
                    return [
                        headerId,
                        getElementWidth(headerId)
                    ];
                });
                return _extends({}, state, {
                    gridLayout: _extends({}, state.gridLayout, {
                        startWidths: startWidths,
                        minWidths: minWidths,
                        maxWidths: maxWidths,
                        headerIdGridWidths: headerIdGridWidths,
                        columnWidth: columnWidth
                    })
                });
            } else {
                return state;
            }
        }
        if (action.type === actions.columnResizing) {
            var clientX = action.clientX;
            var startX = state.columnResizing.startX;
            var _state$gridLayout = state.gridLayout, _columnWidth = _state$gridLayout.columnWidth, _minWidths = _state$gridLayout.minWidths, _maxWidths = _state$gridLayout.maxWidths, _state$gridLayout$hea = _state$gridLayout.headerIdGridWidths, _headerIdGridWidths = _state$gridLayout$hea === void 0 ? [] : _state$gridLayout$hea;
            var deltaX = clientX - startX;
            var percentageDeltaX = deltaX / _columnWidth;
            var newColumnWidths = {};
            _headerIdGridWidths.forEach(function(_ref5) {
                var headerId = _ref5[0], headerWidth = _ref5[1];
                newColumnWidths[headerId] = Math.min(Math.max(_minWidths[headerId], headerWidth + headerWidth * percentageDeltaX), _maxWidths[headerId]);
            });
            return _extends({}, state, {
                gridLayout: _extends({}, state.gridLayout, {
                    columnWidths: _extends({}, state.gridLayout.columnWidths, {}, newColumnWidths)
                })
            });
        }
        if (action.type === actions.columnDoneResizing) {
            return _extends({}, state, {
                gridLayout: _extends({}, state.gridLayout, {
                    startWidths: {},
                    minWidths: {},
                    maxWidths: {}
                })
            });
        }
    }
    function getElementWidth(columnId) {
        var _document$getElementB;
        var width = (_document$getElementB = document.getElementById("header-cell-" + columnId)) == null ? void 0 : _document$getElementB.offsetWidth;
        if (width !== undefined) {
            return width;
        }
    }
    exports1._UNSTABLE_usePivotColumns = _UNSTABLE_usePivotColumns;
    exports1.actions = actions;
    exports1.defaultColumn = defaultColumn;
    exports1.defaultGroupByFn = defaultGroupByFn;
    exports1.defaultOrderByFn = defaultOrderByFn;
    exports1.defaultRenderer = defaultRenderer;
    exports1.emptyRenderer = emptyRenderer;
    exports1.ensurePluginOrder = ensurePluginOrder;
    exports1.flexRender = flexRender;
    exports1.functionalUpdate = functionalUpdate;
    exports1.loopHooks = loopHooks;
    exports1.makePropGetter = makePropGetter;
    exports1.makeRenderer = makeRenderer;
    exports1.reduceHooks = reduceHooks;
    exports1.safeUseLayoutEffect = safeUseLayoutEffect;
    exports1.useAbsoluteLayout = useAbsoluteLayout;
    exports1.useAsyncDebounce = useAsyncDebounce;
    exports1.useBlockLayout = useBlockLayout;
    exports1.useColumnOrder = useColumnOrder;
    exports1.useExpanded = useExpanded;
    exports1.useFilters = useFilters;
    exports1.useFlexLayout = useFlexLayout;
    exports1.useGetLatest = useGetLatest;
    exports1.useGlobalFilter = useGlobalFilter;
    exports1.useGridLayout = useGridLayout;
    exports1.useGroupBy = useGroupBy;
    exports1.useMountedLayoutEffect = useMountedLayoutEffect;
    exports1.usePagination = usePagination;
    exports1.useResizeColumns = useResizeColumns;
    exports1.useRowSelect = useRowSelect;
    exports1.useRowState = useRowState;
    exports1.useSortBy = useSortBy;
    exports1.useTable = useTable;
    Object.defineProperty(exports1, '__esModule', {
        value: true
    });
}); //# sourceMappingURL=react-table.development.js.map
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-table/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dharwin_boilerplate$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-table/dist/react-table.development.js [app-client] (ecmascript)");
}
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/types.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Direction = void 0;
var Direction;
(function(Direction) {
    Direction["Right"] = "to right";
    Direction["Left"] = "to left";
    Direction["Down"] = "to bottom";
    Direction["Up"] = "to top";
})(Direction = exports.Direction || (exports.Direction = {}));
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __spreadArray = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useThumbOverlap = exports.assertUnreachable = exports.voidFn = exports.getTrackBackground = exports.replaceAt = exports.schd = exports.translate = exports.getClosestThumbIndex = exports.translateThumbs = exports.getPaddingAndBorder = exports.getMargin = exports.checkInitialOverlap = exports.checkValuesAgainstBoundaries = exports.checkBoundaries = exports.isVertical = exports.relativeValue = exports.normalizeValue = exports.isStepDivisible = exports.isTouchEvent = exports.getStepDecimals = void 0;
var react_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var types_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/types.js [app-client] (ecmascript)");
var getStepDecimals = function(step) {
    var decimals = step.toString().split('.')[1];
    return decimals ? decimals.length : 0;
};
exports.getStepDecimals = getStepDecimals;
function isTouchEvent(event) {
    return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
}
exports.isTouchEvent = isTouchEvent;
function isStepDivisible(min, max, step) {
    var res = (max - min) / step;
    var precision = 8;
    var roundedRes = Number(res.toFixed(precision));
    return parseInt(roundedRes.toString(), 10) === roundedRes;
}
exports.isStepDivisible = isStepDivisible;
function normalizeValue(value, index, min, max, step, allowOverlap, values) {
    var BIG_NUM = 10e10;
    value = Math.round(value * BIG_NUM) / BIG_NUM;
    if (!allowOverlap) {
        var prev = values[index - 1];
        var next = values[index + 1];
        if (prev && prev > value) return prev;
        if (next && next < value) return next;
    }
    if (value > max) return max;
    if (value < min) return min;
    // `remainder` is a difference between the given value and a full step value
    // that is closest lower to the given value and is in the range between the min value
    // and the given value
    var remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) % Math.floor(step * BIG_NUM);
    var closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
    var rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
    // Values with a remainder `< step/2` are rounded to the closest lower value
    // while values with a remainder `= > step/2` are rounded to the closest bigger value
    var res = Math.abs(remainder / BIG_NUM) < step / 2 ? rounded : rounded + step;
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    return parseFloat(res.toFixed(decimalPlaces));
}
exports.normalizeValue = normalizeValue;
function relativeValue(value, min, max) {
    return (value - min) / (max - min);
}
exports.relativeValue = relativeValue;
function isVertical(direction) {
    return direction === types_1.Direction.Up || direction === types_1.Direction.Down;
}
exports.isVertical = isVertical;
function checkBoundaries(value, min, max) {
    if (min >= max) {
        throw new RangeError("min (".concat(min, ") is equal/bigger than max (").concat(max, ")"));
    }
    if (value < min) {
        throw new RangeError("value (".concat(value, ") is smaller than min (").concat(min, ")"));
    }
    if (value > max) {
        throw new RangeError("value (".concat(value, ") is bigger than max (").concat(max, ")"));
    }
}
exports.checkBoundaries = checkBoundaries;
function checkValuesAgainstBoundaries(value, min, max) {
    if (value < min) {
        // set selectedValue to min
        return min;
    }
    if (value > max) {
        // set selectedValue to max
        return max;
    } else {
        return value;
    }
}
exports.checkValuesAgainstBoundaries = checkValuesAgainstBoundaries;
function checkInitialOverlap(values) {
    if (values.length < 2) return;
    if (!values.slice(1).every(function(item, i) {
        return values[i] <= item;
    })) {
        throw new RangeError("values={[".concat(values, "]} needs to be sorted when allowOverlap={false}"));
    }
}
exports.checkInitialOverlap = checkInitialOverlap;
function getMargin(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style['margin-top'], 10),
        bottom: parseInt(style['margin-bottom'], 10),
        left: parseInt(style['margin-left'], 10),
        right: parseInt(style['margin-right'], 10)
    };
}
exports.getMargin = getMargin;
function getPaddingAndBorder(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style['padding-top'], 10) + parseInt(style['border-top-width'], 10),
        bottom: parseInt(style['padding-bottom'], 10) + parseInt(style['border-bottom-width'], 10),
        left: parseInt(style['padding-left'], 10) + parseInt(style['border-left-width'], 10),
        right: parseInt(style['padding-right'], 10) + parseInt(style['border-right-width'], 10)
    };
}
exports.getPaddingAndBorder = getPaddingAndBorder;
function translateThumbs(elements, offsets, rtl) {
    var inverter = rtl ? -1 : 1;
    elements.forEach(function(element, index) {
        return translate(element, inverter * offsets[index].x, offsets[index].y);
    });
}
exports.translateThumbs = translateThumbs;
/**
 * Util function for calculating the index of the thumb that is closes to a given position
 * @param thumbs - array of Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */ function getClosestThumbIndex(thumbs, clientX, clientY, direction) {
    var thumbIndex = 0;
    var minThumbDistance = getThumbDistance(thumbs[0], clientX, clientY, direction);
    for(var i = 1; i < thumbs.length; i++){
        var thumbDistance = getThumbDistance(thumbs[i], clientX, clientY, direction);
        if (thumbDistance < minThumbDistance) {
            minThumbDistance = thumbDistance;
            thumbIndex = i;
        }
    }
    return thumbIndex;
}
exports.getClosestThumbIndex = getClosestThumbIndex;
function translate(element, x, y) {
    element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
}
exports.translate = translate;
// adapted from https://github.com/alexreardon/raf-schd
var schd = function(fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        lastArgs = args;
        if (frameId) {
            return;
        }
        frameId = requestAnimationFrame(function() {
            frameId = null;
            fn.apply(void 0, lastArgs);
        });
    };
    return wrapperFn;
};
exports.schd = schd;
function replaceAt(values, index, value) {
    var ret = values.slice(0);
    ret[index] = value;
    return ret;
}
exports.replaceAt = replaceAt;
function getTrackBackground(_a) {
    var values = _a.values, colors = _a.colors, min = _a.min, max = _a.max, _b = _a.direction, direction = _b === void 0 ? types_1.Direction.Right : _b, _c = _a.rtl, rtl = _c === void 0 ? false : _c;
    if (rtl && direction === types_1.Direction.Right) {
        direction = types_1.Direction.Left;
    } else if (rtl && types_1.Direction.Left) {
        direction = types_1.Direction.Right;
    }
    // sort values ascending
    var progress = values.slice(0).sort(function(a, b) {
        return a - b;
    }).map(function(value) {
        return (value - min) / (max - min) * 100;
    });
    var middle = progress.reduce(function(acc, point, index) {
        return "".concat(acc, ", ").concat(colors[index], " ").concat(point, "%, ").concat(colors[index + 1], " ").concat(point, "%");
    }, '');
    return "linear-gradient(".concat(direction, ", ").concat(colors[0], " 0%").concat(middle, ", ").concat(colors[colors.length - 1], " 100%)");
}
exports.getTrackBackground = getTrackBackground;
function voidFn() {}
exports.voidFn = voidFn;
function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
}
exports.assertUnreachable = assertUnreachable;
/**
 * Util function for grabbing the true largest width of a thumb
 * including the label
 * @param thumbEl - Thumb element to grab the largest width from
 * @param value - Thumb value, not label value
 * @param separator - Label separator value
 */ var getThumbWidth = function(thumbEl, value, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) {
        valueToLabel = function(value) {
            return value;
        };
    }
    var width = Math.ceil(__spreadArray([
        thumbEl
    ], Array.from(thumbEl.children), true).reduce(function(width, el) {
        var elWidth = Math.ceil(el.getBoundingClientRect().width);
        /**
         * If a label contains a merged label value, it won't return the true
         * label width for that Thumb. Clone the label and change the value
         * to that individual Thumb value in order to grab the true width.
         */ if (el.innerText && el.innerText.includes(separator) && el.childElementCount === 0) {
            var elClone = el.cloneNode(true);
            elClone.innerHTML = valueToLabel(value.toFixed(decimalPlaces));
            elClone.style.visibility = 'hidden';
            document.body.appendChild(elClone);
            elWidth = Math.ceil(elClone.getBoundingClientRect().width);
            document.body.removeChild(elClone);
        }
        return elWidth > width ? elWidth : width;
    }, thumbEl.getBoundingClientRect().width));
    return width;
};
/**
 * Bulk of logic for thumb overlaps
 * Consider a scenario with 5 thumbs;
 * Thumb 1 overlaps with thumb 0 and thumb 2
 * Thumb 2 overlaps with thumb 3
 * We need an array that contains [0, 1, 2, 3]
 * The function needs to return the directly overlapping thumbs
 * and all thumbs overlapping linked to those and so on
 * @param index - Thumb index calculating overlaps for
 * @param offsets - Current Array of Thumb offsets for Range
 * @param thumbs - Array of Thumb elements
 * @param values - Array of Thumb values
 * @param separator - String separator for merged label values
 * @returns overlaps - Array of all overlapping thumbs from the index
 */ var getOverlaps = function(index, offsets, thumbs, values, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) {
        valueToLabel = function(value) {
            return value;
        };
    }
    var overlaps = [];
    /**
     * Recursive function for building the overlaps Array
     * If an overlap is found, find the overlaps for that overlap
     * @param thumbIndex current Thumb index to find overlaps from
     */ var buildOverlaps = function(thumbIndex) {
        var thumbXWidth = getThumbWidth(thumbs[thumbIndex], values[thumbIndex], separator, decimalPlaces, valueToLabel);
        var thumbX = offsets[thumbIndex].x;
        /**
         * Iterate through the Thumb offsets, if there is a match
         * add the thumbIndex and siblingIndex to the overlaps Array
         *
         * Then build overlaps from the overlapping siblingIndex
         */ offsets.forEach(function(_a, siblingIndex) {
            var siblingX = _a.x;
            var siblingWidth = getThumbWidth(thumbs[siblingIndex], values[siblingIndex], separator, decimalPlaces, valueToLabel);
            if (thumbIndex !== siblingIndex && (thumbX >= siblingX && thumbX <= siblingX + siblingWidth || thumbX + thumbXWidth >= siblingX && thumbX + thumbXWidth <= siblingX + siblingWidth)) {
                if (!overlaps.includes(siblingIndex)) {
                    overlaps.push(thumbIndex);
                    overlaps.push(siblingIndex);
                    overlaps = __spreadArray(__spreadArray([], overlaps, true), [
                        thumbIndex,
                        siblingIndex
                    ], false);
                    buildOverlaps(siblingIndex);
                }
            }
        });
    };
    buildOverlaps(index);
    // Sort and remove duplicates from the built overlaps
    return Array.from(new Set(overlaps.sort()));
};
/**
 * A custom React Hook for calculating whether a thumb overlaps
 * another and whether labels could/should merge.
 * @param rangeRef - React ref value of Range component
 * @param values - current Range values Array
 * @param index - thumb index
 * @param step - step value, used to calculate the number of decimal places
 * @param separator - string to separate thumb values
 * @returns label value + styling for thumb label
 */ var useThumbOverlap = function(rangeRef, values, index, step, separator, valueToLabel) {
    if (step === void 0) {
        step = 0.1;
    }
    if (separator === void 0) {
        separator = ' - ';
    }
    if (valueToLabel === void 0) {
        valueToLabel = function(value) {
            return value;
        };
    }
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    // Create initial label style and value. Label value defaults to thumb value
    var _a = (0, react_1.useState)({}), labelStyle = _a[0], setLabelStyle = _a[1];
    var _b = (0, react_1.useState)(valueToLabel(values[index].toFixed(decimalPlaces))), labelValue = _b[0], setLabelValue = _b[1];
    // When the rangeRef or values change, update the Thumb label values and styling
    (0, react_1.useEffect)(function() {
        if (rangeRef) {
            var thumbs = rangeRef.getThumbs();
            if (thumbs.length < 1) return;
            var newStyle = {};
            var offsets_1 = rangeRef.getOffsets();
            /**
             * Get any overlaps for the given Thumb index. This must return all linked
             * Thumbs. So if there are 4 Thumbs and Thumbs 2, 3 and 4 overlap. If we are
             * getting the overlaps for Thumb 1 and it overlaps only Thumb 2, we must get
             * 2, 3 and 4 also.
             */ var overlaps = getOverlaps(index, offsets_1, thumbs, values, separator, decimalPlaces, valueToLabel);
            // Set a default label value of the Thumb value
            var labelValue_1 = valueToLabel(values[index].toFixed(decimalPlaces));
            /**
             * If there are overlaps for the Thumb, we need to calculate the correct
             * Label value along with the relevant styling. We only want to show a Label
             * for the left most Thumb in an overlapping set.
             * All other Thumbs will be set to display: none.
             */ if (overlaps.length) {
                /**
                 * Get an Array of the offsets for the overlapping Thumbs
                 * This is so we can determine if the Thumb we are looking at
                 * is the left most thumb in an overlapping set
                 */ var offsetsX = overlaps.reduce(function(a, c, i, s) {
                    return a.length ? __spreadArray(__spreadArray([], a, true), [
                        offsets_1[s[i]].x
                    ], false) : [
                        offsets_1[s[i]].x
                    ];
                }, []);
                /**
                 * If our Thumb is the left most Thumb, we can build a Label value
                 * and set the style for that Label
                 */ if (Math.min.apply(Math, offsetsX) === offsets_1[index].x) {
                    /**
                     * First calculate the Label value. To do this,
                     * grab all the values for the Thumbs in our overlaps.
                     * Then convert that to a Set and sort it whilst removing duplicates.
                     */ var labelValues_1 = [];
                    overlaps.forEach(function(thumb) {
                        labelValues_1.push(values[thumb].toFixed(decimalPlaces));
                    });
                    /**
                     *  Update the labelValue with the resulting Array
                     *  joined by our defined separator
                     */ labelValue_1 = Array.from(new Set(labelValues_1.sort(function(a, b) {
                        return parseFloat(a) - parseFloat(b);
                    }))).map(valueToLabel).join(separator);
                    /**
                     * Lastly, build the label styling. The label styling will
                     * position the label and apply a transform so that it's centered.
                     * We want the center point between the left edge of the left most Thumb
                     * and the right edge of the right most Thumb.
                     */ var first = Math.min.apply(Math, offsetsX);
                    var last = Math.max.apply(Math, offsetsX);
                    var lastWidth = thumbs[overlaps[offsetsX.indexOf(last)]].getBoundingClientRect().width;
                    newStyle.left = "".concat(Math.abs(first - (last + lastWidth)) / 2, "px");
                    newStyle.transform = 'translate(-50%, 0)';
                } else {
                    // If the Thumb isn't the left most Thumb, hide the Label!
                    newStyle.visibility = 'hidden';
                }
            }
            // Update the label value and style
            setLabelValue(labelValue_1);
            setLabelStyle(newStyle);
        }
    }, [
        rangeRef,
        values
    ]);
    return [
        labelValue,
        labelStyle
    ];
};
exports.useThumbOverlap = useThumbOverlap;
/**
 * Util function for calculating the distance of the center of a thumb
 * form a given mouse/touch target's position
 * @param thumbEl - Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */ function getThumbDistance(thumbEl, clientX, clientY, direction) {
    var _a = thumbEl.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
    return isVertical(direction) ? Math.abs(clientY - (top + height / 2)) : Math.abs(clientX - (left + width / 2));
}
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/Range.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __extends = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = __importStar(__turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
var utils_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/utils.js [app-client] (ecmascript)");
var types_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/types.js [app-client] (ecmascript)");
var INCREASE_KEYS = [
    'ArrowRight',
    'ArrowUp',
    'k',
    'PageUp'
];
var DECREASE_KEYS = [
    'ArrowLeft',
    'ArrowDown',
    'j',
    'PageDown'
];
var Range = function(_super) {
    __extends(Range, _super);
    function Range(props) {
        var _this = _super.call(this, props) || this;
        _this.trackRef = React.createRef();
        _this.thumbRefs = [];
        _this.state = {
            draggedTrackPos: [
                -1,
                -1
            ],
            draggedThumbIndex: -1,
            thumbZIndexes: new Array(_this.props.values.length).fill(0).map(function(t, i) {
                return i;
            }),
            isChanged: false,
            markOffsets: []
        };
        _this.getOffsets = function() {
            var _a = _this.props, direction = _a.direction, values = _a.values, min = _a.min, max = _a.max;
            var trackElement = _this.trackRef.current;
            var trackRect = trackElement.getBoundingClientRect();
            var trackPadding = (0, utils_1.getPaddingAndBorder)(trackElement);
            return _this.getThumbs().map(function(thumb, index) {
                var thumbOffsets = {
                    x: 0,
                    y: 0
                };
                var thumbRect = thumb.getBoundingClientRect();
                var thumbMargins = (0, utils_1.getMargin)(thumb);
                switch(direction){
                    case types_1.Direction.Right:
                        thumbOffsets.x = (thumbMargins.left + trackPadding.left) * -1;
                        thumbOffsets.y = ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x += trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Left:
                        thumbOffsets.x = (thumbMargins.right + trackPadding.right) * -1;
                        thumbOffsets.y = ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x += trackRect.width - trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Up:
                        thumbOffsets.x = ((thumbRect.width - trackRect.width) / 2 + thumbMargins.left + trackPadding.left) * -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y += trackRect.height - trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.height / 2;
                        return thumbOffsets;
                    case types_1.Direction.Down:
                        thumbOffsets.x = ((thumbRect.width - trackRect.width) / 2 + thumbMargins.left + trackPadding.left) * -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y += trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.height / 2;
                        return thumbOffsets;
                    default:
                        return (0, utils_1.assertUnreachable)(direction);
                }
            });
        };
        _this.getThumbs = function() {
            if (_this.trackRef && _this.trackRef.current) {
                return Array.from(_this.trackRef.current.children).filter(function(el) {
                    return el.hasAttribute('aria-valuenow');
                });
            }
            console.warn('No thumbs found in the track container. Did you forget to pass & spread the `props` param in renderTrack?');
            return [];
        };
        _this.getTargetIndex = function(e) {
            return _this.getThumbs().findIndex(function(child) {
                return child === e.target || child.contains(e.target);
            });
        };
        _this.addTouchEvents = function(e) {
            document.addEventListener('touchmove', _this.schdOnTouchMove, {
                passive: false
            });
            document.addEventListener('touchend', _this.schdOnEnd, {
                passive: false
            });
            document.addEventListener('touchcancel', _this.schdOnEnd, {
                passive: false
            });
        };
        _this.addMouseEvents = function(e) {
            document.addEventListener('mousemove', _this.schdOnMouseMove);
            document.addEventListener('mouseup', _this.schdOnEnd);
        };
        _this.onMouseDownTrack = function(e) {
            var _a;
            if (e.button !== 0) return;
            e.persist();
            e.preventDefault();
            _this.addMouseEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function(thumbRef) {
                    var _a;
                    return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target);
                })) return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [
                        e.clientX,
                        e.clientY
                    ]
                }, function() {
                    return _this.onMove(e.clientX, e.clientY);
                });
            } else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function(t) {
                    return t.current;
                }), e.clientX, e.clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex
                }, function() {
                    return _this.onMove(e.clientX, e.clientY);
                });
            }
        };
        _this.onResize = function() {
            (0, utils_1.translateThumbs)(_this.getThumbs(), _this.getOffsets(), _this.props.rtl);
            _this.calculateMarkOffsets();
        };
        _this.onTouchStartTrack = function(e) {
            var _a;
            e.persist();
            _this.addTouchEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function(thumbRef) {
                    var _a;
                    return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target);
                })) return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [
                        e.touches[0].clientX,
                        e.touches[0].clientY
                    ]
                }, function() {
                    return _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
                });
            } else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function(t) {
                    return t.current;
                }), e.touches[0].clientX, e.touches[0].clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex
                }, function() {
                    return _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
                });
            }
        };
        _this.onMouseOrTouchStart = function(e) {
            if (_this.props.disabled) return;
            var isTouch = (0, utils_1.isTouchEvent)(e);
            if (!isTouch && e.button !== 0) return;
            var index = _this.getTargetIndex(e);
            if (index === -1) return;
            if (isTouch) {
                _this.addTouchEvents(e);
            } else {
                _this.addMouseEvents(e);
            }
            _this.setState({
                draggedThumbIndex: index,
                thumbZIndexes: _this.state.thumbZIndexes.map(function(t, i) {
                    if (i === index) {
                        return Math.max.apply(Math, _this.state.thumbZIndexes);
                    }
                    return t <= _this.state.thumbZIndexes[index] ? t : t - 1;
                })
            });
        };
        _this.onMouseMove = function(e) {
            e.preventDefault();
            _this.onMove(e.clientX, e.clientY);
        };
        _this.onTouchMove = function(e) {
            e.preventDefault();
            _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        _this.onKeyDown = function(e) {
            var _a = _this.props, values = _a.values, onChange = _a.onChange, step = _a.step, rtl = _a.rtl, direction = _a.direction;
            var isChanged = _this.state.isChanged;
            var index = _this.getTargetIndex(e.nativeEvent);
            var inverter = rtl || direction === types_1.Direction.Left || direction === types_1.Direction.Down ? -1 : 1;
            if (index === -1) return;
            if (INCREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true
                });
                onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] + inverter * (e.key === 'PageUp' ? step * 10 : step), index)));
            } else if (DECREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true
                });
                onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] - inverter * (e.key === 'PageDown' ? step * 10 : step), index)));
            } else if (e.key === 'Tab') {
                _this.setState({
                    draggedThumbIndex: -1
                }, function() {
                    // If key pressed when thumb was moving, fire onFinalChange
                    if (isChanged) {
                        _this.fireOnFinalChange();
                    }
                });
            } else {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            }
        };
        _this.onKeyUp = function(e) {
            var isChanged = _this.state.isChanged;
            _this.setState({
                draggedThumbIndex: -1
            }, function() {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            });
        };
        _this.onMove = function(clientX, clientY) {
            var _a = _this.state, draggedThumbIndex = _a.draggedThumbIndex, draggedTrackPos = _a.draggedTrackPos;
            var _b = _this.props, direction = _b.direction, min = _b.min, max = _b.max, onChange = _b.onChange, values = _b.values, step = _b.step, rtl = _b.rtl;
            if (draggedThumbIndex === -1 && draggedTrackPos[0] === -1 && draggedTrackPos[1] === -1) return null;
            var trackElement = _this.trackRef.current;
            // If component was closed down prematurely, A last onMove could be triggered based on requestAnimationFrame()
            if (!trackElement) return null;
            var trackRect = trackElement.getBoundingClientRect();
            var trackLength = (0, utils_1.isVertical)(direction) ? trackRect.height : trackRect.width;
            if (draggedTrackPos[0] !== -1 && draggedTrackPos[1] !== -1) {
                // calculate how much it moved since the last update
                var dX = clientX - draggedTrackPos[0];
                var dY = clientY - draggedTrackPos[1];
                // calculate the delta of the value
                var deltaValue = 0;
                switch(direction){
                    case types_1.Direction.Right:
                    case types_1.Direction.Left:
                        deltaValue = dX / trackLength * (max - min);
                        break;
                    case types_1.Direction.Down:
                    case types_1.Direction.Up:
                        deltaValue = dY / trackLength * (max - min);
                        break;
                    default:
                        (0, utils_1.assertUnreachable)(direction);
                }
                // invert for RTL
                if (rtl) {
                    deltaValue *= -1;
                }
                if (Math.abs(deltaValue) >= step / 2) {
                    // adjust delta so it fits into the range
                    for(var i = 0; i < _this.thumbRefs.length; i++){
                        if (values[i] === max && Math.sign(deltaValue) === 1 || values[i] === min && Math.sign(deltaValue) === -1) return;
                        var thumbValue = values[i] + deltaValue;
                        if (thumbValue > max) deltaValue = max - values[i];
                        else if (thumbValue < min) deltaValue = min - values[i];
                    }
                    // add the delta to each thumb
                    var newValues = values.slice(0);
                    for(var i = 0; i < _this.thumbRefs.length; i++){
                        newValues = (0, utils_1.replaceAt)(newValues, i, _this.normalizeValue(values[i] + deltaValue, i));
                    }
                    _this.setState({
                        draggedTrackPos: [
                            clientX,
                            clientY
                        ]
                    });
                    onChange(newValues);
                }
            } else {
                var newValue = 0;
                switch(direction){
                    case types_1.Direction.Right:
                        newValue = (clientX - trackRect.left) / trackLength * (max - min) + min;
                        break;
                    case types_1.Direction.Left:
                        newValue = (trackLength - (clientX - trackRect.left)) / trackLength * (max - min) + min;
                        break;
                    case types_1.Direction.Down:
                        newValue = (clientY - trackRect.top) / trackLength * (max - min) + min;
                        break;
                    case types_1.Direction.Up:
                        newValue = (trackLength - (clientY - trackRect.top)) / trackLength * (max - min) + min;
                        break;
                    default:
                        (0, utils_1.assertUnreachable)(direction);
                }
                // invert for RTL
                if (rtl) {
                    newValue = max + min - newValue;
                }
                if (Math.abs(values[draggedThumbIndex] - newValue) >= step / 2) {
                    onChange((0, utils_1.replaceAt)(values, draggedThumbIndex, _this.normalizeValue(newValue, draggedThumbIndex)));
                }
            }
        };
        _this.normalizeValue = function(value, index) {
            var _a = _this.props, min = _a.min, max = _a.max, step = _a.step, allowOverlap = _a.allowOverlap, values = _a.values;
            return (0, utils_1.normalizeValue)(value, index, min, max, step, allowOverlap, values);
        };
        _this.onEnd = function(e) {
            e.preventDefault();
            document.removeEventListener('mousemove', _this.schdOnMouseMove);
            document.removeEventListener('touchmove', _this.schdOnTouchMove);
            document.removeEventListener('mouseup', _this.schdOnEnd);
            document.removeEventListener('touchend', _this.schdOnEnd);
            document.removeEventListener('touchcancel', _this.schdOnEnd);
            if (_this.state.draggedThumbIndex === -1 && _this.state.draggedTrackPos[0] === -1 && _this.state.draggedTrackPos[1] === -1) return null;
            _this.setState({
                draggedThumbIndex: -1,
                draggedTrackPos: [
                    -1,
                    -1
                ]
            }, function() {
                _this.fireOnFinalChange();
            });
        };
        _this.fireOnFinalChange = function() {
            _this.setState({
                isChanged: false
            });
            var _a = _this.props, onFinalChange = _a.onFinalChange, values = _a.values;
            if (onFinalChange) {
                onFinalChange(values);
            }
        };
        _this.updateMarkRefs = function(props) {
            if (!props.renderMark) {
                _this.numOfMarks = undefined;
                _this.markRefs = undefined;
                return;
            }
            _this.numOfMarks = (props.max - props.min) / _this.props.step;
            _this.markRefs = [];
            for(var i = 0; i < _this.numOfMarks + 1; i++){
                _this.markRefs[i] = React.createRef();
            }
        };
        _this.calculateMarkOffsets = function() {
            if (!_this.props.renderMark || !_this.trackRef || !_this.numOfMarks || !_this.markRefs || _this.trackRef.current === null) return;
            var elStyles = window.getComputedStyle(_this.trackRef.current);
            var trackWidth = parseInt(elStyles.width, 10);
            var trackHeight = parseInt(elStyles.height, 10);
            var paddingLeft = parseInt(elStyles.paddingLeft, 10);
            var paddingTop = parseInt(elStyles.paddingTop, 10);
            var res = [];
            for(var i = 0; i < _this.numOfMarks + 1; i++){
                var markHeight = 9999;
                var markWidth = 9999;
                if (_this.markRefs[i].current) {
                    var markRect = _this.markRefs[i].current.getBoundingClientRect();
                    markHeight = markRect.height;
                    markWidth = markRect.width;
                }
                if (_this.props.direction === types_1.Direction.Left || _this.props.direction === types_1.Direction.Right) {
                    res.push([
                        Math.round(trackWidth / _this.numOfMarks * i + paddingLeft - markWidth / 2),
                        -Math.round((markHeight - trackHeight) / 2)
                    ]);
                } else {
                    res.push([
                        Math.round(trackHeight / _this.numOfMarks * i + paddingTop - markHeight / 2),
                        -Math.round((markWidth - trackWidth) / 2)
                    ]);
                }
            }
            _this.setState({
                markOffsets: res
            });
        };
        if (props.step === 0) {
            throw new Error('"step" property should be a positive number');
        }
        _this.schdOnMouseMove = (0, utils_1.schd)(_this.onMouseMove);
        _this.schdOnTouchMove = (0, utils_1.schd)(_this.onTouchMove);
        _this.schdOnEnd = (0, utils_1.schd)(_this.onEnd);
        _this.thumbRefs = props.values.map(function() {
            return React.createRef();
        });
        _this.updateMarkRefs(props);
        return _this;
    }
    Range.prototype.componentDidMount = function() {
        var _this = this;
        var _a = this.props, values = _a.values, min = _a.min, step = _a.step;
        this.resizeObserver = window.ResizeObserver ? new window.ResizeObserver(this.onResize) : {
            observe: function() {
                return window.addEventListener('resize', _this.onResize);
            },
            unobserve: function() {
                return window.removeEventListener('resize', _this.onResize);
            }
        };
        document.addEventListener('touchstart', this.onMouseOrTouchStart, {
            passive: false
        });
        document.addEventListener('mousedown', this.onMouseOrTouchStart, {
            passive: false
        });
        !this.props.allowOverlap && (0, utils_1.checkInitialOverlap)(this.props.values);
        this.props.values.forEach(function(value) {
            return (0, utils_1.checkBoundaries)(value, _this.props.min, _this.props.max);
        });
        this.resizeObserver.observe(this.trackRef.current);
        (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), this.props.rtl);
        this.calculateMarkOffsets();
        values.forEach(function(value) {
            if (!(0, utils_1.isStepDivisible)(min, value, step)) {
                console.warn('The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.');
            }
        });
    };
    Range.prototype.componentDidUpdate = function(prevProps, prevState) {
        var _a = this.props, max = _a.max, min = _a.min, step = _a.step, values = _a.values, rtl = _a.rtl;
        if (prevProps.max !== max || prevProps.min !== min || prevProps.step !== step) {
            this.updateMarkRefs(this.props);
        }
        (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), rtl);
        // ensure offsets are calculated when the refs for the marks have been created
        // and those refs have been mounted to the dom
        // on the state update in calculateOffsets with new markOffsets are calculated
        if (prevProps.max !== max || prevProps.min !== min || prevProps.step !== step || prevState.markOffsets.length !== this.state.markOffsets.length) {
            this.calculateMarkOffsets();
            values.forEach(function(value) {
                if (!(0, utils_1.isStepDivisible)(min, value, step)) {
                    console.warn('The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.');
                }
            });
        }
    };
    Range.prototype.componentWillUnmount = function() {
        var options = {
            passive: false
        };
        document.removeEventListener('mousedown', this.onMouseOrTouchStart, options);
        // These need to be removed!!
        document.removeEventListener('mousemove', this.schdOnMouseMove);
        document.removeEventListener('touchmove', this.schdOnTouchMove);
        document.removeEventListener('touchstart', this.onMouseOrTouchStart);
        document.removeEventListener('mouseup', this.schdOnEnd);
        document.removeEventListener('touchend', this.schdOnEnd);
        this.resizeObserver.unobserve(this.trackRef.current);
    };
    Range.prototype.render = function() {
        var _this = this;
        var _a = this.props, renderTrack = _a.renderTrack, renderThumb = _a.renderThumb, _b = _a.renderMark, renderMark = _b === void 0 ? function() {
            return null;
        } : _b, values = _a.values, min = _a.min, max = _a.max, allowOverlap = _a.allowOverlap, disabled = _a.disabled;
        var _c = this.state, draggedThumbIndex = _c.draggedThumbIndex, thumbZIndexes = _c.thumbZIndexes, markOffsets = _c.markOffsets;
        return renderTrack({
            props: {
                style: {
                    // creates stacking context that prevents z-index applied to thumbs
                    // interfere with other elements
                    transform: 'scale(1)',
                    cursor: draggedThumbIndex > -1 ? 'grabbing' : this.props.draggableTrack ? (0, utils_1.isVertical)(this.props.direction) ? 'ns-resize' : 'ew-resize' : values.length === 1 && !disabled ? 'pointer' : 'inherit'
                },
                onMouseDown: disabled ? utils_1.voidFn : this.onMouseDownTrack,
                onTouchStart: disabled ? utils_1.voidFn : this.onTouchStartTrack,
                ref: this.trackRef
            },
            isDragged: this.state.draggedThumbIndex > -1,
            disabled: disabled,
            children: __spreadArray(__spreadArray([], markOffsets.map(function(offset, index, arr) {
                return renderMark({
                    props: {
                        style: _this.props.direction === types_1.Direction.Left || _this.props.direction === types_1.Direction.Right ? {
                            position: 'absolute',
                            left: "".concat(offset[0], "px"),
                            marginTop: "".concat(offset[1], "px")
                        } : {
                            position: 'absolute',
                            top: "".concat(offset[0], "px"),
                            marginLeft: "".concat(offset[1], "px")
                        },
                        key: "mark".concat(index),
                        ref: _this.markRefs[index]
                    },
                    index: index
                });
            }), true), values.map(function(value, index) {
                var isDragged = _this.state.draggedThumbIndex === index;
                return renderThumb({
                    index: index,
                    value: value,
                    isDragged: isDragged,
                    props: {
                        style: {
                            position: 'absolute',
                            zIndex: thumbZIndexes[index],
                            cursor: disabled ? 'inherit' : isDragged ? 'grabbing' : 'grab',
                            userSelect: 'none',
                            touchAction: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        },
                        key: index,
                        tabIndex: disabled ? undefined : 0,
                        'aria-valuemax': allowOverlap ? max : values[index + 1] || max,
                        'aria-valuemin': allowOverlap ? min : values[index - 1] || min,
                        'aria-valuenow': value,
                        draggable: false,
                        ref: _this.thumbRefs[index],
                        role: 'slider',
                        onKeyDown: disabled ? utils_1.voidFn : _this.onKeyDown,
                        onKeyUp: disabled ? utils_1.voidFn : _this.onKeyUp
                    }
                });
            }), true)
        });
    };
    Range.defaultProps = {
        step: 1,
        direction: types_1.Direction.Right,
        rtl: false,
        disabled: false,
        allowOverlap: false,
        draggableTrack: false,
        min: 0,
        max: 100
    };
    return Range;
}(React.Component);
exports.default = Range;
}),
"[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkValuesAgainstBoundaries = exports.relativeValue = exports.useThumbOverlap = exports.Direction = exports.getTrackBackground = exports.Range = void 0;
var Range_1 = __importDefault(__turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/Range.js [app-client] (ecmascript)"));
exports.Range = Range_1.default;
var utils_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/utils.js [app-client] (ecmascript)");
Object.defineProperty(exports, "getTrackBackground", {
    enumerable: true,
    get: function() {
        return utils_1.getTrackBackground;
    }
});
Object.defineProperty(exports, "useThumbOverlap", {
    enumerable: true,
    get: function() {
        return utils_1.useThumbOverlap;
    }
});
Object.defineProperty(exports, "relativeValue", {
    enumerable: true,
    get: function() {
        return utils_1.relativeValue;
    }
});
Object.defineProperty(exports, "checkValuesAgainstBoundaries", {
    enumerable: true,
    get: function() {
        return utils_1.checkValuesAgainstBoundaries;
    }
});
var types_1 = __turbopack_context__.r("[project]/Desktop/dharwin_boilerplate/node_modules/react-range/lib/types.js [app-client] (ecmascript)");
Object.defineProperty(exports, "Direction", {
    enumerable: true,
    get: function() {
        return types_1.Direction;
    }
});
}),
]);

//# sourceMappingURL=39735_6753b3cf._.js.map