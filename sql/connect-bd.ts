import { Client } from 'pg'
import { createTokensTable } from './tokens/create-tokens-table';
import { createUsersTable } from './users/create-users-table';
import { createWordsTable } from './words/create-words-table';

const config = {
	host: process.env.DB_HOST_IP,
	port: 5432,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
};

class SQL {
    client: null | Client = null

    connect = async () => {
        this.client = new Client(config)

        // this.client.connect((error) => {
        //     if (error) throw error;
        // });

        await this.client.connect()
    }

    createTabels = async () => {
        await createTokensTable()
        await createUsersTable()
        await createWordsTable()
    }
}
export const SqlService = new SQL()
