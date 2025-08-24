import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    secret: process.env.JWT_TOKEN_SECRET || 'default_secret',
    expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRESIN || '3600', 10),
    audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
    issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
    refreshTokenExpiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRESIN || '86400', 10) 
}))