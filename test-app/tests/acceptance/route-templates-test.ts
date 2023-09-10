import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'test-app/tests/helpers';

module('Acceptance | route templates', function (hooks) {
  setupApplicationTest(hooks);

  test('normal .hbs template works', async function (assert) {
    await visit('/hbs-template-works');
    assert.dom().containsText('Hello from hbs-template-works.hbs');
  });

  test('wrapped .gjs template works', async function (assert) {
    await visit('/gjs-template-works');
    assert.dom().containsText('Hello from gjs-template-works.gjs');
  });

  test('accessing @model works', async function (assert) {
    await visit('/model-works/wow');
    assert.dom().containsText('model is wow');
  });

  test('accessing @controller works', async function (assert) {
    await visit('/controller-works/wow');
    assert.dom().containsText('hello, this is a very special message wow');
  });

  test('component works', async function (assert) {
    await visit('/component-works/it works');
    assert.dom().containsText('skrow ti ,olleh');
  });
});
