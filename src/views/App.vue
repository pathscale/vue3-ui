<template>
  <div>
    <div>
      <VTextarea v-model="state.felipe" class="felipe" @click="felipe" loading rounded />
      <VButton @click="setRounded">Almafa</VButton>
    </div>
    <div class="sidebar-page">
      <section class="hero is-fullheight sidebar-layout">
        <v-sidebar
          position="static"
          :mobile="state.mobile"
          :expand-on-hover="state.expandOnHover"
          :reduce="state.reduce"
          type="is-light"
          fullheight
          :open="state.open">
          <div class="p-1">
            <div class="block">
              <h1>VSidebar</h1>
            </div>
          </div>
        </v-sidebar>

        <div class="p-1">
          <v-field>
            <v-switch v-model="state.open">
              Open
            </v-switch>
          </v-field>
          <v-field>
            <v-switch v-model="state.reduce">
              Reduced
            </v-switch>
          </v-field>
          <v-field>
            <v-switch v-model="state.expandOnHover">
              Expand on hover
            </v-switch>
          </v-field>
          <v-field label="Mobile Layout">
            <v-select v-model="state.mobile">
              <option value="reduce">
                Reduced
              </option>
              <option value="hide">
                Hidden
              </option>
              <option value="fullwidth">
                Fullwidth
              </option>
            </v-select>
          </v-field>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { VTextarea, VInput, VSidebar, VSelect, VField, VSwitch, VButton, useGlobalSettings } from "../components";

const Component = {
  components: { VTextarea, VInput, VSidebar, VSelect, VField, VSwitch, VButton },
  setup(){
    const state = reactive({
      value: 10,
      open: true,
      expandOnHover: true,
      mobile:'reduce',
      reduce:true
    })
    const settings = useGlobalSettings();

    return {
      state,
      setRounded() {
        settings.button.rounded = true;
      }      
    }
  }
}
export default Component;
</script>

<style>
.p-1 {
	 padding: 1em;
}
 .sidebar-page {
	 display: flex;
	 width: 100%;
}
 .sidebar-page .sidebar-layout {
	 display: flex;
	 flex-direction: row;
}
</style>
