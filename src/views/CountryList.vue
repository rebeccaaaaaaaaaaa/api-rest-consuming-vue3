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
                <CountryCard v-for="(item, index) in countries" :key="index" :country="item"
                    :getDetails="getCountryDetails" />
            </div>
        </div>
        <div class="countriesDetails">
            <div v-if="selectedItem">
                <h2>Selected Country Details</h2>
                <p><strong>Name</strong>: {{ selectedItem.name?.common }}</p>
                <p><strong>Population:</strong> {{ selectedItem.population }}</p>
                <p><strong>Area:</strong> {{ selectedItem.area }} m²</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import CountryCard from '../components/CountryCard.vue';

import { onMounted, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedRegion = ref(''); // Inicialmente, nada selecionado
const searchCountry = ref(''); // Inicialmente, a busca está vazia
const selectedItem = ref(null); // Inicialmente, nada selecionado

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

    console.log(filteredCountries);
    return filteredCountries;
});

const regions = computed(() => {
    console.log(store.state.regions);
    return store.state.regions;
});

const getCountryDetails = (country) => {
    selectedItem.value = country;
    console.log(selectedItem);
};

onMounted(() => {
    store.dispatch('fetchCountries');
});
</script>

<style scoped>
input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

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
</style>
