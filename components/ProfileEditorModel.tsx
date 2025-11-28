
import React, { useCallback, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

interface Props {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
  DefaultSvg: React.ReactNode;
  onSave?: (editedImage: string) => void;
  onDelete?: () => void;
}

// Utility function to create cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0,
  flip: { horizontal: boolean; vertical: boolean } = { horizontal: false, vertical: false }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(imageSrc);
        return;
      }
      // Convert blob to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = () => {
        // Fallback to blob URL if base64 conversion fails
        const url = URL.createObjectURL(blob);
        resolve(url);
      };
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.95);
  });
};

const ProfileEditorModel: React.FC<Props> = ({
  open,
  onClose,
  imageSrc,
  DefaultSvg,
  onSave,
  onDelete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [localImage, setLocalImage] = useState<string>(imageSrc ?? "");
  const [isProcessing, setIsProcessing] = useState(false);

  // Update local image when imageSrc changes
  useEffect(() => {
    if (imageSrc) {
      setLocalImage(imageSrc);
    }
  }, [imageSrc]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setFlipX(false);
      setFlipY(false);
      setCroppedAreaPixels(null);
    }
  }, [open]);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


 

  const handleSave = async () => {
    if (!localImage || !croppedAreaPixels) {
      // If no image or no crop area, just return the original
      if (onSave && localImage) {
        onSave(localImage);
      }
      onClose();
      return;
    }

    setIsProcessing(true);
    try {
      const croppedImg = await getCroppedImg(
        localImage,
        croppedAreaPixels,
        rotation,
        { horizontal: flipX, vertical: flipY }
      );
      
      if (onSave) {
        onSave(croppedImg);
      }
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative"
        style={{
          width: 796,
          height: 445,
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: 1,
          transform: 'translate(-50%, -50%)',
          maxWidth: '100vw',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          style={{ zIndex: 10 }}
          aria-label="Close"
        >
          <span className="text-2xl font-bold">×</span>
        </button>
        
        <div className="w-full h-full flex">
          
          <div className="flex-1 relative flex items-center justify-center rounded-2xl overflow-hidden bg-white">
            {localImage ? (
              <Cropper
                image={localImage}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
                style={{ cropAreaStyle: { borderRadius: "32px" } }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl">
                {DefaultSvg || (
                  <div className="text-center text-gray-500">
                    <p>No image to edit</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-[270px] bg-white p-4 flex flex-col gap-6">
            {/* Edit controls */}
            {localImage ? (
              <>
              
                <div className="flex gap-2 mb-2">
                
                  <button className="px-3 py-2 bg-white rounded shadow hover:bg-gray-100" title="Rotate Left" onClick={() => setRotation(rotation - 90)}>⟲</button>
                  <button className="px-3 py-2 bg-white rounded shadow hover:bg-gray-100" title="Rotate Right" onClick={() => setRotation(rotation + 90)}>⟳</button>
                  <button className={`px-3 py-2 bg-white rounded shadow hover:bg-gray-100 ${flipX ? 'bg-blue-100' : ''}`} title="Mirror Horizontal" onClick={() => setFlipX(!flipX)}>↔</button>
                  <button className={`px-3 py-2 bg-white rounded shadow hover:bg-gray-100 ${flipY ? 'bg-blue-100' : ''}`} title="Mirror Vertical" onClick={() => setFlipY(!flipY)}>↕</button>
                </div>
                <div>
                  <label className="font-semibold text-sm block mb-1">Zoom</label>
                  <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="font-semibold text-sm block mb-1">Straighten</label>
                  <input type="range" min={-45} max={45} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full" />
                </div>
                
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>No image to edit</p>
              </div>
            )}

            {/* Save button */}
            <div className="flex justify-end mt-auto gap-2">
            
              <button
                className="px-8 py-2 bg-[#0073CF] text-white rounded-full font-semibold text-base shadow-md transition hover:bg-[#005fa3] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={isProcessing || !localImage}
              >
                {isProcessing ? "Processing..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfileEditorModel;

