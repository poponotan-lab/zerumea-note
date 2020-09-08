<template>
    <div id="not-login">
        <h1>{{msg}}</h1>
        <button @click="googleLogin">Googleアカウントでログイン</button>
    </div>
</template>
<script>
import { ref } from 'vue'
import firebase from 'firebase/app';

export default {

    setup() {
        const msg = ref("ゼルメアノートです。");

        const googleLogin = () => {
            console.log(firebase);
            console.log(firebase.auth().signInWithRedirect);
            console.log(new firebase.auth.GoogleAuthProvider());
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        }

        return {
            msg,
            googleLogin
        }
    }
}
</script>