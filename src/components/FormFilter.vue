<template>
    <div>    
        <v-card
            class="d-md-flex justify-md-space-between"
            flat
        >
            <v-card class="d-md-flex" flat>
                <v-select
                    name="filterSearchBy"
                    class="mr-2"
                    v-model="filterSearchBy"
                    prefix="Filtrar por: "
                    :items="items"
                />
                <v-form @submit.prevent="onSubmit" v-model="valid" ref="filterForm" fluid>
                    <v-text-field
                        name="filterSearchText"
                        append-outer-icon="mdi-magnify"
                        clear-icon="mdi-close-circle"
                        v-model="filterSearchText"
                        :label="textInputOptions.label"
                        :type="textInputOptions.type"
                        :rules="textInputOptions.rules"
                        solo
                        clearable
                        @click:append-outer="onSubmit"
                    />
                </v-form>
            </v-card>

            <v-switch
                name="singleExpand"
                v-model="singleExpand"
                label="Expansión única"
            />
        </v-card>
        <v-card flat>
            <v-chip
                v-if="getFilterSearchText"
                class="ma-2"
                close
                @click:close="onClearFilters"
            >
                {{getFilterSearchText}}
            </v-chip>
        </v-card>
    </div>
</template>

<script lang="js">
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "FormFilter",
        emits: ["singleExpand"],
        data: () => ({
            valid: false,
            singleExpand: true,
            filterSearchBy: "beer_name",
            filterSearchText: "",
            textInputOptions: {
                type: "text",
                label:"Buscar",
                rules: [v => v?.trim().length >=1 || "El campo es requerido"],
            },
            items:[
                {text:"Nombre de cerveza", value:"beer_name"},
                {text:"Nombre de levadura", value:"yeast"},
                {text:"Nombre de lúpulo", value:"hops"},
                {text:"Nombre de malta", value:"malt"},
                {text:"Por alimentos", value:"food"},
                {divider:true},
                {text:"Elaborado antes de", value:"brewed_before"},
                {text:"Elaborado después de", value:"brewed_after"},
                {divider:true},
                {text:"Alc./Vol. mayor a", value:"abv_gt"},
                {text:"Alc./Vol. menor a", value:"abv_lt"},
                {text:"IBU mayor a", value:"ibu_gt"},
                {text:"IBU menor a", value:"ibu_lt"},
                {text:"EBC mayor a", value:"ebc_gt"},
                {text:"EBC menor a", value:"ebc_lt"},
            ],
        }),
        watch:{
            singleExpand(newValue) {
                if(newValue !== this.getSingleExpand) {
                    this.setSingleExpand(newValue);
                }
            },
            getSingleExpand(newValue) {
                this.singleExpand = newValue;
            },
            filterSearchBy() {
                this.setSearchField();
            }
        },
        computed: {
            ...mapGetters('beers', [
                'getSingleExpand',
                'getFilterSearchText',
                'getFilterSearchBy',
            ]),
        },
        methods: {
            setSearchField() {
                if(
                    [
                        "brewed_before",
                        "brewed_after",
                    ].includes(this.filterSearchBy)
                ) {
                    this.textInputOptions.type = "date";
                    this.textInputOptions.rules = [v => v?.trim().length >=1 || "La fecha es requerida"];
                } else if(
                    [
                        "ibu_gt",
                        "ibu_lt",
                        "ebc_gt",
                        "ebc_lt",
                    ].includes(this.filterSearchBy)
                ) {
                    this.textInputOptions.type = "number";
                    this.textInputOptions.label = "0";
                    this.textInputOptions.rules = [
                        v => v?.trim().length >= 1 || "El campo es requerido",
                        v => parseInt(v?.trim()) >= 0 || "El valor no puede ser negativo"
                    ]
                } else {
                    this.textInputOptions.type = "text";
                    this.textInputOptions.label = "Buscar";
                    this.textInputOptions.rules = [v => v?.trim().length >=1 || "El campo es requerido"]
                }
            },
            async onSubmit() {
                this.$refs.filterForm.validate();
                if(this.valid) {
                    this.setFilterSearchText(this.filterSearchText);
                    this.setFilterSearchBy(this.filterSearchBy);
                    await this.fetchBeers();
                    this.filterSearchText = "";
                }
                this.$refs.filterForm.resetValidation();
            },
            onClearFilters() {
                this.setFilterSearchText();
                this.fetchBeers();
            },
            ...mapActions('beers', [
                'fetchBeers',
                'setSingleExpand',
                'setFilterSearchText',
                'setFilterSearchBy'
            ]),
        },
    }
</script>