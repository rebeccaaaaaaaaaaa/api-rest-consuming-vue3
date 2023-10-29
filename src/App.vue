<template>
  <Header />
  <div class="container">
    <div class="search-area">
      <input type="text" placeholder="🔍 Search for a country..." v-model="searchCountry" />
      <select name="" v-model="selectedRegion" @change="handleRegionChange">
        <option value="">All</option>
        <option :value="item" v-for="item in regions" :key="item">{{ item }}</option>
      </select>
    </div>
    <div class="countries">
      <div class="row">
          <CountryCard
            v-for="item in countries"
            :key="item.id"
            :country="item"
          />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import CountryCard from './components/CountryCard.vue';

import { onMounted, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedRegion = ref(''); // Inicialmente, nada selecionado
const searchCountry = ref(''); // Inicialmente, a busca está vazia

const countries = computed(() => {
  // Filtrar os países com base na região selecionada
  let filteredCountries = store.state.countries;

  if (selectedRegion.value) {
    filteredCountries = filteredCountries.filter(country => country.region === selectedRegion.value);
  }

  // Filtrar os países com base na busca de nome
  if (searchCountry.value) {
    filteredCountries = filteredCountries.filter(country => country.name.common.toLowerCase().includes(searchCountry.value.toLowerCase()));
  }

  console.log(filteredCountries)
  return filteredCountries;
});

const regions = computed(() => {
  console.log(store.state.regions)
  return store.state.regions;
});


onMounted(() => {
  store.dispatch('fetchCountries');
});
</script>

<style scoped>
.search-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.5rem 0;
}

.countries .card {
  border-radius: 3px;
  box-shadow: 0px 3px 6px #00000016;
}

.card {
  cursor: pointer;
}

.card img {
  height: 150px;
  object-fit: cover;
}

.card--content {
  padding: 1rem;
}

input {
  padding: 10px;
  border-radius: 3px;
  border: none;
  outline: none;

}

select {
  padding: 10px;
  border-radius: 3px;
  border: none;
  outline: none;
}

button.darkMode {
  padding: 10px;
  border-radius: 3px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.modal {
  
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #888;
}

.close:hover,
.close:focus {
  color: #000;
}

.modal h2 {
  font-size: 1.5rem;
}

.modal img {
  max-width: 100%;
  height: auto;
}

</style>
