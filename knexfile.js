const sharedConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
}
  
module.exports = {
    development: {
      ...sharedConfig,
      connection: { filename: './data/auth.db3' },
      seeds: { directory: './data/seeds' },
    },
    testing: {
      ...sharedConfig,
      connection: { filename: './data/auth.db3' },
    },
};