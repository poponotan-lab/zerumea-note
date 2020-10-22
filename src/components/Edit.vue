<template>
    <div class="dialog-frame">
        <div class="target-input-container">
            <div class="part-name">{{ partTypeName }}</div>
            <div class="select-container">
                <select v-model="selectedLevel" @change="handleChangeLevel">
                    <option disabled value="null">select level</option>
                    <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
                </select>
            </div>
            <div class="select-container">
                <select v-model="selectedSetId" @change="handleChangeItem">
                    <option v-for="set in setOptions" :key="set['set-id']" :value="set['set-id']">{{ setTypes[set['set-id']].name }}</option>
                </select>
            </div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffectId1" @change="handleChangeEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption.id">{{ effectOption.name }}</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffectId2" @change="handleChangeEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption.id">{{ effectOption.name }}</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffectId3" @change="handleChangeEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption.id">{{ effectOption.name }}</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="button-container">
            <button @click="handleDelete">削除</button>
            <button @click="handleCancel">キャンセル</button>
            <button @click="handleOk">OK</button>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import levels from '../constants/levels.json';
import sets from '../constants/set.json';
import setTypes from '../constants/set-type.json';
import partType from '../constants/part-type.json';
import effectType from '../constants/effect-type.json';

export default {
    props: ['partId', 'item', 'onDelete', 'onCancel', 'onOk'],
    setup(props) {

        const { setTypeId, effect1, effect2, effect3} = {...props.item};

        const defaultSet = sets.find(i => i['set-id'] === setTypeId);

        const selectedLevel = ref(defaultSet != null ? defaultSet.level : "");

        const selectedSetId = ref(defaultSet != null ? defaultSet["set-id"] : "");

        const selectedEffectId1 = ref(effect1.effectId != null ? effectType.find(i => i.id === +effect1.effectId).id : "");
        const selectedEffectId2 = ref(effect2.effectId != null ? effectType.find(i => i.id === +effect2.effectId).id : "");
        const selectedEffectId3 = ref(effect3.effectId != null ? effectType.find(i => i.id === +effect3.effectId).id : "");

        const setOptions = computed(() =>  {
            if (selectedLevel.value === "") {
                return sets;
            }
            return sets.filter(i => i.level === selectedLevel.value)
        });

        const handleChangeLevel = (e) => {
            selectedLevel.value = e.target.value;
        }

        const handleChangeItem = (e) => {
            selectedSetId.value = e.target.value;
        }

        const partTypeName = partType.find(i => i.id === +props.partId).name;

        const effectOptions = effectType.filter((i => i.parts.includes(+props.partId)));

        const handleDelete = () => {
            props.onDelete();
        }

        const handleCancel = () => {
            props.onCancel();
        }
        const handleOk = () => {
            props.onOk();
        }

        return {
            setOptions,
            levels,
            setTypes,
            handleChangeLevel,
            handleChangeItem,
            partTypeName,
            effectOptions,
            handleDelete,
            handleCancel,
            handleOk,
            selectedLevel,
            selectedSetId,
            selectedEffectId1,
            selectedEffectId2,
            selectedEffectId3
         }
    }
}
</script>

<style scoped>
.dialog-frame {
    background: cornsilk;
    border-radius: 12px;
    color: #333333;
    margin: 30px;
    width: 300px;
    padding: 12px;
}

.target-input-container {
    display: flex;
}

.select-container {
    margin: 0px 8px;
}

.part-name {
    font-size: 18px;
    font-weight: bold;
}

.effect-input-container {
    display: flex;
    justify-content: space-between;
    height: 24px;
    padding: 4px;
}

.effect-value {
    font-size: 18px;
}

.button-container {
    padding-top: 12px;
    margin: 0 12px;
    display: flex;
    justify-content: space-between;
}
</style>