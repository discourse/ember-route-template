import Component from '@glimmer/component';
import RouteTemplate from 'ember-route-template';

interface Signature {
  Args: {
    model: string;
  };
}

class MyRouteComponent extends Component<Signature> {
  <template>
    {{this.backwards}} ,olleh
  </template>

  get backwards(): string {
    return this.args.model.split('').reverse().join('');
  }
}

export default RouteTemplate(MyRouteComponent);
