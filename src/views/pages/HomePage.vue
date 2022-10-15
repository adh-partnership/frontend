<template>
  <h1>Welcome to the Denver ARTCC</h1>
  <p>Hello!</p>
  <p>
    We are the Denver ARTCC, a division of VATSIM, the Virtual Air Traffic Simulation Network. We are a group of
    volunteers who enjoy flying and controlling in the VATSIM network. We are located in the United States and control
    airspace in the Rocky Mountain region.
  </p>
  <p>
    <!-- This is to demo/test a link that will only be a link if authenticated... -->
    <AuthLink to="#" :auth="true" :roles="['wm']">
      <span class="text-green-500">Authenticated if linked</span>
    </AuthLink>
  </p>
</template>

<script setup lang="ts">
import AuthLink from "@/components/AuthLink.vue";
</script>

<style scoped></style>
