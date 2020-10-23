<template>
    <div class="item-container">
        <div class="item-part-title">
            {{ part.name }}
        </div>
        <div class="item-line-parent">
            <div class="item-line">
                <Item v-for="item in targetItems" 
                    :key="item.itemId" 
                    :partId="part.id" 
                    :onSelectItem="onSelectItem" 
                    :item="item"
                    :selectedItemId="selectedItems[part.id]"
                    :editItem="editItem"/>
            </div>
            <div class="add-button-area">
                <button class="add-button" @click="handleClick">
                +
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import Item from './Item';

export default {
    props: {
        part: Object,
        onSelectItem: Function,
        items: Array,
        selectedItems: Array,
        addClick: Function,
        editItem: Function
    },
    components: {
        Item
    },
    setup(props) {
        const handleClick = () => {
            props.addClick(props.part.id);
        }

        const targetItems = computed(() => props.items.filter(i => i.partTypeId === props.part.id))

        return {
            handleClick: handleClick,
            targetItems
        }
    }
}
</script>

<style scoped>
.item-container {
    background: #2E3192;
    padding: 4px;
    border-radius: 12px;
    border: solid 4px #ffffff;
    display: flex;
}

.item-line-parent {
    display: flex;
    width: 90%;
}

.item-line {
    background: #ffffff;
    width: 100%;
    display: flex;
    border-radius: 6px;
    height: 80px;
    padding: 4px;
    overflow-x: auto;
}

.item-part-title {
    writing-mode: vertical-rl;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.add-button-area {
    position: absolute;
    background: rgba(0, 113, 188, .5);
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    right: 20px;
}

.add-button {
    background: #0071BC;
    border-radius: 16px;
    border: none;
    color: white;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;;
}

</style>