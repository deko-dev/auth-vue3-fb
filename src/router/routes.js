import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Main from '../views/Main.vue';
import Productos from '../views/Productos.vue';
import RecoverPass from '../views/RecoverPass.vue';
import { auth } from '../firebaseConfig';


const routes = [
    { path: '/', component: Main, name: 'Home', meta: { requiresAuth: true }},
    { path: '/productos', component: Productos, name: 'Productos', meta: { requiresAuth: true } },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/register', component: Register, name: 'Registro' },
    { path: '/recover_pass', component: RecoverPass, name: 'Recover Password' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;
    console.log( to )
    if (requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

export default router;