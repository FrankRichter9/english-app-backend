import { SqlService } from "../connect-bd";

export const findTokensByUserId = async (id: number) => {
    const client = SqlService.client

    return new Promise<{
        error: Error,
        data: any,
    }>((resolve) => {
        client?.query(
            `SELECT * FROM Tokens
                WHERE "user_id"='${id}'
            `, (error, res) => {
            console.log('findTokensByUserId error:', error)
            
            resolve({
                error,
                data: res?.rows?.[0]
            })
        })
    })
}