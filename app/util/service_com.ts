export const isNull = param => param === "" || param === null || param === undefined;
export const missingParameter = (paramName: string, status: number) => {
    return {
        msg: `parameter: ${paramName} is null.`,
        status: status,
    }
};