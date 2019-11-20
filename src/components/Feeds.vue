<template>
  <v-container>
    <v-layout wrap>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar" 
          top 
          :color='snackbar_color'
        >
          {{ errorMessage }}
          <v-btn
            dark
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </div>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="7">
          <v-flex v-if="isLoggedIn">
            <kendo-editor
              :resizable-content="true"
              :resizable-toolbar="true"
              :value="htmlText"
              v-model="htmlText"
              style="width:1007px"
              justify-center
            ></kendo-editor>
            <v-btn block x-small color="primary" @click="submit()" dark>Block Button</v-btn>
          </v-flex>
          <br />
          <v-flex v-for="(item, index) in items" :key="index">
            <v-card
              class="mx-auto" v-if="item.subtitle"
            >
              <v-list-item>
                <v-list-item-avatar color="grey"><v-img :src="item.avatar"></v-img></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline" v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle>{{item.time}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-text v-html="item.subtitle"></v-card-text>

              <v-card-actions>
                <v-btn
                  text
                  color="deep-purple accent-4"
                >
                  Like
                </v-btn>
                <v-btn
                  text
                  color="deep-purple accent-4"
                >
                  Comment
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>thumb_up</v-icon> <p>0</p>
                </v-btn>
                <v-btn icon>
                  <v-icon>comment</v-icon> <p>5</p>
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-timeline dense clipped v-if="item.subtitle" style="max-width: 600px;">
              <v-timeline-item
                fill-dot
                class="white--text mb-2"
                color="grey"
                large
              >
                <template v-slot:icon>
                  <v-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-avatar>
                </template>
                <v-text-field
                  v-model="item.message"
                  hide-details
                  flat
                  label="Leave a comment..."
                  solo
                  @keydown.enter="comment"
                >
                  <template v-slot:append>
                    <v-btn
                      icon
                      class="mx-0"
                      depressed
                      @click="comment(index)"
                    >
                      <v-icon>send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-timeline-item>

              <v-slide-x-transition
                group
              >
                <v-timeline-item
                  v-for="event in item.comments"
                  :key="event.id"
                  color="pink"
                  small
                >
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="http://i.pravatar.cc/64">
                    </v-avatar>
                  </template>
                  <v-row justify="space-between">
                    <v-col cols="7" v-text="event.text"></v-col>
                    <v-col class="text-right" cols="5" v-text="event.time"></v-col>
                  </v-row>
                </v-timeline-item>
              </v-slide-x-transition>
            </v-timeline>
            <br>
          </v-flex>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "Feeds",
  components: {},
  data: () => ({
    htmlText: "",
    items: [
      // { header: 'Today' },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        time: "Jan 9, 2014",
        comments: [],
        message: "",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        time: "Jan 9, 2014",
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        comments: [],
        message: ""
      }
    ],
    events: [],
    input: null,
    nonce: 0,
    snackbar: false,
    errorMessage: "",
    snackbar_color: "error"
  }),
  computed: {
    timeline() {
      return this.events.slice().reverse();
    },
    ...mapState(["isLoggedIn"])
  },
  methods: {
    comment(index) {
      if (!this.items[index].message) {
        return;
      }
      this.items[index].comments.push({
        id: this.nonce++,
        text: this.items[index].message,
        time: new Date().toLocaleString()
      });

      this.items[index].message = null;
    },
    submit() {
      if(this.htmlText) {
        this.items.push({
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try" + this.items.length,
          time: "Jan 9, 2014",
          subtitle: this.htmlText
        });
        this.htmlText = "";
      } else {
        this.snackbar = true;
        this.errorMessage = "Please text something...!"
      }
    }
  }
};
</script>
<style lang="scss">
.v-timeline-item {
  padding-bottom: 0px;
}
.v-card__text img {
  width: 700px;
}
</style>