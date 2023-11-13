export interface UserResponse  {
    id: string,
    email: string,
    token: string,
}

export interface UserRegisterResponse {
    name:  string;
    email: string;
    id:    string;
    roles: string[];
    token: string;
}

