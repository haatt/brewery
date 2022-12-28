<template>
    <v-row>
        <v-col cols="6" class="pa-6">
            <v-form>
                <v-text-field
                    append-outer-icon="mdi-magnify"
                    clear-icon="mdi-close-circle"
                    solo
                    clearable
                    label="Buscar"
                    type="text"
                    @click:append-outer="onSubmit"
                ></v-text-field>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="js">
export default {
    name: "FormFilter",
    methods: {
        onSubmit() {
            console.log("rafaaaaaaaaaaa");
        }
    }
}
</script>