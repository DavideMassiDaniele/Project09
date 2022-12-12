<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>{{ (drawer ? 'mdi-chevron-left' : 'mdi-menu') }}</v-icon>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center justify-center">
        <v-img alt="SisInfLab Logo" class="shrink mr-2" contain src="./assets/sisinflab.png"
          transition="scale-transition" width="200" height="50" />
      </div>

      <v-spacer></v-spacer>

      <DarkThemeToggle />

    </v-app-bar>

    <v-navigation-drawer app :value="($vuetify.breakpoint.mobile ? 1 : 0)" v-model="drawer" width="300" class="sidenav">
      <v-list>
        <v-list-item class="px-10 py-5">
          <v-img src="./assets/poliba.png"></v-img>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

    </v-navigation-drawer>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
  import DarkThemeToggle from './components/DarkThemeToggle';

  export default {
    name: 'App',

    components: {
      DarkThemeToggle,
    },

    data: () => ({
      drawer: null,
      items: [
        {
          icon: 'mdi-home-outline',
          text: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-timeline',
          text: 'Sequence diagrams',
          to: '/sequencediagram'
        },
        {
          icon: 'mdi-file-document-outline',
          text: 'Documentation',
          to: '/documentation'
        },
        {
          icon: 'mdi-account-circle-outline',
          text: 'People',
          to: '/people'
        },
        {
          icon: 'mdi-newspaper-variant-outline',
          text: 'Publications',
          to: '/publications'
        },
      ],
    }),

    computed: {
      drawer() {
        return !this.$vuetify.breakpoint.xs
      },
    }
  };
</script>

<style>
  *, .v-application .text-h3, .v-application .text-h5 {
    font-family: 'Poppins', sans-serif !important;
  }
  
</style>