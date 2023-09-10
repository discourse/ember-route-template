import Controller from '@ember/controller';

export default class ControllerWorksController extends Controller<string> {
  get specialMessage(): string {
    return `this is a very special message ${this.model}`;
  }
}
