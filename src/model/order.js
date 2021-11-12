import db from "../plugins/db";
import { ipcMain } from "electron";

ipcMain.handle("SAVE_ORDER", async function(event, orderList) {
  var total = 0;
  var totalJasa = 0;
  var totalBarang = 0;

  orderList.forEach((order) => {
    if (order.type == "barang") {
      totalBarang += order.harga * order.jumlah;
    } else {
      totalJasa += order.harga * order.jumlah;
    }
  });

  total = totalJasa + totalBarang;

  var orderId = await db
    .table("order")
    .insert({
      total_barang: totalBarang,
      total_jasa: totalJasa,
      total: total,
    });

  orderList.forEach(async (order) => {
    await db.table("order_item").insert({
      order_id: orderId,
      nama_item: order.nama,
      type: order.type,
      jumlah: order.jumlah,
      harga: order.harga,
    });
  });
});
