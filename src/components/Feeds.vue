<template>
  <v-container>
    <v-layout wrap>
      <v-row>
        <v-spacer></v-spacer>
          <v-col cols="7">
            <kendo-editor :resizable-content="true"
                :resizable-toolbar="true"
                :value="htmlText"
                v-model="htmlText"
                style="width:1015px"
                justify-center>
            </kendo-editor>
            <v-btn block x-small color="primary" @click="submit()" dark>Block Button</v-btn>
            <br>
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item
                  v-else
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.time"></v-list-item-subtitle>
                    <v-list-item-content v-html="item.subtitle"></v-list-item-content>
                    <!-- <v-list-item-action>
                      <v-container style="max-width: 800px;" left-aligned>
                        <v-timeline dense clipped>
                          <v-timeline-item fill-dot class="white--text mb-12" color="orange" large>
                            <template v-slot:icon>
                              <span>Evan</span>
                            </template>
                            <v-text-field
                              v-model="input"
                              hide-details
                              flat
                              label="Leave a comment..."
                              solo
                              @keydown.enter="comment"
                            >
                              <template v-slot:append>
                                <v-btn class="mx-0" depressed @click="comment" small>Post</v-btn>
                              </template>
                            </v-text-field>
                          </v-timeline-item>

                          <v-slide-x-transition group>
                            <v-timeline-item
                              v-for="event in timeline"
                              :key="event.id"
                              class="mb-4"
                              color="pink"
                              small
                            >
                              <v-row justify="space-between">
                                <v-col class="text-left" cols="7" v-text="event.text"></v-col>
                                <v-col class="text-right" cols="5" v-text="event.time"></v-col>
                              </v-row>
                            </v-timeline-item>
                          </v-slide-x-transition>
                        </v-timeline>
                      </v-container>
                    </v-list-item-action> -->
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Feeds",
  components: {},
  data: () => ({
    htmlText: "",
    feeds_data: [
      {
        name: "Evan You",
        text:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well. Turns out semicolon-less style is easier and safer in TS."
      }
    ],
      items: [
        // { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          time: 'Jan 9, 2014',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          time: 'Jan 9, 2014',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          time: 'Jan 9, 2014',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          time: 'Jan 9, 2014',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          time: 'Jan 9, 2014',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
    events: [],
      input: null,
      nonce: 0
  }),
  computed: {
      timeline () {
        return this.events.slice().reverse()
      },
    },
    methods: {
      comment () {
          if(!this.input) {
              return;
          }
        const time = (new Date()).toTimeString()
        this.events.push({
          id: this.nonce++,
          text: this.input,
          time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
            return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
          }),
        })

        this.input = null
      },
      submit () {
        // alert(this.htmlText)
        this.items.push({
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try' + 1,
          time: 'Jan 9, 2014',
          subtitle: this.htmlText,})
      }
    }
};
</script>