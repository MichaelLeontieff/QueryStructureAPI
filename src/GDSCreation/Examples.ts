/**
 * NOTES:
 * 
 * - Superfluous parenthesis in an expression like "(((Borheole Name = BH001)))" is valid GDSQL
 * and may be modelled in this structure by treating each group object as a set of parenthesis and 
 * nesting them through the component array. The only reason I see for doing this is to ensure the
 * query spec string persisted is identical to what the user inputted.
 * 
 */

// GDSQL: Borehole Name = BH00_
export const EXAMPLE_ONE: IRequest_GDSCreation = {
    name: "Mr. House",
    structure: [{
        part: {
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            }]
        }
    }]
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1
export const EXAMPLE_TWO: IRequest_GDSCreation = {
    name: "Caesar",
    structure: [{
        part: {
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            },{
                s: "Collar Location", p: "WITHIN", v: "polygon1"
            }],
            filterJoiner: "AND"
        },
    }]
}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND COLLAR LOCATION WITHIN polygon1
export const EXAMPLE_THREE: IRequest_GDSCreation = {
    name: "Yes Man",
    structure: [{
        part: {
            bracketed: true,
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            },{
                s: "Collar Location", p: "NOT WITHIN", v: "polygon1"
            }],
            filterJoiner: "OR"
        }
     }, {
        joiner: "AND", 
        part: {
            filters: [{
                s: "Collar Location", p: "WITHIN", v: "polygon1"
            }]
        }
    }]
}

// GDSQL: (Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) 
// AND Collar Location WITHIN polygon1 OR Borehole Name = BH00% AND Collar Location NOT WITHIN polygon1
export const EXAMPLE_FOUR: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: [{
        part: {
            bracketed: true,
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            },{
                s: "Collar Location", p: "NOT WITHIN", v: "polygon1"
            }],
            filterJoiner: "OR"
        }
    }, {
        joiner: "AND",
        part: {
            filters: [{
                s: "Collar Location", p: "WITHIN", v: "polygon1"
            },{
                s: "Borehole Name", p: "=", v: "BH00%"
            }],
            filterJoiner: "OR",
            linkedParts: [{
                joiner: "AND",
                part: {
                    filters: [{
                        s: "Collar Location", p: "NOT WITHIN", v: "polygon1"
                    }]
                } 
                
            }],
        },
    }]
}

// GDSQL: ((Borehole Name = BH00_ OR Collar Location NOT WITHIN polygon1) AND Collar Location NOT WITHIN polygon1)
export const EXAMPLE_FIVE: IRequest_GDSCreation = {
    name: "New California Republic",
    structure: [{
        part: {
            bracketed: true,
            linkedParts: [{
                part: {
                    bracketed: true,
                    filters: [{
                        s: "Borehole Name", p: "=", v: "BH00_"
                    },{
                        s: "Collar Location", p: "NOT WITHIN", v: "polygon1"
                    }],
                    filterJoiner: "OR"
                }
            },{
                joiner: "AND",
                part: {
                    filters: [{
                        s: "Collar Location", p: "NOT WITHIN", v: "polygon1"
                    }]
                }
            }]
        }
    }]
}

// GDSQL: Borehole Name = BH00_ AND Collar Location WITHIN polygon1 OR Borehole Name = BH004
export const EXAMPLE_SIX: IRequest_GDSCreation = {
    name: "Brotherhood of Steel",
    structure: [{
        part: {
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            },{
                s: "Collar Location", p: "WITHIN", v: "polygon1"
            }],
            filterJoiner: "AND",
            linkedParts: [{
                joiner: "OR",
                part: {
                    filters: [{
                        s: "Borehole Name", p: "=", v: "BH004"
                    }],
                    filterJoiner: "OR"
                }
            }],
        },
    }]
}

// GDSQL: Borehole Name = BH00_ AND (Collar Location WITHIN polygon1 AND Borehole Name = BH003%)
// OR Borehole Name = BH004
export const EXAMPLE_SEVEN: IRequest_GDSCreation = {
    name: "Enclave",
    structure: [{
        part: {
            bracketed: false,
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            }],
            linkedParts: [{
                joiner: "AND",
                part: {
                    bracketed: true,
                    filters: [{
                        s: "Collar Location", p: "WITHIN", v: "polygon1"
                    }, {
                        s: "Borehole Name", p: "=", v: "BH003%"
                    }],
                    filterJoiner: "AND"
                }
            }],
        }
    }, {
        joiner: "OR",
        part: {
            bracketed: false,
            filters: [{
                s: "Borehole Name", p: "=", v: "BH004"
            }]
        }
    }]
}


// GDSQL:
// (Borehole Name = BH00_ AND ((Collar Location WITHIN polygon1 AND Borehole Name = BH003%) 
// OR Borehole Name = BH001) OR Borehole Name = BH004)
export const EXAMPLE_EIGHT: IRequest_GDSCreation = {
    name: "The Great Khans",
    structure: [{
        part: {
            bracketed: true,
            filters: [{
                s: "Borehole Name", p: "=", v: "BH00_"
            }],
            linkedParts: [{
                joiner: "AND",
                part: {
                    bracketed: true,
                    linkedParts: [{
                        part: {
                            bracketed: true,
                            filters: [{
                                s: "Collar Location", p: "WITHIN", v: "polygon1"
                            }, {
                                s: "Borehole Name", p: "=", v: "BH003%"
                            }],
                        }
                    },{
                        joiner: "OR",
                        part: {
                            filters: [{
                                s: "Borehole Name", p: "=", v: "BH001"
                            }]
                        }
                    }]
                }
            },{
                joiner: "OR",
                part: {
                    filters: [{
                        s: "Borehole Name", p: "=", v: "BH004"
                    }],
                }
            }],
        }
    }]
}
