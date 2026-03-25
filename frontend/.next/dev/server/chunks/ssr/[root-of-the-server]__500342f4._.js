module.exports = [
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/lib/pocketbase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/pocketbase/dist/pocketbase.es.mjs [app-rsc] (ecmascript)");
;
const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]('http://127.0.0.1:8090');
const __TURBOPACK__default__export__ = pb;
}),
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$src$2f$lib$2f$pocketbase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/src/lib/pocketbase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
function getImageUrl(collectionId, recordId, filename) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$src$2f$lib$2f$pocketbase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].baseUrl}/api/files/${collectionId}/${recordId}/${filename}`;
}
async function Home() {
    // 3. Fetch the data from your local PocketBase server
    // We use getFullList to retrieve all donated "books"
    const records = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$src$2f$lib$2f$pocketbase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].collection('library_items').getFullList({
        sort: '-created',
        expand: 'tags'
    });
    // 4. Render the visual grid
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-12 bg-gray-50 text-gray-900 font-mono",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-10 border-b border-neutral-300 pb-4 flex justify-between items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold tracking-tighter uppercase",
                                children: "Digital Library Node"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                lineNumber: 43,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-neutral-500 mt-1",
                                children: "Computational Design & Material Index"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                lineNumber: 44,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-400",
                        children: [
                            "Total Items: ",
                            records.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",
                children: records.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full p-6 border border-dashed border-neutral-300 text-neutral-500 text-center",
                    children: "Awaiting data payload."
                }, void 0, false, {
                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                    lineNumber: 51,
                    columnNumber: 18
                }, this) : records.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "group bg-white border border-neutral-200 overflow-hidden hover:border-neutral-400 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full aspect-[4/3] bg-neutral-100 border-b border-neutral-200",
                                children: item.cover_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    src: getImageUrl(item.collectionId, item.id, item.cover_image),
                                    alt: item.title,
                                    fill: true,
                                    unoptimized: true,
                                    className: "object-cover grayscale hover:grayscale-0 transition-all duration-500",
                                    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center text-neutral-300 text-xs uppercase tracking-widest",
                                    children: "No Image Data"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 26
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                lineNumber: 59,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold leading-tight",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 26
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-1 text-[10px] bg-black text-white uppercase tracking-widest shrink-0 ml-4",
                                                children: item.category.replace('_', ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5 mb-5",
                                        children: item.expand?.tags?.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5 text-[10px] border border-neutral-200 text-neutral-500 uppercase tracking-wider",
                                                children: tag.name
                                            }, tag.id, false, {
                                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 28
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4 border-t border-neutral-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-neutral-400 mb-1.5 uppercase tracking-widest flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Parameters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 28
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "JSON"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 26
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                className: "text-[10px] leading-relaxed bg-neutral-50 text-neutral-600 p-3 overflow-x-auto border border-neutral-100",
                                                children: JSON.stringify(item.properties, null, 2)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                                lineNumber: 77,
                                columnNumber: 22
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 20
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
}),
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__500342f4._.js.map