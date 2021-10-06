import * as SQLite from "expo-sqlite";

export const DbConnection = {
  getConnection: () => SQLite.openDatabase("dbName", 1.0),
};
