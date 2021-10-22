import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_ADMIN", async function(event) {
  return await db.table("admin");
});

ipcMain.handle("SAVE_ADMIN", async function(event, admin) {
  await db.table("admin").insert(admin);
});

ipcMain.handle("UPDATE_ADMIN", async function(event, username, admin) {
  await db
    .table("admin")
    .where("username", "=", username)
    .update(admin);
});

ipcMain.handle("DELETE_ADMIN", async function(event, username) {
  await db
    .table("admin")
    .where("username", "=", username)
    .delete();
});
