<template>
  <div class="button-block">
    <button @click="toggleTheme">
      {{ currentTheme === 'dark' ? '☀️' : '🌙' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: 'dark' // По умолчанию темная тема
    };
  },
  methods: {
    toggleTheme() {
      if (this.currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        this.currentTheme = 'light';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.currentTheme = 'dark';
      }
    }
  },
  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.currentTheme = 'light';
    }
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
};
</script>

<style scoped>
.button-block {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: 40px;
}

.button-block button {
  max-width: 54px;
  font-size: 22px;
  background: var(--color-background-mute);
}
</style>
