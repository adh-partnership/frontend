<template>
  <div>
    <h1 class="text-2xl">Facility Map</h1>

    <div id="map" style="width: 100%; min-height: 600px"></div>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { onMounted, ref, Ref } from "vue";
import axios from "axios";
import Facility from "@/facility";
import leaflet from "leaflet";
import type { ParsedMetar } from "@/types";
import Weather from "@/utils/weather";

let map: leaflet.Map;
let metarLayer: leaflet.LayerGroup;
let nexradLayer: leaflet.Layer;
const weather: Ref<{ [key: string]: ParsedMetar | null }> = ref({});
const airportMarkers: Ref<{ [key: string]: leaflet.Marker }> = ref({});

const updateWeather = (): void => {
  Facility.airports.forEach((airport) => {
    Weather.getMetars(airport.icao).then((metar) => {
      weather.value[airport.icao] = Weather.parseMetar(metar);
      airportMarkers.value[airport.icao].setIcon(
        leaflet.icon({
          iconUrl: `/assets/images/map/${weather.value[airport.icao]?.flight_category?.toLowerCase() || "unknown"}.png`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })
      );
    });
  });
};

const updateNexrad = async (): Promise<void> => {
  const response = await axios.get("https://tilecache.rainviewer.com/api/maps.json");
  const { data } = response;
  const ts = data[0];

  if (nexradLayer) {
    map.removeLayer(nexradLayer);
  }

  nexradLayer = leaflet
    .tileLayer(`https://tilecache.rainviewer.com/v2/radar/${ts}/512/{z}/{x}/{y}/6/0_1.png`, {
      tileSize: 256,
      opacity: 0.5,
      attribution: "Weather data © 2012-2020 <a href='https://www.rainviewer.com'>RainViewer</a>",
    })
    .addTo(map);
};

onMounted(() => {
  map = leaflet.map("map").setView(Facility.center, Facility.defaultZoom);
  leaflet
    .tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: "abcd",
      maxZoom: 20,
    })
    .addTo(map);

  leaflet.polygon(Facility.boundaries.center, { color: "white", fillOpacity: 0.05 }).addTo(map);
  map.fitBounds(Facility.boundaries.center);
  map.attributionControl.setPosition("topright");
  map.attributionControl.setPrefix(
    `<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>`
  ); // Remove Ukraine flag but leave proper attribution

  metarLayer = leaflet.layerGroup(Object.values(airportMarkers.value)).addTo(map);
  Facility.airports.forEach((airport) => {
    weather.value[airport.icao] = null;
    airportMarkers.value[airport.icao] = leaflet
      .marker(new leaflet.LatLng(airport.latitude, airport.longitude), {
        icon: leaflet.icon({
          iconUrl: "/assets/images/map/unknown.png",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
      })
      .addTo(metarLayer);
  });

  updateNexrad();
  updateWeather();
});
</script>

<style>
.leaflet-control-attribution {
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba(255, 255, 255, 0.15);
  font-family: "Jost", sans-serif;
}

.leaflet-control-attribution > a {
  color: rgba(255, 255, 255, 0.15);
}
</style>
