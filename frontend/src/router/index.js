import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && (to.path === '/login' || to.path === '/register')) {
        next('/')
        return
    }
    
    next()
})
export default router
