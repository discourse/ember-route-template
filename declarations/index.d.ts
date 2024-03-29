import { precompileTemplate } from '@ember/template-compilation';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
export type TemplateFactory = ReturnType<typeof precompileTemplate>;
export default function RouteTemplate<S>(Component: TemplateOnlyComponent<S>): TemplateFactory;
export default function RouteTemplate(Component: object): TemplateFactory;
//# sourceMappingURL=index.d.ts.map