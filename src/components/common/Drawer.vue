<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { NavigationItems } from '../../constants/DrawerItems';
import { useQuasar } from 'quasar';
import userDataService from '../../Api/apis/user.api';
import { Error, Ok } from 'src/constants/NotifyTypes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TheDrawer',
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const isAuthenticated = ref(
      sessionStorage.getItem('MAuth')?.toString() ? true : false
    );

    function changeTheme() {
      if ($q.dark.isActive) {
        $q.dark.set(true);
      } else {
        $q.dark.set(false);
      }
      $q.dark.toggle();
    }

    async function logout() {
      var request = await userDataService.logout();
      if ((request.StatusCode = 200)) {
        $q.notify({
          progress: true,
          timeout: 1500,
          type: Ok,
          message: request.message,
        });
        sessionStorage.removeItem('MAuth');
        isAuthenticated.value = false;
        router.go(0);
        router.push({ name: 'login' });
      } else {
        $q.notify({
          progress: true,
          timeout: 1500,
          type: Error,
          message: request.message,
        });
      }
    }
    return {
      logout,
      isAuthenticated,
      drawer: ref(false),
      miniState: ref(true),
      items: NavigationItems,
      changeTheme,
    };
  },
});
</script>

<template>
  <q-header elevated class="bg-black">
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      <q-toolbar-title>FileManagment Panel</q-toolbar-title>
      <q-btn flat @click="changeTheme" round dense icon="light" />
      <q-btn
        v-if="isAuthenticated == false"
        flat
        to="/login"
        color="green"
        label="ورود"
        round
        dense
        icon="login"
      />
      <q-btn
        v-if="isAuthenticated == true"
        flat
        @click="logout"
        color="red"
        label="خروج"
        round
        dense
        icon="logout"
      />
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="drawer"
    show-if-above
    :width="280"
    :breakpoint="500"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="item in items"
          v-bind:key="item.key"
          :header-inset-level="1"
          expand-separator
          :icon="item.icon"
          :label="item.name"
          default-opened
        >
          <q-item
            v-for="child in item.children"
            v-bind:key="child.key"
            :inset-level="1"
            active
            clickable
            v-ripple
            :to="child.to"
          >
            <q-item-section avatar>
              <q-icon :name="child.icon" />
            </q-item-section>

            <q-item-section> {{ child.name }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
