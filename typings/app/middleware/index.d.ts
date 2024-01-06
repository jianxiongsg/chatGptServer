// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCheck from '../../../app/middleware/check';
import ExportErrorHandler from '../../../app/middleware/errorHandler';

declare module 'egg' {
  interface IMiddleware {
    check: typeof ExportCheck;
    errorHandler: typeof ExportErrorHandler;
  }
}
