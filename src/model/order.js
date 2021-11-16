import db from "../plugins/db";
import { ipcMain, BrowserWindow, BrowserView } from "electron";
import { createObjectCsvWriter } from "csv-writer";
import { PosPrinter } from "electron-pos-printer";

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

ipcMain.handle("EXPORT_ORDER", async function(event, filter, filePath) {
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

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    fieldDelimiter: ";",
    header: [
      { id: "id", title: "ID" },
      { id: "tanggal", title: "Tanggal" },
      { id: "total", title: "Total" },
    ],
  });

  csvWriter.writeRecords(data);
});

ipcMain.handle("PRINT_ORDER", async function(event, orderList) {
  const dayName = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const d = new Date();

  var orderTotal = 0;
  orderList.forEach((order) => {
    orderTotal += order.harga * order.jumlah;
  });

  orderList = orderList.map((order) => {
    return [
      {
        type: "text",
        value:
          "<div style='text-align:left;'>" +
          order.nama +
          "</div>" +
          "<div style='text-align:right;'>" +
          order.jumlah +
          "x" +
          order.harga +
          " " +
          order.jumlah * order.harga +
          "</div>",
      },
    ];
  });

  // ukuran kerta kadan kurang pas
  const option = {
    silent: true,
    preview: false,
    width: "4.73cm",
    margin: "0 0 0 0",
    copies: 1,
    printerName: getPrinterName(),
    timeOutPerLine: 1000,
    pageSize: { height: 3276000, width: 48000 },
  };
  const data = [
    {
      type: "text",
      value: "TOKO JELITA<br/>TAYU",
      css: {
        "font-weight": "700",
        "font-size": "12px",
        "font-family": "monospace, cursive",
        "text-align": "center",
      },
    },
    {
      type: "text",
      value:
        dayName[d.getDay()] +
        ", " +
        d.getDate() +
        "/" +
        d.getMonth() +
        "/" +
        d.getFullYear(),
      css: {
        "font-weight": "600",
        "font-size": "10px",
        "font-family": "monospace, cursive",
        "text-align": "center",
      },
    },
    {
      type: "table",
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: orderList,
      tableFooter: [
        {
          type: "text",
          value: "Total " + orderTotal,
          css: { "text-align": "right" },
        },
      ],
      css: {
        "margin-top": "10px",
        "font-size": "10px",
      },
    },
    {
      type: "text",
      value: "Terimakasih atas kunjungan anda.",
      css: {
        "margin-top": "10px",
        "font-weight": "600",
        "font-size": "10px",
        "font-family": "monospace, cursive",
        "text-align": "center",
      },
    },
  ];

  console.log(option);

  PosPrinter.print(data, option).catch((error) => {
    console.log(error);
  });
});

ipcMain.handle("GET_DETAIL_ORDER", async function(event, filter, id) {
  var offset = (parseInt(filter.page) - 1) * 5;

  var data = await db
    .table("order_item")
    .limit(5)
    .offset(offset)
    .where("order_id", id)
    .modify(function(query) {
      if (filter.search != "") {
        query.andWhere(function() {
          this.orWhere("id", "LIKE", "%" + filter.search + "%");
          this.orWhere("nama_item", "LIKE", "%" + filter.search + "%");
        });
      }
    });

  var countRows = (
    await db
      .table("order_item")
      .where("order_id", id)
      .modify(function(query) {
        if (filter.search != "") {
          query.andWhere(function() {
            this.orWhere("id", "LIKE", "%" + filter.search + "%");
            this.orWhere("nama_item", "LIKE", "%" + filter.search + "%");
          });
        }
      })
      .count("* AS total")
  )[0]["total"];

  var maxPages = Math.ceil(parseInt(countRows) / 5);

  return { data: data, maxPages: maxPages };
});

function getPrinterName() {
  var printerList = BrowserWindow.getFocusedWindow()
    .webContents.getPrinters()
    .reverse();

  if (printerList == []) {
    return "";
  }

  return printerList[0].name;
}
