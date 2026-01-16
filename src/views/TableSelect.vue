<template>
  <div class="table-select">
    <h2>Chọn bàn / khu vực</h2>
    <p>Trang chọn bàn</p>

    <button @click="$router.back()">⬅ Quay lại</button>
  </div>
</template>

<script>
export default {
  name: "TableSelectPage",
};
</script>

<style scoped>
.table-select {
  padding: 20px;
  text-align: center;
}
</style>
