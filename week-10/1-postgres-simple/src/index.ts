import { Client } from 'pg'
import { DB_URL } from './config';
import { createUser, getUser } from './db/user';

export const client = new Client({
    connectionString: DB_URL
});


