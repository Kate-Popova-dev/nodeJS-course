export const toDoList = [
    {"id": 0, status: 'new', text: 'My message0', "createdAt": "23.02.2025"},
    {"id": 1, status: 'done', text: 'My message1', "createdAt": "23.02.2025"},
];

export function getTodoList() {
    return toDoList
}

export function idExists(id) {
    return !!toDoList.find(toDo => toDo.id === parseInt(id))
}

export function getToDo(id) {
    return toDoList.find(user => user.id === parseInt(id))
}

export function postToDo(toDo) {
    toDoList.push(toDo)
}

export function changeStatus(id, status) {
    toDoList.find((i) => i.id.toString() === id.toString()).status = status;
}