// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCheck = require('../../../app/middleware/check');
import ExportErrorHandler = require('../../../app/middleware/errorHandler');

declare module 'egg' {
  interface IMiddleware {
    check: typeof ExportCheck;
    errorHandler: typeof ExportErrorHandler;
  }
}
