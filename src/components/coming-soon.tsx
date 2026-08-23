import { Construction } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">{title}</h1>
        {description && <p className="text-sm text-ink-400">{description}</p>}
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-24 text-center">
        <Construction className="h-8 w-8 text-ink-300" strokeWidth={1.5} />
        <p className="text-sm font-medium text-ink-600">Yapım aşamasında</p>
        <p className="max-w-xs text-xs text-ink-400">Bu sayfa henüz geliştirilmedi, yakında burada olacak.</p>
      </div>
    </div>
  );
}
