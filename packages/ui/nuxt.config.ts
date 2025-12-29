export default defineNuxtConfig({
    modules: ['@nuxt/ui'],

    // 确保组件可以被自动导入
    components: [
        {
            path: './components',
            // pathPrefix: false, // 如果你想去掉组件名的目录前缀，可以设为 false
        }
    ],

    // Nuxt 4 compatibility
    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2024-11-01'
})
