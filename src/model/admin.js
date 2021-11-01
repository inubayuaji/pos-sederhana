import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_ADMIN", async function(event, filter) {
  var offset = (parseInt(filter.page) - 1) * 5;

  var data = await db
    .table("admin")
    .limit(5)
    .offset(offset)
    .modify(function(query) {
      if (filter.search != undefined) {
        query.where("nama", "LIKE", "%" + filter.search + "%");
      }
    });

  var countRows = (
    await db
      .table("admin")
      .modify(function(query) {
        if (filter.search != undefined) {
          query.where("nama", "LIKE", "%" + filter.search + "%");
        }
      })
      .count("* AS total")
  )[0]["total"];

  var maxPages = Math.ceil(parseInt(countRows) / 5);

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

ipcMain.handle("LOGIN_ADMIN", async function(event, auth) {
  var admin = await db
    .table("admin")
    .where("username", "=", auth.username)
    .first();

  if (admin == undefined) {
    return { login: false };
  }

  if (admin.password != auth.password) {
    return { login: false };
  }

  return { login: true };
});
