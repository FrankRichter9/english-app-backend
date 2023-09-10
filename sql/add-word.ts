import { SqlService } from "./connect-bd";

export const addWord = async (word: any) => {
    const client = SqlService.client

    return await new Promise((resolve) => {
        client?.query(`
        INSERT INTO Words (word,translate)
        VALUES ('${word.word}', '${word.translate}');
    `, (error, res) => {
            console.log('error', error)
            resolve(error)
        })
    })
}