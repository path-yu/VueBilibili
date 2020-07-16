import Vue from 'vue'
import VueRouter from 'vue-router'


import Register from "../views/register.vue"
import login from "../views/login.vue"
import userinfo from "../views/userinfo.vue"
import edit from "../views/editUser.vue";
import Home from "../views/Home.vue";
import Article from  "../views/Article.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Home,
    name:"home",
  },
  {
    path: "/register",
    component: Register,
    meta: {
      name: "434"
    }
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/userinfo",
    component: userinfo,
    meta: {
      isToken: true,
    }
  },
  {
    path: "/edit",
    component: edit,
    meta: {
      isToken: true,
    }
  },
  {
    path:"/article/:id",
    component: Article,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('id') && localStorage.getItem('token') && to.meta.isToken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail("请重新登录")
  }
  next()
})
export default router