import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_BARANG", async function(event, filter) {
  var offset = (parseInt(filter.page) - 1) * 5;

  var data = await db
    .table("barang")
    .limit(5)
    .offset(offset)
    .modify(function(query) {
      if (filter.search != undefined) {
        query
          .where("nama", "LIKE", "%" + filter.search + "%")
          .where("barcode", "LIKE", "%" + filter.search + "%")
          .orWhere("id", "LIKE", "%" + filter.search + "%");
      }
    });

  var countRows = (
    await db
      .table("barang")
      .limit(5)
      .offset(offset)
      .modify(function(query) {
        if (filter.search != undefined) {
          query
            .where("nama", "LIKE", "%" + filter.search + "%")
            .where("barcode", "LIKE", "%" + filter.search + "%")
            .orWhere("id", "LIKE", "%" + filter.search + "%");
        }
      })
      .count("* AS total")
  )[0]["total"];

  var maxPages = Math.ceil(parseInt(countRows) / 2);

  return { data: data, maxPages: maxPages };
});

ipcMain.handle("SAVE_BARANG", async function(event, barang) {
  await db.table("barang").insert(barang);
});

ipcMain.handle("UPDATE_BARANG", async function(event, id, barang) {
  await db
    .table("barang")
    .where("id", "=", id)
    .update(barang);
});

ipcMain.handle("DELETE_BARANG", async function(event, id) {
  await db
    .table("barang")
    .where("id", "=", id)
    .delete();
});

ipcMain.handle("SCAN_BARANG", async function(event, barcode) {
  return await db
    .table("barang")
    .where("barcode", "=", barcode)
    .first();
});

ipcMain.handle("SET_JUMLAH_BARANG", async function(event, id, jumlah) {
  await db
    .table("barang")
    .where("id", "=", id)
    .update({
      jumlah: jumlah,
    });
});
