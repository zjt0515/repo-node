import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config';
import { Migrator } from '@mikro-orm/migrations';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { SeedManager } from '@mikro-orm/seeder';
import { TodoSchema } from './todo/entities/todo.entity.js';
import { UserSchema } from './users/entities/user.entity.js';
import { ArticleSchema } from './articles/entities/article.entity.js';
import { HeroSchema } from './heroes/entities/hero.entity.js';

export default defineConfig({
  clientUrl:
  'postgresql://postgres:123456@127.0.0.1:5432/postgres?sslmode=disable',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  driver: PostgreSqlDriver,
  driverOptions: {
    // connection: {
    //   ssl: 
    // },
    ssl: false
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  // env
  dbName: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,

  // Glob patterns for compiled JavaScript files
  // entities: ['dist/**/*.entity.js'],
  entities: [TodoSchema, UserSchema, ArticleSchema,HeroSchema],
  // Glob patterns for TypeScript source files (used in development)
  entitiesTs: ['src/**/*.entity.ts'],

  seeder: {
    path: './src/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, you should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  // extensions: [Migrator, SeedManager],
  // metadataP
  metadataProvider: ReflectMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
});
