import dotenv from 'dotenv';

dotenv.config();

export const config = {
    secretKey: process.env.SECRET_KEY || 'default_secret_key',
    port: process.env.PORT || 5000,
};