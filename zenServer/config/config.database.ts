import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export default {
  clients: [ {
    name: 'default',
    type: 'sqlite',
    database: './static/database.db',
    entities: [ 'app/entities/' ],
    synchronize: true,
  } as SqliteConnectionOptions ],
};
