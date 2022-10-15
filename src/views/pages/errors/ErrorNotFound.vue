<template>
  <div class="w-full box404 table">
    <div class="w-full h-full table-row">
      <h1 class="text-colorado-red text-center">404</h1>
      <h2>
        Oh No! You seem to have lost your way. I mean, that's not always a bad thing... losing your way can sometimes
        turn into a fun adventure.
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
    background-color: rgba(0, 0, 0, 0.3);
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
