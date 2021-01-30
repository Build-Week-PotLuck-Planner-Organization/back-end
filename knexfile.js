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
// if using a local postgres server, please create the database manually, Knex will not create it autmatically
module.exports = {
  development: {
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
  },
    testing: {
    client: "pg",
  	useNullAsDefault: true,
  	connection: {
      host: `${process.env.DB_TEST_HOST}`,
      user: `${process.env.DB_TEST_USER}`,
      password: `${process.env.DB_TEST_PASSWORD}`,
      database: `${process.env.DB_TEST_NAME}`,  	},
  	migrations: {
  		directory: "./data/migrations",
  	},
  	seeds: {
  		directory: "./data/seeds",
  	}
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
