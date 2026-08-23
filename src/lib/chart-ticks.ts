// Y ekseni için "temiz" (0/50/100/150 gibi) tick değerleri üretir —
// dataviz skill: "Y-axis ticks: round to clean numbers".
export function niceTicks(max: number, tickCount = 4): number[] {
  if (max <= 0) return [0, 1];
  const rawStep = max / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const residual = rawStep / magnitude;
  let niceStep: number;
  if (residual > 5) niceStep = 10 * magnitude;
  else if (residual > 2) niceStep = 5 * magnitude;
  else if (residual > 1) niceStep = 2 * magnitude;
  else niceStep = magnitude;

  const niceMax = Math.ceil(max / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let v = 0; v <= niceMax + niceStep / 1000; v += niceStep) {
    ticks.push(Math.round(v));
  }
  // niceStep < 1 olduğunda ardışık değerler aynı tam sayıya yuvarlanabilir
  // (ör. 0.5 ve 1.0 ikisi de 1'e) — React key çakışmasına yol açmasın diye tekilleştir.
  return [...new Set(ticks)];
}
