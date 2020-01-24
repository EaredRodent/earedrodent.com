<template>
  <div class="b6-page">
    <v-text-field v-model="artId"/>
    <v-btn @click="go">Go {{ Number(artId) }}</v-btn>
    <div style="background: darkslateblue">{{ result }}</div>
    <!--    <div>{{ ready }}</div>-->
    <div class="b6-block" v-for="(o, i) in trainData" :key="i">{{ o }}</div>
  </div>
</template>

<script>
// import brain from 'brain.js'

export default {
  name: 'Index',
  layout: 'client',
  data () {
    return {
      trainData: [],
      net: {},
      artId: 0,
      result: [],
      step: 0,
      ready: ''
    }
  },
  async mounted () {
    // const config = {
    //   binaryThresh: 0.5,
    //   hiddenLayers: [1], // array of ints for the sizes of the hidden layers in the network
    //   activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    // }

    this.net = new window.brain.NeuralNetwork()

    this.ready = 'Processing...'

    for (let i = 0; i < 1; i++) {
      let { data: orders } = await this.$axios.get('v1/test/get-orders', {
        params: {
          offset: 100 * i,
          limit: 100
        }
      })

      for (let order of orders) {
        // let artsInOrder = 0
        // if (order.slsItems.length) {
        //   artsInOrder = order.slsItems.reduce((acc, item) => acc + this.artsInItem(item), 0)
        // }

        for (let slsItem of order.slsItems) {
          let obj = {
            input: { [slsItem.blankFk.model_fk]: 1 },
            output: {}
          }

          // let artsInOrderWithoutCurItem = artsInOrder - this.artsInItem(slsItem)

          for (let slsItemB of order.slsItems) {
            if (slsItem.id === slsItemB.id) {
              continue
            }
            obj.output[slsItemB.blankFk.model_fk] = 1
          }

          this.trainData.push(obj)
        }
      }
    }

    setTimeout(() => {
      this.net.train(this.trainData)
      this.ready = 'Ready!'
    })
  },
  methods: {
    artsInItem (item) {
      let arts = 0
      arts += item.size_5xs || 0
      arts += item.size_4xs || 0
      arts += item.size_3xs || 0
      arts += item.size_2xs || 0
      arts += item.size_xs || 0
      arts += item.size_s || 0
      arts += item.size_m || 0
      arts += item.size_l || 0
      arts += item.size_xl || 0
      arts += item.size_2xl || 0
      arts += item.size_3xl || 0
      arts += item.size_4xl || 0
      return arts
    },
    go () {
      alert('fff')
      let result = this.net.run({ [this.artId]: 1 })
      this.result = Object.entries(result).sort((a, b) => a[1] - b[1]).reverse()
    }
  }
}
</script>

<style scoped>

</style>
