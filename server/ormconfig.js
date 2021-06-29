// const rootDir = process.env.NODE_ENV === 'production' ? 'build' : 'src';

const type = process.env.DB_TYPE || 'postgres';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || '12345';
const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT, 10) || 5432;
const database = process.env.DB_DATABASE || 'bugtracker';

module.exports = {
  type,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  url:
    process.env.DATABASE_URL ||
    `${type}://${username}:${password}@${host}:${port}/${database}`,
  logging: process.env.NODE_ENV === 'development',
  // entities: [rootDir + '/entities/**/*{.ts,.js}'],
  // migrations: [rootDir + '/migrations/**/*{.ts,.js}'],
  // subscribers: [rootDir + '/subscribers/**/*{.ts,.js}'],
  // seeds: [rootDir + '/seeds/**/*{.ts,.js}'],
  // cli: {
  //   entitiesDir: rootDir + '/entities',
  //   migrationsDir: rootDir + '/migrations',
  //   subscribersDir: rootDir + '/subscribers',
  // },
  entities: [
    process.env.NODE_ENV === 'test'
      ? 'src/entity/**/*.ts'
      : 'build/entity/**/*.js',
  ],
  migrations: [
    process.env.NODE_ENV === 'test'
      ? 'src/migration/**/*.ts'
      : 'build/migration/**/*.js',
  ],
  cli: {
    entitiesDir:
      process.env.NODE_ENV === 'test' ? 'src/entity' : 'build/entity',
    migrationsDir:
      process.env.NODE_ENV === 'test' ? 'src/migration' : 'build/migration',
  },
  synchronize: false,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  // entities: ['src/entity/**/*.ts', './entity/**/*.js'],

  // migrations: ['src/migration/**/*.ts', './migration/**/*.js'],
  // subscribers: ['src/subscriber/**/*.ts', './subscriber/**/*.js'],
  // seeds: ['src/seeds/**/*{.ts,.js}'],
  // cli: {
  //   entitiesDir: 'src/entity',
  //   migrationsDir: 'src/migration',
  //   subscribersDir: 'src/subscriber',
  // },
  // "type": "postgres",
  // "host": "localhost",
  // "port": 5432,
  // "username": "postgres",
  // "password": "12345",
  // "database": "bugtracker",
  // "synchronize": true,
  // "logging": true,
  // "entities": ["src/entity/**/*.ts", "./entity/**/*.js"],
  // "migrations": ["src/migration/**/*.ts", "./migration/**/*.js"],
  // "subscribers": ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
  // "seeds": ["src/seeds/**/*{.ts,.js}"],
  // "cli": {
  //   "entitiesDir": "src/entity",
  //   "migrationsDir": "src/migration",
  //   "subscribersDir": "src/subscriber"
  // }
};
