import RouteTemplate from 'ember-route-template';

interface Signature {
  Args: {
    model: string;
  };
}

export default RouteTemplate<Signature>(<template>
  model is {{@model}}
</template>);
