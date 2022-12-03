<template>
  <h1>Welcome to the {{ fac.name }}</h1>
  <Alert type="info">
    This site is still heavily under construction and is not ready for public use. Please check back later.
  </Alert>
  <p>Hello!</p>
  <p>
    <!--
      @TODO This needs to be moved to the Facility object so it can be configurable without recompiling or patching

      Do as part of homepage build out
    -->
    We are the {{ fac.name }}, a division of VATSIM, the Virtual Air Traffic Simulation Network. We are a group of
    volunteers who enjoy flying and controlling in the VATSIM network. We are located in the United States and control
    airspace in the Rocky Mountain region.
  </p>
</template>

<script setup lang="ts">
import fac from "@/facility";
</script>

<style scoped></style>
