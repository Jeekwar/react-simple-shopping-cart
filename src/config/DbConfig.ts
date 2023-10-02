import Dexie from "dexie";

const IndexedDatabase = new Dexie("simple-cart");

// Declare tables, IDs and indexes
IndexedDatabase.version(1).stores({
  productTable: "id, name, price, image, stock, description",
});

IndexedDatabase.open()
  .then(function (db) {
    console.log("succes connect to IndexedDB", db);
  })
  .catch(function (err) {
    console.log("failed to connect to IndexedDB", err);
  });

export const productTable = IndexedDatabase.table("productTable");

export default IndexedDatabase;
