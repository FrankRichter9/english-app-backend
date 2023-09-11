import { SqlService } from "../connect-bd";

export const countWords = async (userId?: number) => {
    const client = SqlService.client

    const WHERE  = userId ? `WHERE  "user_id"=${userId}` : ''

    const count = await new Promise((resolve) => {
        client?.query(`
            SELECT COUNT(*) FROM Words
            ${WHERE}
        `, (error, res) => {
            console.log('error', error)

            const count = res?.rows?.[0]?.count

            resolve(count ? Number(count) : 0)
        })
    })

    return count as number
}