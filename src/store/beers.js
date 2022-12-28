import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// NOTE: Lo ideal es tener un storage de Vuex por cada modulo, es por eso que cree un nuevo archivo para mi vista de cervezas
export default {
    namespaced: true,
    state: {
        currentPage: 1,
        itemsPerPage: 10,
        pageCount: 1,
        // NOTE: El paginador podría mostrar paginas vacías porque el API no envía el total de elementos encontrados al filtrar
        totalItems: 0,
        beersRows: [],
        singleExpand: true,
        filterSearchText: "",
        filterSearchBy: "",
    },
    getters: {
        getCurrentPage(state) {
            return state.currentPage;
        },
        getItemsPerPage(state) {
            return state.itemsPerPage;
        },
        getTotalItems(state) {
            return state.totalItems;
        },
        getBeersRows(state) {
            return state.beersRows;
        },
        getSingleExpand(state) {
            return state.singleExpand;
        },
        getFilterSearchText(state) {
            return state.filterSearchText;
        },
        getFilterSearchBy(state) {
            return state.filterSearchBy;
        },
        getPageCount(state) {
            return state.pageCount;
        },
    },
    mutations: {
        currentPage(state, page) {
            state.currentPage = page
        },
        itemsPerPage(state, page) {
            state.itemsPerPage = page
        },
        pageCount(state, count) {
            state.pageCount = count
        },
        totalItems(state, total) {
            state.totalItems = total;
        },
        beersRows(state, rows = []) {
            state.beersRows = rows;
        },
        singleExpand(state, singleExpand) {
            state.singleExpand = singleExpand;
        },
        filterSearchText(state, value) {
            state.filterSearchText = value;
        },
        filterSearchBy(state, value) {
            state.filterSearchBy = value;
        },
    },
    actions: {
        async fetchBeers ({commit, getters}) {
            try {
                let filters = "";
                
                if(getters.getFilterSearchText.length > 0){
                    filters += `&${getters.getFilterSearchBy}=${getters.getFilterSearchText.trim().replace(" ", "_")}`;
                }
                
                const result = await fetch(
                    `https://api.punkapi.com/v2/beers?page=${getters.getCurrentPage}&per_page=${getters.getItemsPerPage}${filters}`,
                    {metod: "GET"},
                );
                

                if (result.ok) {
                    const response = await result.json();
                    commit('beersRows', response);
                    // NOTE: Al trabajar una datatable en modo serverside (que los datos se piden al backend deacurdo a la pagina que se desea mostrar)
                    //el backend debe de traer la cantidad del total de los resultados, en este caso se "hardcodeara" el total ya que el APi no trae esa información.
                    commit('totalItems', 325);
                }
            } catch (error) {
                console.log(error);
            }
        },
        setSingleExpand ({commit}, singleExpand) {
            commit('singleExpand', singleExpand);
        },
        setFilterSearchText({commit}, value = "") {
            commit('filterSearchText', value);
        },
        setFilterSearchBy({commit}, value) {
            commit('filterSearchBy', value);
        },
        setCurrentPage({commit}, value) {
            commit('currentPage', value);
        },
        setPageCount({commit}, count) {
            commit('pageCount', count);
        },
    },
}
