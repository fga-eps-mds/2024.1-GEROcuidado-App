import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import mySchema from './schema'; // Certifique-se de que o caminho está correto
import Idoso from '../model/idoso'; // Descomente e ajuste a importação do modelo

const adapter = new SQLiteAdapter({
  dbName: 'GeroCuidado',
  schema: mySchema,
  // migrations, // Descomente se necessário
  // dbName: 'myapp', // Opcional
  jsi: true, /* Platform.OS === 'ios' */
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.error("Database setup error:", error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Idoso],
});

export default database;

export const idososCollection = database.get(`idoso`)