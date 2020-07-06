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
        components: [{
            type: "Filters",
            filters: [{
                subject: "Borehole Name",
                predicate: "=",
                value: "BH00_"
            }]
        }]
    }
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1
const EXAMPLE_TWO: IRequest_GDSCreation = {
    name: "Caesar",
    structure: {
        components: [{
            type: "Filters",
            filters: [{
                subject: "Borehole Name",
                predicate: "=",
                value: "BH00_"
            },
            {
                subject: "Collar Location",
                predicate: "WITHIN",
                value: "polygon1"
            }],
            filterOperator: "AND"
        }],
    }
}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND COLLAR LOCATION WITHIN polygon1
const EXAMPLE_THREE: IRequest_GDSCreation = {
    name: "Yes Man",
    structure: {
        components: [{
            type: "Group",
            components: [{
                type: "Filters",
                filters: [{
                    subject: "Borehole Name",
                    predicate: "=",
                    value: "BH00_"
                },{
                    subject: "Collar Location",
                    predicate: "NOT WITHIN",
                    value: "polygon1"
                }],
                filterOperator: "OR"
            }]
        },{
            type: "Filters",
            filters: [{
                subject: "Collar Location",
                predicate: "WITHIN",
                value: "polygon1"
            }]
        }],
        groupOperator: "AND",
    }
}

interface Component {

}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) 
// AND Collar Location WITHIN polygon1 OR Borehole Name = BH00% AND Collar Location NOT WITHIN polygon1
const EXAMPLE_FOUR: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: {
        components: [{
            type: "Group",
            components: [{
                type: "Filters",
                filters: [{
                    subject: "Borehole Name",
                    predicate: "=",
                    value: "BH00_"
                },{
                    subject: "Collar Location",
                    predicate: "NOT WITHIN",
                    value: "polygon1"
                }],
                filterOperator: "OR"
            }],
            groupOperator: "AND"
        },{
            type: "Filters",
            filters: [{
                subject: "Collar Location",
                predicate: "WITHIN",
                value: "polygon1"
            },{
                subject: "Borehole Name",
                predicate: "=",
                value: "BH00%"
            }],
            filterOperator: "OR",
            linkedFilters: {
                type: "Filters",
                filters: [{
                    subject: "Collar Location",
                    predicate: "NOT WITHIN",
                    value: "polygon1"
                }]
            },
            linkedFiltersOperator: "AND"
        }],
        groupOperator: "AND",
    }
}

// GDSQL: ((Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND Collar Location NOT WITHIN polygon1)
const EXAMPLE_SIX: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: {
        components: [{
            type: "Group",
            components: [{
                type: "Group",
                components: [{
                    type: "Filters",
                    filters: [{
                        subject: "Borehole Name",
                        predicate: "=",
                        value: "BH00_"
                    },{
                        subject: "Collar Location",
                        predicate: "NOT WITHIN",
                        value: "polygon1"
                    }],
                    filterOperator: "OR"
                }],
            },{
                type: "Filters",
                filters: [{
                    subject: "Borehole Name",
                    predicate: "=",
                    value: "BH00_"
                }]
            }],
            groupOperator: "AND"
        }]
    }
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1 OR Borehole Name = BH004
const EXAMPLE_SEVEN: IRequest_GDSCreation = {
    name: "Brotherhood of Steel",
    structure: {
        components: [{
            type: "Filters",
            filters: [{
                subject: "Borehole Name",
                predicate: "=",
                value: "BH00_"
            },
            {
                subject: "Collar Location",
                predicate: "WITHIN",
                value: "polygon1"
            }],
            filterOperator: "AND",
            linkedFilters: {
                type: "Filters",
                filters: [{
                    subject: "Borehole Name",
                    predicate: "=",
                    value: "BH004"
                }]
            },
            linkedFiltersOperator: "OR"
        }],
    }
}
