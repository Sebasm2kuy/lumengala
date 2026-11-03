import type { NextConfig } from "next";

/* Repositorio de PRUEBA: cuando se publica en GitHub Pages del propio repo
   (https://sebasm2kuy.github.io/lumengala/) necesita basePath "/lumengala".
   En producción real (lumengala.site) NO habría basePath: basta con no
   definir NEXT_PUBLIC_BASE_PATH al compilar. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  reactStrictMode: false,
};

export default nextConfig;
