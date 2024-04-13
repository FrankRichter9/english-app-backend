import { SqlService } from "../connect-bd";

type Word = {
    word: string
    translate: string
}

export const patchWord = async (id: number, { word, translate }: Word, updatedDate: string) => {
    const client = SqlService.client

    return await new Promise((resolve) => {
        client?.query(`
            UPDATE Words
            SET word='${word}', translate='${translate}', update_date='${updatedDate}'
            WHERE id='${id}';
        `, (error, res) => {
            console.log('error', error)
            resolve(error)
        })
    })
}