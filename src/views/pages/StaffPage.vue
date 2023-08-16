<template>
  <div class="mb-4">
    <h1 class="text-3xl font-bold mb-0">Facility Staff</h1>
    <p class="italic">The following volunteers help make this a great place to be!</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <StaffCard v-for="atm in staff.atm" :key="atm.cid" :controller="atm" position="atm" title="Air Traffic Manager" />
    <StaffCard
      v-for="datm in staff.datm"
      :key="datm.cid"
      :controller="datm"
      position="datm"
      title="Deputy Air Traffic Manager"
    />
    <StaffCard v-for="ta in staff.ta" :key="ta.cid" :controller="ta" position="ta" title="Training Administrator" />
    <StaffCard v-for="ec in staff.ec" :key="ec.cid" :controller="ec" position="ec" title="Events Coordinator" />
    <TeamCard v-if="staff.events.length > 0" title="Events Team" :controllers="staff.events" position="et" />
    <StaffCard v-for="fe in staff.fe" :key="fe.cid" :controller="fe" position="fe" title="Facility Engineer" />
    <TeamCard
      v-if="staff.facilities.length > 0"
      title="Facilities Team"
      :controllers="staff.facilities"
      position="ft"
    />
    <StaffCard v-for="wm in staff.wm" :key="wm.cid" :controller="wm" position="wm" title="Webmaster" />
    <TeamCard v-if="staff.web.length > 0" title="Web Team" :controllers="staff.web" position="wt" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <TeamCard :controllers="staff.instructor" position="ins" title="Instructors" />
    <TeamCard :controllers="staff.mentor" position="mtr" title="Mentors" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { Controller } from "@/types";
import { ZDVAPI } from "@/utils/api";

import StaffCard from "../partials/StaffCard.vue";
import TeamCard from "../partials/TeamCard.vue";

interface Staff {
  atm: Controller[];
  datm: Controller[];
  ta: Controller[];
  ec: Controller[];
  fe: Controller[];
  wm: Controller[];
  events: Controller[];
  facilities: Controller[];
  web: Controller[];
  instructor: Controller[];
  mentor: Controller[];
}

const staff = ref<Staff>({
  atm: [],
  datm: [],
  ta: [],
  ec: [],
  fe: [],
  wm: [],
  events: [],
  facilities: [],
  web: [],
  instructor: [],
  mentor: [],
});

onMounted(async () => {
  const { data } = await ZDVAPI.get("/v1/user/staff");
  staff.value = data;
  console.log(data);
});
</script>

<style scoped></style>
