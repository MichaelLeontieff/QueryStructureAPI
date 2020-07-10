export interface IError {
    // HTTP error code
    status: number;
    detail: {
        // The Id of the filter that threw the error
        id: number;
        // The componnet of the filter where the error originates
        failure: Failure;
        // the error message
        message: string;
    };
}

type Failure = "SUBJECT" | "PREDICATE" | "VALUE";