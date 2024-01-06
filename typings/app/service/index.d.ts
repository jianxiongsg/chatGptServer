// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportLog from '../../../app/service/log';
import ExportOpenAiServer from '../../../app/service/openAiServer';
import ExportUserServer from '../../../app/service/userServer';

declare module 'egg' {
  interface IService {
    log: AutoInstanceType<typeof ExportLog>;
    openAiServer: AutoInstanceType<typeof ExportOpenAiServer>;
    userServer: AutoInstanceType<typeof ExportUserServer>;
  }
}
