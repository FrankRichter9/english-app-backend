import { SqlService } from "./connect-bd";

export const addWord = (word: any) => {
    const client = SqlService.client

    client?.query(`
        INSERT INTO Words (word,translate)
        VALUES ('${word.word}', '${word.translate}');
    `, (error, res) => {
        console.log('error', error)
        console.log('res', res)
    });
}