import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Entrar — SICARF",
  description: "Acesso ao sistema SICARF Painel de Inteligência de Fluxo",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <LoginForm />
    </div>
  );
}
