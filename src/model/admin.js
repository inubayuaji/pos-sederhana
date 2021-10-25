import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_ADMIN", async function(event, filter) {
  var data = await db
    .table("admin")
    .limit(5)
    .offset((filter.page - 1) * 5)
    .modify(function(query) {
      if (filter.search != undefined) {
        query.where("nama", "LIKE", "%" + filter.search + "%");
      }
    });

  var maxPages = Math.ceil(
    (await db.table("admin").count("* AS total"))[0]["total"] / 2
  );

  return { data: data, maxPages: maxPages };
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
