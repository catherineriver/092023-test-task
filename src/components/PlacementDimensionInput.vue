<template>
  <div class="column">
    <div class="row" v-for="(placement, key) in placements" :key="key">
      <h3>{{ humanReadableNames[key] || key }}</h3>
      <div class="inputs-block">
        <div class="input-component" v-for="(value, prop) in placement" :key="prop">
          <label :for="`${key}-${prop}`">{{ humanReadableNames[prop] || prop }}</label>
          <input
              :id="`${key}-${prop}`"
              type="number"
              v-model="placement[prop]"
              :placeholder="`${humanReadableNames[key] || prop}`"
          />
        </div>
      </div>

    </div>
    <div class="button-block">
      <button @click="emitDimensions">Update</button>

    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['placements'])
  },
  data() {
    return {
      frontSide: {},
      backSide: {},
      leftSleeve: {},
      rightSleeve: {},
      humanReadableNames: {
        frontSide: 'Front Side',
        backSide: 'Back Side',
        leftSleeve: 'Left Sleeve',
        rightSleeve: 'Right Sleeve',
        width: 'W:',
        height: 'H:'
      }
    };
  },
  methods: {
    ...mapMutations(['updatePlacements']),
    emitDimensions() {
      this.updatePlacements(this.placements);
    },
  },
  mounted() {
    this.frontSide = {...this.placements.frontSide};
    this.backSide = {...this.placements.backSide};
    this.leftSleeve = {...this.placements.leftSleeve};
    this.rightSleeve = {...this.placements.rightSleeve};
  }
};
</script>
