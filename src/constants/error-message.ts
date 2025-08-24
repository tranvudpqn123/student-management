export const ERROR_MESSAGES = {
    ALREADY_EXISTS: (objectName: string, value: string) => `${objectName} with name ${value} already exists`,
    NOT_FOUND_BY_ID: (id: number | string, objectName: string) => `${objectName} with id ${id} not found`,
    NOT_FOUND_BY_EMAIL: (email: string, objectName: string) => `${objectName} with email ${email} not found`,
    ALREADY_EXISTS_EMAIL: (email: string, objectName: string) => `${objectName} with email ${email} already exists`,
    PASSWORD_NOT_MATCH: () => `Password does not match`,
};
