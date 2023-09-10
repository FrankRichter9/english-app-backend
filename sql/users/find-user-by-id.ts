import { SqlService } from "../connect-bd";

export const findUserById = async (id: number) => {
    const client = SqlService.client

    return new Promise<{
        error: Error,
        data: any,
    }>((resolve) => {
        client?.query(
            `SELECT * FROM Users
                WHERE "id"='${id}'
            `, (error, res) => {
            console.log('findUserById error:', error)
            
            resolve({
                error,
                data: res?.rows?.[0]
            })
        })
    })
}