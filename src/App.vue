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

        <!--
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          /> 
        -->
      </div>

      <!-- 
        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">Latest Release</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn> 
      -->
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

  data: () => ({
    //
  }),
};
</script>
