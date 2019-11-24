<template>
  <v-timeline dense clipped v-if="item.subtitle" style="max-width: 600px;">
    <v-timeline-item fill-dot class="white--text mb-2" color="grey" large v-if="isLoggedIn">
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
        @keydown.enter="comment(index)"
      >
        <template v-slot:append>
          <v-btn icon class="mx-0" depressed @click="comment(index)">
            <v-icon>send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-timeline-item>

    <v-slide-x-transition group>
      <v-timeline-item v-for="(event, ind) in item.comments" :key="ind" color="pink" small>
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64" />
          </v-avatar>
        </template>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle>{{event.time}}</v-list-item-subtitle>
            <v-list-item-action>
              <v-list-item-action-text v-html="event.text"></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-btn icon @click="like(index, ind)" :color="event.likes.up ? 'primary' : ''">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn icon @click="unlike(index, ind)" :color="event.likes.down ? 'primary' : ''">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </v-list-item-action-text>
        </v-list-item>
      </v-timeline-item>
    </v-slide-x-transition>
  </v-timeline>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isLoggedIn"])
  },
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  inject: ["comment", "like", "unlike"],
  methods: {}
};
</script>