<template>
  <div class="w-full box404 table">
    <div class="w-full h-full table-row">
      <h1 class="text-colorado-red text-center">500</h1>
      <h2>
        Something just isn't right... this is an inrecoverable error. Please try again later or contact the Webmaster
        for guidance.
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box404 {
  background: url("/assets/images/404.jpg") no-repeat center center;
  background-size: cover;
  min-height: 500px;

  div {
    background-color: rgba(255, 0, 0, 0.15);
    height: 100%;

    h1 {
      position: relative;
      top: 150px;
      font-size: 100pt;
      color: rgba(255, 0, 0, 0.7);
    }

    h2 {
      position: relative;
      top: 110px;
      color: white;
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  }
}
</style>
