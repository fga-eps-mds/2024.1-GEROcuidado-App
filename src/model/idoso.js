import { Model } from '@nozbe/watermelondb'
import { field, text, date, relation } from '@nozbe/watermelondb/decorators'

export default class Idoso extends Model {
  static table = 'idoso'

  @text('nome') nome
  @date('dataNascimento') dataNascimento
  @field('tipoSanguineo') tipoSanguineo
  @field('alimentacao') alimentacao
  @field('medicacoes') medicacoes;
  @text('telefoneResponsavel') telefoneResponsavel
  @text('descricao') descricao
  @relation('users', 'user_id') users
}