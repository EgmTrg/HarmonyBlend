"use client";

import { useState } from "react";
import { INPUT } from "@/lib/ui";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatThousands(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function CurrencyInput({
  name,
  defaultValue,
  placeholder,
  className,
}: {
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  className?: string;
}) {
  const [digits, setDigits] = useState(() =>
    onlyDigits(String(defaultValue ?? "").split(".")[0])
  );

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        value={digits ? `${formatThousands(digits)}₺` : ""}
        onChange={(e) => setDigits(onlyDigits(e.target.value))}
        placeholder={placeholder}
        className={className ?? INPUT}
      />
      <input type="hidden" name={name} value={digits} />
    </>
  );
}
