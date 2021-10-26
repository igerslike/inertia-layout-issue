// @ts-nocheck

/* global require */
import express from 'express'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp, Head, Link } from '@inertiajs/inertia-vue3'

import AdminLayout from '@/views/AdminLayout.vue'
import AppLayout from '@/views/AppLayout.vue'
import BaseLayout from '@/views/BaseLayout.vue'

const server = express()
server.use(express.json())
server.post('/render', async (request, response, next) => {
    try {
        response.json(
            await createInertiaApp({
                page: request.body,
                render: renderToString,
                resolve: (name) => {
                    const componentOptions = require(`./../views/Pages/${name}.vue`).default
                    if (!componentOptions.layout) {
                        componentOptions.layout = !name.startsWith('Admin/')
                            ? (h, page) => h(BaseLayout, () => h(AppLayout, () => page))
                            : (h, page) => h(BaseLayout, () => h(AdminLayout, () => page))
                    }

                    return componentOptions
                },
                setup({ app, props, plugin }) {
                    const App = createSSRApp({
                        render: () => h(app, props)
                    })
                    App.config.unwrapInjectedRef = true
                    App.mixin({
                        methods: {}
                    })
                        .use(plugin)
                        .component('InertiaHead', Head)
                        .component('InertiaLink', Link)
                        .component('MetaFollow', MetaFollow)
                        .component('MetaNoFollow', MetaNoFollow)
                        .component('Pagination', Pagination)
                        .component('TextLink', TextLink)

                    return App
                }
            })
        )
    } catch (error) {
        next(error)
    }
})

/**
 * Gets node environment from env file
 */
const env = process.env.MIX_NODE_ENV

/**
 * Assign node server port number to staging and production sites
 * (Prevents port conflict on multiple node servers)
 *
 * @author FinnaCreate
 */
server.listen(env === 'production' ? 8080 : 5000, () => {
    if (env !== 'production') {
        console.log('Server started.')
    }
})

if (env !== 'production') {
    console.log('Starting SSR server...')
}
