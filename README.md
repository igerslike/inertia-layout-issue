# setup-sugar-dual-script-watch-error

Install vendor packages
`composer install`

Install npm packages
`npm ci`

Run build (will not error `npm run dev`)
`npm run dev` or `npx mix watch`

Will likely build fine...

So run `npx mix watch` and then open the file ./resources/views/Pages/Index.vue

Save the file and return to the CLI watcher

Gives the error:
_TS7031: Binding element 'expose' implicitly has an 'any' type._

You can even remove the Inertia `layout` diretive. Error still exists as long as there are two scripts.

No idea where the expose element is located (Vue runtime maybe?)
