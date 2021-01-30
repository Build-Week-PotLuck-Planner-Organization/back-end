require("dotenv").config();
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";
// if using a local postgres server, please create the database manually, Knex will not create it autmatically
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
    production : {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
          directory: './data/migrations' ,
      },
      seeds: {
          directory: './data/seeds' ,
      },
    },
}