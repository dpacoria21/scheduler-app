export interface UserPropsLogin {
    email: string,
    password: string,
}

export interface PayloadUser {
    email: string,
    name: string,
    id: string,
    roles: string[]
}

export interface UserPropsRegister {
    name: string,
    email: string,
    password: string,
}
