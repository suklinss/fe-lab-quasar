import { defineStore } from 'pinia'
import {axios} from 'src/boot/axios';

export const userStore = defineStore('userStore', {
  state: () => ({
    info: {
      username: "",
      level: 0,
    },
    callopject: {
      loginDialog: false
    }
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2
    }
  },

  actions: {
    api_getuser(requestData) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/user", requestData)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    }
  }
})
