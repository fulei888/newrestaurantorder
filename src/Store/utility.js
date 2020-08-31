export const updateObject = (oldObject, updatedPropertyies) => {
    return {
        ...oldObject,
        ...updatedPropertyies
    }
}