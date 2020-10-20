<template>
    <div class="dialog-frame">
        <div class="target-input-container">
            <div class="part-name">{{ partTypeName }}</div>
            <div class="select-container">
                <select v-model="selectedLevel" @change="handleChange">
                    <option disabled value="">select level</option>
                    <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
                </select>
            </div>
            <div class="select-container">
                <select>
                    <option v-for="set in setOptions" :key="set['set-id']" :value="set['set-id']">{{ setTypes[set['set-id']].name }}</option>
                </select>
            </div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffect1">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption">{{ effectOption.name }}</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffect2">
                <option v-for="effectOption in effectOptions" :key="effectOption.id" :value="effectOption">{{ effectOption.name }}</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select v-model="selectedEffect3">
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
import { computed, reactive, toRef } from 'vue';
import levels from '../constants/levels.json';
import sets from '../constants/set.json';
import setTypes from '../constants/set-type.json';
import partType from '../constants/part-type.json';
import effectType from '../constants/effect-type.json';
    
export default {
    props: ['partId', 'defaultLevel', 'defaultEffect1', 'defaultEffect2', 'defaultEffect3', 'onDelete', 'onCancel', 'onOk'],
    setup(props) {
        const data = reactive({
            selectedLevel: props.defaultLevel || "",
            selectedEffect1: props.defaultEffect1 != null ? effectType.find(i => i.id === +props.defaultEffect1) : "",
            selectedEffect2: props.defaultEffect2 != null ? effectType.find(i => i.id === +props.defaultEffect2) : "",
            selectedEffect3: props.defaultEffect3 != null ? effectType.find(i => i.id === +props.defaultEffect3) : ""
        })

        const setOptions = computed(() =>  {
            if (data.selectedLevel === "") {
                return sets;
            }
            return sets.filter(i => i.level === +data.selectedLevel)
        });

        const handleChange = (e) => {
            data.selectedLevel = e.target.value;
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
            ...toRef(data),
            setOptions,
            levels,
            setTypes,
            handleChange,
            partTypeName,
            effectOptions,
            handleDelete,
            handleCancel,
            handleOk
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