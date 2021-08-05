import { authGuard } from '@bcwdev/auth0provider-client'
import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/profiles/:id',
    name: 'Profile',
    component: loadPage('ProfilePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    // NOTE prevents route from loading if user is not logged in
    beforeEnter: authGuard
    // beforeEnter: allSettled // prevents page from loading until user is attempted to be retrieved, this does not block users not logged in
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
