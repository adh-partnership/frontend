<template>
  <div v-if="needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span> New content available, click on reload button to update. </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
  </div>
</template>

<script setup>
// eslint-disable-next-line import/no-unresolved
import { pwaInfo } from "virtual:pwa-info";
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from "virtual:pwa-register/vue";

// eslint-disable-next-line no-console
console.log(pwaInfo);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reloadSW: any = "__RELOAD_SW__";

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    // eslint-disable-next-line no-console
    console.log(`Service Worker at: ${swUrl}`);
    if (reloadSW === "true") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      r &&
        setInterval(async () => {
          // eslint-disable-next-line no-console
          console.log("Checking for sw update");
          await r.update();
        }, 20000 /* 20s for testing purposes */);
    } else {
      // eslint-disable-next-line no-console
      console.log(`SW Registered: ${r}`);
    }
  },
});
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}

.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
