import { AxiosInstance } from 'axios'
import { DefineComponent, Plugin } from 'vue'
import _ from 'lodash'

declare module '@inertiajs/inertia-vue3' {
    interface SetupOptions {
        el: string | Element
        app: DefineComponent
        props: object
        plugin: Plugin
    }

    interface InertiaOptions {
        resolve: (name: string) => DefineComponent
        setup: (options: SetupOptions) => void
    }

    // export const createInertiaApp: (options: InertiaOptions) => void;
}
declare global {
    interface Window {
        axios: AxiosInstance
        _: typeof _
    }
}
