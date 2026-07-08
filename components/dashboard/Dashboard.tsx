"use client";

import { useEffect, useRef, useState } from "react";
import type { ControlConfig, TelemetryPoint } from "@/lib/types";
import { TopBar } from "@/components/dashboard/Topbar";
import { AlarmBanner } from "@/components/dashboard/Alarmbanner";
import { TankVisual } from "@/components/dashboard/Tankvisual";
import { StatPanel } from "@/components/dashboard/Statpanel";
import { LiveChart } from "@/components/dashboard/Livechart";
import { ControlPanel } from "@/components/dashboard/Controlpanel";
import { CalibrationPanel } from "@/components/dashboard/Calibrationpanel";

// Debe coincidir con H en el firmware del ESP32
const TANK_SENSOR_TO_BOTTOM_MM = 142;

const TELEMETRY_POLL_MS = 1500;
const CONFIG_POLL_MS = 5000;
const OFFLINE_THRESHOLD_S = 5;

export function Dashboard() {
  const [history, setHistory] = useState<TelemetryPoint[]>([]);
  const [config, setConfig] = useState<ControlConfig | null>(null);
  const [now, setNow] = useState(Date.now());

  const latest = history.length > 0 ? history[history.length - 1] : null;
  const configLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function pollTelemetry() {
      try {
        const res = await fetch("/api/telemetry?limit=60", { cache: "no-store" });
        if (!res.ok) return;
        const data: TelemetryPoint[] = await res.json();
        if (!cancelled) setHistory(data);
      } catch (err) {
        console.error(err);
      }
    }

    pollTelemetry();
    const id = setInterval(pollTelemetry, TELEMETRY_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function pollConfig() {
      try {
        const res = await fetch("/api/config", { cache: "no-store" });
        if (!res.ok) return;
        const data: ControlConfig = await res.json();
        // no pisar lo que el usuario está editando después de la primera carga
        if (!cancelled && !configLoaded.current) {
          setConfig(data);
          configLoaded.current = true;
        }
      } catch (err) {
        console.error(err);
      }
    }

    pollConfig();
    const id = setInterval(pollConfig, CONFIG_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const lastSeenSeconds = latest ? Math.floor((now - new Date(latest.createdAt).getTime()) / 1000) : null;
  const online = lastSeenSeconds !== null && lastSeenSeconds < OFFLINE_THRESHOLD_S;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <TopBar online={online} lastSeenSeconds={lastSeenSeconds} />

      {latest?.alarm && (
        <div className="mt-6">
          <AlarmBanner />
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div
          className="flex items-center justify-center rounded-xl border p-6"
          style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel)" }}
        >
          <TankVisual
            heightMm={latest?.height ?? 0}
            setpointMm={config?.setpoint ?? 0}
            maxMm={TANK_SENSOR_TO_BOTTOM_MM}
            connected={online}
          />
        </div>

        <div className="flex flex-col gap-6">
          <StatPanel latest={latest} />
          <LiveChart data={history} setpointMm={config?.setpoint ?? 0} maxMm={TANK_SENSOR_TO_BOTTOM_MM} />
        </div>
      </div>

      <div className="mt-6">
        <ControlPanel config={config} maxMm={TANK_SENSOR_TO_BOTTOM_MM} onSaved={setConfig} />
      </div>

      <div className="mt-6">
        <CalibrationPanel />
      </div>
    </div>
  );
}