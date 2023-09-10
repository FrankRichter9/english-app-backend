import { SqlService } from "../connect-bd";

export const createUsersTable = async () => {
    const client = SqlService.client

    return new Promise((resolve) => {
        client?.query(
            `CREATE TABLE Users
                (
                    id serial primary key,
                    email VARCHAR(50),
                    password VARCHAR(90),
                    is_activated BIT,
                    activation_link VARCHAR(50)
                )
            `, (error, res) => {
            console.log('createUsersTable error:', error)
            
            resolve(error)
        })
    })
}