
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


// 1xx - 信息响应
// 100 Continue: 初始的请求已经接受，客户端应当继续发送请求的其余部分。
// 101 Switching Protocols: 客户端请求服务器根据请求头中的字段切换协议。
// 102 Processing (WebDAV): 服务器已接受并正在处理请求，但无响应可用。
// 103 Early Hints: 用于提前提供响应头以优化性能。
// 2xx - 成功
// 200 OK: 请求成功。
// 201 Created: 请求已成功，并且新的资源已经创建。
// 202 Accepted: 请求已接受，但尚未处理。
// 203 Non-Authoritative Information: 服务器已成功处理了请求，但返回了可能来自另一来源的信息。
// 204 No Content: 服务器成功处理了请求，没有返回任何内容。
// 205 Reset Content: 服务器成功处理了请求，用户代理应重置文档视图。
// 206 Partial Content: 服务器已成功处理部分GET请求。
// 207 Multi-Status (WebDAV): 代表之后的消息体将是一个XML消息，并且可能依赖于多个请求的结果。
// 208 Already Reported (WebDAV): 成员已在之前的（单独的）208响应中被枚举，并且未被再次包括。
// 226 IM Used: 服务器已完成请求，响应是对当前实例应用的一组实例操作结果的表示。
// 3xx - 重定向
// 300 Multiple Choices: 针对请求有多种选择。
// 301 Moved Permanently: 请求的页面已永久移至新URL。
// 302 Found: 请求的页面暂时跳转到新的URL。
// 303 See Other: 对于当前请求的响应可以在另一个URI上找到。
// 304 Not Modified: 自从上次请求后，请求的网页未修改过。
// 305 Use Proxy: 请求者只能使用代理访问请求的网页。
// 307 Temporary Redirect: 请求的页面临时移动到新的URL。
// 308 Permanent Redirect: 请求的资源现在永久移动到另一个URI。
// 4xx - 客户端错误
// 400 Bad Request: 服务器无法理解请求格式。
// 401 Unauthorized: 请求没有进行身份验证或验证不正确。
// 402 Payment Required: 保留状态码，将来可能被使用。
// 403 Forbidden: 服务器拒绝请求。
// 404 Not Found: 服务器找不到请求的网页。
// 405 Method Not Allowed: 禁用请求中指定的方法。
// 406 Not Acceptable: 无法使用请求的内容特性响应请求的网页。
// 407 Proxy Authentication Required: 请求者需要使用代理进行验证。
// 408 Request Timeout: 服务器等候请求时发生超时。
// 409 Conflict: 请求与服务器当前状态冲突。
// 410 Gone: 请求的资源已被永久删除。
// 411 Length Required: 服务器不接受不含有效内容长度头字段的请求。
// 412 Precondition Failed: 服务器没有满足请求预设的条件。
// 413 Payload Too Large: 请求实体过大。
// 414 URI Too Long: 请求的URI过长，服务器无法处理。
// 415 Unsupported Media Type: 请求的格式不受请求页面的支持。
// 416 Range Not Satisfiable: 客户端请求的范围无效。
// 417 Expectation Failed: 服务器无法满足Expect请求头字段的要求。
// 418 I'm a teapot (April Fools' Day joke): 服务器拒绝尝试用咖啡壶煮咖啡。
// 421 Misdirected Request: 请求被定向到无法产生响应的服务器。
// 422 Unprocessable Entity (WebDAV): 请求格式正确，但由于语义错误无法响应。
// 423 Locked (WebDAV): 资源被锁定。
// 424 Failed Dependency (WebDAV): 请求失败，因为之前的请求失败。
// 425 Too Early: 服务器不愿意冒风险去处理可能重播的请求。
// 426 Upgrade Required: 客户端应切换到TLS/1.0。
// 428 Precondition Required: 原服务器要求该请求是有条件的。
// 429 Too Many Requests: 用户在给定的时间��发送了太多请求。
// 431 Request Header Fields Too Large: 服务器不愿意处理请求，因为头字段过大。
// 451 Unavailable For Legal Reasons: 用户请求的资源由于法律原因不可用。
// 5xx - 服务器错误
// 500 Internal Server Error: 服务器遇到了一个未知的错误。
// 501 Not Implemented: 服务器不支持请求的功能。
// 502 Bad Gateway: 服务器作为网关或代理，从上游服务器收到了无效的响应。
// 503 Service Unavailable: 服务器目前无法使用（超载或维护）。
// 504 Gateway Timeout: 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
// 505 HTTP Version Not Supported: 服务器不支持请求中使用的HTTP协议版本。
// 506 Variant Also Negotiates: 透明内容协商导致循环引用。
// 507 Insufficient Storage (WebDAV): 服务器无法存储完成请求所必须的内容。
// 508 Loop Detected (WebDAV): 服务器在处理请求时检测到无限循环。
// 510 Not Extended: 请求的进一步扩展是必需的。
// 511 Network Authentication Required: 客户端需要进行网络认证才能完成请求。