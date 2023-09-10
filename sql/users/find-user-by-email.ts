import { SqlService } from "../connect-bd";

export const findUserByEmail = async (email: string) => {
    const client = SqlService.client

    return new Promise<{
        error: Error,
        data: any,
    }>((resolve) => {
        client?.query(
            `SELECT * FROM Users
                WHERE "email"='${email}'
            `, (error, res) => {
            console.log('findUserByEmail error:', error)
            
            resolve({
                error,
                data: res?.rows?.[0]
            })
        })
    })
}