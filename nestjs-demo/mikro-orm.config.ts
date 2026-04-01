import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  driver: PostgreSqlDriver,
  // env
  dbName: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  // Glob patterns for compiled JavaScript files
  entities: ['dist/**/*.entity.js'],
  // Glob patterns for TypeScript source files (used in development)
  entitiesTs: ['src/**/*.entity.ts'],

  // metadataP
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
});
