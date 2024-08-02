import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('nome') nome;
  @field('email') email;
  @field('senha') senha;
  @field('admin') admin;
  @field('foto') foto;
  @children('idoso') idoso;
}