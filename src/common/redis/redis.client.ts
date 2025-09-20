// import { createClient } from "redis";
// export const redisClient = createClient({
//     username: 'admin',
//     password: '',
//     socket: {
//         host: 'redis-12816.c82.us-east-1-2.ec2.redns.redis-cloud.com',
//         port: 12816,
//     }
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// export async function connectRedis() {
//     if (!redisClient.isOpen) {
//         await redisClient.connect();
//     }
// }
