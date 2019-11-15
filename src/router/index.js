import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import("@/components/HelloWorld");
const Feeds = () => import("@/components/Feeds");

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/feeds',
      name: 'Feeds',
      component: Feeds
    },
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }
  ]
})