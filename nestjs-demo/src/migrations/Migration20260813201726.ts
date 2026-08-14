import { Migration } from '@mikro-orm/migrations';

export class Migration20260813201726 extends Migration {

  override name = 'Migration20260813201726';

  override up(): void | Promise<void> {
    this.addSql(`create table "hero" ("id" serial primary key, "id_name" varchar(255) not null, "c_name" varchar(255) not null, "title" varchar(255) not null, "hero_type" smallint not null, "hero_type2" smallint not null);`);

    this.addSql(`create table "counter_relation" ("id" serial primary key, "lane" text not null, "hero_id" int not null, "target_hero_id" int not null, "strength" smallint not null, "desc" text not null);`);

    this.addSql(`create table "todo_entity" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "is_completed" boolean not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "article" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "status" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "author_id" int not null);`);
    this.addSql(`alter table "article" add constraint "article_title_unique" unique ("title");`);

    this.addSql(`alter table "counter_relation" add constraint "counter_relation_hero_id_foreign" foreign key ("hero_id") references "hero" ("id");`);
    this.addSql(`alter table "counter_relation" add constraint "counter_relation_target_hero_id_foreign" foreign key ("target_hero_id") references "hero" ("id");`);
    this.addSql(`alter table "counter_relation" add constraint "counter_relation_lane_check" check ("lane" in ('top', 'jungle', 'mid', 'adc', 'support'));`);

    this.addSql(`alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id");`);
    this.addSql(`alter table "article" add constraint "article_status_check" check ("status" in ('draft', 'published'));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "counter_relation" drop constraint "counter_relation_hero_id_foreign";`);
    this.addSql(`alter table "counter_relation" drop constraint "counter_relation_target_hero_id_foreign";`);
    this.addSql(`alter table "article" drop constraint "article_author_id_foreign";`);

    this.addSql(`drop table if exists "hero" cascade;`);
    this.addSql(`drop table if exists "counter_relation" cascade;`);
    this.addSql(`drop table if exists "todo_entity" cascade;`);
    this.addSql(`drop table if exists "user" cascade;`);
    this.addSql(`drop table if exists "article" cascade;`);
  }

}
