<template>
  <q-card style="width: 700px; max-width: 80vw">
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
      <div class="q-mt-md"><div class="text-h5">User</div></div>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="q-pr-md">
                <div class="text-h7">Username</div>
                <q-input
                  dense
                  v-model="usernameInput"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </div>
            </div>

            <div class="col">
              <div class="q-pr-md">
                <div class="text-h7">Password</div>
                <q-input
                  dense
                  v-model="passwordInput"
                  autofocus
                  type="password"
                  @keyup.enter="prompt = false"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="q-mt-md"><div class="text-h5">Infomation</div></div>
      <q-card class="my-card" flat bordered>
        <q-card-section> Infomation </q-card-section>
      </q-card>
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Registor" @click="setData" />
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
    const setData = async () => {
      try {
        const hashPassword = await userStores.api_hashuser({
          data:passwordInput.value
        })
        const response = await userStores.api_adduser({
          username: usernameInput.value,
          password: hashPassword.hashData,
          salt: hashPassword.saltData
        });
        console.log(response);
        if (response.username == usernameInput.value) {
          userStores.callopject.signupDialog = false;
        } else {
          console.log("Can't Register");
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
      setData
    };
  }
};
</script>
