export type UserModel = {
    id: string;
    username: string;
    pseudo: string;
    email: string;
    friends: { id: string; username: string }[];
};
