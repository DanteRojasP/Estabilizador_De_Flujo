export function AlarmBanner() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border px-5 py-3"
      style={{
        borderColor: "var(--accent-red)",
        backgroundColor: "rgba(248, 113, 113, 0.1)",
      }}
    >
      <span className="live-dot h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-red)" }} />
      <div>
        <p className="font-mono text-sm font-semibold text-[var(--accent-red)]">
          Alarma de seguridad activa — bomba apagada
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          El nivel superó el límite de seguridad (posible drenaje bloqueado). El control se reanuda solo cuando el nivel vuelva a bajar.
        </p>
      </div>
    </div>
  );
}