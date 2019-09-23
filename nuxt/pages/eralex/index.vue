<template>
  <div class="b2-Eralex">
    <div class="b2-content elevation-3">
      <div class="b2-script-list">
        <div v-if="uploadState === -2" class="b2-script-upload-name">No files here.</div>
        <div v-for="(fileName, i) in fileNames" :key="i" class="b2-script-upload-name">{{ fileName }}</div>
      </div>
      <v-btn :loading="uploadState === -1" :disabled="uploadState === -1"
             color="primary" class="ma-0 b2-script-btn-upload"
             @click="btnUploadClick">
        Upload
      </v-btn>
      <input ref="hiddenUploadButton" type="file" name="files[]"
             class="hidden-upload-button" multiple @change="uploadFiles">
    </div>
    <v-snackbar v-model="snackbar" :timeout="5000" :top="true">
      <div v-if="uploadState === -1" class="b2-upload-status-warning">
        Packaging...z
      </div>
      <div v-if="uploadState === 0" class="b2-upload-status-error">
        Script protection failed.
      </div>
      <div v-if="uploadState === 1" class="b2-upload-status-success">
        Success!
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import js from './eralex.js'

export default js
</script>
