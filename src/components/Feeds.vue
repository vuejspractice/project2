<template>
  <v-container>
    <v-layout wrap>
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar" top :color="snackbar_color">
          {{ errorMessage }}
          <v-btn dark text @click="snackbar = false">Close</v-btn>
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
            <v-card class="mx-auto" v-if="item.subtitle">
              <v-list-item>
                <v-list-item-avatar color="grey">
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline" v-html="item.name"></v-list-item-title>
                  <!-- <v-list-item-subtitle>{{item.time}}</v-list-item-subtitle> -->
                </v-list-item-content>
              </v-list-item>

              <v-card-text v-html="item.subtitle"></v-card-text>

              <v-card-actions>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>group_add</v-icon>
                </v-btn>
                <v-list-item-subtitle class="ml-5">{{postedDate}} . <v-icon>public</v-icon></v-list-item-subtitle>
                
                <v-btn icon @click="item.likesCount++">
                  <v-icon>thumb_up</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <p class="caption font-weight-bold">{{item.likesCount}}</p>
                <v-btn icon>
                  <v-icon>comment</v-icon>
                </v-btn>
                <p class="caption font-weight-bold">{{item.comments.length}}</p>
              </v-card-actions>
            </v-card>
            <Comments :item="item" :index="index"></Comments>
            <br />
          </v-flex>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import Comments from "./Comments";
export default {
  name: "Feeds",
  components: { Comments },
  provide: function() {
    return {
      comment: this.comment,
      like: this.like,
      unlike: this.unlike
    };
  },
  mounted() {},
  data: () => ({
    htmlText: "",
    items: [
      // { header: 'Today' },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        name: "Jhon Smith",
        time: "Jan 9, 2014",
        comments: [],
        likesCount: 0,
        likes: {
          up: false,
          down: false
        },
        message: "",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: 'Eddi Jhonson',
        time: "Jan 9, 2014",
        likesCount: 0,
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        comments: [],
        likes: {
          up: false,
          down: false
        },
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
    ...mapState(["isLoggedIn"]),
    postedDate() {
      return moment().subtract(1, 'days').calendar();
    }
  },
  methods: {
    comment(index) {
      if (!this.items[index].message) {
        return;
      }
      this.items[index].comments.push({
        id: this.nonce++,
        text: this.items[index].message,
        time: new Date().toLocaleString(),
        likes: {
          up: false,
          down: false
        }
      });

      this.items[index].message = null;
    },
    submit() {
      if (this.htmlText) {
        this.items.push({
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          name: "Jhon Abhraham",
          time: "Jan 9, 2014",
          subtitle: this.htmlText,
          likesCount: 0,
          comments: []
        });
        this.htmlText = "";
      } else {
        this.snackbar = true;
        this.errorMessage = "Please text something...!";
      }
    },
    like(index, ind) {
      this.items[index].comments[ind].likes.up = !this.items[index].comments[ind].likes.up;
      this.items[index].comments[ind].likes.down = this.items[index].comments[ind].likes.up ? false : this.items[index].comments[ind].likes.down;
    },
    unlike(index, ind) {
      this.items[index].comments[ind].likes.down = !this.items[index].comments[ind].likes.down;
      this.items[index].comments[ind].likes.up = this.items[index].comments[ind].likes.down ? false : this.items[index].comments[ind].likes.up;
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