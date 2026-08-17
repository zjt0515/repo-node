import { Migration } from '@mikro-orm/migrations';

export class Migration20260815185847 extends Migration {

  override name = 'Migration20260815185847';

  override up(): void | Promise<void> {
    this.addSql(`alter table "user" add "refresh_token" text null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "user" drop column "refresh_token";`);
  }

}
