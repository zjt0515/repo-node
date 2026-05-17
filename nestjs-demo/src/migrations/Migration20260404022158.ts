import { Migration } from '@mikro-orm/migrations';

export class Migration20260404022158 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "todo_entity" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "is_completed" boolean not null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "todo_entity" cascade;`);
  }
}
