import { SqlService } from "./connect-bd";

export const getWords = async () => {
    const client = SqlService.client

    const words = await new Promise((resolve) => {
        client?.query(`
            SELECT * FROM Words
        `, (error, res) => {
            console.log('error', error)

            resolve(res?.rows)
        })
    })

    return words
}