export const ERROR_MESSAGES = {
    STUDENT_NOT_FOUND_BY_ID: (id: number, objectName: string) => `${objectName} with id ${id} not found`,
    STUDENT_ALREADY_EXISTS_EMAIL: (email: string, objectName: string) => `${objectName} with email ${email} already exists`,
};
