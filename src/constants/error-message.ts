export const ERROR_MESSAGES = {
    NOT_FOUND_BY_ID: (id: number | string, objectName: string) => `${objectName} with id ${id} not found`,
    NOT_FOUND_BY_EMAIL: (email: string, objectName: string) => `${objectName} with email ${email} not found`,
    NOT_FOUND_TOKEN: (token: string) => `Refresh token ${token} not found`,
    ALREADY_EXISTS: (objectName: string, value: string) => `${objectName} with name ${value} already exists`,
    ALREADY_EXISTS_EMAIL: (email: string, objectName: string) => `${objectName} with email ${email} already exists`,
    PASSWORD_NOT_MATCH: () => `Password does not match`,
    ROLE_NOT_FOUND: (role: string) => `Role ${role} not found`
};
