<template>
    <v-container mt-4>
        <v-card class="pa-4">
            <v-row>
                <v-col cols-12>
                    <FormFilter/>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols-12>
                    <CustomDataTable/>
                </v-col>
            </v-row>
        </v-card> 
    </v-container>
</template>

<script lang="js">
import CustomDataTable from '@/components/core/CustomDataTable.vue';
import FormFilter from '@/components/FormFilter.vue'

export default {
    name: "CustomDashboard",
    components: {
        CustomDataTable,
        FormFilter,
    },
    data: () => ({
    }),
}
</script>