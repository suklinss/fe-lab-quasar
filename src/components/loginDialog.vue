<template>
  <q-card style="width: 300px">
    <q-toolbar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
      </q-avatar>

      <q-toolbar-title
        ><span class="text-weight-bold">LoginPanel</span></q-toolbar-title
      >

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      <div class="text-h6">Username</div>
      <q-input
        dense
        v-model="usernameInput"
        autofocus
        @keyup.enter="prompt = false"
      />

      <div class="text-h6">Password</div>
      <q-input
        dense
        v-model="passwordInput"
        autofocus
        filled
        type="password"
        hint="Password"
        @keyup.enter="prompt = false"
      />
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Signin" @click="fetchData" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { userStore } from "../stores/userStore";

export default {
  name: "loginDialog",

  setup() {
    const userStores = userStore();
    const usernameInput = ref("");
    const passwordInput = ref("");
    const fetchData = async () => {
      try {
        const response = await userStores.api_getuser({
          username: usernameInput.value,
        });
        console.log(response);
        if (response[0].username) {
          if (passwordInput.value == response[0].password) {
            userStores.info.username = response[0].username;
            userStores.callopject.loginDialog = false
          }
          else{
            console.log("wrong password");
          }
        } else {
          console.log("not found username");
        }
      } catch (error) {
        console.log(error);
        // Handle errors here
      }
    };

    return {
      userStores,
      usernameInput,
      passwordInput,
      fetchData,
    };
  },
};
</script>


