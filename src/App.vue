<template>
  <q-layout>
    <Drawer></Drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from '../src/components/common/Drawer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Drawer,
  },
});
</script>
