<template>
  <div class="a2-rotator-box"
       @mousedown="rotatorMouseDown" ref="rotator">
    <div class="a2-rotator"
         :style="{transform: `rotateZ(${value}rad)`}">
      <div :class="['a2-rotator-arrow', {'a2-rotator-arrow-active': touched}]"
           :style="{left: `${leftOffset}px`}"/>
    </div>
    <div class="a2-rotator-text">
      <v-icon>{{ icon }}</v-icon>
      <strong>{{ char }}</strong><br>
      {{ Math.round(value * (180 / Math.PI)) + '%' }}
    </div>
  </div>
</template>

<script>
import js from './rotator'

export default js
</script>
