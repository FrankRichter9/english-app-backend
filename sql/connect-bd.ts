import { Client } from 'pg'

const config = {
	host: 'master.8570a0aa-f936-440c-a576-d683395f752c.c.dbaas.selcloud.ru',
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
}
export const SqlService = new SQL()
