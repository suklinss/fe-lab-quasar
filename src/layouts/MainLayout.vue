<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          class="q-mr-xs"
          push
          color="amber"
          label="Log in"
          @click="userStores.callopject.loginDialog = true"
          v-if="!userStores.info.username"
        />

        <q-btn
          push
          color="purple"
          label="Sign up"
          @click="userStores.callopject.signupDialog = true"
          v-if="!userStores.info.username"
        />

        <!-- <q-btn
          push
          color="primary"
          label="Log ins"
          @click="userStores.info = {}"
          v-if="!userStores.info.username"
        />       -->


        <q-btn color="cyan-13" :label="userStores.info.username || ''" v-if="userStores.info.username">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section @click="userStores.info = {}">Sign out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="desktop"
      elevated
    >
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="desktop"
      elevated
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="userStores.callopject.loginDialog">
        <login-dialog />
      </q-dialog>
      <q-dialog v-model="userStores.callopject.signupDialog">
        <signupDialog/>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script>
import { computed, ref } from "vue";
import { userStore } from "../stores/userStore";

import loginDialog from "../components/loginDialog.vue";
import signupDialog from "../components/signupDialog.vue";

export default {
  components: { loginDialog,signupDialog },
  setup() {
    const userStores = userStore();

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      userStores,
    };
  },
};
</script>
