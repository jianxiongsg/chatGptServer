import * as bcrypt from 'bcryptjs';
const helper = {
    uint8ArrayToUtf8(uint8Array) {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(uint8Array, { stream: true });
    },
    async hashPassword(password) {
        const saltRounds = 10;
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            console.log('Password Hash:', hash);
            return hash;
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    },

    async checkPassword(password, hash) {
        try {
            const match = await bcrypt.compare(password, hash);
            console.log('Do passwords match?', match);
            return match;
        } catch (error) {
            console.error('Error comparing password and hash:', error);
        }
    }

}
export default helper;