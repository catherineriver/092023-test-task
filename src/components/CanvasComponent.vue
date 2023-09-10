<template>
  <div class="canvas">
    <div class="canvas__block">
      <div class="canvas__title">Left sleeve</div>
      <canvas
          class="canvas__area"
          ref="leftSleeveCanvas"
          :width="placements.leftSleeve.width"
          :height="placements.leftSleeve.height"
      />
    </div>
    <div class="canvas__block">
      <div class="canvas__section">
        <div class="canvas__title">Front side</div>
        <canvas
            class="canvas__area"
            ref="frontCanvas"
            :width="placements.frontSide.width"
            :height="placements.frontSide.height"
        />
      </div>
      <div class="canvas__section">
        <div class="canvas__title">Back side</div>
        <canvas
            class="canvas__area"
            ref="backCanvas"
            :width="placements.backSide.width"
            :height="placements.backSide.height"
        />
      </div>
    </div>
    <div class="canvas__block">
      <div class="canvas__title">Right sleeve</div>
      <canvas
          class="canvas__area"
          ref="rightSleeveCanvas"
          :width="placements.rightSleeve.width"
          :height="placements.rightSleeve.height"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['placements', 'layers'],
  data() {
    return {
      frontCenterX: 0,
      frontCenterY: 0,
    };
  },
  mounted() {
    // Calculate center coordinates when the component is mounted
    this.calculateCenters();
    // Draw on the canvas after the next DOM update cycle
    this.$nextTick(() => {
      this.drawCanvas();
    });
  },
  watch: {
    placements: {
      handler: 'debouncedDrawCanvas',
      deep: true,
    },
    layers: 'debouncedDrawCanvas'
  },
  methods: {
    // Calculate center coordinates for the front canvas
    calculateCenters() {
      this.frontCenterX = this.placements.frontSide.width / 2;
      this.frontCenterY = this.placements.frontSide.height / 2;
    },
    // Debounce the canvas drawing to optimize performance
    debouncedDrawCanvas() {
      requestAnimationFrame(this.drawCanvas);
    },
    // Main method to draw on all canvases
    drawCanvas() {
      if (this.placements && this.layers) {
        this.drawOnCanvas('frontCanvas', this.placements.frontSide);
        this.drawOnCanvas('backCanvas', this.placements.backSide);
        this.drawOnCanvas('leftSleeveCanvas', this.placements.leftSleeve);
        this.drawOnCanvas('rightSleeveCanvas', this.placements.rightSleeve);
      }
    },
    // Draw on a specific canvas based on its reference and placement
    drawOnCanvas(canvasRef, placement) {
      const canvas = this.$refs[canvasRef];
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate new center coordinates and ratios for scaling
      const newPlacementCenterX = placement.width / 2;
      const newPlacementCenterY = placement.height / 2;
      const widthRatio = placement.width / this.placements.frontSide.width;
      const heightRatio = placement.height / this.placements.frontSide.height;
      const minRatio = Math.min(widthRatio, heightRatio);

      // Draw each layer on the canvas
      Object.values(this.layers).forEach(layer => {
        const layerCenterX = layer.x + layer.width / 2;
        const layerCenterY = layer.y + layer.height / 2;
        const relativeX = layerCenterX - this.frontCenterX;
        const relativeY = layerCenterY - this.frontCenterY;
        const newX = newPlacementCenterX + relativeX * minRatio - (layer.width * minRatio) / 2;
        const newY = newPlacementCenterY + relativeY * minRatio - (layer.height * minRatio) / 2;
        const newWidth = layer.width * minRatio;
        const newHeight = layer.height * minRatio;

        // Fill the layer with its color
        ctx.fillStyle = layer.color;
        ctx.fillRect(newX, newY, newWidth, newHeight);
      });
    }
  }
};

</script>

<style>
.canvas {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
}

.canvas__area {
  background: var(--vt-c-white-mute);
}

.canvas__title {
  font-size: 10px;
}

@media screen and (max-width: 1024px) {
  .canvas {
    justify-content: flex-start;
  }
}

@media screen and (max-width: 768px) {
  .canvas {
    display: flex;
    flex-direction: column;
  }
}
</style>
