import { LogoutButton } from "@/components/logout-button.component";
import ProfilComponent from "./components/profil";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <ProfilComponent />
      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-10 py-8 text-center shadow-xl shadow-indigo-500/10 backdrop-blur-xl md:flex-row md:text-left">
        <div>
          <h3 className="text-base font-semibold text-white">
            Pret a faire une pause ?
          </h3>
          <p className="text-sm text-slate-300">
            Vous pourrez toujours vous reconnecter plus tard pour retrouver vos conversations.
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
