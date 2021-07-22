module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'dm_nest',
  logging: ['error'],
  entities: ['dist/entities/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  cli: { migrationsDir: 'src/migrations' },
};
