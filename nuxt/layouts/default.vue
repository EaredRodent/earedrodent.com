<template>
  <v-app
    class="layout-content"
    id="app"
    dark
    app>
    <app-bar v-if="!isMobile"/>
    <v-content>
      <nuxt v-if="!isMobile"/>
      <div v-if="isMobile" class="layout-fuck-mobile">
        The site is not adapted for mobile devices.
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '~/components/base/AppBar.vue'

export default {
  components: {
    AppBar
  },
  data () {
    return {}
  },
  computed: {
    isMobile () {
      return this.$store.state['other']['device'].mobileDetected
    },
    appDark () {
      return this.$store.state['components']['base']['app-bar'].appDark
    }
  },
  mounted () {
    this.$store.commit('other/device/setMobileDetected', document.documentElement.clientWidth < 600)
  },
  methods: {}
}
</script>

<style lang="less">
  @import "../components/components";
  @import "../pages/pages";

  html, body, #__nuxt, #__layout, #app.application, .application--wrap, .v-content, .v-content__wrap {
    height: 100% !important;
  }

  html {
    font-family: 'Roboto', sans-serif;
    overflow: hidden !important;
  }

  .v-list__tile {
    font-size: 1rem !important;
    font-weight: 400 !important;
  }

  .layout-content {
    background: #ebe7f9;
    /*background: #aebfbd;*/
    /*background: url("https://thumbs.gfycat.com/SoggyZealousKitty-size_restricted.gif") !important;*/
    /*background: url("https://yandex.ru/images/_crpd/Uco6s2Y02/59c006JXgR/ckIcpdIzxvaFrqColvlMWTT3Dru0qW5J-mTI_e96hBd6D1iggEUSz1_8Yagm8HZGtA_YJQbKjlQ-2ATZxGA0UjsGC76fM4Lxk6vg4oulGwV1_Aay") !important;*/
    /*background: url("https://steamuserimages-a.akamaihd.net/ugc/942824525725387860/D6CAE25C3E9AC00877B66C82BFB928609E4919E4/?imw=512&amp;imh=288&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true") !important;*/
    /*background: url("https://otvet.imgsmail.ru/download/u_24e3280753a47da53095650e391dbe77_800.gif") !important;*/
    background: url('/layout.jpg') !important;
    background-size: cover !important;
  }

  .layout-fuck-mobile {
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  #st-2 {
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
</style>
