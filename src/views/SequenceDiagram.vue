<template>
  <v-container>
    <v-row class="text-center">
      <!-- Welcome image -->
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3 mt-8" contain height="200" />
      </v-col>

      <!-- Title and description -->
      <v-col cols="12" class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          UMLens
        </h1>

        <p class="subheading font-weight-regular">
          The tool to analyze UML diagrams
        </p>
      </v-col>

      <!-- Upload file and filter patterns -->
      <v-col :class="($vuetify.breakpoint.smAndDown ? '' : 'mb-5')" cols="12" md="10">
        <v-file-input @change="selectFile" persistent-hint :hint="currentFileMissing" show-size truncate-length="50"
          label="Upload your UML file in XML format..." accept=".xml">
        </v-file-input>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn :class="($vuetify.breakpoint.smAndDown ? 'mb-3' : 'mt-3')" color="primary" @click="sampleFile">Load sample file</v-btn>
      </v-col>

      <v-col cols="12" md="4" v-for="(attribute, key) in responseData" :key="key">
        <v-expansion-panels v-model="panels[key]">
          <v-expansion-panel v-model="panels[key]">
            <v-expansion-panel-header class="font-weight-bold">{{ key }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="!attribute">
                <p class="my-10">No data</p>
              </div>
              <v-row v-for="(item, key2) in attribute" :key="key2">
                <v-col cols="12">
                  <div v-for="(elem, key3) in item" :key="key3">
                    {{ key3 }} => {{ elem }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import UploadService from "../services/UploadFileService";

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  export default {
    name: 'SequenceDiagram',

    data: () => ({
      currentFileMissing: '',
      currentFile: undefined,
      responseData: {},
      select: [],

      panels: {
        actors: 0,
        messages: 0,
        frames: 0,
        lifelines: 0,
        notes: 0,
        classes: 0,
        combined_fragments: 0,
        metrics: 0
      },
    }),

    methods: {
      sampleFile() {
        fetch('/samples/sequence_diagram_sample.xml')
          .then(res => res.blob())
          .then(blob => {
            this.currentFile = new File([blob], 'sequence_diagram_sample.xml')
            this.upload()
          })
      },

      selectFile(file) {
        this.currentFile = file;
        this.upload()
      },

      upload() {
        if (!this.currentFile) {
          this.currentFileMissing = "Please select a file!"
          return
        }
        this.currentFileMissing = ""

        UploadService.uploadSequence(this.currentFile)
          .then((response) => {
            this.responseData = response.data
          })
          .catch(() => {
            alert("Could not upload the file!")
            this.currentFile = undefined
          })
      },
    }
  }
</script>
