import {UserModel} from "@/models/user.model";

export default function FriendCardComponent(user: UserModel) {
    return (
        <p>
            {user.username}
        </p>
    )
}