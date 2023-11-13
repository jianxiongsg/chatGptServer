import { Context, Service } from 'egg';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
/**
 * openAi Service 
 * top_p 介于0和1之间,越接近0，生成的文本将越保守
 * stream 参数设置为 True 时，API 将以流式响应的形式返回多个 Completion 实例
 * temperature（接近1）：会导致生成的文本更加随机
 * presence_penalty设置为较高的值（例如0.9），则模型将更多地考虑前面生成的单词，并且更倾向于避免使用它们。如果将 presence_penalty设置为较低的值（例如0.0），则模型将不太考虑前面生成的单词，并且更可能使用相同的单词或短语
 * frequency_penalty 这个参数的值越大，惩罚力度越大，模型将更加抑制之前已经生成过的文本。如果您的应用场景要求生成的文本不重复，可以将frequency_penalty参数的值调大
 */
export default class OpenAiServer extends Service {
    private _api: OpenAI;
    constructor(ctx: Context) {
        super(ctx);
        const { apiKey, proxy } = this.app.config.openAi;
        this._api = new OpenAI({
            apiKey: this.app.config.openAi,
            httpAgent: new HttpsProxyAgent(proxy),
            defaultHeaders: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + apiKey }
        });
    }
    /**
    * 获得所有模型
    */
    public async getModels() {
        const list = await this._api.models.list();
        console.log(list);
        return list;
    }

    /**
    * 获得指定模型
    */
    public async createChatCompletion(model: string, messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) {
        const completion = await this._api.chat.completions.create({
            ...this.config.openAi.defaultOpenAIRequestOptions,
            messages,
            model,
            stream: true
        });
        return completion;
    }

    /**
    * listModels
    */
    public async getModel(modelId: string) {
        const model = await this._api.models.retrieve(modelId);
        return model;
    }
    // const list = await openai.models.list();
}
