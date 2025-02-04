import { useAuth } from '@/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
    const { currentUser } = useAuth()
     if (!currentUser.value && to.path !== '/' && to.path !== '/mng/login') {
        const path = from.fullPath.includes('/mng') ? '/mng/login' : '/'
        return { path }
    }
})