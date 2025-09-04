import { useEffect, useRef } from "react";

// Brave Pink & Hero Green duotone filter
function applyBravePinkHeroGreen(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const bravePink = { r: 228, g: 0, b: 124 }; // #E4007C
  const heroGreen = { r: 0, g: 168, b: 107 }; // #00A86B

  for (let i = 0; i < data.length; i += 4) {
    const gray =
      (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

    data[i] = heroGreen.r * (1 - gray) + bravePink.r * gray; // R
    data[i + 1] = heroGreen.g * (1 - gray) + bravePink.g * gray; // G
    data[i + 2] = heroGreen.b * (1 - gray) + bravePink.b * gray; // B
  }

  ctx.putImageData(imageData, 0, 0);
}

// ✅ Reusable hook
export function useBravePinkHeroGreen(src: string | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!src) {
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous"; // allow external images
    img.src = src;
    img.onload = () => {
      if (canvasRef.current) {
        applyBravePinkHeroGreen(img, canvasRef.current);
      }
    };
  }, [src]);

  return canvasRef;
}
