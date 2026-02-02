(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
// Mock data for recruiters
const RECRUITERS_DATA = [
    {
        id: '1',
        name: 'John Anderson',
        displayPicture: '/assets/images/faces/1.jpg',
        phone: '+1 (555) 123-4567',
        email: 'john.anderson@example.com',
        education: 'BS Computer Science - Stanford University (2018)',
        domain: 'Technology',
        location: 'San Francisco, CA',
        profileSummary: 'Experienced recruiter with 6+ years in tech talent acquisition. Specialized in placing software engineers and product managers at top-tier companies.'
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        displayPicture: '/assets/images/faces/2.jpg',
        phone: '+1 (555) 234-5678',
        email: 'sarah.johnson@example.com',
        education: 'MBA - Harvard Business School (2019)',
        domain: 'Finance',
        location: 'New York, NY',
        profileSummary: 'Strategic recruiter with 4+ years in finance and consulting placements. Expert in matching top talent with leading financial institutions.'
    },
    {
        id: '3',
        name: 'Michael Chen',
        displayPicture: '/assets/images/faces/3.jpg',
        phone: '+1 (555) 345-6789',
        email: 'michael.chen@example.com',
        education: 'BS Business Administration - UC Berkeley (2020)',
        domain: 'Healthcare',
        location: 'Los Angeles, CA',
        profileSummary: 'Healthcare recruitment specialist connecting medical professionals with premier healthcare organizations. Strong network in clinical and administrative roles.'
    },
    {
        id: '4',
        name: 'Emily Davis',
        displayPicture: '/assets/images/faces/4.jpg',
        phone: '+1 (555) 456-7890',
        email: 'emily.davis@example.com',
        education: 'MS Human Resources - MIT (2021)',
        domain: 'Technology',
        location: 'Seattle, WA',
        profileSummary: 'Tech recruiter passionate about building diverse engineering teams. Specialized in data science and machine learning talent placement.'
    },
    {
        id: '5',
        name: 'David Brown',
        displayPicture: '/assets/images/faces/5.jpg',
        phone: '+1 (555) 567-8901',
        email: 'david.brown@example.com',
        education: 'BS Business Management - Carnegie Mellon (2018)',
        domain: 'Manufacturing',
        location: 'Chicago, IL',
        profileSummary: 'Manufacturing and operations recruiter with expertise in supply chain and logistics placements. Connecting talent with industrial leaders.'
    },
    {
        id: '6',
        name: 'Lisa Anderson',
        displayPicture: '/assets/images/faces/6.jpg',
        phone: '+1 (555) 678-9012',
        email: 'lisa.anderson@example.com',
        education: 'BA Psychology - Art Center College (2019)',
        domain: 'Marketing',
        location: 'Austin, TX',
        profileSummary: 'Creative marketing recruiter focused on digital marketing and brand strategy roles. Building connections between creative talent and innovative brands.'
    },
    {
        id: '7',
        name: 'Robert Wilson',
        displayPicture: '/assets/images/faces/7.jpg',
        phone: '+1 (555) 789-0123',
        email: 'robert.wilson@example.com',
        education: 'BS Business Administration - Georgia Tech (2017)',
        domain: 'Sales',
        location: 'Boston, MA',
        profileSummary: 'Sales recruitment expert specializing in B2B and enterprise sales placements. Proven track record in building high-performing sales teams.'
    },
    {
        id: '8',
        name: 'Jessica Martinez',
        displayPicture: '/assets/images/faces/8.jpg',
        phone: '+1 (555) 890-1234',
        email: 'jessica.martinez@example.com',
        education: 'BA Marketing - UCLA (2018)',
        domain: 'Retail',
        location: 'Miami, FL',
        profileSummary: 'Retail and consumer goods recruiter connecting talent with leading brands. Expertise in merchandising, operations, and store management roles.'
    },
    {
        id: '9',
        name: 'Thomas Lee',
        displayPicture: '/assets/images/faces/9.jpg',
        phone: '+1 (555) 901-2345',
        email: 'thomas.lee@example.com',
        education: 'BA Business Administration - USC (2020)',
        domain: 'Real Estate',
        location: 'Phoenix, AZ',
        profileSummary: 'Real estate recruitment specialist placing professionals in commercial and residential real estate firms. Strong network in property management.'
    },
    {
        id: '10',
        name: 'Jennifer White',
        displayPicture: '/assets/images/faces/10.jpg',
        phone: '+1 (555) 012-3456',
        email: 'jennifer.white@example.com',
        education: 'BS Human Resources - UC San Diego (2019)',
        domain: 'Education',
        location: 'Denver, CO',
        profileSummary: 'Education sector recruiter connecting educators and administrators with schools and educational institutions. Passionate about educational excellence.'
    },
    {
        id: '11',
        name: 'Christopher Taylor',
        displayPicture: '/assets/images/faces/11.jpg',
        phone: '+1 (555) 123-4568',
        email: 'christopher.taylor@example.com',
        education: 'BS Business Management - University of Washington (2018)',
        domain: 'Technology',
        location: 'Portland, OR',
        profileSummary: 'Full-stack tech recruiter with expertise in modern software development roles. Building connections between developers and innovative tech companies.'
    },
    {
        id: '12',
        name: 'Amanda Garcia',
        displayPicture: '/assets/images/faces/12.jpg',
        phone: '+1 (555) 234-5679',
        email: 'amanda.garcia@example.com',
        education: 'MBA - Northwestern University (2020)',
        domain: 'Consulting',
        location: 'Washington, DC',
        profileSummary: 'Management consulting recruiter placing strategy and operations consultants with top-tier firms. Expert in matching analytical talent with consulting opportunities.'
    },
    {
        id: '13',
        name: 'Daniel Rodriguez',
        displayPicture: '/assets/images/faces/13.jpg',
        phone: '+1 (555) 345-6790',
        email: 'daniel.rodriguez@example.com',
        education: 'MS Business Analytics - Arizona State (2019)',
        domain: 'Technology',
        location: 'San Jose, CA',
        profileSummary: 'Cloud and infrastructure recruiter specializing in DevOps and cloud architecture placements. Connecting engineers with cutting-edge technology companies.'
    },
    {
        id: '14',
        name: 'Rachel Kim',
        displayPicture: '/assets/images/faces/14.jpg',
        phone: '+1 (555) 456-7901',
        email: 'rachel.kim@example.com',
        education: 'BS Communications - San Diego State (2021)',
        domain: 'Media',
        location: 'Nashville, TN',
        profileSummary: 'Media and entertainment recruiter connecting creative professionals with production companies and media organizations. Building teams for content creation.'
    },
    {
        id: '15',
        name: 'Kevin Harris',
        displayPicture: '/assets/images/faces/15.jpg',
        phone: '+1 (555) 567-9012',
        email: 'kevin.harris@example.com',
        education: 'BS Business Administration - Tennessee Tech (2018)',
        domain: 'Logistics',
        location: 'Atlanta, GA',
        profileSummary: 'Logistics and supply chain recruiter with extensive experience in transportation and warehousing placements. Connecting operations talent with logistics leaders.'
    }
];
const Recruiters = ()=>{
    _s();
    const [selectedRows, setSelectedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [recruiterNotes, setRecruiterNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [previewRecruiter, setPreviewRecruiter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notesRecruiterId, setNotesRecruiterId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newNote, setNewNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: '',
        visibility: 'public'
    });
    const [shareRecruiter, setShareRecruiter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shareEmail, setShareEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showEmailInput, setShowEmailInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSort, setSelectedSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: [],
        domain: [],
        education: [],
        location: [],
        email: ''
    });
    // Search states for filter dropdowns
    const [searchName, setSearchName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchDomain, setSearchDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchEducation, setSearchEducation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchLocation, setSearchLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
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
    // Handle add note - open notes sidebar
    const handleAddNote = (id, recruiter)=>{
        // Open the notes sidebar
        setNotesRecruiterId(id);
        // Trigger the panel via Preline's trigger button
        setTimeout(()=>{
            const trigger = document.getElementById('recruiter-notes-panel-trigger');
            if (trigger) {
                trigger.click();
            }
        }, 100);
    };
    // Get notes for a specific recruiter
    const getRecruiterNotes = (recruiterId)=>{
        return recruiterNotes.filter((note)=>note.recruiterId === recruiterId).sort((a, b)=>new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    };
    // Add a new note
    const handleAddNoteSubmit = ()=>{
        if (!notesRecruiterId || !newNote.text.trim()) return;
        const note = {
            id: `note-${Date.now()}`,
            recruiterId: notesRecruiterId,
            note: newNote.text,
            visibility: newNote.visibility,
            postedBy: 'John Doe',
            postedDate: new Date().toISOString()
        };
        setRecruiterNotes([
            ...recruiterNotes,
            note
        ]);
        setNewNote({
            text: '',
            visibility: 'public'
        });
    };
    // Delete a note
    const handleDeleteNote = (noteId)=>{
        setRecruiterNotes(recruiterNotes.filter((note)=>note.id !== noteId));
    };
    // Get recruiter details for the notes sidebar
    const getRecruiterDetails = ()=>{
        if (!notesRecruiterId) return null;
        return RECRUITERS_DATA.find((recruiter)=>recruiter.id === notesRecruiterId);
    };
    // Generate public URL for recruiter
    const getRecruiterPublicUrl = (recruiterId)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return `${window.location.origin}/ats/recruiters/${recruiterId}`;
        }
        //TURBOPACK unreachable
        ;
    };
    // Export candidate documents
    const handleExportDocs = (candidate, type = 'all')=>{
        // TODO: Implement document export functionality
        console.log(`Exporting ${type} for candidate:`, candidate.id);
        // Here you would implement the actual export logic based on type
        switch(type){
            case 'all':
                // Export both resume and cover letter
                console.log('Exporting all documents');
                break;
            case 'resume':
                // Export only resume
                console.log('Exporting resume');
                break;
            case 'cover-letter':
                // Export only cover letter
                console.log('Exporting cover letter');
                break;
        }
    };
    // Copy URL to clipboard
    const handleCopyUrl = async (url)=>{
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    // Share on WhatsApp
    const handleShareWhatsApp = (recruiter)=>{
        const url = getRecruiterPublicUrl(recruiter.id);
        const text = `Check out this recruiter: ${recruiter.name} - ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };
    // Handle email share - show input field
    const handleEmailShareClick = ()=>{
        setShowEmailInput(true);
    };
    // Handle send email (UI only for now)
    const handleSendEmail = ()=>{
        if (!shareEmail.trim()) return;
        // TODO: Add email sending logic here
        console.log('Sending email to:', shareEmail, 'for recruiter:', shareRecruiter?.id);
        // Reset after sending
        setShareEmail('');
        setShowEmailInput(false);
    };
    // Handle share button click
    const handleShareClick = (recruiter)=>{
        setShareRecruiter(recruiter);
        setShowEmailInput(false);
        setShareEmail('');
        setTimeout(()=>{
            const trigger = document.getElementById('share-recruiter-modal-trigger');
            if (trigger) {
                trigger.click();
            }
        }, 100);
    };
    // Define columns
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[columns]": ()=>[
                {
                    Header: 'All',
                    accessor: 'checkbox',
                    disableSortBy: true,
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "form-check-input",
                                type: "checkbox",
                                checked: selectedRows.has(row.original.id),
                                onChange: {
                                    "Recruiters.useMemo[columns]": ()=>handleRowSelect(row.original.id)
                                }["Recruiters.useMemo[columns]"],
                                "aria-label": `Select ${row.original.name}`
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Recruiter Info',
                    accessor: 'recruiterInfo',
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original;
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
                                                "Recruiters.useMemo[columns]": (e)=>{
                                                    e.target.src = '/assets/images/faces/1.jpg';
                                                }
                                            }["Recruiters.useMemo[columns]"]
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-gray-800 dark:text-white truncate cursor-pointer hover:text-primary",
                                                onClick: {
                                                    "Recruiters.useMemo[columns]": ()=>{
                                                        setPreviewRecruiter(recruiter);
                                                        // Trigger the panel via Preline's trigger button
                                                        setTimeout({
                                                            "Recruiters.useMemo[columns]": ()=>{
                                                                const trigger = document.getElementById('recruiter-preview-panel-trigger');
                                                                if (trigger) {
                                                                    trigger.click();
                                                                }
                                                            }
                                                        }["Recruiters.useMemo[columns]"], 100);
                                                    }
                                                }["Recruiters.useMemo[columns]"],
                                                children: recruiter.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 dark:text-gray-400 truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-phone-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            recruiter.phone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-mail-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            recruiter.email
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Education',
                    accessor: 'education',
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original;
                            // Parse education: split by " - " to separate degree and university
                            const educationParts = recruiter.education ? recruiter.education.split(' - ') : [
                                '',
                                ''
                            ];
                            const degree = educationParts[0] || '';
                            const university = educationParts.slice(1).join(' - ') || '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-800 dark:text-white",
                                style: {
                                    maxWidth: '280px',
                                    minHeight: '60px',
                                    lineHeight: '1.5',
                                    wordBreak: 'break-word'
                                },
                                title: recruiter.education,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-graduation-cap-line text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: degree
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    university && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-building-line text-info"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: university
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Domain',
                    accessor: 'domain',
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-800 dark:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge bg-success/10 text-success border border-success/30 px-2 py-1 rounded-md text-xs font-medium",
                                    children: recruiter.domain
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Location',
                    accessor: 'location',
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-map-pin-line text-warning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: recruiter.location
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 478,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Profile Summary',
                    accessor: 'profileSummary',
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>{
                            const recruiter = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-700 dark:text-gray-300",
                                style: {
                                    maxWidth: '320px',
                                    minHeight: '60px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.5',
                                    wordBreak: 'break-word'
                                },
                                title: recruiter.profileSummary,
                                children: recruiter.profileSummary
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 491,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["Recruiters.useMemo[columns]"]
                },
                {
                    Header: 'Actions',
                    accessor: 'id',
                    disableSortBy: true,
                    Cell: {
                        "Recruiters.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-info",
                                            title: "Edit Recruiter",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-pencil-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Edit Recruiter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 517,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: {
                                                "Recruiters.useMemo[columns]": ()=>handleAddNote(row.original.id, row.original)
                                            }["Recruiters.useMemo[columns]"],
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-warning",
                                            title: "Add Note",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-file-add-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Add Note"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-tooltip ti-main-tooltip",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: {
                                                "Recruiters.useMemo[columns]": ()=>handleShareClick(row.original)
                                            }["Recruiters.useMemo[columns]"],
                                            className: "hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-success",
                                            title: "Share Public URL",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-share-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700",
                                                    role: "tooltip",
                                                    children: "Share Public URL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 554,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hs-dropdown ti-dropdown",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "hs-dropdown-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-primary",
                                                id: `export-dropdown-${row.original.id}`,
                                                "aria-expanded": "false",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-download-line"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 562,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "hs-dropdown-menu ti-dropdown-menu hidden",
                                                "aria-labelledby": `export-dropdown-${row.original.id}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "ti-dropdown-item",
                                                            onClick: {
                                                                "Recruiters.useMemo[columns]": ()=>handleExportDocs(row.original, 'all')
                                                            }["Recruiters.useMemo[columns]"],
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-file-download-line me-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "All"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "ti-dropdown-item",
                                                            onClick: {
                                                                "Recruiters.useMemo[columns]": ()=>handleExportDocs(row.original, 'resume')
                                                            }["Recruiters.useMemo[columns]"],
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-file-text-line me-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 589,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "Resume"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 584,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "ti-dropdown-item",
                                                            onClick: {
                                                                "Recruiters.useMemo[columns]": ()=>handleExportDocs(row.original, 'cover-letter')
                                                            }["Recruiters.useMemo[columns]"],
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-mail-line me-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "Cover Letter"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 516,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["Recruiters.useMemo[columns]"]
                }
            ]
    }["Recruiters.useMemo[columns]"], [
        selectedRows
    ]);
    // Filter data based on filter state
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[filteredData]": ()=>{
            return RECRUITERS_DATA.filter({
                "Recruiters.useMemo[filteredData]": (recruiter)=>{
                    // Name filter (array)
                    if (filters.name.length > 0 && !filters.name.some({
                        "Recruiters.useMemo[filteredData]": (name)=>recruiter.name.toLowerCase().includes(name.toLowerCase())
                    }["Recruiters.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Domain filter (array)
                    if (filters.domain.length > 0 && !filters.domain.some({
                        "Recruiters.useMemo[filteredData]": (domain)=>recruiter.domain.toLowerCase().includes(domain.toLowerCase())
                    }["Recruiters.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Education filter (array)
                    if (filters.education.length > 0 && !filters.education.some({
                        "Recruiters.useMemo[filteredData]": (edu)=>recruiter.education.toLowerCase().includes(edu.toLowerCase())
                    }["Recruiters.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Location filter (array)
                    if (filters.location.length > 0 && !filters.location.some({
                        "Recruiters.useMemo[filteredData]": (loc)=>recruiter.location.toLowerCase().includes(loc.toLowerCase())
                    }["Recruiters.useMemo[filteredData]"])) {
                        return false;
                    }
                    // Email filter (string)
                    if (filters.email && !recruiter.email.toLowerCase().includes(filters.email.toLowerCase())) {
                        return false;
                    }
                    return true;
                }
            }["Recruiters.useMemo[filteredData]"]);
        }
    }["Recruiters.useMemo[filteredData]"], [
        filters
    ]);
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[data]": ()=>filteredData
    }["Recruiters.useMemo[data]"], [
        filteredData
    ]);
    // Get unique values for dropdown filters
    const allDomains = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[allDomains]": ()=>{
            return [
                ...new Set(RECRUITERS_DATA.map({
                    "Recruiters.useMemo[allDomains]": (recruiter)=>recruiter.domain
                }["Recruiters.useMemo[allDomains]"]))
            ].sort();
        }
    }["Recruiters.useMemo[allDomains]"], []);
    const allEducation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[allEducation]": ()=>{
            return [
                ...new Set(RECRUITERS_DATA.map({
                    "Recruiters.useMemo[allEducation]": (recruiter)=>recruiter.education
                }["Recruiters.useMemo[allEducation]"]))
            ].sort();
        }
    }["Recruiters.useMemo[allEducation]"], []);
    const allNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[allNames]": ()=>{
            return [
                ...new Set(RECRUITERS_DATA.map({
                    "Recruiters.useMemo[allNames]": (recruiter)=>recruiter.name
                }["Recruiters.useMemo[allNames]"]))
            ].sort();
        }
    }["Recruiters.useMemo[allNames]"], []);
    const allLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[allLocations]": ()=>{
            return [
                ...new Set(RECRUITERS_DATA.map({
                    "Recruiters.useMemo[allLocations]": (recruiter)=>recruiter.location
                }["Recruiters.useMemo[allLocations]"]))
            ].sort();
        }
    }["Recruiters.useMemo[allLocations]"], []);
    // Filter options based on search terms
    const filteredNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[filteredNames]": ()=>{
            if (!searchName) return allNames;
            return allNames.filter({
                "Recruiters.useMemo[filteredNames]": (name)=>name.toLowerCase().includes(searchName.toLowerCase())
            }["Recruiters.useMemo[filteredNames]"]);
        }
    }["Recruiters.useMemo[filteredNames]"], [
        allNames,
        searchName
    ]);
    const filteredDomains = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[filteredDomains]": ()=>{
            if (!searchDomain) return allDomains;
            return allDomains.filter({
                "Recruiters.useMemo[filteredDomains]": (domain)=>domain.toLowerCase().includes(searchDomain.toLowerCase())
            }["Recruiters.useMemo[filteredDomains]"]);
        }
    }["Recruiters.useMemo[filteredDomains]"], [
        allDomains,
        searchDomain
    ]);
    const filteredEducation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[filteredEducation]": ()=>{
            if (!searchEducation) return allEducation;
            return allEducation.filter({
                "Recruiters.useMemo[filteredEducation]": (edu)=>edu.toLowerCase().includes(searchEducation.toLowerCase())
            }["Recruiters.useMemo[filteredEducation]"]);
        }
    }["Recruiters.useMemo[filteredEducation]"], [
        allEducation,
        searchEducation
    ]);
    const filteredLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Recruiters.useMemo[filteredLocations]": ()=>{
            if (!searchLocation) return allLocations;
            return allLocations.filter({
                "Recruiters.useMemo[filteredLocations]": (loc)=>loc.toLowerCase().includes(searchLocation.toLowerCase())
            }["Recruiters.useMemo[filteredLocations]"]);
        }
    }["Recruiters.useMemo[filteredLocations]"], [
        allLocations,
        searchLocation
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
            name: [],
            domain: [],
            education: [],
            location: [],
            email: ''
        });
        setSearchName('');
        setSearchDomain('');
        setSearchEducation('');
        setSearchLocation('');
    };
    const hasActiveFilters = filters.name.length > 0 || filters.domain.length > 0 || filters.education.length > 0 || filters.location.length > 0 || filters.email !== '';
    const activeFilterCount = filters.name.length + filters.domain.length + filters.education.length + filters.location.length + (filters.email !== '' ? 1 : 0);
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
            case 'name-asc':
                setSortBy([
                    {
                        id: 'recruiterInfo',
                        desc: false
                    }
                ]);
                break;
            case 'name-desc':
                setSortBy([
                    {
                        id: 'recruiterInfo',
                        desc: true
                    }
                ]);
                break;
            case 'domain-asc':
                setSortBy([
                    {
                        id: 'domain',
                        desc: false
                    }
                ]);
                break;
            case 'domain-desc':
                setSortBy([
                    {
                        id: 'domain',
                        desc: true
                    }
                ]);
                break;
            case 'education-asc':
                setSortBy([
                    {
                        id: 'education',
                        desc: false
                    }
                ]);
                break;
            case 'education-desc':
                setSortBy([
                    {
                        id: 'education',
                        desc: true
                    }
                ]);
                break;
            case 'location-asc':
                setSortBy([
                    {
                        id: 'location',
                        desc: false
                    }
                ]);
                break;
            case 'location-desc':
                setSortBy([
                    {
                        id: 'location',
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
            const allIds = new Set(filteredData.map((recruiter)=>recruiter.id));
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
                                            "Recruiters",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "badge bg-light text-default rounded-full ms-1 text-[0.75rem] align-middle",
                                                children: filteredData.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 834,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 832,
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
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 845,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 839,
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
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 857,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Sort",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-arrow-down-s-line align-middle ms-1 inline-block"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "hs-dropdown-menu ti-dropdown-menu hidden",
                                                        "aria-labelledby": "sort-dropdown-button",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'name-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('name-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-sort-asc me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 867,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Name (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 862,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 861,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'name-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('name-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-sort-desc me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 876,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Name (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 871,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 870,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'skills-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('skills-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-code-s-slash-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 885,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Skills (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 880,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 879,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'skills-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('skills-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-code-s-slash-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 894,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Skills (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 889,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 888,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'education-asc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('education-asc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-graduation-cap-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 903,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Education (A-Z)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 898,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 897,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left ${selectedSort === 'education-desc' ? 'active' : ''}`,
                                                                    onClick: ()=>handleSortChange('education-desc'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: "ri-graduation-cap-line me-2 align-middle inline-block"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 912,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Education (Z-A)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 907,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "ti-dropdown-divider"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 915,
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
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 922,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Clear Sort"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 917,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 916,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#!",
                                                scroll: false,
                                                className: "hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem] me-2",
                                                "data-hs-overlay": "#create-recruiter-modal",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-add-line font-semibold align-middle"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Add Recruiter"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 927,
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
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 942,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Excel",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-arrow-down-s-line align-middle ms-1 inline-block"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 943,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 936,
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
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 951,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Import"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 947,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 946,
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
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 959,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Export"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 955,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 954,
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
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 967,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "Template"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 963,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 962,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 945,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 935,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem] me-2",
                                                "data-hs-overlay": "#recruiters-filter-panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-search-line font-semibold align-middle me-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 977,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Search",
                                                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "badge bg-primary text-white rounded-full ms-1 text-[0.65rem]",
                                                        children: activeFilterCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 972,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "ti-btn ti-btn-danger !py-1 !px-2 !text-[0.75rem]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-delete-bin-line font-semibold align-middle me-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Delete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 985,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 838,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 831,
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
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 998,
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
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1000,
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
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1012,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "tabletitle",
                                                                    children: column.render('Header')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1024,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: column.isSorted ? column.isSortedDesc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-arrow-down-s-line text-[0.875rem]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1028,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-arrow-up-s-line text-[0.875rem]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1030,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : ''
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1025,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1023,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))))))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 996,
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
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1047,
                                                            columnNumber: 25
                                                        },
                                                        __self: ("TURBOPACK compile-time value", void 0)
                                                    }, row.cells.map((cell)=>{
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("td", {
                                                            ...cell.getCellProps(),
                                                            key: Math.random(),
                                                            __source: {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1050,
                                                                columnNumber: 31
                                                            },
                                                            __self: ("TURBOPACK compile-time value", void 0)
                                                        }, cell.render('Cell'));
                                                    }));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1043,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 995,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 994,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 993,
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
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1066,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1064,
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
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1072,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1071,
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
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1087,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, page, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1083,
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
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1101,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1100,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        pageIndex > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item disabled",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                children: "..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1110,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1109,
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
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1129,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, pageNum, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1125,
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
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1142,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1141,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "page-item",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "page-link px-3 py-[0.375rem]",
                                                                                onClick: ()=>gotoPage(pageCount - 1),
                                                                                children: pageCount
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1146,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1145,
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
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1158,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1157,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1070,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1069,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1063,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1062,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 830,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                    lineNumber: 829,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 828,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "recruiters-filter-panel",
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
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1179,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Search Recruiters"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1178,
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
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1188,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Reset"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1182,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1177,
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
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1197,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Name",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allNames.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1199,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1196,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search names...",
                                                    value: searchName,
                                                    onChange: (e)=>setSearchName(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1202,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredNames.length > 0 ? filteredNames.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.name.includes(name),
                                                                        onChange: ()=>handleMultiSelectChange('name', name)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1217,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1223,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, name, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1213,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No names found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1227,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1210,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1209,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.name.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.name.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-primary/10 text-primary border border-primary/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                name,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('name', name),
                                                                    className: "hover:text-primary-hover hover:bg-primary/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1246,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1241,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, name, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1236,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1234,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1195,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-building-2-line text-success text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1258,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Domain",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allDomains.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1260,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1257,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search domains...",
                                                    value: searchDomain,
                                                    onChange: (e)=>setSearchDomain(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1263,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredDomains.length > 0 ? filteredDomains.map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-success/5 dark:hover:bg-success/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.domain.includes(domain),
                                                                        onChange: ()=>handleMultiSelectChange('domain', domain)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1278,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: domain
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1284,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, domain, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1274,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No domains found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1288,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1271,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1270,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.domain.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.domain.map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-success/10 text-success border border-success/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                domain,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('domain', domain),
                                                                    className: "hover:text-success-hover hover:bg-success/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1307,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1302,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, domain, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1297,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1295,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1262,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1256,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-graduation-cap-line text-info text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1319,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Education",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allEducation.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1321,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1318,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search education...",
                                                    value: searchEducation,
                                                    onChange: (e)=>setSearchEducation(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredEducation.length > 0 ? filteredEducation.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-info/5 dark:hover:bg-info/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.education.includes(edu),
                                                                        onChange: ()=>handleMultiSelectChange('education', edu)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1339,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: edu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1345,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, edu, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No education found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1349,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1332,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1331,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-info/10 text-info border border-info/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                edu,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('education', edu),
                                                                    className: "hover:text-info-hover hover:bg-info/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1368,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1363,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, edu, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1358,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1356,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1317,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4 border-b border-gray-200 dark:border-defaultborder/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-map-pin-line text-warning text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1380,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Location",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal text-gray-500 dark:text-gray-400",
                                                    children: [
                                                        "(",
                                                        allLocations.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1382,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "form-control !py-1.5 !text-sm mb-1.5",
                                                    placeholder: "Search locations...",
                                                    value: searchLocation,
                                                    onChange: (e)=>setSearchLocation(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1385,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-40 overflow-y-auto rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: filteredLocations.length > 0 ? filteredLocations.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer hover:bg-warning/5 dark:hover:bg-warning/10 p-1.5 rounded-md transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        className: "form-check-input !w-3.5 !h-3.5",
                                                                        checked: filters.location.includes(location),
                                                                        onChange: ()=>handleMultiSelectChange('location', location)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1400,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-700 dark:text-gray-300 font-medium",
                                                                        children: location
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1406,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, location, true, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1396,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-center py-3",
                                                            children: "No locations found"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1410,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1393,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1392,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                filters.location.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1.5",
                                                    children: filters.location.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge bg-warning/10 text-warning border border-warning/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm",
                                                            children: [
                                                                location,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleRemoveFilter('location', location),
                                                                    className: "hover:text-warning-hover hover:bg-warning/20 rounded-full p-0.5 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-xs"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1429,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1424,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, location, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1419,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1417,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1384,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1378,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-mail-line text-warning text-base"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1441,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Email"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1440,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "form-control border-gray-200 dark:border-defaultborder/10 focus:ring-2 focus:ring-primary/20 !py-1.5 !text-sm",
                                            placeholder: "Search by email...",
                                            value: filters.email,
                                            onChange: (e)=>setFilters((prev)=>({
                                                        ...prev,
                                                        email: e.target.value
                                                    }))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1444,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1439,
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
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1460,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Reset"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1455,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "ti-btn ti-btn-light font-medium shadow-sm hover:shadow-md transition-shadow !py-1.5 !text-sm",
                                            "data-hs-overlay": "#recruiters-filter-panel",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-close-line me-1.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1467,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Close"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1462,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1454,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                            lineNumber: 1193,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1192,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1176,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "recruiter-preview-panel-trigger",
                type: "button",
                style: {
                    display: 'none'
                },
                "data-hs-overlay": "#recruiter-preview-panel"
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1475,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "recruiter-preview-panel",
                className: "hs-overlay hidden ti-offcanvas ti-offcanvas-right !z-[105] !max-w-[50rem] lg:!max-w-[60rem]",
                tabIndex: -1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-offcanvas-header bg-gray-50 dark:bg-black/20 !py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                className: "ti-offcanvas-title text-base font-semibold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-user-line text-primary text-base"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1490,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    previewRecruiter?.name || 'Recruiter Profile'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1489,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "hs-dropdown-toggle ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10 hover:bg-gray-100 dark:hover:bg-black/40 rounded-md p-1",
                                "data-hs-overlay": "#recruiter-preview-panel",
                                onClick: ()=>setPreviewRecruiter(null),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1499,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-3.5 h-3.5",
                                        width: "8",
                                        height: "8",
                                        viewBox: "0 0 8 8",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1501,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1500,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1493,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1488,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-offcanvas-body !p-4",
                        children: previewRecruiter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 dark:border-primary/30 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: previewRecruiter.displayPicture || '/assets/images/faces/1.jpg',
                                            alt: previewRecruiter.name,
                                            className: "w-16 h-16 rounded-full object-cover",
                                            onError: (e)=>{
                                                e.target.src = '/assets/images/faces/1.jpg';
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1510,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                    className: "font-bold text-gray-800 dark:text-white text-xl mb-1",
                                                    children: previewRecruiter.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1519,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-mail-line"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1522,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                previewRecruiter.email
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1521,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-phone-line"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1526,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                previewRecruiter.phone
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1525,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1520,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1518,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1509,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-black/20 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 dark:text-gray-400 mb-1",
                                                    children: "Education"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1536,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-gray-800 dark:text-white",
                                                    children: previewRecruiter.education
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1537,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1535,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 dark:text-gray-400 mb-1",
                                                    children: "Domain"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1540,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge bg-success/10 text-success border border-success/30 px-2 py-1 rounded-md text-xs font-medium",
                                                    children: previewRecruiter.domain
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1541,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1539,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 dark:text-gray-400 mb-1",
                                                    children: "Location"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1546,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-gray-800 dark:text-white flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-map-pin-line text-warning"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1548,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        previewRecruiter.location
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1547,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1545,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1534,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                previewRecruiter.profileSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border border-gray-200 dark:border-defaultborder/10 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                            className: "font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-file-text-line text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1558,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Profile Summary"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1557,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed",
                                            children: previewRecruiter.profileSummary
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1561,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1556,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 border-t border-gray-200 dark:border-defaultborder/10 flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "hs-dropdown-toggle ti-btn ti-btn-light flex-1",
                                            "data-hs-overlay": "#recruiter-preview-panel",
                                            onClick: ()=>setPreviewRecruiter(null),
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1569,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "ti-btn ti-btn-primary flex-1",
                                            children: "View Full Profile"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1577,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1568,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                            lineNumber: 1507,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-gray-500",
                            children: "No recruiter selected"
                        }, void 0, false, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                            lineNumber: 1583,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1505,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1483,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "recruiter-notes-panel-trigger",
                type: "button",
                style: {
                    display: 'none'
                },
                "data-hs-overlay": "#recruiter-notes-panel"
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1589,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "recruiter-notes-panel",
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
                                        className: "ri-file-add-line text-primary text-base"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    getRecruiterDetails()?.name || 'Recruiter Notes'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1603,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "hs-dropdown-toggle ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10 hover:bg-gray-100 dark:hover:bg-black/40 rounded-md p-1",
                                "data-hs-overlay": "#recruiter-notes-panel",
                                onClick: ()=>setNotesRecruiterId(null),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1613,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-3.5 h-3.5",
                                        width: "8",
                                        height: "8",
                                        viewBox: "0 0 8 8",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1615,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1614,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1607,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1602,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-offcanvas-body !p-4",
                        children: notesRecruiterId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                (()=>{
                                    const recruiterDetails = getRecruiterDetails();
                                    return recruiterDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 dark:border-primary/30 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                className: "font-bold text-gray-800 dark:text-white text-lg mb-2",
                                                children: recruiterDetails.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1627,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-mail-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1630,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            recruiterDetails.email
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-phone-line"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                lineNumber: 1634,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            recruiterDetails.phone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1633,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1628,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1626,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : null;
                                })(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border border-gray-200 dark:border-defaultborder/10 rounded-lg bg-gray-50 dark:bg-black/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                            className: "font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-file-add-line text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1645,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Add Note"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1644,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "form-control",
                                                    rows: 4,
                                                    placeholder: "Write your note here...",
                                                    value: newNote.text,
                                                    onChange: (e)=>setNewNote({
                                                            ...newNote,
                                                            text: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1649,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "form-label mb-0 font-medium text-sm text-gray-700 dark:text-gray-300",
                                                            children: "Visibility:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1657,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "form-check",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            className: "form-check-input",
                                                                            type: "radio",
                                                                            name: "noteVisibility",
                                                                            id: "note-public",
                                                                            checked: newNote.visibility === 'public',
                                                                            onChange: ()=>setNewNote({
                                                                                    ...newNote,
                                                                                    visibility: 'public'
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1660,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "form-check-label",
                                                                            htmlFor: "note-public",
                                                                            children: "Public"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1668,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1659,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "form-check",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            className: "form-check-input",
                                                                            type: "radio",
                                                                            name: "noteVisibility",
                                                                            id: "note-private",
                                                                            checked: newNote.visibility === 'private',
                                                                            onChange: ()=>setNewNote({
                                                                                    ...newNote,
                                                                                    visibility: 'private'
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1673,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "form-check-label",
                                                                            htmlFor: "note-private",
                                                                            children: "Private"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1681,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1672,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1658,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1656,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "ti-btn ti-btn-primary",
                                                    onClick: handleAddNoteSubmit,
                                                    disabled: !newNote.text.trim(),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-add-line me-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1693,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Add Note"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1687,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1648,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1643,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                            className: "font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "ri-file-list-line text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1702,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Notes (",
                                                notesRecruiterId ? getRecruiterNotes(notesRecruiterId).length : 0,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1701,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 max-h-96 overflow-y-auto",
                                            children: notesRecruiterId && getRecruiterNotes(notesRecruiterId).length > 0 ? getRecruiterNotes(notesRecruiterId).map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border border-gray-200 dark:border-defaultborder/10 rounded-lg bg-white dark:bg-black/40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between gap-3 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `badge ${note.visibility === 'public' ? 'bg-success' : 'bg-secondary'} text-white text-xs`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: `ri-${note.visibility === 'public' ? 'global' : 'lock'}-line me-1`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1715,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            note.visibility === 'public' ? 'Public' : 'Private'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                        lineNumber: 1714,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1713,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-500 dark:text-gray-400 text-right",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: new Date(note.postedDate).toLocaleDateString()
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                    lineNumber: 1721,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: new Date(note.postedDate).toLocaleTimeString()
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                    lineNumber: 1722,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1720,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            className: "ti-btn ti-btn-icon ti-btn-sm ti-btn-danger",
                                                                            onClick: ()=>handleDeleteNote(note.id),
                                                                            title: "Delete note",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "ri-delete-bin-line"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                lineNumber: 1730,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1724,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1719,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1712,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-wrap",
                                                            children: note.note
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1734,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-user-line"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1738,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "Posted by: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: note.postedBy
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1739,
                                                                    columnNumber: 38
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1737,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, note.id, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1708,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-8 border border-gray-200 dark:border-defaultborder/10 rounded-lg text-center bg-gray-50 dark:bg-black/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-file-list-line text-3xl text-gray-400 dark:text-gray-500 mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1745,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 dark:text-gray-400",
                                                        children: "No notes yet. Add your first note above."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                        lineNumber: 1746,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1744,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1705,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1700,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                            lineNumber: 1621,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-gray-500",
                            children: "No recruiter selected"
                        }, void 0, false, {
                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                            lineNumber: 1753,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1619,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1597,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "share-recruiter-modal-trigger",
                type: "button",
                style: {
                    display: 'none'
                },
                "data-hs-overlay": "#share-recruiter-modal"
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1759,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "share-recruiter-modal",
                className: "hs-overlay hidden ti-modal",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-lg lg:w-full m-3 lg:!mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ti-modal-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ti-modal-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                        className: "ti-modal-title flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-share-line text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1775,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Share Recruiter"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1774,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "hs-dropdown-toggle ti-modal-close-btn",
                                        "data-hs-overlay": "#share-recruiter-modal",
                                        onClick: ()=>{
                                            setShareRecruiter(null);
                                            setShowEmailInput(false);
                                            setShareEmail('');
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Close"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1788,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-3.5 h-3.5",
                                                width: "8",
                                                height: "8",
                                                viewBox: "0 0 8 8",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z",
                                                    fill: "currentColor"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1790,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                lineNumber: 1789,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                        lineNumber: 1778,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1773,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ti-modal-body",
                                children: shareRecruiter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-defaultborder/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                    className: "font-semibold text-gray-800 dark:text-white mb-1",
                                                    children: shareRecruiter.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1799,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 dark:text-gray-400",
                                                    children: [
                                                        shareRecruiter.email,
                                                        " • ",
                                                        shareRecruiter.phone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1800,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1798,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "form-label mb-2 font-semibold text-sm text-gray-800 dark:text-white",
                                                    children: "Public URL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1807,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            className: "form-control",
                                                            value: getRecruiterPublicUrl(shareRecruiter.id),
                                                            readOnly: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1811,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: `ti-btn ${copied ? 'ti-btn-success' : 'ti-btn-primary'}`,
                                                            onClick: ()=>handleCopyUrl(getRecruiterPublicUrl(shareRecruiter.id)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: `ri-${copied ? 'check' : 'file-copy'}-line me-1`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1822,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                copied ? 'Copied!' : 'Copy'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1817,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1810,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1806,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "form-label mb-3 font-semibold text-sm text-gray-800 dark:text-white",
                                                    children: "Share via"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1830,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "ti-btn ti-btn-success w-full flex items-center justify-center gap-2",
                                                            onClick: ()=>handleShareWhatsApp(shareRecruiter),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-whatsapp-line text-xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1839,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "WhatsApp"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1834,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        !showEmailInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "ti-btn ti-btn-primary w-full flex items-center justify-center gap-2",
                                                            onClick: handleEmailShareClick,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-mail-line text-xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1849,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "Email"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1844,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "email",
                                                                    className: "form-control",
                                                                    placeholder: "Enter email address",
                                                                    value: shareEmail,
                                                                    onChange: (e)=>setShareEmail(e.target.value),
                                                                    onKeyPress: (e)=>{
                                                                        if (e.key === 'Enter') {
                                                                            handleSendEmail();
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1854,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            className: "ti-btn ti-btn-primary flex-1",
                                                                            onClick: handleSendEmail,
                                                                            disabled: !shareEmail.trim(),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                    className: "ri-send-plane-line me-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                                    lineNumber: 1873,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                "Send"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1867,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            className: "ti-btn ti-btn-light",
                                                                            onClick: ()=>{
                                                                                setShowEmailInput(false);
                                                                                setShareEmail('');
                                                                            },
                                                                            children: "Cancel"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                            lineNumber: 1876,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                                    lineNumber: 1866,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                            lineNumber: 1853,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                                    lineNumber: 1833,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                            lineNumber: 1829,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1796,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-4 text-gray-500",
                                    children: "No recruiter selected"
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1893,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1794,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ti-modal-footer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "ti-btn ti-btn-light",
                                    "data-hs-overlay": "#share-recruiter-modal",
                                    onClick: ()=>{
                                        setShareRecruiter(null);
                                        setShowEmailInput(false);
                                        setShareEmail('');
                                    },
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                    lineNumber: 1897,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                                lineNumber: 1896,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                        lineNumber: 1772,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                    lineNumber: 1771,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
                lineNumber: 1767,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/(components)/(contentlayout)/ats/recruiters/page.tsx",
        lineNumber: 826,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Recruiters, "wQWvtMJ9mwXiZL+YejOMz/fGcDE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTable"]
    ];
});
_c = Recruiters;
const __TURBOPACK__default__export__ = Recruiters;
var _c;
__turbopack_context__.k.register(_c, "Recruiters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28components%29_%28contentlayout%29_ats_recruiters_page_tsx_48268c30._.js.map