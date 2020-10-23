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
                <v-check-box class="level-button" v-for="jobSet in jobSetType" :id="`${jobSet.id}`" :key="`${jobSet.id}`" :title="jobSet.name" :onSelect="onSelectJob">
                </v-check-box>
            </div>
        </div>
        <div class="item-list-container">
            <ItemContainer v-for="part in partType" 
                :key="part.id" 
                :part="part" 
                :onSelectItem="onSelectItem" 
                :items="filteredItems" 
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
                :item="targetItem"
                :onDelete="onDelete"
                :onCancel="onCancel"
                :onCreate="onCreate"
                :onUpdate="onUpdate"
                :isNew="isNew"
                />
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import levels from '../constants/levels.json';
import jobSetType from '../constants/job-set-type.json';
import partType from '../constants/part-type.json';
import sets from '../constants/set.json';
import VCheckBox from './VCheckBox';
import ItemContainer from './ItemContainer';
import EffectInfo from './EffectInfo';
import Edit from './Edit';
import { computed, reactive, toRefs, onMounted } from 'vue';
import { getNewItem } from '../utils'

const saveItem = (uid, charas, items, ) => {
    firebase.firestore()
        .collection('/users')
        .doc(uid)
        .set({
            charas: charas,
            items: items
        })
}

const initCharas = [{id: "0", name: "メインキャラ"}];

export default {
    components: {
        VCheckBox,
        ItemContainer,
        EffectInfo,
        Edit
    },
    props: ['user'],
    setup(props) {
        onMounted (async () => {
            await firebase.firestore()
                .collection('/users')
                .doc(props.user.uid)
                .get()
                .then( function(doc) {
                    if (doc.exists) {
                        console.log("初期データです。");
                        console.log(doc.data().items);
                        // 初期値データ取得
                        data.charas = doc.data().charas;
                        data.items = doc.data().items ?? [];
                    } else {
                        // 初期キャラ登録
                        firebase.firestore()
                            .collection('/users')
                            .doc(props.user.uid)
                            .set({ charas: initCharas });
                        data.charas = initCharas;
                    }
                }).catch((error) => {
                    alert("データ取得エラー", error);
                })
            
        });
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
            items: [],
            isShowDialog: false,
            targetPartId: undefined,
            targetItem: undefined,
            isNew: false,
            charas: []
        });
        const onSelectItem = (id, value) => {
            data.selectedItems[id] = value;
        }
        const filteredItems = computed(() => {
            if (data.selectedLevels.length === 0 && data.selectedJobs.length === 0) {
                return data.items;
            }
            if (data.items == null) {
                return data.items;
            }
            return data.items.filter((i) => {
                const targetSet = sets.find(s => i.setTypeId === s["set-id"]);
                const setLevel = targetSet.level;
                // 選択レベル対象外の場合は除外
                if (!data.selectedLevels.includes(setLevel)) {
                    return false;
                }
                // 選択職対象外の場合は除外
                const jobSetType = "" + targetSet["jobs-set-type"];
                if (!data.selectedJobs.includes(jobSetType)) {
                    return false;
                }
                return true;
            })
        })
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

        const onDelete = () => {
            // TODO: サーバ連携
            data.isShowDialog = false;
            const targetIndex = data.items.findIndex(i => i.itemId === data.targetItem.itemId);
            data.items.splice(targetIndex, 1);
            saveItem(props.user.uid, { ...data.charas }, { ...data.items });
        }

        const onCancel = () => {
            data.isShowDialog = false;
        }
        const onCreate = (args) => {
            // TODO: サーバ連携
            data.isShowDialog = false;
            data.targetItem.setTypeId = args.setTypeId;
            data.targetItem.effect1.effectId = args.effectId1;
            data.targetItem.effect1.value = args.effectValue1;
            data.targetItem.effect2.effectId = args.effectId2;
            data.targetItem.effect2.value = args.effectValue2;
            data.targetItem.effect3.effectId = args.effectId3;
            data.targetItem.effect3.value = args.effectValue3;
            data.items.push({...data.targetItem});
            saveItem(props.user.uid, [ ...data.charas ], [ ...data.items ]);
        }

        const onUpdate = (args) => {
            // TODO: サーバ連携
            data.isShowDialog = false;
            const targetItem = data.items.find(i => i.itemId === data.targetItem.itemId);
            targetItem.effect1.effectId = args.effectId1;
            targetItem.effect1.value = args.effectValue1;
            targetItem.effect2.effectId = args.effectId2;
            targetItem.effect2.value = args.effectValue2;
            targetItem.effect3.effectId = args.effectId3;
            targetItem.effect3.value = args.effectValue3;
            saveItem(props.user.uid, { ...data.charas }, { ...data.items });
        }

        // 追加ボタンクリック
        const addClick = (partId) => {
            data.isShowDialog = true;
            data.isNew = true;
            data.targetItem = getNewItem(undefined, partId);
            data.targetPartId = partId;
        }

        // 編集・削除操作の開始処理
        const editItem = (item) => {
            data.isShowDialog = true;
            data.isNew = false;
            data.targetItem = item;
            data.targetPartId = item.partTypeId;
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
            onCreate,
            onUpdate,
            editItem,
            filteredItems
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