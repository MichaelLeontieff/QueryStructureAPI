import { IError } from "../IError";

interface IResponse_GDSCreation {
    error?: IError;
    body?: {
        physicalid: string;
    }
}