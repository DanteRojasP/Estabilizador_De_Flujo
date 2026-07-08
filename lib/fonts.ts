import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

// Titulares — geométrica, técnica, con presencia
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

// Lecturas numéricas — como un instrumento de laboratorio
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

// El texto de cuerpo usa el Inter que ya tienes en tu layout (--font-sans),
// no se duplica aquí para evitar choque de nombres.