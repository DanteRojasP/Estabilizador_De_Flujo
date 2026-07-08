"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TelemetryPoint } from "@/lib/types";

interface LiveChartProps {
  data: TelemetryPoint[];
  setpointMm: number;
  maxMm: number;
}

export function LiveChart({ data, setpointMm, maxMm }: LiveChartProps) {
  const chartData = data.map((d) => ({
    time: new Date(d.createdAt).toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    altura: d.height,
  }));

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
          Altura de agua — historial en vivo
        </p>
        <p className="font-mono text-[10px] text-[var(--text-dim)]">
          últimas {chartData.length} lecturas
        </p>
      </div>

      <div className="h-[220px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-[var(--text-dim)]">
            esperando datos del ESP32...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="alturaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" />
              <XAxis
                dataKey="time"
                stroke="var(--text-dim)"
                fontSize={10}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis
                stroke="var(--text-dim)"
                fontSize={10}
                domain={[0, maxMm]}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--panel-soft)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--text-muted)" }}
              />
              <ReferenceLine
                y={setpointMm}
                stroke="var(--accent-amber)"
                strokeDasharray="5 4"
                label={{
                  value: "setpoint",
                  fill: "var(--accent-amber)",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
              <Area
                type="monotone"
                dataKey="altura"
                stroke="var(--accent-cyan)"
                strokeWidth={2}
                fill="url(#alturaFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}