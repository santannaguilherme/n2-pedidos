import * as SQLite from "expo-sqlite";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbContatos.db");
  return cx;
}

export async function createTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS tbCategories
        (
            value text not null,
            type text not null          
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

export function getAll() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbCategories";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              value: registros.rows.item(n).value,
              type: registros.rows.item(n).type,
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

export function add(categtory) {
  return new Promise((resolve, reject) => {
    let query = "insert into tbCategories (value ,type) values (?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [categtory.value, categtory.type],
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

export function deleteByValue(value) {
  return new Promise((resolve, reject) => {
      let query = 'delete from tbCategories where value=?';
      let dbCx = getDbConnection();

      dbCx.transaction(tx => {
          tx.executeSql(query, [value],
              (tx, resultado) => {
                  resolve(resultado.rowsAffected > 0);
              })
      },
          error => {
              console.log(error);
              resolve(false);
          }
      )
  }
  );
}
