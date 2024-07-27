import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'idoso',
      columns: [
        { name: 'nome', type: 'string' },
        { name: 'dataNascimento', type: 'number' },
        { name: 'tipoSanguineo', type: 'string', isOptional: true },
        { name: 'telefoneResponsavel', type: 'string' },
        { name: 'descricao', type: 'string', isOptional: true },
      ],
    }),
  ],
});

export default mySchema;
