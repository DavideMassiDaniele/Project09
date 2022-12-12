<template>
  <v-btn
		icon
		@click="toggle_dark_mode"
		color="primary"
	>
    <v-icon>mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'DarkThemeToggle',
    methods: {
      toggle_dark_mode: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      }
    },
    mounted() {
      const theme = localStorage.getItem("dark_theme");
      if (theme) {
        if (theme === "true") {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem(
          "dark_theme",
          this.$vuetify.theme.dark.toString()
        );
      }
    },
  }
</script>

<style>
</style>