<template>
  <Container :bg="bg" type="is-fluid">
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
    <h1 class="title is-1">
      Progress
    </h1>
    <Progress type="is-success" value="35" />
  </Container>
  
  <section>
    <div class="block">
      <button class="button" @click="activeTab = 1">
        Set Music
      </button>
    </div>
    <div class="block">
      <Checkbox v-model="toggle">
        Show Books
      </Checkbox>
    </div>
    <Tabs v-model="activeTab" size="is-medium">
      <Tab label="Pictures" id="0">
        Lorem ipsum dolor sit amet.
      </Tab>
      <Tab label="Music" id="1">
        Lorem <br />
        ipsum <br />
        dolor <br />
        sit <br />
        amet.
      </Tab>

      <Tab label="Books" :visible="toggle" id="2">
        What light is light, if Silvia be not seen? <br />
        What joy is joy, if Silvia be not by— <br />
        Unless it be to think that she is by <br />
        And feed upon the shadow of perfection? <br />
        Except I be by Silvia in the night, <br />
        There is no music in the nightingale.
      </Tab>

      <Tab label="Videos" id="3">
        Nunc nec velit nec libero vestibulum eleifend.
        Curabitur pulvinar congue luctus.
        Nullam hendrerit iaculis augue vitae ornare.
        Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
      </Tab>
    </Tabs>
  </section>
</template>

<script>
import { ref } from 'vue';
import Button from '../components/primitives/Button/Button.vue';
import Container from '../components/primitives/Container/Container.vue';
import Checkbox from '../components/primitives/Checkbox/Checkbox.vue';
import Progress from '../components/primitives/Progress/Progress.vue';
import bg from '../assets/bg.svg';

import Modal from '../components/compounds/Modal/Modal.vue';
import Tab from '../components/compounds/Tabs/Tab.vue';
import Tabs from '../components/compounds/Tabs/Tabs.vue';

const View = {
    components: { Button, Container, Checkbox, Progress, Modal, Tab, Tabs },
    setup(props) {
        const toggle = ref(false);
        const isImageModalActive = ref(false);
        const isCardModalActive = ref(false);
        const activeTab = ref(0);
        return {
          toggle, bg,
          isImageModalActive,
          isCardModalActive,
          activeTab
        }
    }
}

export default View;
</script>