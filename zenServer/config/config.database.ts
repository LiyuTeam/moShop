export default () => ({
  clients: [
    { name: 'sqlite', type: 'sqlite', database: 'main', host: '../static/database.db', synchronize: true },
  ],
});
