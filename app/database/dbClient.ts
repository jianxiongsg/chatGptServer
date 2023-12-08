import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";


export class DBClient {
    static createDataSource(config) {

        const dataSource = new DataSource({
            ...config,
            entities: [User],
        })
        return dataSource;
    }

}
