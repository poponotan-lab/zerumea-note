<template>
  <div
    class="item"
    @click="handleClick"
    @dblclick="handleDblClick"
    :class="{ active: item.itemId === selectedItemId }"
  >
    <div class="item-name">{{ name }}</div>
    <div class="item-value">{{ effect1.name }}:{{item.effect1.value}}</div>
    <div class="item-value">{{ effect2.name }}:{{item.effect2.value}}</div>
    <div class="item-value">{{ effect3.name }}:{{item.effect3.value}}</div>
  </div>
</template>

<script>
import setType from "../constants/set-type.json";
import effectType from "../constants/effect-type.json";

export default {
  props: {
    partId: Number,
    item: Object,
    onSelectItem: Function,
    selectedItemId: Number,
  },
  setup(props) {
    const handleClick = () => {
      props.onSelectItem(props.partId, props.item.itemId);
    };
    const name = setType.find((i) => i.id === props.item.itemId).name;
    const effect1 = effectType.find((i) => i.id === props.item.effect1.effectId);
    const effect2 = effectType.find((i) => i.id === props.item.effect2.effectId);
    const effect3 = effectType.find((i) => i.id === props.item.effect3.effectId);
    const handleDblClick = () => {
        alert("ダブルクリックしました。");
    }
    return {
      name: name,
      effect1: effect1,
      effect2: effect2,
      effect3: effect3,
      handleClick,
      handleDblClick
    };
  },
};
</script>

<style scoped>
.item {
  flex: 0 0 48px;
  min-width: 88px;
  height: 70px;
  margin: 4px;
  border-radius: 6px;
  background: #ffffff;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  color: #333333;
}

.item-name {
  min-width: 84px;
  overflow: hidden;
  font-size: 13px;
  padding-left: 4px;
  white-space: nowrap;
  height: 16px;
}

.item-value {
  font-size: 11px;
  text-align: right;
  padding-right: 4px;
  height: 14px;
}

.active {
  background-color: #00ffff;
  color: #333333;
}
</style>