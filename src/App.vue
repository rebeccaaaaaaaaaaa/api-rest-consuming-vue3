<template>
  <CountryList />
  <RouterView></RouterView>
</template>

<script setup>
import CountryList from './views/CountryList.vue';

import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchCountries');
});
</script>

