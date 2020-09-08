<template>
    <div>
        <p>ログインしました。{{msg}}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const msg = ref("aaaaa");
        return {
            msg
        }
    }
}
</script>