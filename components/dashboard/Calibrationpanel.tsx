export function CalibrationPanel() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel)" }}
    >
      <p className="font-mono mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-violet)]">
        Método numérico — calibración del sensor
      </p>
      <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
        Interpolación de Lagrange
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
        La lectura cruda del VL53L0X se corrige con un polinomio de Lagrange ajustado
        sobre puntos de calibración (distancia real vs. distancia medida). En esta
        primera versión el polinomio se reduce a una recta{" "}
        <code className="font-mono rounded bg-[var(--panel-soft)] px-1.5 py-0.5 text-[var(--accent-cyan)]">
          d_real = a·d_medida + b
        </code>{" "}
        obtenida como caso particular de Lagrange con dos puntos de referencia. El
        mismo método se usará para la curva de calibración de caudal de entrada.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="font-mono w-full min-w-[360px] text-left text-xs">
          <thead>
            <tr className="text-[var(--text-dim)]">
              <th className="border-b border-[var(--panel-border)] pb-2 pr-6 font-normal uppercase tracking-wider">
                Parámetro
              </th>
              <th className="border-b border-[var(--panel-border)] pb-2 font-normal uppercase tracking-wider">
                Valor actual
              </th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-primary)]">
            <tr>
              <td className="border-b border-[var(--panel-border)] py-2 pr-6 text-[var(--text-muted)]">
                a (pendiente)
              </td>
              <td className="border-b border-[var(--panel-border)] py-2">0.83</td>
            </tr>
            <tr>
              <td className="border-b border-[var(--panel-border)] py-2 pr-6 text-[var(--text-muted)]">
                b (intercepto)
              </td>
              <td className="border-b border-[var(--panel-border)] py-2">-23 mm</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 text-[var(--text-muted)]">H (sensor → fondo)</td>
              <td className="py-2">142 mm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}