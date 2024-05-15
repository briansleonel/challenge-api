import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  host: process.env.DB_HOSTNAME,
  ssl: process.env.DB_SSL == 'true',
}));
