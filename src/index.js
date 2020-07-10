"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Examples_1 = require("./GDSCreation/Examples");
var processStructure = function (links) {
    var acc = [];
    links.forEach(function (link) { return acc.push.apply(acc, processLink(link)); });
    return acc.join("");
};
var processLink = function (link) {
    var subExpr = [];
    if (link.joiner)
        subExpr.push(" " + link.joiner + " ");
    subExpr.push.apply(subExpr, processPart(link.part));
    return subExpr;
};
var processPart = function (part) {
    var _a;
    var acc = [];
    // open bracket
    if (part.bracketed)
        acc.push("(");
    // filter group
    if (part.filters && part.filters.length > 0) {
        part.filters.forEach(function (filter, i) {
            acc.push(filter.s + " " + filter.p + " " + filter.v);
            if (i == 0 && part.filters && part.filters.length > 1)
                acc.push(" " + part.filterJoiner + " ");
        });
    }
    // linked parts
    (_a = part.linkedParts) === null || _a === void 0 ? void 0 : _a.forEach(function (link) { return acc.push.apply(acc, processLink(link)); });
    // close bracket
    if (part.bracketed)
        acc.push(")");
    return acc;
};
console.log("Example One: " + processStructure(Examples_1.EXAMPLE_ONE.structure));
console.log("Example Two: " + processStructure(Examples_1.EXAMPLE_TWO.structure));
console.log("Example Three: " + processStructure(Examples_1.EXAMPLE_THREE.structure));
console.log("Example Four: " + processStructure(Examples_1.EXAMPLE_FOUR.structure));
console.log("Example Five: " + processStructure(Examples_1.EXAMPLE_FIVE.structure));
console.log("Example Six: " + processStructure(Examples_1.EXAMPLE_SIX.structure));
console.log("Example Seven: " + processStructure(Examples_1.EXAMPLE_SEVEN.structure));
//# sourceMappingURL=index.js.map