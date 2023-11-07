import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log('ctx', ctx.query);
    ctx.body = 'hellow, please input useful url.';
  }
}
