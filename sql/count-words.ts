import { SqlService } from "./connect-bd";

export const countWords = async () => {
    const client = SqlService.client

    const count = await new Promise((resolve) => {
        client?.query(`
            SELECT COUNT(*) FROM Words
        `, (error, res) => {
            console.log('error', error)

            const count = res?.rows?.[0]?.count

            resolve(count ? Number(count) : 0)
        })
    })

    return count as number
}