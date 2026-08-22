import { Migration } from '@mikro-orm/migrations';

export class Migration20260813202745 extends Migration {
  override name = 'Migration20260813202745';

  override up(): void | Promise<void> {
    this.addSql(
      `alter table "article" alter column "content" type text using ("content"::text);`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(
      `alter table "article" alter column "content" type varchar(255) using ("content"::varchar(255));`,
    );
  }
}
