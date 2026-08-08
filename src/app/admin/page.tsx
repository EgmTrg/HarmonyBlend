import { requireAdminSession } from "@/lib/session";

export default async function AdminHomePage() {
  const session = await requireAdminSession();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Genel Bakış</h1>
      <p className="text-sm text-neutral-600">
        Oturum açan kullanıcı: <strong>{session.user.email}</strong> ({session.user.role})
      </p>
    </div>
  );
}
