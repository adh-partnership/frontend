<template>
  <header>
    <div id="header" class="header_banner">
      <RouterLink :to="{ name: 'Home' }" class="navbar-item">
        <div class="wrapper">
          <div>
            <h1>Denver<span>ARTCC</span></h1>
          </div>
          <img src="https://cdn.denartcc.org/assets/img/logo_150.png" height="125" alt="ZDV Logo" />
        </div>
      </RouterLink>
    </div>

    <HeaderNav />
  </header>
</template>

<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped>
#header {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 3840px;
  margin: 0 auto;
  position: relative;

  &::before {
    background: linear-gradient(rgba(0, 39, 102, 0), rgb(0, 39, 102, 0.5));
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    content: "";
    position: absolute;
  }

  &.header_banner {
    background-image: url("https://cdn.denartcc.org/assets/img/cover.jpg");
    background-position: top 40% center;
  }

  .wrapper {
    padding: 2em 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    a {
      display: block;

      img {
        height: 125px;
      }
    }

    h1 {
      font-weight: 600;
      margin: 0;
      font-size: 3rem;
      color: #fff;
      text-shadow: -2px -2px 3px $colorado-red;

      span {
        display: block;
        margin-left: 50%;
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
  }
}

@media screen and (max-width: 910px) {
  #header .wrapper {
    padding: 15px;

    a img {
      height: 80px;
      width: auto;
    }

    h1 {
      font-size: 32px;
      margin: 20px 0 0 0;

      span {
        font-size: 24px;
      }
    }
  }
}
</style>
