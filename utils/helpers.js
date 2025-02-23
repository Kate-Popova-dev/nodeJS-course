export function sleep(timeout) {
    return new Promise(res => setTimeout(() => {
        res(true)
    }, timeout))
}
export function todoValidator(toDoItem, propertyList = ['status', 'text']) {
    let pass = true;
    propertyList.forEach(item => {
        if (!toDoItem.hasOwnProperty(item)) {
            pass = false;
        }
    })
    return pass;
}