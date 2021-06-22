const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';

module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [rootDir + 'src/entity/**/*{.ts,.js}', './entity/**/*{.ts,.js}'],
  migrations: [
    rootDir + 'src/migration/**/*{.ts,.js}',
    './migration/**/*{.ts,.js}',
  ],
  subscribers: [
    rootDir + 'src/subscriber/**/*{.ts,.js}',
    './subscriber/**/*{.ts,.js}',
  ],
  seeds: [rootDir + 'src/seeds/**/*{.ts,.js}'],
  cli: {
    entitiesDir: rootDir + 'src/entity',
    migrationsDir: rootDir + 'src/migration',
    subscribersDir: rootDir + 'src/subscriber',
  },
};
