
export const getNewItem = (setTypeId, partTypeId) => {
    return {
        itemId: new Date().getTime(),
        charaId: "0", // まだメインキャラのみ
        setTypeId: setTypeId == null ? undefined : setTypeId,
        partTypeId: partTypeId == null ? undefined : partTypeId,
        effect1: { effectId: undefined, value: undefined},
        effect2: { effectId: undefined, value: undefined},
        effect3: { effectId: undefined, value: undefined},    
    }
}