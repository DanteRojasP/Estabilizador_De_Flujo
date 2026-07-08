"use client";

import { useEffect, useState } from "react";
import type { ControlConfig } from "@/lib/types";

interface ControlPanelProps {
  config: ControlConfig | null;
  maxMm: number;
  onSaved: (config: ControlConfig) => void;
}

function Field({
  label,
  value,
  onChange,
  step,
  min,
  max,
  disabled,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
        {label}
      </span>
      <input
        type="number"
        value={value}
        step={step ?? 0.1}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="font-mono rounded-lg border bg-[var(--panel-soft)] px-3 py-2 text-sm outline-none transition focus:border-[var(--accent-cyan)] disabled:opacity-40"
        style={{ borderColor: "var(--panel-border)", color: "var(--text-primary)" }}
      />
      {hint && <span className="text-[10px] text-[var(--text-dim)]">{hint}</span>}
    </label>
  );
}

export function ControlPanel({ config, maxMm, onSaved }: ControlPanelProps) {
  const [setpoint, setSetpoint] = useState(config?.setpoint ?? 50);
  const [kp, setKp] = useState(config?.kp ?? 1.8);
  const [ki, setKi] = useState(config?.ki ?? 0);
  const [kd, setKd] = useState(config?.kd ?? 0);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!config) return;
    setSetpoint(config.setpoint);
    setKp(config.kp);
    setKi(config.ki);
    setKd(config.kd);
  }, [config]);

  async function handleSave() {
    setSaving(true);
    try {
      const clampedSetpoint = Math.max(0, Math.min(maxMm, setpoint));
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setpoint: clampedSetpoint, kp, ki, kd }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      const updated: ControlConfig = await res.json();
      onSaved(updated);
      setSavedAt(Date.now());
      setTimeout(() => setSavedAt(null), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel)" }}
    >
      <p className="font-mono mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-amber)]">
        Panel de control — actuador
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field
          label={`Setpoint (0–${maxMm}mm)`}
          value={setpoint}
          onChange={setSetpoint}
          step={1}
          min={0}
          max={maxMm}
        />
        <Field label="Kp" value={kp} onChange={setKp} step={0.1} />
        <Field label="Ki" value={ki} onChange={setKi} step={0.01} hint="corrige el error permanente" />
        <Field label="Kd" value={kd} onChange={setKd} step={0.01} hint="amortigua el overshoot" />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
          style={{ backgroundColor: "var(--accent-amber)", color: "#181008" }}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        {savedAt && (
          <span className="font-mono text-xs text-[var(--accent-green)]">
            guardado ✓ — el ESP32 lo tomará en su próximo GET /api/config
          </span>
        )}
      </div>
    </div>
  );
}