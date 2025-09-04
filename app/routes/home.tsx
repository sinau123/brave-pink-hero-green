import type { Route } from "./+types/home";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/Button";
import ImageProcessor from "@/components/ImageProcessor";
import ImageDisplay from "@/components/ImageDisplay";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Brave Pink Hero Green Image Converter" },
    { name: "description", content: "Convert your images to brave pink hero green color" },
  ];
}

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (imageData: string) => {
    setOriginalImage(imageData);
    setIsProcessing(true);
  };

  const handleProcessComplete = (imageData: string) => {
    setProcessedImage(imageData);
    setIsProcessing(false);
  };

  const resetApp = () => {
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Brave Pink Hero Green Image Converter
          </h1>
          <p className="text-gray-600">
            Upload an image and see it transformed into brave pink hero green
          </p>
          <p className="text-lg max-w-xl mx-auto text-gray-600 p-1 border-pink-500 bg-pink-200 border rounded-sm my-2">
           It's safe. We never store your images.
          </p>
        </div>

        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="text-center mb-6">
            <Button
              onClick={resetApp}
              variant="outline"
              className="border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              Upload Another Image
            </Button>
          </div>
        )}

        <ImageProcessor
          originalImage={originalImage}
          onProcessComplete={handleProcessComplete}
        />

        {isProcessing && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        <ImageDisplay
          originalImage={originalImage}
          processedImage={processedImage}
        />
      </div>
    </div>
  );
}
