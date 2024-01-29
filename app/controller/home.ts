import { Controller } from 'egg';
import OpenAI from "openai";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ResponseError } from '../util/response';
// const http = require('http');


export default class HomeController extends Controller {
  public async createInviteCode() {
    const { ctx } = this;
    const info = await ctx.service.homeServer.addInviteCode();
    ctx.body = info;
    ctx.status = 200;
  }
  public async useCode() {
    const { ctx } = this;
    const { code } = ctx.query;
    const info = await ctx.service.homeServer.useInviteCode(code);
    ctx.body = info;
    ctx.status = 200;
  }
}
