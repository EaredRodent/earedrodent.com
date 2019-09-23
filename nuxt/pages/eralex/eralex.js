export default {
  name: 'Index',
  data () {
    return {
      fileNames: [],
      uploadState: -2,
      snackbar: false
    }
  },
  methods: {
    btnUploadClick () {
      this.$refs.hiddenUploadButton.value = ''
      this.$refs.hiddenUploadButton.click()
    },
    async uploadFiles () {
      this.uploadState = -1
      this.snackbar = true

      let data = new FormData()

      this.fileNames.splice(0, this.fileNames.length)
      for (let file of this.$refs.hiddenUploadButton.files) {
        data.append(file.name, file)
        this.fileNames.push(file.name)
      }

      try {
        let { data: { archiveUrl } } = await this.$axios.post('v1/eralex/upload', data, {
          headers: { 'content-type': 'multipart/form-data' }
        })
        this.uploadState = 1
        this.snackbar = true
        window.location = archiveUrl
      } catch (e) {
        this.uploadState = 0
        this.snackbar = true
      }
    }
  }
}
