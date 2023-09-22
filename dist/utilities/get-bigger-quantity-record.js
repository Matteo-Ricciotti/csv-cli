export const getBiggerQuantityRecord = (data) => data.reduce((a, b) => {
    if (b.quantity > a.quantity)
        return b;
    return a;
}, data[0]);
