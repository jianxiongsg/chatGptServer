// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportOpenAi = require('../../../app/controller/openAi');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    openAi: ExportOpenAi;
    user: ExportUser;
  }
}
