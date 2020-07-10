import { 
    EXAMPLE_ONE,
    EXAMPLE_TWO,
    EXAMPLE_THREE,
    EXAMPLE_FOUR,
    EXAMPLE_FIVE,
    EXAMPLE_SIX,
    EXAMPLE_SEVEN 
} from "./GDSCreation/Examples";

const processStructure = (links: ILink[]): string => {
    let acc: string[] = [];
    links.forEach(link => acc.push(...processLink(link)));
    return acc.join("");
}

const processLink = (link: ILink): string[] => {
    let subExpr: string[] = [];
    if (link.joiner) subExpr.push(` ${link.joiner} `);

    subExpr.push(...processPart(link.part));

    return subExpr;
}

const processPart = (part: IPart): string[] => {
    let acc: string[] = [];

    // open bracket
    if (part.bracketed) acc.push("(");

    // filter group
    if (part.filters && part.filters.length > 0) {
        part.filters.forEach((filter, i) => {
            acc.push(`${filter.s} ${filter.p} ${filter.v}`);
            if (i == 0 && part.filters && part.filters.length > 1) 
                acc.push(` ${part.filterJoiner} `);
        });
    }

    // linked parts
    part.linkedParts?.forEach(link => acc.push(...processLink(link)));

    // close bracket
    if (part.bracketed) acc.push(")");

    return acc;
}

console.log(`Example One: ${processStructure(EXAMPLE_ONE.structure)}`);

console.log(`Example Two: ${processStructure(EXAMPLE_TWO.structure)}`);

console.log(`Example Three: ${processStructure(EXAMPLE_THREE.structure)}`);

console.log(`Example Four: ${processStructure(EXAMPLE_FOUR.structure)}`);

console.log(`Example Five: ${processStructure(EXAMPLE_FIVE.structure)}`);

console.log(`Example Six: ${processStructure(EXAMPLE_SIX.structure)}`);

console.log(`Example Seven: ${processStructure(EXAMPLE_SEVEN.structure)}`);
