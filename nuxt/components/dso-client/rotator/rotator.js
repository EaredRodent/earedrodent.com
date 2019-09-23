export default {
  name: 'index',
  props: ['char', 'icon', 'value'],
  data () {
    return {
      touched: false,
      aCos: 0,
      leftOffset: 10
    }
  },
  methods: {
    rotatorMouseDown (e) {
      let bcr = this.$refs.rotator.getBoundingClientRect()

      // Vector's start

      let cntrX = bcr.x +
        bcr.width / 2
      let cntrY = bcr.y +
        bcr.height / 2

      this.touched = true

      let mouseMoveHandle = (e) => {
        // Vector B

        let bX = e.clientX - cntrX
        let bY = e.clientY - cntrY

        // Vector A

        let aX = -1 * Math.hypot(bX, bY)
        let aY = 0

        // Degree calc

        let cosF = (aX * bX + aY * bY) /
          (Math.hypot(aX, aY) * Math.hypot(bX, bY))
        let aCos = Math.acos(cosF)
        console.log(cosF + ' ' + aCos)
        aCos = (bY > 0) ? aCos * -1 : aCos
        this.$emit('input', String(aCos))

        // Pointer can overflow box <= 10px

        if (Math.hypot(bX, bY) <= ((bcr.width / 2) + 10)) {
          this.leftOffset = 50 - Math.hypot(bX, bY)
        } else {
          this.leftOffset = -10
        }
      }

      let mouseUpHandle = (e) => {
        window.removeEventListener('mousemove', mouseMoveHandle)
        window.removeEventListener('mouseup', mouseUpHandle)
        this.touched = false
        this.leftOffset = 10
      }
      window.addEventListener('mousemove', mouseMoveHandle)
      window.addEventListener('mouseup', mouseUpHandle)
      mouseMoveHandle(e)
    }
  }
}
