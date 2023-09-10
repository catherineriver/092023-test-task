<template>
  <div class="column">
    <div class="row" v-for="(layer, key) in layers" :key="key">
      <h3>{{ humanReadableNames[key] || key }}</h3>
      <div class="inputs-block">
        <div class="input-component" v-for="(value, prop) in layer" :key="prop">
          <label :for="`${key}-${prop}`">{{ humanReadableNames[prop] || prop }}:</label>
          <input
              :id="`${key}-${prop}`"
              :type="prop === 'color' ? 'color' : 'number'"
              v-model="layer[prop]"
              :placeholder="`${humanReadableNames[key] || key} ${humanReadableNames[prop] || prop}`"
          />
        </div>
      </div>
    </div>
    <div class="button-block">
      <button @click="emitLayers">Update</button>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      humanReadableNames: {
        layer1: 'Layer 1',
        layer2: 'Layer 2',
        x: 'X',
        y: 'Y',
        width: 'W',
        height: 'H',
        color: 'Color'
      }
    };
  },
  computed: {
    ...mapState(['layers'])
  },
  methods: {
    ...mapMutations(['updateLayers']),
    emitLayers() {

      this.updateLayers({
        layer1: this.layers.layer1,
        layer2: this.layers.layer2
      });
    }
  },
  mounted() {
    this.layer1 = this.layers.layer1;
    this.layer2 = this.layers.layer2;
  }
};
</script>

