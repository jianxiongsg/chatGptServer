import "reflect-metadata";
import { DataSource } from "typeorm";
import { InviteCode } from "./entities/InviteCode";
import { User } from "./entities/User";


export class DBClient {
    static createDataSource(config) {

        const dataSource = new DataSource({
            ...config,
            entities: [User, InviteCode],
        })
        return dataSource;
    }

}
