import * as dotenv from 'dotenv';

dotenv.config();

export const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vibetik';

