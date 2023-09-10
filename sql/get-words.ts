import { SqlService } from "./connect-bd";

export const getWords = async (limit?: number, offset?: number) => {
    const client = SqlService.client

    const LIMIT = limit ? `LIMIT ${limit}` : ''
    const OFFSET  = offset ? `OFFSET  ${offset}` : ''

    const words = await new Promise((resolve) => {
        client?.query(`
            SELECT * FROM Words
            ${LIMIT}
            ${OFFSET}
        `, (error, res) => {
            console.log('error', error)

            resolve(res?.rows)
        })
    })

    return words
}