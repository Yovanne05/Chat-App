export interface User {
    _id: string;
    username: string;
    pseudo: string;
    email: string;
    friends: User[];
}
