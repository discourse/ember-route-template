# ember-route-template

[eti]: https://github.com/ember-template-imports/ember-template-imports
[polaris]: https://blog.emberjs.com/ember-5-0-released/#toc_the-journey-towards-ember-polaris
[resources]: https://github.com/NullVoxPopuli/ember-resources/blob/main/docs/docs/README.md
[rfc]: https://rfcs.emberjs.com/id/0779-first-class-component-templates/#typescript
[discourse]: https://discourse.org

Provides an adapter for using [`<template>` tags][eti] and components as route
templates.

## Motivation

So you have adopted [`<template>` tags][eti] in your app, and everything has
been great. It's time to add a new route to the app. You created a `.gjs` file
and programmed away, importing components and helper functions left and right,
maybe even declaring local JavaScript helpers for use in the template.

When you are done, you tested it out in the browser, and everything broke. The
horror!

Unfortunately, Ember does not support `<template>` tags as route templates at
the moment. This is an obvious coherence gap that needs to be addressed in
[Polaris edition][polaris], likely by doing away with the controllers and route
templates altogether, in favor of making the route itself a component with a
`<template>` on it, and using the [resources][resources] pattern for data
fetching.

In the meantime though, this can leave you in a tricky situation. As your app
and your team gets deeper into the `<template>` tag paradigm, it can be awkward
to author route templates in the old paradigm, and you may even find yourself
having to re-export certain component/modifier/helpers from `app/` and make
them globally available, just so they can be used in route templates.

This addon bridges the gap by shipping a small adapter that turns `<template>`
and components into the route template format Ember currently expects, so you
can use the full feature set of `.gjs` in routes.

Eventually, this addon won't be necessary anymore when the new Polaris routing
paradigm is available.

## Usage

```js
// app/templates/my-route.gjs
import RouteTemplate from 'ember-route-template';

// This adapter converts the `<template>` into a route template
export default RouteTemplate(<template>Hello world!</template>);
```

Your `<template>` will have access to the `{{@model}}` and `{{@controller}}`
arguments, if you need them. Other features like plain function helpers and
the ability to import components (etc) into the `<template>` scope works as
usual:

```js
// app/templates/my-route.gjs
import RouteTemplate from "ember-route-template";

// components can be imported as usual
import Hello from "my-app/components/hello";

// plain functions work, as usual
function stringify(value) {
  if (typeof value?.name === 'string') {
    return value.name;
  } else {
    return String(value);
  }
}

// This adapter converts the `<template>` into a route template
export default RouteTemplate(
  <template>
    The model is: {{stringify @model}}
    The controller is: {{stringify @controller}}
    <Hello @message="this is great!" />
  </template>
);
```

You can even convert components into route templates with this adapter (a.k.a.
"routable components"):

```js
// app/templates/my-route.gjs
import RouteTemplate from 'ember-route-template';
import Component from "@glimmer/component";

class MyRouteComponent extends Component {
  <template>Hello, {{this.message}}. Why was I screaming?</template>

  get message() {
    return String(this.args.model).toUpperCase();
  }
}

export default RouteTemplate(MyRouteComponent);
```

With this feature, it eliminates most of the reasons for needing controllers,
other than for query params (which is another coherence gap Polaris would need
to address). We suggest exploring moving your non-QP controller logic into a
component this way, treating controllers as "QP services" and nothing else.

## How it works

[Under the hood](./ember-route-template/src/index.ts), the adapter generates
a route template that simply invokes the `<template>` or component you passed
in with the `@model` and `@controller` arguments appropriately set.

The hello world example from above is similar to first creating the component
in the usual global location in `app/components`:

```js
// app/components/hello-world.gjs
<template>Hello world!</template>
```

Then create a route template whose only job is to invoke that component:

```hbs
{{! app/templates/my-route.hbs }}
<HelloWorld @model={{@model}} @controller={{this}} />
```

With the adapter from this addon, the main advantage is that it allows you to
keep your route `<template>` or component anonymous, without making it globally
available in `app/components` since it likely would not make sense to reuse a
route specific `<template>` or component elsewhere in the app.

Of course, nothing is stopping you from exporting those values as additional
named exports, if you need to access them from elsewhere.

## TypeScript and Glint

TypeScript and Glint is fully supported, just use the `.gts` extension instead.

One caveat is that Glint cannot automatically infer the `@model`/`@controller`
arguments, and you will get a type error when trying to access them from the
`<template>`, which is the usual problem you've always had with template-only
components in Glint.

According to the [RFC][rfc], you can supply a signature like this:

```tsx
// app/templates/my-route.gts
import RouteTemplate from "ember-route-template";

interface MyRouteSignature {
  Args: {
    model: string;
  }
}

export default RouteTemplate(
  // This does not actually work!
  <template[MyRouteSignature]>
    Now Glint is supposed to know {{@model}} is a string.
  </template>
);
```

However, as of writing, this feature was never implemented, and the Ember
TypeScript is considering other alternatives. In the meantime, the adapter
function can accept a generic argument for the signature to make things easier:

```tsx
// app/templates/my-route.gts
import RouteTemplate from "ember-route-template";

interface MyRouteSignature {
  Args: {
    model: string;
  }
}

export default RouteTemplate<MyRouteSignature>(
  <template>
    Now Glint is supposed to know {{@model}} is a string.
  </template>
);
```

This feature is only needed for bare `<template>` tags. Class-based components
don't have this issue as they already accept a signature generic:

```tsx
// app/templates/my-route.gts
import RouteTemplate from "ember-route-template";
import Component from "@glimmer/component";

interface MyRouteSignature {
  Args: {
    model: string;
  }
}

class MyRouteComponent extends Component<MyRouteSignature> {
  <template>
    Glint knows this is a string: {{@model}}
  </template>
}

export default RouteTemplate(MyRouteComponent);
```

## Compatibility

- Ember.js v3.28 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install ember-route-template
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Thanks

The development of this addon was initial funded by [Discourse][discourse].
