export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Auth {
    token: string;
    user: User;
}
