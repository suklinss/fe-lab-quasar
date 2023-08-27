<template>
  <q-dialog>
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
        <q-btn flat label="Signin" v-close-popup @click="fetchData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { axios } from "../boot/axios";

export default {
  name: "loginDialog",

  setup() {
    const usernameInput = ref("");
    const passwordInput = ref("");
    const data = {};

    const fetchData = async () => {
      if (usernameInput.value !== "") {
        try {
          const response = await axios.post("http://localhost:8000/user", {
            username: usernameInput.value,
          });

          console.log(response.data);

          if (Array.isArray(response.data) && response.data.length > 0) {
            // Check if response.data is an array with at least one element
            if (
              usernameInput.value === response.data[0].username &&
              passwordInput.value === response.data[0].password
            ) {
              // Username and password match
              console.log("Login successful");
            } else {
              // Wrong password or username
              console.log("Wrong password");
            }
          } else {
            // No user found
            console.log("User not found");
          }
        } catch (error) {
          console.error(error);
          return error;
        }
      }
    };

    return {
      usernameInput,
      passwordInput,
      fetchData,
      data,
    };
  },
};
</script>

