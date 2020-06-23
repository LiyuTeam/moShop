// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import { Repository, Connection, TreeRepository } from 'typeorm';
import AppEntitiesSqliteUserAccount from '../app/entities/sqlite/UserAccount';
declare module 'egg' {
  interface Context {
    entity: {
      UserAccount: typeof AppEntitiesSqliteUserAccount
      default: {
        UserAccount: typeof AppEntitiesSqliteUserAccount
      }
    }
    repo: {
      UserAccount: Repository<AppEntitiesSqliteUserAccount>
      default: {
        UserAccount: Repository<AppEntitiesSqliteUserAccount>
      }
    }
  }
}