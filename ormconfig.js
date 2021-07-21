module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'dm_nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
