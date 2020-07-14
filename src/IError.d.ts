export interface IError {
    // HTTP error code
    status: number;
    detail: {
        // The Id of the filter that threw the error
        id: number;
        // The component of the filter where the error originates
        failure: Failure;
        // the error message
        message: string;
    };
}


type Failure = 
    "SUBJECT" |
    "PREDICATE" |
    "VALUE" |
    // if the error is not particular to a filter, rather the composition of the expression (invalid operator, un-matched parenthesis etc.)
    "GENERAL";