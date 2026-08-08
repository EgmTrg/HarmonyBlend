"use client";

export default function AdminError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-danger-fg/20 bg-danger-bg p-6 text-sm shadow-sm">
      <p className="font-medium text-danger-fg">Bir hata oluştu</p>
      <p className="text-danger-fg/80">{error.message}</p>
      <button
        onClick={() => retry()}
        className="self-start rounded-lg border border-danger-fg/30 px-3 py-1.5 text-xs font-medium text-danger-fg"
      >
        Tekrar dene
      </button>
    </div>
  );
}
