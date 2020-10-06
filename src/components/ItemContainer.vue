<template>
    <div class="item-container">
        <div class="item-part-title">
            頭
        </div>
        <div class="item-line-parent">
            <div class="item-line">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
            <div class="add-button-area">
                +
            </div>
        </div>
    </div>
</template>

<script>
import Item from './Item';

export default {
    components: {
      Item
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

</style>