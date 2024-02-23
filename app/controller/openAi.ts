import { Controller } from 'egg';
import OpenAI from "openai";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { PassThrough } from "stream";
import { IncomingMessage } from "http"


export default class OpenAiController extends Controller {
    public async listModels() {
        const { ctx } = this;
        ctx.set('Content-Type', 'text/plain; charset=utf-8');
        const models = await ctx.service.openAiServer.getModels();
        ctx.body = models;
        ctx.status = 200;
    }
    public async getModel() {
        const { ctx } = this;
        ctx.set('Content-Type', 'text/plain; charset=utf-8');
        const models = await ctx.service.openAiServer.getModels();
        ctx.body = models;
        ctx.status = 200;
    }
    public async createChatCompletion() {
        const { ctx } = this;
        ctx.logger.debug('ctx', ctx.query);
        // 设置响应头
        ctx.set('Content-Type', 'text/plain; charset=utf-8'); // 返回utf-8的数据，避免出现乱码
        ctx.set('Cache-Control', 'no-cache'); // 禁止前端缓存响应，保证前端获得实时最新的数据
        ctx.set('Connection', 'keep-alive'); // 保持服务端和前端连接
        ctx.set('X-Accel-Buffering', 'no'); // // 关闭 Nginx 的缓冲

        // 设置允许的请求方法
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        // 设置允许的请求头
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // 设置是否允许发送Cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');

        const messages: any[] = [];
        messages.push({ "role": 'user', "content": ctx.query.talk });
        const completion = await ctx.service.openAiServer.createChatCompletion("gpt-3.5-turbo", messages);
        const stream = (completion as any).toReadableStream();
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
        ctx.set('Content-Type', 'text/event-stream'); // 返回utf-8的数据，避免出现乱码
        ctx.set('Cache-Control', 'no-cache'); // 禁止前端缓存响应，保证前端获得实时最新的数据
        ctx.set('Connection', 'keep-alive'); // 保持服务端和前端连接
        ctx.set('X-Accel-Buffering', 'no'); // // 关闭 Nginx 的缓冲

        // 设置允许的请求方法
        ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
        // 设置允许的请求头
        ctx.set('Access-Control-Allow-Headers', '*');

        ctx.set('Access-Control-Allow-Credentials', 'true');

        const messages: any[] = ctx.request.body.messages;
        const completion = await ctx.service.openAiServer.createChatCompletion("gpt-3.5-turbo", messages);

        const reader = (completion as any).toReadableStream().getReader();
        const stream = new PassThrough();
        ctx.body = stream;
        function read() {
            reader.read().then((data: any) => {
                const { done, value } = data;
                if (done) {
                    stream.destroy();
                    ctx.res.end();
                    ctx.status = 200;
                    return;
                }
                if (value && ctx.res.writable) {
                    const utf8Val = ctx.helper.uint8ArrayToUtf8(value);
                    const data = JSON.parse(utf8Val);
                    const content = data?.choices?.[0].delta?.content;
                    if (content) {
                        stream.write(`data:${JSON.stringify({ msg: content })}\n\n`)
                    };
                }
                read();
            }).catch((error) => {
                ctx.logger.error(error);
            });
        }

        read();
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
        // let resultstring = response.data.choices[0].message.content;
        // let resultname = response.data.choices[0].message.role;
        // let result = { "role": resultname, "content": resultstring };
        ctx.body = response;
    }

}