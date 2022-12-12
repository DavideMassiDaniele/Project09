<template>
  <v-footer
    app
    class="mt-10"
    color="primary"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="primary py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>UMLens</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer',

    data: () => {
        return {
            links: [
                {
                    name: 'UMLens Reference',
                    link: '',
                },
                {
                    name: 'FrontEnd Repo',
                    link: '',
                },
                {
                    name: 'BackEnd Repo',
                    link: '',
                },
                {
                    name: 'Paper',
                    link: '',
                },
            ]
        }
    }
}
</script>

<style>

</style>