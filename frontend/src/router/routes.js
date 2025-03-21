import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/category/:category',
        name: 'category',
        component: () => import('@/views/categories/Category.vue'),
        props: true,
        meta: { layout: DefaultLayout }
    },
    {
        path: '/category/:category/:sku',
        name: 'product',
        component: () => import('@/views/products/Product.vue'),
        props: true,
        meta: { layout: DefaultLayout }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { guest: true, layout: AuthLayout }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { guest: true, layout: AuthLayout }
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('@/views/user/Account.vue'),
        meta: { requiresAuth: true, layout: DefaultLayout }
    },
    {
        path: '/bag',
        name: 'Bag',
        component: () => import('@/views/shop/Bag.vue')
    },
    {
        path: '/size-guide',
        name: 'sizeGuide',
        component: () => import('@/views/shop/SizeGuide.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/info/Contact.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/privacy-policy',
        name: 'privacyPolicy',
        component: () => import('@/views/info/PrivacyPolicy.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/terms-and-conditions',
        name: 'termsAndConditions',
        component: () => import('@/views/info/TermsAndConditions.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/sitemap',
        name: 'sitemap',
        component: () => import('@/views/info/Sitemap.vue'),
        meta: { layout: DefaultLayout }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/404.vue'),
        meta: { layout: DefaultLayout }
    }
]
