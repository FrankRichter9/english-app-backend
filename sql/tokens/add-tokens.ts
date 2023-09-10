import { User } from "../../models/user-model";
import { SqlService } from "../connect-bd";

export const addTokens = async (userId: number, refrashToken: string) => {
    const client = SqlService.client

    return await new Promise<{
        error: Error,
        data?: User
    }>((resolve) => {
        client?.query(`
            INSERT INTO Tokens (user_id,refrash_token)
            VALUES ('${userId}', '${refrashToken}');
        `, (error, res) => {
            console.log('addTokens error:', error)
            resolve({
                error
            })
        })
    })
}