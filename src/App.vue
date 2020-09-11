<template>
  <div id="app">
    <NotLogin v-if="!isLogin"></NotLogin>
    <Home v-if="isLogin"></Home>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import NotLogin from './components/NotLogin.vue'
import Home from './components/Home.vue'
import { onMounted, ref } from 'vue';

const firebaseConfig = {
    apiKey: "AIzaSyA-ZGkTcpzcVPS3qO052s6CigC2Jv4aft0",
    authDomain: "zerumea-note-ed82b.firebaseapp.com",
    databaseURL: "https://zerumea-note-ed82b.firebaseio.com",
    projectId: "zerumea-note-ed82b",
    storageBucket: "zerumea-note-ed82b.appspot.com",
    messagingSenderId: "708041806348",
    appId: "1:708041806348:web:93552d76eff79cf3649429",
    measurementId: "G-MREQR2J3LJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default {
    components: {
      NotLogin,
      Home
    },
    setup() {
      const isLogin = ref(false);
      onMounted(() => {
        firebase.auth().onAuthStateChanged(user => {
           console.log(user);
           if (user) {
             isLogin.value = true;
           } else {
             isLogin.value = false;
           }
        })
      })
      return {
        isLogin
      }
    }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
