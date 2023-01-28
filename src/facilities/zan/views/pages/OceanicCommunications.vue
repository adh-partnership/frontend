<template>
  <h2 class="text-xl">Oceanic Communications</h2>
  <p>
    Anchorage Radio operates on HF frequencies, so communication formats are a little different. Both controllers and
    will always repeat who they are calling twice on initial contact and will always say who you are calling and your
    callsign on every transmission ("Hey you, this is me, this is what I want"). For example, "Anchorage Radio,
    Anchorage Radio, Cargo 123, request clearance." This quick guide will demonstrate most common voice communications.
  </p>
  <h2 class="text-md">Initial Contact/SELCAL Check</h2>
  <p>
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Anchorage Radio, Cargo 123 on [frequency], SELCAL check
    [SELCAL, ie AC-CD].<br />
    <span class="text-blue-600">ATC:</span> Cargo 123, Anchorage Radio, standby SELCAL check. Position reports not
    required.<br />
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Cargo 123, SELCAL OK.<br />
  </p>
  <h2 class="text-md">Requests</h2>
  <p>
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Anchorage Radio, Cargo 123, request clearance on
    [frequency].<br />
    <span class="text-blue-600">ATC:</span> Cargo 123, Anchorage Radio.<br />
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Cargo 123, request [new altitude or speed].<br />
    <span class="text-blue-600">ATC:</span> Cargo 123, Anchorage Radio, [instruction] approved/denied [reason if
    denied].<br />
  </p>
  <h2 class="text-md">Position Reports</h2>
  <p>
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Anchorage Radio, Cargo 123, position on [frequency].<br />
    <span class="text-blue-600">ATC:</span> Cargo 123, Anchorage Radio.<br />
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Cargo 123, position [position (fix, or lat/lon)] at
    [time], [altitude], [speed], estimating [next fix] at [time], [fix after next fix] next.<br />
    <span class="text-blue-600">ATC:</span> Cargo 123, Anchorage Radio, copies [position], [altitude], [speed], [next
    fix] at [time], [fix after next fix] next.<br />
    <span class="text-red-600">Pilot:</span> Anchorage Radio, Cargo 123, readback correct.<br />
  </p>
</template>
