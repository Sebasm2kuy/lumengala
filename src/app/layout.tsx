import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/* Repositorio de PRUEBA: sin indexación, sin intención de posicionamiento.
   La producción real (lumengala.site) vive en el repositorio Miluaistudio. */
export const metadata: Metadata = {
  title: "Lumen Gala Studio · Propuesta de nueva dirección luminosa",
  description:
    "Propuesta aislada de portada y landing con la nueva dirección de arte luminosa de Lumen Gala Studio. Repositorio de prueba: no afecta a lumengala.site.",
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL("https://sebasm2kuy.github.io/lumengala/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-UY"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${cormorant.variable} ${montserrat.variable} bg-marfil font-sans text-tinta antialiased`}
      >
        {/* Marca el documento como "con JavaScript": las animaciones de
            aparición solo se activan con JS (mejora progresiva). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
