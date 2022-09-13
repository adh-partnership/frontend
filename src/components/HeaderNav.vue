<template>
  <nav class="z-depth-4">
    <div class="nav-wrapper wrapper">
      <ul class="left hide-on-med-and-down">
        <li>
          <RouterLink :to="{ name: 'Home' }" class="navbar-item">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Events</RouterLink>
        </li>

        <li class="has_dropdown" data-state="hide">
          <a class="dropdown-left" href="#" data-target="dropdown-pilot"
            >Pilot <i class="material-icons right">arrow_drop_down</i></a
          >

          <ul id="dropdown-pilot" class="dropdown-content">
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">SkyVector</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Weather</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Charts</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">ZDV Airports</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Feedback</RouterLink>
            </li>
          </ul>
        </li>

        <li class="has_dropdown" data-state="hide">
          <a class="dropdown-left" href="#" data-target="dropdown-facility"
            >Facility <i class="material-icons right">arrow_drop_down</i></a
          >

          <ul id="dropdown-facility" class="dropdown-content">
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Staff</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Roster</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Documents</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Visitor Application</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Contact Staff</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
      <RouterLink to="#" data-target="mobile-menu" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </RouterLink>
      <ul class="right left-on-med-and-down">
        <li>
          <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item btn waves-effect waves-classic">
            Login
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <!-- We don't need to support everything for mobile devices ... just enough to get by -->
  <ul id="mobile-menu" class="sidenav">
    <li>
      <RouterLink :to="{ name: 'Home' }" class="navbar-item">Home</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Events</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">ZDV Airports</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Staff</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Roster</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'NotImplemented' }" class="navbar-item">Feedback</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

onMounted(() => {
  M.Dropdown.init(document.querySelectorAll(".dropdown-left"), {
    alignment: "left",
    coverTrigger: false,
    constrainWidth: false,
    hover: true,
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 2em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  a {
    img {
      height: 125px;
    }
  }

  h1 {
    font-weight: 600;
    margin: 0;
    font-size: 3rem;
    color: #fff;
    text-shadow: -2px -2px 3px $primary-color-light;

    span {
      display: block;
      margin-left: 50%;
      font-size: 1.8rem;
      font-weight: 400;
    }
  }
}
nav {
  background-color: $primary-color;
}

.user_dropdown_arrow {
  display: inline-block;
  display: inline-flex;
  vertical-align: top;
  font-size: 22px;
  margin-top: 1px;
  margin-left: -1px;
}
</style>
