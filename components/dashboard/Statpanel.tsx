import type { TelemetryPoint } from "@/lib/types";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  accent: string;
}

function StatCard({ label, value, unit, accent }: StatCardProps) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
        {label}
      </p>
      <p className="font-mono mt-1 text-2xl font-semibold" style={{ color: accent }}>
        {value}
        {unit && <span className="ml-1 text-sm text-[var(--text-muted)]">{unit}</span>}
      </p>
    </div>
  );
}

function signalQuality(rssi: number) {
  if (!rssi) return { label: "—", bars: 0 };
  const q = Math.max(0, Math.min(1, (rssi + 90) / 60));
  return { label: `${rssi} dBm`, bars: Math.ceil(q * 4) };
}

interface StatPanelProps {
  latest: TelemetryPoint | null;
}

export function StatPanel({ latest }: StatPanelProps) {
  const signal = latest ? signalQuality(latest.wifi) : { label: "—", bars: 0 };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        label="Distancia sensor"
        value={latest ? latest.distance.toFixed(1) : "—"}
        unit="mm"
        accent="var(--accent-cyan)"
      />
      <StatCard
        label="Error"
        value={latest ? latest.error.toFixed(1) : "—"}
        unit="mm"
        accent={latest && Math.abs(latest.error) > 5 ? "var(--accent-red)" : "var(--accent-green)"}
      />
      <StatCard
        label="PWM bomba"
        value={latest ? String(latest.pwm) : "—"}
        unit={latest ? `/ 255 (${Math.round((latest.pwm / 255) * 100)}%)` : ""}
        accent="var(--accent-amber)"
      />
      <StatCard
        label="Señal WiFi"
        value={signal.label}
        accent="var(--accent-violet)"
      />
    </div>
  );
}