export const allFalse = (obj) => {
    const objValues = Object.values(obj);
    return objValues.every((val) => val === false);
}