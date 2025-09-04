import React, { useEffect, useRef } from "react";

const ImageProcessor = ({
  originalImage,
  onProcessComplete,
}: {
  originalImage: string | null;
  onProcessComplete: (data: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (originalImage) {
      processImage();
    }
  }, [originalImage]);

  const processImage = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const bravePink = { r: 249, g: 159, b: 210 }; // #E4007C
  const heroGreen = { r: 46, g: 87, b: 54 }; // #00A86B

  for (let i = 0; i < data.length; i += 4) {
    const gray =
      (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

    data[i] = heroGreen.r * (1 - gray) + bravePink.r * gray; // R
    data[i + 1] = heroGreen.g * (1 - gray) + bravePink.g * gray; // G
    data[i + 2] = heroGreen.b * (1 - gray) + bravePink.b * gray; // B
  }

  ctx.putImageData(imageData, 0, 0);
      // Get the processed image as data URL
      const processedImage = canvas.toDataURL("image/png");

      // Pass to parent component
      onProcessComplete(processedImage);
    };
    img.src = originalImage || '';
  };

  return (
    <div className="hidden">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageProcessor;
