
const helper = {
    uint8ArrayToUtf8(uint8Array) {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(uint8Array, { stream: true });
    }
}
export default helper;