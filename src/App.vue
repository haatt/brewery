<template>
  <v-app>
    <v-app-bar
      app
      color="#241dba"
      dark
    >
      <div class="d-flex align-center">
        <BreweryFactoryIcon width="50"/>

        <v-toolbar-title class="ml-3">
           Brewery
        </v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <CustomDashboard/>
    </v-main> 
  </v-app>
</template>

<script>
import BreweryFactoryIcon from '@/components/icons/BreweryFactoryIcon.vue';
import CustomDashboard from './components/CustomDashboard.vue';

export default {
  name: 'App',
  components: {
    BreweryFactoryIcon,
    CustomDashboard,
  },
};
</script>
