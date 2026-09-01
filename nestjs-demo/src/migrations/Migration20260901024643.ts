import { Migration } from '@mikro-orm/migrations';

export class Migration20260901024643 extends Migration {

  override name = 'Migration20260901024643';

  override up(): void | Promise<void> {
    this.addSql(`create table "hero" ("id" serial primary key, "id_name" varchar(255) not null, "c_name" varchar(255) not null, "title" varchar(255) not null, "hero_type" smallint not null, "hero_type2" smallint not null);`);

    this.addSql(`create table "counter_relation" ("id" serial primary key, "lane" text not null, "hero_id" int not null, "target_hero_id" int not null, "strength" smallint not null, "desc" text not null);`);

    this.addSql(`create table "todo" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "is_completed" boolean not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "username" varchar(255) not null, "refresh_token" text null, "roles" text[] not null default '{user}', "created_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);

    this.addSql(`create table "article" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "status" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "author_id" int not null);`);
    this.addSql(`alter table "article" add constraint "article_title_unique" unique ("title");`);

    this.addSql(`create table "comment" ("id" serial primary key, "content" text not null, "created_at" timestamptz not null, "author_id" int not null, "article_id" int not null);`);

    this.addSql(`alter table "counter_relation" add constraint "counter_relation_hero_id_foreign" foreign key ("hero_id") references "hero" ("id");`);
    this.addSql(`alter table "counter_relation" add constraint "counter_relation_target_hero_id_foreign" foreign key ("target_hero_id") references "hero" ("id");`);
    this.addSql(`alter table "counter_relation" add constraint "counter_relation_lane_check" check ("lane" in ('top', 'jungle', 'mid', 'adc', 'support'));`);

    this.addSql(`alter table "user" add constraint "user_roles_check" check ("roles" <@ array['user'::text, 'admin'::text]);`);

    this.addSql(`alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id");`);
    this.addSql(`alter table "article" add constraint "article_status_check" check ("status" in ('draft', 'published'));`);

    this.addSql(`alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id");`);
    this.addSql(`alter table "comment" add constraint "comment_article_id_foreign" foreign key ("article_id") references "article" ("id");`);

    this.addSql(`drop table if exists "todo_entity" cascade;`);
    this.addSql(`drop table if exists "user_entity" cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "counter_relation" drop constraint "counter_relation_hero_id_foreign";`);
    this.addSql(`alter table "counter_relation" drop constraint "counter_relation_target_hero_id_foreign";`);
    this.addSql(`alter table "article" drop constraint "article_author_id_foreign";`);
    this.addSql(`alter table "comment" drop constraint "comment_author_id_foreign";`);
    this.addSql(`alter table "comment" drop constraint "comment_article_id_foreign";`);

    this.addSql(`create table "todo_entity" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "is_completed" bool not null);`);

    this.addSql(`create table "user_entity" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);
    this.addSql(`alter table "user_entity" add constraint "user_entity_email_unique" unique ("email");`);

    this.addSql(`drop table if exists "hero" cascade;`);
    this.addSql(`drop table if exists "counter_relation" cascade;`);
    this.addSql(`drop table if exists "todo" cascade;`);
    this.addSql(`drop table if exists "user" cascade;`);
    this.addSql(`drop table if exists "article" cascade;`);
    this.addSql(`drop table if exists "comment" cascade;`);
  }

}
