let id = 0;

function generateId() {
    id = id + 1;
    return id;
}

export {generateId};