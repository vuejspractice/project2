<template>
  <v-container>
    <v-layout text-center wrap>
      <v-card
        v-for="(feed, index) in feeds_data"
        :key="index"
        class="mx-auto"
        color="primary"
        max-width="1200"
        dark
      >
        <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">Twitter</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">{{feed.text}}</v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{feed.name}}</v-list-item-title>
            </v-list-item-content>
            <v-row align="center" justify="end">
              <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2">256</span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">mdi-share-variant</v-icon>
              <span class="subheading">45</span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
      <v-container style="max-width: 1200px;">
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
                <v-btn class="mx-0" depressed @click="comment">Post</v-btn>
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
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Feeds",
  components: {},
  data: () => ({
    feeds_data: [
      {
        name: "Evan You",
        text:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well. Turns out semicolon-less style is easier and safer in TS."
      }
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
    }
};
</script>