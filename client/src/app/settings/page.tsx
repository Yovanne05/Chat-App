import { LogoutButton } from "@/components/auth/LogoutButton";
import ProfilComponent from "@/app/settings/components/profil";

export default function SettingsPage() {
    return (
        <div className="w-full max-w-md mx-auto mt-10 space-y-6 text-center">
            <ProfilComponent />
            <LogoutButton />
        </div>
    );
}
