import * as SQLite from "expo-sqlite";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbContatos.db");
  return cx;
}

export async function createTableProduct() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS tbProducts
    (
      code text not null primary key,
      description text not null,
      price text not null,
      category text not null
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

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbProducts";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              code: registros.rows.item(n).code,
              description: registros.rows.item(n).description,
              price: registros.rows.item(n).price,
              category: registros.rows.item(n).category,
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

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbProducts (code ,description,price ,category) values (?,?,?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [product.code, product.description, product.price, product.category],
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
export function deleteProductById(id) {
  return new Promise((resolve, reject) => {
      let query = 'delete from tbProducts where code=?';
      let dbCx = getDbConnection();

      dbCx.transaction(tx => {
          tx.executeSql(query, [id],
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

export function editProduct(product) {
  console.log("começando o método alteraContato");
  return new Promise((resolve, reject) => {
    let query = "update tbProducts set description=?,price=?, category=? where code=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [product.description, product.price, product.category,product.code],
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
