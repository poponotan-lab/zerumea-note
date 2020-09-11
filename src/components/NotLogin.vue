<template>
    <div id="not-login">
        <div class="header-container">
        
            <h1 class="title">{{msg}}</h1>
            <button @click="googleLogin">Googleアカウントでログイン</button>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import firebase from 'firebase/app';

export default {

    setup() {
        const msg = ref("ゼルメアノート");

        const googleLogin = () => {
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        }

        return {
            msg,
            googleLogin
        }
    }
}
</script>

<style scoped>
    .header-container {
        display: flex;
        justify-content: space-between;
    }
    .title {
        font-size: 18px;
        margin: 0px;
        padding: 0px;
    }
</style>