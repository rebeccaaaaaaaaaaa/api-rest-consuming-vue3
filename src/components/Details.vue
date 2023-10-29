<template>
    <img :src="country.flags.png" alt="Flag" class="img-fluid">
    <p><strong>Name</strong>: {{ country.name.common }}</p>
    <p><strong>Population: </strong> {{ country.population }}</p>
    <p><strong>Area: </strong> {{ country.area }} m²</p>
    <p><strong>Region: </strong> {{ country.continents[0] }}</p>
</template>
  
<script>
export default {
    props: {
        country: Object,
    },
};

</script>
  
<style scoped></style>
  