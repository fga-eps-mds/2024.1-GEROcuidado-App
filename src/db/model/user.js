import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('name') name;
  @field('email') email;
  @field('password') password;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
