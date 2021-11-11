const knex = require("knex");

const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./src/database.sqlite",
  },
});

async function up(db) {
  await db.schema
    .createTable("admin", function(table) {
      table.string("username").primary();
      table.string("nama");
      table.string("password");
    })
    .createTable("barang", function(table) {
      table.string("id").primary();
      table.string("barcode");
      table.string("nama");
      table.integer("harga_umum").defaultTo(0);
      table.integer("harga_reseler").defaultTo(0);
      table.integer("jumlah").defaultTo(0);
    });

  await db.table("admin")
    .insert([{ username: "admin", nama: "Admin", password: "admin" }])
    .then(function() {
      process.exit();
    });
}

(async function() {
  await up(db);
})();
