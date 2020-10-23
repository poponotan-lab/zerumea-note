<template>
  <div id="app">
    <NotLogin v-if="!isLogin && !isLogining" :try-login="tryLogin"></NotLogin>
    <Logining v-if="!isLogin && isLogining" />
    <Home v-if="isLogin" :user="user" ></Home>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import NotLogin from "./components/NotLogin.vue";
import Logining from "./components/Logining";
import Home from "./components/Home.vue";
import { onMounted, reactive, toRefs } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyA-ZGkTcpzcVPS3qO052s6CigC2Jv4aft0",
  authDomain: "zerumea-note-ed82b.firebaseapp.com",
  databaseURL: "https://zerumea-note-ed82b.firebaseio.com",
  projectId: "zerumea-note-ed82b",
  storageBucket: "zerumea-note-ed82b.appspot.com",
  messagingSenderId: "708041806348",
  appId: "1:708041806348:web:93552d76eff79cf3649429",
  measurementId: "G-MREQR2J3LJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(doc);
//   })
// })

export default {
  components: {
    NotLogin,
    Logining,
    Home,
  },
  setup() {
    const data = reactive({
      isLogin: false,
      isLogining: false,
      user: null
    });
    const tryLogin = () => {
      data.isLogining = true;
    };
    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          data.isLogin = true;
          data.user = user;
        } else {
          data.isLogin = false;
          data.user = null;
        }
      });
    });
    return {
      ...toRefs(data),
      tryLogin,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #ffffff;
  background-color: #2e3192;
}
</style>
