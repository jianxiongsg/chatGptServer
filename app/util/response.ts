
interface ResponseOptions {
    code: string;
    message: string;
    data?: any;
    status?: number;
}
export class ResponseError extends Error {
    static isResponseError(err: any): err is ResponseError {
        return 'code' in err && 'message' in err;
    }

    data?: any;
    code: string;

    constructor(options: ResponseOptions) {
        super(options.message);
        const { code = '', data } = options;
        this.code = code;
        this.data = data;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError);
        }
    }
}
