<template>
    <div class="item">
        <div class="item-name">風のマント</div>
        <div class="item-value">AAA:bbb</div>
        <div class="item-value">AAA:bbb</div>
        <div class="item-value">AAA:bbb</div>
    </div>
</template>

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
</style>