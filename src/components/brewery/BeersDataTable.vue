<template>
    <div>
        <v-data-table
            :single-expand="getSingleExpand"
            :headers="headers"
            :items="beers"
            :options.sync="options"
            :server-items-length="getTotalItems"
            :hide-default-header="false"
            :loading="loading"
            :items-per-page="itemsPerPage"
            @page-count="setPageCount"
            hide-default-footer
            show-expand
        >
            <!-- Filters -->
            <template v-slot:top>
                <FormFilter/>
            </template>
    
            <!-- Column Image -->
            <template v-slot:[`item.image_url`]="{ item }">
                <!-- NOTE: Para hacer uso de componentes o "celdas personalizadas" usamos un slot correspondiente al de la celda que deseamos personalizar -->
                <v-img :src="item.image_url" max-height="60" max-width="20" contain class="ma-1"/>
            </template>
    
            <!-- Expand section -->
            <template v-slot:[`expanded-item`]="{headers, item}">
                <td :colspan="headers.length" class="pa-3">
                    {{ item.description }}
                </td>
            </template>
        </v-data-table>

        <ExternalPaginator class="mt-6"/>
    </div>
</template>

<script lang="js">
    import FormFilter from '@/components/brewery/FormFilter.vue'
    import ExternalPaginator from '@/components/core/ExternalPaginator.vue'
    // NOTE: Se importan los getters y action de nuestro storage para poder acceder directamente desde nuestro componente como si fuesen funciones propias del componente
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "BeersDataTable",
        components: {
            FormFilter,
            ExternalPaginator,
        },
        data: () => ({
            totalBeers: 325,
            loading: true,
            options: {},
            headers: [
                {text: '', align:'center', value: 'image_url' },
                {text: 'Nombre', value: 'name' },
                { text: 'Eslogan', value: 'tagline' },
                { text: 'Primera cocci??n', value: 'first_brewed' },
                { text: 'Alc./Vol.', align:'center', value: 'abv' },
                { text: 'IBU', align:'center', value: 'abv' },
                { text: 'FG', align:'center', value: 'target_fg' },
                { text: 'OG', align:'center', value: 'target_og' },
                { text: 'EBC', align:'center', value: 'ebc' },
                { text: 'SRM', align:'center', value: 'srm' },
                { text: 'PH', align:'center', value: 'ph' },
                { text: 'Nivel de atenuaci??n', align:'center', value: 'attenuation_level' },
                { text: 'Descripci??n', align: 'center', value: 'data-table-expand' },
            ],
            beers: [],
        }),
        created() {
            this.populateData();
        },
        watch: {
            options: {
                handler () {
                    this.orderRows();
                },
                deep: true,
            },
            getBeersRows: {
                handler (newValue, oldValue) {
                    if((newValue !== oldValue)){
                        this.orderRows();
                    }
                },
                deep: true
            },
            itemsPerPage(newValue, oldValue) {
                if(newValue !== oldValue) {
                    this.$forceUpdate();
                }
            },
        },
        computed: {
            itemsPerPage () {
                // NOTE: No es recomendable tener la l??gica directamente en los props de un componente o directamente en el DOM por esa raz??n se agrega este computed
                return parseInt(this.getItemsPerPage);
            },
            // NOTE: Agregamos los getters a nuestros computed para acceder a los getters para acceder directamente como si fuese un computed mas
            ...mapGetters('beers', [
                'getBeersRows',
                'getSingleExpand',
                'getCurrentPage',
                'getTotalItems',
                'getItemsPerPage',
            ]),
        },
        methods: {
            async populateData () {
                this.loading = true
                await this.fetchBeers();
                this.loading = false
            },
            // NOTE: Ordenamos los rows dentro del componente ya que deseamos ordenar los datos de acuerdo a las opciones de la datatable, adem??s nuestra API no cuenta con opciones para realizar el ordenamiento enviando las opciones
            orderRows () {
                const { sortBy, sortDesc, page, itemsPerPage } = this.options
                let items = this.getBeersRows;

                if (sortBy.length === 1 && sortDesc.length === 1) {
                    items = items?.sort((a, b) => {
                        const sortA = a[sortBy[0]]
                        const sortB = b[sortBy[0]]

                        if (sortDesc[0]) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                        } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                        }
                    });
                }

                if (itemsPerPage > 0) {
                    items = items?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
                }

                this.beers = items;
                this.totalBeers = items?.length;
            },
            // NOTE: Agregamos los setters a nuestros methods para acceder a los setters para acceder directamente como si fuese una funci??n mas del componente
            ...mapActions('beers', [
                'fetchBeers',
                'setPageCount',
            ]),
        },
    }
</script>