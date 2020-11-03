<template>
    <div id="not-login">
        <div class="header-container">
        
            <h1 class="title">{{msg}}</h1>
            <button class="login-button" @click="googleLogin">Googleアカウントでログイン</button>
        </div>
        <div class="document-container">
            <h2>ゼルメアノート is 何？</h2>
            <p>DQXの防具管理用ノートアプリです。</p>
            <p>
                lv96〜108装備の中で自分が何を持っていて、どんな錬金効果がついているかを記録できます。
            </p>
            <h2>操作方法</h2>
            <h3>使い始める！</h3>
                <ul>
                    <li>Googleアカウントでログインすると一覧画面が表示されます。</li>
                </ul>
            <h3>見る！</h3>
                <ul>
                    <li>levelと職で絞り込んで見る</li>
                    <div class="description">表示したい装備レベル、職を選ぶ</div>
                    <img class="filter-img" src="../assets/filter.png" />
                    <div class="description"></div>
                    <li>全身で効果をチェックする</li>
                    <div class="description">登録済アイテムを選択すると画面下に合計が表示される</div>
                    <img src="../assets/effect.png" />
                </ul>
            <h3>記録する！</h3>
                <ul>
                    <li>追加する</li>
                    <div class="description">登録したい部位の右にある＋ボタンをクリックする</div>
                    <div class="description">表示されるポップアップに入力してOKボタンクリック</div>
                    <li>更新する</li>
                    <div class="description">更新したい装備をダブルクリックする</div>
                    <div class="description">表示されるポップアップに入力してOKボタンクリック</div>
                    <li>削除する</li>
                    <div class="description">削除したい装備をダブルクリックする</div>
                    <div class="description">表示されるポップアップの削除ボタンクリック</div>
                </ul>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import firebase from 'firebase/app';

export default {
    props: ['tryLogin'],
    setup(props) {
        const msg = ref("ゼルメアノート");

        const googleLogin = () => {
            props.tryLogin();
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
    h2 {
        font-size: 18px;
        color: #00ffff;
        text-align: center;
    }
    h3 {
        font-size: 16px;
        padding-left: 30px;
        color:pink;
    }
    p {
        font-size: 14px;
        padding: 0;
        margin: 0 0 0 12px;
    }
    ul {
        font-size: 14px;
        list-style: none;
        color: #00ffff;
    }
    .header-container {
        display: flex;
        justify-content: space-between;
        padding: 8px;
    }
    .title {
        font-size: 18px;
        margin: 0px;
    }
    .login-button {
        height: 20px;
        margin: 0;
        padding: 0;
        font-size: 12px;
    }
    .description {
        font-size: 12px;
        color: lightgray;
        margin-left: 20px;
    }
    .filter-img {
        height: 100px;
    }
</style>