/**
 * Error Payload
 * 
 * HTTP 400 = Validation Error, body will contain detail
 * HTTP 500 = Execute Error
 */
export interface IError {
    /**
     * The error message
     * 
     * - If the error occurred at the filter level, a simple error fit for UI output
     * will be returned.
     * 
     * - If a more general ParseException occurred, that trace will be returned. Unlike filter-level
     * errors, these errors are raised with respect to a string GDSQL expression, not a query structure which
     * is less malleable to a query builder UI.
     */
    message: string;

    /**
     * The component of the expression where the error originated
     * 
     * - If a filter error, the part of the filter that failed parsing.
     * 
     * - If a more general error, then "GENERAL"
     */
    type?: ErrorTypes;

    // If the error was at the filter level (that could be represented in a UI)
    // then the Id of the filter that threw the error will be contained here
    filterId?: number;

}

type ErrorTypes = 
    "SUBJECT" |
    "PREDICATE" |
    "VALUE" |
    "GENERAL"