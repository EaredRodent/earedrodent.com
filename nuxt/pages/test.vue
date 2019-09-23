<template>
  <canvas ref="cock" class="tst-page">
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
    <div>12346</div>
  </canvas>
</template>

<script>
export default {
  mounted () {
    let s = this.$refs.cock.getContext('2d')
    s.beginPath()
    s.moveTo(0, 0)
    s.lineTo(500, 1000)
    s.stroke()
  }
}
</script>

<style lang="less">
  .tst {
    &-page {
      width: 100%;
      height: 100%;
    }
  }
</style>
