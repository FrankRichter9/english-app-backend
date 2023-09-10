import { SqlService } from "../connect-bd";

export const getUsers = async (limit?: number, offset?: number) => {
    const client = SqlService.client

    const LIMIT = limit ? `LIMIT ${limit}` : ''
    const OFFSET  = offset ? `OFFSET  ${offset}` : ''

    const words = await new Promise((resolve) => {
        client?.query(`
            SELECT * FROM Users
            ${LIMIT}
            ${OFFSET}
        `, (error, res) => {
            console.log('getUsers error:', error)

            resolve(res?.rows)
        })
    })

    return words
}