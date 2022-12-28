<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-pagination
                    v-model="currentPage"
                    :length="getPageCount"
                    total-visible="7"
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="2">
                <v-text-field
                    v-model="itemsPerPage"
                    label="Elementos por pagina"
                    type="number"
                    min="1"
                    max="80"
                    step="10"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="js">
import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "ExternalPaginator",
        computed:{
            itemsPerPage: {
                get() {
                    return this.getItemsPerPage;
                },
                async set(newValue){
                    this.setItemsPerPage(newValue);
                    await this.fetchBeers();
                }
            },
            currentPage: {
                get() {
                    return this.getCurrentPage;
                },
                async set(newValue){
                    this.setCurrentPage(newValue);
                    await this.fetchBeers();
                }
            },
            ...mapGetters('beers', [
                'getCurrentPage',
                'getItemsPerPage',
                'getTotalItems',
                'getPageCount',
            ]),
        },
        methods: {
            ...mapActions('beers', [
                'setItemsPerPage',
                'setCurrentPage',
                'fetchBeers',
            ]),
        }
    }
</script>