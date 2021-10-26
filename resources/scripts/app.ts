// @ts-nocheck

import { createApp, h } from 'vue'
import { createInertiaApp, Head, Link } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import AdminLayout from '@/views/AdminLayout.vue'
import AppLayout from '@/views/AppLayout.vue'
import BaseLayout from '@/views/BaseLayout.vue'

import _ from 'lodash'
import axios from 'axios'

window._ = _
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

createInertiaApp({
    resolve: async (name) => {
        const componentOptions = await import(`../views/Pages/${name}.vue`).then((module) => module.default)
        if (!componentOptions.layout) {
            componentOptions.layout = !name.startsWith('Admin/')
                ? (h, page) => h(BaseLayout, () => h(AppLayout, () => page))
                : (h, page) => h(BaseLayout, () => h(AdminLayout, () => page))
        }

        return componentOptions
    },
    setup({ el, app, props, plugin }) {
        const App = createApp({ render: () => h(app, props) })
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
            .mount(el)
    }
})

InertiaProgress.init({ color: '#3044e8' })
