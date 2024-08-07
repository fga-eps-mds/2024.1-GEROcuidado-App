import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import mySchema from './schema';
import Idoso from '../model/idoso';
import User from '../model/user';
import Rotina from '../model/rotina';

const adapter = new SQLiteAdapter({
  dbName: 'GeroCuidadoDB',
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
  modelClasses: [User, Idoso, Rotina],
});

export default database;

export const idososCollection = database.get(`idoso`)
export const usersCollection = database.get(`users`)
export const rotinasCollection = database.get(`rotinas`);  // Adicione a coleção rotinas