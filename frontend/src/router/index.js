import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Home  from '../components/home.vue'
import EventList  from '../components/eventlist.vue'
import EventDetail from '../components/eventdetail.vue'


const routes = [
  { path: '/',            name: 'Home',      component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/events', name: 'eventlist', component: EventList },          // <-- here
  { path: '/events/:id',  name: 'eventdetail', component: EventDetail, props: true },


]

export default createRouter({
  history: createWebHistory(),
  routes,
})
