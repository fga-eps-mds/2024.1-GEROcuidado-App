import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
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
      ],
    }),
  ],
});

export default mySchema;
