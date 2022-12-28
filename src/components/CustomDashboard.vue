<template>
    <v-container mt-4>
        <v-card class="pa-6 rounded-lg">
            <BeersDataTable/>
        </v-card> 
    </v-container>
</template>

<script lang="js">
import BeersDataTable from '@/components/brewery/BeersDataTable.vue';

export default {
    name: "CustomDashboard",
    components: {
        BeersDataTable,
    },
}
</script>