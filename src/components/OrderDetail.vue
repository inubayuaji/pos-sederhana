<template>
  <v-card outlined color="#212121" class="h-100 order-detail">
    <div class="order-date">
      <h3>Tanggal</h3>
      <h3>19-09-2021</h3>
    </div>

    <hr class="mt-2 mb-5" />

    <div class="order-list">
      <div class="order-item">
        <div class="order-item-control">
          <v-btn icon color="red">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </div>
        <div class="order-item-name">Pensil</div>
        <div class="order-item-price">Rp <span>10000</span></div>
        <div class="order-item-total">
          <input type="number" class="order-item-total-input" value="1" />
        </div>
      </div>
    </div>

    <hr class="mt-2 mb-2" />

    <div class="order-total">
      <div class="order-total-label">Total</div>
      <div class="order-total-price">Rp <span>10000</span></div>
    </div>

    <v-card-actions class="p-0 mt-5">
      <v-btn color="red">Batal</v-btn>
      <v-btn color="green">Bayar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'OrderDetail',
}
</script>

<style scoped>
.order-detail {
  padding: 15px;
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
</style>