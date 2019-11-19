<template>
  <v-container>
    <v-layout wrap>
        <v-row>
            <v-spacer></v-spacer>

            <v-col>
                <kendo-editor :resizable-content="true"
                    :resizable-toolbar="true"
                    :value="htmlText"
                    style="width:1000px"
                    justify-center>
                </kendo-editor>
                <v-btn block x-small color="primary" dark>Block Button</v-btn>
            </v-col>

            <v-spacer></v-spacer>

        </v-row>

        
    </v-layout>
  </v-container>
</template>
<script>
export default {
    data() {
        return {
            htmlText: ""
        }
    }
};
</script>