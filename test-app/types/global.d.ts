import 'ember-source/types';
import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'page-title': typeof import('ember-page-title/helpers/page-title').default;
  }
}
