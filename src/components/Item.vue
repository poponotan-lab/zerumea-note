<template>
    <div class="item" @click="handleClick" :class="{active: item.itemId===selectedItemId}">
        <div class="item-name">風のマント</div>
        <div class="item-value">AAA:bbb</div>
        <div class="item-value">AAA:bbb</div>
        <div class="item-value">AAA:bbb</div>
    </div>
</template>

<script>
export default {
    props: {
        partId: Number,
        item: Object,
        onSelectItem: Function,
        selectedItemId: Number
    },
    setup(props) {
        const handleClick = () => {
            props.onSelectItem(props.partId, props.item.itemId);
            console.log(props.selectedItemId);
        }
        return {
            handleClick
        }
    }
}
</script>

<style scoped>
.item {
    flex: 0 0 48px;
    min-width: 88px;
    height: 70px;
    margin: 4px;
    border-radius: 6px;
    background: #ffffff;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, .5));
    color: #333333;
}

.item-name {
    font-size: 13px;
    padding-left: 4px
}

.item-value {
    font-size: 11px;
    text-align: right;
    padding-right: 4px;
}

.active {
    background-color: #00FFFF;
    color: #333333;
}
</style>