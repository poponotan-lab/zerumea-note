<template>
    <div>
        <p>ログインしました。{{msg}}</p>
        <button @click="googleLogout">ログアウト</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/app';
export default {
    setup() {
        const msg = ref("aaaaa");

        const googleLogout = () => {
            firebase.auth().signOut().then(() => {
                // 何もしない
            }).catch((error) => {
                alert('sign out error.', error);
            })
        }
        return {
            msg,
            googleLogout
        }
    }
}
</script>