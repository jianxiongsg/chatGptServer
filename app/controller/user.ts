import { Controller } from 'egg';
import OpenAI from "openai";
import { HttpsProxyAgent } from 'https-proxy-agent';
// const http = require('http');


export default class UserController extends Controller {
    public async login() {
        const { ctx } = this;
        ctx.logger.debug('login', ctx.query);
        const { userName } = ctx.query;
        const info = ctx.service.userServer.login({ userName });
        ctx.body = info;
        ctx.status = 200;
    }
    public async register() {
        const { ctx } = this;
        ctx.logger.debug('register', ctx.query);
        const info = ctx.service.userServer.register(ctx.query);
        ctx.body = { success: true };
        ctx.status = 200;
    }
}
