export interface UserStore {
    email: string,
    name: string,
    id: string,
    roles: string[]
}

export interface Event {
    id:          string;
    title:       string;
    description: string;
    start:       string;
    end:         string;
    todos:       Todo[];
    activeTodo: Todo | null;
}

export interface Todo {
    id:          string;
    description: string;
    done:        boolean;
}
