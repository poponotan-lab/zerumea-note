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
            <ItemContainer />
            <ItemContainer />
            <ItemContainer />
            <ItemContainer />
            <ItemContainer />
        </div>
        <div class="effects-container">
            <div class="effects-info">
                <div class="effects-title">幻惑</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">回魔</div>
                <div class="effects-value">45</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">眠</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">即死</div>
                <div class="effects-value">90%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">回魔</div>
                <div class="effects-value">45</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">重さ</div>
                <div class="effects-value">45</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
            <div class="effects-info">
                <div class="effects-title">転び</div>
                <div class="effects-value">100%</div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import levels from '../constants/levels.json';
import jobSetType from '../constants/job-set-type.json';
import VCheckBox from './VCheckBox';
import ItemContainer from './ItemContainer';

export default {
    components: {
      VCheckBox,
      ItemContainer
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

.effects-container {
    background: #2e3192;
    margin: 4px 12px;
    padding: 12px;
    border-radius: 6px;
    border: white solid 4px;
    height: 120px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.effects-info {
    display: flex;
    height: 21px;
    border-right: #999999 solid 1px;
    justify-content: space-between;
    padding: 4px 8px;
}

</style>