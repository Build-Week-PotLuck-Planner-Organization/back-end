// require("dotenv").config();

// const sharedConfig = {
//     client: 'sqlite3',
//     useNullAsDefault: true,
//     migrations: { directory: './data/migrations' },
// }
  
// module.exports = {
//     development: {
//       ...sharedConfig,
//       connection: { filename: './data/auth.db3' },
//       seeds: { directory: './data/seeds' },
//     },
//     testing: {
//       ...sharedConfig,
//       connection: { filename: './data/auth.db3' },
//     },
//     production : {
//       client: 'pg',
//       connection: process.env.DATABASE_URL,
//       migrations: {
//           directory: './data/migrations' ,
//       },
//       seeds: {
//           directory: './data/seeds' ,
//       },
//     },
// }

require("dotenv").config();
//const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";
module.exports = {
  development: {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
          filename: "./data/potluck.db3",
      },
      migrations: {
          directory: "./data/migrations",
      },
      seeds: {
          directory: "./data/seeds",
      },
      pool: {
          afterCreate: (conn, done) => {
              conn.run("PRAGMA foreign_keys = ON", done)
          },
      },
}, 
  testing : {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
          filename: "./data/testing.db3",
      },
      migrations: {
          directory: "./data/migrations",
      },
      seeds: {
          directory: "./data/seeds",
      },
      pool: {
          afterCreate: (conn, done) => {
              conn.run("PRAGMA foreign_keys = ON", done)
          },
      },
  },
  production: {
    client: "pg",
    connection: {
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      ssl: {
        sslmode: 'require',
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};
