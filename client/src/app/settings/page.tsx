import {AuthStatus} from "@/components/auth/AuthStatus";
import ProfilComponent from "@/app/settings/components/profil";

export default function SettingsPage() {
    return (
        <div>
            <ProfilComponent/>
            <AuthStatus/>
        </div>
    );
}