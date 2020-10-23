<template>
    <div class="effects-info">
        <div class="effects-title">{{name}}</div>
        <div class="effects-value">{{effectValue}}</div>
    </div>
</template>

<script>
import effectType from '../constants/effect-type.json';

export default {
    props: ['effectTypeId', 'effectValue'],
    setup(props) {
        const name = effectType.find(i => i.id === +props.effectTypeId).name;
        return {
            name: name
        }
    }
}
</script>

<style scoped>
.effects-info {
    display: flex;
    height: 21px;
    border-right: #999999 solid 1px;
    justify-content: space-between;
    padding: 4px 8px;
}
</style>