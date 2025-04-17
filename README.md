# Vue3-ui

<p align="center">
  <a href="hhttps://vue3.dev">
      <img src="https://vue3.dev/vue3-ui-logo.png" />
  </a>
  <br/>
  <a href="https://www.npmjs.com/package/@pathscale/vue3-ui"><img src="https://img.shields.io/npm/v/@pathscale/vue3-ui?style=for-the-badge" /></a>
  <a href="https://www.npmjs.com/package/@pathscale/vue3-ui"><img src="https://img.shields.io/npm/dt/@pathscale/vue3-ui?style=for-the-badge" /></a>
  <a href="https://bundlephobia.com/result?p=@pathscale/vue3-ui"><img src="https://img.shields.io/bundlephobia/min/@pathscale/vue3-ui?style=for-the-badge" /></a>
  <a href="https://bundlephobia.com/result?p=@pathscale/vue3-ui"><img src="https://img.shields.io/bundlephobia/minzip/@pathscale/vue3-ui?style=for-the-badge" /></a>
  <a href="https://github.com/pathscale/vue3-ui/blob/master/LICENSE-MIT.txt"><img src="https://img.shields.io/npm/l/@pathscale/vue3-ui?style=for-the-badge" /></a>
  <br/>
  Vue3 ready components library built with love and care designed to integrate beautifully with Bulma CSS
</p>

## Documentation

The full documentation for Vue3-ui can be found on [vue3.dev](https://vue3.dev/).

## Requirements

To build this project on node 20, you need to install these requiements.

- node 20.14.0
- python 2.7.15
- visual studio build tools 2017

## Contributing

### Testing new components

This repo only contains source code for components and does not come with examples or test environment where you can use them.

For this purpose you can take a look at [vue3-starter](https://github.com/pathscale/vue3-starter) or any other end user project that uses vue3-ui.

Aditionally, if you want to develop new components, they can be locally injected into such project by using `inject.sh`, this will make them available inmediatly allowing you to test them.

1. Clone [vue3-starter](https://github.com/pathscale/vue3-starter) or any other project that makes use of vue3-ui and make sure they are on the same directory.

```
.
├── vue3-starter
└── vue3-ui
```

2. Run `bash inject.sh vue3-starter` to move your changes and update @pathscale/vue3-ui bundle locally on vue3-starter.

### Configuring components for efficient purging

We have developed [rollup-plugin-vue3-ui-css-purge](https://github.com/pathscale/rollup-plugin-vue3-ui-css-purge) to handle very efficient purging on end user projects that use vue3-ui components, but the following guidelines must be followed to achieve efficient purging.

1. Whenever a component makes use of a transition, it must be registered in `helper/data.ts`

2. Components usually depend on classes that are named after a prop, for example in v-button, `is-rounded` class depends on the prop `rounded`, as this is very common, the purger will recognize this automatically, on the other hand, when a component class depends on a prop that is not named accordingly (a class x that depend on a prop not named is-x), it must be registered in `helpers/classes.json`

3. Build generates automatically mappings.json file which will be used by @rollup-plugin-vue3-ui-css-purge later

## License

The MIT License (MIT). Please see [License File](https://github.com/pathscale/vue3-ui/blob/master/LICENSE-MIT.txt) for more information.
