import { User } from '../database/entities/User';
import { Context, Service } from 'egg';
import * as bcrypt from 'bcryptjs';

export default class UserServer extends Service {

    public async findOne(userName: string) {
        const user = this.app.dataSource.getRepository(User);
        const info = user.findOne({ where: { userName } });
        return info;
    }

    public async insert(info: { userName: string; password: string }) {
        const user = new User();
        user.userName = info.userName;
        // 密码加密
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(info.password, salt);
        await this.app.dataSource.manager.save(User, user);
        return { success: true }
    }

}

