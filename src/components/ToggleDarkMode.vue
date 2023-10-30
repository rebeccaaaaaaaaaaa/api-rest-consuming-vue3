<template>
    <button class="darkMode" @click="toggleDarkMode">
        {{ darkModeIcon }} {{ darkModeText }}
    </button>
</template>
  
<script setup>
import { computed, watch, ref, onMounted } from 'vue';

const darkMode = ref(false)

const darkModeText = computed(() => (darkMode.value ? 'Light Mode' : 'Dark Mode'));
const darkModeIcon = computed(() => (darkMode.value ? '🌞' : '🌙'));


const toggleDarkMode = () => {
    darkMode.value = !darkMode.value; // Alternar entre modo escuro e modo claro
    saveDarkModePreference()
};

// Funções para salvar e recuperar a preferência do tema no Local Storage
const saveDarkModePreference = () => {
    localStorage.setItem('darkMode', darkMode.value.toString());
};

const loadDarkModePreference = () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        darkMode.value = savedDarkMode === 'true';
    }
};

onMounted(() => {
    loadDarkModePreference(); // Carregar a preferência do tema ao montar o componente
});

watch(darkMode, (newMode) => {
    // Aplicar o estilo com base no modo selecionado
    if (newMode) {
        // Ativar o modo escuro
        document.body.classList.add('dark-mode');
    } else {
        // Desativar o modo escuro
        document.body.classList.remove('dark-mode');
    }
});

</script>
  
<style scoped></style>
  