import { SqlService } from "./connect-bd";

export const createWordsTable = () => {
    const client = SqlService.client

    client?.query(
        `CREATE TABLE Words
            (
                id serial primary key,
                word VARCHAR(30),
                translate VARCHAR(30)
            )
        `, (error, res) => {
        console.log('error', error)
        // console.log(res);
    });
}