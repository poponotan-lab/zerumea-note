<template>
    <div class="effects-container">
        <EffectInfo v-for="effect in data.effects" :key="effect.id" :effectTypeId="effect.id" :effectValue="effect.value"/>
    </div>
</template>

<script>
import { reactive, watch } from 'vue';
import EffectInfo from './EffectInfo';
import { Decimal } from 'decimal.js';
// import { Decimal } from 'decimal.js';
export default {
    components: {
        EffectInfo
    },
    props: ['selectedItems', 'items'],
    setup (props) {
        const data = reactive({
            count: 0,
            effects: {}
        })
        watch(props.selectedItems, () => {
            data.count++;
            // 
            const targetItems = props.items.filter(i => props.selectedItems.includes(i.itemId));

            let effectMap = {};
            let result = [];

            targetItems.forEach((targetItem) => {
                // effect1
                if (effectMap[targetItem.effect1.effectId] == null) {
                    effectMap[targetItem.effect1.effectId] = `${targetItem.effect1.value}`;
                } else {
                    effectMap[targetItem.effect1.effectId] = new Decimal(targetItem.effect1.value).plus(effectMap[targetItem.effect1.effectId]).toString()
                }
                // effect2
                if (effectMap[targetItem.effect2.effectId] == null) {
                    effectMap[targetItem.effect2.effectId] = `${targetItem.effect2.value}`;
                } else {
                    effectMap[targetItem.effect2.effectId] = new Decimal(targetItem.effect2.value).plus(effectMap[targetItem.effect2.effectId]).toString()
                }
                // effect3
                if (effectMap[targetItem.effect3.effectId] == null) {
                    effectMap[targetItem.effect3.effectId] = `${targetItem.effect3.value}`;
                } else {
                    effectMap[targetItem.effect3.effectId] = new Decimal(targetItem.effect3.value).plus(effectMap[targetItem.effect3.effectId]).toString()
                }
            })
            Object.keys(effectMap).forEach((key) => {
                result.push({id: key, value: effectMap[key]})
            })
            data.effects = result;
        })
        return {
            data
        }
    }
}
</script>
<style scoped>
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