import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF в приоритете (лучше качество/вес), webp как фолбэк.
    formats: ["image/avif", "image/webp"],
    // Next 16: разрешённые значения quality нужно перечислять явно.
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
