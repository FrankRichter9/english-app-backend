import { User } from "../../models/user-model";
import { SqlService } from "../connect-bd";

export const addUser = async (user: User) => {
    const client = SqlService.client

    return await new Promise<{
        error: Error,
        data?: User
    }>((resolve) => {
        client?.query(`
            INSERT INTO Users (username,email,password,is_activated,activation_link)
            VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.is_activated ? 1 : 0}', '${user.activation_link}');
        `, (error, res) => {
            console.log('addUser error:', error)
            resolve({
                error
            })
        })
    })
}