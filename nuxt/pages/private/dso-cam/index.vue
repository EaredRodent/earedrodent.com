<template>
  <div class="b3-DsoCamPrivate">
    <div class="b3-load" :style="{ opacity: load.state ? 1 : 0 }">
      <div class="b3-load-box">
        <div class="b3-load-title">DSO_Cam</div>
        <div class="b3-load-info">«{{ load.info }}»</div>
        <div class="b3-load-progress">
          <v-slider v-model="load.progress" :min="0" :max="4"
                    :step="1" thumb-label :color="load.error ? 'error' : 'primary'"
                    ticks="always" :tick-labels="load.labels" readonly
                    :track-color="load.error ? 'error' : undefined"/>
        </div>
      </div>
    </div>
    <div class="b3-wrapper" :style="{ opacity: !load.state ? 1 : 0 }">

      <div class="b3-values" v-show="!showStorage">

        <div class="b3-rotators">
          <rotator v-model="sendingValues.oX" class="b3-rotators-x" icon="mdi-axis-z-rotate-clockwise"/>
          <rotator v-model="sendingValues.oY" class="b3-rotators-y" icon="mdi-axis-y-rotate-clockwise"/>
        </div>

        <div class="b3-sliders">

          <div class="b3-sliders-left">
            <v-slider v-model="sendingValues.x" :min="-25" :max="25"
                      :step="1" thumb-label color="white"
                      prepend-icon="mdi-arrow-expand-horizontal" height="24"/>
            <v-slider v-model="sendingValues.y" :min="0" :max="50"
                      :step="1" thumb-label color="white"
                      prepend-icon="mdi-arrow-expand-vertical" height="24"/>
            <v-slider v-model="sendingValues.z" :min="-24.5" :max="25.5"
                      :step="0.5" thumb-label color="white"
                      prepend-icon="mdi-arrow-expand" height="24"/>
          </div>

          <div class="b3-sliders-right">
            <v-slider v-model="sendingValues.zoom" :min="1" :max="100"
                      :step="1" thumb-label color="white"
                      prepend-icon="mdi-magnify-plus" height="24"/>
            <v-slider v-model="sendingValues.exZoom" :min="0.01" :max="3"
                      :step="0.01" thumb-label color="white"
                      prepend-icon="mdi-perspective-less" height="24"/>
            <v-slider v-model="sendingValues.fog" :min="0" :max="100"
                      :step="1" thumb-label color="white"
                      prepend-icon="mdi-weather-fog" height="24"/>
          </div>

        </div>

      </div>

      <div class="b3-storage" v-show="showStorage">
        <div class="b3-storage-item" v-for="(save, i) in valuesFromStorage" :key="i"
             @click="applySave(save)">
          <div class="b3-title">{{ save.title ? save.title : 'Unnamed save' }}</div>
          <div class="b3-date">{{ save.date | dateFormat }}</div>
          <div class="b3-actions">

            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn class="b3-action-btn" icon v-on="on"
                       @click="openRenameStorageItemDialog(save, i)">
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>Rename</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn class="b3-action-btn" icon v-on="on"
                       @click="removeSaveFromStorage(i)">
                  <v-icon small>
                    mdi-trash-can
                  </v-icon>
                </v-btn>
              </template>
              <span>Remove</span>
            </v-tooltip>

          </div>
        </div>
        <template v-if="debug">
          <div class="b3-storage-item">
            <div class="b3-title">Debug data:</div>
          </div>
          <div class="b3-storage-item" v-for="(prop, name, i) in values" :key="i">
            <div class="b3-title">{{ name + ': ' + prop }}</div>
          </div>
        </template>
      </div>

      <div class="b3-sidebar">

        <v-tooltip left>
          <template v-slot:activator="{on}">
            <v-btn class="b3-sidebar-btn" flat v-on="on"
                   @click="resetSendingValues">
              <v-icon>
                mdi-restore
              </v-icon>
            </v-btn>
          </template>
          <span>Reset to initial values</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{on}">
            <v-btn class="b3-sidebar-btn" flat v-on="on"
                   @click="saveValuesToStorage">
              <v-icon>
                mdi-content-save
              </v-icon>
            </v-btn>
          </template>
          <span>Save values to storage</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{on}">
            <v-btn class="b3-sidebar-btn" flat v-on="on"
                   v-show="!showStorage"
                   @click="showStorage = !showStorage">
              <v-icon>
                mdi-folder
              </v-icon>
            </v-btn>
          </template>
          <span>Show storage</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{on}">
            <v-btn class="b3-sidebar-btn" flat v-on="on"
                   v-show="showStorage"
                   @click="showStorage = !showStorage">
              <v-icon>
                mdi-settings
              </v-icon>
            </v-btn>
          </template>
          <span>Back to UI</span>
        </v-tooltip>

      </div>

    </div>

    <v-dialog v-model="renameStorageItemDialog" width="300">
      <div class="b3-dialog">
        <v-text-field class="b3-dialog-field" v-model="storageItem.item.title" label="Name"/>
        <v-btn outline @click="renameStorageItem">
          Ok
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import js from './dso-cam.js'

export default js
</script>
