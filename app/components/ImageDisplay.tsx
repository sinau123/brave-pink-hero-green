import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const ImageDisplay = ({
  originalImage,
  processedImage,
}: {
  originalImage: string | null;
  processedImage: string | null;
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Original Image</CardTitle>
          </CardHeader>
          <CardContent>
            {originalImage ? (
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <p className="text-gray-500">No image uploaded</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pink & Green Image</CardTitle>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                <p className="text-gray-500">
                  Upload an image to see the result
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {processedImage && (
        <div className="mt-6 text-center">
          <a
            href={processedImage}
            download="pink-green-image.png"
            className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Download Processed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
