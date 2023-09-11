import { SqlService } from "../connect-bd";

export const createWordsTable = async () => {
    const client = SqlService.client

    return new Promise((resolve) => {
        client?.query(
            `CREATE TABLE Words
                (
                    id serial primary key,
                    user_id INTEGER,
                    word VARCHAR(30),
                    translate VARCHAR(30),
                    created_date VARCHAR(30),
                    update_date VARCHAR(30),
                    rating INTEGER
                )
            `, (error, res) => {
            console.log('createWordsTable error', error)
            
            resolve(error)
        })
    })
}