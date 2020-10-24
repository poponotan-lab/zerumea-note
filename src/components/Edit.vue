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
            <button @click="handleSuccessValue1">成功</button>
            <button @click="handleFailValue1">失敗</button>
            <button @click="handleStepValue1">＋</button>
            <div class="effect-value">{{ selectedEffectValue1 }}</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffectId2" @change="handleChangeEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption.id">{{ effectOption.name }}</option>
            </select>
            <button @click="handleSuccessValue2">成功</button>
            <button @click="handleFailValue2">失敗</button>
            <button @click="handleStepValue2">＋</button>
            <div class="effect-value">{{ selectedEffectValue2 }}</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffectId3" @change="handleChangeEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption.id">{{ effectOption.name }}</option>
            </select>
            <button @click="handleSuccessValue3">成功</button>
            <button @click="handleFailValue3">失敗</button>
            <button @click="handleStepValue3">＋</button>
            <div class="effect-value">{{ selectedEffectValue3 }}</div>
        </div>
        <div class="button-container">
            <button v-if="isNew === false" @click="handleDelete">削除</button>
            <button @click="handleCancel">キャンセル</button>
            <button v-if="isNew" @click="handleCreate" :disabled="selectedSetId=='' || selectedLevel==''">OK</button>
            <button v-if="isNew === false" @click="handleUpdate">OK</button>
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
import effectValueType from '../constants/effect-value-type.json';
import { Decimal } from 'decimal.js';

const getSuccessValue = (effectId) => {
    console.log("あたいけいさん");
    const effectValueTypeId = effectType.find(i => i.id === +effectId)["effect-value-type"];
    console.log(`effectValueTypeId:${effectValueTypeId}`);
    return effectValueType.find(i => i.id === effectValueTypeId).success;
}

const getFailValue = (effectId) => {
    const effectValueTypeId = effectType.find(i => i.id === +effectId)["effect-value-type"];
    const targetEffectValue = effectValueType.find(i => i.id === effectValueTypeId);
    return new Decimal(targetEffectValue.success).plus(targetEffectValue.fail).toString();
}

const getStepValue = (effectId) => {
    const effectValueTypeId = effectType.find(i => i.id === +effectId)["effect-value-type"];
    return effectValueType.find(i => i.id === effectValueTypeId).step;
}

const isValid = (arg) => {
    return arg !== "" && arg >= 0;
}

export default {
    props: ['partId', 'item', 'onDelete', 'onCancel', 'onCreate', 'onUpdate', 'isNew'],
    setup(props) {

        const { setTypeId, effect1, effect2, effect3} = {...props.item};

        const defaultSet = sets.find(i => i['set-id'] === setTypeId);

        const selectedLevel = ref(defaultSet != null ? defaultSet.level : "");

        const selectedSetId = ref(defaultSet != null ? defaultSet["set-id"] : "");

        const selectedEffectId1 = ref(effect1.effectId != null ? effectType.find(i => i.id === +effect1.effectId).id : "");
        const selectedEffectValue1 = ref(effect1.value);
        const selectedEffectId2 = ref(effect2.effectId != null ? effectType.find(i => i.id === +effect2.effectId).id : "");
        const selectedEffectValue2 = ref(effect2.value);
        const selectedEffectId3 = ref(effect3.effectId != null ? effectType.find(i => i.id === +effect3.effectId).id : "");
        const selectedEffectValue3 = ref(effect3.value);

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

        const handleCreate = () => {
            props.onCreate(
                {
                    setTypeId: +selectedSetId.value,
                    effectId1: selectedEffectId1.value,
                    effectValue1: selectedEffectValue1.value  ?? "",
                    effectId2: selectedEffectId2.value,
                    effectValue2: selectedEffectValue2.value ?? "",
                    effectId3: selectedEffectId3.value,
                    effectValue3: selectedEffectValue3.value ?? ""
                }
            );
        }

        const handleUpdate = () => {
            props.onUpdate(
                {
                    effectId1: selectedEffectId1,
                    effectValue1: selectedEffectValue1,
                    effectId2: selectedEffectId2,
                    effectValue2: selectedEffectValue2,
                    effectId3: selectedEffectId3,
                    effectValue3: selectedEffectValue3
                }
            );
        }

        const handleSuccessValue1 = () => {
            if (!isValid(selectedEffectId1.value)) {
                return;
            }
            selectedEffectValue1.value = getSuccessValue(selectedEffectId1.value);
        }

        const handleSuccessValue2 = () => {
            if (!isValid(selectedEffectId2.value)) {
                return;
            }
            selectedEffectValue2.value = getSuccessValue(selectedEffectId2.value);
        }        

        const handleSuccessValue3 = () => {
            if (!isValid(selectedEffectId3.value)) {
                return;
            }
            selectedEffectValue3.value = getSuccessValue(selectedEffectId3.value);
        }

        const handleFailValue1 = () => {
            if (!isValid(selectedEffectId1.value)) {
                return;
            }
            selectedEffectValue1.value = getFailValue(selectedEffectId1.value);
        }

        const handleFailValue2 = () => {
            if (!isValid(selectedEffectId2.value)) {
                return;
            }
            selectedEffectValue2.value = getFailValue(selectedEffectId2.value);
        }        

        const handleFailValue3 = () => {
            if (!isValid(selectedEffectId3.value)) {
                return;
            }
            selectedEffectValue3.value = getFailValue(selectedEffectId3.value);
        }

        const handleStepValue1 = () => {
            if (!isValid(selectedEffectId1.value)) {
                return;
            }
            const a = selectedEffectValue1.value ?? "0";
            selectedEffectValue1.value = new Decimal(a).plus(getStepValue(selectedEffectId1.value)).toString();
        }

        const handleStepValue2 = () => {
            if (!isValid(selectedEffectId2.value)) {
                return;
            }
            const a = selectedEffectValue2.value ?? "0";
            selectedEffectValue2.value = new Decimal(a).plus(getStepValue(selectedEffectId2.value)).toString();
        }        

        const handleStepValue3 = () => {
            if (!isValid(selectedEffectId3.value)) {
                return;
            }
            const a = selectedEffectValue3.value;
            selectedEffectValue3.value = new Decimal(a).plus(getStepValue(selectedEffectId3.value)).toString();
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
            handleCreate,
            handleUpdate,
            selectedLevel,
            selectedSetId,
            selectedEffectId1,
            selectedEffectId2,
            selectedEffectId3,
            selectedEffectValue1,
            selectedEffectValue2,
            selectedEffectValue3,
            handleSuccessValue1,
            handleSuccessValue2,
            handleSuccessValue3,
            handleFailValue1,
            handleFailValue2,
            handleFailValue3,
            handleStepValue1,
            handleStepValue2,
            handleStepValue3
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