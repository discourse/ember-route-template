import Route from '@ember/routing/route';

export default function RoutableComponentRoute<T>(
  Component: object,
): typeof Route<T>;
export default function RoutableComponentRoute<T>(
  Component: object,
): typeof Route<T> {
  return class extends Route<T> {
    Component = Component;
    init() {
      this.templateName = 'ember-route-template/ember-route-template';
    }
  };
}
