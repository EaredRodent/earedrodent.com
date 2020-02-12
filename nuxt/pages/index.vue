<template>
  <div class="b7-Dso" :style="{ background: computedBg }">
    <div class="b7-rect"/>
    <div class="b7-author">Yuka-Khryuka</div>

    <a class="b7-link" href="/exe/DSO_Cam.msi">
      DSO_Cam {{ version.dsoCam }} (32 bit)
    </a>
    <a class="b7-link" href="/exe/DSO_QuickLauncher.msi">
      DSO_QuickLauncher {{ version.dsoQuickLauncher }} (32 bit)
    </a>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'client',
  data () {
    return {
      computedBg: '#000'
    }
  },
  computed: {
    version () {
      return this.$store.state.version
    }
  },
  mounted () {
    let rgb = (new Array(3))
      .fill()
      .map((ch) => Math.random() > 0.5 ? '0a' : '00')
      .join('')
    this.computedBg = `#${rgb}`
  },
  async asyncData (context) {
    let { data } = await context.$axios.get('v1/start-up')
    context.store.commit('setVersion', {
      dsoQuickLauncher: data.dso_quicklauncher,
      dsoCam: data.dso_cam.version
    })
  }
}
</script>
