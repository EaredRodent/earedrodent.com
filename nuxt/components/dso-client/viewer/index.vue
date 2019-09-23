<template>
  <div class="a3-Viewer elevation-5">
    <h1 class="a3-content-title">
      {{ value.name }}
    </h1>
    <div class="a3-content-text">
      {{ value.text }}
    </div>
    <iframe style="display: none" :src="`https://www.youtube.com/embed/${value.youtube}`"
            width="560" height="315" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen/>
    <div class="a3-content-download">
      <!--      <a class="a3-content-link" :class="value.release ? '' : 'a3-content-download-disabled'"-->
      <!--         download-->
      <!--         :href="value.download"-->
      <!--         @click="download">-->
      <!--        Download (-->
      <!--        {{ value.version !== '0.0.0' ? value.version : '' }}-->
      <!--        <v-icon class="i1-loading" v-if="value.version === '0.0.0'">mdi-loading</v-icon>-->
      <!--        &nbsp;version)-->
      <!--      </a>-->
      <v-btn class="a3-content-btn" color="primary" outline
             :disabled="!value.release"
             @click="download">
        <v-icon>mdi-download</v-icon>
        Download ({{ value.version !== '0.0.0' ? value.version : '' }}
        <v-icon class="b0-loading" v-if="value.version === '0.0.0'">mdi-loading</v-icon>
        &nbsp;version)
      </v-btn>
      <!--      <a class="a3-content-link" :class="value.release ? '' : 'a3-content-download-disabled'"-->
      <!--         target="_blank" :href="`https://www.youtube.com/watch?v=${value.youtube}`"-->
      <!--         @click="howTo">-->
      <!--        How To Use?-->
      <!--      </a>-->
      <v-btn class="a3-content-btn" color="secondary" outline
             :disabled="!value.release"
             @click="howTo">
        <v-icon>mdi-help-circle-outline</v-icon>
        How To Use?
      </v-btn>
    </div>
    <div class="a3-updates">
      <div class="a3-updates-cols">
        <div>
          Core updates<br>
          <div class="a3-updates-cols-small">(download required)</div>
        </div>
        <div>Updates</div>
      </div>
      <v-timeline>
        <v-timeline-item v-for="(item, i) in value.updates" :key="i"
                         :left="item.core" :right="!item.core"
                         small color="grey">
          <template v-slot:opposite>
            <div class="a3-updates-item-date">{{ item.date.split(' ')[0] }}</div>
          </template>
          <v-card class="elevation-3">
            <v-card-text class="a3-updates-item-text">
              <div class="a3-updates-item-text-version">
                {{ item.version }}
              </div>
              {{ item.text }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>
</template>

<script>
import js from './viewer'

export default js
</script>
