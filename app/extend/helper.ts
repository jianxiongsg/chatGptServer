import * as bcrypt from 'bcryptjs';
const helper = {
    uint8ArrayToUtf8(uint8Array) {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(uint8Array, { stream: true });
    },
    async hashPassword(password) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;

    },

    async checkPassword(password: string, hash: string) {
        try {
            const match = await bcrypt.compare(password, hash);
            return match;
        } catch (error) {
            return false
        }
    },

    createCode(len: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        let charactersLength = characters.length;
        for (let i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
export default helper;