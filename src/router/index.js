import Vue from 'vue'
import Router from 'vue-router'
const Feeds = () => import("@/components/Feeds");

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Feeds',
      component: Feeds
    }
  ]
})