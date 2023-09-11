import { precompileTemplate } from '@ember/template-compilation';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

export type TemplateFactory = ReturnType<typeof precompileTemplate>;

export default function RouteTemplate<S>(
  Component: TemplateOnlyComponent<S>,
): TemplateFactory;
export default function RouteTemplate(Component: object): TemplateFactory;
export default function RouteTemplate(Component: object): TemplateFactory {
  return precompileTemplate(
    `<Component @model={{@model}} @controller={{this}} />`,
    {
      strictMode: true,
      scope: () => ({ Component }),
    },
  );
}
