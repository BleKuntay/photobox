import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root', // Ganti dengan password PostgreSQL kamu
  database: 'photobox',
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch((err: { message: any }) =>
    console.error('Connection error:', err.message),
  )
  .finally(() => client.end());
