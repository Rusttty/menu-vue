<template>
  <div class="phone">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.phone {
  max-width: 550px;
  margin: 0 auto;
  height: 100dvh;
  position: relative;
  overflow: hidden;
}

/* background stays global */
.phone::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("@/assets/MenuBG.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
