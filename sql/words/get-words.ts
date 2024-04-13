import { SqlService } from "../connect-bd";

export const getWords = async (limit?: number, offset?: number, userId?: number) => {
    const client = SqlService.client

    const LIMIT = limit ? `LIMIT ${limit}` : ''
    const OFFSET  = offset ? `OFFSET  ${offset}` : ''
    const WHERE  = userId ? `WHERE  "user_id"=${userId}` : ''
    const ORDER = 'ORDER BY "id"'

    const words = await new Promise((resolve) => {
        client?.query(`
            SELECT * FROM Words
            ${WHERE}
            ${ORDER}
            ${LIMIT}
            ${OFFSET}
        `, (error, res) => {
            console.log('error', error)

            resolve(res?.rows)
        })
    })

    return words
}