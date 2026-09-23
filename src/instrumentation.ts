import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const { logEvent } = await import("@/lib/logger");

  const message = err instanceof Error ? err.message : String(err);
  const digest =
    typeof err === "object" && err !== null && "digest" in err ? String(err.digest) : undefined;

  await logEvent({
    level: "error",
    message,
    source: context.routePath,
    meta: {
      path: request.path,
      method: request.method,
      routeType: context.routeType,
      digest,
    },
  });
};
