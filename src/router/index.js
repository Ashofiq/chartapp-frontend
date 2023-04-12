import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/Home/Index.vue';
import User from '../components/User.vue';
import Test from '../components/Home/Test.vue';
import Login from '../components/Auth/Login.vue';

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
      {path: '/login', name: 'login', component: Login, name:'login'},
      { path: '/', component: Index, meta: {requireAuth: true} },
      { path: '/users', component: User },
      { path: '/test', component: Test },
    ]
  })

  
router.beforeEach(async(to, _, next) => {
  console.log(to.fullPath);
  if (to.meta.requireAuth) {
    if (localStorage.accessToken == undefined) {
      next({name:'login'})
    }else{
      next()
    }
  }
  // if (localStorage.accessToken) {
  //   const user = await fetch('/v1/api/me',{
  //     method:'POST',
  //     headers: {
  //       'Authorization': localStorage.accessToken,
  //     },
  //   }).then(response => response.json());

  //   console.log('user', user);

  //   if (!user.email) {
  //       // Remove userData from localStorage
  //       localStorage.removeItem('accessToken')
  //       localStorage.removeItem('user')

  //       // Redirect to login page
  //       window.location.href = '/login';
  //   }

  // }else{
  //   if (!['/login'].includes(to.fullPath)) {
  //     window.location.href = '/login';
  //   }
  // }

  return next()
})

export default router