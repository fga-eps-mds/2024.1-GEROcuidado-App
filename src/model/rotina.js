import { Model } from '@nozbe/watermelondb'
import { field, text, date, relation } from '@nozbe/watermelondb/decorators'

export default class Rotina extends Model {
  static table = 'rotina'

  @text('titulo') titulo
  @date('dataHora') dataHora
  @field('categoria') categoria
  @text('dias') dias
  @text('descricao') descricao
  @text('token') token
  @text('notificacao') notificacao
  @text('dataHoraConcluída') dataHoraConcluída
  @relation('idoso', 'idoso_id') idoso
}