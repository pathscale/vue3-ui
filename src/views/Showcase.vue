<template>
  <h1 class="title is-1">
    Checkbox
  </h1>
  <Checkbox v-model="toggle">
    Toggle me
  </Checkbox>
  <h1 class="title is-1">
    Button
  </h1>
  <Button type="is-primary">
    Button
  </Button>
  <Button type="is-success">
    Button
  </Button>
  <Button type="is-danger">
    Button
  </Button>
  <Button type="is-warning">
    Button
  </Button>
  <Button type="is-info">
    Button
  </Button>
  <Button type="is-link">
    Button
  </Button>
  <Button type="is-dark">
    Button
  </Button>
  <Button type="is-text">
    Button
  </Button>
  <Button type="is-primary" disabled>
    Button
  </Button>
  <Button type="is-success" loading>
    Button
  </Button>
  <Button type="is-danger" rounded>
    Button
  </Button>
  <Button type="is-warning" outlined>
    Button
  </Button>
  <Button type="is-info" expanded>
    Button
  </Button>
</template>

<script>
import { ref } from 'vue';
import Button from '../components/primitives/Button/Button.vue';
import Checkbox from '../components/primitives/Checkbox/Checkbox.vue';

const View = {
    components: { Button, Checkbox },
    setup(props) {
        const toggle = ref(true);
        return { toggle };
    }
}

export default View;
</script>