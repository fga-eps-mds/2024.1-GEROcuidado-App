import { Model } from '@nozbe/watermelondb'
import { field, text, date, relation } from '@nozbe/watermelondb/decorators'

export default class Rotina extends Model {
  static table = 'rotinas';

  @text('titulo') titulo
  @date('dataRotina') dataRotina
  @date('horaRotina') horaRotina
  @field('categoria') categoria
  @text('notificacao') notificacao
  @field('descricao') descricao
  // @text('token') token
  // @date('dataHoraConcluída') dataHoraConcluída
  // @text('dias') dias
  @relation('idoso', 'idoso_id') idoso
}