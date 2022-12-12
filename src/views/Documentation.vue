<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-h3 text-center my-5">Documentation</div>
            </v-col>
            <v-col cols="12">
                <div class="text-h5">Abstract</div>
                <div class="text-justify">
                    UMLens is a Python framework for the automated analysis of UML documents. The system is able to
                    analyze UML class diagrams in order to detect design patterns and dependency cycles between class
                    instances, and to compute useful metrics, including ones that can be used to estimate the degree of
                    technical debt of a certain software system.
                </div>
            </v-col>
            <v-col cols="12">
                <div class="text-h5">How to use the platform</div>
                <div class="text-justify">
                    In order to use the platform, the user should provide an XML file describing an UML Class Diagram
                    exported from Visual Paradigm. It is also possible to download one of the examples proposed below or
                    use a standard one without downloading it clicking on "Load sample file" button.
                </div>
                <div class="text-justify mt-2">
                    As soon as the file is loaded, a request is sent to the server and will be processed. The response
                    is shown in three panels: "Patterns", "Cycles" and "Metrics".
                </div>
                <div class="text-justify mt-2">
                    It is also possible to filter the results using the proper input field and selecting the patterns to
                    consider. Every change in filters is applied in real time.
                </div>
            </v-col>
            <v-col cols="12">
                <div class="text-h5 mb-3">Example files</div>
                <v-row>
                    <v-col cols="12" md="4" v-for="(example, idx) in examples" :key="idx">
                        <v-card class="mx-auto" color="transparent">
                            <v-img v-bind:src="'samples/' + example.img" contain height="200px"></v-img>
                            <v-card-title>
                                Example {{ idx + 1 }}
                                <v-spacer></v-spacer>
                                <v-btn icon color="primary" class="py-5" v-bind:href="'samples/' + example.link"
                                    download>
                                    <v-icon>mdi-download</v-icon>
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Documentation',
        data: () => ({
            examples: [{
                    img: 'Class1.png',
                    link: 'class_diagram_1.xml',
                },
                {
                    img: 'Class2.png',
                    link: 'class_diagram_2.xml',
                },
                {
                    img: 'Class3.png',
                    link: 'class_diagram_3.xml',
                }
            ]
        })
    }
</script>

<style>

</style>