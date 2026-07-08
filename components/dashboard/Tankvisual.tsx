interface TankVisualProps {
  heightMm: number;
  setpointMm: number;
  maxMm: number;
  connected: boolean;
}

const X = 50;
const Y_TOP = 20;
const Y_BOTTOM = 300;
const WIDTH = 130;

export function TankVisual({ heightMm, setpointMm, maxMm, connected }: TankVisualProps) {
  const clampedHeight = Math.max(0, Math.min(maxMm, heightMm));
  const fillY = Y_BOTTOM - (clampedHeight / maxMm) * (Y_BOTTOM - Y_TOP);
  const setpointY = Y_BOTTOM - (Math.max(0, Math.min(maxMm, setpointMm)) / maxMm) * (Y_BOTTOM - Y_TOP);

  const ticks = Array.from({ length: 8 }, (_, i) => {
    const mm = Math.round((maxMm / 7) * i);
    const y = Y_BOTTOM - (mm / maxMm) * (Y_BOTTOM - Y_TOP);
    return { mm, y };
  });

  const waveColor = connected ? "var(--accent-cyan)" : "var(--text-dim)";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 340" className="h-[320px] w-auto">
        {/* regla en mm */}
        {ticks.map(({ mm, y }) => (
          <g key={mm}>
            <line x1={X - 10} y1={y} x2={X - 2} y2={y} stroke="var(--text-dim)" strokeWidth={1} />
            <text
              x={X - 14}
              y={y + 3}
              textAnchor="end"
              className="font-mono"
              fontSize={9}
              fill="var(--text-dim)"
            >
              {mm}
            </text>
          </g>
        ))}

        {/* contorno del tanque */}
        <rect
          x={X}
          y={Y_TOP}
          width={WIDTH}
          height={Y_BOTTOM - Y_TOP}
          rx={12}
          fill="var(--panel-soft)"
          stroke="var(--panel-border)"
          strokeWidth={2}
        />

        <clipPath id="tankBounds">
          <rect x={X} y={Y_TOP} width={WIDTH} height={Y_BOTTOM - Y_TOP} rx={12} />
        </clipPath>

        <g clipPath="url(#tankBounds)">
          <g transform={`translate(0, ${fillY})`}>
            <g className="tank-wave">
              <path
                d={`M ${X - 140} 8
                    C ${X - 105} -4, ${X - 70} 20, ${X - 35} 8
                    C ${X} -4, ${X + 35} 20, ${X + 70} 8
                    C ${X + 105} -4, ${X + 140} 20, ${X + 175} 8
                    C ${X + 210} -4, ${X + 245} 20, ${X + 280} 8
                    L ${X + 280} 400 L ${X - 140} 400 Z`}
                fill={waveColor}
                opacity={0.85}
              />
            </g>
          </g>
        </g>

        {/* setpoint */}
        <line
          x1={X - 4}
          y1={setpointY}
          x2={X + WIDTH + 4}
          y2={setpointY}
          stroke="var(--accent-amber)"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text
          x={X + WIDTH + 8}
          y={setpointY + 3}
          className="font-mono"
          fontSize={10}
          fill="var(--accent-amber)"
        >
          SP {setpointMm.toFixed(0)}
        </text>

        {/* borde superior encima del agua */}
        <rect
          x={X}
          y={Y_TOP}
          width={WIDTH}
          height={Y_BOTTOM - Y_TOP}
          rx={12}
          fill="none"
          stroke="var(--panel-border)"
          strokeWidth={2}
        />
      </svg>

      <p className="font-mono text-3xl font-semibold text-[var(--accent-cyan)]">
        {clampedHeight.toFixed(1)} <span className="text-base text-[var(--text-muted)]">mm</span>
      </p>
      <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-dim)]">
        altura actual de agua
      </p>
    </div>
  );
}