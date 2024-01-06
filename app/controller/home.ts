import { Controller } from 'egg';
import OpenAI from "openai";
import { HttpsProxyAgent } from 'https-proxy-agent';
// const http = require('http');


export default class HomeController extends Controller {
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
