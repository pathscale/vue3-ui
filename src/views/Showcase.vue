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
    <section>
      <div class="buttons">
        <button class="button is-primary is-medium"
                @click="isImageModalActive = true">
          Launch image modal
        </button>
        <button class="button is-primary is-medium"
                @click="isCardModalActive = true">
          Launch card modal (keep scroll)
        </button>
      </div>

      <Modal v-model:active="isImageModalActive">
        <p class="image is-4by3">
          <img src="https://www.revenge.game/static/slate/img/5a54d6_a55ac992eac548bcb0d8b76bbbb3df95_mv2_d_1963_1326_s_2.png?q=1580919340" />
        </p>
      </Modal>

      <Modal v-model:active="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://www.revenge.game/static/slate/img/5a54d6_a55ac992eac548bcb0d8b76bbbb3df95_mv2_d_1963_1326_s_2.png?q=1580919340" alt="Image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://www.revenge.game/static/slate/img/5a54d6_a55ac992eac548bcb0d8b76bbbb3df95_mv2_d_1963_1326_s_2.png?q=1580919340" alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  John Smith
                </p>
                <p class="subtitle is-6">
                  @johnsmith
                </p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a>#css</a> <a>#responsive</a>
              <br />
              <small>11:09 PM - 1 Jan 2016</small>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  </Container>
</template>

<script>

import { ref } from 'vue';

import Button from '../components/primitives/Button/Button.vue';
import Container from '../components/primitives/Container/Container.vue';
import Checkbox from '../components/primitives/Checkbox/Checkbox.vue';
import Progress from '../components/primitives/Progress/Progress.vue';
import bg from '../assets/bg.svg';
import Modal from '../components/compounds/Modal/Modal.vue';

const View = {
    components: { Button, Container, Checkbox, Progress, Modal },
    setup(props) {
        const toggle = ref(true);
        const isImageModalActive = ref(false);
        const isCardModalActive = ref(false);
        return {
          toggle, bg,
          isImageModalActive,
          isCardModalActive
        }
    }
}

export default View;
</script>