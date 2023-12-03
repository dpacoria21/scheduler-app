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
    color?: string,
    todos:       Todo[];
}


export interface Todo {
    id:          string;
    description: string;
    done:        boolean;
}
