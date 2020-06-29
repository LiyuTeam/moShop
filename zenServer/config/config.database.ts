import { resolve, join } from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export default {
  clients: [ {
    name: 'default',
    type: 'sqlite',
    database: join(resolve(__dirname), '..', 'static', 'database.db'),
    entities: [ 'app/entities/sqlite/**/*.{ts,js}' ],
    synchronize: true,
    logging: true,
  } as SqliteConnectionOptions,
  {
    type: 'mongodb',
    name: 'mongodb',
    host: '203.195.148.136',
    port: 30100,
    username: 'admin',
    password: 'liyu123456!',
    authSource: 'admin',
    database: 'zenServer',
    entities: [ 'app/entities/mongodb/**/*.{ts,js}' ],
  } as MongoConnectionOptions,
  ],
};
