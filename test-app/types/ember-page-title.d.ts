declare module 'ember-page-title/helpers/page-title' {
  import Helper from '@ember/component/helper';

  interface PageTitleHelperSignature {
    Args: {
      Positional: [title: string];
      Named?: {
        separator?: string;
        prepend?: boolean;
        replace?: boolean;
        front?: boolean;
      };
    };
    Return: void;
  }

  export default class PageTitleHelper extends Helper<PageTitleHelperSignature> {}
}
