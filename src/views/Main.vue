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

      <v-col cols="12">
        <v-combobox v-model="select" :items="items" label="Filter patterns..." multiple chips prepend-icon="mdi-filter"
          @change="upload"></v-combobox>
      </v-col>

      <v-expansion-panels class="mb-4 pa-3">
        <v-expansion-panel>
          <v-expansion-panel-header>
            Configuration options
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.classes_in_pattern" type="number" label="Classes in pattern" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.avg_inheritance_depth" type="number" label="Average inheritance depth" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.classes_in_pattern_ratio" type="number" label="Classes in Pattern Ratio" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.avg_methods_per_class" type="number" label="Average methods per class" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.avg_relationships_per_class" type="number" label="Average relationships per class" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.classes_in_cycle_ratio" type="number" label="Classes in Cycle Ratio" required></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="configs.development_cost" type="number" label="Development Cost" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Diagram viewer
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="12" md="6" offset-md="3" align="center">
                  <v-slider v-model="imgWidth" color="primary" min="0" max="100" label="Image width"></v-slider>
                </v-col>
                <v-col cols="12" align="center">
                  <v-img :src="'data:image/jpeg;base64,' + diagram_base64" :width="imgWidth + '%'" contain></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Expansion panels -->
      <v-col cols="12" md="4" v-for="(attribute, key) in attributes" :key="key">
        <v-expansion-panels v-model="panels[key]">
          <v-expansion-panel v-model="panels[key]">
            <v-expansion-panel-header class="font-weight-bold">{{ key }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="key == 'Metrics'">
                <div v-if="!attribute">
                  <p class="my-10">No data</p>
                </div>
                <v-row v-for="(item, key2) in attribute" :key="key2">
                  <v-col cols="8" align="left">
                    <p class="text-capitalize my-0">
                      {{ key2.replace(/_/g, " ") }}
                    </p>
                  </v-col>
                  <v-col cols="4" align="right">
                    {{ Number(item).toFixed(2) }}
                  </v-col>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
              <div v-else-if="key == 'Cycles'">
                <div v-if="!attribute">
                  <p class="my-10">No data</p>
                </div>
                <v-row v-for="(item, index) in attribute" :key="index">
                  <v-col cols="12" style="overflow-wrap: anywhere;">
                    {{ item.join("&nbsp;&nbsp;&nbsp;➔&nbsp;&nbsp;&nbsp;") }}
                  </v-col>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row>
                  <v-col cols="12">
                    <div v-if="!patternsData">
                      <p class="my-10">No data</p>
                    </div>
                    <v-treeview open-on-click activatable color="primary" v-if="patternsData" :items="patternsData">
                    </v-treeview>
                  </v-col>
                </v-row>
              </div>
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
    name: 'Main',

    data: () => ({
      currentFileMissing: '',
      currentFile: undefined,
      configFile: undefined,
      response: {},
      select: [],
      configs: {
        classes_in_pattern: 100.0,
        avg_inheritance_depth: 100.0,
        classes_in_pattern_ratio: 100.0,
        avg_methods_per_class: 100.0,
        avg_relationships_per_class: 100.0,
        classes_in_cycle_ratio: 100.0,
        development_cost: 10000.0,
      },
      items: [
        'abstractfactory',
        'adapter',
        'bridge',
        'composite',
        'decorator',
        'facade',
        'factorymethod',
        'prototype',
        'proxy',
        'singleton',
      ],

      attributes: {
        "Patterns": null,
        "Cycles": null,
        "Metrics": null,
      },
      "diagram_base64": null,

      panels: {
        Patterns: 0,
        Cycles: 0,
        Metrics: 0,
      },

      patternsData: null,
      imgWidth: 80,
      counter: 0,
    }),

    methods: {
      sampleFile() {
        fetch('/samples/class_diagram_3.xml')
          .then(res => res.blob())
          .then(blob => {
            this.currentFile = new File([blob], 'class_diagram_3.xml')
            this.upload()
          })
      },

      selectFile(file) {
        this.currentFile = file;
        this.upload()
      },

      createConfigFile() {
        // Crea il file di configurazione in formato JSON
        var blob = new Blob([
          `{
            "classes_in_pattern": ${ this.configs.classes_in_pattern },
            "avg_inheritance_depth": ${ this.configs.avg_inheritance_depth },
            "classes_in_pattern_ratio": ${ this.configs.classes_in_pattern_ratio },
            "avg_methods_per_class": ${ this.configs.avg_methods_per_class },
            "avg_relationships_per_class": ${ this.configs.avg_relationships_per_class },
            "classes_in_cycle_ratio": ${ this.configs.classes_in_cycle_ratio },
            "development_cost": ${ this.configs.development_cost }
          }`
        ], {type: 'text/plain'})
        this.configFile = new File([blob], 'config.json')
      },

      upload() {
        if (!this.currentFile) {
          this.currentFileMissing = "Please select a file!"
          return
        }
        this.currentFileMissing = ""

        this.createConfigFile()

        UploadService.upload(this.currentFile, this.select, this.configFile)
          .then((response) => {
            this.attributes.Patterns = response.data.patterns
            this.attributes.Cycles = response.data.cycles
            this.attributes.Metrics = response.data.metrics
            this.diagram_base64 = response.data.diagram

            this.patternsData = this.convertData(this.attributes.Patterns)
          })
          .catch(() => {
            alert("Could not upload the file!")
            this.currentFile = undefined
          })
      },

      convertData(data) {
        var finalObj = []
        Object.keys(data).map((pattern) => {
          var element = {
            id: this.counter++,
            name: pattern,
            children: []
          }

          Array(data[pattern]).forEach((item) => {

            var multipleItems = false
            if (item.length > 1) {
              multipleItems = true
            }

            item.forEach((patternComponent) => {

              const test = {
                id: this.counter++,
                name: "Child",
                children: []
              }

              Object.keys(patternComponent).map((patternChild) => {

                var childName = ''
                if (Array.isArray(patternComponent[patternChild])) {
                  childName = patternComponent[patternChild].join("   ➔   ")
                } else {
                  childName = patternComponent[patternChild]
                }

                var childComponent = {
                  id: this.counter++,
                  name: patternChild.replace(/_/g, " ").capitalize(),
                  children: [{
                    id: this.counter++,
                    name: childName
                  }]
                }

                if (multipleItems) {
                  test.children.push(childComponent);
                } else {
                  element.children.push(childComponent)
                }

              })

              if (multipleItems) {
                element.children.push(test)
              }

            })
          })
          finalObj.push(element)
        })

        return finalObj
      }
    }
  }
</script>
