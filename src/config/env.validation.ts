import * as Joi from "joi";

export default Joi.object({
    ENV_MODE: Joi.string()
        .valid('DEVELOPMENT', 'TEST', 'PRODUCTION')
        .default('DEVELOPMENT'),
    DATABASE_TYPE: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required()
});