
import { Context, Service } from 'egg';
import * as bcrypt from 'bcryptjs';
import { InviteCode } from '../database/entities/InviteCode';
import { ResponseError } from '../util/response';

export default class HomeServer extends Service {

    public async findInviteCode(code: string): Promise<{ use: boolean, code: string }> {
        const user = this.app.dataSource.getRepository(InviteCode);
        const info = user.findOne({ where: { code } });
        return info;
    }

    public async addInviteCode() {
        const data = new InviteCode();
        const code = this.ctx.helper.createCode(8);
        data.code = code;
        data.use = false;
        await this.app.dataSource.manager.save(InviteCode, data);
        return { success: true, code }
    }

    public async useInviteCode(code: string) {
        if (!code) {
            throw new ResponseError({ code: "NOT_CODE", message: '需要传入邀请码', status: 400 })
        }
        const data = await this.ctx.service.homeServer.findInviteCode(code);
        if (!data) {
            throw new ResponseError({ code: "FIND_FAIL", message: '该邀请码已使用或者已废弃', status: 400 })
        }
        if (data?.use) {
            throw new ResponseError({ code: "REPEAT_USE", message: '该邀请码已经使用过啦', status: 400 })
        }
        data.use = true;
        await this.app.dataSource.manager.save(InviteCode, data);
        return { success: true }
    }
}

