import db from "../plugins/db";
import { ipcMain } from "electron";

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

  var orderId = await db
    .table("order")
    .insert({
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
