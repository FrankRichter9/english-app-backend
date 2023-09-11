import { SqlService } from "../connect-bd";

export const deleteWord = async (id: number) => {
    const client = SqlService.client

    return await new Promise((resolve) => {
        client?.query(`
            DELETE FROM Words
            WHERE id='${id}';
        `, (error, res) => {
            console.log('error', error)
            resolve(error)
        })
    })
}