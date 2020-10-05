<template>
    <div class="main-container">
        <div class="header-container">
            <div class="chara-name">メインキャラ</div>
            <button class="logout-button" @click="googleLogout">logout</button>
        </div> 
        <div class="level-choice-container">
            <div class="level-choice-title">装備レベル</div>
            <div class="level-buttons-container">
                <v-check-box class="level-button" v-for="level in levels" :id="`level-${level}`" :key="`level-${level}`" :title="level">
                </v-check-box>
            </div>
        </div>
        <div class="job-choice-container">
            <div class="level-choice-title">職業</div>
            <div class="level-buttons-container">
                <v-check-box class="level-button" v-for="jobSet in jobSetType" :id="`job-set-${jobSet.id}`" :key="`job-set-${jobSet.id}`" :title="jobSet.name">
                </v-check-box>
            </div>
        </div>
        <div class="item-list-container">
            <div class="item-container">
                <div class="item-part-title">
                    頭
                </div>
                <div class="item-line-parent">
                    <div class="item-line">
                        <div class="item">
                            <div class="item-name">風のマント</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                        </div>
                        <div class="item">
                            <div class="item-name">風のマント</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                        </div>
                        <div class="item">
                            <div class="item-name">風のマント</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                        </div>
                        <div class="item">
                            <div class="item-name">風のマント</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                        </div>
                    </div>
                    <div class="add-button-area">
                        +
                    </div>
                </div>
            </div>
            <div class="item-container">
                <div class="item-part-title">
                    体上
                </div>
                <div class="item-line-parent">
                    <div class="item-line">
                        <div class="item">
                            <div class="item-name">風のマント</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                            <div class="item-value">AAA:bbb</div>
                        </div>
                    </div>
                    <div class="add-button-area">
                        +
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import levels from '../constants/levels.json';
import jobSetType from '../constants/job-set-type.json';
import VCheckBox from './VCheckBox';

export default {
    components: {
      VCheckBox
    },
    setup() {
        const googleLogout = () => {
            firebase.auth().signOut().then(() => {
                // 何もしない
            }).catch((error) => {
                alert('sign out error.', error);
            })
        }
        return {
            googleLogout,
            levels,
            jobSetType
        }
    }
}
</script>
<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    padding: 4px 12px;
}
.chara-name {
    font-size: 24px;
}

.logout-button {
    height: 20px;
    font-size: 11px;
    background-color: lightblue;
}

.level-choice-container,
.job-choice-container {
    background: #0071BC;
    margin: 4px 12px;
    padding: 2px 6px;
}

.level-choice-title,
.level-choice-title {
    font-size: 16px;
}

.level-buttons-container {
    display: flex;
    margin-bottom: 4px;
}

.item-list-container {
    background: #ffffff;
    margin: 4px 12px;
    border-radius: 6px;
}

.item-container {
    background: #2E3192;
    padding: 4px;
    border-radius: 12px;
    border: solid 4px #ffffff;
    display: flex;
}

.item-line-parent {
    display: flex;
    width: 90%;
}

.item-line {
    background: #ffffff;
    width: 100%;
    display: flex;
    border-radius: 6px;
    height: 80px;
    padding: 4px;
    overflow-x: auto;
}

.item-part-title {
    writing-mode: vertical-rl;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.item {
    flex: 0 0 48px;
    min-width: 88px;
    height: 70px;
    margin: 4px;
    border-radius: 6px;
    background: #ffffff;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, .5));
    color: #333333;
}

.item-name {
    font-size: 13px;
    padding-left: 4px
}

.item-value {
    font-size: 11px;
    text-align: right;
    padding-right: 4px;
}

.add-button-area {
    position: absolute;
    background: rgba(0, 113, 188, .5);
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    right: 20px;
}

</style>