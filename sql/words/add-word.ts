import { SqlService } from "../connect-bd";

type Data = {
    userId: number,
    word: string,
    translate: string,
    createdDate: string,
    updatedDate: string,
    rating: number
}

export const addWord = async (data: Data) => {
    const client = SqlService.client

    return await new Promise((resolve) => {
        client?.query(`
        INSERT INTO Words (user_id, word, translate, created_date, update_date, rating)
        VALUES ('${data.userId}', '${data.word}', '${data.translate}', '${data.createdDate}', '${data.updatedDate}', '${data.rating}');
    `, (error, res) => {
            console.log('error', error)
            resolve(error)
        })
    })
}

// id serial primary key,
// user_id INTEGER,
// word VARCHAR(30),
// translate VARCHAR(30),
// created_date VARCHAR(30),
// update_date VARCHAR(30),
// rating INTEGER,