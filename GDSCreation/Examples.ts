/**
 * NOTES:
 * 
 * - Superflous parenthesis in an expression like "(((Borheole Name = BH001)))" is valid GDSQL
 * and may be modelled in this structure by treating each group object as a set of parenthesis and 
 * nesting them through the component array. The only reason I see for doing this is to ensure the
 * query spec string persisted is identical to what the user inputted.
 * 
 */

// GDSQL: Borehole Name = BH00_
const EXAMPLE_ONE: IRequest_GDSCreation = {
    name: "Mr. House",
    structure: {
        parts: [{
            type: "Filters",
            filters: [{
                s: "Borehole Name",
                p: "=",
                v: "BH00_"
            }]
        }]
    }
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1
const EXAMPLE_TWO: IRequest_GDSCreation = {
    name: "Caesar",
    structure: {
        parts: [{
            type: "Filters",
            filters: [{
                s: "Borehole Name",
                p: "=",
                v: "BH00_"
            },
            {
                s: "Collar Location",
                p: "WITHIN",
                v: "polygon1"
            }],
            filterJoiner: "AND"
        }],
    }
}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND COLLAR LOCATION WITHIN polygon1
const EXAMPLE_THREE: IRequest_GDSCreation = {
    name: "Yes Man",
    structure: {
        parts: [{
            type: "Group",
            parts: [{
                type: "Filters",
                filters: [{
                    s: "Borehole Name",
                    p: "=",
                    v: "BH00_"
                },{
                    s: "Collar Location",
                    p: "NOT WITHIN",
                    v: "polygon1"
                }],
                filterJoiner: "OR"
            }]
        },{
            type: "Filters",
            filters: [{
                s: "Collar Location",
                p: "WITHIN",
                v: "polygon1"
            }]
        }],
        partJoiner: "AND",
    }
}

interface Component {

}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) 
// AND Collar Location WITHIN polygon1 OR Borehole Name = BH00% AND Collar Location NOT WITHIN polygon1
const EXAMPLE_FOUR: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: {
        parts: [{
            type: "Group",
            parts: [{
                type: "Filters",
                filters: [{
                    s: "Borehole Name",
                    p: "=",
                    v: "BH00_"
                },{
                    s: "Collar Location",
                    p: "NOT WITHIN",
                    v: "polygon1"
                }],
                filterJoiner: "OR"
            }],
        },{
            type: "Filters",
            filters: [{
                s: "Collar Location",
                p: "WITHIN",
                v: "polygon1"
            },{
                s: "Borehole Name",
                p: "=",
                v: "BH00%"
            }],
            filterJoiner: "OR",
            linkedFilters: {
                type: "Filters",
                filters: [{
                    s: "Collar Location",
                    p: "NOT WITHIN",
                    v: "polygon1"
                }]
            },
            linkedFiltersJoiner: "AND"
        }],
        partJoiner: "AND",
    }
}

// GDSQL: ((Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND Collar Location NOT WITHIN polygon1)
const EXAMPLE_SIX: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: {
        parts: [{
            type: "Group",
            parts: [{
                type: "Group",
                parts: [{
                    type: "Filters",
                    filters: [{
                        s: "Borehole Name",
                        p: "=",
                        v: "BH00_"
                    },{
                        s: "Collar Location",
                        p: "NOT WITHIN",
                        v: "polygon1"
                    }],
                    filterJoiner: "OR"
                }],
            },{
                type: "Filters",
                filters: [{
                    s: "Collar Location",
                    p: "NOT WITHIN",
                    v: "polygon1"
                }]
            }],
            partJoiner: "AND"
        }]
    }
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1 OR Borehole Name = BH004
const EXAMPLE_SEVEN: IRequest_GDSCreation = {
    name: "Brotherhood of Steel",
    structure: {
        parts: [{
            type: "Filters",
            filters: [{
                s: "Borehole Name",
                p: "=",
                v: "BH00_"
            },
            {
                s: "Collar Location",
                p: "WITHIN",
                v: "polygon1"
            }],
            filterJoiner: "AND",
            linkedFilters: {
                type: "Filters",
                filters: [{
                    s: "Borehole Name",
                    p: "=",
                    v: "BH004"
                }]
            },
            linkedFiltersJoiner: "OR"
        }],
    }
}
