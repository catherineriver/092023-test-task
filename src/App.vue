<template>
  <div class="header">
    <ThemeSwitcher/>
  </div>
  <div class="container">
    <PlacementDimensionInput @update-dimensions="updateDimensions"/>
    <div class="action-field">
      <CanvasComponent :placements="placements" :layers="layers"/>
    </div>
    <LayerDataInput @update-layers="updateLayers"/>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import PlacementDimensionInput from './components/PlacementDimensionInput.vue';
import LayerDataInput from './components/LayerDataInput.vue';
import CanvasComponent from './components/CanvasComponent.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

export default {
  components: {
    PlacementDimensionInput,
    LayerDataInput,
    CanvasComponent,
    ThemeSwitcher
  },
  computed: {
    ...mapState(['placements', 'layers'])
  },
  methods: {
    ...mapMutations(['updatePlacements', 'updateLayers']),
    updateDimensions(dimensions) {
      this.updatePlacements(dimensions);
    },
    updateLayers(layers) {
      this.updateLayers(layers);
    }
  }
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 210px calc(100% - 420px) 210px;
}

.action-field {
  git branch -M main
  git push -u origin main
  overflow: scroll;
  margin: 0 8px;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 8px 0;
}

@media screen and (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
