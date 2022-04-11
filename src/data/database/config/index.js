import dotenv from 'dotenv'

dotenv.config()

const env = process.env

const config = {
  development: {
    dialect: env.DATABASE_DIALECT,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USER || 'root',
    password: env.DATABASE_PASSWORD || '',
    host: env.DATABASE_HOST || '127.0.0.1',
    port: env.DATABASE_PORT,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  },
  production: {
    dialect: env.DATABASE_DIALECT,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USER || 'root',
    password: env.DATABASE_PASSWORD || '',
    host: env.DATABASE_HOST || '127.0.0.1',
    port: env.DATABASE_PORT,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    logging: false
  }
}

export default config
