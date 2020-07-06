
/**
 * The Body of the request
 */
interface IRequest_GDSCreation {
    name: string;
    structure: IGroupBase;
}

// The root of the Query Structure
interface IGroupBase {
    /**
     * The structure divides the expression into left and right parts.
     * 
     * - IGroup describes a sub-expression that is wrapped with parenthesis "(Borehole Name = BH001 AND Collar Location WITHIN polygon1)"
     * - IFilters describes a sub-expression that is not wrapped with parenthesis "Borehole Name = BH001 AND Collar Location WITHIN polygon1"
     * 
     * Because the left and right hand sides are sub-expressions, these objects recurse down splitting each sub-expression into further reduced left and right
     * expressions until the entire expression is deconstructed.
     */
    parts: (IFilters | IGroup)[];
    /**
     * top level Components described above are joined together by a logical operator indicated here.
     */
    partJoiner?: Operator;
}

/**
 * IFilters describes a sub-expression that is not wrapped with parenthesis "Borehole Name = BH001 AND Collar Location WITHIN polygon1".
 */
interface IFilters {
    // Type to aide in understanding the residing component array
    type: ComponentType;
    // Array of filters, these filters will all be joined by THE SAME OPERATOR. Mixing operators requires a nested Filters Object.
    filters: IFilter[];
    // The operator that joins the filters described above.
    filterJoiner?: Operator;
    // A nested IFilters object, to allow linking of filters using a different operator
    linkedFilters?: IFilters;
    // The operator that joins "linkedFilters" sub expression to "filters" sub expression
    linkedFiltersJoiner?: Operator;
}

/**
 * A singular Filter
 */
interface IFilter {
    s: SubjectFilters;
    p: Predicates;
    v: SubjectValue;
}

/**
 * Group interface including type property
 */
interface IGroup extends IGroupBase {
    type: ComponentType;
}

// Grammar is case insensitive

type ComponentType = "Filters" | "Group";
type Operator = "AND" | "OR";


type SubjectFilters = "Borehole Name" | "Collar Location";
type Predicates = "WITHIN" | "NOT WITHIN" | "<" | "<=" | "=" | "!=" | ">=" | ">";
type SubjectValue = string | number;
