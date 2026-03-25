module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LibraryGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/DigitalLibraryProject/digital-library-ui/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function getImageUrl(collectionId, recordId, fileName) {
    return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}`;
}
function LibraryGrid({ items }) {
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const boundaryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Artificially tile the items to create a massive repeating grid for the "infinite" feel
    // We duplicate the array 16 times to fill a large draggable plane
    const tiledItems = Array(16).fill(items).flat().map((item, index)=>({
            ...item,
            uniqueGridId: `${item.id}-${index}` // Ensure React keys remain unique
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-screen h-screen overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-3xl font-serif italic tracking-tighter pointer-events-auto",
                        children: "Logo"
                    }, void 0, false, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6 pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 text-sm font-medium hover:opacity-50 transition-opacity",
                                children: [
                                    "Filter",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "10",
                                        height: "6",
                                        viewBox: "0 0 10 6",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M1 1L5 5L9 1",
                                            stroke: "currentColor",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-black text-white px-6 py-2.5 text-sm font-bold hover:bg-neutral-800 transition-colors",
                                children: "Search"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: boundaryRef,
                className: "absolute inset-0 z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    drag: true,
                    dragConstraints: boundaryRef,
                    dragElastic: 0.1,
                    whileDrag: {
                        cursor: "grabbing"
                    },
                    // Create a massive plane larger than the viewport
                    className: "w-[300vw] h-[300vh] sm:w-[200vw] sm:h-[200vh] absolute top-[-50vh] left-[-50vw] cursor-grab flex flex-wrap content-start p-32 gap-8 md:gap-16",
                    children: tiledItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onDoubleClick: ()=>setSelectedItem(item),
                            // Width calculations to create a responsive grid on a massive plane
                            // Crucial: aspect-square enforces the 1:1 ratio
                            className: "relative w-[40vw] sm:w-[20vw] lg:w-[12vw] aspect-square bg-neutral-200 group overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl",
                            children: item.cover_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: getImageUrl(item.collectionId, item.id, item.cover_image),
                                alt: item.title,
                                fill: true,
                                unoptimized: true,
                                className: "object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 78,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-8 h-8 text-neutral-300",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 1,
                                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                        lineNumber: 88,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                    lineNumber: 87,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 86,
                                columnNumber: 17
                            }, this)
                        }, item.uniqueGridId, false, {
                            fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "fixed bottom-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center px-8 py-6 z-50 text-xs font-bold pointer-events-none bg-gradient-to-t from-white/80 to-transparent",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto mb-4 sm:mb-0",
                        children: "Digital Library Grid Co."
                    }, void 0, false, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-8 pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hover:underline",
                                children: "Return home"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hover:underline",
                                children: "About us"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hover:underline",
                                children: "Contact support"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hover:underline",
                                children: "Privacy policy"
                            }, void 0, false, {
                                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            selectedItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md p-4",
                onClick: ()=>setSelectedItem(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-neutral-200 shadow-2xl p-8 max-w-lg w-full text-center",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-4",
                            children: selectedItem.title
                        }, void 0, false, {
                            fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-neutral-500 mb-8",
                            children: "Data payload ready for extraction."
                        }, void 0, false, {
                            fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$DigitalLibraryProject$2f$digital$2d$library$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedItem(null),
                            className: "bg-black text-white px-6 py-2 text-sm font-bold w-full",
                            children: "Close Modal"
                        }, void 0, false, {
                            fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                    lineNumber: 112,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/DigitalLibraryProject/digital-library-ui/src/components/LibraryGrid.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79d6e7f1._.js.map