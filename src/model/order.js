import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("GET_ORDER", async function(event, filter) {
  var offset = (parseInt(filter.page) - 1) * 5;

  var data = await db
    .table("order")
    .limit(5)
    .offset(offset)
    .modify(function(query) {
      if (filter.search != "") {
        query.andWhere(function() {
          this.orWhere("id", "LIKE", "%" + filter.search + "%");
        });
      }
      if (filter.datePick != null) {
        query.andWhere("tanggal", "LIKE", "%" + filter.datePick + "%");
      }
    });

  var countRows = (
    await db
      .table("order")
      .modify(function(query) {
        if (filter.search != "") {
          query.andWhere(function() {
            this.orWhere("id", "LIKE", "%" + filter.search + "%");
          });
        }
        if (filter.datePick != null) {
          query.andWhere("tanggal", "LIKE", "%" + filter.datePick + "%");
        }
      })
      .count("* AS total")
  )[0]["total"];

  var maxPages = Math.ceil(parseInt(countRows) / 5);

  return { data: data, maxPages: maxPages };
});

ipcMain.handle("SAVE_ORDER", async function(event, orderList) {
  var total = 0;
  var totalJasa = 0;
  var totalBarang = 0;
  var totalHargaBeli = 0;
  var untung = 0;

  orderList.forEach((order) => {
    if (order.type == "barang") {
      totalBarang += order.harga * order.jumlah;
      totalHargaBeli += order.harga_beli * order.jumlah;
    } else {
      totalJasa += order.harga * order.jumlah;
    }
  });

  total = totalJasa + totalBarang;
  untung = total - totalHargaBeli;

  var orderId = await db.table("order").insert({
    total_harga_beli: totalHargaBeli,
    total_barang: totalBarang,
    total_jasa: totalJasa,
    total: total,
    untung: untung,
  });

  orderList.forEach(async (order) => {
    await db.table("order_item").insert({
      order_id: orderId,
      nama_item: order.nama,
      type: order.type,
      jumlah: order.jumlah,
      harga_beli: order.harga_beli,
      harga_jual: order.harga,
    });
  });
});

ipcMain.handle("GET_PROFIT_ORDER", async function(event, filter) {
  var sumTotalJasa = 0;

  var untung = 0;
  var untung_barang = 0;
  var untung_jasa = 0;

  var data = await db.table("order").modify(function(query) {
    if (filter.search != "") {
      query.andWhere(function() {
        this.orWhere("id", "LIKE", "%" + filter.search + "%");
      });
    }
    if (filter.datePick != null) {
      query.andWhere("tanggal", "LIKE", "%" + filter.datePick + "%");
    }
  });

  // error disini
  data.forEach((item) => {
    sumTotalJasa += item.total_jasa;
    untung += item.untung;
  });

  untung_barang = untung - sumTotalJasa;
  untung_jasa = sumTotalJasa;

  var res = {
    untung: untung,
    untung_barang: untung_barang,
    untung_jasa: untung_jasa,
  };

  return res;
});
