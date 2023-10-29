import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    countries: [],
    regions: [],
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SET_REGIONS(state, regions) {
      state.regions = regions;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const data = await axios.get("https://restcountries.com/v3.1/all");
        // Extraia as regiões dos países
        const regions = data.data.map(country => country.region);
        // Remova valores duplicados (caso haja)
        const uniqueRegions = [...new Set(regions)];
        commit("SET_COUNTRIES", data.data);
        commit("SET_REGIONS", uniqueRegions);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
