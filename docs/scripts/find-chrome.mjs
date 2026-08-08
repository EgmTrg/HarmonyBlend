import { existsSync } from "node:fs";

const CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

export function findChromeExecutable() {
  const found = CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "Chrome veya Edge bulunamadı. PDF üretimi için sistemde Chrome ya da Edge kurulu olmalı, " +
        "ya da CHROME_PATH ortam değişkenini kurulu tarayıcının yoluna ayarlayın."
    );
  }
  return process.env.CHROME_PATH || found;
}
