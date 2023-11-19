import { Controller } from 'egg';
import OpenAI from "openai";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { PassThrough } from "stream";
import { IncomingMessage } from "http"


export default class OpenAiController extends Controller {
    public async listModels() {
        const { ctx } = this;
        const models = await ctx.service.openAiServer.getModels();
        ctx.body = models;
    }
    public async getModel() {
        const { ctx } = this;
        const models = await ctx.service.openAiServer.getModel();
        ctx.body = models;
    }
    public async createChatCompletion() {
        const { ctx } = this;
        ctx.logger.debug('ctx', ctx.query);
        // 设置响应头
        ctx.set('Content-Type', 'text/plain; charset=utf-8'); // 返回utf-8的数据，避免出现乱码
        ctx.set('Cache-Control', 'no-cache'); // 禁止前端缓存响应，保证前端获得实时最新的数据
        ctx.set('Connection', 'keep-alive'); // 保持服务端和前端连接
        ctx.set('X-Accel-Buffering', 'no'); // // 关闭 Nginx 的缓冲

        // 设置允许跨域的域名，可以使用通配符 "*" 表示允许所有域名
        ctx.set('Access-Control-Allow-Origin', '*');
        // 设置允许的请求方法
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        // 设置允许的请求头
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // 设置是否允许发送Cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');

        const messages: any[] = [];
        messages.push({ "role": 'user', "content": ctx.query.talk });
        const completion = await ctx.service.openAiServer.createChatCompletion("gpt-3.5-turbo", messages);
        const stream = completion.toReadableStream();
        const reader = stream.getReader();
        let done = false;
        while (!done) {
            const { value, done: readerDone } = await reader.read();
            if (value && ctx.res.writable) {
                if (ctx.res.writable) {
                    const utf8Val = ctx.helper.uint8ArrayToUtf8(value);
                    const data = JSON.parse(utf8Val);
                    const content = data?.choices?.[0].delta?.content;
                    ctx.logger.info('value get', content);
                    if (value) ctx.res.write(value);
                    // ctx.res.write(value);
                }
            }
            done = readerDone
        }
        ctx.res.end();
        ctx.status = 200;
    }
    public async createChatCompletionPost() {
        const { ctx } = this;
        ctx.logger.debug('ctx', ctx.request.body);
        // 设置响应头
        ctx.res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": '*',
        })
        // ctx.set('Content-Type', 'text/event-stream'); // 返回utf-8的数据，避免出现乱码
        // ctx.set('Cache-Control', 'no-cache'); // 禁止前端缓存响应，保证前端获得实时最新的数据
        // ctx.set('Connection', 'keep-alive'); // 保持服务端和前端连接
        // ctx.set('X-Accel-Buffering', 'no'); // // 关闭 Nginx 的缓冲

        // 设置允许跨域的域名，可以使用通配符 "*" 表示允许所有域名
        ctx.set('Access-Control-Allow-Origin', '*');
        // 设置允许的请求方法
        ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
        // 设置允许的请求头
        ctx.set('Access-Control-Allow-Headers', 'access-control-allow-credentials,Content-Type, Authorization, x-requested-with');
        // 设置是否允许发送Cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');
        const stream = new PassThrough();
        const encoder = new TextEncoder();
        // const uint8Array = encoder.encode(JSON.stringify({ aa: 1 }));
        // if (content) ctx.res.write(content);
        // ctx.res.write(uint8Array);
        ctx.body = stream;
        for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟每秒生成一次数据
            console.log('.......>>', i, Date.now());
            ctx.res.write(encoder.encode(JSON.stringify({ aa: i })));
        }
        // stream.end();
        ctx.res.end();
        ctx.status = 200;

        // const messages: any[] = ctx.request.body.messages.slice(-1);
        // // messages.push({ "role": 'user', "content": ctx.request.body.messages[] });
        // const completion = await ctx.service.openAiServer.createChatCompletion("gpt-3.5-turbo", messages);
        // const reader = completion.toReadableStream().getReader();
        // const stream = new PassThrough();
        // let done = false;
        // console.log('.............stream', stream)
        // ctx.body = stream;
        // while (!done) {
        //     const { value, done: readerDone } = await reader.read();
        //     if (value && ctx.res.writable) {
        //         if (ctx.res.writable) {
        //             const utf8Val = ctx.helper.uint8ArrayToUtf8(value);
        //             const data = JSON.parse(utf8Val);
        //             const jsonString = JSON.stringify({ data: data });
        //             // 创建一个 TextEncoder 对象
        //             const encoder = new TextEncoder();

        //             // 将字符串编码为 Uint8Array
        //             const uint8Array = encoder.encode(jsonString);
        //             const content = data?.choices?.[0].delta?.content;
        //             ctx.logger.info('value post', content);
        //             // if (content) ctx.res.write(content);
        //             if (value) stream.write(value);
        //             // ctx.res.write(value);
        //         }
        //     }
        //     done = readerDone
        // }
        // ctx.res.end();
        // ctx.status = 200;
    }
    public async createCompletion() {

    }

    public async index() {
        const { ctx } = this;
        ctx.logger.debug('ctx', ctx.query);
        const messages: any[] = [];
        const apiKey = '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'
        const openai = new OpenAI({
            apiKey: apiKey,//process.env.OPENAI_API_KEY,
            // baseURL: 'https://api.openai.com/v1/chat/completions',
            httpAgent: new HttpsProxyAgent('http://127.0.0.1:7890'),
            // httpAgent: new http.Agent({
            //   // keepAlive: true,
            //   host: '127.0.0.1',
            //   port: 7890,
            // }),
            defaultHeaders: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + apiKey }
        });
        messages.push({ "role": 'user', "content": ctx.query.talk });
        // const question = JSON.parse(JSON.stringify(histories));
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0,
            max_tokens: 256,
        });
        console.log('res', response)
        // let resultstring = response.data.choices[0].message.content;
        // let resultname = response.data.choices[0].message.role;
        // let result = { "role": resultname, "content": resultstring };
        ctx.body = response;
    }


}