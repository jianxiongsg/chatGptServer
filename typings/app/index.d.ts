// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
export * from 'egg';
import { DataSource } from "typeorm";
export as namespace Egg;

declare module 'egg' {
    interface Application {
        dataSource: DataSource;
        cache: Cache;
    }

}

