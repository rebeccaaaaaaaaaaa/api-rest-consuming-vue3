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
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6" v-for="(item, index) in countries" :key="index"
                    @click="handleShowDetailsSection(item, index)">
                    <div class="card">
                        <img :src="item.flags.png" alt="Flag" class="img-fluid">
                        <div class="card--content">
                            <p><strong>Name</strong>: {{ item.name.common }}</p>
                            <p><strong>Population: </strong> {{ item.population }}</p>
                            <p><strong>Area: </strong> {{ item.area }} m²</p>
                            <p><strong>Region: </strong> {{ item.continents[0] }}</p>
                        </div>
                    </div>
                    <div class="modal" v-if="selectedItem === item">
                        <div class="modal-content">
                            <img :src="item.flags.png" alt="Flag" class="img-fluid">
                            <p><strong>Name</strong>: {{ item.name.common }}</p>
                            <p><strong>Population: </strong> {{ item.population }}</p>
                            <p><strong>Area: </strong> {{ item.area }} m²</p>
                            <p><strong>Region: </strong> {{ item.continents[0] }}</p>
                            <p><strong>Capital: </strong>{{ item.capital[0] }}</p>
                        </div>
                    </div>

                </div>
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
const showDetailsSection = ref(false)
const selectedItem = ref(null); // Inicialmente, nenhum item selecionado

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

const handleShowDetailsSection = (item) => {
    if (selectedItem.value === item) {
        // Se o mesmo item já estiver selecionado, desmarque-o
        selectedItem.value = null;
    } else {
        // Caso contrário, selecione o novo item
        selectedItem.value = item;
    }
}
</script>

<style scoped>
/* Estilo para o modal */
.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Fundo semi-transparente */
    z-index: 999;
    /* Coloca o modal acima de outros elementos */
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

/* Estilo para evitar que o fundo role quando o modal está aberto */
html {
    overflow: hidden;
}

/* Estilo para o botão de fechar o modal */
.modal button {
    background: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
}


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
