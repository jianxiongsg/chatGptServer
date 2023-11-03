import { Controller } from 'egg';
export default class HomeController extends Controller {
    public async login() {
        const { ctx } = this;
        const res = await ctx.service.log.login(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async logout() {
        const { ctx } = this;
        const res = await ctx.service.log.logout(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async stageStart() {
        const { ctx } = this;
        const res = await ctx.service.log.stageStart(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async stageFinish() {
        const { ctx } = this;
        const res = await ctx.service.log.stageFinish(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async stageFail() {
        const { ctx } = this;
        const res = await ctx.service.log.stageFail(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async itemBuy() {
        const { ctx } = this;
        const res = await ctx.service.log.itemBuy(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async itemConsume() {
        const { ctx } = this;
        const res = await ctx.service.log.itemConsume(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
    public async event() {
        const { ctx } = this;
        const res = await ctx.service.log.event(ctx.query);
        ctx.body = res;
        ctx.status = res.status;
    }
}