(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-table/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Mock data for interviews
const INTERVIEWS_DATA = [
    {
        id: '1',
        position: 'Senior Software Engineer',
        date: '2024-01-15',
        time: '10:00 AM',
        type: 'Video',
        candidate: {
            id: '1',
            name: 'John Anderson',
            displayPicture: '/assets/images/faces/1.jpg',
            email: 'john.anderson@example.com',
            phone: '+1 (555) 123-4567'
        },
        recruiter: {
            id: '1',
            name: 'John Anderson',
            displayPicture: '/assets/images/faces/1.jpg',
            email: 'john.anderson@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '2',
        position: 'Product Manager',
        date: '2024-01-16',
        time: '2:00 PM',
        type: 'In-Person',
        candidate: {
            id: '2',
            name: 'Sarah Johnson',
            displayPicture: '/assets/images/faces/2.jpg',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 234-5678'
        },
        recruiter: {
            id: '2',
            name: 'Sarah Johnson',
            displayPicture: '/assets/images/faces/2.jpg',
            email: 'sarah.johnson@example.com'
        },
        status: 'Completed'
    },
    {
        id: '3',
        position: 'Frontend Developer',
        date: '2024-01-17',
        time: '11:30 AM',
        type: 'Phone',
        candidate: {
            id: '3',
            name: 'Michael Chen',
            displayPicture: '/assets/images/faces/3.jpg',
            email: 'michael.chen@example.com',
            phone: '+1 (555) 345-6789'
        },
        recruiter: {
            id: '4',
            name: 'Emily Davis',
            displayPicture: '/assets/images/faces/4.jpg',
            email: 'emily.davis@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '4',
        position: 'Data Scientist',
        date: '2024-01-18',
        time: '3:00 PM',
        type: 'Video',
        candidate: {
            id: '4',
            name: 'Emily Davis',
            displayPicture: '/assets/images/faces/4.jpg',
            email: 'emily.davis@example.com',
            phone: '+1 (555) 456-7890'
        },
        recruiter: {
            id: '4',
            name: 'Emily Davis',
            displayPicture: '/assets/images/faces/4.jpg',
            email: 'emily.davis@example.com'
        },
        status: 'Rescheduled'
    },
    {
        id: '5',
        position: 'DevOps Engineer',
        date: '2024-01-19',
        time: '9:00 AM',
        type: 'In-Person',
        candidate: {
            id: '5',
            name: 'David Brown',
            displayPicture: '/assets/images/faces/5.jpg',
            email: 'david.brown@example.com',
            phone: '+1 (555) 567-8901'
        },
        recruiter: {
            id: '5',
            name: 'David Brown',
            displayPicture: '/assets/images/faces/5.jpg',
            email: 'david.brown@example.com'
        },
        status: 'Cancelled'
    },
    {
        id: '6',
        position: 'UX Designer',
        date: '2024-01-20',
        time: '1:00 PM',
        type: 'Video',
        candidate: {
            id: '6',
            name: 'Lisa Anderson',
            displayPicture: '/assets/images/faces/6.jpg',
            email: 'lisa.anderson@example.com',
            phone: '+1 (555) 678-9012'
        },
        recruiter: {
            id: '6',
            name: 'Lisa Anderson',
            displayPicture: '/assets/images/faces/6.jpg',
            email: 'lisa.anderson@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '7',
        position: 'Backend Developer',
        date: '2024-01-21',
        time: '10:30 AM',
        type: 'Phone',
        candidate: {
            id: '7',
            name: 'Robert Wilson',
            displayPicture: '/assets/images/faces/7.jpg',
            email: 'robert.wilson@example.com',
            phone: '+1 (555) 789-0123'
        },
        recruiter: {
            id: '7',
            name: 'Robert Wilson',
            displayPicture: '/assets/images/faces/7.jpg',
            email: 'robert.wilson@example.com'
        },
        status: 'Completed'
    },
    {
        id: '8',
        position: 'Digital Marketing Manager',
        date: '2024-01-22',
        time: '4:00 PM',
        type: 'Video',
        candidate: {
            id: '8',
            name: 'Jessica Martinez',
            displayPicture: '/assets/images/faces/8.jpg',
            email: 'jessica.martinez@example.com',
            phone: '+1 (555) 890-1234'
        },
        recruiter: {
            id: '8',
            name: 'Jessica Martinez',
            displayPicture: '/assets/images/faces/8.jpg',
            email: 'jessica.martinez@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '9',
        position: 'Sales Executive',
        date: '2024-01-23',
        time: '2:30 PM',
        type: 'In-Person',
        candidate: {
            id: '9',
            name: 'Thomas Lee',
            displayPicture: '/assets/images/faces/9.jpg',
            email: 'thomas.lee@example.com',
            phone: '+1 (555) 901-2345'
        },
        recruiter: {
            id: '9',
            name: 'Thomas Lee',
            displayPicture: '/assets/images/faces/9.jpg',
            email: 'thomas.lee@example.com'
        },
        status: 'Rescheduled'
    },
    {
        id: '10',
        position: 'QA Engineer',
        date: '2024-01-24',
        time: '11:00 AM',
        type: 'Video',
        candidate: {
            id: '10',
            name: 'Jennifer White',
            displayPicture: '/assets/images/faces/10.jpg',
            email: 'jennifer.white@example.com',
            phone: '+1 (555) 012-3456'
        },
        recruiter: {
            id: '10',
            name: 'Jennifer White',
            displayPicture: '/assets/images/faces/10.jpg',
            email: 'jennifer.white@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '11',
        position: 'Full-Stack Developer',
        date: '2024-01-25',
        time: '3:30 PM',
        type: 'Phone',
        candidate: {
            id: '11',
            name: 'Christopher Taylor',
            displayPicture: '/assets/images/faces/11.jpg',
            email: 'christopher.taylor@example.com',
            phone: '+1 (555) 123-4568'
        },
        recruiter: {
            id: '11',
            name: 'Christopher Taylor',
            displayPicture: '/assets/images/faces/11.jpg',
            email: 'christopher.taylor@example.com'
        },
        status: 'Completed'
    },
    {
        id: '12',
        position: 'Business Analyst',
        date: '2024-01-26',
        time: '10:00 AM',
        type: 'Video',
        candidate: {
            id: '12',
            name: 'Amanda Garcia',
            displayPicture: '/assets/images/faces/12.jpg',
            email: 'amanda.garcia@example.com',
            phone: '+1 (555) 234-5679'
        },
        recruiter: {
            id: '12',
            name: 'Amanda Garcia',
            displayPicture: '/assets/images/faces/12.jpg',
            email: 'amanda.garcia@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '13',
        position: 'Cloud Architect',
        date: '2024-01-27',
        time: '1:30 PM',
        type: 'In-Person',
        candidate: {
            id: '13',
            name: 'Daniel Rodriguez',
            displayPicture: '/assets/images/faces/13.jpg',
            email: 'daniel.rodriguez@example.com',
            phone: '+1 (555) 345-6790'
        },
        recruiter: {
            id: '13',
            name: 'Daniel Rodriguez',
            displayPicture: '/assets/images/faces/13.jpg',
            email: 'daniel.rodriguez@example.com'
        },
        status: 'Cancelled'
    },
    {
        id: '14',
        position: 'Mobile App Developer',
        date: '2024-01-28',
        time: '9:30 AM',
        type: 'Video',
        candidate: {
            id: '14',
            name: 'Rachel Kim',
            displayPicture: '/assets/images/faces/14.jpg',
            email: 'rachel.kim@example.com',
            phone: '+1 (555) 456-7901'
        },
        recruiter: {
            id: '14',
            name: 'Rachel Kim',
            displayPicture: '/assets/images/faces/14.jpg',
            email: 'rachel.kim@example.com'
        },
        status: 'Scheduled'
    },
    {
        id: '15',
        position: 'Network Administrator',
        date: '2024-01-29',
        time: '2:00 PM',
        type: 'Phone',
        candidate: {
            id: '15',
            name: 'Kevin Harris',
            displayPicture: '/assets/images/faces/15.jpg',
            email: 'kevin.harris@example.com',
            phone: '+1 (555) 567-9012'
        },
        recruiter: {
            id: '15',
            name: 'Kevin Harris',
            displayPicture: '/assets/images/faces/15.jpg',
            email: 'kevin.harris@example.com'
        },
        status: 'Completed'
    }
];
const Interviews = ()=>{
    _s();
    const [selectedRows, setSelectedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [selectedSort, setSelectedSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        candidate: [],
        recruiter: [],
        status: [],
        type: []
    });
    // Search states for filter dropdowns
    const [searchCandidate, setSearchCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchRecruiter, setSearchRecruiter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchStatus, setSearchStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchType, setSearchType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Handle individual row checkbox
    const handleRowSelect = (id)=>{
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };
    // Define columns
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[columns]": ()=>[
                {
                    Header: 'All',
                    accessor: 'checkbox',
                    disableSortBy: true,
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "form-check-input",
                                type: "checkbox",
                                checked: selectedRows.has(row.original.id),
                                onChange: {
                                    "Interviews.useMemo[columns]": ()=>handleRowSelect(row.original.id)
                                }["Interviews.useMemo[columns]"],
                                "aria-label": `Select interview ${row.original.id}`
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["Interviews.useMemo[columns]"]
                },
                {
                    Header: 'Interview Info',
                    accessor: 'interviewInfo',
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>{
                            const interview = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-gray-800 dark:text-white",
                                        children: interview.position
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-calendar-line text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    new Date(interview.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-time-line text-info"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    interview.time
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-vidicon-line text-success"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 400,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            interview.type
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Interviews.useMemo[columns]"]
                },
                {
                    Header: 'Candidate',
                    accessor: 'candidate',
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>{
                            const candidate = row.original.candidate;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: candidate.displayPicture || '/assets/images/faces/1.jpg',
                                            alt: candidate.name,
                                            className: "w-10 h-10 rounded-full object-cover",
                                            onError: {
                                                "Interviews.useMemo[columns]": (e)=>{
                                                    e.target.src = '/assets/images/faces/1.jpg';
                                                }
                                            }["Interviews.useMemo[columns]"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-gray-800 dark:text-white truncate",
                                                children: candidate.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 dark:text-gray-400 truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-mail-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            candidate.email
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 429,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-phone-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 434,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            candidate.phone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Interviews.useMemo[columns]"]
                },
                {
                    Header: 'Recruiter',
                    accessor: 'recruiter',
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original.recruiter;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: recruiter.displayPicture || '/assets/images/faces/1.jpg',
                                            alt: recruiter.name,
                                            className: "w-10 h-10 rounded-full object-cover",
                                            onError: {
                                                "Interviews.useMemo[columns]": (e)=>{
                                                    e.target.src = '/assets/images/faces/1.jpg';
                                                }
                                            }["Interviews.useMemo[columns]"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-gray-800 dark:text-white truncate",
                                                children: recruiter.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 461,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 dark:text-gray-400 truncate",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-mail-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 466,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        recruiter.email
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Interviews.useMemo[columns]"]
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>{
                            const interview = row.original;
                            const statusColors = {
                                'Scheduled': 'bg-primary/10 text-primary border-primary/30',
                                'Completed': 'bg-success/10 text-success border-success/30',
                                'Cancelled': 'bg-danger/10 text-danger border-danger/30',
                                'Rescheduled': 'bg-warning/10 text-warning border-warning/30'
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `badge ${statusColors[interview.status] || 'bg-gray/10 text-gray border-gray/30'} border px-2 py-1 rounded-md text-xs font-medium`,
                                    children: interview.status
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Interviews.useMemo[columns]"]
                },
                {
                    Header: 'Actions',
                    accessor: 'id',
                    disableSortBy: true,
                    Cell: {
                        "Interviews.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-info",
                                            title: "Edit Interview",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-pencil-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Edit Interview"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 502,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-warning",
                                            title: "Reschedule",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-calendar-event-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Reschedule"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 516,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-danger",
                                            title: "Cancel Interview",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-close-circle-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Cancel Interview"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 530,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["Interviews.useMemo[columns]"]
                }
            ]
    }["Interviews.useMemo[columns]"], [
        selectedRows
    ]);
    // Filter data based on filter state
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[filteredData]": ()=>{
            return INTERVIEWS_DATA.filter({
                "Interviews.useMemo[filteredData]": (interview)=>{
                    // Candidate filter (array)
                    if (filters.candidate.length > 0 && !filters.candidate.some({
                        "Interviews.useMemo[filteredData]": (candidateName)=>interview.candidate.name.toLowerCase().includes(candidateName.toLowerCase())
                    }["Interviews.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Recruiter filter (array)
                    if (filters.recruiter.length > 0 && !filters.recruiter.some({
                        "Interviews.useMemo[filteredData]": (recruiterName)=>interview.recruiter.name.toLowerCase().includes(recruiterName.toLowerCase())
                    }["Interviews.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Status filter (array)
                    if (filters.status.length > 0 && !filters.status.includes(interview.status)) {
                        return false;
                    }
                    // Type filter (array)
                    if (filters.type.length > 0 && !filters.type.includes(interview.type)) {
                        return false;
                    }
                    return true;
                }
            }["Interviews.useMemo[filteredData]"]);
        }
    }["Interviews.useMemo[filteredData]"], [
        filters
    ]);
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[data]": ()=>filteredData
    }["Interviews.useMemo[data]"], [
        filteredData
    ]);
    // Get unique values for dropdown filters
    const allCandidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[allCandidates]": ()=>{
            return [
                ...new Set(INTERVIEWS_DATA.map({
                    "Interviews.useMemo[allCandidates]": (interview)=>interview.candidate.name
                }["Interviews.useMemo[allCandidates]"]))
            ].sort();
        }
    }["Interviews.useMemo[allCandidates]"], []);
    const allRecruiters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[allRecruiters]": ()=>{
            return [
                ...new Set(INTERVIEWS_DATA.map({
                    "Interviews.useMemo[allRecruiters]": (interview)=>interview.recruiter.name
                }["Interviews.useMemo[allRecruiters]"]))
            ].sort();
        }
    }["Interviews.useMemo[allRecruiters]"], []);
    const allStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[allStatuses]": ()=>{
            return [
                ...new Set(INTERVIEWS_DATA.map({
                    "Interviews.useMemo[allStatuses]": (interview)=>interview.status
                }["Interviews.useMemo[allStatuses]"]))
            ].sort();
        }
    }["Interviews.useMemo[allStatuses]"], []);
    const allTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[allTypes]": ()=>{
            return [
                ...new Set(INTERVIEWS_DATA.map({
                    "Interviews.useMemo[allTypes]": (interview)=>interview.type
                }["Interviews.useMemo[allTypes]"]))
            ].sort();
        }
    }["Interviews.useMemo[allTypes]"], []);
    // Filter options based on search terms
    const filteredCandidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[filteredCandidates]": ()=>{
            if (!searchCandidate) return allCandidates;
            return allCandidates.filter({
                "Interviews.useMemo[filteredCandidates]": (candidate)=>candidate.toLowerCase().includes(searchCandidate.toLowerCase())
            }["Interviews.useMemo[filteredCandidates]"]);
        }
    }["Interviews.useMemo[filteredCandidates]"], [
        allCandidates,
        searchCandidate
    ]);
    const filteredRecruiters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[filteredRecruiters]": ()=>{
            if (!searchRecruiter) return allRecruiters;
            return allRecruiters.filter({
                "Interviews.useMemo[filteredRecruiters]": (recruiter)=>recruiter.toLowerCase().includes(searchRecruiter.toLowerCase())
            }["Interviews.useMemo[filteredRecruiters]"]);
        }
    }["Interviews.useMemo[filteredRecruiters]"], [
        allRecruiters,
        searchRecruiter
    ]);
    const filteredStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[filteredStatuses]": ()=>{
            if (!searchStatus) return allStatuses;
            return allStatuses.filter({
                "Interviews.useMemo[filteredStatuses]": (status)=>status.toLowerCase().includes(searchStatus.toLowerCase())
            }["Interviews.useMemo[filteredStatuses]"]);
        }
    }["Interviews.useMemo[filteredStatuses]"], [
        allStatuses,
        searchStatus
    ]);
    const filteredTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interviews.useMemo[filteredTypes]": ()=>{
            if (!searchType) return allTypes;
            return allTypes.filter({
                "Interviews.useMemo[filteredTypes]": (type)=>type.toLowerCase().includes(searchType.toLowerCase())
            }["Interviews.useMemo[filteredTypes]"]);
        }
    }["Interviews.useMemo[filteredTypes]"], [
        allTypes,
        searchType
    ]);
    const handleMultiSelectChange = (key, value)=>{
        setFilters((prev)=>{
            const currentArray = prev[key];
            const newArray = currentArray.includes(value) ? currentArray.filter((item)=>item !== value) : [
                ...currentArray,
                value
            ];
            return {
                ...prev,
                [key]: newArray
            };
        });
    };
    const handleRemoveFilter = (key, value)=>{
        setFilters((prev)=>({
                ...prev,
                [key]: prev[key].filter((item)=>item !== value)
            }));
    };
    const handleResetFilters = ()=>{
        setFilters({
            candidate: [],
            recruiter: [],
            status: [],
            type: []
        });
        setSearchCandidate('');
        setSearchRecruiter('');
        setSearchStatus('');
        setSearchType('');
    };
    const hasActiveFilters = filters.candidate.length > 0 || filters.recruiter.length > 0 || filters.status.length > 0 || filters.type.length > 0;
    const activeFilterCount = filters.candidate.length + filters.recruiter.length + filters.status.length + filters.type.length;
    const tableInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTable"])({
        columns,
        data,
        initialState: {
            pageIndex: 0,
            pageSize: 10
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortBy"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagination"]);
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, state, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, setSortBy } = tableInstance;
    const { pageIndex, pageSize } = state;
    // Handle sort selection
    const handleSortChange = (sortOption)=>{
        setSelectedSort(sortOption);
        switch(sortOption){
            case 'date-asc':
                setSortBy([
                    {
                        id: 'interviewInfo',
                        desc: false
                    }
                ]);
                break;
            case 'date-desc':
                setSortBy([
                    {
                        id: 'interviewInfo',
                        desc: true
                    }
                ]);
                break;
            case 'candidate-asc':
                setSortBy([
                    {
                        id: 'candidate',
                        desc: false
                    }
                ]);
                break;
            case 'candidate-desc':
                setSortBy([
                    {
                        id: 'candidate',
                        desc: true
                    }
                ]);
                break;
            case 'recruiter-asc':
                setSortBy([
                    {
                        id: 'recruiter',
                        desc: false
                    }
                ]);
                break;
            case 'recruiter-desc':
                setSortBy([
                    {
                        id: 'recruiter',
                        desc: true
                    }
                ]);
                break;
            case 'status-asc':
                setSortBy([
                    {
                        id: 'status',
                        desc: false
                    }
                ]);
                break;
            case 'status-desc':
                setSortBy([
                    {
                        id: 'status',
                        desc: true
                    }
                ]);
                break;
            case 'clear-sort':
                setSortBy([]);
                setSelectedSort('');
                break;
            default:
                setSortBy([]);
        }
    };
    // Handle select all checkbox - select ALL rows in filtered dataset
    const handleSelectAll = (e)=>{
        if (e.target.checked) {
            const allIds = new Set(filteredData.map((interview)=>interview.id));
            setSelectedRows(allIds);
        } else {
            setSelectedRows(new Set());
        }
    };
    // Check if all rows in filtered dataset are selected
    const isAllSelected = selectedRows.size === filteredData.length && filteredData.length > 0;
    const isIndeterminate = selectedRows.size > 0 && selectedRows.size < filteredData.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "xl:col-span-12 col-span-12 h-full flex flex-col",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "box custom-box h-full flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "box-header flex items-center justify-between flex-wrap gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "box-title",
                                        children: [
                                            "Interviews",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "badge bg-light text-default rounded-full ms-1 text-[0.75rem] align-middle",
                                                children: filteredData.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 762,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 760,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "form-control !w-auto !py-1 !px-4 !text-[0.75rem] me-2",
                                                value: pageSize,
                                                onChange: (e)=>setPageSize(Number(e.target.value)),
                                                children: [
                                                    10,
                                                    25,
                                                    50,
                                                    100
                                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: size,
                                                        children: [
                                                            "Show ",
                                                            size
                                                        ]
                                                    }, size, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 773,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 767,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hs-dropdown ti-dropdown me-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem] ti-dropdown-toggle",
                                                        id: "sort-dropdown-button",
                                                        "aria-expanded": "false",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-arrow-up-down-line font-semibold align-middle me-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 785,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Sort",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-arrow-down-s-line align-middle ms-1 inline-block"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 786,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "hs-dropdown-menu ti-dropdown-menu hidden",
                                                        "aria-labelledby": "sort-dropdown-button",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'date-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('date-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-calendar-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 795,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Date (Oldest First)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 790,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 789,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'date-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('date-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-calendar-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 804,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Date (Newest First)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 799,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 798,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'candidate-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('candidate-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-user-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 813,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Candidate (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 808,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 807,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'candidate-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('candidate-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-user-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 822,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Candidate (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 817,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 816,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'recruiter-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('recruiter-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-team-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 831,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Recruiter (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 826,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 825,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'recruiter-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('recruiter-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-team-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 840,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Recruiter (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 835,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 834,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'status-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('status-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-checkbox-circle-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 849,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Status (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 844,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 843,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'status-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('status-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-checkbox-circle-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 858,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Status (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 853,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "ti-dropdown-divider"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 861,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left text-gray-500 dark:text-gray-400",
                                                                    onClick: ()=>handleSortChange('clear-sort'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-close-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 868,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Clear Sort"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 863,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 862,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 788,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 778,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#!",
                                                scroll: false,
                                                className: "hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem] me-2",
                                                "data-hs-overlay": "#create-interview-modal",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-add-line font-semibold align-middle"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Schedule Interview"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 873,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hs-dropdown ti-dropdown me-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "ti-btn ti-btn-primary !py-1 !px-2 !text-[0.75rem] ti-dropdown-toggle",
                                                        id: "excel-dropdown-button",
                                                        "aria-expanded": "false",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-file-excel-2-line font-semibold align-middle me-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 888,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Excel",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-arrow-down-s-line align-middle ms-1 inline-block"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 889,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "hs-dropdown-menu ti-dropdown-menu hidden",
                                                        "aria-labelledby": "excel-dropdown-button",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-upload-2-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 897,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Import"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 893,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-file-excel-2-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 905,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Export"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 901,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 900,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-download-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 913,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Template"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 909,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 908,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 881,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem] me-2",
                                                "data-hs-overlay": "#interviews-filter-panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-search-line font-semibold align-middle me-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 923,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Search",
                                                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge bg-primary text-white rounded-full ms-1 text-[0.65rem]",
                                                        children: activeFilterCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 925,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 918,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ti-btn ti-btn-danger !py-1 !px-2 !text-[0.75rem]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-delete-bin-line font-semibold align-middle me-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 935,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Delete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 931,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 766,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 759,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "box-body !p-0 flex-1 flex flex-col overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "table-responsive flex-1 overflow-y-auto",
                                    style: {
                                        minHeight: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        ...getTableProps(),
                                        className: "table whitespace-nowrap min-w-full table-striped table-hover table-bordered border-gray-300 dark:border-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: headerGroups.map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("tr", {
                                                        ...headerGroup.getHeaderGroupProps(),
                                                        className: "bg-primary/10 dark:bg-primary/20 border-b border-gray-300 dark:border-gray-600",
                                                        key: Math.random(),
                                                        __source: {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 23
                                                        },
                                                        __self: ("TURBOPACK compile-time value", void 0)
                                                    }, headerGroup.headers.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("th", {
                                                            ...column.getHeaderProps(column.getSortByToggleProps()),
                                                            scope: "col",
                                                            className: "text-start sticky top-0 z-10 bg-gray-50 dark:bg-black/20",
                                                            key: Math.random(),
                                                            style: {
                                                                position: 'sticky',
                                                                top: 0,
                                                                zIndex: 10
                                                            },
                                                            __source: {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 946,
                                                                columnNumber: 27
                                                            },
                                                            __self: ("TURBOPACK compile-time value", void 0)
                                                        }, column.id === 'select' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "form-check-input",
                                                            type: "checkbox",
                                                            checked: isAllSelected,
                                                            ref: (input)=>{
                                                                if (input) input.indeterminate = isIndeterminate;
                                                            },
                                                            onChange: handleSelectAll,
                                                            "aria-label": "Select all"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 958,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "tabletitle",
                                                                    children: column.render('Header')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 970,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: column.isSorted ? column.isSortedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-arrow-down-s-line text-[0.875rem]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 974,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-arrow-up-s-line text-[0.875rem]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 976,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 971,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 969,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))))))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 942,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                ...getTableBodyProps(),
                                                children: page.map((row)=>{
                                                    prepareRow(row);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("tr", {
                                                        ...row.getRowProps(),
                                                        className: "border-b border-gray-300 dark:border-gray-600",
                                                        key: Math.random(),
                                                        __source: {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 993,
                                                            columnNumber: 25
                                                        },
                                                        __self: ("TURBOPACK compile-time value", void 0)
                                                    }, row.cells.map((cell)=>{
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("td", {
                                                            ...cell.getCellProps(),
                                                            key: Math.random(),
                                                            __source: {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 996,
                                                                columnNumber: 31
                                                            },
                                                            __self: ("TURBOPACK compile-time value", void 0)
                                                        }, cell.render('Cell'));
                                                    }));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 989,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 941,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 940,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 939,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "box-footer !border-t-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center flex-wrap gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Showing ",
                                                pageIndex * pageSize + 1,
                                                " to ",
                                                Math.min((pageIndex + 1) * pageSize, data.length),
                                                " of ",
                                                data.length,
                                                " entries",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "bi bi-arrow-right ms-2 font-semibold"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1012,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1010,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ms-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                "aria-label": "Page navigation",
                                                className: "pagination-style-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "ti-pagination mb-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: `page-item ${!canPreviousPage ? 'disabled' : ''}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "page-link px-3 py-[0.375rem]",
                                                                onClick: ()=>previousPage(),
                                                                disabled: !canPreviousPage,
                                                                children: "Prev"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1018,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1017,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        pageOptions.length <= 7 ? // Show all pages if 7 or fewer
                                                        pageOptions.map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: `page-item ${pageIndex === page ? 'active' : ''}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "page-link px-3 py-[0.375rem]",
                                                                    onClick: ()=>gotoPage(page),
                                                                    children: page + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 1033,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, page, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))) : // Show smart pagination for more pages
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                pageIndex > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                onClick: ()=>gotoPage(0),
                                                                                children: "1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                                lineNumber: 1047,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 1046,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        pageIndex > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item disabled",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                children: "..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                                lineNumber: 1056,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 1055,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true),
                                                                Array.from({
                                                                    length: Math.min(5, pageCount)
                                                                }, (_, i)=>{
                                                                    let pageNum;
                                                                    if (pageIndex < 3) {
                                                                        pageNum = i;
                                                                    } else if (pageIndex > pageCount - 4) {
                                                                        pageNum = pageCount - 5 + i;
                                                                    } else {
                                                                        pageNum = pageIndex - 2 + i;
                                                                    }
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        className: `page-item ${pageIndex === pageNum ? 'active' : ''}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "page-link px-3 py-[0.375rem]",
                                                                            onClick: ()=>gotoPage(pageNum),
                                                                            children: pageNum + 1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 1075,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, pageNum, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1071,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0));
                                                                }),
                                                                pageIndex < pageCount - 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        pageIndex < pageCount - 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item disabled",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                children: "..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                                lineNumber: 1088,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 1087,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                onClick: ()=>gotoPage(pageCount - 1),
                                                                                children: pageCount
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                                lineNumber: 1092,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                            lineNumber: 1091,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: `page-item ${!canNextPage ? 'disabled' : ''}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "page-link px-3 py-[0.375rem] text-primary",
                                                                onClick: ()=>nextPage(),
                                                                disabled: !canNextPage,
                                                                children: "Next"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1104,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1103,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1016,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                lineNumber: 1015,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1014,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1009,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 1008,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                        lineNumber: 758,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                    lineNumber: 757,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                lineNumber: 756,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "interviews-filter-panel",
                className: "hs-overlay hidden ti-offcanvas ti-offcanvas-right !z-[105]",
                tabIndex: -1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-offcanvas-header bg-gray-50 dark:bg-black/20 !py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                className: "ti-offcanvas-title text-base font-semibold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-search-line text-primary text-base"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 1125,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Search Interviews"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 1124,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10 hover:bg-gray-100 dark:hover:bg-black/40 rounded-md p-1",
                                onClick: handleResetFilters,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-refresh-line me-1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Reset"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                lineNumber: 1128,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                        lineNumber: 1123,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-offcanvas-body !p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-user-line text-primary text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Candidate",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allCandidates.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1145,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1142,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search candidates...",
                                                    value: searchCandidate,
                                                    onChange: (e)=>setSearchCandidate(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1148,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredCandidates.length > 0 ? filteredCandidates.map((candidate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.candidate.includes(candidate),
                                                                        onChange: ()=>handleMultiSelectChange('candidate', candidate)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1163,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: candidate
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1169,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, candidate, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1159,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No candidates found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1173,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 1156,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.candidate.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.candidate.map((candidate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-primary/10 text-primary border border-primary/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                candidate,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('candidate', candidate),
                                                                    className: "hover:text-primary-hover hover:bg-primary/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1192,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 1187,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, candidate, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1182,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1147,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1141,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-team-line text-success text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1204,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Recruiter",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allRecruiters.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1206,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1203,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search recruiters...",
                                                    value: searchRecruiter,
                                                    onChange: (e)=>setSearchRecruiter(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1209,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredRecruiters.length > 0 ? filteredRecruiters.map((recruiter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-success/5 dark:hover:bg-success/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.recruiter.includes(recruiter),
                                                                        onChange: ()=>handleMultiSelectChange('recruiter', recruiter)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1224,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: recruiter
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1230,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, recruiter, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1220,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No recruiters found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1234,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 1217,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1216,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.recruiter.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.recruiter.map((recruiter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-success/10 text-success border border-success/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                recruiter,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('recruiter', recruiter),
                                                                    className: "hover:text-success-hover hover:bg-success/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1253,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 1248,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, recruiter, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1243,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1241,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1208,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1202,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-checkbox-circle-line text-info text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1265,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Status",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allStatuses.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1267,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1264,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search status...",
                                                    value: searchStatus,
                                                    onChange: (e)=>setSearchStatus(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1270,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredStatuses.length > 0 ? filteredStatuses.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-info/5 dark:hover:bg-info/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.status.includes(status),
                                                                        onChange: ()=>handleMultiSelectChange('status', status)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1285,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1291,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, status, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1281,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No statuses found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 1278,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1277,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.status.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.status.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-info/10 text-info border border-info/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                status,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('status', status),
                                                                    className: "hover:text-info-hover hover:bg-info/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1314,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 1309,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, status, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1304,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1302,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1269,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1263,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-vidicon-line text-warning text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1326,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Type",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allTypes.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1328,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search types...",
                                                    value: searchType,
                                                    onChange: (e)=>setSearchType(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1331,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredTypes.length > 0 ? filteredTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-warning/5 dark:hover:bg-warning/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.type.includes(type),
                                                                        onChange: ()=>handleMultiSelectChange('type', type)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1346,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1352,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, type, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                lineNumber: 1342,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No types found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1356,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                        lineNumber: 1339,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1338,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.type.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.type.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-warning/10 text-warning border border-warning/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                type,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('type', type),
                                                                    className: "hover:text-warning-hover hover:bg-warning/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                        lineNumber: 1375,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                                    lineNumber: 1370,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, type, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                            lineNumber: 1365,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1363,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1330,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-4 border-t border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "ti-btn ti-btn-primary flex-1 font-medium shadow-sm hover:shadow-md transition-shadow !py-1.5 !text-sm",
                                            onClick: handleResetFilters,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-refresh-line me-1.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1391,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Reset"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1386,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "ti-btn ti-btn-light font-medium shadow-sm hover:shadow-md transition-shadow !py-1.5 !text-sm",
                                            "data-hs-overlay": "#interviews-filter-panel",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-close-line me-1.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                                    lineNumber: 1398,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Close"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                            lineNumber: 1393,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                                    lineNumber: 1385,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                            lineNumber: 1139,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                        lineNumber: 1138,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
                lineNumber: 1122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/(components)/(contentlayout)/ats/interviews/page.tsx",
        lineNumber: 754,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Interviews, "92+Nb72WVxT15i1WUEECPN3Bcto=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTable"]
    ];
});
_c = Interviews;
const __TURBOPACK__default__export__ = Interviews;
var _c;
__turbopack_context__.k.register(_c, "Interviews");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28components%29_%28contentlayout%29_ats_interviews_page_tsx_c89de225._.js.map