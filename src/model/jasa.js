import db from "../plugins/db";
import { ipcMain, ipcRenderer } from "electron";

ipcMain.handle("GET_JASA", async function(event, filter) {
  var offset = (parseInt(filter.page) - 1) * 5;

  var data = await db
    .table("jasa")
    .limit(5)
    .offset(offset)
    .modify(function(query) {
      if (filter.search != undefined) {
        query
          .where("nama", "LIKE", "%" + filter.search + "%")
          .orWhere("id", "LIKE", "%" + filter.search + "%");
      }
    });

  var countRows = (
    await db
      .table("jasa")
      .modify(function(query) {
        if (filter.search != undefined) {
          query
            .where("nama", "LIKE", "%" + filter.search + "%")
            .orWhere("id", "LIKE", "%" + filter.search + "%");
        }
      })
      .count("* AS total")
  )[0]["total"];

  var maxPages = Math.ceil(parseInt(countRows) / 5);

  return { data: data, maxPages: maxPages };
});

ipcMain.handle("SAVE_JASA", async function(event, jasa) {
  await db.table("jasa").insert(jasa);
});

ipcMain.handle("UPDATE_JASA", async function(event, id, jasa) {
  await db
    .table("jasa")
    .where("id", "=", id)
    .update(jasa);
});
ipcMain.handle("DELETE_JASA", async function(event, id) {
  await db
    .table("jasa")
    .where("id", "=", id)
    .delete();
});
