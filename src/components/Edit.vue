<template>
    <div class="dialog-frame">
        <div class="target-input-container">
            <div class="part-name">頭</div>
            <div class="select-container">
                <span>level:</span>
                <select>
                    <option>93</option>
                    <option>96</option>
                    <option>99</option>
                    <option>100</option>
                    <option>105</option>
                </select>
            </div>
            <div class="select-container">
                <span>set:</span>
                <select>
                    <option>ミラーアーマー</option>
                    <option>ミラーアーマー</option>
                    <option>カテドラル</option>
                    <option>エトワール</option>
                    <option>風虎</option>
                </select>
            </div>
        </div>
        <div class="effect-input-container">
            <select>
                <option>幻惑</option>
                <option>即死</option>
                <option>混乱</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select>
                <option>幻惑</option>
                <option>即死</option>
                <option>混乱</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
        <div class="effect-input-container">
            <select>
                <option>幻惑</option>
                <option>即死</option>
                <option>混乱</option>
            </select>
            <button>成功</button>
            <button>失敗</button>
            <button>＋</button>
            <div class="effect-value">60%</div>
        </div>
    </div>
</template>


<style scoped>
.dialog-frame {
    background: cornsilk;
    border-radius: 12px;
    color: #333333;
    margin: 30px;
    width: 320px;
    padding: 12px;
}

.target-input-container {
    display: flex;
}

.select-container {
    margin: 0px 12px;
}

.part-name {
    font-size: 18px;
    font-weight: bold;
}

.effect-input-container {
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 8px;
}

.effect-value {
    font-size: 24px;
}
</style>