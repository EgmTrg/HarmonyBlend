"use client";

export default function AdminError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded border border-red-200 bg-red-50 p-4 text-sm">
      <p className="font-medium text-red-800">Bir hata oluştu</p>
      <p className="text-red-700">{error.message}</p>
      <button
        onClick={() => retry()}
        className="self-start rounded border border-red-300 px-3 py-1.5 text-xs text-red-800"
      >
        Tekrar dene
      </button>
    </div>
  );
}
