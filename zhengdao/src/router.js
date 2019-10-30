import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', name: 'login', component: () => import('./views/Login/index.vue') },
    { path: '/register', name: 'register', component: () => import('./views/Register/index.vue') },
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue'),
      children: [
        { path: '/home', name: 'home', component: () => import('./views/Home/index.vue') },
        { path: '/mine/info', name: 'info', component: () => import('./views/Mine/index.vue'), },
        { path: '/mine/modify', name: 'modify', component: () => import('./views/Mine/modify.vue'), },
        { path: '/mine/create', name: 'createme', component: () => import('./views/Mine/createMe.vue'), },


        { path: '/org/form/:orgId', name: 'create', component: () => import('./views/Organization/create.vue'), },
        { path: '/org/member/:orgId', name: 'member', component: () => import('./views/Organization/member.vue'), },        
        { path: '/org/information/:orgId', name: 'information', component: () => import('./views/Organization/information.vue'), },
        { path: '/org/member/:orgId/user/:userId', name: 'memberinfo', component: () => import('./views/Organization/memberinfo.vue'), },
        { path: '/org/test', name: 'test', component: () => import('./views/Organization/test.vue'), },
      ]
    },
  ]
})
