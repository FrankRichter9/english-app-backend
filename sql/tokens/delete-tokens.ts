import { User } from "../../models/user-model";
import { SqlService } from "../connect-bd";

export const deleteTokens = async (refrashToken: string) => {
    const client = SqlService.client

    return await new Promise<{
        error: Error,
        data?: User
    }>((resolve) => {
        client?.query(`
            DELETE FROM Tokens
            WHERE refrash_token='${refrashToken}'
        `, (error, res) => {
            console.log('deleteTokens error:', error)
            resolve({
                error
            })
        })
    })
}