<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-toolbar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
      </q-avatar>

      <q-toolbar-title
        ><span class="text-weight-bold">Sign-up Dialog</span></q-toolbar-title
      >

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      <div class="row">
      <div class="col">
        <div class="text-h6">Username</div>
      <q-input
        dense
        v-model="usernameInput"
        autofocus
        @keyup.enter="prompt = false"
      />
      </div>
      <div class="col">
        <div class="text-h6">Username</div>
      <q-input
        dense
        v-model="usernameInput"
        autofocus
        @keyup.enter="prompt = false"
      />
      </div>
    </div>
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
  name: "signupDialog",

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
            userStores.callopject.signupDialog = false
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


