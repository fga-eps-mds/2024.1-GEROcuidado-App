import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'userId', type: 'string', isIndexed: true },
        { name: 'nome', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'senha', type: 'string' },
        { name: 'admin', type: 'boolean' },
        { name: 'foto', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'idoso',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'nome', type: 'string' },
        { name: 'dataNascimento', type: 'number' },
        { name: 'tipoSanguineo', type: 'string', isOptional: true },
        { name: 'telefoneResponsavel', type: 'string' },
        { name: 'descricao', type: 'string', isOptional: true },
        { name: 'foto', type: 'string', isOptional: true },
      ],
    }),
  //   tableSchema({
  //     name: 'rotina',
  //     columns: [
  //       { name: 'idIdoso', type: 'string', isIndexed: true },
  //       { name: 'categoria', type: 'string' },
  //       { name: 'data', type: 'number' },
  //       { name: 'Hora', type: 'number' },
  //       { name: 'descricao', type: 'string', isOptional: true },
  //       { name: 'titulo', type: 'string' },
  //       { name: 'notifica', type: 'boolean' },
  //     ],
  //   }),
  //   tableSchema({
  //     name: 'publicacao',
  //     columns: [
  //       { name: 'user_id', type: 'string', isIndexed: true },
  //       { name: 'data', type: 'number' },
  //       { name: 'hora', type: 'number' },
  //       { name: 'descricao', type: 'string' },
  //       { name: 'categoria', type: 'string' },
  //       { name: 'titulo', type: 'string' },
  //     ],
  //   }),
  //   tableSchema({
  //     name: 'comentario',
  //     columns: [
  //       { name: 'user_id', type: 'string', isIndexed: true },
  //       { name: 'descricao', type: 'string' },
  //     ],
  //   }),
  //   tableSchema({
  //     name: 'metrica_saude',
  //     columns: [
  //       { name: 'idIdoso', type: 'string', isIndexed: true },
  //       { name: 'categoria', type: 'string' },
  //     ],
  //   }),
  //   tableSchema({
  //     name: 'valor_metrica_saude',
  //     columns: [
  //       { name: 'idMetricaSaude', type: 'string', isIndexed: true },
  //       { name: 'data', type: 'number' },
  //       { name: 'hora', type: 'number' },        
  //       { name: 'valor', type: 'number' },
  //     ],
  //   }),
   ],
});

export default mySchema;
