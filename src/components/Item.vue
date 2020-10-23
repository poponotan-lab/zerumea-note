<template>
  <div
    class="item"
    @dblclick="handleDblClick"
    @click="handleClick"
    :class="{ active: item.itemId === selectedItemId }"
  >
    <div class="item-name">{{ name }}</div>
    <div class="item-value">{{ effect1 ? effect1.name : "" }}:{{ item ? item.effect1.value : ""}}</div>
    <div class="item-value">{{ effect2 ? effect2.name : "" }}:{{ item ? item.effect2.value : ""}}</div>
    <div class="item-value">{{ effect3 ? effect3.name : "" }}:{{ item ? item.effect3.value : ""}}</div>
  </div>
</template>

<script>
import setType from "../constants/set-type.json";
import effectType from "../constants/effect-type.json";
import { computed, ref } from 'vue';

export default {
  props: {
    partId: Number,
    item: Object,
    onSelectItem: Function,
    selectedItemId: Number,
    editItem: Function
  },
  setup(props) {
    const clicks = ref(0);
    const timer = ref(null);
    const handleClick = () => {
      clicks.value++;
      if (clicks.value === 1) {
        props.onSelectItem(props.partId, props.item.itemId);
        timer.value = setTimeout(() => {
          clicks.value = 0;
        }, 500)
      } else {
        props.editItem(props.item);
        clicks.value = 0;
      }
    };
    const name = computed(() => setType.find((i) => i.id === props.item.setTypeId).name);
    const effect1 = computed(() => effectType.find((i) => i.id === props.item.effect1.effectId));
    const effect2 = computed(() => effectType.find((i) => i.id === props.item.effect2.effectId));
    const effect3 = computed(() => effectType.find((i) => i.id === props.item.effect3.effectId));

    // const handleDblClick = () => {
    //     console.log("ダブルクリックしたよ");
    //     props.editItem(props.item);
    // }
    return {
      name: name,
      effect1: effect1,
      effect2: effect2,
      effect3: effect3,
      handleClick
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
  font-size: 12px;
  padding-left: 4px;
  white-space: nowrap;
  height: 18px;
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