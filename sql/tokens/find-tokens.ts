import { SqlService } from "../connect-bd";

export const findTokens = async (refrash_token: string) => {
    const client = SqlService.client

    return new Promise<{
        error: Error,
        data: any,
    }>((resolve) => {
        client?.query(
            `SELECT * FROM Tokens
                WHERE "refrash_token"='${refrash_token}'
            `, (error, res) => {
            console.log('findTokens error:', error)
            
            resolve({
                error,
                data: res?.rows?.[0]
            })
        })
    })
}