import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export default {
  client: {
    type: 'sqlite',
    database: '../static/database.db',
    synchronize: true,
    // entitiesdir: 'app/entities/',
  } as SqliteConnectionOptions,
};
