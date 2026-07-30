import { Migration } from '@mikro-orm/migrations';

export class Migration20260406230336 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user_entity" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "user_entity" add constraint "user_entity_email_unique" unique ("email");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_entity" cascade;`);
  }
}
