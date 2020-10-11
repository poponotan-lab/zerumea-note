<template>
    <div class="main-container">
        <div class="header-container">
            <div class="chara-name">メインキャラ</div>
            <button class="logout-button" @click="googleLogout">logout</button>
        </div> 
        <div class="level-choice-container">
            <div class="level-choice-title">装備レベル</div>
            <div class="level-buttons-container">
                <v-check-box class="level-button" v-for="level in levels" :id="`level-${level}`" :key="`level-${level}`" :title="level" :onSelect="onSelectLevel">
                </v-check-box>
            </div>
        </div>
        <div class="job-choice-container">
            <div class="level-choice-title">職業</div>
            <div class="level-buttons-container">
                <v-check-box class="level-button" v-for="jobSet in jobSetType" :id="`job-set-${jobSet.id}`" :key="`job-set-${jobSet.id}`" :title="jobSet.name" :onSelect="onSelectJob">
                </v-check-box>
            </div>
        </div>
        <div class="item-list-container">
            <ItemContainer v-for="part in partType" :key="part.id" :part="part" />
        </div>
        <div class="effects-container">
            <EffectInfo :effectTypeId="0" :effectValue="'18'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
            <EffectInfo :effectTypeId="2" :effectValue="'100％'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
            <EffectInfo :effectTypeId="1" :effectValue="'45'"/>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import levels from '../constants/levels.json';
import jobSetType from '../constants/job-set-type.json';
import partType from '../constants/part-type.json';
import VCheckBox from './VCheckBox';
import ItemContainer from './ItemContainer';
import EffectInfo from './EffectInfo';

export default {
    components: {
      VCheckBox,
      ItemContainer,
      EffectInfo
    },
    setup() {
        const googleLogout = () => {
            firebase.auth().signOut().then(() => {
                // 何もしない
            }).catch((error) => {
                alert('sign out error.', error);
            })
        }
        // 表示レベル
        const selectedLevels = [];
        // 表示職業
        const selectedJobs = [];
        const onSelectLevel = (level) => {
            if (selectedLevels.includes(level)) {
                selectedLevels.splice(selectedLevels.indexOf(level), 1);
            } else {
                selectedLevels.push(level);
            }
        }
        const onSelectJob = (job) => {
            if (selectedJobs.includes(job)) {
                selectedJobs.splice(selectedJobs.indexOf(job), 1);
            } else {
                selectedJobs.push(job);
            }
        }
        return {
            googleLogout,
            levels,
            jobSetType,
            partType,
            selectedLevels,
            selectedJobs,
            onSelectLevel,
            onSelectJob
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



</style>