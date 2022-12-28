<template>
    <v-container>
        <!-- NOTE: El paginador podría mostrar paginas vacías porque el API no envía el total de elementos encontrados al filtrar -->
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-pagination
                    v-model="currentPage"
                    :length="getPageCount"
                    total-visible="7"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="js">
    // NOTE: El paginador se creo como componente para facilitar un uso posterior y poder reutilizar en otras vistas o datatables
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "ExternalPaginator",
        computed:{
            currentPage: {
                get() {
                    return this.getCurrentPage;
                },
                async set(newValue){
                    this.setCurrentPage(newValue);
                    await this.fetchBeers();
                }
            },
            // NOTE: Agregamos los getters a nuestros computed para acceder a los getters para acceder directamente como si fuese un computed mas
            ...mapGetters('beers', [
                'getCurrentPage',
                'getTotalItems',
                'getPageCount',
            ]),
        },
        methods: {
            // NOTE: Agregamos los setters a nuestros methods para acceder a los setters para acceder directamente como si fuese una función mas del componente
            ...mapActions('beers', [
                'setCurrentPage',
                'fetchBeers',
            ]),
        }
    }
</script>