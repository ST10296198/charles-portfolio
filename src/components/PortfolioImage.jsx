import { useState } from "react";

const imageDimensions = {
  "/images/agri/agri-detail.webp": [1672, 941],
  "/images/agri/agri-hero.webp": [1672, 941],
  "/images/agri/agri-home.webp": [1672, 941],
  "/images/agri/agri-mobile.webp": [1144, 1375],
  "/images/bcc/bcc-detail.webp": [1448, 1086],
  "/images/bcc/bcc-hero.webp": [1672, 941],
  "/images/bcc/bcc-home.webp": [1876, 900],
  "/images/bcc/bcc-mobile.webp": [1145, 1374],
  "/images/eddie/eddie-detail.webp": [1672, 941],
  "/images/eddie/eddie-hero.webp": [1672, 941],
  "/images/eddie/eddie-home.webp": [850, 1851],
  "/images/eddie/eddie-mobile.webp": [1145, 1374],
  "/images/profile/charles-portrait.jpeg": [853, 1280],
  "/images/tci/tci-detail.webp": [1672, 941],
  "/images/tci/tci-hero.webp": [1254, 1254],
  "/images/tci/tci-home.webp": [1907, 908],
  "/images/tci/tci-mobile.webp": [1145, 1374],
};

export default function PortfolioImage({
  src,
  alt,
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  width,
  height,
  onError,
  ...props
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const useFallback = failedSrc === src;
  const fallbackSrc = typeof src === "string" && src.toLowerCase().endsWith(".webp")
    ? src.replace(/\.webp$/i, ".png")
    : null;
  const [intrinsicWidth, intrinsicHeight] = imageDimensions[src] ?? [];

  const handleError = (event) => {
    if (!useFallback && fallbackSrc) {
      console.warn(`Unable to load optimized image "${src}"; trying "${fallbackSrc}".`);
      setFailedSrc(src);
      return;
    }
    console.error(`Unable to load portfolio image "${event.currentTarget.currentSrc}".`);
    onError?.(event);
  };

  return (
    <img
      {...props}
      src={useFallback ? fallbackSrc : src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      width={width ?? intrinsicWidth}
      height={height ?? intrinsicHeight}
      onError={handleError}
    />
  );
}
