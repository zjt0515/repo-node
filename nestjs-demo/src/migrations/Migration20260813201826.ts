import { Migration } from '@mikro-orm/migrations';

export class Migration20260813201826 extends Migration {

  override name = 'Migration20260813201826';

  override up(): void | Promise<void> {
    this.addSql(`create table "todo" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "is_completed" boolean not null);`);

    this.addSql(`drop table if exists "todo_entity" cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`create table "todo_entity" ("content" text not null, "id" serial primary key, "is_completed" boolean not null, "title" varchar(255) not null);`);

    this.addSql(`drop table if exists "todo" cascade;`);
  }

}
