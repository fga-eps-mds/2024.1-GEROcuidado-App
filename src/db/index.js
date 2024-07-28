import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import mySchema from './schema'; 
import User from './model/user';

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
  modelClasses: [User],
});

export default database;

export const usersCollection = database.get(`users`)