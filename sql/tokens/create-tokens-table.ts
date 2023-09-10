import { SqlService } from "../connect-bd";

export const createTokensTable = async () => {
    const client = SqlService.client

    return new Promise((resolve) => {
        client?.query(
            `CREATE TABLE Tokens
                (
                    user_id integer,
                    refrash_token VARCHAR(400)
                )
            `, (error, res) => {
            console.log('createTokensTable error:', error)
            
            resolve(error)
        })
    })
}