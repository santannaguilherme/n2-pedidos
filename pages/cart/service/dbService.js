import * as SQLite from "expo-sqlite";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbContatos.db");
  return cx;
}

export async function dropTable() {
  return new Promise((resolve, reject) => {
    const query = `DROP TABLE tbPurchases`;

    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) => resolve(true));
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}
export async function createTablePurchases() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS tbPurchases
    (
      code text not null primary key,
      purchase text not null,
      date text not null
  )`;

    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) => resolve(true));
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function getAllPurchases() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbPurchases";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              code: registros.rows.item(n).code,
              purchase: registros.rows.item(n).purchase,
              date: registros.rows.item(n).date,
            };
            retorno.push(obj);
          }
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function addPurchases(product) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbPurchases (code ,purchase, date) values (?,?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [product.code, product.purchase, product.date],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}
