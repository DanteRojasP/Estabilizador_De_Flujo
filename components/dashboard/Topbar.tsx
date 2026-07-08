interface TopBarProps {
  online: boolean;
  lastSeenSeconds: number | null;
}

export function TopBar({ online, lastSeenSeconds }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--panel-border)] pb-6">
      <div>
        <p className="font-mono text-xs tracking-[0.25em] text-[var(--text-dim)] uppercase">
          Proyecto · Métodos Numéricos
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
          Control de nivel <span className="text-[var(--accent-cyan)]">/ Tanque</span>
        </h1>
      </div>

      <div
        className="flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider"
        style={{
          borderColor: online ? "var(--accent-green)" : "var(--accent-red)",
          color: online ? "var(--accent-green)" : "var(--accent-red)",
          backgroundColor: "var(--panel)",
        }}
      >
        <span
          className="live-dot h-2 w-2 rounded-full"
          style={{ backgroundColor: online ? "var(--accent-green)" : "var(--accent-red)" }}
        />
        {online ? "ESP32 en línea" : "Sin señal del ESP32"}
        {lastSeenSeconds !== null && (
          <span className="text-[var(--text-dim)] normal-case tracking-normal">
            · hace {lastSeenSeconds}s
          </span>
        )}
      </div>
    </header>
  );
}