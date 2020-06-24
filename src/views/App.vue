<template>
  <div class="sidebar-page">
    <section class="hero is-fullheight sidebar-layout">
      <v-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-light"
        fullheight
        :open="open">
        <div class="p-1">
          <div class="block">
            <h1>VSidebar</h1>
          </div>
        </div>
      </v-sidebar>

      <div class="p-1">
        <v-field>
          <v-switch v-model="open">
            Open
          </v-switch>
        </v-field>
        <v-field>
          <v-switch v-model="reduce">
            Reduced
          </v-switch>
        </v-field>
        <v-field>
          <v-switch v-model="expandOnHover">
            Expand on hover
          </v-switch>
        </v-field>
        <v-field label="Mobile Layout">
          <v-select v-model="mobile">
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
</template>

<script>
import { VSidebar, VSelect, VField, VSwitch } from "../components"

const Component = {
  components: { VSidebar, VSelect, VField, VSwitch },
  data() {
    return {
      open: true,
      expandOnHover: true,
      mobile: "reduce",
      reduce: true
    };
  }
};
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