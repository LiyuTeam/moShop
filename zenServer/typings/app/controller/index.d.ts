// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/Home';
import ExportUser from '../../../app/controller/User';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
  }
}
