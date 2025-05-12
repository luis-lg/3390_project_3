import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Home  from '../components/home.vue'
import EventList  from '../components/eventlist.vue'
import EventDetail from '../components/eventdetail.vue'
import Profile from '../components/profile.vue'
import Messages from '../components/messages.vue'



const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/events', name: 'eventlist', component: EventList },
  { path: '/events/:id', name: 'eventdetail', component: EventDetail, props: true },
  { path: '/messages/:userId', name: 'Messages', component: Messages, props: true },
  { path: '/profile', name: 'profile', component: Profile },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const publicPages = ['login', 'home', 'eventlist']
router.beforeEach((to, from, next) => {
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = !!localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
