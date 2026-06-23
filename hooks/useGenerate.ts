"use client";
import { useState, useRef, useCallback } from "react";

export type GenerateStatus =
  | "idle"
  | "submitting"
  | "polling"
  | "done"
  | "error";

interface GenerateOptions {
  prompt: string;
  model: string;
  params?: Record<string, unknown>;
}

export function useGenerate() {
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopPolling();
    setStatus("idle");
    setOutputUrl(null);
    setError(null);
    setQueuePosition(null);
    setJobId(null);
  }, [stopPolling]);

  const generate = useCallback(
    async ({ prompt, model, params = {} }: GenerateOptions) => {
      reset();
      setStatus("submitting");

      try {
        // ① API Route'a gönder
        const res = await fetch("/api/studio-generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model, params }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Bir hata oluştu");
          setStatus("error");
          return { error: data.error, requiresUpgrade: res.status === 402 };
        }

        const { job_id } = data as { job_id: string };
        setJobId(job_id);
        setStatus("polling");

        // ② Polling — her 2 saniyede durum sorgula
        intervalRef.current = setInterval(async () => {
          try {
            const statusRes = await fetch(`/api/job-status?id=${job_id}`);
            const statusData = await statusRes.json();

            if (statusData.queue_position != null) {
              setQueuePosition(statusData.queue_position);
            }

            if (statusData.status === "completed") {
              stopPolling();
              setOutputUrl(statusData.output_url);
              setStatus("done");
            } else if (statusData.status === "failed") {
              stopPolling();
              setError("Üretim başarısız oldu. Tekrar dene.");
              setStatus("error");
            }
          } catch {
            // Geçici ağ hatası — devam et
          }
        }, 2000);

        return { job_id };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Ağ hatası";
        setError(msg);
        setStatus("error");
        return { error: msg };
      }
    },
    [reset, stopPolling]
  );

  return {
    generate,
    reset,
    stopPolling,
    status,
    outputUrl,
    error,
    queuePosition,
    jobId,
    isLoading: status === "submitting" || status === "polling",
    isDone: status === "done",
    isError: status === "error",
  };
}
