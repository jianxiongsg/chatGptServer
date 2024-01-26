import { Controller } from 'egg';
import { ResponseError } from '../util/response';
// import OpenAI from "openai";
// import { HttpsProxyAgent } from 'https-proxy-agent';
// const http = require('http');


export default class UserController extends Controller {
    public async login() {
        const { ctx } = this;
        // ctx.set('Access-Control-Allow-Credentials', 'true');
        ctx.logger.info('login', ctx.request.body);
        const { userName, password } = ctx.request.body;
        const info = await ctx.service.userServer.findOne(userName);
        if (!info) {
            throw new ResponseError({ code: "NEED_REGISTER", message: '账号查找失败，请先注册吧', status: 422 })
        }
        if (!ctx.helper.checkPassword(password, info.password)) {
            throw new ResponseError({ code: "CHECK_FAIL", message: '密码验证失败，请确认密码', status: 422 })
        }
        ctx.session.userInfo = { userName, password };
        ctx.body = { success: true, userName, id: info.id };
        ctx.status = 200;
    }
    public async register() {
        const { ctx } = this;
        ctx.set('Access-Control-Allow-Credentials', 'true');
        ctx.logger.info('register', ctx.request.body);
        const { userName, password } = ctx.request.body;
        await ctx.service.userServer.insert({ userName, password });
        ctx.body = { success: true };
        ctx.status = 200;
    }
}
