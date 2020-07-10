
interface IRequest_GDSCreationAlternative {
    name: string;
    structure: ILink[];
}

/**
 * ILink describes an IPart and it's associated linkage to the ensemble expression.
 */
interface ILink {
    /**
     * The operator that joins the part tree to the immediate left part. 
     * Optional if first filter expression in expression, as they'll be no sub-expression to the left to join to.
     */
    joiner?: Operator;
    /**
     * The Part
     */
    part: IPart;
}

/**
 * IPart describes a a series of filters and their joining operators. IPart is recursive to
 * allow nested queries to be structured.
 */
interface IPart {
    /**
     * Whether or not this level of the expression has precedence (parenthesis).
     * Default to false if undefined.
     */
    bracketed?: boolean;
    /**
     * Array of filters, these filters will all be joined by THE SAME OPERATOR. Mixing operators requires a nested Filters Object.
     * In the UI, this would be the group of filters.
     */
     filters?: IFilter[];
    /**
     * The operator that joins the filters described above.
     */
    filterJoiner?: Operator;
    /**
     * A nested ILink object. All child linked parts have this IPart as the parent.
     * 
     * If this parent is bracketed/has precedence, then all child ILinks will be within
     * this precedence group. 
     */
    linkedParts?: ILink[];
}

