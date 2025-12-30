export default defineNuxtRouteMiddleware((to) => {
    const { token } = useAuth()

    // Allow access to login page
    if (to.path === '/login') {
        // If already logged in, redirect to home
        if (token.value) {
            return navigateTo('/')
        }
        return
    }

    // If not logged in, redirect to login
    if (!token.value) {
        return navigateTo('/login')
    }
})
