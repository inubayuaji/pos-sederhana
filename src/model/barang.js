import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_BARANG", async function(event) {
  return await db.table("barang");
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
