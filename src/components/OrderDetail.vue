<template>
  <v-card elevation="0" color="rgb(29 29 35)" class="order-detail">
    <simplebar class="bar">
      <div class="order-date">
        <h3>Tanggal</h3>
        <h3>{{ tanggal }}</h3>
      </div>

      <div class="mt-3">
        <v-select
          dense
          :items="['Umum', 'Reseler']"
          v-model="typeOrder"
        ></v-select>
      </div>

      <div class="hr mt-2 mb-2"></div>

      <div class="order-list">
        <div
          class="order-item"
          v-for="order in orderList"
          :key="order.itemId"
        >
          <div class="order-item-control">
            <v-btn icon color="tertiary" @click="hapus(order.itemId, order.type)">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
          <div class="order-item-name">{{ order.nama }}</div>
          <div class="order-item-price">
              Rp <span>{{ hargaHadler(order) }}</span>
          </div>
          <div class="order-item-total">
            <input
              type="number"
              class="order-item-total-input"
              :value="order.jumlah"
              @keyup="updateJumlah($event, order.itemId, order.type)"
            />
          </div>
        </div>
      </div>

      <div class="hr mt-2 mb-2"></div>

      <div class="order-total">
        <div class="order-total-label">Total</div>
        <div class="order-total-price">
          Rp <span>{{ totalOrder }}</span>
        </div>
      </div>

      <v-card-actions class="p-0 mt-5">
        <v-btn color="tertiary" @click="batal()">Batal</v-btn>
        <v-btn color="primary" @click="bayar()">Bayar</v-btn>
      </v-card-actions>
    </simplebar>
  </v-card>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  name: "OrderDetail",
  components: {
    simplebar,
  },
  data() {
    return {
      typeOrder: "Umum",
    };
  },
  computed: {
    orderList() {
      return this.$store.state.orderList;
    },
    totalOrder() {
      var _this = this;
      var total = 0;

      this.orderList.forEach(function (order) {
        var harga = _this.hargaHadler(order);

        total += harga * order.jumlah;
      });

      return total;
    },
    orderListAdapter() {
      return this.orderList.map((order) => {
        return { id: order.itemId, jumlah: order.jumlah };
      });
    },
    tanggal() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      return dd + "-" + mm + "-" + yyyy;
    },
  },
  methods: {
    hapus(id, type) {
      this.$store.commit("DELETE_ORDER", { id: id, type: type });
    },
    batal() {
      this.$store.commit("RESET_ORDER");
      this.typeOrder = "Umum";
    },
    bayar() {
      var _this = this;
      // check apakah barang ada semua
      this.$store
        .dispatch("CHECK_JUMLAH_BARANG", {
          barang: this.orderListAdapter,
        })
        .then((res) => {
          if (_this.canProcessed(res)) {
            // kurangi stock
            _this.processeOrder(_this.orderListAdapter);

            // pesan berhasil
            _this.$store.commit("SHOW_NOTIF", { message: "Order berhasil" });
            // reset order
            this.$store.commit("RESET_ORDER");
            _this.typeOrder = "Umum";
          } else {
            // pesan gagal
            _this.$store.commit("SHOW_NOTIF", { message: "Order gagal" });
            // reset order
            this.$store.commit("RESET_ORDER");
          }
        });
    },
    canProcessed(checkResult) {
      if (checkResult == undefined) {
        return false;
      }

      for (let i = 0; i < checkResult.length; i++) {
        if (!checkResult[i].atStock) {
          return false;
        }
      }

      return true;
    },
    processeOrder(orderList) {
      var _this = this;

      orderList.forEach((order) => {
        _this.$store.dispatch("SUB_JUMLAH_BARANG", {
          id: order.id,
          jumlah: order.jumlah,
        });
      });
    },
    updateJumlah(event, id, type) {
      this.$store.commit("UPDARE_SIZE_ORDER", {
        id: id,
        type: type,
        jumlah: parseInt(event.target.value),
      });
    },
    hargaHadler(order) {
      if(order.type == 'barang') {
        if(this.typeOrder == 'Umum') {
          return order.harga_umum;
        } else {
          return order.harga_reseler;
        }
      } else {
        return order.harga;
      }
    }
  },
};
</script>

<style scoped>
.order-detail {
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: rgb(29 29 35);
  border-color: rgb(29 29 35);
}
.order-date {
  display: flex;
  justify-content: space-between;
}
.order-item,
.order-total {
  display: flex;
}
.order-item-control {
  flex-grow: 1;
}
.order-item-name {
  display: flex;
  align-items: center;
  flex-grow: 4;
}
.order-item-price {
  display: flex;
  align-items: center;
  flex-grow: 2;
  text-align: right;
}
.order-item-total {
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-align: right;
}

.order-total-label {
  flex-grow: 5;
}
.order-total-price {
  flex-grow: 3;
  text-align: right;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.order-item-total-input {
  text-align: right;
  color: #fff;
  width: 50px;
}

.bar {
  overflow-x: hidden;
  height: 100%;
}

.hr {
  border-top: 1px solid #ccc;
}
</style>