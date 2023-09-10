import Route from '@ember/routing/route';

export default class ComponentWorksRoute extends Route<string> {
  model({ id }: { id: string }): string {
    return id;
  }
}
