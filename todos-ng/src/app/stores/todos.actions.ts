// CRUD: Create ✅, Read, Update, Delete

export class CreateTodo {
    static readonly type = '[Todo] CreateTodo';

    constructor(public title: string) {
    }
}

export class ToggleTodo {
    static readonly type = '[Todo] Toggle';

    constructor(public id: number) {
    }
}

export class RemoveTodo {
    static readonly type = '[Todo] Remove';

    constructor(public id: number) {
    }
}

export class UpdateTodo {
    static readonly type = '[Todo] Update';

    constructor(public id: number, public newTitle: string) {
    }
}

export class UpdateFilter {
    static readonly type = '[Todo] UpdateFilter';

    constructor(public filter: string) {
    }
}

export class GetTodos {
    static readonly type = '[Todo] GetTodos';

    constructor() {
    }
}


