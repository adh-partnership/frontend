<template>
  <div class="flex w-full">
    <div class="w-1/2 align-middle text-center">
      <div class="gandalf">
        <div class="ground"></div>
        <div class="robe"></div>
        <div class="sleeves"></div>
        <div class="shoulders">
          <div class="hand left"></div>
          <div class="hand right"></div>
        </div>
        <div class="head">
          <div class="hair"></div>
          <div class="beard"></div>
        </div>
      </div>
    </div>
    <div class="w-1/2 pt-4 align-middle text-center h-full">
      <h2 class="font-bold text-4xl">You Shall Not Pass!</h2>
      <p class="text-xl">
        Uh-oh! Gandolf blocks your path! The path you have selected is blocked. Are you logged in? Do you have the
        appropriate roles?
      </p>
      <p class="text-sm">
        In technical terms, you have attempted to access a page that requires authentication and/or specific roles that
        your session currently does not have. If you believe this is in error, please contact the Webmaster.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$black: #000;
$semi-black: #1a2130;
$white: #fff;
$robe: #ededed;
$robe-shadow: darken($robe, 20%);
$sword: #3f3f3f;
$staff: #603b2a;
$skin: #ffd8ad;
$hair: #cdcdcd;
$hair-shadow: darken($hair, 10%);
$lips: darken($skin, 10%);
$ground: black, #6c1305, #de8531, #efac41;
$ground-reverse: #efac41, #de8531, #6c1305, black;

.gandalf {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  top: 1rem;
  div {
    position: absolute;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background-color: $semi-black;
    border-radius: 50%;
  }
  .ground {
    bottom: -10px;
    left: 50px;
    width: 300px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient($ground-reverse);
  }
  .robe {
    bottom: 50px;
    left: 100px;
    border-bottom: 230px solid $robe;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    filter: drop-shadow(0 0 7px $robe-shadow);
    &::before {
      content: "";
      position: absolute;
      background-color: $robe;
      width: 100px;
      height: 20px;
      top: 230px;
      left: 0px;
      border-bottom-right-radius: 175%;
      border-bottom-left-radius: 100%;
    }
    &::after {
      content: "";
      position: absolute;
      background-color: $robe;
      width: 100px;
      height: 30px;
      top: 230px;
      right: 0px;
      border-bottom-right-radius: 75%;
      border-bottom-left-radius: 175%;
    }
  }
  .sleeves {
    &::before,
    &::after {
      content: "";
      position: absolute;
      border-bottom: 70px solid $robe;
      filter: drop-shadow(0 0 7px $robe-shadow);
    }
    // left
    &::before {
      top: 130px;
      left: 190px;
      border-left: 100px solid transparent;
      border-right: 45px solid transparent;
      transform: rotate(-35deg);
    }
    // right
    &::after {
      top: 125px;
      left: 70px;
      border-left: 45px solid transparent;
      border-right: 100px solid transparent;
      transform: rotate(41deg);
    }
  }
  .shoulders {
    background-color: $robe;
    border-radius: 50%;
    width: 100px;
    height: 130px;
    left: 150px;
    top: 120px;
    .hand {
      width: 33px;
      height: 26px;
      border-radius: 50%;
      background-color: $skin;
      top: -6px;
    }
    .left {
      left: -60px;
      top: -5px;
      transform: rotate(-20deg);
      &::after {
        content: "";
        position: absolute;
        background-color: $sword;
        width: 126px;
        height: 8px;
        border-radius: 4px;
        transform: rotate(145deg);
        transform-origin: bottom;
        top: -35px;
        left: 0px;
      }
    }
    .right {
      right: -70px;
      top: 2px;
      transform: rotate(20deg);
      &::after {
        content: "";
        position: absolute;
        background-color: $staff;
        width: 250px;
        height: 10px;
        border-radius: 5px;
        transform: rotate(-145deg);
        transform-origin: left;
        bottom: -60px;
        left: 120px;
      }
    }
  }
  .head {
    width: 80px;
    height: 90px;
    top: 80px;
    left: 160px;
    background-color: $skin;
    border-radius: 50%;
    &::before,
    &::after {
      content: "";
      position: absolute;
      background-color: $black;
    }
    &::before {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      top: 45px;
      left: 28px;
    }
    &::after {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      top: 45px;
      right: 26px;
    }

    .hair {
      width: 70px;
      height: 30px;
      background-color: $hair;
      border-radius: 50%;
      top: 0px;
      left: 5px;

      &::before,
      &::after {
        content: "";
        position: absolute;
        background-color: $hair;
        filter: drop-shadow(2px 5px 0 $hair-shadow);
      }

      &::before {
        top: 13px;
        left: -16px;
        width: 25px;
        height: 100px;
        border-top-left-radius: 34px;
        border-top-right-radius: 15px;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 20px;
        transform: rotate(8deg);
      }

      &::after {
        top: 13px;
        right: -16px;
        width: 25px;
        height: 100px;
        border-top-left-radius: 15px;
        border-top-right-radius: 34px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 100px;
        transform: rotate(-10deg);
      }
    }

    .beard {
      top: 64px;
      left: 5px;
      border-top: 80px solid $hair;
      border-left: 35px solid transparent;
      border-right: 35px solid transparent;
      border-radius: 30px;
      filter: drop-shadow(2px 5px 0 $hair-shadow);

      &::before {
        content: "";
        position: absolute;
        background-color: $lips;
        width: 20px;
        height: 7px;
        border-radius: 40%;
        top: -70px;
        left: -9px;
      }
    }
  }
}
</style>
