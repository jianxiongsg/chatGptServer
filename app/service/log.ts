import { Service } from 'egg';
import { logger, getDatetime } from '../util/common';
import { isNull, missingParameter, } from '../util/service_com';

import clickhouse from '../util/database';
type PlainObject<T = any> = { [key: string]: T };
/**
 * log Service
 */
export default class Log extends Service {
     /**
     * 数据库插值
     * @param tbName - 表名 db_name.tb_name
     * @param data - 数据
     */
    private async insertInto(tbName: string, data: string) {
        try {
            await clickhouse.query(`INSERT INTO ${tbName} VALUES (${data});`).toPromise();
            return true
        } catch (error) {
            logger(error);
            return false
        }
    }
    
    /**
     * 判断参数是否缺少
     * @param obj - request query
     */
    private hasNullAttr(obj: { [key: string]: string }) {
        const nullKey = Object.keys(obj).find(key => isNull(obj[key]));
        return nullKey
    }

    /**
     * login
     * @param query - request query
     */
    public async login(query: PlainObject<string>) {
        console.log(query, 'login');
        // const ss = await clickhouse.query(`SELECT * FROM wd12345.user_logout ORDER BY online_time LIMIT 0,3`).toPromise();

        const { appId, userId, channel, deviceType, clientVersion, clientType } = query;
        const hasNullParam = this.hasNullAttr({ appId, userId, channel, deviceType, clientVersion, clientType });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const ip = this.ctx.ip || '';
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${ip}','${channel}','${currentTime}','${deviceType}','${clientVersion}','${clientType}'`;
        const result = await this.insertInto(`${appId}.user_login`, saveData);
        return result ? { msg: '登录成功', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
    /**
     * logout
     * @param query - request query
     */
    public async logout(query: PlainObject<string>) {
        console.log(query, 'logout');
        const { appId, userId, onlineTime } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, onlineTime });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${currentTime}','${onlineTime}'`;
        const result = await this.insertInto(`${appId}.user_logout`, saveData);
        return result ? { msg: '退出登录', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
    /**
     * stageStart
     * @param query - request query
     */
    public async stageStart(query: PlainObject<string>) {
        console.log(query, 'stageStart');
        const { appId, userId, stageId } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, stageId });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${stageId}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.stage_start`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }

    /**
     * stageFinish
     * @param query - request query
     */
    public async stageFinish(query: PlainObject<string>) {
        console.log(query, 'stageFinish');
        const { appId, userId, stageId } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, stageId });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${stageId}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.stage_end`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
    /**
     * stageFail
     * @param query - request query
     */
    public async stageFail(query: PlainObject<string>) {
        console.log(query, 'stageFail');
        const { appId, userId, stageId, reason } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, stageId, reason });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${stageId}','${reason}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.stage_fail`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
    /**
     * itemBuy
     * @param query - request query
     */
    public async itemBuy(query: PlainObject<string>) {
        console.log(query, 'itemBuy');
        const { appId, userId, itemId, itemNum, currencyType, price } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, itemId, itemNum, currencyType, price });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${itemId}','${itemNum}','${currencyType}','${price}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.item_buy`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }

    /**
     * itemConsume
     * @param query - request query
     */
    public async itemConsume(query: PlainObject<string>) {
        console.log(query, 'itemConsume');
        const { appId, userId, itemId, itemNum } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, itemId, itemNum });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${itemId}','${itemNum}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.item_consume`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
    /**
     * event
     * @param query - request query
     */
    public async event(query: PlainObject<string>) {
        console.log(query, 'event');
        const { appId, userId, eventName, extra, cause } = query
        const hasNullParam = this.hasNullAttr({ appId, userId, eventName, extra, cause });
        if (hasNullParam) return missingParameter(hasNullParam, 400);
        const currentTime = getDatetime(new Date());
        const saveData = `'${appId}','${userId}','${eventName}','${extra}','${cause}','${currentTime}'`;
        const result = await this.insertInto(`${appId}.event`, saveData);
        return result ? { msg: 'success', status: 200, data: true } : { msg: '服务器异常', status: 400 }
    }
}
