<template>
    <div class="header">
      <div class="container">
        <div class="header--content">
          <h1> Where is the country?</h1>
          <ToggleDarkMode />
        </div>
      </div>
    </div>
</template>
  
<script setup>
import ToggleDarkMode from './ToggleDarkMode.vue'
</script>
  
<style scoped>
.header {
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0px 3px 6px #00000016;
}

.header--content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
  