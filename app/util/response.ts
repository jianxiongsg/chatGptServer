
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
    status: number;
    message: string;
    constructor(options: ResponseOptions) {
        super(options.message);
        const { code = '', data, status, message } = options;
        this.code = code;
        this.data = data;
        this.message = message;
        this.status = status || 500;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError);
        }
    }
}
