import RouteTemplate from 'ember-route-template';
import ControllerWorksController from 'test-app/controllers/controller-works';

interface Signature {
  Args: {
    controller: ControllerWorksController;
  };
}

export default RouteTemplate<Signature>(<template>
  hello, {{@controller.specialMessage}}
</template>);
