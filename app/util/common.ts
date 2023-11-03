import clickhouse from './database'
export const logger = (...args: any[]) => {
    console.log.apply(null, ["data-server", new Date(), ...args]);
}




export const dbIsExist = async dbName => {

    try {
        const dbs: any = await clickhouse.query('SHOW DATABASES;').toPromise();
        return dbs.some(item => item.name === dbName)
    } catch (error) {
        return false
    }
}

export const tableIsExist = async (tbName, dbName) => {

    try {
        const tbs: any = await clickhouse.query(`SHOW DATABASES FROM ${dbName};`).toPromise();
        return tbs.some(item => item.name === tbName)
    } catch (error) {
        return false
    }
}
const _strPadstart0 = (str: string | number) => {
    if (typeof str === 'string') {
        return str.padStart(2, "0");
    } else {
        const strs = str.toString()
        return strs.padStart(2, "0");
    }
}
export const getDatetime = (time) => {
    const date = new Date(time);
    let y = _strPadstart0(date.getFullYear());
    let m = _strPadstart0(date.getMonth() + 1);
    let d = _strPadstart0(date.getDate());
    let h = _strPadstart0(date.getHours());
    let min = _strPadstart0(date.getMinutes())
    let sec = _strPadstart0(date.getSeconds());
    return `${y}-${m}-${d} ${h}:${min}:${sec}`

}