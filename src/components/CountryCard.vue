<template>
    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
        <div class="card" @click="getCountryDetails">
            <img :src="country.flags.png" alt="Flag" class="img-fluid">
            <div class="card--content">
                <p><strong>Name</strong>: {{ country.name.common }}</p>
                <p><strong>Population: </strong> {{ country.population }}</p>
                <p><strong>Area: </strong> {{ country.area }} m²</p>
                <p><strong>Region: </strong> {{ country.continents[0] }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        country: Object,
        getDetails: Function
    },
    methods: {
  getCountryDetails() {
    // Chame a função getDetails passando o país como argumento
    this.getDetails(this.country);
  },
},
};

</script>
  
<style scoped>
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

/* Adicione estilos relevantes ao cartão do país aqui */
</style>
  