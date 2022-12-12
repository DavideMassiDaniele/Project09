<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h3 text-center my-5">People</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-for="(person, i) in people" :key="i">
        <v-card class="mx-auto" outlined min-height="250">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ person.profession }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ person.surname }}
                <br>
                {{ person.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ person.description }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100">
              <v-img v-bind:src="'assets/people/' + person.src"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions style="position: absolute; bottom: 2px;">
            <v-btn icon :href="person.linkedin" target="_blank">
              <v-icon size="30" color="primary">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon :href="person.github" target="_blank">
              <v-icon size="30" color="primary">mdi-github</v-icon>
            </v-btn>
            <v-btn icon :href="person.mail" target="_blank">
              <v-icon size="30" color="primary">mdi-email</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'People',

    data: () => ({
      people: [
        {
          surname: 'AGHILAR',
          name: 'Potito',
          profession: 'Master Degree Student',
          description: 'Living my life one buffer overflow at a time.',
          src: 'aghilar.jpg',
          linkedin: 'https://www.linkedin.com/in/potito-aghilar/',
          github: 'https://github.com/potitoaghilar',
          mail: 'mailto:p.aghilar@studenti.poliba.it',
        },
        {
          surname: 'BILENCHI',
          name: 'Ivano',
          profession: 'PhD Student',
          description: 'If we ought to go, let\'s go; if we ought not to go, let\'s not go.',
          src: 'bilenchi.jpg',
          linkedin: 'https://www.linkedin.com/in/ivanobilenchi/',
          github: 'https://github.com/IvanoBilenchi',
          mail: 'mailto:ivano.bilenchi@poliba.it',
        },
        {
          surname: 'DI SCIASCIO',
          name: 'Eugenio',
          profession: 'Full Professor',
          description: 'We learned more from a three minute record than we ever learned in school...',
          src: 'disciascio.png',
          linkedin: 'https://www.linkedin.com/in/eugenio-di-sciascio-24272a26/',
          github: 'https://github.com/sisinflab/',
          mail: 'mailto:eugenio.disciascio@poliba.it',
        },
        {
          surname: 'FIORE',
          name: 'Marco',
          profession: 'Master Degree Student',
          description: 'If you no longer go for a gap that exists, you are no longer a driver.',
          src: 'fiore.jpg',
          linkedin: 'https://www.linkedin.com/in/marco-fiore/',
          github: 'https://github.com/mackerkun',
          mail: 'mailto:m.fiore22@studenti.poliba.it',
        },
        {
          surname: 'MONGIELLO',
          name: 'Marina',
          profession: 'Associate Professor',
          description: 'It\'s magical how something so simple represents so much.',
          src: 'mongiello.jpg',
          linkedin: 'https://www.linkedin.com/in/marina-mongiello-60673472/',
          github: 'https://github.com/sisinflab/',
          mail: 'mailto:marina.mongiello@poliba.it',
        },
        {
          surname: 'NOCERA',
          name: 'Francesco',
          profession: 'Post Doc',
          description: 'Catch the trade winds in your sails. Explore. Dream. Discover.',
          src: 'nocera.jpg',
          linkedin: 'https://www.linkedin.com/in/francesco-nocera-poliba/',
          github: 'https://github.com/sisinflab/',
          mail: 'mailto:francesco.nocera@poliba.it',
        },
      ]
    })
  }
</script>

<style>
  .v-list-item--three-line .v-list-item__subtitle {
    -webkit-line-clamp: 5;
  }
</style>