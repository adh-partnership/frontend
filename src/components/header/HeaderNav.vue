<template>
  <nav class="navigation-menu">
    <ul class="flex">
      <HeaderNavItem title="Home" :to="{ name: 'Home' }" />
      <HeaderNavItem title="Events" :to="{ name: 'NotImplemented' }" />
      <HeaderNavItem title="Pilots" to="#" :sublinks="pilotLinks" />
      <HeaderNavItem title="Facility" to="#" :sublinks="facilityLinks" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import HeaderNavItem, { Links } from "./HeaderNavItem.vue";

const pilotLinks: Links[] = [
  {
    to: { name: "NotImplemented" },
    title: "SkyVector",
  },
  {
    to: { name: "NotImplemented" },
    title: "Weather",
  },
  {
    to: { name: "NotImplemented" },
    title: "Charts",
  },
  {
    to: { name: "NotImplemented" },
    title: "ZDV Airports",
  },
  {
    to: { name: "NotImplemented" },
    title: "Feedback",
  },
];

const facilityLinks: Links[] = [
  {
    to: { name: "NotImplemented" },
    title: "Staff",
  },
  {
    to: { name: "NotImplemented" },
    title: "Roster",
  },
  {
    to: { name: "NotImplemented" },
    title: "Documents",
  },
  {
    to: { name: "NotImplemented" },
    title: "Visitor Application",
  },
  {
    to: { name: "NotImplemented" },
    title: "Contact Staff",
  },
];
</script>

<style scoped></style>
