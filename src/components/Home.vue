<template>
    <div class="main-container">
        <div class="header-container">
            <div class="chara-name">メインキャラ</div>
            <button class="logout-button" @click="googleLogout">logout</button>
        </div> 
        <div class="level-choice-container">
            <div class="level-choice-title">装備レベル</div>
            <div class="level-buttons-container">
                <v-check-box class="level-button" v-for="level in levels" :id="level" :key="level" :title="level" :onSelect="onSelectLevel">
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
            <ItemContainer v-for="part in partType" 
                :key="part.id" 
                :part="part" 
                :onSelectItem="onSelectItem" 
                :items="items" 
                :selectedItems="selectedItems"
                :editItem="editItem"
                :addClick="addClick"
                />
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
        <div v-if="isShowDialog" class="dialog-container">
            <Edit 
                :partId="targetPartId" 
                :defaultLevel="defaultLevel"
                :defaultEffect1="defaultEffect1" 
                :defaultEffect2="defaultEffect2"  
                :defaultEffect3="defaultEffect3"
                :onDelete="onDelete"
                :onCancel="onCancel"
                :onOk="onOk"
                />
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
import Edit from './Edit';
import { reactive, toRefs } from 'vue';

const testData = [
    {
        itemId: 0,
        effect1: { effectId: 0, value: 10},
        effect2: { effectId: 1, value: 10},
        effect3: { effectId: 2, value: 10},
        setTypeId: 0,
        partTypeId: 0
    },
    {
        itemId: 1,
        effect1: { effectId: 3, value: 10},
        effect2: { effectId: 4, value: 10},
        effect3: { effectId: 5, value: 10},
        setTypeId: 0,
        partTypeId: 0
    },
    {
        itemId: 2,
        effect1: { effectId: 0, value: 10},
        effect2: { effectId: 0, value: 10},
        effect3: { effectId: 0, value: 10},
        setTypeId: 0,
        partTypeId: 0
    }
]

export default {
    components: {
      VCheckBox,
      ItemContainer,
      EffectInfo,
      Edit
    },
    setup() {
        const googleLogout = () => {
            firebase.auth().signOut().then(() => {
                // 何もしない
            }).catch((error) => {
                alert('sign out error.', error);
            })
        }
        const data = reactive({
            selectedLevels: [],
            selectedJobs: [],
            selectedItems: [null, null, null, null, null],
            items: testData,
            isShowDialog: false,
            targetPartId: "",
            defaultEffect1: "",
            defaultEffect2: "",
            defaultEffect3: ""
        });
        const onSelectItem = (id, value) => {
            data.selectedItems[id] = value;
            console.log(id, value);
            console.log(data.selectedItems)
        }
        const clearSelectItems = () => {
            data.selectedItems = [null, null, null, null, null];
        }
        const onSelectLevel = (level) => {
            if (data.selectedLevels.includes(level)) {
                data.selectedLevels.splice(data.selectedLevels.indexOf(level), 1);
            } else {
                data.selectedLevels.push(level);
            }
            clearSelectItems();
        }
        const onSelectJob = (job) => {
            if (data.selectedJobs.includes(job)) {
                data.selectedJobs.splice(data.selectedJobs.indexOf(job), 1);
            } else {
                data.selectedJobs.push(job);
            }
            clearSelectItems();
        }

        const addClick = (partId) => {
            data.targetPartId = partId;
            data.isShowDialog = true;
            data.defaultEffect1 = "";
            data.defaultEffect2 = "";
            data.defaultEffect3 = "";
        }

        const onDelete = () => {
            // TODO: 実装
            data.isShowDialog = false;
        }

        const onCancel = () => {
            // TODO: 実装
            data.isShowDialog = false;
        }
        const onOk = () => {
            // TODO: 実装
            data.isShowDialog = false;
        }

        const editItem = () => {
            data.isShowDialog = true;
        }

        return {
            ...toRefs(data),
            googleLogout,
            levels,
            jobSetType,
            partType,
            onSelectLevel,
            onSelectJob,
            onSelectItem,
            addClick,
            onDelete,
            onCancel,
            onOk,
            editItem
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
    font-size: 20px;
}

.logout-button {
    height: 20px;
    font-size: 16px;
    transform: scale(calc(11 / 16));
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

.main-container {
    position: relative;
}

.dialog-container {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
}

</style>