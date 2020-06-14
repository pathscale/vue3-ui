<template>
  <CardComponent>
    <TypographyComponent variant="h1">Buttons</TypographyComponent>
    <ButtonComponent>Button</ButtonComponent>
    <ButtonComponent type="is-primary" rounded>Rounded button</ButtonComponent>
    <ButtonComponent type="is-success" loading>Loading button</ButtonComponent>
    <ButtonComponent type="is-danger" outlined>Outlined button</ButtonComponent>
    <ButtonComponent type="is-warning" hovered>Hovered button</ButtonComponent>
    <ButtonComponent type="is-info" selected>Selected button</ButtonComponent>
    <ButtonComponent type="is-dark" expanded>Expanded button</ButtonComponent>
  </CardComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CardComponent, ButtonComponent, TypographyComponent } from './components'

export default defineComponent({
    name: 'App',
    components: {
        CardComponent,
        ButtonComponent,
        TypographyComponent
    }
})
</script>