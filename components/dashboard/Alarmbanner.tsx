"use client";

import { useState } from "react";

interface AlarmBannerProps {
  onAcknowledged: () => void;
}

export function AlarmBanner({ onAcknowledged }: AlarmBannerProps) {
  const [sending, setSending] = useState(false);

  async function handleAck() {
    setSending(true);
    try {
      const res = await fetch("/api/config/reset", { method: "POST" });
      if (res.ok) onAcknowledged();
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-3"
      style={{
        borderColor: "var(--accent-red)",
        backgroundColor: "rgba(248, 113, 113, 0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="live-dot h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-red)" }} />
        <div>
          <p className="font-mono text-sm font-semibold text-[var(--accent-red)]">
            Alarma activa — bomba apagada (nivel llegó a 12.5cm)
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            El motor se queda apagado hasta que confirmes que revisaste el sistema.
          </p>
        </div>
      </div>

      <button
        onClick={handleAck}
        disabled={sending}
        className="rounded-lg px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
        style={{ backgroundColor: "var(--accent-red)", color: "#1a0808" }}
      >
        {sending ? "Enviando..." : "Reconocer y reanudar"}
      </button>
    </div>
  );
}