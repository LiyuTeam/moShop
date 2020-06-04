import { resolve, join } from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export default {
  clients: [ {
    name: 'default',
    type: 'sqlite',
    database: join(resolve(__dirname), '..', 'static', 'database.db'),
    entities: [ 'app/entities/**/*.{ts,js}' ],
    synchronize: true,
    logging: true,
  } as SqliteConnectionOptions ],
};
