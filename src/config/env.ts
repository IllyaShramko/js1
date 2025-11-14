import { cleanEnv, str } from 'envalid'
import * as dotenv from 'dotenv';

dotenv.config()

export const env = cleanEnv(process.env, {
    JWT_SECRET_KEY: str(),
    JWT_EXPIRES_IN: str(),
})