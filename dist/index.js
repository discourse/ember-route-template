import { precompileTemplate } from '@ember/template-compilation';

function RouteTemplate(Component) {
  return precompileTemplate("<Component @model={{@model}} @controller={{this}} />", {
    strictMode: true,
    scope: () => ({
      Component
    })
  });
}

export { RouteTemplate as default };
//# sourceMappingURL=index.js.map
